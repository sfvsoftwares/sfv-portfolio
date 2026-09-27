'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';

interface ProcessSectionProps {
  process: {
    kicker?: string;
    title: string;
    subtitle: string;
    steps: {
      step?: string;
      title: string;
      description: string;
    }[];
  };
}

export default function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <SectionWrapper id="process" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single title (bug fixed) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {process.kicker || '// COMO TRABALHAMOS'}
          </motion.div>

          <AnimatedText
            text={process.title}
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
            {process.subtitle}
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Subtle connecting vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12">
            {process.steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepNumber = step.step || `0${index + 1}`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Number Indicator Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 z-10">
                    <div className="w-10 h-10 rounded-full bg-[#0E1018] border border-purple-500/40 shadow-[0_0_15px_rgba(138,43,226,0.25)] flex items-center justify-center">
                      <span className="text-purple-300 font-mono text-xs font-bold">
                        {stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0E1018]/80 backdrop-blur-md p-6 hover:border-purple-500/30 transition-all">
                      <h3 className="text-lg font-bold font-heading text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
