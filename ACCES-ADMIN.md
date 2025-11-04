# 🔐 ACCÈS ADMIN - BRATVA VOLKOV

## Comptes de connexion disponibles

### Compte Administrateur Principal
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Accès:** Panel admin complet

### Compte Pakhan (Chef de la Famille)
- **Username:** `antoine`
- **Password:** `admin123`
- **Role:** Pakhan
- **Accès:** Toutes les fonctionnalités + Panel admin

### Compte Sovetnik (Conseiller)
- **Username:** `elise`
- **Password:** `admin123`
- **Role:** Sovetnik
- **Accès:** Planification, Recrutement, Missions

### Compte Avtoritet (Capo)
- **Username:** `marc`
- **Password:** `admin123`
- **Role:** Avtoritet
- **Accès:** Missions, Forum, Journal

---

## ⚠️ IMPORTANT : Initialiser les données

Si le journal et les missions sont vides, il faut initialiser les données MongoDB :

### Option 1 : Via l'API (Recommandé)

1. Connectez-vous avec le compte `admin` ou `antoine`
2. Allez sur : `https://votre-site.vercel.app/api/init`
3. Ou utilisez cette commande curl :
   ```bash
   curl -X POST https://votre-site.vercel.app/api/init
   ```

### Option 2 : Via le script local

```bash
npm run init-db
```

---

## 📝 Notes

- Tous les mots de passe sont : `admin123`
- Changez les mots de passe en production !
- Les données sont synchronisées via MongoDB Atlas
- Tous les utilisateurs ont le statut "approved"

---

**Bratva Volkov** - Family. Honor. Respect.

