---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - 'docs/features/bmme/prd.md'
  - 'docs/features/bmme/ux-design-specification.md'
---

# BMME v2 - Epic Breakdown

## Overview

Ce document fournit le découpage complet en epics et stories pour BMME v2 (BundleMaker Metadata Editor v2), décomposant les exigences fonctionnelles du PRD en stories implémentables.

## Requirements Inventory

### Functional Requirements

**1. Metadata Management**

- FR1: Gestionnaires de catalogue peuvent créer des métadonnées Title avec toutes les informations d'oeuvre
- FR2: Gestionnaires de catalogue peuvent créer des métadonnées par langue pour un Title donné
- FR3: Gestionnaires de catalogue peuvent créer des métadonnées par territoire pour une langue donnée
- FR4: Système propage automatiquement les métadonnées Title vers les niveaux inférieurs (héritage intelligent)
- FR5: Gestionnaires de catalogue peuvent éditer les métadonnées de multiples langues/territoires dans une vue bulk unique
- FR6: Gestionnaires de catalogue peuvent visualiser la hiérarchie complète Title → Langues → Territoires
- FR7: Système synchronise les métadonnées Title depuis VDM Connect (migration)
- FR8: Système synchronise les métadonnées Title depuis systèmes externes (Unity, Iron, MovieLibrary)

**2. Package Management**

- FR9: Gestionnaires de catalogue peuvent créer des packages pour un provider donné
- FR10: Gestionnaires de catalogue peuvent associer des métadonnées localisées à un package
- FR11: Gestionnaires de catalogue peuvent éditer les métadonnées d'un package existant
- FR12: Gestionnaires de catalogue peuvent supprimer un package
- FR13: Gestionnaires de catalogue peuvent visualiser le statut de complétion d'un package (compteur "94/120 champs remplis")
- FR14: Gestionnaires de catalogue peuvent identifier les champs manquants requis pour un package donné
- FR15: Gestionnaires de catalogue peuvent définir des métadonnées partagées entre tous les providers pour minimiser la saisie manuelle
- FR16: Système applique les métadonnées partagées au provider cible
- FR17: Système valide en temps réel les métadonnées d'un package contre les specs du provider cible
- FR18: Système marque automatiquement un package comme VALID lorsque tous les champs requis sont remplis pour handoff vers BundleMaker
- FR19: Packages incomplets restent à l'état "draft" jusqu'à complétion
- FR20: Gestionnaires de catalogue peuvent dupliquer un package existant pour créer une variante
- FR21: Système migre progressivement les packages depuis VDM Connect vers mediaspot

**3. Provider Specification Management**

- FR22: Labo VDM peut accéder à un éditeur centralisé des specs providers (iTunes, Amazon, Google, Netflix)
- FR23: Labo VDM peut éditer les mappings mediaspot → provider pour chaque provider
- FR24: Labo VDM peut éditer les formats de champs requis par chaque provider
- FR25: Système valide en temps réel les mappings contre des échantillons de packages
- FR26: Labo VDM peut prévisualiser le XML généré avant livraison client
- FR27: Labo VDM peut déployer les changements de specs instantanément sans modification de code
- FR28: Système versionne les specs providers pour permettre le rollback en cas de problème

**4. External System Integration**

- FR31: Admin Internes VDM peuvent accéder à un dashboard de monitoring des synchronisations entrantes
- FR32: Système affiche le statut temps réel de chaque synchronisation externe (Unity, Iron, MovieLibrary, VDM Connect)
- FR33: Système affiche des logs détaillés et friendly pour chaque synchronisation
- FR34: Admin Internes VDM peuvent tester une API externe en temps réel (mode diagnostic live)
- FR35: Admin Internes VDM peuvent accéder à un éditeur de mapping visuel (système externe → mediaspot)
- FR36: Admin Internes VDM peuvent éditer les mappings de champs entre système externe et mediaspot
- FR38: Admin Internes VDM peuvent déclencher une resynchronisation manuelle en 1 clic
- FR39: Système affiche la progression de la resynchronisation avec ETA
- FR42: Système historise toutes les synchronisations pour détecter les régressions

**5. Validation & Quality Assurance**

- FR43: Système génère les XML conformes aux specs provider actuelles

**6. User & Permission Management**

- FR45: SuperAdmin VDM peuvent définir les permissions ACL par action (création métadonnées, édition packages, gestion mappings)
- FR46: Système applique les permissions ACL selon le rôle de l'utilisateur (Gestionnaire Catalogue, Responsable Livraison, Admin Interne, Labo, SuperAdmin)
- FR47: Système empêche les actions non autorisées selon les permissions de l'utilisateur
- FR48: Système isole les données par plateforme client (multi-tenancy strict)

**7. Administration & Monitoring**

- FR49: SuperAdmin VDM peuvent accéder à un dashboard d'administration cross-plateformes
- FR50: SuperAdmin VDM peuvent gérer centralement les specs providers appliquées à toutes les plateformes
- FR51: SuperAdmin VDM peuvent gérer centralement les specs systèmes externes partagées
- FR52: Système génère des audit logs pour toutes les actions critiques (création/édition/suppression)

**8. Language & Territory Activation**

- FR55: Gestionnaires de catalogue peuvent activer une langue pour un Title
- FR56: Langue de l'original title est activée par défaut
- FR57: Système affiche uniquement les champs localisables au niveau langue et territoire
- FR58: Métadonnées territoire sont héritées automatiquement de la langue parente ("pulled from Language")

**9. Source Tracking & Historisation**

- FR59: Système affiche la source actuelle de chaque métadonnée (Unity, mediaspot, IMDb, etc.)
- FR60: Gestionnaires de catalogue peuvent déclencher une synchronisation manuelle depuis une source externe
- FR61: Système affiche un preview des changements avant application (Old value vs New value)
- FR62: Gestionnaires de catalogue peuvent voir toutes les valeurs d'une métadonnée par source
- FR63: Système historise toutes les modifications de métadonnées (Old value, New value, Date, User, Details)
- FR64: Système catégorise les types de modification (Source changed, Manual Edit, Periodic sync)
- FR65: Gestionnaires de catalogue peuvent consulter l'historique complet d'une métadonnée

**10. Shared Metadata & Package Creation**

- FR66: Système gère des Shared metadata cross-platforms (Vendor ID, Studio, Labo, Copyrights)
- FR67: Shared metadata sont automatiquement propagées à tous les packages d'un Title
- FR68: Gestionnaires de catalogue peuvent créer un package en sélectionnant uniquement Platform + Territories
- FR69: Système pré-remplit les packages depuis Title metadata + Shared metadata, puis applique le Provider mapping comme transformation de format
- FR70: Structure Package suit la même hiérarchie que Title (Global → Languages → Territories)

**11. External System Mapping (Platform-based)**

- FR71: Admin Internes VDM peuvent définir des Formatting options par champ de mapping (split, trim, etc.)
- FR72: Admin Internes VDM peuvent définir des Mapping options pour les correspondances d'enums
- FR73: Système applique les Formatting options lors de l'import des données externes
- FR74: Système applique les Mapping options pour convertir les valeurs d'enums
- FR75: Admin Internes VDM peuvent définir une Default source par champ mediaspot
- FR76: Admin Internes VDM peuvent activer Lock source pour empêcher le changement de source sur un champ
- FR77: Système empêche le changement de source sur les champs avec Lock source activé
- FR78: Système affiche des notes d'erreur typées lors des synchronisations (Wrong data format, Formatting failed, Not synced)
- FR79: Admin Internes VDM peuvent déclencher un Resync pour réappliquer une synchronisation depuis une source
- FR80: Admin Internes VDM peuvent déclencher un Bulk resync sur plusieurs sources simultanément

**12. Provider Mapping (Cross-platform)**

- FR81: Provider mappings sont cross-platform (partagés entre toutes les plateformes clientes)
- FR82: Labo VDM peut définir des Formatting options pour l'export (join, format dates, etc.)
- FR83: Labo VDM peut définir des Mapping options pour les correspondances d'enums mediaspot → provider
- FR84: Labo VDM peut tester les mappings sur des packages réels avant déploiement
- FR85: Système affiche les résultats de test avec les valeurs transformées
- FR86: Source of truth table est partagée entre mappings entrants (Journey 2) et sortants (Journey 3)

**13. Legacy Data Model Synchronization (DbMetadataFieldInfo)**

- FR87: Système synchronise automatiquement les métadonnées BMME v2 vers le modèle legacy DbMetadataFieldInfo
- FR88: Synchronisation BMME v2 → DbMetadataFieldInfo est transparente pour les modules mediaspot consommateurs
- FR89: Admin Internes VDM peuvent configurer la table de mapping BMME v2 → DbMetadataFieldInfo
- FR90: Système applique le mapping lors de chaque modification de métadonnée dans BMME v2
- FR91: Modules mediaspot existants continuent à lire les métadonnées via DbMetadataFieldInfo sans modification
- FR92: Système garantit la cohérence entre BMME v2 (source) et DbMetadataFieldInfo (projection)
- FR93: Admin Internes VDM peuvent monitorer le statut de synchronisation BMME v2 → DbMetadataFieldInfo
- FR94: Système alerte en cas d'échec de synchronisation vers le modèle legacy

### NonFunctional Requirements

**Performance**

- NFR1: Temps de création d'un package complet < 15 minutes (vs 2-4h actuellement)
- NFR2: Temps de mise à jour d'une spec provider < 1 jour (vs plusieurs semaines actuellement)
- NFR3: Temps d'ajout d'un nouveau provider < 5 jours
- NFR4: Temps d'onboarding d'un nouveau dev sur BMME < 3 jours

**Qualité**

- NFR5: Taux d'erreur à la livraison < 5%
- NFR6: Couverture de tests > 80% sur la logique métier critique
- NFR7: Zero perte de données lors de la migration VDM Connect

**Conformité**

- NFR8: Codes territoires ISO 3166-1 alpha-3 (FRA, DEU, USA, etc.)
- NFR9: Modèle de données "superset" pour compatibilité multi-providers
- NFR10: GDPR compliance (hérité de mediaspot)
- NFR11: Zero blacklist provider durant toute la vie de BMME v2

**Architecture**

- NFR12: Multi-tenancy strict avec isolation des données par plateforme client
- NFR13: Architecture modulaire permettant l'ajout de nouveaux providers sans refonte
- NFR14: Code lisible, documenté, testé (fondation pour BM v2)

### Additional Requirements (from UX Design)

**Composants UI custom à implémenter :**

