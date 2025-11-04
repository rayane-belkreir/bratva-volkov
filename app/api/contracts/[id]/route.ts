import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contract from '@/models/Contract';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/contracts/[id] - Récupérer un contrat
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid contract ID' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    // Vérifier le format MongoDB ObjectId (24 caractères hex)
    const idStr = String(id).trim();
    if (idStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(idStr)) {
      return NextResponse.json(
        { error: 'Invalid contract ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    await connectDB();
    const contract: any = await Contract.findById(idStr).lean();
    if (!contract) {
      return NextResponse.json(
        { error: 'Contract not found' },
        { 
          status: 404,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    return NextResponse.json({ ...contract, id: contract._id.toString() });
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json(
      { error: 'Error fetching contract' },
      { 
        status: 500,
        headers: {
          'Allow': 'GET, PUT, DELETE, OPTIONS'
        }
      }
    );
  }
}

// PUT /api/contracts/[id] - Mettre à jour un contrat
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      console.error('❌ API: Invalid contract ID:', id);
      return NextResponse.json(
        { error: 'Invalid contract ID' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    // Vérifier le format MongoDB ObjectId (24 caractères hex)
    const idStr = String(id).trim();
    if (idStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(idStr)) {
      console.error('❌ API: Invalid contract ID format:', idStr);
      return NextResponse.json(
        { error: 'Invalid contract ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    const body = await request.json();

    console.log('🔄 API: Updating contract', idStr, 'with:', body);

    await connectDB();
    const contract: any = await Contract.findByIdAndUpdate(
      idStr,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!contract) {
      console.error('❌ API: Contract not found:', idStr);
      return NextResponse.json(
        { error: 'Contract not found' },
        { 
          status: 404,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }

    const formattedContract = { ...contract, id: contract._id.toString() };
    console.log('✅ API: Contract updated successfully:', formattedContract.title);
    return NextResponse.json(formattedContract);
  } catch (error: any) {
    console.error('❌ API: Error updating contract:', error);
    return NextResponse.json(
      { 
        error: 'Error updating contract', 
        details: error.message 
      },
      { 
        status: 500,
        headers: {
          'Allow': 'GET, PUT, DELETE, OPTIONS'
        }
      }
    );
  }
}

// DELETE /api/contracts/[id] - Supprimer un contrat
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      console.error('❌ API: Invalid contract ID:', id);
      return NextResponse.json(
        { error: 'Invalid contract ID' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    // Vérifier le format MongoDB ObjectId (24 caractères hex)
    const idStr = String(id).trim();
    if (idStr.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(idStr)) {
      console.error('❌ API: Invalid contract ID format:', idStr);
      return NextResponse.json(
        { error: 'Invalid contract ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    console.log('🔄 API: Deleting contract', idStr);
    
    await connectDB();
    const contract = await Contract.findByIdAndDelete(idStr);
    if (!contract) {
      console.error('❌ API: Contract not found:', idStr);
      return NextResponse.json(
        { error: 'Contract not found' },
        { 
          status: 404,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    console.log('✅ API: Contract deleted successfully:', contract.title);
    return NextResponse.json({ message: 'Contract deleted successfully' });
  } catch (error: any) {
    console.error('❌ API: Error deleting contract:', error);
    return NextResponse.json(
      { 
        error: 'Error deleting contract', 
        details: error.message 
      },
      { 
        status: 500,
        headers: {
          'Allow': 'GET, PUT, DELETE, OPTIONS'
        }
      }
    );
  }
}

// OPTIONS handler pour CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

