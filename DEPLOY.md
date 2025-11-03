# 🚀 Guide de Déploiement — French Connexion

Ce guide vous explique comment déployer votre site Next.js en production.

## 📦 Option 1 : Vercel (Recommandé)

Vercel est la plateforme créée par l'équipe Next.js. C'est la solution la plus simple et optimale.

### Prérequis

1. **Compte GitHub, GitLab ou Bitbucket**
2. **Compte Vercel** (gratuit) : [vercel.com](https://vercel.com)

### Étapes

#### 1. Préparer votre code

```bash
# Assurez-vous que votre code est commité
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Vérifier le fichier .env.example

Vérifiez que toutes les variables nécessaires sont documentées dans `.env.example`.

#### 3. Se connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** (ou connectez-vous)
3. Connectez votre compte GitHub/GitLab/Bitbucket

#### 4. Importer votre projet

1. Cliquez sur **"Add New Project"**
2. Sélectionnez votre dépôt `FrenchConnexion`
3. Vercel détectera automatiquement Next.js

#### 5. Configurer les variables d'environnement

Dans la section **"Environment Variables"**, ajoutez :

```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_GATE_ENABLED=true
NEXT_PUBLIC_GATE_PASSPHRASE=ENTRER
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/VOTRE_WEBHOOK
```

#### 6. Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Votre site sera en ligne !

#### 7. Configurer un domaine personnalisé (Optionnel)

1. Dans votre projet Vercel, allez dans **"Settings"** → **"Domains"**
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS

---

## 📦 Option 2 : Netlify

### Étapes

1. **Créer un compte** sur [netlify.com](https://netlify.com)

2. **Connecter votre dépôt Git**

3. **Configurer le build** :
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Ajouter les variables d'environnement** (même que Vercel)

5. **Déployer**

---

## 📦 Option 3 : Railway

### Étapes

1. **Créer un compte** sur [railway.app](https://railway.app)

2. **Nouveau projet** → **"Deploy from GitHub repo"**

3. **Sélectionner votre dépôt**

4. **Configurer les variables d'environnement**

5. **Railway détectera automatiquement Next.js**

---

## 📦 Option 4 : VPS / Serveur dédié

### Prérequis

- Serveur Linux (Ubuntu recommandé)
- Node.js 18+ installé
- Nginx ou Apache
- Domaine configuré

### Étapes

#### 1. Sur votre serveur

```bash
# Cloner le projet
git clone https://github.com/votre-username/FrenchConnexion.git
cd FrenchConnexion

# Installer les dépendances
npm install

# Build le projet
npm run build

# Installer PM2 (gestionnaire de processus)
npm install -g pm2

# Lancer en production
pm2 start npm --name "french-connexion" -- start
pm2 save
pm2 startup
```

#### 2. Configurer Nginx

Créer `/etc/nginx/sites-available/french-connexion` :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/french-connexion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 3. Configurer SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

---

## 🔧 Configuration Avant Déploiement

### 1. Créer un fichier `.env.production`

```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_GATE_ENABLED=true
NEXT_PUBLIC_GATE_PASSPHRASE=VOTRE_PASSPHRASE_SECRETE
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/VOTRE_WEBHOOK
NODE_ENV=production
```

### 2. Vérifier les chemins d'images

Assurez-vous que tous les fichiers dans `/public` sont présents :
- `logo.svg`
- `bg-hero.jpg` (ou remplacé par un dégradé)
- `texture-grain.png`
- `texture-noise.png`
- `audio/ambiance.mp3`

### 3. Tester le build localement

```bash
npm run build
npm start
```

Visitez `http://localhost:3000` pour vérifier que tout fonctionne.

---

## 🎯 Recommandations pour la Production

### Performance

1. **Activer la compression** : Vercel/Netlify le font automatiquement
2. **Optimiser les images** : Utiliser `next/image` (déjà fait)
3. **CDN** : Actif automatiquement sur Vercel/Netlify

### Sécurité

1. **Ne jamais commit `.env`** dans Git
2. **Utiliser des passphrases fortes** pour le gate
3. **Limiter le taux de requêtes** sur l'API `/api/contact`

### Monitoring

1. **Analytics** : Ajouter Google Analytics ou Vercel Analytics
2. **Error Tracking** : Sentry pour les erreurs
3. **Uptime Monitoring** : UptimeRobot ou similaire

---

## 📝 Checklist de Déploiement

- [ ] Code commité et pushé sur Git
- [ ] Build testé localement (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] Fichiers assets présents dans `/public`
- [ ] Domaine configuré (si applicable)
- [ ] SSL/HTTPS activé
- [ ] Test de toutes les pages après déploiement
- [ ] Formulaire de contact testé
- [ ] Gate passphrase testé

---

## 🆘 Dépannage

### Erreur "Module not found"

Vérifiez que toutes les dépendances sont dans `package.json` :

```bash
npm install
npm run build
```

### Erreur de variables d'environnement

Assurez-vous que toutes les variables `NEXT_PUBLIC_*` sont configurées dans votre plateforme de déploiement.

### Pages blanches

Vérifiez les logs de déploiement pour les erreurs JavaScript.

### Build échoue

1. Vérifiez les logs de build
2. Testez localement : `npm run build`
3. Vérifiez qu'il n'y a pas d'erreurs TypeScript : `npm run typecheck`

---

## 🎉 Après le Déploiement

1. **Tester toutes les fonctionnalités** :
   - Navigation
   - Formulaire de contact
   - Gate passphrase
   - Toutes les pages

2. **Optimiser** :
   - Vérifier les performances avec Lighthouse
   - Tester sur mobile
   - Vérifier l'accessibilité

3. **Partager** :
   - Votre site est maintenant accessible au monde entier ! 🚀

---

**Besoin d'aide ?** Consultez les documentations officielles :
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