- `<CompletionCounter />` : Afficher "94/120 VALID" avec barre de progression temps réel
- `<LocalizationAccordion />` : Hiérarchie Languages → Territories avec accordéons imbriqués
- `<InheritanceLabel />` : Indicateur "Same as Default" / "Overridden"
- `<AssetLocalizationGrid />` : Vue grille pour localisation d'artworks par territoire
- `<SourceBadge />` : Indicateur de source par métadonnée (Unity, mediaspot, IMDb)
- `<MappingTable />` : Configuration mappings source → destination avec transformations
- `<DiffPreview />` : Vue Old → New pour preview des changements
- `<ImpactAnalysisPanel />` : Visualisation des titres impactés par changement de spec

**Patterns UX à respecter :**

- Grid view éditable (style Airtable/Excel)
- Inline editing sans modale
- Breadcrumb hiérarchique persistant
- Validation temps réel champ par champ
- Keyboard navigation (Tab, Enter, Flèches)
- Preview obligatoire avant actions majeures
- Desktop-only (viewport minimum 1280x720)

**Principes UX directeurs :**

1. "Je suis autonome" — No-code pour les configs
2. "Je sais où j'en suis" — Feedback visuel permanent
3. "Je ne ressaisis jamais la même chose" — Héritage intelligent
4. "Je vois avant d'agir" — Preview des changements
5. "Je peux toujours comprendre" — Source tracking, historique

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Création métadonnées Title |
| FR2 | Epic 1 | Création métadonnées par langue |
| FR3 | Epic 1 | Création métadonnées par territoire |
| FR4 | Epic 1 | Propagation automatique (héritage) |
| FR5 | Epic 1 | Vue bulk édition multi-langues/territoires |
| FR6 | Epic 1 | Visualisation hiérarchie Title → Langues → Territoires |
| FR7 | Epic 3 | Synchronisation depuis VDM Connect |
| FR8 | Epic 3 | Synchronisation depuis systèmes externes |
| FR9 | Epic 2 | Création packages par provider |
| FR10 | Epic 2 | Association métadonnées localisées à package |
| FR11 | Epic 2 | Édition métadonnées package |
| FR12 | Epic 2 | Suppression package |
| FR13 | Epic 2 | Visualisation statut complétion (compteur) |
| FR14 | Epic 2 | Identification champs manquants |
| FR15 | Epic 2 | Définition shared metadata |
| FR16 | Epic 2 | Application shared metadata au provider |
| FR17 | Epic 2 | Validation temps réel contre specs provider |
| FR18 | Epic 2 | Marquage automatique VALID |
| FR19 | Epic 2 | État draft pour packages incomplets |
| FR20 | Epic 2 | Duplication package |
| FR21 | Epic 3 | Migration packages depuis VDM Connect |
| FR22 | Epic 4 | Éditeur centralisé specs providers |
| FR23 | Epic 4 | Édition mappings mediaspot → provider |
| FR24 | Epic 4 | Édition formats champs providers |
| FR25 | Epic 4 | Validation temps réel mappings |
| FR26 | Epic 4 | Prévisualisation XML |
| FR27 | Epic 4 | Déploiement instantané sans code |
| FR28 | Epic 4 | Versionning specs avec rollback |
| FR31 | Epic 3 | Dashboard monitoring synchronisations |
| FR32 | Epic 3 | Statut temps réel synchros |
| FR33 | Epic 3 | Logs détaillés et friendly |
| FR34 | Epic 3 | Mode diagnostic live API |
| FR35 | Epic 3 | Éditeur mapping visuel |
| FR36 | Epic 3 | Édition mappings externe → mediaspot |
| FR38 | Epic 3 | Resynchronisation manuelle 1 clic |
| FR39 | Epic 3 | Progression resync avec ETA |
| FR42 | Epic 3 | Historisation synchronisations |
| FR43 | Epic 4 | Génération XML conformes |
| FR45 | Epic 6 | Définition permissions ACL |
| FR46 | Epic 6 | Application permissions par rôle |
| FR47 | Epic 6 | Blocage actions non autorisées |
| FR48 | Epic 6 | Isolation données multi-tenancy |
| FR49 | Epic 6 | Dashboard administration cross-plateformes |
| FR50 | Epic 6 | Gestion centralisée specs providers |
| FR51 | Epic 6 | Gestion centralisée specs externes |
| FR52 | Epic 6 | Audit logs actions critiques |
| FR55 | Epic 1 | Activation langue pour Title |
| FR56 | Epic 1 | Langue original title par défaut |
| FR57 | Epic 1 | Affichage champs localisables uniquement |
| FR58 | Epic 1 | Héritage territoire depuis langue |
| FR59 | Epic 5 | Affichage source métadonnée |
| FR60 | Epic 5 | Synchronisation manuelle depuis source |
| FR61 | Epic 5 | Preview changements avant application |
| FR62 | Epic 5 | Vue multi-source par métadonnée |
| FR63 | Epic 5 | Historisation modifications |
| FR64 | Epic 5 | Catégorisation types modification |
| FR65 | Epic 5 | Consultation historique complet |
| FR66 | Epic 2 | Gestion shared metadata cross-platforms |
| FR67 | Epic 2 | Propagation shared metadata aux packages |
| FR68 | Epic 2 | Création package Platform + Territories |
| FR69 | Epic 2 | Pré-remplissage packages |
| FR70 | Epic 2 | Structure package hiérarchique |
| FR71 | Epic 3 | Formatting options mapping |
| FR72 | Epic 3 | Mapping options enums |
| FR73 | Epic 3 | Application formatting import |
| FR74 | Epic 3 | Application mapping enums |
| FR75 | Epic 3 | Définition default source |
| FR76 | Epic 3 | Activation lock source |
| FR77 | Epic 3 | Blocage changement source |
| FR78 | Epic 3 | Notes erreur typées |
| FR79 | Epic 3 | Resync depuis source |
| FR80 | Epic 3 | Bulk resync |
| FR81 | Epic 4 | Provider mappings cross-platform |
| FR82 | Epic 4 | Formatting options export |
| FR83 | Epic 4 | Mapping options enums export |
| FR84 | Epic 4 | Test mappings sur packages réels |
| FR85 | Epic 4 | Affichage résultats test transformés |
| FR86 | Epic 4 | Source of truth table partagée |
| FR87 | Epic 7 | Synchronisation auto vers DbMetadataFieldInfo |
| FR88 | Epic 7 | Transparence pour modules consommateurs |
| FR89 | Epic 7 | Configuration mapping legacy |
| FR90 | Epic 7 | Application mapping par modification |
| FR91 | Epic 7 | Continuité lecture DbMetadataFieldInfo |
| FR92 | Epic 7 | Garantie cohérence source/projection |
| FR93 | Epic 7 | Monitoring sync legacy |
| FR94 | Epic 7 | Alerte échec sync legacy |

## Epic List

### Epic 1 : Gestion des Métadonnées Title avec Hiérarchie et Héritage

**Sophie peut** créer et gérer les métadonnées d'un Title avec la hiérarchie Title → Languages → Territories et l'héritage intelligent.

**FRs couverts :** FR1, FR2, FR3, FR4, FR5, FR6, FR55, FR56, FR57, FR58

**Valeur livrée :** Sophie peut créer un Title, activer des langues, ajouter des territoires, et voir les métadonnées se propager automatiquement via l'héritage intelligent.

#### Story 1.1 : Création d'un Title avec métadonnées globales

As a **Gestionnaire de catalogue**,
I want **créer un nouveau Title avec ses métadonnées globales (titre original, année, genre, cast)**,
So that **je dispose d'une base de données structurée pour mes oeuvres**.

**Acceptance Criteria:**

```gherkin
Feature: Création d'un Title avec métadonnées globales

  Scenario: Création d'un nouveau Title
    Given je suis connecté en tant que Gestionnaire de catalogue
    When je clique sur "Créer un Title"
    And je remplis les champs obligatoires (titre original, année de production)
    And je remplis les champs optionnels (genre, cast, synopsis original)
    And je clique sur "Enregistrer"
    Then le Title est créé avec un identifiant unique
    And je suis redirigé vers la fiche du Title
    And un breadcrumb affiche "Title: [nom du titre]"

  Scenario: Validation des champs obligatoires
    Given je suis sur le formulaire de création de Title
    When je tente d'enregistrer sans remplir le titre original
    Then un message d'erreur s'affiche sur le champ manquant
    And le formulaire n'est pas soumis

  Scenario: La langue de l'original title est activée par défaut
    Given je crée un Title avec "English" comme langue originale
    When le Title est créé
    Then la langue "English" est automatiquement activée
    And elle est marquée comme "Original Language"
```

**FRs couverts :** FR1, FR56

---

#### Story 1.2 : Activation des langues pour un Title

As a **Gestionnaire de catalogue**,
I want **activer des langues supplémentaires pour un Title et saisir les métadonnées localisées**,
So that **je peux préparer les traductions pour différents marchés**.

**Acceptance Criteria:**

```gherkin
Feature: Activation des langues pour un Title

  Scenario: Activer une nouvelle langue
    Given je suis sur la fiche d'un Title existant
    When je clique sur "Add language"
    And je sélectionne "French" dans la liste des langues disponibles
    Then la langue "French" apparaît dans la liste des langues actives
    And un onglet ou accordéon "French" est créé
    And les champs localisables sont affichés (Localized title, Synopsis, Keywords)

  Scenario: Saisie des métadonnées localisées
    Given la langue "French" est activée pour le Title
    When je clique sur l'onglet "French"
    And je saisis le titre localisé "Le Dernier Métro"
    And je saisis le synopsis en français
    And je clique sur "Enregistrer"
    Then les métadonnées localisées sont sauvegardées
    And un indicateur visuel confirme l'enregistrement

  Scenario: Seuls les champs localisables sont affichés au niveau langue
    Given je suis sur l'onglet d'une langue activée
    Then je vois uniquement les champs localisables (Localized title, Synopsis, Release date, Keywords)
    And je ne vois PAS les champs globaux (Original title, IMDb ID, Genre, Year)
```

**FRs couverts :** FR2, FR55, FR57

---

#### Story 1.3 : Ajout de territoires avec héritage automatique

As a **Gestionnaire de catalogue**,
I want **ajouter des territoires sous une langue avec héritage automatique des métadonnées**,
So that **je n'ai pas à ressaisir les informations communes à tous les territoires d'une même langue**.

**Acceptance Criteria:**

