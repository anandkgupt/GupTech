import { motion } from "motion/react";
import { Pillar } from "../types";

interface HeroProps {
  pillars: Pillar[];
  onNavigate: (to: string) => void;
}

export default function Hero({ pillars, onNavigate }: HeroProps) {
  const handlePillarClick = (id: string) => {
    onNavigate(`/pillars?p=${id}`);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] flex flex-col justify-center overflow-hidden">
      {/* Absolute Giant Background Title */}
      <div className="absolute right-0 top-12 font-display text-[15vw] leading-none text-zinc-950/[0.02] pointer-events-none select-none whitespace-nowrap tracking-wide">
        SERVICES
      </div>

      <div className="relative max-w-4xl">
        {/* Animated tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase flex items-center gap-3.5 mb-6"
        >
          <span className="w-8 h-px bg-sky-400" />
          Simple & affordable digital services for small businesses
        </motion.div>

        {/* Master Bebas H1 */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-7xl md:text-9xl lg:text-[140px] leading-[0.88] tracking-wider text-white mb-8"
        >
          BUILD.
          <br />
          <span 
            className="text-transparent italic"
            style={{ WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.2)" }}
          >
            LAUNCH.
          </span>
          <br />
          GROW.
        </motion.h1>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12"
        >
          Everything you need to launch and grow your business online – from setting up a fast website or online shop to beautiful branding, local marketing, and automated helpers.
        </motion.p>

        {/* Dynamic Selector Pills with custom color styling pointers */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-2.5"
        >
          {pillars.map((p) => {
            let borderStyle = "";
            let textStyle = "";

            switch (p.colorName) {
              case "cyan":
                borderStyle = "border-red-500/20";
                textStyle = "text-red-400 hover:bg-red-500/5 bg-red-500/[0.04]";
                break;
              case "orange":
                borderStyle = "border-sky-500/20";
                textStyle = "text-sky-400 hover:bg-sky-500/5 bg-sky-500/[0.04]";
                break;
              case "violet":
                borderStyle = "border-white/20";
                textStyle = "text-white hover:bg-white/5 bg-white/[0.04]";
                break;
              case "sky":
                borderStyle = "border-sky-500/20";
                textStyle = "text-sky-400 hover:bg-sky-500/5 bg-sky-500/[0.04]";
                break;
              case "green":
                borderStyle = "border-red-500/20";
                textStyle = "text-red-400 hover:bg-red-500/5 bg-red-500/[0.04]";
                break;
            }

            return (
              <button
                key={p.id}
                onClick={() => handlePillarClick(p.id)}
                className={`font-mono text-[10px] tracking-wider uppercase border rounded-full px-4 py-2 transition-all duration-300 cursor-pointer ${borderStyle} ${textStyle}`}
              >
                {p.num} {p.name}
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
