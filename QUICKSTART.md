# 🚀 Guide de Démarrage Rapide

## Installation en 3 étapes

### 1. Installation des dépendances

```bash
pnpm install
# ou
npm install
```

### 2. Configuration

Créez un fichier `.env` à la racine :

```env
NEXT_PUBLIC_GATE_ENABLED=true
NEXT_PUBLIC_GATE_PASSPHRASE=ENTRER
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/VOTRE_WEBHOOK
```

### 3. Lancement

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📝 Premiers Pas

### Modifier le contenu

- **Organisation** : `content/data/org.json`
- **Zones** : `content/data/zones.json`
- **Affaires** : `content/data/business.json`
- **Articles** : `content/posts/*.mdx`

### Désactiver le portail

Dans `.env`, mettez :
```env
NEXT_PUBLIC_GATE_ENABLED=false
```

### Personnaliser les couleurs

Éditez `tailwind.config.ts` et modifiez les valeurs des couleurs dans `theme.extend.colors`.

## 🎨 Assets à Remplacer

Les fichiers suivants sont des placeholders à remplacer par vos propres assets :

- `public/bg-hero.jpg` - Image hero (1920x1080 recommandé)
- `public/texture-grain.png` - Texture de grain
- `public/texture-noise.png` - Texture de bruit
- `public/audio/ambiance.mp3` - Piste audio jazz/noir
- `public/logo.svg` - Logo de l'organisation (peut être personnalisé)

## 📦 Build de Production

```bash
pnpm build
pnpm start
```

## 🔍 Vérification

- ✅ Toutes les pages chargent
- ✅ Navigation fonctionne
- ✅ Portail passphrase opérationnel (si activé)
- ✅ Formulaire de contact fonctionne
- ✅ Articles MDX s'affichent correctement

---

**Besoin d'aide ?** Consultez le README.md complet.

