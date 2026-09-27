'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: {
    kicker?: string;
    title: string;
    subtitle: string;
    coming_soon?: string;
    coming_soon_description?: string;
    concepts?: {
      category: string;
      title: string;
      description: string;
      features: string[];
    }[];
    cta_card?: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
}

export default function PortfolioSection({ portfolio }: PortfolioSectionProps) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="portfolio" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single title (bug fixed) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {portfolio.kicker || '// CAPACIDADES & PROJETOS'}
          </motion.div>

          <AnimatedText
            text={portfolio.title}
            variant="heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-slate-400 font-body"
          >
            {portfolio.subtitle}
          </motion.p>
        </div>

        {/* Project Concepts / Archetypes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {portfolio.concepts && portfolio.concepts.length > 0
            ? portfolio.concepts.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                >
                  <GlassCard className="h-full flex flex-col justify-between p-7 group">
                    <div>
                      {/* Top Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono tracking-wider uppercase text-purple-300 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded-full">
                          {concept.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Concept Title */}
                      <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-purple-200 transition-colors">
                        {concept.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {concept.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="space-y-2 mb-4">
                        {concept.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors cursor-pointer"
                      >
                        <span>Quero algo nesse modelo</span>
                        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            : null}
        </div>

        {/* Pioneer Partner Program Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl border border-white/[0.08] bg-[#0E1018] p-8 sm:p-10"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2 font-semibold">
                <Sparkles size={14} />
                <span>{portfolio.coming_soon || 'Programa de Parceiros Pioneiros'}</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-2">
                {portfolio.cta_card?.title || 'Tem um projeto único em mente?'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {portfolio.coming_soon_description || portfolio.cta_card?.subtitle}
              </p>
            </div>

            <button
              onClick={scrollToContact}
              className="flex-shrink-0 px-6 py-3 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer"
            >
              {portfolio.cta_card?.button || 'Solicitar Proposta Sob Medida'}
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
