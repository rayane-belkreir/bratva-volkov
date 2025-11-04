import { generatePageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Contact",
  "Prenez contact avec la famille. Votre message sera traité dans les plus brefs délais."
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


