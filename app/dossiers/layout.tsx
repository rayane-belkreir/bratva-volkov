import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Dossiers",
  "Archives et chroniques de l'organisation. Les événements qui ont façonné notre histoire."
);

export default function DossiersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

