import React, { useState } from "react";
import { 
  Rocket, 
  Globe, 
  GraduationCap, 
  Tv, 
  Database, 
  BrainCircuit, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  ExternalLink,
  Layers,
  Award,
  Zap,
  BarChart3,
  ShieldCheck,
  Search,
  ChevronRight,
  Send,
  ShoppingBag,
  CheckCircle
} from "lucide-react";
import { AnandLogo } from "./AnandLogo";

interface MyVenturesProps {
  onNavigatePage: (page: "anand" | "services" | "learning" | "about" | "ventures") => void;
  currentTheme?: any;
}

export interface VentureItem {
  id: string;
  name: string;
  tagline: string;
  category: "Tech & Digital" | "EdTech & Academia" | "Cloud & Media" | "AI & Strategy";
  status: "Core Enterprise" | "Live & Scaling" | "Active Platform" | "Expanding Platform";
  statusColor: string;
  year: string;
  icon: React.ElementType;
  bgGradient: string;
  accentBorder: string;
  shortDesc: string;
  longDesc: string;
  metrics: { label: string; value: string }[];
  capabilities: string[];
  primaryActionLabel: string;
  targetPage?: "anand" | "services" | "learning" | "about" | "ventures";
  websiteUrl?: string;
}

const VENTURES_DATA: VentureItem[] = [
  {
    id: "factlive-digital",
    name: "FactLive Digital Solutions",
    tagline: "Startup venture delivering business web development, social marketing & digital asset creation",
    category: "Tech & Digital",
    status: "Core Enterprise",
    statusColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    year: "Est. 2025",
    icon: Globe,
    bgGradient: "from-teal-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-teal-500/30 hover:border-teal-400/60",
    shortDesc: "Developed & managed business websites, social media marketing campaigns, promotional graphics, and digital ops.",
    longDesc: "Founded by Anand K Gupta. FactLive Digital Solutions crafts high-conversion business websites, manages full digital assets, designs promotional banners, and coordinates website maintenance and operational workflows.",
    metrics: [
      { label: "Role", value: "Founder" },
      { label: "Active Operations", value: "2025–Present" },
      { label: "Website", value: "www.factlive.in" }
    ],
    capabilities: ["Business Website Management", "Social Media Campaigns", "Digital Graphics & Banners", "Digital Operations Control"],
    primaryActionLabel: "Visit www.factlive.in",
    websiteUrl: "https://www.factlive.in",
    targetPage: "about"
  },
  {
    id: "egranthakuti",
    name: "eGranthakuti (E-Commerce Venture)",
    tagline: "E-Commerce portal for digital promotion, customer engagement & catalog management",
    category: "Tech & Digital",
    status: "Active Platform",
    statusColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    year: "Est. 2022",
    icon: ShoppingBag,
    bgGradient: "from-orange-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-orange-500/30 hover:border-orange-400/60",
    shortDesc: "Built and managed an online e-commerce platform with catalog organization and customer support workflows.",
    longDesc: "Founded by Anand K Gupta in 2022. Designed and operated an end-to-end e-commerce platform, handling digital promotion, catalog structuring, online business operations, and customer support.",
    metrics: [
      { label: "Role", value: "Founder" },
      { label: "Established", value: "2022" },
      { label: "Type", value: "E-Commerce Platform" }
    ],
    capabilities: ["Online E-Commerce Platform", "Digital Promotion", "Catalog Organization", "Customer Support Workflow"],
    primaryActionLabel: "View Founder Profile",
    targetPage: "about"
  },
  {
    id: "digital-agency",
    name: "Anand Analyst Digital Tech Agency",
    tagline: "High-performance web architecture & digital transformation for micro-enterprises",
    category: "Tech & Digital",
    status: "Core Enterprise",
    statusColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    year: "Est. 2022",
    icon: Globe,
    bgGradient: "from-sky-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-sky-500/30 hover:border-sky-400/60",
    shortDesc: "Comprehensive web development, custom domain setup, and modular software delivery without monthly retainers.",
    longDesc: "Providing small businesses, clinics, retail shops, and independent contractors with full digital sovereignty. We deliver high-speed web apps, automated PDF SOW generators, and zero-hidden-cost infrastructure.",
    metrics: [
      { label: "Active Deployments", value: "350+" },
      { label: "Average Speed Score", value: "98/100" },
      { label: "Client Retainer Overhead", value: "$0/mo" }
    ],
    capabilities: ["React & Vite Architecture", "PDF SOW Proposal Engines", "Domain & DNS Management", "Zero-Retainer Ownership"],
    primaryActionLabel: "Explore Services Catalog",
    targetPage: "services"
  },
  {
    id: "aiu-edtech",
    name: "AIU Distance Learning & Education Portal",
    tagline: "Higher education distance learning guidance for UG, PG, and Research certifications",
    category: "EdTech & Academia",
    status: "Live & Scaling",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    year: "Est. 2023",
    icon: GraduationCap,
    bgGradient: "from-emerald-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-emerald-500/30 hover:border-emerald-400/60",
    shortDesc: "A specialized distance education counseling portal helping students enroll in accredited Animation, VFX, Game Design, and Digital Media degrees.",
    longDesc: "Connecting aspiring artists, developers, and researchers with top university distance learning programs. Includes real-time catalog search, instant eligibility checkers, and WhatsApp counseling dispatch.",
    metrics: [
      { label: "Enrolled Aspirants", value: "1,200+" },
      { label: "Certified Programs", value: "30+ Degrees" },
      { label: "Counseling Response Time", value: "< 15 Mins" }
    ],
    capabilities: ["Distance Degree Enrollment", "Instant Eligibility Matrix", "Interactive Course Finder", "WhatsApp Direct Guidance"],
    primaryActionLabel: "Open Education Catalog",
    targetPage: "learning"
  },
  {
    id: "hindi-media-cloud",
    name: "Hindi Cloud Streaming & Multipath Engine",
    tagline: "High-speed edge indexer for free Hindi web series, torrent magnets & cloud sync",
    category: "Cloud & Media",
    status: "Active Platform",
    statusColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    year: "Est. 2024",
    icon: Tv,
    bgGradient: "from-rose-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-rose-500/30 hover:border-rose-400/60",
    shortDesc: "An advanced cloud catalog and multipath download protocol serving 1080p HEVC web series metadata.",
    longDesc: "Revolutionizing digital media delivery with direct magnet hashing, Google Drive sync integration, and automated cloud cache crawling for instant media playback without buffer delays.",
    metrics: [
      { label: "Monthly Cloud Queries", value: "45,000+" },
      { label: "Indexed Series Seasons", value: "150+" },
      { label: "Stream Buffer Latency", value: "< 1.2s" }
    ],
    capabilities: ["Multipath Torrent Hashing", "Google Drive Cloud Sync", "1080p HEVC Cataloging", "Automated Crawl Requests"],
    primaryActionLabel: "Launch Media Cloud Stream",
    targetPage: "learning"
  },
  {
    id: "datasync-crm",
    name: "DataSync & Smart CRM Lead Engine",
    tagline: "Automated Google Sheets synchronization & intelligent lead dispatch workflow",
    category: "Tech & Digital",
    status: "Active Platform",
    statusColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    year: "Est. 2024",
    icon: Database,
    bgGradient: "from-amber-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-amber-500/30 hover:border-amber-400/60",
    shortDesc: "Real-time client lead registration that automatically populates Google Sheets with zero backend configuration.",
    longDesc: "Eliminating complex CRM subscription costs. Stores lead entries locally and bridges directly with Google Apps Script webhooks to synchronize sales pipelines into Google Sheets.",
    metrics: [
      { label: "Processed Form Leads", value: "8,500+" },
      { label: "Sync Error Rate", value: "0.00%" },
      { label: "Third-party SaaS Cost", value: "$0.00" }
    ],
    capabilities: ["Google Sheets API Webhooks", "Offline Local Storage Cache", "WhatsApp Auto-Prefill", "Live Lead Status Pipeline"],
    primaryActionLabel: "View CRM Admin Panel",
    targetPage: "learning"
  },
  {
    id: "chess-strategy-lab",
    name: "Chess Strategy & Strategic Analytics Lab",
    tagline: "Applying chess calculation, opening theory, and tactical foresight to tech architecture",
    category: "AI & Strategy",
    status: "Core Enterprise",
    statusColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    year: "Est. 2023",
    icon: BrainCircuit,
    bgGradient: "from-purple-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-purple-500/30 hover:border-purple-400/60",
    shortDesc: "A methodology laboratory embedding competitive chess discipline into software design and business analysis.",
    longDesc: "Treating system development like grandmaster strategy: calculated opening moves (clean architecture), tactical midgames (bottleneck elimination), and flawless endgames (bug-free deployment).",
    metrics: [
      { label: "Daily Chess Matches Played", value: "5+ Games" },
      { label: "Strategic Calculation Depth", value: "7 Moves Ahead" },
      { label: "Architectural Blunder Rate", value: "Near 0%" }
    ],
    capabilities: ["Pattern Recognition Systems", "Multi-step Contingency Planning", "Tactical Optimization", "Data-Driven Foresight"],
    primaryActionLabel: "Learn About Our Strategy",
    targetPage: "anand"
  },
  {
    id: "local-maps-engine",
    name: "Local Store & Google Maps SEO Engine",
    tagline: "Pinpoint Google Maps verification and local search ranking for neighborhood merchants",
    category: "Tech & Digital",
    status: "Expanding Platform",
    statusColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    year: "Est. 2023",
    icon: MapPin,
    bgGradient: "from-cyan-950/80 via-slate-900 to-slate-950",
    accentBorder: "border-cyan-500/30 hover:border-cyan-400/60",
    shortDesc: "Specialized local citation builder and Google Business Profile optimization for physical storefronts.",
    longDesc: "Helping bakeries, salons, pharmacies, and clinics dominate local search queries. Increases walk-in traffic by up to 35% through verified map pins, structured local schemas, and review workflows.",
    metrics: [
      { label: "Stores Verified", value: "220+" },
      { label: "Avg Walk-in Lift", value: "+32%" },
      { label: "Map Pin Accuracy", value: "100%" }
    ],
    capabilities: ["Google Business Profile Setup", "Local Citation Building", "Review Collection Widgets", "Geo-targeted Keywords"],
    primaryActionLabel: "View Local Solutions",
    targetPage: "services"
  }
];

