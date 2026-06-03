<!-- JIRA: DF-11422 -->

# Epic 7 : Gestion du Catalogue de Métadonnées

**SuperAdmin VDM peut** créer, modifier et supprimer des définitions de métadonnées, gérer leurs valeurs d'énumérations, configurer les sources par défaut et verrouiller les sources pour empêcher les écrasements automatiques.

**FRs couverts :** FR50, FR51

**Valeur livrée :** SuperAdmin fait évoluer le modèle de données mediaspot (CRUD champs + valeurs enum + gestion sources) sans intervention technique, avec vérification automatique des dépendances dans les BC Input/Output Mappings et propagation contrôlée des changements.

**Event Storming Reference:** Metadata Catalog BC

**Stories :**
- 7.1 : CRUD métadonnées (créer, modifier label, supprimer avec vérification dépendances, consulter usages)
- 7.2 : Gestion valeurs enum (ajouter, modifier, supprimer avec remplacement ou retrait des mappings)
- 7.3 : Changer source par défaut (impact analysis, isolation des Titles existants)
- 7.4 : Verrouiller source (protection contre écrasement par synchros automatiques)

---

## Story 7.1 : Gestion du catalogue de métadonnées (CRUD)

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

## Story 7.2 : Gestion des valeurs d'énumérations

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

## Story 7.3 : Changer la source par défaut d'une métadonnée

As a **SuperAdmin VDM**,
I want **modifier la source par défaut d'une métadonnée**,
So that **je peux définir quelle source (Unity, IMDb, mediaspot, etc.) fait autorité pour chaque champ**.

**Acceptance Criteria:**

```gherkin
Feature: Changer la source par défaut d'une métadonnée

  Background:
    Given je suis connecté en tant que SuperAdmin VDM
    And j'accède à "Inventory settings > Metadata Fields"

  Scenario: Modifier la source par défaut
    Given je sélectionne une métadonnée "director"
    When je clique sur "Edit default source"
    Then une modale s'ouvre avec la liste des sources disponibles :
      | Source | Description |
      | Unity | Système de gestion VDM |
      | IMDb | Base de données films |
      | mediaspot | Saisie manuelle |
      | Iron | Labo externe |
    And la source actuelle est pré-sélectionnée

  Scenario: Appliquer le changement de source par défaut
    Given je modifie la source par défaut de "Unity" à "IMDb"
    When je clique sur "Save"
    Then un message de confirmation s'affiche : "La source par défaut a été mise à jour"
    And les nouveaux Titles créés utiliseront IMDb comme source par défaut
    And les Titles existants conservent leur source actuelle

  Scenario: Impact du changement de source par défaut
    Given je change la source par défaut d'une métadonnée
    Then un panneau "Impact analysis" affiche :
      | Élément | Valeur |
      | Titles existants | Non affectés (conservent leur source actuelle) |
      | Nouveaux Titles | Utiliseront la nouvelle source par défaut |
      | Mappings Input | Inchangés |
      | Mappings Output | Inchangés |
    And un log audit enregistre le changement

  Scenario: Interaction avec le verrouillage de source
    Given une métadonnée a sa source verrouillée (Lock source = true)
    Then le changement de source par défaut n'affecte PAS les Titles avec source verrouillée
    And seuls les Titles avec source non verrouillée peuvent utiliser la nouvelle source
```

**FRs couverts :** FR50 (enrichi)

**Event Storming Reference:** Metadata Catalog BC - Commande "Changer la source par défaut d'une métadonnée"

**Hotspot résolu:** "Que fait le changement de source par défaut ?" → Le changement n'affecte que les nouveaux Titles, les existants conservent leur source actuelle

---

## Story 7.4 : Verrouiller la source d'une métadonnée

As a **SuperAdmin VDM**,
I want **verrouiller la source d'une métadonnée pour empêcher les modifications automatiques**,
So that **je garantis que certains champs critiques ne seront jamais écrasés par les synchronisations automatiques**.

**Acceptance Criteria:**

