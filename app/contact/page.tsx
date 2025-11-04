"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Mail, Phone, Send, Lock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler l'envoi d'email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
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
            <GlareCard className="aged-paper">
              <div className="w-16 h-16 bg-patina-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-patina-gold/40">
                <Mail className="w-8 h-8 text-patina-gold" />
              </div>
              <h2 className="text-3xl font-bold text-patina-gold mb-4 vintage-text">
                Message envoyé
              </h2>
              <p className="text-vintage-cream/80 mb-6">
                Votre message a été transmis. Vous recevrez une réponse sous peu.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider"
              >
                Envoyer un autre message
              </button>
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
            Contact
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Prenez contact avec la famille. Votre message sera traité dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <GlareCard className="aged-paper">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-patina-gold/20 rounded-full flex items-center justify-center border-2 border-patina-gold/40">
                  <Mail className="w-6 h-6 text-patina-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-patina-gold vintage-text">Email</h3>
                  <p className="text-sm text-vintage-cream/70">contact@bratvavolkov.fr</p>
                </div>
              </div>
            </GlareCard>

            <GlareCard className="aged-paper">
              <a
                href="https://discord.gg/YQGqtFWb7Q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 mb-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-patina-gold/20 rounded-full flex items-center justify-center border-2 border-patina-gold/40">
                  <MessageCircle className="w-6 h-6 text-patina-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-patina-gold vintage-text">Discord</h3>
                  <p className="text-sm text-vintage-cream/70">Discord BratvaVolkov</p>
                </div>
              </a>
            </GlareCard>

          </div>

          <GlareCard className="aged-paper">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-blood-red" />
              <h2 className="text-2xl font-bold text-patina-gold vintage-text">
                Formulaire de Contact
              </h2>
            </div>
            <p className="text-sm text-vintage-cream/70 mb-6">
              Votre message sera chiffré et transmis de manière sécurisée.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Sujet
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-patina-gold mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full bg-charcoal-black border-2 border-patina-gold/30 rounded-lg px-4 py-3 text-vintage-cream placeholder:text-vintage-cream/40 focus:outline-none focus:border-patina-gold/60 min-h-[150px]"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </GlareCard>
        </div>
      </div>
    </div>
  );
}
