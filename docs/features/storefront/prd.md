---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
classification:
  projectType: saas_b2b
  domain: media_distribution
  complexity: medium
  projectContext: brownfield
inputDocuments:
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
workflowType: 'prd'
documentCounts:
  sourceFiles: 8
  mockups: 17
  briefs: 0
  research: 0
---

# Product Requirements Document - Storefront

**Author:** Ben
**Date:** 2026-01-23

## Executive Summary

Le **Storefront** est une vitrine digitale B2B permettant aux distributeurs de contenus média (studios, producteurs) de présenter leur catalogue à des acheteurs professionnels (chaînes TV, plateformes). Les administrateurs configurent un storefront brandé avec sélection de titres, collections et homepage personnalisée. Les clients accèdent via invitation, naviguent le catalogue, visionnent les contenus et créent des wishlists pour préparer leurs acquisitions.

**Statut :** MVP livré et en production | **Type :** SaaS B2B | **Contexte :** Brownfield

## Success Criteria

### User Success

**Administrateurs catalogue :**
- Configuration d'un storefront complet en moins de 30 minutes (hors sélection catalogue)
- Preview temps réel de la homepage = zéro allers-retours entre configuration et résultat final
- Réutilisation du catalogue distribution existant → aucune ressaisie éditoriale (métadonnées, visuels, artworks déjà disponibles)

**Clients finaux (acheteurs B2B) :**
- Accès au catalogue complet avec navigation fluide (browsing libre + recherche ciblée)
- Visionnage des contenus (trailers, screeners) directement sur la page titre via player intégré
- Création de wishlists pour organiser leur sélection de titres
- Contact facilité avec les commerciaux via points de contact dédiés

### Business Success

