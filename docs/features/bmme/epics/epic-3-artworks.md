<!-- TRACABILITE: Ancien Epic 8 -->
<!-- JIRA: DF-11418 -->

# Epic 3 : Gestion des Artworks

**Sophie peut** uploader, localiser et associer des artworks aux Titles et Packages avec validation automatique, bulk actions et support des series TV.

**FRs couverts :** FR95, FR96, FR97, FR98, FR99, FR100, FR101, FR102, FR103, FR104, FR105, FR106, FR107, FR108, FR109, FR110, FR111, FR112, FR113

**Valeur livree :** Sophie uploade et localise 15 artworks en 35 minutes (vs 3h manuellement), avec validation automatique des dimensions et des specs providers, et import intelligent dans les packages.

---

## Story 3.1 : Bulk upload d'artworks avec analyse de filename

> Ancienne Story 8.1

As a **Gestionnaire de catalogue**,
I want **uploader plusieurs artworks d'un coup avec analyse automatique des filenames**,
So that **je gagne du temps en evitant de remplir manuellement chaque formulaire**.

**Acceptance Criteria:**

```gherkin
Feature: Bulk upload d'artworks avec analyse de filename

  Scenario: Drag & drop multi-fichiers
    Given je suis sur l'onglet Artworks d'un Title
    When je drag & drop 15 fichiers PNG/JPG
    Then une interface de preview s'affiche avec les 15 fichiers
    And chaque fichier est analyse pour extraction des metadonnees

  Scenario: Analyse de filename pour auto-remplissage
    Given j'uploade un fichier "lederniermero_poster_fr_netflix.png"
    Then le systeme detecte automatiquement :
      | Champ | Valeur detectee |
      | Type | Portrait (poster) |
      | Langue | FR |
      | Provider | Netflix |
    And je peux corriger manuellement si necessaire

  Scenario: Preview avant confirmation
    Given les fichiers sont analyses
    Then je vois un tableau recapitulatif :
      | File | Type | Lang | Provider | Dimensions | Status |
      | poster_fr.png | Portrait | FR | All | 2000x3000 | Valid |
      | landscape_en.png | Landscape | EN | All | 1920x1080 | Valid |
    And je peux modifier les valeurs avant de confirmer l'upload

  Scenario: Confirmation et upload
    Given je valide le preview
    When je clique sur "Upload all"
    Then tous les artworks sont uploades
    And ils apparaissent dans la vue liste avec leurs thumbnails
```

**FRs couverts :** FR95, FR96, FR112

---

## Story 3.2 : Validation automatique des artworks a l'upload

> Ancienne Story 8.2

As a **Gestionnaire de catalogue**,
I want **que le systeme valide automatiquement les dimensions et formats des artworks**,
So that **je detecte les erreurs avant la livraison et non apres**.

**Acceptance Criteria:**

```gherkin
Feature: Validation automatique des artworks

  Scenario: Validation des dimensions et ratio
    Given j'uploade un artwork
    Then le systeme valide :
      | Critere | Validation |
      | Dimensions paires | largeur ET hauteur doivent etre paires |
      | Ratio | conforme au type (2/3, 16/9, 1/1, etc.) |
      | Taille minimale | selon les specs provider |

  Scenario: Rejet automatique des dimensions impaires
    Given j'uploade un artwork de 1919x1080 pixels
    Then l'artwork est rejete avec le message :
      "REJECTED: Dimension impaire detectee (1919). Les dimensions doivent etre paires."
    And l'artwork n'est pas uploade
    And il est marque en rouge dans le preview

  Scenario: Validation par provider
    Given j'uploade un artwork carre de 1000x1000 pour Netflix
    Then le systeme valide contre les specs Netflix
    And affiche "Carre 1/1 valid (Netflix spec)"

  Scenario: Rejet d'un ratio incorrect
    Given j'uploade un artwork de 1500x1500 comme "Portrait"
    Then l'artwork est rejete avec le message :
      "REJECTED: Ratio 1/1 incompatible avec Portrait (attendu: 2/3)"

  Scenario: Validation Google-specific
    Given j'uploade un artwork de 1000x1440 pour Google
    Then le systeme valide contre les specs Google
    And affiche "Portrait Google 1000x1440 valid"
```

**FRs couverts :** FR97, FR98, FR113

---

## Story 3.3 : Vue grille des artworks avec navigation hierarchique

> Ancienne Story 8.3

As a **Gestionnaire de catalogue**,
I want **visualiser tous les artworks d'un Title dans une vue grille organisee par type, avec navigation hierarchique par langue/territoire**,
So that **je vois clairement les artworks et je navigue intuitivement dans la structure de localisation**.

**Acceptance Criteria:**

