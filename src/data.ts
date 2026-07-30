import { Service, Category, Pillar } from "./types";

export interface FaqItem {
  q: string;
  a: string;
}

export const PILLARS_DATA: Pillar[] = [
  {
    id: "p1",
    num: "01",
    name: "Websites & Tech Setup",
    colorName: "cyan",
    colorHex: "#fb7185",
    accentClass: "text-pillar-cyan",
    hoverBorderClass: "hover:border-pillar-cyan/20",
    badgeBgClass: "bg-pillar-cyan/10 text-pillar-cyan border-pillar-cyan/20",
    description: "Get your website or app up and running. We design, build, and support your online presence with easy maintenance so you can focus on running your business.",
    categories: [
      {
        id: "p1-c1",
        name: "Websites & Apps",
        icon: "Globe",
        services: [
          { name: "Standard Website (Home, About, Contact)", basePrice: 4800, durationDays: 14 },
          { name: "Dynamic Custom Web Page", basePrice: 12500, durationDays: 30 },
          { name: "Mobile App (Android/iOS)", basePrice: 18500, durationDays: 45 },
          { name: "Visual Web Design & Layout", basePrice: 3500, durationDays: 10 },
          { name: "Easy-to-Edit Site (WordPress/Blogs)", basePrice: 5000, durationDays: 12 }
        ]
      },
      {
        id: "p1-c2",
        name: "Maintenance & Security Help",
        icon: "Wrench",
        services: [
          { name: "Security Patches & Safety Checks", basePrice: 800, durationDays: 3 },
          { name: "Daily Automated Backups", basePrice: 1200, durationDays: 5 },
          { name: "Quick Bug & Error Fixing Guide", basePrice: 2000, durationDays: 7 },
          { name: "Monthly Website Checkups", basePrice: 1500, durationDays: 30 },
          { name: "Simple Technical Advice & Support", basePrice: 2400, durationDays: 5 }
        ]
      },
      {
        id: "p1-c3",
        name: "Speed & Loading Upgrades",
        icon: "Zap",
        services: [
          { name: "Speed Up Mobile and Desktop Pages", basePrice: 2500, durationDays: 6 },
          { name: "Google Speed Score Optimization", basePrice: 1800, durationDays: 4 },
          { name: "Heavy Customer Traffic Prep Testing", basePrice: 3500, durationDays: 8 },
          { name: "Website Performance Diagnosis", basePrice: 3000, durationDays: 5 }
        ]
      },
      {
        id: "p1-c4",
        name: "Databases & Tool Integration",
        icon: "Cpu",
        services: [
          { name: "Custom API & Connection Setup", basePrice: 5500, durationDays: 15 },
          { name: "Link Existing Multi-Tools Together", basePrice: 2800, durationDays: 7 },
          { name: "Customer & Product Storage Database", basePrice: 4200, durationDays: 10 },
          { name: "Database Update & Clean Up", basePrice: 3800, durationDays: 10 }
        ]
      },
      {
        id: "p1-c5",
        name: "Hosting & Domain Setup",
        icon: "Cloud",
        services: [
          { name: "Fast Serverless Server Launch", basePrice: 4500, durationDays: 9 },
          { name: "Move Website to Cloud Hosting", basePrice: 8500, durationDays: 20 },
          { name: "Instant Update & Deploy Workflows", basePrice: 2200, durationDays: 5 },
          { name: "Superfast Global Hosting Speed Link", basePrice: 1900, durationDays: 4 }
        ]
      },
      {
        id: "p1-c6",
        name: "User Access & Screen Friendly",
        icon: "ShieldAlert",
        services: [
          { name: "Make Site Font & Color Friendly", basePrice: 3500, durationDays: 8 },
          { name: "Interactive Accessibility & Font Review", basePrice: 1800, durationDays: 4 }
        ]
      }
    ]
  },
  {
    id: "p2",
    num: "02",
    name: "Marketing & Customer Growth",
    colorName: "orange",
    colorHex: "#38bdf8",
    accentClass: "text-pillar-orange",
    hoverBorderClass: "hover:border-pillar-orange/20",
    badgeBgClass: "bg-pillar-orange/10 text-pillar-orange border-pillar-orange/20",
    description: "Get more customers visiting your physical store or online webpage. We set up Google searches, social media, and newsletters that convert clicks into regular sales.",
    categories: [
      {
        id: "p2-c1",
        name: "SEO & Content Post Strategy",
        icon: "TrendingUp",
        services: [
          { name: "Google Page Search Ranking SEO Setup", basePrice: 2200, durationDays: 10 },
          { name: "Social Media Post Creator & Calendar", basePrice: 3000, durationDays: 30 },
          { name: "Google & Facebook Paid Ads Launch", basePrice: 2500, durationDays: 14 },
          { name: "Email Newsletter & Promotion Campaigns", basePrice: 3500, durationDays: 15 }
        ]
      },
      {
        id: "p2-c2",
        name: "Customer Actions & Automation",
        icon: "RefreshCw",
        services: [
          { name: "Test Best Button & Page Layouts", basePrice: 4000, durationDays: 20 },
          { name: "Automated Customer Welcome Emails", basePrice: 3200, durationDays: 12 },
          { name: "Simple Checkout & Order Process Steps", basePrice: 4800, durationDays: 18 }
        ]
      },
      {
        id: "p2-c3",
        name: "Partners & Reach",
        icon: "Share2",
        services: [
          { name: "Customer Referral & Affiliate Setup", basePrice: 4500, durationDays: 25 },
          { name: "Local Influencer Outreach Assistance", basePrice: 5000, durationDays: 20 }
        ]
      },
      {
        id: "p2-c4",
        name: "Local Customer Attraction",
        icon: "MapPin",
        services: [
          { name: "Local Town/City SEO Reach", basePrice: 1800, durationDays: 12 },
          { name: "Google Map Business Profile Optimization", basePrice: 1200, durationDays: 7 },
          { name: "Clean Customer Review Setup Tool", basePrice: 1500, durationDays: 10 }
        ]
      },
      {
        id: "p2-c5",
        name: "Performance Dashboards",
        icon: "BarChart3",
        services: [
          { name: "Simple Sales & Lead Trackers", basePrice: 3000, durationDays: 10 },
          { name: "See Exactly Where Sales Come From", basePrice: 2800, durationDays: 8 },
          { name: "Track Page Click Actions Easily", basePrice: 3500, durationDays: 10 }
        ]
      }
    ]
  },
  {
    id: "p3",
    num: "03",
    name: "Creative Design & Branding",
    colorName: "violet",
    colorHex: "#ffffff",
    accentClass: "text-pillar-violet",
    hoverBorderClass: "hover:border-pillar-violet/20",
    badgeBgClass: "bg-pillar-violet/10 text-pillar-violet border-pillar-violet/20",
    description: "Build a beautiful visual style for your business. We design logos, color palettes, product boxes, flyers, and animations that build instant trust with your local audience.",
    categories: [
      {
        id: "p3-c1",
        name: "Logos & Brand Design",
        icon: "Palette",
        services: [
          { name: "Professional Logo Design", basePrice: 2500, durationDays: 8 },
          { name: "Brand Style Handbooks (Colors & Fonts)", basePrice: 6000, durationDays: 20 },
          { name: "Custom Digital Drawings & Flyer Vectors", basePrice: 2000, durationDays: 7 },
          { name: "Product Box & Box Packaging Design", basePrice: 5500, durationDays: 18 }
        ]
      },
      {
        id: "p3-c2",
        name: "Videos & Animations",
        icon: "Sparkles",
        services: [
          { name: "Animated Process Explainer Video", basePrice: 4500, durationDays: 14 },
          { name: "Modern Web Elements Hover Effects", basePrice: 2500, durationDays: 7 },
          { name: "Lightweight Website Icon Animations", basePrice: 1800, durationDays: 5 }
        ]
      },
      {
        id: "p3-c3",
        name: "Articles & Handbooks",
        icon: "Mic",
        services: [
          { name: "Podcast Audio Editing & Launch Guide", basePrice: 4800, durationDays: 21 },
          { name: "Visual Infographics & Step Diagrams", basePrice: 1500, durationDays: 6 },
          { name: "E-Books, Catalogues & Price List Designs", basePrice: 3200, durationDays: 10 },
          { name: "Freebie PDF Resource Design for Signups", basePrice: 2200, durationDays: 7 }
        ]
      },
      {
        id: "p3-c4",
        name: "Visual Assets & Photos",
        icon: "Image",
        services: [
          { name: "Custom Website Icon Sets", basePrice: 1200, durationDays: 5 },
          { name: "Detailed Custom Line Drawings", basePrice: 1800, durationDays: 6 },
          { name: "Store Mascot & Character Creation", basePrice: 3500, durationDays: 12 },
          { name: "3D Product Renderings & Mockups", basePrice: 3800, durationDays: 9 }
        ]
      }
    ]
  },
  {
    id: "p4",
    num: "04",
    name: "Smart Tools & Automation",
    colorName: "sky",
    colorHex: "#38bdf8",
    accentClass: "text-pillar-sky",
    hoverBorderClass: "hover:border-pillar-sky/20",
    badgeBgClass: "bg-pillar-sky/10 text-pillar-sky border-pillar-sky/20",
    description: "Save hours each week by automating manual and repetitive tasks. Set up smart chatbot support, quick sync tools, and client feedback pipelines.",
    categories: [
      {
        id: "p4-c1",
        name: "Smart AI Assistants",
        icon: "BrainCircuit",
        services: [
          { name: "Automated Website Help Chatbot", basePrice: 8500, durationDays: 15 },
          { name: "Smart Phone Voice AI Responder", basePrice: 12000, durationDays: 25 },
          { name: "Personal Desktop Copywrite AI Helper", basePrice: 15100, durationDays: 30 },
          { name: "Smart Inventory & Sales Forecaster", basePrice: 9800, durationDays: 20 }
        ]
      },
      {
        id: "p4-c2",
        name: "Data Organization",
        icon: "Network",
        services: [
          { name: "All-In-One Business Report Setup", basePrice: 11000, durationDays: 21 },
          { name: "Auto Import/Export Data Cleaner", basePrice: 7500, durationDays: 14 },
          { name: "Safe Store Data Storage System", basePrice: 14500, durationDays: 28 }
        ]
      },
      {
        id: "p4-c3",
        name: "Repetitive Task Solvers",
        icon: "Settings",
        services: [
          { name: "Auto-Sync Apps via Zapier / Make", basePrice: 3000, durationDays: 7 },
          { name: "Custom Timesaving Computer Scripts", basePrice: 4200, durationDays: 10 }
        ]
      },
      {
        id: "p4-c4",
        name: "Customer Feedback & Ideas",
        icon: "SearchCode",
        services: [
          { name: "Simple Customer Interview Setup", basePrice: 3800, durationDays: 10 },
          { name: "Visual Blueprint Layout Mockups", basePrice: 4500, durationDays: 12 },
          { name: "New Product Feasibility Review Check", basePrice: 6200, durationDays: 15 }
        ]
      },
      {
        id: "p4-c5",
        name: "Security & Privacy Rules",
        icon: "Lock",
        services: [
          { name: "Privacy Policy & Customer Safety Setup", basePrice: 7200, durationDays: 20 },
          { name: "Business Information Security Checklist", basePrice: 8800, durationDays: 25 },
          { name: "Anti-Hacker Site Safety Vulnerability Test", basePrice: 9500, durationDays: 14 }
        ]
      }
    ]
  },
  {
    id: "p5",
    num: "05",
    name: "Online Store & E-Commerce",
    colorName: "green",
    colorHex: "#ef4444",
    accentClass: "text-pillar-green",
    hoverBorderClass: "hover:border-pillar-green/20",
    badgeBgClass: "bg-pillar-green/10 text-pillar-green border-pillar-green/20",
    description: "Sell products, bookings, or consultations seamlessly directly to customers. We set up fast payment gates, product systems, and membership plans.",
    categories: [
      {
        id: "p5-c1",
        name: "Online Store Setup",
        icon: "ShoppingBag",
        services: [
          { name: "Launch Your Custom Shopify Shop", basePrice: 5500, durationDays: 12 },
          { name: "WordPress Online Store (WooCommerce)", basePrice: 4800, durationDays: 14 },
          { name: "Sell on Amazon & eBay Inventory Sync", basePrice: 3500, durationDays: 10 },
          { name: "Fast Custom-Built Online Checkout App", basePrice: 14500, durationDays: 30 }
        ]
      },
      {
        id: "p5-c2",
        name: "Boost Sales & Checkout",
        icon: "ShoppingCart",
        services: [
          { name: "Fast Page Payment Checkout Redesign", basePrice: 2800, durationDays: 7 },
          { name: "Abandoned Cart Customer Email Reminder", basePrice: 1500, durationDays: 5 },
          { name: "Put Products on Google & Meta Shops", basePrice: 2000, durationDays: 5 }
        ]
      },
      {
        id: "p5-c3",
        name: "Product & Delivery Sync",
        icon: "RefreshCw",
        services: [
          { name: "Monthly Subscription Box Program Setup", basePrice: 3200, durationDays: 9 },
          { name: "Automatic Inventory & Dropshipping Sync", basePrice: 3000, durationDays: 8 },
          { name: "Track Your Best-Selling Products Matrix", basePrice: 4500, durationDays: 12 }
        ]
      },
      {
        id: "p5-c4",
        name: "Easy No-Code Systems",
        icon: "Box",
        services: [
          { name: "Build Tool Pages WITHOUT Any Coding", basePrice: 5000, durationDays: 10 },
          { name: "AR 3D Product Interactive Viewer", basePrice: 13500, durationDays: 25 },
          { name: "Virtual Cash Checkout Advice Settings", basePrice: 12000, durationDays: 20 }
        ]
      },
      {
        id: "p5-c5",
        name: "Growth Advice & Training",
        icon: "Briefcase",
        services: [
          { name: "Store Setup Digital Health Audit", basePrice: 6500, durationDays: 15 },
          { name: "One-on-One Staff Store Training Sprints", basePrice: 4500, durationDays: 10 }
        ]
      }
    ]
  }
];

// Mutate all services to be free (basePrice = 0)
PILLARS_DATA.forEach(p => {
  p.categories.forEach(c => {
    c.services.forEach(s => {
      s.basePrice = 0;
    });
  });
});

export const FAQS_DATA: FaqItem[] = [
  {
    q: "How does the scope and cost estimator work?",
    a: "Our estimator uses average baseline engineering, strategy, and design resource rates to compute precise starter quotes. You can select individual capability items across any of our five pillars to instantly build your comprehensive scope document."
  },
  {
    q: "Can we combine multiple services from different pillars?",
    a: "Yes. In fact, most Anand Analyst engagements are cross-pillar. A typical product launch blends 'Websites & Tech Setup' (01) for your core website, 'Creative Design & Branding' (03) for branding, and 'Marketing & Customer Growth' (02) for attracting customers."
  },
  {
    q: "What is your delivery methodology?",
    a: "We work in structured 2-week sprints, backed by real-time progression tracking and automated CI/CD builds. Every digital line of code and creative deliverable is reviewed and tested iteratively with your team."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Absolutely. All client intellectual property and diagnostic data are secured by pre-engagement legal agreements prior to starting technical workshops."
  }
];
