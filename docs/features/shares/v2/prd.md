---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success (skipped)
  - step-04-journeys
  - step-05-domain (skipped)
  - step-06-innovation (skipped)
  - step-07-project-type (skipped)
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional (skipped)
  - step-11-polish
inputDocuments:
  - _bmad/bmm/data/company-context.md
  - docs/features/shares/v1/db-share-media-infos.ts
  - docs/features/shares/v1/endpoints-inventory.md
  - docs/features/shares/v1/documentation.md
figmaLinks:
  - name: Modale de configuration V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3755-114971&m=dev
  - name: Vue liste V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3745-448981&m=dev
  - name: Lien public V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3744-201547&m=dev
workflowType: prd
projectType: brownfield
featureName: Screenings V2
documentCounts:
  briefs: 0
  research: 0
  projectDocs: 4
  figma: 3
classification:
  projectType: web_app_saas_b2b
  domain: media_entertainment
  complexity: medium
  projectContext: brownfield
---

# Product Requirements Document - Screenings V2

**Author:** Ben
**Date:** 2026-01-22
**Product:** Mediaspot (Media Asset Manager)

## Contexte Projet

### Hiérarchie Mediaspot
```
Title (œuvre)
  └── Content (feature, trailer, bonus...)
        └── Asset vidéo Ref [Si MEZZ] → Audio tracks QC + Sous-titres QC
        └── Asset (vidéo/audio simple = 1 track)
```

### Flux de Partage Existants

| Flux | Description | Scope V2 |
|------|-------------|----------|
| **Flux 1 : Partage Content** | Depuis un Title → sélection de Content(s) | ✅ Modifié |
| **Flux 2 : Partage Assets** | Sélection directe d'assets | Inchangé |

### Problèmes V1 à Résoudre

1. **Limitation MEZZ** : Impossible de partager des Contents non-MEZZ depuis un Title
2. **Mono-title** : Impossible de partager plusieurs Titles dans un seul screening

### Objectifs V2

| Capacité | V1 | V2 |
|----------|----|----|
| Partager Content MEZZ | ✅ + choix langues | ✅ + choix langues |
| Partager Content non-MEZZ depuis Title | ❌ Bloqué | ✅ (sans choix langues) |
| Multi-title (playlist) | ❌ | ✅ |

### Hors Scope MVP
- Flux 2 (partage assets) → inchangé
- UX clips → inchangé

## Parcours Utilisateurs

### Utilisateurs Identifiés

| Type | Profil | ACL requis |
|------|--------|------------|
| **Créateur** | Sales / Opérations | `aclShareCreate` + ACL confidentialité (si titre sensible) |
| **Destinataire** | Externe (acheteur, reviewer, client) | Aucun (accès via lien) |

### Modale de Configuration V2 - 3 Étapes

| Étape | Contenu | Accès conditionnel |
|-------|---------|-------------------|
| **Step 1** | Recherche Titles + Sélection Contents | Uniquement si création from scratch |
| **Step 2** | Attribution langues par Content (MEZZ: audio+ST / RAW: audio only) | Toujours |
| **Step 3** | Config globale (sécurité, éditorial, destinataires) | Toujours |

**Logique technique RAW :**
- Backend compute tous les assets vidéo du Content
- Renvoie la liste des métadonnées audio
- UX = illusion de choix, réalité = share sur asset correspondant

### Parcours Créateur

#### P0 : Partage Assets (Flux 2 - Inchangé V2)

1. Sélectionne un ou plusieurs Assets (depuis page Asset ou multi-sélection)
2. → Modale Step 3 directement : Config globale (sécurité, éditorial, destinataires)
3. → Envoi + Confirmation

> **Note :** Pas de Step 1 ni Step 2 - les Assets sont partagés tels quels (1 track par asset)

#### P1 : Multi-sélection Titles (depuis liste)

1. Sélectionne plusieurs Titles dans une liste
2. → Modale Step 2 : Sélection Contents par Title + Attribution langues
3. → Modale Step 3 : Config globale
4. → Envoi + Confirmation

#### P2 : Depuis Page Title

1. Est sur la page d'un Title
2. Clique "Partager"
3. → Modale Step 2 : Sélection Contents + Attribution langues
4. → Modale Step 3 : Config globale
5. → Envoi + Confirmation

#### P3 : From Scratch

1. Accède à la création de screening vide
2. → Modale Step 1 : Recherche Titles + Sélection Contents
3. → Modale Step 2 : Attribution langues
4. → Modale Step 3 : Config globale
5. → Envoi + Confirmation

### Parcours Destinataire

#### Points d'entrée

| Point d'entrée | Description |
|----------------|-------------|
| **Email automatique** | Créateur coche "envoyer email" → destinataire reçoit le lien |
| **Lien manuel** | Créateur génère le lien → l'envoie lui-même (Slack, etc.) |

