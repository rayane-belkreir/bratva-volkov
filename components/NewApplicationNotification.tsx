"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Eye, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewApplicationNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
}

export function NewApplicationNotification({ 
  isOpen, 
  onClose, 
  count 
}: NewApplicationNotificationProps) {
  const router = useRouter();

  const handleView = () => {
    router.push("/admin");
    onClose();
  };

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
            className="fixed inset-0 bg-charcoal-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Notification */}
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-20 right-4 z-50 max-w-md w-full"
          >
            <div className="bg-anthracite/95 backdrop-blur-md border-2 border-patina-gold/60 rounded-lg p-6 shadow-[0_0_30px_rgba(201,169,97,0.5)]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 flex-1">
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
                  >
                    <div className="w-12 h-12 bg-patina-gold/20 rounded-full border-2 border-patina-gold/60 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-patina-gold" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-patina-gold vintage-text uppercase tracking-wider">
                      Nouvelle Candidature
                    </h3>
                    <p className="text-sm text-vintage-cream/70">
                      {count === 1 
                        ? "Une nouvelle candidature est en attente" 
                        : `${count} nouvelles candidatures sont en attente`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-patina-gold/10 rounded transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-patina-gold" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-charcoal-black/50 rounded-lg border border-patina-gold/20">
                <Clock className="w-4 h-4 text-patina-gold animate-pulse" />
                <span className="text-xs text-vintage-cream/60">
                  La Famille attend votre décision
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleView}
                  className="flex-1 px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 rounded-lg"
                >
                  <FileText className="w-4 h-4" />
                  Voir les candidatures
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-transparent border-2 border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 transition-colors font-bold uppercase tracking-wider text-sm rounded-lg"
                >
                  Plus tard
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

