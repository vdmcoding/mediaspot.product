---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - docs/features/storefront/prd.md
  - docs/features/storefront/source-documents/lib/admin-types.ts
  - docs/features/storefront/source-documents/lib/admin-api.ts
  - docs/features/storefront/source-documents/lib/browsing-types.ts
  - docs/features/storefront/source-documents/lib/browsing-api.ts
  - docs/features/storefront/source-documents/storefront-paths.tsx
  - docs/features/storefront/source-documents/storefront-routes.tsx
  - docs/features/storefront/source-documents/storefront-browsing-paths.tsx
  - docs/features/storefront/source-documents/storefront-browsing-routes.tsx
  - docs/features/storefront/mockups/Admin/list.png
  - docs/features/storefront/mockups/Admin/Single.jpg
  - docs/features/storefront/mockups/Admin/admin-v2-catalog-tab.png
  - docs/features/storefront/mockups/Admin/Add titles Drawer.png
  - docs/features/storefront/mockups/Browsing/Homepage.png
  - docs/features/storefront/mockups/Browsing/Catalog.jpg
  - docs/features/storefront/mockups/Browsing/Catalog/Subcategory.jpg
  - docs/features/storefront/mockups/Browsing/Catalog/Title page.png
  - docs/features/storefront/mockups/Browsing/Collections.png
  - docs/features/storefront/mockups/Browsing/Collection single.jpg
  - docs/features/storefront/mockups/Browsing/Wishlists.png
  - docs/features/storefront/mockups/Browsing/Wishlist/Single.png
  - docs/features/storefront/mockups/Browsing/AccountCreation/Signup/Create an account.png
  - docs/features/storefront/mockups/Browsing/AccountCreation/Signup/Create an account-1.png
  - docs/features/storefront/mockups/Browsing/AccountCreation/Signup/Create an account-2.png
  - docs/features/storefront/mockups/Browsing/AccountCreation/Signup/Create an account-3.png
  - docs/features/storefront/mockups/Browsing/AccountCreation/Signup/Request confirmed.png
projectContext: brownfield
projectPhase: "Phase 2 - Growth"
---

# Storefront - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en epics et stories pour le **Storefront Mediaspot**, transformant les requirements du PRD et le contexte technique existant en stories implémentables.

**Contexte :** Projet brownfield - MVP livré et en production. Phase 2 (Growth) en cours.

## Requirements Inventory

### Functional Requirements

#### FR-SM: Storefront Management

```
FR-SM-1: Création d'un storefront
  Given un admin storefront authentifié
  When il crée un nouveau storefront
  Then il définit un nom et un subdomain
  And le storefront est accessible via app.mediaspot.io/store/{subdomain}
  And pour les clients avec sous-domaine personnalisé, via {client}.mediaspot.io/store/{subdomain}

FR-SM-2: Duplication d'un storefront
  Given un admin storefront authentifié
  And un storefront existant
  When il duplique le storefront
  Then il entre un nouveau nom et subdomain
  And un nouveau storefront est créé avec toutes les données du storefront source

FR-SM-3: Liste des storefronts
  Given un admin storefront authentifié
  When il accède à la liste des storefronts
  Then il voit tous les storefronts auxquels il a accès
  And il peut voir le nombre d'utilisateurs et de demandes par storefront

FR-SM-4: Suppression d'un storefront
  Given un admin storefront authentifié
  And un storefront existant
  When il supprime le storefront
  Then le storefront et toutes ses données associées sont supprimés
```

#### FR-BH: Branding & Homepage

```
FR-BH-1: Configuration du branding
  Given un admin sur la page de configuration d'un storefront
  When il configure le branding
  Then il peut uploader un logo
  And il peut uploader une image de cover
  And il peut définir une catchphrase

FR-BH-2: Configuration de la homepage
  Given un admin sur l'onglet Homepage d'un storefront
  When il configure la homepage
  Then il peut sélectionner des titres pour le hero slider
  And il peut sélectionner des genres à mettre en avant
  And il peut sélectionner des collections à showcaser

FR-BH-3: Preview visuelle temps réel
  Given un admin configurant la homepage ou les collections
  Then un panel de preview à droite du formulaire est toujours présent
  And il affiche le rendu en temps réel des modifications

FR-BH-4: Preview navigation complète
  Given un admin sur la page d'un storefront
  When il clique sur le bouton de preview
  Then il est redirigé vers l'URL publique du storefront
  And il peut naviguer comme un client final
```

#### FR-CC: Catalogue Curation

