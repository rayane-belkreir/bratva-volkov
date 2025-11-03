"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";

interface PasswordFormProps {
  correctPassphrase: string;
}

export function PasswordForm({ correctPassphrase }: PasswordFormProps) {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate check (in production, would check against server)
    if (passphrase.trim().toUpperCase() === correctPassphrase.toUpperCase()) {
      // Set cookie
      document.cookie = "fc_pass=true; path=/; max-age=86400"; // 24h
      router.push("/organisation");
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <Lock className="h-12 w-12 text-gold mx-auto mb-4" />
        <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">
          Accès Restreint
        </h2>
        <p className="text-cream-white/70 text-sm">
          Entrez la passphrase pour accéder au cercle
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="password"
          placeholder="Passphrase"
          value={passphrase}
          onChange={(e) => {
            setPassphrase(e.target.value);
            setError(false);
          }}
          className="text-center text-lg tracking-wider"
          autoFocus
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Passphrase incorrecte</span>
          </motion.div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !passphrase.trim()}
        >
          {isLoading ? "Vérification..." : "Entrer"}
        </Button>
      </div>
    </motion.form>
  );
}

