import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Contract from '@/models/Contract';
import { MissionInvitation } from '@/lib/types';

// POST /api/invitations - Envoyer une invitation
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { contractId, username, invitedBy } = body;

    // Récupérer le contrat
    const contract: any = await Contract.findById(contractId).lean();
    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    // Récupérer l'utilisateur invité
    const invitedUser: any = await User.findOne({ username });
    if (!invitedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Vérifier si l'invitation existe déjà
    const existingInvitation = invitedUser.missionInvitations?.find(
      (inv: MissionInvitation) => inv.contractId.toString() === contractId && inv.status === 'pending'
    );

    if (existingInvitation) {
      return NextResponse.json({ error: 'Invitation already sent' }, { status: 400 });
    }

    // Ajouter l'invitation
    const newInvitation: MissionInvitation = {
      contractId: parseInt(contractId),
      contractTitle: contract.title,
      invitedBy,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updatedInvitations = [...(invitedUser.missionInvitations || []), newInvitation];
    await User.findByIdAndUpdate(invitedUser._id, {
      $set: { missionInvitations: updatedInvitations },
    });

    return NextResponse.json({ message: 'Invitation sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error sending invitation:', error);
    return NextResponse.json({ error: 'Error sending invitation' }, { status: 500 });
  }
}

// PUT /api/invitations - Accepter ou refuser une invitation
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, contractId, action } = body; // action: 'accept' ou 'reject'

    const user: any = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Trouver l'invitation
    const invitationIndex = user.missionInvitations?.findIndex(
      (inv: MissionInvitation) => inv.contractId.toString() === contractId && inv.status === 'pending'
    );

    if (invitationIndex === undefined || invitationIndex === -1) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
    }

    // Mettre à jour le statut de l'invitation
    const updatedInvitations = [...(user.missionInvitations || [])];
    updatedInvitations[invitationIndex] = {
      ...updatedInvitations[invitationIndex],
      status: action === 'accept' ? 'accepted' : 'rejected',
    };

    // Si acceptée, ajouter l'utilisateur à l'équipe
    if (action === 'accept') {
      const contract: any = await Contract.findById(contractId);
      if (contract) {
        const teamMembers = [...(contract.teamMembers || [])];
        if (!teamMembers.includes(user.username)) {
          teamMembers.push(user.username);
          await Contract.findByIdAndUpdate(contractId, {
            $set: { teamMembers },
          });
        }
      }
    }

    await User.findByIdAndUpdate(userId, {
      $set: { missionInvitations: updatedInvitations },
    });

    return NextResponse.json({ message: `Invitation ${action === 'accept' ? 'accepted' : 'rejected'}` });
  } catch (error) {
    console.error('Error updating invitation:', error);
    return NextResponse.json({ error: 'Error updating invitation' }, { status: 500 });
  }
}

