# 🔱 French Connection - Site RP Immersif

## 🎭 Description

Site web immersif pour un serveur RP GTA centré sur une mafia française "French Connection". Le site reflète l'esthétique sombre, vintage et mafieuse des années 1930 à 1970, avec une ambiance inspirée des films noirs, du crime organisé et du style gangster français.

## 🎨 Style Visuel

### Palette de Couleurs
- **Noir charbon** : `#0D0D0D`
- **Gris acier** : `#4A5568`
- **Rouge sang** : `#8B0000`
- **Doré patiné** : `#C9A961`

### Typographie
- **Police principale** : Cinzel (serif vintage style journal)
- **Police secondaire** : Inter (sans-serif moderne)
- Effets de texte : ombres, grain, vintage-serif

### Effets Visuels
- Fumée animée en overlay
- Bruit de fond subtil (texture grain)
- Transitions douces
- Fond : textures murales, ambiance nocturne
- Curseur personnalisé (revolver) - à créer

## 📌 Structure du Site

### Pages Principales

1. **Page d'accueil** (`/`)
   - Logo "French Connection" animé
   - Slogan : "Loyalty. Power. Silence."
   - Boutons :
     - 🎭 Rejoindre le RP
     - 📜 Lire le Lore
     - 🔐 Connexion / Inscription

2. **Page Lore & Histoire** (`/lore`)
   - Timeline interactive : 1930 → 1970 → 2025
   - Portraits des fondateurs avec fiches détaillées
   - Carte de Marseille avec zones d'influence
   - Documents secrets à débloquer

3. **Fiches Personnages** (`/personnages`)
   - UI style dossier criminel
   - Photo du personnage
   - Nom, alias, rôle dans la mafia
   - Statistiques RP : influence, loyauté, dangerosité
   - Historique des actions RP
   - Bouton "Modifier" pour les admins ou le joueur

4. **Tableau de missions** (`/missions`)
   - Liste des contrats en cours (vols, extorsions, assassinats)
   - UI style tableau noir avec punaises et fiches
   - Bouton "Accepter" ou "Refuser" avec conséquences RP
   - Récompenses affichées (argent, réputation, objets)

5. **Forum RP / Messagerie** (`/forum`)
   - UI style vieux téléphone ou machine à écrire
   - Canaux : Discussions RP, Planification, Recrutement
   - Système de messagerie privée avec cryptage fictif

6. **Système de réputation** (`/reputation`)
   - Barre de réputation avec paliers :
     - **Soldat** (0-200 RP)
     - **Capo** (200-500 RP)
     - **Consigliere** (500-800 RP)
     - **Parrain** (800-1000 RP)
   - Actions RP influencent la réputation
   - UI avec médailles, insignes et effets visuels

7. **Boutique RP** (`/boutique`)
   - Objets RP : armes, costumes, véhicules, documents
   - UI style marché noir : ambiance sombre, objets en vitrine
   - Paiement fictif avec monnaie RP ou points de réputation

8. **Journal RP / Archives** (`/journal`)
   - UI style journal vintage avec coupures de presse
   - Articles RP sur les événements du serveur
   - Dossiers classés accessibles selon le rang

9. **Connexion / Inscription** (`/login`)
   - Formulaire de connexion
   - Formulaire d'inscription
   - Style vintage et mafieux

## 🎯 Comportement & Animations

- **Curseur personnalisé** : revolver stylisé (à créer)
- **Hover effects** : lumière tamisée, effet de loupe, bruit de papier
- **Transitions** : fondu, glissement latéral, zoom progressif
- **Responsive design** : adapté mobile et desktop

## 📂 Technologies Utilisées

- **Frontend** : Next.js 15 (App Router)
- **UI** : TailwindCSS + CSS Variables
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Typographie** : Google Fonts (Cinzel, Inter)

## 🚀 Installation & Déploiement

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Production
npm start
```

## 📝 Notes

- Le curseur personnalisé nécessite un fichier image `/public/cursor-revolver.png`
- Les textures de fumée nécessitent `/public/texture-smoke.png`
- Les images de personnages, articles, etc. sont des placeholders à remplacer
- Le système de réputation et les missions sont actuellement statiques (à connecter à une base de données)

## 🎨 Classes CSS Personnalisées

- `.vintage-paper` : Effet de papier usé
- `.vintage-border` : Bordure style vintage
- `.aged-paper` : Papier vieilli avec dégradés
- `.vintage-serif` : Typographie vintage avec ombres
- `.smoke-overlay` : Overlay de fumée animé
- `.noir-film` : Fond style film noir

## 📦 Structure des Fichiers

```
app/
├── page.tsx              # Page d'accueil
├── lore/                 # Lore & Histoire
├── personnages/          # Fiches personnages
├── missions/             # Tableau de missions
├── reputation/           # Système de réputation
├── forum/                # Forum RP / Messagerie
├── boutique/             # Boutique RP
├── journal/              # Journal RP / Archives
├── login/                # Connexion / Inscription
└── contact/              # Contact

components/
├── GlareCard.tsx         # Carte avec effets de brillance
├── SectionHeader.tsx     # En-tête de section
└── ui/                   # Composants UI (Input, Button, etc.)
```

---

**Site créé avec passion pour l'immersion RP** 🔱