```
FR-CC-1: Ajout de titres au storefront
  Given un admin sur l'onglet Catalogue d'un storefront
  When il ouvre le drawer d'ajout de titres
  Then il peut rechercher dans sa distribution via une string
  And il peut filtrer par genre, langue et qualité
  And il peut sélectionner des titres individuellement
  And il peut ajouter tous les titres de la recherche actuelle
  And il peut retirer tous les titres de la recherche actuelle

FR-CC-2: Retrait de titres du storefront
  Given un admin sur l'onglet Catalogue d'un storefront
  And des titres déjà sélectionnés
  When il retire un titre
  Then le titre n'est plus visible sur le storefront

FR-CC-3: Ajout de collections au storefront
  Given un admin sur l'onglet Collections d'un storefront
  When il ajoute des collections
  Then il sélectionne parmi les collections existantes de la plateforme
  And les collections ajoutées deviennent visibles sur le storefront

FR-CC-4: Retrait de collections du storefront
  Given un admin sur l'onglet Collections d'un storefront
  And des collections déjà ajoutées
  When il retire une collection
  Then la collection n'est plus visible sur le storefront
```

#### FR-DC: Documents & Contacts

```
FR-DC-1: Upload de documents
  Given un admin sur l'onglet Documents d'un storefront
  When il uploade un document
  Then le document est disponible au téléchargement pour les clients

FR-DC-2: Suppression de documents
  Given un admin sur l'onglet Documents d'un storefront
  And des documents existants
  When il supprime un document
  Then le document n'est plus accessible aux clients

FR-DC-3: Ajout de points de contact
  Given un admin sur l'onglet Contacts d'un storefront
  When il ajoute un point de contact
  Then il peut définir le nom du contact
  And il peut uploader un avatar
  And il peut définir le rôle du contact
  And il peut ajouter une description
  And il peut définir les coordonnées

FR-DC-4: Modification des points de contact
  Given un admin sur l'onglet Contacts d'un storefront
  And des contacts existants
  When il modifie ou supprime un contact
  Then les modifications sont reflétées côté client
```

#### FR-UA: User Access Management

```
FR-UA-1: Demande de création de compte
  Given un visiteur sur la page Welcome d'un storefront
  When il remplit le formulaire de demande (prénom, nom, email, société)
  Then sa demande est enregistrée avec le statut PENDING
  And il voit un message de confirmation "Account requested — pending approval"

FR-UA-2: Approbation d'une demande
  Given un admin sur l'onglet Users d'un storefront
  And une demande PENDING
  When il approuve la demande
  Then il peut définir une date d'expiration optionnelle
  And le client reçoit un email avec un lien pour définir son mot de passe

FR-UA-3: Rejet d'une demande
  Given un admin sur l'onglet Users d'un storefront
  And une demande PENDING
  When il rejette la demande
  Then la demande est supprimée
  And le client n'est pas notifié

FR-UA-4: Confirmation de compte
  Given un client ayant reçu l'email de confirmation
  When il clique sur le lien et définit son mot de passe
  Then son compte passe au statut ACTIVE
  And il peut se connecter au storefront

FR-UA-5: Connexion client
  Given un client avec un compte ACTIVE
  When il se connecte avec email et mot de passe
  Then il accède au storefront

FR-UA-6: Désactivation d'un compte
  Given un admin sur l'onglet Users d'un storefront
  And un utilisateur ACTIVE
  When il désactive l'utilisateur
  Then l'utilisateur passe au statut DISABLED
  And il ne peut plus accéder au storefront

FR-UA-7: Expiration automatique
  Given un utilisateur avec une date d'expiration définie
  When la date d'expiration est atteinte
  Then l'utilisateur passe au statut EXPIRED
  And il ne peut plus accéder au storefront
```

#### FR-CB: Client Browsing

```
FR-CB-1: Affichage de la homepage
  Given un client connecté au storefront
  When il accède à la homepage
  Then il voit le branding (logo, cover, catchphrase)
  And il voit le hero slider avec les titres mis en avant
  And il voit les genres mis en avant
  And il voit les collections showcasées

FR-CB-2: Navigation du catalogue
  Given un client connecté au storefront
  When il accède au catalogue
  Then il peut rechercher par string (pattern)
  And il peut filtrer par genre
  And il peut filtrer par catalogue type
  And il peut filtrer par qualité
  And il peut filtrer par picture format

FR-CB-3: Navigation par catégorie
  Given un client sur le catalogue
  When il sélectionne un genre ou une sous-catégorie
  Then il voit uniquement les titres correspondants

FR-CB-4: Page titre
  Given un client naviguant le catalogue
  When il clique sur un titre
  Then il voit la page détaillée du titre
  And il voit les métadonnées (synopsis, durée, épisodes, langues disponibles, etc.)
  And il peut visionner les contenus via le player intégré

FR-CB-5: Navigation des collections
  Given un client connecté au storefront
  When il accède à la liste des collections
  Then il voit toutes les collections du storefront

FR-CB-6: Page collection
  Given un client naviguant les collections
  When il clique sur une collection
  Then il voit la page détaillée de la collection
  And il voit tous les titres de la collection

FR-CB-7: Affichage des contacts
  Given un client connecté au storefront
  When il consulte les points de contact
  Then il voit les coordonnées des commerciaux

FR-CB-8: Téléchargement de documents
  Given un client connecté au storefront
  When il accède aux documents
  Then il peut télécharger les documents disponibles
```

