# 🔄 Guide de Migration vers MongoDB

## ✅ Ce qui a été fait

1. ✅ Installation de MongoDB (mongoose, bcryptjs)
2. ✅ Création des modèles (User, Contract, Message, Article)
3. ✅ Configuration MongoDB (lib/mongodb.ts)
4. ✅ Création des API routes :
   - `/api/auth/login` - Connexion
   - `/api/auth/register` - Inscription
   - `/api/auth/current` - Utilisateur actuel
   - `/api/users` - Gestion des utilisateurs
   - `/api/users/[id]` - Utilisateur spécifique
   - `/api/contracts` - Gestion des contrats
   - `/api/contracts/[id]` - Contrat spécifique
   - `/api/messages` - Gestion des messages
   - `/api/articles` - Gestion des articles
   - `/api/invitations` - Gestion des invitations

5. ✅ Script d'initialisation des données (`scripts/init-data.ts`)

## 📋 Prochaines étapes

### ÉTAPE 1 : Configurer MongoDB Atlas

1. Suivez le guide `MONGODB-SETUP.md`
2. Créez votre cluster MongoDB Atlas
3. Récupérez votre connection string
4. Créez `.env.local` avec :
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/frenchconnection?retryWrites=true&w=majority
```

### ÉTAPE 2 : Initialiser les données

```bash
npm run init-db
```

Cela créera :
- Les utilisateurs par défaut (admin, antoine, elise, marc)
- Les contrats par défaut
- Les collections nécessaires

### ÉTAPE 3 : Migrer les fichiers lib/

**Il reste à migrer :**
- `lib/auth.ts` → Utiliser les API routes `/api/auth/*` et `/api/users/*`
- `lib/data.ts` → Utiliser les API routes `/api/contracts/*`, `/api/messages/*`, `/api/articles/*`
- `lib/invitations.ts` → Utiliser l'API route `/api/invitations`

**Tous les composants devront être mis à jour pour :**
- Appeler les API routes au lieu de localStorage
- Gérer les erreurs réseau
- Afficher des indicateurs de chargement

### ÉTAPE 4 : Mettre à jour les composants

Tous les composants qui utilisent :
- `getAllUsers()`, `getCurrentUser()`, `login()`, `register()`, etc.
- `getContracts()`, `updateContract()`, etc.
- `getMessages()`, `addMessage()`, etc.
- `getArticles()`, etc.

Doivent être mis à jour pour utiliser `fetch()` vers les API routes.

---

## ⚠️ Important

**Le site utilise actuellement localStorage ET MongoDB.**
- Les API routes sont prêtes
- Les fichiers `lib/` utilisent encore localStorage
- Il faut migrer progressivement

**Pour tester MongoDB :**
1. Configurez MongoDB Atlas
2. Créez `.env.local` avec `MONGODB_URI`
3. Lancez `npm run init-db`
4. Testez les API routes directement (ex: `http://localhost:3000/api/users`)

---

## 🚀 Structure actuelle

```
lib/
  ├── mongodb.ts          ✅ Configuration MongoDB
  ├── auth.ts            ⚠️  À migrer (utilise localStorage)
  ├── data.ts            ⚠️  À migrer (utilise localStorage)
  ├── invitations.ts     ⚠️  À migrer (utilise localStorage)
  └── ...

app/api/
  ├── auth/
  │   ├── login/         ✅ Prêt
  │   ├── register/      ✅ Prêt
  │   └── current/       ✅ Prêt
  ├── users/             ✅ Prêt
  ├── contracts/         ✅ Prêt
  ├── messages/          ✅ Prêt
  ├── articles/          ✅ Prêt
  └── invitations/       ✅ Prêt
```

---

**Les API routes sont prêtes. Il faut maintenant migrer les fichiers lib/ pour les utiliser.**

