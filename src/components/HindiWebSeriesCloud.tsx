import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CloudDownload, 
  Search, 
  Sparkles, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Download, 
  Play, 
  Layers, 
  ThumbsUp, 
  CheckCircle2, 
  AlertTriangle,
  FolderSync, 
  PlusCircle, 
  ExternalLink,
  ChevronDown,
  Clock,
  HardDrive,
  Copy,
  Check
} from "lucide-react";

// Mock Hindi Web Series Catalog Data
interface Series {
  id: string;
  name: string;
  platform: "Amazon Prime" | "Netflix" | "SonyLIV" | "JioCinema" | "Disney+ Hotstar";
  genre: "Comedy" | "Drama" | "Thriller" | "Crime" | "Mythological Thriller";
  imdb: number;
  year: string;
  seasons: {
    number: number;
    episodes: number;
    sizeGB: number;
    magnetHash: string;
  }[];
  description: string;
  posterGradient: string;
  casts: string[];
}

const WEB_SERIES_CATALOG: Series[] = [
  {
    id: "panchayat",
    name: "Panchayat",
    platform: "Amazon Prime",
    genre: "Comedy",
    imdb: 8.9,
    year: "2020 - 2024",
    description: "An engineering graduate Abhishek Tripathi reluctantly takes up a job as a secretary in a remote, underdeveloped Uttar Pradesh village named Phulera.",
    posterGradient: "from-amber-600 via-orange-600 to-red-700",
    casts: ["Jitendra Kumar", "Raghubir Yadav", "Neena Gupta"],
    seasons: [
      { number: 1, episodes: 8, sizeGB: 3.2, magnetHash: "88BC0921FFED7234" },
      { number: 2, episodes: 8, sizeGB: 3.4, magnetHash: "FF83DE2093EA1290" },
      { number: 3, episodes: 8, sizeGB: 3.8, magnetHash: "BBDACF28231AA09C" }
    ]
  },
  {
    id: "mirzapur",
    name: "Mirzapur",
    platform: "Amazon Prime",
    genre: "Crime",
    imdb: 8.5,
    year: "2018 - 2024",
    description: "A shocking incident at a wedding procession ignites a bloody series of events, entangling the lives of two extraordinary families in the lawless city of Mirzapur.",
    posterGradient: "from-red-800 via-stone-800 to-slate-900",
    casts: ["Pankaj Tripathi", "Ali Fazal", "Divyendu Sharma"],
    seasons: [
      { number: 1, episodes: 9, sizeGB: 4.5, magnetHash: "AA729ABFCDE43091" },
      { number: 2, episodes: 10, sizeGB: 4.8, magnetHash: "44BCD9EFA00EFA44" },
      { number: 3, episodes: 10, sizeGB: 5.2, magnetHash: "CCDEFA839DBEA112" }
    ]
  },
  {
    id: "scam-1992",
    name: "Scam 1992: The Harshad Mehta Story",
    platform: "SonyLIV",
    genre: "Drama",
    imdb: 9.3,
    year: "2020",
    description: "Set in 1980s and 90s Bombay, the story follows Harshad Mehta's meteoric rise and catastrophic fall as the king of the Indian stock market.",
    posterGradient: "from-emerald-750 via-teal-800 to-slate-950",
    casts: ["Pratik Gandhi", "Shreya Dhanwanthary", "Hemant Kher"],
    seasons: [
      { number: 1, episodes: 10, sizeGB: 5.5, magnetHash: "EEEDFFA823E90123" }
    ]
  },
  {
    id: "the-family-man",
    name: "The Family Man",
    platform: "Amazon Prime",
    genre: "Thriller",
    imdb: 8.7,
    year: "2019 - 2021",
    description: "A middle-class man Srikant Tiwari works for a special cell of the National Investigation Agency, struggling to balance his secret high-risk work with his family life.",
    posterGradient: "from-blue-800 via-slate-800 to-neutral-900",
    casts: ["Manoj Bajpayee", "Sharib Hashmi", "Priyamani"],
    seasons: [
      { number: 1, episodes: 10, sizeGB: 4.1, magnetHash: "123CAFEBABE98223" },
      { number: 2, episodes: 9, sizeGB: 4.4, magnetHash: "789DECAFBA902124" }
    ]
  },
  {
    id: "asur",
    name: "Asur: Welcome to Your Dark Side",
    platform: "JioCinema",
    genre: "Mythological Thriller",
    imdb: 8.5,
    year: "2020 - 2023",
    description: "A unique psychological war plays out between forensic experts and a serial killer who believes he's the reincarnation of the demon Kali.",
    posterGradient: "from-purple-800 via-indigo-950 to-slate-950",
    casts: ["Arshad Warsi", "Barun Sobti", "Riddhi Dogra"],
    seasons: [
      { number: 1, episodes: 8, sizeGB: 3.6, magnetHash: "9900223DFEABC111" },
      { number: 2, episodes: 8, sizeGB: 3.9, magnetHash: "11CA2234FFDC0033" }
    ]
  },
  {
    id: "kota-factory",
    name: "Kota Factory",
    platform: "Netflix",
    genre: "Comedy",
    imdb: 9.0,
    year: "2019 - 2024",
    description: "A poignant monochromatic look at the high-pressure life of IIT aspirants in Kota, guided by their beloved mentor Jeetu Bhaiya.",
    posterGradient: "from-slate-400 via-slate-700 to-neutral-950",
    casts: ["Jitendra Kumar", "Mayur More", "Ahsaas Channa"],
    seasons: [
      { number: 1, episodes: 5, sizeGB: 1.8, magnetHash: "FEEBA12234ACDFDF" },
      { number: 2, episodes: 5, sizeGB: 2.0, magnetHash: "92837492A7210B33" },
      { number: 3, episodes: 5, sizeGB: 2.2, magnetHash: "99AABBCC83724BBD" }
    ]
  },
  {
    id: "sacred-games",
    name: "Sacred Games",
    platform: "Netflix",
    genre: "Crime",
    imdb: 8.6,
    year: "2018 - 2019",
    description: "A link in the past leads an honest police officer, Sartaj Singh, to a fugitive gang lord, Ganesh Gaitonde, whose cryptic warning threatens to destroy Mumbai.",
    posterGradient: "from-red-950 via-red-900 to-purple-950",
    casts: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte"],
    seasons: [
      { number: 1, episodes: 8, sizeGB: 4.0, magnetHash: "88CD2190A939EFA2" },
      { number: 2, episodes: 8, sizeGB: 4.2, magnetHash: "99BBDCECAFFE9230" }
    ]
  },
  {
    id: "farzi",
    name: "Farzi",
    platform: "Amazon Prime",
    genre: "Thriller",
    imdb: 8.4,
    year: "2023",
    description: "A brilliant small-time artist Sunny designs a perfect counterfeit currency note, getting sucked into a high-stakes cat-and-mouse hunt with an eccentric task force officer.",
    posterGradient: "from-green-700 via-zinc-850 to-emerald-950",
    casts: ["Shahid Kapoor", "Vijay Sethupathi", "Kay Kay Menon"],
    seasons: [
      { number: 1, episodes: 8, sizeGB: 4.3, magnetHash: "77665544FFAAEEBB" }
    ]
  }
];

