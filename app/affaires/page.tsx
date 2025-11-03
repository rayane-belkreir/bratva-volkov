import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import businessData from "@/content/data/business.json";
import { generatePageMetadata } from "@/lib/seo";

// Vérifier que les données sont disponibles
const safeBusinessData = Array.isArray(businessData) ? businessData : [];

// Charger BusinessGrid dynamiquement (ssr: false retiré car c'est une Server Component)
const BusinessGrid = dynamic(() => import("@/components/BusinessGrid").then(mod => ({ default: mod.BusinessGrid })), {
  loading: () => (
    <div className="text-center text-cream-white/50 py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
      <p className="mt-4">Chargement des affaires...</p>
    </div>
  ),
});

export const metadata = generatePageMetadata(
  "Affaires",
  "Découvrez nos activités légitimes et nos fronts commerciaux. L'économie au service de l'influence."
);

export default function AffairesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Affaires"
        subtitle="Des activités légitimes, des fronts commerciaux solides. L'économie au service de l'organisation."
      />

      <Suspense
        fallback={
          <div className="text-center text-cream-white/50 py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4">Chargement des affaires...</p>
          </div>
        }
      >
        <BusinessGrid businesses={safeBusinessData as any} />
      </Suspense>
    </div>
  );
}
