import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, getDictionary } from '@/i18n';
import type { Locale } from '@/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | SFV`,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://sfvsoftwares.com/${locale}`,
      locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type: 'website',
      siteName: 'SFV — Soluções Feitas para Você',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt-BR': '/pt-BR',
        'en': '/en',
        'x-default': '/pt-BR',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['ProfessionalService', 'Organization'],
            '@id': 'https://sfvsoftwares.com/#organization',
            name: 'SFV — Soluções Feitas para Você',
            alternateName: 'SFV Softwares',
            description: dict.metadata.description,
            url: 'https://sfvsoftwares.com',
            logo: 'https://sfvsoftwares.com/logo.svg',
            image: 'https://sfvsoftwares.com/logo.svg',
            email: 'sfv.softwares@gmail.com',
            telephone: '+55-71-99132-9737',
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Salvador',
              addressRegion: 'BA',
              addressCountry: 'BR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -12.9777,
              longitude: -38.5016,
            },
            areaServed: [
              { '@type': 'City', name: 'Salvador' },
              { '@type': 'State', name: 'Bahia' },
              { '@type': 'Country', name: 'BR' },
            ],
            knowsAbout: [
              'Desenvolvimento Web',
              'Next.js',
              'TypeScript',
              'Landing Pages de Alta Conversão',
              'Sites Institucionais',
              'Portfólios Executivos',
              'Sistemas Web Sob Medida',
              'SEO Técnico',
            ],
            sameAs: [
              'https://instagram.com/sfv.softwares',
            ],
          }),
        }}
      />
      <div lang={locale === 'pt-BR' ? 'pt-BR' : 'en'}>
        {children}
      </div>
    </>
  );
}
