# 🔧 FIX DES ERREURS 500 - BRATVA VOLKOV

## ⚠️ Problème : Erreurs 500 sur les routes API

Si vous voyez des erreurs 500 sur :
- `/api/auth/login`
- `/api/articles`
- `/api/contracts`
- `/api/messages`

Cela signifie que **MongoDB n'est pas correctement configuré**.

---

## ✅ SOLUTION 1 : Vérifier les variables d'environnement dans Vercel

### Dans Vercel :

1. **Allez sur https://vercel.com**
2. **Sélectionnez votre projet** `bratva-volkov`
3. Allez dans **Settings** → **Environment Variables**
4. **Vérifiez que ces variables existent** :

   **Variable 1 :**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://rayanebelkreir_db_user:UHXqQt4Lk5eIHT8F@cluster0.vpfynqf.mongodb.net/frenchconnection?retryWrites=true&w=majority`
   - ☑ Production, ☑ Preview, ☑ Development

   **Variable 2 :**
   - Name: `RECIPIENT_EMAIL`
   - Value: `radiachakir1982@gmail.com`
   - ☑ Production, ☑ Preview, ☑ Development

5. **Si les variables n'existent pas**, ajoutez-les
6. **Redeployez** :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** (⋯) du dernier déploiement
   - Cliquez **"Redeploy"**

---

## ✅ SOLUTION 2 : Configurer MongoDB Atlas Network Access

**⚠️ OBLIGATOIRE** : MongoDB Atlas doit autoriser les connexions depuis Internet.

### Dans MongoDB Atlas :

1. **Allez sur https://www.mongodb.com/cloud/atlas**
2. **Connectez-vous** à votre compte
3. Cliquez sur votre **cluster** (Cluster0)
4. Dans le menu de gauche, cliquez sur **"Network Access"**
5. **Vérifiez** qu'il y a une entrée avec **0.0.0.0/0** (Allow Access from Anywhere)
6. **Si ce n'est pas le cas** :
   - Cliquez sur **"Add IP Address"** (bouton vert en haut à droite)
   - Cliquez sur **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Cliquez **"Confirm"**
   - **Attendez 1-2 minutes** que la configuration soit active

---

## ✅ SOLUTION 3 : Vérifier la chaîne de connexion MongoDB

### La chaîne de connexion doit être :

```
mongodb+srv://rayanebelkreir_db_user:UHXqQt4Lk5eIHT8F@cluster0.vpfynqf.mongodb.net/frenchconnection?retryWrites=true&w=majority
```

**Points importants :**
- ✅ Doit commencer par `mongodb+srv://`
- ✅ Doit contenir le nom d'utilisateur et le mot de passe
- ✅ Doit contenir `/frenchconnection` (nom de la base de données)
- ✅ Doit se terminer par `?retryWrites=true&w=majority`

---

## ✅ SOLUTION 4 : Tester la connexion MongoDB

### Option 1 : Via l'API d'initialisation

1. Allez sur votre site : `https://bratva-volkov.vercel.app/api/init`
2. Si ça fonctionne, vous verrez un message JSON
3. Si ça échoue, vous verrez une erreur 500

### Option 2 : Via les logs Vercel

1. Dans Vercel → **Deployments**
2. Cliquez sur le dernier déploiement
3. Allez dans **"Logs"**
4. Cherchez les messages :
   - ✅ `MongoDB connected successfully` → Tout fonctionne
   - ❌ `MongoDB connection error` → Problème de connexion

---

## 🔍 DIAGNOSTIC

### Erreur : "MONGODB_URI is not defined"
**Solution :** Ajoutez la variable `MONGODB_URI` dans Vercel

### Erreur : "MongoDB connection timeout"
**Solution :** Vérifiez Network Access dans MongoDB Atlas (0.0.0.0/0)

### Erreur : "Authentication failed"
**Solution :** Vérifiez que le nom d'utilisateur et le mot de passe sont corrects dans la chaîne de connexion

### Erreur : "Database not found"
**Solution :** Vérifiez que `/frenchconnection` est dans la chaîne de connexion

---

## 📝 Checklist

- [ ] Variable `MONGODB_URI` ajoutée dans Vercel
- [ ] Variable `RECIPIENT_EMAIL` ajoutée dans Vercel
- [ ] Network Access configuré dans MongoDB Atlas (0.0.0.0/0)
- [ ] Chaîne de connexion MongoDB correcte
- [ ] Redeploy effectué après les modifications
- [ ] Test de l'API `/api/init` réussi

---

## 🎯 Après avoir corrigé

1. **Redeployez** le site sur Vercel
2. **Attendez** 2-3 minutes
3. **Testez** la connexion :
   - Allez sur `https://bratva-volkov.vercel.app/login`
   - Connectez-vous avec `admin` / `admin123`
   - Si ça fonctionne, tout est OK !

---

**Bratva Volkov** - Family. Honor. Respect. 🚀

