'use client';

import { Code, Palette, Zap, ShieldCheck, Award, Lightbulb, Settings } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';

const iconMap = {
  Code,
  Palette,
  Zap,
  ShieldCheck,
  Award,
  Lightbulb,
  Settings,
};

interface AboutSectionProps {
  about: {
    kicker?: string;
    title: string;
    subtitle: string;
    description: string;
    cards: { title: string; description: string; icon: string }[];
  };
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {about.kicker || '// QUEM SOMOS'}
          </motion.div>

          <AnimatedText
            text={about.title}
            variant="heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-purple-300/90 font-medium mb-4"
          >
            {about.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-slate-400 text-base leading-relaxed"
          >
            {about.description}
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap] || Code;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-900/40 transition-colors">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-purple-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
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
