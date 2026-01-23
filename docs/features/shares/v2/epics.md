---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - docs/features/shares/v2/prd.md
figmaLinks:
  - name: Modale de configuration V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3755-114971&m=dev
  - name: Vue liste V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3745-448981&m=dev
  - name: Lien public V2
    url: https://www.figma.com/design/lt0CtS9MIPXpYimjxbiG8a/Mediaspot---User-Interface--05-?node-id=3744-201547&m=dev
---

# Screenings V2 - Epic Breakdown

## Overview

Ce document fournit le découpage complet en epics et stories pour la feature Screenings V2, décomposant les requirements du PRD en stories implémentables focalisées sur le fonctionnel.

## Requirements Inventory

### Functional Requirements

| ID | Domaine | Description |
|----|---------|-------------|
| FR1 | Sélection | Partage direct d'Assets (unique ou multi-sélection) → Step 3 directement |
| FR2 | Recherche | Recherche de Titles dans la modale Step 1 |
| FR3 | Multi-title | Sélection de plusieurs Titles dans un screening |
| FR4 | Multi-title | Sélection de Contents spécifiques par Title |
| FR5 | Limites | Maximum 10 Titles par screening |
| FR6 | Limites | Maximum 20 Assets en multi-sélection |
| FR7 | Langues MEZZ | Choix de la piste audio pour Content MEZZ |
| FR8 | Langues MEZZ | Choix des sous-titres QC pour Content MEZZ |
| FR9 | Langues RAW | Choix audio pour Content RAW (mapping vers asset) |
| FR10 | Burn | Burn texte personnalisé sur la vidéo |
| FR11 | Burn | Burn email destinataire (incrustation) |
| FR12 | Burn | Burn email bloque le partage par lien |
| FR13 | Forensic | Activation auto watermark selon ancienneté Title |
| FR14 | Forensic | Alerte visuelle quand forensic activé |
| FR15 | Forensic | Bloque le partage par lien |
| FR16 | Forensic | Limite à 10 destinataires |
| FR17 | Config | Définir nombre maximum de vues |
| FR18 | Config | Définir date d'expiration |
| FR19 | Config | Définir nombre maximum d'IPs uniques |
| FR20 | Config | Commentaire interne (créateur only) |
| FR21 | Config | Ajout destinataires par email + envoi auto |
| FR22 | Config | Génération lien de partage manuel |
| FR23 | Viewlink | Accès au screening via lien unique |
| FR24 | Viewlink | Navigation entre Titles via dropdown |
| FR25 | Viewlink | Navigation entre Contents/Assets |
| FR26 | Viewlink | Visionnage avec contrôles player |
| FR27 | Viewlink | Création de clips (timecodes + commentaire) |
| FR28 | Tracking | Enregistrement des marqueurs de visionnage |
| FR29 | Tracking | Calcul du temps total visionné |
| FR30 | Tracking | Calcul du pourcentage de contenu vu |
| FR31 | Tracking | Identification des sessions par IP |
| FR32 | Tracking | Détail de visionnage par destinataire |
| FR33 | Tracking | Vues agrégées par Title (multi-title) |
| FR34 | Clips | Remontée des clips créés par destinataires |
| FR35 | Clips | Réimporter un clip dans la plateforme |
| FR36 | Limites | Maximum 50 destinataires (sans forensic) |

### Non-Functional Requirements

_Aucun NFR explicite défini dans le PRD (étape skipped)._

### Additional Requirements

_Approche fonctionnelle uniquement - les détails techniques seront déterminés par l'équipe de développement._

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Partage direct d'Assets |
| FR2 | Epic 1 | Recherche de Titles |
| FR3 | Epic 1 | Sélection multi-title |
| FR4 | Epic 1 | Sélection Contents par Title |
| FR5 | Epic 1 | Limite 10 Titles |
| FR6 | Epic 1 | Limite 20 Assets |
| FR7 | Epic 2 | Choix audio MEZZ |
| FR8 | Epic 2 | Choix sous-titres MEZZ |
| FR9 | Epic 2 | Choix audio RAW |
| FR10 | Epic 3 | Burn texte personnalisé |
| FR11 | Epic 3 | Burn email destinataire |
| FR12 | Epic 3 | Burn email bloque lien |
| FR13 | Epic 3 | Forensic auto |
| FR14 | Epic 3 | Alerte forensic |
| FR15 | Epic 3 | Forensic bloque lien |
| FR16 | Epic 3 | Forensic limite destinataires |
| FR17 | Epic 3 | Max vues |
| FR18 | Epic 3 | Date expiration |
| FR19 | Epic 3 | Max IPs |
| FR20 | Epic 3 | Commentaire interne |
| FR21 | Epic 3 | Destinataires email |
| FR22 | Epic 3 | Génération lien |
| FR23 | Epic 4 | Accès viewlink |
| FR24 | Epic 4 | Navigation Titles |
| FR25 | Epic 4 | Navigation Contents/Assets |
| FR26 | Epic 4 | Visionnage player |
| FR27 | Epic 4 | Création clips |
| FR28 | Epic 5 | Marqueurs visionnage |
| FR29 | Epic 5 | Temps total |
| FR30 | Epic 5 | Pourcentage vu |
| FR31 | Epic 5 | Sessions par IP |
| FR32 | Epic 5 | Détail par destinataire |
| FR33 | Epic 5 | Vues agrégées |
| FR34 | Epic 5 | Remontée clips |
| FR35 | Epic 5 | Réimport clips |
| FR36 | Epic 3 | Limite 50 destinataires |

