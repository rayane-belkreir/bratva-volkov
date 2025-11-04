import { User, MissionInvitation, Contract } from './types';

const API_BASE = '/api';

export async function sendInvitation(contractId: number | string, username: string, invitedBy: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/invitations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId, username, invitedBy }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending invitation:', error);
    return false;
  }
}

export async function acceptInvitation(userId: string, contractId: number | string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/invitations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contractId, action: 'accept' }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error accepting invitation:', error);
    return false;
  }
}

export async function rejectInvitation(userId: string, contractId: number | string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/invitations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contractId, action: 'reject' }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error rejecting invitation:', error);
    return false;
  }
}

export async function getPendingInvitations(userId: string): Promise<MissionInvitation[]> {
  try {
    // Récupérer l'utilisateur pour obtenir ses invitations
    const response = await fetch(`${API_BASE}/users/${userId}`);
    if (!response.ok) {
      return [];
    }
    const user = await response.json();
    return (user.missionInvitations || []).filter(
      (inv: MissionInvitation) => inv.status === 'pending'
    );
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return [];
  }
}

export async function cleanupOldInvitations(userId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`);
    if (!response.ok) {
      return;
    }
    const user = await response.json();
    const invitations = user.missionInvitations || [];
    
    // Garder seulement les invitations pending et celles des 30 derniers jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const cleanedInvitations = invitations.filter((inv: MissionInvitation) => {
      if (inv.status === 'pending') return true;
      const createdAt = new Date(inv.createdAt);
      return createdAt > thirtyDaysAgo;
    });

    if (cleanedInvitations.length !== invitations.length) {
      await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionInvitations: cleanedInvitations }),
      });
    }
  } catch (error) {
    console.error('Error cleaning up invitations:', error);
  }
}

