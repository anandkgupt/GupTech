import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App & Auth
// We reuse the initialized app so we don't call initializeApp twice
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider Config with spreadsheet & drive.file permission scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");
googleProvider.addScope("https://www.googleapis.com/auth/drive.file");

// In-memory cache for auth credentials
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuthListener = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If there is a user but no cached token, we can sign in via popup.
        // We do not do it automatically to prevent blocking if they just loaded.
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;
    if (!token) {
      throw new Error("Unable to retrieve Google OAuth access token from credential result.");
    }
    cachedAccessToken = token;
    return { user: result.user, accessToken: token };
  } catch (error) {
    console.error("CRM Google Auth login failed:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const logoutCrm = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface LeadItem {
  id: string; // unique random id
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  status: "New Lead" | "In Conversation" | "Highly Interested" | "Documents Checked" | "Admission Done" | "Cancelled";
  notes: string;
  counselor: string;
}

// Helper to get Sheet auth token
export const getActiveToken = (): string | null => cachedAccessToken;

// Local Lead Storage helpers
export const loadLocalLeads = (): LeadItem[] => {
  try {
    const raw = localStorage.getItem("anand_crm_local_leads");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse local leads from cache:", e);
    return [];
  }
};

export const saveLocalLeads = (leads: LeadItem[]): void => {
  localStorage.setItem("anand_crm_local_leads", JSON.stringify(leads));
};

export const addLocalLead = (lead: Omit<LeadItem, "id" | "timestamp" | "status" | "notes" | "counselor">): LeadItem => {
  const all = loadLocalLeads();
  const newLead: LeadItem = {
    ...lead,
    id: `lead_${Math.floor(100000 + Math.random() * 900000)}`,
    timestamp: new Date().toLocaleString("en-US", { hour12: false }),
    status: "New Lead",
    notes: "",
    counselor: "Anand K Gupta"
  };
  saveLocalLeads([newLead, ...all]);
  return newLead;
};

// Google Sheets Api integrations
export const createCrmSpreadsheet = async (token: string): Promise<string> => {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      properties: {
        title: "Asian International University - Admissions CRM Leads"
      },
      sheets: [
        {
          properties: {
            title: "Admissions Leads"
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create Google Sheet CRM. API Error: ${errText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId as string;
  
  // Set up spreadsheet headers
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Admissions Leads!A1:H1?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      range: "Admissions Leads!A1:H1",
      majorDimension: "ROWS",
      values: [
        ["Submission Time", "Lead Name", "WhatsApp/Phone", "Email Address", "Preferred Course", "Lead Status", "Assigned Counselor", "Counselor Notes"]
      ]
    })
  });

  localStorage.setItem("anand_crm_spreadsheet_id", spreadsheetId);
  return spreadsheetId;
};

export const getSavedSpreadsheetId = (): string | null => {
  return localStorage.getItem("anand_crm_spreadsheet_id");
};

export const setSavedSpreadsheetId = (id: string): void => {
  if (id.trim()) {
    localStorage.setItem("anand_crm_spreadsheet_id", id.trim());
  } else {
    localStorage.removeItem("anand_crm_spreadsheet_id");
  }
};

// Sync multiple leads to Google Sheets via Append
export const syncLeadsToSheet = async (
  spreadsheetId: string,
  token: string,
  leads: LeadItem[]
): Promise<void> => {
  if (leads.length === 0) return;

  const rows = leads.map(l => [
    l.timestamp,
    l.name,
    l.phone,
    l.email || "N/A",
    l.course,
    l.status,
    l.counselor,
    l.notes || ""
  ]);

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Admissions Leads!A:H:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        range: "Admissions Leads!A:H",
        majorDimension: "ROWS",
        values: rows
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to sync leads to sheet. API Error: ${errText}`);
  }
};

// Fetch synced leads directly from active sheet
export interface SyncedLeadRow {
  rowIndex: number; // 1-indexed (with row 1 being headers, leads start at row 2)
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  status: string;
  counselor: string;
  notes: string;
}

export const fetchLeadsFromSheet = async (
  spreadsheetId: string,
  token: string
): Promise<SyncedLeadRow[]> => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Admissions Leads!A2:H500`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to retrieve CRM leads from spreadsheet. ${errText}`);
  }

  const data = await response.json();
  const rows: any[][] = data.values || [];

  return rows.map((rawRow, index) => {
    return {
      rowIndex: index + 2, // Row indices are 1-indexed, lead rows start at index 2
      timestamp: String(rawRow[0] || ""),
      name: String(rawRow[1] || ""),
      phone: String(rawRow[2] || ""),
      email: String(rawRow[3] || ""),
      course: String(rawRow[4] || ""),
      status: String(rawRow[5] || "New Lead"),
      counselor: String(rawRow[6] || "Anand K Gupta"),
      notes: String(rawRow[7] || "")
    };
  }).reverse(); // Reverse so newest synced leads show at top
};

// Update an individual cell (status or notes) in the sheet
export const updateLeadCellInSheet = async (
  spreadsheetId: string,
  token: string,
  rowIndex: number,
  columnLetter: "F" | "H", // F for Status, H for Notes
  newValue: string
): Promise<void> => {
  const range = `Admissions Leads!${columnLetter}${rowIndex}`;
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        range,
        majorDimension: "ROWS",
        values: [[newValue]]
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to update lead cell in spreadsheet. ${errText}`);
  }
};
