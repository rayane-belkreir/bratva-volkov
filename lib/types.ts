export interface MissionInvitation {
  contractId: number;
  contractTitle: string;
  invitedBy: string; // Username du leader qui invite
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password?: string; // Ne pas stocker en production réel
  email?: string;
  discord?: string;
  role: 'Bratan' | 'Soldat' | 'Avtoritet' | 'Vor' | 'Sovetnik' | 'Pervyi' | 'Pakhan' | 'Admin';
  reputation: number;
  money: number;
  createdAt: string;
  status?: 'pending' | 'approved' | 'rejected'; // Statut d'approbation
  applicationData?: {
    pseudo: string;
    discord: string;
    experience: string;
    submittedAt: string;
  };
  missionInvitations?: MissionInvitation[]; // Invitations reçues
}

export interface Contract {
  id: number;
  type: string;
  title: string;
  description: string;
  location: string;
  reward: {
    money: number;
    reputation: number;
    items?: string[];
  };
  status: 'available' | 'in_progress' | 'completed' | 'refused';
  deadline: string;
  teamMembers?: string[]; // Membres qui participent à la mission
  teamRequests?: { username: string; requestedBy: string; status: 'pending' | 'accepted' | 'rejected' }[]; // Demandes d'ajout de membres
  lockedBy?: string; // Qui a accepté la mission (lock la mission)
}

export interface ForumMessage {
  id: number;
  channelId: number;
  author: string;
  content: string;
  time: string;
  encrypted: boolean;
}

export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  locked: boolean;
  requiredRank?: string;
}


