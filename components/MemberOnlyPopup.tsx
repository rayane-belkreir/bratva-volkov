"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Shield } from "lucide-react";
import Link from "next/link";
import { GlareCard } from "@/components/GlareCard";

interface MemberOnlyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function MemberOnlyPopup({ 
  isOpen, 
  onClose, 
  title = "Accès Restreint",
  message = "Vous devez être membre de l'organisation pour accéder à cette section."
}: MemberOnlyPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-black/90 backdrop-blur-sm z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full">
              <GlareCard isRestriction={true} className="aged-paper border-4 border-blood-red/60 shadow-[0_0_50px_rgba(139,0,0,0.8)] bg-gradient-to-br from-charcoal-black via-anthracite to-charcoal-black">
                {/* Bouton de fermeture */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-blood-red/10 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-blood-red" />
                </button>

                {/* Icône centrale */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-blood-red/20 rounded-full border-4 border-blood-red/60 flex items-center justify-center">
                      <Lock className="w-10 h-10 text-blood-red" />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-blood-red/20 rounded-full blur-xl"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* Titre */}
                <h2 className="text-3xl font-bold text-blood-red text-center mb-4 vintage-text drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]">
                  {title}
                </h2>

                {/* Message */}
                <p className="text-vintage-cream/90 text-center mb-6 leading-relaxed">
                  {message}
                </p>

                {/* Badge membre */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-patina-gold/20 border border-patina-gold/40 rounded-lg">
                    <Shield className="w-5 h-5 text-patina-gold" />
                    <span className="text-sm font-bold text-patina-gold uppercase tracking-wider">
                      Membres uniquement
                    </span>
                  </div>
                </div>

                {/* Bouton d'action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex-1 px-6 py-4 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-center rounded-lg flex items-center justify-center min-h-[50px] whitespace-nowrap"
                    style={{ textAlign: 'center' }}
                  >
                    <span className="w-full">Se Connecter</span>
                  </Link>
                  <Link
                    href="/join"
                    onClick={onClose}
                    className="flex-1 px-6 py-4 bg-blood-red text-vintage-cream hover:bg-blood-red/80 hover:border-blood-red/60 transition-colors font-bold uppercase tracking-wider text-center rounded-lg flex items-center justify-center min-h-[50px] whitespace-nowrap border-2 border-blood-red/60"
                    style={{ textAlign: 'center', fontSize: '1rem' }}
                  >
                    <span className="w-full text-lg">Rejoindre</span>
                  </Link>
                </div>
              </GlareCard>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

