# 🚀 DÉPLOIEMENT BRATVA VOLKOV SUR VERCEL

## ✅ Votre projet est PRÊT !

Le build fonctionne, MongoDB Atlas est configuré. Il ne reste que quelques étapes simples.

---

## 📋 ÉTAPE 1 : Préparer le code sur GitHub

### Option A : Avec GitHub Desktop (Recommandé)

1. **Ouvrez GitHub Desktop**
2. **Glissez-déposez** ce dossier `FrenchConnexion` dans GitHub Desktop
   - OU cliquez sur **"Add an Existing Repository from your local drive..."**
   - Sélectionnez `C:\Users\BELKREIR\Documents\FrenchConnexion`
3. GitHub Desktop va détecter le projet
4. **En bas à gauche**, tapez : `Initial commit - Bratva Volkov`
5. Cliquez **"Commit to main"**
6. Cliquez **"Publish repository"** (en haut)
7. Nom : `bratva-volkov` (ou `FrenchConnexion`)
   - Décochez "Keep this code private" (ou gardez-le selon votre préférence)
8. Cliquez **"Publish Repository"**

✅ **C'est fait ! Votre code est sur GitHub**

### Option B : Avec Git en ligne de commande

```bash
git init
git add .
git commit -m "Initial commit - Bratva Volkov"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/bratva-volkov.git
git push -u origin main
```

---

## 📋 ÉTAPE 2 : Déployer sur Vercel

### 1. Créer un compte Vercel

1. Allez sur **https://vercel.com**
2. Cliquez **"Sign Up"**
3. Connectez-vous avec votre compte **GitHub** (recommandé)

### 2. Importer votre projet

1. Dans Vercel, cliquez **"Add New..."** → **"Project"**
2. Dans la section **"Import Git Repository"**, vous verrez votre projet GitHub
3. Cliquez sur **"Import"** à côté de votre projet
4. **Configuration** (laissez tout par défaut) :
   - Framework Preset : **Next.js** ✅
   - Build Command : `npm run build` ✅
   - Output Directory : `.next` ✅
   - Install Command : `npm install` ✅
5. **NE cliquez PAS encore sur "Deploy"** ! On doit d'abord configurer les variables d'environnement.

---

## 📋 ÉTAPE 3 : Configurer les variables d'environnement

**Dans Vercel (avant le premier déploiement) :**

1. Sur la page d'import, cliquez sur **"Environment Variables"** (en bas)
2. **Ajoutez ces variables** une par une :

### Variable 1 : MongoDB (OBLIGATOIRE)
- **Name** : `MONGODB_URI`
- **Value** : Votre chaîne de connexion MongoDB Atlas
  ```
  mongodb+srv://rayanebelkreir_db_user:UHXqQt4Lk5eIHT8F@cluster0.vpfynqf.mongodb.net/frenchconnection?retryWrites=true&w=majority
  ```
  (Remplacez par votre vraie chaîne de connexion)
- **Environments** : Cochez ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 2 : Email pour candidatures (OBLIGATOIRE)
- **Name** : `RECIPIENT_EMAIL`
- **Value** : `radiachakir1982@gmail.com`
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 3 : Resend API Key (Optionnel - pour emails)
- **Name** : `RESEND_API_KEY`
- **Value** : Votre clé API Resend (si vous en avez une)
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

**OU**

### Variable 3bis : SendGrid API Key (Optionnel - pour emails)
- **Name** : `SENDGRID_API_KEY`
- **Value** : Votre clé API SendGrid (si vous en avez une)
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 4 : URL du site (Optionnel - pour SEO)
- **Name** : `NEXT_PUBLIC_SITE_URL`
- **Value** : `https://votre-projet.vercel.app`
  (Vous pourrez mettre la vraie URL après le déploiement)
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

---

## 📋 ÉTAPE 4 : Déployer !

1. Après avoir ajouté toutes les variables, cliquez **"Deploy"** en bas
2. **Attendez 2-3 minutes** pendant le build
3. Vercel va automatiquement :
   - Installer les dépendances
   - Builder le projet
   - Déployer le site

✅ **Votre site sera en ligne !**

---

## 📋 ÉTAPE 5 : Configurer MongoDB Atlas (Accès Internet)

**IMPORTANT** : MongoDB Atlas doit autoriser les connexions depuis Internet.

1. Allez sur **https://www.mongodb.com/cloud/atlas**
2. Connectez-vous à votre compte
3. Cliquez sur votre cluster (Cluster0)
4. Allez dans **"Network Access"** (menu gauche)
5. Cliquez **"Add IP Address"**
6. Cliquez **"Allow Access from Anywhere"** (0.0.0.0/0)
   - OU ajoutez l'IP de Vercel si vous préférez restreindre
7. Cliquez **"Confirm"**

✅ **MongoDB est maintenant accessible depuis Vercel**

---

## 🎉 C'EST FINI !

**Votre site est en ligne sur :**
👉 `https://votre-projet.vercel.app`

### ✅ Testez maintenant :
- ✅ Page d'accueil (Bratva Volkov)
- ✅ Connexion avec les comptes admin
- ✅ Toutes les pages (Lore, Missions, Forum, etc.)
- ✅ Formulaire de candidature
- ✅ Panel admin

---

## 🔐 Comptes de test

Une fois le site en ligne, vous pouvez vous connecter avec :

- **Pakhan** : `antoine` / `admin123`
- **Sovetnik** : `elise` / `admin123`
- **Avtoritet** : `marc` / `admin123`

---

## 💡 Domaine personnalisé (Optionnel)

Pour ajouter votre propre domaine (ex: `bratvavolkov.com`) :

1. Dans Vercel → **Settings** → **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS chez votre registrar

---

## ⚠️ Si quelque chose ne marche pas

### 1. Vérifier les logs de build
- Dans Vercel → **Deployments** → Cliquez sur le dernier déploiement
- Regardez les **"Logs"** pour voir les erreurs

### 2. Vérifier les variables d'environnement
- Dans Vercel → **Settings** → **Environment Variables**
- Vérifiez que toutes les variables sont bien ajoutées
- Vérifiez que `MONGODB_URI` est correct (avec le nom de la base de données)

### 3. Vérifier MongoDB Atlas
- Vérifiez que votre cluster est actif
- Vérifiez que "Network Access" autorise 0.0.0.0/0
- Vérifiez que votre utilisateur MongoDB a les bonnes permissions

### 4. Redeployer
- Après avoir corrigé, allez dans **Deployments**
- Cliquez sur les **3 points** (⋯) du dernier déploiement
- Cliquez **"Redeploy"**

---

## 📝 Notes importantes

- ✅ **Toutes les données sont synchronisées** via MongoDB Atlas
- ✅ **Les changements sont visibles par tous les utilisateurs** en temps réel
- ✅ **Les données persistent** entre les sessions
- ✅ **Le site est accessible 24/7** sur Internet

---

**Temps total : ~10 minutes** 🚀

**Bratva Volkov** - Family. Honor. Respect.

