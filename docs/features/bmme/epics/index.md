---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - 'docs/features/bmme/prd.md'
  - 'docs/features/bmme/ux-design-specification.md'
---

# BMME v2 - Epic Breakdown

## Overview

Ce document fournit le découpage complet en epics et stories pour BMME v2 (BundleMaker Metadata Editor v2), décomposant les exigences fonctionnelles du PRD en stories implémentables.

## Structure des Epics

Les epics sont organisées par domaine métier pour une meilleure cohérence :

### Catalogue (utilisateur quotidien)

| Epic | Titre | JIRA | Fichier |
|------|-------|------|---------|
| 1 | Gestion des Métadonnées Title | [DF-11130](https://vdmdev.atlassian.net/browse/DF-11130) | [epic-1-metadata-title.md](epic-1-metadata-title.md) |
| 2 | Création et Gestion de Packages | [DF-11132](https://vdmdev.atlassian.net/browse/DF-11132) | [epic-2-packages.md](epic-2-packages.md) |
| 3 | Gestion des Artworks | [DF-11418](https://vdmdev.atlassian.net/browse/DF-11418) | [epic-3-artworks.md](epic-3-artworks.md) |

### Intégration (sync entrante)

| Epic | Titre | JIRA | Fichier |
|------|-------|------|---------|
| 4 | Configuration des Sources Externes | [DF-11128](https://vdmdev.atlassian.net/browse/DF-11128) | [epic-4-sources-config.md](epic-4-sources-config.md) |
| 5 | Monitoring et Synchronisation | [DF-11419](https://vdmdev.atlassian.net/browse/DF-11419) | [epic-5-sync-monitoring.md](epic-5-sync-monitoring.md) |
| 6 | Synchronisation vers le Modèle Legacy | [DF-11139](https://vdmdev.atlassian.net/browse/DF-11139) | [epic-6-sync-legacy.md](epic-6-sync-legacy.md) |

### Export (sync sortante)

| Epic | Titre | JIRA | Fichier |
|------|-------|------|---------|
| 7 | Gestion des Specs Providers | [DF-11135](https://vdmdev.atlassian.net/browse/DF-11135) | [epic-7-specs-providers.md](epic-7-specs-providers.md) |

### Transversal

| Epic | Titre | JIRA | Fichier |
|------|-------|------|---------|
| 8 | Traçabilité et Historique | [DF-11137](https://vdmdev.atlassian.net/browse/DF-11137) | [epic-8-tracabilite.md](epic-8-tracabilite.md) |
| 9 | Administration et Multi-Tenancy | [DF-11138](https://vdmdev.atlassian.net/browse/DF-11138) | [epic-9-admin.md](epic-9-admin.md) |

---

## Requirements Inventory

### Functional Requirements

**1. Metadata Management**

- FR1: Gestionnaires de catalogue peuvent creer des metadonnees Title avec toutes les informations d'oeuvre
- FR2: Gestionnaires de catalogue peuvent creer des metadonnees par langue pour un Title donne
- FR3: Gestionnaires de catalogue peuvent creer des metadonnees par territoire pour une langue donnee
- FR4: Systeme propage automatiquement les metadonnees Title vers les niveaux inferieurs (heritage intelligent)
- FR5: Gestionnaires de catalogue peuvent editer les metadonnees de multiples langues/territoires dans une vue bulk unique
- FR6: Gestionnaires de catalogue peuvent visualiser la hierarchie complete Title -> Langues -> Territoires
- FR7: Systeme synchronise les metadonnees Title depuis VDM Connect (migration)
- FR8: Systeme synchronise les metadonnees Title depuis systemes externes (Unity, Iron, MovieLibrary)

**2. Package Management**

- FR9: Gestionnaires de catalogue peuvent creer des packages pour un provider donne
- FR10: Gestionnaires de catalogue peuvent associer des metadonnees localisees a un package
- FR11: Gestionnaires de catalogue peuvent editer les metadonnees d'un package existant
- FR12: Gestionnaires de catalogue peuvent supprimer un package
- FR13: Gestionnaires de catalogue peuvent visualiser le statut de completion d'un package (compteur "94/120 champs remplis")
- FR14: Gestionnaires de catalogue peuvent identifier les champs manquants requis pour un package donne
- FR15: Gestionnaires de catalogue peuvent definir des metadonnees partagees entre tous les providers pour minimiser la saisie manuelle
- FR16: Systeme applique les metadonnees partagees au provider cible
- FR17: Systeme valide en temps reel les metadonnees d'un package contre les specs du provider cible
- FR18: Systeme marque automatiquement un package comme VALID lorsque tous les champs requis sont remplis pour handoff vers BundleMaker
- FR19: Packages incomplets restent a l'etat "draft" jusqu'a completion
- FR20: Gestionnaires de catalogue peuvent dupliquer un package existant pour creer une variante
- FR21: Systeme migre progressivement les packages depuis VDM Connect vers mediaspot

**3. Provider Specification Management**

- FR22: Labo VDM peut acceder a un editeur centralise des specs providers (iTunes, Amazon, Google, Netflix)
- FR23: Labo VDM peut editer les mappings mediaspot -> provider pour chaque provider
- FR24: Labo VDM peut editer les formats de champs requis par chaque provider
- FR25: Systeme valide en temps reel les mappings contre des echantillons de packages
- FR26: Labo VDM peut previsualiser le XML genere avant livraison client
- FR27: Labo VDM peut deployer les changements de specs instantanement sans modification de code
- FR28: Systeme versionne les specs providers pour permettre le rollback en cas de probleme

**4. External System Integration**

- FR31: Admin Internes VDM peuvent acceder a un dashboard de monitoring des synchronisations entrantes
- FR32: Systeme affiche le statut temps reel de chaque synchronisation externe (Unity, Iron, MovieLibrary, VDM Connect)
- FR33: Systeme affiche des logs detailles et friendly pour chaque synchronisation
- FR34: Admin Internes VDM peuvent tester une API externe en temps reel (mode diagnostic live)
- FR35: Admin Internes VDM peuvent acceder a un editeur de mapping visuel (systeme externe -> mediaspot)
- FR36: Admin Internes VDM peuvent editer les mappings de champs entre systeme externe et mediaspot
- FR38: Admin Internes VDM peuvent declencher une resynchronisation manuelle en 1 clic
- FR39: Systeme affiche la progression de la resynchronisation avec ETA
- FR42: Systeme historise toutes les synchronisations pour detecter les regressions

**5. Validation & Quality Assurance**

- FR43: Systeme genere les XML conformes aux specs provider actuelles

**6. User & Permission Management**

- FR45: SuperAdmin VDM peuvent definir les permissions ACL par action (creation metadonnees, edition packages, gestion mappings)
- FR46: Systeme applique les permissions ACL selon le role de l'utilisateur (Gestionnaire Catalogue, Responsable Livraison, Admin Interne, Labo, SuperAdmin)
- FR47: Systeme empeche les actions non autorisees selon les permissions de l'utilisateur
- FR48: Systeme isole les donnees par plateforme client (multi-tenancy strict)

**7. Administration & Monitoring**

- FR49: SuperAdmin VDM peuvent acceder a un dashboard d'administration cross-plateformes
- FR50: SuperAdmin VDM peuvent gerer centralement les specs providers appliquees a toutes les plateformes
- FR51: SuperAdmin VDM peuvent gerer centralement les specs systemes externes partagees
- FR52: Systeme genere des audit logs pour toutes les actions critiques (creation/edition/suppression)

**8. Language & Territory Activation**

- FR55: Gestionnaires de catalogue peuvent activer une langue pour un Title
- FR56: Langue de l'original title est activee par defaut
- FR57: Systeme affiche uniquement les champs localisables au niveau langue et territoire
- FR58: Metadonnees territoire sont heritees automatiquement de la langue parente ("pulled from Language")

**9. Source Tracking & Historisation**

- FR59: Systeme affiche la source actuelle de chaque metadonnee (Unity, mediaspot, IMDb, etc.)
- FR60: Gestionnaires de catalogue peuvent declencher une synchronisation manuelle depuis une source externe
- FR61: Systeme affiche un preview des changements avant application (Old value vs New value)
- FR62: Gestionnaires de catalogue peuvent voir toutes les valeurs d'une metadonnee par source
- FR63: Systeme historise toutes les modifications de metadonnees (Old value, New value, Date, User, Details)
- FR64: Systeme categorise les types de modification (Source changed, Manual Edit, Periodic sync)
- FR65: Gestionnaires de catalogue peuvent consulter l'historique complet d'une metadonnee

**10. Shared Metadata & Package Creation**

- FR66: Systeme gere des Shared metadata cross-platforms (Vendor ID, Studio, Labo, Copyrights)
- FR67: Shared metadata sont automatiquement propagees a tous les packages d'un Title
- FR68: Gestionnaires de catalogue peuvent creer un package en selectionnant uniquement Platform + Territories
- FR69: Systeme pre-remplit les packages depuis Title metadata + Shared metadata, puis applique le Provider mapping comme transformation de format
- FR70: Structure Package suit la meme hierarchie que Title (Global -> Languages -> Territories)

**11. External System Mapping (Platform-based)**

- FR71: Admin Internes VDM peuvent definir des Formatting options par champ de mapping (split, trim, etc.)
- FR72: Admin Internes VDM peuvent definir des Mapping options pour les correspondances d'enums
- FR73: Systeme applique les Formatting options lors de l'import des donnees externes
- FR74: Systeme applique les Mapping options pour convertir les valeurs d'enums
- FR75: Admin Internes VDM peuvent definir une Default source par champ mediaspot
- FR76: Admin Internes VDM peuvent activer Lock source pour empecher le changement de source sur un champ
- FR77: Systeme empeche le changement de source sur les champs avec Lock source active
- FR78: Systeme affiche des notes d'erreur typees lors des synchronisations (Wrong data format, Formatting failed, Not synced)
- FR79: Admin Internes VDM peuvent declencher un Resync pour reappliquer une synchronisation depuis une source
- FR80: Admin Internes VDM peuvent declencher un Bulk resync sur plusieurs sources simultanement

**12. Provider Mapping (Cross-platform)**

- FR81: Provider mappings sont cross-platform (partages entre toutes les plateformes clientes)
- FR82: Labo VDM peut definir des Formatting options pour l'export (join, format dates, etc.)
- FR83: Labo VDM peut definir des Mapping options pour les correspondances d'enums mediaspot -> provider
- FR84: Labo VDM peut tester les mappings sur des packages reels avant deploiement
- FR85: Systeme affiche les resultats de test avec les valeurs transformees
- FR86: Source of truth table est partagee entre mappings entrants (Journey 2) et sortants (Journey 3)

**13. Legacy Data Model Synchronization (DbMetadataFieldInfo)**

- FR87: Systeme synchronise automatiquement les metadonnees BMME v2 vers le modele legacy DbMetadataFieldInfo
- FR88: Synchronisation BMME v2 -> DbMetadataFieldInfo est transparente pour les modules mediaspot consommateurs
- FR89: Admin Internes VDM peuvent configurer la table de mapping BMME v2 -> DbMetadataFieldInfo
- FR90: Systeme applique le mapping lors de chaque modification de metadonnee dans BMME v2
- FR91: Modules mediaspot existants continuent a lire les metadonnees via DbMetadataFieldInfo sans modification
- FR92: Systeme garantit la coherence entre BMME v2 (source) et DbMetadataFieldInfo (projection)
- FR93: Admin Internes VDM peuvent monitorer le statut de synchronisation BMME v2 -> DbMetadataFieldInfo
- FR94: Systeme alerte en cas d'echec de synchronisation vers le modele legacy

**14. Artwork Management**

- FR95: Gestionnaires de catalogue peuvent uploader des artworks via drag & drop multi-fichiers (bulk upload)
- FR96: Systeme analyse les filenames pour auto-remplir type, langue et provider
- FR97: Systeme valide automatiquement les dimensions et le ratio de chaque artwork a l'upload
- FR98: Systeme rejette automatiquement tout artwork avec une dimension impaire (largeur OU hauteur)
- FR99: Gestionnaires de catalogue peuvent visualiser tous les artworks d'un Title dans une vue liste filtrable
- FR100: Gestionnaires de catalogue peuvent filtrer les artworks par type, langue et provider
- FR101: Gestionnaires de catalogue peuvent selectionner plusieurs artworks pour des bulk actions (delete, copy to, move to)
- FR102: Gestionnaires de catalogue peuvent copier des artworks vers d'autres langues ou territoires (bulk copy to)
- FR103: Gestionnaires de catalogue peuvent deplacer des artworks vers d'autres langues ou territoires (bulk move to)
- FR104: Gestionnaires de catalogue peuvent definir un artwork comme "All platforms", "Multi platforms" ou "Provider unique"
- FR105: Systeme stocke les artworks au niveau exact defini (Worldwide, Langue, ou Territoire) sans heritage automatique
- FR106: Systeme applique l'heritage des artworks uniquement a l'import dans le Package (Territoire <- Langue)
- FR107: Systeme propose automatiquement l'artwork de la langue parente si aucun artwork exact n'existe pour le territoire
- FR108: Gestionnaires de catalogue peuvent uploader plusieurs artworks du meme type pour une meme langue
- FR109: Gestionnaires de catalogue peuvent uploader des artworks aux niveaux Serie, Saison et Episode
- FR110: Systeme ne propage pas automatiquement les artworks entre les niveaux Serie/Saison/Episode
- FR111: Gestionnaires de catalogue peuvent marquer les artworks Saison/Episode comme "optionnels"
- FR112: Systeme affiche un preview thumbnail de chaque artwork dans la vue liste
- FR113: Systeme valide les formats specifiques par provider (ex: carre 1/1 pour Netflix, 1000x1440 pour Google)

### NonFunctional Requirements

**Performance**

- NFR1: Temps de creation d'un package complet < 15 minutes (vs 2-4h actuellement)
- NFR2: Temps de mise a jour d'une spec provider < 1 jour (vs plusieurs semaines actuellement)
- NFR3: Temps d'ajout d'un nouveau provider < 5 jours
- NFR4: Temps d'onboarding d'un nouveau dev sur BMME < 3 jours

**Qualite**

- NFR5: Taux d'erreur a la livraison < 5%
- NFR6: Couverture de tests > 80% sur la logique metier critique
- NFR7: Zero perte de donnees lors de la migration VDM Connect

**Conformite**

- NFR8: Codes territoires ISO 3166-1 alpha-3 (FRA, DEU, USA, etc.)
- NFR9: Modele de donnees "superset" pour compatibilite multi-providers
- NFR10: GDPR compliance (herite de mediaspot)
- NFR11: Zero blacklist provider durant toute la vie de BMME v2

**Architecture**

- NFR12: Multi-tenancy strict avec isolation des donnees par plateforme client
- NFR13: Architecture modulaire permettant l'ajout de nouveaux providers sans refonte
- NFR14: Code lisible, documente, teste (fondation pour BM v2)

### Additional Requirements (from UX Design)

**Composants UI custom a implementer :**

- `<CompletionCounter />` : Afficher "94/120 VALID" avec barre de progression temps reel
- `<LocalizationAccordion />` : Hierarchie Languages -> Territories avec accordeons imbriques
- `<InheritanceLabel />` : Indicateur "Same as Default" / "Overridden"
- `<AssetLocalizationGrid />` : Vue grille pour localisation d'artworks par territoire
- `<SourceBadge />` : Indicateur de source par metadonnee (Unity, mediaspot, IMDb)
- `<MappingTable />` : Configuration mappings source -> destination avec transformations
- `<DiffPreview />` : Vue Old -> New pour preview des changements
- `<ImpactAnalysisPanel />` : Visualisation des titres impactes par changement de spec

**Patterns UX a respecter :**

- Grid view editable (style Airtable/Excel)
- Inline editing sans modale
- Breadcrumb hierarchique persistant
- Validation temps reel champ par champ
- Keyboard navigation (Tab, Enter, Fleches)
- Preview obligatoire avant actions majeures
- Desktop-only (viewport minimum 1280x720)

**Principes UX directeurs :**

1. "Je suis autonome" -- No-code pour les configs
2. "Je sais ou j'en suis" -- Feedback visuel permanent
3. "Je ne ressaisis jamais la meme chose" -- Heritage intelligent
4. "Je vois avant d'agir" -- Preview des changements
5. "Je peux toujours comprendre" -- Source tracking, historique

---

## Epic List

| Epic | Titre | JIRA | Description | FRs |
|------|-------|------|-------------|-----|
| [Epic 1](./epic-1-metadata-title.md) | Metadonnees Title | DF-11130 | Gestion des Metadonnees Title avec Hierarchie et Heritage | FR1-FR6, FR55-FR58 |
| [Epic 2](./epic-2-packages.md) | Packages | DF-11132 | Creation et Gestion de Packages Multi-Territoires | FR9-FR20, FR66-FR70 |
| [Epic 3](./epic-3-artworks.md) | Artworks | DF-11418 | Gestion des Artworks | FR95-FR113 |
| [Epic 4](./epic-4-sources-config.md) | Configuration Sources | DF-11128 | Configuration des Sources Externes | FR35, FR71-FR77 |
| [Epic 5](./epic-5-sync-monitoring.md) | Sync & Monitoring | DF-11419 | Monitoring et Synchronisation | FR7, FR8, FR21, FR31-FR33, FR38, FR39, FR42, FR78-FR80 |
| [Epic 6](./epic-6-sync-legacy.md) | Sync Legacy | DF-11139 | Synchronisation vers le Modele Legacy | FR87-FR94 |
| [Epic 7](./epic-7-specs-providers.md) | Specs Providers | DF-11135 | Gestion des Specs Providers (Labo) | FR22-FR28, FR43, FR81-FR86 |
| [Epic 8](./epic-8-tracabilite.md) | Tracabilite | DF-11137 | Tracabilite et Historique des Metadonnees | FR59-FR65 |
| [Epic 9](./epic-9-admin.md) | Administration | DF-11138 | Administration et Multi-Tenancy | FR45-FR52 |

---

## FR Coverage Map

| FR   | Epic   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| FR1  | Epic 1 | Creation metadonnees Title                             |
| FR2  | Epic 1 | Creation metadonnees par langue                        |
| FR3  | Epic 1 | Creation metadonnees par territoire                    |
| FR4  | Epic 1 | Propagation automatique (heritage)                     |
| FR5  | Epic 1 | Vue bulk edition multi-langues/territoires             |
| FR6  | Epic 1 | Visualisation hierarchie Title -> Langues -> Territoires |
| FR7  | Epic 5 | Synchronisation depuis VDM Connect                     |
| FR8  | Epic 5 | Synchronisation depuis systemes externes               |
| FR9  | Epic 2 | Creation packages par provider                         |
| FR10 | Epic 2 | Association metadonnees localisees a package           |
| FR11 | Epic 2 | Edition metadonnees package                            |
| FR12 | Epic 2 | Suppression package                                    |
| FR13 | Epic 2 | Visualisation statut completion (compteur)             |
| FR14 | Epic 2 | Identification champs manquants                        |
| FR15 | Epic 2 | Definition shared metadata                             |
| FR16 | Epic 2 | Application shared metadata au provider                |
| FR17 | Epic 2 | Validation temps reel contre specs provider            |
| FR18 | Epic 2 | Marquage automatique VALID                             |
| FR19 | Epic 2 | Etat draft pour packages incomplets                    |
| FR20 | Epic 2 | Duplication package                                    |
| FR21 | Epic 5 | Migration packages depuis VDM Connect                  |
| FR22 | Epic 7 | Editeur centralise specs providers                     |
| FR23 | Epic 7 | Edition mappings mediaspot -> provider                 |
| FR24 | Epic 7 | Edition formats champs providers                       |
| FR25 | Epic 7 | Validation temps reel mappings                         |
| FR26 | Epic 7 | Previsualisation XML                                   |
| FR27 | Epic 7 | Deploiement instantane sans code                       |
| FR28 | Epic 7 | Versionning specs avec rollback                        |
| FR31 | Epic 5 | Dashboard monitoring synchronisations                  |
| FR32 | Epic 5 | Statut temps reel synchros                             |
| FR33 | Epic 5 | Logs detailles et friendly                             |
| FR34 | Epic 4 | Mode diagnostic live API                               |
| FR35 | Epic 4 | Editeur mapping visuel                                 |
| FR36 | Epic 4 | Edition mappings externe -> mediaspot                  |
| FR38 | Epic 5 | Resynchronisation manuelle 1 clic                      |
| FR39 | Epic 5 | Progression resync avec ETA                            |
| FR42 | Epic 5 | Historisation synchronisations                         |
| FR43 | Epic 7 | Generation XML conformes                               |
| FR45 | Epic 9 | Definition permissions ACL                             |
| FR46 | Epic 9 | Application permissions par role                       |
| FR47 | Epic 9 | Blocage actions non autorisees                         |
| FR48 | Epic 9 | Isolation donnees multi-tenancy                        |
| FR49 | Epic 9 | Dashboard administration cross-plateformes             |
| FR50 | Epic 9 | Gestion centralisee specs providers                    |
| FR51 | Epic 9 | Gestion centralisee specs externes                     |
| FR52 | Epic 9 | Audit logs actions critiques                           |
| FR55 | Epic 1 | Activation langue pour Title                           |
| FR56 | Epic 1 | Langue original title par defaut                       |
| FR57 | Epic 1 | Affichage champs localisables uniquement               |
| FR58 | Epic 1 | Heritage territoire depuis langue                      |
| FR59 | Epic 8 | Affichage source metadonnee                            |
| FR60 | Epic 8 | Synchronisation manuelle depuis source                 |
| FR61 | Epic 8 | Preview changements avant application                  |
| FR62 | Epic 8 | Vue multi-source par metadonnee                        |
| FR63 | Epic 8 | Historisation modifications                            |
| FR64 | Epic 8 | Categorisation types modification                      |
| FR65 | Epic 8 | Consultation historique complet                        |
| FR66 | Epic 2 | Gestion shared metadata cross-platforms                |
| FR67 | Epic 2 | Propagation shared metadata aux packages               |
| FR68 | Epic 2 | Creation package Platform + Territories                |
| FR69 | Epic 2 | Pre-remplissage packages                               |
| FR70 | Epic 2 | Structure package hierarchique                         |
| FR71 | Epic 4 | Formatting options mapping                             |
| FR72 | Epic 4 | Mapping options enums                                  |
| FR73 | Epic 4 | Application formatting import                          |
| FR74 | Epic 4 | Application mapping enums                              |
| FR75 | Epic 4 | Definition default source                              |
| FR76 | Epic 4 | Activation lock source                                 |
| FR77 | Epic 4 | Blocage changement source                              |
| FR78 | Epic 5 | Notes erreur typees                                    |
| FR79 | Epic 5 | Resync depuis source                                   |
| FR80 | Epic 5 | Bulk resync                                            |
| FR81 | Epic 7 | Provider mappings cross-platform                       |
| FR82 | Epic 7 | Formatting options export                              |
| FR83 | Epic 7 | Mapping options enums export                           |
| FR84 | Epic 7 | Test mappings sur packages reels                       |
| FR85 | Epic 7 | Affichage resultats test transformes                   |
| FR86 | Epic 7 | Source of truth table partagee                         |
| FR87 | Epic 6 | Synchronisation auto vers DbMetadataFieldInfo          |
| FR88 | Epic 6 | Transparence pour modules consommateurs                |
| FR89 | Epic 6 | Configuration mapping legacy                           |
| FR90 | Epic 6 | Application mapping par modification                   |
| FR91 | Epic 6 | Continuite lecture DbMetadataFieldInfo                 |
| FR92 | Epic 6 | Garantie coherence source/projection                   |
| FR93 | Epic 6 | Monitoring sync legacy                                 |
| FR94 | Epic 6 | Alerte echec sync legacy                               |
| FR95 | Epic 3 | Bulk upload artworks                                   |
| FR96 | Epic 3 | Analyse filenames auto-remplissage                     |
| FR97 | Epic 3 | Validation dimensions et ratio                         |
| FR98 | Epic 3 | Rejet dimensions impaires                              |
| FR99 | Epic 3 | Vue liste artworks filtrable                           |
| FR100 | Epic 3 | Filtrage artworks par type/langue/provider            |
| FR101 | Epic 3 | Selection multiple bulk actions                       |
| FR102 | Epic 3 | Bulk copy to                                          |
| FR103 | Epic 3 | Bulk move to                                          |
| FR104 | Epic 3 | Configuration provider artwork                        |
| FR105 | Epic 3 | Stockage hierarchique exact                           |
| FR106 | Epic 3 | Heritage artworks import Package                      |
| FR107 | Epic 3 | Proposition artwork langue parente                    |
| FR108 | Epic 3 | Artworks multiples meme type                          |
| FR109 | Epic 3 | Artworks Serie/Saison/Episode                         |
| FR110 | Epic 3 | Pas propagation entre niveaux                         |
| FR111 | Epic 3 | Artworks optionnels Saison/Episode                    |
| FR112 | Epic 3 | Preview thumbnail                                     |
| FR113 | Epic 3 | Validation formats par provider                       |
