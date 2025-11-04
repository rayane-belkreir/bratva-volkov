# 🚀 Guide de Déploiement - French Connection

## ⚠️ IMPORTANT : À propos de localStorage

**Ce site utilise localStorage pour stocker les données.** Cela signifie que :
- Chaque utilisateur verra ses propres données (pas de partage entre utilisateurs)
- Les données sont stockées dans le navigateur de chaque utilisateur
- Pour un vrai partage de données entre utilisateurs, il faudrait une base de données (Firebase, Supabase, etc.)

**Pour l'instant, le site fonctionnera mais chaque utilisateur aura ses propres missions, membres, etc.**

---

## 📋 ÉTAPE 1 : Préparer le projet Git

### Option A : Via GitHub Desktop (Recommandé)

1. **Téléchargez GitHub Desktop** : https://desktop.github.com/
2. Ouvrez GitHub Desktop
3. Cliquez sur **"File"** → **"Add Local Repository"**
4. Sélectionnez le dossier `FrenchConnexion`
5. En bas à gauche, tapez : `Initial commit`
6. Cliquez **"Commit to main"**
7. Cliquez **"Publish repository"** (en haut)
8. Nommez le repo : `FrenchConnexion` (ou un autre nom)
9. Choisissez si vous voulez le rendre public ou privé
10. Cliquez **"Publish Repository"**

### Option B : Via ligne de commande

```bash
# Dans le dossier FrenchConnexion
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/FrenchConnexion.git
git push -u origin main
```

---

## 📋 ÉTAPE 2 : Déployer sur Vercel

### 2.1 Créer un compte Vercel

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec votre compte **GitHub**

### 2.2 Importer le projet

1. Dans Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Vous verrez votre repository **"FrenchConnexion"** dans la liste
3. Cliquez sur **"Import"** à côté de "FrenchConnexion"

### 2.3 Configuration (Laissez tout par défaut)

- **Framework Preset** : Next.js ✅ (détecté automatiquement)
- **Root Directory** : `./` ✅
- **Build Command** : `npm run build` ✅
- **Output Directory** : `.next` ✅
- **Install Command** : `npm install` ✅

### 2.4 Variables d'environnement (Optionnel)

Si vous utilisez l'API d'email pour les candidatures, ajoutez dans **"Environment Variables"** :

- **Name** : `RESEND_API_KEY`
- **Value** : Votre clé API Resend
- **Environments** : ☑ Production, ☑ Preview, ☑ Development

OU

- **Name** : `SENDGRID_API_KEY`
- **Value** : Votre clé API SendGrid
- **Environments** : ☑ Production, ☑ Preview, ☑ Development

- **Name** : `RECIPIENT_EMAIL`
- **Value** : `radiachakir1982@gmail.com`
- **Environments** : ☑ Production, ☑ Preview, ☑ Development

### 2.5 Déployer

1. Cliquez sur **"Deploy"** en bas
2. Attendez 2-3 minutes pendant le build
3. ✅ **Votre site sera en ligne !**

---

## 🎉 Votre site est en ligne !

**Votre site sera accessible sur :**
👉 `https://french-connexion.vercel.app` (ou un nom similaire)

### 🔗 Partager le site

Vous pouvez maintenant partager le lien avec tous vos joueurs !

---

## 📋 ÉTAPE 3 : Mettre à jour le site

Chaque fois que vous modifiez le code :

1. **GitHub Desktop** :
   - Faites vos modifications
   - En bas à gauche, tapez un message (ex: "Ajout de nouvelles missions")
   - Cliquez **"Commit to main"**
   - Cliquez **"Push origin"** (en haut)

2. **Vercel** :
   - Le déploiement se fait **automatiquement** !
   - Vercel détecte les changements sur GitHub et redéploie automatiquement

---

## ⚠️ Limitations actuelles

### localStorage

Comme mentionné, le site utilise localStorage, donc :
- ❌ Chaque utilisateur voit ses propres données
- ❌ Les missions créées par un admin ne sont pas visibles par les autres utilisateurs
- ❌ Les messages du forum ne sont pas partagés entre utilisateurs

### Pour un vrai partage de données

Il faudrait migrer vers :
- **Firebase** (Firestore)
- **Supabase** (PostgreSQL)
- **MongoDB Atlas**
- Ou une autre base de données

**Cela nécessiterait une refonte du système de stockage.**

---

## 🔧 Problèmes courants

### Build échoue

1. Vérifiez les **logs** dans Vercel (section "Logs" du déploiement)
2. Vérifiez que toutes les dépendances sont dans `package.json`
3. Essayez de build localement : `npm run build`

### Erreur 404

- Vérifiez que toutes les routes sont dans le dossier `app/`
- Les routes doivent suivre la structure : `app/route/page.tsx`

### Variables d'environnement

- Assurez-vous qu'elles sont bien configurées dans Vercel
- Cliquez sur **"Redeploy"** après avoir ajouté des variables

---

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez les logs dans Vercel
2. Testez le build localement : `npm run build`
3. Vérifiez que Git est bien configuré

---

**Temps total de déploiement : ~5-10 minutes** 🚀

