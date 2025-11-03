import { PasswordForm } from "@/components/PasswordForm";
import { SectionHeader } from "@/components/SectionHeader";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Accès Restreint",
  "Portail d'accès à l'organisation. Entrez la passphrase pour continuer."
);

export default function GatePage() {
  const passphrase =
    process.env.NEXT_PUBLIC_GATE_PASSPHRASE || process.env.GATE_PASSPHRASE || "ENTRER";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="max-w-md mx-auto">
        <PasswordForm correctPassphrase={passphrase} />
      </div>
    </div>
  );
}