## Epic List

### Epic 1: Sélection des contenus à partager

Le créateur peut rechercher, sélectionner des Titles/Contents/Assets et constituer son screening avec les limites appropriées.

**FRs couverts :** FR1, FR2, FR3, FR4, FR5, FR6

---

### Epic 2: Attribution des langues

Le créateur peut choisir les langues audio et sous-titres pour cibler son destinataire, avec gestion différenciée MEZZ/RAW.

**FRs couverts :** FR7, FR8, FR9

---

### Epic 3: Configuration et protection du screening

Le créateur peut sécuriser son contenu (burn texte/email, watermark forensic) et configurer les paramètres d'accès (vues, expiration, IPs, destinataires).

**FRs couverts :** FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR36

---

### Epic 4: Expérience destinataire (Viewlink)

Le destinataire peut accéder au screening via lien unique, naviguer entre les contenus multi-title, visionner et créer des clips.

**FRs couverts :** FR23, FR24, FR25, FR26, FR27

---

### Epic 5: Suivi et Analytics

Le créateur peut suivre l'activité de visionnage (marqueurs, temps, pourcentage, IPs) et gérer les clips créés par les destinataires.

**FRs couverts :** FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35

---

## Epic 1: Sélection des contenus à partager

Le créateur peut rechercher, sélectionner des Titles/Contents/Assets et constituer son screening avec les limites appropriées.

### Story 1.1: Partage direct d'un Asset unique

En tant que créateur de screening,
Je veux partager un Asset directement depuis sa page,
Afin de créer rapidement un screening sans passer par la sélection de Title.

**Acceptance Criteria:**

```gherkin
Given un créateur avec le droit "aclShareCreate" sur la page d'un Asset
When il clique sur le bouton "Partager"
Then la modale de création s'ouvre directement à l'étape 3 (configuration)
And l'Asset est pré-sélectionné pour le screening
```

---

### Story 1.2: Multi-sélection d'Assets pour partage direct

En tant que créateur de screening,
Je veux sélectionner plusieurs Assets et les partager ensemble,
Afin de créer un screening groupé sans passer par la sélection de Titles.

**Acceptance Criteria:**

```gherkin
Given un créateur avec le droit "aclShareCreate" sur une liste d'Assets
When il sélectionne plusieurs Assets et clique sur "Partager la sélection"
Then la modale s'ouvre à l'étape 3 (configuration)
And tous les Assets sélectionnés sont inclus dans le screening
```

```gherkin
Given un créateur ayant sélectionné 20 Assets
When il tente de sélectionner un 21ème Asset
Then la sélection est bloquée
And le système affiche "Maximum 20 Assets par sélection"
```

---

### Story 1.3: Partage depuis la page Title

En tant que créateur de screening,
Je veux partager des Contents depuis la page d'un Title,
Afin de sélectionner rapidement les Contents à inclure.

**Acceptance Criteria:**

```gherkin
Given un créateur avec le droit "aclShareCreate" sur la page d'un Title
When il clique sur le bouton "Partager"
Then la modale s'ouvre à l'étape 2 (attribution langues)
And les Contents du Title sont affichés pour sélection
```

---

### Story 1.4: Recherche de Titles (création from scratch)

En tant que créateur de screening,
Je veux rechercher des Titles dans la modale de création,
Afin de constituer un screening à partir de zéro.

**Acceptance Criteria:**

```gherkin
Given un créateur avec le droit "aclShareCreate" accédant à la création de screening vide
When la modale s'ouvre
Then elle affiche l'étape 1 avec un champ de recherche
```

