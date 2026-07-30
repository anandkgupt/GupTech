import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Layers, 
  Database, 
  Globe, 
  BarChart2, 
  ShieldCheck, 
  Search, 
  ExternalLink 
} from "lucide-react";
import { AnandLogo } from "./AnandLogo";
import { FactLiveCardShowcase } from "./FactLiveCardShowcase";

export const ProfessionalProfile: React.FC = () => {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education" | "skills" | "certifications">("all");

  const downloadResumePdf = () => {
    setDownloadingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Colors
      const primaryDark = "#0f172a";
      const accentBlue = "#0284c7";
      const textDark = "#1e293b";
      const textMuted = "#64748b";

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 42, "F");

      // Name & Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text("ANAND K GUPTA", 14, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(224, 242, 254);
      doc.text("HR, Marketing & Analytics Professional", 14, 26);

      // Contact details row in header
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text("+91-97112-77478  |  anand.analysts@gmail.com  |  Sector 73, Noida, UP 201307", 14, 34);

      let y = 48;

      // ABOUT ME SECTION
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("ABOUT ME", 14, y);
      doc.setDrawColor(2, 132, 199);
      doc.setLineWidth(0.5);
      doc.line(14, y + 2, 196, y + 2);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const aboutText = "HR, Marketing & Analytics Professional with an MBA/PGDM in HR & Marketing. Experienced in operations coordination, customer acquisition, onboarding, KYC compliance, process documentation, and business support. Proficient in Advanced Excel, CRM, ERP, data analysis, and process improvement, with working knowledge of digital marketing and SEO. Passionate about improving operational efficiency through data-driven decision-making.";
      const splitAbout = doc.splitTextToSize(aboutText, 182);
      doc.text(splitAbout, 14, y);
      y += splitAbout.length * 4.5 + 4;

      // EXPERIENCES SECTION
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("PROFESSIONAL EXPERIENCE", 14, y);
      doc.line(14, y + 2, 196, y + 2);
      y += 7;

      const experiences = [
        {
          role: "Deputy Manager | Business Dev. & Customer Service",
          company: "IndusInd Bank Ltd.",
          period: "OCT - DEC 2025",
          bullets: [
            "Executed end-to-end core banking operations, customer acquisition & onboarding, KYC documentation via Finacle.",
            "Utilized CRMNEXT to manage daily lead tracking, follow-ups, and prepare daily/weekly MIS reports."
          ]
        },
        {
          role: "Assistant Manager | PAM & Operation Support",
          company: "Equitas Bank Ltd.",
          period: "JUL 2024 - MAY 2025",
          bullets: [
            "Managed and maintained CRM records for 20-25 client leads and portfolios daily.",
            "Coordinated with cross-functional teams to support core banking operations using Oracle FLEXCUBE.",
            "Developed daily, weekly, and monthly MIS reports using Excel to monitor productivity."
          ]
        },
        {
          role: "Intern | Marketing & Sales",
          company: "Digital Marveled Pvt Ltd",
          period: "MAY 2023 - JUN 2023",
          bullets: [
            "Created marketing content using Canva for digital ads & brand promotion.",
            "Gained hands-on experience in Google Ads, SMM, SEM, SEO, CRM & Google Analytics."
          ]
        },
        {
          role: "Startup | Founder",
          company: "FactLive Digital Solutions",
          period: "2025 - Present",
          bullets: [
            "Developed and managed business websites, digital assets, and social media campaigns.",
            "Designed promotional materials and coordinated website maintenance and digital operations."
          ]
        },
        {
          role: "Founder",
          company: "eGranthakuti (E-Commerce Venture)",
          period: "2022",
          bullets: [
            "Built and managed an online e-commerce platform and product catalog organization.",
            "Handled digital promotions, customer engagement, and e-commerce support workflows."
          ]
        }
      ];

      experiences.forEach((exp) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(exp.role, 14, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(2, 132, 199);
        doc.text(`${exp.company}  |  ${exp.period}`, 196, y, { align: "right" });
        y += 4.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        exp.bullets.forEach((b) => {
          const splitB = doc.splitTextToSize(`•  ${b}`, 180);
          doc.text(splitB, 18, y);
          y += splitB.length * 4;
        });
        y += 2;
      });

      // EDUCATION SECTION
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      y += 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("EDUCATION", 14, y);
      doc.line(14, y + 2, 196, y + 2);
      y += 7;

      const eduList = [
        { degree: "PGDM (MBA) | HR and Marketing", school: "GNIOT Institute of Management Studies - GIMS | Greater Noida", year: "2022-24" },
        { degree: "Masters (PG) in Geography", school: "Kalinga University, Raipur, CG", year: "2018-20" },
        { degree: "Bachelor (UG) in Psychology", school: "MGKVP University, Varanasi, UP", year: "2015-18" },
        { degree: "12th (PCM) | 85%", school: "UP Board", year: "2015" },
        { degree: "10th | 84%", school: "UP Board", year: "2013" }
      ];

      eduList.forEach((e) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(e.degree, 14, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`${e.school} (${e.year})`, 196, y, { align: "right" });
        y += 4.5;
      });

      // CERTIFICATIONS & TRAINING
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      y += 3;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("TRAINING & CERTIFICATIONS", 14, y);
      doc.line(14, y + 2, 196, y + 2);
      y += 7;

      const certs = [
        "Diploma in Computer Applications | K Infotech pvt ltd, Delhi",
        "CCC | NIELIT",
        "Data Analytics Training | PW Skills",
        "Blockchain Technology & Inter. Trade | De Montfort University, Dubai",
        "Google Analytics & Google Digital Marketing",
        "Data & Business Analytics | Nano Degree | Jobaaj Learning"
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      certs.forEach((c) => {
        doc.text(`✓  ${c}`, 16, y);
        y += 4.2;
      });

      // Footer signature
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text("Official Curriculum Vitae — Anand K Gupta | www.anandanalyst.in", 105, 290, { align: "center" });

      doc.save("Anand_K_Gupta_Resume.pdf");
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      
      {/* Profile Header & Contact Card */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 p-0.5 shadow-xl">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-2xl text-white">
                  AKG
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-full text-[10px] font-bold border-2 border-slate-900">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  MBA / PGDM (HR &amp; Marketing)
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Analytics &amp; Digital Specialist
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Anand K Gupta
              </h1>

              <p className="text-sm font-mono text-sky-400 font-semibold">
                HR, Marketing &amp; Analytics Professional | Founder &amp; Digital Strategist
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={downloadResumePdf}
              disabled={downloadingPdf}
              className="flex-1 md:flex-initial bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-mono font-bold text-xs px-5 py-3.5 rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{downloadingPdf ? "Generating CV..." : "Download Official Resume PDF"}</span>
            </button>

            <a
              href="mailto:anand.analysts@gmail.com"
              className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs px-4 py-3.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-8 mt-8 border-t border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-sky-400 shrink-0" />
            <a href="tel:+919711277478" className="hover:text-sky-300 transition-colors">+91 97112-77478</a>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <a href="mailto:anand.analysts@gmail.com" className="hover:text-emerald-300 transition-colors truncate">anand.analysts@gmail.com</a>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Sector 73, Noida, UP 201307</span>
          </div>

          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
            <a href="https://www.linkedin.com/in/anandanalyst" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300 transition-colors">in/anandanalyst</a>
          </div>

          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-purple-400 shrink-0" />
            <a href="https://github.com/anandanalysts" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">github/anandanalysts</a>
          </div>
        </div>
      </section>

      {/* FactLive Digital Solutions Brand Card Showcase */}
      <FactLiveCardShowcase />

      {/* About Me Statement */}
      <section className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
          <User className="w-4 h-4 text-amber-400" /> EXECUTIVE SUMMARY
        </div>

        <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
          HR, Marketing &amp; Analytics Professional with an MBA/PGDM in HR &amp; Marketing. Experienced in operations coordination, customer acquisition, onboarding, KYC compliance, process documentation, and business support. Proficient in Advanced Excel, CRM, ERP, data analysis, and process improvement, with working knowledge of digital marketing and SEO. Passionate about improving operational efficiency through data-driven decision-making and cross-functional collaboration.
        </p>
      </section>

      {/* Filter Tabs for Deep Dive */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: "all", label: "Full Profile" },
            { id: "experience", label: "Work Experience" },
            { id: "education", label: "Education" },
            { id: "skills", label: "Core Skills Grid" },
            { id: "certifications", label: "Certifications" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-sky-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={downloadResumePdf}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>PDF Resume</span>
        </button>
      </div>

      {/* Work Experience Section */}
      {(activeTab === "all" || activeTab === "experience") && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-400" /> Work Experience &amp; Founder Ventures
            </h2>
            <span className="text-xs font-mono text-slate-400">Total Experience: 1+ Years &amp; Founder</span>
          </div>

          <div className="space-y-4">
            {/* IndusInd Bank */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">BANKING &amp; CUSTOMER OPERATIONS</span>
                  <h3 className="text-base font-bold text-white">Deputy Manager | Business Dev. &amp; Customer Service</h3>
                  <div className="text-xs text-slate-400 font-medium">IndusInd Bank Ltd.</div>
                </div>
                <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20 font-bold self-start sm:self-center">
                  OCT - DEC 2025
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 mt-0.5">•</span>
                  <span>Executed end-to-end core banking operations, including customer acquisition &amp; onboarding, KYC, and documentation using <strong>Finacle</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 mt-0.5">•</span>
                  <span>Utilized <strong>CRMNEXT</strong> to manage daily lead tracking, customer onboarding, follow-ups, and prepare daily and weekly MIS reports.</span>
                </li>
              </ul>
            </div>

            {/* Equitas Bank */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">PAM &amp; OPERATIONS SUPPORT</span>
                  <h3 className="text-base font-bold text-white">Assistant Manager | PAM &amp; Operation Support</h3>
                  <div className="text-xs text-slate-400 font-medium">Equitas Bank Ltd.</div>
                </div>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold self-start sm:self-center">
                  JUL 2024 - MAY 2025
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Managed and maintained CRM records for 20–25 client leads and portfolios daily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Coordinated with cross-functional teams to support core banking operations using <strong>Oracle FLEXCUBE</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Developed daily, weekly, and monthly MIS reports using Excel to monitor channel performance and individual productivity.</span>
                </li>
              </ul>
            </div>

            {/* Digital Marveled */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">DIGITAL MARKETING &amp; SALES</span>
                  <h3 className="text-base font-bold text-white">Intern | Marketing &amp; Sales</h3>
                  <div className="text-xs text-slate-400 font-medium">Digital Marveled Pvt Ltd</div>
                </div>
                <span className="text-xs font-mono bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 font-bold self-start sm:self-center">
                  MAY 2023 - JUN 2023
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>Created marketing content using Canva for digital ads &amp; brand promotion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>Gained hands-on knowledge of Google Ads, SMM, SEM, SEO, CRM, Email Marketing &amp; Google Analytics to support digital marketing campaigns &amp; analysis.</span>
                </li>
              </ul>
            </div>

            {/* FactLive Startup */}
            <div className="bg-slate-900/80 border border-teal-500/30 p-6 rounded-2xl space-y-3 hover:border-teal-500/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider block">STARTUP VENTURE</span>
                  <h3 className="text-base font-bold text-white">Startup | Founder</h3>
                  <div className="text-xs text-slate-400 font-medium">FactLive Digital Solutions</div>
                </div>
                <span className="text-xs font-mono bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full border border-teal-500/20 font-bold self-start sm:self-center">
                  2025 – PRESENT
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Developed and managed business websites and digital assets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Created social media marketing campaigns and promotional content.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Designed business graphics, banners, and marketing materials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>Coordinated website maintenance and digital operations activities.</span>
                </li>
              </ul>
            </div>

            {/* eGranthakuti */}
            <div className="bg-slate-900/80 border border-orange-500/30 p-6 rounded-2xl space-y-3 hover:border-orange-500/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider block">E-COMMERCE VENTURE</span>
                  <h3 className="text-base font-bold text-white">Founder</h3>
                  <div className="text-xs text-slate-400 font-medium">eGranthakuti (E-Commerce Venture)</div>
                </div>
                <span className="text-xs font-mono bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full border border-orange-500/20 font-bold self-start sm:self-center">
                  2022
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Built and managed an online e-commerce platform.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Worked on digital promotion and customer engagement activities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Managed online business operations and catalog organization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>Gained practical experience in e-commerce workflows and customer support.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Core Skills Matrix Section */}
      {(activeTab === "all" || activeTab === "skills") && (
        <section className="space-y-6">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> Core Skills &amp; Tools Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-sky-400 font-bold uppercase">HR Management</div>
              <p className="text-xs text-slate-300 font-light">
                Conflict Resolution, Change Management, Data Literacy, Employment Law &amp; Compliance
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Operations Management</div>
              <p className="text-xs text-slate-300 font-light">
                Operations Coordination, Process Management, Customer Acquisition &amp; Onboarding, KYC Verification
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">CRM &amp; ERP Tools</div>
              <p className="text-xs text-slate-300 font-light">
                MS Dynamics 365, CRMNEXT, Oracle FLEXCUBE, Finacle
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase">Digital Marketing</div>
              <p className="text-xs text-slate-300 font-light">
                SMM, SEO, SEM, CRM, Email Marketing, Lead Generation
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-pink-400 font-bold uppercase">Design &amp; Web</div>
              <p className="text-xs text-slate-300 font-light">
                Canva, Web Design with no Code, Content Creation, Graphic Design
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Data &amp; Reporting</div>
              <p className="text-xs text-slate-300 font-light">
                Adv Excel, Google Sheets, MIS Reporting, Data Analysis, Dashboard Prep
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {(activeTab === "all" || activeTab === "education") && (
        <section className="space-y-6">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" /> Academic Qualifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded">2022 - 2024</span>
              <h3 className="text-sm font-bold text-white">PGDM (MBA) in HR and Marketing</h3>
              <p className="text-xs text-slate-400">GNIOT Institute of Management Studies (GIMS) | Greater Noida, Delhi NCR</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2.5 py-0.5 rounded">2018 - 2020</span>
              <h3 className="text-sm font-bold text-white">Masters (PG) in Geography</h3>
              <p className="text-xs text-slate-400">Kalinga University, Raipur, CG</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded">2015 - 2018</span>
              <h3 className="text-sm font-bold text-white">Bachelor (UG) in Psychology</h3>
              <p className="text-xs text-slate-400">MGKVP University, Varanasi, UP</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded">2013 &amp; 2015</span>
              <h3 className="text-sm font-bold text-white">12th PCM (85%) &amp; 10th (84%)</h3>
              <p className="text-xs text-slate-400">UP Board Secondary &amp; Higher Secondary</p>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {(activeTab === "all" || activeTab === "certifications") && (
        <section className="space-y-6">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" /> Training &amp; Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Diploma in Computer Applications | K Infotech pvt ltd, Delhi",
              "CCC | NIELIT",
              "Data Analytics Training | PW Skills",
              "Blockchain Technology &amp; Inter. Trade | De Montfort University, Dubai",
              "Google Analytics &amp; Google Digital Marketing",
              "Data &amp; Business Analytics | Nano Degree | Jobaaj Learning"
            ].map((cert, index) => (
              <div key={index} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3 text-xs text-slate-300 font-light">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
