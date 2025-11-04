# Identifiants Admin - French Connection RP

## 🔐 Identifiants de connexion

### Compte Administrateur Principal
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin

### Autres comptes disponibles
- **Username:** `antoine`
- **Password:** `admin123`
- **Role:** Parrain

- **Username:** `elise`
- **Password:** `admin123`
- **Role:** Consigliere

- **Username:** `marc`
- **Password:** `admin123`
- **Role:** Capo

---

## 📧 Configuration Email

Pour recevoir les candidatures par email, configurez l'une des options suivantes :

### Option 1: Resend (Recommandé - Gratuit)
1. Créez un compte sur https://resend.com
2. Obtenez votre clé API
3. Ajoutez dans `.env` :
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   RECIPIENT_EMAIL=radiachakir1982@gmail.com
   ```

### Option 2: SendGrid
1. Créez un compte sur https://sendgrid.com
2. Obtenez votre clé API
3. Ajoutez dans `.env` :
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
   RECIPIENT_EMAIL=radiachakir1982@gmail.com
   ```

### Note
Si aucun service n'est configuré, les candidatures seront enregistrées dans localStorage et le contenu de l'email sera affiché dans les logs du serveur.


