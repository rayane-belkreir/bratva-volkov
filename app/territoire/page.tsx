import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import zonesData from "@/content/data/zones.json";
import { generatePageMetadata } from "@/lib/seo";

// Vérifier que les données sont disponibles
const safeZonesData = Array.isArray(zonesData) ? zonesData : [];

// Charger TerritoryMap dynamiquement (ssr: false retiré car c'est une Server Component)
const TerritoryMap = dynamic(() => import("@/components/TerritoryMap").then(mod => ({ default: mod.TerritoryMap })), {
  loading: () => (
    <div className="text-center text-cream-white/50 py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
      <p className="mt-4">Chargement de la carte...</p>
    </div>
  ),
});

export const metadata = generatePageMetadata(
  "Territoire",
  "Carte interactive des zones contrôlées, disputées et neutres. La géographie du pouvoir."
);

export default function TerritoirePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Territoire"
        subtitle="Chaque zone a son histoire, chaque territoire son importance. La carte du pouvoir."
      />

      <Suspense
        fallback={
          <div className="text-center text-cream-white/50 py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4">Chargement de la carte...</p>
          </div>
        }
      >
        <TerritoryMap zones={safeZonesData as any} />
      </Suspense>
    </div>
  );
}
