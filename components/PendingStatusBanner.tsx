"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function PendingStatusBanner() {
  const { user } = useAuth();

  if (!user || user.status !== 'pending') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-0 right-0 z-40 bg-patina-gold/20 border-b border-patina-gold/40 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye className="w-5 h-5 text-patina-gold" />
        </motion.div>
        <div>
          <p className="text-sm font-bold text-patina-gold uppercase tracking-wider">
            La Famille lit votre candidature
          </p>
          <p className="text-xs text-vintage-cream/70">
            Votre candidature est en cours d'examen. Accès visiteur limité.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

