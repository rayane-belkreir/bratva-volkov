"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, MessageSquare, Phone, Lock, BookOpen, Target, Award, Users } from "lucide-react";
import { GlareCard } from "@/components/GlareCard";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface WelcomeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeGuide({ isOpen, onClose }: WelcomeGuideProps) {
  const { user } = useAuth();
  
  // Vérifier si l'utilisateur peut écrire dans Planification et Recrutement
  // Seuls Pakhan (level 7), Pervyi (level 6) et Sovetnik (level 5) peuvent écrire
  const canWritePlanning = user ? (user.role === "Pakhan" || user.role === "Pervyi" || user.role === "Sovetnik" || user.role === "Admin") : false;
  
  const channels = [
    {
      id: 1,
      name: "Discussions RP",
      icon: MessageSquare,
      description: "Espace de discussion libre pour le roleplay. Partagez vos histoires, événements et interactions.",
      color: "patina-gold",
      canWrite: true,
    },
    {
      id: 2,
      name: "Planification",
      icon: Phone,
      description: canWritePlanning 
        ? "Organisez les missions, réunions et événements de la famille. Coordination stratégique."
        : "Vous ne pouvez que lire dans ce canal. Seuls le Pakhan, le Pervyi et le Sovetnik peuvent écrire. Montez dans la hiérarchie pour obtenir ce privilège.",
      color: canWritePlanning ? "patina-gold" : "blood-red",
      canWrite: canWritePlanning,
    },
    {
      id: 3,
      name: "Recrutement",
      icon: Users,
      description: canWritePlanning
        ? "Discussions sur les nouveaux membres et les candidatures. Évaluations et recommandations."
        : "Vous ne pouvez que lire dans ce canal. Seuls le Pakhan, le Pervyi et le Sovetnik peuvent écrire. Montez dans la hiérarchie pour obtenir ce privilège.",
      color: canWritePlanning ? "patina-gold" : "blood-red",
      canWrite: canWritePlanning,
    },
    {
      id: 4,
      name: "Messages Privés",
      icon: Lock,
      description: "Communications confidentielles entre membres. Messages automatiquement chiffrés pour la sécurité.",
      color: "blood-red",
      canWrite: true,
    },
  ];

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
            style={{ overflow: 'hidden' }}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .custom-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}              </style>
              <div className="no-hover-transform" style={{ transform: 'none', pointerEvents: 'auto' }}>
                <GlareCard className="aged-paper border-4 border-patina-gold/60 shadow-[0_0_50px_rgba(201,169,97,0.8)]">
                {/* Header */}
                <div className="text-center mb-8">
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
                    className="inline-block mb-6"
                  >
                    <div className="w-24 h-24 bg-patina-gold/20 rounded-full border-4 border-patina-gold/60 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-12 h-12 text-patina-gold" />
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-bold text-patina-gold mb-4 vintage-text drop-shadow-[0_0_10px_rgba(201,169,97,0.8)]">
                    Bienvenue dans la Bratva Volkov
                  </h2>
                  <p className="text-xl text-vintage-cream/90 font-bold mb-2">
                    La Mafia vous a accepté
                  </p>
                  <p className="text-vintage-cream/70 text-sm leading-relaxed max-w-2xl mx-auto">
                    Votre candidature a été approuvée. La famille compte sur vous pour maintenir la loyauté, 
                    l'honneur et le respect. Vous avez maintenant accès complet à toutes les fonctionnalités.
                  </p>
                </div>

                {/* Bouton de fermeture */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-blood-red/10 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-blood-red" />
                </button>

                {/* Guide des canaux */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-patina-gold mb-6 vintage-text text-center uppercase tracking-wider">
                    Guide des Canaux de Discussion
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {channels.map((channel, index) => {
                      const Icon = channel.icon;
                      return (
                        <motion.div
                          key={channel.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border-2 ${
                            channel.color === "blood-red" 
                              ? "bg-blood-red/10 border-blood-red/40" 
                              : "bg-patina-gold/10 border-patina-gold/40"
                          }`}
                          style={{ transform: 'none !important', willChange: 'auto' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.scale = '1';
                          }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              channel.color === "blood-red" 
                                ? "bg-blood-red/20 border-2 border-blood-red/40" 
                                : "bg-patina-gold/20 border-2 border-patina-gold/40"
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                channel.color === "blood-red" ? "text-blood-red" : "text-patina-gold"
                              }`} />
                            </div>
                            <h4 className={`font-bold text-lg ${
                              channel.color === "blood-red" ? "text-blood-red" : "text-patina-gold"
                            }`}>
                              {channel.name}
                            </h4>
                          </div>
                          <p className="text-vintage-cream/70 text-sm leading-relaxed">
                            {channel.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Informations importantes */}
                <div className="border-t border-patina-gold/20 pt-6 mb-6">
                  <h3 className="text-xl font-bold text-patina-gold mb-4 vintage-text uppercase tracking-wider">
                    Informations Importantes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-anthracite/50 rounded-lg">
                      <Target className="w-5 h-5 text-patina-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-patina-gold mb-1">Missions</p>
                        <p className="text-vintage-cream/70 text-xs">
                          Consultez régulièrement le tableau de missions pour accepter des contrats et gagner de la réputation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-anthracite/50 rounded-lg">
                      <Award className="w-5 h-5 text-patina-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-patina-gold mb-1">Réputation</p>
                        <p className="text-vintage-cream/70 text-xs">
                          Votre réputation détermine votre rang dans la hiérarchie. Accomplissez des missions pour progresser.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-anthracite/50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-patina-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-patina-gold mb-1">Lore & Journal</p>
                        <p className="text-vintage-cream/70 text-xs">
                          Consultez l'histoire de l'organisation et les événements récents dans le journal RP.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/forum"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-center rounded-lg"
                  >
                    Voir les Canaux
                  </Link>
                  <Link
                    href="/missions"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-transparent border-2 border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 transition-colors font-bold uppercase tracking-wider text-center rounded-lg"
                  >
                    Voir les Missions
                  </Link>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-transparent border-2 border-blood-red/40 text-blood-red hover:bg-blood-red/10 transition-colors font-bold uppercase tracking-wider rounded-lg"
                  >
                    Compris
                  </button>
                </div>
              </GlareCard>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

