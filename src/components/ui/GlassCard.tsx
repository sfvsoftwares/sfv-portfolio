'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover3d?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border border-white/[0.08] bg-[#0E1018] p-6 sm:p-8 transition-all duration-200 hover:border-purple-500/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/50 ${className}`}
    >
      {/* Subtle crisp top edge line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none rounded-t-xl"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
