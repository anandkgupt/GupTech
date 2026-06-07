import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Skull, 
  Eye, 
  Smartphone, 
  Globe, 
  Search, 
  Compass, 
  Flame, 
  ChevronRight,
  ShieldAlert,
  MapPin,
  Bot
} from "lucide-react";

interface StageDetail {
  step: string;
  title: string;
  status: string;
  description: string;
  theNothingProblem: string;
  theDigitalSolution: string;
  metricLabel: string;
  metricValue: string;
  actionAdvice: string;
  icon: any;
  accentColor: string;
  darkBg: string;
  borderColor: string;
}

export default function DigitalRecognitionCard() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [simulatedBusiness, setSimulatedBusiness] = useState<string>("local-service");

  const stages: StageDetail[] = [
    {
      step: "STAGE 01",
      title: "Absolute Zero (Nothing)",
      status: "Invisible State",
      description: "Working completely offline. No live website, no searchable coordinates, and no map indicators.",
      theNothingProblem: "Potential nearby clients can't search for you. You rely strictly on unpredictable offline word-of-mouth.",
      theDigitalSolution: "A fast-loading, structured landing page with pristine typography and SEO index registration.",
      metricLabel: "Digital Discovery Rate",
      metricValue: "0%",
      actionAdvice: "Establish a baseline digital address so clients can find your official operation online.",
      icon: Skull,
      accentColor: "text-red-400 bg-red-500/10 border-red-500/20",
      darkBg: "bg-red-950/10",
      borderColor: "border-red-500/20"
    },
    {
      step: "STAGE 02",
      title: "The Identity Build",
      status: "Verified Footprint",
      description: "Launching an optimized, beautifully styled single-screen home page tailored for modern devices.",
      theNothingProblem: "Prospects who hear your name find blank results or outdated legacy directories.",
      theDigitalSolution: "Responsive layouts, clear service descriptions, and optimized contact shortcuts.",
      metricLabel: "Initial Trust Index",
      metricValue: "45%",
      actionAdvice: "Verify your branding structure and launch an elegant digital domain layout.",
      icon: Globe,
      accentColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      darkBg: "bg-amber-950/10",
      borderColor: "border-amber-500/20"
    },
    {
      step: "STAGE 03",
      title: "Hyper-Local Reach",
      status: "Map Discovered",
      description: "Placing your business directly on major digital maps and optimizing local keyword algorithms.",
      theNothingProblem: "People searching 'near me' are funneled directly to high-ranking competitors.",
      theDigitalSolution: "Full Google & Apple map synchronization, verified local listings, and geo-targeted metadata.",
      metricLabel: "Map Search Appearances",
      metricValue: "6.5x Increase",
      actionAdvice: "Establish localized service descriptions to show up instantly on nearby searches.",
      icon: MapPin,
      accentColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      darkBg: "bg-sky-950/10",
      borderColor: "border-sky-500/20"
    },
    {
      step: "STAGE 04",
      title: "Automated Bookings",
      status: "Efficient Pipeline",
      description: "Eliminating manual scheduling friction by adding interactive automated reservation tools.",
      theNothingProblem: "Missing client booking requests during off-hours or spending hours on phone tag.",
      theDigitalSolution: "Self-serve calendars, automated reminders, and custom intake forms.",
      metricLabel: "Admin Hours Saved",
      metricValue: "12 hrs/week",
      actionAdvice: "Integrate automatic calendar triggers to validate leads 24/7 without manual labor.",
      icon: Bot,
      accentColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      darkBg: "bg-violet-950/10",
      borderColor: "border-violet-500/20"
    },
    {
      step: "STAGE 05",
      title: "Dominant Recognition",
      status: "Self-Sustaining Leader",
      description: "Systematic collection of client reviews and automated referral strategies.",
      theNothingProblem: "Great physical work goes unrecorded, leaving no digital proof to seal high-ticket leads.",
      theDigitalSolution: "Automated review harvest loops, multi-platform ratings sync, and high ranking authority.",
      metricLabel: "Local Search Ranking",
      metricValue: "#1 in Territory",
      actionAdvice: "Turn every finished project into immediate public social proof to perpetually harvest leads.",
      icon: Sparkles,
      accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      darkBg: "bg-emerald-950/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  const currentStageInfo = stages[activeStage];
  const CurrentIcon = currentStageInfo.icon;

  const businessTypes = [
    { id: "local-service", label: "Trade & Local Service", nothing: "Car mechanic or plumber invisible on local map.", recognized: "Discovered first for 'near me' urgent requests; automated text bookings active." },
    { id: "consultant", label: "Professional Consultant", nothing: "No clean portfolio or calendar booking tools.", recognized: "Dynamic SOW proposals shared via custom link with automatic deposits." },
    { id: "retail-shop", label: "Boutique & Retail", nothing: "Relying purely on sidewalk foot traffic and high rent.", recognized: "In-store pickup bookings online synchronized with dynamic digital catalogs." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-4" id="digital-recognition-flashcard-container">
      
      {/* Decorative Title Banner Section */}
      <div className="mb-8 space-y-2">
        <span className="font-mono text-xs text-sky-400 tracking-widest uppercase flex items-center gap-2">
          <span className="h-px w-8 bg-sky-450 bg-sky-400" />
          GROWTH MATRIX FOR BOTTOM-LINE BUSINESSES
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-white tracking-widest uppercase">
          FROM NOTHING TO DIGITAL RECOGNITION
        </h3>
        <p className="text-xs text-neutral-400 font-light max-w-2xl leading-relaxed">
          The exact roadmap we use to convert traditional bottom-line operations into localized digital leaders. Toggle through each stage below to diagnose where your business stands today and find the precise treatment to advance.
        </p>
      </div>

      {/* Main Roadmap Flashcard Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side Navigation & Stage Track Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
              DIAGNOSE YOUR CURRENT STATE
            </span>
            <div className="space-y-2">
              {stages.map((stage, idx) => {
                const isSelected = activeStage === idx;
                const StageIcon = stage.icon;
                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveStage(idx)}
                    className={`w-full p-4 rounded-2xl text-left border cursor-pointer transition-all duration-300 flex items-center justify-between group overflow-hidden relative ${
                      isSelected
                        ? `bg-sky-500/10 border-sky-400 text-white shadow-[0_4px_25px_rgba(56,189,248,0.12)]`
                        : "bg-[#0a1128] border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                    }`}
                  >
                    {/* Subtle micro background glow for selection */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent pointer-events-none" />
                    )}

                    <div className="flex items-center gap-3 relative.z-10 flex-grow">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${
                        isSelected ? "bg-sky-400 text-black scale-105" : "bg-white/5 text-neutral-400 group-hover:scale-105"
                      }`}>
                        <StageIcon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      
                      <div className="space-y-0.5 truncate">
                        <span className="font-mono text-[8px] text-neutral-500 tracking-widest uppercase block">
                          {stage.step}
                        </span>
                        <h4 className="text-xs font-semibold tracking-wider uppercase truncate">
                          {stage.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded uppercase hidden sm:inline ${
                        isSelected ? "bg-sky-500/20 text-sky-400" : "bg-white/5 text-neutral-500"
                      }`}>
                        {stage.status}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "text-sky-400 translate-x-1" : "text-neutral-600"}`} />
                    </div>

                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Business Simulator Switcher */}
          <div className="bg-[#0a1128] border border-white/5 rounded-2xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/[0.01] rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                SELECT A BUSINESS FORMAT
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {businessTypes.map((type) => {
                const isActive = simulatedBusiness === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSimulatedBusiness(type.id)}
                    className={`p-2.5 rounded-xl border text-[9px] font-mono font-medium tracking-wider uppercase text-center transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-sky-500/15 border-sky-400 text-white"
                        : "bg-[#030714] border-white/5 text-neutral-500 hover:text-white"
                    }`}
                  >
                    {type.id === "local-service" ? "Local Shop" : type.id === "consultant" ? "Professional" : "Retail"}
                  </button>
                );
              })}
            </div>
            
            {/* Simulation text output */}
            <AnimatePresence mode="wait">
              <motion.div
                key={simulatedBusiness}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 pt-2 border-t border-white/5"
              >
                <div>
                  <span className="font-mono text-[8px] text-red-500 uppercase tracking-widest block font-semibold">FROM ABSOLUTE NOTHING:</span>
                  <p className="text-[11px] text-neutral-300 font-light">
                    {businessTypes.find(t => t.id === simulatedBusiness)?.nothing}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-emerald-400 uppercase tracking-widest block font-semibold">TO DIGITAL RECOGNITION:</span>
                  <p className="text-[11px] text-sky-100 font-light">
                    {businessTypes.find(t => t.id === simulatedBusiness)?.recognized}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Right Side: The Dynamic Flashcard Interactive Workspace */}
        <div className="lg:col-span-7 bg-[#0a1128] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          
          {/* Ambient Glow backing */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-500/[0.02] rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 flex-grow flex flex-col justify-between"
            >
              
              {/* Card Meta & Big Stat Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-[#38bdf8] uppercase tracking-widest">
                      {currentStageInfo.step} &bull; THE ROAD TO LOCAL POWER
                    </span>
                    <h3 className="font-display text-2xl text-white uppercase tracking-wider">
                      {currentStageInfo.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">
                      {currentStageInfo.metricLabel.toUpperCase()}
                    </span>
                    <span className="text-3xl font-display text-sky-400 tracking-wider">
                      {currentStageInfo.metricValue}
                    </span>
                  </div>
                </div>

                {/* Conceptual Summary Statement */}
                <div className="p-4 bg-[#030714] border border-white/5 rounded-2xl flex gap-3.5 items-start">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${currentStageInfo.accentColor}`}>
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                      STAGE OBJECTIVE
                    </span>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light">
                      {currentStageInfo.description}
                    </p>
                  </div>
                </div>

                {/* The Comparison: Nothing vs Digital Recognition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Nothing Side */}
                  <div className="bg-red-500/[0.02] border border-red-500/10 p-5 rounded-2xl space-y-1 relative overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1 text-red-400">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span className="font-mono text-[8.5px] font-bold tracking-widest uppercase">The "Nothing" Danger</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {currentStageInfo.theNothingProblem}
                    </p>
                  </div>

                  {/* Recognition Side */}
                  <div className="bg-emerald-500/[0.02] border border-emerald-500/10 p-5 rounded-2xl space-y-1 relative overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="font-mono text-[8.5px] font-bold tracking-widest uppercase font-mono">The Recognition Fix</span>
                    </div>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {currentStageInfo.theDigitalSolution}
                    </p>
                  </div>

                </div>

              </div>

              {/* Action Recommendation */}
              <div className="mt-8 pt-5 border-t border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#030714] p-4 rounded-xl border border-white/5">
                  <div className="space-y-1">
                    <span className="font-mono text-[8.5px] text-neutral-450 text-neutral-550 block text-[#38bdf8] tracking-widest uppercase">
                      IMMEDIATE ACTION PREFERENCE
                    </span>
                    <p className="text-xs text-neutral-400 font-light">
                      {currentStageInfo.actionAdvice}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      // Navigate to SOW planner and select the foundational setup or marketing depending on stage
                      window.location.hash = "estimator-section";
                      const el = document.getElementById("estimator-section");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="relative shrink-0 text-center inline-flex items-center gap-1.5 bg-sky-400 hover:bg-sky-305 hover:bg-sky-300 text-black font-mono font-bold text-[9px] uppercase tracking-widest py-2 px-3.5 rounded-lg transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    DEPLOY SOLUTION
                    <ArrowRight className="w-3 h-3 stroke-[2]" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