- **Métrique principale** : Nombre de leads générés (demandes d'acquisition de droits initiées via storefront)
- **Métriques secondaires** :
  - Storefronts actifs créés
  - Utilisateurs clients validés
  - Wishlists créées
  - Titres consultés / temps passé sur la plateforme

### Technical Success

- Performance : Chargement catalogue < 2s
- Disponibilité : 99.5% uptime
- Multi-tenant : Isolation complète entre storefronts
- Scalabilité : Support de catalogues 1000+ titres

### Measurable Outcomes

| Indicateur | Cible 6 mois |
|------------|--------------|
| Storefronts actifs | 10+ |
| Leads générés via storefront | Mesurable (baseline à établir avec early adopter) |
| Taux de conversion visite → wishlist/contact | > 5% |

## Product Scope & Roadmap

### Phase 1 — MVP (Livré ✅)

**Approche :** Experience MVP — Parcours utilisateur complet (admin → client) plutôt que features partielles.

**Capabilities livrées :**
- Création et configuration storefronts (nom, subdomain, branding)
- Homepage WYSIWYG avec preview temps réel
- Sélection catalogue (titres et collections depuis distribution)
- Points de contact et documents téléchargeables
- Account flow complet (request → approve → confirm → login)
- Browsing client : Homepage, Catalog, Collections, Title pages, Player
- Wishlists CRUD

### Phase 2 — Growth (En cours 🔄)

**Objectif :** Contrôle granulaire de l'exposition des contenus

- Sélection granulaire des contenus par titre (Feature, Trailer, Screeners, Marketing)
- Contrôle fin de ce qui est exposé sur le storefront par titre
- Paramètres de confidentialité par titre (enable/disable playback)

**Dépendances :** Aucune — autonome côté Storefront

### Phase 3 — Vision (Roadmap 📋)

**Objectif :** Enrichissement éditorial au-delà du catalogue distribution

- Documents additionnels par titre (photos de tournage, PDFs, vidéos bonus)
- Enrichissement éditorial à la carte

**Dépendances :** Feature Drive (existante)

## User Journeys

### Journey 1 — Admin catalogue : "Julia lance son storefront Cannes 2026"

**Persona : Julia Schneegans**
- Rôle : VP International Sales - TV & Cinema chez un studio français
- Contexte : Prépare le Festival de Cannes 2026, doit présenter 45 titres à des acheteurs internationaux

**Opening Scene — Le besoin**
Julia en a marre d'envoyer des PDFs et des liens WeTransfer éparpillés. Ses acheteurs se plaignent de ne pas avoir une vue d'ensemble du catalogue. Son commercial Mediaspot lui présente la licence Storefront lors d'un call de démo.

**Rising Action — La configuration**
1. L'équipe support Mediaspot l'accompagne pour l'onboarding initial (licence payante)
2. Julia choisit de créer un storefront dédié "Cannes 2026" plutôt qu'un storefront global — elle veut un branding événementiel fort
3. Elle configure le branding : logo festival, cover avec les films phares, catchphrase "Discover our Cannes 2026 Selection"
4. Elle sélectionne les 45 titres depuis son catalogue distribution (déjà enrichi avec métadonnées et visuels)
5. Elle crée des collections thématiques : "Competition", "Un Certain Regard", "Market Premieres"
6. Elle configure la homepage : hero slider avec les 5 titres stars, genres mis en avant, collections showcasées

**Climax — Le moment de fierté**
Julia clique sur **Preview**. Elle navigue sur l'interface finale exactement comme ses clients la verront, en émulant un client storefront. Elle voit son branding, ses titres, le player qui fonctionne. C'est professionnel, c'est à son image.

**Resolution — Le partage**
Julia ajoute ses points de contact (elle + 3 sales managers par région), upload les PDF de line-up, et génère l'URL. Elle envoie `studio-france.mediaspot.io/store/cannes-2026` à sa liste d'acheteurs avec un message personnalisé.

---

### Journey 2 — Client final : "Marco prépare sa grille Jeunesse"

**Persona : Marco Delgado**
- Rôle : Acheteur de contenus, chaîne TV jeunesse espagnole
- Contexte : Doit remplir sa grille Q3 2026, a reçu un lien storefront d'un distributeur français qu'il connaît

**Opening Scene — L'arrivée**
Marco reçoit un email de Julia avec le lien vers le storefront Cannes 2026. Il clique, arrive sur la page Welcome, et demande la création d'un compte (First name, Last name, Email, Company).

**Rising Action — L'attente et l'accès**
1. Marco reçoit un message "Account requested — pending approval"
2. Julia (ou son équipe) valide la demande côté admin
3. Marco reçoit un email de confirmation avec un lien pour définir son mot de passe
4. Il se connecte et accède au storefront

**Exploration — La recherche**
Marco a une mission : trouver des programmes jeunesse. Il utilise les **filtres du catalogue** pour cibler :
- Genre : Animation, Family
- Catalogue type : Series
- Qualité et Picture format selon ses besoins techniques

Il browse les résultats, clique sur des titres intéressants, regarde les trailers via le player intégré, consulte les métadonnées (épisodes, durée, langues disponibles).

**Climax — La curation**
Marco trouve 8 titres potentiels. Il les ajoute à une **wishlist "Grille Jeunesse Q3"**. La wishlist lui sert de panier de sélection pendant son exploration.

**Resolution — Le retour**
Deux semaines plus tard, Marco revient sur le storefront via la même URL. Il se reconnecte avec son compte, retrouve sa wishlist intacte, et décide de contacter le commercial via les points de contact pour négocier.

*(Future : sa wishlist pourra être poussée automatiquement au commercial)*

---

### Journey 3 — Admin catalogue : "Julia gère les accès"

**Persona : Julia (même)**

**Scénario : Gestion des demandes d'accès**

1. Julia reçoit une notification : 3 nouvelles demandes d'accès au storefront
2. Elle va dans l'onglet Users, voit les demandes pending avec nom, email, company
3. Elle reconnaît Marco (acheteur régulier) → **Approve** avec date d'expiration fin Cannes
4. Elle voit une demande suspecte (email générique) → **Reject**
5. Un ancien acheteur n'a plus de contrat → elle le **désactive**

---

### Journey Requirements Summary

| Journey | Capabilities clés |
|---------|-------------------|
| Julia - Configuration | Multi-storefronts, branding, catalogue selection, homepage WYSIWYG, preview mode |
| Marco - Browsing | Account flow, filtres (genre, type, langues), player, wishlists, session persistante |
| Julia - Gestion accès | User management, approve/reject, expiration dates, disable accounts |

## SaaS B2B Specific Requirements

### Modèle Multi-tenant

**Architecture par storefront :**
- Isolation complète des données entre storefronts (utilisateurs, wishlists, configuration)
- Un administrateur peut gérer plusieurs storefronts
- Modèle de licence : 1 storefront inclus par défaut, licences additionnelles payantes

**Séparation des contextes :**
- Catalogue source (distribution) : alimenté par les servicers, partagé entre storefronts
- Storefront : vitrine configurée par les marketeux, consomme le catalogue source

### Profils Utilisateurs (RBAC)

| Profil | Périmètre | Responsabilités |
|--------|-----------|-----------------|
| Servicer | Catalogue distribution | Enrichissement métadonnées, upload assets, gestion contenus |
| Marketeux / Admin Storefront | Storefront(s) assigné(s) | Configuration branding, sélection catalogue, gestion users clients, homepage |
| Client final | Storefront(s) invité(s) | Browsing, wishlists, consultation contenus |

### Modèle de Licensing

- **Licence de base** : Accès à 1 storefront
- **Licences additionnelles** : Storefronts supplémentaires (événementiels ou permanents)
- **Onboarding** : Accompagnement support Mediaspot lors de l'activation

### Intégrations

| Système | Type | Usage |
|---------|------|-------|
| Catalogue Distribution | Interne | Source des titres, métadonnées, assets (consommation API) |
| Flow Emailing Mediaspot | Interne | Notifications account flow (confirmation, validation) |
| API Storefront | Exposée | CRUD storefronts, users, wishlists, browsing |

### Considérations Techniques

**Données partagées vs isolées :**
- Partagé : Catalogue source (titres, collections depuis distribution)
- Isolé par storefront : Branding, sélection catalogue, users clients, wishlists, documents, points de contact

**Scalabilité :**
- Support catalogues 1000+ titres par storefront
- Multiples storefronts par organisation

### Risk Assessment

| Type | Risque | Statut | Mitigation |
|------|--------|--------|------------|
| Technique | Performance sur gros catalogues | ✅ Résolu | Navigation fluide quelle que soit la taille |
| Business | Adoption utilisateurs | 🔄 En observation | Peu de retours pour l'instant, baseline à établir |
| Technique | Dépendances cross-features | ✅ Maîtrisé | Growth autonome, Vision dépend de Drive existant |

## Functional Requirements

### Storefront Management

**Feature: Gestion des storefronts**

```gherkin
Scenario: Création d'un storefront
  Given un admin storefront authentifié
  When il crée un nouveau storefront
  Then il définit un nom et un subdomain
  And le storefront est accessible via app.mediaspot.io/store/{subdomain}
  And pour les clients avec sous-domaine personnalisé, via {client}.mediaspot.io/store/{subdomain}

Scenario: Duplication d'un storefront
  Given un admin storefront authentifié
  And un storefront existant
  When il duplique le storefront
  Then il entre un nouveau nom et subdomain
  And un nouveau storefront est créé avec toutes les données du storefront source

Scenario: Liste des storefronts
  Given un admin storefront authentifié
  When il accède à la liste des storefronts
  Then il voit tous les storefronts auxquels il a accès
  And il peut voir le nombre d'utilisateurs et de demandes par storefront

Scenario: Suppression d'un storefront
  Given un admin storefront authentifié
  And un storefront existant
  When il supprime le storefront
  Then le storefront et toutes ses données associées sont supprimés
```

### Branding & Homepage

**Feature: Configuration du branding**

```gherkin
Scenario: Configuration du branding
  Given un admin sur la page de configuration d'un storefront
  When il configure le branding
  Then il peut uploader un logo
  And il peut uploader une image de cover
  And il peut définir une catchphrase

Scenario: Configuration de la homepage
  Given un admin sur l'onglet Homepage d'un storefront
  When il configure la homepage
  Then il peut sélectionner des titres pour le hero slider
  And il peut sélectionner des genres à mettre en avant
  And il peut sélectionner des collections à showcaser

Scenario: Preview visuelle temps réel
  Given un admin configurant la homepage ou les collections
  Then un panel de preview à droite du formulaire est toujours présent
  And il affiche le rendu en temps réel des modifications

Scenario: Preview navigation complète
  Given un admin sur la page d'un storefront
  When il clique sur le bouton de preview
  Then il est redirigé vers l'URL publique du storefront
  And il peut naviguer comme un client final
```

### Catalogue Curation

**Feature: Sélection du catalogue**

```gherkin
Scenario: Ajout de titres au storefront
  Given un admin sur l'onglet Catalogue d'un storefront
  When il ouvre le drawer d'ajout de titres
  Then il peut rechercher dans sa distribution via une string
  And il peut filtrer par genre, langue et qualité
  And il peut sélectionner des titres individuellement
  And il peut ajouter tous les titres de la recherche actuelle
  And il peut retirer tous les titres de la recherche actuelle

Scenario: Retrait de titres du storefront
  Given un admin sur l'onglet Catalogue d'un storefront
  And des titres déjà sélectionnés
  When il retire un titre
  Then le titre n'est plus visible sur le storefront

Scenario: Ajout de collections au storefront
  Given un admin sur l'onglet Collections d'un storefront
  When il ajoute des collections
  Then il sélectionne parmi les collections existantes de la plateforme
  And les collections ajoutées deviennent visibles sur le storefront

Scenario: Retrait de collections du storefront
  Given un admin sur l'onglet Collections d'un storefront
  And des collections déjà ajoutées
  When il retire une collection
  Then la collection n'est plus visible sur le storefront
```

### Documents & Contacts

**Feature: Documents téléchargeables**

```gherkin
Scenario: Upload de documents
  Given un admin sur l'onglet Documents d'un storefront
  When il uploade un document
  Then le document est disponible au téléchargement pour les clients

Scenario: Suppression de documents
  Given un admin sur l'onglet Documents d'un storefront
  And des documents existants
  When il supprime un document
  Then le document n'est plus accessible aux clients
```

**Feature: Points de contact**

```gherkin
Scenario: Ajout de points de contact
  Given un admin sur l'onglet Contacts d'un storefront
  When il ajoute un point de contact
  Then il peut définir le nom du contact
  And il peut uploader un avatar
  And il peut définir le rôle du contact
  And il peut ajouter une description
  And il peut définir les coordonnées

Scenario: Modification des points de contact
  Given un admin sur l'onglet Contacts d'un storefront
  And des contacts existants
  When il modifie ou supprime un contact
  Then les modifications sont reflétées côté client
```

### User Access Management

**Feature: Gestion des accès clients**

```gherkin
Scenario: Demande de création de compte
  Given un visiteur sur la page Welcome d'un storefront
  When il remplit le formulaire de demande (prénom, nom, email, société)
  Then sa demande est enregistrée avec le statut PENDING
  And il voit un message de confirmation "Account requested — pending approval"

Scenario: Approbation d'une demande
  Given un admin sur l'onglet Users d'un storefront
  And une demande PENDING
  When il approuve la demande
  Then il peut définir une date d'expiration optionnelle
  And le client reçoit un email avec un lien pour définir son mot de passe

Scenario: Rejet d'une demande
  Given un admin sur l'onglet Users d'un storefront
  And une demande PENDING
  When il rejette la demande
  Then la demande est supprimée
  And le client n'est pas notifié

Scenario: Confirmation de compte
  Given un client ayant reçu l'email de confirmation
  When il clique sur le lien et définit son mot de passe
  Then son compte passe au statut ACTIVE
  And il peut se connecter au storefront

Scenario: Connexion client
  Given un client avec un compte ACTIVE
  When il se connecte avec email et mot de passe
  Then il accède au storefront

Scenario: Désactivation d'un compte
  Given un admin sur l'onglet Users d'un storefront
  And un utilisateur ACTIVE
  When il désactive l'utilisateur
  Then l'utilisateur passe au statut DISABLED
  And il ne peut plus accéder au storefront

Scenario: Expiration automatique
  Given un utilisateur avec une date d'expiration définie
  When la date d'expiration est atteinte
  Then l'utilisateur passe au statut EXPIRED
  And il ne peut plus accéder au storefront
```

### Client Browsing

**Feature: Navigation client**

```gherkin
Scenario: Affichage de la homepage
  Given un client connecté au storefront
  When il accède à la homepage
  Then il voit le branding (logo, cover, catchphrase)
  And il voit le hero slider avec les titres mis en avant
  And il voit les genres mis en avant
  And il voit les collections showcasées

Scenario: Navigation du catalogue
  Given un client connecté au storefront
  When il accède au catalogue
  Then il peut rechercher par string (pattern)
  And il peut filtrer par genre
  And il peut filtrer par catalogue type
  And il peut filtrer par qualité
  And il peut filtrer par picture format

Scenario: Navigation par catégorie
  Given un client sur le catalogue
  When il sélectionne un genre ou une sous-catégorie
  Then il voit uniquement les titres correspondants

Scenario: Page titre
  Given un client naviguant le catalogue
  When il clique sur un titre
  Then il voit la page détaillée du titre
  And il voit les métadonnées (synopsis, durée, épisodes, langues disponibles, etc.)
  And il peut visionner les contenus via le player intégré

Scenario: Navigation des collections
  Given un client connecté au storefront
  When il accède à la liste des collections
  Then il voit toutes les collections du storefront

Scenario: Page collection
  Given un client naviguant les collections
  When il clique sur une collection
  Then il voit la page détaillée de la collection
  And il voit tous les titres de la collection

Scenario: Affichage des contacts
  Given un client connecté au storefront
  When il consulte les points de contact
  Then il voit les coordonnées des commerciaux

Scenario: Téléchargement de documents
  Given un client connecté au storefront
  When il accède aux documents
  Then il peut télécharger les documents disponibles
```

### Wishlists

**Feature: Gestion des wishlists**

```gherkin
Scenario: Création d'une wishlist
  Given un client connecté au storefront
  When il crée une nouvelle wishlist
  Then il peut nommer la wishlist
  And la wishlist est créée vide

Scenario: Ajout d'un titre à une wishlist
  Given un client connecté au storefront
  When il ajoute un titre à une wishlist
  Then il peut le faire depuis la page titre
  And il peut le faire depuis une page collection
  And il peut le faire depuis le catalogue

Scenario: Ajout multiple de titres à une wishlist
  Given un client sur le catalogue ou une page collection
  When il sélectionne plusieurs titres
  Then il peut les ajouter en lot à une wishlist

Scenario: Consultation des wishlists
  Given un client connecté au storefront
  When il accède à ses wishlists
  Then il voit la liste de ses wishlists
  And il peut accéder au détail de chaque wishlist avec ses titres

Scenario: Retrait d'un titre d'une wishlist
  Given un client sur une wishlist
  And des titres dans la wishlist
  When il retire un titre
  Then le titre n'apparaît plus dans la wishlist

Scenario: Suppression d'une wishlist
  Given un client connecté au storefront
  And une wishlist existante
  When il supprime la wishlist
  Then la wishlist et son contenu sont supprimés

Scenario: Persistance des wishlists
  Given un client avec des wishlists
  When il se déconnecte puis se reconnecte
  Then il retrouve ses wishlists intactes
```

## Non-Functional Requirements

### Performance

| Métrique | Cible | Contexte |
|----------|-------|----------|
| Chargement catalogue | < 2s | Quelle que soit la taille du catalogue (jusqu'à 1000+ titres) |
| Navigation | Fluide | Pas de latence perceptible lors du browsing |

### Sécurité

**Authentification :**
- Le catalogue client est exposé publiquement → authentification obligatoire pour tout accès aux contenus
- Tokens JWT avec expiration appropriée
- Validation stricte des credentials à chaque requête authentifiée

**Isolation multi-tenant :**
- Les données d'un storefront ne sont jamais accessibles depuis un autre storefront
- Les wishlists, utilisateurs et configurations sont strictement isolés par storefront
- Un client d'un storefront ne peut pas accéder à un autre storefront sans invitation

**Protection des assets :**
- Les contenus vidéo (trailers, screeners) ne sont accessibles qu'aux utilisateurs authentifiés du storefront

### Scalabilité

| Dimension | Capacité |
|-----------|----------|
| Titres par storefront | 1000+ |
| Storefronts par organisation | Multiples (selon licence) |
| Utilisateurs concurrents | Non contraint (architecture cloud) |

### Disponibilité

| Métrique | Cible |
|----------|-------|
| Uptime | 99.5% |
| Maintenance planifiée | Hors heures business EU |

### Intégration

| Système | Type | SLA |
|---------|------|-----|
| Catalogue Distribution | Synchrone | Même disponibilité que la plateforme principale |
| Flow Emailing | Asynchrone | Emails envoyés sous 5 minutes |
| API Storefront | REST | Documentée, versionnée |

