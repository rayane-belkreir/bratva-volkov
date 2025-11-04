"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { Newspaper, Calendar, Lock, FileText } from "lucide-react";
import { getArticles } from "@/lib/data";
import { Article } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { getTierLevel, canAccessLevel } from "@/lib/hierarchy";
import { useDataSync } from "@/hooks/useDataSync";

export default function JournalPage() {
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);

  const refreshArticles = async () => {
    const articles = await getArticles();
    setArticles(articles);
  };

  useEffect(() => {
    refreshArticles();
  }, []);

  // Synchroniser les articles automatiquement
  useDataSync(async () => {
    const articles = await getArticles();
    setArticles(articles);
  }, 2000);

  // Formater la date pour l'affichage (ne pas dépasser 1990)
  const formatArticleDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      // S'assurer que l'année ne dépasse pas 1990
      if (year > 1990) {
        // Si la date dépasse 1990, on la remplace par 1990
        return dateString.split('-').map((part, index) => {
          if (index === 0) return '1990';
          return part;
        }).join('-');
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  const canAccess = (article: Article) => {
    // Tous les articles sont visibles, mais le contenu peut être restreint
    if (!article.locked) return true;
    if (!isAuthenticated || !user) return false;
    
    // Admin peut tout voir
    if (user.role === 'Admin') return true;
    
    // Utiliser la hiérarchie pour vérifier l'accès
    const userLevel = getTierLevel(user.role);
    const requiredLevel = article.requiredRank ? getTierLevel(article.requiredRank) : 0;
    
    return canAccessLevel(userLevel, requiredLevel);
  };

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold vintage-text text-patina-gold mb-4">
            Journal RP
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Archives et coupures de presse. Articles RP sur les événements du serveur.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {articles.map((article, index) => {
              const hasAccess = canAccess(article);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlareCard className={`aged-paper ${!hasAccess ? "opacity-60" : ""}`}>
                    <div className="border-b-2 border-blood-red/30 pb-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Newspaper className="w-6 h-6 text-patina-gold" />
                          <h2 className="text-2xl font-bold text-vintage-cream vintage-text">
                            {article.title}
                          </h2>
                          {article.locked && (
                            <Lock className="w-5 h-5 text-blood-red" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-vintage-cream/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-patina-gold" />
                          <span>{formatArticleDate(article.date)}</span>
                        </div>
                        <span className="text-blood-red">•</span>
                        <span>{article.author}</span>
                        <span className="text-blood-red">•</span>
                        <span className="text-patina-gold/70 uppercase tracking-wider">
                          {article.category}
                        </span>
                        {article.locked && article.requiredRank && (
                          <>
                            <span className="text-blood-red">•</span>
                            <span className="text-blood-red text-xs">
                              Rang requis: {article.requiredRank}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <p className="text-vintage-cream/80 leading-relaxed font-serif">
                        {!hasAccess ? (
                          <span className="opacity-50 italic">
                            Contenu classifié. Accès restreint. Rang requis: {article.requiredRank}
                          </span>
                        ) : (
                          article.content
                        )}
                      </p>
                    </div>

                    {hasAccess && (
                      <div className="mt-4 pt-4 border-t border-patina-gold/20">
                        <button className="text-sm text-patina-gold hover:text-patina-gold-light transition-colors font-bold uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Lire la suite
                        </button>
                      </div>
                    )}
                  </GlareCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
