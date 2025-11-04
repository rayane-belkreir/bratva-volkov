# French Connection - Site RP Mafia

Site web immersif pour un serveur RP GTA centré sur une mafia française appelée "French Connection". Le site reflète l'esthétique sombre, vintage et mafieuse des années 1930 à 1970.

## 🚀 Fonctionnalités

### ✅ Authentification
- **Connexion/Inscription** : Système complet avec localStorage
- **Gestion de session** : Persistance de l'utilisateur connecté
- **Rôles** : Soldat, Capo, Consigliere, Parrain, Admin

### ✅ Pages Fonctionnelles

1. **Page d'accueil** (`/`)
   - Logo animé "French Connection"
   - Slogan "Loyalty. Power. Silence."
   - Boutons CTA fonctionnels

2. **Lore & Histoire** (`/lore`)
   - Timeline interactive (1930 → 2025)
   - Portraits des fondateurs
   - Carte de Marseille (placeholder)
   - Documents secrets avec restrictions d'accès

3. **Fiches Personnages** (`/personnages`)
   - Dossiers criminels avec statistiques RP
   - Influence, loyauté, dangerosité
   - Historique des actions

4. **Tableau de Missions** (`/missions`)
   - ✅ **FONCTIONNEL** : Accepter/Refuser des missions
   - ✅ **FONCTIONNEL** : Compléter des missions et recevoir récompenses
   - Récompenses : argent, réputation, objets
   - Statuts : disponible, en cours, terminée, refusée

5. **Forum RP** (`/forum`)
   - ✅ **FONCTIONNEL** : Envoyer des messages
   - ✅ **FONCTIONNEL** : Messages persistants dans localStorage
   - Canaux : Discussions RP, Planification, Recrutement, Messages Privés
   - Chiffrement fictif pour messages privés

6. **Système de Réputation** (`/reputation`)
   - ✅ **FONCTIONNEL** : Affichage de la réputation de l'utilisateur connecté
   - Paliers : Soldat (0-100), Capo (100-250), Consigliere (250-500), Parrain (500-1000)
   - Barre de progression dynamique
   - Déblocage automatique selon la réputation

7. **Boutique RP** (`/boutique`)
   - ✅ **FONCTIONNEL** : Achat d'objets avec argent ou réputation
   - ✅ **FONCTIONNEL** : Vérification des fonds
   - ✅ **FONCTIONNEL** : Mise à jour automatique de l'argent/réputation
   - Filtres par catégorie
   - Affichage du solde utilisateur

8. **Journal RP** (`/journal`)
   - ✅ **FONCTIONNEL** : Articles avec restrictions d'accès selon le rang
   - Articles classifiés accessibles selon le rang
   - Style journal vintage

9. **Panel Admin** (`/admin`)
   - ✅ **FONCTIONNEL** : Accès restreint (Admin/Parrain uniquement)
   - ✅ **FONCTIONNEL** : Statistiques en temps réel
   - ✅ **FONCTIONNEL** : Liste des membres avec leurs données
   - ✅ **FONCTIONNEL** : Liste des missions actives
   - Gestion des membres et missions

10. **Rejoindre le RP** (`/join`)
    - ✅ **FONCTIONNEL** : Formulaire de candidature
    - ✅ **FONCTIONNEL** : Sauvegarde dans localStorage

11. **Connexion** (`/login`)
    - ✅ **FONCTIONNEL** : Connexion/Inscription
    - ✅ **FONCTIONNEL** : Gestion des erreurs

## 📦 Technologies

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icônes)
- **localStorage** (persistance des données)

## 🎨 Style Visuel

- **Palette** : Noir charbon, gris acier, rouge sang, doré patiné
- **Typographie** : Cinzel (serif vintage)
- **Effets** : Fumée animée, texture granuleuse, papier vieilli
- **Curseur** : Revolver personnalisé

## 🗄️ Stockage des Données

Toutes les données sont stockées dans **localStorage** :
- `fc_user` : Utilisateur connecté
- `fc_users` : Liste des utilisateurs
- `fc_contracts` : Missions/contrats
- `fc_messages` : Messages du forum
- `fc_articles` : Articles du journal
- `fc_applications` : Candidatures

## 👤 Comptes par Défaut

Pour tester le système, utilisez ces comptes :

- **Parrain** : `antoine` / `admin123`
- **Consigliere** : `elise` / `admin123`
- **Capo** : `marc` / `admin123`

Ou créez votre propre compte via l'inscription.

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start
```

## 📝 Notes

- Les données sont stockées dans localStorage (navigateur)
- Pour un déploiement en production, connectez un backend (Firebase, Supabase, etc.)
- Les mots de passe ne sont pas hashés (à ajouter en production)
- Les images sont des placeholders (à remplacer par de vraies images)

## 🎯 Fonctionnalités Implémentées

✅ Authentification complète
✅ Système de missions fonctionnel
✅ Boutique avec achat fonctionnel
✅ Forum avec messages persistants
✅ Système de réputation dynamique
✅ Journal avec restrictions d'accès
✅ Panel admin avec gestion des membres
✅ Formulaires de candidature
✅ Navigation conditionnelle selon l'état de connexion
✅ Mise à jour en temps réel des données utilisateur

## 🔄 Prochaines Étapes (Optionnel)

- [ ] Connecter un backend (Firebase/Supabase)
- [ ] Hashage des mots de passe
- [ ] Système de notifications
- [ ] Chat en temps réel
- [ ] Upload d'images
- [ ] API REST pour les données

---

**French Connection** - Loyalty. Power. Silence.
