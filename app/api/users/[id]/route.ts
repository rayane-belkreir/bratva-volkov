import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/users/[id] - Récupérer un utilisateur
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

// PUT /api/users/[id] - Mettre à jour un utilisateur
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    const { password, ...updates } = body;

    // Si un nouveau mot de passe est fourni, le hasher
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password').lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Convertir _id en id pour compatibilité
    const formattedUser = {
      ...user,
      id: user._id.toString(),
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Supprimer un utilisateur
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}

