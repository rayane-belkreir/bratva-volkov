"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  isParrain?: boolean;
  isRestriction?: boolean; // Pour les popups de restriction (rouge au lieu de jaune)
}

export function GlareCard({ children, className, href, isParrain = false, isRestriction = false }: GlareCardProps) {
  const content = (
    <motion.div
      className={cn(
        "mafia-card magnify-hover",
        isParrain && "parrain-card",
        isRestriction && "restriction-card",
        className
      )}
      whileHover={href ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Glare Effect - Jaune pour tous */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-patina-gold/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return <div className="group">{content}</div>;
}
