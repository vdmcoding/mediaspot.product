<!-- TRACABILITE: Ancien Epic 1 -->
<!-- JIRA: DF-11130 -->

# Epic 1 : Gestion des Metadonnees Title avec Hierarchie et Heritage

**Sophie peut** creer et gerer les metadonnees d'un Title avec la hierarchie Title -> Languages -> Territories et l'heritage intelligent.

**FRs couverts :** FR1, FR2, FR3, FR4, FR5, FR6, FR55, FR56, FR57, FR58

**Valeur livree :** Sophie peut creer un Title, activer des langues, ajouter des territoires, et voir les metadonnees se propager automatiquement via l'heritage intelligent.

---

## Story 1.1 : Creation d'un Title avec metadonnees globales

As a **Gestionnaire de catalogue**,
I want **creer un nouveau Title avec ses metadonnees globales (titre original, annee, genre, cast)**,
So that **je dispose d'une base de donnees structuree pour mes oeuvres**.

**Acceptance Criteria:**

```gherkin
Feature: Creation d'un Title avec metadonnees globales

  Scenario: Creation d'un nouveau Title
    Given je suis connecte en tant que Gestionnaire de catalogue
    When je clique sur "Creer un Title"
    And je remplis les champs obligatoires (titre original, annee de production)
    And je remplis les champs optionnels (genre, cast, synopsis original)
    And je clique sur "Enregistrer"
    Then le Title est cree avec un identifiant unique
    And je suis redirige vers la fiche du Title
    And un breadcrumb affiche "Title: [nom du titre]"

  Scenario: Validation des champs obligatoires
    Given je suis sur le formulaire de creation de Title
    When je tente d'enregistrer sans remplir le titre original
    Then un message d'erreur s'affiche sur le champ manquant
    And le formulaire n'est pas soumis

  Scenario: La langue de l'original title est activee par defaut
    Given je cree un Title avec "English" comme langue originale
    When le Title est cree
    Then la langue "English" est automatiquement activee
    And elle est marquee comme "Original Language"
```

**FRs couverts :** FR1, FR56

---

## Story 1.2 : Activation des langues pour un Title

As a **Gestionnaire de catalogue**,
I want **activer des langues supplementaires pour un Title et saisir les metadonnees localisees**,
So that **je peux preparer les traductions pour differents marches**.

**Acceptance Criteria:**

```gherkin
Feature: Activation des langues pour un Title

  Scenario: Activer une nouvelle langue
    Given je suis sur la fiche d'un Title existant
    When je clique sur "Add language"
    And je selectionne "French" dans la liste des langues disponibles
    Then la langue "French" apparait dans la liste des langues actives
    And un onglet ou accordeon "French" est cree
    And les champs localisables sont affiches (Localized title, Synopsis, Keywords)

  Scenario: Saisie des metadonnees localisees
    Given la langue "French" est activee pour le Title
    When je clique sur l'onglet "French"
    And je saisis le titre localise "Le Dernier Metro"
    And je saisis le synopsis en francais
    And je clique sur "Enregistrer"
    Then les metadonnees localisees sont sauvegardees
    And un indicateur visuel confirme l'enregistrement

  Scenario: Seuls les champs localisables sont affiches au niveau langue
    Given je suis sur l'onglet d'une langue activee
    Then je vois uniquement les champs localisables (Localized title, Synopsis, Release date, Keywords)
    And je ne vois PAS les champs globaux (Original title, IMDb ID, Genre, Year)
```

**FRs couverts :** FR2, FR55, FR57

---

## Story 1.3 : Ajout de territoires avec heritage automatique

As a **Gestionnaire de catalogue**,
I want **ajouter des territoires sous une langue avec heritage automatique des metadonnees**,
So that **je n'ai pas a ressaisir les informations communes a tous les territoires d'une meme langue**.

**Acceptance Criteria:**

```gherkin
Feature: Ajout de territoires avec heritage automatique

  Scenario: Ajouter un territoire a une langue
    Given la langue "French" est activee pour le Title
    When je clique sur "Add territory" sous "French"
    And je selectionne "France (FRA)" dans la liste
    Then le territoire "France" apparait sous la langue "French"
    And il est affiche avec une indentation (-> France)

  Scenario: Heritage automatique des metadonnees langue
    Given le territoire "France" est ajoute sous la langue "French"
    And la langue "French" a un synopsis defini
    When je consulte les metadonnees du territoire "France"
    Then le synopsis affiche la valeur de la langue parente
    And un label "Same as French" ou "Inherited" est visible
    And l'icone de source indique "Pulled from Language"

  Scenario: Ajout de plusieurs territoires
    Given la langue "French" est activee
    When j'ajoute les territoires "France", "Belgium", "Switzerland"
    Then les trois territoires apparaissent sous "French"
    And chacun herite automatiquement des metadonnees de "French"
```

