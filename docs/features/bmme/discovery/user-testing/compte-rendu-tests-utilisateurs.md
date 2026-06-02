# Compte-Rendu des Tests Utilisateurs - BMME v2

**Date de synthèse :** Juin 2026
**Nombre d'interviews :** 3
**Profil des testeurs :** Gestionnaires de catalogue
**Facilitateur :** Ben
**Format :** Walkthrough commenté (30-45 min/session)

---

## Résumé Exécutif

Les 3 tests utilisateurs révèlent une **réception globalement positive** de la nouvelle interface BMME v2, avec des notes de satisfaction de **4/5 à 4.5/5**. Les utilisateurs apprécient particulièrement l'univers visuel mediaspot, le regroupement des packages par plateforme, et le concept d'héritage global.

Cependant, plusieurs **points de friction récurrents** ont été identifiés, notamment autour de la compréhension de la hiérarchie Langue → Territoire, du concept de "Shared Metadata", et de l'interface de gestion des sources/historique.

---

## Points d'Attention Majeurs

### 🔴 Critique - Retours Communs aux 3 Interviews

| Sujet | Constat | Impact |
|-------|---------|--------|
| **Compteur X/120** | Interprété initialement comme longueur de caractères (synopsis), compris uniquement après explication | Risque d'incompréhension lors du premier usage |
| **Hiérarchie Langue → Territoire** | Concept d'héritage pas intuitif, confusion sur ce qui est hérité et d'où | Frustration utilisateur, erreurs de saisie |
| **Shared Metadata** | Concept flou, nécessite helper text visible ou tooltips | Utilisateurs ne comprennent pas quoi remplir où |
| **Vendor ID** | Position dans la hiérarchie contestée, besoin de conserver les anciens IDs multiples | Problème métier critique |

### 🟠 Important - Retours de 2/3 Interviews

| Sujet | Constat | Interviews |
|-------|---------|------------|
| **Ratings & VOD Dates** | Ne devraient pas être "shared", sont territory-specific | #1, #2 |
| **Source Tracking / History** | Partie la plus confuse de l'interface, checkbox "active source" mal comprise | #1, #3 |
| **Artworks** | Besoin de batch upload, localisés par langue mais communs aux plateformes | #2, #3 |
| **Bulk Localize** | Wording confus (confondu avec nom territoire), peu utilisé car data gérées dans Unity | #1, #3 |

### 🟡 Mineur - Retours Isolés

| Sujet | Constat | Interview |
|-------|---------|-----------|
| **Keywords** | Perçus comme mots-clés (années 80) plutôt que genres | #1 |
| **"chars" vs "characters"** | Abréviation pas claire | #2 |
| **"Hide completes"** | Toggle pas clair au premier abord | #3 |
| **Champs spécifiques épisodes** | Besoin non couvert, à vérifier avec équipe allemande | #1 |
| **Synopsis depuis Original Language** | Certains champs mieux gérés "blank" plutôt qu'hérités | #2 |

---

## Synthèse par Écran

### Title Metadata - Vue Globale
| Aspect | Verdict | Détail |
|--------|---------|--------|
| Structure générale | ✅ Compris | Redesign de VDM Connect bien identifié |
| Badges source (Unity) | ⚠️ Variable | "Source de la donnée" parfois, "métadonnées localisées" pour d'autres |
| "+ New Language" | ✅ Compris | Découvrabilité parfaite |

### Ajout Langue / Territoire
| Aspect | Verdict | Détail |
|--------|---------|--------|
| Copy from / Copy to | ✅ Compris | Intuition bonne, comparaison VDM Connect ("copie tout") |
| Contraintes provider | ✅ Compris | Specs caractères comprises |
| Feedback temps réel | ✅ Très apprécié | Valeur perçue forte |
| Héritage Portuguese → Brazil | ⚠️ Confusion | L'expand de la langue sélectionnée n'est pas évident |

### Bulk Localize
| Aspect | Verdict | Détail |
|--------|---------|--------|
| Concept global | ✅ Compris | Vue bulk claire |
| Inherited + Override | ✅ Compris | Système de chips apprécié |
| Utilité réelle | ⚠️ Limitée | Beaucoup de data gérées dans Unity, pas BMME |
| Gestion par territoire | ⚠️ Friction métier | UK gère UK, pas les Français → limite l'usage bulk |

### Packages - Shared Metadata
| Aspect | Verdict | Détail |
|--------|---------|--------|
| Concept "Shared" | ❌ Pas clair | Nécessite notice/tooltip pour comprendre |
| Structure plateforme | ✅ Compris | Groupage apprécié |
| Ratings/Dates | ❌ Mal placés | Devraient être territory-specific |

