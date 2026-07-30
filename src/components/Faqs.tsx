import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FaqItem } from "../data";

interface FaqsProps {
  faqs: FaqItem[];
}

export default function Faqs({ faqs }: FaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="border-t border-white/5 py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <div className="font-mono text-xs text-sky-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            COMMON QUESTIONS
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-white tracking-widest uppercase">
            LEARN ABOUT Anand Analyst
          </h3>
          <p className="text-neutral-400 text-sm font-light max-w-md mx-auto">
            Find answers to standard delivery options, multi-disciplinary integrations, and contractual SOW standards.
          </p>
        </div>

        {/* Collapsible item list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#0a1128] border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-neutral-900/40 transition-colors"
                >
                  <span className="text-xs md:text-sm font-medium text-white tracking-wide pr-4">
                    {faq.q}
                  </span>
                  <span className="text-neutral-500 shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-sky-400" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/* Animated collapse */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-4 text-xs md:text-xs text-neutral-400 font-light leading-relaxed bg-black/10">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
