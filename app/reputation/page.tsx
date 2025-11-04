"use client";

import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { useAuth } from "@/contexts/AuthContext";
import { HIERARCHY_TIERS, getTierByReputation } from "@/lib/hierarchy";
import { useDataSync } from "@/hooks/useDataSync";
import * as auth from "@/lib/auth";

export default function ReputationPage() {
  const { user, isAuthenticated, updateUserData } = useAuth();
  // Les visiteurs non connectés ont 0 de réputation
  const currentRep = isAuthenticated && user ? (user.reputation || 0) : 0;
  
  // Synchroniser les données utilisateur automatiquement
  useDataSync(async () => {
    // Rafraîchir les données utilisateur depuis MongoDB
    if (user) {
      try {
        const allUsers = await auth.getAllUsers();
        const updatedUser = allUsers.find((u) => u.id === user.id);
        if (updatedUser) {
          const { password: _, ...userWithoutPassword } = updatedUser;
          await updateUserData(userWithoutPassword);
        }
      } catch (error) {
        console.error('Error refreshing user:', error);
      }
    }
  }, 2000);
  
  // Trouver le niveau approprié
  const currentTier = getTierByReputation(currentRep);
  const TierIcon = currentTier.icon;
  
  // Calculer le progrès en limitant à 100% maximum pour éviter que la barre sorte de la page
  let progress = 0;
  if (currentRep >= currentTier.maxRep) {
    // Si la réputation dépasse le max du niveau, afficher 100%
    progress = 100;
  } else if (currentTier.maxRep > currentTier.minRep) {
    progress = ((currentRep - currentTier.minRep) / (currentTier.maxRep - currentTier.minRep)) * 100;
    // Limiter à 100% maximum
    progress = Math.min(100, Math.max(0, progress));
  } else {
    progress = currentRep >= currentTier.maxRep ? 100 : 0;
  }

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Système de Réputation
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Votre rang dans la hiérarchie. Chaque action influence votre réputation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <GlareCard 
            isParrain={currentTier.isParrain}
            className={`aged-paper text-center ${currentTier.isParrain ? "border-4 shadow-[0_0_30px_rgba(139,0,0,0.5)]" : ""}`}
          >
            <div className="mb-6">
              <motion.div
                animate={currentTier.isParrain ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={currentTier.isParrain ? { 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                } : {}}
                className="relative"
              >
                <TierIcon className={`mx-auto mb-4 ${currentTier.isParrain ? "w-32 h-32 text-blood-red drop-shadow-[0_0_20px_rgba(139,0,0,0.8)]" : "w-20 h-20 text-patina-gold"}`} />
                {currentTier.isParrain && (
                  <motion.div
                    className="absolute inset-0 bg-blood-red/20 rounded-full blur-2xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <h2 className={`font-bold mb-2 vintage-text ${currentTier.isParrain ? "text-6xl md:text-7xl text-blood-red drop-shadow-[0_0_15px_rgba(139,0,0,0.8)]" : "text-4xl text-patina-gold"}`}>
                {currentTier.name}
              </h2>
              {currentTier.isParrain && (
                <motion.div
                  className="mb-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-2xl text-patina-gold font-bold tracking-widest uppercase">
                    LE POUVOIR ABSOLU
                  </p>
                </motion.div>
              )}
              <p className={`text-lg ${currentTier.isParrain ? "text-blood-red/90 font-bold" : "text-vintage-cream/70"}`}>
                {currentTier.description}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-vintage-cream/80">
                  Réputation: {currentRep} / {currentTier.maxRep}
                </span>
                <span className="text-sm font-bold text-patina-gold">
                  Niveau {currentTier.level}
                </span>
              </div>
              <div className="w-full bg-anthracite rounded-full h-4 border-2 border-patina-gold/30 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-patina-gold to-blood-red h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ maxWidth: '100%' }}
                />
              </div>
            </div>

            {currentTier.level < 7 && (
              <div className="mt-6 pt-6 border-t border-patina-gold/20">
                <p className="text-sm text-vintage-cream/60 mb-2">
                  Prochain rang:
                </p>
                <p className="text-lg font-bold text-patina-gold">
                  {HIERARCHY_TIERS[currentTier.level].name} ({HIERARCHY_TIERS[currentTier.level].maxRep} réputation requise)
                </p>
                <p className="text-sm text-vintage-cream/70 mt-2">
                  {currentRep >= HIERARCHY_TIERS[currentTier.level].maxRep 
                    ? "Vous avez atteint le niveau requis pour le prochain rang !" 
                    : `Il vous manque ${HIERARCHY_TIERS[currentTier.level].maxRep - currentRep} points de réputation`}
                </p>
              </div>
            )}
          </GlareCard>
        </div>

        {/* Structure pyramidale de la hiérarchie */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Niveau 1 - Pakhan (sommet) - Toujours affiché */}
          {(() => {
            const parrainTier = HIERARCHY_TIERS.find(t => t.isParrain);
            if (!parrainTier) return null;
            const tier = parrainTier;
            const Icon = tier.icon;
            const isUnlocked = currentRep >= tier.minRep;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <GlareCard 
                  isParrain={true}
                  className={`aged-paper text-center max-w-2xl w-full ${isUnlocked ? "" : "opacity-50"} border-4 shadow-[0_0_40px_rgba(139,0,0,0.6)] bg-gradient-to-br from-charcoal-black via-anthracite to-charcoal-black`}
                >
                  <motion.div
                    animate={isUnlocked ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={isUnlocked ? { duration: 3, repeat: Infinity, repeatType: "reverse" } : {}}
                    className="relative mb-4"
                  >
                    <Icon className="mx-auto mb-2 w-24 h-24 text-blood-red drop-shadow-[0_0_20px_rgba(139,0,0,0.8)]" />
                    {isUnlocked && (
                      <motion.div
                        className="absolute inset-0 bg-blood-red/20 rounded-full blur-2xl"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <h3 className="text-5xl md:text-6xl font-bold vintage-text text-blood-red mb-2 drop-shadow-[0_0_15px_rgba(139,0,0,0.8)]">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-patina-gold/80 mb-2 tracking-widest uppercase">
                    Le rang ultime • Niveau {tier.level}
                  </p>
                  <p className="text-lg text-blood-red/90 font-semibold mb-4">
                    {tier.description}
                  </p>
                  <div className="border-t border-blood-red/30 pt-4">
                    <p className="text-sm text-blood-red/80 mb-3">
                      {tier.minRep}+ réputation
                    </p>
                    {isUnlocked && (
                      <span className="inline-block px-4 py-2 bg-blood-red/20 border-2 border-blood-red/60 text-blood-red text-sm font-bold uppercase tracking-wider">
                        ⭐ PARRAIN ⭐
                      </span>
                    )}
                  </div>
                </GlareCard>
              </motion.div>
            );
          })()}

          {/* Niveaux 2-3 - Pervyi et Sovetnik */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HIERARCHY_TIERS.filter(t => t.level >= 5 && t.level <= 6).map((tier, index) => {
              const Icon = tier.icon;
              const isUnlocked = currentRep >= tier.minRep;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareCard className={`aged-paper text-center h-full ${isUnlocked ? "" : "opacity-50"} ${tier.color === "blood-red" ? "border-2 border-blood-red/40" : ""}`}>
                    <div className={`mb-4 ${isUnlocked ? (tier.color === "blood-red" ? "text-blood-red" : "text-patina-gold") : "text-vintage-cream/40"}`}>
                      <Icon className="mx-auto mb-2 w-16 h-16" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 vintage-text ${tier.color === "blood-red" ? "text-blood-red" : "text-vintage-cream"}`}>
                      {tier.name}
                    </h3>
                    <p className="text-xs text-patina-gold/70 mb-2">Niveau {tier.level}</p>
                    <p className={`mb-3 text-sm ${tier.color === "blood-red" ? "text-blood-red/90 font-semibold" : "text-vintage-cream/70"}`}>
                      {tier.description}
                    </p>
                    <div className="border-t border-patina-gold/20 pt-3">
                      <p className={`text-xs ${tier.color === "blood-red" ? "text-blood-red/80" : "text-patina-gold/70"}`}>
                        {tier.minRep} - {tier.maxRep} réputation
                      </p>
                      {isUnlocked && (
                        <span className={`inline-block mt-2 px-3 py-1 text-xs font-bold uppercase ${tier.color === "blood-red" ? "bg-blood-red/20 border border-blood-red/60 text-blood-red" : "bg-patina-gold/20 border border-patina-gold/40 text-patina-gold"}`}>
                          Débloqué
                        </span>
                      )}
                    </div>
                  </GlareCard>
                </motion.div>
              );
            })}
          </div>

          {/* Niveaux 4-7 - Vor, Avtoritet, Soldat, Bratan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIERARCHY_TIERS.filter(t => t.level <= 4).reverse().map((tier, index) => {
              const Icon = tier.icon;
              const isUnlocked = currentRep >= tier.minRep;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareCard className={`aged-paper text-center h-full ${isUnlocked ? "" : "opacity-50"}`}>
                    <div className={`mb-4 ${isUnlocked ? "text-patina-gold" : "text-vintage-cream/40"}`}>
                      <Icon className="mx-auto mb-2 w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 vintage-text text-vintage-cream">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-patina-gold/70 mb-2">Niveau {tier.level}</p>
                    <p className="text-sm text-vintage-cream/70 mb-3">
                      {tier.description}
                    </p>
                    <div className="border-t border-patina-gold/20 pt-3">
                      <p className="text-xs text-patina-gold/70">
                        {tier.minRep} - {tier.maxRep} réputation
                      </p>
                      {isUnlocked && (
                        <span className="inline-block mt-2 px-3 py-1 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold text-xs font-bold uppercase">
                          Débloqué
                        </span>
                      )}
                    </div>
                  </GlareCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
