# Guide de Contribution

## 🎨 Ajout de Contenu

### Articles MDX

Pour ajouter un nouvel article dans la section Dossiers :

1. Créez un fichier `.mdx` dans `content/posts/`
2. Utilisez le format suivant :

```mdx
---
title: "Titre de l'article"
date: "2024-01-15"
excerpt: "Description courte"
---

Contenu de l'article...
```

### Composants MDX Disponibles

- `<Avertissement>...</Avertissement>` - Alerte importante
- `<Note>...</Note>` - Note informative
- `<Encadré>...</Encadré>` - Encadré stylisé

## 🔧 Modification de l'Organisation

Éditez `content/data/org.json` pour modifier :
- La hiérarchie (boss, capos, soldiers)
- Les équipes
- Les membres

## 🗺️ Modification des Zones

Éditez `content/data/zones.json` pour :
- Ajouter/modifier des zones
- Changer les statuts (controlled, disputed, neutral)
- Ajuster les revenus et notes

## 💼 Modification des Affaires

Éditez `content/data/business.json` pour :
- Ajouter des activités
- Modifier les descriptions
- Ajuster les niveaux de risque

## 🎨 Personnalisation Visuelle

### Couleurs

Modifiez `tailwind.config.ts` pour ajuster la palette de couleurs.

### Styles

Modifiez `styles/globals.css` pour les effets visuels globaux.

## 🐛 Signaler un Bug

Si vous trouvez un bug, contactez les administrateurs avec :
- Description du problème
- Étapes pour reproduire
- Capture d'écran si possible

---

*Merci de contribuer à l'amélioration du site !*

