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

## Functional Requirements (Gherkin)

> Format BDD pour clarté et automatisation des tests

### Feature: Sélection & Recherche

```gherkin
Feature: Sélection & Recherche
  En tant que créateur de screening
  Je veux sélectionner des contenus à partager
  Afin de créer un screening ciblé

  Background:
    Given un créateur avec le droit "aclShareCreate"

  # --- PARTAGE ASSETS DIRECT (FR1) ---

  Scenario: Sélection d'un Asset unique pour partage direct
    Given le créateur est sur la page d'un Asset
    When il clique sur "Partager"
    Then la modale s'ouvre directement à l'étape 3 (configuration)
    And l'Asset est pré-sélectionné pour le screening

  Scenario: Multi-sélection d'Assets pour partage direct
    Given le créateur est sur une liste d'Assets
    When il sélectionne plusieurs Assets
    And clique sur "Partager la sélection"
    Then la modale s'ouvre à l'étape 3
    And tous les Assets sélectionnés sont inclus

  # --- RECHERCHE TITLES (FR2) ---

  Scenario: Recherche de Titles dans la modale
    Given la modale de création ouverte à l'étape 1
    When le créateur saisit "Avatar" dans le champ de recherche
    Then le système affiche les Titles correspondants
    And les résultats incluent titre, année, poster

  # --- MULTI-TITLE (FR3, FR4) ---

  Scenario: Sélection de plusieurs Titles
    Given la modale à l'étape 1 avec des résultats de recherche
    When le créateur sélectionne "Avatar" et "Titanic"
    Then les deux Titles sont ajoutés au screening
    And le créateur peut sélectionner les Contents pour chaque Title

  Scenario: Sélection de Contents spécifiques par Title
    Given un Title "Avatar" avec Contents: "Feature", "Trailer", "Making-of"
    When le créateur sélectionne "Feature" et "Trailer"
    Then seuls ces Contents seront partagés pour ce Title

  # --- LIMITES (FR5, FR6) ---

  Scenario: Limite de 10 Titles par screening
    Given un screening avec 10 Titles déjà sélectionnés
    When le créateur tente d'ajouter un 11ème Title
    Then l'ajout est bloqué
    And le système affiche "Maximum 10 Titles par screening"

  Scenario: Limite de 20 Assets en multi-sélection
    Given une sélection de 20 Assets
    When le créateur tente de sélectionner un 21ème Asset
    Then la sélection est bloquée
    And le système affiche "Maximum 20 Assets par sélection"
```

### Feature: Attribution des Langues

```gherkin
Feature: Attribution des Langues
  En tant que créateur de screening
  Je veux choisir les langues audio et sous-titres
  Afin de cibler le destinataire dans sa langue

  Background:
    Given un créateur avec le droit "aclShareCreate"
    And la modale ouverte à l'étape 2 (attribution langues)

  # --- CONTENT MEZZ (FR7, FR8) ---

  Scenario: Choix audio pour Content MEZZ
    Given un Content MEZZ avec tracks audio: "Français", "Anglais", "Allemand"
    When le créateur sélectionne "Français"
    Then le screening sera généré avec la piste audio française

  Scenario: Choix sous-titres pour Content MEZZ
    Given un Content MEZZ avec sous-titres QC: "Français", "Anglais", "Espagnol"
    When le créateur sélectionne "Anglais"
    Then le screening affichera les sous-titres anglais

  Scenario: Combinaison audio + sous-titres MEZZ
    Given un Content MEZZ avec audio "VO Anglais" et sous-titres "Français"
    When le créateur sélectionne audio "Anglais" et ST "Français"
    Then le destinataire verra la VO avec sous-titres français

  # --- CONTENT RAW (FR9) ---

  Scenario: Choix audio pour Content RAW (mapping asset)
    Given un Content RAW avec assets vidéo:
      | asset_id | audio_lang |
      | A1       | Français   |
      | A2       | Anglais    |
    When le créateur sélectionne "Français" comme langue
    Then le système mappe vers l'asset A1
    And le partage sera effectué sur cet asset spécifique

  Scenario: Content RAW sans sous-titres disponibles
    Given un Content RAW
    When le créateur arrive sur l'attribution langues
    Then seul le choix audio est affiché
    And le choix sous-titres est absent (pas grisé, absent)
```