### Package Individuel
| Aspect | Verdict | Détail |
|--------|---------|--------|
| État Partial | ✅ Compris | Logique claire |
| Cascade Title → Shared → Package | ✅ Compris | Après explication |
| Vendor ID | ⚠️ Position contestée | Devrait être au niveau "language" pas Global |
| État Valid | ⚠️ Pas bloquant | Usage avec warning acceptable pour cas spéciaux |
| Artworks | ❌ Point douloureux | Bulk upload manquant, naming/size detection demandés (douleur 4/10) |

### Source Tracking & Historique
| Aspect | Verdict | Détail |
|--------|---------|--------|
| Multi-source | ⚠️ Variable | Compris mais checkbox active source confuse |
| Changement de source | ❌ Confusion | Badge "Source change" pas assez clair, manque nom utilisateur |
| Historique | ✅ Très valorisé | Particulièrement utile pour Synopsis ("Outdated synopsis") |
| Inline phrase | ✅ Préférée | Plutôt que tags isolés |

---

## Ce Qui Fonctionne Bien

> *"Tout est mieux. Looks, logic, interface, design."* — Interview #2

1. **Univers visuel mediaspot** — Apprécié unanimement
2. **Groupage des packages par plateforme** — "Beaucoup plus simple"
3. **Système d'héritage global** — "Moins cloisonné" que VDM Connect
4. **Feedback temps réel du compteur** — Très valorisé
5. **Historique des modifications** — Utilité reconnue pour audit trail
6. **Avoir tout au même endroit** — Fin de la fragmentation VDM Connect / Unity

---

## Actions à Prendre pour les Interfaces

### Priorité Haute (Quick Wins)

| Action | Écran concerné | Effort estimé |
|--------|----------------|---------------|
| Ajouter helper text/tooltip visible sur "Shared Metadata" | Packages Shared | Faible |
| Renommer "120/120" avec label explicite (ex: "Complétion: 120/120") | Tous les écrans | Faible |
| Écrire "characters" en entier au lieu de "chars" | Add Language | Faible |
| Ajouter le nom utilisateur sur les "Source change" dans l'historique | Sync Details | Faible |
| Clarifier le toggle "Hide completes" (ex: "Masquer les champs complets") | Bulk Localize | Faible |

### Priorité Moyenne (Améliorations Structurelles)

| Action | Écran concerné | Effort estimé |
|--------|----------------|---------------|
| Déplacer Ratings et VOD Dates hors de "Shared" vers territory-specific | Packages Shared | Moyen |
| Revoir la position du Vendor ID (niveau Language plutôt que Global) | Title / Packages | Moyen |
| Améliorer la visualisation de la hiérarchie Langue → Territoire (expand auto ?) | Add Language | Moyen |
| Ajouter une fonctionnalité de batch upload pour les Artworks | Packages | Moyen |
| Retravailler l'UI de la checkbox "active source" (plus explicite) | Sync Details | Moyen |

### Priorité Basse (Évolutions Futures)

| Action | Écran concerné | Effort estimé |
|--------|----------------|---------------|
| Permettre certains champs "blank" plutôt qu'hérités (Synopsis, Release date) | Title Metadata | Moyen |
| Explorer les besoins spécifiques Episodes (coordination équipe allemande) | Nouveau scope | Élevé |
| Permettre l'usage de packages avec warning même si non "Valid" | Packages | À valider métier |
| Conserver la gestion des anciens Vendor IDs multiples | Packages | À spécifier |

---

## Scores de Satisfaction

| Interview | Note | Commentaire |
|-----------|------|-------------|
| #1 | 4/5 | "Tout était clair", partie sync history la plus confuse |
| #2 | Non notée | "Everything is better" |
| #3 | 4/5 à 4.5/5 | "Seems more complex, but after introduction it seems good" |

**Moyenne globale : 4/5** — L'interface est jugée satisfaisante avec un onboarding approprié.

---

## Recommandations Finales

1. **Onboarding nécessaire** — L'interface est plus riche que VDM Connect. Prévoir une introduction guidée.

2. **Focus sur la clarté de l'héritage** — C'est le concept le moins intuitif. Envisager :
   - Visualisation graphique de la cascade
   - Indicateurs visuels plus explicites sur les champs hérités

3. **Shared Metadata à repenser** — Le concept est mal compris. Solutions possibles :
   - Renommer en "Métadonnées communes aux packages"
   - Ajouter une notice explicative permanente

4. **Artworks = point de douleur réel** — L'absence de batch upload est un frein opérationnel fort (score douleur 4/10).

5. **Source Tracking à simplifier** — L'interface actuelle est trop technique. Privilégier des phrases inline à des checkboxes/badges.

---

*Document généré à partir des 3 protocoles de tests utilisateurs BMME v2.*
