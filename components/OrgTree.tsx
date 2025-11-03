"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Crown, Shield, Users } from "lucide-react";
import { GlareCard } from "./GlareCard";
import { cn } from "@/lib/utils";

interface Team {
  name: string;
}

interface Capo {
  name: string;
  teams: string[] | Team[];
}

interface OrgData {
  boss: {
    name: string;
    aka?: string;
  };
  capos: Capo[];
  soldiers: string[];
}

interface OrgTreeProps {
  data: OrgData;
}

export function OrgTree({ data }: OrgTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    boss: true,
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Boss */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3 }}
      >
        <GlareCard className="border-gold/40 bg-gradient-to-br from-gold/10 to-transparent">
          <div className="flex items-center gap-4">
            <Crown className="h-8 w-8 text-gold flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-cinzel font-bold text-gold mb-1">
                {data.boss.name}
              </h3>
              {data.boss.aka && (
                <p className="text-sm text-cream-white/60 italic">
                  {data.boss.aka}
                </p>
              )}
            </div>
          </div>
        </GlareCard>
      </motion.div>

      {/* Capos */}
      <div className="space-y-4">
        {data.capos.map((capo, index) => {
          const key = `capo-${index}`;
          const isExpanded = expanded[key] ?? false;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlareCard>
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Réduire" : "Développer"} ${capo.name}`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-gold flex-shrink-0" />
                    <h4 className="text-xl font-cinzel font-semibold text-gold">
                      {capo.name}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-cream-white/60" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-cream-white/60" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gold/20 space-y-2">
                        {capo.teams.map((team, teamIndex) => {
                          const teamName =
                            typeof team === "string" ? team : team.name;
                          return (
                            <div
                              key={teamIndex}
                              className="flex items-center gap-2 text-cream-white/80 pl-6"
                            >
                              <div className="h-1 w-1 rounded-full bg-gold" />
                              <span className="text-sm">{teamName}</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlareCard>
            </motion.div>
          );
        })}
      </div>

      {/* Soldiers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <GlareCard>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-gold flex-shrink-0" />
            <h4 className="text-xl font-cinzel font-semibold text-gold">
              Soldats
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.soldiers.map((soldier, index) => (
              <div
                key={index}
                className="text-sm text-cream-white/70 pl-4 border-l border-gold/20"
              >
                {soldier}
              </div>
            ))}
          </div>
        </GlareCard>
      </motion.div>
    </div>
  );
}

