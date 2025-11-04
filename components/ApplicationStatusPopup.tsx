"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GlareCard } from "@/components/GlareCard";

interface ApplicationStatusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationStatusPopup({ isOpen, onClose }: ApplicationStatusPopupProps) {
  const { user } = useAuth();
  
  if (!user) return null;

  const status = user.status || 'pending';
  const isPending = status === 'pending';
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

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
              <GlareCard 
                isRestriction={isRejected || isPending} 
                className={`aged-paper border-2 shadow-[0_0_50px_rgba(201,169,97,0.5)] ${
                  isRejected || isPending 
                    ? "border-patina-gold/60 shadow-[0_0_50px_rgba(201,169,97,0.8)]" 
                    : "border-patina-gold/40"
                }`}
              >
                {/* Icône centrale selon le statut */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: isPending ? [1, 1.1, 1] : 1,
                      rotate: isPending ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: isPending ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                      isPending ? 'bg-patina-gold/20 border-patina-gold/60' :
                      isApproved ? 'bg-patina-gold/20 border-patina-gold/60' :
                      'bg-patina-gold/20 border-patina-gold/60'
                    }`}>
                      {isPending && <Clock className="w-10 h-10 text-patina-gold" />}
                      {isApproved && <CheckCircle className="w-10 h-10 text-patina-gold" />}
                      {isRejected && <XCircle className="w-10 h-10 text-patina-gold" />}
                    </div>
                    {isPending && (
                      <motion.div
                        className="absolute inset-0 bg-patina-gold/20 rounded-full blur-xl"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Titre */}
                <h2 className={`text-3xl font-bold text-center mb-4 vintage-text ${
                  isPending ? 'text-patina-gold' :
                  isApproved ? 'text-patina-gold' :
                  'text-patina-gold'
                }`}>
                  {isPending && "Candidature en cours d'examen"}
                  {isApproved && "Candidature acceptée"}
                  {isRejected && "Candidature refusée"}
                </h2>

                {/* Message */}
                <div className="text-center mb-6">
                  {isPending && (
                    <>
                      <div className="flex justify-center mb-4">
                        <Eye className="w-8 h-8 text-patina-gold animate-pulse" />
                      </div>
                      <p className="text-vintage-cream/90 text-lg mb-2 font-bold">
                        La Mafia lit votre candidature
                      </p>
                      <p className="text-vintage-cream/70 text-sm leading-relaxed">
                        Votre dossier est en cours d'examen par les membres de l'organisation. 
                        Vous recevrez une réponse sous peu. En attendant, vous avez un accès visiteur limité.
                      </p>
                    </>
                  )}
                  {isApproved && (
                    <p className="text-vintage-cream/90 text-lg leading-relaxed">
                      Félicitations ! Votre candidature a été acceptée. Vous avez maintenant accès complet à l'organisation.
                    </p>
                  )}
                  {isRejected && (
                    <p className="text-vintage-cream/90 text-lg leading-relaxed">
                      Votre candidature n'a pas été retenue pour le moment. Vous pouvez réessayer plus tard.
                    </p>
                  )}
                </div>

                {/* Statut badge */}
                <div className="flex justify-center mb-6">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                    isPending ? 'bg-patina-gold/20 border-patina-gold/40' :
                    isApproved ? 'bg-patina-gold/20 border-patina-gold/40' :
                    'bg-patina-gold/20 border-patina-gold/40'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      isPending ? 'text-patina-gold' :
                      isApproved ? 'text-patina-gold' :
                      'text-patina-gold'
                    }`} />
                    <span className={`text-sm font-bold uppercase tracking-wider ${
                      isPending ? 'text-patina-gold' :
                      isApproved ? 'text-patina-gold' :
                      'text-patina-gold'
                    }`}>
                      {isPending && "En attente"}
                      {isApproved && "Approuvé"}
                      {isRejected && "Refusé"}
                    </span>
                  </div>
                </div>

                {/* Bouton de fermeture */}
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider rounded-lg"
                >
                  Compris
                </button>
              </GlareCard>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

