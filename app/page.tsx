"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

// Charger AuraCanvas dynamiquement pour améliorer les performances
const AuraCanvas = dynamic(() => import("@/components/AuraCanvas").then(mod => ({ default: mod.AuraCanvas })), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const gateEnabled = process.env.NEXT_PUBLIC_GATE_ENABLED === "true";
  const gatePath = gateEnabled ? "/gate" : "/organisation";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-off-black">
        <div className="absolute inset-0 bg-gradient-to-b from-off-black via-burgundy/20 to-off-black" />
      </div>

      {/* Aura Canvas - Only on homepage */}
      <AuraCanvas intensity={0.2} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-block mb-6 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full"
          >
            <span className="text-xs font-medium text-gold uppercase tracking-wider">
              French Connexion — RP Universe
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold text-gold mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            On ne négocie pas l&apos;influence.
          </motion.h1>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold text-cream-white mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            On l&apos;impose.
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link href={gatePath} prefetch={true}>
              <Button
                size="lg"
                className="group text-lg px-8 py-6 bg-gold text-off-black hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
              >
                Entrer dans le cercle
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

