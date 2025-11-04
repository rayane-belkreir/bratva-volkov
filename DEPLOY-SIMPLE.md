# 🚀 Déploiement Rapide - French Connection

## ⚠️ IMPORTANT : Limitation localStorage

Ce site utilise **localStorage** pour stocker les données. Cela signifie que :
- Chaque utilisateur verra ses **propres données** (missions, membres, messages)
- Les données ne sont **pas partagées** entre utilisateurs
- Pour un vrai partage, il faudrait une base de données (Firebase, Supabase, etc.)

**Le site fonctionnera, mais chaque utilisateur aura son propre environnement.**

---

## 🎯 Déploiement en 3 étapes

### ÉTAPE 1 : Créer un repository GitHub

1. Allez sur **https://github.com** et créez un compte (ou connectez-vous)
2. Cliquez sur **"+"** (en haut à droite) → **"New repository"**
3. Nommez-le : `FrenchConnexion`
4. Choisissez **Public** ou **Private**
5. **NE COCHEZ PAS** "Initialize this repository with a README"
6. Cliquez **"Create repository"**

### ÉTAPE 2 : Pousser le code sur GitHub

**Option A : Via GitHub Desktop (Le plus simple)**

1. Téléchargez : https://desktop.github.com/
2. Installez et connectez-vous
3. Dans GitHub Desktop :
   - **File** → **Add Local Repository**
   - Sélectionnez le dossier `FrenchConnexion`
   - En bas, tapez : `Initial commit`
   - Cliquez **"Commit to main"**
   - Cliquez **"Publish repository"**
   - Sélectionnez votre repo GitHub
   - Cliquez **"Publish Repository"**

**Option B : Via ligne de commande**

```bash
cd "C:\Users\BELKREIR\Documents\FrenchConnexion"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/FrenchConnexion.git
git push -u origin main
```

### ÉTAPE 3 : Déployer sur Vercel

1. Allez sur **https://vercel.com**
2. Cliquez **"Sign Up"** et connectez-vous avec GitHub
3. Cliquez **"Add New..."** → **"Project"**
4. Vous verrez **"FrenchConnexion"** dans la liste
5. Cliquez **"Import"** à côté
6. **Laissez tout par défaut** (Next.js est détecté automatiquement)
7. Cliquez **"Deploy"**
8. Attendez 2-3 minutes

✅ **Votre site est en ligne !**

---

## 🔗 Votre site sera accessible sur

👉 `https://french-connexion.vercel.app` (ou un nom similaire)

Vercel vous donnera une URL unique. Vous pouvez la partager avec vos joueurs !

---

## 📧 Variables d'environnement (Optionnel)

Si vous voulez que les candidatures arrivent par email :

1. Dans Vercel → **Settings** → **Environment Variables**
2. Ajoutez :
   - `RESEND_API_KEY` = Votre clé API Resend
   - `RECIPIENT_EMAIL` = `radiachakir1982@gmail.com`

Puis **Redeploy** (menu du dernier déploiement → Redeploy)

---

## 🔄 Mises à jour automatiques

Une fois déployé, chaque fois que vous poussez du code sur GitHub :
- Vercel **redéploie automatiquement** le site
- Vos changements sont en ligne en 2-3 minutes

---

## ⚠️ Problème : localStorage = Données non partagées

**Actuellement**, chaque utilisateur voit ses propres données car le site utilise localStorage.

**Pour que tous les utilisateurs voient les mêmes données**, il faudrait :
1. Migrer vers Firebase/Supabase/MongoDB
2. Remplacer tous les `localStorage` par des appels API
3. Créer un système d'authentification serveur

**C'est un travail important mais nécessaire pour un vrai partage de données.**

---

## ✅ Checklist avant déploiement

- [x] Build fonctionne (`npm run build`)
- [ ] Code poussé sur GitHub
- [ ] Projet importé sur Vercel
- [ ] Premier déploiement réussi
- [ ] Variables d'environnement configurées (optionnel)
- [ ] Site testé et accessible

---

**Temps total : ~10 minutes** 🚀

**Besoin d'aide ?** Vérifiez les logs dans Vercel si quelque chose ne fonctionne pas.