```gherkin
Feature: Vue grille des artworks avec navigation hierarchique

  Scenario: Affichage de la vue "All artworks"
    Given je suis sur l'onglet Artworks d'un Title
    Then je vois une sidebar gauche avec la hierarchie :
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

  Scenario: Groupement par type (mode par defaut)
    Given je suis sur la vue "All artworks"
    And le groupement est regle sur "Type"
    Then les artworks sont groupes par type :
      | Section | Exemple |
      | Landscape | 5 artworks |
      | Portraits | 5 artworks |
      | Hero | 2 artworks |
      | Squares | 0 artworks |
    And chaque section a un compteur et une zone "+" pour ajouter

  Scenario: Groupement par langue
    Given je suis sur la vue "All artworks"
    When je change le groupement sur "Langue"
    Then les artworks sont groupes par langue :
      | Section | Exemple |
      | English (Original Language) | 32 artworks |
      | Portuguese | 4 artworks |
      | Portugal | 1 artwork |
    And chaque section affiche les artworks en grille de cards
    And chaque card affiche son type (Landscape, Portrait, Hero)

  Scenario: Switch entre modes de groupement
    Given je suis sur la vue "All artworks" groupee par Type
    When je clique sur le toggle de groupement
    Then la vue passe en groupement par Langue
    And les artworks sont reorganises sans rechargement de page
    And mon choix de groupement est memorise pour la session

  Scenario: Navigation via la sidebar
    Given je clique sur "United Kingdom" dans la sidebar
    Then le breadcrumb affiche "Global > English > United Kingdom"
    And seuls les artworks specifiques a UK sont affiches
    And les sections par type montrent les compteurs mis a jour

  Scenario: Vue langue avec artworks herites visibles
    Given je clique sur "English" dans la sidebar
    Then je vois les artworks de niveau English
    And les artworks Worldwide sont affiches avec le label "Worldwide"
    And les artworks English sont affiches avec le label "English"

  Scenario: Indicateur de source sur chaque artwork
    Given je consulte la vue grille
    Then chaque card affiche sa source :
      | Artwork | Source affichee |
      | landscape_1_eng | Worldwide |
      | portrait_2_eng | Portuguese |
      | hero_uk | Portugal |

  Scenario: Support de plusieurs artworks du meme type
    Given j'ai uploade 3 landscapes pour English
    Then les 3 landscapes sont visibles dans la section "Landscape"
    And je peux les distinguer par filename et thumbnail
```

**FRs couverts :** FR99, FR100, FR108, FR112

---

## Story 3.4 : Bulk actions sur les artworks

> Ancienne Story 8.4

As a **Gestionnaire de catalogue**,
I want **effectuer des actions sur plusieurs artworks a la fois (delete, copy to, move to)**,
So that **je gagne du temps sur les operations repetitives**.

**Acceptance Criteria:**

```gherkin
Feature: Bulk actions sur les artworks

  Scenario: Selection multiple
    Given je suis sur la liste des artworks
    When je coche plusieurs artworks
    Then un menu d'actions apparait avec : Delete, Copy to, Move to

  Scenario: Bulk delete
    Given j'ai selectionne 5 artworks
    When je clique sur "Delete"
    Then une confirmation demande "Supprimer 5 artworks ?"
    And apres confirmation, les 5 artworks sont supprimes

  Scenario: Bulk copy to
    Given j'ai selectionne 3 artworks en langue EN
    When je clique sur "Copy to..."
    And je selectionne les langues DE, IT
    Then les 3 artworks sont copies vers DE et IT
    And les copies apparaissent dans la liste avec Lang = DE et IT

  Scenario: Bulk move to
    Given j'ai selectionne 2 artworks en langue FR
    When je clique sur "Move to..."
    And je selectionne fr-CA (Canada)
    Then les 2 artworks sont deplaces de FR vers fr-CA
    And ils n'apparaissent plus en FR

  Scenario: Bulk change provider
    Given j'ai selectionne 4 artworks "All platforms"
    When je clique sur "Change provider..."
    And je selectionne "Netflix only"
    Then les 4 artworks passent de "All" a "Netflix"
```

**FRs couverts :** FR101, FR102, FR103

---

## Story 3.5 : Configuration provider des artworks

> Ancienne Story 8.5

As a **Gestionnaire de catalogue**,
I want **definir pour quels providers un artwork est destine**,
So that **je peux avoir des artworks differents selon les plateformes**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration provider des artworks

  Scenario: All platforms (defaut)
    Given j'uploade un artwork sans specifier de provider
    Then il est marque "All platforms" par defaut
    And il sera utilisable pour tous les providers (iTunes, Amazon, Google, Netflix)

  Scenario: Provider unique
    Given j'uploade un artwork carre pour Netflix
    When je selectionne "Netflix only"
    Then l'artwork est reserve a Netflix
    And il n'apparait pas dans les options des autres providers

  Scenario: Multi platforms
    Given j'uploade un artwork
    When je selectionne "Multi platforms" avec iTunes et Amazon
    Then l'artwork est utilisable pour iTunes et Amazon
    And il n'apparait pas dans les options de Google et Netflix

  Scenario: Modification du provider
    Given un artwork est configure "All platforms"
    When je modifie pour "iTunes only"
    Then le provider est mis a jour
    And l'artwork n'est plus visible pour les autres providers
