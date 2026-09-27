import { Mail, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import InstagramIcon from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';

interface FooterProps {
  footer: {
    brand_description?: string;
    description?: string;
    navigation: string;
    services_title?: string;
    contact_title: string;
    made_with: string;
    rights: string;
    tagline?: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    process: string;
    portfolio: string;
    testimonials: string;
    contact: string;
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

export default function Footer({ footer, nav }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07080D]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <Logo size="sm" showText={false} />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              {footer.brand_description || footer.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
              <MapPin size={13} className="text-purple-400" />
              <span>Salvador, Bahia — Brasil</span>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com/sfv.softwares"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="mailto:sfv.softwares@gmail.com"
                className="p-2.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://wa.me/5571991329737"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              {footer.navigation}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-xs font-mono text-slate-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">/</span>
                    <span>{nav[link.key]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              {footer.contact_title}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sfv.softwares@gmail.com"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-purple-400 flex-shrink-0" />
                  <span>sfv.softwares@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5571991329737"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-purple-400 flex-shrink-0" />
                  <span>(71) 99132-9737</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/sfv.softwares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <InstagramIcon size={14} className="text-purple-400 flex-shrink-0" />
                  <span>@sfv.softwares</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <span className="text-[11px] font-mono text-purple-300/80 block">
                {footer.tagline || 'SFV — Soluções Feitas para Você'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-500">
            &copy; {currentYear} SFV Softwares. {footer.rights}
          </p>
          <p className="text-xs font-mono text-slate-500">
            {footer.made_with}
          </p>
        </div>
      </div>
    </footer>
  );
}
