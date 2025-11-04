import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { User as UserType } from '@/lib/types';

// GET /api/users - Récupérer tous les utilisateurs
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select('-password').lean();
    // Convertir les _id MongoDB en id pour compatibilité
    const formattedUsers = users.map((user: any) => {
      if (!user._id) {
        console.error('❌ User without _id:', user);
        return null;
      }
      return {
        ...user,
        id: user._id.toString(),
      };
    }).filter((u: any) => u !== null);
    
    console.log('✅ API: Returning', formattedUsers.length, 'users');
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// POST /api/users - Créer un nouvel utilisateur
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, password, email, role, reputation, money, status, applicationData } = body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: role || 'Bratan',
      reputation: reputation || 0,
      money: money || 0,
      createdAt: new Date().toISOString(),
      status: status || 'pending',
      applicationData,
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