### Feature: Burn & Watermarking

```gherkin
Feature: Burn & Watermarking
  En tant que créateur de screening
  Je veux configurer les options de protection visuelle
  Afin de sécuriser mes contenus partagés

  Background:
    Given un créateur avec le droit "aclShareCreate"
    And une modale de configuration screening ouverte à l'étape 3

  # --- BURN TEXTE (FR10) ---

  Scenario: Activer le burn texte personnalisé
    When le créateur active l'option "burn texte"
    And saisit le texte "CONFIDENTIEL - Acheteur X"
    Then le texte sera incrusté visiblement sur la vidéo
    And l'aperçu affiche le texte en surimpression

  # --- BURN EMAIL (FR11, FR12) ---

  Scenario: Activer le burn email du destinataire
    When le créateur active l'option "burn email destinataire"
    Then l'email de chaque destinataire sera incrusté sur sa vidéo
    And l'option "partage par lien" est désactivée
    And un message explique "Lien désactivé : chaque destinataire voit son email incrusté"

  Scenario: Burn email bloque le partage par lien
    Given l'option "burn email destinataire" est activée
    When le créateur tente d'activer "partage par lien"
    Then l'option reste désactivée
    And le système affiche "Incompatible avec burn email"

  # --- WATERMARK FORENSIC (FR13, FR14, FR15, FR16) ---

  Scenario Outline: Activation automatique du watermark forensic selon ancienneté du Title
    Given un Title avec une date de sortie "<date_sortie>"
    And le seuil forensic plateforme configuré à <seuil> années
    When le créateur sélectionne ce Title pour un screening
    Then le watermark forensic est "<statut_forensic>"

    Examples:
      | date_sortie | seuil | statut_forensic |
      | 2025-01-01  | 2     | activé          |
      | 2024-01-01  | 2     | activé          |
      | 2023-01-01  | 2     | désactivé       |
      | 2020-01-01  | 5     | désactivé       |
      | 2022-01-01  | 5     | activé          |

  Scenario: Alerte visuelle quand watermark forensic est activé
    Given un Title récent déclenchant le watermark forensic
    When le créateur arrive sur l'étape 3 de la modale
    Then une alerte est affichée "Protection forensic active sur ce screening"
    And l'alerte explique les restrictions associées

  Scenario: Watermark forensic bloque le partage par lien
    Given un screening avec watermark forensic activé
    When le créateur configure les options de partage
    Then l'option "partage par lien" est désactivée et grisée
    And seul l'envoi par email nominatif est disponible

  Scenario: Watermark forensic limite les destinataires à 10
    Given un screening avec watermark forensic activé
    And 10 destinataires déjà ajoutés
    When le créateur tente d'ajouter un 11ème destinataire
    Then l'ajout est bloqué
    And le système affiche "Maximum 10 destinataires avec protection forensic"

  # --- LIMITE GLOBALE (FR36) ---

  Scenario: Limite globale de destinataires sans forensic
    Given un screening sans watermark forensic
    And 50 destinataires déjà ajoutés
    When le créateur tente d'ajouter un 51ème destinataire
    Then l'ajout est bloqué
    And le système affiche "Maximum 50 destinataires par screening"

  # --- MATRICE COMBINAISONS ---

  Scenario Outline: Combinaison burn et forensic
    Given un screening avec watermark forensic "<forensic>"
    And l'option burn texte "<burn_texte>"
    And l'option burn email "<burn_email>"
    Then le partage par lien est "<lien_dispo>"
    And la limite destinataires est <max_dest>

    Examples:
      | forensic  | burn_texte | burn_email | lien_dispo | max_dest |
      | désactivé | désactivé  | désactivé  | disponible | 50       |
      | désactivé | activé     | désactivé  | disponible | 50       |
      | désactivé | désactivé  | activé     | bloqué     | 50       |
      | activé    | désactivé  | désactivé  | bloqué     | 10       |
      | activé    | activé     | désactivé  | bloqué     | 10       |
      | activé    | activé     | activé     | bloqué     | 10       |
```

