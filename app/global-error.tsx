"use client";

import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="bg-off-black text-cream-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-6xl font-cinzel font-bold text-gold mb-4">
            Erreur Critique
          </h1>
          <p className="text-xl text-cream-white/70 mb-8">
            Une erreur critique s&apos;est produite.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} size="lg" className="gap-2">
              <RefreshCw className="h-5 w-5" />
              Réessayer
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

