'use client';

import { useEffect } from 'react';
import { defaultLocale } from '@/i18n';

export default function RootPage() {
  const targetPath = `/${defaultLocale}`;

  useEffect(() => {
    window.location.replace(targetPath);
  }, [targetPath]);

  return (
    <main className="min-h-screen bg-[#08090E] text-slate-300 flex flex-col items-center justify-center px-4 text-center">
      <meta httpEquiv="refresh" content={`0; url=${targetPath}`} />
      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
        Redirecionando...
      </p>
      <a
        href={targetPath}
        className="text-sm font-medium text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
      >
        Acessar SFV ({targetPath})
      </a>
    </main>
  );
}
