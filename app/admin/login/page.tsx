"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Lock, Shield, Eye } from "lucide-react";
import { login } from "@/lib/auth";
import { canAccessAdmin } from "@/lib/permissions";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login(username, password);
      if (loggedInUser && canAccessAdmin(loggedInUser.role)) {
        // Rediriger vers la page admin
        router.push("/admin");
        router.refresh();
      } else {
        setError("Accès refusé. Vous n'avez pas les permissions nécessaires pour accéder à cette section.");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <GlareCard className="aged-paper border-2 border-blood-red/40">
            <div className="text-center mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-4"
              >
                <div className="w-20 h-20 bg-blood-red/20 rounded-full border-4 border-blood-red/60 flex items-center justify-center mx-auto">
                  <Shield className="w-10 h-10 text-blood-red" />
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-blood-red mb-2 vintage-text">
                Accès Administrateur
              </h1>
              <p className="text-vintage-cream/70 text-sm">
                Zone réservée aux administrateurs uniquement
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-blood-red/20 border border-blood-red/40 text-blood-red rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Identifiant
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Nom d'utilisateur"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Mot de passe"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-blood-red text-vintage-cream hover:bg-blood-red/80 transition-colors font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                {loading ? "Vérification..." : "Accéder au Panel"}
              </button>
            </form>
          </GlareCard>
        </motion.div>
      </div>
    </div>
  );
}

