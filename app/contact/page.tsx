"use client";

import { useState, FormEvent } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { GlareCard } from "@/components/GlareCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, Lock, CheckCircle } from "lucide-react";
import { generateDossierId } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    pseudo: "",
    channel: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dossierId, setDossierId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate dossier ID
    const id = generateDossierId();
    setDossierId(id);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dossierId: id,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ pseudo: "", channel: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <GlareCard className="border-gold/40 text-center">
            <CheckCircle className="h-16 w-16 text-gold mx-auto mb-6" />
            <h2 className="text-3xl font-cinzel font-bold text-gold mb-4">
              Message Envoyé
            </h2>
            <p className="text-cream-white/80 mb-6">
              Votre message a été transmis. Vous recevrez une réponse sous peu.
            </p>
            {dossierId && (
              <div className="bg-anthracite/50 border border-gold/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-cream-white/60 mb-2">
                  <Lock className="h-4 w-4" />
                  <span>ID de dossier</span>
                </div>
                <p className="text-gold font-mono text-lg">{dossierId}</p>
              </div>
            )}
            <Button
              onClick={() => {
                setSubmitted(false);
                setDossierId(null);
              }}
              className="mt-6"
            >
              Envoyer un autre message
            </Button>
          </GlareCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader
        title="Contact"
        subtitle="Un message chiffré, une réponse garantie. Entrez en contact avec l'organisation."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <GlareCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="pseudo"
                className="block text-sm font-medium text-cream-white/80 mb-2"
              >
                Pseudo RP
              </label>
              <Input
                id="pseudo"
                type="text"
                value={formData.pseudo}
                onChange={(e) =>
                  setFormData({ ...formData, pseudo: e.target.value })
                }
                required
                placeholder="Votre pseudo"
              />
            </div>

            <div>
              <label
                htmlFor="channel"
                className="block text-sm font-medium text-cream-white/80 mb-2"
              >
                Canal préféré (Discord)
              </label>
              <Input
                id="channel"
                type="text"
                value={formData.channel}
                onChange={(e) =>
                  setFormData({ ...formData, channel: e.target.value })
                }
                required
                placeholder="votre_discord#1234"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-cream-white/80 mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                placeholder="Votre message..."
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-cream-white/50 pt-2 border-t border-gold/20">
              <Lock className="h-4 w-4" />
              <span>Votre message sera chiffré et transmis de manière sécurisée.</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer
                </>
              )}
            </Button>
          </form>
        </GlareCard>
      </motion.div>
    </div>
  );
}

