import { Contract, ForumMessage, Article } from './types';

const API_BASE = '/api';

export async function getContracts(): Promise<Contract[]> {
  try {
    const response = await fetch(`${API_BASE}/contracts`);
    if (!response.ok) {
      return [];
    }
    const contracts = await response.json();
    // Convertir les id MongoDB en number pour compatibilité
    return contracts.map((contract: any) => ({
      ...contract,
      id: parseInt(contract.id) || contract.id,
    }));
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
}

export async function updateContract(contractId: number | string, updates: Partial<Contract>): Promise<Contract | null> {
  try {
    const response = await fetch(`${API_BASE}/contracts/${contractId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      return null;
    }

    const contract = await response.json();
    return {
      ...contract,
      id: parseInt(contract.id) || contract.id,
    };
  } catch (error) {
    console.error('Error updating contract:', error);
    return null;
  }
}

export async function addContract(contract: Omit<Contract, 'id'>): Promise<Contract | null> {
  try {
    const response = await fetch(`${API_BASE}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract),
    });

    if (!response.ok) {
      return null;
    }

    const newContract = await response.json();
    return {
      ...newContract,
      id: parseInt(newContract.id) || newContract.id,
    };
  } catch (error) {
    console.error('Error adding contract:', error);
    return null;
  }
}

export async function deleteContract(contractId: number | string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/contracts/${contractId}`, {
      method: 'DELETE',
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting contract:', error);
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

export async function getArticles(): Promise<Article[]> {
  try {
    // Utiliser cache et revalidate pour améliorer les performances
    const response = await fetch(`${API_BASE}/articles`, {
      cache: 'force-cache',
      next: { revalidate: 60 }, // Revalider toutes les 60 secondes
    });
    if (!response.ok) {
      return [];
    }
    const articles = await response.json();
    // Convertir les id MongoDB en number pour compatibilité
    return articles.map((article: any) => ({
      ...article,
      id: parseInt(article.id) || article.id,
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