#### P4 : Viewlink Multi-title

1. Reçoit le lien (email auto ou autre canal)
2. Arrive sur la page viewlink
3. Dropdown pour naviguer entre Titles/Assets
4. Visionne le contenu
5. (Optionnel) Crée des clips

**Tracking :** Vues comptées par Title (granularité DB), sommées pour affichage global

## Scope MVP V2

### Dans le MVP

| Capacité | Description |
|----------|-------------|
| Partage Contents non-MEZZ | Depuis Title, avec choix audio (compute backend → share asset) |
| Multi-title | Playlist de plusieurs Titles dans un seul screening |
| Attribution langues MEZZ | Audio + sous-titres qualifiés QC |
| Attribution langues RAW | Audio seulement (illusion de choix, réalité = share asset) |
| Dropdown viewlink | Navigation entre Titles/Contents dans le screening |
| Tracking par Title | Vues comptées par Title, sommées pour affichage global |

### Hors Scope MVP

| Élément | Raison |
|---------|--------|
| Flux partage Assets (P0) | Inchangé, fonctionne déjà |
| UX clips | Reporté, reste tel quel |
| Choix sous-titres pour RAW | Pas de sous-titres qualifiés disponibles |

### Limitations Techniques

| Limite | Valeur |
|--------|--------|
| Max Titles par screening | 10 |
| Max Assets en multi-sélection | 20 |

## Functional Requirements

### Sélection & Recherche

| ID | Requirement |
|----|-------------|
| FR1 | Le créateur peut sélectionner un ou plusieurs Assets pour un partage direct |
| FR2 | Le créateur peut rechercher des Titles dans la modale de création |
| FR3 | Le créateur peut sélectionner plusieurs Titles pour un même screening |
| FR4 | Le créateur peut sélectionner des Contents spécifiques pour chaque Title |
| FR5 | Le système limite à 10 Titles maximum par screening |
| FR6 | Le système limite à 20 Assets maximum en multi-sélection |

### Attribution des Langues

| ID | Requirement |
|----|-------------|
| FR7 | Le créateur peut choisir la langue audio parmi les tracks disponibles (Content MEZZ) |
| FR8 | Le créateur peut choisir les sous-titres parmi ceux disponibles (Content MEZZ) |
| FR9 | Le créateur peut choisir la langue audio pour un Content RAW (système mappe vers l'asset) |

### Burn & Watermarking

| ID | Requirement |
|----|-------------|
| FR10 | Le créateur peut activer le burn texte personnalisé (visible) |
| FR11 | Le créateur peut activer le burn email du destinataire (visible) |
| FR12 | Le système désactive le partage par lien si burn email est activé |
| FR13 | Le système active automatiquement le watermark forensic si Title < X années (configurable/plateforme) |
| FR14 | Le système affiche une alerte sur la modale si watermark forensic est activé |
| FR15 | Le système désactive le partage par lien si watermark forensic est activé |
| FR16 | Le système limite à 10 destinataires max si watermark forensic est activé |

### Configuration du Screening

| ID | Requirement |
|----|-------------|
| FR17 | Le créateur peut définir le nombre max de vues |
| FR18 | Le créateur peut définir la date d'expiration |
| FR19 | Le créateur peut définir le nombre max d'IPs uniques |
| FR20 | Le créateur peut ajouter un commentaire interne |
| FR21 | Le créateur peut ajouter des destinataires par email (déclenche envoi automatique) |
| FR22 | Le créateur peut générer un lien de partage (si non bloqué par burn/forensic) |

### Viewlink (Destinataire)

| ID | Requirement |
|----|-------------|
| FR23 | Le destinataire peut accéder au screening via lien unique |
| FR24 | Le destinataire peut naviguer entre Titles/Contents via dropdown |
| FR25 | Le destinataire peut naviguer entre Assets via cartes cliquables |
| FR26 | Le destinataire peut visionner le contenu |
| FR27 | Le destinataire peut créer des clips sur le contenu/asset en cours de lecture |

### Tracking & Analytics

| ID | Requirement |
|----|-------------|
| FR28 | Le système enregistre les marqueurs de visionnage (positions sur timeline) |
| FR29 | Le système calcule le temps total visionné par session |
| FR30 | Le système calcule le pourcentage du contenu vu |
| FR31 | Le système identifie les sessions par IP |
| FR32 | Le créateur peut voir le détail de visionnage par destinataire |
| FR33 | Le créateur peut voir les vues agrégées par Title |
| FR34 | Le système remonte les clips créés par les destinataires |
| FR35 | Le créateur peut réimporter un clip dans la plateforme sur l'asset lié |

