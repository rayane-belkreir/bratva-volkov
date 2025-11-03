import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import orgData from "@/content/data/org.json";
import { generatePageMetadata } from "@/lib/seo";

// Vérifier que les données sont disponibles
const safeOrgData = orgData || { boss: { name: "Parrain" }, capos: [], soldiers: [] };

// Charger OrgTree dynamiquement (ssr: false retiré car c'est une Server Component)
const OrgTree = dynamic(() => import("@/components/OrgTree").then(mod => ({ default: mod.OrgTree })), {
  loading: () => (
    <div className="text-center text-cream-white/50 py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
      <p className="mt-4">Chargement de l&apos;organisation...</p>
    </div>
  ),
});

export const metadata = generatePageMetadata(
  "Organisation",
  "Découvrez la structure hiérarchique de La French Connexion. Parrain, Capos, Soldats : l'organisation qui façonne le territoire."
);

export default function OrganisationPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Organisation"
        subtitle="Une hiérarchie claire, une loyauté indéfectible. Chaque membre a sa place dans le cercle."
      />

      <Suspense
        fallback={
          <div className="text-center text-cream-white/50 py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4">Chargement de l&apos;organisation...</p>
          </div>
        }
      >
        <OrgTree data={safeOrgData as any} />
      </Suspense>
    </div>
  );
}
