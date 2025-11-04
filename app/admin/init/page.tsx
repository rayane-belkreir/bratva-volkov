"use client";

import { useState } from 'react';
import { GlareCard } from '@/components/GlareCard';
import { Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function InitPage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInit = async () => {
    setIsInitializing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/init', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Erreur lors de l\'initialisation');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-black aged-paper flex items-center justify-center p-4">
      <GlareCard className="max-w-2xl w-full">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Database className="h-8 w-8 text-patina-gold" />
            <h1 className="text-3xl font-bold text-patina-gold vintage-text">
              Initialisation de la Base de Données
            </h1>
          </div>

          <p className="text-vintage-cream/80 mb-6">
            Cette page permet d'initialiser la base de données MongoDB avec les données par défaut :
          </p>

          <ul className="list-disc list-inside text-vintage-cream/70 mb-6 space-y-2">
            <li>4 comptes utilisateurs (admin, antoine, elise, marc)</li>
            <li>4 missions/contrats par défaut</li>
            <li>3 articles pour le journal</li>
          </ul>

          <button
            onClick={handleInit}
            disabled={isInitializing}
            className="w-full bg-blood-red hover:bg-blood-red-dark text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isInitializing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Initialisation en cours...
              </>
            ) : (
              <>
                <Database className="h-5 w-5" />
                Initialiser la Base de Données
              </>
            )}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="text-green-400 font-bold">Initialisation réussie !</h3>
              </div>
              <p className="text-vintage-cream/80 mb-2">{result.message}</p>
              
              {result.created && (
                <div className="mt-4 space-y-2">
                  {result.created.users && result.created.users.length > 0 && (
                    <div>
                      <p className="text-patina-gold font-semibold">Utilisateurs créés :</p>
                      <p className="text-vintage-cream/70">{result.created.users.join(', ')}</p>
                    </div>
                  )}
                  {result.created.contracts && result.created.contracts.length > 0 && (
                    <div>
                      <p className="text-patina-gold font-semibold">Contrats créés :</p>
                      <p className="text-vintage-cream/70">{result.created.contracts.join(', ')}</p>
                    </div>
                  )}
                  {result.created.articles && result.created.articles.length > 0 && (
                    <div>
                      <p className="text-patina-gold font-semibold">Articles créés :</p>
                      <p className="text-vintage-cream/70">{result.created.articles.join(', ')}</p>
                    </div>
                  )}
                  {result.alreadyInitialized && (
                    <p className="text-vintage-cream/70 italic">
                      Toutes les données existaient déjà. Aucune nouvelle donnée créée.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-vintage-cream/20">
                <p className="text-vintage-cream/80 mb-2">
                  Vous pouvez maintenant vous connecter avec :
                </p>
                <ul className="list-disc list-inside text-vintage-cream/70 space-y-1">
                  <li><strong>admin</strong> / <strong>admin123</strong> (Admin)</li>
                  <li><strong>antoine</strong> / <strong>admin123</strong> (Pakhan)</li>
                  <li><strong>elise</strong> / <strong>admin123</strong> (Sovetnik)</li>
                  <li><strong>marc</strong> / <strong>admin123</strong> (Avtoritet)</li>
                </ul>
                <a
                  href="/login"
                  className="mt-4 inline-block bg-patina-gold hover:bg-patina-gold-light text-charcoal-black font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Aller à la page de connexion
                </a>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <h3 className="text-red-400 font-bold">Erreur</h3>
              </div>
              <p className="text-vintage-cream/80 mb-2">{error}</p>
              <div className="mt-4 p-3 bg-charcoal-black/50 rounded border border-vintage-cream/10">
                <p className="text-sm text-vintage-cream/70 mb-2">
                  <strong>Vérifiez :</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-vintage-cream/60 space-y-1">
                  <li>La variable <code className="bg-charcoal-black px-1 rounded">MONGODB_URI</code> est configurée dans Vercel</li>
                  <li>MongoDB Atlas Network Access autorise 0.0.0.0/0</li>
                  <li>La chaîne de connexion MongoDB est correcte</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </GlareCard>
    </div>
  );
}

