import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { username, password, email, pseudo, discord, experience } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

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
      role: 'Bratan',
      reputation: 0,
      money: 0,
      createdAt: new Date().toISOString(),
      status: 'pending',
      applicationData: pseudo && discord && experience ? {
        pseudo,
        discord,
        experience,
        submittedAt: new Date().toISOString(),
      } : undefined,
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    
    // S'assurer que l'ID est correctement formaté (MongoDB ObjectId → id string)
    const formattedUser = {
      ...userWithoutPassword,
      id: userWithoutPassword._id?.toString() || userWithoutPassword.id,
    };
    
    return NextResponse.json(formattedUser, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}

