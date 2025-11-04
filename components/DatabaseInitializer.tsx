"use client";

import { useEffect, useState } from 'react';

export function DatabaseInitializer() {
  const [initialized, setInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // Initialiser la DB automatiquement au chargement du site
    const initializeDatabase = async () => {
      // Vérifier si on a déjà initialisé (éviter les appels multiples)
      const initKey = 'db_initialized';
      const hasInitialized = sessionStorage.getItem(initKey);
      
      if (hasInitialized === 'true') {
        setInitialized(true);
        return;
      }

      try {
        setIsInitializing(true);
        const response = await fetch('/api/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Database initialized:', data);
          setInitialized(true);
          sessionStorage.setItem(initKey, 'true');
        } else {
          // Si la DB est déjà initialisée, c'est OK
          const error = await response.json();
          if (error.message?.includes('already exists') || error.message?.includes('déjà')) {
            console.log('✅ Database already initialized');
            setInitialized(true);
            sessionStorage.setItem(initKey, 'true');
          } else {
            console.error('❌ Error initializing database:', error);
          }
        }
      } catch (error) {
        // Ne pas bloquer le site si l'initialisation échoue
        console.error('❌ Error initializing database:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    // Attendre un peu avant d'initialiser pour ne pas surcharger au démarrage
    const timer = setTimeout(() => {
      initializeDatabase();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
}

