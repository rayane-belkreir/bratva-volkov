"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { GlareCard } from "@/components/GlareCard";
import { motion } from "framer-motion";
import { Shield, Lock, Users, Eye } from "lucide-react";

const codeItems = [
  {
    icon: Shield,
    title: "Loyauté Absolue",
    description:
      "La loyauté n'est pas négociable. On ne trahit jamais le cercle. Les liens du sang ne sont rien face aux liens du serment.",
  },
  {
    icon: Lock,
    title: "Silence et Discrétion",
    description:
      "Le bruit attire la lumière. Nous travaillons dans l'ombre. Chaque secret révélé est une faiblesse exposée.",
  },
  {
    icon: Users,
    title: "Respect de la Hiérarchie",
    description:
      "La chaîne de commandement est sacrée. Chaque ordre est exécuté sans question. La discipline forge la force.",
  },
  {
    icon: Eye,
    title: "Protection du Cercle",
    description:
      "Chaque membre protège les autres. L'organisation avant l'individu. Un pour tous, tous pour un.",
  },
];

export default function CodePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Code d'Honneur"
        subtitle="Les principes qui guident nos actions. L'éthique qui façonne notre organisation."
      />

      {/* Quote Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3 }}
        className="mb-12 text-center"
      >
        <blockquote className="text-xl md:text-2xl font-cinzel italic text-gold border-l-4 border-gold pl-6 max-w-3xl mx-auto text-left">
          &quot;Le bruit attire la lumière. Nous travaillons dans l&apos;ombre.&quot;
        </blockquote>
      </motion.div>

      {/* Code Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {codeItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlareCard>
                <div className="flex items-start gap-4">
                  <Icon className="h-8 w-8 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-cinzel font-semibold text-gold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-cream-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlareCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