```gherkin
Feature: Ajout de territoires avec héritage automatique

  Scenario: Ajouter un territoire à une langue
    Given la langue "French" est activée pour le Title
    When je clique sur "Add territory" sous "French"
    And je sélectionne "France (FRA)" dans la liste
    Then le territoire "France" apparaît sous la langue "French"
    And il est affiché avec une indentation (↳ France)

  Scenario: Héritage automatique des métadonnées langue
    Given le territoire "France" est ajouté sous la langue "French"
    And la langue "French" a un synopsis défini
    When je consulte les métadonnées du territoire "France"
    Then le synopsis affiche la valeur de la langue parente
    And un label "Same as French" ou "Inherited" est visible
    And l'icône de source indique "Pulled from Language"

  Scenario: Ajout de plusieurs territoires
    Given la langue "French" est activée
    When j'ajoute les territoires "France", "Belgium", "Switzerland"
    Then les trois territoires apparaissent sous "French"
    And chacun hérite automatiquement des métadonnées de "French"
```

**FRs couverts :** FR3, FR4, FR58

---

#### Story 1.4 : Override des métadonnées territoire

As a **Gestionnaire de catalogue**,
I want **surcharger une métadonnée héritée pour un territoire spécifique**,
So that **je peux adapter le contenu aux spécificités locales (ex: synopsis adapté pour la Belgique)**.

**Acceptance Criteria:**

```gherkin
Feature: Override des métadonnées territoire

  Scenario: Surcharger une métadonnée héritée
    Given le territoire "Belgium" hérite du synopsis de la langue "French"
    When je clique sur le champ synopsis du territoire "Belgium"
    And je modifie la valeur
    And je clique sur "Enregistrer"
    Then la nouvelle valeur est sauvegardée pour "Belgium" uniquement
    And le label passe de "Same as French" à "Overridden"
    And un bouton "Reset to default" apparaît

  Scenario: Reset d'un override vers la valeur héritée
    Given le territoire "Belgium" a un synopsis surchargé
    When je clique sur "Reset to default"
    Then une confirmation est demandée
    And après confirmation, le synopsis reprend la valeur de la langue "French"
    And le label repasse à "Same as French"

  Scenario: L'override ne propage pas aux autres territoires
    Given le territoire "Belgium" a un synopsis surchargé
    When je consulte le territoire "Switzerland" (même langue "French")
    Then "Switzerland" affiche toujours le synopsis hérité de "French"
    And il n'est pas impacté par l'override de "Belgium"
```

**FRs couverts :** FR4

---

#### Story 1.5 : Vue bulk édition multi-langues/territoires

As a **Gestionnaire de catalogue**,
I want **éditer les métadonnées de plusieurs langues et territoires dans une vue unique**,
So that **je gagne du temps en évitant d'ouvrir 15 écrans séparés**.

**Acceptance Criteria:**

```gherkin
Feature: Vue bulk édition multi-langues/territoires

  Scenario: Ouvrir la vue bulk pour un champ localisable
    Given je suis sur la fiche d'un Title avec 5 langues et 15 territoires
    When je clique sur "Bulk edit" pour le champ "Synopsis"
    Then une vue grille s'ouvre
    And les langues sont affichées en colonnes
    And les territoires sont affichés en lignes
    And chaque cellule contient la valeur du synopsis pour cette combinaison

  Scenario: Édition inline dans la vue bulk
    Given je suis dans la vue bulk pour le champ "Synopsis"
    When je clique sur une cellule
    Then la cellule devient éditable (inline editing)
    And je peux saisir ou modifier la valeur
    And la navigation clavier fonctionne (Tab, Enter, Flèches)

  Scenario: Sauvegarde des modifications bulk
    Given j'ai modifié plusieurs synopsis dans la vue bulk
    When je clique sur "Save all"
    Then toutes les modifications sont sauvegardées
    And un toast confirme "X changes saved"
    And les cellules modifiées sont visuellement marquées comme "Overridden"

  Scenario: Filtrage dans la vue bulk
    Given je suis dans la vue bulk
    When je filtre par "Incomplete only"
    Then seules les cellules vides ou incomplètes sont affichées
```

**FRs couverts :** FR5

---

#### Story 1.6 : Navigation dans la hiérarchie Title

As a **Gestionnaire de catalogue**,
I want **naviguer facilement dans la hiérarchie Title → Languages → Territories**,
So that **je sais toujours où je suis et je peux accéder rapidement à n'importe quel niveau**.

**Acceptance Criteria:**

```gherkin
Feature: Navigation dans la hiérarchie Title

  Scenario: Breadcrumb hiérarchique persistant
    Given je suis sur le territoire "France" du Title "Le Dernier Métro"
    Then le breadcrumb affiche "Title: Le Dernier Métro > French > France"
    And chaque élément du breadcrumb est cliquable

  Scenario: Navigation via le breadcrumb
    Given le breadcrumb affiche "Title: Le Dernier Métro > French > France"
    When je clique sur "French" dans le breadcrumb
    Then je suis redirigé vers le niveau langue "French"
    And le breadcrumb se met à jour

  Scenario: Vue arborescente dans la sidebar
    Given je suis sur la fiche d'un Title
    Then une sidebar affiche l'arborescence complète
    And je vois Title > Languages (avec leurs territoires)
    And je peux cliquer sur n'importe quel élément pour naviguer

  Scenario: Accordéons pour la hiérarchie
    Given je suis dans l'onglet "Languages" du Title
    Then chaque langue est affichée dans un accordéon
    And je peux déplier un accordéon pour voir ses territoires
    And les territoires sont indentés avec "↳"
```

**FRs couverts :** FR6

---

### Epic 2 : Création et Gestion de Packages Multi-Territoires

**Sophie peut** créer des packages complets pour plusieurs providers et territoires, avec compteur de complétion et validation temps réel.

**FRs couverts :** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR66, FR67, FR68, FR69, FR70

**Valeur livrée :** Sophie crée un package iTunes pour 15 territoires en < 15 min avec feedback "94/120 champs remplis" et état VALID pour handoff vers BundleMaker.

#### Story 2.1 : Définition des Shared Metadata pour un Title

As a **Gestionnaire de catalogue**,
I want **définir des métadonnées partagées (Vendor ID, Studio, Labo, Copyrights) applicables à tous les packages d'un Title**,
So that **je ne ressaisis pas ces informations communes pour chaque provider**.

**Acceptance Criteria:**

```gherkin
Feature: Définition des Shared Metadata

  Scenario: Accéder à la section Shared Metadata
    Given je suis sur la fiche d'un Title
    When je clique sur l'onglet "Shared Metadata"
    Then je vois les champs partagés : Vendor ID, Studio, Labo, Copyrights, VOD Dates
    And un compteur affiche "0/12 champs remplis"

  Scenario: Saisie des Shared Metadata
    Given je suis dans la section Shared Metadata
    When je remplis Vendor ID, Studio "Les Films du Losange", Labo "VDM"
    And je remplis les dates VOD (EST, VOD)
    And je clique sur "Enregistrer"
    Then les métadonnées partagées sont sauvegardées
    And le compteur se met à jour

  Scenario: Upload des artworks partagés
    Given je suis dans la section Shared Metadata
    When je clique sur "Upload artwork"
    And je sélectionne une image 16:9
    Then l'image est uploadée et validée
    And un aperçu thumbnail s'affiche
    And le format est validé en temps réel
```

**FRs couverts :** FR15, FR66

---

#### Story 2.2 : Création d'un Package pour un Provider

As a **Gestionnaire de catalogue**,
I want **créer un package en sélectionnant un provider et des territoires**,
So that **je prépare les métadonnées pour une livraison spécifique**.

**Acceptance Criteria:**

```gherkin
Feature: Création d'un Package

  Scenario: Créer un nouveau package
    Given je suis sur la fiche d'un Title avec des métadonnées et des territoires définis
    When je clique sur "Create a package"
    Then une modale s'ouvre avec un sélecteur de Platform (iTunes, Amazon, Google, Netflix)
    And une liste de territoires activés à cocher

  Scenario: Sélection du provider et des territoires
    Given je suis dans la modale de création de package
    When je sélectionne "iTunes" comme platform
    And je coche les territoires UK, US, FR, DE
    And je clique sur "Create"
    Then un package iTunes est créé avec les 4 territoires
    And je suis redirigé vers la fiche du package

  Scenario: Pré-remplissage automatique depuis Title + Shared Metadata
    Given un package iTunes est créé pour le Title "Le Dernier Métro"
    When je consulte les métadonnées du package
    Then les champs sont pré-remplis depuis les Title Metadata (titres localisés, synopsis)
    And les Shared Metadata sont appliquées (Vendor ID, Studio, Labo)
    And un compteur affiche "94/120 champs remplis"
```

**FRs couverts :** FR9, FR68, FR69

---

#### Story 2.3 : Structure hiérarchique du Package

As a **Gestionnaire de catalogue**,
I want **naviguer dans un package avec la même structure que le Title (Global → Languages → Territories)**,
So that **je retrouve mes repères et je comprends l'organisation des données**.

**Acceptance Criteria:**

```gherkin
Feature: Structure hiérarchique du Package

  Scenario: Affichage de la structure du package
    Given je suis sur la fiche d'un package iTunes
    Then je vois la structure hiérarchique :
      | Niveau | Contenu |
      | Global metadata | Package ID, Labo, Original Title |
      | Languages | English, French |
      | Territories | UK, US sous English / FR, BE sous French |

  Scenario: Navigation dans la hiérarchie package
    Given je suis sur le package iTunes
    When je clique sur "English"
    Then je vois les métadonnées au niveau langue (Localized title, Copyrights, VOD Dates)
    And les territoires sont affichés en sous-niveau

  Scenario: Métadonnées territoire héritées de la langue
    Given je suis sur le territoire "UK" du package
    Then les métadonnées affichent "Pulled from English"
    And je peux overrider si nécessaire
```

**FRs couverts :** FR10, FR70

---

#### Story 2.4 : Compteur de complétion et identification des champs manquants

As a **Gestionnaire de catalogue**,
I want **voir en temps réel le taux de complétion et les champs manquants**,
So that **je sais exactement ce qu'il reste à faire pour valider le package**.

**Acceptance Criteria:**

```gherkin
Feature: Compteur de complétion temps réel

  Scenario: Affichage du compteur de complétion
    Given je suis sur la fiche d'un package
    Then un compteur affiche "94/120 champs remplis"
    And une barre de progression visuelle est affichée
    And le compteur se met à jour à chaque modification

  Scenario: Identification des champs manquants
    Given le package a des champs requis non remplis
    Then les champs manquants sont listés en rouge
    And je peux cliquer sur un champ manquant pour y accéder directement
    And le compteur indique "3 champs requis manquants"

  Scenario: Statut du package selon complétion
    Given je remplis tous les champs requis du package
    When le compteur atteint "120/120"
    Then le statut passe de "Draft" à "VALID"
    And une indication visuelle confirme que le package est prêt
```

