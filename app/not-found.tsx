import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-cinzel font-bold text-gold mb-4">404</h1>
      <p className="text-xl text-cream-white/70 mb-8">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/">
        <Button size="lg">
          <Home className="mr-2 h-5 w-5" />
          Retour à l&apos;accueil
        </Button>
      </Link>
    </div>
  );
}

