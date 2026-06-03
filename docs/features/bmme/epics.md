---

## stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - 'docs/features/bmme/prd.md'
  - 'docs/features/bmme/ux-design-specification.md'

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

**14. Artwork Management**

- FR95: Gestionnaires de catalogue peuvent uploader des artworks via drag & drop multi-fichiers (bulk upload)
- FR96: Système analyse les filenames pour auto-remplir type, langue et provider
- FR97: Système valide automatiquement les dimensions et le ratio de chaque artwork à l'upload
- FR98: Système rejette automatiquement tout artwork avec une dimension impaire (largeur OU hauteur)
- FR99: Gestionnaires de catalogue peuvent visualiser tous les artworks d'un Title dans une vue liste filtrable
- FR100: Gestionnaires de catalogue peuvent filtrer les artworks par type, langue et provider
- FR101: Gestionnaires de catalogue peuvent sélectionner plusieurs artworks pour des bulk actions (delete, copy to, move to)
- FR102: Gestionnaires de catalogue peuvent copier des artworks vers d'autres langues ou territoires (bulk copy to)
- FR103: Gestionnaires de catalogue peuvent déplacer des artworks vers d'autres langues ou territoires (bulk move to)
- FR104: Gestionnaires de catalogue peuvent définir un artwork comme "All platforms", "Multi platforms" ou "Provider unique"
- FR105: Système stocke les artworks au niveau exact défini (Worldwide, Langue, ou Territoire) sans héritage automatique
- FR106: Système applique l'héritage des artworks uniquement à l'import dans le Package (Territoire ← Langue)
- FR107: Système propose automatiquement l'artwork de la langue parente si aucun artwork exact n'existe pour le territoire
- FR108: Gestionnaires de catalogue peuvent uploader plusieurs artworks du même type pour une même langue
- FR109: Gestionnaires de catalogue peuvent uploader des artworks aux niveaux Série, Saison et Épisode
- FR110: Système ne propage pas automatiquement les artworks entre les niveaux Série/Saison/Épisode
- FR111: Gestionnaires de catalogue peuvent marquer les artworks Saison/Épisode comme "optionnels"
- FR112: Système affiche un preview thumbnail de chaque artwork dans la vue liste
- FR113: Système valide les formats spécifiques par provider (ex: carré 1/1 pour Netflix, 1000×1440 pour Google)

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


| FR   | Epic   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| FR1  | Epic 1 | Création métadonnées Title                             |
| FR2  | Epic 1 | Création métadonnées par langue                        |
| FR3  | Epic 1 | Création métadonnées par territoire                    |
| FR4  | Epic 1 | Propagation automatique (héritage)                     |
| FR5  | Epic 1 | Vue bulk édition multi-langues/territoires             |
| FR6  | Epic 1 | Visualisation hiérarchie Title → Langues → Territoires |
| FR7  | Epic 3 | Synchronisation depuis VDM Connect                     |
| FR8  | Epic 3 | Synchronisation depuis systèmes externes               |
| FR9  | Epic 2 | Création packages par provider                         |
| FR10 | Epic 2 | Association métadonnées localisées à package           |
| FR11 | Epic 2 | Édition métadonnées package                            |
| FR12 | Epic 2 | Suppression package                                    |
| FR13 | Epic 2 | Visualisation statut complétion (compteur)             |
| FR14 | Epic 2 | Identification champs manquants                        |
| FR15 | Epic 2 | Définition shared metadata                             |
| FR16 | Epic 2 | Application shared metadata au provider                |
| FR17 | Epic 2 | Validation temps réel contre specs provider            |
| FR18 | Epic 2 | Marquage automatique VALID                             |
| FR19 | Epic 2 | État draft pour packages incomplets                    |
| FR20 | Epic 2 | Duplication package                                    |
| FR21 | Epic 3 | Migration packages depuis VDM Connect                  |
| FR22 | Epic 4 | Éditeur centralisé specs providers                     |
| FR23 | Epic 4 | Édition mappings mediaspot → provider                  |
| FR24 | Epic 4 | Édition formats champs providers                       |
| FR25 | Epic 4 | Validation temps réel mappings                         |
| FR26 | Epic 4 | Prévisualisation XML                                   |
| FR27 | Epic 4 | Déploiement instantané sans code                       |
| FR28 | Epic 4 | Versionning specs avec rollback                        |
| FR31 | Epic 3 | Dashboard monitoring synchronisations                  |
| FR32 | Epic 3 | Statut temps réel synchros                             |
| FR33 | Epic 3 | Logs détaillés et friendly                             |
| FR34 | Epic 3 | Mode diagnostic live API                               |
| FR35 | Epic 3 | Éditeur mapping visuel                                 |
| FR36 | Epic 3 | Édition mappings externe → mediaspot                   |
| FR38 | Epic 3 | Resynchronisation manuelle 1 clic                      |
| FR39 | Epic 3 | Progression resync avec ETA                            |
| FR42 | Epic 3 | Historisation synchronisations                         |
| FR43 | Epic 4 | Génération XML conformes                               |
| FR45 | Epic 6 | Définition permissions ACL                             |
| FR46 | Epic 6 | Application permissions par rôle                       |
| FR47 | Epic 6 | Blocage actions non autorisées                         |
| FR48 | Epic 6 | Isolation données multi-tenancy                        |
| FR49 | Epic 6 | Dashboard administration cross-plateformes             |
| FR50 | Epic 6 | Gestion centralisée specs providers                    |
| FR51 | Epic 6 | Gestion centralisée specs externes                     |
| FR52 | Epic 6 | Audit logs actions critiques                           |
| FR55 | Epic 1 | Activation langue pour Title                           |
| FR56 | Epic 1 | Langue original title par défaut                       |
| FR57 | Epic 1 | Affichage champs localisables uniquement               |
| FR58 | Epic 1 | Héritage territoire depuis langue                      |
| FR59 | Epic 5 | Affichage source métadonnée                            |
| FR60 | Epic 5 | Synchronisation manuelle depuis source                 |
| FR61 | Epic 5 | Preview changements avant application                  |
| FR62 | Epic 5 | Vue multi-source par métadonnée                        |
| FR63 | Epic 5 | Historisation modifications                            |
| FR64 | Epic 5 | Catégorisation types modification                      |
| FR65 | Epic 5 | Consultation historique complet                        |
| FR66 | Epic 2 | Gestion shared metadata cross-platforms                |
| FR67 | Epic 2 | Propagation shared metadata aux packages               |
| FR68 | Epic 2 | Création package Platform + Territories                |
| FR69 | Epic 2 | Pré-remplissage packages                               |
| FR70 | Epic 2 | Structure package hiérarchique                         |
| FR71 | Epic 3 | Formatting options mapping                             |
| FR72 | Epic 3 | Mapping options enums                                  |
| FR73 | Epic 3 | Application formatting import                          |
| FR74 | Epic 3 | Application mapping enums                              |
| FR75 | Epic 3 | Définition default source                              |
| FR76 | Epic 3 | Activation lock source                                 |
| FR77 | Epic 3 | Blocage changement source                              |
| FR78 | Epic 3 | Notes erreur typées                                    |
| FR79 | Epic 3 | Resync depuis source                                   |
| FR80 | Epic 3 | Bulk resync                                            |
| FR81 | Epic 4 | Provider mappings cross-platform                       |
| FR82 | Epic 4 | Formatting options export                              |
| FR83 | Epic 4 | Mapping options enums export                           |
| FR84 | Epic 4 | Test mappings sur packages réels                       |
| FR85 | Epic 4 | Affichage résultats test transformés                   |
| FR86 | Epic 4 | Source of truth table partagée                         |
| FR87 | Epic 7 | Synchronisation auto vers DbMetadataFieldInfo          |
| FR88 | Epic 7 | Transparence pour modules consommateurs                |
| FR89 | Epic 7 | Configuration mapping legacy                           |
| FR90 | Epic 7 | Application mapping par modification                   |
| FR91 | Epic 7 | Continuité lecture DbMetadataFieldInfo                 |
| FR92 | Epic 7 | Garantie cohérence source/projection                   |
| FR93 | Epic 7 | Monitoring sync legacy                                 |
| FR94 | Epic 7 | Alerte échec sync legacy                               |


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

**UI References:** [docs/features/bmme/ui/](docs/features/bmme/ui/)

**ACL Requirements (from Event Storming - Input Mapping BC):**

| Action | Permission requise |
|--------|-------------------|
| Créer/modifier/supprimer une source | "CRUD Level User" + Droit "Gestion des Sources" |
| Configurer les mappings | "CRUD Level User" |
| Configurer la répétition de synchro | "CRUD Level User" |
| Importer un fichier | "CRUD Level User" |
| Trigger une API | "CRUD Level User" |

**Note :** "CRUD Level User" est le niveau de base. Le droit "Gestion (CRUD) des Sources" est un droit spécifique attribuable dans les ACL (cf. Epic 6).

#### Story 3.1 : Dashboard de monitoring des synchronisations

As a **Admin Interne VDM**,
I want **voir un dashboard avec le statut temps réel de toutes les synchronisations externes**,
So that **je détecte immédiatement les problèmes sans attendre les plaintes clients**.

**UI Reference:** [3.1 - Dashboard de monitoring des synchronisations/](docs/features/bmme/ui/3.1%20-%20Dashboard%20de%20monitoring%20des%20synchronisations/)

**Acceptance Criteria:**

```gherkin
Background:
  Given je suis connecté en tant qu'Admin Interne VDM
  And j'accède à "External sources"

# ── Cas nominaux ──────────────────────────────────────────────────────────────

# --- Vue API syncs ---

Scenario: Navigation vers les synchronisations API
  When je clique sur "API syncs" dans la sidebar
  Then je vois la page "Synchronizations" avec :
    | Élément      | Description                               |
    | Header       | "Synchronizations · X in the last month"  |
    | Cartes sources | Unity, Iron, IMDb, MovieLibrary, VDM C  |
    | Tableau      | Liste des synchronisations paginée        |

Scenario: Affichage des cartes sources API en haut du dashboard
  Given je suis sur "API syncs"
  Then je vois 5 cartes sources : Unity, Iron, IMDb, MovieLibrary, VDM C
  And chaque carte affiche :
    | Élément       | Format                                                                      |
    | Nom de la source | "Unity", "Iron", etc.                                                    |
    | Badge statut  | 🟢 (vert) ou 🔴 (rouge) selon état                                         |
    | Last sync     | Temps relatif (ex: "2h. ago") avec icône ⏱️                                |
    | Last week     | "X syncs" avec compteurs syncs/erreurs (ex: "12 0" ou "12 2")             |

Scenario: Affichage du tableau des synchronisations API
  Given je suis sur "API syncs"
  Then je vois un tableau paginé avec les colonnes :
    | Colonne | Description                                       |
    | Source  | Nom de la source (Unity, Iron, IMDb, VDM C)       |
    | Date    | Date et heure (format: 21/12/2026 12:25)          |
    | Trigger | ⚡ System (automatique) ou 👤 John Doe (manuel)   |
    | Errors  | "None" (vert) ou "X errors" (rouge)               |
    | Updates | "X titles · Y fields"                             |
  And les lignes avec erreurs affichent une icône 🔄 pour relancer

# --- Vue File imports ---

Scenario: Navigation vers les imports fichiers
  When je clique sur "File importer" dans la sidebar
  Then je vois la page "File imports" avec :
    | Élément        | Description                                              |
    | Header         | "File imports · X in the last month"                     |
    | Cartes mappings | Liste des mappings fichiers configurés (ex: test-mappings, ROD-july-2026) |
    | Bouton         | "New import" pour importer un nouveau fichier            |
    | Tableau        | Liste des imports paginée                                |

Scenario: Affichage des cartes mappings fichiers
  Given je suis sur "File importer"
  Then je vois les cartes des mappings fichiers configurés
  And chaque carte affiche :
    | Élément           | Format                                 |
    | Nom du mapping    | "test-mappings", "ROD-july-2026", etc. |
    | Période           | "last week"                            |
    | Compteur imports  | "X imports"                            |
    | Compteur erreurs  | Nombre d'erreurs (ou 0)                |

Scenario: Affichage du tableau des imports fichiers
  Given je suis sur "File importer"
  Then je vois un tableau paginé avec les colonnes :
    | Colonne | Description                              |
    | File    | Nom du fichier importé                   |
    | Date    | Date et heure de l'import                |
    | Mapping | Nom du mapping utilisé (test-mapping...) |
    | Trigger | 👤 John Doe (utilisateur qui a importé)  |
    | Errors  | "Loaded" (vert) ou "X errors" (rouge)    |
    | Entries | Nombre d'entrées traitées                |
    | Update  | "X titles" mis à jour                    |

# --- Fonctionnalités communes ---

Scenario: Filtrage du tableau par source ou mapping
  When je clique sur le filtre "Source" (API) ou "Mapping" (fichiers)
  And je sélectionne un élément
  Then seuls les éléments correspondants sont affichés

Scenario: Filtrage du tableau via un clic sur une card source
  When je clique sur la card "Unity"
  Then seules les synchronisations Unity sont affichées
  And un badge "Unity x" apparaît dans le tableau pour indiquer le filtre actif

Scenario: Filtrage du tableau via le dropdown "Source"
  When je clique sur le filtre "Source" et je sélectionne "Unity"
  Then seules les synchronisations Unity sont affichées
  And un badge "Unity x" apparaît pour indiquer le filtre actif

Scenario: Filtrage par erreurs uniquement
  When j'active le toggle "Errors only"
  Then seuls les éléments avec erreurs sont affichés

Scenario: Export des données
  When je clique sur le bouton "Export"
  Then les données filtrées sont exportées au format CSV/Excel

Scenario: Pagination du tableau
  Given il y a plus de 20 éléments
  Then la pagination affiche "1 - 20 of X" en bas du tableau
  And je peux naviguer entre les pages
  And je peux choisir "20 per page" via un sélecteur

Scenario: Suppression d'un filtre actif
  Given j'ai filtré le tableau par source "Unity"
  When je clique sur le badge "Unity x"
  Then le filtre est retiré et toutes les synchronisations sont affichées

# ── Cas alternatifs ───────────────────────────────────────────────────────────

Scenario: Combinaison filtre Source et toggle Errors only
  When je filtre par source "Unity"
  And j'active le toggle "Errors only"
  Then seules les synchronisations Unity avec erreurs sont affichées

Scenario: Navigation entre pages avec filtre actif
  Given j'ai filtré le tableau par source "Iron"
  When je navigue vers la page 2
  Then le filtre "Iron" est toujours actif
  And seules les synchronisations Iron sont affichées sur la page 2

# ── Cas d'erreur ──────────────────────────────────────────────────────────────

Scenario: Chargement du dashboard impossible
  Given le service de monitoring est indisponible
  When j'accède à "External sources > Synchronizations"
  Then un message d'erreur s'affiche indiquant que les données ne peuvent pas être chargées
  # ⚠️ À clarifier (Dev) : comportement si API down (cache ? état vide ?)

Scenario: Export échoue
  When je clique sur le bouton "Export"
  And le service d'export retourne une erreur
  Then un message d'erreur s'affiche
  And aucun fichier n'est téléchargé

Scenario: Accès refusé (rôle non habilité)
  Given je suis connecté avec le rôle "Gestionnaire Catalogue"
  When j'accède à "External sources > Synchronizations"
  Then l'accès m'est refusé (cf. matrice ACL FR46/FR47)
  And je vois une page 403 avec un message "Accès refusé"

Scenario: Aucun résultat avec filtres combinés
  Given aucune synchronisation ne correspond aux filtres actifs
  Then un message "Aucun résultat" s'affiche dans le tableau
  And le bouton Export est désactivé

# ── Cas limites ───────────────────────────────────────────────────────────────

Scenario: Source jamais synchronisée
  Given une source est configurée mais n'a jamais été synchronisée
  Then sa carte affiche un état neutre pour "Last sync"
  And la carte affiche "Never" en dessous de Last sync

Scenario: Export volumétrique
  Given le tableau contient plus de 100 000 synchronisations sans filtre actif
  When je clique sur le bouton "Export"
  Then l'export se déclenche sans blocage pour l'utilisateur
  # ⚠️ À clarifier (Dev) : synchrone (téléchargement direct) ou asynchrone (lien par email) ?
```