#### FR-WL: Wishlists

```
FR-WL-1: Création d'une wishlist
  Given un client connecté au storefront
  When il crée une nouvelle wishlist
  Then il peut nommer la wishlist
  And la wishlist est créée vide

FR-WL-2: Ajout d'un titre à une wishlist
  Given un client connecté au storefront
  When il ajoute un titre à une wishlist
  Then il peut le faire depuis la page titre
  And il peut le faire depuis une page collection
  And il peut le faire depuis le catalogue

FR-WL-3: Ajout multiple de titres à une wishlist
  Given un client sur le catalogue ou une page collection
  When il sélectionne plusieurs titres
  Then il peut les ajouter en lot à une wishlist

FR-WL-4: Consultation des wishlists
  Given un client connecté au storefront
  When il accède à ses wishlists
  Then il voit la liste de ses wishlists
  And il peut accéder au détail de chaque wishlist avec ses titres

FR-WL-5: Retrait d'un titre d'une wishlist
  Given un client sur une wishlist
  And des titres dans la wishlist
  When il retire un titre
  Then le titre n'apparaît plus dans la wishlist

FR-WL-6: Suppression d'une wishlist
  Given un client connecté au storefront
  And une wishlist existante
  When il supprime la wishlist
  Then la wishlist et son contenu sont supprimés

FR-WL-7: Persistance des wishlists
  Given un client avec des wishlists
  When il se déconnecte puis se reconnecte
  Then il retrouve ses wishlists intactes
```

### NonFunctional Requirements

```
NFR-1: Performance
  - Chargement catalogue < 2s quelle que soit la taille (jusqu'à 1000+ titres)
  - Navigation fluide sans latence perceptible lors du browsing

NFR-2: Sécurité
  - Authentification obligatoire pour tout accès aux contenus
  - Tokens JWT avec expiration appropriée
  - Validation stricte des credentials à chaque requête authentifiée
  - Isolation multi-tenant : données d'un storefront jamais accessibles depuis un autre
  - Wishlists, utilisateurs et configurations strictement isolés par storefront
  - Contenus vidéo accessibles uniquement aux utilisateurs authentifiés du storefront

NFR-3: Scalabilité
  - Support catalogues 1000+ titres par storefront
  - Multiples storefronts par organisation (selon licence)
  - Utilisateurs concurrents non contraints (architecture cloud)

NFR-4: Disponibilité
  - Uptime 99.5%
  - Maintenance planifiée hors heures business EU

NFR-5: Intégration
  - Catalogue Distribution : synchrone, même disponibilité que la plateforme principale
  - Flow Emailing : asynchrone, emails envoyés sous 5 minutes
  - API Storefront : REST, documentée, versionnée
```

### Additional Requirements

**Contexte Projet :**
- Type : SaaS B2B - Distribution de contenus média
- Statut : Brownfield - MVP livré et en production
- Phase actuelle : Phase 2 (Growth) - Contrôle granulaire des contenus

**Stack Technique Existante :**
- Frontend : React avec TypeScript
- State Management : Redux Toolkit Query (RTK Query)
- Validation : Zod schemas
- API : REST via `storefront-service` (admin et browsing séparés)

**Architecture Multi-tenant :**
- Isolation complète des données entre storefronts
- Un administrateur peut gérer plusieurs storefronts
- Catalogue source partagé (distribution), configuration isolée par storefront

**Intégrations Existantes :**
- Catalogue Distribution (interne) - source des titres et métadonnées
- Flow Emailing Mediaspot - notifications account flow
- API Storefront exposée - CRUD storefronts, users, wishlists, browsing

