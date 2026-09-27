'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Logo from '@/components/ui/Logo';

interface HeroSectionProps {
  hero: {
    badge?: string;
    status?: string;
    tagline: string;
    subtitle: string;
    cta_primary: string;
    cta_secondary: string;
    highlights?: { label: string; desc: string }[];
  };
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper
      id="hero"
      className="min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center relative overflow-hidden"
    >
      <div className="text-center z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Authentic SFV Vector Logo in Hero — Nítido, sem desfoque rasterizado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center items-center relative"
        >
          <Logo size="hero" />
        </motion.div>

        {/* Main Headline — Reduzido para proporção refinada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold font-heading tracking-tight text-white leading-[1.22] mb-5">
            {hero.tagline}
          </h1>
        </motion.div>

        {/* Value Proposition Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-body leading-relaxed mb-10">
            {hero.subtitle}
          </p>
        </motion.div>

        {/* Action Buttons — Canto estruturado (rounded-lg), sem sombras neon artificiais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full sm:w-auto"
        >
          <button
            onClick={() => handleScroll('contact')}
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{hero.cta_primary}</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleScroll('services')}
            className="w-full sm:w-auto px-7 py-3 rounded-lg border border-white/[0.14] hover:border-white/30 bg-[#0E1018]/60 hover:bg-white/[0.04] text-slate-200 hover:text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            {hero.cta_secondary}
          </button>
        </motion.div>

        {/* Trust Highlights Grid — Base sólida com detalhes técnicos */}
        {hero.highlights && hero.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-20 pt-10 border-t border-white/[0.08] w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            {hero.highlights.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-purple-400">
                  <CheckCircle2 size={14} className="flex-shrink-0" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono pl-5">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
