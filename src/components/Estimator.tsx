import React, { useState } from "react";
import { 
  Calculator, 
  FileText, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Sparkle,
  Download,
  Share2
} from "lucide-react";
import { jsPDF } from "jspdf";
import { SelectedService, Pillar } from "../types";

interface EstimatorProps {
  selectedServices: SelectedService[];
  pillars: Pillar[];
  onClearAll: () => void;
  onRemoveService: (pId: string, cId: string, sName: string) => void;
  speed: "standard" | "rush" | "enterprise";
  setSpeed: (val: "standard" | "rush" | "enterprise") => void;
  sla: "none" | "basic" | "premium";
  setSla: (val: "none" | "basic" | "premium") => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  company: string;
  setCompany: (val: string) => void;
}

export default function Estimator({
  selectedServices,
  pillars,
  onClearAll,
  onRemoveService,
  speed,
  setSpeed,
  sla,
  setSla,
  name,
  setName,
  email,
  setEmail,
  company,
  setCompany,
}: EstimatorProps) {
  // Config state
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleShareConfig = () => {
    const serviceStrings = selectedServices.map(
      (s) => `${s.pillarId}:${s.categoryId}:${s.service.name}`
    );
    const params = new URLSearchParams();
    if (serviceStrings.length > 0) {
      params.set("services", serviceStrings.join(";"));
    }
    if (speed !== "standard") params.set("speed", speed);
    if (sla !== "none") params.set("sla", sla);
    if (name) params.set("name", name);
    if (email) params.set("email", email);
    if (company) params.set("company", company);

    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(shareableUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Math Calculations
  const basePriceSum = selectedServices.reduce((sum, s) => sum + s.service.basePrice, 0);
  
  // Speed multipliers
  const speedLabel = {
    standard: "Standard Delivery",
    rush: "Express Rush (30% Faster Delivery)",
    enterprise: "Enterprise Delivery (Multi-environment & Audited)"
  };
  
  const speedMultipliers = {
    standard: 1.0,
    rush: 1.3, // +30% cost, but faster
    enterprise: 1.75 // Enterprise deployment + support
  };

  const speedDurationMultipliers = {
    standard: 1.0,
    rush: 0.7, // 30% less time
    enterprise: 1.15 // more time due to rigorous staging/testing
  };

  // Maintenance tiers
  const maintenancePrices = {
    none: 0,
    basic: 0, // per month (Free)
    premium: 0 // per month (Free)
  };

  const totalPrice = Math.round(
    basePriceSum * speedMultipliers[speed] +
    (selectedServices.length > 0 ? maintenancePrices[sla] : 0)
  );

  // Timeline estimates: parallel task multiplier
  const parallelTaskFactor = 0.65; // tasks scale parallel
  const cumulativeDays = selectedServices.reduce((sum, s) => sum + s.service.durationDays, 0);
  const estimatedDays = Math.max(
    5, // baseline
    Math.round(cumulativeDays * parallelTaskFactor * speedDurationMultipliers[speed])
  );

  const handleCopyProposal = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPdf = () => {
    if (selectedServices.length === 0) return;

    // Create a new A4 sized PDF in portrait mode
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    let y = 20;

    // PAGE BORDER & HEADER CYAN ACCENT LINE
    doc.setDrawColor(0, 229, 255);
    doc.setLineWidth(1.2);
    doc.line(15, 12, 195, 12);

    // BRAND LOGO
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(6, 8, 11);
    doc.text("GupTech", 15, 23);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110, 125, 140);
    doc.text("INTEGRATED DIGITAL SERVICES PLATFORM / SOW BLUEPRINT", 15, 28);

    // DATE & METRIC DETAILS RIGHT-ALIGNED
    const nowStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    doc.setFontSize(9);
    doc.text(`DATE GENERATED: ${nowStr}`, 195, 23, { align: "right" });
    doc.text(`PROPOSAL ID: GUP-${Math.floor(100000 + Math.random() * 900000)}`, 195, 28, { align: "right" });

    // HORIZONTAL DIVIDER
    doc.setDrawColor(220, 225, 230);
    doc.setLineWidth(0.5);
    doc.line(15, 33, 195, 33);

    y = 42;

    // SECTION 1: ENGAGEMENT SCOPE SUMMARY
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(6, 8, 11);
    doc.text("1. ENGAGEMENT SCOPE SUMMARY", 15, y);
    y += 6;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 70, 80);
    const scopeOverview = `This Statement of Work (SOW) outlines your configured technology delivery profile consisting of ${selectedServices.length} custom-tailored operational capabilities selected from GupTech's services. The requirements, estimated duration, and pricing are compiled dynamically below:`;
    const splitOverview = doc.splitTextToSize(scopeOverview, 180);
    doc.text(splitOverview, 15, y);
    y += splitOverview.length * 5 + 6;

    // SECTION 2: CONFIGURED SERVICE CAPABILITIES
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(6, 8, 11);
    doc.text("2. CONFIGURED SERVICE CAPABILITIES", 15, y);
    y += 8;

    // Group selected services by pillar
    const servicesByPillar: Record<string, SelectedService[]> = {};
    selectedServices.forEach((s) => {
      if (!servicesByPillar[s.pillarId]) {
        servicesByPillar[s.pillarId] = [];
      }
      servicesByPillar[s.pillarId].push(s);
    });

    Object.keys(servicesByPillar).forEach((pId) => {
      const pill = pillars.find((p) => p.id === pId);
      if (pill) {
        // Prevent bottom overflow
        if (y > 255) {
          doc.addPage();
          doc.setDrawColor(0, 229, 255);
          doc.setLineWidth(1.2);
          doc.line(15, 12, 195, 12);
          y = 25;
        }

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59); // slate navy contrast
        doc.text(`Pillar [${pill.num}] ${pill.name.toUpperCase()}`, 15, y);
        y += 4;

        // Subtle bottom border below pillar name
        doc.setDrawColor(235, 240, 245);
        doc.setLineWidth(0.3);
        doc.line(15, y, 195, y);
        y += 5;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);

        servicesByPillar[pId].forEach((item) => {
          if (y > 265) {
            doc.addPage();
            doc.setDrawColor(0, 229, 255);
            doc.setLineWidth(1.2);
            doc.line(15, 12, 195, 12);
            y = 25;
          }

          // Bullet point
          doc.setFillColor(0, 229, 255);
          doc.circle(18, y - 1, 0.8, "F");

          // Service Title
          doc.setFont("Helvetica", "bold");
          doc.setTextColor(30, 35, 45);
          doc.text(item.service.name, 22, y);

          // Details on right hand side
          doc.setFont("Helvetica", "normal");
          doc.setTextColor(100, 110, 125);
          const detailsString = `Base Starting: INR ${Math.round(item.service.basePrice * 83).toLocaleString("en-IN")}  |  Estimate: ~${item.service.durationDays}d`;
          doc.text(detailsString, 195, y, { align: "right" });

          y += 5.5;
        });

        y += 4; // space between pillars
      }
    });

    // Verify space for core engagement metrics box
    if (y > 195) {
      doc.addPage();
      doc.setDrawColor(0, 229, 255);
      doc.setLineWidth(1.2);
      doc.line(15, 12, 195, 12);
      y = 25;
    }

    y += 5;

    // SECTION 3: KEY DELIVERY METRICS
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(6, 8, 11);
    doc.text("3. CORE ENGAGEMENT SUMMARY", 15, y);
    y += 8;

    // Highlight metrics block
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(225, 230, 238);
    doc.setLineWidth(0.4);
    doc.rect(15, y, 180, 48, "FD");

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 110, 125);
    
    // Priority Speed
    doc.text("Priority Speed Tier:", 20, y + 8);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(40, 45, 55);
    doc.text(speedLabel[speed], 70, y + 8);

    // Support SLA Retainer
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 110, 125);
    doc.text("Support Retainer SLA:", 20, y + 16);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(40, 45, 55);
    const selectedSlaLabel = sla === "none" ? "Ad-hoc support tier" : sla === "basic" ? "Basic SLA support (Free retainer)" : "Premium enterprise support (Free guaranteed retainer)";
    doc.text(selectedSlaLabel, 70, y + 16);

    // Parallel schedule time
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 110, 125);
    doc.text("Business Days Turnaround:", 20, y + 24);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(40, 45, 55);
    doc.text(`~ ${estimatedDays} business days (concurrent pipeline)`, 70, y + 24);

    // Cumulative subtotal
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 110, 125);
    doc.text("Cumulative Engineering Base:", 20, y + 32);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(40, 45, 55);
    doc.text(`INR ${Math.round(basePriceSum * 83).toLocaleString("en-IN")}`, 70, y + 32);

    // Highlight bottom border for price
    doc.setDrawColor(220, 225, 232);
    doc.line(20, y + 36, 190, y + 36);

    // Integrated estimated total cost
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 140, 160);
    doc.text("INTEGRATED INVESTMENT:", 20, y + 42);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(6, 8, 11);
    doc.text(`INR ${Math.round(totalPrice * 83).toLocaleString("en-IN")}`, 70, y + 42);

    y += 58;

    // Contact metadata if filled by client
    if (name || email) {
      if (y > 270) {
        doc.addPage();
        doc.setDrawColor(0, 229, 255);
        doc.setLineWidth(1.2);
        doc.line(15, 12, 195, 12);
        y = 25;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(6, 8, 11);
      doc.text("4. CLIENT PARTNER DIRECTORY", 15, y);
      y += 5.5;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 90, 100);
      const guestInfoLine = `Primary Lead: ${name}  |  Company: ${company || "Not Specified"}  |  Email Address: ${email}`;
      doc.text(guestInfoLine, 15, y);
      y += 10;
    }

    if (y > 265) {
      doc.addPage();
      doc.setDrawColor(0, 229, 255);
      doc.setLineWidth(1.2);
      doc.line(15, 12, 195, 12);
      y = 25;
    }

    // Disclaimer Legal footer notes
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(140, 150, 165);
    const disclaimerString = "Disclaimer: This Statement of Work summary operates as an interactive guideline calculated based on raw resource rates and dynamic estimation curves. All pricing, scope configurations, and delivery paths remain subject to final verification and formal authorization guidelines.";
    const splitDisclaimer = doc.splitTextToSize(disclaimerString, 180);
    doc.text(splitDisclaimer, 15, y);

    // Uniform bottom running headers across pages
    const pageNumCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageNumCount; i++) {
      doc.setPage(i);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(160, 170, 185);
      doc.text(`Page ${i} of ${pageNumCount}`, 105, 287, { align: "center" });
      doc.text("GUPTECH DIGITAL SERVICES PLATFORM SOW GENERATOR", 15, 287);
    }

    // Trigger immediate browser dynamic download
    const cleanCompanyName = company ? company.toLowerCase().replace(/[^a-z0-9]/g, "_") : "guptech";
    doc.save(`${cleanCompanyName}_sow_proposal.pdf`);
  };

  // SOW text generator
  const getProposalMarkdown = () => {
    if (selectedServices.length === 0) {
      return `### SOW Scope Proposal Draft
Select active capability items in the directory sections above to automatically populate this live proposal framework. Included modules will reflect architectural costs, turnaround timelines, and comprehensive implementation metrics in real time.`;
    }

    let servicesByPillar: Record<string, SelectedService[]> = {};
    selectedServices.forEach((s) => {
      if (!servicesByPillar[s.pillarId]) {
        servicesByPillar[s.pillarId] = [];
      }
      servicesByPillar[s.pillarId].push(s);
    });

    let pillarBreakdowns = "";
    Object.keys(servicesByPillar).forEach((pId) => {
      const pill = pillars.find((p) => p.id === pId);
      if (pill) {
        pillarBreakdowns += `\n#### Pillar [${pill.num}] ${pill.name}\n`;
        servicesByPillar[pId].forEach((item) => {
          pillarBreakdowns += `- **${item.service.name}** — Starting Base: ₹${Math.round(item.service.basePrice * 83).toLocaleString("en-IN")} INR (${item.service.durationDays}d estimate)\n`;
        });
      }
    });

    const sow = `## GupTech STATEMENT OF WORK (SOW)
*Draft Proposal — Real-time Generation*

### 1. ENGAGEMENT SCOPE SUMMARY
Integrated technology delivery engagement consisting of ${selectedServices.length} custom operational deliverables selected from GupTech's services:

${pillarBreakdowns}
### 2. CORE DELIVERABLE PARAMETERS
- **Speed tier priority:** ${speedLabel[speed]}
- **Maintenance / Integration SLA Support:** ${sla === "none" ? "Ad-hoc support tier" : sla === "basic" ? "Basic SLA support (Free Retainer)" : "Premium enterprise support (Free Retainer)"}
- **Estimated Engagement Duration:** ~ ${estimatedDays} business days

### 3. COST MATRIX ESTIMATE
- **Cumulative Engineering Base:** ₹0 INR (Free)
- **Speed Multiplier Weight:** x${speedMultipliers[speed].toFixed(2)}
- **Ongoing Support Retainer monthly starting price:** ₹0 INR (Free)
- **Integrated Scope Estimated Investment:** ₹0 INR (Free)

*Note: This scope draft is automatically formulated using initial algorithmic estimation standards. Deliverables are subject to final architectural workshops prior to contract sign-off.*`;

    return sow;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setHasSubmitted(true);
  };

  return (
    <section id="estimator-section" className="border-t border-white/5 py-20 relative bg-[#030714]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Parameters, selected lists and summary metrics */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Calculator className="w-3.5 h-3.5 animate-pulse text-sky-400" />
              YOUR EASY PLANNER
            </div>
            <h3 className="font-display text-4xl md:text-5xl text-white tracking-widest uppercase">
              PROJECT PLAN
            </h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md mt-2">
              Select the friendly services you need above, choose custom delivery speeds, and review your customized plan details dynamically below.
            </p>
          </div>

          {/* Active selection listing */}
          <div className="bg-[#0a1128] border border-white/5 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium tracking-wider text-neutral-300">
                MY SELECTED SERVICES ({selectedServices.length} ITEMS)
              </span>
              {selectedServices.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300 transition-colors"
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            {selectedServices.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-xl p-8 text-center space-y-2">
                <FileText className="w-8 h-8 text-neutral-600 mx-auto stroke-1" />
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Your selected services list is currently empty. Scroll back up and click on any services to build your customized plan!
                </p>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1.5 scrollbar-thin">
                {selectedServices.map((item, index) => {
                  const pillar = pillars.find((p) => p.id === item.pillarId);
                  return (
                    <div
                      key={index}
                      className="bg-neutral-900/50 hover:bg-neutral-900/80 border border-white/5 rounded-lg px-3.5 py-2.5 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Dot indicator coloring matching the pillar */}
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0" 
                          style={{ backgroundColor: pillar?.colorHex || "#fff" }}
                        />
                        <div>
                          <p className="text-xs font-medium text-white">{item.service.name}</p>
                          <p className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5">
                            {pillar?.name}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveService(item.pillarId, item.categoryId, item.service.name)}
                        className="text-[10px] font-mono text-neutral-500 hover:text-red-400 px-1 py-0.5 rounded transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SOW Configuration parameters */}
          {selectedServices.length > 0 && (
            <div className="space-y-6">
              {/* Delivery Speed Parameters */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-neutral-400 tracking-wider">
                  DELIVERY SPEED
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "standard", label: "Standard Pace", desc: "Regular turnaround time" },
                    { id: "rush", label: "Fast Rush", desc: "Get it done quicker (-30% time)" },
                    { id: "enterprise", label: "Super Priority", desc: "Top priority queue support" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpeed(s.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                        speed === s.id
                          ? "bg-sky-500/10 border-sky-400 text-white"
                          : "bg-[#0a1128] border-white/5 hover:border-white/10 text-neutral-400"
                      }`}
                    >
                      {speed === s.id && (
                        <div className="absolute right-2 top-2 bg-sky-400 text-black rounded-full p-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <p className="text-xs font-semibold">{s.label}</p>
                      <p className="text-[9px] font-light text-neutral-500 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Maintenance retention SLA support options */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-neutral-400 tracking-wider">
                  FUTURE SUPPORT OPTIONS
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "none", label: "On-Demand Help", desc: "Pay/request only when needed" },
                    { id: "basic", label: "Standard Support", desc: "Free (₹0/mo basic support)" },
                    { id: "premium", label: "Urgent Support", desc: "Free (₹0/mo swift replies)" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSla(s.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                        sla === s.id
                          ? "bg-sky-500/10 border-sky-400 text-white"
                          : "bg-[#0a1128] border-white/5 hover:border-white/10 text-neutral-400"
                      }`}
                    >
                      {sla === s.id && (
                        <div className="absolute right-2 top-2 bg-sky-400 text-black rounded-full p-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <p className="text-xs font-semibold">{s.label}</p>
                      <p className="text-[9px] font-light text-neutral-500 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live pricing display badges */}
              <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-2xl grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Turnaround Time</span>
                  </div>
                  <p className="text-3xl font-display text-white tracking-widest uppercase">
                    ~{estimatedDays} <span className="text-sm font-sans font-light lowercase text-neutral-400">days</span>
                  </p>
                </div>

                <div className="space-y-1 border-l border-white/5 pl-4">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">PROJECT ESTIMATE</span>
                  </div>
                  <p className="text-3xl font-display text-sky-400 tracking-widest uppercase">
                    FREE
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Active Statement of Work template and Blueprint booking submission */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0a1128] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="bg-neutral-900/50 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-medium text-white tracking-wider">
                  STATEMENT OF WORK PROPOSAL (DYNAMIC)
                </span>
              </div>

              {selectedServices.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleShareConfig}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono text-sky-400 hover:text-sky-300 transition-colors cursor-pointer bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-md"
                    title="Share this specific configuration via URL"
                  >
                    {shareCopied ? (
                      <>
                        <Check className="w-3" />
                        LINK COPIED!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        SHARE CONFIG
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopyProposal(getProposalMarkdown())}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono text-sky-400 hover:text-sky-300 transition-colors cursor-pointer bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-md"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        COPY PROPOSAL
                      </>
                    )}
                  </button>

                  <button
                    onClick={downloadPdf}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono text-sky-400 hover:text-sky-300 transition-colors cursor-pointer bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-md"
                    title="Download SOW PDF summary"
                  >
                    <Download className="w-3 h-3" />
                    DOWNLOAD PDF
                  </button>
                </div>
              )}
            </div>

            {/* Markdown SOW visual block */}
            <div className="p-6 font-sans text-xs text-neutral-300 leading-relaxed max-h-[300px] overflow-y-auto space-y-4 bg-black/30">
              <pre className="font-mono text-[10px] text-neutral-400 whitespace-pre-wrap select-all focus:outline-none">
                {getProposalMarkdown()}
              </pre>
            </div>
          </div>

          {/* Form wrapper to schedule consultation */}
          {selectedServices.length > 0 && (
            <div className="bg-[#0a1128] border border-white/5 rounded-2xl p-6">
              <h4 className="text-sm font-semibold tracking-wide text-white mb-2 flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
                Request Technical Blueprint Workshop
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Submit this dynamic Statement of Work. Our engineering leads will review your configured capabilities within 12 business hours.
              </p>

              {hasSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-center space-y-2.5">
                  <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h5 className="text-sm font-bold text-emerald-400">Workshop Request Cached!</h5>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                    Thank you {name}. A GupTech advisor will reach out to you at <strong className="text-white">{email}</strong> to validate your {selectedServices.length}-service configuration.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#030714] text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#030714] text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#030714] text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 relative inline-flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase bg-sky-400 text-black px-5 py-3 rounded-lg hover:bg-sky-300 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  >
                    DEPLOY BLUEPRINT PROPOSAL
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
