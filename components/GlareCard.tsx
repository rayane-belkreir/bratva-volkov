"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  asChild?: boolean;
}

export function GlareCard({
  children,
  className,
  href,
  asChild = false,
}: GlareCardProps) {
  const content = (
    <motion.div
      className={cn(
        "relative rounded-lg border border-gold/20 bg-anthracite/50 p-6 backdrop-blur-sm overflow-hidden group",
        "transition-all duration-300",
        href || asChild
          ? "cursor-pointer hover:border-gold/40 hover:bg-anthracite/70"
          : "",
        className
      )}
      whileHover={href || asChild ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* Glare Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

