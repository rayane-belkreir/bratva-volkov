import dotenv from 'dotenv';
import { resolve } from 'path';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Contract from '@/models/Contract';
import Article from '@/models/Article';
import bcrypt from 'bcryptjs';

// Charger .env.local explicitement
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function initData() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env.local');
      console.error('Please create .env.local with MONGODB_URI=mongodb+srv://...');
      process.exit(1);
    }
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

    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.username}`);
      } else {
        console.log(`⚠️  User already exists: ${userData.username}`);
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

    for (const contractData of defaultContracts) {
      const existingContract = await Contract.findOne({ title: contractData.title });
      if (!existingContract) {
        await Contract.create(contractData);
        console.log(`✅ Created contract: ${contractData.title}`);
      } else {
        console.log(`⚠️  Contract already exists: ${contractData.title}`);
      }
    }

    // Créer les articles par défaut (si nécessaire)
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      console.log('⚠️  No articles found. Articles will be created on first use.');
    }

    console.log('\n✅ Initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing data:', error);
    process.exit(1);
  }
}

initData();