**FRs couverts :** FR13, FR14, FR18, FR19

---

#### Story 2.5 : Validation temps réel contre les specs provider

As a **Gestionnaire de catalogue**,
I want **que les métadonnées soient validées en temps réel contre les specs du provider cible**,
So that **je corrige les erreurs immédiatement au lieu de les découvrir à la livraison**.

**Acceptance Criteria:**

```gherkin
Feature: Validation temps réel contre specs provider

  Scenario: Validation format de champ
    Given je suis sur un package iTunes
    When je saisis un copyright au mauvais format
    Then une erreur s'affiche immédiatement : "Format attendu: © {YEAR} {STUDIO}. All rights reserved."
    And le champ est bordé en rouge

  Scenario: Validation champs obligatoires provider
    Given je suis sur un package iTunes
    Then les champs obligatoires selon la spec iTunes sont marqués avec un astérisque
    And si un champ obligatoire est vide, il est listé dans les "champs manquants"

  Scenario: Validation en temps réel à la saisie
    Given je modifie un champ du package
    When je quitte le champ (blur)
    Then la validation s'exécute immédiatement
    And un indicateur ✓ ou ✗ s'affiche selon le résultat
```

**FRs couverts :** FR17

---

#### Story 2.6 : Édition et suppression de package

As a **Gestionnaire de catalogue**,
I want **éditer les métadonnées d'un package existant et pouvoir le supprimer**,
So that **je peux corriger des erreurs ou abandonner un package non pertinent**.

**Acceptance Criteria:**

```gherkin
Feature: Édition et suppression de package

  Scenario: Édition d'un package existant
    Given je suis sur la liste des packages d'un Title
    When je clique sur un package existant
    Then je peux modifier n'importe quelle métadonnée
    And les modifications sont sauvegardées
    And le compteur de complétion se met à jour

  Scenario: Suppression d'un package
    Given je suis sur la fiche d'un package
    When je clique sur "Supprimer le package"
    Then une confirmation est demandée
    And après confirmation, le package est supprimé
    And je suis redirigé vers la liste des packages du Title

  Scenario: Protection contre suppression accidentelle
    Given le package est à l'état "VALID"
    When je tente de le supprimer
    Then un avertissement supplémentaire s'affiche
    And je dois confirmer explicitement
```

**FRs couverts :** FR11, FR12

---

#### Story 2.7 : Duplication de package

As a **Gestionnaire de catalogue**,
I want **dupliquer un package existant pour créer une variante**,
So that **je gagne du temps en réutilisant un package similaire**.

**Acceptance Criteria:**

```gherkin
Feature: Duplication de package

  Scenario: Dupliquer un package vers un autre provider
    Given je suis sur un package iTunes "VALID"
    When je clique sur "Duplicate"
    And je sélectionne "Amazon" comme nouveau provider
    Then un nouveau package Amazon est créé
    And les métadonnées communes sont copiées
    And le mapping provider est appliqué (adaptation des champs)

  Scenario: Dupliquer un package vers d'autres territoires
    Given je suis sur un package iTunes avec UK, US
    When je clique sur "Duplicate"
    And j'ajoute les territoires FR, DE
    Then un nouveau package est créé avec UK, US, FR, DE
    And les métadonnées UK, US sont copiées
    And les métadonnées FR, DE sont à compléter

  Scenario: État du package dupliqué
    Given je duplique un package "VALID"
    Then le nouveau package est à l'état "Draft"
    And le compteur de complétion reflète les champs à vérifier
```

**FRs couverts :** FR20

---

#### Story 2.8 : Application des Shared Metadata aux packages

As a **Gestionnaire de catalogue**,
I want **que les Shared Metadata soient automatiquement propagées à tous les packages**,
So that **je n'ai pas à ressaisir les informations communes**.

**Acceptance Criteria:**

```gherkin
Feature: Propagation Shared Metadata aux packages

  Scenario: Application automatique à la création
    Given j'ai défini des Shared Metadata pour un Title
    When je crée un nouveau package
    Then les Shared Metadata sont automatiquement appliquées
    And les champs concernés affichent les valeurs des Shared Metadata

  Scenario: Mise à jour des packages existants
    Given j'ai des packages existants pour un Title
    When je modifie une Shared Metadata (ex: nouveau Vendor ID)
    Then les packages existants sont mis à jour
    And un indicateur montre la propagation

  Scenario: Override d'une Shared Metadata dans un package
    Given un package a hérité d'une Shared Metadata
    When je modifie cette valeur dans le package
    Then la valeur surchargée est sauvegardée
    And elle n'est plus mise à jour par les Shared Metadata
    And un label "Overridden" s'affiche
```

**FRs couverts :** FR16, FR67

---

### Epic 3 : Synchronisation et Monitoring des Sources Externes

**Marc peut** monitorer les synchronisations entrantes, diagnostiquer les problèmes et configurer les mappings des systèmes externes (Unity, Iron, VDM Connect).

**FRs couverts :** FR7, FR8, FR21, FR31, FR32, FR33, FR34, FR35, FR36, FR38, FR39, FR42, FR71, FR72, FR73, FR74, FR75, FR76, FR77, FR78, FR79, FR80

**Valeur livrée :** Marc voit le dashboard de monitoring, identifie une erreur de synchro Unity en 5 min, corrige le mapping via l'éditeur visuel et resynchronise en 1 clic.

#### Story 3.1 : Dashboard de monitoring des synchronisations

As a **Admin Interne VDM**,
I want **voir un dashboard avec le statut temps réel de toutes les synchronisations externes**,
So that **je détecte immédiatement les problèmes sans attendre les plaintes clients**.

**Acceptance Criteria:**

```gherkin
Feature: Dashboard de monitoring des synchronisations

  Scenario: Affichage du dashboard
    Given je suis connecté en tant qu'Admin Interne VDM
    When j'accède au dashboard de monitoring
    Then je vois la liste des sources externes (Unity, Iron, VDM Connect, MovieLibrary)
    And chaque source affiche un badge de statut (🟢 OK / 🔴 Failed / 🟡 Warning)
    And je vois la date de dernière synchronisation réussie

  Scenario: Détection d'une synchronisation échouée
    Given une synchronisation Unity a échoué depuis 3 jours
    Then un badge rouge "🔴 Failed (3 jours)" s'affiche
    And une alerte est visible en haut du dashboard
    And le nombre d'échecs consécutifs est affiché

  Scenario: Détails d'une source
    Given je suis sur le dashboard
    When je clique sur une source (ex: Unity - StudioCanal)
    Then je vois les détails : dernière synchro réussie, première erreur, impact (X films)
```

**FRs couverts :** FR31, FR32

---

#### Story 3.2 : Logs détaillés et friendly des synchronisations

As a **Admin Interne VDM**,
I want **consulter des logs détaillés et compréhensibles pour chaque synchronisation**,
So that **je diagnostique rapidement la cause d'un problème sans fouiller dans des logs techniques**.

**Acceptance Criteria:**

```gherkin
Feature: Logs détaillés et friendly

  Scenario: Affichage des logs d'une synchronisation
    Given je suis sur les détails d'une source en erreur
    When je clique sur "Voir les logs"
    Then je vois un log structuré et lisible
    And chaque entrée a un timestamp, un niveau (info/warning/error), un message
    And les erreurs sont mises en évidence

  Scenario: Log avec suggestion de diagnostic
    Given une erreur "Champ director manquant" s'affiche
    Then le log inclut une suggestion : "Vérifier si le champ a été renommé dans l'API Unity"
    And le film concerné est identifié (Unity ID: 98234)

  Scenario: Filtrage des logs
    Given je suis dans la vue logs
    When je filtre par "Errors only"
    Then seules les entrées d'erreur sont affichées
```

**FRs couverts :** FR33, FR42

---

#### Story 3.3 : Mode diagnostic live des APIs externes

As a **Admin Interne VDM**,
I want **tester une API externe en temps réel pour diagnostiquer un problème**,
So that **je comprends rapidement si le problème vient de l'API ou du mapping**.

**Acceptance Criteria:**

```gherkin
Feature: Mode diagnostic live API

  Scenario: Tester une API externe
    Given je suis sur les détails d'une source en erreur
    When je clique sur "Tester l'API maintenant"
    Then le système fait un appel live à l'API externe
    And la réponse brute JSON est affichée
    And je peux voir les champs retournés

  Scenario: Comparaison avec le mapping attendu
    Given j'ai testé l'API et reçu une réponse
    Then le système compare la réponse avec le mapping configuré
    And les champs manquants ou renommés sont mis en évidence
    And une suggestion de correction est proposée

  Scenario: Test sur un film spécifique
    Given je veux tester l'API pour un film précis
    When je saisis l'ID externe (ex: Unity ID 98234)
    And je clique sur "Test"
    Then l'API est appelée pour ce film spécifique
    And les données retournées sont affichées
```

**FRs couverts :** FR34

---

#### Story 3.4 : Éditeur de mapping visuel (externe → mediaspot)

As a **Admin Interne VDM**,
I want **configurer visuellement les mappings entre un système externe et mediaspot**,
So that **je n'ai pas besoin de modifier du code pour corriger un mapping**.

**Acceptance Criteria:**

```gherkin
Feature: Éditeur de mapping visuel

  Scenario: Accéder à l'éditeur de mapping
    Given je suis sur les détails d'une source externe
    When je clique sur "Edit mappings"
    Then l'éditeur de mapping visuel s'ouvre
    And je vois une table : Champ externe | Champ mediaspot | Formatting | Mapping options

  Scenario: Modifier un mapping de champ
    Given je suis dans l'éditeur de mapping
    When je modifie "data.director" en "data.directorName" pour le champ source
    And je clique sur "Sauvegarder"
    Then le mapping est mis à jour
    And le système valide le mapping contre un échantillon de données

  Scenario: Ajouter un nouveau mapping
    Given je suis dans l'éditeur de mapping
    When je clique sur "Add mapping"
    And je sélectionne le champ externe et le champ mediaspot cible
    Then le nouveau mapping est ajouté à la liste
```

**FRs couverts :** FR35, FR36

---

#### Story 3.5 : Configuration des Formatting et Mapping options

As a **Admin Interne VDM**,
I want **définir des transformations (split, trim) et des correspondances d'enums pour les mappings**,
So that **les données sont correctement transformées lors de l'import**.

**Acceptance Criteria:**

