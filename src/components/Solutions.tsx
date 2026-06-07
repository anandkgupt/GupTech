import { useState } from "react";
import { 
  Globe, 
  MapPin, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Target, 
  Zap, 
  Clock, 
  Bot 
} from "lucide-react";
import { Pillar, SelectedService } from "../types";
import { motion } from "motion/react";

interface SolutionsProps {
  pillars: Pillar[];
  selectedServices: SelectedService[];
  onApplyBundle: (services: SelectedService[]) => void;
  onNavigate: (to: string) => void;
}

interface SolutionBundle {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  problem: string;
  audience: string;
  colorName: "cyan" | "orange" | "violet" | "sky" | "green";
  colorHex: string;
  glowColor: string;
  bgHexColors: string;
  benefits: string[];
  recommendedServices: {
    pillarId: string;
    categoryId: string;
    serviceName: string;
  }[];
}

export default function Solutions({ 
  pillars, 
  selectedServices, 
  onApplyBundle, 
  onNavigate 
}: SolutionsProps) {
  
  const solutionsData: SolutionBundle[] = [
    {
      id: "sol-starter",
      title: "Instant Go-To-Market",
      subtitle: "Launch Ready Package",
      icon: Globe,
      problem: "I need a professional, fast-loading digital footprint to showcase my services and validate my idea yesterday.",
      audience: "Startups, side projects, first-time founders, & local micro-services",
      colorName: "cyan",
      colorHex: "#fb7185",
      glowColor: "rgba(251,113,133,0.15)",
      bgHexColors: "from-red-500/10 to-transparent",
      benefits: [
        "24-hour baseline build and setup",
        "Full typography and style guide sync",
        "Google search engine indexing registry"
      ],
      recommendedServices: [
        { pillarId: "p1", categoryId: "p1-c1", serviceName: "Standard Website (Home, About, Contact)" },
        { pillarId: "p2", categoryId: "p2-c1", serviceName: "Google Page Search Ranking SEO Setup" },
        { pillarId: "p3", categoryId: "p3-c1", serviceName: "Professional Logo Design" }
      ]
    },
    {
      id: "sol-local",
      title: "Hyper-Local Dominance",
      subtitle: "Local Foot Traffic Builder",
      icon: MapPin,
      problem: "I want local customers to find my storefront or service instantly when searching nearby on Google Maps or Apple reviews.",
      audience: "Retail, cafes, trade pros, hair salons, dentists, & fitness studios",
      colorName: "sky",
      colorHex: "#38bdf8",
      glowColor: "rgba(56,189,248,0.15)",
      bgHexColors: "from-sky-500/10 to-transparent",
      benefits: [
        "Google Business Profile full listing optimization",
        "Local directories sync for 10x higher maps ranking",
        "Review harvesting automation trigger"
      ],
      recommendedServices: [
        { pillarId: "p2", categoryId: "p2-c4", serviceName: "Google Map Business Profile Optimization" },
        { pillarId: "p2", categoryId: "p2-c4", serviceName: "Local Town/City SEO Reach" },
        { pillarId: "p2", categoryId: "p2-c4", serviceName: "Clean Customer Review Setup Tool" }
      ]
    },
    {
      id: "sol-booking",
      title: "Automated Virtual Office",
      subtitle: "Booking & Chat automation",
      icon: Bot,
      problem: "I am spending too many hours scheduling appointments and responding to repetitive query cards manually.",
      audience: "Consultants, therapists, cleaning services, agencies, and online educators",
      colorName: "violet",
      colorHex: "#ffffff",
      glowColor: "rgba(255,255,255,0.15)",
      bgHexColors: "from-white/10 to-transparent",
      benefits: [
        "No-more back-and-forth appointment scheduling emails",
        "Automatic leads validation with auto-synchronized calendar",
        "Always-on customer helper chatbot response system"
      ],
      recommendedServices: [
        { pillarId: "p4", categoryId: "p4-c1", serviceName: "Automated Website Help Chatbot" },
        { pillarId: "p4", categoryId: "p4-c3", serviceName: "Auto-Sync Apps via Zapier / Make" },
        { pillarId: "p1", categoryId: "p1-c4", serviceName: "Link Existing Multi-Tools Together" }
      ]
    },
    {
      id: "sol-shop",
      title: "Full Digital Storefront",
      subtitle: "E-Commerce Launchpad",
      icon: ShoppingBag,
      problem: "I need to display custom products, sync active inventories, process credit card gates, and send automated tax receipt emails.",
      audience: "E-commerce startups, artists, local physical shops selling online, & micro-brands",
      colorName: "green",
      colorHex: "#ef4444",
      glowColor: "rgba(239,68,68,0.15)",
      bgHexColors: "from-red-500/10 to-transparent",
      benefits: [
        "Shopify or WooCommerce setup with payment gates",
        "Automatic inventory updates and dropship logs sync",
        "Abandoned-cart trigger campaigns yielding 15% increase in conversion"
      ],
      recommendedServices: [
        { pillarId: "p5", categoryId: "p5-c1", serviceName: "Launch Your Custom Shopify Shop" },
        { pillarId: "p5", categoryId: "p5-c2", serviceName: "Fast Page Payment Checkout Redesign" },
        { pillarId: "p5", categoryId: "p5-c3", serviceName: "Automatic Inventory & Dropshipping Sync" }
      ]
    }
  ];

  const handleApplySolution = (bundle: SolutionBundle) => {
    // Map bundle's recommendedServices to actual Service objects from pillars
    const toSelect: SelectedService[] = [];
    
    bundle.recommendedServices.forEach((rec) => {
      const pillar = pillars.find((p) => p.id === rec.pillarId);
      if (pillar) {
        const category = pillar.categories.find((c) => c.id === rec.categoryId);
        if (category) {
          const service = category.services.find((s) => s.name === rec.serviceName);
          if (service) {
            toSelect.push({
              pillarId: rec.pillarId,
              categoryId: rec.categoryId,
              service
            });
          }
        }
      }
    });

    // We do a smart toggle/application: if all are already applied, do nothing (or we can toggle).
    // Let's replace or append depending on what the user wants. The most helpful approach is to 
    // union (append without duplicating). Let's do append!
    const unionList = [...selectedServices];
    toSelect.forEach((item) => {
      const alreadyHas = unionList.some(
        (x) => x.pillarId === item.pillarId && x.categoryId === item.categoryId && x.service.name === item.service.name
      );
      if (!alreadyHas) {
        unionList.push(item);
      }
    });

    onApplyBundle(unionList);
  };

  const handleToggleSingleService = (pillarId: string, categoryId: string, serviceName: string) => {
    const isSelected = selectedServices.some(
      (s) => s.pillarId === pillarId && s.categoryId === categoryId && s.service.name === serviceName
    );

    if (isSelected) {
      // Remove
      onApplyBundle(
        selectedServices.filter(
          (s) => !(s.pillarId === pillarId && s.categoryId === categoryId && s.service.name === serviceName)
        )
      );
    } else {
      // Add
      const pillar = pillars.find((p) => p.id === pillarId);
      if (pillar) {
        const category = pillar.categories.find((c) => c.id === categoryId);
        if (category) {
          const service = category.services.find((s) => s.name === serviceName);
          if (service) {
            onApplyBundle([...selectedServices, { pillarId, categoryId, service }]);
          }
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-sky-400 tracking-widest uppercase flex items-center gap-2">
          <span className="w-8 h-px bg-sky-400" />
          PROBLEM-BASED BLUEPRINTS
        </span>
        <h3 className="font-display text-4xl md:text-5xl text-white tracking-widest uppercase">
          CURATED SOLUTIONS
        </h3>
        <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-2xl">
          We’ve packaged our cross-pillar technology capabilities into targeted blueprints designed to solve specific operational constraints. Select a solution to instantly apply its optimal configurations to your plan outline.
        </p>
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {solutionsData.map((bundle) => {
          const BundleIcon = bundle.icon;
          
          // Check how many of these services are already active
          const activeServicesInBundle = bundle.recommendedServices.filter((rec) =>
            selectedServices.some(
              (sel) => sel.pillarId === rec.pillarId && sel.categoryId === rec.categoryId && sel.service.name === rec.serviceName
            )
          );
          
          const isFullyApplied = activeServicesInBundle.length === bundle.recommendedServices.length;
          const isPartiallyApplied = activeServicesInBundle.length > 0 && !isFullyApplied;

          return (
            <div
              key={bundle.id}
              className={`bg-[#0a1128] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-white/10 group bg-gradient-to-br ${bundle.bgHexColors}`}
              style={{ boxShadow: `0 0 35px -5px ${bundle.glowColor}` }}
              id={`solution-${bundle.id}`}
            >
              <div className="space-y-6">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/5 rounded-xl text-sky-400 group-hover:scale-110 transition-transform duration-300">
                        <BundleIcon className="w-6 h-6 stroke-1.25 text-sky-400" />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] tracking-widest text-[#38bdf8] uppercase block">
                          {bundle.subtitle}
                        </span>
                        <h4 className="font-display text-2xl text-white tracking-wider uppercase">
                          {bundle.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {activeServicesInBundle.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-md shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      {isFullyApplied ? "APPLIED" : `${activeServicesInBundle.length}/${bundle.recommendedServices.length} ACTIVE`}
                    </span>
                  )}
                </div>

                {/* Target Audience & Problem Summary Statement */}
                <div className="space-y-3.5 border-y border-white/5 py-4">
                  <div>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">
                      TARGET AUDIENCE
                    </span>
                    <p className="text-xs text-white font-medium">
                      {bundle.audience}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">
                      CORE CHALLENGE
                    </span>
                    <p className="text-xs text-neutral-300 font-light italic leading-relaxed">
                      &ldquo;{bundle.problem}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h5 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
                    OPERATIONAL ADVANTAGES
                  </h5>
                  <ul className="space-y-2">
                    {bundle.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Included Services Selector */}
                <div className="space-y-2 pt-2">
                  <h5 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
                    INCLUDED SERVICES (TAP TO TOGGLE)
                  </h5>
                  <div className="flex flex-col gap-2">
                    {bundle.recommendedServices.map((rec, idx) => {
                      const isActive = selectedServices.some(
                        (sel) => sel.pillarId === rec.pillarId && sel.categoryId === rec.categoryId && sel.service.name === rec.serviceName
                      );
                      const pillar = pillars.find(p => p.id === rec.pillarId);
                      
                      return (
                        <div 
                          key={idx}
                          onClick={() => handleToggleSingleService(rec.pillarId, rec.categoryId, rec.serviceName)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                            isActive 
                              ? "bg-sky-500/10 border-sky-450 border-sky-400 text-white" 
                              : "bg-[#030714] border-white/5 hover:border-white/10 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[9px] text-neutral-500 tracking-wider">
                              [{pillar?.num || "00"}]
                            </span>
                            <span className="text-xs font-light tracking-wide line-clamp-1">{rec.serviceName}</span>
                          </div>
                          
                          <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                            isActive ? "bg-sky-400 text-black" : "border border-neutral-600"
                          }`}>
                            {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <button
                  onClick={() => handleApplySolution(bundle)}
                  disabled={isFullyApplied}
                  className={`w-full py-3.5 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isFullyApplied
                      ? "bg-white/5 text-neutral-500 border border-white/5 cursor-not-allowed"
                      : "bg-sky-400 hover:bg-sky-300 text-black hover:scale-[1.01] active:scale-[0.99] shadow-md"
                  }`}
                  id={`btn-${bundle.id}`}
                >
                  {isFullyApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 stroke-[2]" />
                      BLUEPRINT FULLY APPLIED
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {isPartiallyApplied ? "COMPLETE" : "APPLY"} SOLUTION BLUEPRINT
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Cross-Sell Quick Action to Estimator */}
      <div className="bg-gradient-to-r from-sky-500/5 to-transparent border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-white font-medium text-sm">Have of a mixture of solutions in mind?</div>
          <div className="text-neutral-450 text-xs font-light">
            Toggle any service in any blueprint above, then review your fully updated Statement of Work (SOW) estimate proposal layout.
          </div>
        </div>
        <button
          onClick={() => onNavigate("/estimator")}
          className="relative inline-flex items-center gap-2 text-xs font-mono tracking-wider font-semibold border border-sky-400 text-sky-400 bg-sky-400/5 hover:bg-sky-400 hover:text-black px-5 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer shrink-0"
        >
          GO TO MY SOW ESTIMATE PLANNER
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Trust reassurance banner / Credentials callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
        <div className="bg-[#0a1128] border border-white/5 p-6 rounded-2xl space-y-3">
          <div className="p-2 w-fit bg-red-500/10 rounded-xl text-red-400">
            <Zap className="w-5 h-5 text-red-400" />
          </div>
          <h4 className="font-display text-sm text-white tracking-widest uppercase">Instant Setup</h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            All starter blueprints can be fully instantiated in less than 24 hours to begin operational staging and styling validation.
          </p>
        </div>
        <div className="bg-[#0a1128] border border-white/5 p-6 rounded-2xl space-y-3">
          <div className="p-2 w-fit bg-sky-500/10 rounded-xl text-sky-400">
            <Clock className="w-5 h-5 text-sky-400" />
          </div>
          <h4 className="font-display text-sm text-white tracking-widest uppercase">Flexible Support</h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Not bound to pre-packaged limitations. Mix-and-match any database tool, backup script, or voice responder on our plan.
          </p>
        </div>
        <div className="bg-[#0a1128] border border-white/5 p-6 rounded-2xl space-y-3">
          <div className="p-2 w-fit bg-white/10 rounded-xl text-white">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-display text-sm text-white tracking-widest uppercase">Free-Tier Sandbox</h4>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            All pricing estimates are computed as completely free sandbox services to enable small business validation without overhead.
          </p>
        </div>
      </div>

    </div>
  );
}
