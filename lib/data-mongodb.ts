import { Contract, ForumMessage, Article } from './types';

const API_BASE = '/api';

export async function getContracts(): Promise<Contract[]> {
  try {
    const response = await fetch(`${API_BASE}/contracts`);
    if (!response.ok) {
      return [];
    }
    const contracts = await response.json();
    // Garder les IDs comme strings (MongoDB ObjectId)
    return contracts.map((contract: any) => ({
      ...contract,
      id: contract.id || contract._id?.toString() || contract.id,
    }));
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
}

export async function updateContract(contractId: number | string, updates: Partial<Contract>): Promise<Contract | null> {
  try {
    console.log('🔄 Updating contract:', contractId, 'with updates:', updates);
    const response = await fetch(`${API_BASE}/contracts/${contractId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Update contract failed:', response.status, errorData);
      return null;
    }

    const contract = await response.json();
    console.log('✅ Contract updated successfully:', contract);
    // Garder l'ID comme string (MongoDB ObjectId)
    return {
      ...contract,
      id: contract.id || contract._id?.toString() || contract.id,
    };
  } catch (error) {
    console.error('❌ Error updating contract:', error);
    return null;
  }
}

export async function addContract(contract: Omit<Contract, 'id'>): Promise<Contract | null> {
  try {
    console.log('🔄 Adding contract:', contract);
    const response = await fetch(`${API_BASE}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Add contract failed:', response.status, errorData);
      return null;
    }

    const newContract = await response.json();
    console.log('✅ Contract added successfully:', newContract);
    // Garder l'ID comme string (MongoDB ObjectId)
    return {
      ...newContract,
      id: newContract.id || newContract._id?.toString() || newContract.id,
    };
  } catch (error) {
    console.error('❌ Error adding contract:', error);
    return null;
  }
}

export async function deleteContract(contractId: number | string): Promise<boolean> {
  try {
    console.log('🔄 Deleting contract:', contractId);
    const response = await fetch(`${API_BASE}/contracts/${contractId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Delete contract failed:', response.status, errorData);
      return false;
    }

    console.log('✅ Contract deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error deleting contract:', error);
    return false;
  }
}

export async function getMessages(channelId: number): Promise<ForumMessage[]> {
  try {
    const response = await fetch(`${API_BASE}/messages?channelId=${channelId}`);
    if (!response.ok) {
      return [];
    }
    const messages = await response.json();
    // Convertir les id MongoDB en number pour compatibilité
    return messages.map((message: any) => ({
      ...message,
      id: parseInt(message.id) || message.id,
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function addMessage(message: Omit<ForumMessage, 'id' | 'time'>): Promise<ForumMessage | null> {
  try {
    const response = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      return null;
    }

    const newMessage = await response.json();
    return {
      ...newMessage,
      id: parseInt(newMessage.id) || newMessage.id,
    };
  } catch (error) {
    console.error('Error adding message:', error);
    return null;
  }
}

// Cache simple en mémoire pour améliorer les performances
let articlesCache: { data: Article[]; timestamp: number } | null = null;
const CACHE_DURATION = 30000; // 30 secondes

export async function getArticles(): Promise<Article[]> {
  try {
    // Vérifier le cache
    if (articlesCache && Date.now() - articlesCache.timestamp < CACHE_DURATION) {
      return articlesCache.data;
    }

    const response = await fetch(`${API_BASE}/articles`, {
      headers: {
        'Cache-Control': 'max-age=60',
      },
    });
    if (!response.ok) {
      return articlesCache?.data || [];
    }
    const articles = await response.json();
    // Convertir les id MongoDB en number pour compatibilité
    const formattedArticles = articles.map((article: any) => ({
      ...article,
      id: parseInt(article.id) || article.id,
    }));
    
    // Mettre en cache
    articlesCache = {
      data: formattedArticles,
      timestamp: Date.now(),
    };
    
    return formattedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Retourner le cache si disponible en cas d'erreur
    return articlesCache?.data || [];
  }
}

