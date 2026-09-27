'use client';

import { Briefcase, Building, Rocket, Code, ArrowUpRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';

const iconMap = {
  Briefcase,
  Building,
  Rocket,
  Code,
};

interface ServicesSectionProps {
  services: {
    kicker?: string;
    title: string;
    subtitle: string;
    items: {
      badge?: string;
      title: string;
      description: string;
      tags?: string[];
      icon: string;
    }[];
  };
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single title (bug fixed) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {services.kicker || '// NOSSOS SERVIÇOS'}
          </motion.div>

          <AnimatedText
            text={services.title}
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
            {services.subtitle}
          </motion.p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.items.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Code;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard className="h-full flex flex-col justify-between group p-7 sm:p-8">
                  <div>
                    {/* Top row: Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-hover:scale-105 transition-all">
                        <IconComponent size={22} />
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/30 text-purple-300">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Service Title */}
                    <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Deliverables / Tech Tags + CTA */}
                  <div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06] mb-4">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.05]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      <span>Solicitar proposta para este serviço</span>
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
