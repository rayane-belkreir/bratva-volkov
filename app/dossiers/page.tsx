"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlareCard } from "@/components/GlareCard";
import { FileText, Calendar, User, Lock, Unlock } from "lucide-react";
import { getArticles } from "@/lib/data";
import { Article } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { getTierLevel, canAccessLevel } from "@/lib/hierarchy";
import Link from "next/link";

export default function DossiersPage() {
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedArticles = await getArticles();
        setArticles(loadedArticles);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Erreur lors du chargement des articles');
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

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
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  const canAccessArticle = (article: Article) => {
    if (!article.locked) return true;
    if (!isAuthenticated || !user) return false;
    
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
            Dossiers
          </h1>
          <p className="text-xl text-vintage-cream/80 max-w-2xl mx-auto">
            Archives et chroniques de la famille. Les événements qui ont façonné notre histoire.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-anthracite/50 rounded-lg p-6 border border-patina-gold/20 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-patina-gold/20 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-patina-gold/20 rounded w-3/4"></div>
                      <div className="h-4 bg-vintage-cream/10 rounded w-1/2"></div>
                      <div className="h-4 bg-vintage-cream/10 rounded w-full"></div>
                      <div className="h-4 bg-vintage-cream/10 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <GlareCard className="aged-paper border-2 border-blood-red/40">
              <div className="text-center p-8">
                <h3 className="text-xl font-bold text-blood-red mb-4">Erreur de chargement</h3>
                <p className="text-vintage-cream/80 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    getArticles()
                      .then(setArticles)
                      .catch((err) => {
                        console.error('Error loading articles:', err);
                        setError('Erreur lors du chargement des articles');
                      })
                      .finally(() => setLoading(false));
                  }}
                  className="px-6 py-3 bg-patina-gold text-charcoal-black hover:bg-patina-gold-light transition-colors font-bold uppercase tracking-wider"
                >
                  Réessayer
                </button>
              </div>
            </GlareCard>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {articles.length === 0 ? (
                <GlareCard className="aged-paper text-center p-8">
                  <p className="text-vintage-cream/80">Aucun article disponible pour le moment.</p>
                </GlareCard>
              ) : (
                articles.map((article, index) => {
              const accessible = canAccessArticle(article);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareCard 
                    className={`aged-paper ${!accessible ? "opacity-60" : ""}`}
                    href={accessible ? `/dossiers/${article.id}` : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-patina-gold/20 rounded-full flex items-center justify-center border-2 border-patina-gold/40 flex-shrink-0 ${!accessible ? "opacity-50" : ""}`}>
                        {article.locked ? (
                          <Lock className="w-6 h-6 text-blood-red" />
                        ) : (
                          <Unlock className="w-6 h-6 text-patina-gold" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-patina-gold vintage-text">
                            {article.title}
                          </h3>
                          {article.locked && !accessible && (
                            <span className="px-3 py-1 bg-blood-red/20 border border-blood-red/40 text-blood-red text-xs font-bold uppercase">
                              Accès Restreint
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-vintage-cream/70 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatArticleDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="uppercase tracking-wider">{article.category}</span>
                          </div>
                        </div>
                        <p className="text-vintage-cream/80 leading-relaxed">
                          {article.content.substring(0, 150)}...
                        </p>
                        {accessible && (
                          <Link
                            href={`/dossiers/${article.id}`}
                            className="inline-flex items-center gap-2 mt-4 text-patina-gold hover:text-patina-gold-light transition-colors text-sm font-bold uppercase tracking-wider"
                          >
                            Lire la suite →
                          </Link>
                        )}
                        {!accessible && (
                          <p className="text-blood-red/70 text-sm mt-4 italic">
                            Vous devez être au rang {article.requiredRank} ou supérieur pour accéder à ce dossier.
                          </p>
                        )}
                      </div>
                    </div>
                  </GlareCard>
                </motion.div>
              );
            }))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