```gherkin
Feature: Formatting et Mapping options

  Scenario: Définir une Formatting option
    Given je suis sur un mapping de champ
    When je clique sur "Formatting options"
    And je sélectionne "split" avec séparateur "&"
    Then la transformation est configurée
    And un preview montre le résultat : "Sci-Fi & Fantasy" → ["Sci-Fi", "Fantasy"]

  Scenario: Définir un Mapping option pour enum
    Given le champ "genre" a des valeurs différentes entre Unity et mediaspot
    When je configure le Mapping option
    And je définis : Unity "Science-Fiction" → mediaspot "Sci-Fi"
    Then la correspondance est enregistrée
    And elle sera appliquée lors de l'import

  Scenario: Application des transformations à l'import
    Given des Formatting et Mapping options sont configurées
    When une synchronisation s'exécute
    Then les transformations sont appliquées aux données entrantes
    And les valeurs transformées sont stockées dans mediaspot
```

**FRs couverts :** FR71, FR72, FR73, FR74

---

#### Story 3.6 : Définition de Default source et Lock source

As a **Admin Interne VDM**,
I want **définir une source par défaut pour chaque champ et verrouiller certaines sources**,
So that **les données proviennent de la bonne source et ne sont pas écrasées accidentellement**.

**Acceptance Criteria:**

```gherkin
Feature: Default source et Lock source

  Scenario: Définir une Default source
    Given je suis dans la configuration de la Source of Truth table
    When je définis "Unity" comme Default source pour le champ "director"
    Then le champ "director" utilisera Unity par défaut
    And cette config s'applique à toutes les plateformes clientes

  Scenario: Activer Lock source sur un champ
    Given je configure le champ "OAR" (Original Aspect Ratio)
    When j'active "Lock source" = Yes
    Then la source ne pourra plus être changée pour ce champ
    And l'UI affiche un cadenas sur ce champ

  Scenario: Blocage du changement de source
    Given le champ "OAR" a Lock source activé
    When un utilisateur tente de changer la source
    Then le système bloque l'action
    And un message explique que la source est verrouillée
```

**FRs couverts :** FR75, FR76, FR77

---

#### Story 3.7 : Affichage des erreurs typées lors des synchronisations

As a **Admin Interne VDM**,
I want **voir des notes d'erreur typées lors des synchronisations (Wrong data format, Formatting failed, Not synced)**,
So that **je comprends immédiatement le type de problème à résoudre**.

**Acceptance Criteria:**

```gherkin
Feature: Notes d'erreur typées

  Scenario: Affichage du détail d'une synchronisation avec erreurs
    Given une synchronisation a importé 13 champs avec des erreurs
    When je clique sur "13 fields" pour voir le détail
    Then je vois une table avec : Title | Field | New value | Notes

  Scenario: Types d'erreurs identifiées
    Given je consulte le détail d'une sync
    Then je vois les notes typées :
      | Type | Exemple |
      | ⚠️ Wrong data format | should be string, received number |
      | ⚠️ Formatting failed | no '&' found for split |
      | ℹ️ Not synced | Field sourced by mediaspot (Lock source) |

  Scenario: Filtrage par type d'erreur
    Given je suis dans le détail de sync
    When je filtre par "Errors only"
    Then seuls les champs avec ⚠️ sont affichés
```

**FRs couverts :** FR78

---

#### Story 3.8 : Resynchronisation manuelle en 1 clic

As a **Admin Interne VDM**,
I want **déclencher une resynchronisation manuelle en 1 clic avec suivi de progression**,
So that **je rattrape les données manquantes après avoir corrigé un problème**.

**Acceptance Criteria:**

```gherkin
Feature: Resynchronisation manuelle

  Scenario: Déclencher une resync
    Given une synchronisation a échoué et j'ai corrigé le mapping
    When je clique sur "Resync"
    Then une barre de progression s'affiche
    And elle indique : "X/Y films synchronisés (Z%)"
    And un ETA est affiché

  Scenario: Resync terminée avec succès
    Given une resync est en cours
    When elle se termine
    Then le statut passe à "✅ Synced"
    And un résumé affiche : "47 films synchronisés avec succès"
    And le badge du dashboard passe au vert

  Scenario: Bulk resync sur plusieurs sources
    Given plusieurs sources ont des erreurs
    When je sélectionne plusieurs sources
    And je clique sur "Bulk resync"
    Then toutes les sources sélectionnées sont resynchronisées
    And je peux suivre la progression de chacune
```

**FRs couverts :** FR38, FR39, FR79, FR80

---

#### Story 3.9 : Synchronisation depuis VDM Connect et systèmes externes

As a **Système**,
I want **synchroniser les métadonnées Title depuis VDM Connect, Unity, Iron et MovieLibrary**,
So that **les données sont centralisées dans mediaspot comme source de vérité**.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation des métadonnées externes

  Scenario: Import depuis VDM Connect (migration)
    Given VDM Connect contient des métadonnées Title
    When la synchronisation VDM Connect s'exécute
    Then les métadonnées sont importées dans mediaspot
    And le mapping VDM Connect → mediaspot est appliqué
    And l'historique enregistre "Source: VDM Connect"

  Scenario: Import depuis Unity API
    Given Unity contient des métadonnées pour StudioCanal
    When la synchronisation Unity s'exécute selon le planning
    Then les nouvelles données sont importées
    And les données existantes sont mises à jour si modifiées
    And les conflits sont gérés selon la config Default source

  Scenario: Migration des packages depuis VDM Connect
    Given des packages existent dans VDM Connect
    When la migration de packages s'exécute
    Then les packages sont créés dans mediaspot
    And les métadonnées sont mappées vers le nouveau modèle
    And le compteur de complétion est calculé
```

**FRs couverts :** FR7, FR8, FR21

---

### Epic 4 : Gestion des Specs Providers (Labo)

**Julie peut** maintenir et déployer les specifications providers (iTunes, Amazon, Google, Netflix) de manière centralisée, sans modification de code.

**FRs couverts :** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR43, FR81, FR82, FR83, FR84, FR85, FR86

**Valeur livrée :** Julie met à jour une spec iTunes (nouveau format copyright), teste le mapping sur des packages réels, et déploie en 25 min sans CI/CD.

#### Story 4.1 : Éditeur centralisé des specs providers

As a **Technicienne Labo VDM**,
I want **accéder à un éditeur centralisé pour les specs de chaque provider (iTunes, Amazon, Google, Netflix)**,
So that **je n'ai plus à modifier 47 fichiers XML dispersés**.

**Acceptance Criteria:**

```gherkin
Feature: Éditeur centralisé des specs providers

  Scenario: Accéder à l'éditeur de specs
    Given je suis connecté en tant que Labo VDM
    When j'accède à "Specs Providers"
    Then je vois la liste des providers : iTunes, Amazon, Google, Netflix
    And chaque provider affiche sa version actuelle

  Scenario: Ouvrir l'éditeur d'un provider
    Given je suis sur la liste des providers
    When je clique sur "iTunes"
    Then l'éditeur de spec iTunes s'ouvre
    And je vois la Source of Truth table (champs mediaspot)
    And je vois les mappings mediaspot → iTunes

  Scenario: Visualisation de la structure des mappings
    Given je suis dans l'éditeur iTunes
    Then je vois une table avec : Champ mediaspot | Champ iTunes | Formatting options | Mapping options
```

**FRs couverts :** FR22, FR81

---

#### Story 4.2 : Édition des mappings mediaspot → provider

As a **Technicienne Labo VDM**,
I want **éditer les mappings entre les champs mediaspot et les champs provider**,
So that **je peux adapter les specs quand un provider change ses exigences**.

**Acceptance Criteria:**

```gherkin
Feature: Édition des mappings provider

  Scenario: Modifier un mapping existant
    Given je suis dans l'éditeur de mapping iTunes
    When je clique sur le mapping "studio_name → copyright"
    And je modifie le format de "© {year} {studio_name}" à "© {year} {studio_name}. All rights reserved."
    And je clique sur "Sauvegarder"
    Then le mapping est mis à jour
    And la modification est versionnée

  Scenario: Ajouter un nouveau mapping
    Given un nouveau champ est requis par iTunes
    When je clique sur "Add mapping"
    And je sélectionne le champ mediaspot source et le champ iTunes cible
    And je configure les options de formatage
    Then le nouveau mapping est ajouté

  Scenario: Supprimer un mapping obsolète
    Given un champ n'est plus requis par iTunes
    When je clique sur "Delete" pour ce mapping
    Then le mapping est marqué comme obsolète
    And une note de documentation est ajoutée
```

**FRs couverts :** FR23, FR24

---

#### Story 4.3 : Formatting et Mapping options pour l'export

As a **Technicienne Labo VDM**,
I want **configurer des transformations (join, format dates) et des correspondances d'enums pour l'export**,
So that **les données sont correctement formatées selon les specs provider**.

**Acceptance Criteria:**

```gherkin
Feature: Formatting et Mapping options export

  Scenario: Définir une Formatting option pour l'export
    Given je configure le mapping "genres → genres"
    When je clique sur "Formatting options"
    And je sélectionne "join" avec séparateur ","
    Then la transformation est configurée
    And un preview montre : ["Drama", "Romance"] → "Drama,Romance"

  Scenario: Définir un Mapping option pour enum
    Given les genres mediaspot diffèrent des genres iTunes
    When je configure le Mapping option
    And je définis : mediaspot "Sci-Fi" → iTunes "Science Fiction"
    Then la correspondance est enregistrée

  Scenario: Preview des transformations
    Given des Formatting et Mapping options sont configurées
    Then un preview en temps réel montre le résultat de la transformation
    And je vois : Input "Sci-Fi" → Output "Science Fiction"
```

**FRs couverts :** FR82, FR83

---

#### Story 4.4 : Test des mappings sur packages réels

As a **Technicienne Labo VDM**,
I want **tester les mappings sur des packages réels avant de déployer**,
So that **je m'assure que les transformations fonctionnent correctement**.

**Acceptance Criteria:**

```gherkin
Feature: Test des mappings sur packages réels

  Scenario: Lancer un test de mapping
    Given j'ai modifié un mapping iTunes
    When je clique sur "Test mappings"
    Then une modale s'ouvre avec une liste de packages disponibles
    And je peux sélectionner plusieurs packages pour le test

  Scenario: Exécution du test
    Given j'ai sélectionné 3 packages pour le test
    When je clique sur "Run test"
    Then le système applique les mappings sur chaque package
    And les résultats s'affichent :
      | Package | Status | Details |
      | Le Dernier Métro Redux | ✅ | copyright: © 2026 StudioCanal. All rights reserved. |
      | La Haine 4K | ✅ | copyright: © 1995 StudioCanal. All rights reserved. |
      | Amélie | ✅ | genres: "Comedy,Romance" |

  Scenario: Détection d'erreur lors du test
    Given un mapping est mal configuré
    When je lance le test
    Then l'erreur est identifiée et affichée
    And je peux corriger avant de déployer
