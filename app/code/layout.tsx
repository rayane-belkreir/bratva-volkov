import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Code d'Honneur",
  "Les principes qui nous guident. Le code qui nous unit. L'honneur qui nous définit."
);

export default function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


