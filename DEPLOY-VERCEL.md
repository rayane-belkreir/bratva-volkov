# 🚀 Déploiement sur Vercel — Guide Simplifié

## ✅ Votre projet est prêt !

Tout est configuré pour être déployé. Suivez ces étapes :

## 📋 Étapes (5 minutes)

### 1️⃣ Créer un dépôt GitHub (si vous ne l'avez pas)

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (le bouton vert)
3. Nom : `FrenchConnexion` (ou autre)
4. Cochez **"Public"** ou **"Private"**
5. **NE COCHEZ PAS** "Add README" ou "Add .gitignore" (on les a déjà)
6. Cliquez **"Create repository"**

### 2️⃣ Pousser votre code sur GitHub

**Option A - Avec GitHub Desktop :**
1. Téléchargez [GitHub Desktop](https://desktop.github.com)
2. Installez-le et connectez-vous
3. File → Add Local Repository
4. Sélectionnez le dossier `FrenchConnexion`
5. Cliquez sur **"Publish repository"** en haut
6. Sélectionnez votre compte GitHub
7. Cliquez **"Publish"**

**Option B - Avec Git en ligne de commande :**
```bash
# Dans le dossier FrenchConnexion
git init
git add .
git commit -m "Initial commit - French Connexion"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/FrenchConnexion.git
git push -u origin main
```

### 3️⃣ Déployer sur Vercel

1. **Sur l'écran Vercel que vous voyez** :
   - Dans la section **"Import Git Repository"** (à gauche)
   - Recherchez ou sélectionnez **"FrenchConnexion"** dans la liste
   - Cliquez sur **"Import"** à côté

2. **Configuration du projet** :
   - Framework Preset : **Next.js** (détecté automatiquement)
   - Root Directory : `.` (laissez vide)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)
   - **Ne changez rien**, cliquez **"Deploy"**

3. **Attendre 2-3 minutes** pendant le build

4. **Une fois terminé**, votre site sera en ligne ! 🎉

### 4️⃣ Configurer les variables d'environnement

**Sur la page de votre projet Vercel :**

1. Allez dans **"Settings"** (en haut)
2. Cliquez sur **"Environment Variables"** (dans le menu de gauche)
3. Ajoutez ces variables une par une :

```
NEXT_PUBLIC_SITE_URL = https://votre-projet.vercel.app
```
```
NEXT_PUBLIC_GATE_ENABLED = true
```
```
NEXT_PUBLIC_GATE_PASSPHRASE = ENTRER
```
(Remplacez "ENTRER" par votre passphrase souhaitée)

```
DISCORD_WEBHOOK_URL = https://discord.com/api/webhooks/VOTRE_WEBHOOK
```
(Si vous avez un webhook Discord, sinon laissez vide)

4. Pour chaque variable, cochez **"Production"**, **"Preview"** et **"Development"**
5. Cliquez **"Save"** pour chaque variable
6. **Redeployez** : Retournez dans **"Deployments"** → Cliquez sur les **3 points** → **"Redeploy"**

### 5️⃣ Tester votre site

1. Votre site est accessible sur : `https://votre-projet.vercel.app`
2. Testez :
   - ✅ La page d'accueil
   - ✅ La navigation
   - ✅ Le gate (passphrase : celle que vous avez configurée)
   - ✅ Toutes les pages
   - ✅ Le formulaire de contact

## 🎯 Configuration d'un domaine personnalisé (Optionnel)

1. Dans Vercel : **Settings** → **Domains**
2. Entrez votre domaine (ex: `frenchconnexion.com`)
3. Suivez les instructions pour configurer les DNS
4. Attendez la propagation DNS (quelques minutes à quelques heures)

## ⚠️ Si vous avez une erreur

1. **Regardez les logs** : Dans Vercel → **Deployments** → Cliquez sur le déploiement → **"Logs"**
2. **Vérifiez** que toutes les variables d'environnement sont bien configurées
3. **Redeployez** après avoir corrigé

## ✅ C'est tout !

Votre site **French Connexion** est maintenant en ligne ! 🚀

---

**Besoin d'aide ?** Les logs de déploiement dans Vercel vous diront exactement ce qui ne va pas.

