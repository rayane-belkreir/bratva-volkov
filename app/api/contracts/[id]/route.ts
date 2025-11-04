import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contract from '@/models/Contract';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/contracts/[id] - Récupérer un contrat
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const contract: any = await Contract.findById(id).lean();
    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }
    return NextResponse.json({ ...contract, id: contract._id.toString() });
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json({ error: 'Error fetching contract' }, { status: 500 });
  }
}

// PUT /api/contracts/[id] - Mettre à jour un contrat
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();

    const contract: any = await Contract.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    return NextResponse.json({ ...contract, id: contract._id.toString() });
  } catch (error) {
    console.error('Error updating contract:', error);
    return NextResponse.json({ error: 'Error updating contract' }, { status: 500 });
  }
}

// DELETE /api/contracts/[id] - Supprimer un contrat
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const contract = await Contract.findByIdAndDelete(id);
    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Error deleting contract:', error);
    return NextResponse.json({ error: 'Error deleting contract' }, { status: 500 });
  }
}

