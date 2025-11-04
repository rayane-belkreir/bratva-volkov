import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

// GET /api/articles - Récupérer tous les articles
export async function GET() {
  try {
    await connectDB();
    const articles: any[] = await Article.find({}).sort({ date: -1 }).lean();
    const formattedArticles = articles.map((article: any) => ({
      ...article,
      id: article._id.toString(),
    }));
    return NextResponse.json(formattedArticles);
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    
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
      { error: 'Erreur lors de la récupération des articles', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    );
  }
}

