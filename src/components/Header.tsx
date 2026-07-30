import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Pillar } from "../types";
import { AnandLogo } from "./AnandLogo";

interface HeaderProps {
  pillars: Pillar[];
  currentPath: string;
  onNavigate: (to: string) => void;
}

export default function Header({ pillars, currentPath, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "My Ventures", path: "/ventures" },
    { label: "Services", path: "/pillars" },
    { label: "Solutions", path: "/solutions" },
    { label: "Industries", path: "/industries" },
    { label: "About Us", path: "/about" },
    { label: "FAQs", path: "/faq" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-md"
          : "bg-slate-950/80 backdrop-blur-xs border-b border-slate-900/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onNavigate("/");
          }}
          className="flex items-center gap-2.5 cursor-pointer group z-50 animate-fade-in"
        >
          <AnandLogo size="md" lightText={true} />
        </a>

        {/* Navigation links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800/90 backdrop-blur-md shadow-lg">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                }}
                className={`text-[10px] tracking-widest uppercase font-mono px-3.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA Link (Desktop) */}
        <a
          href="/estimator"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/estimator");
          }}
          className="hidden md:inline-flex items-center gap-2 text-xs font-mono tracking-wider font-semibold bg-[#0c4a6e] text-white hover:bg-amber-500 hover:text-[#0b1536] px-4 py-2 rounded-md transition-all duration-200 cursor-pointer"
        >
          GET PRICING
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-neutral-400 hover:text-white bg-white/5 border border-white/5 rounded-lg md:hidden z-50 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#020510]/98 backdrop-blur-lg z-40 md:hidden flex flex-col justify-center px-8 transition-all duration-300 animate-fade-in">
          <div className="space-y-6 text-center max-w-sm mx-auto w-full">
            <span className="font-mono text-[9px] tracking-widest text-sky-400 block mb-6">
              — MAIN MENU NAVIGATION —
            </span>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onNavigate(item.path);
                    }}
                    className={`text-base tracking-widest uppercase font-mono py-3 rounded-xl border transition-all ${
                      isActive
                        ? "bg-sky-500/10 text-sky-400 border-sky-500/25 font-bold shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "text-neutral-400 hover:text-white border-transparent hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/5 mt-6">
              <a
                href="/estimator"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate("/estimator");
                }}
                className="w-full relative inline-flex items-center justify-center gap-2 text-xs font-mono tracking-wider font-bold border border-sky-400 text-sky-400 hover:text-black bg-sky-400/5 hover:bg-sky-455 hover:bg-sky-400 py-4 rounded-xl transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                PROPOSAL ESTIMATOR
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