```

**FRs couverts :** FR25, FR84, FR85

---

#### Story 4.5 : Prévisualisation XML avant livraison

As a **Technicienne Labo VDM**,
I want **prévisualiser le XML qui sera généré pour un package**,
So that **je vérifie la conformité aux specs avant livraison client**.

**Acceptance Criteria:**

```gherkin
Feature: Prévisualisation XML

  Scenario: Générer un preview XML
    Given je suis sur un package "VALID"
    When je clique sur "Preview XML iTunes"
    Then le système génère le XML en temps réel
    And le XML s'affiche dans une fenêtre avec coloration syntaxique

  Scenario: Validation du XML contre le schéma
    Given le XML est généré
    Then le système valide contre le XSD iTunes
    And les erreurs éventuelles sont listées
    And les lignes concernées sont mises en évidence

  Scenario: Téléchargement du XML preview
    Given le XML preview est affiché
    When je clique sur "Download"
    Then le fichier XML est téléchargé
    And je peux le vérifier manuellement
```

**FRs couverts :** FR26, FR43

---

#### Story 4.6 : Déploiement instantané sans modification de code

As a **Technicienne Labo VDM**,
I want **déployer les changements de specs instantanément sans passer par le CI/CD**,
So that **je suis autonome et réactive face aux changements de specs providers**.

**Acceptance Criteria:**

```gherkin
Feature: Déploiement instantané

  Scenario: Déployer un changement de spec
    Given j'ai modifié et testé un mapping iTunes
    When je clique sur "Déployer"
    Then une confirmation est demandée avec l'impact : "47 plateformes impactées"
    And après confirmation, le déploiement s'exécute
    And un message confirme : "✅ Déploiement terminé (3 secondes)"

  Scenario: Déploiement sans intervention dev
    Given le déploiement est effectué
    Then aucun commit Git n'est nécessaire
    And aucun build CI/CD n'est déclenché
    And les changements sont actifs immédiatement

  Scenario: Impact cross-platform
    Given je déploie un changement de spec iTunes
    Then le changement s'applique à toutes les plateformes clientes
    And tous les packages iTunes utilisent la nouvelle spec
```

**FRs couverts :** FR27

---

#### Story 4.7 : Versionning des specs avec rollback

As a **Technicienne Labo VDM**,
I want **versionner les specs et pouvoir rollback en cas de problème**,
So that **je peux revenir à une version précédente si un déploiement cause des problèmes**.

**Acceptance Criteria:**

```gherkin
Feature: Versionning et rollback

  Scenario: Historique des versions
    Given je suis dans l'éditeur de spec iTunes
    When je clique sur "Version history"
    Then je vois la liste des versions : v5.16, v5.15, v5.14...
    And chaque version a une date, un auteur, un résumé des changements

  Scenario: Comparer deux versions
    Given je consulte l'historique des versions
    When je sélectionne deux versions pour comparer
    Then un diff s'affiche avec les changements (ajouts, modifications, suppressions)

  Scenario: Rollback vers une version précédente
    Given la version actuelle v5.16 cause des problèmes
    When je clique sur "Rollback to v5.15"
    Then une confirmation est demandée
    And après confirmation, la version v5.15 est restaurée
    And un nouveau déploiement s'effectue automatiquement
```

**FRs couverts :** FR28

---

#### Story 4.8 : Source of Truth table partagée

As a **Admin Interne ou Labo VDM**,
I want **que la Source of Truth table soit partagée entre les mappings entrants et sortants**,
So that **la définition des champs mediaspot est cohérente dans tout le système**.

**Acceptance Criteria:**

```gherkin
Feature: Source of Truth table partagée

  Scenario: Visualiser la Source of Truth table
    Given je suis Admin ou Labo VDM
    When j'accède à "Source of Truth"
    Then je vois la table centrale : Champ mediaspot | Type | Default source | Lock source
    And cette table est la même pour les mappings entrants (Marc) et sortants (Julie)

  Scenario: Modification propagée
    Given je modifie le type d'un champ dans la Source of Truth table
    Then la modification est visible pour les mappings entrants ET sortants
    And les deux éditeurs reflètent le changement

  Scenario: Cohérence des données
    Given un champ est défini dans la Source of Truth table
    Then il est utilisable dans les mappings externes → mediaspot
    And il est utilisable dans les mappings mediaspot → providers
```

**FRs couverts :** FR86

---

### Epic 5 : Traçabilité et Historique des Métadonnées

**Sophie peut** voir la source de chaque métadonnée, comparer les valeurs entre sources, et consulter l'historique des modifications.

**FRs couverts :** FR59, FR60, FR61, FR62, FR63, FR64, FR65

**Valeur livrée :** Sophie voit que le champ "director" vient d'Unity, peut déclencher une synchro manuelle avec preview Old → New, et consulte l'historique des changements (Source changed, Manual Edit, Periodic sync).

#### Story 5.1 : Affichage de la source de chaque métadonnée

As a **Gestionnaire de catalogue**,
I want **voir la source actuelle de chaque métadonnée (Unity, mediaspot, IMDb, etc.)**,
So that **je sais d'où viennent les données et quelle source fait autorité**.

**Acceptance Criteria:**

```gherkin
Feature: Affichage de la source de chaque métadonnée

  Scenario: Badge de source sur chaque champ
    Given je suis sur la fiche d'un Title
    When je consulte un champ de métadonnée (ex: director)
    Then un badge de source s'affiche à côté du champ (ex: "Unity" ou "mediaspot")
    And une icône identifie visuellement la source

  Scenario: Codes couleur par source
    Given je consulte plusieurs champs de métadonnées
    Then chaque source a une couleur distincte :
      | Source | Couleur |
      | Unity | Bleu |
      | mediaspot | Vert |
      | IMDb | Orange |
      | Iron | Violet |
    And les badges sont cohérents sur tout l'interface

  Scenario: Tooltip avec détails de la source
    Given je survole un badge de source
    Then un tooltip affiche : Date de dernière synchro, Source ID externe
    And je peux cliquer pour voir plus de détails
```

**FRs couverts :** FR59

---

#### Story 5.2 : Synchronisation manuelle depuis une source externe

As a **Gestionnaire de catalogue**,
I want **déclencher manuellement une synchronisation depuis une source externe pour un champ**,
So that **je récupère les données les plus récentes sans attendre la synchro automatique**.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation manuelle depuis source

  Scenario: Déclencher une synchro manuelle
    Given je suis sur un champ avec source "Unity"
    When je clique sur "Sync from Unity"
    Then une requête est envoyée à Unity pour ce champ
    And un indicateur de chargement s'affiche
    And le résultat (succès ou erreur) est affiché

  Scenario: Synchro avec preview des changements
    Given je déclenche une synchro manuelle
    When Unity retourne une valeur différente
    Then un panneau "Preview changements" s'affiche
    And je vois : Old value vs New value
    And je peux accepter ou rejeter le changement

  Scenario: Synchro sans changement
    Given je déclenche une synchro manuelle
    When Unity retourne la même valeur
    Then un message confirme "Aucun changement détecté"
    And la date de dernière vérification est mise à jour
```

**FRs couverts :** FR60

---

#### Story 5.3 : Preview des changements avant application

As a **Gestionnaire de catalogue**,
I want **voir un preview des changements avant de les appliquer (Old value vs New value)**,
So that **je valide les modifications avant qu'elles ne soient enregistrées**.

**Acceptance Criteria:**

```gherkin
Feature: Preview des changements

  Scenario: Affichage du diff
    Given une synchro ou modification génère un changement
    Then un panneau DiffPreview s'affiche
    And je vois côte à côte : Old value | New value
    And les différences sont mises en évidence (ajouts en vert, suppressions en rouge)

  Scenario: Actions sur le preview
    Given le panneau DiffPreview est affiché
    Then je peux :
      | Action | Résultat |
      | Appliquer | Le changement est enregistré |
      | Rejeter | Le changement est annulé |
      | Différer | Le changement est mis en attente |

  Scenario: Preview multiple champs
    Given plusieurs champs sont modifiés simultanément
    Then je vois la liste de tous les changements
    And je peux appliquer/rejeter chaque changement individuellement
    And je peux "Appliquer tout" ou "Rejeter tout"
```

**FRs couverts :** FR61

---

#### Story 5.4 : Vue multi-source par métadonnée

As a **Gestionnaire de catalogue**,
I want **voir toutes les valeurs d'une métadonnée par source disponible**,
So that **je compare les données entre Unity, IMDb, Iron et mediaspot**.

**Acceptance Criteria:**

```gherkin
Feature: Vue multi-source par métadonnée

  Scenario: Ouvrir la vue multi-source
    Given je suis sur un champ de métadonnée
    When je clique sur "View all sources"
    Then un panneau s'ouvre avec toutes les valeurs par source :
      | Source | Value | Last sync |
      | Unity | Christopher Nolan | 2026-03-15 |
      | IMDb | Christopher Nolan | 2026-03-18 |
      | mediaspot | C. Nolan | Manual edit |

  Scenario: Sélectionner une source différente
    Given je vois les valeurs de toutes les sources
    When je clique sur "Use this value" pour IMDb
    Then la valeur IMDb remplace la valeur actuelle
    And la source du champ passe à "IMDb"
    And l'historique enregistre le changement

  Scenario: Valeurs en conflit
    Given les sources ont des valeurs différentes
    Then les différences sont visuellement mises en évidence
    And une suggestion "Résoudre le conflit" est proposée
```

**FRs couverts :** FR62

---

#### Story 5.5 : Historisation des modifications

As a **Gestionnaire de catalogue**,
I want **que toutes les modifications de métadonnées soient historisées**,
So that **je peux retracer l'évolution d'une donnée dans le temps**.

**Acceptance Criteria:**

```gherkin
Feature: Historisation des modifications

  Scenario: Enregistrement automatique des changements
    Given une métadonnée est modifiée
    Then le système enregistre automatiquement :
      | Champ | Valeur |
      | Old value | valeur précédente |
      | New value | nouvelle valeur |
      | Date | timestamp de la modification |
      | User | utilisateur ou système |
      | Details | contexte de la modification |

  Scenario: Historique persistant
    Given des modifications ont été enregistrées
    Then l'historique est conservé indéfiniment
    And il est consultable depuis la fiche du Title
    And il est exportable si nécessaire

  Scenario: Audit trail complet
    Given je consulte l'historique d'un champ
    Then je vois toutes les modifications depuis la création
    And chaque entrée est horodatée avec précision (seconde)
```

**FRs couverts :** FR63

---

#### Story 5.6 : Catégorisation des types de modification

