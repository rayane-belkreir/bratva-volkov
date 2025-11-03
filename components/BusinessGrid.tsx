"use client";

import { GlareCard } from "@/components/GlareCard";
import { Briefcase, Banknote, Shield, Key, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Business {
  name: string;
  cover: string;
  description: string;
  risk: string;
  contact: string;
}

interface BusinessGridProps {
  businesses: Business[];
}

const getRiskBadge = (risk: string) => {
  const badges = {
    low: {
      label: "Faible",
      color: "text-green-400 border-green-400/30 bg-green-400/10",
      icon: Shield,
    },
    medium: {
      label: "Moyen",
      color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
      icon: AlertCircle,
    },
    high: {
      label: "Élevé",
      color: "text-red-400 border-red-400/30 bg-red-400/10",
      icon: AlertCircle,
    },
  };
  return badges[risk as keyof typeof badges] || badges.low;
};

const getBusinessIcon = (index: number) => {
  const icons = [Briefcase, Banknote, Shield, Key, TrendingUp, Shield, Key, Briefcase];
  return icons[index % icons.length];
};

export function BusinessGrid({ businesses }: BusinessGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business, index) => {
        const Icon = getBusinessIcon(index);
        const riskBadge = getRiskBadge(business.risk);
        const RiskIcon = riskBadge.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GlareCard>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-gold flex-shrink-0" />
                    <h3 className="text-xl font-cinzel font-semibold text-gold">
                      {business.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-cream-white/50 mb-1">Couverture</p>
                    <p className="text-sm text-cream-white/80 font-medium">
                      {business.cover}
                    </p>
                  </div>

                  <p className="text-sm text-cream-white/70 leading-relaxed">
                    {business.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${riskBadge.color}`}
                  >
                    <RiskIcon className="h-3 w-3" />
                    <span>{riskBadge.label}</span>
                  </div>
                  <p className="text-xs text-cream-white/50">{business.contact}</p>
                </div>
              </div>
            </GlareCard>
          </motion.div>
        );
      })}
    </div>
  );
}

