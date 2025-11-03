# 🔥 French Connexion — RP Universe

Site web Next.js 15 + TypeScript au style mafieux, luxueux et intimidant pour un serveur GTA RP.

## 🎯 Mission

Le site met en scène **La French Connexion** (univers RP) et dégage une **aura de puissance** : esthétique sombre, dorures subtiles, fumée, grain argentique, micro-interactions cinématiques.

## 🧱 Stack Technique

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styles**: Tailwind CSS + CSS variables
- **UI**: shadcn/ui + lucide-react
- **Animations**: framer-motion
- **Polices**: Cinzel (titres), Inter (texte)
- **Contenu**: MDX pour les articles

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- pnpm (recommandé) ou npm/yarn

### Étapes

1. **Cloner et installer les dépendances**

```bash
pnpm install
# ou
npm install
```

2. **Configurer les variables d'environnement**

```bash
cp .env.example .env
```

Éditez `.env` et configurez :
- `NEXT_PUBLIC_GATE_PASSPHRASE` : La passphrase pour accéder au site (défaut: "ENTRER")
- `NEXT_PUBLIC_GATE_ENABLED` : Activer/désactiver le portail (true/false)
- `DISCORD_WEBHOOK_URL` : URL du webhook Discord pour les messages de contact (optionnel)

3. **Lancer le serveur de développement**

```bash
pnpm dev
# ou
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
app/
  layout.tsx              # Layout principal
  page.tsx                # Page d'accueil (Hero)
  (sections)/
    organisation/         # Arborescence organisation
    territoire/           # Carte interactive
    affaires/            # Vitrine business
    code/                # Code d'honneur
    dossiers/            # Articles MDX
    contact/             # Formulaire de contact
    gate/                # Portail passphrase
  api/contact/route.ts   # API route contact

components/
  Header.tsx             # Navigation
  Footer.tsx             # Pied de page
  AuraCanvas.tsx         # Effet fumée/particules
  GlareCard.tsx          # Cartes avec reflets
  OrgTree.tsx            # Arbre hiérarchique
  TerritoryMap.tsx       # Carte zones
  Timeline.tsx           # Frise chronologique
  SoundToggle.tsx        # Toggle audio
  PasswordForm.tsx       # Formulaire passphrase
  MDXComponents.tsx      # Composants MDX

content/
  posts/*.mdx            # Articles RP
  data/
    org.json             # Structure hiérarchique
    zones.json           # Zones & territoires
    business.json        # Activités RP

public/
  logo.svg               # Emblème
  bg-hero.jpg            # Image hero
  audio/ambiance.mp3     # Piste audio
```

## ✏️ Éditer le Contenu

### Organisation

Éditez `content/data/org.json` pour modifier la structure hiérarchique :

```json
{
  "boss": { "name": "Parrain", "aka": "..." },
  "capos": [...],
  "soldiers": [...]
}
```

### Zones

Éditez `content/data/zones.json` pour les territoires :

```json
[
  {
    "id": "zone-1",
    "name": "Zone Nord",
    "status": "controlled",
    "income": 45000,
    "note": "..."
  }
]
```

### Affaires

Éditez `content/data/business.json` pour les activités :

```json
[
  {
    "name": "Logistique",
    "cover": "Transport SARL",
    "description": "...",
    "risk": "low",
    "contact": "..."
  }
]
```

### Articles (MDX)

Ajoutez des fichiers `.mdx` dans `content/posts/` avec le frontmatter :

```mdx
---
title: "Titre"
date: "2024-01-15"
excerpt: "Description"
---

Contenu de l'article...
```

Composants MDX disponibles :
- `<Avertissement>...</Avertissement>`
- `<Note>...</Note>`
- `<Encadré>...</Encadré>`

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :
- `gold` : #C1A35F
- `burgundy` : #3A0D12
- `anthracite` : #121212
- `off-black` : #0B0B0B
- `cream-white` : #EDE8D5

### Styles Globaux

Éditez `styles/globals.css` pour ajuster les effets visuels.

## 🧪 Scripts Disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linter ESLint
pnpm typecheck    # Vérification TypeScript
pnpm analyze      # Analyse du bundle
```

## 📦 Déploiement

### Vercel (Recommandé)

1. Connectez votre dépôt GitHub/GitLab à Vercel
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement

### Autres Plateformes

Le projet est compatible avec toute plateforme supportant Next.js :
- Netlify
- Railway
- AWS Amplify
- etc.

## 🔐 Sécurité

- Le portail passphrase utilise un cookie (`fc_pass`) valable 24h
- Les messages de contact sont chiffrés avant envoi (simulation)
- Aucune donnée sensible n'est stockée côté client

## ⚠️ Disclaimer

Le site représente un **univers de jeu de rôle fictif**. Aucune incitation ni apologie d'activités illégales. Tout le contenu est purement **fictionnel** et destiné à un usage **RP (Roleplay)**.

## 🐛 Problèmes Connus

- Les assets images (bg-hero.jpg, textures) sont des placeholders — remplacez-les par vos propres images
- Le fichier audio ambiance.mp3 est un placeholder — ajoutez une vraie piste jazz/noir

## 📝 Licence

Ce projet est privé et destiné à un usage interne.

## 🤝 Contribution

Pour toute amélioration ou suggestion, contactez les administrateurs.

---

**French Connexion** — *On ne négocie pas l'influence. On l'impose.*

