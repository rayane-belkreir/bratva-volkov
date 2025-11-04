"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Calendar, User, FileText, ArrowLeft, Lock } from "lucide-react";
import { getArticles } from "@/lib/data";
import { Article } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { getTierLevel, canAccessLevel } from "@/lib/hierarchy";
import Link from "next/link";

export default function DossierDetailPage() {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const slug = params.slug as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      const loadedArticles = await getArticles();
      setArticles(loadedArticles);
      const foundArticle = loadedArticles.find(a => a.id.toString() === slug);
      setArticle(foundArticle || null);
    };
    loadArticles();
  }, [slug]);

  // Formater la date pour l'affichage (ne pas dépasser 1990)
  const formatArticleDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      // S'assurer que l'année ne dépasse pas 1990
      if (year > 1990) {
        // Si la date dépasse 1990, on la remplace par 1990
        const newDate = dateString.split('-').map((part, index) => {
          if (index === 0) return '1990';
          return part;
        }).join('-');
        return new Date(newDate).toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      return new Date(dateString).toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center">
        <GlareCard className="aged-paper text-center">
          <h2 className="text-2xl font-bold text-patina-gold mb-4 vintage-text">
            Dossier introuvable
          </h2>
          <p className="text-vintage-cream/80 mb-6">
            Le dossier que vous recherchez n'existe pas.
          </p>
          <Link
            href="/dossiers"
            className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider inline-block"
          >
            Retour aux dossiers
          </Link>
        </GlareCard>
      </div>
    );
  }

  const canAccessArticle = (article: Article) => {
    if (!article.locked) return true;
    if (!isAuthenticated || !user) return false;
    
    // Utiliser la hiérarchie pour vérifier l'accès
    const userLevel = getTierLevel(user.role);
    const requiredLevel = article.requiredRank ? getTierLevel(article.requiredRank) : 0;
    
    return canAccessLevel(userLevel, requiredLevel);
  };

  const accessible = canAccessArticle(article);

  if (!accessible) {
    return (
      <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center">
        <GlareCard className="aged-paper text-center">
          <Lock className="w-16 h-16 text-blood-red mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-blood-red mb-4 vintage-text">
            Accès Refusé
          </h2>
          <p className="text-vintage-cream/80 mb-6">
            Ce dossier est classifié. Vous devez être au rang {article.requiredRank} ou supérieur pour y accéder.
          </p>
          <Link
            href="/dossiers"
            className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider inline-block"
          >
            Retour aux dossiers
          </Link>
        </GlareCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/dossiers"
            className="inline-flex items-center gap-2 text-patina-gold hover:text-patina-gold-light transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider">Retour aux dossiers</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <GlareCard className="aged-paper">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-patina-gold vintage-text">
                  {article.title}
                </h1>
                {article.locked && (
                  <span className="px-3 py-1 bg-blood-red/20 border border-blood-red/40 text-blood-red text-xs font-bold uppercase">
                    Classifié
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-vintage-cream/70 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-patina-gold" />
                  <span>{formatArticleDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-patina-gold" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-patina-gold" />
                  <span className="uppercase tracking-wider">{article.category}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-patina-gold/20 pt-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-vintage-cream/90 leading-relaxed text-lg whitespace-pre-line">
                  {article.content}
                </p>
              </div>
            </div>
          </GlareCard>
        </motion.div>
      </div>
    </div>
  );
}
