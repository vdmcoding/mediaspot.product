<!-- TRACABILITE: Ancien Epic 2 -->
<!-- JIRA: DF-11132 -->

# Epic 2 : Creation et Gestion de Packages Multi-Territoires

**Sophie peut** creer des packages complets pour plusieurs providers et territoires, avec compteur de completion et validation temps reel.

**FRs couverts :** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR66, FR67, FR68, FR69, FR70

**Valeur livree :** Sophie cree un package iTunes pour 15 territoires en < 15 min avec feedback "94/120 champs remplis" et etat VALID pour handoff vers BundleMaker.

---

## Story 2.1 : Definition des Shared Metadata pour un Title

As a **Gestionnaire de catalogue**,
I want **definir des metadonnees partagees (Vendor ID, Studio, Labo, Copyrights) applicables a tous les packages d'un Title**,
So that **je ne ressaisis pas ces informations communes pour chaque provider**.

**Acceptance Criteria:**

```gherkin
Feature: Definition des Shared Metadata

  Scenario: Acceder a la section Shared Metadata
    Given je suis sur la fiche d'un Title
    When je clique sur l'onglet "Shared Metadata"
    Then je vois les champs partages : Vendor ID, Studio, Labo, Copyrights, VOD Dates
    And un compteur affiche "0/12 champs remplis"

  Scenario: Saisie des Shared Metadata
    Given je suis dans la section Shared Metadata
    When je remplis Vendor ID, Studio "Les Films du Losange", Labo "VDM"
    And je remplis les dates VOD (EST, VOD)
    And je clique sur "Enregistrer"
    Then les metadonnees partagees sont sauvegardees
    And le compteur se met a jour

  Scenario: Upload des artworks partages
    Given je suis dans la section Shared Metadata
    When je clique sur "Upload artwork"
    And je selectionne une image 16:9
    Then l'image est uploadee et validee
    And un apercu thumbnail s'affiche
    And le format est valide en temps reel
```

**FRs couverts :** FR15, FR66

---

## Story 2.2 : Creation d'un Package pour un Provider

As a **Gestionnaire de catalogue**,
I want **creer un package en selectionnant un provider et des territoires**,
So that **je prepare les metadonnees pour une livraison specifique**.

**Acceptance Criteria:**

```gherkin
Feature: Creation d'un Package

  Scenario: Creer un nouveau package
    Given je suis sur la fiche d'un Title avec des metadonnees et des territoires definis
    When je clique sur "Create a package"
    Then une modale s'ouvre avec un selecteur de Platform (iTunes, Amazon, Google, Netflix)
    And une liste de territoires actives a cocher

  Scenario: Selection du provider et des territoires
    Given je suis dans la modale de creation de package
    When je selectionne "iTunes" comme platform
    And je coche les territoires UK, US, FR, DE
    And je clique sur "Create"
    Then un package iTunes est cree avec les 4 territoires
    And je suis redirige vers la fiche du package

  Scenario: Pre-remplissage automatique depuis Title + Shared Metadata
    Given un package iTunes est cree pour le Title "Le Dernier Metro"
    When je consulte les metadonnees du package
    Then les champs sont pre-remplis depuis les Title Metadata (titres localises, synopsis)
    And les Shared Metadata sont appliquees (Vendor ID, Studio, Labo)
    And un compteur affiche "94/120 champs remplis"
```

**FRs couverts :** FR9, FR68, FR69

---

## Story 2.3 : Structure hierarchique du Package

As a **Gestionnaire de catalogue**,
I want **naviguer dans un package avec la meme structure que le Title (Global -> Languages -> Territories)**,
So that **je retrouve mes reperes et je comprends l'organisation des donnees**.

**Acceptance Criteria:**

```gherkin
Feature: Structure hierarchique du Package

  Scenario: Affichage de la structure du package
    Given je suis sur la fiche d'un package iTunes
    Then je vois la structure hierarchique :
      | Niveau | Contenu |
      | Global metadata | Package ID, Labo, Original Title |
      | Languages | English, French |
      | Territories | UK, US sous English / FR, BE sous French |

  Scenario: Navigation dans la hierarchie package
    Given je suis sur le package iTunes
    When je clique sur "English"
    Then je vois les metadonnees au niveau langue (Localized title, Copyrights, VOD Dates)
    And les territoires sont affiches en sous-niveau

  Scenario: Metadonnees territoire heritees de la langue
    Given je suis sur le territoire "UK" du package
    Then les metadonnees affichent "Pulled from English"
    And je peux overrider si necessaire
```

**FRs couverts :** FR10, FR70

---

## Story 2.4 : Compteur de completion et identification des champs manquants

As a **Gestionnaire de catalogue**,
I want **voir en temps reel le taux de completion et les champs manquants**,
So that **je sais exactement ce qu'il reste a faire pour valider le package**.

**Acceptance Criteria:**