**Modèle de Données Clés :**
- `StorefrontFull` : entité principale avec branding, catalog, documents, contacts
- `User` avec statuts : PENDING, ACTIVE, DISABLED, EXPIRED
- `Wishlist` : id, name, titleIds[]
- `StorefrontBranding` : heroSliderTitleIds, showcasedCollectionIds, showcasedGenres, catchphrase, logoId, coverId

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR-SM-1 | Epic 1 | Création d'un storefront |
| FR-SM-2 | Epic 1 | Duplication d'un storefront |
| FR-SM-3 | Epic 1 | Liste des storefronts |
| FR-SM-4 | Epic 1 | Suppression d'un storefront |
| FR-BH-1 | Epic 1 | Configuration du branding |
| FR-BH-2 | Epic 1 | Configuration de la homepage |
| FR-BH-3 | Epic 1 | Preview visuelle temps réel |
| FR-BH-4 | Epic 1 | Preview navigation complète |
| FR-CC-1 | Epic 2 | Ajout de titres au storefront |
| FR-CC-2 | Epic 2 | Retrait de titres du storefront |
| FR-CC-3 | Epic 2 | Ajout de collections au storefront |
| FR-CC-4 | Epic 2 | Retrait de collections du storefront |
| FR-DC-1 | Epic 3 | Upload de documents |
| FR-DC-2 | Epic 3 | Suppression de documents |
| FR-DC-3 | Epic 3 | Ajout de points de contact |
| FR-DC-4 | Epic 3 | Modification des points de contact |
| FR-UA-1 | Epic 4 | Demande de création de compte |
| FR-UA-2 | Epic 4 | Approbation d'une demande |
| FR-UA-3 | Epic 4 | Rejet d'une demande |
| FR-UA-4 | Epic 4 | Confirmation de compte |
| FR-UA-5 | Epic 4 | Connexion client |
| FR-UA-6 | Epic 4 | Désactivation d'un compte |
| FR-UA-7 | Epic 4 | Expiration automatique |
| FR-CB-1 | Epic 5 | Affichage de la homepage |
| FR-CB-2 | Epic 5 | Navigation du catalogue |
| FR-CB-3 | Epic 5 | Navigation par catégorie |
| FR-CB-4 | Epic 5 | Page titre |
| FR-CB-5 | Epic 5 | Navigation des collections |
| FR-CB-6 | Epic 5 | Page collection |
| FR-CB-7 | Epic 5 | Affichage des contacts |
| FR-CB-8 | Epic 5 | Téléchargement de documents |
| FR-WL-1 | Epic 6 | Création d'une wishlist |
| FR-WL-2 | Epic 6 | Ajout d'un titre à une wishlist |
| FR-WL-3 | Epic 6 | Ajout multiple de titres |
| FR-WL-4 | Epic 6 | Consultation des wishlists |
| FR-WL-5 | Epic 6 | Retrait d'un titre |
| FR-WL-6 | Epic 6 | Suppression d'une wishlist |
| FR-WL-7 | Epic 6 | Persistance des wishlists |

**Couverture : 38/38 FRs mappés (100%)**

## Epic List

### Epic 1 : Création et Branding du Storefront

Un admin peut créer un storefront brandé avec sa homepage personnalisée et prévisualiser le résultat final.

**FRs couverts :** FR-SM-1, FR-SM-2, FR-SM-3, FR-SM-4, FR-BH-1, FR-BH-2, FR-BH-3, FR-BH-4

**Valeur livrée :**
- Création/duplication/suppression de storefronts
- Configuration branding (logo, cover, catchphrase)
- Configuration homepage (hero slider, genres, collections)
- Preview temps réel et navigation complète

---

### Epic 2 : Curation du Catalogue

Un admin peut sélectionner précisément les titres et collections à exposer sur son storefront.

**FRs couverts :** FR-CC-1, FR-CC-2, FR-CC-3, FR-CC-4

**Valeur livrée :**
- Recherche et filtrage dans le catalogue distribution
- Ajout/retrait de titres (individuel et bulk)
- Ajout/retrait de collections

---

### Epic 3 : Contacts et Documents

Un admin peut configurer les points de contact commerciaux et les documents téléchargeables pour ses clients.

**FRs couverts :** FR-DC-1, FR-DC-2, FR-DC-3, FR-DC-4

**Valeur livrée :**
- Upload/suppression de documents (PDF, PPT, etc.)
- Ajout/modification de points de contact (avatar, rôle, coordonnées)

---

### Epic 4 : Gestion des Accès Clients

Un admin peut contrôler qui accède à son storefront. Un visiteur peut demander un accès et créer son compte.

**FRs couverts :** FR-UA-1, FR-UA-2, FR-UA-3, FR-UA-4, FR-UA-5, FR-UA-6, FR-UA-7

**Valeur livrée :**
- Flow complet de demande d'accès (request → approve → confirm → login)
- Gestion des utilisateurs (approve/reject/disable)
- Expiration automatique des comptes

---

### Epic 5 : Navigation et Exploration Client

Un client connecté peut naviguer librement dans le catalogue, découvrir des titres et visionner les contenus.

**FRs couverts :** FR-CB-1, FR-CB-2, FR-CB-3, FR-CB-4, FR-CB-5, FR-CB-6, FR-CB-7, FR-CB-8

**Valeur livrée :**
- Homepage avec branding et contenus mis en avant
- Catalogue avec recherche et filtres avancés
- Navigation par catégories et collections
- Pages titre avec métadonnées et player intégré
- Accès aux contacts et documents

---

### Epic 6 : Wishlists

Un client peut organiser sa sélection de titres dans des wishlists pour préparer ses acquisitions.

**FRs couverts :** FR-WL-1, FR-WL-2, FR-WL-3, FR-WL-4, FR-WL-5, FR-WL-6, FR-WL-7

