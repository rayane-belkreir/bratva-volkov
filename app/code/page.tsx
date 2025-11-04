"use client";

import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Shield, Heart, Lock, Users, Target, Award } from "lucide-react";

const codeItems = [
  {
    id: 1,
    title: "Loyauté Absolue",
    description: "La loyauté envers la famille passe avant tout. Trahir la Bratva, c'est signer son arrêt de mort.",
    icon: Heart,
    color: "blood-red",
  },
  {
    id: 2,
    title: "Omertà",
    description: "Le silence est d'or. On ne parle jamais aux autorités. On ne trahit jamais ses frères.",
    icon: Lock,
    color: "patina-gold",
  },
  {
    id: 3,
    title: "Respect de la Hiérarchie",
    description: "Chaque membre respecte son supérieur. Les ordres sont suivis sans question.",
    icon: Users,
    color: "patina-gold",
  },
  {
    id: 4,
    title: "Protection de la Famille",
    description: "La famille avant tout. On protège les nôtres, coûte que coûte.",
    icon: Shield,
    color: "blood-red",
  },
  {
    id: 5,
    title: "Honneur et Dignité",
    description: "On agit avec honneur. On ne recule jamais face à l'adversité.",
    icon: Award,
    color: "patina-gold",
  },
  {
    id: 6,
    title: "Règlement de Comptes",
    description: "Les offenses ne restent jamais impunies. Œil pour œil, dent pour dent.",
    icon: Target,
    color: "blood-red",
  },
];

export default function CodePage() {
  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Code d'Honneur
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Les principes qui nous guident. Le code qui nous unit. L'honneur qui nous définit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {codeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlareCard className="aged-paper h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                      item.color === 'blood-red' 
                        ? 'bg-blood-red/20 border-blood-red/40' 
                        : 'bg-patina-gold/20 border-patina-gold/40'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        item.color === 'blood-red' ? 'text-blood-red' : 'text-patina-gold'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-patina-gold vintage-text mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-vintage-cream/80 leading-relaxed">
                    {item.description}
                  </p>
                </GlareCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlareCard className="aged-paper border-2 border-blood-red/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blood-red vintage-text mb-4">
                Citation
              </h2>
              <p className="text-xl text-vintage-cream/90 italic leading-relaxed">
                "Dans notre monde, il n'y a pas de place pour les faibles. Seuls les loyaux survivent. 
                Seuls les courageux prospèrent. Seuls les honorables méritent le respect."
              </p>
              <p className="text-patina-gold/70 mt-4 text-sm uppercase tracking-wider">
                — Inconnu, Le Pakhan
              </p>
            </div>
          </GlareCard>
        </motion.div>
      </div>
    </div>
  );
}
