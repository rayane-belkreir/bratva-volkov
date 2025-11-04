"use client";

import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Calendar, FileText, Shield, Lock } from "lucide-react";

const timelineEvents = [
  {
    year: 1917,
    title: "LES ORIGINES",
    description: "NAISSANCE DE LA BRATVA VOLKOV EN RUSSIE. LA FAMILLE FUIT LA RÉVOLUTION ET S'INSTALLE DANS LES BAS-FONDS DE SAINT-PÉTERSBOURG. LES PREMIERS MEMBRES ÉTABLISSENT LES RÉSEAUX DE PROTECTION ET D'INFLUENCE DANS L'EST.",
    location: "SAINT-PÉTERSBOURG, RUSSIE",
    icon: Calendar,
  },
  {
    year: 1945,
    title: "L'INSTALLATION À LIBERTY CITY",
    description: "APRÈS LA SECONDE GUERRE MONDIALE, LA FAMILLE DÉCIDE DE S'IMPLANTER À LIBERTY CITY. LES PREMIERS MEMBRES ARRIVENT ET ÉTABLISSENT LEUR PRÉSENCE DANS LA VILLE. LE SERVEUR GTA RP SERT DE TERRAIN D'ACTION OÙ LE ROLEPLAY SE DÉROULE EN DIRECT. NOUS SOMMES ACTUELLEMENT EN 1945.",
    location: "LIBERTY CITY",
    icon: FileText,
  },
];

const parrain = {
  name: "Inconnu",
  alias: "Le Pakhan",
  role: "Pakhan",
  description: "L'ancien Pakhan a été tué dans des circonstances mystérieuses. Il a été remplacé par un Russe qui a pris le contrôle de la famille. Son identité reste secrète, seuls les membres les plus loyaux connaissent sa véritable identité. Il dirige désormais la Bratva Volkov depuis Liberty City avec une main de fer, établissant les nouveaux réseaux dans la ville américaine en 1945.",
  image: "/founders/parrain.jpg",
};

