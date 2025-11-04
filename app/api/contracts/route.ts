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
    const formattedContracts = contracts.map((contract: any) => {
      if (!contract._id) {
        console.error('❌ Contract without _id:', contract);
        return null;
      }
      return {
        ...contract,
        id: contract._id.toString(),
      };
    }).filter((c: any) => c !== null);
    
    console.log('✅ API: Returning', formattedContracts.length, 'contracts');
    return NextResponse.json(formattedContracts);
  } catch (error) {
    console.error('❌ Error fetching contracts:', error);
    return NextResponse.json({ error: 'Error fetching contracts' }, { status: 500 });
  }
}

// POST /api/contracts - Créer un nouveau contrat
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { type, title, description, location, reward, deadline } = body;

    console.log('🔄 API: Creating contract:', title);

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
    const formattedContract = { ...contractObj, id: contractObj._id.toString() };
    console.log('✅ API: Contract created successfully:', formattedContract.title);
    return NextResponse.json(formattedContract, { status: 201 });
  } catch (error: any) {
    console.error('❌ API: Error creating contract:', error);
    return NextResponse.json({ 
      error: 'Error creating contract', 
      details: error.message 
    }, { status: 500 });
  }
}

// OPTIONS handler pour CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

