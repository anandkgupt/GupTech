import { Pillar } from "../types";

interface FooterProps {
  pillars: Pillar[];
  onNavigate: (to: string) => void;
}

export default function Footer({ pillars, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#030714] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div className="space-y-2">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="font-display text-4xl tracking-widest text-white cursor-pointer hover:text-sky-400 transition-colors block"
            >
              GupTech
            </a>
            <p className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase">
              Simple & affordable digital services
            </p>
          </div>

          {/* Quick links to pillars */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {pillars.map((pillar) => (
              <a
                key={pillar.id}
                href={`/pillars?p=${pillar.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/pillars?p=${pillar.id}`);
                }}
                className="font-mono text-[10px] text-neutral-500 hover:text-neutral-300 uppercase tracking-widest transition-colors cursor-pointer"
              >
                {pillar.name}
              </a>
            ))}
          </div>
        </div>

        {/* Footnotes */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 text-[10px] font-mono text-neutral-600 tracking-widest uppercase">
          <p>© {currentYear} GupTech. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-default hover:text-neutral-500 transition-colors">Security Audit Passed</span>
            <span className="text-neutral-800">|</span>
            <span className="cursor-default hover:text-neutral-500 transition-colors">v4.1.14 Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