**Valeur livrée :**
- Création/suppression de wishlists
- Ajout/retrait de titres (individuel et bulk)
- Persistance entre sessions

---

## Epic 1 : Création et Branding du Storefront

Un admin peut créer un storefront brandé avec sa homepage personnalisée et prévisualiser le résultat final.

### Story 1.1 : Liste des storefronts

**As a** admin storefront,
**I want** voir la liste de tous mes storefronts avec leurs métriques clés,
**So that** je puisse accéder rapidement à celui que je souhaite gérer.

**Acceptance Criteria:**

```gherkin
Given un admin storefront authentifié
When il accède à la page liste des storefronts
Then il voit tous les storefronts auxquels il a accès
And chaque storefront affiche son nom, subdomain, nombre d'utilisateurs et nombre de demandes pending

Given un admin avec plusieurs storefronts
When il clique sur un storefront dans la liste
Then il est redirigé vers la page de configuration de ce storefront
```

---

### Story 1.2 : Création d'un storefront

**As a** admin storefront,
**I want** créer un nouveau storefront avec un nom et un subdomain,
**So that** je puisse commencer à configurer ma vitrine.

**Acceptance Criteria:**

```gherkin
Given un admin sur la liste des storefronts
When il clique sur "Créer un storefront"
Then un formulaire s'affiche demandant le nom et le subdomain

Given un admin remplissant le formulaire de création
When il entre un nom valide (2-100 caractères, lettres et espaces uniquement)
And un subdomain valide (3-50 caractères, lowercase, chiffres, tirets)
Then le storefront est créé
And il est accessible via app.mediaspot.io/store/{subdomain}

Given un admin avec un sous-domaine client personnalisé
When il crée un storefront
Then le storefront est aussi accessible via {client}.mediaspot.io/store/{subdomain}

Given un subdomain déjà utilisé
When l'admin tente de créer un storefront avec ce subdomain
Then une erreur de validation s'affiche
```

---

### Story 1.3 : Configuration du branding

**As a** admin storefront,
**I want** configurer le branding de mon storefront (logo, cover, catchphrase),
**So that** ma vitrine reflète l'identité visuelle de mon événement ou de ma marque.

**Acceptance Criteria:**

```gherkin
Given un admin sur la page de configuration d'un storefront
When il accède à l'onglet Branding
Then il voit les champs logo, cover et catchphrase

Given un admin configurant le branding
When il uploade un logo (image)
Then le logo est sauvegardé et associé au storefront

Given un admin configurant le branding
When il uploade une image de cover
Then la cover est sauvegardée et sera affichée sur la homepage client

Given un admin configurant le branding
When il définit une catchphrase
Then la catchphrase est sauvegardée et sera affichée sur la homepage client
```

---

### Story 1.4 : Configuration de la homepage

**As a** admin storefront,
**I want** configurer les contenus mis en avant sur la homepage,
**So that** mes clients voient immédiatement les titres et collections que je souhaite promouvoir.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Homepage d'un storefront
When il configure le hero slider
Then il peut sélectionner des titres parmi ceux ajoutés au catalogue du storefront
And les titres sélectionnés s'afficheront en rotation sur la homepage

Given un admin sur l'onglet Homepage
When il sélectionne des genres à mettre en avant
Then ces genres seront affichés comme sections sur la homepage

Given un admin sur l'onglet Homepage
When il sélectionne des collections à showcaser
Then ces collections seront mises en avant sur la homepage
```

---

### Story 1.5 : Preview temps réel

**As a** admin storefront,
**I want** voir en temps réel le rendu de mes modifications,
**So that** je puisse ajuster la configuration sans faire d'allers-retours.

**Acceptance Criteria:**

```gherkin
Given un admin configurant la homepage ou le branding
Then un panel de preview est visible à droite du formulaire

Given un admin modifiant la catchphrase
When il tape du texte
Then le panel de preview affiche la modification en temps réel

Given un admin ajoutant un titre au hero slider
When il sélectionne le titre
Then le panel de preview affiche immédiatement le titre dans le slider
```

---

### Story 1.6 : Preview navigation complète

**As a** admin storefront,
**I want** naviguer dans mon storefront comme un client final,
**So that** je puisse valider l'expérience utilisateur avant de partager l'URL.

**Acceptance Criteria:**

```gherkin
Given un admin sur la page d'un storefront
When il clique sur le bouton "Preview"
Then il est redirigé vers l'URL publique du storefront

Given un admin en mode preview
When il navigue sur le storefront
Then il voit exactement la même interface qu'un client connecté
And il peut naviguer homepage, catalogue, collections, pages titres
```

---

### Story 1.7 : Duplication d'un storefront

**As a** admin storefront,
**I want** dupliquer un storefront existant,
**So that** je puisse créer rapidement une nouvelle vitrine basée sur une configuration existante.

**Acceptance Criteria:**

```gherkin
Given un admin sur un storefront existant
When il clique sur "Dupliquer"
Then un formulaire s'affiche demandant un nouveau nom et subdomain

