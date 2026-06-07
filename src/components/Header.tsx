import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Pillar } from "../types";

interface HeaderProps {
  pillars: Pillar[];
  currentPath: string;
  onNavigate: (to: string) => void;
}

export default function Header({ pillars, currentPath, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
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
          ? "bg-[#030714]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_20px_-5px_rgba(56,189,248,0.1)]"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-red-500/40 animate-ping" />
          </div>
          <span className="font-display text-2xl tracking-widest text-white group-hover:text-sky-400 transition-colors">
            GupTech
          </span>
        </a>

        {/* Navigation links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
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
                className={`text-[10px] tracking-widest uppercase font-mono px-4 py-1.5 rounded-md transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-sky-500/10 text-sky-400 border border-sky-500/10 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white border border-transparent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA Link */}
        <a
          href="/estimator"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/estimator");
          }}
          className="relative inline-flex items-center gap-2 text-xs font-mono tracking-wider font-semibold border border-sky-500/35 text-sky-400 px-4 py-2 rounded-md hover:bg-sky-400 hover:text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          GET PRICING
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  );
}
