'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'heading' | 'paragraph';
  delay?: number;
}

export default function AnimatedText({
  text,
  className = '',
  variant = 'heading',
  delay = 0,
}: AnimatedTextProps) {
  const Component = variant === 'heading' ? motion.h2 : motion.p;

  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        variant === 'heading'
          ? 'font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white'
          : 'font-body text-base sm:text-lg text-slate-300/90 leading-relaxed'
      } ${className}`}
    >
      {text}
    </Component>
  );
}