Given un admin validant la duplication
When il entre un nom et subdomain valides
Then un nouveau storefront est créé
And il contient toutes les données du storefront source (branding, catalogue, homepage, documents, contacts)
And les utilisateurs clients ne sont PAS copiés
```

---

### Story 1.8 : Suppression d'un storefront

**As a** admin storefront,
**I want** supprimer un storefront,
**So that** je puisse retirer une vitrine obsolète.

**Acceptance Criteria:**

```gherkin
Given un admin sur un storefront existant
When il clique sur "Supprimer"
Then une confirmation est demandée

Given un admin confirmant la suppression
When il valide
Then le storefront est supprimé
And toutes ses données associées sont supprimées (branding, catalogue, users, wishlists, documents, contacts)
And l'URL devient inaccessible
```

---

## Epic 2 : Curation du Catalogue

Un admin peut sélectionner précisément les titres et collections à exposer sur son storefront.

### Story 2.1 : Recherche et ajout de titres

**As a** admin storefront,
**I want** rechercher et ajouter des titres depuis mon catalogue distribution,
**So that** je puisse sélectionner précisément les contenus à exposer sur ma vitrine.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Catalogue d'un storefront
When il clique sur "Ajouter des titres"
Then un drawer s'ouvre avec une interface de recherche

Given un admin dans le drawer d'ajout
When il saisit une chaîne de recherche
Then les titres correspondants de sa distribution s'affichent

Given un admin dans le drawer d'ajout
When il applique des filtres (genre, langue, qualité)
Then les résultats sont filtrés en conséquence

Given un admin voyant les résultats de recherche
When il sélectionne des titres individuellement
Then les titres sélectionnés sont marqués visuellement

Given un admin avec une recherche active
When il clique sur "Ajouter tous"
Then tous les titres de la recherche actuelle sont ajoutés au storefront

Given un admin avec une recherche active
When il clique sur "Retirer tous"
Then tous les titres de la recherche actuelle sont retirés du storefront
```

---

### Story 2.2 : Retrait de titres

**As a** admin storefront,
**I want** retirer des titres de mon storefront,
**So that** je puisse ajuster ma sélection de contenus.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Catalogue d'un storefront
When il voit la liste des titres sélectionnés
Then chaque titre a une action de retrait

Given un admin sur l'onglet Catalogue
When il clique sur "Retirer" pour un titre
Then le titre est retiré du storefront
And il n'est plus visible côté client
And il disparaît du hero slider s'il y était
```

---

### Story 2.3 : Gestion des collections

**As a** admin storefront,
**I want** ajouter et retirer des collections de mon storefront,
**So that** je puisse proposer des regroupements thématiques de titres à mes clients.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Collections d'un storefront
When il clique sur "Ajouter des collections"
Then il voit la liste des collections disponibles sur la plateforme

Given un admin sélectionnant une collection
When il l'ajoute au storefront
Then la collection devient visible côté client
And tous les titres de la collection sont accessibles

Given un admin sur l'onglet Collections
When il retire une collection
Then la collection n'est plus visible côté client
And elle disparaît des collections showcasées si elle y était
```

---

## Epic 3 : Contacts et Documents

Un admin peut configurer les points de contact commerciaux et les documents téléchargeables pour ses clients.

### Story 3.1 : Gestion des documents

**As a** admin storefront,
**I want** uploader et gérer des documents téléchargeables,
**So that** mes clients puissent accéder à des ressources complémentaires (line-up PDF, présentations).

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Documents d'un storefront
When il clique sur "Ajouter un document"
Then il peut sélectionner un fichier (Doc, Docx, Pdf, Ppt, Pptx)
And définir un nom pour le document

Given un admin uploadant un document
When l'upload est terminé
Then le document apparaît dans la liste
And il est disponible au téléchargement pour les clients connectés

Given un admin sur l'onglet Documents
When il supprime un document
Then le document est retiré de la liste
And il n'est plus accessible aux clients
```

---

### Story 3.2 : Gestion des points de contact

**As a** admin storefront,
**I want** configurer les points de contact commerciaux,
**So that** mes clients puissent facilement contacter les bonnes personnes pour leurs acquisitions.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Contacts d'un storefront
When il clique sur "Ajouter un contact"
Then un formulaire s'affiche avec les champs : nom complet, rôle, description, email, téléphone, avatar

Given un admin remplissant le formulaire de contact
When il définit le nom (2-100 caractères) et le rôle (2-100 caractères)
Then ces champs sont obligatoires

Given un admin ajoutant un contact
When il uploade un avatar (image)
Then l'avatar est associé au contact et affiché côté client

Given un admin sur l'onglet Contacts
When il modifie un contact existant
Then les modifications sont sauvegardées
And elles sont visibles côté client

Given un admin sur l'onglet Contacts
When il supprime un contact
Then le contact est retiré
And il n'apparaît plus côté client
```

