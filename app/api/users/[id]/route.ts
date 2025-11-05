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
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
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
        { error: 'Invalid user ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
        await connectDB();
        const user: any = await User.findById(idStr).select('-password').lean();
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            {
              status: 404,
              headers: {
                'Allow': 'GET, PUT, DELETE, OPTIONS'
              }
            }
          );
        }
        
        // Formater l'ID correctement
        const formattedUser = {
          ...user,
          id: user._id?.toString() || user.id || idStr,
        };
        
        return NextResponse.json(formattedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error fetching user' },
      { 
        status: 500,
        headers: {
          'Allow': 'GET, PUT, DELETE, OPTIONS'
        }
      }
    );
  }
}

// PUT /api/users/[id] - Mettre à jour un utilisateur
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      console.error('❌ API: Invalid user ID:', id);
      return NextResponse.json(
        { error: 'Invalid user ID' },
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
      console.error('❌ API: Invalid user ID format:', idStr);
      return NextResponse.json(
        { error: 'Invalid user ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    await connectDB();
    
    const body = await request.json();
    const { password, ...updates } = body;

    console.log('🔄 API: Updating user', id, 'with:', updates);

    // Si un nouveau mot de passe est fourni, le hasher
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const user: any = await User.findByIdAndUpdate(
      idStr,
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
      id: user._id?.toString() || user.id || idStr,
    };

    console.log('✅ API: User updated successfully:', formattedUser.username, 'status:', formattedUser.status);
    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error('❌ API: Error updating user:', error);
    return NextResponse.json(
      { 
        error: 'Error updating user', 
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

// DELETE /api/users/[id] - Supprimer un utilisateur
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
    // Vérifier que l'ID est valide avant de se connecter à MongoDB
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      console.error('❌ API: Invalid user ID:', id);
      return NextResponse.json(
        { error: 'Invalid user ID' },
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
      console.error('❌ API: Invalid user ID format:', idStr);
      return NextResponse.json(
        { error: 'Invalid user ID format. Expected MongoDB ObjectId (24 hex characters)' },
        { 
          status: 400,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    console.log('🔄 API: Deleting user', idStr);
    
    await connectDB();
    const user = await User.findByIdAndDelete(idStr);
    if (!user) {
      console.error('❌ API: User not found:', idStr);
      return NextResponse.json(
        { error: 'User not found' },
        { 
          status: 404,
          headers: {
            'Allow': 'GET, PUT, DELETE, OPTIONS'
          }
        }
      );
    }
    
    console.log('✅ API: User deleted successfully:', user.username);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('❌ API: Error deleting user:', error);
    return NextResponse.json(
      { 
        error: 'Error deleting user', 
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

