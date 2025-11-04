import { User, Award, TrendingUp, Shield, Crown, Users, Star } from "lucide-react";

export interface HierarchyTier {
  name: string;
  level: number;
  minRep: number;
  maxRep: number;
  icon: typeof Shield;
  color: "patina-gold" | "blood-red";
  description: string;
  isParrain?: boolean; // Gardé pour compatibilité avec le code existant (Pakhan)
}

export const HIERARCHY_TIERS: HierarchyTier[] = [
  {
    name: "Bratan",
    level: 1,
    minRep: 0,
    maxRep: 50,
    icon: User,
    color: "patina-gold",
    description: "Nouveau membre de la famille. Doit prouver sa loyauté.",
  },
  {
    name: "Soldat",
    level: 2,
    minRep: 50,
    maxRep: 150,
    icon: Shield,
    color: "patina-gold",
    description: "Membre confirmé. A gagné le respect de base de la famille.",
  },
  {
    name: "Avtoritet",
    level: 3,
    minRep: 150,
    maxRep: 300,
    icon: Award,
    color: "patina-gold",
    description: "Chef de brigade. A gagné la confiance de la famille.",
  },
  {
    name: "Vor",
    level: 4,
    minRep: 300,
    maxRep: 500,
    icon: Users,
    color: "patina-gold",
    description: "Voleur dans la loi. Dirige plusieurs brigades.",
  },
  {
    name: "Sovetnik",
    level: 5,
    minRep: 500,
    maxRep: 800,
    icon: TrendingUp,
    color: "patina-gold",
    description: "Conseiller du Pakhan. Influence majeure dans la famille.",
  },
  {
    name: "Pervyi",
    level: 6,
    minRep: 800,
    maxRep: 1200,
    icon: Star,
    color: "blood-red",
    description: "Premier du Pakhan. Autorité absolue dans la famille.",
  },
  {
    name: "Pakhan",
    level: 7,
    minRep: 1200,
    maxRep: 2000,
    icon: Crown,
    color: "blood-red",
    description: "Chef suprême de la Bratva. Contrôle total de la famille. Le pouvoir absolu.",
    isParrain: true,
  },
];

export function getTierByReputation(reputation: number): HierarchyTier {
  const tier = HIERARCHY_TIERS.find(
    (t) => reputation >= t.minRep && reputation < t.maxRep
  );
  if (!tier) {
    // Si la réputation dépasse tous les niveaux, prendre le niveau le plus élevé
    return HIERARCHY_TIERS[HIERARCHY_TIERS.length - 1];
  }
  return tier;
}

export function getTierByName(name: string): HierarchyTier | undefined {
  return HIERARCHY_TIERS.find((t) => t.name === name);
}

export function getTierLevel(role: string): number {
  const tier = getTierByName(role);
  return tier?.level || 0;
}

export function canAccessLevel(userLevel: number, requiredLevel: number): boolean {
  return userLevel >= requiredLevel;
}

export function getRoleColor(role: string): string {
  const tier = getTierByName(role);
  if (!tier) return "text-patina-gold";
  return tier.color === "blood-red" ? "text-blood-red" : "text-patina-gold";
}

export function getRoleBadgeClass(role: string): string {
  const tier = getTierByName(role);
  if (!tier) return "bg-patina-gold/20 border border-patina-gold/40 text-patina-gold";
  if (tier.isParrain) {
    return "bg-blood-red/20 border border-blood-red/60 text-blood-red";
  }
  if (tier.color === "blood-red") {
    return "bg-blood-red/20 border border-blood-red/40 text-blood-red";
  }
  return "bg-patina-gold/20 border border-patina-gold/40 text-patina-gold";
}

