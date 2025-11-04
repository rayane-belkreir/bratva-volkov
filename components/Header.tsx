"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { RoleBadge } from "@/components/RoleBadge";
import { canAccessAdmin } from "@/lib/permissions";
import { MissionInvitations } from "@/components/MissionInvitations";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/lore", label: "Lore" },
  { href: "/missions", label: "Missions" },
  { href: "/forum", label: "Canal de Discussion" },
  { href: "/reputation", label: "Réputation" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-charcoal-black/98 backdrop-blur-md border-b border-patina-gold/30 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-patina-gold vintage-text hover:text-patina-gold-light transition-colors"
          >
            Bratva Volkov
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    isActive
                      ? "text-patina-gold"
                      : "text-vintage-cream/80 hover:text-patina-gold"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-patina-gold"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blood-red/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              );
            })}
            {isAuthenticated && user && canAccessAdmin(user.role) && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group",
                  pathname === "/admin"
                    ? "text-blood-red"
                    : "text-blood-red/80 hover:text-blood-red"
                )}
              >
                <span className="relative z-10">Administration</span>
                {pathname === "/admin" && (
                  <motion.div
                    layoutId="adminIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blood-red"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            )}
            
            {/* User info */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-patina-gold/20">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-patina-gold" />
                  <span className="text-sm text-vintage-cream/80">{user.username}</span>
                  <RoleBadge role={user.role} size="sm" />
                </div>
                <MissionInvitations />
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                    router.refresh();
                  }}
                  className="p-2 hover:bg-blood-red/10 rounded transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4 text-blood-red" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider text-sm rounded"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-vintage-cream hover:text-patina-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-anthracite/98 backdrop-blur-md border-t border-patina-gold/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-2 px-4 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-patina-gold bg-patina-gold/10"
                        : "text-vintage-cream/80 hover:text-patina-gold hover:bg-patina-gold/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {isAuthenticated && user && canAccessAdmin(user.role) && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-2 px-4 rounded-md text-sm font-medium transition-colors",
                    pathname === "/admin"
                      ? "text-blood-red bg-blood-red/10"
                      : "text-blood-red/80 hover:text-blood-red hover:bg-blood-red/5"
                  )}
                >
                  Administration
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
