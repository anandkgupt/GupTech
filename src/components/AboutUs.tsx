import { Shield, Target, Lightbulb, Users } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Lightbulb,
      title: "Obsession with Quality & Care",
      desc: "We make sure your website looks beautiful, works perfectly on all phone screens, and is incredibly easy for you or your team to update."
    },
    {
      icon: Target,
      title: "Simple & Actionable Growth",
      desc: "We help you set up friendly newsletters, local Google map searches, and easy tracking so you can see exactly where your customers come from."
    },
    {
      icon: Shield,
      title: "Safety & Data Privacy First",
      desc: "Your customer details, store products, and payment checkout pathways are handled with simple, sturdy protection to keep your business safe."
    }
  ];

  return (
    <section id="about-section" className="border-t border-white/5 py-24 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 font-display text-[15vw] leading-none text-white/[0.012] pointer-events-none select-none tracking-wider uppercase">
        GUPTECH
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left column */}
        <div className="md:col-span-6 space-y-6">
          <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-px bg-sky-400" />
            HOW WE HELP YOU
          </div>
          <h3 className="font-display text-5xl md:text-7xl leading-none tracking-widest text-white uppercase">
            RELIABLE & <br />
            <span 
              className="text-transparent italic"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
            >
              SIMPLE.
            </span>
          </h3>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
            We combine high-quality website setup, simple local marketing, and pretty creative design under one roof. We don't just build websites; we help local shops, micro-companies, and individual self-employed professionals look trustworthy online, attract neighborhood visits, and save hours of work.
          </p>
        </div>

        {/* Right column (Values checklist) */}
        <div className="md:col-span-6 space-y-4">
          {values.map((v, index) => {
            const IconComponent = v.icon;
            return (
              <div
                key={index}
                className="bg-[#0a1128] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-200 group hover:translate-x-1"
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/5 border border-sky-500/10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    <IconComponent className="w-4.5 h-4.5 text-sky-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {v.title}
                  </h4>
                </div>
                <p className="text-neutral-400 text-xs font-light leading-relaxed pl-12">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Numerical Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
          {[
            { num: "5", label: "SERVICE PILLARS" },
            { num: "26", label: "CATEGORIES" },
            { num: "80+", label: "SERVICES OFFERED" },
            { num: "E2E", label: "END-TO-END COVERAGE" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0a1128] p-8 text-center group hover:bg-[#121c42]/60 transition-colors"
            >
              <div className="font-display text-4xl md:text-5xl text-white tracking-widest group-hover:text-sky-400 transition-colors">
                {stat.num}
              </div>
              <div className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
