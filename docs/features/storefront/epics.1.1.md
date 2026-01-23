---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - docs/features/storefront/prd.md
  - docs/features/storefront/mockups/growth/Storefront/Admin/Catalog.png
  - docs/features/storefront/mockups/growth/Add titles Drawer.png
  - docs/features/storefront/mockups/growth/Add titles Drawer/Adding.png
  - docs/features/storefront/mockups/growth/Drawer.png
  - docs/features/storefront/mockups/growth/Drawer-1.png
  - docs/features/storefront/mockups/growth/Browsing/Single title.png
  - docs/features/storefront/mockups/growth/Bulk manage contents.png
projectContext: brownfield
projectPhase: "Phase 2 - Growth"
---

# Storefront Growth - Epic Breakdown

## Overview

Ce document fournit la décomposition en epics et stories pour la **Phase 2 (Growth)** du Storefront Mediaspot : **Sélection granulaire des contenus par titre**.

**Contexte :** Projet brownfield - MVP livré et en production. Cette phase ajoute le contrôle fin des contenus exposés.

**Objectif Growth :** Permettre aux admins de choisir précisément quels contenus (Feature, Trailer, Marketing, Episodes) sont visibles pour chaque titre sur leur storefront.

## Requirements Inventory

### Functional Requirements

#### FR-GCS: Granular Content Selection

```
FR-GCS-1: Ajout d'un titre avec sélection des contenus
  Given un admin dans le drawer d'ajout de titres
  When il ajoute un titre au storefront
  Then il peut sélectionner les types de contenus à exposer (Feature, Trailer, Marketing, Episode)
  And les contenus sélectionnés sont affichés comme tags sur le titre dans la liste

FR-GCS-2: Définition d'une sélection par défaut
  Given un admin dans le drawer d'ajout de titres
  When il configure une sélection de contenus pour un titre
  Then il peut cliquer sur "Save as default"
  And cette configuration s'appliquera automatiquement aux prochains titres ajoutés

FR-GCS-3: Ajout de titre avec configuration par défaut
  Given un admin ayant défini une configuration par défaut
  When il ajoute un nouveau titre
  Then les contenus sont pré-sélectionnés selon la configuration par défaut
  And il peut modifier cette sélection avant de valider

FR-GCS-4: Vue des contenus partagés dans le catalogue admin
  Given un admin sur l'onglet Catalogue d'un storefront
  When il consulte la liste des titres
  Then il voit pour chaque titre les colonnes : Title, Shared contents, Best Quality, Audio Languages, Subtitle Languages

FR-GCS-5: Modification des contenus d'un titre individuel
  Given un admin sur l'onglet Catalogue d'un storefront
  And un titre déjà ajouté au storefront
  When il clique sur la ligne du titre
  Then un drawer s'ouvre avec les options de contenus
  And il peut cocher/décocher Feature, Trailer, Marketing, Episode
  And les modifications sont sauvegardées au clic sur "Save"

FR-GCS-6: Modification bulk des contenus
  Given un admin sur l'onglet Catalogue d'un storefront
  And plusieurs titres sélectionnés dans le tableau
  When il clique sur "Manage contents"
  Then une modal s'ouvre avec les types de contenus disponibles
  And au clic sur "Apply to all", les contenus sélectionnés sont activés en best effort sur tous les titres
  And si un type de contenu n'existe pas pour un titre, il est ignoré pour ce titre

FR-GCS-7: Player filtré selon les contenus exposés
  Given un client connecté au storefront
  And un titre avec uniquement certains contenus exposés
  When il accède à la page du titre
  Then le player n'affiche que les contenus qui ont été ajoutés par l'admin

FR-GCS-8: Contenus non exposés inaccessibles
  Given un client sur une page titre
  And certains contenus ne sont PAS exposés pour ce titre
  Then ces contenus n'apparaissent pas dans le player
  And le client ne peut pas les visionner
```

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR-GCS-1 | Epic 1 | Ajout d'un titre avec sélection des contenus |
| FR-GCS-2 | Epic 1 | Définition d'une sélection par défaut |
| FR-GCS-3 | Epic 1 | Ajout de titre avec configuration par défaut |
| FR-GCS-4 | Epic 2 | Vue des contenus partagés dans le catalogue admin |
| FR-GCS-5 | Epic 2 | Modification des contenus d'un titre individuel |
| FR-GCS-6 | Epic 2 | Modification bulk des contenus |
| FR-GCS-7 | Epic 3 | Player filtré selon les contenus exposés |
| FR-GCS-8 | Epic 3 | Contenus non exposés inaccessibles |

**Couverture : 8/8 FRs mappés (100%)**

## Epic List

### Epic 1 : Sélection des contenus à l'ajout

Un admin peut choisir quels contenus exposer lors de l'ajout d'un titre au storefront.

