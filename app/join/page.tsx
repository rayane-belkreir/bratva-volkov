"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { UserPlus, CheckCircle, Eye } from "lucide-react";
import { register } from "@/lib/auth";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [discord, setDiscord] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Vérifier que tous les champs sont remplis
      if (!username || !password || !pseudo || !discord || !experience) {
        setError("Veuillez remplir tous les champs");
        setLoading(false);
        return;
      }

      // Créer le compte avec statut "pending"
      const newUser = await register(username, password, undefined, pseudo, discord, experience);
      
      if (!newUser) {
        setError("Ce nom d'utilisateur existe déjà");
        setLoading(false);
        return;
      }

      // Vérifier que l'utilisateur a un ID valide avant de mettre à jour
      if (!newUser || !newUser.id) {
        setError("Erreur lors de la création du compte : ID invalide");
        setLoading(false);
        return;
      }

      const userIdStr = String(newUser.id).trim();
      
      // Vérifier que l'ID est un string MongoDB valide (24 caractères hex)
      if (userIdStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userIdStr)) {
        setError("Erreur lors de la création du compte : ID invalide (format MongoDB requis)");
        setLoading(false);
        return;
      }

      // Mettre à jour le compte avec les données de candidature et statut "pending"
      const { updateUser } = await import("@/lib/auth");
      const updatedUser = await updateUser(userIdStr, {
        status: 'pending',
        applicationData: {
          pseudo,
          discord,
          experience,
          submittedAt: new Date().toISOString(),
        },
        role: 'Bratan', // Rôle par défaut
      });

      if (!updatedUser) {
        setError("Erreur lors de la mise à jour du compte");
        setLoading(false);
        return;
      }

      // Envoyer l'email via l'API
      const response = await fetch("/api/recruitment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pseudo,
          discord,
          experience,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }
      
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-charcoal-black aged-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <GlareCard className="aged-paper border-2 border-patina-gold/40">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-patina-gold/20 rounded-full border-4 border-patina-gold/60 flex items-center justify-center mx-auto">
                  <Eye className="w-10 h-10 text-patina-gold" />
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold text-patina-gold mb-4 vintage-text">
                Candidature soumise
              </h2>
              <div className="mb-6">
                <p className="text-vintage-cream/90 text-lg mb-2 font-bold">
                  La Famille lit votre candidature
                </p>
                <p className="text-vintage-cream/70 text-sm leading-relaxed">
                  Votre candidature a été enregistrée et votre compte a été créé. 
                  Votre dossier est en cours d'examen par les membres de la famille. 
                  Vous recevrez une notification une fois votre candidature acceptée.
                </p>
                <p className="text-vintage-cream/60 text-xs mt-4 italic">
                  En attendant, vous avez un accès visiteur limité au site.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.push("/login")}
                  className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider rounded-lg"
                >
                  Se Connecter
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="px-6 py-3 bg-transparent border-2 border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 transition-colors font-bold uppercase tracking-wider rounded-lg"
                >
                  Retour à l'accueil
                </button>
              </div>
            </GlareCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Rejoindre le RP
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Intégrez la Bratva Volkov. Remplissez le formulaire ci-dessous.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <GlareCard className="aged-paper">
            {error && (
              <div className="mb-4 p-3 bg-blood-red/20 border border-blood-red/40 text-blood-red rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-patina-gold/20 pb-4 mb-4">
                <h3 className="text-lg font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Informations de connexion
                </h3>
                <p className="text-xs text-vintage-cream/60 mb-4">
                  Créez votre compte pour déposer votre candidature
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Nom d'utilisateur *
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Mot de passe *
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

              <div className="border-t border-patina-gold/20 pt-4 mt-4">
                <h3 className="text-lg font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Candidature
                </h3>
                <p className="text-xs text-vintage-cream/60 mb-4">
                  Remplissez ces informations pour votre candidature
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Pseudo RP *
                </label>
                <input
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Votre pseudo RP"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Discord *
                </label>
                <input
                  type="text"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Votre Discord (ex: username#1234)"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Expérience RP *
                </label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60 min-h-[120px]"
                  placeholder="Décrivez votre expérience en RP, vos motivations, etc..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5" />
                {loading ? "Envoi en cours..." : "Soumettre la candidature"}
              </button>
            </form>
          </GlareCard>
        </div>
      </div>
    </div>
  );
}
