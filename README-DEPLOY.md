# 🚀 DÉPLOIEMENT EN 3 CLICS

## ✅ Votre projet est PRÊT !

Le build fonctionne, tout est configuré. Il ne reste que 3 étapes simples.

---

## 📋 ÉTAPE 1 : GitHub Desktop

**Dans GitHub Desktop :**

1. **Glissez-déposez** ce dossier `FrenchConnexion` dans GitHub Desktop
   - OU cliquez sur **"Add an Existing Repository from your local drive..."**
   - Sélectionnez `C:\Users\BELKREIR\Documents\FrenchConnexion`

2. GitHub Desktop va détecter le projet

3. **En bas à gauche**, tapez : `Initial commit`

4. Cliquez **"Commit to main"**

5. Cliquez **"Publish repository"** (en haut)

6. Nom : `FrenchConnexion`
   - Décochez "Keep this code private" (ou gardez-le selon votre préférence)

7. Cliquez **"Publish Repository"**

✅ **C'est fait ! Votre code est sur GitHub**

---

## 📋 ÉTAPE 2 : Vercel

**Sur Vercel (dans votre navigateur) :**

1. Dans la section **"Import Git Repository"** (à gauche)

2. Vous verrez **"FrenchConnexion"** dans la liste

3. Cliquez sur **"Import"** à côté de "FrenchConnexion"

4. **Configuration** (laissez tout par défaut) :
   - Framework Preset : **Next.js** ✅
   - Build Command : `npm run build` ✅
   - Output Directory : `.next` ✅

5. Cliquez **"Deploy"** en bas

6. **Attendez 2-3 minutes** pendant le build

✅ **Votre site sera en ligne !**

---

## 📋 ÉTAPE 3 : Variables d'environnement

**Dans Vercel (après le déploiement) :**

1. Allez dans **"Settings"** (en haut à droite)

2. Cliquez **"Environment Variables"** (menu gauche)

3. **Ajoutez ces 4 variables** une par une :

### Variable 1
- **Name** : `NEXT_PUBLIC_SITE_URL`
- **Value** : `https://votre-projet.vercel.app`
  (Remplacez "votre-projet" par le nom réel de votre projet Vercel)
- **Environments** : Cochez ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 2
- **Name** : `NEXT_PUBLIC_GATE_ENABLED`
- **Value** : `true`
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 3
- **Name** : `NEXT_PUBLIC_GATE_PASSPHRASE`
- **Value** : `ENTRER`
  (Changez par votre passphrase personnalisée si vous voulez)
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

### Variable 4 (Optionnel)
- **Name** : `DISCORD_WEBHOOK_URL`
- **Value** : `https://discord.com/api/webhooks/VOTRE_WEBHOOK`
  (Si vous avez un webhook Discord, sinon laissez vide)
- **Environments** : ☑ Production, ☑ Preview, ☑ Development
- Cliquez **"Save"**

4. **Redeployez** :
   - Retournez dans **"Deployments"** (menu haut)
   - Cliquez sur les **3 points** (⋯) du dernier déploiement
   - Cliquez **"Redeploy"**
   - Confirmez **"Redeploy"**

---

## 🎉 C'EST FINI !

**Votre site est en ligne sur :**
👉 `https://votre-projet.vercel.app`

### ✅ Testez maintenant :
- ✅ Page d'accueil
- ✅ Toutes les pages (Organisation, Territoire, Affaires, etc.)
- ✅ Gate avec votre passphrase
- ✅ Formulaire de contact

---

## 💡 Domaine personnalisé (Optionnel)

Pour ajouter votre propre domaine (ex: `frenchconnexion.com`) :

1. Dans Vercel → **Settings** → **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer les DNS chez votre registrar

---

## ⚠️ Si quelque chose ne marche pas

1. **Regardez les logs** dans Vercel (dans le déploiement, section "Logs")
2. **Vérifiez** que toutes les variables d'environnement sont bien ajoutées
3. **Redeployez** après avoir corrigé

---

**Temps total : ~5 minutes** 🚀


