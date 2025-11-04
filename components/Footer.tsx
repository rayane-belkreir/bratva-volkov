"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-patina-gold/20 bg-charcoal-black/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-patina-gold mb-4 vintage-text">
              Bratva Volkov
            </h3>
            <p className="text-vintage-cream/70 text-sm">
              Family. Honor. Respect.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-patina-gold mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-vintage-cream/70">
              <li>
                <Link href="/lore" className="hover:text-patina-gold transition-colors">
                  Lore
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link href="/missions" className="hover:text-patina-gold transition-colors">
                  Missions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-patina-gold mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-vintage-cream/70 text-sm">
              Discord: BratvaVolkov#1234
            </p>
            <p className="text-vintage-cream/70 text-sm mt-2">
              © 2025 Bratva Volkov. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
