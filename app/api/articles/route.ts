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
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
}

