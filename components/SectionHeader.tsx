"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("text-center mb-12", className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-cream-white/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

