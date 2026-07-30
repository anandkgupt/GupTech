import { motion } from "motion/react";
import { Store, UtensilsCrossed, Scissors, Brain, GraduationCap, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { SelectedService, Pillar } from "../types";

export interface IndustryBundle {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  quote: string;
  author: string;
  bgHexColors: string;
  recommendedServices: {
    pillarId: string;
    categoryId: string;
    serviceName: string;
  }[];
}

interface IndustriesProps {
  pillars: Pillar[];
  selectedServices: SelectedService[];
  onApplyBundle: (services: SelectedService[]) => void;
  onNavigate: (to: string) => void;
}

export const INDUSTRIES_DATA: IndustryBundle[] = [
  {
    id: "retail",
    name: "Local Retail & Shops",
    subtitle: "Bakeries, boutique stores, pharmacies, florists, and neighborhood shops.",
    icon: Store,
    quote: "Anand Analyst set up my florist shop's Google map listing, a pretty local website, and business logo. Within weeks, we got a 30% increase in local walk-in customers!",
    author: "Elena R., Flower Petals Boutique",
    bgHexColors: "from-sky-500/10 to-transparent",
    recommendedServices: [
      { pillarId: "p1", categoryId: "p1-c1", serviceName: "Standard Website (Home, About, Contact)" },
      { pillarId: "p2", categoryId: "p2-c4", serviceName: "Google Map Business Profile Optimization" },
      { pillarId: "p2", categoryId: "p2-c1", serviceName: "Google Page Search Ranking SEO Setup" },
      { pillarId: "p3", categoryId: "p3-c1", serviceName: "Professional Logo Design" }
    ]
  },
  {
    id: "food",
    name: "Cafés & Local Restaurants",
    subtitle: "Coffee houses, home bakeries, food trucks, and bistros.",
    icon: UtensilsCrossed,
    quote: "Their clean digital menu designs and quick local search setup made it super easy for local neighbors to find our food truck and order on their phones.",
    author: "Chef Vikram, Spicy Wheels Truck",
    bgHexColors: "from-red-500/10 to-transparent",
    recommendedServices: [
      { pillarId: "p1", categoryId: "p1-c1", serviceName: "Standard Website (Home, About, Contact)" },
      { pillarId: "p2", categoryId: "p2-c4", serviceName: "Google Map Business Profile Optimization" },
      { pillarId: "p2", categoryId: "p2-c1", serviceName: "Social Media Post Creator & Calendar" },
      { pillarId: "p3", categoryId: "p3-c3", serviceName: "E-Books, Catalogues & Price List Designs" }
    ]
  },
  {
    id: "beauty",
    name: "Salons, Spas & Home Services",
    subtitle: "Hair stylists, massage therapists, plumbers, gardeners, and electricians.",
    icon: Scissors,
    quote: "I can cut hair, but I don't know how to run databases or websites. Anand Analyst installed an automated web helper to book clients on my phone. Pure magic!",
    author: "Marc K., Scissors & Comb Studio",
    bgHexColors: "from-white/10 to-transparent",
    recommendedServices: [
      { pillarId: "p1", categoryId: "p1-c1", serviceName: "Standard Website (Home, About, Contact)" },
      { pillarId: "p2", categoryId: "p2-c4", serviceName: "Google Map Business Profile Optimization" },
      { pillarId: "p1", categoryId: "p1-c2", serviceName: "Monthly Website Checkups" },
      { pillarId: "p4", categoryId: "p4-c1", serviceName: "Automated Website Help Chatbot" }
    ]
  },
  {
    id: "freelancers",
    name: "Freelancers & Consultants",
    subtitle: "Accountants, home tutors, tax consultants, photographers, and fitness coaches.",
    icon: Brain,
    quote: "With their fast custom website, smart auto-reply script, and branding handbook, we looked like an established premium agency from day one.",
    author: "Nisha P., PM Finance Advisors",
    bgHexColors: "from-sky-500/10 to-transparent",
    recommendedServices: [
      { pillarId: "p1", categoryId: "p1-c1", serviceName: "Dynamic Custom Web Page" },
      { pillarId: "p2", categoryId: "p2-c1", serviceName: "Email Newsletter & Promotion Campaigns" },
      { pillarId: "p3", categoryId: "p3-c1", serviceName: "Brand Style Handbooks (Colors & Fonts)" },
      { pillarId: "p4", categoryId: "p4-c3", serviceName: "Auto-Sync Apps via Zapier / Make" }
    ]
  },
  {
    id: "education",
    name: "Education, Coaches & Tutors",
    subtitle: "Local schools, online course creators, academic tutors, sports coaches, and music academies.",
    icon: GraduationCap,
    quote: "With Anand Analyst's easy WordPress setup and chatbot, our students' parents find details instantly on their phones. We save hours answering repetitive scheduling questions!",
    author: "Ms. Clara T., Harmony Music Academy",
    bgHexColors: "from-red-500/10 to-transparent",
    recommendedServices: [
      { pillarId: "p1", categoryId: "p1-c1", serviceName: "Easy-to-Edit Site (WordPress/Blogs)" },
      { pillarId: "p2", categoryId: "p2-c4", serviceName: "Google Map Business Profile Optimization" },
      { pillarId: "p3", categoryId: "p3-c3", serviceName: "Freebie PDF Resource Design for Signups" },
      { pillarId: "p4", categoryId: "p4-c1", serviceName: "Automated Website Help Chatbot" }
    ]
  }
];

export default function Industries({ pillars, selectedServices, onApplyBundle, onNavigate }: IndustriesProps) {
  
  const handleSelectBundle = (bundle: IndustryBundle) => {
    // Collect the service objects that match recommended services
    const resolved: SelectedService[] = [];
    bundle.recommendedServices.forEach((rc) => {
      const pillar = pillars.find((p) => p.id === rc.pillarId);
      if (pillar) {
        const category = pillar.categories.find((c) => c.id === rc.categoryId);
        if (category) {
          const service = category.services.find((s) => s.name === rc.serviceName);
          if (service) {
            resolved.push({
              pillarId: rc.pillarId,
              categoryId: rc.categoryId,
              service
            });
          }
        }
      }
    });

    onApplyBundle(resolved);
    onNavigate("/estimator");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">      {/* Introduction */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-sky-400 tracking-widest uppercase flex items-center gap-2">
          <span className="w-8 h-px bg-sky-400" />
          FIT FOR PURPOSE
        </span>
        <h3 className="font-display text-4xl md:text-5xl text-white tracking-widest uppercase">
          INDUSTRIES WE HELP
        </h3>
        <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-2xl">
          We configure customized solutions specifically matching your business type. Select your sector below to instantly load a recommended, cost-effective starter pack that you can review and adjust anytime.
        </p>
      </div>

      {/* Grid of industries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INDUSTRIES_DATA.map((bundle) => {
          const BundleIcon = bundle.icon;
          
          // Check how many of the recommended services are currently active
          const activeCount = bundle.recommendedServices.filter((rec) => 
            selectedServices.some(s => s.pillarId === rec.pillarId && s.service.name === rec.serviceName)
          ).length;
          
          const isFullyApplied = activeCount === bundle.recommendedServices.length;

          return (
            <div
              key={bundle.id}
              className={`bg-[#0a1128] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-white/10 group bg-gradient-to-br ${bundle.bgHexColors}`}
              id={`industry-${bundle.id}`}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/5 rounded-xl text-sky-400 group-hover:scale-110 transition-transform duration-300">
                        <BundleIcon className="w-6 h-6 stroke-1.25" />
                      </div>
                      <h4 className="font-display text-xl text-white tracking-wider uppercase">
                        {bundle.name}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {bundle.subtitle}
                    </p>
                  </div>

                  {activeCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      {activeCount === bundle.recommendedServices.length ? "APPLIED" : `${activeCount} SELECTED`}
                    </span>
                  )}
                </div>

                {/* Recommended bundle list */}
                <div className="space-y-2 pb-6 border-b border-white/5">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
                    RECOMMENDED BASIC MIX:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bundle.recommendedServices.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                        <div className="w-1 h-1 rounded-full bg-red-500" />
                        <span className="line-clamp-1">{rec.serviceName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client testimonial */}
                <div className="bg-black/20 rounded-xl p-4 space-y-2 relative border border-white/[0.02]">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400 italic font-light leading-relaxed">
                    "{bundle.quote}"
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 tracking-wide">
                    — {bundle.author}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-auto">
                <button
                  onClick={() => handleSelectBundle(bundle)}
                  className={`w-full py-3.5 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isFullyApplied
                      ? "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                      : "bg-sky-400 hover:bg-sky-300 text-black hover:scale-[1.01] active:scale-[0.99] shadow-md"
                  }`}
                  id={`btn-${bundle.id}`}
                >
                  {isFullyApplied ? "Configure Package Plan" : "Choose & View Price Bundle"}
                  <ArrowRight className="w-3.5 h-3.5 text-current group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust reassurance banner */}
      <div className="bg-gradient-to-r from-sky-500/5 to-transparent border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-white font-medium text-sm">Need a custom mixed-and-matched package for your business?</div>
          <div className="text-neutral-450 text-xs font-light">You can click on any bundle above as a starter, then fully add or remove items on the plan builder page.</div>
        </div>
        <button
          onClick={() => onNavigate("/pillars")}
          className="bg-white/5 hover:bg-white/10 text-white text-xs font-mono py-2.5 px-4 rounded-xl transition-all border border-white/5 cursor-pointer"
        >
          Explore All Services
        </button>
      </div>
    </div>
  );
}