As a **Gestionnaire de catalogue**,
I want **que les modifications soient catégorisées par type (Source changed, Manual Edit, Periodic sync)**,
So that **je comprends rapidement la nature de chaque changement**.

**Acceptance Criteria:**

```gherkin
Feature: Catégorisation des types de modification

  Scenario: Types de modification identifiés
    Given je consulte l'historique d'une métadonnée
    Then chaque entrée a un type :
      | Type | Description |
      | Source changed | La source du champ a changé |
      | Manual Edit | Modification manuelle par un utilisateur |
      | Periodic sync | Mise à jour par synchronisation automatique |
      | Bulk edit | Modification via la vue bulk |
      | Migration | Import depuis VDM Connect |

  Scenario: Icônes par type
    Given je consulte l'historique
    Then chaque type a une icône distinctive :
      | Type | Icône |
      | Source changed | 🔄 |
      | Manual Edit | ✏️ |
      | Periodic sync | ⏰ |
      | Bulk edit | 📊 |

  Scenario: Filtrage par type
    Given je suis dans l'historique d'un champ
    When je filtre par type "Manual Edit"
    Then seules les modifications manuelles sont affichées
```

**FRs couverts :** FR64

---

#### Story 5.7 : Consultation de l'historique complet

As a **Gestionnaire de catalogue**,
I want **consulter l'historique complet d'une métadonnée**,
So that **je comprends l'évolution des données dans le temps**.

**Acceptance Criteria:**

```gherkin
Feature: Consultation de l'historique complet

  Scenario: Accéder à l'historique d'un champ
    Given je suis sur la fiche d'un Title
    When je clique sur "History" pour un champ
    Then un panneau affiche l'historique chronologique :
      | Date | Type | Old | New | User |
      | 2026-03-18 14:32 | Manual Edit | C. Nolan | Christopher Nolan | sophie@studio.fr |
      | 2026-03-15 09:00 | Periodic sync | - | C. Nolan | System (Unity) |
      | 2026-03-01 10:15 | Migration | null | C. Nolan | System (VDM Connect) |

  Scenario: Navigation dans l'historique
    Given l'historique contient beaucoup d'entrées
    Then la pagination est disponible
    And je peux filtrer par date, type ou utilisateur
    And je peux rechercher dans les valeurs

  Scenario: Historique au niveau Title
    Given je veux voir tous les changements d'un Title
    When je clique sur "Title history"
    Then je vois l'historique consolidé de tous les champs
    And je peux filtrer par champ spécifique
```

**FRs couverts :** FR65

---

### Epic 6 : Administration et Multi-Tenancy

**SuperAdmin VDM peut** gérer les permissions ACL, administrer les plateformes clients et monitorer l'activité cross-plateformes.

**FRs couverts :** FR45, FR46, FR47, FR48, FR49, FR50, FR51, FR52

**Valeur livrée :** SuperAdmin configure les ACL par rôle (Gestionnaire Catalogue, Admin Interne, Labo), gère l'isolation des données clients multi-tenancy, et accède au dashboard cross-plateformes avec audit logs.

#### Story 6.1 : Définition des permissions ACL par action

As a **SuperAdmin VDM**,
I want **définir les permissions ACL par action (création métadonnées, édition packages, gestion mappings)**,
So that **je contrôle finement ce que chaque rôle peut faire dans le système**.

**Acceptance Criteria:**

```gherkin
Feature: Définition des permissions ACL

  Scenario: Accéder à la gestion des permissions
    Given je suis connecté en tant que SuperAdmin VDM
    When j'accède à "Administration > Permissions"
    Then je vois la matrice des permissions :
      | Action | Gestionnaire | Admin Interne | Labo | SuperAdmin |
      | Créer Title | ✅ | ✅ | ❌ | ✅ |
      | Éditer metadata | ✅ | ✅ | ❌ | ✅ |
      | Créer package | ✅ | ✅ | ❌ | ✅ |
      | Éditer mappings externes | ❌ | ✅ | ❌ | ✅ |
      | Éditer specs providers | ❌ | ❌ | ✅ | ✅ |

  Scenario: Modifier une permission
    Given je suis dans la matrice des permissions
    When je clique sur une cellule pour l'activer/désactiver
    Then la permission est mise à jour
    And un log audit est créé

  Scenario: Création d'un nouveau rôle
    Given je veux créer un rôle personnalisé
    When je clique sur "Créer un rôle"
    And je définis les permissions du rôle
    Then le nouveau rôle est disponible pour affectation aux utilisateurs
```

**FRs couverts :** FR45

---

#### Story 6.2 : Application des permissions par rôle utilisateur

As a **Système**,
I want **appliquer les permissions ACL selon le rôle de l'utilisateur connecté**,
So that **chaque utilisateur ne voit et ne peut faire que ce qui lui est autorisé**.

**Acceptance Criteria:**

```gherkin
Feature: Application des permissions par rôle

  Scenario: Utilisateur avec rôle Gestionnaire Catalogue
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    Then je vois les menus : Titles, Packages, Shared Metadata
    And je NE vois PAS : Administration, Mappings, Specs Providers
    And les actions autorisées sont accessibles

  Scenario: Utilisateur avec rôle Admin Interne
    Given je suis connecté avec le rôle "Admin Interne"
    Then je vois les menus : Titles, Packages, Mappings, Monitoring
    And je NE vois PAS : Specs Providers, Administration cross-plateforme

  Scenario: Utilisateur avec rôle Labo
    Given je suis connecté avec le rôle "Labo"
    Then je vois les menus : Specs Providers, XML Preview
    And je NE vois PAS : Titles, Packages, Administration
```

**FRs couverts :** FR46

---

#### Story 6.3 : Blocage des actions non autorisées

As a **Système**,
I want **bloquer les actions non autorisées selon les permissions de l'utilisateur**,
So that **la sécurité est garantie même en cas de tentative directe**.

**Acceptance Criteria:**

```gherkin
Feature: Blocage des actions non autorisées

  Scenario: Tentative d'action non autorisée via UI
    Given je suis Gestionnaire Catalogue
    When j'essaie d'accéder à une URL d'administration directement
    Then je suis redirigé vers une page "Accès refusé"
    And un message explique que je n'ai pas les permissions requises

  Scenario: Tentative d'action non autorisée via API
    Given mon token a le rôle "Gestionnaire Catalogue"
    When je fais une requête API pour modifier les mappings
    Then l'API retourne une erreur 403 Forbidden
    And l'action est loggée dans les audit logs

  Scenario: Boutons désactivés pour actions non autorisées
    Given je n'ai pas la permission "Supprimer package"
    Then le bouton "Supprimer" est grisé ou masqué
    And un tooltip explique "Permission requise : Supprimer package"
```

**FRs couverts :** FR47

---

#### Story 6.4 : Isolation des données par plateforme client (Multi-tenancy)

As a **Système**,
I want **isoler les données par plateforme client**,
So that **les données StudioCanal ne sont jamais visibles par Pathé et vice-versa**.

**Acceptance Criteria:**

```gherkin
Feature: Isolation des données multi-tenancy

  Scenario: Séparation des Titles par plateforme
    Given je suis connecté sur la plateforme "StudioCanal"
    When je consulte la liste des Titles
    Then je vois uniquement les Titles de StudioCanal
    And les Titles de Pathé, Wild Bunch, etc. sont invisibles

  Scenario: Isolation des packages
    Given je suis sur la plateforme "Pathé"
    When je crée un package
    Then le package est associé à la plateforme "Pathé"
    And il n'est jamais visible sur les autres plateformes

  Scenario: Filtrage au niveau base de données
    Given une requête SQL est exécutée
    Then le filtre plateforme est automatiquement ajouté
    And aucune donnée cross-plateforme ne peut fuiter
```

**FRs couverts :** FR48

---

#### Story 6.5 : Dashboard administration cross-plateformes

As a **SuperAdmin VDM**,
I want **accéder à un dashboard d'administration cross-plateformes**,
So that **je monitore l'activité et la santé de toutes les plateformes depuis un seul endroit**.

**Acceptance Criteria:**

```gherkin
Feature: Dashboard administration cross-plateformes

  Scenario: Accéder au dashboard cross-plateforme
    Given je suis connecté en tant que SuperAdmin VDM
    When j'accède à "Administration > Dashboard"
    Then je vois un résumé de toutes les plateformes :
      | Plateforme | Titles | Packages | Dernière activité | Statut |
      | StudioCanal | 1,247 | 3,892 | 2026-03-20 14:32 | 🟢 OK |
      | Pathé | 892 | 2,156 | 2026-03-20 13:45 | 🟢 OK |
      | Wild Bunch | 456 | 1,023 | 2026-03-19 18:20 | 🟡 Inactif |

  Scenario: Drill-down par plateforme
    Given je suis sur le dashboard cross-plateforme
    When je clique sur une plateforme
    Then je vois les détails : utilisateurs actifs, actions récentes, erreurs

  Scenario: Métriques globales
    Given je suis sur le dashboard
    Then je vois les métriques globales :
      | Métrique | Valeur |
      | Total Titles | 2,595 |
      | Total Packages | 7,071 |
      | Utilisateurs actifs (24h) | 47 |
      | Erreurs sync (7j) | 3 |
```

**FRs couverts :** FR49

---

#### Story 6.6 : Gestion centralisée des specs providers

As a **SuperAdmin VDM**,
I want **gérer centralement les specs providers appliquées à toutes les plateformes**,
So that **un changement iTunes s'applique à StudioCanal, Pathé et toutes les autres plateformes**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion centralisée specs providers

  Scenario: Specs partagées cross-plateforme
    Given je modifie une spec iTunes en tant que SuperAdmin
    When je déploie le changement
    Then le changement s'applique à TOUTES les plateformes
    And les 47 plateformes utilisent la nouvelle spec

  Scenario: Vue impact avant déploiement
    Given je m'apprête à déployer une modification de spec
    Then je vois l'impact :
      | Impacté | Valeur |
      | Plateformes | 47 |
      | Packages iTunes actifs | 12,345 |
      | Dernière livraison | il y a 2h |

  Scenario: Pas de specs par plateforme
    Given les specs sont centralisées
    Then il n'y a PAS de surcharge par plateforme
    And toutes les plateformes ont la même spec pour chaque provider
