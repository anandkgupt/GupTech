import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import CrmAdminPanel from "./components/CrmAdminPanel";
import { 
  addLocalLead, 
  getActiveToken, 
  getSavedSpreadsheetId, 
  syncLeadsToSheet,
  initAuthListener,
  signInWithGoogle,
  logoutCrm
} from "./lib/sheetsCrm";
import { 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Activity,
  ShieldCheck,
  ChevronRight,
  Globe,
  Wrench,
  Zap,
  Palette,
  MessageSquare,
  ShoppingBag,
  Check,
  Mail,
  Heart,
  Download,
  Info,
  Calendar,
  Calculator,
  BookOpen,
  Award,
  Sparkles,
  TrendingUp,
  Search,
  GraduationCap,
  Database,
  LogIn,
  LogOut
} from "lucide-react";

// Curated lists representing our essential capability tracks 
interface SimpleService {
  id: string;
  category: string;
  icon: any;
  name: string;
  desc: string;
  price: number;
  durationDays: number;
}

const CORE_SERVICES: SimpleService[] = [
  // websites & tech
  { id: "s1", category: "Websites & Tech Setup", icon: Globe, name: "Standard Business Website", desc: "Clean 3-page layout outlining services, contact form, and story", price: 4500, durationDays: 14 },
  { id: "s2", category: "Websites & Tech Setup", icon: Wrench, name: "Secure Maintenance & Backups", desc: "Automatic daily backups, password protections, and crash support", price: 800, durationDays: 3 },
  { id: "s3", category: "Websites & Tech Setup", icon: Zap, name: "Instant Speed Optimization", desc: "Compresses layouts and visual assets to load web pages instantly on custom phones", price: 1800, durationDays: 4 },
  
  // marketing
  { id: "s4", category: "Marketing & Growth", icon: Globe, name: "Google Local SEO Setup", desc: "Ranks your address and name higher in Google searches inside your city", price: 2200, durationDays: 10 },
  { id: "s5", category: "Marketing & Growth", icon: Globe, name: "Google Map Profile Creator", desc: "Optimizes location on Google Maps for local neighborhood walk-ins", price: 1200, durationDays: 7 },
  { id: "s6", category: "Marketing & Growth", icon: Mail, name: "Auto welcome newsletters builder", desc: "Automated discounts and friendly newsletters sent to new signups", price: 3500, durationDays: 15 },
  
  // design & brand
  { id: "s7", category: "Creative Branding & Design", icon: Palette, name: "Logo & Brand Style Kit", desc: "Stunning professional logo creation with warm colors and font schemes", price: 2500, durationDays: 8 },
  { id: "s8", category: "Creative Branding & Design", icon: Palette, name: "Flyers & Printed Assets", desc: "High contrast custom layout files ready-to-print directly onto cards or panels", price: 1200, durationDays: 7 },
  
  // automation
  { id: "s9", category: "Smart Tools & Chatbots", icon: MessageSquare, name: "AI Web Chatbot Helper", desc: "An intelligent automated chat block to answer recurrent client queries", price: 8500, durationDays: 15 },
  { id: "s10", category: "Smart Tools & Chatbots", icon: Zap, name: "No-Code Tasks Sync Bridge", desc: "Connects your contact inputs directly with spreadsheets, phones, or Gmail", price: 3000, durationDays: 7 },
  
  // e-commerce
  { id: "s11", category: "Online Store & Sales", icon: ShoppingBag, name: "Custom Shopify Setup", desc: "Self-managed store layout with product arrays and clean digital invoices", price: 5500, durationDays: 12 },
  { id: "s12", category: "Online Store & Sales", icon: ShoppingBag, name: "Checkout & Cart Recovery Guide", desc: "Emails reminders to people who abandoned products in their lists", price: 2800, durationDays: 7 }
];

export interface AiuCourse {
  name: string;
  category: "Certificate" | "UG" | "PG" | "Research";
  duration: string;
  eligibility: string;
}

