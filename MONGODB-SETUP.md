# 🗄️ Configuration MongoDB Atlas

## 📋 ÉTAPE 1 : Créer un compte MongoDB Atlas

1. Allez sur **https://www.mongodb.com/cloud/atlas**
2. Cliquez sur **"Try Free"** ou **"Sign Up"**
3. Créez un compte (ou connectez-vous)
4. Choisissez le plan **FREE** (M0 Sandbox)

## 📋 ÉTAPE 2 : Créer un cluster

1. Cliquez sur **"Build a Database"**
2. Choisissez **"M0 FREE"** (gratuit)
3. Sélectionnez une région proche (ex: **Europe (Frankfurt)**)
4. Cliquez **"Create"**
5. Attendez 3-5 minutes que le cluster soit créé

## 📋 ÉTAPE 3 : Configurer la base de données

1. Cliquez sur **"Connect"** (sur votre cluster)
2. Choisissez **"Connect your application"**
3. Sélectionnez **"Node.js"** et version **"5.5 or later"**
4. **Copiez la connection string** (elle ressemble à : `mongodb+srv://username:<password>@cluster.mongodb.net/...`)

## 📋 ÉTAPE 4 : Créer un utilisateur de base de données

1. Dans **"Connect"**, cliquez sur **"Database Access"** (menu gauche)
2. Cliquez **"Add New Database User"**
3. Choisissez **"Password"** comme méthode d'authentification
4. Entrez un nom d'utilisateur (ex: `frenchconnection_admin`)
5. Entrez un mot de passe **fort** (sauvegardez-le !)
6. Cliquez **"Add User"**

## 📋 ÉTAPE 5 : Configurer l'accès réseau

1. Dans **"Connect"**, cliquez sur **"Network Access"** (menu gauche)
2. Cliquez **"Add IP Address"**
3. Cliquez **"Allow Access from Anywhere"** (pour le développement)
   - ⚠️ En production, utilisez uniquement les IPs de Vercel
4. Cliquez **"Confirm"**

## 📋 ÉTAPE 6 : Récupérer la connection string

1. Retournez dans **"Connect"** → **"Connect your application"**
2. **Copiez la connection string**
3. **Remplacez** `<password>` par le mot de passe de votre utilisateur
4. **Remplacez** `<database>` par `frenchconnection` (ou le nom que vous voulez)

Exemple final :
```
mongodb+srv://frenchconnection_admin:VOTRE_MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/frenchconnection?retryWrites=true&w=majority
```

## 📋 ÉTAPE 7 : Configurer le projet

1. Créez un fichier `.env.local` dans le dossier `FrenchConnexion`
2. Ajoutez :
```env
MONGODB_URI=mongodb+srv://frenchconnection_admin:VOTRE_MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/frenchconnection?retryWrites=true&w=majority
```

3. **Remplacez** `VOTRE_MOT_DE_PASSE` par votre mot de passe
4. **Remplacez** `cluster0.xxxxx` par votre cluster réel

## 📋 ÉTAPE 8 : Initialiser les données

1. Lancez le projet : `npm run dev`
2. Les collections seront créées automatiquement lors de la première utilisation
3. Pour créer des utilisateurs par défaut, utilisez l'API `/api/users` ou l'interface admin

## ✅ Vérification

Testez la connexion :
```bash
npm run dev
```

Si tout fonctionne, vous verrez les collections dans MongoDB Atlas :
- `users`
- `contracts`
- `messages`
- `articles`

---

## 🚀 Pour Vercel (Production)

1. Dans Vercel → **Settings** → **Environment Variables**
2. Ajoutez :
   - **Name** : `MONGODB_URI`
   - **Value** : Votre connection string complète
   - **Environments** : ☑ Production, ☑ Preview, ☑ Development
3. Cliquez **"Save"**
4. **Redeployez** votre projet

---

## ⚠️ Sécurité

- **Ne partagez jamais** votre connection string
- **Ne commitez pas** le fichier `.env.local` (il est déjà dans `.gitignore`)
- **Utilisez** des mots de passe forts pour l'utilisateur de base de données
- **Limitez** l'accès réseau en production (seulement les IPs de Vercel)

---

## 🆘 Problèmes courants

### "Connection timeout"
- Vérifiez que l'IP est autorisée dans "Network Access"
- Utilisez "Allow Access from Anywhere" pour tester

### "Authentication failed"
- Vérifiez le nom d'utilisateur et le mot de passe
- Assurez-vous que l'utilisateur existe dans "Database Access"

### "Database not found"
- La base de données sera créée automatiquement lors de la première utilisation
- Vérifiez que le nom dans la connection string est correct

---

**Temps total : ~10 minutes** 🚀