**FRs couverts :** FR31, FR32

---

#### Story 3.2 : Détails de synchronisation et erreurs typées

As a **Admin Interne VDM**,
I want **consulter le détail d'une synchronisation avec les erreurs typées par titre et par champ**,
So that **je diagnostique rapidement la cause d'un problème et je sais exactement quoi corriger**.

**UI Reference:** [3.2, 3.7 - Logs détaillés & friendly des synchronisations/](docs/features/bmme/ui/3.2%2C%203.7%20-Logs%20d%C3%A9taill%C3%A9s%20%26%20friendly%20des%20synchronisations%2C%20Affichage%20des%20erreurs%20typ%C3%A9es%20lors%20des%20synchronisations/)

**Acceptance Criteria:**

```gherkin
Background:
  Given je suis sur le dashboard "External sources > Synchronizations"

# ── Cas nominaux ──────────────────────────────────────────────────────────────

Scenario: Ouvrir la modale "Sync details" depuis le tableau
  When je clique sur une ligne de synchronisation
  Then une modale "Sync details" s'ouvre
  And le header affiche :
    | Élément    | Exemple                        |
    | Source     | "Unity"                        |
    | Date/heure | "21/12/2026 12:25"             |
    | Trigger    | "⚡ System" ou "👤 John Doe"   |
  And le résumé affiche "X titles · Y fields · Z errors" (erreurs en rouge)

Scenario: Liste des titres synchronisés avec accordéon
  Given la modale "Sync details" est ouverte
  Then je vois la liste des titres impactés avec :
    | Élément       | Format                                           |
    | Thumbnail     | Image miniature du titre                         |
    | Nom du titre  | "Stranger Things"                                |
    | ID externe    | "#123456"                                        |
    | Compteur      | "X fields · Y errors" ou "X fields · No errors" |
  And chaque titre est un accordéon dépliable

Scenario: Détail des champs synchronisés pour un titre
  When je déplie l'accordéon d'un titre
  Then je vois un tableau avec les colonnes :
    | Colonne   | Description                                                           |
    | Field     | Nom du champ (director, OAR, localizedTitle, genres, originalTitle)   |
    | New value | Valeur importée (code style monospace)                                |
    | Details   | Message d'erreur ou vide si OK                                        |
  And les champs en erreur sont mis en évidence (texte rouge)
  And un toggle "Errors only" permet de filtrer

Scenario: Fermeture de la modale "Sync details"
  Given la modale "Sync details" est ouverte
  When je clique sur l'icône "×" de fermeture
  Then la modale se ferme
  And je reviens sur le dashboard "Synchronizations"

Scenario: Types d'erreurs affichés dans la colonne Details
  Given un titre a des erreurs de synchronisation
  Then les types d'erreurs suivants sont affichés :
    | Type d'erreur             | Message exemple                              |
    | Wrong data format         | "Field localizedTitle should be a string"    |
    | Mapping option manquante  | "Option 'sci-fi' is not in mapping options"  |
    | Champ non mappé           | "Not mapped" avec icône ⚠️                   |
  And les valeurs problématiques sont affichées en rouge dans "New value"

Scenario: Type d'erreur "Formatting failed" affiché dans la colonne Details
  Given un titre a un champ dont la transformation a échoué lors de la synchronisation
  Then la colonne Details affiche un message du type "Formatting failed: no '&' found"
  And la valeur dans "New value" est affichée avec une ligne en rouge + 'Formatting failed: ...'

Scenario: Identification des champs non mappés
  Given un champ désactivé dans le mapping de la source
  Then le champ affiche une icône Unlinked à côté du nom
  And la colonne Details peut afficher "Not mapped"

Scenario: Identification des champs verrouillés
  Given un champ a "Lock source" activé
  Then le champ affiche une icône cadenas 🔒 à côté du nom
  And la colonne Details peut afficher "Not synced - Field sourced by mediaspot"

Scenario: Filtrage "Errors only" par titre
  When j'active le toggle "Errors only" sur un titre déplié
  Then seuls les champs avec erreurs sont affichés pour ce titre
  And les champs sans erreur sont masqués

# ── Cas alternatifs ───────────────────────────────────────────────────────────

Scenario: Ouverture de la modale pour une synchronisation sans erreur
  Given une ligne de synchronisation affiche "None" dans la colonne Errors
  When je clique sur cette ligne
  Then la modale "Sync details" s'ouvre
  And le résumé affiche "X titles · Y fields" sans compteur d'erreurs
  And aucun champ n'est mis en évidence en rouge

Scenario: Dépliage d'un titre sans erreur
  Given la modale "Sync details" est ouverte
  And un titre affiche "X fields · No errors"
  When je déplie l'accordéon de ce titre
  Then je vois le tableau des champs synchronisés
  And aucun champ n'est mis en évidence en rouge
  And le toggle "Errors only" est désactivé et grisé

Scenario: Synchronisation avec un grand nombre de titres
  Given une synchronisation a impacté plus de 100 titres
  When la modale "Sync details" s'ouvre
  Then tous les titres sont accessibles via un scroll infini (si possible)

Scenario: Valeur de champ très longue dans "New value"
  Given un champ synchronisé contient une valeur textuelle très longue
  Then la valeur est affichée de manière lisible dans la colonne "New value"
  # avec 3 lignes max, puis troncature avec tooltip

# ── Cas d'erreur ──────────────────────────────────────────────────────────────

Scenario: Synchronisation avec 0 titre impacté
  Given une synchronisation n'a mis à jour aucun titre
  When je clique sur cette ligne dans le tableau
  Then la modale "Sync details" s'ouvre
  And le résumé affiche "0 titles · 0 fields"
  And un message indique qu'aucune donnée n'a été modifiée lors de cette synchronisation
  # ⏳ À clarifier (PO) : message exact ? La ligne est-elle même cliquable dans ce cas ?
  # Empty state à designer

Scenario: Données de synchronisation non disponibles
  Given les logs détaillés d'une synchronisation ancienne ne sont plus disponibles
  When je clique sur cette ligne dans le tableau
  Then la modale s'ouvre avec un message indiquant que le détail n'est plus disponible
  # ⚠️ À clarifier (Dev) : les logs sont-ils purgés après X jours ? Comportement attendu ?

# ── Cas limites ───────────────────────────────────────────────────────────────

Scenario: Titre sans thumbnail
  Given un titre synchronisé n'a pas d'image associée
  Then une image de fallback est affichée à la place du thumbnail dans la liste des titres
  # ⚠️ À clarifier (Dev) : fallback prévu ? Placeholder générique ?
```

**FRs couverts :** FR33, FR42, FR78

---

#### Story 3.3 : Mode diagnostic live des sources externes (API et fichiers)

As a **Admin Interne VDM**,
I want **tester une source externe (API ou fichier) en temps réel pour diagnostiquer un problème**,
So that **je comprends rapidement si le problème vient de la source ou du mapping**.

**UI Reference:** [3.3 - Mode diagnostic live des APIs externes/](docs/features/bmme/ui/3.3%20-%20Mode%20diagnostic%20live%20des%20APIs%20externes/)

**Acceptance Criteria:**

```gherkin
Feature: Mode diagnostic live (External system troubleshoot / File mapping troubleshoot)

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM

  # ── Cas nominaux ───────────────────────────────────────────────────

  # --- Mode API : External system troubleshoot ---

  Scenario: Accéder au mode troubleshoot API depuis le dashboard
    Given je suis sur le dashboard "API syncs"
    When je clique sur l'icône de diagnostic d'une source (ex: Unity)
    Then une modale "External system troubleshoot" s'ouvre

  Scenario: Interface de la modale troubleshoot API
    Given la modale "External system troubleshoot" est ouverte
    Then je vois :
      | Élément | Description |
      | Indicateur source | "• Unity" avec statut (point coloré) |
      | Sélecteur titre | Dropdown avec "Random title" ou titre spécifique |
      | Bouton Trigger | Bouton violet "Trigger ⚡" |
      | Zone de résultat | Affichage JSON avec coloration syntaxique |

  Scenario: Tester l'API avec un titre aléatoire
    Given je suis dans la modale troubleshoot API
    When je sélectionne "Random title" dans le sélecteur
    And je clique sur "Trigger ⚡"
    Then le système appelle l'API externe pour un titre aléatoire
    And la réponse JSON brute s'affiche avec coloration syntaxique

  Scenario: Tester l'API avec un titre spécifique
    When je sélectionne un titre (ex: "Stranger Things Season 4") dans le dropdown
    And je clique sur "Trigger ⚡"
    Then l'API est appelée pour ce titre spécifique
    And la réponse JSON s'affiche

  Scenario: Fermeture de la modale troubleshoot API
    Given la modale "External system troubleshoot" est ouverte
    When je clique sur l'icône "×" de fermeture
    Then la modale se ferme
    And je reviens sur le dashboard "API syncs"

  Scenario: Résultat sans erreur en mode API
    Given je suis dans la modale "External system troubleshoot"
    When je clique sur "Trigger ⚡"
    And l'API retourne une réponse sans anomalie de mapping
    Then le JSON s'affiche sans badge d'erreur ⚠️
    And aucun champ n'est surligné en rouge
    # ⏳ À clarifier (PO) : message de succès explicite ("All fields mapped correctly") ou juste le JSON propre ?
    # > Metrics de mapping à designer (total fields / mapped / errors counts)

  # --- Mode Fichier : File mapping troubleshoot ---

  Scenario: Accéder au mode troubleshoot fichier depuis le dashboard
    Given je suis sur le dashboard "File importer" ou l'éditeur de mapping fichier
    When je clique sur "Test file" ou l'icône de diagnostic d'un mapping fichier
    Then une modale "File mapping troubleshoot" s'ouvre

  Scenario: Interface de la modale troubleshoot fichier
    Given la modale "File mapping troubleshoot" est ouverte
    Then je vois :
      | Élément | Description |
      | Indicateur mapping | "📄 test-mappings" (icône fichier + nom) |
      | Sélecteur fichier | "Select a CSV file" avec bouton upload |
      | Bouton Test | Bouton violet "Test" |
      | Zone de résultat | Vide avec message "Import a JSON file to get started" |

  Scenario: Tester un mapping fichier avec upload
    Given je suis dans la modale troubleshoot fichier
    And la zone affiche "Import a JSON file to get started" avec bouton "Upload file"
    When je clique sur "Upload file" ou "Select a CSV file"
    And je sélectionne un fichier test (ex: test.json)
    Then le fichier est chargé
    And le nom du fichier apparaît dans le header (ex: "test.json ×")
    When je clique sur "Test"
    Then le système parse le fichier avec le mapping configuré
    And la réponse JSON s'affiche avec les données mappées

  Scenario: Fermeture de la modale troubleshoot fichier
    Given la modale "File mapping troubleshoot" est ouverte
    When je clique sur l'icône "×" de fermeture
    Then la modale se ferme

  Scenario: Résultat sans erreur en mode fichier
    Given je suis dans la modale "File mapping troubleshoot"
    And j'ai uploadé un fichier valide
    When je clique sur "Test"
    And le fichier est parsé sans anomalie de mapping
    Then le JSON s'affiche sans badge d'erreur ⚠️
    # ⏳ À clarifier (PO) : confirmation visuelle de succès ou juste le JSON propre ?
    # > Metrics de mapping à designer (total fields / mapped / errors counts)

  Scenario: Suppression du fichier sélectionné
    Given je suis dans la modale "File mapping troubleshoot"
    And un fichier "test.json" est chargé dans le header
    When je clique sur le "×" à côté du nom du fichier
    Then le fichier est retiré
    And la zone de résultat repasse à l'état initial "Import a JSON file to get started"
    And le bouton "Test" est désactivé

  # --- Affichage des erreurs (commun aux deux modes) ---

  Scenario: Affichage des erreurs de mapping inline dans le JSON
    Given le résultat JSON est affiché (API ou fichier)
    Then les champs problématiques sont annotés avec un badge rouge ⚠️
    And les erreurs détectées incluent :
      | Type d'erreur | Annotation inline |
      | Valeur non mappée | ⚠️ "Value 'SND' missing from mapped options" |
      | Format incorrect | ⚠️ format de date invalide |
      | Champ non reconnu | ⚠️ champ surligné en rouge |

  Scenario: Affichage des champs non mappés dans le JSON
    Given l'API a retourné une réponse JSON
    Then les champs non utilisés dans le mapping de la source sont affichés en gris
    And une icône Unlinked s'affiche à côté

  Scenario: Tooltip explicatif au survol d'une erreur
    Given le JSON affiche des badges d'erreur ⚠️
    When je survole un badge d'erreur
    Then un tooltip explicatif s'affiche
    And le message indique la cause (ex: "Value 'SND' missing from mapped options")

  Scenario: Structure JSON avec erreurs multiples
    Given la source retourne un objet complexe
    Then la structure JSON est affichée avec indentation :
      | Chemin | Exemple d'erreur |
      | summary.productionCompanies | ⚠️ "SND" non mappé |
      | dates.releaseDate | ⚠️ format de date invalide |
      | languagesAndInternationalization.originalCountry | ⚠️ valeur non reconnue |
    And les champs en erreur sont surlignés en magenta/rouge
    And je peux identifier rapidement tous les problèmes

  # ── Cas alternatifs ────────────────────────────────────────────────

  Scenario: Re-trigger avec le même titre
    Given un premier résultat JSON est affiché dans la modale troubleshoot API
    When je clique à nouveau sur "Trigger ⚡" sans changer le titre
    Then le résultat précédent est remplacé par la nouvelle réponse
    # => état intermédiaire pendant le chargement : Generic loading state

  Scenario: Changer de titre après un premier test
    Given un résultat JSON est affiché pour "Stranger Things Season 4"
    When je sélectionne un autre titre dans le dropdown (ex: "Terminator")
    And je clique sur "Trigger ⚡"
    Then le résultat est mis à jour avec la réponse pour "Terminator"

  Scenario: Tester un nouveau fichier après un premier test
    Given un résultat JSON est affiché pour "test.json"
    When je clique sur le "×" pour retirer le fichier
    And j'uploade un nouveau fichier (ex: "test2.json")
    And je clique sur "Test"
    Then le résultat est mis à jour avec les données du nouveau fichier

  # ── Cas d'erreur ───────────────────────────────────────────────────

  Scenario: API externe inaccessible au moment du test
    Given je suis dans la modale "External system troubleshoot"
    When je clique sur "Trigger ⚡"
    And l'API externe est inaccessible ou retourne une erreur HTTP
    Then un message d'erreur s'affiche dans la zone de résultat : "Generic error state"
    And le message indique que la source n'a pas pu être contactée
    # ⚠️ À clarifier (Dev) : timeout après combien de secondes ?

  Scenario: Upload d'un fichier au format invalide
    Given je suis dans la modale "File mapping troubleshoot"
    When j'uploade un fichier dont le format n'est pas supporté (ex: .xlsx, .pdf)
    Then un message d'erreur s'affiche indiquant que le format n'est pas accepté
    And le bouton "Test" reste désactivé
    # formats acceptés : JSON, CSV/Excel et XML

  Scenario: Upload d'un fichier vide
    Given je suis dans la modale "File mapping troubleshoot"
    When j'uploade un fichier vide
    Then un message d'erreur s'affiche
    # ⏳ Error state à designer

  Scenario: Upload d'un fichier malformé (JSON invalide)
    Given je suis dans la modale "File mapping troubleshoot"
    When j'uploade un fichier JSON avec une syntaxe incorrecte
    And je clique sur "Test"
    Then un message d'erreur s'affiche indiquant que le fichier ne peut pas être parsé
    And aucun résultat n'est affiché

  Scenario: Accès refusé (rôle non habilité)
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    When j'accède au mode diagnostic live
    Then l'accès m'est refusé (cf. matrice ACL FR46/FR47) page 403, bouton masqué

  # ── Cas limites ────────────────────────────────────────────────────

  Scenario: Réponse JSON très volumineuse
    Given l'API externe retourne un objet JSON de grande taille
    When le résultat s'affiche dans la zone de résultat
    Then la zone est scrollable
    And la coloration syntaxique et les badges d'erreur restent lisibles
    # ⚠️ À clarifier (Dev) : limite de taille affichée ? Troncature avec avertissement ?

  Scenario: Grand nombre d'erreurs de mapping
    Given l'API retourne un JSON avec plus de 50 champs en erreur
    Then tous les champs en erreur sont annotés avec un badge et leurs erreurs ⚠️
    And je peux scroller pour les consulter tous

  Scenario: Upload d'un fichier trop volumineux
    Given je suis dans la modale "File mapping troubleshoot"
    When j'uploade un fichier dépassant la taille maximale autorisée
    Then un message d'erreur s'affiche indiquant la limite de taille (Limite dev maximale, scroll infini si nécessaire)
    And le fichier n'est pas chargé

  # ── Nice-to-have ──────────────────────────────────────────────────────

  Scenario: Exporter le résultat JSON du diagnostic (nice-to-have)
    Given le résultat JSON est affiché (API ou fichier)
    When je clique sur "Export JSON"
    Then un fichier JSON est téléchargé avec le résultat complet du diagnostic
    And je peux l'analyser hors ligne ou le partager pour debug
```