export const AIU_COURSES: AiuCourse[] = [
  // Certificate Courses (6 Months)
  { name: "Certificate in Animation", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in 2D Animation", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in 3D Animation", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Graphic Designing", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Video Editing", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Visual Effects (VFX)", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Motion Graphics", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Gaming Design", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Web & Multimedia", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Certificate in Digital Photography", category: "Certificate", duration: "6 Months", eligibility: "10+2 (Any Stream) or Equivalent" },

  // UG Courses (3 Years)
  { name: "B.Sc. Animation & Multimedia", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.A. Animation & Graphic Design", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.Sc. VFX & Animation", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.Des. Multimedia Design", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.Sc. Game Design & Development", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "BCA Animation & Gaming", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.Sc. Film Making & Editing", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "Bachelor in Digital Media", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.Sc. Multimedia & Web Technology", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },
  { name: "B.A. Film & Television Production", category: "UG", duration: "3 Years", eligibility: "10+2 (Any Stream) or Equivalent" },

  // PG Courses (2 Years)
  { name: "M.Sc. Animation & Multimedia", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.A. Animation Studies", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.Sc. VFX & Digital Media", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.Des. Multimedia & Design", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.Sc. Game Design & Development", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "MCA Animation & Multimedia", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.Sc. Film Production", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "Master in Digital Arts", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "M.A. Digital Communication", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },
  { name: "Master in Visual Communication", category: "PG", duration: "2 Years", eligibility: "Bachelor's Degree in Relevant Field or Equivalent" },

  // Research Programs (3 Years)
  { name: "Ph.D. in Animation & Multimedia", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Visual Effects", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Digital Media", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Film & Multimedia", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Animation Technology", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Interactive Media", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Gaming Technology", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Graphic Communication", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Creative Media", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" },
  { name: "Ph.D. in Multimedia Design", category: "Research", duration: "3 Years", eligibility: "Post Graduation Degree or Equivalent" }
];

export interface ThemeConfig {
  id: "pearl" | "crema" | "mint" | "lavender" | "frost";
  name: string;
  icon: string;
  badge: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBg: string;
  heroBg: string;
  textDark: string;
  textLight: string;
  borderSubtle: string;
}

export const GRAPHIC_THEMES: Record<string, ThemeConfig> = {
  pearl: {
    id: "pearl",
    name: "Pure Pearl Showcase",
    icon: "⚪",
    badge: "Light Crisp",
    primaryColor: "#0f172a", // Deep slate
    accentColor: "#d97706", // Amber
    bgColor: "#ffffff",
    cardBg: "#f8fafc",
    heroBg: "#f8fafc",
    textDark: "#0c1530",
    textLight: "#475569",
    borderSubtle: "#e2e8f0"
  },
  crema: {
    id: "crema",
    name: "Warm Desert Crema",
    icon: "🟡",
    badge: "Warm Sand",
    primaryColor: "#7c2d12", // Terracotta
    accentColor: "#d97706", // Amber
    bgColor: "#faf6ee", // Rich warm tone
    cardBg: "#f4ede0",
    heroBg: "#f1ead9",
    textDark: "#431407",
    textLight: "#7c2d12",
    borderSubtle: "#e9dfcb"
  },
  mint: {
    id: "mint",
    name: "Gardenia Mint",
    icon: "🟢",
    badge: "Aloe Green",
    primaryColor: "#0d9488", // Teal
    accentColor: "#115e59", // Spruce forest
    bgColor: "#f1fbf7", // Light mint aloe
    cardBg: "#e2f1ea",
    heroBg: "#def3e7",
    textDark: "#042f2e",
    textLight: "#0f766e",
    borderSubtle: "#cbdad2"
  },
  lavender: {
    id: "lavender",
    name: "Lavender Mist",
    icon: "🟣",
    badge: "Lilac Violet",
    primaryColor: "#6b21a8", // Deep Violet
    accentColor: "#a855f7", // Lilac purple
    bgColor: "#f7f5fd", // Soft lavender field
    cardBg: "#efe9fc",
    heroBg: "#e7ddfc",
    textDark: "#260e4c",
    textLight: "#6b21a8",
    borderSubtle: "#decffa"
  },
  frost: {
    id: "frost",
    name: "Glacier Frost",
    icon: "🔵",
    badge: "Cool Arctic",
    primaryColor: "#1d4ed8", // Sapphire Blue
    accentColor: "#0ea5e9", // Bright Ice Cyan
    bgColor: "#f0f4fa", // Electric ice
    cardBg: "#e1ecf7",
    heroBg: "#d5e3f7",
    textDark: "#0a1e4c",
    textLight: "#1d4ed8",
    borderSubtle: "#c7dcf0"
  }
};

export default function App() {
  const [activePage, setActivePage] = useState<"home" | "services" | "learning" | "about">("home");
  
  // Counselor CRM unified auth state
  const [crmUser, setCrmUser] = useState<any>(null);
  const [crmToken, setCrmToken] = useState<string | null>(null);
  const [crmAuthLoading, setCrmAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = initAuthListener(
      (user, token) => {
        setCrmUser(user);
        setCrmToken(token);
        setCrmAuthLoading(false);
      },
      () => {
        setCrmUser(null);
        setCrmToken(null);
        setCrmAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const navigateAndScrollToCrm = () => {
    setActivePage("learning");
    setTimeout(() => {
      document.getElementById("aiu-admissions")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [speed, setSpeed] = useState<"standard" | "rush">("standard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [showInvoiceAlert, setShowInvoiceAlert] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Page theme style configuration state
  const [pageTheme, setPageTheme] = useState<"pearl" | "crema" | "mint" | "lavender" | "frost">("pearl");

  // States for interactive Learning Page tech diagnostics
  const [quizBusiness, setQuizBusiness] = useState("retail");
  const [quizMapOk, setQuizMapOk] = useState<boolean | null>(null);
  const [quizSpeedOk, setQuizSpeedOk] = useState<boolean | null>(null);
  const [quizAutomatedChat, setQuizAutomatedChat] = useState<boolean | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResultText, setQuizResultText] = useState("");

  // States for University Admission Catalog & Counselor Guidance section
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<"all" | "Certificate" | "UG" | "PG" | "Research">("all");
  const [admissionName, setAdmissionName] = useState("");
  const [admissionEmail, setAdmissionEmail] = useState("");
  const [admissionPhone, setAdmissionPhone] = useState("");
  const [admissionCourse, setAdmissionCourse] = useState("");
  const [admissionSubmitted, setAdmissionSubmitted] = useState(false);
  const [admissionShowAlert, setAdmissionShowAlert] = useState(false);

  // Load selection state from URL if present for seamless deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const servicesRaw = params.get("services");
    if (servicesRaw) {
      const ids = servicesRaw.split(",").filter(id => CORE_SERVICES.some(s => s.id === id));
      setSelectedIds(ids);
    }
    const speedRaw = params.get("speed");
    if (speedRaw === "rush") setSpeed("rush");
    if (params.get("name")) setName(params.get("name") || "");
    if (params.get("email")) setEmail(params.get("email") || "");
    if (params.get("company")) setCompany(params.get("company") || "");
    
    const pageRaw = params.get("page");
    if (pageRaw === "about" || pageRaw === "services" || pageRaw === "learning" || pageRaw === "home") {
      setActivePage(pageRaw as any);
    }

    const themeRaw = params.get("theme");
    if (themeRaw === "pearl" || themeRaw === "crema" || themeRaw === "mint" || themeRaw === "lavender" || themeRaw === "frost") {
      setPageTheme(themeRaw as any);
    }
  }, []);

  // Update URL automatically whenever state transitions
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", activePage);
    if (selectedIds.length > 0) {
      params.set("services", selectedIds.join(","));
    }
    if (speed === "rush") params.set("speed", "rush");
    if (name) params.set("name", name);
    if (email) params.set("email", email);
    if (company) params.set("company", company);
    if (pageTheme !== "pearl") {
      params.set("theme", pageTheme);
    }

    const query = params.toString();
    const newUrl = `${window.location.pathname}${query ? "?" + query : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [activePage, selectedIds, speed, name, email, company, pageTheme]);

  const handleToggleService = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const selectedServices = CORE_SERVICES.filter(s => selectedIds.includes(s.id));
  const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const speedMultiplier = speed === "rush" ? 1.3 : 1.0;
  const totalPrice = Math.round(subtotal * speedMultiplier);
  
  // Parallel setup timeline estimation (scaling factor of 0.65 for parallel works)
  const totalDaysRaw = selectedServices.reduce((sum, s) => sum + s.durationDays, 0);
  const estimatedDays = Math.max(
    selectedServices.length > 0 ? 5 : 0, 
    Math.round(totalDaysRaw * 0.65 * (speed === "rush" ? 0.7 : 1.0))
  );

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const downloadPdf = () => {
    if (selectedServices.length === 0) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    let y = 20;

    // PAGE ACCENT
    doc.setDrawColor(12, 74, 110);
    doc.setLineWidth(1.2);
    doc.line(15, 12, 195, 12);

    // BRAND LOGO
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(11, 21, 54);
    doc.text("Factlive Tech", 15, 23);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110, 125, 140);
    doc.text("CUSTOM DIGITAL TECHNOLOGY PROPOSAL & ESTIMATE", 15, 28);

    // DATE
    const nowStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    doc.setFontSize(9);
    doc.text(`DATE GENERATED: ${nowStr}`, 195, 23, { align: "right" });
    doc.text(`PLAN UNIQUE ID: FLT-${Math.floor(100000 + Math.random() * 900000)}`, 195, 28, { align: "right" });

    // DIVIDER
    doc.setDrawColor(220, 225, 230);
    doc.setLineWidth(0.5);
    doc.line(15, 33, 195, 33);

    y = 42;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("ESTIMATED ENGAGEMENT DETAILS", 15, y);
    y += 7;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(70, 80, 95);
    doc.text(`Client Representative: ${name || "Valued Customer"}`, 15, y);
    doc.text(`Company/Shop Name: ${company || "Local Business Plan"}`, 110, y);
    y += 5;
    doc.text(`Contact Address: ${email || "No contact address provided"}`, 15, y);
    y += 10;

    // COLUMN HEADERS
    doc.setDrawColor(230, 235, 240);
    doc.setFillColor(248, 250, 252);
    doc.rect(15, y, 180, 8, "FD");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(11, 21, 54);
    doc.text("Service Deliverable", 18, y + 5.5);
    doc.text("Category", 110, y + 5.5);
    doc.text("Baseline Price", 185, y + 5.5, { align: "right" });
    y += 12;

    // ITEMS
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    selectedServices.forEach(s => {
      doc.text(s.name, 18, y);
      doc.text(s.category, 110, y);
      doc.text(`$${s.price.toLocaleString()}`, 185, y, { align: "right" });
      y += 6;
    });

    y += 4;
    doc.setDrawColor(220, 225, 230);
    doc.line(15, y, 195, y);
    y += 8;

    // TOTAL CALCULATIONS
    doc.setFont("Helvetica", "bold");
    doc.text("Delivery Speed Status:", 120, y);
    doc.setFont("Helvetica", "normal");
    doc.text(speed === "rush" ? "Express Rush (30% Faster Setup)" : "Standard Delivery Timing", 160, y);
    y += 6;

    doc.setFont("Helvetica", "bold");
    doc.text("Estimated Setup Timeline:", 120, y);
    doc.setFont("Helvetica", "normal");
    doc.text(`~${estimatedDays} Sprints Days`, 165, y);
    y += 6;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(12, 74, 110);
    doc.text("ESTIMATED GRAND TOTAL:", 120, y);
    doc.text(`$${totalPrice.toLocaleString()}`, 195, y, { align: "right" });

    y += 15;
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text("This SOW is a customized, digital estimate proposal outlining specific technological modules checked by the client.", 15, y);
    y += 4.5;
    doc.text("We do not add hidden fees or setup premiums. Contact hello@factlivetech.com to finalize your workspace deployment.", 15, y);

    // Save
    doc.save(`${company ? company.toLowerCase().replace(/[^a-z0-9]/g, "_") : "factlive_tech"}_estimate.pdf`);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setShowInvoiceAlert(true);
    setTimeout(() => setShowInvoiceAlert(false), 6000);
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionName || !admissionPhone || !admissionCourse) {
      return;
    }
    
    // Add lead to local inquiry storage
    addLocalLead({
      name: admissionName,
      phone: admissionPhone,
      email: admissionEmail,
      course: admissionCourse
    });

    // Check if coordinator is signed in on this current browser, then autosync straight to Google Sheets
    const token = getActiveToken();
    const sheetId = getSavedSpreadsheetId();
    if (token && sheetId) {
      syncLeadsToSheet(sheetId, token, [{
        id: `lead_${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString("en-US", { hour12: false }),
        name: admissionName,
        phone: admissionPhone,
        email: admissionEmail,
        course: admissionCourse,
        status: "New Lead",
        notes: "",
        counselor: "Anand K Gupta"
      }]).catch((err) => {
        console.error("Admissions CRM background autosync failed:", err);
      });
    }

    setAdmissionSubmitted(true);
    setAdmissionShowAlert(true);
    setTimeout(() => {
      setAdmissionShowAlert(false);
    }, 8000);
  };

  const currentTheme = GRAPHIC_THEMES[pageTheme];

  const dynamicStyles = `
    body {
      background-color: ${currentTheme.bgColor} !important;
      color: ${currentTheme.textDark} !important;
      transition: background-color 300ms ease, color 300ms ease;
    }
    .theme-style-root {
      background-color: ${currentTheme.bgColor} !important;
      color: ${currentTheme.textDark} !important;
      transition: background-color 300ms ease, color 300ms ease;
    }
    /* Simple sections backgrounds mapping to transparent */
    section, header, footer, main {
      background-color: transparent !important;
    }
    nav.sticky {
      background-color: ${currentTheme.bgColor}ee !important;
      border-bottom-color: ${currentTheme.borderSubtle} !important;
    }
    .bg-white, .bg-white\\/95 {
      background-color: ${currentTheme.bgColor} !important;
    }
    .bg-slate-50, .bg-slate-100, .bg-[#0a1128], .bg-[#0c1017], .bg-[#0a1128]/60, .bg-slate-900, .bg-slate-850/40, .bg-slate-850, #aiu-admissions, .bg-slate-850\\/40, #admission-form {
      background-color: ${currentTheme.cardBg} !important;
      border-color: ${currentTheme.borderSubtle} !important;
    }
    .border-slate-150, .border-slate-100, .border-slate-200, .border-slate-700, .border-slate-800, .border-slate-850, .border-amber-300, .border-slate-250 {
      border-color: ${currentTheme.borderSubtle} !important;
    }
    /* Global labels formatting adaptiveness */
    .text-slate-900, .text-slate-950, .text-slate-800, .text-white, .text-neutral-50, .text-slate-50, .text-neutral-100, .text-slate-100, .text-neutral-200, .text-slate-250, .text-slate-200, h1, h1 span, h2, h3, h4, h5, h6, .text-slate-100 strong {
      color: ${currentTheme.textDark} !important;
    }
    .text-slate-500, .text-slate-600, .text-slate-400, .text-neutral-300, .text-slate-300, .text-neutral-400, p {
      color: ${currentTheme.textLight} !important;
    }
    /* Highlight color categories */
    .text-amber-400, .text-amber-450, .text-cyan-600, .text-emerald-600, .text-purple-600, .text-orange-600 {
      color: ${currentTheme.primaryColor} !important;
    }
    .bg-amber-100, .bg-cyan-50, .bg-emerald-50, .bg-purple-50, .bg-orange-50 {
      background-color: ${currentTheme.cardBg} !important;
      border-color: ${currentTheme.borderSubtle} !important;
    }
    /* Input backgrounds and options integration */
    input, select, textarea, option {
      background-color: ${currentTheme.bgColor} !important;
      border-color: ${currentTheme.borderSubtle} !important;
      color: ${currentTheme.textDark} !important;
    }
    /* Accent highlights buttons */
    button.bg-slate-900, a.bg-slate-900, button.bg-sky-400, .bg-sky-400, .bg-amber-400, button.bg-amber-400, .bg-slate-100, button[type="submit"] {
      background-color: ${currentTheme.primaryColor} !important;
      color: #ffffff !important;
      border-color: transparent !important;
    }
    button.bg-slate-150, button.bg-slate-100 {
      color: ${currentTheme.textDark} !important;
      background-color: ${currentTheme.cardBg} !important;
      border-color: ${currentTheme.borderSubtle} !important;
    }
    button.bg-slate-900:hover, a.bg-slate-900:hover, button.bg-sky-400:hover, .bg-amber-400:hover, button.bg-amber-400:hover, button[type="submit"]:hover {
      background-color: ${currentTheme.accentColor} !important;
      color: #ffffff !important;
    }
    .active-check {
      color: ${currentTheme.accentColor} !important;
    }
  `;

  return (
    <div className="relative min-h-screen bg-white text-slate-800 flex flex-col antialiased font-sans theme-style-root">
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      
      {/* Dynamic & Simple Modern Page Navigation Headers */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          
          {/* Logo element */}
          <button 
            onClick={() => {
              setActivePage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer group bg-transparent border-0 outline-none shrink-0"
          >
            <div className="flex h-5 w-5 rounded-full bg-slate-900 items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-slate-600 transition-colors">
              Factlive Tech
            </span>
          </button>

          {/* PAGE NAVIGATION HEADERS: State based menu selections with highlight states */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActivePage("home")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-150 ${
                activePage === "home"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage("services")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-150 ${
                activePage === "services"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActivePage("learning")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-150 ${
                activePage === "learning"
                  ? "bg-white text-emerald-600 shadow-xs"
                  : "text-slate-500 hover:text-emerald-500"
              }`}
            >
              Learning
            </button>
            <button
              onClick={() => setActivePage("about")}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-150 ${
                activePage === "about"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              About & FAQs
            </button>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* PAGE THEME COLOR SWITCHER */}
            <div className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1.5 rounded-xl border border-slate-200/50">
              <span className="hidden lg:inline-block text-[9.5px] font-mono font-bold text-slate-500 uppercase tracking-widest mr-1">
                Color theme:
              </span>
              <div className="flex items-center gap-1.5">
                {Object.values(GRAPHIC_THEMES).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPageTheme(t.id)}
                    title={`Switch style to ${t.name}`}
                    className={`w-3.5 h-3.5 rounded-full border cursor-pointer transition-all duration-200 relative ${
                      pageTheme === t.id
                        ? "ring-2 ring-slate-900 scale-120 border-white"
                        : "border-slate-300 hover:scale-110"
                    }`}
                    style={{ backgroundColor: t.primaryColor }}
                  >
                    {pageTheme === t.id && (
                      <span className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-white block" />
                    )}
                  </button>
                ))}
              </div>
                   <button
              onClick={() => setActivePage("about")}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900 px-4 py-2 rounded-lg transition-all"
            >
              CONTACT US
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {crmUser ? (
              <button
                type="button"
                id="header-crm-active"
                onClick={navigateAndScrollToCrm}
                className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3.5 py-2 rounded-lg transition-all border border-emerald-200 uppercase"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                CRM ACTIVE
              </button>
            ) : (
              <button
                type="button"
                id="header-crm-login"
                onClick={navigateAndScrollToCrm}
                className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-2 rounded-lg transition-all border border-amber-200 uppercase"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-700" />
                CRM SIGN IN
              </button>
            )}
          </div>
        </div>

        {/* MOBILE PAGE NAVIGATION: visible only on small screens */}
        <div className="md:hidden flex items-center justify-around mt-3 border-t border-slate-100 pt-2 px-4 gap-1">
          <button
            onClick={() => setActivePage("home")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase ${
              activePage === "home" ? "bg-slate-900 text-white" : "text-slate-500"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage("services")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase ${
              activePage === "services" ? "bg-slate-900 text-white" : "text-slate-500"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActivePage("learning")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase ${
              activePage === "learning" ? "bg-slate-900 text-white" : "text-slate-500"
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setActivePage("about")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase ${
              activePage === "about" ? "bg-slate-900 text-white" : "text-slate-500"
            }`}
          >
            About
          </button>
          <button
            onClick={navigateAndScrollToCrm}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase flex items-center gap-1 ${
              crmUser 
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                : "bg-amber-50 text-amber-900 border border-amber-200"
            }`}
          >
            {crmUser ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                CRM
              </>
            ) : (
              <>
                <LogIn className="w-3 h-3 text-amber-700" />
                CRM
              </>
            )}
          </button>
        </div>        </div>
      </nav>

      {/* Main Container with smooth view switcher animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* PAGE VIEW: HOME PAGE */}
          {activePage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-16 pb-12"
            >
              {/* Premium Elegant Hero Banner */}
              <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100 py-16 md:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/[0.04] via-transparent to-transparent pointer-events-none" />
                
                <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full font-bold tracking-wider animate-bounce">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> REVOLUTIONIZING LOCAL BUSINESS INFRASTRUCTURE
                  </span>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">
                    Digital Technology Setup <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-cyan-800 to-slate-900">
                      Done Simpler & Faster
                    </span>
                  </h1>

                  <p className="max-w-2xl mx-auto text-base text-slate-500 font-light leading-relaxed">
                    We equip independent clinics, retail stores, boutiques, and contractor shops with high-performance mobile websites, verified local Google Maps optimization, custom digital branding assets, and smart automatic spreadsheet syncs.
                  </p>

                  {/* Config Alert Pill */}
                  <div className="max-w-xl mx-auto">
                    {selectedIds.length > 0 ? (
                      <button
                        onClick={() => setActivePage("services")}
                        className="w-full inline-flex items-center justify-between gap-3 text-xs bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 px-4 py-3 rounded-xl transition-all font-mono font-bold"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-600" />
                          ACTIVE PLAN SETUP: {selectedIds.length} deliverables selected
                        </span>
                        <span>
                          Review Selection Wishlist ➔
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActivePage("services")}
                        className="w-full inline-flex items-center justify-between gap-3 text-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-705 px-4 py-3 rounded-xl transition-all font-mono font-medium"
                      >
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Info className="w-4 h-4 text-slate-400" />
                          No deliverables checked yet.
                        </span>
                        <span className="text-slate-950 font-bold">
                          Quick-configure standard catalog tracks ➔
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-mono font-bold text-slate-500">
                    <span className="flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-2xs">
                      ✓ No monthly design retainers
                    </span>
                    <span className="flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-2xs">
                      ✓ 100% Ownership & Transfer
                    </span>
                    <span className="flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-2xs">
                      ✓ SOW PDF generation
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION: Admissions Counselor CRM Dashboard Control */}
              <section className="max-w-5xl mx-auto px-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                          OFFICIAL WORKSPACE CONTROL
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
                        <Database className="w-5 h-5 text-amber-400" /> Admissions & Leads CRM Center
                      </h2>
                      <p className="text-slate-400 text-xs font-light max-w-2xl leading-relaxed font-sans">
                        Authorize with your certified Google Sheets and Drive account to activate real-time admissions sync, track dynamic counselor notes, and start WhatsApp counseling dials instantly.
                      </p>
                    </div>

                    <div className="shrink-0 font-sans">
                      {crmUser ? (
                        <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <div className="text-left font-mono">
                            <span className="text-[9px] text-emerald-400 uppercase font-black block">COUNSELOR PORTAL INBOUND</span>
                            <span className="text-xs text-white block max-w-[170px] truncate">{crmUser.email}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <div className="text-left font-mono">
                            <span className="text-[9px] text-slate-500 uppercase font-bold block">CONNECTION SERVICE</span>
                            <span className="text-xs text-slate-450 text-slate-400 block font-light">Status: Offline / Simulation Mode</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body interactive area */}
                  <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4 font-light text-slate-350 text-xs leading-relaxed font-sans">
                      <p>
                        Our technology links inquiry forms directly with a primary Google Spreadsheet on your personal drive without any secondary database servers. All edits, updates, counselor comments, and dial states map natively.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-950/40 border border-slate-850/65 p-3 rounded-xl space-y-1">
                          <h4 className="font-bold text-[11px] text-white font-mono uppercase">🟢 Real-time Append</h4>
                          <p className="text-[10.5px] text-slate-400 font-sans">Newly captured web leads post straight to the top row instantly.</p>
                        </div>
                        <div className="bg-slate-950/40 border border-slate-850/65 p-3 rounded-xl space-y-1">
                          <h4 className="font-bold text-[11px] text-white font-mono uppercase">💬 Direct Dialing</h4>
                          <p className="text-[10.5px] text-slate-400 font-sans">Personalized WhatsApp greetings generated with pre-filled templates in one-click.</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950/50 p-6 rounded-2xl border border-slate-850 text-center space-y-4 font-sans">
                      {crmUser ? (
                        <div className="space-y-4">
                          <h3 className="font-bold text-sm text-white">Active Session Detected</h3>
                          <p className="text-[11px] text-slate-400">You are successfully authenticated. Link your desired Google Spreadsheet and access the live lead pipeline.</p>
                          
                          <button
                            onClick={navigateAndScrollToCrm}
                            className="w-full bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-mono font-bold text-xs py-3 rounded-xl uppercase transition-all shadow-md shadow-emerald-950/30 flex items-center justify-center gap-1.5 cursor-pointer border-none"
                          >
                            🚀 Open Lead Pipeline Dashboard
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h3 className="font-bold text-sm text-white">Authorized Counselor Access</h3>
                          <p className="text-[11px] text-slate-400">Authenticate natively with your Google credentials inside this application to unlock the live workspace.</p>
                          
                          <button
                            onClick={navigateAndScrollToCrm}
                            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs py-3 rounded-xl uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none font-sans"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            Go directly to Sign In Panel
                          </button>

                          <div className="text-[10px] text-slate-500 font-mono">
                            *Embedded iFrames can sometimes prevent auth. Direct tabs are recommended if popup stays blank.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Four Main Technology Capabilities Tracks Grid */}
              <section className="max-w-5xl mx-auto px-6 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono text-cyan-600 uppercase tracking-widest block font-bold">
                    EXPLORE WHAT IS POSSIBLE
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Modern Capabilities Without Agency Retainers
                  </h2>
                  <p className="text-slate-500 font-light text-xs max-w-lg mx-auto">
                    We've bundled the key technical components local companies need into highly optimized flat-rate packages. Select what fits your roadmap.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  
                  {/* Track 1: Web Tech */}
                  <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4 transition-all group">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                        High-Performance Web Engines
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Say goodbye to generic sluggish site builders. We mount customizable, compressed React engines with automated site backups so your boutique handles pages under 2 seconds.
                      </p>
                      <ul className="text-[10px] font-mono text-slate-400 space-y-1 pb-2">
                        <li>• Standard 3-Page Showcases</li>
                        <li>• High-speed Compression Codes</li>
                        <li>• Complete DNS Administration Transfer</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setActivePage("services")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-500 transition-colors uppercase self-start"
                    >
                      Browse Deliverables Track ➔
                    </button>
                  </div>

                  {/* Track 2: Marketing & SEO */}
                  <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4 transition-all group">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        Localized Search Engine Index
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Ranks your retail store address higher inside target neighborhoods. We optimize your physical location markers on Google Maps so local consumers call directly for appointments or walks.
                      </p>
                      <ul className="text-[10px] font-mono text-slate-400 space-y-1 pb-2">
                        <li>• Verified Coordinates Map pins</li>
                        <li>• Direct Citations setup listings</li>
                        <li>• Customer feedback loops structures</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setActivePage("services")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-500 transition-colors uppercase self-start"
                    >
                      Browse Deliverables Track ➔
                    </button>
                  </div>

                  {/* Track 3: Custom Identity Design */}
                  <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4 transition-all group">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                        <Palette className="w-5 h-5 opacity-80" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        Cohesive Creative Branding
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Acquire stunning visual logo kits with consistent hex colors palettes and typography guides. We supply you with high-contrast customizable graphic documents ready to stamp onto shopfront panels or business cards.
                      </p>
                      <ul className="text-[10px] font-mono text-slate-400 space-y-1 pb-2">
                        <li>• Custom Vector Logo Design</li>
                        <li>• Print-Ready Stationery Assets</li>
                        <li>• Digital Color Scheme Handbook</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setActivePage("services")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-cyan-500 transition-colors uppercase self-start"
                    >
                      Browse Deliverables Track ➔
                    </button>
                  </div>

                  {/* Track 4: Task Automation */}
                  <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4 transition-all group">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-605 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                        Spreadsheets & Tasks Automation
                      </h3>
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        Connect input boxes directly to business phones or Gmail spreadsheets. Our simple data bridges transfer online customer requests and emails on weekends automatically with no manual copying tags.
                      </p>
                      <ul className="text-[10px] font-mono text-slate-400 space-y-1 pb-2">
                        <li>• AI Automated FAQ Chat widgets</li>
                        <li>• Contacts spreadsheet integrations</li>
                        <li>• Outgoing auto-newsletter alerts</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setActivePage("services")}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-purple-500 transition-colors uppercase self-start"
                    >
                      Browse Deliverables Track ➔
                    </button>
                  </div>

                </div>
              </section>

              {/* Three-Step Process timeline Infographic Section */}
              <section className="bg-slate-50 border-y border-slate-100 py-12">
                <div className="max-w-5xl mx-auto px-6">
                  
                  <div className="text-center mb-10">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest block font-bold mb-1">
                      NO JARGON TIMELINES
                    </span>
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                      We Build & Handover in 3 Simple Milestones
                    </h2>
                    <p className="text-slate-500 font-light text-xs max-w-md mx-auto mt-1.5">
                      You retain full custody. We transfer root administrative credentials immediately upon completing our setup milestone.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                    
                    {/* step 1 */}
                    <div className="space-y-3">
                      <div className="h-9 w-9 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto shadow-xs">
                        1
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Check Your Deliverables</h4>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                        Browse our transparent digital catalog and select layout sizes, local Google SEO setup modules, or custom visual logos that suit your goals.
                      </p>
                    </div>

                    {/* step 2 */}
                    <div className="space-y-3">
                      <div className="h-9 w-9 rounded-full bg-cyan-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto shadow-xs">
                        2
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Custom SOW Blueprint</h4>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                        We compile customized blueprint parameters based on your selected service tracks and provide clean, plain-jargon agreements.
                      </p>
                    </div>

                    {/* step 3 */}
                    <div className="space-y-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto shadow-xs">
                        3
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Transfer & Deployment</h4>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                        We build, test, and host your resources, then configure administrative domain ownerships directly to your name—putting you in complete control.
                      </p>
                    </div>

                  </div>

                </div>
              </section>

              {/* Showcase Gallery of Real Local Business Makeovers */}
              <section className="max-w-5xl mx-auto px-6 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest block font-bold">
                    CELEBRATING DIGITAL TRANSFORMATION SUCCESSES
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Real Local Businesses. Verified Transitions.
                  </h2>
                  <p className="text-slate-500 font-light text-xs max-w-md mx-auto">
                    See how community trade shops and independent clinics modernized their digital setup smoothly using standard Factlive Tech pillars.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  
                  {/* Gallery item 1 */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-3xs hover:shadow-2xs transition-all">
                    <div className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg self-start inline-block">
                      BAKERY & RETAIL
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Milano Italian Bakers</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 animate-pulse">EST. SEO & WEBSITE MAKE-OVER</p>
                    </div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      "We had no online menu layout. Factlive set up a stunning mobile showcase, integrated map reviews, and listed our catering forms. Our weekend bakery pre-orders grew by 45% in 3 weeks!"
                    </p>
                    <div className="border-t border-slate-50 pt-3 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Web Showcase + Google SEO
                    </div>
                  </div>

                  {/* Gallery item 2 */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-3xs hover:shadow-2xs transition-all">
                    <div className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg self-start inline-block">
                      CLINICAL CARE
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Dr. Sarah's Wellness Hub</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">EST. CLIENT INTAKE AUTOMATION</p>
                    </div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      "We were copying patient address data by hand from inbox emails to clinic spreadsheets. The automatic spreadsheet sync tool stores client forms instantly! It saved us 6 hours of work every week."
                    </p>
                    <div className="border-t border-slate-50 pt-3 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Database & Tasks Sync Setup
                    </div>
                  </div>

                  {/* Gallery item 3 */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-3xs hover:shadow-2xs transition-all">
                    <div className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg self-start inline-block">
                      GARDEN MERCHANTS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Green Horizon Nursery</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">EST. VERIFIED GOOGLE MAP PIN</p>
                    </div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      "With zero neighborhood lookup prominence, we were losing walk-ins. Factlive structured our Google Maps pin setup. We recorded 1,250 verified local user profile views in month one alone!"
                    </p>
                    <div className="border-t border-slate-50 pt-3 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Google Map Profiling Listed
                    </div>
                  </div>

                </div>
              </section>

              {/* Dynamic Bottom Anchor CTA */}
              <section className="max-w-5xl mx-auto px-6 pt-4">
                <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/[0.04] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-1.5 text-center md:text-left">
                    <p className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
                      READY TO CUSTOM-BUILD?
                    </p>
                    <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                      Explore our transparent flat-rate services
                    </h3>
                    <p className="text-[11px] text-slate-400 max-w-md font-light">
                      Browse customized website modules, search map listings, chatbot automations, and request your custom proposal instantly.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto shrink-0 justify-center">
                    <button
                      onClick={() => setActivePage("services")}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-black text-xs px-6 py-4 rounded-xl transition-all uppercase text-center flex items-center justify-center gap-2"
                    >
                      Browse Digital Services
                      <ArrowRight className="w-4 h-4 shadow-sm" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* PAGE VIEW 1: SERVICES CATALOG */}
          {activePage === "services" && (
            <motion.div
              key="services-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Focused Clean Hero Block */}
              <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold mb-6">
                  <CheckCircle className="w-3 h-3 text-amber-850" /> AFFORDABLE WEBSITES & DIGITAL HELP
                </span>
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Expert Technology Done Simpler for Local Businesses
                </h1>
                
                <p className="mt-5 text-base text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Avoid thousands in corporate agency design fee retainers. We set up fast visual websites, rank your store location on search maps, and prepare customized digital logos. 
                </p>
                
                <div className="mt-8 flex flex-wrap gap-3 justify-center text-xs">
                  <button 
                    onClick={() => {
                      document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2"
                  >
                    Browse Services Catalog
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActivePage("about")}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium px-6 py-3 rounded-xl transition-all"
                  >
                    How Factlive Works ➔
                  </button>
                </div>
              </section>

              {/* Grid Catalog Categories & Service Selection */}
              <section id="services-grid" className="border-t border-slate-100 bg-slate-50 py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-6">
                  
                  <div className="mb-10 text-center">
                    <span className="text-xs font-mono text-amber-600 uppercase tracking-widest block font-bold mb-1">
                      CHOOSE WHAT YOU NEED
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Click to Add Deliverables to Your Dynamic SOW
                    </h2>
                    <p className="text-slate-500 font-light text-xs mt-1.5 max-w-lg mx-auto">
                      Any item checked gets added to your customized wishlist. Complete the form at the bottom of the page to download or request your plan!
                    </p>
                  </div>

                  {/* Curated list categories layouts */}
                  <div className="space-y-8">
                    {Array.from(new Set(CORE_SERVICES.map(s => s.category))).map((catGroup) => {
                      const servicesInGroup = CORE_SERVICES.filter(s => s.category === catGroup);
                      
                      return (
                        <div key={catGroup} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                          
                          <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
                            <h3 className="font-display font-bold text-slate-900 tracking-tight text-sm md:text-base flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-cyan-600" />
                              {catGroup}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-400">
                              {servicesInGroup.length} items
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {servicesInGroup.map((s) => {
                              const isChecked = selectedIds.includes(s.id);
                              
                              return (
                                <div 
                                  key={s.id}
                                  onClick={() => handleToggleService(s.id)}
                                  className={`border rounded-xl p-4 transition-all duration-150 cursor-pointer flex items-start gap-3 select-none ${
                                    isChecked 
                                      ? "bg-slate-50 border-cyan-500 shadow-2xs" 
                                      : "bg-white border-slate-200 hover:border-slate-300"
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors border ${
                                      isChecked 
                                        ? "bg-cyan-600 border-cyan-600 text-white" 
                                        : "bg-white border-slate-300"
                                    }`}>
                                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                  </div>

                                  <div className="flex-grow">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className={`text-xs font-bold leading-tight ${isChecked ? "text-cyan-800" : "text-slate-900"}`}>
                                        {s.name}
                                      </h4>
                                      <span className="text-xs font-mono font-bold text-slate-700 leading-none shrink-0">
                                        ${s.price.toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-light mt-1 leading-normal">
                                      {s.desc}
                                    </p>
                                    <div className="mt-2 text-[9px] font-mono text-slate-400">
                                      ⏱ Delivery Sprints: ~{s.durationDays} days
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Estimate Summary & Contact Form right on the page */}
                  <div id="wishlist-summary" className="mt-12 bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold mb-0.5">
                          SECURE ESTIMATE SHEET
                        </span>
                        <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                          <Calculator className="w-5 h-5 text-amber-400" /> Wishlist Proposal Summary
                        </h3>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="bg-slate-800 text-slate-355 px-3 py-1 rounded-full text-xs font-mono">
                          {selectedIds.length} Items Selection
                        </span>
                        {selectedIds.length > 0 && (
                          <button 
                            onClick={handleClearAll}
                            className="text-slate-400 hover:text-rose-455 font-mono text-[10px] font-bold uppercase transition-colors bg-transparent border-0 outline-none cursor-pointer"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    {selectedServices.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 space-y-3">
                        <Layers className="w-10 h-10 mx-auto text-slate-700 stroke-[1.5]" />
                        <p className="text-xs font-mono uppercase font-bold text-slate-300">Your selection wishlist is Empty</p>
                        <p className="text-[11px] font-light max-w-sm mx-auto text-slate-500">
                          Please select layout packages and digital tools from our catalog lists above to compile your personalized project investment, speeds, and timeline estimates.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
                        {/* Checked Items Info */}
                        <div className="lg:col-span-6 space-y-4">
                          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                            {selectedServices.map(s => (
                              <div 
                                key={s.id} 
                                className="flex items-center justify-between text-xs bg-slate-805/50 border border-slate-800 p-3 rounded-xl hover:border-slate-700 transition-all"
                              >
                                <div className="space-y-0.5 max-w-[70%]">
                                  <span className="font-bold text-slate-100 block leading-tight">{s.name}</span>
                                  <span className="text-[10px] text-slate-400 block font-light truncate">{s.category}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-amber-400 font-bold">${s.price.toLocaleString()}</span>
                                  <button 
                                    onClick={() => handleToggleService(s.id)}
                                    className="text-slate-500 hover:text-rose-500 font-bold px-2 py-0.5 text-sm transition-colors bg-transparent border-0 outline-none cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-slate-850 border border-slate-800 p-4 rounded-xl space-y-3">
                            <h4 className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">Delivery Turnaround Queue Priority</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <button
                                type="button"
                                onClick={() => setSpeed("standard")}
                                className={`py-2 px-3 rounded-lg border font-mono font-bold transition-all text-center cursor-pointer ${
                                  speed === "standard"
                                    ? "bg-white text-slate-900 border-white shadow-sm"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                                }`}
                              >
                                STANDARD SPRINT
                              </button>
                              <button
                                type="button"
                                onClick={() => setSpeed("rush")}
                                className={`py-2 px-3 rounded-lg border font-mono font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                                  speed === "rush"
                                    ? "bg-amber-400 text-slate-900 border-amber-400 shadow-sm"
                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                                }`}
                              >
                                <Zap className="w-3.5 h-3.5 fill-current" /> EXPRESS RUSH (+30%)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Request Form & Estimates */}
                        <div className="lg:col-span-6 space-y-6 bg-slate-850 p-5 rounded-2xl border border-slate-800">
                          {/* Live Calculations */}
                          <div className="space-y-2.5 text-xs">
                            <div className="flex justify-between items-center text-slate-400 font-light">
                              <span>Services Subtotal:</span>
                              <span className="font-mono text-slate-200">${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-400 font-light pb-2 border-b border-slate-800">
                              <span>Max Parallel Timeline:</span>
                              <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> ~{estimatedDays} Working Days
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-sm pt-1">
                              <span className="font-bold text-slate-200">PROJECT GRAND ESTIMATE:</span>
                              <span className="font-mono text-xl font-black text-amber-400">${totalPrice.toLocaleString()}</span>
                            </div>
                          </div>

                          <form onSubmit={handleConsultationSubmit} className="space-y-3 pt-2">
                            <div className="space-y-2">
                              <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                              />
                              <input 
                                type="email" 
                                placeholder="Professional Email Address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                                required
                              />
                              <input 
                                type="text" 
                                placeholder="Business Legal Name" 
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                              <button
                                type="button"
                                onClick={downloadPdf}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-[10px] font-mono font-bold uppercase py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                DOWNLOAD SOW PDF
                              </button>
                              <button
                                type="submit"
                                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-mono font-bold uppercase py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                REQUEST FREE CONSULT
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    {/* Toast Notification Alert Banner */}
                    <AnimatePresence>
                      {showInvoiceAlert && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          className="absolute inset-x-6 bottom-6 bg-slate-950/95 border border-amber-400/30 p-4 rounded-xl text-center space-y-1.5 shadow-2xl z-20"
                        >
                          <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                          <h5 className="text-[11px] font-mono uppercase font-bold text-amber-400">Proposal Wishlist Sent!</h5>
                          <p className="text-[10px] text-slate-300 max-w-xs mx-auto leading-relaxed">
                            Perfect <strong className="text-white">{name || "Valued Customer"}</strong>! We have registered your custom pricing configurations for {company || "Factlive Plan"}. Our support squad will email you at <strong className="text-white">{email}</strong> to launch!
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {/* PAGE VIEW 3: LEARNING HUB KNOWLEDGE BASE & DIAGNOSTICS */}
          {activePage === "learning" && (
            <motion.div
              key="learning-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto px-6 py-12 space-y-12"
            >
              {/* Header Hero Banner */}
              <div className="text-center max-w-xl mx-auto animate-fade-in">
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 uppercase tracking-widest inline-block px-3 py-1 rounded-full font-bold mb-3">
                  PAGE 3: KNOWLEDGE & INSIGHTS
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Factlive Tech Learning Hub
                </h2>
                <p className="text-slate-500 font-light text-sm mt-1.5 leading-relaxed">
                  Understand domain infrastructure, local search optimization, conversion tactics, and email workflows in clear plain-jargon guides.
                </p>
              </div>

              {/* SECTION: Interactive Tech Diagnostic Scanner */}
              <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side: diagnostic form */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold text-teal-850 bg-teal-100 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE DIAGNOSTIC TOOL
                    </span>
                    <h3 className="text-lg font-black text-slate-950 mt-2.5 tracking-tight">
                      Local Shop Web Readiness Analyzer
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 font-light">
                      Answer 3 simple questions about your current online presence. We will score your readiness and suggest specific setup upgrades which you can automatically add to your selection wishlist.
                    </p>
                  </div>

                  {/* Industry Picker */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Select Your Line of Business:</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "retail", label: "Retail & Local Store" },
                        { id: "medical", label: "Clinic / Professional Service" },
                        { id: "restaurant", label: "Restaurant & Cafe" },
                        { id: "expert", label: "Coach / Contractor" }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setQuizBusiness(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                            quizBusiness === item.id
                              ? "bg-slate-900 text-white shadow-xs border border-transparent"
                              : "bg-white border border-slate-250 text-slate-600 hover:border-slate-350"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Questions */}
                  <div className="space-y-4 pt-2 border-t border-slate-200">
                    {/* Q1: Maps */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="font-medium text-slate-700 max-w-sm">
                        Q1. Do you have a Google Maps listed location with verified customer reviews?
                      </span>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => setQuizMapOk(true)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizMapOk === true
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          YES
                        </button>
                        <button
                          onClick={() => setQuizMapOk(false)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizMapOk === false
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Q2: Speed */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-slate-100/60">
                      <span className="font-medium text-slate-700 max-w-sm">
                        Q2. Does your website load in less than 3 seconds on cell phone networks?
                      </span>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => setQuizSpeedOk(true)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizSpeedOk === true
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          YES
                        </button>
                        <button
                          onClick={() => setQuizSpeedOk(false)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizSpeedOk === false
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Q3: Chatbot */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-slate-100/60">
                      <span className="font-medium text-slate-700 max-w-sm">
                        Q3. Are client inquiries automatically saved or resolved when you are closed?
                      </span>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => setQuizAutomatedChat(true)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizAutomatedChat === true
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          YES
                        </button>
                        <button
                          onClick={() => setQuizAutomatedChat(false)}
                          className={`px-3 py-1 rounded font-mono font-bold text-[10px] uppercase border transition-all ${
                            quizAutomatedChat === false
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (quizMapOk === null || quizSpeedOk === null || quizAutomatedChat === null) {
                          setQuizResultText("Please pick an answer for all three questions first!");
                          return;
                        }
                        setQuizCompleted(true);
                        setQuizResultText("");
                      }}
                      className="bg-slate-900 border-none hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                    >
                      Run Diagnostic Scan
                    </button>
                  </div>
                </div>

                {/* Right side: custom feedback block */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-405 tracking-wider font-bold border-b border-slate-100 pb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-500" /> Diagnosis Feedback
                    </h4>

                    {!quizCompleted ? (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <BookOpen className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
                        <p className="text-[11px] font-mono">Awaiting diagnostic scan triggers...</p>
                        <p className="text-[10px] text-slate-500 font-light px-2">Fill the 3 quick parameters in left side layout and click "Run Diagnostic Scan".</p>
                        {quizResultText && <p className="text-rose-500 font-bold text-[10px] bg-rose-50 px-2 py-1 rounded">{quizResultText}</p>}
                      </div>
                    ) : (
                      <div className="space-y-4 pt-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl font-black text-emerald-600">
                            {
                              (quizMapOk ? 33 : 0) + 
                              (quizSpeedOk ? 33 : 0) + 
                              (quizAutomatedChat ? 34 : 0)
                            }%
                          </div>
                          <div>
                            <span className="text-slate-900 text-xs font-bold block">Digital Readiness Rating</span>
                            <span className="text-[9px] font-mono text-slate-400">CLASS: {quizBusiness.toUpperCase()} WORKSPACE</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-[11px] text-slate-600 font-light leading-relaxed">
                          {quizMapOk === false && (
                            <p className="bg-amber-50 border-l-2 border-amber-400 p-2 text-[11px]">
                              🚨 <strong className="text-slate-900">Local Search gap</strong>: Neighbors looking for a {quizBusiness} cannot find your verified phone number. Optimizing Google Maps Setup can grow walk-ins by 40%.
                            </p>
                          )}
                          {quizSpeedOk === false && (
                            <p className="bg-amber-50 border-l-2 border-amber-400 p-2 text-[11px]">
                              🚨 <strong className="text-slate-900">Load Latency gap</strong>: Clients searching on mobile devices drop out if rendering exceeds 3 seconds. Core compression is required.
                            </p>
                          )}
                          {quizAutomatedChat === false && (
                            <p className="bg-amber-50 border-l-2 border-amber-400 p-2 text-[11px]">
                              🚨 <strong className="text-slate-900">Automation gap</strong>: Off-hours inquiries remain unrecorded. Adding an automated chatbot mitigates client leakages.
                            </p>
                          )}
                          {quizMapOk && quizSpeedOk && quizAutomatedChat && (
                            <p className="bg-emerald-50 text-emerald-900 border-l-2 border-emerald-500 p-2 text-[11px]">
                              ✨ Outstanding work! Your business incorporates standard digital setups. We suggest maintaining periodic offline backups or custom email tools.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {quizCompleted && (
                    <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
                      <button
                        onClick={() => {
                          // Assemble recommendations
                          const recs: string[] = [];
                          if (quizMapOk === false) recs.push("s4", "s5");
                          if (quizSpeedOk === false) recs.push("s3");
                          if (quizAutomatedChat === false) recs.push("s9");
                          
                          if (recs.length > 0) {
                            setSelectedIds(prev => {
                              const unified = [...new Set([...prev, ...recs])];
                              return unified;
                            });
                            setQuizResultText("Recommended packages added to your selection wishlist!");
                            setTimeout(() => {
                              setActivePage("services");
                              setTimeout(() => {
                                document.getElementById("wishlist-summary")?.scrollIntoView({ behavior: "smooth" });
                              }, 150);
                              setQuizResultText("");
                            }, 1800);
                          } else {
                            setActivePage("services");
                          }
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 border-none text-white font-mono font-bold text-[10px] uppercase py-2 rounded-lg transition-all"
                      >
                        {quizMapOk === false || quizSpeedOk === false || quizAutomatedChat === false 
                          ? "Auto-Select Recommendations ➔" 
                          : "Explore More Deliverables ➔"}
                      </button>
                      {quizResultText && (
                        <p className="text-center font-bold text-[9px] text-emerald-700 bg-emerald-50 py-1 rounded">
                          {quizResultText}
                        </p>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* SECTION: Asian International University Admissions Open Course Hub */}
              <div id="aiu-admissions" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white space-y-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                {/* Header Branding */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full tracking-wider animate-pulse">
                        ADMISSION OPEN
                      </span>
                      <span className="text-[10px] uppercase font-mono font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full tracking-wider">
                        UGC APPROVED (2F ACT 1956)
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-white uppercase">
                      Asian International University
                    </h3>
                    <p className="text-slate-450 text-slate-400 text-xs font-light max-w-xl leading-relaxed">
                      Faculty of Animation & Multimedia. Recognised by UGC, DEB, AICTE, PCI, NCTE, BCI & other statutory bodies. Learn advanced digital design, motion film-making, database web graphics, gaming software development, and cinematic visual effects in accredited academic tracks.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-wrap gap-2">
                    <span className="bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-300">
                      📜 UGC Recognized University
                    </span>
                  </div>
                </div>

                {/* Course Search & Interactive Filter Grid */}
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-100 tracking-tight flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-amber-400" /> Explore Animation & Multimedia Curriculums
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">
                        Filter by certification level or type a keyword to lookup program durations and requirements.
                      </p>
                    </div>

                    {/* Quick Search */}
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search Animation, Design, VFX..." 
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 hover:border-slate-650 rounded-lg pl-9 pr-4 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Tabs Category Navigation */}
                  <div className="flex flex-wrap gap-1.5 border-b border-slate-850 pb-3">
                    {[
                      { id: "all", label: "All Programs" },
                      { id: "Certificate", label: "Certificate Courses (6 M)" },
                      { id: "UG", label: "Undergraduate / UG (3 Y)" },
                      { id: "PG", label: "Postgrad / PG (2 Y)" },
                      { id: "Research", label: "Research / Ph.D (3 Y)" }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCourseCategoryFilter(tab.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                          courseCategoryFilter === tab.id
                            ? "bg-amber-400 text-slate-950 font-bold shadow-sm border border-amber-400"
                            : "bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Course Cards Grid */}
                  {(() => {
                    const filtered = AIU_COURSES.filter(course => {
                      const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) || 
                                            course.eligibility.toLowerCase().includes(courseSearch.toLowerCase());
                      
                      if (courseCategoryFilter === "all") return matchesSearch;
                      if (courseCategoryFilter === "Certificate") return course.category === "Certificate" && matchesSearch;
                      if (courseCategoryFilter === "UG") return course.category === "UG" && matchesSearch;
                      if (courseCategoryFilter === "PG") return course.category === "PG" && matchesSearch;
                      if (courseCategoryFilter === "Research") return course.category === "Research" && matchesSearch;
                      return matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="py-12 text-center text-slate-500 space-y-2 border border-dashed border-slate-850 rounded-2xl">
                          <GraduationCap className="w-8 h-8 mx-auto stroke-[1.5] text-slate-700" />
                          <p className="text-xs font-mono">No matching Animation or Multimedia courses available</p>
                          <p className="text-[10px] text-slate-550 font-light">Refine your search term or select another category tab above.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto pr-1">
                        {filtered.map((course, index) => (
                          <div 
                            key={index}
                            className="bg-slate-850/40 border border-slate-800 rounded-xl p-4 hover:border-slate-700 hover:bg-slate-850 transition-all flex flex-col justify-between gap-3 group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center gap-2">
                                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                  course.category === "Certificate" ? "bg-cyan-950 text-cyan-400" :
                                  course.category === "UG" ? "bg-emerald-950 text-emerald-400" :
                                  course.category === "PG" ? "bg-amber-955 bg-amber-950 text-amber-400" : "bg-purple-950 text-purple-400"
                                }`}>
                                  {course.category === "UG" ? "Undergraduate (UG)" : course.category === "PG" ? "Postgraduate (PG)" : course.category === "Research" ? "Research (Ph.D)" : course.category}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 font-bold shrink-0">
                                  ⏳ {course.duration}
                                </span>
                              </div>
                              <h5 className="text-[11px] font-bold text-white group-hover:text-amber-400 transition-colors leading-relaxed">
                                {course.name}
                              </h5>
                            </div>

                            <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between gap-2.5">
                              <span className="text-[9px] text-slate-400 font-light truncate max-w-[70%]">
                                🎓 {course.eligibility}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setAdmissionCourse(course.name);
                                  setTimeout(() => {
                                    document.getElementById("admission-form")?.scrollIntoView({ behavior: "smooth" });
                                  }, 150);
                                }}
                                className="text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-0.5 bg-transparent border-none cursor-pointer outline-none"
                              >
                                Inquiry ➔
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Counselor Card & Guidance Details with Form */}
                <div id="admission-form" className="border-t border-slate-800 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left (5 cols): Counselor Anand Gupta Banner */}
                  <div className="lg:col-span-5 bg-slate-850 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="h-11 w-11 rounded-full bg-amber-401 bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center border border-amber-300">
                        AG
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-amber-405 text-amber-400 uppercase tracking-widest block font-bold">
                          FREELANCE COUNSELOR
                        </span>
                        <h4 className="font-extrabold text-white text-sm tracking-tight leading-none">Anand K Gupta</h4>
                        <span className="text-[10px] text-slate-400 block mt-1 font-light">Free Admission Guidance & Support</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      As your dedicated counseling specialist, I assist with admissions enrollment, course eligibility checkups, university documentation validation, and parallel enrollment guidance completely free of charge.
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 leading-snug">
                      <p className="flex items-center gap-2">
                        <span className="text-amber-400">⚡</span>
                        <span>Official Phone: <a href="tel:+919711277478" className="text-white hover:underline font-bold font-mono">+91 9711-277-478</a></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-amber-400">⚡</span>
                        <span>Alternate Line: <a href="tel:09899108107" className="text-white hover:underline font-mono">09899108107</a></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-amber-400">⚡</span>
                        <span>Counselor Mail: <a href="mailto:factlive.in@gmail.com" className="text-white hover:underline font-mono">factlive.in@gmail.com</a></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-amber-400">⚡</span>
                        <span>Official Portal: <a href="http://www.factlive.in/admission" target="_blank" rel="noopener noreferrer" className="text-white hover:underline break-all font-mono">www.factlive.in/admission</a></span>
                      </p>
                    </div>

                    {/* Direct Chat connection */}
                    <div className="pt-2">
                      <a 
                        href={`https://wa.me/919899877478?text=Hi%20Anand%20K%20Gupta,%20I%20am%20interested%20in%20knowing%20details%20about%20admissions%20at%20Asian%20International%20University.%20Please%20guide%20me.`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full bg-emerald-600 hover:bg-emerald-550 text-white text-[10px] font-mono font-bold uppercase py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 no-underline cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Right (7 cols): Counseling request form */}
                  <div className="lg:col-span-7 bg-slate-850 p-5 md:p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                        SECURE REGISTRATION ASSISTANCE
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-100 tracking-tight">
                        FREE ADMISSION GUIDANCE REQUEST
                      </h4>
                      <p className="text-[11px] text-slate-400 font-light leading-snug">
                        Submit your details below for a step-by-step guidance callback and documentation checkup with counselor Anand Gupta.
                      </p>
                    </div>

                    <form onSubmit={handleAdmissionSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-slate-400 uppercase font-bold block">Full Name:</label>
                          <input 
                            type="text" 
                            placeholder="Your name" 
                            value={admissionName}
                            onChange={(e) => setAdmissionName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-slate-400 uppercase font-bold block">Mobile / WhatsApp No:</label>
                          <input 
                            type="tel" 
                            placeholder="e.g. +91 98998-77478" 
                            value={admissionPhone}
                            onChange={(e) => setAdmissionPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-slate-400 uppercase font-bold block">Email Address (Optional):</label>
                          <input 
                            type="email" 
                            placeholder="e.g. you@example.com" 
                            value={admissionEmail}
                            onChange={(e) => setAdmissionEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg px-3.5 py-2 placeholder:text-slate-500 font-light text-xs text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-slate-400 uppercase font-bold block">Preferred Faculty Course:</label>
                          <select 
                            value={admissionCourse}
                            onChange={(e) => setAdmissionCourse(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-750 text-white rounded-lg px-3 py-2 font-light text-xs focus:outline-none focus:border-amber-400"
                            required
                          >
                            <option value="">-- Click to Select Course --</option>
                            <optgroup label="Certificate Courses (6 Months)">
                              {AIU_COURSES.filter(c => c.category === "Certificate").map((c, i) => (
                                <option key={i} value={c.name}>{c.name} ({c.duration})</option>
                              ))}
                            </optgroup>
                            <optgroup label="Undergraduate / UG Courses (3 Years)">
                              {AIU_COURSES.filter(c => c.category === "UG").map((c, i) => (
                                <option key={i} value={c.name}>{c.name} ({c.duration})</option>
                              ))}
                            </optgroup>
                            <optgroup label="Postgraduate / PG Courses (2 Years)">
                              {AIU_COURSES.filter(c => c.category === "PG").map((c, i) => (
                                <option key={i} value={c.name}>{c.name} ({c.duration})</option>
                              ))}
                            </optgroup>
                            <optgroup label="Research Programs (Ph.D)">
                              {AIU_COURSES.filter(c => c.category === "Research").map((c, i) => (
                                <option key={i} value={c.name}>{c.name} ({c.duration})</option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-mono font-bold uppercase py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                        >
                          Request Free Guidance Call
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                        </button>
                      </div>
                    </form>

                    {/* Alert Banner success */}
                    <AnimatePresence>
                      {admissionShowAlert && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-slate-950 border border-emerald-500/30 p-4 rounded-xl text-center space-y-3 shadow-xl"
                        >
                          <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto animate-pulse" />
                          <div className="space-y-1">
                            <h5 className="text-[11px] font-mono uppercase font-bold text-emerald-400">Counseling Request Submitted!</h5>
                            <p className="text-[10px] text-slate-300 max-w-sm mx-auto leading-relaxed">
                              Excellent <strong className="text-white">{admissionName}</strong>! Your inquiry for <strong className="text-amber-400">{admissionCourse}</strong> is successfully locked. Advisor Anand K Gupta will dial or whatsapp you at <strong className="text-white">{admissionPhone}</strong> to assist.
                            </p>
                          </div>
                          <div>
                            <a 
                              href={`https://wa.me/919899877478?text=Hi%20Anand%20K%20Gupta,%20my%20name%20is%20${encodeURIComponent(admissionName)}.%20I%20just%2520requested%2520free%2520admission%2520guidance%2520for%252520"${encodeURIComponent(admissionCourse)}"%2520on%2520your%2520hub.%2520Please%2520assist%2520me.`}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-555 text-white text-[10px] font-mono font-bold px-4 py-2 rounded-lg transition-all no-underline cursor-pointer"
                            >
                              🚀 Connect Now on WhatsApp Instant
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>

              {/* SECTION: Admissions CRM Lead Center (Google Sheets & WhatsApp) */}
              <CrmAdminPanel currentTheme={currentTheme} />

              {/* Handbook Cards Grid */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-emerald-600 uppercase tracking-widest block font-bold mb-1">
                    PLAINTEXT HANDLES
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    The Four Simple Pillars of Local Business Tech
                  </h3>
                  <p className="text-slate-500 font-light text-xs mt-1">
                    No technical blueprints. Only straightforward facts to keep micro-merchants in absolute custody of their domains.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      num: "01",
                      title: "Domain Setup & DNS Demystified",
                      desc: "Your Domain is your shop name address on the digital road (e.g. storename.com). Registration takes 5 minutes. Static server files keep web pages online. Never purchase overpriced domains or monthly site lockers; registration only costs about $12 to $15 per year."
                    },
                    {
                      num: "02",
                      title: "Local Search Ranking Basics",
                      desc: "Local Search Optimization doesn't involve complex digital marketing spells. It depends strictly on location precision (Google Maps pins), phone/address consistency, and receiving verified 5-star reviews. Ranks keep your phone number higher in local lookup searches."
                    },
                    {
                      num: "03",
                      title: "Standard Web Page Conversions",
                      desc: "A pretty layout looks spectacular, but speed drives orders. If layout loading takes over 5 seconds, up to 50% of cell phone users exit. Use compressed images, clean font-weights, and explicit checkout links to ensure smooth transitions."
                    },
                    {
                      num: "04",
                      title: "Newsletter automated workflow",
                      desc: "Capturing client addresses via simple sign-ups allows you to trigger automated discounts or greeting letters on weekends. This builds persistent retention with neighborhoods without manual work."
                    }
                  ].map((card) => (
                    <div 
                      key={card.num} 
                      className="bg-white border border-slate-100 hover:border-slate-200 p-5 rounded-2xl shadow-2xs space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          PILLAR {card.num}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{card.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* PAGE VIEW 3: ABOUT US & FAQS ACCORDION */}
          {activePage === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto px-6 py-12 space-y-12"
            >
              
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono text-amber-600 uppercase tracking-widest block font-bold mb-1">
                  PAGE 3: OUR CORE MANIFESTO
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  About Factlive Tech & FAQs
                </h2>
                <p className="text-slate-500 font-light text-sm mt-1.5">
                  Helping independent trade owners and specialists build credible digital presence with clean, affordable structures.
                </p>
              </div>

              {/* Two Panel Columns - Split Info & FAQs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Manifesto Description Left (5 cols) */}
                <div className="lg:col-span-5 space-y-5 bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <h4 className="text-xs font-mono text-cyan-600 uppercase tracking-widest font-bold">WHO WE HELP EACH DAY</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Factlive Tech brings micro-startups, single retail shops, and professional service specialists into the modern web domain without high corporate retainer contracts.
                  </p>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    We combine high-speed websites, Google Maps search configurations, and pretty digital vector style colors. No jargon. No complex lock-in contracts.
                  </p>

                  <div className="pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-500 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                      <span>Headquarters: Commercial Tech Hub Hub</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                      <span>Contact Support: hello@factlivetech.com</span>
                    </p>
                  </div>
                </div>

                {/* FAQ Accordion Right (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono text-cyan-600 uppercase tracking-widest block font-bold mb-2">COMMON QUESTIONS ANSWERED</h4>
                  
                  <div className="space-y-2.5">
                    {[
                      {
                        q: "How is the digital scope determined?",
                        a: "Select individual modules on our Services Catalog (Standard Websites or local SEO setups) to build your customized wishlist. You can view the estimated investment, speed options, and download a printable Statement of Work (SOW) PDF dynamically at the bottom of the page."
                      },
                      {
                        q: "Do I have direct ownership of my database & domains?",
                        a: "Absoluty. Every hosting workspace, credential layout, and graphic vector asset belongs to you. We transfer root administrative credentials immediately upon completing our setup milestone."
                      },
                      {
                        q: "What is your hourly maintenance policy?",
                        a: "For small merchants, we offer flat retainer support options that cover regular backups, software platform security updates, and instant support chats to guard against downtime."
                      },
                      {
                        q: "Can I upgrade or append pages later?",
                        a: "Yes. Our frameworks are built modularly using industry standard React and Tailwind styling, allowing your staff or external specialists to expand functions easily anytime."
                      }
                    ].map((faq, idx) => {
                      const isOpen = activeFaq === idx;
                      
                      return (
                        <div 
                          key={idx} 
                          className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-cyan-600 transition-colors text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/10"
                          >
                            <span>{faq.q}</span>
                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform text-slate-400 ${isOpen ? "rotate-90" : ""}`} />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-light leading-relaxed border-t border-slate-50/50">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Simplified, Clean Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 bg-white rounded-full flex items-center justify-center text-[10px] text-slate-900 font-extrabold">F</div>
            <span className="font-display font-black text-white text-sm tracking-tight">Factlive Tech Digital</span>
          </div>

          <p className="max-w-md mx-auto text-slate-500 font-light leading-relaxed text-[11px]">
            Providing durable, affordable and straightforward digital web pages, secure database connections, and clear styling files to local trade houses, boutiques, and clinics around the nation.
          </p>

          <div className="flex gap-4 items-center justify-center font-mono text-[9px] uppercase tracking-wider text-slate-600 border-t border-slate-900 pt-6">
            <span>© {new Date().getFullYear()} Factlive Tech. All Rights Reserved.</span>
            <span>|</span>
            <span className="flex items-center gap-1"><Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" /> Made Simple for Local Businesses</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
