import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

export const dynamic = "force-static";

const BASE_URL = "https://sfvsoftwares.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "pt-BR" ? 1.0 : 0.9,
    alternates: {
      languages: {
        "pt-BR": `${BASE_URL}/pt-BR`,
        en: `${BASE_URL}/en`,
      },
    },
  }));
}