```gherkin
Feature: Verrouiller la source d'une métadonnée

  Background:
    Given je suis connecté en tant que SuperAdmin VDM
    And j'accède à un Title dans l'interface de gestion

  Scenario: Activer le verrouillage de source
    Given je suis sur la fiche d'un Title
    And le champ "director" a comme source "Unity"
    When je clique sur l'icône "Lock source" à côté du champ
    Then une confirmation est demandée : "Verrouiller la source de ce champ ?"
    And après confirmation, la source est verrouillée
    And une icône de cadenas s'affiche à côté du badge de source

  Scenario: Impact du verrouillage de source
    Given la source d'une métadonnée est verrouillée
    When une synchronisation automatique depuis Unity est exécutée
    Then les champs avec source verrouillée ne sont PAS mis à jour
    And les champs sans verrouillage sont mis à jour normalement
    And un log indique : "Champ director ignoré (source verrouillée)"

  Scenario: Déverrouiller une source
    Given la source d'une métadonnée est verrouillée
    When je clique sur l'icône "Lock source"
    Then une confirmation est demandée : "Déverrouiller la source de ce champ ?"
    And après confirmation, la source est déverrouillée
    And le champ pourra à nouveau être mis à jour par les synchros automatiques

  Scenario: Verrouillage visible dans l'historique
    Given je verrouille/déverrouille une source
    Then l'action est enregistrée dans l'historique du Title
    And je vois : "Source verrouillée par admin@vdm.fr" ou "Source déverrouillée par admin@vdm.fr"
```

**FRs couverts :** FR50 (enrichi)

**Event Storming Reference:** Metadata Catalog BC - Commande "Verrouiller la source d'une métadonnée"

---

## Règles métier et contraintes (Metadata Catalog BC)

D'après l'Event Storming, le Metadata Catalog BC applique les règles suivantes :

### Règles de création et modification

1. **Unicité des noms de métadonnées** : Le nom d'une métadonnée doit être unique dans le catalogue
2. **Unicité des valeurs d'enum** : Les valeurs d'une énumération doivent être uniques pour chaque champ
3. **Attributs obligatoires** : Field name, Type, Level sont obligatoires lors de la création

### Règles de suppression

4. **Vérification des dépendances** : Avant suppression, le système vérifie l'usage dans :
   - BC Input Mapping (mappings sources externes → mediaspot)
   - BC Output Mapping (mappings mediaspot → providers)
   - Titles existants utilisant la métadonnée

5. **Blocage si utilisée** : Une métadonnée utilisée dans des mappings ne peut pas être supprimée
6. **Choix utilisateur pour enum** : Pour une valeur d'enum, l'utilisateur choisit entre :
   - Retirer la valeur des mappings qui l'utilisent
   - Annuler la suppression
   - Remplacer par une autre valeur (si utilisée dans des Titles)

### Règles de source

7. **Source par défaut** : Chaque métadonnée a une source par défaut (Unity, IMDb, mediaspot, etc.)
8. **Verrouillage de source** : Une source verrouillée ne peut pas être écrasée par les synchronisations automatiques
9. **Impact du changement de source** : Le changement de source par défaut n'affecte que les nouveaux Titles

### Interactions avec d'autres BC

- **BC Input Mapping** : Consulté lors de la suppression d'une métadonnée pour vérifier les dépendances
- **BC Output Mapping** : Consulté lors de la suppression d'une métadonnée pour vérifier les dépendances
- **Message d'attention** : Un message standardisé est affiché à l'utilisateur lorsqu'une métadonnée est utilisée ailleurs

---

## Hotspots et décisions

Les hotspots identifiés dans l'Event Storming ont été résolus comme suit :

| Hotspot | Décision |
|---------|----------|
| **Suppression d'une option enum : suppression des mappings l'utilisant ou blocage ?** | L'utilisateur choisit : (1) Retirer des mappings, (2) Annuler, ou (3) Remplacer par une autre valeur |
| **Que fait le changement de source par défaut ?** | Ne change que les nouveaux Titles ; les existants conservent leur source actuelle |
| **Modèle du message d'attention** | Message standardisé : "Cette métadonnée est utilisée dans X input mappings et Y output mappings" avec détail cliquable |
