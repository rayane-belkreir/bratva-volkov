"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import { GlareCard } from "@/components/GlareCard";

interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "danger",
  confirmText = "Confirmer",
  cancelText = "Annuler",
}: ConfirmPopupProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const iconConfig = {
    danger: {
      icon: AlertTriangle,
      color: "text-blood-red",
      bgColor: "bg-blood-red/20",
      borderColor: "border-blood-red/60",
      buttonColor: "bg-blood-red text-vintage-cream hover:bg-blood-red/80",
    },
    warning: {
      icon: AlertCircle,
      color: "text-patina-gold",
      bgColor: "bg-patina-gold/20",
      borderColor: "border-patina-gold/60",
      buttonColor: "bg-patina-gold text-charcoal-black hover:bg-patina-gold-light",
    },
    info: {
      icon: Info,
      color: "text-patina-gold",
      bgColor: "bg-patina-gold/20",
      borderColor: "border-patina-gold/60",
      buttonColor: "bg-patina-gold text-charcoal-black hover:bg-patina-gold-light",
    },
    success: {
      icon: CheckCircle,
      color: "text-patina-gold",
      bgColor: "bg-patina-gold/20",
      borderColor: "border-patina-gold/60",
      buttonColor: "bg-patina-gold text-charcoal-black hover:bg-patina-gold-light",
    },
  };

  const config = iconConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-black/90 backdrop-blur-sm z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full">
              <GlareCard 
                isRestriction={type === "danger"} 
                className={`aged-paper border-4 ${config.borderColor} ${
                  type === "danger"
                    ? "shadow-[0_0_50px_rgba(139,0,0,0.8)]"
                    : "shadow-[0_0_50px_rgba(201,169,97,0.8)]"
                } bg-gradient-to-br from-charcoal-black via-anthracite to-charcoal-black`}
              >
                {/* Bouton de fermeture */}
                <button
                  onClick={onClose}
                  className={`absolute top-4 right-4 p-2 rounded transition-colors ${
                    type === "danger" 
                      ? "hover:bg-blood-red/10" 
                      : "hover:bg-patina-gold/10"
                  }`}
                >
                  <X className={`w-5 h-5 ${config.color}`} />
                </button>

                {/* Icône centrale */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: type === "danger" ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: type === "danger" ? 2 : 0, 
                      repeat: type === "danger" ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className={`w-20 h-20 ${config.bgColor} rounded-full border-4 ${config.borderColor} flex items-center justify-center`}>
                      <Icon className={`w-10 h-10 ${config.color}`} />
                    </div>
                    {type === "danger" && (
                      <motion.div
                        className={`absolute inset-0 ${config.bgColor} rounded-full blur-xl`}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Titre */}
                <h2 className={`text-3xl font-bold text-center mb-4 vintage-text ${config.color} ${
                  type === "danger" 
                    ? "drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]" 
                    : "drop-shadow-[0_0_10px_rgba(201,169,97,0.8)]"
                }`}>
                  {title}
                </h2>

                {/* Message */}
                <p className="text-vintage-cream/90 text-center mb-6 leading-relaxed">
                  {message}
                </p>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {cancelText && (
                    <button
                      onClick={onClose}
                      className={`flex-1 px-6 py-3 bg-transparent border-2 transition-colors font-bold uppercase tracking-wider text-center rounded-lg ${
                        type === "danger"
                          ? "border-blood-red/40 text-blood-red hover:bg-blood-red/10 hover:border-blood-red/60"
                          : "border-patina-gold/40 text-patina-gold hover:bg-patina-gold/10 hover:border-patina-gold/60"
                      }`}
                    >
                      {cancelText}
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className={`flex-1 px-6 py-3 ${config.buttonColor} transition-colors font-bold uppercase tracking-wider text-center rounded-lg border-2 ${config.borderColor}`}
                  >
                    {confirmText}
                  </button>
                </div>
              </GlareCard>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