### Feature: Configuration du Screening

```gherkin
Feature: Configuration du Screening
  En tant que créateur de screening
  Je veux configurer les paramètres de sécurité et diffusion
  Afin de contrôler l'accès au contenu partagé

  Background:
    Given un créateur avec le droit "aclShareCreate"
    And la modale ouverte à l'étape 3 (configuration)

  # --- LIMITES D'ACCÈS (FR17, FR18, FR19) ---

  Scenario: Définir un nombre maximum de vues
    When le créateur définit "Max vues" à 5
    Then le screening expirera après 5 visionnages
    And le compteur de vues sera visible dans le suivi

  Scenario: Définir une date d'expiration
    When le créateur définit la date d'expiration au "2026-02-28"
    Then le screening sera inaccessible après cette date
    And le destinataire verra "Ce lien a expiré"

  Scenario: Définir un nombre maximum d'IPs uniques
    When le créateur définit "Max IPs" à 3
    Then le screening bloquera l'accès après 3 IPs différentes
    And le système affiche "Accès limité atteint" à la 4ème IP

  Scenario Outline: Combinaison de limites d'accès
    Given un screening avec max vues <max_vues> et max IPs <max_ips>
    When le screening atteint <vues_actuelles> vues depuis <ips_actuelles> IPs
    Then l'accès est "<statut>"

    Examples:
      | max_vues | max_ips | vues_actuelles | ips_actuelles | statut   |
      | 10       | 3       | 5              | 2             | autorisé |
      | 10       | 3       | 10             | 2             | bloqué   |
      | 10       | 3       | 5              | 3             | bloqué   |
      | 0        | 0       | 100            | 50            | autorisé |

  # --- COMMENTAIRE & DESTINATAIRES (FR20, FR21, FR22) ---

  Scenario: Ajouter un commentaire interne
    When le créateur saisit un commentaire "Pour review Q1 - client VIP"
    Then le commentaire est enregistré avec le screening
    And il est visible uniquement côté créateur (pas destinataire)

  Scenario: Ajouter des destinataires par email
    When le créateur ajoute "client@studio.com" comme destinataire
    And coche "Envoyer email automatique"
    Then un email est envoyé à cette adresse avec le lien
    And le destinataire apparaît dans la liste de suivi

  Scenario: Générer un lien de partage manuel
    Given aucune option bloquant le lien (burn email, forensic)
    When le créateur clique "Générer le lien"
    Then un lien unique est créé
    And le créateur peut le copier pour envoi manuel (Slack, etc.)

  Scenario: Lien bloqué affiche explication
    Given l'option burn email activée
    When le créateur regarde la zone "Lien de partage"
    Then le bouton est grisé
    And un tooltip explique "Lien indisponible : burn email actif"
```

### Feature: Viewlink Destinataire