```

**FRs couverts :** FR104

---

## Story 3.6 : Stockage hierarchique des artworks

> Ancienne Story 8.6

As a **Gestionnaire de catalogue**,
I want **que les artworks soient stockes au niveau exact ou je les uploade (Worldwide, Langue, Territoire)**,
So that **je maitrise precisement quels artworks sont utilises ou**.

**Acceptance Criteria:**

```gherkin
Feature: Stockage hierarchique des artworks

  Scenario: Upload au niveau Worldwide
    Given j'uploade un artwork avec Lang = "WW" (Worldwide)
    Then l'artwork est stocke au niveau Worldwide
    And il apparait avec le label "WW" dans la liste

  Scenario: Upload au niveau Langue
    Given j'uploade un artwork avec Lang = "EN"
    Then l'artwork est stocke au niveau langue EN
    And il n'apparait PAS automatiquement sur en-UK ou en-US

  Scenario: Upload au niveau Territoire
    Given j'uploade un artwork avec Lang = "en-UK"
    Then l'artwork est stocke au niveau territoire en-UK
    And il est specifique a ce territoire uniquement

  Scenario: Pas d'heritage automatique dans la vue Artworks
    Given j'ai un artwork EN
    When je consulte la liste des artworks
    Then l'artwork EN n'apparait PAS duplique sur en-UK, en-US, etc.
    And il apparait uniquement au niveau EN
```

**FRs couverts :** FR105

---

## Story 3.7 : Heritage des artworks a l'import dans le Package

> Ancienne Story 8.7

As a **Gestionnaire de catalogue**,
I want **que le systeme propose automatiquement les artworks disponibles lors de l'import dans un Package**,
So that **je n'ai pas a rechercher manuellement les artworks pour chaque territoire**.

**Acceptance Criteria:**

```gherkin
Feature: Heritage des artworks a l'import dans le Package

  Scenario: Import avec artwork exact disponible
    Given j'ai un artwork "poster_en-UK.png" pour en-UK
    When je cree un package iTunes pour le territoire UK
    Then le systeme propose "poster_en-UK.png" comme artwork Portrait
    And il est pre-selectionne comme "exact match"

  Scenario: Import avec heritage de la langue
    Given j'ai un artwork "poster_en.png" pour EN
    And je n'ai PAS d'artwork specifique pour en-UK
    When je cree un package iTunes pour le territoire UK
    Then le systeme propose "poster_en.png" comme artwork Portrait
    And il est affiche avec "(inherited from EN)"

  Scenario: Choix manuel entre options
    Given j'ai un artwork en-UK ET un artwork EN
    When j'importe les artworks dans le package UK
    Then je vois les deux options :
      | Option | Source | Status |
      | poster_en-UK.png | exact match | |
      | poster_en.png | inherited from EN | |
    And je peux choisir celui a utiliser

  Scenario: Aucun artwork disponible
    Given je n'ai aucun artwork pour en-UK ni pour EN
    When je cree un package iTunes pour UK
    Then le systeme affiche "No artwork available"
    And je peux uploader un artwork directement
```

**FRs couverts :** FR106, FR107

---

## Story 3.8 : Gestion des artworks pour les series TV

> Ancienne Story 8.8

As a **Gestionnaire de catalogue**,
I want **uploader des artworks aux niveaux Serie, Saison et Episode**,
So that **je peux gerer les artworks specifiques a chaque niveau d'une serie**.

**Acceptance Criteria:**

```gherkin
Feature: Gestion des artworks pour les series TV

  Scenario: Artworks au niveau Serie
    Given je suis sur une fiche Serie
    When j'accede a l'onglet Artworks
    Then je peux uploader des artworks pour la serie globale
    And ils sont marques comme "Serie"

  Scenario: Artworks au niveau Saison
    Given je suis sur une fiche Saison
    When j'accede a l'onglet Artworks
    Then je peux uploader des artworks specifiques a cette saison
    And ils sont marques comme "Saison X"

  Scenario: Artworks au niveau Episode
    Given je suis sur une fiche Episode
    When j'accede a l'onglet Artworks
    Then je peux uploader des artworks specifiques a cet episode
    And ils sont marques comme "S01E03" par exemple

  Scenario: Pas d'heritage entre niveaux
    Given j'ai un artwork au niveau Serie
    When je consulte les artworks d'une Saison
    Then l'artwork Serie n'apparait PAS automatiquement
    And je dois uploader des artworks specifiques si necessaire

  Scenario: Artworks optionnels pour Saison/Episode
    Given je suis sur une fiche Saison sans artwork
    Then le systeme affiche "Artworks optionnels"
    And je peux continuer sans uploader d'artwork
    And le package peut etre cree sans artwork Saison
```

**FRs couverts :** FR109, FR110, FR111
