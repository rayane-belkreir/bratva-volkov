import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contract from '@/models/Contract';
import { Contract as ContractType } from '@/lib/types';

// GET /api/contracts - Récupérer tous les contrats
export async function GET() {
  try {
    await connectDB();
    const contracts: any[] = await Contract.find({}).lean();
    // Convertir les _id en id pour la compatibilité
    const formattedContracts = contracts.map((contract: any) => ({
      ...contract,
      id: contract._id.toString(),
    }));
    return NextResponse.json(formattedContracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return NextResponse.json({ error: 'Error fetching contracts' }, { status: 500 });
  }
}

// POST /api/contracts - Créer un nouveau contrat
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { type, title, description, location, reward, deadline } = body;

    const newContract = new Contract({
      type,
      title,
      description,
      location,
      reward,
      deadline,
      status: 'available',
      teamMembers: [],
      teamRequests: [],
    });

    await newContract.save();

    const contractObj = newContract.toObject();
    return NextResponse.json({ ...contractObj, id: contractObj._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating contract:', error);
    return NextResponse.json({ error: 'Error creating contract' }, { status: 500 });
  }
}

