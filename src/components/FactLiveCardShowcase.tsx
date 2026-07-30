import React, { useState } from "react";
import { 
  Phone, 
  Globe, 
  Mail, 
  Linkedin, 
  Instagram, 
  MapPin, 
  QrCode, 
  Code, 
  Megaphone, 
  Palette, 
  ShoppingCart, 
  BarChart3, 
  Cpu, 
  Target, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  RotateCw,
  Facebook,
  Youtube
} from "lucide-react";

export const FactLiveCardShowcase: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest block">
            OFFICIAL BRANDING CARD
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            FactLive Digital Solutions — Business Card
          </h2>
        </div>

        <button
          onClick={() => setFlipped(!flipped)}
          className="inline-flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-lg"
        >
          <RotateCw className="w-4 h-4" />
          <span>Flip Card ({flipped ? "View Front" : "View Back"})</span>
        </button>
      </div>

      {/* Card Container */}
      <div className="relative w-full max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-sky-500/40 via-blue-600/30 to-cyan-400/40 shadow-[0_0_50px_rgba(0,168,255,0.2)]">
        <div className="bg-[#030e25] rounded-[22px] p-6 md:p-8 text-white relative overflow-hidden border border-sky-500/20">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {!flipped ? (
            /* FRONT CARD VIEW */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column - Founder & Contact Info (6 cols) */}
              <div className="md:col-span-6 space-y-6 border-b md:border-b-0 md:border-r border-sky-500/20 pb-6 md:pb-0 md:pr-6">
                
                {/* Founder Title Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                      Anand <span className="text-slate-400">|</span>
                    </h3>
                    <span className="bg-sky-500 text-slate-950 font-black text-sm px-2.5 py-1 rounded-md shadow-md">
                      KG
                    </span>
                  </div>
                  <p className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                    Founder | FactLive Digital Solutions
                  </p>
                  <div className="h-0.5 w-full bg-gradient-to-r from-sky-500 via-blue-500 to-transparent mt-2" />
                </div>

                {/* Contact List */}
                <div className="space-y-2.5 text-xs font-mono text-slate-200">
                  <a href="tel:+919711277478" className="flex items-center gap-3 hover:text-sky-300 transition-colors">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>+91 97112 77478</span>
                  </a>

                  <a href="https://www.factlive.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sky-300 transition-colors">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <span>www.factlive.in</span>
                  </a>

                  <a href="mailto:factlive.in@gmail.com" className="flex items-center gap-3 hover:text-sky-300 transition-colors">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span>factlive.in@gmail.com</span>
                  </a>

                  <a href="https://linkedin.com/company/factlive-digital-solutions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sky-300 transition-colors">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <span>FactLive Digital Solutions</span>
                  </a>

                  <a href="https://instagram.com/factlive.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-sky-300 transition-colors">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span>@factlive.in</span>
                  </a>
                </div>

                <div className="h-px w-full bg-sky-500/20 my-2" />

                {/* Office Locations */}
                <div className="space-y-3 text-[11px] font-mono text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-400 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-sky-400 font-bold block">Working Office</span>
                      <span className="text-slate-300">ASquare Mall, Sector 73, Noida, Delhi NCR - 201301</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold block">Head Office</span>
                      <span className="text-slate-300">2nd Phase, JP Nagar, Bengaluru, Karnataka - 560078</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column - FactLive Brand Logo & QR Code (6 cols) */}
              <div className="md:col-span-6 flex flex-col items-center justify-center text-center space-y-6">
                
                {/* Logo Artwork */}
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 shadow-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300">
                        FL
                      </div>
                      <div className="text-xl font-black tracking-wider text-white mt-1">
                        FactLive
                      </div>
                      <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-sky-400 uppercase">
                        DIGITAL SOLUTIONS
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-mono font-bold text-sky-300 italic pt-2">
                    Go Digital. <span className="text-cyan-400">Go Live.</span>
                  </p>
                </div>

                {/* QR Code Block */}
                <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center gap-1">
                  <div className="w-24 h-24 bg-slate-950 rounded-xl flex items-center justify-center text-sky-400 border border-slate-800">
                    <QrCode className="w-16 h-16 text-sky-400" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-900 pt-1">
                    Scan to visit www.factlive.in
                  </span>
                </div>

              </div>

            </div>
          ) : (
            /* BACK CARD VIEW */
            <div className="space-y-8 relative z-10">
              
              {/* Top Banner & Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-sky-500/20 pb-6">
                
                <div className="md:col-span-4 space-y-1">
                  <h3 className="text-xl font-black text-white">
                    We Build. <span className="text-sky-400">We Grow.</span> <span className="text-cyan-300">We Elevate.</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    Empowering businesses with digital solutions that create impact and deliver results.
                  </p>
                </div>

                <div className="md:col-span-4 text-center">
                  <div className="text-2xl font-black tracking-wider text-white">
                    FactLive
                  </div>
                  <div className="text-[8px] font-mono font-bold tracking-[0.3em] text-sky-400 uppercase">
                    DIGITAL SOLUTIONS
                  </div>
                  <p className="text-[10px] font-mono text-cyan-400 italic">Go Digital. Go Live.</p>
                </div>

                {/* Why Choose Us */}
                <div className="md:col-span-4 space-y-1 text-xs">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block">WHY CHOOSE US?</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-sky-400" />
                      <span>Result Driven</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-emerald-400" />
                      <span>Client Focused</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Innovative</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span>Reliable</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* OUR SERVICES MATRIX */}
              <div className="space-y-4">
                <div className="text-center">
                  <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-mono font-bold px-4 py-1 rounded-full uppercase tracking-widest inline-block">
                    OUR SERVICES
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <Code className="w-5 h-5 text-sky-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">Web &amp; App Development</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Custom websites, web apps &amp; mobile apps.</p>
                  </div>

                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <Megaphone className="w-5 h-5 text-emerald-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">Digital Marketing</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">SEO, SMM, SEM, content &amp; branding.</p>
                  </div>

                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <Palette className="w-5 h-5 text-purple-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">Design Studio</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Creative designs that convert.</p>
                  </div>

                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-amber-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">E-Commerce Solutions</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Online store setup &amp; support.</p>
                  </div>

                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <BarChart3 className="w-5 h-5 text-cyan-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">Business &amp; Analytics</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Data insights &amp; performance tracking.</p>
                  </div>

                  <div className="bg-slate-900/90 border border-sky-500/20 p-3 rounded-xl text-center space-y-1.5 hover:border-sky-400 transition-colors">
                    <Cpu className="w-5 h-5 text-pink-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white">AI &amp; Automation</h4>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Smart automation &amp; AI integration.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="pt-4 border-t border-sky-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://www.factlive.in" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">www.factlive.in</a>
                  <span>•</span>
                  <a href="mailto:factlive.in@gmail.com" className="hover:text-sky-300">factlive.in@gmail.com</a>
                  <span>•</span>
                  <a href="tel:+919711277478" className="hover:text-sky-300">+91 97112 77478</a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sky-400 font-bold">Let's Connect:</span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Linkedin className="w-3.5 h-3.5 hover:text-sky-400 cursor-pointer" />
                    <Instagram className="w-3.5 h-3.5 hover:text-pink-400 cursor-pointer" />
                    <Facebook className="w-3.5 h-3.5 hover:text-blue-400 cursor-pointer" />
                    <Youtube className="w-3.5 h-3.5 hover:text-red-400 cursor-pointer" />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
