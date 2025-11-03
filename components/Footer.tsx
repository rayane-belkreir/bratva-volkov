import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-anthracite bg-off-black mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-cinzel font-bold text-gold mb-4">
              French Connexion
            </h3>
            <p className="text-sm text-cream-white/70">
              On ne négocie pas l'influence. On l'impose.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-cream-white/70">
              <li>
                <Link
                  href="/organisation"
                  prefetch={true}
                  className="hover:text-gold transition-colors"
                >
                  Organisation
                </Link>
              </li>
              <li>
                <Link
                  href="/territoire"
                  prefetch={true}
                  className="hover:text-gold transition-colors"
                >
                  Territoire
                </Link>
              </li>
              <li>
                <Link
                  href="/affaires"
                  prefetch={true}
                  className="hover:text-gold transition-colors"
                >
                  Affaires
                </Link>
              </li>
              <li>
                <Link href="/code" prefetch={true} className="hover:text-gold transition-colors">
                  Code d'Honneur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Informations
            </h4>
            <ul className="space-y-2 text-sm text-cream-white/70">
              <li>
                <Link
                  href="/dossiers"
                  prefetch={true}
                  className="hover:text-gold transition-colors"
                >
                  Dossiers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-anthracite pt-8 text-center text-xs text-cream-white/50">
          <p className="mb-2">
            © {new Date().getFullYear()} French Connexion — RP Universe
          </p>
          <p className="text-cream-white/40 italic">
            Œuvre fictive – aucune incitation ni apologie.
          </p>
        </div>
      </div>
    </footer>
  );
}