```gherkin
Given la modale ouverte à l'étape 1
When le créateur saisit "Avatar" dans le champ de recherche
Then le système affiche les Titles correspondants
And les résultats incluent titre, année et poster
```

---

### Story 1.5: Sélection multi-title

En tant que créateur de screening,
Je veux sélectionner plusieurs Titles dans un même screening,
Afin de créer une playlist de contenus pour le destinataire.

**Acceptance Criteria:**

```gherkin
Given la modale à l'étape 1 avec des résultats de recherche
When le créateur sélectionne "Avatar" et "Titanic"
Then les deux Titles sont ajoutés au screening
And le créateur peut poursuivre vers l'étape 2
```

```gherkin
Given un screening avec 10 Titles déjà sélectionnés
When le créateur tente d'ajouter un 11ème Title
Then l'ajout est bloqué
And le système affiche "Maximum 10 Titles par screening"
```

---

### Story 1.6: Sélection de Contents par Title

En tant que créateur de screening,
Je veux choisir les Contents spécifiques à partager pour chaque Title,
Afin de cibler précisément ce que le destinataire verra.

**Acceptance Criteria:**

```gherkin
Given un Title "Avatar" avec Contents: "Feature", "Trailer", "Making-of"
When le créateur sélectionne "Feature" et "Trailer"
Then seuls ces Contents seront inclus pour ce Title
And "Making-of" n'apparaîtra pas dans le screening final
```

---

## Epic 2: Attribution des langues

Le créateur peut choisir les langues audio et sous-titres pour cibler son destinataire, avec gestion différenciée MEZZ/RAW.

### Story 2.1: Attribution langues pour Content MEZZ

En tant que créateur de screening,
Je veux choisir la langue audio et les sous-titres pour un Content MEZZ,
Afin que le destinataire visionne dans la langue souhaitée.

**Acceptance Criteria:**

```gherkin
Given un Content MEZZ avec tracks audio: "Français", "Anglais", "Allemand"
When le créateur sélectionne "Français"
Then le screening sera généré avec la piste audio française
```

```gherkin
Given un Content MEZZ avec sous-titres QC: "Français", "Anglais", "Espagnol"
When le créateur sélectionne "Anglais"
Then le screening affichera les sous-titres anglais
```

```gherkin
Given un Content MEZZ avec audio "VO Anglais" et sous-titres disponibles
When le créateur sélectionne audio "Anglais" et sous-titres "Français"
Then le destinataire verra la VO avec sous-titres français
```

---

### Story 2.2: Attribution langues pour Content RAW

En tant que créateur de screening,
Je veux choisir la langue audio pour un Content RAW,
Afin de partager l'asset correspondant à la langue souhaitée.

**Acceptance Criteria:**

```gherkin
Given un Content RAW avec assets vidéo associés à différentes langues audio
When le créateur sélectionne "Français" comme langue
Then le système identifie et sélectionne l'asset correspondant
And le partage sera effectué sur cet asset spécifique
```

```gherkin
Given un Content RAW
When le créateur arrive sur l'attribution langues
Then seul le choix audio est affiché
And le choix sous-titres est absent (pas grisé, absent)
```

---

## Epic 3: Configuration et protection du screening

Le créateur peut sécuriser son contenu (burn texte/email, watermark forensic) et configurer les paramètres d'accès (vues, expiration, IPs, destinataires).

### Story 3.1: Burn texte personnalisé

En tant que créateur de screening,
Je veux incruster un texte personnalisé sur la vidéo,
Afin d'identifier visuellement le contenu partagé.

**Acceptance Criteria:**

```gherkin
Given un créateur sur l'étape 3 de la modale (configuration)
When il active l'option "burn texte"
And saisit le texte "CONFIDENTIEL - Acheteur X"
Then le texte sera incrusté visiblement sur la vidéo
And l'aperçu affiche le texte en surimpression
```

---

### Story 3.2: Burn email destinataire

En tant que créateur de screening,
Je veux incruster l'email du destinataire sur la vidéo,
Afin de tracer individuellement chaque visionnage.

**Acceptance Criteria:**

```gherkin
Given un créateur sur l'étape 3 de la modale
When il active l'option "burn email destinataire"
Then l'email de chaque destinataire sera incrusté sur sa vidéo
And l'option "partage par lien" est désactivée
And un message explique "Lien désactivé : chaque destinataire voit son email incrusté"
```

```gherkin
Given l'option "burn email destinataire" est activée
When le créateur tente d'activer "partage par lien"
Then l'option reste désactivée
And le système affiche "Incompatible avec burn email"
```

---

### Story 3.3: Watermark forensic automatique