**FRs couverts :** FR-GCS-1, FR-GCS-2, FR-GCS-3

**Valeur livrée :**
- Sélection granulaire des contenus (Feature, Trailer, Marketing, Episode) à l'ajout
- Configuration par défaut persistante
- Affichage des tags de contenus dans la liste

---

### Epic 2 : Gestion des contenus post-ajout

Un admin peut modifier les contenus exposés pour les titres déjà ajoutés, individuellement ou en masse.

**FRs couverts :** FR-GCS-4, FR-GCS-5, FR-GCS-6

**Valeur livrée :**
- Vue enrichie du catalogue admin (Shared contents, Best Quality, Audio/Subtitle Languages)
- Modification individuelle via clic sur la ligne
- Modification bulk via modal "Manage contents" (best effort)

---

### Epic 3 : Player client filtré

Un client ne voit dans le player que les contenus que l'admin a choisi d'exposer pour chaque titre.

**FRs couverts :** FR-GCS-7, FR-GCS-8

**Valeur livrée :**
- Player affichant uniquement les contenus ajoutés
- Contenus non exposés invisibles et inaccessibles

---

## Epic 1 : Sélection des contenus à l'ajout

Un admin peut choisir quels contenus exposer lors de l'ajout d'un titre au storefront.

### Story 1.1 : Sélection des contenus lors de l'ajout d'un titre

**As a** admin storefront,
**I want** sélectionner quels contenus exposer lorsque j'ajoute un titre,
**So that** je contrôle précisément ce que mes clients peuvent voir pour chaque titre.

**Acceptance Criteria:**

**Given** un admin dans le drawer d'ajout de titres
**When** il clique sur "Add +" pour un titre
**Then** un menu s'affiche avec les options de contenus : Feature, Trailer, Marketing, Episode

**Given** un admin voyant les options de contenus
**When** il coche/décoche les types de contenus
**Then** seuls les contenus cochés seront visibles côté client pour ce titre

**Given** un admin ayant sélectionné des contenus pour un titre
**When** il valide l'ajout (clic sur "Save" ou "Done")
**Then** le titre apparaît dans la liste du drawer avec des tags indiquant les contenus partagés (ex: "Feature", "Trailer", "+2")

**Given** un titre sans contenu d'un certain type dans la distribution
**When** l'admin voit les options
**Then** ce type de contenu n'est pas proposé ou est grisé

---

### Story 1.2 : Configuration par défaut des contenus

**As a** admin storefront,
**I want** définir une configuration par défaut pour les contenus,
**So that** je n'aie pas à resélectionner les mêmes options pour chaque titre.

**Acceptance Criteria:**

**Given** un admin dans le drawer d'ajout avec une sélection de contenus
**When** il clique sur "Save as default"
**Then** cette configuration est sauvegardée comme défaut pour ce storefront

**Given** un admin ayant défini une configuration par défaut
**When** il clique sur "Add +" pour un nouveau titre
**Then** les contenus sont pré-cochés selon la configuration par défaut

**Given** un admin avec des contenus pré-cochés par défaut
**When** il modifie la sélection pour un titre spécifique
**Then** la modification s'applique uniquement à ce titre
**And** le défaut reste inchangé pour les prochains ajouts

**Given** un admin sur un storefront sans configuration par défaut
**When** il ajoute un titre
**Then** tous les contenus disponibles sont cochés par défaut

---

## Epic 2 : Gestion des contenus post-ajout

Un admin peut modifier les contenus exposés pour les titres déjà ajoutés, individuellement ou en masse.

### Story 2.1 : Vue enrichie du catalogue admin

**As a** admin storefront,
**I want** voir d'un coup d'oeil les contenus et métadonnées techniques de chaque titre,
**So that** je puisse rapidement identifier les titres et leurs caractéristiques.

**Acceptance Criteria:**

**Given** un admin sur l'onglet Catalogue d'un storefront
**When** il consulte la liste des titres
**Then** il voit les colonnes suivantes :
  | Colonne | Contenu |
  |---------|---------|
  | Title | Visuel + nom du titre |
  | Shared contents | Tags des types de contenus exposés |
  | Best Quality | Qualité maximale disponible (ex: 4K, HD) |
  | Audio Languages | Langues audio disponibles |
  | Subtitle Languages | Langues de sous-titres disponibles |

**Given** un admin voyant la colonne "Shared contents"
**When** un titre a plusieurs contenus
**Then** les tags principaux sont affichés (ex: "Feature", "Trailer") avec un indicateur du reste (ex: "+2")

---

### Story 2.2 : Modification individuelle des contenus

**As a** admin storefront,
**I want** modifier les contenus exposés pour un titre spécifique,
**So that** je puisse ajuster la visibilité après l'ajout initial.

**Acceptance Criteria:**

