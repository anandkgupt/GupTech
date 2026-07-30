import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Sparkles,
  QrCode,
  Compass,
  MessageCircle
} from "lucide-react";
import { AnandLogo } from "./AnandLogo";

interface ProgramDetail {
  title: string;
  duration: string;
  eligibility: string;
  courses: string[];
}

export default function AdmissionFlashCard() {
  const [activeTab, setActiveTab] = useState<"ug" | "pg" | "cert" | "research">("ug");
  const [showQr, setShowQr] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const programs: Record<"ug" | "pg" | "cert" | "research", ProgramDetail> = {
    cert: {
      title: "Certificate Courses",
      duration: "6 Months Buffer",
      eligibility: "10+2 (Any Stream) or Equivalent",
      courses: [
        "Certificate in Animation",
        "Certificate in 2D Animation",
        "Certificate in 3D Animation",
        "Certificate in Graphic Designing",
        "Certificate in Video Editing",
        "Certificate in Visual Effects (VFX)",
        "Certificate in Motion Graphics",
        "Certificate in Gaming Design",
        "Certificate in Web & Multimedia",
        "Certificate in Digital Photography"
      ]
    },
    ug: {
      title: "Undergraduate (UG)",
      duration: "3 Years Full-Time",
      eligibility: "10+2 (Any Stream) or Equivalent",
      courses: [
        "B.Sc. Animation & Multimedia",
        "B.A. Animation & Graphic Design",
        "B.Sc. VFX & Animation",
        "B.Des. Multimedia Design",
        "B.Sc. Game Design & Development",
        "BCA Animation & Gaming",
        "B.Sc. Film Making & Editing",
        "Bachelor in Digital Media",
        "B.Sc. Multimedia & Web Technology",
        "B.A. Film & Television Production"
      ]
    },
    pg: {
      title: "Post Graduate (PG)",
      duration: "2 Years Advanced",
      eligibility: "Bachelor's Degree in Relevant Field or Equivalent",
      courses: [
        "M.Sc. Animation & Multimedia",
        "M.A. Animation Studies",
        "M.Sc. VFX & Digital Media",
        "M.Des. Multimedia & Design",
        "M.Sc. Game Design & Development",
        "MCA Animation & Multimedia",
        "M.Sc. Film Production",
        "Master in Digital Arts",
        "M.A. Digital Communication",
        "Master in Visual Communication"
      ]
    },
    research: {
      title: "Research Programs",
      duration: "3 Years Specialized",
      eligibility: "Post-Graduate Degree or Equivalent",
      courses: [
        "Ph.D. in Animation & Multimedia",
        "Ph.D. in Visual Effects",
        "Ph.D. in Digital Media",
        "Ph.D. in Film & Multimedia",
        "Ph.D. in Animation Technology",
        "Ph.D. in Interactive Media",
        "Ph.D. in Gaming Technology",
        "Ph.D. in Graphic Communication",
        "Ph.D. in Creative Media",
        "Ph.D. in Multimedia Design"
      ]
    }
  };

  const currentProgram = programs[activeTab];

  const handleCopyCoord = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6" id="admission-flashcard-container">
      <div className="bg-gradient-to-b from-[#0b122c] to-[#040817] border border-sky-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(56,189,248,0.15)]">
        
        {/* Neon Glow Spots */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none select-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none select-none" />

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 border-b border-white/5 pb-8 mb-8">
          
          {/* Main Title info block */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <AnandLogo size="sm" lightText={true} />
              <span className="font-mono text-[9px] tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 font-bold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                ADMISSION OPEN 2026
              </span>
              <span className="font-mono text-[9px] tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full uppercase">
                UGC ACT, 1956 SECTION 2(F) APPROVED
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                ASIAN INTERNATIONAL UNIVERSITY (AIU) MANIPUR
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-white tracking-widest lead-none uppercase">
                ANIMATION & <br className="hidden sm:inline" />
                <span className="text-transparent italic" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                  MULTIMEDIA
                </span>
              </h2>
            </div>
            
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-xl">
              Equip yourself with premium technical assets in animation pipelines, graphic designing systems, game design structures, and motion logic. Build production-grade workflows modeled on certified academic plans.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 w-full">
            <div className="bg-[#030714] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Duration Limits</span>
              <div>
                <span className="text-xl font-display text-white block">6 MO. - 3 YR.</span>
                <span className="text-[9px] font-mono text-sky-400 uppercase">Speed Tiers</span>
              </div>
            </div>
            
            <div className="bg-[#030714] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Faculty Category</span>
              <div>
                <span className="text-xl font-display text-red-400 block uppercase">Animation</span>
                <span className="text-[9px] font-mono text-neutral-400 block">Multimedia Track</span>
              </div>
            </div>

            <div className="bg-[#030714] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Consultation Price</span>
              <div>
                <span className="text-xl font-display text-white block">FREE</span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">100% Scholarship Support</span>
              </div>
            </div>

            <div className="bg-[#030714] border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Admission Guidance</span>
              <div>
                <span className="text-xs font-semibold text-white block truncate">Anand K Gupta</span>
                <span className="text-[9px] font-mono text-sky-400 uppercase">Freelance Counselor</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Interactive Explorer Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">

          {/* Left panel: Tab selection and eligibility checklist */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-[9px] text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                SELECT YOUR TRACK
              </div>
              
              <div className="flex flex-col gap-2">
                {(Object.keys(programs) as Array<"ug" | "pg" | "cert" | "research">).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? "bg-sky-500/10 border-sky-400 text-white shadow-[0_4px_20px_rgba(56,189,248,0.15)]"
                          : "bg-[#030714] border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-medium tracking-wider uppercase block">
                          [{tab === "ug" ? "UG" : tab === "pg" ? "PG" : tab === "cert" ? "CERT" : "PHD"}]
                        </span>
                        <h4 className="text-sm font-semibold tracking-wider uppercase">
                          {programs[tab].title}
                        </h4>
                      </div>
                      <ChevronRightIcon className={`w-4 h-4 transition-transform ${isActive ? "text-sky-400 translate-x-1" : "text-neutral-600"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Eligibility specifications */}
            <div className="bg-[#030714]/60 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Active Eligibility Requirements</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-semibold text-white block">
                  {currentProgram.eligibility}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 block">
                  Academic Standard duration: {currentProgram.duration}
                </span>
              </div>
            </div>

          </div>

          {/* Center/Right Dynamic Course Index Display */}
          <div className="lg:col-span-7 bg-[#030714] border border-white/5 rounded-3xl p-6 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-red-400" />
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                    {currentProgram.title.toUpperCase()} INDEX ({currentProgram.courses.length} SLOTS)
                  </span>
                </div>
                <span className="font-mono text-[9px] text-sky-400 uppercase tracking-wider bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  {currentProgram.duration}
                </span>
              </div>

              {/* Staggered dynamic course lists */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                >
                  {currentProgram.courses.map((course, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5 border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/5 px-3 py-2.5 rounded-xl transition-all"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="text-xs text-neutral-200 font-light tracking-wide truncate">{course}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counselor Support Contact panel */}
            <div className="border-t border-white/5 mt-6 pt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              <div className="md:col-span-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-red-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-neutral-400">
                    Freelance Counselor
                  </div>
                  <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                    Anand K Gupta
                    <span className="w-1.5 h-1.5 rounded bg-green-500 shrink-0" title="Online for Admissions" />
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    Free Expert Academic Consultation & Global Admission Support
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2">
                <a
                  href="https://wa.me/919711277478?text=Hello%20Anand%2C%20I%27m%20interested%20in%20AIU%20Animation%20and%20Multimedia%20Admission%20info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center inline-flex justify-center items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-95 text-black font-mono font-bold tracking-wider text-[10px] uppercase py-2.5 px-3 rounded-lg duration-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  CHAT COUNSELOR
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Footer info strip of card */}
        <div className="border-t border-white/5 mt-8 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-light text-neutral-400">
          
          <div 
            onClick={() => handleCopyCoord("+91 9711277478", "tel")}
            className="flex items-center gap-3 bg-neutral-900/30 hover:bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] hover:border-white/5 cursor-pointer transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">Direct WhatsApp</div>
              <div className="text-xs font-semibold text-white font-mono">+91 9711277478</div>
            </div>
            {copiedText === "tel" && <span className="ml-auto text-[9px] font-mono text-emerald-400 uppercase">Copied</span>}
          </div>

          <div 
            onClick={() => handleCopyCoord("anandanalyst.in@gmail.com", "email")}
            className="flex items-center gap-3 bg-neutral-900/30 hover:bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] hover:border-white/5 cursor-pointer transition-colors"
          >
            <Mail className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">Official Email</div>
              <div className="text-xs font-semibold text-white font-mono break-all">anandanalyst.in@gmail.com</div>
            </div>
            {copiedText === "email" && <span className="ml-auto text-[9px] font-mono text-emerald-400 uppercase">Copied</span>}
          </div>

          <a 
            href="https://anandanalyst.in/admission"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-900/30 hover:bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] hover:border-white/5 cursor-pointer transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">Consultation Portal</div>
              <div className="text-xs font-semibold text-white font-mono">anandanalyst.in/admission</div>
            </div>
          </a>

          <a 
            href="https://www.aiu.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-900/30 hover:bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] hover:border-white/5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">University Registrar</div>
              <div className="text-xs font-semibold text-white font-mono">www.aiu.edu.in</div>
            </div>
          </a>

        </div>

      </div>
    </div>
  );
}

function ChevronRightIcon(props: { className?: string }) {
  return (
    <svg 
      className={props.className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" fill="none" />
    </svg>
  );
}
