'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/i18n';
import Logo from '@/components/ui/Logo';

interface NavbarProps {
  locale: Locale;
  nav: {
    home: string;
    about: string;
    services: string;
    process: string;
    portfolio: string;
    testimonials: string;
    contact: string;
    language: string;
    cta_button?: string;
  };
}

const navLinks = [
  { id: 'hero', key: 'home' as const },
  { id: 'about', key: 'about' as const },
  { id: 'services', key: 'services' as const },
  { id: 'process', key: 'process' as const },
  { id: 'portfolio', key: 'portfolio' as const },
  { id: 'testimonials', key: 'testimonials' as const },
  { id: 'contact', key: 'contact' as const },
];

export default function Navbar({ locale, nav }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Regra de rolagem: no topo sempre visível. Descendo: oculta. Subindo: revela.
      if (currentScrollY <= 80 || isMobileOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Scroll spy
      const sections = navLinks.map(link => ({
        id: link.id,
        el: document.getElementById(link.id),
      }));

      const scrollPos = currentScrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el && section.el.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  const switchLocale = () => {
    const newLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';
    window.location.href = `/${newLocale}`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#08090E] border-b border-white/[0.08] py-3.5 shadow-md shadow-black/50'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo SFV isolada, sem texto SFV SOFTWARES */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center group cursor-pointer transition-opacity hover:opacity-85"
              aria-label="SFV — Início"
            >
              <Logo size="sm" showText={false} />
            </button>

            {/* Desktop Navigation Links — Direto e limpo, sem caixa flutuante com blur */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer py-1 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {nav[link.key]}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-line"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action: Language Switch + CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white border border-white/[0.1] rounded-lg transition-colors hover:border-purple-500/50 hover:bg-white/[0.04] cursor-pointer"
                aria-label={nav.language}
                title={nav.language}
              >
                <span>{locale === 'pt-BR' ? '🇧🇷' : '🇺🇸'}</span>
                <span>{locale === 'pt-BR' ? 'PT' : 'EN'}</span>
              </button>

              {/* Consultation CTA on Desktop — Botão com canto refinado, sem neon */}
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer"
              >
                <span>{nav.cta_button || (locale === 'pt-BR' ? 'Fale Conosco' : 'Get in Touch')}</span>
                <ArrowUpRight size={13} />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Abrir menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer — Sólido e sem blur artificial */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 h-full w-80 bg-[#0B0C14] p-6 pt-24 border-l border-white/[0.08] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="mb-4 pb-4 border-b border-white/[0.08]">
                  <Logo size="sm" showText={false} />
                </div>
                {navLinks.map((link, i) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-mono uppercase tracking-wider transition-colors ${
                      activeSection === link.id
                        ? 'text-white bg-white/[0.06] border-l-2 border-purple-500 pl-3.5'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {nav[link.key]}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm"
                >
                  <span>{nav.cta_button || (locale === 'pt-BR' ? 'Fale Conosco' : 'Get in Touch')}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