**FRs couverts :** FR3, FR4, FR58

---

## Story 1.4 : Override des metadonnees territoire

As a **Gestionnaire de catalogue**,
I want **surcharger une metadonnee heritee pour un territoire specifique**,
So that **je peux adapter le contenu aux specificites locales (ex: synopsis adapte pour la Belgique)**.

**Acceptance Criteria:**

```gherkin
Feature: Override des metadonnees territoire

  Scenario: Surcharger une metadonnee heritee
    Given le territoire "Belgium" herite du synopsis de la langue "French"
    When je clique sur le champ synopsis du territoire "Belgium"
    And je modifie la valeur
    And je clique sur "Enregistrer"
    Then la nouvelle valeur est sauvegardee pour "Belgium" uniquement
    And le label passe de "Same as French" a "Overridden"
    And un bouton "Reset to default" apparait

  Scenario: Reset d'un override vers la valeur heritee
    Given le territoire "Belgium" a un synopsis surcharge
    When je clique sur "Reset to default"
    Then une confirmation est demandee
    And apres confirmation, le synopsis reprend la valeur de la langue "French"
    And le label repasse a "Same as French"

  Scenario: L'override ne propage pas aux autres territoires
    Given le territoire "Belgium" a un synopsis surcharge
    When je consulte le territoire "Switzerland" (meme langue "French")
    Then "Switzerland" affiche toujours le synopsis herite de "French"
    And il n'est pas impacte par l'override de "Belgium"
```

**FRs couverts :** FR4

---

## Story 1.5 : Vue bulk edition multi-langues/territoires

As a **Gestionnaire de catalogue**,
I want **editer les metadonnees de plusieurs langues et territoires dans une vue unique**,
So that **je gagne du temps en evitant d'ouvrir 15 ecrans separes**.

**Acceptance Criteria:**

```gherkin
Feature: Vue bulk edition multi-langues/territoires

  Scenario: Ouvrir la vue bulk pour un champ localisable
    Given je suis sur la fiche d'un Title avec 5 langues et 15 territoires
    When je clique sur "Bulk edit" pour le champ "Synopsis"
    Then une vue grille s'ouvre
    And les langues sont affichees en colonnes
    And les territoires sont affiches en lignes
    And chaque cellule contient la valeur du synopsis pour cette combinaison

  Scenario: Edition inline dans la vue bulk
    Given je suis dans la vue bulk pour le champ "Synopsis"
    When je clique sur une cellule
    Then la cellule devient editable (inline editing)
    And je peux saisir ou modifier la valeur
    And la navigation clavier fonctionne (Tab, Enter, Fleches)

  Scenario: Sauvegarde des modifications bulk
    Given j'ai modifie plusieurs synopsis dans la vue bulk
    When je clique sur "Save all"
    Then toutes les modifications sont sauvegardees
    And un toast confirme "X changes saved"
    And les cellules modifiees sont visuellement marquees comme "Overridden"

  Scenario: Filtrage dans la vue bulk
    Given je suis dans la vue bulk
    When je filtre par "Incomplete only"
    Then seules les cellules vides ou incompletes sont affichees
```

**FRs couverts :** FR5

---

## Story 1.6 : Navigation dans la hierarchie Title

As a **Gestionnaire de catalogue**,
I want **naviguer facilement dans la hierarchie Title -> Languages -> Territories**,
So that **je sais toujours ou je suis et je peux acceder rapidement a n'importe quel niveau**.

**Acceptance Criteria:**

```gherkin
Feature: Navigation dans la hierarchie Title

  Scenario: Breadcrumb hierarchique persistant
    Given je suis sur le territoire "France" du Title "Le Dernier Metro"
    Then le breadcrumb affiche "Title: Le Dernier Metro > French > France"
    And chaque element du breadcrumb est cliquable

  Scenario: Navigation via le breadcrumb
    Given le breadcrumb affiche "Title: Le Dernier Metro > French > France"
    When je clique sur "French" dans le breadcrumb
    Then je suis redirige vers le niveau langue "French"
    And le breadcrumb se met a jour

  Scenario: Vue arborescente dans la sidebar
    Given je suis sur la fiche d'un Title
    Then une sidebar affiche l'arborescence complete
    And je vois Title > Languages (avec leurs territoires)
    And je peux cliquer sur n'importe quel element pour naviguer

  Scenario: Accordeons pour la hierarchie
    Given je suis dans l'onglet "Languages" du Title
    Then chaque langue est affichee dans un accordeon
    And je peux deplier un accordeon pour voir ses territoires
    And les territoires sont indentes avec "->"
```

**FRs couverts :** FR6
