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
    
    if (!id || id === 'undefined') {
      console.error('❌ API: Invalid user ID:', id);
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    
    const body = await request.json();
    const { password, ...updates } = body;

    console.log('🔄 API: Updating user', id, 'with:', updates);

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
      console.error('❌ API: User not found:', id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Convertir _id en id pour compatibilité
    const formattedUser = {
      ...user,
      id: user._id.toString(),
    };

    console.log('✅ API: User updated successfully:', formattedUser.username, 'status:', formattedUser.status);
    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error('❌ API: Error updating user:', error);
    return NextResponse.json({ 
      error: 'Error updating user', 
      details: error.message 
    }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Supprimer un utilisateur
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    
    console.log('🔄 API: Deleting user', id);
    
    if (!id || id === 'undefined') {
      console.error('❌ API: Invalid user ID:', id);
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }
    
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      console.error('❌ API: User not found:', id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('✅ API: User deleted successfully:', user.username);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('❌ API: Error deleting user:', error);
    return NextResponse.json({ 
      error: 'Error deleting user', 
      details: error.message 
    }, { status: 500 });
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

