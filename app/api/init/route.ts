import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Contract from '@/models/Contract';
import Article from '@/models/Article';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    await connectDB();

    // Créer les utilisateurs par défaut
    const defaultUsers = [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: 'Admin',
        reputation: 1000,
        money: 1000000,
        createdAt: new Date().toISOString(),
        status: 'approved',
      },
      {
        username: 'antoine',
        password: await bcrypt.hash('admin123', 10),
        role: 'Pakhan',
        reputation: 1500,
        money: 1000000,
        createdAt: new Date().toISOString(),
        status: 'approved',
      },
      {
        username: 'elise',
        password: await bcrypt.hash('admin123', 10),
        role: 'Sovetnik',
        reputation: 600,
        money: 500000,
        createdAt: new Date().toISOString(),
        status: 'approved',
      },
      {
        username: 'marc',
        password: await bcrypt.hash('admin123', 10),
        role: 'Avtoritet',
        reputation: 200,
        money: 100000,
        createdAt: new Date().toISOString(),
        status: 'approved',
      },
    ];

    const createdUsers = [];
    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        await User.create(userData);
        createdUsers.push(userData.username);
      }
    }

    // Créer les contrats par défaut
    const defaultContracts = [
      {
        type: 'Vol',
        title: 'Braquage du Casino',
        description: 'Braquage organisé du casino de Liberty City. Nécessite 4 membres minimum. Opération délicate pour la famille en 1945.',
        location: 'Casino de Liberty City',
        reward: { money: 50000, reputation: 100, items: ['Arme de poing', 'Costume'] },
        status: 'available',
        deadline: '1945-03-15',
        teamMembers: [],
        teamRequests: [],
      },
      {
        type: 'Extorsion',
        title: 'Protection du Quartier',
        description: 'Collecte des paiements de protection dans le quartier de Broker. Établir la présence de la famille dans Liberty City.',
        location: 'Broker, Liberty City',
        reward: { money: 25000, reputation: 50 },
        status: 'available',
        deadline: '1945-03-10',
        teamMembers: [],
        teamRequests: [],
      },
      {
        type: 'Assassinat',
        title: 'Élimination de Cible',
        description: 'Mission confidentielle. Détails fournis après acceptation. Opération liée à l\'installation de la famille à Liberty City.',
        location: 'Classifié',
        reward: { money: 75000, reputation: 150 },
        status: 'available',
        deadline: '1945-03-08',
        teamMembers: [],
        teamRequests: [],
      },
      {
        type: 'Trafic',
        title: 'Livraison de Marchandise',
        description: 'Transport sécurisé de marchandise depuis le port de Liberty City jusqu\'à l\'entrepôt. Établir les routes de trafic pour la famille.',
        location: 'Port de Liberty City',
        reward: { money: 30000, reputation: 75 },
        status: 'available',
        deadline: '1945-03-12',
        teamMembers: [],
        teamRequests: [],
      },
    ];

    const createdContracts = [];
    for (const contractData of defaultContracts) {
      const existingContract = await Contract.findOne({ title: contractData.title });
      if (!existingContract) {
        await Contract.create(contractData);
        createdContracts.push(contractData.title);
      }
    }

    // Créer les articles par défaut
    const defaultArticles = [
      {
        slug: 'arrivee-liberty-city',
        title: 'Arrivée de la Famille à Liberty City',
        date: '1945-01-15',
        author: 'Archives de la Famille',
        excerpt: 'La Bratva Volkov établit sa présence dans Liberty City après la Seconde Guerre mondiale.',
        content: 'En 1945, après la Seconde Guerre mondiale, les membres de la Bratva Volkov quittent Saint-Pétersbourg pour établir leur présence à Liberty City. Les premiers réseaux sont mis en place dans les quartiers de Broker et Dukes.',
        category: 'Histoire',
        locked: false,
      },
      {
        slug: 'premiers-reseaux',
        title: 'Établissement des Premiers Réseaux',
        date: '1945-02-20',
        author: 'Archives de la Famille',
        excerpt: 'Les premiers réseaux de protection et d\'influence sont établis dans Liberty City.',
        content: 'Les membres de la famille établissent rapidement les premiers réseaux de protection dans les quartiers de Liberty City. Des alliances sont formées avec les commerçants locaux, établissant la présence de la Bratva dans la ville.',
        category: 'Histoire',
        locked: false,
      },
      {
        slug: 'nouveau-pakhan',
        title: 'Le Nouveau Pakhan',
        date: '1945-03-01',
        author: 'Archives de la Famille',
        excerpt: 'Un nouveau Pakhan prend le contrôle de la famille après la disparition de l\'ancien.',
        content: 'L\'ancien Pakhan a été tué dans des circonstances mystérieuses. Un nouveau leader russe a pris le contrôle de la Bratva Volkov. Son identité reste secrète, seuls les membres les plus loyaux connaissent sa véritable identité.',
        category: 'Histoire',
        locked: false,
      },
    ];

    const createdArticles = [];
    for (const articleData of defaultArticles) {
      const existingArticle = await Article.findOne({ title: articleData.title });
      if (!existingArticle) {
        // Retirer le slug car il n'est pas dans le modèle
        const { slug, ...articleDataWithoutSlug } = articleData;
        await Article.create(articleDataWithoutSlug);
        createdArticles.push(articleData.title);
      }
    }

    // Si rien n'a été créé, c'est que tout existe déjà
    const allExist = createdUsers.length === 0 && createdContracts.length === 0 && createdArticles.length === 0;
    
    return {
      success: true,
      message: allExist 
        ? 'Données déjà initialisées' 
        : 'Données initialisées avec succès',
      created: {
        users: createdUsers,
        contracts: createdContracts,
        articles: createdArticles,
      },
      alreadyInitialized: allExist,
    };
  } catch (error: any) {
    console.error('Error initializing data:', error);
    throw error;
  }
}

// GET - Permet d'initialiser via le navigateur
export async function GET() {
  try {
    const result = await initializeDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error initializing data:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'initialisation des données', 
        details: error.message,
        hint: 'Vérifiez que MONGODB_URI est configuré dans Vercel et que MongoDB Atlas autorise les connexions (Network Access)'
      },
      { status: 500 }
    );
  }
}

// POST - Permet d'initialiser via l'API
export async function POST(request: Request) {
  try {
    const result = await initializeDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error initializing data:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'initialisation des données', 
        details: error.message,
        hint: 'Vérifiez que MONGODB_URI est configuré dans Vercel et que MongoDB Atlas autorise les connexions (Network Access)'
      },
      { status: 500 }
    );
  }
}

