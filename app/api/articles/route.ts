import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

// GET /api/articles - Récupérer tous les articles
export async function GET() {
  try {
    await connectDB();
    // Optimiser la requête : ne récupérer que les champs nécessaires
    const articles: any[] = await Article.find({})
      .select('title date author category content locked requiredRank')
      .sort({ date: -1 })
      .lean()
      .limit(100); // Limiter à 100 articles max
    
    const formattedArticles = articles.map((article: any) => ({
      ...article,
      id: article._id.toString(),
      // Créer un excerpt si pas présent
      excerpt: article.excerpt || article.content?.substring(0, 150) || '',
    }));
    
    // Ajouter des headers de cache pour améliorer les performances
    return NextResponse.json(formattedArticles, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
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