En tant que créateur de screening,
Je veux que le watermark forensic s'active automatiquement pour les Titles récents,
Afin de protéger les contenus sensibles selon la politique plateforme.

**Acceptance Criteria:**

```gherkin
Given un Title avec une date de sortie inférieure au seuil forensic plateforme
When le créateur sélectionne ce Title pour un screening
Then le watermark forensic est automatiquement activé
```

```gherkin
Given un Title récent déclenchant le watermark forensic
When le créateur arrive sur l'étape 3 de la modale
Then une alerte est affichée "Protection forensic active sur ce screening"
And l'alerte explique les restrictions associées
```

```gherkin
Given un screening avec watermark forensic activé
When le créateur configure les options de partage
Then l'option "partage par lien" est désactivée et grisée
And seul l'envoi par email nominatif est disponible
```

```gherkin
Given un screening avec watermark forensic activé
And 10 destinataires déjà ajoutés
When le créateur tente d'ajouter un 11ème destinataire
Then l'ajout est bloqué
And le système affiche "Maximum 10 destinataires avec protection forensic"
```

---

### Story 3.4: Limites d'accès au screening

En tant que créateur de screening,
Je veux définir des limites d'accès (vues, date, IPs),
Afin de contrôler la diffusion du contenu.

**Acceptance Criteria:**

```gherkin
Given un créateur sur l'étape 3 de la modale
When il définit "Max vues" à 5
Then le screening expirera après 5 visionnages
And le compteur de vues sera visible dans le suivi
```

```gherkin
Given un créateur sur l'étape 3 de la modale
When il définit la date d'expiration au "2026-02-28"
Then le screening sera inaccessible après cette date
And le destinataire verra "Ce lien a expiré"
```

```gherkin
Given un créateur sur l'étape 3 de la modale
When il définit "Max IPs" à 3
Then le screening bloquera l'accès après 3 IPs différentes
And le système affiche "Accès limité atteint" à la 4ème IP
```

---

### Story 3.5: Commentaire interne

En tant que créateur de screening,
Je veux ajouter un commentaire interne au screening,
Afin de noter des informations visibles uniquement par moi.

**Acceptance Criteria:**

```gherkin
Given un créateur sur l'étape 3 de la modale
When il saisit un commentaire "Pour review Q1 - client VIP"
Then le commentaire est enregistré avec le screening
And il est visible uniquement côté créateur (pas destinataire)
```

---

### Story 3.6: Gestion des destinataires

En tant que créateur de screening,
Je veux ajouter des destinataires par email et leur envoyer automatiquement le lien,
Afin de diffuser le screening facilement.

**Acceptance Criteria:**

```gherkin
Given un créateur sur l'étape 3 de la modale
When il ajoute "client@studio.com" comme destinataire
And coche "Envoyer email automatique"
Then un email est envoyé à cette adresse avec le lien
And le destinataire apparaît dans la liste de suivi
```

```gherkin
Given un screening sans watermark forensic
And 50 destinataires déjà ajoutés
When le créateur tente d'ajouter un 51ème destinataire
Then l'ajout est bloqué
And le système affiche "Maximum 50 destinataires par screening"
```

---

### Story 3.7: Génération du lien de partage

En tant que créateur de screening,
Je veux générer un lien de partage manuel,
Afin de l'envoyer moi-même via un autre canal (Slack, etc.).

**Acceptance Criteria:**

```gherkin
Given aucune option bloquant le lien (burn email, forensic)
When le créateur clique "Générer le lien"
Then un lien unique est créé
And le créateur peut le copier pour envoi manuel
```

```gherkin
Given l'option burn email activée
When le créateur regarde la zone "Lien de partage"
Then le bouton est grisé
And un tooltip explique "Lien indisponible : burn email actif"
```

---

## Epic 4: Expérience destinataire (Viewlink)

Le destinataire peut accéder au screening via lien unique, naviguer entre les contenus multi-title, visionner et créer des clips.

### Story 4.1: Accès au screening via lien

En tant que destinataire d'un screening,
Je veux accéder au contenu via le lien reçu,
Afin de visionner les médias partagés.

**Acceptance Criteria:**

```gherkin
Given un screening actif avec lien unique
When le destinataire ouvre ce lien
Then la page viewlink s'affiche
And le contenu est prêt à être visionné
```

```gherkin
Given un screening dont la date d'expiration est passée
When le destinataire ouvre le lien
Then une page d'erreur s'affiche
And le message indique "Ce screening a expiré"
```

```gherkin
Given un screening ayant atteint son max de vues
When le destinataire ouvre le lien
Then une page d'erreur s'affiche
And le message indique "Nombre de visionnages atteint"
```

