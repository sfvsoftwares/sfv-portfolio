import { getDictionary, locales } from '@/i18n';
import type { Locale } from '@/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import CircuitGrid from '@/components/ui/CircuitGrid';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <CircuitGrid opacity={0.16} />
      <Navbar locale={locale as Locale} nav={dict.nav} />

      <main className="flex-1">
        <HeroSection hero={dict.hero} />
        <AboutSection about={dict.about} />
        <ServicesSection services={dict.services} />
        <ProcessSection process={dict.process} />
        <PortfolioSection portfolio={dict.portfolio} />
        <TestimonialsSection testimonials={dict.testimonials} />
        <ContactSection contact={dict.contact} />
      </main>

      <Footer footer={dict.footer} nav={dict.nav} />
    </>
  );
}
