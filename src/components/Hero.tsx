import { motion } from "motion/react";
import { Pillar } from "../types";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  pillars: Pillar[];
  onNavigate: (to: string) => void;
}

export default function Hero({ pillars, onNavigate }: HeroProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 min-h-[70vh] flex flex-col justify-center overflow-hidden">

      <div className="relative max-w-4xl">
        {/* Animated tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase flex items-center gap-3.5 mb-6"
        >
          <span className="w-8 h-px bg-sky-400" />
          FactLive Digital Solutions — "Go Digital. Go Live."
        </motion.div>

        {/* Simplified Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          We Build. We Grow. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">We Elevate.</span>
        </motion.h1>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
        >
          Empowering businesses with high-performance web development, SEO, digital branding, e-commerce portals, and business analytics solutions that create impact and deliver results.
        </motion.p>

        {/* Clean Primary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => onNavigate("/pillars")}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => onNavigate("/about")}
            className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>About FactLive &amp; Founder</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
