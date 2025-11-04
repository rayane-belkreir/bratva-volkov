# 🚀 INSTRUCTIONS DE DÉPLOIEMENT - BRATVA VOLKOV

## ✅ Tout est prêt ! Suivez ces étapes :

---

## 📋 ÉTAPE 1 : Publier sur GitHub (GitHub Desktop)

### Dans GitHub Desktop :

1. **Ouvrez GitHub Desktop**
2. Vous devriez voir tous les changements dans la liste
3. **En bas à gauche**, dans le champ "Summary", tapez :
   ```
   Migration vers Bratva Volkov - Famille russe avec MongoDB Atlas
   ```
4. **Description** (optionnel) :
   ```
   - Migration complète vers Bratva Volkov (famille russe)
   - Intégration MongoDB Atlas pour synchronisation
   - Système de permissions et hiérarchie complet
   - Panel admin fonctionnel
   ```
5. Cliquez **"Commit to main"** (en bas à gauche)
6. Cliquez **"Push origin"** (en haut, à côté de "Fetch origin")
   - Si vous voyez "Publish repository", cliquez dessus
   - Nom du repository : `bratva-volkov` (ou gardez `FrenchConnexion`)
   - Décochez "Keep this code private" si vous voulez que ce soit public
7. Cliquez **"Publish Repository"** (ou "Push origin")

✅ **Votre code est maintenant sur GitHub !**

---

## 📋 ÉTAPE 2 : Déployer sur Vercel

### Dans Vercel (dans votre navigateur) :

1. **Allez sur https://vercel.com**
2. **Connectez-vous** à votre compte
3. Cliquez sur **"Add New..."** → **"Project"** (en haut à droite)
4. Dans la section **"Import Git Repository"**, vous verrez votre repository GitHub
5. Cliquez sur **"Import"** à côté de votre projet
6. **Configuration** (laissez tout par défaut) :
   - Framework Preset : **Next.js** ✅
   - Build Command : `npm run build` ✅
   - Output Directory : `.next` ✅
   - Install Command : `npm install` ✅
7. **NE CLIQUEZ PAS ENCORE SUR "DEPLOY" !**
8. **Cliquez sur "Environment Variables"** (en bas de la page)
9. **Ajoutez les variables** une par une (voir fichier `VERCEL-ENV-VARIABLES.txt`) :
   
   **Variable 1 : MONGODB_URI**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://rayanebelkreir_db_user:UHXqQt4Lk5eIHT8F@cluster0.vpfynqf.mongodb.net/frenchconnection?retryWrites=true&w=majority`
   - Environments: ☑ Production, ☑ Preview, ☑ Development
   - Cliquez **"Save"**
   
   **Variable 2 : RECIPIENT_EMAIL**
   - Name: `RECIPIENT_EMAIL`
   - Value: `radiachakir1982@gmail.com`
   - Environments: ☑ Production, ☑ Preview, ☑ Development
   - Cliquez **"Save"**

10. **Maintenant**, cliquez **"Deploy"** en bas
11. **Attendez 2-3 minutes** pendant le build
12. Une fois terminé, vous verrez votre URL : `https://votre-projet.vercel.app`

✅ **Votre site est maintenant en ligne !**

---

## 📋 ÉTAPE 3 : Configurer MongoDB Atlas (IMPORTANT)

**⚠️ OBLIGATOIRE** : MongoDB Atlas doit autoriser les connexions depuis Internet.

### Dans MongoDB Atlas :

1. **Allez sur https://www.mongodb.com/cloud/atlas**
2. **Connectez-vous** à votre compte
3. Cliquez sur votre **cluster** (Cluster0)
4. Dans le menu de gauche, cliquez sur **"Network Access"**
5. Cliquez sur **"Add IP Address"** (bouton vert en haut à droite)
6. Cliquez sur **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Cela permet à Vercel de se connecter à MongoDB
7. Cliquez **"Confirm"**
8. **Attendez 1-2 minutes** que la configuration soit active

✅ **MongoDB est maintenant accessible depuis Vercel**

---

## 📋 ÉTAPE 4 : Mettre à jour NEXT_PUBLIC_SITE_URL (Optionnel)

1. Dans Vercel → **Settings** → **Environment Variables**
2. Ajoutez ou modifiez :
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://votre-projet.vercel.app` (remplacez par votre vraie URL Vercel)
   - Environments: ☑ Production, ☑ Preview, ☑ Development
   - Cliquez **"Save"**
3. **Redeployez** :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** (⋯) du dernier déploiement
   - Cliquez **"Redeploy"**

---

## 🎉 C'EST FINI !

**Votre site est maintenant en ligne sur :**
👉 `https://votre-projet.vercel.app`

### ✅ Testez maintenant :

1. **Page d'accueil** : Devrait afficher "Bratva Volkov"
2. **Connexion** : Utilisez les comptes de test :
   - Pakhan : `antoine` / `admin123`
   - Sovetnik : `elise` / `admin123`
   - Avtoritet : `marc` / `admin123`
3. **Toutes les pages** : Lore, Missions, Forum, etc.
4. **Panel Admin** : `/admin` (accessible uniquement avec compte Admin/Pakhan)

---

## 🔧 Si quelque chose ne marche pas

### 1. Vérifier les logs de build
- Dans Vercel → **Deployments** → Cliquez sur le dernier déploiement
- Regardez les **"Logs"** pour voir les erreurs

### 2. Vérifier les variables d'environnement
- Dans Vercel → **Settings** → **Environment Variables**
- Vérifiez que `MONGODB_URI` est bien présent
- Vérifiez que la chaîne de connexion est correcte (avec `/frenchconnection`)

### 3. Vérifier MongoDB Atlas
- Vérifiez que votre cluster est actif (vert)
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

**Bratva Volkov** - Family. Honor. Respect. 🚀

