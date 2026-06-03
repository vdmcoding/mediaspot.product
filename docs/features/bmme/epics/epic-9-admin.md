<!-- TRACABILITE: Ancien Epic 6 -->
<!-- JIRA: DF-11138 -->

# Epic 9 : Administration et Multi-Tenancy

**SuperAdmin VDM peut** gérer les permissions ACL, administrer les plateformes clients, gérer le catalogue de métadonnées et monitorer l'activité cross-plateformes.

**FRs couverts :** FR45, FR46, FR47, FR48, FR49, FR50, FR51, FR52

**Valeur livrée :** SuperAdmin configure les ACL par rôle (Gestionnaire Catalogue, Admin Interne, Labo), gère l'isolation des données clients multi-tenancy, administre le catalogue de métadonnées (CRUD champs + valeurs enum), et accède au dashboard cross-plateformes avec audit logs.

**Event Storming Reference:** Metadata Catalog BC

---

## Story 9.1 : Définition des permissions ACL par action

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

## Story 9.2 : Application des permissions par rôle utilisateur

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

## Story 9.3 : Blocage des actions non autorisées

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

## Story 9.4 : Isolation des données par plateforme client (Multi-tenancy)

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

## Story 9.5 : Dashboard administration cross-plateformes

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

## Story 9.6 : Gestion centralisée des specs providers

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

## Story 9.7 : Gestion centralisée des specs systèmes externes

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

## Story 9.8 : Audit logs pour actions critiques

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

## Story 9.9 : Gestion du catalogue de métadonnées (CRUD)

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

## Story 9.10 : Gestion des valeurs d'énumérations

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
