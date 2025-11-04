import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    
    // S'assurer que l'ID est correctement formaté (MongoDB ObjectId → id string)
    const formattedUser = {
      ...userWithoutPassword,
      id: userWithoutPassword._id?.toString() || userWithoutPassword.id,
    };
    
    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error('Error logging in:', error);
    
    // Vérifier si c'est une erreur de connexion MongoDB
    if (error.message?.includes('MongoDB') || error.message?.includes('connection')) {
      return NextResponse.json(
        { 
          error: 'Erreur de connexion à la base de données. Vérifiez la configuration MongoDB.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la connexion', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    );
  }
}

