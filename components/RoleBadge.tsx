"use client";

import { getTierByName, getRoleBadgeClass, getRoleColor } from "@/lib/hierarchy";
import { motion } from "framer-motion";

interface RoleBadgeProps {
  role: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RoleBadge({ role, size = "md", showIcon = false, className = "" }: RoleBadgeProps) {
  const tier = getTierByName(role);
  const colorClass = getRoleColor(role);
  const badgeClass = getRoleBadgeClass(role);
  
  if (!tier) {
    return (
      <span className={`px-2 py-1 text-xs font-bold uppercase ${badgeClass} ${className}`}>
        {role}
      </span>
    );
  }

  const Icon = tier.icon;
  const isParrain = tier.isParrain;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-2 font-bold uppercase ${badgeClass} ${sizeClasses[size]} ${className}`}
      animate={isParrain ? { scale: [1, 1.05, 1] } : {}}
      transition={isParrain ? { duration: 2, repeat: Infinity } : {}}
    >
      {showIcon && <Icon className={`w-4 h-4 ${isParrain ? "text-blood-red" : colorClass}`} />}
      {isParrain ? `⭐ ${role} ⭐` : role}
    </motion.span>
  );
}

