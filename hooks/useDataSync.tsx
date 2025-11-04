"use client";

import { useEffect, useRef } from "react";
import { setupDataSyncListener, getLastSyncTimestamp } from "@/lib/sync";

/**
 * Hook pour synchroniser automatiquement les données
 * Écoute les changements dans localStorage et appelle le callback quand des données sont modifiées
 */
export function useDataSync(
  onDataChanged: () => void,
  refreshInterval: number = 2000 // Rafraîchir toutes les 2 secondes par défaut
) {
  const lastTimestampRef = useRef<number>(getLastSyncTimestamp());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialiser avec le timestamp actuel
    lastTimestampRef.current = getLastSyncTimestamp();

    // Écouter les événements de changement
    const cleanup = setupDataSyncListener(() => {
      onDataChanged();
      lastTimestampRef.current = getLastSyncTimestamp();
    });

    // Vérifier périodiquement les changements
    intervalRef.current = setInterval(() => {
      const currentTimestamp = getLastSyncTimestamp();
      if (currentTimestamp > lastTimestampRef.current) {
        onDataChanged();
        lastTimestampRef.current = currentTimestamp;
      }
    }, refreshInterval);

    return () => {
      cleanup();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onDataChanged, refreshInterval]);
}