export interface CustomRequest {
  id: string;
  name: string;
  year: string;
  notes: string;
  status: "Pending Crawler" | "Indexing Segments" | "Active Cache Online";
  addedAt: string;
  sizeGB: number;
  magnetHash: string;
}

export default function HindiWebSeriesCloud() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "sync" | "request">("catalog");
  const [hashInput, setHashInput] = useState("");

  // Selection states
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedSeasonNum, setSelectedSeasonNum] = useState<number>(1);
  const [selectedQuality, setSelectedQuality] = useState<"720p" | "1080p" | "2160p">("1080p");
  
  // Interactive Simulation Downloader States
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStep, setDownloadStep] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  // Cloud Sync Form States
  const [syncDriveUrl, setSyncDriveUrl] = useState("");
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  // Web Series Request States
  const [requestedName, setRequestedName] = useState("");
  const [requestedYear, setRequestedYear] = useState("");
  const [requestedNotes, setRequestedNotes] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestFeedback, setRequestFeedback] = useState<string | null>(null);

  // Copy Feedback State
  const [copiedMagnet, setCopiedMagnet] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // Custom Series Requests stored in localStorage
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    try {
      const saved = localStorage.getItem("anand_custom_series_requests");
      return saved ? JSON.parse(saved) : [
        {
          id: "req_gullak",
          name: "Gullak Season 4",
          year: "2024",
          notes: "Atmos dual audio preferred",
          status: "Active Cache Online",
          addedAt: new Date(Date.now() - 3600000 * 3).toLocaleString(),
          sizeGB: 3.1,
          magnetHash: "FEEBA8812390ABCE"
        },
        {
          id: "req_heeramandi",
          name: "Heeramandi: The Diamond Bazaar",
          year: "2024",
          notes: "Sanjay Leela Bhansali UHD profile",
          status: "Active Cache Online",
          addedAt: new Date(Date.now() - 3600000 * 24).toLocaleString(),
          sizeGB: 6.8,
          magnetHash: "CCDEEFA8823E09D3"
        }
      ];
    } catch {
      return [];
    }
  });

  // Save requests when changed
  useEffect(() => {
    localStorage.setItem("anand_custom_series_requests", JSON.stringify(customRequests));
  }, [customRequests]);

  // Filter Catalog
  const filteredCatalog = WEB_SERIES_CATALOG.filter((series) => {
    const matchesSearch = series.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          series.casts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          series.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          series.seasons.some(s => s.magnetHash.toLowerCase().includes(searchQuery.trim().toLowerCase()));
    const matchesPlatform = selectedPlatform === "All" || series.platform === selectedPlatform;
    const matchesGenre = selectedGenre === "All" || series.genre === selectedGenre;
    return matchesSearch && matchesPlatform && matchesGenre;
  });

  // Handle Cloud Direct Sync Simulation
  const handleDriveSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncDriveUrl) return;
    setSyncStatus("verifying");
    setSyncFeedback("Initializing multi-node secure gateway and checking GDrive sync tokens...");
    
    setTimeout(() => {
      setSyncStatus("success");
      setSyncFeedback("✅ Success: Cloud Mirror linked with 10 Gbps fiber gateway! Real-time series cache is now online in background.");
    }, 1500);
  };

  // Live simulation of request updating in background session
  const simulateRequestIndexing = (reqId: string) => {
    setTimeout(() => {
      setCustomRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "Indexing Segments" } : r));
      setTimeout(() => {
        setCustomRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "Active Cache Online" } : r));
      }, 7000);
    }, 5500);
  };

  // Handle Custom Request Submission
  const handleCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedName) return;
    
    setRequestSubmitted(true);
    setRequestFeedback("Initializing specialized crawler nodes to parse global index hashes...");
    
    const newReq: CustomRequest = {
      id: `req_${Math.floor(100000 + Math.random() * 900000)}`,
      name: requestedName,
      year: requestedYear || "2026",
      notes: requestedNotes || "N/A",
      status: "Pending Crawler",
      addedAt: new Date().toLocaleString(),
      sizeGB: parseFloat((3 + Math.random() * 5).toFixed(1)),
      magnetHash: Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 10).toUpperCase()
    };

    setTimeout(() => {
      setCustomRequests(prev => [newReq, ...prev]);
      setRequestedName("");
      setRequestedYear("");
      setRequestedNotes("");
      setRequestSubmitted(false);
      setRequestFeedback(`🎉 Awesome! "${newReq.name}" has been added to our live indexing queue. Tracking query ref: ${newReq.id}. Watch the live status below update!`);
      
      // Clear message after 10 seconds
      setTimeout(() => {
        setRequestFeedback(null);
      }, 10000);

      // Trigger automatic background crawler simulation
      simulateRequestIndexing(newReq.id);
    }, 1200);
  };

  // Clipboard copies
  const executeCopyMagnet = (magnet: string) => {
    try {
      navigator.clipboard.writeText(magnet);
      setCopiedMagnet(true);
      setTimeout(() => setCopiedMagnet(false), 2000);
    } catch {
      // Fallback
    }
  };

  const executeCopyHash = (hash: string) => {
    try {
      navigator.clipboard.writeText(hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Direct hash decoder for instant cache lookup
  const handleHashDecode = (hashToDecode: string) => {
    const cleanHash = hashToDecode.trim().toUpperCase();
    if (!cleanHash) return;

    // 1. Search in static catalog
    for (const series of WEB_SERIES_CATALOG) {
      for (const season of series.seasons) {
        if (season.magnetHash.trim().toUpperCase() === cleanHash) {
          triggerDownloadAction(series, season.number);
          setHashInput("");
          return;
        }
      }
    }

    // 2. Search in custom requests list
    for (const req of customRequests) {
      if (req.magnetHash.trim().toUpperCase() === cleanHash) {
        if (req.status === "Active Cache Online") {
          triggerDownloadAction({
            id: req.id,
            name: req.name,
            platform: "JioCinema",
            genre: "Drama",
            imdb: 8.4,
            year: req.year,
            description: "User requested and scraped custom cloud proxy series path.",
            posterGradient: "from-indigo-950 via-slate-900 to-emerald-950",
            casts: ["User Custom Request Engine"],
            seasons: [
              { number: 1, episodes: 8, sizeGB: req.sizeGB, magnetHash: req.magnetHash }
            ]
          }, 1);
          setHashInput("");
        } else {
          alert(`🎯 Custom query found but crawler state is: "${req.status}". Please monitor it on the Request tab.`);
        }
        return;
      }
    }

    alert("❌ Cache Hash Key not found in indices! Request this series in the 'Request Series' tab to force cloud crawlers to fetch it.");
  };

  // Main interactive multi-stage downloader
  const triggerDownloadAction = (series: Series, seasonNum: number) => {
    setSelectedSeries(series);
    setSelectedSeasonNum(seasonNum);
    setIsDownloading(true);
    setDownloadCompleted(false);
    setDownloadStep(0);
    setDownloadProgress(0);
    setSimulatedLogs(["[CONN] Initiating Multipath Server TLS Handshake on port 3000..."]);
  };

  // Handle download simulation intervals
  useEffect(() => {
    if (!isDownloading || downloadCompleted) return;

    let interval: any;
    if (downloadStep === 0) {
      interval = setTimeout(() => {
        setSimulatedLogs(prev => [
          ...prev, 
          "[CONN] Bypassing cloud download constraints...",
          `[DNS] Resolved peer high-speed mirrors for ${selectedSeries?.name} S${selectedSeasonNum} [${selectedQuality}]`,
          "[PING] Connected successfully to CloudNode-09 (Singapore Edge). Latency: 14ms"
        ]);
        setDownloadStep(1);
      }, 800);
    } else if (downloadStep === 1) {
      interval = setTimeout(() => {
        setSimulatedLogs(prev => [
          ...prev,
          "[AUTH] Handshake authorized with Anand Free Cloud Bypass token.",
          "[MAPPED] Dynamic virtual loop directory resolved. Beginning package compression..."
        ]);
        setDownloadStep(2);
      }, 1000);
    } else if (downloadStep === 2) {
      // Progress simulation
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadStep(3);
            return 100;
          }
          const add = Math.floor(Math.random() * 20) + 12;
          const next = Math.min(prev + add, 100);
          return next;
        });
      }, 250);
    } else if (downloadStep === 3) {
      interval = setTimeout(() => {
        const hash = selectedSeries?.seasons.find(s => s.number === selectedSeasonNum)?.magnetHash || "ANAND_CLOUD_HASH";
        setSimulatedLogs(prev => [
          ...prev,
          "----------------------------------------",
          "🎉 [DONE] ZIP Package successfully compiled in the cloud!",
          `🔓 High-speed Mirror Link Active [Expires in 2 hr]`,
          `📦 Quality: ${selectedQuality} Ultra-HEVC Dual Audio (Hindi TrueHD 5.1)`
        ]);
        setDownloadCompleted(true);
        try {
          // Attempt automatic download as fallback
          triggerActualFileDownload(seriesFilename(), hash);
        } catch {
          // Ignore iframe sandbox block errors
        }
      }, 600);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDownloading, downloadStep, downloadProgress, downloadCompleted]);

  const seriesFilename = () => {
    if (!selectedSeries) return "Hindi_Web_Series.txt";
    return `${selectedSeries.name.replace(/[^a-zA-Z0-9]/g, "_")}_Season_${selectedSeasonNum}_${selectedQuality}_CloudBypass.txt`;
  };

  // Downloads a physical metadata file providing high-speed direct download keys and magnet links
  const triggerActualFileDownload = (filename: string, hash: string) => {
    const fileContent = `========================================================================
 ANAND CLOUD MULTIPATH DOWNLOAD PROTOCOL - 100% FREE HINDI WEB SERIES
========================================================================
Series Code: ${selectedSeries?.id?.toUpperCase() || "UNKNOWN"}
Title: ${selectedSeries?.name || "Premium Hindi Web Series"}
Season: ${selectedSeasonNum}
Quality: ${selectedQuality} (10-bit HDR, x265 HEVC, Indian Audio Dual Encoding)
Platform Resource: ${selectedSeries?.platform || "External Stream"}
Server Node: Anand Cloud Multipath Singapore Edge (High-Speed)

IMPORTANT ACCESS DIRECTIONS:
---------------------------
1. Directly load or import this dynamic metadata hash: ${hash || "ANAND_HASH_9823"}
2. High-Speed Torrent Magnet Option: magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(selectedSeries?.name || "Series")}+S0${selectedSeasonNum}
3. Dynamic Bypass Mirror: https://anand-cloud-mirror.example.com/download/file?id=${selectedSeries?.id}&season=${selectedSeasonNum}&res=${selectedQuality}
4. Google Drive Direct Sync: Paste this hash inside the Anand 'Drive Cloud Sync' tab to sync it straight to your personal GDrive folders.

Thank you for choosing Anand Cloud Server - Revolutionizing Local Digital Tech & Media Access fast!
Timestamp: ${new Date().toLocaleString("en-US")}
========================================================================`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="hindi-webseries-cloud" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl font-sans">
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-6 mb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              Free Access Point
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2.5">
            <CloudDownload className="w-7 h-7 text-cyan-400" /> Free Hindi Web Series Cloud System
          </h2>
          <p className="text-slate-400 text-xs font-light max-w-3xl leading-relaxed">
            Search, discover, and instantly bypass download throttles for popular Indian web series. Run real-time high-speed premium cloud queries, download multi-quality files, or direct-sync to your Google Drive completely free.
          </p>
        </div>

        {/* Tab selection */}
        <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 inline-flex items-center gap-1">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border-none ${
              activeTab === "catalog" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Series Catalog
          </button>
          <button
            onClick={() => setActiveTab("sync")}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border-none ${
              activeTab === "sync" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            GDrive Direct Sync
          </button>
          <button
            onClick={() => setActiveTab("request")}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer border-none ${
              activeTab === "request" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Request Series
          </button>
        </div>
      </div>

      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Filters Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Hindi Web Series by title, cast, description..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-505 transition-all text-slate-350 cursor-pointer"
              >
                <option value="All">All Streaming Networks</option>
                <option value="Amazon Prime">Amazon Prime Video</option>
                <option value="Netflix">Netflix Originals</option>
                <option value="SonyLIV">SonyLIV Specials</option>
                <option value="JioCinema">JioCinema / Voot</option>
                <option value="Disney+ Hotstar">Disney+ Hotstar</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-505 transition-all text-slate-350 cursor-pointer"
              >
                <option value="All">All Story Genres</option>
                <option value="Comedy">Comedy & Satire</option>
                <option value="Drama">Human Drama</option>
                <option value="Thriller">Action & Thriller</option>
                <option value="Crime">Crime & Syndicate</option>
                <option value="Mythological Thriller">Mythological Mystery</option>
              </select>
            </div>
          </div>

          {/* Instant Torrent/Cache Code Decoder Bar */}
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-950/40 rounded-xl border border-cyan-900/40 text-cyan-400">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-0.5 text-left">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  Direct Cache Key & Magnet Hash Decoder
                </div>
                <p className="text-[10.5px] text-slate-400 font-light">
                  Have a specific access/magnet hash (e.g., <button onClick={() => setHashInput("EEEDFFA823E90123")} className="text-cyan-400 font-mono underline hover:text-cyan-300 bg-transparent border-none p-0 cursor-pointer">EEEDFFA823E90123</button>)? Decode it here to fetch immediately.
                </p>
              </div>
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-2">
              <input
                type="text"
                placeholder="Enter 16-character Hash..."
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full md:w-64 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white uppercase font-mono tracking-widest focus:outline-none focus:border-cyan-550 placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
              />
              <button
                onClick={() => handleHashDecode(hashInput)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all border-none cursor-pointer whitespace-nowrap"
              >
                Decode Hash
              </button>
            </div>
          </div>

          {/* Quick Quality Settings */}
          <div className="bg-slate-950/45 p-3 rounded-xl border border-slate-850/65 flex flex-wrap justify-between items-center gap-3">
            <span className="text-[11px] font-mono tracking-wide text-slate-400 uppercase flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              Pre-configured Resolution Profile:
            </span>
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg gap-1">
              <button
                onClick={() => setSelectedQuality("720p")}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded cursor-pointer border-none ${
                  selectedQuality === "720p" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                720p Mobile (Fast)
              </button>
              <button
                onClick={() => setSelectedQuality("1080p")}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded cursor-pointer border-none ${
                  selectedQuality === "1080p" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                1080p Full-HD (Best Spec)
              </button>
              <button
                onClick={() => setSelectedQuality("2160p")}
                className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded cursor-pointer border-none ${
                  selectedQuality === "2160p" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                2160p 4K UHD (Dolby Vision)
              </button>
            </div>
          </div>

          {/* Grid Layout of Movies/Web Series */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCatalog.map((series) => (
                <motion.div
                  layout
                  key={series.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-950/60 border border-slate-850 rounded-2xl overflow-hidden flex flex-col hover:border-slate-700 transition-all group"
                >
                  {/* Banner simulation */}
                  <div className={`p-4 bg-gradient-to-br ${series.posterGradient} h-36 flex flex-col justify-between relative`}>
                    <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
                    
                    <div className="flex justify-between items-start z-10">
                      <span className="bg-slate-900/90 text-slate-100 text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border border-slate-700/60">
                        {series.platform}
                      </span>
                      <span className="bg-cyan-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        ⭐ {series.imdb}
                      </span>
                    </div>

                    <div className="z-10 space-y-0.5">
                      <h3 className="text-lg font-black text-white leading-tight uppercase group-hover:text-cyan-300 transition-colors">
                        {series.name}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-205 text-amber-200">
                        Released: {series.year} | {series.genre}
                      </p>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3">
                      {series.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Star Casts:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {series.casts.map((actor, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-350 text-[10px] px-2.5 py-1 rounded border border-slate-800">
                            {actor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Download Buttons */}
                    <div className="border-t border-slate-900 pt-3.5 space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between">
                        <span>AVAILABLE CLOUD SEASONS</span>
                        <span className="text-[9px] text-cyan-400">⚡ 1 Gbps direct cache</span>
                      </span>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {series.seasons.map((season) => (
                          <button
                            key={season.number}
                            onClick={() => triggerDownloadAction(series, season.number)}
                            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between group/btn cursor-pointer transition-all transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <Layers className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Season {season.number} <span className="text-slate-500 font-sans">({season.episodes} eps)</span></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-sans group-hover/btn:bg-cyan-950 group-hover/btn:text-cyan-400 transition-colors">
                                {season.sizeGB} GB
                              </span>
                              <Download className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredCatalog.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 space-y-3 font-mono">
                  <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto stroke-[1.2]" />
                  <p className="text-sm">No web series matched your query. Try custom requesting it!</p>
                  <button
                    onClick={() => setActiveTab("request")}
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1.5 text-xs font-bold"
                  >
                    🚀 Open Request Pipeline Form ➔
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {activeTab === "sync" && (
        <div className="max-w-2xl mx-auto py-6 space-y-6">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-start gap-3">
              <FolderSync className="w-10 h-10 text-cyan-400 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white font-mono uppercase">Sync Straight to Google Drive Account</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  By linking your personal workspace sync token or directory, you can push downloadable media catalog bundles directly to your Cloud storage drives instantly without eating up physical computer memory or phone storage!
                </p>
              </div>
            </div>

            <form onSubmit={handleDriveSync} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-slate-350 uppercase block">
                  Google Drive Shared Folder Link / Backup Token
                </label>
                <input
                  type="url"
                  required
                  value={syncDriveUrl}
                  onChange={(e) => setSyncDriveUrl(e.target.value)}
                  placeholder="e.g. https://drive.google.com/drive/folders/your-secret-admissions-or-media-crm-folder-id"
                  className="w-full px-3.5 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={syncStatus === "verifying"}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs py-3 rounded-xl uppercase transition-all shadow shadow-cyan-950/20 cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                <Server className={`w-4 h-4 ${syncStatus === "verifying" ? "animate-spin" : ""}`} />
                {syncStatus === "verifying" ? "Verifying Multi-Path Mirror Pipeline..." : "Link Real-time Bypass Mirror Node"}
              </button>
            </form>

            {syncFeedback && (
              <div className={`p-3.5 rounded-xl text-xs leading-relaxed font-mono ${
                syncStatus === "success" 
                  ? "bg-emerald-950/40 border border-emerald-500/35 text-emerald-400" 
                  : "bg-slate-900 text-slate-300 border border-slate-850"
              }`}>
                {syncFeedback}
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950/20 border border-slate-800/80 rounded-xl space-y-2">
            <h4 className="text-[11px] font-bold text-amber-400 flex items-center gap-1 uppercase font-mono">
              ⚠️ Technical Protocol Details
            </h4>
            <ul className="list-disc pl-4 text-[10.5px] text-slate-400 leading-relaxed space-y-1 font-light">
              <li>Requires no secondary registration. All downloads generated in the file system acts as direct High-Speed mirrors.</li>
              <li>Dual audio support embedded natively inside every `.txt` catalog payload generated dynamically.</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "request" && (
        <div className="max-w-3xl mx-auto py-6 space-y-8">
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-start gap-3">
              <PlusCircle className="w-10 h-10 text-cyan-400 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white font-mono uppercase">Request Custom Hindi Series</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Is your favorite series missing? Drop the exact name and release year, and our specialized cloud indexers will crawl external secure cache servers to populate the direct download links on Anand catalog list within 30 minutes!
                </p>
              </div>
            </div>

            <form onSubmit={handleCustomRequest} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block">Web Series Name *</label>
                  <input
                    type="text"
                    required
                    value={requestedName}
                    onChange={(e) => setRequestedName(e.target.value)}
                    placeholder="e.g. Gullak Season 4 / Heeramandi"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block">Expected Year (Optional)</label>
                  <input
                    type="text"
                    value={requestedYear}
                    onChange={(e) => setRequestedYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block">Additional Instructions / Special Audio Track Quality</label>
                <textarea
                  value={requestedNotes}
                  onChange={(e) => setRequestedNotes(e.target.value)}
                  placeholder="e.g. Please index the Dolby Atmos 7.1 TrueHD audio track if possible."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={requestSubmitted}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs py-3 rounded-xl uppercase transition-all shadow shadow-cyan-950/20 cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                {requestSubmitted ? (
                  "Scheduling Crawler..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                    Submit Request to Free Indexer Queue
                  </>
                )}
              </button>
            </form>

            {requestFeedback && (
              <div className="p-4 bg-cyan-950/40 text-cyan-200 border border-cyan-800/50 rounded-xl text-xs leading-relaxed animate-fade-in font-sans">
                {requestFeedback}
              </div>
            )}
          </div>

          {/* Table display of live indexer requests list */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Your Cloud Indexer Queries Queue ({customRequests.length})
              </span>
              <span className="text-[10px] font-mono text-slate-500">Auto-Refreshes in real-time</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-350">
                <thead className="bg-slate-900/40 text-slate-400 text-[10px] uppercase font-mono border-b border-slate-800/60">
                  <tr>
                    <th scope="col" className="px-5 py-3">Web Series Search Query</th>
                    <th scope="col" className="px-4 py-3 hidden sm:table-cell">Added At</th>
                    <th scope="col" className="px-4 py-3 text-center">Status</th>
                    <th scope="col" className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {customRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-xs">{req.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          Year: {req.year} | Code: #{req.id.replace("req_", "").toUpperCase()}
                        </div>
                        {req.notes && req.notes !== "N/A" && (
                          <div className="text-[10px] text-zinc-500 italic mt-1 font-light max-w-sm truncate">
                            "{req.notes}"
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell whitespace-nowrap text-[11px] font-mono text-slate-500">
                        {req.addedAt}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {req.status === "Pending Crawler" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-amber-500 border border-amber-950 text-[10px] font-mono font-semibold animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            CRAWLING
                          </span>
                        )}
                        {req.status === "Indexing Segments" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-cyan-400 border border-cyan-950 text-[10px] font-mono font-semibold animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            INDEXING
                          </span>
                        )}
                        {req.status === "Active Cache Online" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 text-[10px] font-mono font-bold uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            ONLINE
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {req.status === "Active Cache Online" ? (
                          <button
                            onClick={() => {
                              // Dynamically mount query request object to download schema
                              triggerDownloadAction({
                                id: req.id,
                                name: req.name,
                                platform: "JioCinema",
                                genre: "Drama",
                                imdb: 8.4,
                                year: req.year,
                                description: "User requested and scraped custom cloud proxy series path.",
                                posterGradient: "from-indigo-950 via-slate-900 to-emerald-950",
                                casts: ["User Custom Request Engine"],
                                seasons: [
                                  { number: 1, episodes: 8, sizeGB: req.sizeGB, magnetHash: req.magnetHash }
                                ]
                              }, 1);
                            }}
                            className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 hover:text-white rounded-lg border border-cyan-800/40 text-[10.5px] font-mono font-bold transition-all text-center uppercase cursor-pointer flex items-center gap-1 ml-auto"
                          >
                            <Download className="w-3 h-3" />
                            GET LINKS
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-600 block">Caching...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Downloader Console Modal Simulation Overlay */}
      <AnimatePresence>
        {isDownloading && selectedSeries && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative font-sans"
            >
              {/* Header */}
              <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-850 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    CLOUD PIPELINE DOWNLOAD MASTER
                  </span>
                </div>
                {!downloadCompleted && (
                  <span className="text-[10px] font-mono text-cyan-400 animate-pulse bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded uppercase">
                    ACTIVE TUNNEL
                  </span>
                )}
              </div>

              {/* Main Console view */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white uppercase tracking-tight text-sm">
                      {selectedSeries.name} (Season {selectedSeasonNum})
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Target File Profile: {selectedQuality} | Atmos Audio Surround
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-slate-505 text-slate-500">Speed Status: </span>
                    <span className="text-emerald-400 font-bold animate-pulse">128.5 MB/s</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="h-2.5 w-full bg-slate-950 rounded-full border border-slate-850 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${downloadProgress}%` }}
                      className="bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono select-none">
                    <span className="text-slate-450 text-slate-400 uppercase">
                      {downloadStep === 0 && "🔌 Connecting Node..."}
                      {downloadStep === 1 && "🔑 Authorizing access key..."}
                      {downloadStep === 2 && `⚡ Pulling chunk stream: ${downloadProgress}%`}
                      {downloadStep === 3 && "📦 Packing Metadata File..."}
                    </span>
                    <span className="text-cyan-400 font-bold">{downloadProgress}%</span>
                  </div>
                </div>

                {/* Virtual CLI Live Logs */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[10.5px] text-zinc-450 text-zinc-300 space-y-1.5 h-44 overflow-y-auto selection:bg-cyan-500 selection:text-slate-950 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
                  {simulatedLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={
                        log.startsWith("🎉") || log.includes("🔓") 
                          ? "text-emerald-400 font-bold" 
                          : log.startsWith("[CONN]") 
                          ? "text-cyan-400" 
                          : log.startsWith("---") 
                          ? "text-slate-700" 
                          : "text-slate-350"
                      }
                    >
                      {log}
                    </div>
                  ))}
                  {downloadStep === 2 && (
                    <div className="text-zinc-500 text-[10px] animate-pulse">
                      &gt; FETCHING IP CORE-2: Pumping buffer segment index: {Math.floor(downloadProgress * 8)}/800
                    </div>
                  )}
                </div>

                {/* Prompt actions after download */}
                {downloadCompleted ? (
                  <div className="space-y-4 pt-2 border-t border-slate-800/60">
                    <div className="bg-emerald-950/20 border border-emerald-900/60 p-3.5 rounded-xl space-y-1 text-center">
                      <div className="text-emerald-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Compilation Successful! Secure Mirror Online
                      </div>
                      <p className="text-[10.5px] text-slate-350 leading-relaxed font-light">
                        Browser popup-blockers might restrict auto-generated files. Please use any direct mirror action below to retrieve your requested series payload:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Button to run Magnet */}
                      <a
                        href={`magnet:?xt=urn:btih:${selectedSeries.seasons.find(s => s.number === selectedSeasonNum)?.magnetHash || "ANAND"}&dn=${encodeURIComponent(selectedSeries.name)}+S0${selectedSeasonNum}`}
                        className="py-3 px-4 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-900/50 rounded-xl font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all text-[11px]"
                      >
                        <Play className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        Launch Magnet Torrent
                      </a>

                      {/* Button to copy magnet hash code */}
                      <button
                        onClick={() => {
                          const hash = selectedSeries.seasons.find(s => s.number === selectedSeasonNum)?.magnetHash || "ANAND";
                          executeCopyHash(hash);
                        }}
                        className="py-3 px-4 bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-xl font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                      >
                        {copiedHash ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Hash Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            Copy Magnet Hash
                          </>
                        )}
                      </button>

                      {/* Button to Download Text file */}
                      <button
                        onClick={() => {
                          const hash = selectedSeries.seasons.find(s => s.number === selectedSeasonNum)?.magnetHash || "ANAND";
                          triggerActualFileDownload(seriesFilename(), hash);
                        }}
                        className="py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download File (.txt)
                      </button>

                      {/* Button to GDrive Tab Sync */}
                      <button
                        onClick={() => {
                          const hash = selectedSeries.seasons.find(s => s.number === selectedSeasonNum)?.magnetHash || "ANAND";
                          setSyncDriveUrl(`https://drive.google.com/drive/folders/anand-sync-${hash}`);
                          setActiveTab("sync");
                          setIsDownloading(false);
                        }}
                        className="py-3 px-4 bg-slate-950 hover:bg-slate-850 text-amber-400 hover:text-amber-300 border border-slate-800 rounded-xl font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                      >
                        <FolderSync className="w-3.5 h-3.5 text-amber-550 text-amber-400" />
                        Direct GDrive Sync
                      </button>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-slate-800/20">
                      <button
                        onClick={() => {
                          setIsDownloading(false);
                          setSelectedSeries(null);
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 hover:bg-slate-855 text-slate-400 hover:text-white border border-slate-850 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                      >
                        Keep Browsing Catalog
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsDownloading(false);
                        setSelectedSeries(null);
                      }}
                      className="flex-1 py-3 bg-slate-955 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-xs font-mono font-bold uppercase transition-all text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel Secure Connection
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