**FRs couverts :** FR34 (enrichi), FR42 (enrichi)

**Event Storming Reference:** Synchro BC - Commandes "Configurer un Dry run sur une source file", "Lancer un Dry run sur une source API"

---

#### Story 3.4 : Création et configuration des mappings externes

As a **Admin Interne VDM**,
I want **créer et configurer des mappings pour des sources externes (API ou fichiers)**,
So that **je peux connecter de nouvelles sources de données sans intervention technique**.

**UI Reference:** [3.4, 3.5 - Éditeur visuel de mappings/](docs/features/bmme/ui/3.4%2C%203.5%20-%20%C3%89diteur%20visuel%20de%20mappings%2C%20Configuration%20des%20Formatting%20et%20Mapping%20options/)

**Acceptance Criteria:**

```gherkin
Feature: Création et configuration des mappings externes

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM
    And j'accède à "External sources"

  # ── Cas nominaux ───────────────────────────────────────────────────

  # --- Navigation et liste des mappings ---

  Scenario: Navigation vers la section Mappings
    Given je suis dans le menu "External sources"
    Then je vois une section "Mappings" dans la sidebar avec :
      | Mapping | Icône |
      | Iron | 🌐 (globe - API) |
      | Unity | 🌐 (globe - API) |
      | IMDb | 🌐 (globe - API) |
      | VDM Connect | 🌐 (globe - API) |
      | test-mappings | 📄 (fichier - File-based) |
    And je vois un bouton "+ New mapping" en bas de la liste

  # --- Création d'un nouveau mapping ---

  Scenario: Ouvrir la modale de création de mapping
    When je clique sur "+ New mapping"
    Then une modale "Create a new mapping" s'ouvre
    And je vois les champs :
      | Champ | Description |
      | Input type | Dropdown avec "API or file-based" |
      | System name | Champ texte (ex: "IMDb") |
    And les boutons "Cancel" et "Next →"

  Scenario: Créer un mapping de type API
    Given la modale "Create a new mapping" est ouverte
    When je sélectionne "API" dans le dropdown "Input type"
    And je saisis "CustomAPI" dans "System name"
    And je clique sur "Next →"
    Then je suis redirigé vers la page de configuration du mapping API
    And je vois l'onglet "Configuration" actif avec :
      | Champ | Description |
      | Input type | "API" (dropdown) |
      | Default URL | Champ texte avec placeholder "{id}" |
      | API Key | Champ texte (optionnel) |
    And je vois les boutons "Test API" et "Save"
    And le badge "Not configured" s'affiche

  Scenario: Créer un mapping de type fichier
    Given la modale "Create a new mapping" est ouverte
    When je sélectionne "File-based" dans le dropdown "Input type"
    And je saisis "ROD-import" dans "System name"
    And je clique sur "Next →"
    Then je suis redirigé vers la page de configuration du mapping fichier
    And je vois l'onglet "Configuration" actif avec :
      | Champ | Description |
      | Input type | "File-based" (dropdown) |
      | Extension | Dropdown avec "CSV", "JSON", etc. |
    And je vois les boutons "Test file" et "Save"
    And le badge "Not configured" s'affiche

  Scenario: Annuler la création d'un mapping
    Given la modale "Create a new mapping" est ouverte
    When je clique sur "Cancel"
    Then la modale se ferme
    And aucun mapping n'est créé
    And je reviens sur la liste des mappings existants

  # --- Configuration d'un mapping API ---

  Scenario: Configurer l'URL et la clé API
    Given je suis sur la configuration d'un mapping API
    When je saisis "api.imdb.com/title/{id}" dans "Default URL"
    And je saisis ma clé API dans "API Key"
    And je clique sur "Save"
    Then la configuration est sauvegardée
    And le badge passe de "Not configured" à "X/Y fields mapped"

  Scenario: Détecter les champs via appel API (mapping API)
    Given je suis sur l'onglet "Mappings" d'un mapping API
    And aucun champ n'est détecté
    Then je vois le message "Trigger an API call with a given ID"
    And le sous-texte "We will use it to detect the API's response and fields"
    And un champ "Title ID" avec bouton "⚡ Trigger"
    When je saisis un ID de titre
    And je clique sur "⚡ Trigger"
    Then le système appelle l'API avec cet ID
    And les champs détectés s'affichent (ex: stream-id, title, tmp-id)
    And chaque champ affiche son type détecté (number, string, etc.)
    And les champs sont marqués "→ unused" par défaut

  # --- Configuration d'un mapping fichier ---

  Scenario: Détecter les champs via upload fichier (mapping fichier)
    Given je suis sur l'onglet "Mappings" d'un mapping fichier
    And aucun champ n'est détecté
    Then je vois le message "Import a test file to get started"
    And le sous-texte "We will use it to detect your base file structure and fields"
    And un bouton "Upload file"
    When je clique sur "Upload file"
    And je sélectionne un fichier CSV/JSON de test
    Then le système parse le fichier
    And les champs détectés s'affichent (ex: stream-id, title, tmp-id)
    And chaque champ affiche son type détecté (number, string, etc.)
    And les champs sont marqués "→ unused" par défaut

  # --- Test des mappings ---

  Scenario: Tester le mapping API
    Given je suis sur un mapping de type API
    When je clique sur "Test API" dans le header
    Then la modale "External system troubleshoot" s'ouvre (cf. Story 3.3)
    And je peux vérifier que la connexion API fonctionne

  Scenario: Tester le mapping fichier
    Given je suis sur un mapping de type fichier
    When je clique sur "Test file" dans le header
    Then la modale "File mapping troubleshoot" s'ouvre (cf. Story 3.3)
    And je peux uploader un fichier test pour vérifier la structure

  # --- Gestion des champs ---

  Scenario: Rechercher un champ dans l'onglet Mappings
    Given je suis sur l'onglet "Mappings" d'un mapping avec des champs détectés
    When je saisis un terme dans le champ "Rechercher un champ"
    Then seuls les champs dont le nom correspond au terme saisi sont affichés

  Scenario: Filtrer les champs mappés uniquement
    Given je suis sur l'onglet "Mappings" d'un mapping avec des champs détectés
    And au moins un champ est mappé vers un champ mediaspot
    When j'active le toggle "Mapped fields only"
    Then seuls les champs déjà mappés sont affichés
    And les champs "→ unused" sont masqués

  Scenario: Mapper un champ source vers un champ mediaspot
    Given je suis sur l'onglet "Mappings" d'un mapping avec des champs détectés
    And un champ affiche "→ unused"
    When je clique sur l'icône crayon à droite du champ
    Then je peux sélectionner le champ mediaspot de destination
    And le champ passe de "→ unused" à "→ [champ mediaspot sélectionné]"
    And le compteur du badge est mis à jour (ex: "1/3 fields mapped")
    # action est-elle dans US 3.5 (Éditeur visuel de mappings)

  Scenario: Modifier la configuration d'un mapping existant
    Given je suis sur la configuration d'un mapping déjà configuré (ex: Iron)
    When je modifie la "Default URL" ou l'"API Key"
    And je clique sur "Save"
    Then la nouvelle configuration est sauvegardée
    And le badge reste à "X/Y fields mapped"

  # --- NOUVEAU (Event Storming - Input Validation BC) : Validation des formats de fichiers ---

  Scenario: Validation d'un fichier JSON valide
    Given le mapping est configuré pour des fichiers JSON
    When j'importe un fichier JSON bien formé
    Then le fichier est validé avec succès
    And la data est extraite
    And le fichier temporaire est supprimé après extraction
    And les données sont disponibles pour le mapping

  Scenario: Validation d'un fichier CSV avec headers
    Given le mapping est configuré pour des fichiers CSV
    When j'importe un fichier CSV
    Then le système détecte automatiquement le séparateur (virgule, point-virgule, tab)
    And les headers sont extraits comme noms de champs
    And les types sont inférés depuis les premières lignes de données

  Scenario: Validation d'un fichier XML avec structure
    Given le mapping est configuré pour des fichiers XML
    When j'importe un fichier XML bien formé
    Then le système parse la structure hiérarchique
    And les éléments/attributs sont présentés comme champs mappables

  # ── Cas alternatifs ────────────────────────────────────────────────

  Scenario: Accéder à un mapping déjà configuré
    Given des mappings existants sont listés dans la sidebar (Iron, Unity, IMDb, VDM Connect)
    When je clique sur "Iron" dans la sidebar
    Then je vois sa page de configuration avec le badge "X/Y fields mapped"
    And l'onglet "Mappings" affiche les champs déjà mappés

  Scenario: Toggle "Mapped fields only" avec aucun champ mappé
    Given je suis sur l'onglet "Mappings" d'un mapping dont tous les champs sont "→ unused"
    When j'active le toggle "Mapped fields only"
    Then un message indique qu'aucun champ n'est encore mappé
    # ⏳ À clarifier (PO) : Generic empty state

  Scenario: Fermer la modale de création avec la croix
    Given la modale "Create a new mapping" est ouverte
    When je clique sur l'icône "×"
    Then la modale se ferme sans créer de mapping

  # --- NOUVEAU (Event Storming) : Gestion du changement de structure API ---

  Scenario: Détection de changement de structure API
    Given un mapping API existe avec des champs détectés
    When je déclenche un nouveau "⚡ Trigger" avec un ID
    And la structure de l'API a changé (nouveaux champs, champs supprimés)
    Then le système affiche un avertissement : "La structure de l'API a changé"
    And les nouveaux champs sont affichés avec badge "NEW"
    And les champs disparus sont marqués "⚠️ Missing in API"

  Scenario: Remplacement de la structure API (écrasement)
    Given la structure de l'API a changé
    When je clique sur "Update structure"
    Then la nouvelle structure remplace l'ancienne
    And les champs non mappés disparaissent de la liste
    And les mappings existants sont préservés si le champ existe toujours
    And un log enregistre "Structure updated - X fields added, Y fields removed"

  # ── Cas d'erreur ───────────────────────────────────────────────────

  Scenario: Créer un mapping sans System name
    Given la modale "Create a new mapping" est ouverte
    When je laisse le champ "System name" vide
    And je clique sur "Next →"
    Then le bouton "Next →" est désactivé + blocage à la soumission

  Scenario: Créer un mapping avec un System name déjà existant
    Given la modale "Create a new mapping" est ouverte
    When je saisis un nom identique à un mapping existant (ex: "Iron")
    And je clique sur "Next →"
    Then un message d'erreur s'affiche indiquant que ce nom est déjà utilisé
    # ⚠️ À clarifier (Dev) : détection en temps réel ou à la soumission ?
    # > Les deux

  Scenario: Sauvegarder un mapping API avec une URL invalide
    Given je suis sur la configuration d'un mapping API
    When je saisis une URL au format incorrect dans "Default URL"
    And je clique sur "Save"
    Then un message d'erreur s'affiche indiquant que l'URL est invalide
    # ⚠️ À clarifier (Dev) : validation du format d'URL (présence de {id} obligatoire ?)

  Scenario: Appel API échoue lors de la détection des champs
    Given je suis sur l'onglet "Mappings" d'un mapping API configuré
    When je saisis un ID et je clique sur "⚡ Trigger"
    And l'API externe est inaccessible ou retourne une erreur
    Then un message d'erreur s'affiche dans l'onglet Mappings
    And aucun champ n'est détecté
    # Toast d'erreur, bouton disponible

  Scenario: Fichier invalide lors de la détection des champs (mapping fichier)
    Given je suis sur l'onglet "Mappings" d'un mapping fichier
    When j'uploade un fichier malformé ou au format non supporté
    Then un message d'erreur s'affiche
    And aucun champ n'est détecté

  Scenario: Rejet d'un fichier JSON invalide
    Given le mapping est configuré pour des fichiers JSON
    When j'importe un fichier avec une syntaxe JSON invalide
    Then un message d'erreur s'affiche : "Invalid JSON format: [détail de l'erreur]"
    And la ligne/position de l'erreur est indiquée si possible
    And le fichier est rejeté
    And aucune donnée n'est importée

  Scenario: Rejet d'un fichier au mauvais format
    Given le mapping est configuré pour des fichiers CSV
    When j'importe un fichier XML
    Then un message d'erreur s'affiche : "Format mismatch: expected CSV, got XML"
    And le fichier est rejeté

  Scenario: Accès refusé (rôle non habilité)
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    When j'accède à "External sources > Mappings"
    Then l'accès m'est refusé (cf. matrice ACL FR46/FR47) : Section masquée + 403 si accès via l'URL

  # ── Cas limites ────────────────────────────────────────────────────

  Scenario: System name très long
    Given la modale "Create a new mapping" est ouverte
    When je saisis un nom dépassant la limite de caractères dans "System name"
    Then la saisie est bloquée ou un message indique la limite
    And le nom affiché dans la sidebar est tronqué si nécessaire
    # Limite à 20 caractères

  Scenario: Très grand nombre de champs détectés
    Given l'API externe retourne une réponse avec plus de 100 champs
    When les champs s'affichent dans l'onglet "Mappings"
    Then tous les champs sont accessibles via un scroll
    And la recherche permet de retrouver un champ rapidement
    # ⚠️ À clarifier (Dev) : pagination ou scroll infini ?

  Scenario: Rechargement de page avec configuration non sauvegardée
    Given j'ai saisi une "Default URL" mais je n'ai pas encore cliqué sur "Save"
    When je recharge la page ou navigue ailleurs
    Then les données saisies sont perdues
    # ⚠️ À clarifier (Dev) : confirmation de sortie prévue ("Vous avez des modifications non sauvegardées") ?
    # > Overkill à mon avis
```