export const MyVentures: React.FC<MyVenturesProps> = ({ onNavigatePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVentureModal, setActiveVentureModal] = useState<VentureItem | null>(null);

  // Form states for joint venture inquiry
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerVenture, setPartnerVenture] = useState("");
  const [partnerMessage, setPartnerMessage] = useState("");
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const categories = ["All", "Tech & Digital", "EdTech & Academia", "Cloud & Media", "AI & Strategy"];

  const filteredVentures = VENTURES_DATA.filter(venture => {
    const matchesCategory = selectedCategory === "All" || venture.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venture.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venture.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerEmail) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerName("");
      setPartnerEmail("");
      setPartnerVenture("");
      setPartnerMessage("");
    }, 6000);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800/80 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-emerald-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="flex justify-center pb-2">
            <AnandLogo size="xl" lightText={true} className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 shadow-2xl" />
          </div>

          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
            <Rocket className="w-3.5 h-3.5 text-sky-400" />
            ANAND ANALYST VENTURES &amp; INNOVATION ECOSYSTEM
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Building Digital Products &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400">
              Transformative Ventures
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-300 font-light leading-relaxed">
            Discover the portfolio of tech platforms, educational portals, media cloud engines, and strategic analytics projects engineered under the Anand Analyst umbrella.
          </p>

          {/* Key Ecosystem Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold">Active Ventures</div>
              <div className="text-2xl font-extrabold text-white mt-1">6 Platforms</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Operating continuously</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Impacted Users</div>
              <div className="text-2xl font-extrabold text-white mt-1">50,000+</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Students, merchants &amp; users</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">Client Retainers</div>
              <div className="text-2xl font-extrabold text-white mt-1">$0 Hidden</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Transparent &amp; flat pricing</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">Strategy System</div>
              <div className="text-2xl font-extrabold text-white mt-1">Chess Discipline</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Deep calculation depth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Ventures Showcase */}
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Search & Category Filter Header */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 shadow-md scale-102"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ventures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVentures.map((venture) => {
            const IconComp = venture.icon;
            return (
              <div
                key={venture.id}
                className={`group relative bg-gradient-to-b ${venture.bgGradient} border ${venture.accentBorder} p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Year Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${venture.statusColor}`}>
                      {venture.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {venture.year}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 pt-1">
                    <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold block">
                        {venture.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                        {venture.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {venture.shortDesc}
                  </p>

                  {/* Key Metrics Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    {venture.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                        <div className="text-xs font-bold text-white font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Capability Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {venture.capabilities.slice(0, 3).map((cap, i) => (
                      <span key={i} className="text-[9.5px] font-mono text-slate-300 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded-md">
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveVentureModal(venture)}
                    className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>

                  {venture.websiteUrl ? (
                    <a
                      href={venture.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 no-underline"
                    >
                      <span>{venture.primaryActionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (venture.targetPage) {
                          onNavigatePage(venture.targetPage);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <span>{venture.primaryActionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredVentures.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-base font-bold text-white">No ventures found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No active ventures matched your search query. Try clearing the filter tabs or typing a different keyword.
            </p>
          </div>
        )}

      </div>

      {/* Venture Strategic Roadmap Timeline */}
      <section className="max-w-6xl mx-auto px-6 pt-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              GROWTH TIMELINE &amp; EVOLUTION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Anand Analyst Venture Roadmap
            </h2>
            <p className="text-xs text-slate-400 font-light">
              From individual data consulting to a multi-platform digital, educational, and media infrastructure ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold bg-sky-500/10 px-2.5 py-1 rounded-md">PHASE 1 (2022)</span>
              <h3 className="text-sm font-bold text-white">Digital Tech Consulting</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Launched core web engineering, custom domain registration, and flat-fee SOW estimates for local trades.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">PHASE 2 (2023)</span>
              <h3 className="text-sm font-bold text-white">AIU Distance EdTech</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Expanded into higher education distance guidance, cataloging UG/PG animation, VFX, and gaming programs.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md">PHASE 3 (2024)</span>
              <h3 className="text-sm font-bold text-white">Media Cloud &amp; Lead CRM</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Integrated high-speed multipath media streaming indexing and automated Google Sheets lead sync algorithms.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded-md">PHASE 4 (NEXT)</span>
              <h3 className="text-sm font-bold text-white">AI Strategy &amp; Scale</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Embedding AI-driven chess analytics, predictive client forecasting, and joint venture partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Joint Venture & Partnership Collaboration Section */}
      <section className="max-w-4xl mx-auto px-6 pt-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/40 border border-slate-800 p-8 md:p-10 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> JOINT VENTURE &amp; PARTNERSHIP OPPORTUNITIES
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Propose a Venture or Joint Project
              </h2>
              <p className="text-xs text-slate-300 font-light">
                Have a breakthrough software product idea, edtech initiative, or digital platform proposal? Let's co-build or scale it under Anand Analyst.
              </p>
            </div>

            <a
              href="mailto:anand.analysts@gmail.com"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs px-5 py-3 rounded-xl transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Direct Email Inquiry
            </a>
          </div>

          <form onSubmit={handlePartnerSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 font-bold uppercase mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 font-bold uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 font-bold uppercase mb-1">
                  Venture Concept / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. EdTech Platform / SaaS Analytics"
                  value={partnerVenture}
                  onChange={(e) => setPartnerVenture(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 font-bold uppercase mb-1">
                  Collaboration Type
                </label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="co-build">Co-build New Product</option>
                  <option value="consulting">Tech Architecture Consulting</option>
                  <option value="education">Educational Course Partnership</option>
                  <option value="other">Other Strategic Joint Venture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 font-bold uppercase mb-1">
                Brief Description of Proposal
              </label>
              <textarea
                rows={3}
                placeholder="Outline your venture concept, key target audience, and how Anand Analyst tech & strategy can accelerate it..."
                value={partnerMessage}
                onChange={(e) => setPartnerMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Joint Venture Proposal</span>
              <Rocket className="w-4 h-4 text-slate-950" />
            </button>

            {partnerSubmitted && (
              <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-xl text-center space-y-1 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-300">Proposal Registered Successfully!</div>
                <p className="text-[11px] text-slate-300">
                  Thank you {partnerName}. Anand Analyst team will review your proposal and reach out to {partnerEmail} shortly.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Venture Details Deep Dive Modal */}
      {activeVentureModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-xl w-full rounded-3xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveVentureModal(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-3">
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${activeVentureModal.statusColor}`}>
                {activeVentureModal.status} • {activeVentureModal.year}
              </span>

              <h3 className="text-2xl font-black text-white">
                {activeVentureModal.name}
              </h3>
              
              <p className="text-xs font-mono text-sky-400">
                {activeVentureModal.tagline}
              </p>

              <p className="text-xs text-slate-300 font-light leading-relaxed pt-2">
                {activeVentureModal.longDesc}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {activeVentureModal.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Capabilities list */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Key Technical Capabilities:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {activeVentureModal.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveVentureModal(null)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  if (activeVentureModal.targetPage) {
                    onNavigatePage(activeVentureModal.targetPage);
                    setActiveVentureModal(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{activeVentureModal.primaryActionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
