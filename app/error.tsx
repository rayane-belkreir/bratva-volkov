"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-cinzel font-bold text-gold mb-4">Erreur</h1>
      <p className="text-xl text-cream-white/70 mb-8">
        Une erreur s&apos;est produite lors du chargement de la page.
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
  );
}