**FRs couverts :** FR35, FR71

**Event Storming Reference:** Input Mapping BC - Commandes "Créer une nouvelle source", "Paramétrer la source", "Importer la structure des champs"

---

#### Story 3.4bis : Configuration de la répétition de synchronisation automatique (DF-11412)

As a **Admin Interne VDM**,
I want **configurer la répétition automatique des synchronisations pour les sources API**,
So that **les données sont mises à jour régulièrement sans intervention manuelle**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration de la répétition de synchronisation automatique

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM
    And j'accède à la configuration d'une source de type "API"

  # --- Activation de la synchro auto ---

  Scenario: Activer la synchronisation automatique
    Given je suis sur l'onglet "Configuration" d'une source API
    Then je vois une section "Automatic synchronization" avec :
      | Élément | Description |
      | Toggle | "Enable auto-sync" (ON/OFF) |
      | Section config | Masquée si toggle OFF |

  Scenario: Configuration de la périodicité
    Given le toggle "Enable auto-sync" est activé
    Then je vois les champs de configuration :
      | Champ | Type | Options/Format |
      | Every | Number input + Dropdown | 1, 2, 3... + hour/day/week/month |
      | On | Dropdown (conditionnel) | Jours de semaine (si week) ou jour du mois (si month) |
      | At | Time picker | Format HH:MM:SS |

  Scenario: Configuration d'une synchro quotidienne
    Given je configure la répétition
    When je sélectionne "Every 1 day"
    And je définis l'heure à "02:00:00"
    And je clique sur "Save"
    Then la synchro automatique est programmée tous les jours à 02h00
    And le badge affiche "Auto-sync: Daily at 02:00"

  Scenario: Configuration d'une synchro hebdomadaire
    Given je configure la répétition
    When je sélectionne "Every 1 week"
    Then le champ "On" apparaît avec les jours de la semaine
    When je sélectionne "Monday"
    And je définis l'heure à "03:00:00"
    And je clique sur "Save"
    Then la synchro est programmée tous les lundis à 03h00
    And le badge affiche "Auto-sync: Weekly on Monday at 03:00"

  Scenario: Configuration d'une synchro mensuelle
    Given je configure la répétition
    When je sélectionne "Every 1 month"
    Then le champ "On" apparaît avec les jours du mois (1-31)
    When je sélectionne "15"
    And je définis l'heure à "04:00:00"
    And je clique sur "Save"
    Then la synchro est programmée le 15 de chaque mois à 04h00
    And le badge affiche "Auto-sync: Monthly on day 15 at 04:00"

  # --- Restrictions et validation ---

  Scenario: Répétition disponible uniquement pour les sources API
    Given je suis sur la configuration d'une source "File-based"
    Then la section "Automatic synchronization" n'est PAS affichée
    And un message explique : "Auto-sync is only available for API sources"

  Scenario: Validation des inputs de répétition
    Given je configure la répétition
    When je saisis une valeur invalide (ex: 0 ou négatif)
    Then un message d'erreur s'affiche
    And le bouton "Save" reste désactivé

  # --- Affichage dans le dashboard ---

  Scenario: Indicateur de synchro planifiée dans les cartes sources
    Given une source a une synchro automatique configurée
    When je consulte le dashboard "API syncs"
    Then la carte de la source affiche :
      | Élément | Format |
      | Badge | "Auto" avec icône ⏰ |
      | Next sync | "Next: Tomorrow at 02:00" |