```

**FRs couverts :** FR50

---

#### Story 6.7 : Gestion centralisée des specs systèmes externes

As a **SuperAdmin VDM**,
I want **gérer centralement les specs de connexion aux systèmes externes (Unity, Iron, etc.)**,
So that **les mappings externes sont cohérents entre toutes les plateformes**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion centralisée specs systèmes externes

  Scenario: Mappings externes partagés
    Given je modifie un mapping Unity
    When je sauvegarde
    Then le mapping est partagé entre toutes les plateformes utilisant Unity

  Scenario: Activation par plateforme
    Given un système externe est configuré globalement
    Then chaque plateforme peut activer/désactiver le système
    And les plateformes activées utilisent la config globale

  Scenario: Credentials par plateforme
    Given Unity nécessite des credentials différents par studio
    Then les credentials API sont stockés au niveau plateforme
    And les mappings sont partagés, seuls les credentials diffèrent
```

**FRs couverts :** FR51

---

#### Story 6.8 : Audit logs pour actions critiques

As a **SuperAdmin VDM**,
I want **consulter des audit logs pour toutes les actions critiques**,
So that **je peux retracer qui a fait quoi et quand pour des besoins de sécurité et conformité**.

**Acceptance Criteria:**

```gherkin
Feature: Audit logs actions critiques

  Scenario: Actions loggées automatiquement
    Given une action critique est effectuée (création/édition/suppression)
    Then un audit log est créé avec :
      | Champ | Valeur |
      | Timestamp | Date/heure précise |
      | User | Utilisateur ayant effectué l'action |
      | Action | Type d'action (CREATE, UPDATE, DELETE) |
      | Resource | Ressource concernée (Title, Package, Spec) |
      | Details | Détails du changement (old/new values) |
      | IP | Adresse IP de l'utilisateur |

  Scenario: Consultation des audit logs
    Given je suis SuperAdmin
    When j'accède à "Administration > Audit Logs"
    Then je vois la liste chronologique des actions
    And je peux filtrer par : utilisateur, action, ressource, date

  Scenario: Export des audit logs
    Given je suis sur les audit logs
    When je clique sur "Export"
    Then un fichier CSV/JSON est téléchargé
    And il peut être archivé pour conformité
```

**FRs couverts :** FR52

---

### Epic 7 : Synchronisation vers le Modèle Legacy (DbMetadataFieldInfo)

**Le système synchronise** automatiquement les métadonnées BMME v2 vers DbMetadataFieldInfo pour que les autres modules mediaspot continuent à fonctionner sans modification.

**FRs couverts :** FR87, FR88, FR89, FR90, FR91, FR92, FR93, FR94

**Valeur livrée :** Les modules existants (hors BMME) lisent les métadonnées via DbMetadataFieldInfo de manière transparente, avec monitoring et alertes en cas d'échec de synchronisation.

#### Story 7.1 : Synchronisation automatique BMME v2 → DbMetadataFieldInfo

As a **Système**,
I want **synchroniser automatiquement les métadonnées BMME v2 vers le modèle legacy DbMetadataFieldInfo**,
So that **les autres modules mediaspot continuent à fonctionner sans modification**.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation automatique vers le modèle legacy

  Scenario: Sync à chaque modification de métadonnée
    Given une métadonnée est modifiée dans BMME v2
    When la modification est sauvegardée
    Then le système synchronise immédiatement vers DbMetadataFieldInfo
    And la donnée est disponible dans l'ancien modèle

  Scenario: Mapping BMME v2 → DbMetadataFieldInfo
    Given le mapping est configuré
    When une synchro s'exécute
    Then les champs BMME v2 sont transformés vers DbMetadataFieldInfo :
      | Champ BMME v2 | Champ DbMetadataFieldInfo |
      | title.originalTitle | MetadataFieldInfo.OriginalTitle |
      | title.synopsis.fr | MetadataFieldInfo.Synopsis_FR |
      | package.copyright | MetadataFieldInfo.Copyright |

  Scenario: Synchronisation transparente
    Given la synchro est en cours
    Then aucune action n'est requise des utilisateurs
    And aucune interruption de service n'est visible
```

**FRs couverts :** FR87

---

#### Story 7.2 : Transparence pour les modules consommateurs

As a **Module mediaspot existant**,
I want **lire les métadonnées via DbMetadataFieldInfo sans modification**,
So that **je continue à fonctionner normalement pendant la transition vers BMME v2**.

**Acceptance Criteria:**

```gherkin
Feature: Transparence pour les modules consommateurs

  Scenario: Lecture via l'ancien modèle
    Given un module mediaspot lit des métadonnées via DbMetadataFieldInfo
    When il fait une requête sur un Title
    Then il reçoit les données synchronisées depuis BMME v2
    And le format est identique à l'ancien système

  Scenario: Aucune modification de code requise
    Given les modules existants utilisent DbMetadataFieldInfo
    Then ils n'ont PAS besoin d'être modifiés
    And ils ne sont PAS conscients de l'existence de BMME v2

  Scenario: Performance préservée
    Given un module fait une requête DbMetadataFieldInfo
    Then le temps de réponse est comparable à l'ancien système
    And la synchro n'impacte pas les performances de lecture
```

**FRs couverts :** FR88, FR91

---

#### Story 7.3 : Configuration de la table de mapping legacy

As a **Admin Interne VDM**,
I want **configurer la table de mapping BMME v2 → DbMetadataFieldInfo**,
So that **je peux adapter la synchronisation quand de nouveaux champs sont ajoutés**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration du mapping legacy

  Scenario: Accéder à l'éditeur de mapping legacy
    Given je suis connecté en tant qu'Admin Interne VDM
    When j'accède à "Administration > Mapping Legacy"
    Then je vois la table de mapping :
      | Champ BMME v2 | Champ DbMetadataFieldInfo | Transform | Active |
      | title.originalTitle | OriginalTitle | none | ✅ |
      | title.year | ProductionYear | toString | ✅ |
      | package.territories | TerritoryList | join(',') | ✅ |

  Scenario: Ajouter un nouveau mapping
    Given un nouveau champ BMME v2 doit être synchronisé
    When je clique sur "Add mapping"
    And je configure source, destination et transformation
    Then le nouveau mapping est actif
    And les prochaines synchros l'utilisent

  Scenario: Désactiver un mapping
    Given un champ n'a plus besoin d'être synchronisé
    When je désactive le mapping
    Then il n'est plus exécuté lors des synchros
    And les données existantes restent en place
```

**FRs couverts :** FR89

---

#### Story 7.4 : Application du mapping à chaque modification

As a **Système**,
I want **appliquer le mapping lors de chaque modification de métadonnée dans BMME v2**,
So that **DbMetadataFieldInfo est toujours à jour**.

**Acceptance Criteria:**

```gherkin
Feature: Application du mapping par modification

  Scenario: Modification simple
    Given je modifie le titre original dans BMME v2
    When je sauvegarde
    Then le champ OriginalTitle dans DbMetadataFieldInfo est mis à jour
    And le timestamp de modification est enregistré

  Scenario: Modification bulk
    Given je fais une modification bulk de 50 champs
    When je sauvegarde
    Then les 50 champs sont synchronisés vers DbMetadataFieldInfo
    And la synchro est optimisée (batch update)

  Scenario: Transformation appliquée
    Given un mapping a une transformation (ex: join(','))
    When une synchro s'exécute
    Then la transformation est appliquée :
      | Input BMME v2 | Output DbMetadataFieldInfo |
      | ["FR", "DE", "IT"] | "FR,DE,IT" |
```

**FRs couverts :** FR90

---

#### Story 7.5 : Garantie de cohérence source/projection

As a **Système**,
I want **garantir la cohérence entre BMME v2 (source) et DbMetadataFieldInfo (projection)**,
So that **les données sont toujours identiques entre les deux modèles**.

**Acceptance Criteria:**

```gherkin
Feature: Garantie de cohérence

  Scenario: Cohérence vérifiée à chaque synchro
    Given une synchronisation s'exécute
    Then le système vérifie que les données correspondent
    And toute incohérence est loggée et corrigée

  Scenario: Détection d'incohérence
    Given DbMetadataFieldInfo a été modifié hors BMME v2
    When une vérification de cohérence s'exécute
    Then l'incohérence est détectée
    And une alerte est générée
    And BMME v2 reste la source de vérité

  Scenario: Resync forcée
    Given une incohérence a été détectée
    When je déclenche une resync forcée
    Then toutes les données BMME v2 sont re-projetées vers DbMetadataFieldInfo
    And la cohérence est restaurée
```

**FRs couverts :** FR92

---

#### Story 7.6 : Monitoring de la synchronisation legacy

As a **Admin Interne VDM**,
I want **monitorer le statut de synchronisation BMME v2 → DbMetadataFieldInfo**,
So that **je détecte rapidement les problèmes de synchro**.

**Acceptance Criteria:**

```gherkin
Feature: Monitoring de la synchronisation legacy

  Scenario: Dashboard de synchro legacy
    Given je suis Admin Interne VDM
    When j'accède à "Monitoring > Sync Legacy"
    Then je vois :
      | Métrique | Valeur |
      | Statut global | 🟢 Synchronized |
      | Dernière synchro | il y a 2 secondes |
      | Synchros/heure | 1,247 |
      | Erreurs (24h) | 0 |

  Scenario: Historique des synchronisations
    Given je consulte l'historique
    Then je vois les dernières synchros avec :
      | Timestamp | Title | Champs | Statut | Durée |
      | 14:32:15 | Le Dernier Métro | 3 | ✅ | 12ms |
      | 14:32:12 | La Haine | 1 | ✅ | 8ms |

  Scenario: Métriques de performance
    Given je consulte les métriques
    Then je vois :
      | Métrique | Valeur |
      | Latence moyenne | 15ms |
      | P95 latence | 45ms |
      | Throughput | 100 syncs/min |
```

**FRs couverts :** FR93

---

#### Story 7.7 : Alertes en cas d'échec de synchronisation

As a **Système**,
I want **alerter en cas d'échec de synchronisation vers le modèle legacy**,
So that **les problèmes sont détectés et résolus rapidement**.

**Acceptance Criteria:**

```gherkin
Feature: Alertes échec synchronisation legacy

  Scenario: Alerte sur échec de synchro
    Given une synchronisation échoue
    Then une alerte est générée immédiatement
    And elle contient : Title concerné, Erreur, Timestamp

  Scenario: Notification des admins
    Given une alerte est générée
    Then les Admin Internes sont notifiés :
      | Canal | Action |
      | Dashboard | Badge rouge visible |
      | Email | Si configuré |
      | Slack/Teams | Si webhook configuré |

  Scenario: Retry automatique
    Given une synchro a échoué
    Then le système retente automatiquement (3 retries)
    And si tous les retries échouent, l'alerte est escaladée

  Scenario: Résolution d'alerte
    Given une alerte est active
    When la synchro réussit (après fix)
    Then l'alerte est automatiquement résolue
    And un log de résolution est créé
```

**FRs couverts :** FR94
