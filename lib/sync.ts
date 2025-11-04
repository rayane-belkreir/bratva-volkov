/**
 * Système de synchronisation des données
 * Permet de détecter les changements dans localStorage et de synchroniser les données entre tous les utilisateurs
 */

const SYNC_TIMESTAMP_KEY = 'fc_sync_timestamp';
const SYNC_EVENT_NAME = 'fc_data_changed';

/**
 * Met à jour le timestamp de synchronisation pour signaler un changement
 */
export function markDataChanged(): void {
  if (typeof window === 'undefined') return;
  const timestamp = Date.now();
  localStorage.setItem(SYNC_TIMESTAMP_KEY, timestamp.toString());
  
  // Déclencher un événement personnalisé pour synchroniser les autres onglets
  window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { timestamp } }));
}

/**
 * Obtient le timestamp de la dernière modification
 */
export function getLastSyncTimestamp(): number {
  if (typeof window === 'undefined') return 0;
  const timestampStr = localStorage.getItem(SYNC_TIMESTAMP_KEY);
  return timestampStr ? parseInt(timestampStr, 10) : 0;
}

/**
 * Hook pour écouter les changements de données
 */
export function setupDataSyncListener(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // Écouter les événements personnalisés (autres onglets)
  const handleSyncEvent = () => {
    callback();
  };

  // Écouter les changements dans localStorage (d'autres onglets)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === SYNC_TIMESTAMP_KEY && e.newValue !== e.oldValue) {
      callback();
    }
  };

  window.addEventListener(SYNC_EVENT_NAME, handleSyncEvent);
  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener(SYNC_EVENT_NAME, handleSyncEvent);
    window.removeEventListener('storage', handleStorageChange);
  };
}

