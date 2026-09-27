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
      languages: {
        'pt-BR': '/pt-BR',
        'en': '/en',
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
            '@type': 'Organization',
            name: 'SFV — Soluções Feitas para Você',
            description: dict.metadata.description,
            url: 'https://sfv.dev',
            email: 'sfv.softwares@gmail.com',
            telephone: '+5571991329737',
            areaServed: 'BR',
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