---

## Epic 4 : Gestion des Accès Clients

Un admin peut contrôler qui accède à son storefront. Un visiteur peut demander un accès et créer son compte.

### Story 4.1 : Demande d'accès client

**As a** visiteur sur un storefront,
**I want** demander un accès en fournissant mes informations,
**So that** je puisse obtenir l'autorisation de naviguer dans le catalogue.

**Acceptance Criteria:**

```gherkin
Given un visiteur non authentifié sur la page Welcome d'un storefront
When il accède à la page
Then il voit un formulaire de demande d'accès

Given un visiteur sur le formulaire de demande
When il remplit les champs obligatoires (prénom, nom, email, société)
And soumet le formulaire
Then sa demande est enregistrée avec le statut PENDING
And il voit un message "Account requested — pending approval"

Given un visiteur avec un email déjà utilisé pour ce storefront
When il tente de soumettre une demande
Then une erreur s'affiche indiquant que l'email est déjà enregistré
```

---

### Story 4.2 : Traitement des demandes par l'admin

**As a** admin storefront,
**I want** approuver ou rejeter les demandes d'accès,
**So that** je contrôle qui peut accéder à mon catalogue.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Users d'un storefront
When il accède à la liste
Then il voit les demandes PENDING avec nom, email, société

Given un admin voyant une demande PENDING
When il clique sur "Approuver"
Then il peut optionnellement définir une date d'expiration
And le client reçoit un email avec un lien pour définir son mot de passe

Given un admin voyant une demande PENDING
When il clique sur "Rejeter"
Then la demande est supprimée
And le client n'est PAS notifié
```

---

### Story 4.3 : Confirmation et connexion client

**As a** client ayant été approuvé,
**I want** définir mon mot de passe et me connecter,
**So that** je puisse accéder au storefront.

**Acceptance Criteria:**

```gherkin
Given un client ayant reçu l'email de confirmation
When il clique sur le lien
Then il accède à une page pour définir son mot de passe

Given un client sur la page de définition de mot de passe
When il entre un mot de passe et le confirme
Then son compte passe au statut ACTIVE
And il est redirigé vers la page de login

Given un client avec un compte ACTIVE
When il se connecte avec email et mot de passe
Then il accède au storefront
And sa session est persistée via JWT

Given un client avec des credentials invalides
When il tente de se connecter
Then une erreur s'affiche
```

---

### Story 4.4 : Gestion du cycle de vie utilisateur

**As a** admin storefront,
**I want** désactiver des utilisateurs et gérer les expirations,
**So that** je puisse contrôler l'accès dans le temps.

**Acceptance Criteria:**

```gherkin
Given un admin sur l'onglet Users
When il voit un utilisateur ACTIVE
Then il peut le désactiver

Given un admin désactivant un utilisateur
When il confirme
Then l'utilisateur passe au statut DISABLED
And il ne peut plus se connecter au storefront

Given un utilisateur avec une date d'expiration définie
When la date est atteinte
Then l'utilisateur passe automatiquement au statut EXPIRED
And il ne peut plus accéder au storefront

Given un admin sur l'onglet Users
When il voit un utilisateur DISABLED ou EXPIRED
Then il peut le réactiver si nécessaire
```

---

## Epic 5 : Navigation et Exploration Client

Un client connecté peut naviguer librement dans le catalogue, découvrir des titres et visionner les contenus.

### Story 5.1 : Homepage client

**As a** client connecté,
**I want** voir une homepage personnalisée avec le branding et les contenus mis en avant,
**So that** je découvre immédiatement les titres phares du storefront.

**Acceptance Criteria:**

```gherkin
Given un client connecté au storefront
When il accède à la homepage
Then il voit le branding (logo, cover, catchphrase)

Given un client sur la homepage
When des titres sont configurés dans le hero slider
Then il voit les titres en rotation avec leurs visuels

Given un client sur la homepage
When des genres sont mis en avant
Then il voit des sections par genre avec les titres correspondants

Given un client sur la homepage
When des collections sont showcasées
Then il voit les collections mises en avant avec accès direct
```

---

### Story 5.2 : Catalogue et recherche

**As a** client connecté,
**I want** naviguer et rechercher dans le catalogue avec des filtres,
**So that** je puisse trouver les contenus qui correspondent à mes critères.

**Acceptance Criteria:**

```gherkin
Given un client connecté au storefront
When il accède au catalogue
Then il voit tous les titres disponibles sur le storefront

Given un client sur le catalogue
When il saisit une recherche (pattern)
Then les titres correspondants s'affichent