export default function LorePage() {
  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Lore & Histoire
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Découvrez l'histoire de la Bratva Volkov. De Saint-Pétersbourg à Liberty City, plongez dans l'univers de notre famille mafieuse sur le serveur GTA RP.
          </p>
          <div className="mt-6 p-4 bg-anthracite/50 rounded-lg border border-patina-gold/30 max-w-3xl mx-auto">
            <p className="text-sm text-vintage-cream/90 italic leading-relaxed">
              <strong className="text-patina-gold">Note importante :</strong> Ce site est un outil de gestion pour le serveur GTA RP. 
              Le roleplay se déroule <strong className="text-blood-red">uniquement dans le jeu</strong> sur le serveur à Liberty City. 
              Nous sommes actuellement en <strong className="text-blood-red">1945</strong>. 
              Ce site vous permet de consulter les informations de la famille, gérer les missions, et communiquer avec les membres.
            </p>
          </div>
        </motion.div>

        {/* Timeline Interactive */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-patina-gold mb-8 text-center vintage-text">
            Chronologie de la Famille
          </h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Ligne verticale de la timeline - centrée parfaitement */}
            <div className="absolute left-1/2 w-1 h-full bg-patina-gold" style={{ transform: 'translateX(-50%)' }} />

            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={event.year}
                  className={`relative mb-12 flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Contenu */}
                  <div className={`w-full ${isEven ? "pr-1/2 pr-8" : "pl-1/2 pl-8"} ${isEven ? "text-right" : "text-left"}`}>
                    <GlareCard className="aged-paper relative">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 ${isEven ? "order-2 ml-auto" : ""}`}>
                          <div className="w-14 h-14 bg-charcoal-black rounded-full flex items-center justify-center border-2 border-patina-gold shadow-lg">
                            <Icon className="w-7 h-7 text-patina-gold" />
                          </div>
                        </div>
                        <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
                          <div className="text-4xl md:text-5xl font-bold text-patina-gold mb-3 vintage-text uppercase tracking-wider">
                            {event.year}
                          </div>
                          <h4 className="text-xl md:text-2xl font-bold text-patina-gold mb-3 vintage-text uppercase tracking-wider">
                            {event.title}
                          </h4>
                          <p className="text-vintage-cream/90 mb-4 leading-relaxed text-sm md:text-base uppercase tracking-wide">
                            {event.description}
                          </p>
                          <div className={`flex items-center gap-2 text-vintage-cream text-sm uppercase tracking-wider ${isEven ? "justify-end" : "justify-start"}`}>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </GlareCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Le Pakhan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-patina-gold mb-8 text-center vintage-text">
            Le Pakhan
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlareCard isParrain={true} className="aged-paper text-center border-2">
                <div className="w-32 h-32 mx-auto mb-4 bg-anthracite rounded-full border-4 border-blood-red/40 flex items-center justify-center overflow-hidden">
                  <Shield className="w-16 h-16 text-blood-red/60" />
                </div>
                <h4 className="text-2xl font-bold text-blood-red mb-1 vintage-text">
                  {parrain.name}
                </h4>
                <p className="text-blood-red/90 text-lg mb-2 italic font-bold">
                  "{parrain.alias}"
                </p>
                <p className="text-patina-gold/70 text-sm mb-4 uppercase tracking-wider">
                  {parrain.role}
                </p>
                <p className="text-vintage-cream/80 text-base leading-relaxed px-4">
                  {parrain.description}
                </p>
              </GlareCard>
            </motion.div>
          </div>
        </section>


        {/* Section Serveur RP */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-patina-gold mb-8 text-center vintage-text">
            Le Serveur GTA RP
          </h2>
          <GlareCard className="aged-paper max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-patina-gold mb-4 vintage-text">
                  À Propos du Serveur
                </h3>
                <p className="text-vintage-cream/90 leading-relaxed mb-4">
                  La Bratva Volkov est une famille mafieuse active sur un serveur GTA RP. 
                  Le roleplay se déroule à <strong className="text-patina-gold">Liberty City</strong> en <strong className="text-blood-red">1945</strong>. 
                  Tous les événements, interactions et scénarios de roleplay se déroulent <strong className="text-blood-red">dans le jeu</strong>, 
                  en temps réel, avec d'autres joueurs du serveur.
                </p>
                <p className="text-vintage-cream/90 leading-relaxed mb-4">
                  Ce site web sert d'<strong className="text-patina-gold">outil de gestion et de communication</strong> pour les membres de la famille. 
                  Vous pouvez y consulter les missions disponibles, gérer votre réputation, communiquer avec les autres membres, 
                  et suivre l'actualité de la famille. Cependant, le vrai roleplay se passe dans le serveur GTA RP à Liberty City.
                </p>
              </div>
              <div className="border-t border-patina-gold/20 pt-4">
                <h4 className="text-xl font-bold text-patina-gold mb-3 vintage-text">
                  Comment Rejoindre
                </h4>
                <p className="text-vintage-cream/90 leading-relaxed">
                  Pour rejoindre la Bratva Volkov, vous devez d'abord vous connecter au serveur GTA RP. 
                  Une fois dans le jeu à Liberty City, contactez un membre de la famille pour une première rencontre RP. 
                  Le formulaire de recrutement sur ce site vous permet de nous faire connaître votre intérêt, 
                  mais l'intégration finale se fait toujours <strong className="text-blood-red">in-game</strong> à Liberty City.
                </p>
              </div>
            </div>
          </GlareCard>
        </section>

        {/* Documents Secrets */}
        <section>
          <h2 className="text-3xl font-bold text-patina-gold mb-8 text-center vintage-text">
            Documents Secrets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Archives 1917-1945", type: "PDF", locked: false },
              { title: "Rapports Internes", type: "PDF", locked: true },
              { title: "Photographies Historiques", type: "Images", locked: false },
              { title: "Correspondances Classifiées", type: "PDF", locked: true },
            ].map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlareCard className={`aged-paper ${doc.locked ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-patina-gold" />
                      <div>
                        <h4 className="text-lg font-bold text-vintage-cream mb-1">
                          {doc.title}
                        </h4>
                        <p className="text-sm text-vintage-cream/60">{doc.type}</p>
                      </div>
                    </div>
                    {doc.locked ? (
                      <Lock className="w-6 h-6 text-blood-red/60" />
                    ) : (
                      <button className="px-4 py-2 bg-patina-gold/20 border border-patina-gold/40 text-patina-gold hover:bg-patina-gold/30 transition-colors text-sm font-bold uppercase">
                        Ouvrir
                      </button>
                    )}
                  </div>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
