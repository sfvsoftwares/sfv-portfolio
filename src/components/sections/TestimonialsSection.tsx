'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, Award } from 'lucide-react';

const iconMap = {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Award,
};

interface TestimonialsSectionProps {
  testimonials: {
    kicker?: string;
    title: string;
    subtitle: string;
    coming_soon?: string;
    coming_soon_description?: string;
    guarantees?: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <SectionWrapper id="testimonials" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single title (bug fixed) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {testimonials.kicker || '// DIFERENCIAIS & GARANTIAS'}
          </motion.div>

          <AnimatedText
            text={testimonials.title}
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
            {testimonials.subtitle}
          </motion.p>
        </div>

        {/* Guarantees & Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.guarantees && testimonials.guarantees.length > 0
            ? testimonials.guarantees.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <GlassCard className="h-full flex flex-col justify-between group p-6 sm:p-7">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300 group-hover:scale-105 transition-all">
                          <IconComponent size={22} />
                        </div>
                        <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })
            : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
