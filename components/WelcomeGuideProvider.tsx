"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { WelcomeGuide } from "@/components/WelcomeGuide";
import { getAllUsers } from "@/lib/auth";

export function WelcomeGuideProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const checkWelcome = async () => {
      if (user && user.status === 'approved') {
        const welcomeKey = `fc_welcome_${user.id}`;
        const hasSeenWelcome = localStorage.getItem(welcomeKey);
        
        // Si l'utilisateur n'a jamais vu le guide, l'afficher
        if (!hasSeenWelcome) {
          // Attendre un peu pour que l'interface se charge
          const timer = setTimeout(() => {
            setShowGuide(true);
            localStorage.setItem(welcomeKey, 'true');
          }, 1500);
          
          return () => clearTimeout(timer);
        }
        
        // Vérifier si l'utilisateur a été marqué pour voir le guide à nouveau
        // (par exemple après une approbation par l'admin)
        const shouldShowAgain = localStorage.getItem(`fc_show_welcome_${user.id}`);
        if (shouldShowAgain === 'true') {
          const timer = setTimeout(() => {
            setShowGuide(true);
            localStorage.setItem(welcomeKey, 'true'); // Marquer comme vu
            localStorage.removeItem(`fc_show_welcome_${user.id}`); // Retirer le flag
          }, 1500);
          
          return () => clearTimeout(timer);
        }
      }
    };
    checkWelcome();
  }, [user]);

  return (
    <>
      {children}
      <WelcomeGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
}

