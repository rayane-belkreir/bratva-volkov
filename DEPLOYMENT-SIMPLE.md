# 🚀 DÉPLOIEMENT RAPIDE - 3 ÉTAPES

## ✅ Votre projet est prêt !
Le build fonctionne parfaitement ✅

---

## ÉTAPE 1 : Mettre votre code sur GitHub

### Option A : Avec GitHub Desktop (PLUS SIMPLE)

1. Téléchargez [GitHub Desktop](https://desktop.github.com)
2. Installez et connectez-vous avec votre compte GitHub
3. Dans GitHub Desktop :
   - File → Add Local Repository
   - Sélectionnez le dossier `C:\Users\BELKREIR\Documents\FrenchConnexion`
   - Cliquez **"Publish repository"** en haut
   - Nom : `FrenchConnexion`
   - **Ne cochez PAS** "Keep this code private" (ou cochez si vous voulez)
   - Cliquez **"Publish"**

### Option B : Avec Git (ligne de commande)

Si Git est installé :
```bash
cd C:\Users\BELKREIR\Documents\FrenchConnexion
git init
git add .
git commit -m "Initial commit"
# Créez le dépôt sur github.com d'abord, puis :
git remote add origin https://github.com/VOTRE-USERNAME/FrenchConnexion.git
git push -u origin main
```

---

## ÉTAPE 2 : Déployer sur Vercel

**Sur l'écran Vercel que vous avez actuellement :**

1. Dans la section **"Import Git Repository"** (gauche) :
   - Vous verrez votre dépôt **"FrenchConnexion"**
   - Cliquez sur **"Import"** à côté

2. **Configuration** :
   - Framework Preset : **Next.js** ✅ (détecté automatiquement)
   - **Ne changez rien**, cliquez **"Deploy"** en bas

3. **Attendez 2-3 minutes** pendant le build

4. ✅ **Votre site sera en ligne !**

---

## ÉTAPE 3 : Configurer les variables d'environnement

**Sur votre projet Vercel (après le déploiement) :**

1. Allez dans **"Settings"** (en haut)
2. Cliquez **"Environment Variables"** (menu gauche)
3. Ajoutez ces 4 variables :

```
Nom: NEXT_PUBLIC_SITE_URL
Valeur: https://votre-projet.vercel.app
```
(Cochez Production, Preview, Development pour chaque variable)

```
Nom: NEXT_PUBLIC_GATE_ENABLED
Valeur: true
```

```
Nom: NEXT_PUBLIC_GATE_PASSPHRASE
Valeur: ENTRER
```
(Changez "ENTRER" par votre passphrase si vous voulez)

```
Nom: DISCORD_WEBHOOK_URL
Valeur: https://discord.com/api/webhooks/VOTRE_WEBHOOK
```
(Optionnel - laissez vide si vous n'avez pas de webhook)

4. **Redeployez** : Retournez dans **"Deployments"** → Cliquez sur les **3 points** du dernier déploiement → **"Redeploy"**

---

## 🎉 C'EST FAIT !

Votre site est maintenant en ligne sur : **https://votre-projet.vercel.app**

**Testez :**
- ✅ Page d'accueil
- ✅ Navigation entre les pages
- ✅ Gate (passphrase : celle que vous avez configurée)
- ✅ Formulaire de contact

---

## 💡 Astuce : Domaine personnalisé

Pour ajouter votre propre domaine :
1. Dans Vercel → **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `frenchconnexion.com`)
3. Suivez les instructions pour configurer les DNS

---

## ⚠️ Si vous avez une erreur

1. Regardez les **Logs** dans Vercel (dans le déploiement)
2. Vérifiez que toutes les **variables d'environnement** sont bien configurées
3. **Redeployez** après avoir corrigé

---

**Besoin d'aide ?** Tous les fichiers sont prêts ! 🚀