Given un client sur le catalogue
When il applique des filtres (genre, catalogue type, qualité, picture format)
Then les résultats sont filtrés en conséquence

Given un client sur le catalogue
When il sélectionne un genre ou une sous-catégorie
Then il voit uniquement les titres correspondants

Given un client naviguant le catalogue
When il combine recherche et filtres
Then les critères s'appliquent ensemble
```

---

### Story 5.3 : Page titre et player

**As a** client connecté,
**I want** consulter les détails d'un titre et visionner les contenus,
**So that** je puisse évaluer si le titre correspond à mes besoins d'acquisition.

**Acceptance Criteria:**

```gherkin
Given un client naviguant le catalogue
When il clique sur un titre
Then il accède à la page détaillée du titre

Given un client sur une page titre
When il consulte les informations
Then il voit les métadonnées : synopsis, durée, nombre d'épisodes, langues disponibles, qualités

Given un client sur une page titre
When des contenus vidéo sont disponibles (trailer, screener)
Then il peut les visionner via le player intégré

Given un client visionnant une vidéo
When il utilise le player
Then il dispose des contrôles standards (play, pause, volume, fullscreen)
```

---

### Story 5.4 : Collections

**As a** client connecté,
**I want** naviguer dans les collections thématiques,
**So that** je puisse découvrir des titres regroupés par thème.

**Acceptance Criteria:**

```gherkin
Given un client connecté au storefront
When il accède à la liste des collections
Then il voit toutes les collections disponibles sur le storefront

Given un client sur la liste des collections
When il clique sur une collection
Then il accède à la page détaillée de la collection

Given un client sur une page collection
When il consulte le contenu
Then il voit tous les titres de la collection
And il peut accéder à chaque titre
```

---

### Story 5.5 : Contacts et documents

**As a** client connecté,
**I want** accéder aux contacts commerciaux et télécharger les documents,
**So that** je puisse contacter les bonnes personnes et obtenir des ressources complémentaires.

**Acceptance Criteria:**

```gherkin
Given un client connecté au storefront
When il consulte les points de contact
Then il voit les coordonnées des commerciaux (nom, rôle, email, téléphone, avatar)

Given un client connecté au storefront
When il accède aux documents
Then il voit la liste des documents disponibles

Given un client sur la page documents
When il clique sur un document
Then le document est téléchargé sur son appareil
```

---

## Epic 6 : Wishlists

Un client peut organiser sa sélection de titres dans des wishlists pour préparer ses acquisitions.

### Story 6.1 : Création et consultation des wishlists

**As a** client connecté,
**I want** créer des wishlists et consulter leur contenu,
**So that** je puisse organiser ma sélection de titres par projet ou thématique.

**Acceptance Criteria:**

```gherkin
Given un client connecté au storefront
When il accède à la section Wishlists
Then il voit la liste de ses wishlists existantes

Given un client sur la page Wishlists
When il clique sur "Créer une wishlist"
Then il peut nommer sa nouvelle wishlist
And la wishlist est créée vide

Given un client avec des wishlists
When il clique sur une wishlist
Then il voit le détail de la wishlist avec tous ses titres

Given un client consultant une wishlist
When il clique sur un titre
Then il accède à la page détaillée du titre
```

---

### Story 6.2 : Ajout de titres aux wishlists

**As a** client connecté,
**I want** ajouter des titres à mes wishlists depuis différents endroits,
**So that** je puisse enrichir ma sélection au fil de ma navigation.

**Acceptance Criteria:**

```gherkin
Given un client sur une page titre
When il clique sur "Ajouter à une wishlist"
Then il peut sélectionner une wishlist existante ou en créer une nouvelle
And le titre est ajouté à la wishlist

Given un client sur une page collection
When il clique sur "Ajouter à une wishlist" pour un titre
Then le titre est ajouté à la wishlist sélectionnée

Given un client sur le catalogue
When il clique sur "Ajouter à une wishlist" pour un titre
Then le titre est ajouté à la wishlist sélectionnée

Given un client sur le catalogue ou une collection
When il sélectionne plusieurs titres
Then il peut les ajouter en lot à une wishlist
```

---

### Story 6.3 : Gestion des wishlists

**As a** client connecté,
**I want** gérer mes wishlists (retirer des titres, supprimer),
**So that** je puisse maintenir ma sélection à jour.

**Acceptance Criteria:**

```gherkin
Given un client sur une wishlist
When il clique sur "Retirer" pour un titre
Then le titre est retiré de la wishlist
And il reste dans le catalogue (juste retiré de cette wishlist)

Given un client sur la liste des wishlists
When il clique sur "Supprimer" pour une wishlist
Then une confirmation est demandée

Given un client confirmant la suppression
When il valide
Then la wishlist et son contenu sont supprimés

Given un client avec des wishlists
When il se déconnecte puis se reconnecte
Then il retrouve toutes ses wishlists intactes avec leur contenu
```
