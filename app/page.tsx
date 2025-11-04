"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuraCanvas } from "@/components/AuraCanvas";
import { UserPlus, BookOpen, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden wall-texture smoke-overlay">
      {/* Fumée animée en overlay */}
      <AuraCanvas intensity={0.3} />

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="opacity-100"
        >
          {/* Logo "Bratva Volkov" animé subtilement */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="mb-8 opacity-100"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold vintage-text text-patina-gold mb-4 tracking-wider drop-shadow-[0_0_30px_rgba(201,169,97,0.5)]">
              Bratva Volkov
            </h1>
            <motion.div
              className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-patina-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </motion.div>

          {/* Slogan */}
          <motion.div
            className="mb-16 opacity-100"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-vintage-cream vintage-text tracking-widest drop-shadow-[0_0_20px_rgba(139,0,0,0.4)]">
              Family. Honor. Respect.
            </p>
            <p className="text-lg md:text-xl text-vintage-cream/80 mt-4 italic">
              Liberty City • 1945 • Roleplay In-Game
            </p>
          </motion.div>

          {/* Boutons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-100"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/join">
              <motion.button
                className="group relative text-lg px-10 py-7 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-patina-gold/50 shadow-lg shadow-patina-gold/20 font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <UserPlus className="h-6 w-6" />
                  Rejoindre la famille
                </span>
              </motion.button>
            </Link>

            <Link href="/lore">
              <motion.button
                className="group relative text-lg px-10 py-7 bg-transparent border-2 border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 hover:border-patina-gold/60 transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="mr-3 h-6 w-6 inline" />
                Lire le Lore
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                className="group relative text-lg px-10 py-7 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60 transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lock className="mr-3 h-6 w-6 inline" />
                Connexion / Inscription
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Image de fond : ruelle sombre de Marseille avec silhouette */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-black via-anthracite/50 to-charcoal-black">
          {/* Silhouette d'homme en trench coat - placeholder */}
          <div className="absolute bottom-0 right-1/4 w-64 h-96 bg-gradient-to-t from-charcoal-black via-steel-gray/30 to-transparent opacity-60" 
               style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }} />
        </div>
      </div>
    </div>
  );
}
