"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, AlertCircle, Lock } from "lucide-react";
import { GlareCard } from "./GlareCard";
import { cn } from "@/lib/utils";

interface Zone {
  id: string;
  name: string;
  status: "controlled" | "disputed" | "neutral";
  income?: number;
  note?: string;
}

interface TerritoryMapProps {
  zones: Zone[];
}

export function TerritoryMap({ zones }: TerritoryMapProps) {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const getStatusColor = (status: Zone["status"]) => {
    switch (status) {
      case "controlled":
        return "text-gold border-gold";
      case "disputed":
        return "text-red-400 border-red-400/50";
      case "neutral":
        return "text-cream-white/50 border-anthracite";
      default:
        return "text-cream-white/50 border-anthracite";
    }
  };

  const getStatusIcon = (status: Zone["status"]) => {
    switch (status) {
      case "controlled":
        return <Lock className="h-4 w-4" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Zone["status"]) => {
    switch (status) {
      case "controlled":
        return "Contrôlé";
      case "disputed":
        return "Disputé";
      case "neutral":
        return "Neutre";
      default:
        return "Neutre";
    }
  };

  return (
    <div className="space-y-8">
      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone, index) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div onClick={() => setSelectedZone(zone)} className="cursor-pointer">
              <GlareCard
                className={cn(
                  "transition-all",
                  selectedZone?.id === zone.id && "ring-2 ring-gold"
                )}
              >
                <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-cinzel font-semibold text-gold mb-1">
                      {zone.name}
                    </h4>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border",
                        getStatusColor(zone.status)
                      )}
                    >
                      {getStatusIcon(zone.status)}
                      <span>{getStatusLabel(zone.status)}</span>
                    </div>
                  </div>
                </div>

                {zone.income && (
                  <div className="flex items-center gap-2 text-sm text-cream-white/70">
                    <TrendingUp className="h-4 w-4 text-gold" />
                    <span>Revenu: {zone.income.toLocaleString()} €</span>
                  </div>
                )}

                {zone.note && (
                  <p className="text-sm text-cream-white/60 line-clamp-2">
                    {zone.note}
                  </p>
                )}
                </div>
              </GlareCard>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Zone Details */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <GlareCard className="border-gold/40">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-cinzel font-bold text-gold">
                  {selectedZone.name}
                </h3>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-cream-white/60 hover:text-cream-white transition-colors"
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded border",
                    getStatusColor(selectedZone.status)
                  )}
                >
                  {getStatusIcon(selectedZone.status)}
                  <span className="font-medium">
                    {getStatusLabel(selectedZone.status)}
                  </span>
                </div>

                {selectedZone.income && (
                  <div>
                    <p className="text-sm text-cream-white/60 mb-1">
                      Revenu estimé
                    </p>
                    <p className="text-lg font-semibold text-gold">
                      {selectedZone.income.toLocaleString()} €
                    </p>
                  </div>
                )}

                {selectedZone.note && (
                  <div>
                    <p className="text-sm text-cream-white/60 mb-1">Notes</p>
                    <p className="text-cream-white/80">{selectedZone.note}</p>
                  </div>
                )}
              </div>
            </GlareCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