```gherkin
Feature: Compteur de completion temps reel

  Scenario: Affichage du compteur de completion
    Given je suis sur la fiche d'un package
    Then un compteur affiche "94/120 champs remplis"
    And une barre de progression visuelle est affichee
    And le compteur se met a jour a chaque modification

  Scenario: Identification des champs manquants
    Given le package a des champs requis non remplis
    Then les champs manquants sont listes en rouge
    And je peux cliquer sur un champ manquant pour y acceder directement
    And le compteur indique "3 champs requis manquants"

  Scenario: Statut du package selon completion
    Given je remplis tous les champs requis du package
    When le compteur atteint "120/120"
    Then le statut passe de "Draft" a "VALID"
    And une indication visuelle confirme que le package est pret
```

**FRs couverts :** FR13, FR14, FR18, FR19

---

## Story 2.5 : Validation temps reel contre les specs provider

As a **Gestionnaire de catalogue**,
I want **que les metadonnees soient validees en temps reel contre les specs du provider cible**,
So that **je corrige les erreurs immediatement au lieu de les decouvrir a la livraison**.

**Acceptance Criteria:**

```gherkin
Feature: Validation temps reel contre specs provider

  Scenario: Validation format de champ
    Given je suis sur un package iTunes
    When je saisis un copyright au mauvais format
    Then une erreur s'affiche immediatement : "Format attendu: (c) {YEAR} {STUDIO}. All rights reserved."
    And le champ est borde en rouge

  Scenario: Validation champs obligatoires provider
    Given je suis sur un package iTunes
    Then les champs obligatoires selon la spec iTunes sont marques avec un asterisque
    And si un champ obligatoire est vide, il est liste dans les "champs manquants"

  Scenario: Validation en temps reel a la saisie
    Given je modifie un champ du package
    When je quitte le champ (blur)
    Then la validation s'execute immediatement
    And un indicateur (check) ou (x) s'affiche selon le resultat
```

**FRs couverts :** FR17

---

## Story 2.6 : Edition et suppression de package

As a **Gestionnaire de catalogue**,
I want **editer les metadonnees d'un package existant et pouvoir le supprimer**,
So that **je peux corriger des erreurs ou abandonner un package non pertinent**.

**Acceptance Criteria:**

```gherkin
Feature: Edition et suppression de package

  Scenario: Edition d'un package existant
    Given je suis sur la liste des packages d'un Title
    When je clique sur un package existant
    Then je peux modifier n'importe quelle metadonnee
    And les modifications sont sauvegardees
    And le compteur de completion se met a jour

  Scenario: Suppression d'un package
    Given je suis sur la fiche d'un package
    When je clique sur "Supprimer le package"
    Then une confirmation est demandee
    And apres confirmation, le package est supprime
    And je suis redirige vers la liste des packages du Title

  Scenario: Protection contre suppression accidentelle
    Given le package est a l'etat "VALID"
    When je tente de le supprimer
    Then un avertissement supplementaire s'affiche
    And je dois confirmer explicitement
```

**FRs couverts :** FR11, FR12

---

## Story 2.7 : Duplication de package

As a **Gestionnaire de catalogue**,
I want **dupliquer un package existant pour creer une variante**,
So that **je gagne du temps en reutilisant un package similaire**.

**Acceptance Criteria:**

```gherkin
Feature: Duplication de package

  Scenario: Dupliquer un package vers un autre provider
    Given je suis sur un package iTunes "VALID"
    When je clique sur "Duplicate"
    And je selectionne "Amazon" comme nouveau provider
    Then un nouveau package Amazon est cree
    And les metadonnees communes sont copiees
    And le mapping provider est applique (adaptation des champs)

  Scenario: Dupliquer un package vers d'autres territoires
    Given je suis sur un package iTunes avec UK, US
    When je clique sur "Duplicate"
    And j'ajoute les territoires FR, DE
    Then un nouveau package est cree avec UK, US, FR, DE
    And les metadonnees UK, US sont copiees
    And les metadonnees FR, DE sont a completer

  Scenario: Etat du package duplique
    Given je duplique un package "VALID"
    Then le nouveau package est a l'etat "Draft"
    And le compteur de completion reflete les champs a verifier
```

**FRs couverts :** FR20

---

## Story 2.8 : Application des Shared Metadata aux packages

As a **Gestionnaire de catalogue**,
I want **que les Shared Metadata soient automatiquement propagees a tous les packages**,
So that **je n'ai pas a ressaisir les informations communes**.

**Acceptance Criteria:**

```gherkin
Feature: Propagation Shared Metadata aux packages

  Scenario: Application automatique a la creation
    Given j'ai defini des Shared Metadata pour un Title
    When je cree un nouveau package
    Then les Shared Metadata sont automatiquement appliquees
    And les champs concernes affichent les valeurs des Shared Metadata

  Scenario: Mise a jour des packages existants
    Given j'ai des packages existants pour un Title
    When je modifie une Shared Metadata (ex: nouveau Vendor ID)
    Then les packages existants sont mis a jour
    And un indicateur montre la propagation

  Scenario: Override d'une Shared Metadata dans un package
    Given un package a herite d'une Shared Metadata
    When je modifie cette valeur dans le package
    Then la valeur surchargee est sauvegardee
    And elle n'est plus mise a jour par les Shared Metadata
    And un label "Overridden" s'affiche
```

**FRs couverts :** FR16, FR67
