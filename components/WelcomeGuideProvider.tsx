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
        
        // Vérifier si l'utilisateur vient d'être approuvé
        const allUsers = await getAllUsers();
        const currentUser = allUsers.find(u => u.id === user.id);
        
        if (currentUser && currentUser.status === 'approved' && !hasSeenWelcome) {
          // Attendre un peu pour que l'interface se charge
          const timer = setTimeout(() => {
            setShowGuide(true);
            localStorage.setItem(welcomeKey, 'true');
          }, 1500);
          
          return () => clearTimeout(timer);
        } else if (hasSeenWelcome === 'true') {
          // Si l'utilisateur a déjà vu le guide mais qu'il a été marqué pour voir à nouveau
          // (par exemple après une approbation), on le montre
          const shouldShowAgain = localStorage.getItem(`fc_show_welcome_${user.id}`);
          if (shouldShowAgain === 'true') {
            const timer = setTimeout(() => {
              setShowGuide(true);
              localStorage.removeItem(`fc_show_welcome_${user.id}`);
            }, 1500);
            
            return () => clearTimeout(timer);
          }
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