```

**FRs couverts :** FR32 (enrichi), FR42 (enrichi)

**Event Storming Reference:** Input Mapping BC - Commande "Paramétrer la répétition de la synchronisation"

---

#### Story 3.5 : Éditeur visuel de mappings - Correspondances de champs

As a **Admin Interne VDM**,
I want **configurer visuellement les correspondances entre les champs d'une source externe et les champs mediaspot, incluant les transformations et correspondances d'enums**,
So that **je n'ai pas besoin de modifier du code pour corriger un mapping ou ajouter des transformations**.

**UI Reference:** [3.4, 3.5 - Éditeur visuel de mappings/](docs/features/bmme/ui/3.4%2C%203.5%20-%20%C3%89diteur%20visuel%20de%20mappings%2C%20Configuration%20des%20Formatting%20et%20Mapping%20options/)

**Acceptance Criteria:**

```gherkin
Feature: Éditeur visuel de mappings - Correspondances de champs

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM
    And j'accède à un mapping existant (ex: "External sources > Mappings > Unity")

  # ── Cas nominaux ───────────────────────────────────────────────────

  # --- Vue des mappings ---

  Scenario: Affichage de la vue hiérarchique des mappings
    When je clique sur "Unity" dans la section Mappings
    Then je vois la page "Unity" avec :
      | Élément | Description |
      | Header | "🌐 Unity" avec compteur "X/Y fields mapped" |
      | Onglets | "Configuration" et "Mappings" |
      | Boutons | "Test API" et "Save" |
    And l'onglet "Mappings" affiche les champs en structure arborescente

  Scenario: Liste des champs avec filtres
    Given je suis sur l'onglet "Mappings"
    Then je vois :
      | Élément | Description |
      | Recherche | Champ "Rechercher un champ" |
      | Toggle | "Mapped fields only" pour filtrer |
    And les champs sont affichés en structure arborescente (JSON-like)

  Scenario: Structure des champs simples à mapper
    Given je suis sur la page "Unity mappings"
    Then je vois les champs simples :
      | Niveau | Exemple |
      | Source tagname | artistCode, catalog, originCountry |
      | Source type | string, number |
      | mediaspot tagname | artistCode, catalog, originCountry ou "unused" si non mappé |
      | mediaspot type | string, number |
      | indication de localisation si le champ est un champ localisable | localized |

  Scenario: Structure des champs complexes à mapper
    Given je suis sur la page "Unity mappings"
    Then je vois les champs complexes organisés hiérarchiquement :
      | Niveau | Exemple |
      | Collapse / Expand | accordion afin d'ouvrir la hiérarchie de l'objet |
      | Source tagname | artistCode, catalog, originCountry |
      | Source type | object |
    And je vois les enfants de cet objet sous la forme de champs simples

  Scenario: Désactiver un mapping existant via le toggle
    Given le champ "productionYear" est mappé vers "productionYear"
    When j'ouvre la modale "Field mapping settings" pour "productionYear"
    And je désactive le toggle
    Then le champ "productionYear" affiche "unused" comme cible dans la vue principale
    # la désactivation conserve le formatting et les value mappings configurés en attente de réactivation

  Scenario: Supprimer une ligne de correspondance d'enum
    Given la modale "Field mapping settings" est ouverte
    And la section "Edit value mappings" contient la ligne "Guerre > Guerre"
    When je clique sur l'icône supprimer de la ligne "Guerre > Guerre"
    Then la ligne est retirée de la liste des value mappings

  Scenario: Supprimer l'intégralité des value mappings
    Given la modale "Field mapping settings" est ouverte
    And la section "Edit value mappings" est visible
    When je clique sur "Remove mapping"
    Then toutes les correspondances d'enums sont supprimées
    And le lien "+ add mappings" est à nouveau disponible

  Scenario: Supprimer une formatting option
    Given la modale "Field mapping settings" est ouverte
    And le panneau "Formatting editor" est visible
    When je clique sur "Remove formatting"
    Then le formatting est supprimé
    And le label "formatting enabled" disparaît de la modale
    And le label "formatting enabled" disparaît de la vue principale

  Scenario: Filtrer les champs mappés uniquement
    When j'active le toggle "Mapped fields only"
    Then seuls les champs dont le toggle est actif sont affichés dans la vue hiérarchique

  Scenario: Rechercher un champ par nom
    When je saisis "origin" dans le champ "Rechercher un champ"
    Then seuls les champs dont le nom contient "origin" sont affichés dans la vue hiérarchique

  Scenario: Créer un nouveau mapping pour une source
    When je clique sur "New mapping +" dans le sidebar
    Then un formulaire de création de mapping s'ouvre
    And les champs suivants sont demandés à la création : US 3.4

  # --- Configuration des champs ---

  Scenario: Ouvrir la modale "Field mapping settings"
    When je clique sur un champ (ex: "productionYear")
    Then une modale "Field mapping settings" s'ouvre
    And je vois :
      | Élément | Description |
      | Toggle actif | Switch ON/OFF pour activer le mapping |
      | Nom du champ | "productionYear" avec badge de type (date) |
      | Sélecteur cible | Dropdown pour choisir le champ mediaspot cible |

  Scenario: Configurer le champ cible mediaspot
    Given la modale "Field mapping settings" est ouverte
    When je clique sur le sélecteur de champ cible
    Then je vois une liste filtrable des champs mediaspot :
      | Champ | Type | Badges |
      | titleGenres | Genres | localized |
      | originalTitle | string | - |
      | casts | Casts | localized |
      | productionYear | date | - |
      | titleNationalities | CountryCode | - |
    And je peux filtrer par nom de champ

  # --- Formatting options ---

  Scenario: Ajouter une Formatting option
    Given la modale "Field mapping settings" est ouverte
    When je survole la zone sous le champ
    Then un lien "+ add formatting" apparaît
    When je clique sur "+ add formatting"
    Then je peux configurer une transformation :
      | Transformation | Effet |
      | split | Découpe une chaîne en tableau |
      | trim | Supprime les espaces |
      | join | Fusionne un tableau en chaîne |
      | format | Applique un format (dates, etc.) |

  # --- NOUVEAU (Event Storming) : Scripts Liquid pour formatting ---

  Scenario: Ouvrir l'éditeur de script Liquid
    Given je suis dans la modale "Field mapping settings"
    When je clique sur "+ add formatting"
    And je sélectionne "Custom Liquid"
    Then un éditeur de code s'ouvre avec coloration syntaxique
    And un champ "Preview input" affiche la dernière valeur sauvegardée du champ
    And un champ "Preview output" affiche le résultat en temps réel

  Scenario: Écrire un script Liquid avec prévisualisation temps réel
    Given l'éditeur Liquid est ouvert
    And le champ source a une valeur sauvegardée (ex: "John Doe, Jane Doe")
    When je saisis le script : `{{ value | split: ", " | first }}`
    Then la prévisualisation s'affiche en temps réel :
      | Input | Output |
      | "John Doe, Jane Doe" | "John Doe" |
    And l'output est mis à jour à chaque modification du script

  # --- Value mappings (correspondances d'enums) ---

  Scenario: Ajouter des Value mappings (correspondances d'enums)
    Given la modale "Field mapping settings" est ouverte pour un champ avec enums
    When je clique sur "+ add mappings"
    Then une section "Edit value mappings" apparaît avec :
      | Colonne | Description |
      | input | Valeur source (ex: "Guerre", "Comédie", "Science-Fiction") |
      | → | Flèche de transformation |
      | output | Dropdown avec valeurs mediaspot cibles |
      | 🗑️ | Bouton supprimer |
    And je peux ajouter des lignes avec "Add row +"
    And je peux supprimer le mapping avec "Remove mapping"

  Scenario: Preview par langue des value mappings
    Given je configure des value mappings pour un champ localisé
    Then je vois un sélecteur "Preview in" avec les langues (French, English, etc.)
    When je sélectionne "French"
    Then les valeurs input/output sont affichées en français

  # --- Objets complexes ---

  Scenario: Gérer les objets complexes imbriqués
    Given je clique sur un champ de type "object" (ex: "version")
    Then la modale affiche la structure hiérarchique :
      | Champ | Type | Sous-champs |
      | version | object | title, isanCode, articleLabel, isoCode, country, origin, etc. |
    And chaque sous-champ a son propre toggle actif/inactif
    And les objets imbriqués (ex: country > fr, en) sont également configurables

  # --- NOUVEAU (Event Storming) : Mapping 1 champ → N champs (duplication) ---

  Scenario: Mapper un champ source vers plusieurs champs mediaspot
    Given je suis dans la modale "Field mapping settings" pour le champ "fullName"
    When je clique sur "+ Add another target"
    Then un second sélecteur de champ cible apparaît
    And je peux configurer des transformations différentes pour chaque cible :
      | Cible | Transformation |
      | firstName | `{{ value | split: " " | first }}` |
      | lastName | `{{ value | split: " " | last }}` |

  Scenario: Duplication des options de mapping pour multi-cibles
    Given un champ source est mappé vers 2 champs mediaspot
    Then chaque cible a ses propres :
      | Option | Indépendant par cible |
      | Formatting option | ✅ Oui |
      | Value mapping | ✅ Oui |
    And les modifications d'une cible n'affectent pas l'autre

  Scenario: Supprimer une cible de mapping
    Given un champ source est mappé vers 2 champs mediaspot
    When je clique sur "🗑️ Remove" sur la seconde cible
    Then la seconde cible est supprimée
    And le mapping vers la première cible reste intact

  # --- Indicateurs et sauvegarde ---

  Scenario: Indicateur de formatting/mapping activés
    Given un champ a des transformations configurées
    Then la vue principale affiche :
      | Indicateur | Signification |
      | "formatting enabled" | Une transformation est configurée |
      | "mapping enabled" | Des correspondances d'enums sont configurées |
    And une icône ✏️ permet d'éditer rapidement

  Scenario: Sauvegarder les modifications
    When je clique sur "Save" dans la modale ou la page principale
    Then les modifications sont sauvegardées
    And le système valide le mapping contre un échantillon de données

  # ── Cas alternatifs ────────────────────────────────────────────────

  Scenario: Modifier la cible d'un champ déjà mappé
    Given le champ "productionYear" est mappé vers "productionYear date"
    When j'ouvre la modale "Field mapping settings" pour "productionYear"
    And je sélectionne un nouveau champ cible "originalTitle string"
    And je clique sur "Save"
    Then le champ "productionYear" affiche "originalTitle" comme cible dans la vue principale

  Scenario: Formatting et value mapping combinés sur le même champ
    Given la modale "Field mapping settings" est ouverte pour "productionYear"
    And une formatting option est déjà configurée ("formatting enabled")
    When je clique sur "+ add mappings"
    Then la section "Edit value mappings" s'ouvre sans écraser le formatting
    And les deux indicateurs "formatting enabled" et "mapping enabled" apparaissent dans la modale

  Scenario: Naviguer entre les sources dans le sidebar
    When je clique sur "Iron" dans la section Mappings du sidebar
    Then la vue affiche les mappings de la source "Iron"
    And le compteur "X/Y fields mapped" reflète les mappings Iron

  Scenario: Toggle "Mapped fields only" sans aucun champ mappé
    Given aucun champ n'est activé dans la vue des mappings
    When j'active le toggle "Mapped fields only"
    Then la vue est vide ou affiche un message indiquant qu'aucun champ n'est mappé > US 3.4

  Scenario: Recherche sans résultat
    When je saisis "xyzinconnu" dans le champ "Rechercher un champ"
    Then la vue hiérarchique est vide ou affiche un message "Aucun résultat"

  # ── Cas d'erreur ───────────────────────────────────────────────────

  Scenario: Échec de la sauvegarde du mapping
    Given j'ai modifié le champ cible de "productionYear"
    When je clique sur "Save"
    And le service retourne une erreur
    Then un message d'erreur s'affiche
    And les modifications ne sont pas persistées

  Scenario: Fermeture de la modale sans sauvegarder
    Given j'ai modifié la configuration dans la modale "Field mapping settings"
    When je clique sur "Cancel"
    Then la modale se ferme
    And les modifications effectuées dans la modale sont perdues

  Scenario: Navigation hors de la page avec des modifications non sauvegardées
    Given j'ai modifié des mappings sur la page "Unity mappings" sans avoir cliqué sur "Save"
    When je navigue vers une autre page
    Then un avertissement m'informe que des modifications non sauvegardées seront perdues
    # ⚠️ À clarifier (PO/Dev) : alerte navigateur native ou modale de confirmation custom ?
    # > Si possible at scale, modale de confirmation custom. À discuter avec la tech

  Scenario: Erreur de syntaxe dans le Formatting editor
    Given le panneau "Formatting editor" est ouvert
    When je saisis un template Liquid syntaxiquement invalide
    And je clique sur "Done"
    Then un message d'erreur indique que le template est invalide
    And la sauvegarde est bloquée tant que l'erreur persiste

  Scenario: Validation du script Liquid - erreur de syntaxe
    Given je saisis un script Liquid invalide (erreur de syntaxe)
    Then un message d'erreur s'affiche : "Liquid syntax error: ..."
    And la ligne en erreur est mise en évidence en rouge
    And le bouton "Save" reste désactivé

  Scenario: Validation du type de sortie du script
    Given le champ mediaspot cible est de type "number"
    And mon script Liquid retourne une chaîne "abc"
    Then un avertissement s'affiche : "Output type mismatch: expected number, got string"
    And je dois corriger le script ou forcer la sauvegarde avec warning

  Scenario: Value mapping avec output vide
    Given la section "Edit value mappings" est ouverte
    And j'ai ajouté une ligne avec un input "Guerre" et un output vide
    When je clique sur "Done"
    Then un message d'erreur indique que le champ output est requis
    And le formulaire ne peut pas être soumis
    When je tente de cliquer sur "Save" sans corriger
    Then la sauvegarde globale est également bloquée

  Scenario: Value mapping obligatoire si le champ cible est un enum
    Given je mappe un champ source vers un champ mediaspot de type "enum" (ex: genres)
    And je n'ai pas configuré de value mapping
    When je tente de sauvegarder
    Then un message d'erreur s'affiche : "Value mapping required for enum fields"
    And le bouton "Save" reste désactivé
    And un lien "+ add mappings" est mis en évidence

  Scenario: Formatting option recommandée si les types diffèrent
    Given je mappe un champ source de type "string" vers un champ cible de type "date"
    And je n'ai pas configuré de formatting option
    When je tente de sauvegarder
    Then un avertissement s'affiche : "Type mismatch: consider adding a formatting option"
    And je peux forcer la sauvegarde avec un warning badge sur le champ

  Scenario: Indicateur de compatibilité des types
    Given je suis dans la modale "Field mapping settings"
    Then je vois un indicateur de compatibilité :
      | Source type | Target type | Indicateur |
      | string | string | ✅ Compatible |
      | string | number | ⚠️ Formatting recommended |
      | string | enum | ⚠️ Value mapping required |
      | object | string | ❌ Incompatible - flatten required |

  Scenario: Blocage des mappings incompatibles
    Given je tente de mapper un champ "object" vers un champ "string" sans flatten
    Then un message d'erreur s'affiche : "Cannot map object to string directly"
    And une suggestion propose : "Use a Liquid script to extract specific values"

  Scenario: Accès refusé pour un rôle non habilité
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    When j'accède à "External sources > Mappings"
    Then l'accès m'est refusé : Menu masqué + 403

  # ── Cas limites ────────────────────────────────────────────────────

  Scenario: Configuration d'un objet profondément imbriqué (3+ niveaux)
    Given le champ "version" est de type "object"
    And il contient le sous-objet "used" qui contient lui-même "label"
    When j'ouvre la modale pour "version"
    Then les sous-champs "used > label > fr" et "used > label > en" sont accessibles et configurables individuellement

  Scenario: Même champ mediaspot cible pour plusieurs champs source
    Given le champ mediaspot "originalTitle" est déjà utilisé comme cible pour le champ source "title"
    When je configure le champ source "complementTitle" avec "originalTitle" comme cible
    Then le comportement est défini
    # ⏳ À clarifier (PO/Dev) : conflit bloquant, avertissement, ou correspondance multiple autorisée ?
    # > Comportement à designer, champ non sélectionnable

  Scenario: Mise à jour du compteur "X/Y fields mapped"
    Given le compteur affiche "12/48 fields mapped"
    When j'active le toggle d'un champ non mappé
    Then le compteur se met à jour immédiatement
    # ⚠️ À clarifier (Dev) : mise à jour en temps réel ou seulement après sauvegarde ?

  Scenario: Sauvegarde d'un template Liquid vide
    Given le panneau "Formatting editor" est ouvert
    When je vide intégralement le contenu du template
    And je clique sur "Done" puis sur "Save"
    Then un message d'erreur de validation s'affiche
    And la sauvegarde est bloquée

  Scenario: Value mappings avec un grand nombre de lignes
    Given la section "Edit value mappings" contient plus de 50 lignes
    Then la liste est scrollable et toutes les lignes sont accessibles
    And les boutons "Add row +", "Remove mapping" et "Done" restent visibles
```

**FRs couverts :** FR36, FR72, FR73, FR74

**Event Storming Reference:** Input Mapping BC - Commandes "Définir le champ comme actif", "Associer un champ de mediaspot", "Ajouter une Formatting option", "Ajouter un Value mapping", "Coder le script Liquid", "Sauvegarder le mapping du champ"

---

#### Story 3.6 : Metadata fields - Configuration des sources par champ

As a **Admin Interne VDM**,
I want **configurer la source par défaut et le verrouillage de source pour chaque champ de métadonnée**,
So that **les données proviennent de la bonne source et ne sont pas écrasées accidentellement**.

**UI Reference:** [3.6 - Definition de Default source & Lock source/Frame 2761.png](docs/features/bmme/ui/3.6%20-%20Definition%20de%20Default%20source%20%26%20Lock%20source/Frame%202761.png)

**Note :** La vue détaillée d'un champ avec "All values" (multi-source) et "History" fait partie de l'**Epic 5** (Traçabilité et Historique des Métadonnées), cf. [Locked source.png](docs/features/bmme/ui/3.6%20-%20Definition%20de%20Default%20source%20%26%20Lock%20source/Locked%20source.png).

**Acceptance Criteria:**

```gherkin
Feature: Metadata fields - Configuration des sources par champ

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM
    And j'accède à "Inventory settings"

  # ── Cas nominaux ─────────────────────────────────────────────────────

  Scenario: Navigation vers Inventory settings
    Given je suis dans le menu principal
    Then je vois une section "Inventory settings" avec les sous-menus :
      | Section |
      | Metadata Fields |
      | Title & Content |
      | Asset |
      | Order |
      | Naming rules |
      | Metadata views |
      | Bulk importer |
      | Legacy importer |

  Scenario: Ouverture du panneau de détail d'un champ
    When je clique sur le nom du champ "Original title"
    Then le panneau de détail s'ouvre
    And la section "All values" affiche la liste des sources avec les colonnes Source, Value et Last sync

  Scenario: Affichage des valeurs par source dans le panneau de détail
    When je clique sur le nom du champ "Original title"
    Then chaque source configurée apparaît dans la section "All values"
    And la source définie comme Default source est mise en évidence
    And la source verrouillée affiche l'icône cadenas

  Scenario: Affichage de la section History dans le panneau de détail
    When je clique sur le nom du champ "Original title"
    Then la section "History" affiche le journal des modifications
    And chaque entrée indique l'action effectuée, la source concernée et la date

  Scenario: Affichage d'une source jamais synchronisée dans le panneau de détail
    Given la source "MovieLibrary" n'a jamais été synchronisée pour le champ "Original title"
    When je clique sur le nom du champ "Original title"
    Then la source "MovieLibrary" affiche "Never synced" dans la colonne Last sync

  Scenario: Affichage du tableau "Title fields"
    When je clique sur "Title & Contents"
    Then je vois le tableau "Title fields" avec les colonnes :
      | Colonne | Description |
      | Field | Nom du champ (ISAN-Id, HDR, Catalog Type, Original Title, etc.) + tagname |
      | Type | Badge coloré (number, date, string, CountryCode, LocaleCode, etc.) |
      | Level | "title", "season" ou "episode" |
      | Default source | Dropdown avec la source actuelle (Unity, mediaspot, etc.) |
      | 🔒 | Icône cadenas pour Lock source (actif/inactif) |
    And un bouton "Add" permet d'ajouter un nouveau champ
    And un bouton "Export" permet d'exporter la configuration
    And la pagination affiche "1 - 51 of X" avec sélecteur "20 per page"

  Scenario: Configurer la Default source d'un champ
    Given je suis sur le tableau "Title fields"
    When je clique sur le dropdown "Default source" d'un champ (ex: "Original Title")
    Then je vois les options de sources disponibles :
      | Source |
      | Unity |
      | mediaspot |
      | IMDb |
      | MovieLibrary |
    When je sélectionne "Unity"
    Then la Default source est mise à jour immédiatement
    And les champs qui n'ont pas été modifiés manuellement seront mis à jour avec la valeur Unity à la prochaine synchronisation
    And les champs déjà modifiés manuellement conservent leur valeur actuelle

  Scenario: Activer Lock source sur un champ
    Given je suis sur le tableau "Title fields"
    When je clique sur l'icône cadenas 🔒 d'un champ (ex: "OAR")
    Then le cadenas devient actif (icône remplie/colorée)
    And la source ne pourra plus être changée pour ce champ
    And les gestionnaires de catalogue verront un cadenas sur ce champ dans l'UI de métadonnées

  Scenario: Désactiver Lock source sur un champ
    Given un champ a Lock source activé
    When je clique à nouveau sur l'icône cadenas 🔒
    Then le cadenas devient inactif (icône vide/grisée)
    And la source peut à nouveau être modifiée

  Scenario: Lock source actif — changement de source bloqué
    Given le Lock source est activé sur le champ "Original title"
    Then la source alimentant ce champ ne peut pas être modifiée
    And la configuration de la Default source reste accessible dans les paramètres du champ

  Scenario: Menu contextuel des actions sur un champ
    Given je suis sur le tableau "Title fields"
    When je survole une ligne et clique sur le menu ⋮
    Then un menu contextuel s'affiche avec :
      | Action |
      | ✏️ Edit |
      | 📋 Duplicate |
      | 🗑️ Delete |

  Scenario: Affichage du statut verrouillé dans l'UI de métadonnées (côté Gestionnaire)
    Given le champ "OAR" a Lock source activé
    When un Gestionnaire de catalogue consulte ce champ sur un Title
    Then une icône cadenas 🔒 est affichée à côté du champ
    And le sélecteur de source est désactivé (non modifiable par l'utilisateur)

  Scenario: Changement de Default source sans impact sur les champs modifiés manuellement
    Given le champ "Original title" a été modifié manuellement par un utilisateur
    When je change la Default source vers "IMDb"
    Then la valeur du champ "Original title" reste inchangée
    And la nouvelle Default source s'applique uniquement aux champs qui n'ont pas été modifiés manuellement

  Scenario: Changement de Default source appliqué aux champs non modifiés
    Given le champ "productionYear" n'a jamais été modifié manuellement
    When je change la Default source vers "IMDb"
    And la prochaine synchronisation s'exécute
    Then la valeur de "productionYear" est mise à jour avec celle provenant d'IMDb

  # ── Cas alternatifs ──────────────────────────────────────────────────

  Scenario: Filtrage du tableau par Level
    When je sélectionne "Episode" dans le filtre "Level"
    Then seuls les champs de niveau Episode sont affichés dans le tableau

  Scenario: Filtrage du tableau par Current source
    When je sélectionne "Unity" dans le filtre "Current source"
    Then seuls les champs dont la source actuelle est Unity sont affichés

  Scenario: Combinaison des filtres Level et Current source
    When je sélectionne "Title" dans le filtre "Level"
    And je sélectionne "IMDb" dans le filtre "Current source"
    Then seuls les champs de niveau Title dont la source actuelle est IMDb sont affichés

  Scenario: Suppression d'un filtre actif
    Given j'ai filtré le tableau par Level "Season"
    When je supprime le filtre "Season"
    Then tous les champs sont à nouveau affichés sans restriction

  Scenario: Export de la configuration des champs
    When je clique sur le bouton "Export"
    Then un fichier CSV/Excel est téléchargé contenant la configuration des champs affichés
    # Règle at-scale des tableaux — cf. US 3.1

  Scenario: Duplication d'un champ via le menu contextuel
    When j'ouvre le menu contextuel du champ "Original title"
    And je clique sur "Duplicate"
    Then un nouveau champ est créé avec les mêmes paramètres que "Original title"
    And le nouveau champ est en mode édition pour permettre de le renommer
    And il est réinitialisé à l'état "Unlocked"

  Scenario: Affichage d'un champ en état "not mapped"
    Given le champ "Theatrical release date" n'a aucun mapping configuré
    Then le champ affiche l'état "not mapped" dans le tableau
    And aucune action n'est possible depuis cet indicateur

  Scenario: Édition d'un champ via le menu contextuel
    When j'ouvre le menu contextuel du champ "Original title"
    And je clique sur "Edit"
    Then le formulaire d'édition du champ s'ouvre avec les valeurs actuelles pré-remplies

  # ── Cas d'erreur ─────────────────────────────────────────────────────

  Scenario: Échec de la sauvegarde lors de la modification de Default source
    Given j'ai sélectionné "IMDb" comme Default source du champ "Original title"
    When je confirme la modification
    And le service retourne une erreur
    Then un message d'erreur s'affiche
    And la Default source du champ reste inchangée

  Scenario: Échec du toggle Lock source
    When j'active le Lock source du champ "Original title"
    And le service retourne une erreur
    Then un message d'erreur s'affiche
    And l'état du Lock source reste inchangé

  Scenario: Annulation de la suppression d'un champ
    When j'ouvre le menu contextuel du champ "Original title"
    And je clique sur "Delete"
    Then une boîte de confirmation s'affiche
    When j'annule la suppression
    Then le champ "Original title" est toujours présent dans le tableau

  Scenario: Suppression d'un champ utilisé dans un mapping actif
    Given le champ "Original title" est référencé dans un mapping actif
    When j'ouvre le menu contextuel du champ "Original title"
    And je clique sur "Delete"
    Then un avertissement s'affiche avec confirmation forcée

  Scenario: Échec de l'export
    When je clique sur le bouton "Export"
    And le service d'export retourne une erreur
    Then un message d'erreur s'affiche
    And aucun fichier n'est téléchargé

  Scenario: Accès refusé pour un rôle non habilité
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    When j'accède à "Inventory settings > Metadata fields"
    Then l'accès m'est refusé (cf. matrice ACL FR46/FR47)
    And le menu est masqué + page 403

  Scenario: Aucun résultat avec filtres combinés
    Given aucun champ ne correspond aux filtres Level "Episode" et Current source "Iron"
    Then un message "Aucun résultat" s'affiche dans le tableau

  # ── Cas limites ──────────────────────────────────────────────────────

  Scenario: Changement de Default source sur un champ avec données existantes
    Given le champ "Original title" a une valeur active provenant de "Unity"
    When je change la Default source vers "IMDb"
    And je confirme la modification
    Then le comportement sur la valeur courante est défini
    # ⚠️ À clarifier (PO) : la valeur est-elle remplacée immédiatement par celle d'IMDb, ou seulement à la prochaine synchronisation ?
    # > À mon avis : si la source de la méta a déjà été modifiée, le changement de la Default Source ne l'impacte pas. Sinon, la source change

  Scenario: Activation du Lock source quand la valeur courante vient d'une autre source que la Default source
    Given la Default source du champ "Original title" est "Unity"
    And la valeur actuellement affichée provient de "IMDb"
    When j'active le Lock source
    Then le comportement sur la valeur courante est défini
    # > Le lock source empêche le changement de source, pas la source currently active

  Scenario: Ajout d'un nouveau champ de métadonnées
    When je clique sur le bouton d'ajout d'un nouveau champ
    Then le formulaire de création s'ouvre
    And je peux renseigner le nom, le tagname, le type, le niveau et la Default source
    # ⚠️ À clarifier (PO) : la création d'un champ custom est-elle dans le périmètre de US 3.6 ou d'une autre US ?
    # > Couvert par les fonctionnalités existantes de la plateforme

  Scenario: Tableau avec grand nombre de champs (volumétrie)
    Given le tableau contient un grand nombre de champs de métadonnées
    Then la pagination est disponible
    And les filtres restent fonctionnels
    # ⚠️ À clarifier (Dev) : seuil de passage en mode asynchrone pour l'export sur grand volume ?
```

**FRs couverts :** FR75, FR76, FR77

---

#### Story 3.7 : Resynchronisation manuelle en 1 clic

As a **Admin Interne VDM**,
I want **déclencher une resynchronisation manuelle depuis une synchronisation précédente avec suivi de progression**,
So that **je rattrape les données après avoir corrigé un problème de mapping**.

**UI Reference:** [3.8 - Resynchronisation manuelle en 1 clic/](docs/features/bmme/ui/3.8%20-%20Resynchronisation%20manuelle%20en%201%20clic/)

**Acceptance Criteria:**

```gherkin
Feature: Resynchronisation manuelle en 1 clic

  Background:
    Given je suis connecté en tant qu'Admin Interne VDM
    And j'accède à "External sources > Synchronizations"

  # ── Cas nominaux ─────────────────────────────────────────────────────

  Scenario: Accéder à la resync depuis le tableau des synchronisations
    Given une synchronisation passée a des erreurs
    When je clique sur l'icône 🔄 (refresh) sur la ligne de cette synchronisation
    Then une modale "Refresh synchronization" s'ouvre

  Scenario: Interface de la modale "Refresh synchronization"
    Given la modale "Refresh synchronization" est ouverte
    Then je vois :
      | Élément | Description |
      | Header | "Refresh synchronization" |
      | Info source | "Unity" + date/heure + trigger (⚡ System ou 👤 John Doe) |
      | Résumé | "X titles · Y fields · Z errors" |
      | Liste des titres | Accordéons avec thumbnail, nom, ID externe |
    And chaque titre affiche "X fields · Y errors" ou "X fields · No errors"
    And un bouton "Refresh sync" en bas de la modale

  Scenario: Déclencher la resynchronisation
    Given la modale "Refresh synchronization" est ouverte
    When je clique sur "Refresh sync"
    Then le bouton change en "Sync in progress... 🔄"
    And les titres commencent à se mettre à jour un par un

  Scenario: Suivi de la progression en temps réel
    Given une resync est en cours
    Then chaque titre affiche son statut :
      | Statut | Description |
      | "Syncing..." | Synchronisation en cours (texte grisé) |
      | "Refreshed" (vert) | Synchronisation terminée avec succès |
      | "X errors" (rouge) | Synchronisation terminée avec erreurs |
    And les titres en attente restent avec leur statut initial

  Scenario: Resynchronisation terminée avec succès
    Given tous les titres ont été resynchronisés
    Then le bouton affiche "✓ Refresh complete" (vert)
    And un bouton "Done" apparaît pour fermer la modale
    And le compteur d'erreurs global est mis à jour (ex: "7 errors" → "2 errors")

  Scenario: Mise à jour des compteurs après resync
    Given la resync est terminée
    Then les compteurs par titre sont mis à jour :
      | Avant | Après |
      | "5 fields · 2 errors" | "Refreshed · 5 fields · No errors" |
    And le résumé global reflète le nouveau total d'erreurs

  Scenario: Consulter le détail d'un titre resynchronisé
    Given la resync est terminée
    When je clique sur un titre avec "Refreshed"
    Then l'accordéon se déplie
    And je vois le détail des champs synchronisés (cf. Story 3.2)

  Scenario: Fermer la modale et voir les résultats
    When je clique sur "Done"
    Then la modale se ferme
    And le tableau des synchronisations montre une nouvelle ligne avec la resync
    And le trigger indique "👤 John Doe" (ou l'utilisateur connecté)

  Scenario: Fermer la modale avant le lancement de la resync
    Given la modale "Refresh synchronization" est ouverte
    And la resynchronisation n'a pas encore été déclenchée
    When je clique sur le bouton de fermeture "×"
    Then la modale se ferme sans déclencher de resynchronisation
    And aucune nouvelle ligne n'est ajoutée dans le tableau

  Scenario: Consulter le détail d'un titre avant le lancement de la resync
    Given la modale "Refresh synchronization" est ouverte
    When je clique sur un titre dans la liste
    Then l'accordéon se déplie (seulement une fois la resync effectuée)
    And je vois le détail des champs et erreurs de la synchronisation source

  # ── Event Storming (Synchro BC) : Synchronisation partielle ──────────

  Scenario: Synchronisation partielle - certains champs en erreur
    Given une synchronisation est lancée
    When certains champs sont valides et d'autres en erreur
    Then les champs valides sont mis à jour normalement
    And les champs en erreur ne sont PAS mis à jour
    And les champs en erreur sont marqués avec le type d'erreur
    And la synchronisation est marquée comme "Partial" dans le tableau

  Scenario: Affichage d'une synchronisation partielle dans le tableau
    Given une synchronisation s'est terminée partiellement
    Then la ligne du tableau affiche :
      | Colonne | Valeur |
      | Errors | "X errors" (badge orange/rouge) |
      | Status | Badge "Partial" (jaune) |
    And l'icône 🔄 permet de relancer uniquement les champs en erreur

  Scenario: Relancer une synchronisation partielle
    Given une synchronisation est marquée "Partial"
    When je clique sur 🔄 pour relancer
    Then seuls les champs en erreur sont resynchronisés
    And les champs déjà synchronisés ne sont pas re-traités
    And si tous les champs réussissent, le statut passe à "Complete"

  # ── Cas alternatifs ──────────────────────────────────────────────────

  Scenario: Resynchronisation terminée avec statuts mixtes
    Given la resync est terminée
    And certains titres affichent "Refreshed · No errors"
    And d'autres affichent "Refreshed · X errors"
    Then le bouton affiche "✓ Refresh complete"
    And le résumé global reflète le nouveau total d'erreurs
    And le bouton "Done" est disponible

  Scenario: Fermer la modale pendant la resync en cours
    Given la resync est en cours ("Sync in progress...")
    When je clique sur le bouton de fermeture "×"
    Then le comportement est défini
    # > Fermeture bloquée pendant la resync

  Scenario: Accéder à la resync depuis une synchronisation sans erreur
    Given une synchronisation passée affiche "No errors"
    Then l'icône ↺ (refresh) est visible sur cette ligne
    # > Uniquement les synchros en erreur

  Scenario: Accéder à la resync depuis la page de détail d'une sync
    Given je suis sur la page de détail d'une synchronisation (cf. US 3.2)
    Then l'icône ou le bouton de resync est disponible depuis cette page
    # point d'entrée de la resync limité au tableau de 3.1

  # ── Cas d'erreur ─────────────────────────────────────────────────────

  Scenario: Échec complet de la resync d'un titre (erreur API)
    Given la resync est en cours
    When le service retourne une erreur pour le titre "Stranger Things #123456"
    Then le titre affiche un statut d'échec distinct de "X errors"
    And la resync continue pour les titres suivants
    # pour un échec API complet : Generic error state

  Scenario: Interruption du service pendant la resync
    Given la resync est en cours avec 3 titres déjà "Refreshed"
    When le service devient indisponible
    Then les titres en attente restent dans leur statut initial
    And un message d'erreur indique que la resync a été interrompue
    # reprise seule depuis le début possible

  Scenario: Resync déjà en cours déclenchée depuis une autre session
    Given une resync est en cours sur la même synchronisation depuis une autre session
    When j'accède à la modale "Refresh synchronization"
    Then le comportement est défini
    # Deuxième resync parallèle pour éviter l'overkill (websockets etc.)

  Scenario: Accès refusé à la resync pour un rôle non habilité
    Given je suis connecté avec le rôle "Gestionnaire Catalogue"
    Then l'icône ↺ (refresh) n'est pas visible dans le tableau des synchronisations
    # Bouton masqué + 403

  # ── Cas limites ──────────────────────────────────────────────────────

  Scenario: Resync avec un grand nombre de titres
    Given la synchronisation source contient plus de 100 titres
    When je clique sur "Refresh sync"
    Then la liste des titres est scrollable pendant la progression
    And le statut de chaque titre est visible au fur et à mesure
    # ⚠️ À clarifier (Dev/PO) : y a-t-il un délai d'expiration pour une resync volumétrique ?

  Scenario: Resync terminée avec régression du nombre d'erreurs
    Given la synchronisation source affichait "7 errors"
    When la resync est terminée
    And le nouveau total d'erreurs est supérieur à 7
    Then le résumé global affiche le nouveau compteur d'erreurs
    And le bouton affiche "✓ Refresh complete"
    # une régression est traitée comme une fin de resync standard

  Scenario: Resync terminée avec toutes les erreurs persistantes
    Given la resync est terminée
    And tous les titres affichent encore des erreurs
    Then le bouton affiche "✓ Refresh complete"
    And le résumé global reflète le total d'erreurs persistantes
    And le bouton "Done" est disponible
    # si aucune erreur n'a été résolue par la resync : pas de message spécifique
```

**FRs couverts :** FR38, FR39, FR79, FR80

**Event Storming Reference:** Synchro BC - Commande "Relancer une synchronisation", événement "La synchronisation a été marquée comme partielle"

---

#### Story 3.8 : Synchronisation automatique des systèmes externes (Backend)

As a **Système**,
I want **synchroniser les métadonnées Title depuis VDM Connect, Unity, Iron et MovieLibrary**,
So that **les données sont centralisées dans mediaspot comme source de vérité**.

**Note :** Cette story est purement backend/système et n'a pas de maquette UI associée.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation automatique des systèmes externes

  # ── Cas nominaux ─────────────────────────────────────────────────────

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

  Scenario: Import depuis Iron
    Given Iron contient des métadonnées Title
    When la synchronisation Iron s'exécute selon le planning
    Then les nouvelles données sont importées dans mediaspot
    And les données existantes sont mises à jour si modifiées
    And le mapping Iron → mediaspot est appliqué
    And l'historique enregistre "Source: Iron"

  Scenario: Import depuis MovieLibrary
    Given MovieLibrary contient des métadonnées Title
    When la synchronisation MovieLibrary s'exécute selon le planning
    Then les nouvelles données sont importées dans mediaspot
    And les données existantes sont mises à jour si modifiées
    And le mapping MovieLibrary → mediaspot est appliqué
    And l'historique enregistre "Source: MovieLibrary"

  Scenario: Enregistrement de la sync dans le dashboard de monitoring
    When une synchronisation automatique s'exécute pour n'importe quelle source
    Then une nouvelle entrée est créée dans le tableau de 3.1
    And le trigger affiché est "⚡ System"
    And les compteurs "fields" et "errors" reflètent les résultats (cf. US 3.1)

  Scenario: Import d'un titre nouveau absent de mediaspot
    Given la source contient un titre qui n'existe pas encore dans mediaspot
    When la synchronisation s'exécute
    Then le titre est créé dans mediaspot
    And les champs mappés sont renseignés avec les valeurs source
    # ⚠️ À clarifier (PO/Dev) : tous les types de contenu sont-ils créés automatiquement (titre, saison, épisode), ou uniquement les titres correspondant à des entrées déjà existantes dans mediaspot ?

  # ── Event Storming (Synchro BC) : Gestion de la synchronisation partielle ──

  Scenario: Synchronisation partielle - traitement champ par champ
    Given une synchronisation est en cours
    When un champ est valide
    Then le champ est mis à jour dans mediaspot
    And l'historique enregistre la modification
    When un champ est en erreur (format, mapping, etc.)
    Then le champ n'est PAS mis à jour
    And l'erreur est enregistrée avec le type et le message
    And le traitement continue sur les autres champs

  Scenario: Marquage d'une synchronisation comme partielle
    Given une synchronisation s'est terminée
    When au moins un champ est en erreur
    Then la synchronisation est marquée avec le statut "Partial"
    And le compteur d'erreurs est mis à jour
    And les champs en erreur sont identifiables pour resync future

  Scenario: Synchronisation de fichier - validation ligne par ligne
    Given un fichier avec plusieurs entrées est importé
    When une ligne est valide
    Then les données de cette ligne sont mises à jour
    When une ligne est invalide
    Then la ligne est ignorée et loggée en erreur
    And le traitement continue sur les lignes suivantes
    And le résultat final indique "X/Y entries processed"

  # ── Cas alternatifs ──────────────────────────────────────────────────

  Scenario: Aucune modification détectée lors de la sync
    Given une source est synchronisée
    And aucune donnée n'a changé depuis la dernière sync
    When la synchronisation s'exécute
    Then aucun champ n'est mis à jour dans mediaspot
    And la sync est enregistrée dans le dashboard avec "0 updates"
    # une sync sans modification génère quand même une entrée dans le dashboard

  Scenario: Champ avec Lock source — valeur non écrasée
    Given le champ "Original title" a le Lock source activé sur la source "Unity" (cf. US 3.6)
    When la synchronisation Iron s'exécute
    And Iron fournit une valeur différente pour "Original title"
    Then la valeur de "Original title" dans mediaspot reste inchangée
    And la sync enregistre que le champ a été ignoré (Lock source actif)

  Scenario: Conflit entre deux sources sur le même champ
    Given le champ "productionYear" a "Unity" comme Default source
    And Unity fournit "2021" pour ce champ
    And Iron fournit "2019" pour ce même champ
    When les deux synchronisations s'exécutent
    Then la valeur "2021" (Unity) est retenue dans mediaspot
    And l'historique enregistre les deux valeurs reçues

  Scenario: Resync manuelle en cours au moment du déclenchement automatique
    Given une resync manuelle (cf. US 3.7) est en cours pour Unity
    When la synchronisation automatique Unity se déclenche selon le planning
    Then le comportement est défini
    # ⚠️ À clarifier (Dev/PO) : la sync automatique est-elle mise en file d'attente, ignorée, ou exécutée en parallèle ?
    # À clarifier côté technique sur la faisabilité. Si 2 synchros du même système sont en cours, la valeur finale sera de toute façon identiques -- pas d'impact

  # ── Cas d'erreur ─────────────────────────────────────────────────────

  Scenario: Source externe indisponible lors du déclenchement planifié
    Given la synchronisation Unity est planifiée
    When la source Unity est indisponible (timeout ou erreur 5xx)
    Then la sync est enregistrée en erreur dans le dashboard (cf. US 3.1)
    And une notification est envoyée selon le seuil configuré
    # ⚠️ À clarifier (Dev) : mécanisme de retry automatique ? Nombre de tentatives et délai entre chaque ?

  Scenario: Champ source sans mapping configuré
    Given le champ source "customField" n'a pas de correspondance définie dans l'éditeur de mappings (cf. US 3.5)
    When la synchronisation s'exécute
    Then le champ est ignoré et aucune valeur n'est importée
    And le champ est tracé dans l'historique de la synchronisation avec le statut "disabled" et le message "Unmapped field"

  Scenario: Données malformées reçues de la source
    Given la source retourne une valeur invalide pour un champ (ex: format date incorrect pour "productionYear")
    When la synchronisation s'exécute
    Then le champ concerné est enregistré en erreur
    And les autres champs du titre sont synchronisés normalement
    And l'erreur est visible dans le dashboard (cf. US 3.1 — "X errors")

  Scenario: Chevauchement de déclenchements planifiés
    Given une synchronisation Unity est déjà en cours d'exécution
    When le prochain déclenchement planifié arrive pour Unity
    Then le nouveau déclenchement est mis en file d'attente ou ignoré jusqu'à la fin du cycle en cours
    # ⚠️ À clarifier (Dev) : comportement exact (queue, skip, ou exécution parallèle) ?

  # ── Cas limites ──────────────────────────────────────────────────────

  Scenario: Synchronisation d'un volume important de titres
    Given une source contient plusieurs milliers de titres
    When la synchronisation s'exécute
    Then tous les titres sont traités dans un délai raisonnable
    And le dashboard reflète les résultats complets
    # ⚠️ À clarifier (Dev) : y a-t-il un mécanisme de pagination ou de batch pour les grands volumes ? Un seuil d'alerte est-il prévu si la durée dépasse X ?

  Scenario: Import initial VDM Connect (migration unique)
    Given VDM Connect est la source de migration initiale
    And mediaspot ne contient pas encore de données
    When la migration VDM Connect s'exécute pour la première fois
    Then toutes les métadonnées existantes sont importées en masse
    And le mapping VDM Connect → mediaspot est appliqué
    And l'historique enregistre chaque champ avec "Source: VDM Connect"
    # ⚠️ À clarifier (PO/Dev) : la migration initiale VDM Connect est-elle un processus unique distinct des syncs récurrentes, ou utilise-t-elle le même mécanisme ? Y a-t-il une notion de "sync initiale complète" vs "sync delta" pour les autres sources ?
    # Capacité à estimer côté développement. L'idée est que la RDD de VDMC vienne populate la source "mediaspot"

  Scenario: Synchronisation d'IMDb
    Given IMDb est configuré comme source externe
    Then IMDb ne fait pas partie du cycle de synchronisation automatique
    And la synchronisation IMDb est déclenchée on-demand uniquement
```

**FRs couverts :** FR7, FR8, FR21

**Event Storming Reference:** Synchro BC - Événements "Les champs valides ont été mis à jour", "Les champs en erreur ont été marqués en erreur", "La synchronisation a été marquée comme partielle"

---

#### Story 3.9 : Service de validation des inputs (Backend) (DF-11414)

As a **Système**,
I want **valider les fichiers et réponses API avant traitement**,
So that **les données corrompues ou mal formatées sont rejetées avec des messages d'erreur clairs**.

**Note :** Cette story est purement backend/système et n'a pas de maquette UI associée.

**Acceptance Criteria:**

```gherkin
Feature: Service de validation des inputs

  # --- Validation des fichiers ---

  Scenario: Validation et extraction d'un fichier JSON
    Given un fichier JSON est importé
    When le service de validation reçoit le fichier
    Then il vérifie la syntaxe JSON
    And si valide, il extrait les données
    And il supprime le fichier temporaire après extraction
    And il renvoie les données aux services consommateurs

  Scenario: Validation et extraction d'un fichier CSV
    Given un fichier CSV est importé
    When le service de validation reçoit le fichier
    Then il détecte le séparateur (virgule, point-virgule, tab)
    And il parse les headers et les lignes
    And si valide, il renvoie les données structurées

  Scenario: Validation et extraction d'un fichier XML
    Given un fichier XML est importé
    When le service de validation reçoit le fichier
    Then il vérifie que le XML est bien formé
    And il parse la structure hiérarchique
    And si valide, il renvoie les données structurées

  Scenario: Rejet d'un fichier au format incorrect
    Given un fichier est importé
    When le format ne correspond pas au mapping configuré
    Then le service renvoie une erreur : "Format mismatch"
    And le fichier est supprimé
    And une notification est envoyée aux consommateurs

  # --- Validation des APIs ---

  Scenario: Validation d'une réponse API OK
    Given une API externe est appelée
    When la réponse HTTP est 200 OK
    And le body contient des données valides
    Then les données sont extraites et renvoyées aux services consommateurs

  Scenario: Gestion d'une réponse API en erreur
    Given une API externe est appelée
    When la réponse HTTP est une erreur (4xx, 5xx)
    Then le service capture le code et le message d'erreur
    And il notifie les consommateurs avec le détail de l'erreur
    And l'erreur est loggée pour diagnostic

  Scenario: Gestion d'un timeout API
    Given une API externe est appelée
    When le délai de réponse dépasse le timeout configuré
    Then le service annule la requête
    And il notifie les consommateurs : "API timeout after X seconds"

  # --- Notification aux consommateurs ---

  Scenario: Notification d'erreur aux services consommateurs
    Given une erreur de validation survient
    Then le service publie un événement d'erreur avec :
      | Champ | Valeur |
      | source | Nom de la source (Unity, fichier, etc.) |
      | errorType | Type d'erreur (format, timeout, parsing) |
      | errorMessage | Message détaillé |
      | timestamp | Date/heure de l'erreur |
    And les services consommateurs reçoivent la notification
```

**FRs couverts :** FR73 (enrichi), FR78 (enrichi)

**Event Storming Reference:** Input Validation BC - Flux complet de validation fichier et API

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

**SuperAdmin VDM peut** gérer les permissions ACL, administrer les plateformes clients, gérer le catalogue de métadonnées et monitorer l'activité cross-plateformes.

**FRs couverts :** FR45, FR46, FR47, FR48, FR49, FR50, FR51, FR52

**Valeur livrée :** SuperAdmin configure les ACL par rôle (Gestionnaire Catalogue, Admin Interne, Labo), gère l'isolation des données clients multi-tenancy, administre le catalogue de métadonnées (CRUD champs + valeurs enum), et accède au dashboard cross-plateformes avec audit logs.

**Event Storming Reference:** Metadata Catalog BC

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

#### Story 6.9 : Gestion du catalogue de métadonnées (CRUD)

As a **SuperAdmin VDM**,
I want **créer, modifier et supprimer des définitions de métadonnées dans le catalogue**,
So that **je peux faire évoluer le modèle de données mediaspot sans intervention technique**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion du catalogue de métadonnées (CRUD)

  Background:
    Given je suis connecté en tant que SuperAdmin VDM
    And j'accède à "Inventory settings > Metadata Fields"

  # --- Création d'une métadonnée ---

  Scenario: Créer une nouvelle métadonnée
    When je clique sur "Add" dans le tableau des champs
    Then une modale "Create metadata field" s'ouvre avec :
      | Champ | Type | Obligatoire |
      | Field name | Text input | ✅ |
      | Type | Dropdown (string, number, date, enum, etc.) | ✅ |
      | Level | Dropdown (title, localized) | ✅ |
      | Default source | Dropdown (Unity, mediaspot, etc.) | ❌ |
      | Description | Text area | ❌ |

  Scenario: Validation du nom de métadonnée unique
    Given je crée une nouvelle métadonnée
    When je saisis un nom déjà utilisé
    Then un message d'erreur s'affiche : "Ce nom de champ existe déjà"
    And le bouton "Create" reste désactivé

  # --- Modification d'une métadonnée ---

  Scenario: Modifier le label d'une métadonnée
    Given je clique sur "Edit" pour une métadonnée existante
    When je modifie le label (ex: "Original Title" → "Titre Original")
    And je clique sur "Save"
    Then le label est mis à jour dans tout le système
    And un log audit enregistre la modification

  # --- Suppression d'une métadonnée ---

  Scenario: Vérification des dépendances avant suppression
    Given je clique sur "Delete" pour une métadonnée
    When la métadonnée est utilisée dans des mappings
    Then un message d'avertissement s'affiche :
      | Type | Détail |
      | Input mappings | "Utilisée dans 3 mappings sources (Unity, Iron, IMDb)" |
      | Output mappings | "Utilisée dans 2 mappings providers (iTunes, Amazon)" |
    And le bouton "Delete" est remplacé par "Cannot delete - In use"

  Scenario: Suppression d'une métadonnée inutilisée
    Given la métadonnée n'est utilisée dans aucun mapping
    When je clique sur "Delete"
    Then une confirmation est demandée : "Cette action est irréversible"
    And après confirmation, la métadonnée est supprimée
    And un log audit enregistre la suppression

  # --- Consultation des usages ---

  Scenario: Consulter où une métadonnée est utilisée
    Given je clique sur une métadonnée dans le tableau
    Then un panneau latéral affiche :
      | Section | Contenu |
      | Properties | Type, Level, Default source, Lock source |
      | Used in Input mappings | Liste des sources utilisant ce champ |
      | Used in Output mappings | Liste des providers utilisant ce champ |
    And chaque usage est cliquable pour naviguer vers le mapping concerné
```

**FRs couverts :** FR50, FR51 (enrichis)

**Event Storming Reference:** Metadata Catalog BC - Commandes "Créer une méta", "Modifier la label d'une métadata", "Supprimer une méta", "Consulter les infos d'une méta"

---

#### Story 6.10 : Gestion des valeurs d'énumérations

As a **SuperAdmin VDM**,
I want **gérer les valeurs possibles des métadonnées de type enum (genres, pays, etc.)**,
So that **je peux ajouter, modifier ou supprimer des options sans intervention technique**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion des valeurs d'énumérations

  Background:
    Given je suis connecté en tant que SuperAdmin VDM
    And j'accède à "Inventory settings > Metadata values"

  # --- Liste des enums ---

  Scenario: Consulter la liste des métadonnées enum
    When j'accède à "Metadata values"
    Then je vois la liste des métadonnées de type enum :
      | Champ | Nombre de valeurs |
      | genres | 45 values |
      | countries | 195 values |
      | languages | 50 values |
      | contentRatings | 12 values |

  Scenario: Consulter les valeurs d'un enum
    When je clique sur "genres"
    Then je vois la liste des valeurs :
      | Value | Translations | Used in |
      | Action | FR: Action, DE: Aktion | 234 titles |
      | Comedy | FR: Comédie, DE: Komödie | 456 titles |
      | Drama | FR: Drame, DE: Drama | 789 titles |

  # --- Ajout d'une valeur ---

  Scenario: Ajouter une nouvelle valeur d'enum
    Given je suis sur les valeurs de "genres"
    When je clique sur "Add value"
    And je saisis "Thriller" comme valeur
    And je saisis les traductions (FR: "Thriller", DE: "Thriller")
    And je clique sur "Save"
    Then la valeur est ajoutée à la liste
    And elle est disponible dans les mappings et l'édition de métadonnées

  Scenario: Validation de l'unicité des valeurs
    Given je tente d'ajouter une valeur existante
    Then un message d'erreur s'affiche : "Cette valeur existe déjà"
    And le bouton "Save" reste désactivé

  # --- Modification d'une valeur ---

  Scenario: Modifier une valeur d'enum
    Given je clique sur "Edit" pour une valeur existante
    When je modifie le label ou les traductions
    And je clique sur "Save"
    Then les modifications sont propagées à tous les titres utilisant cette valeur

  # --- Suppression d'une valeur ---

  Scenario: Vérification des dépendances avant suppression (value mappings)
    Given je clique sur "Delete" pour une valeur d'enum
    When cette valeur est utilisée dans des value mappings
    Then un message d'avertissement s'affiche :
      "Cette valeur est utilisée dans 2 value mappings (Unity → genres, Iron → genres)"
    And je dois choisir :
      | Option | Action |
      | "Remove from mappings" | Supprime la valeur et les correspondances de mapping |
      | "Cancel" | Annule la suppression |

  Scenario: Suppression d'une valeur utilisée par des titres
    Given je clique sur "Delete" pour une valeur utilisée par des titres
    Then un message d'avertissement s'affiche :
      "Cette valeur est utilisée par 234 titres"
    And je dois choisir une valeur de remplacement avant de supprimer
    When je sélectionne "Drama" comme remplacement
    And je confirme
    Then tous les titres sont mis à jour avec la nouvelle valeur
    And la valeur originale est supprimée
```

**FRs couverts :** FR50 (enrichi)

**Event Storming Reference:** Metadata Catalog BC - Commande "Modifier les valeurs d'une métadonnée Enum"

**Hotspot résolu:** "Suppression d'une option: suppression des mappings l'utilisant ou blocage ?" → Choix proposé à l'utilisateur

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

---

### Epic 8 : Gestion des Artworks

**Sophie peut** uploader, localiser et associer des artworks aux Titles et Packages avec validation automatique, bulk actions et support des séries TV.

**FRs couverts :** FR95, FR96, FR97, FR98, FR99, FR100, FR101, FR102, FR103, FR104, FR105, FR106, FR107, FR108, FR109, FR110, FR111, FR112, FR113

**Valeur livrée :** Sophie uploade et localise 15 artworks en 35 minutes (vs 3h manuellement), avec validation automatique des dimensions et des specs providers, et import intelligent dans les packages.

#### Story 8.1 : Bulk upload d'artworks avec analyse de filename

As a **Gestionnaire de catalogue**,
I want **uploader plusieurs artworks d'un coup avec analyse automatique des filenames**,
So that **je gagne du temps en évitant de remplir manuellement chaque formulaire**.

**Acceptance Criteria:**

```gherkin
Feature: Bulk upload d'artworks avec analyse de filename

  Scenario: Drag & drop multi-fichiers
    Given je suis sur l'onglet Artworks d'un Title
    When je drag & drop 15 fichiers PNG/JPG
    Then une interface de preview s'affiche avec les 15 fichiers
    And chaque fichier est analysé pour extraction des métadonnées

  Scenario: Analyse de filename pour auto-remplissage
    Given j'uploade un fichier "lederniermero_poster_fr_netflix.png"
    Then le système détecte automatiquement :
      | Champ | Valeur détectée |
      | Type | Portrait (poster) |
      | Langue | FR |
      | Provider | Netflix |
    And je peux corriger manuellement si nécessaire

  Scenario: Preview avant confirmation
    Given les fichiers sont analysés
    Then je vois un tableau récapitulatif :
      | File | Type | Lang | Provider | Dimensions | Status |
      | poster_fr.png | Portrait | FR | All | 2000x3000 | ✅ Valid |
      | landscape_en.png | Landscape | EN | All | 1920x1080 | ✅ Valid |
    And je peux modifier les valeurs avant de confirmer l'upload

  Scenario: Confirmation et upload
    Given je valide le preview
    When je clique sur "Upload all"
    Then tous les artworks sont uploadés
    And ils apparaissent dans la vue liste avec leurs thumbnails
```

**FRs couverts :** FR95, FR96, FR112

---

#### Story 8.2 : Validation automatique des artworks à l'upload

As a **Gestionnaire de catalogue**,
I want **que le système valide automatiquement les dimensions et formats des artworks**,
So that **je détecte les erreurs avant la livraison et non après**.

**Acceptance Criteria:**

```gherkin
Feature: Validation automatique des artworks

  Scenario: Validation des dimensions et ratio
    Given j'uploade un artwork
    Then le système valide :
      | Critère | Validation |
      | Dimensions paires | largeur ET hauteur doivent être paires |
      | Ratio | conforme au type (2/3, 16/9, 1/1, etc.) |
      | Taille minimale | selon les specs provider |

  Scenario: Rejet automatique des dimensions impaires
    Given j'uploade un artwork de 1919x1080 pixels
    Then l'artwork est rejeté avec le message :
      "REJECTED: Dimension impaire détectée (1919). Les dimensions doivent être paires."
    And l'artwork n'est pas uploadé
    And il est marqué en rouge dans le preview

  Scenario: Validation par provider
    Given j'uploade un artwork carré de 1000x1000 pour Netflix
    Then le système valide contre les specs Netflix
    And affiche "✅ Carré 1/1 valid (Netflix spec)"

  Scenario: Rejet d'un ratio incorrect
    Given j'uploade un artwork de 1500x1500 comme "Portrait"
    Then l'artwork est rejeté avec le message :
      "REJECTED: Ratio 1/1 incompatible avec Portrait (attendu: 2/3)"

  Scenario: Validation Google-specific
    Given j'uploade un artwork de 1000x1440 pour Google
    Then le système valide contre les specs Google
    And affiche "✅ Portrait Google 1000x1440 valid"
```

**FRs couverts :** FR97, FR98, FR113

---

#### Story 8.3 : Vue grille des artworks avec navigation hiérarchique

As a **Gestionnaire de catalogue**,
I want **visualiser tous les artworks d'un Title dans une vue grille organisée par type, avec navigation hiérarchique par langue/territoire**,
So that **je vois clairement les artworks et je navigue intuitivement dans la structure de localisation**.

**Acceptance Criteria:**

```gherkin
Feature: Vue grille des artworks avec navigation hiérarchique

  Scenario: Affichage de la vue "All artworks"
    Given je suis sur l'onglet Artworks d'un Title
    Then je vois une sidebar gauche avec la hiérarchie :
      | Niveau | Exemple | Compteur |
      | All artworks | - | 32 |
      | Langue (Original) | English | 32 |
      | Territoire | United Kingdom | 1 |
      | Territoire | United States | 0 |
      | Langue | French | 12 |
      | Langue | Portuguese | 4 |
      | Territoire | Portugal | 1 |
    And la zone principale affiche les artworks en grille de cards
    And chaque card montre : thumbnail, filename, type, source (Worldwide/Langue/Territoire)

  Scenario: Groupement par type (mode par défaut)
    Given je suis sur la vue "All artworks"
    And le groupement est réglé sur "Type"
    Then les artworks sont groupés par type :
      | Section | Exemple |
      | Landscape | 5 artworks |
      | Portraits | 5 artworks |
      | Hero | 2 artworks |
      | Squares | 0 artworks |
    And chaque section a un compteur et une zone "+" pour ajouter

  Scenario: Groupement par langue
    Given je suis sur la vue "All artworks"
    When je change le groupement sur "Langue"
    Then les artworks sont groupés par langue :
      | Section | Exemple |
      | English (Original Language) | 32 artworks |
      | Portuguese | 4 artworks |
      | Portugal | 1 artwork |
    And chaque section affiche les artworks en grille de cards
    And chaque card affiche son type (Landscape, Portrait, Hero)

  Scenario: Switch entre modes de groupement
    Given je suis sur la vue "All artworks" groupée par Type
    When je clique sur le toggle de groupement
    Then la vue passe en groupement par Langue
    And les artworks sont réorganisés sans rechargement de page
    And mon choix de groupement est mémorisé pour la session

  Scenario: Navigation via la sidebar
    Given je clique sur "United Kingdom" dans la sidebar
    Then le breadcrumb affiche "Global > English > United Kingdom"
    And seuls les artworks spécifiques à UK sont affichés
    And les sections par type montrent les compteurs mis à jour

  Scenario: Vue langue avec artworks hérités visibles
    Given je clique sur "English" dans la sidebar
    Then je vois les artworks de niveau English
    And les artworks Worldwide sont affichés avec le label "Worldwide"
    And les artworks English sont affichés avec le label "English"

  Scenario: Indicateur de source sur chaque artwork
    Given je consulte la vue grille
    Then chaque card affiche sa source :
      | Artwork | Source affichée |
      | landscape_1_eng | Worldwide |
      | portrait_2_eng | Portuguese |
      | hero_uk | Portugal |

  Scenario: Support de plusieurs artworks du même type
    Given j'ai uploadé 3 landscapes pour English
    Then les 3 landscapes sont visibles dans la section "Landscape"
    And je peux les distinguer par filename et thumbnail
```

**FRs couverts :** FR99, FR100, FR108, FR112

---

#### Story 8.4 : Bulk actions sur les artworks

As a **Gestionnaire de catalogue**,
I want **effectuer des actions sur plusieurs artworks à la fois (delete, copy to, move to)**,
So that **je gagne du temps sur les opérations répétitives**.

**Acceptance Criteria:**

```gherkin
Feature: Bulk actions sur les artworks

  Scenario: Sélection multiple
    Given je suis sur la liste des artworks
    When je coche plusieurs artworks
    Then un menu d'actions apparaît avec : Delete, Copy to, Move to

  Scenario: Bulk delete
    Given j'ai sélectionné 5 artworks
    When je clique sur "Delete"
    Then une confirmation demande "Supprimer 5 artworks ?"
    And après confirmation, les 5 artworks sont supprimés

  Scenario: Bulk copy to
    Given j'ai sélectionné 3 artworks en langue EN
    When je clique sur "Copy to..."
    And je sélectionne les langues DE, IT
    Then les 3 artworks sont copiés vers DE et IT
    And les copies apparaissent dans la liste avec Lang = DE et IT

  Scenario: Bulk move to
    Given j'ai sélectionné 2 artworks en langue FR
    When je clique sur "Move to..."
    And je sélectionne fr-CA (Canada)
    Then les 2 artworks sont déplacés de FR vers fr-CA
    And ils n'apparaissent plus en FR

  Scenario: Bulk change provider
    Given j'ai sélectionné 4 artworks "All platforms"
    When je clique sur "Change provider..."
    And je sélectionne "Netflix only"
    Then les 4 artworks passent de "All" à "Netflix"
```

**FRs couverts :** FR101, FR102, FR103

---

#### Story 8.5 : Configuration provider des artworks

As a **Gestionnaire de catalogue**,
I want **définir pour quels providers un artwork est destiné**,
So that **je peux avoir des artworks différents selon les plateformes**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration provider des artworks

  Scenario: All platforms (défaut)
    Given j'uploade un artwork sans spécifier de provider
    Then il est marqué "All platforms" par défaut
    And il sera utilisable pour tous les providers (iTunes, Amazon, Google, Netflix)

  Scenario: Provider unique
    Given j'uploade un artwork carré pour Netflix
    When je sélectionne "Netflix only"
    Then l'artwork est réservé à Netflix
    And il n'apparaît pas dans les options des autres providers

  Scenario: Multi platforms
    Given j'uploade un artwork
    When je sélectionne "Multi platforms" avec iTunes et Amazon
    Then l'artwork est utilisable pour iTunes et Amazon
    And il n'apparaît pas dans les options de Google et Netflix

  Scenario: Modification du provider
    Given un artwork est configuré "All platforms"
    When je modifie pour "iTunes only"
    Then le provider est mis à jour
    And l'artwork n'est plus visible pour les autres providers
```

**FRs couverts :** FR104

---

#### Story 8.6 : Stockage hiérarchique des artworks

As a **Gestionnaire de catalogue**,
I want **que les artworks soient stockés au niveau exact où je les uploade (Worldwide, Langue, Territoire)**,
So that **je maîtrise précisément quels artworks sont utilisés où**.

**Acceptance Criteria:**

```gherkin
Feature: Stockage hiérarchique des artworks

  Scenario: Upload au niveau Worldwide
    Given j'uploade un artwork avec Lang = "WW" (Worldwide)
    Then l'artwork est stocké au niveau Worldwide
    And il apparaît avec le label "WW" dans la liste

  Scenario: Upload au niveau Langue
    Given j'uploade un artwork avec Lang = "EN"
    Then l'artwork est stocké au niveau langue EN
    And il n'apparaît PAS automatiquement sur en-UK ou en-US

  Scenario: Upload au niveau Territoire
    Given j'uploade un artwork avec Lang = "en-UK"
    Then l'artwork est stocké au niveau territoire en-UK
    And il est spécifique à ce territoire uniquement

  Scenario: Pas d'héritage automatique dans la vue Artworks
    Given j'ai un artwork EN
    When je consulte la liste des artworks
    Then l'artwork EN n'apparaît PAS dupliqué sur en-UK, en-US, etc.
    And il apparaît uniquement au niveau EN
```

**FRs couverts :** FR105

---

#### Story 8.7 : Héritage des artworks à l'import dans le Package

As a **Gestionnaire de catalogue**,
I want **que le système propose automatiquement les artworks disponibles lors de l'import dans un Package**,
So that **je n'ai pas à rechercher manuellement les artworks pour chaque territoire**.

**Acceptance Criteria:**

```gherkin
Feature: Héritage des artworks à l'import dans le Package

  Scenario: Import avec artwork exact disponible
    Given j'ai un artwork "poster_en-UK.png" pour en-UK
    When je crée un package iTunes pour le territoire UK
    Then le système propose "poster_en-UK.png" comme artwork Portrait
    And il est pré-sélectionné comme "exact match"

  Scenario: Import avec héritage de la langue
    Given j'ai un artwork "poster_en.png" pour EN
    And je n'ai PAS d'artwork spécifique pour en-UK
    When je crée un package iTunes pour le territoire UK
    Then le système propose "poster_en.png" comme artwork Portrait
    And il est affiché avec "(inherited from EN)"

  Scenario: Choix manuel entre options
    Given j'ai un artwork en-UK ET un artwork EN
    When j'importe les artworks dans le package UK
    Then je vois les deux options :
      | Option | Source | Status |
      | poster_en-UK.png | exact match | ○ |
      | poster_en.png | inherited from EN | ○ |
    And je peux choisir celui à utiliser

  Scenario: Aucun artwork disponible
    Given je n'ai aucun artwork pour en-UK ni pour EN
    When je crée un package iTunes pour UK
    Then le système affiche "No artwork available"
    And je peux uploader un artwork directement
```

**FRs couverts :** FR106, FR107

---

#### Story 8.8 : Gestion des artworks pour les séries TV

As a **Gestionnaire de catalogue**,
I want **uploader des artworks aux niveaux Série, Saison et Épisode**,
So that **je peux gérer les artworks spécifiques à chaque niveau d'une série**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion des artworks pour les séries TV

  Scenario: Artworks au niveau Série
    Given je suis sur une fiche Série
    When j'accède à l'onglet Artworks
    Then je peux uploader des artworks pour la série globale
    And ils sont marqués comme "Série"

  Scenario: Artworks au niveau Saison
    Given je suis sur une fiche Saison
    When j'accède à l'onglet Artworks
    Then je peux uploader des artworks spécifiques à cette saison
    And ils sont marqués comme "Saison X"

  Scenario: Artworks au niveau Épisode
    Given je suis sur une fiche Épisode
    When j'accède à l'onglet Artworks
    Then je peux uploader des artworks spécifiques à cet épisode
    And ils sont marqués comme "S01E03" par exemple

  Scenario: Pas d'héritage entre niveaux
    Given j'ai un artwork au niveau Série
    When je consulte les artworks d'une Saison
    Then l'artwork Série n'apparaît PAS automatiquement
    And je dois uploader des artworks spécifiques si nécessaire

  Scenario: Artworks optionnels pour Saison/Épisode
    Given je suis sur une fiche Saison sans artwork
    Then le système affiche "Artworks optionnels"
    And je peux continuer sans uploader d'artwork
    And le package peut être créé sans artwork Saison
```

**FRs couverts :** FR109, FR110, FR111