```gherkin
Feature: Viewlink Destinataire
  En tant que destinataire d'un screening
  Je veux accéder et visionner les contenus partagés
  Afin de reviewer les médias envoyés

  # --- ACCÈS (FR23) ---

  Scenario: Accès au screening via lien unique
    Given un screening actif avec lien "https://viewlink.mediaspot.com/abc123"
    When le destinataire ouvre ce lien
    Then la page viewlink s'affiche
    And le contenu est prêt à être visionné

  Scenario: Accès à un screening expiré
    Given un screening dont la date d'expiration est passée
    When le destinataire ouvre le lien
    Then une page d'erreur s'affiche
    And le message indique "Ce screening a expiré"

  Scenario: Accès à un screening avec vues épuisées
    Given un screening ayant atteint son max de vues
    When le destinataire ouvre le lien
    Then une page d'erreur s'affiche
    And le message indique "Nombre de visionnages atteint"

  # --- NAVIGATION MULTI-TITLE (FR24, FR25) ---

  Scenario: Navigation entre Titles via dropdown
    Given un screening multi-title avec "Avatar" et "Titanic"
    When le destinataire ouvre le dropdown de navigation
    Then il voit la liste des Titles disponibles
    And peut sélectionner "Titanic" pour changer de contenu

  Scenario: Navigation entre Contents d'un Title
    Given un Title "Avatar" avec Contents "Feature" et "Trailer"
    When le destinataire sélectionne ce Title
    Then il voit les Contents disponibles
    And peut naviguer entre eux via le dropdown

  Scenario: Navigation entre Assets via cartes
    Given un screening avec plusieurs Assets
    When le destinataire arrive sur la page
    Then les Assets sont affichés en cartes cliquables
    And cliquer sur une carte charge cet Asset dans le player

  # --- VISIONNAGE (FR26) ---

  Scenario: Visionnage du contenu avec contrôles player
    Given un screening accessible
    When le destinataire lance la lecture
    Then le player affiche le contenu avec les langues configurées
    And les contrôles standard sont disponibles (play, pause, seek, volume)

  # --- CLIPS (FR27) ---

  Scenario: Création d'un clip pendant le visionnage
    Given le destinataire en train de visionner un contenu
    When il définit un point d'entrée et un point de sortie
    And clique "Créer clip"
    Then le clip est enregistré avec les timecodes
    And il peut ajouter un commentaire au clip
```

### Feature: Tracking & Analytics

```gherkin
Feature: Tracking & Analytics
  En tant que créateur de screening
  Je veux suivre les statistiques de visionnage
  Afin de mesurer l'engagement des destinataires

  Background:
    Given un screening actif avec des vues enregistrées

  # --- ENREGISTREMENT (FR28, FR29, FR30, FR31) ---

  Scenario: Enregistrement des marqueurs de visionnage
    Given un destinataire visionnant un contenu de 60 minutes
    When il regarde de 0:00 à 15:00, puis saute à 45:00 jusqu'à 60:00
    Then le système enregistre les segments [0:00-15:00] et [45:00-60:00]
    And ces marqueurs sont visibles sur une timeline

  Scenario: Calcul du temps total visionné
    Given une session avec segments [0:00-15:00] et [45:00-60:00]
    Then le temps total visionné est 30 minutes
    And cette valeur est affichée dans les analytics

  Scenario: Calcul du pourcentage de contenu vu
    Given un contenu de 60 minutes
    And des segments visionnés totalisant 30 minutes uniques
    Then le pourcentage affiché est 50%

  Scenario: Identification des sessions par IP
    Given deux sessions depuis des IPs différentes
    When le créateur consulte les analytics
    Then chaque session est identifiée par son IP
    And le nombre d'IPs uniques est affiché

  # --- CONSULTATION CRÉATEUR (FR32, FR33) ---

  Scenario: Détail de visionnage par destinataire
    Given un screening envoyé à "client@studio.com"
    When le créateur ouvre le détail de ce destinataire
    Then il voit:
      | Métrique           | Valeur           |
      | Dernière vue       | 2026-01-22 14:30 |
      | Temps total        | 45 min           |
      | Pourcentage vu     | 75%              |
      | Nombre de sessions | 3                |

  Scenario: Vues agrégées par Title (multi-title)
    Given un screening avec "Avatar" (5 vues) et "Titanic" (3 vues)
    When le créateur consulte les analytics
    Then il voit le total global (8 vues)
    And le détail par Title:
      | Title   | Vues |
      | Avatar  | 5    |
      | Titanic | 3    |

  # --- CLIPS (FR34, FR35) ---

  Scenario: Remontée des clips créés par destinataires
    Given un destinataire ayant créé 2 clips sur un screening
    When le créateur consulte le screening
    Then il voit la liste des clips créés
    And chaque clip affiche: timecodes, commentaire, auteur

  Scenario: Réimporter un clip dans la plateforme
    Given un clip créé par un destinataire sur l'asset "Avatar_Feature_FR"
    When le créateur clique "Importer dans Mediaspot"
    Then le clip est créé sur l'asset source dans la plateforme
    And il est lié au screening d'origine pour traçabilité
```