---

### Story 4.2: Navigation multi-title

En tant que destinataire d'un screening,
Je veux naviguer entre les Titles et Contents du screening,
Afin d'accéder à tous les médias partagés.

**Acceptance Criteria:**

```gherkin
Given un screening multi-title avec "Avatar" et "Titanic"
When le destinataire ouvre le dropdown de navigation
Then il voit la liste des Titles disponibles
And peut sélectionner "Titanic" pour changer de contenu
```

```gherkin
Given un Title "Avatar" avec Contents "Feature" et "Trailer"
When le destinataire sélectionne ce Title
Then il voit les Contents disponibles
And peut naviguer entre eux via le dropdown
```

```gherkin
Given un screening avec plusieurs Assets
When le destinataire arrive sur la page
Then les Assets sont affichés en cartes cliquables
And cliquer sur une carte charge cet Asset dans le player
```

---

### Story 4.3: Visionnage avec player

En tant que destinataire d'un screening,
Je veux visionner le contenu avec des contrôles de lecture,
Afin de consulter les médias confortablement.

**Acceptance Criteria:**

```gherkin
Given un screening accessible
When le destinataire lance la lecture
Then le player affiche le contenu avec les langues configurées
And les contrôles standard sont disponibles (play, pause, seek, volume)
```

---

### Story 4.4: Création de clips

En tant que destinataire d'un screening,
Je veux créer des clips pendant le visionnage,
Afin de marquer des passages intéressants avec un commentaire.

**Acceptance Criteria:**

```gherkin
Given le destinataire en train de visionner un contenu
When il définit un point d'entrée et un point de sortie
And clique "Créer clip"
Then le clip est enregistré avec les timecodes
And il peut ajouter un commentaire au clip
```

---

## Epic 5: Suivi et Analytics

Le créateur peut suivre l'activité de visionnage (marqueurs, temps, pourcentage, IPs) et gérer les clips créés par les destinataires.

### Story 5.1: Enregistrement des marqueurs de visionnage

En tant que créateur de screening,
Je veux que les segments visionnés soient enregistrés,
Afin de savoir précisément ce que le destinataire a regardé.

**Acceptance Criteria:**

```gherkin
Given un destinataire visionnant un contenu de 60 minutes
When il regarde de 0:00 à 15:00, puis saute à 45:00 jusqu'à 60:00
Then le système enregistre les segments [0:00-15:00] et [45:00-60:00]
And ces marqueurs sont visibles sur une timeline
```

```gherkin
Given une session avec segments [0:00-15:00] et [45:00-60:00]
Then le temps total visionné est 30 minutes
And cette valeur est affichée dans les analytics
```

```gherkin
Given un contenu de 60 minutes
And des segments visionnés totalisant 30 minutes uniques
Then le pourcentage affiché est 50%
```

---

### Story 5.2: Identification des sessions par IP

En tant que créateur de screening,
Je veux identifier les sessions de visionnage par IP,
Afin de détecter les accès multiples.

**Acceptance Criteria:**

```gherkin
Given deux sessions depuis des IPs différentes
When le créateur consulte les analytics
Then chaque session est identifiée par son IP
And le nombre d'IPs uniques est affiché
```

---

### Story 5.3: Consultation analytics par destinataire

En tant que créateur de screening,
Je veux consulter les statistiques détaillées par destinataire,
Afin de mesurer l'engagement individuel.

**Acceptance Criteria:**

```gherkin
Given un screening envoyé à "client@studio.com"
When le créateur ouvre le détail de ce destinataire
Then il voit les métriques: dernière vue, temps total, pourcentage vu, nombre de sessions
```

```gherkin
Given un screening multi-title avec "Avatar" (5 vues) et "Titanic" (3 vues)
When le créateur consulte les analytics
Then il voit le total global (8 vues)
And le détail par Title avec les vues respectives
```

---

### Story 5.4: Gestion des clips destinataires

En tant que créateur de screening,
Je veux voir les clips créés par les destinataires et les réimporter,
Afin de récupérer leurs feedbacks dans la plateforme.

**Acceptance Criteria:**

```gherkin
Given un destinataire ayant créé 2 clips sur un screening
When le créateur consulte le screening
Then il voit la liste des clips créés
And chaque clip affiche: timecodes, commentaire, auteur
```

```gherkin
Given un clip créé par un destinataire sur un asset
When le créateur clique "Importer dans Mediaspot"
Then le clip est créé sur l'asset source dans la plateforme
And il est lié au screening d'origine pour traçabilité
```
