import { Metadata, Viewport } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://frenchconnexion.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "French Connexion — RP Universe",
    template: "%s | French Connexion",
  },
  description:
    "On ne négocie pas l'influence. On l'impose. Bienvenue dans l'univers RP de La French Connexion.",
  keywords: [
    "GTA RP",
    "Roleplay",
    "French Connexion",
    "Serveur RP",
    "Organisation RP",
  ],
  authors: [{ name: "French Connexion" }],
  creator: "French Connexion",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "French Connexion",
    title: "French Connexion — RP Universe",
    description:
      "On ne négocie pas l'influence. On l'impose. Bienvenue dans l'univers RP de La French Connexion.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "French Connexion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "French Connexion — RP Universe",
    description:
      "On ne négocie pas l'influence. On l'impose. Bienvenue dans l'univers RP de La French Connexion.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generatePageMetadata(
  title: string,
  description?: string
): Metadata {
  const pageDescription = description ?? defaultMetadata.description;
  return {
    title,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | French Connexion`,
      description: pageDescription as string,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | French Connexion`,
      description: pageDescription as string,
    },
  };
}

