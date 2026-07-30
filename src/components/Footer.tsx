import React from "react";
import { Pillar } from "../types";
import { AnandLogo } from "./AnandLogo";
import { MapPin, Phone, Mail, Globe, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  pillars: Pillar[];
  onNavigate: (to: string) => void;
}

export default function Footer({ pillars, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sky-500/20 bg-[#020817] text-slate-300 relative z-10 pt-16 pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="cursor-pointer inline-block"
            >
              <AnandLogo size="lg" lightText={true} />
            </a>

            <div className="space-y-1">
              <p className="font-mono text-xs text-sky-400 font-bold uppercase tracking-wider">
                FactLive Digital Solutions — "Go Digital. Go Live."
              </p>
              <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed">
                Empowering businesses with high-performance web development, SEO, digital marketing, and analytics solutions that create impact and deliver results.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.linkedin.com/company/factlive-digital-solutions" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-sky-500/20 text-sky-400 p-2 rounded-lg border border-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/factlive.in" target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-pink-500/20 text-pink-400 p-2 rounded-lg border border-slate-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:factlive.in@gmail.com" className="bg-slate-900 hover:bg-emerald-500/20 text-emerald-400 p-2 rounded-lg border border-slate-800 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Offices Col (4 Cols) */}
          <div className="md:col-span-4 space-y-4 text-xs font-mono text-slate-300">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">Our Office Locations</h4>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sky-400 font-bold block text-[11px]">WORKING OFFICE (NOIDA)</span>
                  <span className="text-slate-400 text-[11px]">ASquare Mall, Sector 73, Noida, Delhi NCR - 201301</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 font-bold block text-[11px]">HEAD OFFICE (BENGALURU)</span>
                  <span className="text-slate-400 text-[11px]">2nd Phase, JP Nagar, Bengaluru, Karnataka - 560078</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact (3 Cols) */}
          <div className="md:col-span-3 space-y-3 text-xs font-mono text-slate-300">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">Direct Connect</h4>
            <div className="space-y-2 text-[11px]">
              <a href="tel:+919711277478" className="flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+91 97112 77478</span>
              </a>
              <a href="mailto:factlive.in@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>factlive.in@gmail.com</span>
              </a>
              <a href="https://www.factlive.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-sky-300 transition-colors">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span>www.factlive.in</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          <p>© {currentYear} FactLive Digital Solutions &amp; Anand Analyst. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-sky-400 font-semibold">We Build. We Grow. We Elevate.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
