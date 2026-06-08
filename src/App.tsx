import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PillarExplorer from "./components/PillarExplorer";
import Estimator from "./components/Estimator";
import AboutUs from "./components/AboutUs";
import Faqs from "./components/Faqs";
import Footer from "./components/Footer";
import Industries from "./components/Industries";
import Solutions from "./components/Solutions";
import AdmissionFlashCard from "./components/AdmissionFlashCard";
import DigitalRecognitionCard from "./components/DigitalRecognitionCard";
import { PILLARS_DATA, FAQS_DATA } from "./data";
import { SelectedService, Service } from "./types";
import { useRouter } from "./hooks/useRouter";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Settings, 
  Download, 
  Trash2, 
  Activity,
  User,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const { currentPath, navigate } = useRouter();

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const servicesRaw = params.get("services");
    const loaded: SelectedService[] = [];
    if (servicesRaw) {
      const serviceSlices = servicesRaw.split(";");
      serviceSlices.forEach((slice) => {
        const parts = slice.split(":");
        if (parts.length >= 3) {
          const pId = parts[0];
          const cId = parts[1];
          const sName = parts.slice(2).join(":");
          const pillar = PILLARS_DATA.find((p) => p.id === pId);
          if (pillar) {
            const category = pillar.categories.find((c) => c.id === cId);
            if (category) {
              const service = category.services.find((s) => s.name === sName);
              if (service) {
                loaded.push({ pillarId: pId, categoryId: cId, service });
              }
            }
          }
        }
      });
    }
    return loaded;
  });

  const [speed, setSpeed] = useState<"standard" | "rush" | "enterprise">(() => {
    const params = new URLSearchParams(window.location.search);
    const speedRaw = params.get("speed");
    if (speedRaw === "standard" || speedRaw === "rush" || speedRaw === "enterprise") {
      return speedRaw;
    }
    return "standard";
  });

  const [sla, setSla] = useState<"none" | "basic" | "premium">(() => {
    const params = new URLSearchParams(window.location.search);
    const slaRaw = params.get("sla");
    if (slaRaw === "none" || slaRaw === "basic" || slaRaw === "premium") {
      return slaRaw;
    }
    return "none";
  });

  const [name, setName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("name") || "";
  });

  const [email, setEmail] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("email") || "";
  });

  const [company, setCompany] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("company") || "";
  });

  const [urlCopied, setUrlCopied] = useState(false);
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  // Automatically update the URL query parameters whenever configuration changes
  useEffect(() => {
    const serviceStrings = selectedServices.map(
      (s) => `${s.pillarId}:${s.categoryId}:${s.service.name}`
    );
    const params = new URLSearchParams(window.location.search);
    
    if (serviceStrings.length > 0) {
      params.set("services", serviceStrings.join(";"));
    } else {
      params.delete("services");
    }
    
    if (speed !== "standard") params.set("speed", speed); else params.delete("speed");
    if (sla !== "none") params.set("sla", sla); else params.delete("sla");
    if (name) params.set("name", name); else params.delete("name");
    if (email) params.set("email", email); else params.delete("email");
    if (company) params.set("company", company); else params.delete("company");

    const searchString = params.toString();
    const newUrl = `${window.location.pathname}${searchString ? "?" + searchString : ""}`;
    
    window.history.replaceState(null, "", newUrl);
  }, [selectedServices, speed, sla, name, email, company]);

  const handleToggleService = (pillarId: string, categoryId: string, service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.some(
        (s) => s.pillarId === pillarId && s.categoryId === categoryId && s.service.name === service.name
      );

      if (exists) {
        return prev.filter(
          (s) => !(s.pillarId === pillarId && s.categoryId === categoryId && s.service.name === service.name)
        );
      } else {
        return [...prev, { pillarId, categoryId, service }];
      }
    });
  };

  const handleRemoveService = (pillarId: string, categoryId: string, sName: string) => {
    setSelectedServices((prev) =>
      prev.filter(
        (s) => !(s.pillarId === pillarId && s.categoryId === categoryId && s.service.name === sName)
      )
    );
  };

  const handleClearAll = () => {
    setSelectedServices([]);
  };

  // Compute stats for Dashboard rendering
  const activePillarsCount = Array.from(new Set(selectedServices.map(s => s.pillarId))).length;
  const subtotalCost = selectedServices.reduce((sum, s) => sum + s.service.basePrice, 0);

  const getPillarHomeColors = (colorName: string) => {
    switch (colorName) {
      case "cyan": 
        return {
          border: "border-red-500/15 hover:border-red-500 bg-[#0a1128] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]",
          badge: "bg-red-500/10 text-red-450 text-red-400 font-semibold",
          text: "text-red-400"
        };
      case "orange": 
        return {
          border: "border-sky-500/15 hover:border-sky-500 bg-[#0a1128] hover:shadow-[0_8px_30px_rgba(56,189,248,0.15)]",
          badge: "bg-sky-500/10 text-sky-400 font-semibold",
          text: "text-sky-400"
        };
      case "violet": 
        return {
          border: "border-white/15 hover:border-white bg-[#0a1128] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]",
          badge: "bg-white/10 text-white font-semibold",
          text: "text-white"
        };
      case "sky": 
        return {
          border: "border-sky-500/15 hover:border-sky-500 bg-[#0a1128] hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]",
          badge: "bg-sky-500/10 text-sky-400 font-semibold",
          text: "text-sky-400"
        };
      case "green": 
        return {
          border: "border-red-500/15 hover:border-red-500 bg-[#0a1128] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]",
          badge: "bg-red-500/10 text-red-450 text-red-400 font-semibold",
          text: "text-red-400"
        };
      default: 
        return {
          border: "border-white/5 hover:border-white/10 bg-[#0a1128]",
          badge: "bg-white/5 text-neutral-400",
          text: "text-neutral-400"
        };
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  };

  return (
    <div className="relative min-h-screen bg-[#030714] selection:bg-sky-500/30 selection:text-white flex flex-col">
      {/* Structural visual grid overlay */}
      <div className="grid-pattern-bg" />

      {/* Decorative Neon ambient gradients behind elements */}
      <div className="absolute top-[20%] left-[-10vw] w-[45vw] h-[45vw] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute top-[50%] right-[-10vw] w-[45vw] h-[45vw] rounded-full bg-red-500/5 blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[15%] left-[5vw] w-[40vw] h-[40vw] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none select-none z-0" />

      {/* Navigation Header */}
      <Header pillars={PILLARS_DATA} currentPath={currentPath} onNavigate={navigate} />

      {/* Interactive Browser Address and Link Tracker */}
      <div className="border-b border-white/[0.03] bg-[#020510]/80 backdrop-blur-sm relative z-40 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Path display breadcrumbs */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Secure Link System Ready" />
            <span className="uppercase text-neutral-500 tracking-wider">Active Router Link:</span>
            <span className="text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase font-semibold">
              {currentPath === "/" || currentPath === "" ? "Home (Dashboard)" : currentPath.slice(1)}
            </span>
          </div>

          {/* Virtual secure address bar container */}
          <div className="flex items-center gap-2 bg-[#040817] border border-white/5 mx-auto lg:mx-0 w-full sm:max-w-lg md:max-w-xl group/bar rounded-lg overflow-hidden p-1.5 px-3">
            <span className="font-mono text-[9px] font-bold text-sky-400 select-none uppercase tracking-widest shrink-0">
              HTTPS://
            </span>
            <div className="text-neutral-400 font-mono text-[10px] truncate select-all flex-grow tracking-wide">
              <span>guptech.com</span>
              <span className="text-white font-semibold">{currentPath}</span>
              <span className="text-sky-500/60">{window.location.search}</span>
            </div>
            
            <button
              onClick={handleCopyUrl}
              className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase rounded text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/25 border border-sky-400/20 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Copy active deep-link address to clipboard"
            >
              {urlCopied ? (
                <span className="text-emerald-450 text-emerald-400">COPIED!</span>
              ) : (
                <span>COPY URL</span>
              )}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[#38bdf8] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>SSL CERTIFIED</span>
          </div>

        </div>
      </div>

      {/* Main Container Content */}
      <main className="relative z-10 flex-grow py-8">
        <AnimatePresence mode="wait">
          {/* HOME VIEW */}
          {(currentPath === "/" || currentPath === "") && (
            <motion.div
              key="home-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-16"
            >
              <Hero pillars={PILLARS_DATA} onNavigate={navigate} />

              {/* New interactive Admission Open 2026 Flash Card */}
              <AdmissionFlashCard />

              {/* Home SOW Status Matrix Teaser block */}
              <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#0a1128] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
                    <div className="space-y-3 max-w-xl">
                      <div className="font-mono text-[9px] text-sky-400 tracking-widest uppercase flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-sky-400" />
                        MY SERVICE MIXER
                      </div>
                      <h3 className="font-display text-2xl text-white tracking-widest uppercase">
                        YOUR SELECTED SERVICES & ESTIMATES
                      </h3>
                      <p className="text-neutral-400 text-xs font-light leading-relaxed">
                        Mix-and-match services, select standard friendly support, and download a simple PDF estimate customized for your shop or micro-business.
                      </p>
                    </div>

                    <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0">
                      {selectedServices.length > 0 ? (
                        <>
                          <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-xl flex items-center gap-4 text-left">
                            <Layers className="w-5 h-5 text-sky-400 shrink-0" />
                            <div>
                              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                                CHOSEN SERVICES
                              </div>
                              <div className="text-white text-base font-bold">
                                {selectedServices.length} items · ESTIMATES
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate("/estimator")}
                              className="bg-sky-400 hover:bg-sky-300 text-black text-xs font-semibold px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 uppercase tracking-wider cursor-pointer font-mono"
                            >
                              GET YOUR ESTIMATE
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleClearAll}
                              className="border border-white/5 bg-black/20 hover:bg-red-500/10 hover:border-red-500/20 text-neutral-400 hover:text-red-400 p-3.5 rounded-xl transition-colors cursor-pointer"
                              title="Clear all active scope"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => navigate("/pillars")}
                          className="bg-sky-400/10 border border-sky-400/20 hover:border-sky-400 text-sky-400 hover:text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 uppercase text-xs tracking-wider font-mono cursor-pointer mx-auto lg:mx-0"
                        >
                          VIEW SERVICES DIRECTORY
                          <ArrowRight className="w-4 h-4 stroke-[2]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Core Pillars Grid Board */}
              <div className="max-w-7xl mx-auto px-6 space-y-8">
                <div className="space-y-2">
                  <div className="font-mono text-[9px] text-sky-400 tracking-[0.2em] uppercase flex items-center gap-2">
                    <span className="w-5 h-px bg-sky-400" />
                    CHOOSE YOUR TRACKS
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-white tracking-widest uppercase">
                    OUR CORE CAPABILITY PILLARS
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PILLARS_DATA.map((p) => {
                    const c = getPillarHomeColors(p.colorName);
                    const selectedInPillar = selectedServices.filter(s => s.pillarId === p.id);
                    
                    return (
                      <div
                        key={p.id}
                        onClick={() => navigate(`/pillars?p=${p.id}`)}
                        className={`border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between h-72 group ${c.border}`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-neutral-500">Pillar [{p.num}]</span>
                            {selectedInPillar.length > 0 ? (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2.5 py-1 rounded-md uppercase">
                                <CheckCircle className="w-2.5 h-2.5" />
                                {selectedInPillar.length} ACTIVE
                              </span>
                            ) : (
                              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded ${c.badge}`}>
                                Ready
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-display text-xl text-white tracking-wider uppercase group-hover:text-sky-400 transition-colors">
                              {p.name}
                            </h4>
                            <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-3">
                              {p.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                          <span className="tracking-wider">Explore Services ({p.categories.reduce((sSum, cat) => sSum + cat.services.length, 0)})</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom line businesses roadmap flashcard */}
              <div className="border-t border-white/5 pt-16">
                <DigitalRecognitionCard />
              </div>

              {/* Teaser About Us / credentials block on homepage */}
              <div className="border-t border-white/5 pt-16">
                <AboutUs />
              </div>
            </motion.div>
          )}

          {/* CAPABILITIES EXPLORER VIEW */}
          {currentPath.startsWith("/pillars") && (
            <motion.div
              key="pillars-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 space-y-2">
                <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  GUPTECH SERVICES spectrum
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase">
                  CAPABILITIES
                </h1>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-2xl">
                  Filter available services, toggle customizable blueprints across each core technology stack, and construct a real-time proposal tailored instantly to operational needs.
                </p>
              </div>

              <PillarExplorer
                pillars={PILLARS_DATA}
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
              />
            </motion.div>
          )}

          {/* SOLUTIONS VIEW */}
          {currentPath === "/solutions" && (
            <motion.div
              key="solutions-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Solutions
                pillars={PILLARS_DATA}
                selectedServices={selectedServices}
                onApplyBundle={setSelectedServices}
                onNavigate={navigate}
              />
            </motion.div>
          )}

          {/* INDUSTRIES VIEW */}
          {currentPath === "/industries" && (
            <motion.div
              key="industries-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Industries
                pillars={PILLARS_DATA}
                selectedServices={selectedServices}
                onApplyBundle={setSelectedServices}
                onNavigate={navigate}
              />
            </motion.div>
          )}

          {/* ESTIMATOR VIEW */}
          {currentPath === "/estimator" && (
            <motion.div
              key="estimator-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto px-6 pt-12 pb-4 space-y-2">
                <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  OPERATIONAL FEASIBILITY MATRIX
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase">
                  SOW PLANNER
                </h1>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-2xl">
                  Adjust scheduling velocity buffers and active support retainers SLA. Check dynamic calculations, copy markdown drafts, share configurations, and download formal PDFs instantly.
                </p>
              </div>

              <Estimator
                selectedServices={selectedServices}
                pillars={PILLARS_DATA}
                onClearAll={handleClearAll}
                onRemoveService={handleRemoveService}
                speed={speed}
                setSpeed={setSpeed}
                sla={sla}
                setSla={setSla}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                company={company}
                setCompany={setCompany}
              />
            </motion.div>
          )}

          {/* ABOUT US VIEW */}
          {currentPath === "/about" && (
            <motion.div
              key="about-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto px-6 pt-12 pb-2 space-y-2">
                <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  GUPTECH TEAM STRUCTURE & ETHOS
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase">
                  CREDENTIALS
                </h1>
              </div>
              <AboutUs />
            </motion.div>
          )}

          {/* FAQS VIEW */}
          {currentPath === "/faq" && (
            <motion.div
              key="faq-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="max-w-7xl mx-auto px-6 pt-12 pb-2 space-y-2">
                <div className="font-mono text-xs text-sky-400 tracking-widest uppercase">
                  VERIFIED DIRECTORY RESPONSES
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-white tracking-widest uppercase">
                  FREQUENT ANSWERS
                </h1>
              </div>
              <Faqs faqs={FAQS_DATA} />

              {/* High Integrity interactive Inquiry CTA Form box on FAQ page */}
              <div className="max-w-3xl mx-auto px-6 pb-24">
                <div className="bg-[#0a1128] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 text-center relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-400/[0.015] rounded-full blur-3xl pointer-events-none" />
                  <div className="space-y-3">
                    <h4 className="font-display text-xl text-white tracking-widest uppercase">
                      REQUEST AN AUTHORIZATION CODE
                    </h4>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-md mx-auto">
                      Have unique scaling constraints, specialized compliance protocols, or legacy frameworks? Request a consultation block with our operations team.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                    <input
                      type="email"
                      placeholder="Enter corporate email address"
                      className="bg-[#030714] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400/40 focus:ring-1 focus:ring-sky-400/20 w-full font-mono placeholder:text-neutral-600"
                    />
                    <button
                      onClick={() => alert("Thank you! Our digital services team will reach out within 1 business day with your token.")}
                      className="bg-sky-400 hover:bg-sky-300 text-black text-xs font-semibold px-5 py-2.5 rounded-xl font-mono uppercase tracking-wider cursor-pointer whitespace-nowrap"
                    >
                      REQUEST CODE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 404 CATCH-ALL ROUTE */}
          {currentPath !== "/" && 
           currentPath !== "" && 
           !currentPath.startsWith("/pillars") && 
           currentPath !== "/solutions" && 
           currentPath !== "/estimator" && 
           currentPath !== "/industries" && 
           currentPath !== "/about" && 
           currentPath !== "/faq" && (
            <motion.div
              key="404-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-md mx-auto text-center py-32 px-6"
            >
              <span className="font-display text-[10vw] leading-none text-white/5 select-none font-bold">404</span>
              <h2 className="font-display text-2xl text-white tracking-widest uppercase mt-4">
                ROUTE NOT FOUND
              </h2>
              <p className="text-xs text-neutral-400 font-light mt-2 max-w-xs mx-auto leading-relaxed">
                The specified endpoint does not correspond to an active GupTech service directory path. Verify your parameters and retry.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-sky-400 text-black text-[10px] font-semibold font-mono tracking-wider uppercase px-5 py-2.5 rounded-lg hover:bg-sky-300 transition-colors cursor-pointer mt-6"
              >
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured visual footer */}
      <Footer pillars={PILLARS_DATA} onNavigate={navigate} />
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
