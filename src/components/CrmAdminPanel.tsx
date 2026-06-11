import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { 
  Database, 
  ExternalLink, 
  RefreshCw, 
  MessageSquare, 
  Phone, 
  Save, 
  AlertTriangle, 
  CheckCircle, 
  LogOut, 
  Plus, 
  Search, 
  Tag, 
  UserPlus,
  Compass,
  FileCheck2,
  Trash2
} from "lucide-react";
import { 
  signInWithGoogle, 
  logoutCrm, 
  initAuthListener, 
  addLocalLead, 
  loadLocalLeads, 
  saveLocalLeads, 
  createCrmSpreadsheet, 
  getSavedSpreadsheetId, 
  setSavedSpreadsheetId, 
  syncLeadsToSheet, 
  fetchLeadsFromSheet, 
  updateLeadCellInSheet, 
  LeadItem, 
  SyncedLeadRow 
} from "../lib/sheetsCrm";

interface CrmAdminPanelProps {
  currentTheme: {
    primaryColor: string;
    accentColor: string;
    bgColor: string;
    cardBg: string;
    textDark: string;
    textLight: string;
    borderSubtle: string;
  };
}

export default function CrmAdminPanel({ currentTheme }: CrmAdminPanelProps) {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Spreadsheet mapping state
  const [spreadsheetId, setSpreadsheetId] = useState<string>("");
  const [spreadsheetInput, setSpreadsheetInput] = useState<string>("");
  const [sheetLoading, setSheetLoading] = useState(false);

  // Leads states
  const [localQueue, setLocalQueue] = useState<LeadItem[]>([]);
  const [syncedLeads, setSyncedLeads] = useState<SyncedLeadRow[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsSearch, setLeadsSearch] = useState("");

  // Edit / Action states
  const [updatingRowIndex, setUpdatingRowIndex] = useState<number | null>(null);
  const [savingNoteRowIndex, setSavingNoteRowIndex] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<number, string>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Listen to Firebase auth status
  useEffect(() => {
    const unsubscribe = initAuthListener(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setAuthLoading(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setAuthLoading(false);
      }
    );

    // Initial load of sheet ID parameter
    const initialId = getSavedSpreadsheetId() || "";
    setSpreadsheetId(initialId);
    setSpreadsheetInput(initialId);

    // Load any local unsynced registrations
    setLocalQueue(loadLocalLeads());

    return () => unsubscribe();
  }, []);

  // Reload sheet data automatically when Sheet ID or credentials change
  useEffect(() => {
    if (user && token && spreadsheetId) {
      loadSpreadsheetLeads();
    }
  }, [user, token, spreadsheetId]);

  // Set timeout message helper
  const showFeedback = (type: "success" | "error", text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 5000);
  };

  const handleLogin = async () => {
    try {
      setAuthLoading(true);
      const res = await signInWithGoogle();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        showFeedback("success", "Successfully authenticated with Google account!");
      }
    } catch (e: any) {
      console.error("CRM Google Auth login failed:", e);
      // Gracious human-friendly error messages for common iframe / user cancellation scenarios
      const errStr = String(e?.message || e?.code || "");
      const isPopupClosed = errStr.includes("popup-closed-by-user") || e?.code === "auth/popup-closed-by-user";
      const isPopupBlocked = errStr.includes("popup-blocked") || e?.code === "auth/popup-blocked";
      const isCancelled = errStr.includes("cancelled-popup-request") || e?.code === "auth/cancelled-popup-request";

      if (isPopupClosed) {
        showFeedback(
          "error", 
          "The login window was closed before completion. If popups fail, please make sure you open this app in a New Tab to login, as embedded sandboxed iframes block auth popups!"
        );
      } else if (isPopupBlocked) {
        showFeedback(
          "error", 
          "Your browser blocked the Google Login popup. Please allow popups for this site, or run the application in a New Tab!"
        );
      } else if (isCancelled) {
        showFeedback(
          "error", 
          "Login request interrupted. Please make sure only one login window is open at a time."
        );
      } else {
        showFeedback("error", `Authentication Info: To sign in successfully, make sure to access this app directly in a New Tab, as some browsers restrict cookies inside iframes.`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutCrm();
      setUser(null);
      setToken(null);
      setSyncedLeads([]);
      showFeedback("success", "Logged out from Admissions CRM portal.");
    } catch (e) {
      showFeedback("error", "Failed to terminate active session");
    }
  };

  const handleCreateNewSheet = async () => {
    if (!token) return;
    try {
      setSheetLoading(true);
      const newId = await createCrmSpreadsheet(token);
      setSpreadsheetId(newId);
      setSpreadsheetInput(newId);
      showFeedback("success", "Google Sheet CRM created & formatted successfully!");
    } catch (e: any) {
      showFeedback("error", e?.message || "Failed to deploy new spreadsheet");
    } finally {
      setSheetLoading(false);
    }
  };

  const handleSaveSpreadsheetLink = () => {
    const trimmed = spreadsheetInput.trim();
    setSavedSpreadsheetId(trimmed);
    setSpreadsheetId(trimmed);
    showFeedback("success", trimmed ? "Linked existing CRM Spreadsheet ID." : "Disconnected Spreadsheet ID.");
  };

  const loadSpreadsheetLeads = async () => {
    if (!token || !spreadsheetId) return;
    try {
      setLeadsLoading(true);
      const rows = await fetchLeadsFromSheet(spreadsheetId, token);
      setSyncedLeads(rows);
      
      // Initialize editing notes with fetched values
      const notesMap: Record<number, string> = {};
      rows.forEach(r => {
        notesMap[r.rowIndex] = r.notes;
      });
      setEditingNotes(notesMap);
    } catch (e: any) {
      showFeedback("error", `CRM Data Sync Conflict: ${e?.message || "Could not fetch rows"}`);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleSyncLocalQueue = async () => {
    if (!token || !spreadsheetId) {
      showFeedback("error", "Authenticate and configure a CRM Spreadsheet ID to register leads.");
      return;
    }
    if (localQueue.length === 0) return;

    try {
      setLeadsLoading(true);
      // We sync in a logical confirmation flow
      const confirmSync = window.confirm(`Deploy & sync ${localQueue.length} offline registration lead(s) to the designated Google Sheet?`);
      if (!confirmSync) {
        setLeadsLoading(false);
        return;
      }

      await syncLeadsToSheet(spreadsheetId, token, localQueue);
      
      // Clear localStorage lead queue
      saveLocalLeads([]);
      setLocalQueue([]);
      
      showFeedback("success", "Successfully deployed local leads to Google Sheet!");
      await loadSpreadsheetLeads();
    } catch (e: any) {
      showFeedback("error", `Sync Failed: ${e?.message || "Upload failed"}`);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleUpdateStatus = async (rowIndex: number, newStatus: string) => {
    if (!token || !spreadsheetId) return;
    try {
      setUpdatingRowIndex(rowIndex);
      await updateLeadCellInSheet(spreadsheetId, token, rowIndex, "F", newStatus);
      
      // Update local state directly to prevent a full reload
      setSyncedLeads(prev => 
        prev.map(item => item.rowIndex === rowIndex ? { ...item, status: newStatus } : item)
      );

      showFeedback("success", "Lead status updated inside Google Sheets!");
    } catch (e: any) {
      showFeedback("error", `Failed updating cell cell: ${e?.message}`);
    } finally {
      setUpdatingRowIndex(null);
    }
  };

  const handleSaveNotes = async (rowIndex: number) => {
    if (!token || !spreadsheetId) return;
    const noteText = editingNotes[rowIndex] || "";
    try {
      setSavingNoteRowIndex(rowIndex);
      await updateLeadCellInSheet(spreadsheetId, token, rowIndex, "H", noteText);
      
      // Update local state notes
      setSyncedLeads(prev => 
        prev.map(item => item.rowIndex === rowIndex ? { ...item, notes: noteText } : item)
      );

      showFeedback("success", "Counselor notes synced with CRM cell!");
    } catch (e: any) {
      showFeedback("error", `Failed storing note: ${e?.message}`);
    } finally {
      setSavingNoteRowIndex(null);
    }
  };

  const handleClearLocalQueueAndWipe = () => {
    const confirmWipe = window.confirm("Are you sure you want to clear the unsynced local leads cache? This deletes offline simulations locally.");
    if (confirmWipe) {
      saveLocalLeads([]);
      setLocalQueue([]);
      showFeedback("success", "Wiped local cached queue.");
    }
  };

  // Trigger WhatsApp action with high-fidelity personalization template
  const getWhatsAppLink = (name: string, phone: string, course: string) => {
    // Strip standard prefixes to normalise dialing code format
    const cleanedPhone = phone.replace(/[^0-9+]/g, "");
    const msg = `Hi ${name || "there"}, this is Anand Gupta, Admissions Coordinator from Asian International University (AIU). I received your inquiry about the [${course || "Animation & Multimedia"}] course. Let me know when you are available for a brief documentation guidance and registration eligibility checkup. Thank you!`;
    return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(msg)}`;
  };

  const filteredSyncedLeads = syncedLeads.filter(l => 
    l.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
    l.phone.includes(leadsSearch) ||
    l.course.toLowerCase().includes(leadsSearch.toLowerCase()) ||
    l.status.toLowerCase().includes(leadsSearch.toLowerCase()) ||
    l.notes.toLowerCase().includes(leadsSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/[0.01] rounded-full blur-3xl pointer-events-none" />
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] uppercase font-mono font-bold bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-md tracking-wider">
              GOOGLE SHEETS CRM ACTIVE
            </span>
            <span className="text-[10px] uppercase font-mono font-light text-slate-400">
              For Anand K Gupta
            </span>
          </div>
          <h3 className="font-display font-black text-lg md:text-xl tracking-tight text-white flex items-center gap-2 uppercase">
            <Database className="w-5 h-5 text-emerald-400 stroke-[2.5]" /> WhatsApp CRM Lead Pipeline
          </h3>
          <p className="text-slate-400 text-xs font-light max-w-xl">
            Integrate all student inquiry request forms from this website directly to google spreadsheet leads, then manage status updates, make direct dialer telephone checkups, or click to start individual WhatsApp counseling chats instantly.
          </p>
        </div>

        {/* Auth Button */}
        {user ? (
          <div className="flex items-center gap-3 bg-slate-850 p-2.5 rounded-xl border border-slate-801 border-slate-800">
            <div className="text-right">
              <span className="text-[9px] font-mono text-emerald-400 block font-bold">COUNSELOR SESSION ACTIVE</span>
              <span className="text-[10.5px] font-semibold text-white block max-w-[160px] truncate">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout Session"
              className="p-1 px-2.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-300 rounded-lg text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 cursor-pointer border-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-xs font-mono font-bold uppercase px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer border-none shadow-lg shadow-emerald-950/20"
          >
            {authLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.899 0 9.82-4.116 9.82-9.989 0-.671-.073-1.18-.16-1.506H12.24z"/>
              </svg>
            )}
            Sign In with Google
          </button>
        )}
      </div>

      {feedbackMsg && (
        <div className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 animate-slideUp ${
          feedbackMsg.type === "success" 
            ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
            : "bg-rose-950/40 border-rose-500/30 text-rose-300"
        }`}>
          <CheckCircle className={`w-4.5 h-4.5 ${feedbackMsg.type === "success" ? "text-emerald-400" : "text-rose-400"}`} />
          {feedbackMsg.text}
        </div>
      )}

      {!user ? (
        <div className="py-12 text-center space-y-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/35 px-4">
          <Database className="w-12 h-12 mx-auto stroke-[1.2] text-slate-700 animate-pulse" />
          <div className="max-w-md mx-auto space-y-1">
            <h4 className="font-bold text-sm text-slate-250">CRM Administrator Login Required</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Sign in with your registered Google account to connect the core Sheets CRM module. This will authorize permissions to securely query, create spreadsheets, and append registration records.
            </p>
          </div>
          
          <div className="inline-block">
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="inline-flex bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase px-6 py-3 rounded-xl transition-all items-center gap-2.5 cursor-pointer border-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${authLoading ? "animate-spin" : ""}`} />
              Authorize Administrator Access
            </button>
          </div>

          <div className="max-w-md mx-auto p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-left space-y-2 mt-4">
            <h5 className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
              ⚠️ Embedded Preview Notice
            </h5>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              Browsers often prevent authentication pop-up windows or third-party cookies inside embedded sandboxed <strong>iFrames</strong>.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              If the login box closes instantly, or if you get a cancelled error, simply click below to copy the direct app link, paste it in a <strong>New Tab</strong>, and sign in successfully:
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-mono text-slate-400 select-all w-full focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showFeedback("success", "Direct app link copied! Paste in a new browser tab to login.");
                }}
                className="bg-emerald-950 text-emerald-400 hover:bg-emerald-900 hover:text-white text-[10px] items-center shrink-0 uppercase font-mono font-bold px-3 py-1.5 rounded transition-all cursor-pointer border-none"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* STEP 2: Configure Spreadsheet Destination */}
          <div className="bg-slate-850 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">SPREADSHEET DATABASE DESTINATION:</span>
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                {spreadsheetId ? (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    Spreadsheet CRM Configured
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                    Configure Spreadsheet Location
                  </>
                )}
              </h4>
              {spreadsheetId && (
                <p className="text-[11px] font-mono text-slate-400 truncate max-w-[280px] lg:max-w-md">
                  Sheet ID: <span className="text-slate-300 font-bold select-all bg-slate-900 border border-slate-800 px-1 py-0.5 rounded">{spreadsheetId}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste existing spreadsheet ID"
                  value={spreadsheetInput}
                  onChange={(e) => setSpreadsheetInput(e.target.value)}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl text-[11px] focus:outline-none focus:border-emerald-400 w-full md:w-56"
                />
                <button
                  type="button"
                  onClick={handleSaveSpreadsheetLink}
                  className="bg-slate-850 hover:bg-slate-700 text-white font-mono px-3 py-2 rounded-xl text-[10px] font-bold border border-slate-700 cursor-pointer"
                >
                  Map ID
                </button>
              </div>

              {!spreadsheetId && (
                <button
                  onClick={handleCreateNewSheet}
                  disabled={sheetLoading}
                  className="bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-mono font-bold text-[10px] uppercase py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-sm"
                >
                  {sheetLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                  Create CRM Sheet Template
                </button>
              )}

              {spreadsheetId && (
                <a
                  href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-750 px-4 py-2.5 rounded-xl font-mono text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 no-underline cursor-pointer"
                >
                  Open Google Sheet
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* LOCAL OFFLINE LEADS QUEUE */}
          {localQueue.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-500/20 p-5 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-4.5 h-4.5 animate-bounce stroke-[2.5]" />
                    {localQueue.length} Lead(s) in Offline / Local Sync Queue
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light">
                    These registration inquiries were captured while browsing, or completed on your device. Sync them to post these rows to your active spreadsheet.
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleClearLocalQueueAndWipe}
                    className="flex-1 sm:flex-none bg-transparent hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 p-2.5 px-3.5 rounded-xl border border-slate-800 hover:border-rose-900 font-mono text-[10px] font-bold uppercase cursor-pointer"
                  >
                    Discard Queue
                  </button>
                  <button
                    onClick={handleSyncLocalQueue}
                    className="flex-1 sm:flex-none bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-xl font-mono text-[10.5px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 border-none cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    Upload & Sync Sheet CRM
                  </button>
                </div>
              </div>

              {/* Mini List Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[180px] overflow-y-auto pr-1">
                {localQueue.map((item, index) => (
                  <div key={item.id} className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex justify-between gap-3 items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-white leading-none">{item.name}</span>
                        <span className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-slate-850 text-slate-400 leading-none">{item.timestamp}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1.5">
                        📞 {item.phone} | 🎓 {item.course}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <a
                        href={`tel:${item.phone}`}
                        title="Voice Call"
                        className="p-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-300" />
                      </a>
                      <a
                        href={getWhatsAppLink(item.name, item.phone, item.course)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Launch WhatsApp chat"
                        className="p-1.5 bg-emerald-950/50 hover:bg-emerald-900 hover:text-emerald-450 text-emerald-400 rounded-lg transition-colors border border-emerald-800/40 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SYNCED SHEET LEADS VIEWER GRID */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-emerald-400 stroke-[2]" /> Live CRM Synced Registry ({filteredSyncedLeads.length} leads)
                </h4>
                <p className="text-[11px] text-slate-400 font-light">
                  Showing rows read directly from your synced Google Sheet. Updating status or typing comments will rewrite cells inside Google Sheets instantly.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Filter sheet leads..."
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl px-3.5 py-2 pl-8 text-[11px] placeholder:text-slate-600 font-light focus:outline-none focus:border-emerald-500"
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-600" />
                </div>

                <button
                  onClick={loadSpreadsheetLeads}
                  disabled={leadsLoading || !spreadsheetId}
                  title="Reload rows from Sheet"
                  className="p-2.5 bg-slate-850 hover:bg-slate-800 text-white rounded-xl border border-slate-750 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${leadsLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* LEADS GRID TABLE */}
            {!spreadsheetId ? (
              <div className="py-12 text-center text-slate-500 border border-dashed border-slate-850 rounded-2xl font-mono text-[10.5px]">
                Please link or create a CRM spreadsheet above to inspect live counselor logs.
              </div>
            ) : leadsLoading && syncedLeads.length === 0 ? (
              <div className="py-16 text-center space-y-3 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                <RefreshCw className="w-6 h-6 mx-auto text-emerald-400 animate-spin" />
                <p className="text-xs font-mono text-slate-400">Syncing lead tables from Google Sheets...</p>
              </div>
            ) : filteredSyncedLeads.length === 0 ? (
              <div className="py-12 text-center text-slate-500 border border-dashed border-slate-850 rounded-2xl font-mono text-[10.5px]">
                {leadsSearch ? "No matching records found in sheet query." : "Admissions CRM contains 0 rows. Try submitting a counseling request on the page!"}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredSyncedLeads.map((item) => (
                  <div 
                    key={item.rowIndex} 
                    className="bg-slate-850/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all space-y-3.5 relative"
                  >
                    
                    {/* Top Row: Lead meta and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[12.5px] font-black text-white leading-none">{item.name}</span>
                          <span className="text-[8px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 leading-none">
                            Row {item.rowIndex}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            ⏱️ {item.timestamp}
                          </span>
                        </div>
                        <div className="text-[10.5px] font-medium text-slate-300">
                          🎓 Preferred Course: <span className="text-amber-300 font-bold">{item.course}</span>
                        </div>
                      </div>

                      {/* WhatsApp and Call button wrappers */}
                      <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0 justify-end">
                        <a
                          href={`tel:${item.phone}`}
                          title={`Voice call ${item.name}`}
                          className="flex h-9 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase transition-all no-underline cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-300" />
                          <span className="hidden xs:inline">{item.phone}</span>
                        </a>

                        <a
                          href={getWhatsAppLink(item.name, item.phone, item.course)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Message ${item.name} on WhatsApp`}
                          className="flex h-9 px-3 bg-emerald-600 hover:bg-emerald-550 border border-emerald-700 text-white rounded-xl items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase transition-all no-underline cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          WhatsApp Lead
                        </a>
                      </div>
                    </div>

                    {/* Bottom Row: Editable lead status & comments note */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-800/65 items-center">
                      
                      {/* Interactive dynamic lead status dropdown */}
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Leads Workflow Status:</label>
                        <div className="relative">
                          <select
                            value={item.status}
                            disabled={updatingRowIndex === item.rowIndex}
                            onChange={(e) => handleUpdateStatus(item.rowIndex, e.target.value)}
                            className={`w-full bg-slate-900 border text-[11px] font-bold rounded-xl px-2.5 py-1.5 focus:outline-none appearance-none cursor-pointer pr-8 ${
                              item.status === "New Lead" ? "border-sky-500/30 text-sky-400" :
                              item.status === "In Conversation" ? "border-amber-400/30 text-amber-300" :
                              item.status === "Highly Interested" ? "border-yellow-500/40 text-yellow-300 animate-pulse" :
                              item.status === "Documents Checked" ? "border-purple-500/30 text-purple-400" :
                              item.status === "Admission Done" ? "border-emerald-500/35 text-emerald-400 bg-emerald-950/15" :
                              "border-slate-700 text-slate-500"
                            }`}
                          >
                            <option value="New Lead">🆕 New Lead</option>
                            <option value="In Conversation">🗣️ In Conversation</option>
                            <option value="Highly Interested">🔥 Highly Interested</option>
                            <option value="Documents Checked">🗄️ Documents Checked</option>
                            <option value="Admission Done">✅ Admission Done</option>
                            <option value="Cancelled">❌ Cancelled Lead</option>
                          </select>
                          {updatingRowIndex === item.rowIndex && (
                            <div className="absolute inset-y-0 right-2.5 m-auto w-3.5 h-3.5 border-t-2 border-emerald-400 rounded-full animate-spin" />
                          )}
                        </div>
                      </div>

                      {/* Interactive comments block */}
                      <div className="md:col-span-8 space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Counselor Notes / Follow-up Details:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type progress notes (e.g., student wants 10% waiver)..."
                            value={editingNotes[item.rowIndex] ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingNotes(prev => ({ ...prev, [item.rowIndex]: val }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSaveNotes(item.rowIndex);
                              }
                            }}
                            className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-750 px-3 py-1.5 rounded-xl text-[11px] text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-amber-405 focus:border-amber-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveNotes(item.rowIndex)}
                            disabled={savingNoteRowIndex === item.rowIndex}
                            title="Save inquiry comments note to Spreadsheet cell"
                            className="bg-slate-800 hover:bg-slate-700 text-white p-2 px-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                          >
                            {savingNoteRowIndex === item.rowIndex ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5 text-slate-300" />
                            )}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
