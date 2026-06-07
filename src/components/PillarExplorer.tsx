import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { Pillar, Category, Service, SelectedService } from "../types";

// Dynamic Icon resolver helper
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

interface CategoryMetadata {
  samples: { title: string; desc: string }[];
  roadmap: { phase: string; duration: string; description: string }[];
  products: { name: string; type: string; badge: string }[];
}

function getCategoryMetadata(catId: string, catName: string): CategoryMetadata {
  switch (catId) {
    case "p1-c1":
      return {
        samples: [
          { title: "Local Bakery Site Design", desc: "Designed a clean 3-page website showing menu prices, store location, and a contact form." },
          { title: "Hair Salon Booking Page", desc: "Created a simple web button where customers can see free times and make phone bookings." },
          { title: "Handicrafts Mobile Shop", desc: "A simple, clean mobile page for local artists to showcase custom crochet items." }
        ],
        roadmap: [
          { phase: "Step 1: Layout Draft", duration: "Days 1-3", description: "Sketch out the home page and write text about your store services." },
          { phase: "Step 2: Build Page", duration: "Days 4-10", description: "Develop and test the website to make sure it loads quickly on mobile phones." },
          { phase: "Step 3: Connect Tools", duration: "Days 11-13", description: "Add a friendly email form and visual gallery of your best products." },
          { phase: "Step 4: Go Live", duration: "Days 14–15", description: "Connect your custom domain and launch your new website on Google." }
        ],
        products: [
          { name: "Ready-To-Go Website Code", type: "Digital Core", badge: "Live Website" }
        ]
      };
    case "p1-c2":
      return {
        samples: [
          { title: "Florist Shop Safety Updates", desc: "Cleaned up old files and set up password protections to keep customer records safe." },
          { title: "Secure Website Backups Setup", desc: "Created daily automated backups of a local dentist's page to prevent any loss of data." }
        ],
        roadmap: [
          { phase: "Step 1: Checkup", duration: "Days 1-2", description: "Scan the website for broken links, slow pages, and security issues." },
          { phase: "Step 2: Securing", duration: "Days 3-5", description: "Install active safety updates and check automatic database backups." }
        ],
        products: [
          { name: "Monthly Security Checkups", type: "Safety Process", badge: "Safe & Clean" },
          { name: "Emergency Recovery Guide", type: "Simple Diagram", badge: "Disaster Ready" }
        ]
      };
    case "p1-c3":
      return {
        samples: [
          { title: "Restaurant Mobile Speed Fix", desc: "Compressed heavy food photos to make the mobile menu load in under 1 second." },
          { title: "Quick Load Speed Audit", desc: "Found and fixed reasons why a retail shop's landing page was stuck loading slowly." }
        ],
        roadmap: [
          { phase: "Step 1: Inspect Page Speed", duration: "Days 1-2", description: "Test page load speeds on old smartphones and catalog slow imagery." },
          { phase: "Step 2: Compress & Optimize", duration: "Days 3-5", description: "Shrink file sizes and set up smart caching to load previously visited assets instantly." }
        ],
        products: [
          { name: "Super Speed Image Setup", type: "Asset Method", badge: "Loads Fast" },
          { name: "Diagnostic Loading Report", type: "Diagnosis File", badge: "Healthy Score" }
        ]
      };
    case "p1-c4":
      return {
        samples: [
          { title: "Inventory Tool Connection", desc: "Linked a boutique's checkout till directly with their stock count database." },
          { title: "Customer Sign-up Form Hook", desc: "Customized a form that sends new website sign-ups directly into Mailchimp lists." }
        ],
        roadmap: [
          { phase: "Step 1: Map Out Connected Tools", duration: "Days 1-3", description: "Identify which tools you want to link together and check their settings." },
          { phase: "Step 2: Sync Up Details", duration: "Days 4-10", description: "Set up connections to share automated customer and product details safely." }
        ],
        products: [
          { name: "Linked App Interface", type: "Sync Bridge", badge: "Automatic" },
          { name: "Data Transfer Test Setup", type: "Test Check", badge: "Works Smoothly" }
        ]
      };
    case "p1-c5":
      return {
        samples: [
          { title: "Local Store Hosting Move", desc: "Moved a craft shop's page from expensive slow hosting to fast modern servers." },
          { title: "Secure Domain Name Setup", desc: "Purchased and directed custom store domain names with basic security certificate tags." }
        ],
        roadmap: [
          { phase: "Step 1: Select Hosting", duration: "Days 1-3", description: "Find the most cost-friendly hosting company matches the store size." },
          { phase: "Step 2: Transfer Files", duration: "Days 4-8", description: "Safely copy website folders and point custom DNS domain names." }
        ],
        products: [
          { name: "Fast Cloud Web Server", type: "Live Server Instance", badge: "24/7 Live" },
          { name: "SSL Security Green Tag", type: "Encryption Label", badge: "Secure Link" }
        ]
      };
    case "p2-c1":
      return {
        samples: [
          { title: "Local Gym Google Visibility", desc: "Rewrote local neighborhood website terms to rank #1 on Google searches in the area." },
          { title: "Weekly Newsletter Setup", desc: "Designed a clean email template for a coffee shop to announce weekly coffee beans discount events." }
        ],
        roadmap: [
          { phase: "Step 1: Search Words Review", duration: "Days 1-3", description: "Find out what exact words local neighbors type when searching for your store." },
          { phase: "Step 2: Post Templates Launch", duration: "Days 4-7", description: "Prepare social templates and draft email newsletters to announce store sales." }
        ],
        products: [
          { name: "Google SEO Keyword Plan", type: "Keyword List", badge: "More Traffic" },
          { name: "Social Content Calendar", type: "Planning Workbook", badge: "Ready-To-Post" }
        ]
      };
    case "p2-c2":
      return {
        samples: [
          { title: "Boutique Welcome Email Automated Flow", desc: "Drafted an email that sends 10% off codes automatically when any new client signs up." },
          { title: "Menu Page Click Improvements", desc: "Moved the 'Order Now' button to the top of the mobile screen, doubling visitor order taps." }
        ],
        roadmap: [
          { phase: "Step 1: Check Path Flow", duration: "Days 1-3", description: "Locate where customers get confused or leave your webpage during checkout." },
          { phase: "Step 2: Automate Welcome Series", duration: "Days 4-8", description: "Create welcome emails and design big, clear buttons that make buying easy." }
        ],
        products: [
          { name: "Auto welcome email flow", type: "E-mail Series Setup", badge: "Runs on Autopilot" },
          { name: "Simplified Purchase Path", type: "Design Sketch", badge: "Easy For Users" }
        ]
      };
    case "p3-c1":
      return {
        samples: [
          { title: "Café Logo & Style Guide", desc: "Designed a warm brand identity with custom color palettes and coffee cup logo exports." },
          { title: "Business Cards & Flyer Files", desc: "Designed high quality ready-to-print flyers and business cards for a neighborhood plumber." }
        ],
        roadmap: [
          { phase: "Step 1: Test Design Styles", duration: "Days 1-5", description: "Discuss business goals and try out different elegant colors and logo options." },
          { phase: "Step 2: Polishing Files", duration: "Days 6-12", description: "Clean up final vectors and bundle the images into different files." }
        ],
        products: [
          { name: "Logo Image Files (.PNG, .SVG)", type: "Graphic Deliverable", badge: "Ready-to-Print" },
          { name: "Custom Brand Typography Manual", type: "Digital Document", badge: "Cohesive Style" }
        ]
      };
    case "p3-c2":
      return {
        samples: [
          { title: "Animated Store Intro Video", desc: "Created a cute 15-second animated clip showing how to order from an online gift store." },
          { title: "Interactive Service Buttons", desc: "Added simple tap animations that wiggle to draw visitor attention to specials menus." }
        ],
        roadmap: [
          { phase: "Step 1: Outline Script concepts", duration: "Days 1-4", description: "Sketch a storyboard showing the slide sequence and write simple captions." },
          { phase: "Step 2: Render Clip Animation", duration: "Days 5-8", description: "Build animated shapes and export lightweight files that load instantly." }
        ],
        products: [
          { name: "15-Second Animated Video", type: "Media Asset", badge: "High Quality" },
          { name: "Website Icon Bounce Pack", type: "Micro Animation", badge: "Very Playful" }
        ]
      };
    case "p4-c1":
      return {
        samples: [
          { title: "Local Store Q&A Helper Chatbot", desc: "Set up an easy help button that answers questions about store opening hours and refund policies." },
          { title: "Smart Order Reminder Assistant", desc: "Configured an assistant that triggers automated text notifications for booking slots." }
        ],
        roadmap: [
          { phase: "Step 1: Frequently Asked Questions List", duration: "Days 1-3", description: "Gather list of frequently asked shop questions and draft short, helpful responses." },
          { phase: "Step 2: Set Up Helper Widget", duration: "Days 4-8", description: "Connect the bot to your webpage and ensure it stays polite and accurate." }
        ],
        products: [
          { name: "Smart Help Chat Bot Setup", type: "Chat Widget", badge: "Answers Queries 24/7" },
          { name: "Simple Frequently Asked Questions List", type: "Text Database", badge: "No Coding Needed" }
        ]
      };
    case "p5-c1":
      return {
        samples: [
          { title: "Boutique Shopify Store Setup", desc: "Laid out an online catalog for a clothing store with card checkouts and stock tracking." },
          { title: "Local Farm Course & Booking Store", desc: "Built a WordPress page allowing clients to book workshop classes and pay securely." }
        ],
        roadmap: [
          { phase: "Step 1: Prep Catalog Photos", duration: "Days 1-4", description: "Take clean product photos, write short descriptions, and enter store prices." },
          { phase: "Step 2: Setup Secure Payment Fields", duration: "Days 5-10", description: "Add secure payment fields and test custom checkout orders." }
        ],
        products: [
          { name: "Shopify Store Account", type: "Live E-Shop", badge: "Ready-for-Orders" },
          { name: "Online Payment Setup", type: "Payment Terminal", badge: "Accepts Cards" }
        ]
      };
  }

  // Generative dynamic fallbacks based on name categories
  const nameLower = catName.toLowerCase();
  const isMarketing = nameLower.match(/(marketing|seo|growth|conversion|channels|insights|reporting)/);
  const isDesign = nameLower.match(/(design|creative|branding|motion|visual|assets|content)/);
  const isDataOrAI = nameLower.match(/(intelligence|ai|data|reporting|insights|automation|security|compliance)/);

  if (isMarketing) {
    return {
      samples: [
        { title: `${catName} Store Setup`, desc: "Designed simple flyer terms, local town target terms, and easy visitor tracker scripts." },
        { title: "Quick Neighborhood Campaign", desc: "Simple customer coupon sequence aiming to invite return clients." }
      ],
      roadmap: [
        { phase: "Step 1: Store Audit", duration: "Days 1-3", description: "Look up what other local shops do and list simple keywords." },
        { phase: "Step 2: Launch Action", duration: "Days 4-8", description: `Active simple outreach tactics matching your ${catName} business plan.` }
      ],
      products: [
        { name: `${catName} Simple Plan`, type: "Guide workbook", badge: "Handmade" },
        { name: "Weekly Progress Tracker", type: "Simple spreadsheet", badge: "Keeps Score" }
      ]
    };
  }

  if (isDesign) {
    return {
      samples: [
        { title: `${catName} Custom Pictures`, desc: "Clean color choices, visual layout templates, and photo helpers." },
        { title: "Simple Store Print Materials", desc: "Ready-to-print postcard layouts and business sign vectors." }
      ],
      roadmap: [
        { phase: "Step 1: Color Draft", duration: "Days 1-4", description: "Review visual ideas, find gorgeous colors, and discuss basic drafts." },
        { phase: "Step 2: Package delivery", duration: "Days 5-10", description: "Draw perfect high res files and save them in simple formats." }
      ],
      products: [
        { name: "Picture files (.PNG & .JPG)", type: "Visual Bundle", badge: "Multi-size" },
        { name: "Store Style Page", type: "Quick Guide List", badge: "Easy Style" }
      ]
    };
  }

  if (isDataOrAI) {
    return {
      samples: [
        { title: `Smart ${catName} Connection`, desc: "Configured simple daily lists, automated reminder emails, and secure folders." },
        { title: "Time-saving automated alerts", desc: "Simple software scripts to alert you of new store booking events." }
      ],
      roadmap: [
        { phase: "Step 1: Check Settings", duration: "Days 1-4", description: "Gather login credentials, check privacy terms, and map setup goals." },
        { phase: "Step 2: Auto link up", duration: "Days 5-10", description: `Write standard spreadsheet triggers and turn on auto security checks.` }
      ],
      products: [
        { name: `${catName} Sync Sheet`, type: "Google Sheet Link", badge: "No effort" },
        { name: "Safety Review Checklist", type: "Checklist File", badge: "Secure" }
      ]
    };
  }

  return {
    samples: [
      { title: `Friendly ${catName} Walkthrough`, desc: "Created general overview guides, basic checklists, and easy step processes." }
    ],
    roadmap: [
      { phase: "Step 1: Initial Conversation", duration: "Days 1-2", description: "Brief friendly discussion to agree on tasks, check your goals, and set steps." },
      { phase: "Step 2: Practical Setup", duration: "Days 3-10", description: `Design and assemble essential assets for your ${catName} needs.` },
      { phase: "Step 3: Quick Handover", duration: "Days 11-12", description: "Walk through your simple dashboard, answer questions, and show how to use it." }
    ],
    products: [
      { name: `${catName} Guide Handbook`, type: "Simple Document", badge: "For Beginners" },
      { name: "Live Completion Tracker", type: "Checklist Sheet", badge: "Auto-updated" }
    ]
  };
}