**Given** un admin sur l'onglet Catalogue
**And** un titre déjà ajouté au storefront
**When** il clique sur la ligne du titre
**Then** un drawer s'ouvre avec les options de contenus

**Given** un admin dans le drawer de modification
**When** il voit les checkboxes Feature, Trailer, Marketing, Episode
**Then** l'état actuel (coché/décoché) reflète la configuration existante

**Given** un admin modifiant les contenus
**When** il coche/décoche des options et clique sur "Save"
**Then** les modifications sont sauvegardées
**And** la liste se rafraîchit avec les nouveaux tags dans "Shared contents"

**Given** un admin modifiant les contenus
**When** il clique sur "Cancel" ou ferme le drawer
**Then** les modifications sont annulées

---

### Story 2.3 : Modification bulk des contenus

**As a** admin storefront,
**I want** modifier les contenus de plusieurs titres en une seule action,
**So that** je puisse appliquer rapidement une configuration sur un ensemble de titres.

**Acceptance Criteria:**

**Given** un admin sur l'onglet Catalogue
**When** il sélectionne plusieurs titres via les checkboxes du tableau
**Then** un bouton "Manage contents" devient visible

**Given** un admin ayant sélectionné des titres
**When** il clique sur "Manage contents"
**Then** une modal s'ouvre avec les options : Feature, Trailer, Marketing, Episode

**Given** un admin dans la modal bulk
**When** il voit le message explicatif
**Then** il lit "Edit the shared contents in bulk. This will replace your current selection."

**Given** un admin configurant les contenus en bulk
**When** il coche les options souhaitées et clique sur "Apply to all"
**Then** les contenus sélectionnés sont activés en best effort sur tous les titres du tableau
**And** si un type de contenu n'existe pas pour un titre donné, il est ignoré pour ce titre
**And** les autres contenus (non cochés) sont désactivés

**Given** un admin dans la modal bulk
**When** il clique sur "Cancel"
**Then** aucune modification n'est appliquée
**And** la modal se ferme

---

## Epic 3 : Player client filtré

Un client ne voit dans le player que les contenus que l'admin a choisi d'exposer pour chaque titre.

### Story 3.1 : Player affichant uniquement les contenus exposés

**As a** client connecté au storefront,
**I want** voir dans le player uniquement les contenus que le distributeur a choisi de me montrer,
**So that** je consulte une sélection curatée et pertinente.

**Acceptance Criteria:**

**Given** un client connecté au storefront
**And** un titre avec Feature et Trailer exposés (Marketing et Episode non exposés)
**When** il accède à la page du titre
**Then** le player propose uniquement Feature et Trailer
**And** Marketing et Episode n'apparaissent pas dans le player

**Given** un client sur une page titre
**When** des contenus sont disponibles dans le player
**Then** il peut sélectionner et visionner chaque contenu exposé

**Given** un client sur une page titre
**And** seul le Trailer est exposé (pas de Feature)
**When** il utilise le player
**Then** seul le Trailer est disponible à la lecture
**And** aucune option ne permet d'accéder au Feature

---

### Story 3.2 : Sécurité des contenus non exposés

**As a** client connecté au storefront,
**I want** ne pas pouvoir accéder aux contenus que le distributeur n'a pas exposés,
**So that** la curation du storefront soit respectée.

**Acceptance Criteria:**

**Given** un client sur une page titre
**And** le contenu Feature n'est PAS exposé pour ce titre
**Then** le Feature n'apparaît pas dans le player
**And** aucun contrôle ne permet d'y accéder

**Given** un client tentant d'accéder directement à un contenu non exposé (URL directe ou manipulation)
**When** il essaie de charger le contenu
**Then** une erreur 403 ou 404 est retournée
**And** le contenu n'est pas servi

**Given** un titre avec aucun contenu exposé
**When** un client accède à la page titre
**Then** le player est vide ou masqué
**And** les métadonnées du titre restent visibles

---

## Technical Notes

### Modèle de données

Extension du modèle `StorefrontTitle` existant :

```typescript
interface StorefrontTitleContent {
  titleId: string;
  exposedContentTypes: ContentType[];
}

enum ContentType {
  FEATURE = 'feature',
  TRAILER = 'trailer',
  MARKETING = 'marketing',
  EPISODE = 'episode'
}

interface StorefrontContentDefaults {
  storefrontId: string;
  defaultContentTypes: ContentType[];
}
```

### Points d'attention

- **Rétrocompatibilité** : Les titres ajoutés avant Growth doivent avoir tous leurs contenus exposés par défaut
- **Performance** : Le filtrage des contenus doit se faire côté serveur pour éviter de transmettre des données non autorisées
- **Best effort bulk** : L'API doit gérer gracieusement les cas où un contenu demandé n'existe pas pour un titre
- **Cohérence** : Si un type de contenu n'existe pas pour un titre dans la distribution, il ne doit pas apparaître dans les options
