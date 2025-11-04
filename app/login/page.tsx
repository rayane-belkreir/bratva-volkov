"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let success = false;
      if (isRegister) {
        success = await register(username, password, email || undefined);
        if (!success) {
          setError("Ce nom d'utilisateur existe déjà");
        }
      } else {
        success = await login(username, password);
        if (!success) {
          setError("Identifiants incorrects");
        }
      }

      if (success) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            {isRegister ? "Inscription" : "Connexion"}
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            {isRegister
              ? "Créez votre compte pour rejoindre la Bratva Volkov"
              : "Accédez à votre compte ou créez-en un nouveau."}
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <GlareCard className="aged-paper">
            {error && (
              <div className="mb-4 p-3 bg-blood-red/20 border border-blood-red/40 text-blood-red rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div>
                  <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                    placeholder="Votre email"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Pseudo
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Votre pseudo"
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
                  placeholder="Votre mot de passe"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Chargement..." : isRegister ? "S'inscrire" : "Se connecter"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError("");
                  }}
                  className="text-sm text-vintage-cream/70 hover:text-patina-gold transition-colors"
                >
                  {isRegister
                    ? "Déjà un compte ? Se connecter"
                    : "Pas encore de compte ? S'inscrire"}
                </button>
              </div>
            </form>
          </GlareCard>
        </div>
      </div>
    </div>
  );
}