interface PillarExplorerProps {
  pillars: Pillar[];
  selectedServices: SelectedService[];
  onToggleService: (pId: string, cId: string, service: Service) => void;
}

export default function PillarExplorer({
  pillars,
  selectedServices,
  onToggleService,
}: PillarExplorerProps) {
  // Store expanded category card IDs in state
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    "p1-c1": true, // start with first open by default
  });

  const [activeTabs, setActiveTabs] = useState<Record<string, "services" | "samples" | "roadmap" | "products">>({});

  const [searchQuery, setSearchQuery] = useState("");

  const trimmedQuery = searchQuery.trim().toLowerCase();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pId = params.get("p");
    if (pId) {
      const foundPillar = pillars.find((p) => p.id === pId);
      if (foundPillar) {
        const expanded: Record<string, boolean> = {};
        foundPillar.categories.forEach((cat) => {
          expanded[cat.id] = true;
        });
        setExpandedCats((prev) => ({ ...prev, ...expanded }));

        setTimeout(() => {
          const el = document.getElementById(pId);
          if (el) {
            const topOffset = el.offsetTop - 100;
            window.scrollTo({
              top: topOffset,
              behavior: "smooth",
            });
          }
        }, 150);
      }
    }
  }, [pillars]);

  const toggleCategory = (catId: string) => {
    setExpandedCats((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const isServiceSelected = (pId: string, cId: string, sName: string) => {
    return selectedServices.some(
      (s) => s.pillarId === pId && s.categoryId === cId && s.service.name === sName
    );
  };

  // Helper colors maps
  const getPillarColors = (colorName: string) => {
    switch (colorName) {
      case "cyan":
        return {
          glowColor: "rgba(251,113,133,0.4)",
          bgClass: "bg-red-500/10",
          textClass: "text-[#fb7185]",
          borderClass: "hover:border-[#fb7185]/20",
          itemBorder: "border-[#fb7185]/20",
          checkboxBg: "bg-[#fb7185]/20",
          activeCheck: "bg-[#fb7185] text-black",
          pillBg: "bg-[#fb7185] lg:bg-neutral-900 border-[#fb7185]/30 text-white lg:text-[#fb7185]",
          bulletBg: "bg-[#fb7185]"
        };
      case "orange":
        return {
          glowColor: "rgba(56,189,248,0.4)",
          bgClass: "bg-sky-500/10",
          textClass: "text-[#38bdf8]",
          borderClass: "hover:border-[#38bdf8]/20",
          itemBorder: "border-[#38bdf8]/20",
          checkboxBg: "bg-[#38bdf8]/20",
          activeCheck: "bg-[#38bdf8] text-black",
          pillBg: "bg-[#38bdf8] lg:bg-neutral-900 border-[#38bdf8]/30 text-white lg:text-[#38bdf8]",
          bulletBg: "bg-[#38bdf8]"
        };
      case "violet":
        return {
          glowColor: "rgba(255,255,255,0.4)",
          bgClass: "bg-white/10",
          textClass: "text-white",
          borderClass: "hover:border-white/20",
          itemBorder: "border-white/20",
          checkboxBg: "bg-white/20",
          activeCheck: "bg-white text-black",
          pillBg: "bg-white lg:bg-neutral-900 border-white/30 text-black lg:text-white",
          bulletBg: "bg-white"
        };
      case "sky":
        return {
          glowColor: "rgba(56,189,248,0.4)",
          bgClass: "bg-sky-500/10",
          textClass: "text-[#38bdf8]",
          borderClass: "hover:border-[#38bdf8]/20",
          itemBorder: "border-[#38bdf8]/20",
          checkboxBg: "bg-[#38bdf8]/20",
          activeCheck: "bg-[#38bdf8] text-black",
          pillBg: "bg-[#38bdf8] lg:bg-neutral-900 border-[#38bdf8]/30 text-white lg:text-[#38bdf8]",
          bulletBg: "bg-[#38bdf8]"
        };
      case "green":
        return {
          glowColor: "rgba(239,68,68,0.4)",
          bgClass: "bg-red-500/10",
          textClass: "text-[#ef4444]",
          borderClass: "hover:border-[#ef4444]/20",
          itemBorder: "border-[#ef4444]/20",
          checkboxBg: "bg-[#ef4444]/20",
          activeCheck: "bg-[#ef4444] text-white",
          pillBg: "bg-[#ef4444] lg:bg-neutral-900 border-[#ef4444]/30 text-white lg:text-[#ef4444]",
          bulletBg: "bg-[#ef4444]"
        };
      default:
        return {
          glowColor: "rgba(56,189,248,0.4)",
          bgClass: "bg-neutral-500/10",
          textClass: "text-neutral-400",
          borderClass: "hover:border-neutral-500/20",
          itemBorder: "border-neutral-500/20",
          checkboxBg: "bg-neutral-500/20",
          activeCheck: "bg-neutral-500 text-black",
          pillBg: "bg-neutral-900 border-neutral-500/30 text-neutral-400",
          bulletBg: "bg-neutral-400"
        };
    }
  };

  // Filter pillars, categories, and services based on coordinates
  const filteredPillars = pillars
    .map((pillar) => {
      const filteredCategories = pillar.categories
        .map((category) => {
          const filteredServices = category.services.filter((service) => {
            if (!trimmedQuery) return true;
            return (
              service.name.toLowerCase().includes(trimmedQuery) ||
              category.name.toLowerCase().includes(trimmedQuery) ||
              pillar.name.toLowerCase().includes(trimmedQuery)
            );
          });
          return { ...category, services: filteredServices };
        })
        .filter((category) => category.services.length > 0 || category.name.toLowerCase().includes(trimmedQuery));

      return { ...pillar, categories: filteredCategories };
    })
    .filter((pillar) => pillar.categories.length > 0 || pillar.name.toLowerCase().includes(trimmedQuery));

  // Compute total baseline stats
  const totalAvailableServices = pillars.reduce(
    (sum, p) => sum + p.categories.reduce((sSum, c) => sSum + c.services.length, 0),
    0
  );

  const matchedServicesCount = filteredPillars.reduce(
    (sum, p) => sum + p.categories.reduce((sSum, c) => sSum + c.services.length, 0),
    0
  );

  const PRESET_TAGS = [
    { label: "AI & Bots", value: "ai" },
    { label: "React / Apps", value: "app" },
    { label: "DevOps / Cloud", value: "cloud" },
    { label: "SEO & Growth", value: "seo" },
    { label: "Branding", value: "brand" },
    { label: "E-Commerce", value: "commerce" },
  ];

  return (
    <div className="space-y-16 min-h-screen">
      {/* Search Filter Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0a1128] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Tagline & Label */}
            <div className="lg:col-span-5 space-y-2">
              <div className="font-mono text-[10px] text-sky-400 tracking-widest uppercase flex items-center gap-2">
                <Icons.Search className="w-3.5 h-3.5 text-sky-400" />
                DIRECTORY FILTER
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase">
                CAPABILITY EXPLORER
              </h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-sm">
                Filter our end-to-end capabilities instantly. Type any keyword to find specialized technology and design services.
              </p>
            </div>

            {/* Input & Preset Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative flex items-center">
                <Icons.Search className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Website development, SEO, GDPR, Chatbot, Shopify..."
                  className="w-full bg-[#030714]/90 text-white border border-white/5 hover:border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-xs focus:border-sky-400/40 focus:ring-1 focus:ring-sky-500/20 focus:outline-none transition-all duration-300 placeholder:text-neutral-600 focus:shadow-[0_0_20px_rgba(56,189,248,0.03)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 rounded-full text-neutral-400 hover:text-white bg-neutral-900 border border-white/5 transition-colors cursor-pointer"
                  >
                    <Icons.X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Presets and Meta Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mr-1">
                    Quick filters:
                  </span>
                  {PRESET_TAGS.map((tag) => {
                    const isActive = trimmedQuery === tag.value;
                    return (
                      <button
                        key={tag.value}
                        onClick={() => setSearchQuery(isActive ? "" : tag.value)}
                        className={`text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-sky-500/10 border-sky-400 text-sky-400"
                            : "bg-black/20 border-white/5 text-neutral-400 hover:text-neutral-300 hover:border-white/10"
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest shrink-0">
                  {searchQuery ? (
                    <span>
                      Found <strong className="text-sky-400 font-bold">{matchedServicesCount}</strong> / {totalAvailableServices} items
                    </span>
                  ) : (
                    <span>Browse {totalAvailableServices} services</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredPillars.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20 px-6 bg-[#0a1128] border border-white/5 rounded-2xl shadow-xl space-y-4">
          <Icons.Inbox className="w-12 h-12 text-neutral-600 mx-auto stroke-1" />
          <div className="space-y-1.5">
            <h4 className="font-display text-xl text-white tracking-widest uppercase">
              No matching capabilities
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-xs mx-auto">
              We couldn't find any services matching "<span className="text-sky-400 font-mono">{searchQuery}</span>". Try another term or reset the query.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="text-[10px] font-mono uppercase bg-sky-400 text-black px-4 py-2 rounded-md hover:bg-sky-300 transition-colors cursor-pointer"
          >
            Reset Query
          </button>
        </div>
      ) : (
        filteredPillars.map((pillar) => {
          const colors = getPillarColors(pillar.colorName);

          return (
            <section
              key={pillar.id}
              id={pillar.id}
              className="border-t border-white/5 pt-16 scroll-mt-24 relative"
            >
              {/* Header Section */}
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-start">
                <div className="md:col-span-9 space-y-4">
                  <div className={`font-mono text-xs tracking-widest ${colors.textClass}`}>
                    {pillar.num} —
                  </div>
                  {/* Horizontal custom colored accent line */}
                  <div 
                    className="h-0.5 w-12 rounded-full"
                    style={{ backgroundColor: pillar.colorHex }}
                  />
                  <h2 className="font-display text-4xl md:text-6xl tracking-widest text-white uppercase">
                    {pillar.name}
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base font-light max-w-2xl leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Huge stylistic numbering on the right */}
                <div className="hidden md:block md:col-span-3 text-right">
                  <span className="font-display text-7xl md:text-9xl leading-none text-white/[0.03] select-none pointer-events-none">
                    {pillar.num}
                  </span>
                </div>
              </div>

              {/* Capability Directory Grid */}
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                {pillar.categories.map((cat) => {
                  const isOpen = trimmedQuery !== "" ? true : !!expandedCats[cat.id];
                  const selectedInCat = selectedServices.filter(
                    (s) => s.pillarId === pillar.id && s.categoryId === cat.id
                  ).length;

                  return (
                    <motion.div
                      layout="position"
                      key={cat.id}
                      className={`bg-[#0c1017] border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${
                        isOpen ? "shadow-[0_12px_24px_rgba(0,0,0,0.6)]" : ""
                      } ${colors.borderClass}`}
                    >
                      {/* Header trigger */}
                      <div
                        onClick={() => toggleCategory(cat.id)}
                        className="px-5 py-4 flex items-center justify-between cursor-pointer select-none border-b border-white/5 active:bg-neutral-900/40 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {/* Dynamic category icon */}
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bgClass} ${colors.textClass}`}
                          >
                            <DynamicIcon name={cat.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white tracking-wide">
                              {cat.name}
                            </h4>
                            {selectedInCat > 0 && (
                              <span className="inline-flex items-center text-[9px] font-mono tracking-wider text-emerald-400 mt-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/10">
                                {selectedInCat} SELECTED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dropdown caret icon */}
                        <Icons.ChevronDown
                          className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* Expandable Services list */}
                      <AnimatePresence initial={false}>
                        {isOpen && (() => {
                          const currentTab = activeTabs[cat.id] || "services";
                          const metadata = getCategoryMetadata(cat.id, cat.name);
                          return (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden bg-[#06080b]/40 border-t border-white/[0.03]"
                            >
                              <div className="p-4 space-y-4">
                                {/* Horizontal Tab Bar */}
                                <div className="flex border-b border-white/[0.04] pb-2 gap-1 overflow-x-auto no-scrollbar">
                                  {[
                                    { id: "services", label: "Services", count: cat.services.length },
                                    { id: "samples", label: "Samples", count: metadata.samples.length },
                                    { id: "roadmap", label: "Roadmap", count: metadata.roadmap.length },
                                    { id: "products", label: "Products", count: metadata.products.length }
                                  ].map((tab) => {
                                    const isActive = currentTab === tab.id;
                                    return (
                                      <button
                                        key={tab.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveTabs((prev) => ({
                                            ...prev,
                                            [cat.id]: tab.id as any
                                          }));
                                        }}
                                        className={`text-[9.5px] font-mono tracking-wider uppercase px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                                          isActive
                                            ? `${colors.textClass} ${colors.bgClass} font-semibold border ${colors.itemBorder}`
                                            : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                                        }`}
                                      >
                                        {tab.label}
                                        <span className="text-[8px] opacity-60">({tab.count})</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Tab Contents */}
                                {currentTab === "services" && (
                                  <div className="space-y-1.5">
                                    {cat.services.map((service, index) => {
                                      const isChecked = isServiceSelected(
                                        pillar.id,
                                        cat.id,
                                        service.name
                                      );

                                      return (
                                        <div
                                          key={index}
                                          onClick={() =>
                                            onToggleService(pillar.id, cat.id, service)
                                          }
                                          className="group/item flex items-center justify-between p-3 rounded-lg hover:bg-neutral-900/60 transition-all duration-150 cursor-pointer text-xs"
                                        >
                                          <div className="flex items-center gap-3">
                                            {/* Left Status Circle indicator */}
                                            <div
                                              className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                                                isChecked
                                                  ? colors.activeCheck
                                                  : `border border-white/25 hover:border-white/40 ${colors.checkboxBg}`
                                              }`}
                                            >
                                              {isChecked && (
                                                <Icons.Check className="w-3 h-3 stroke-[2.5]" />
                                              )}
                                            </div>
                                            <span
                                              className={`font-light pr-2 transition-colors ${
                                                isChecked ? "text-white font-medium" : "text-neutral-300 group-hover/item:text-white"
                                              }`}
                                            >
                                              {service.name}
                                            </span>
                                          </div>

                                          {/* Starting price indicator */}
                                          <div className="text-right shrink-0">
                                            <span className="font-mono text-[10px] text-emerald-600 font-semibold group-hover/item:text-emerald-500">
                                              Free
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {currentTab === "samples" && (
                                  <div className="space-y-2.5">
                                    {metadata.samples.map((sample, idx) => (
                                      <div 
                                        key={idx} 
                                        className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-start gap-2.5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-200"
                                      >
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.bulletBg} shrink-0`} />
                                        <div className="space-y-1">
                                          <h5 className="font-semibold text-[11px] text-white leading-tight uppercase tracking-wider">
                                            {sample.title}
                                          </h5>
                                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                                            {sample.desc}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {currentTab === "roadmap" && (
                                  <div className="relative pl-3.5 border-l border-white/10 space-y-4 py-1 ml-1">
                                    {metadata.roadmap.map((step, idx) => (
                                      <div key={idx} className="relative group/step">
                                        {/* Indicator node dot */}
                                        <div className="absolute left-[-18.5px] top-1 w-2.5 h-2.5 rounded-full border border-[#06080b] bg-[#06080b] flex items-center justify-center transition-all group-hover/step:scale-125">
                                          <div className={`w-1.5 h-1.5 rounded-full ${colors.bulletBg}`} />
                                        </div>
                                        <div className="space-y-0.5">
                                          <div className="flex items-center gap-2">
                                            <span className="font-semibold text-[10.5px] text-white tracking-widest uppercase">
                                              {step.phase}
                                            </span>
                                            <span className="text-[9px] font-mono text-neutral-500 font-medium">
                                              ({step.duration})
                                            </span>
                                          </div>
                                          <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                                            {step.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {currentTab === "products" && (
                                  <div className="grid grid-cols-2 gap-2">
                                    {metadata.products.map((p, idx) => (
                                      <div 
                                        key={idx} 
                                        className="p-2.5 bg-neutral-950/60 border border-white/5 rounded-lg flex flex-col justify-between hover:border-white/10 transition-all duration-200 gap-2"
                                      >
                                        <div>
                                          <span className="text-[10px] font-semibold text-white tracking-wide block truncate">
                                            {p.name}
                                          </span>
                                          <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono">
                                            {p.type}
                                          </span>
                                        </div>
                                        <div className="self-start">
                                          <span className={`text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${colors.bgClass} ${colors.textClass} border-transparent`}>
                                            {p.badge}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
