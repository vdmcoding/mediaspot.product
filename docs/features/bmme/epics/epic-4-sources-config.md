<!-- TRACABILITE: Ancien Epic 3 - Partie A (Configuration) -->
<!-- JIRA: DF-11128 -->

# Epic 4 : Configuration des Sources Externes

**Marc peut** configurer les mappings entre les systemes externes (Unity, Iron, MovieLibrary) et mediaspot, avec editeur visuel, transformations et validations.

**FRs couverts :** FR35, FR71, FR72, FR73, FR74, FR75, FR76, FR77

**Valeur livree :** Marc configure un nouveau mapping Unity en 30 min avec editeur visuel, teste en temps reel, et deploie sans intervention dev.

---

## Story 4.1 : Creation et configuration des mappings

> Ancienne Story 3.4 (DF-11128)

As a **Admin Interne VDM**,
I want **creer et configurer un nouveau mapping source (API ou fichier) avec ses parametres de connexion et schemas**,
So that **je peux integrer une nouvelle source externe sans intervention dev**.

**UI Reference:** [3.3 - Mode diagnostic live API/](docs/features/bmme/ui/3.3%20-%20Mode%20diagnostic%20live%20API/)

**Acceptance Criteria:**

```gherkin
Feature: Creation et configuration des mappings

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "External sources > Mappings"

  # --- Creation d'un nouveau mapping ---

  Scenario: Creer un nouveau mapping API
    When je clique sur "New mapping +"
    Then une modale "Create a new mapping" s'ouvre avec les champs :
      | Champ | Type | Description |
      | Mapping name | Text | Nom unique du mapping (ex: Unity-StudioCanal) |
      | Provider | Dropdown | Liste des systemes externes (Unity, Iron, IMDb...) |
      | Source type | Toggle | API / File |
    And je vois les champs specifiques selon le Source type selectionne

  Scenario: Configuration des parametres API
    Given je cree un mapping de type "API"
    Then je vois les champs de configuration API :
      | Champ | Description |
      | API URL | URL de l'endpoint (ex: https://api.unity.com/v2/titles) |
      | Method | GET / POST / PUT |
      | Headers | Key-Value pairs pour les headers (Authorization, Content-Type...) |
      | Auth type | None / API Key / OAuth2 |
      | Response format | JSON / XML |

  Scenario: Configuration des parametres fichier
    Given je cree un mapping de type "File"
    Then je vois les champs de configuration fichier :
      | Champ | Description |
      | Supported formats | CSV, JSON, XML (checkboxes) |
      | Expected schema | Editeur JSON pour definir la structure attendue |
      | Encoding | UTF-8 / ISO-8859-1 / etc. |

  Scenario: Test de connexion API
    Given j'ai rempli les parametres API
    When je clique sur "Test connection"
    Then le systeme appelle l'API avec les parametres configures
    And affiche le resultat :
      | Resultat | Affichage |
      | Succes | "Connection successful - X records available" (vert) |
      | Echec | "Connection failed: [message d'erreur]" (rouge) |

  Scenario: Sauvegarde du mapping
    Given j'ai configure tous les parametres requis
    When je clique sur "Create mapping"
    Then le mapping est cree et apparait dans la liste des mappings
    And je suis redirige vers l'editeur de champs (cf. Story 4.5)
```

**FRs couverts :** FR35, FR71

---

## Story 4.2 : Configuration de la repetition de synchronisation automatique

> Ancienne Story 3.4bis (DF-11412)

As a **Admin Interne VDM**,
I want **configurer la repetition automatique des synchronisations pour les sources API**,
So that **les donnees sont mises a jour regulierement sans intervention manuelle**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration de la repetition de synchronisation automatique

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a la configuration d'une source de type "API"

  # --- Activation de la synchro auto ---

  Scenario: Activer la synchronisation automatique
    Given je suis sur l'onglet "Configuration" d'une source API
    Then je vois une section "Automatic synchronization" avec :
      | Element | Description |
      | Toggle | "Enable auto-sync" (ON/OFF) |
      | Section config | Masquee si toggle OFF |

  Scenario: Configuration de la periodicite
    Given le toggle "Enable auto-sync" est active
    Then je vois les champs de configuration :
      | Champ | Type | Options/Format |
      | Every | Number input + Dropdown | 1, 2, 3... + hour/day/week/month |
      | On | Dropdown (conditionnel) | Jours de semaine (si week) ou jour du mois (si month) |
      | At | Time picker | Format HH:MM:SS |

  Scenario: Configuration d'une synchro quotidienne
    Given je configure la repetition
    When je selectionne "Every 1 day"
    And je definis l'heure a "02:00:00"
    And je clique sur "Save"
    Then la synchro automatique est programmee tous les jours a 02h00
    And le badge affiche "Auto-sync: Daily at 02:00"

  Scenario: Configuration d'une synchro hebdomadaire
    Given je configure la repetition
    When je selectionne "Every 1 week"
    Then le champ "On" apparait avec les jours de la semaine
    When je selectionne "Monday"
    And je definis l'heure a "03:00:00"
    And je clique sur "Save"
    Then la synchro est programmee tous les lundis a 03h00
    And le badge affiche "Auto-sync: Weekly on Monday at 03:00"

  Scenario: Configuration d'une synchro mensuelle
    Given je configure la repetition
    When je selectionne "Every 1 month"
    Then le champ "On" apparait avec les jours du mois (1-31)
    When je selectionne "15"
    And je definis l'heure a "04:00:00"
    And je clique sur "Save"
    Then la synchro est programmee le 15 de chaque mois a 04h00
    And le badge affiche "Auto-sync: Monthly on day 15 at 04:00"

  # --- Restrictions et validation ---

  Scenario: Repetition disponible uniquement pour les sources API
    Given je suis sur la configuration d'une source "File-based"
    Then la section "Automatic synchronization" n'est PAS affichee
    And un message explique : "Auto-sync is only available for API sources"

  Scenario: Validation des inputs de repetition
    Given je configure la repetition
    When je saisis une valeur invalide (ex: 0 ou negatif)
    Then un message d'erreur s'affiche
    And le bouton "Save" reste desactive

  # --- Affichage dans le dashboard ---

  Scenario: Indicateur de synchro planifiee dans les cartes sources
    Given une source a une synchro automatique configuree
    When je consulte le dashboard "API syncs"
    Then la carte de la source affiche :
      | Element | Format |
      | Badge | "Auto" avec icone horloge |
      | Next sync | "Next: Tomorrow at 02:00" |
```

**FRs couverts :** FR32 (enrichi), FR42 (enrichi)

**Event Storming Reference:** Input Mapping BC - Commande "Parametrer la repetition de la synchronisation"

---

## Story 4.3 : Mode diagnostic live API

> Ancienne Story 3.3

As a **Admin Interne VDM**,
I want **tester une API externe en temps reel avec preview des donnees et erreurs**,
So that **je diagnostique rapidement les problemes de connexion ou de format avant de configurer le mapping**.

**UI Reference:** [3.3 - Mode diagnostic live API/](docs/features/bmme/ui/3.3%20-%20Mode%20diagnostic%20live%20API/)

**Acceptance Criteria:**

```gherkin
Feature: Mode diagnostic live API

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "External sources > API Diagnostic"

  # -- Cas nominaux --

  Scenario: Acceder au mode diagnostic
    When je clique sur "API Diagnostic" dans le menu
    Then je vois un formulaire avec :
      | Champ | Description |
      | API URL | Champ texte pour l'URL de l'API |
      | Method | Dropdown (GET, POST, PUT, DELETE) |
      | Headers | Zone key-value pour les headers |
      | Body | Zone de texte pour le body (si POST/PUT) |
      | Bouton | "Send request" |

  Scenario: Envoyer une requete de test
    Given j'ai saisi une URL API valide et les headers d'authentification
    When je clique sur "Send request"
    Then le systeme envoie la requete a l'API
    And affiche la reponse dans un panneau "Response" :
      | Element | Format |
      | Status | Code HTTP (200, 404, 500...) avec couleur |
      | Headers | Liste des headers de reponse |
      | Body | Reponse JSON/XML avec coloration syntaxique |
      | Time | Temps de reponse (ex: "234ms") |

  Scenario: Preview des donnees avec coloration syntaxique
    Given la reponse API est un JSON
    Then le body est affiche avec coloration syntaxique
    And les clefs JSON sont cliquables pour copier le path
    And je peux rechercher dans le body (Ctrl+F)

  Scenario: Detection automatique des champs disponibles
    Given la reponse API contient des donnees
    When je clique sur "Analyze structure"
    Then le systeme extrait la liste des champs :
      | Champ | Type | Exemple |
      | title | string | "The Dark Knight" |
      | year | number | 2008 |
      | genres | array | ["Action", "Drama"] |
    And je peux voir les champs disponibles pour le mapping

  # -- Cas alternatifs --

  Scenario: Ajout d'un header personnalise
    When je clique sur "Add header"
    Then une nouvelle ligne key-value apparait
    And je peux saisir le nom et la valeur du header

  Scenario: Sauvegarde des parametres de test
    When je clique sur "Save as preset"
    And je saisis un nom de preset
    Then les parametres sont sauvegardes
    And je peux les recharger plus tard

  # -- Cas d'erreur --

  Scenario: Erreur de connexion API
    Given j'ai saisi une URL invalide ou inaccessible
    When je clique sur "Send request"
    Then un message d'erreur s'affiche :
      | Code | Message |
      | TIMEOUT | "Connection timeout after 30s" |
      | DNS | "Could not resolve host" |
      | 401 | "Authentication failed - check your credentials" |
      | 403 | "Access denied - insufficient permissions" |

  Scenario: Reponse non-JSON
    Given l'API retourne du HTML au lieu de JSON
    Then un message d'avertissement s'affiche
    And le body brut est affiche sans coloration

  # -- Cas limites --

  Scenario: Reponse volumineuse
    Given l'API retourne plus de 1000 enregistrements
    Then la reponse est paginee ou tronquee
    And un message indique "Showing first 100 records"
```

**FRs couverts :** FR34

---

## Story 4.4 : Configuration des sources par champ (Metadata fields)

> Ancienne Story 3.6

As a **Admin Interne VDM**,
I want **configurer la source par defaut et le verrouillage de source pour chaque champ de metadonnee**,
So that **les donnees proviennent de la bonne source et ne sont pas ecrasees accidentellement**.

**UI Reference:** [3.6 - Definition de Default source & Lock source/Frame 2761.png](docs/features/bmme/ui/3.6%20-%20Definition%20de%20Default%20source%20%26%20Lock%20source/Frame%202761.png)

**Note :** La vue detaillee d'un champ avec "All values" (multi-source) et "History" fait partie de l'**Epic 8** (Tracabilite et Historique des Metadonnees).

**Acceptance Criteria:**

```gherkin
Feature: Metadata fields - Configuration des sources par champ

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "Inventory settings"

  # -- Cas nominaux --

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

  Scenario: Ouverture du panneau de detail d'un champ
    When je clique sur le nom du champ "Original title"
    Then le panneau de detail s'ouvre
    And la section "All values" affiche la liste des sources avec les colonnes Source, Value et Last sync

  Scenario: Affichage des valeurs par source dans le panneau de detail
    When je clique sur le nom du champ "Original title"
    Then chaque source configuree apparait dans la section "All values"
    And la source definie comme Default source est mise en evidence
    And la source verrouillee affiche l'icone cadenas

  Scenario: Affichage de la section History dans le panneau de detail
    When je clique sur le nom du champ "Original title"
    Then la section "History" affiche le journal des modifications
    And chaque entree indique l'action effectuee, la source concernee et la date

  Scenario: Affichage d'une source jamais synchronisee dans le panneau de detail
    Given la source "MovieLibrary" n'a jamais ete synchronisee pour le champ "Original title"
    When je clique sur le nom du champ "Original title"
    Then la source "MovieLibrary" affiche "Never synced" dans la colonne Last sync

  Scenario: Affichage du tableau "Title fields"
    When je clique sur "Title & Contents"
    Then je vois le tableau "Title fields" avec les colonnes :
      | Colonne | Description |
      | Field | Nom du champ (ISAN-Id, HDR, Catalog Type, Original Title, etc.) + tagname |
      | Type | Badge colore (number, date, string, CountryCode, LocaleCode, etc.) |
      | Level | "title", "season" ou "episode" |
      | Default source | Dropdown avec la source actuelle (Unity, mediaspot, etc.) |
      | Lock | Icone cadenas pour Lock source (actif/inactif) |
    And un bouton "Add" permet d'ajouter un nouveau champ
    And un bouton "Export" permet d'exporter la configuration
    And la pagination affiche "1 - 51 of X" avec selecteur "20 per page"

  Scenario: Configurer la Default source d'un champ
    Given je suis sur le tableau "Title fields"
    When je clique sur le dropdown "Default source" d'un champ (ex: "Original Title")
    Then je vois les options de sources disponibles :
      | Source |
      | Unity |
      | mediaspot |
      | IMDb |
      | MovieLibrary |
    When je selectionne "Unity"
    Then la Default source est mise a jour immediatement
    And les champs qui n'ont pas ete modifies manuellement seront mis a jour avec la valeur Unity a la prochaine synchronisation
    And les champs deja modifies manuellement conservent leur valeur actuelle

  Scenario: Activer Lock source sur un champ
    Given je suis sur le tableau "Title fields"
    When je clique sur l'icone cadenas d'un champ (ex: "OAR")
    Then le cadenas devient actif (icone remplie/coloree)
    And la source ne pourra plus etre changee pour ce champ
    And les gestionnaires de catalogue verront un cadenas sur ce champ dans l'UI de metadonnees

  Scenario: Desactiver Lock source sur un champ
    Given un champ a Lock source active
    When je clique a nouveau sur l'icone cadenas
    Then le cadenas devient inactif (icone vide/grisee)
    And la source peut a nouveau etre modifiee

  Scenario: Lock source actif - changement de source bloque
    Given le Lock source est active sur le champ "Original title"
    Then la source alimentant ce champ ne peut pas etre modifiee
    And la configuration de la Default source reste accessible dans les parametres du champ

  Scenario: Menu contextuel des actions sur un champ
    Given je suis sur le tableau "Title fields"
    When je survole une ligne et clique sur le menu
    Then un menu contextuel s'affiche avec :
      | Action |
      | Edit |
      | Duplicate |
      | Delete |

  Scenario: Affichage du statut verrouille dans l'UI de metadonnees (cote Gestionnaire)
    Given le champ "OAR" a Lock source active
    When un Gestionnaire de catalogue consulte ce champ sur un Title
    Then une icone cadenas est affichee a cote du champ
    And le selecteur de source est desactive (non modifiable par l'utilisateur)

  # -- Cas alternatifs --

  Scenario: Filtrage du tableau par Level
    When je selectionne "Episode" dans le filtre "Level"
    Then seuls les champs de niveau Episode sont affiches dans le tableau

  Scenario: Filtrage du tableau par Current source
    When je selectionne "Unity" dans le filtre "Current source"
    Then seuls les champs dont la source actuelle est Unity sont affiches

  Scenario: Combinaison des filtres Level et Current source
    When je selectionne "Title" dans le filtre "Level"
    And je selectionne "IMDb" dans le filtre "Current source"
    Then seuls les champs de niveau Title dont la source actuelle est IMDb sont affiches

  Scenario: Export de la configuration des champs
    When je clique sur le bouton "Export"
    Then un fichier CSV/Excel est telecharge contenant la configuration des champs affiches

  # -- Cas d'erreur --

  Scenario: Acces refuse pour un role non habilite
    Given je suis connecte avec le role "Gestionnaire Catalogue"
    When j'accede a "Inventory settings > Metadata fields"
    Then l'acces m'est refuse (cf. matrice ACL FR46/FR47)
    And le menu est masque + page 403
```

**FRs couverts :** FR75, FR76, FR77

---

## Story 4.5 : Editeur visuel de mappings - Correspondances de champs

> Ancienne Story 3.5

As a **Admin Interne VDM**,
I want **configurer visuellement les correspondances entre les champs d'une source externe et les champs mediaspot, incluant les transformations et correspondances d'enums**,
So that **je n'ai pas besoin de modifier du code pour corriger un mapping ou ajouter des transformations**.

**UI Reference:** [3.4, 3.5 - Editeur visuel de mappings/](docs/features/bmme/ui/3.4%2C%203.5%20-%20%C3%89diteur%20visuel%20de%20mappings%2C%20Configuration%20des%20Formatting%20et%20Mapping%20options/)

**Acceptance Criteria:**

```gherkin
Feature: Editeur visuel de mappings - Correspondances de champs

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a un mapping existant (ex: "External sources > Mappings > Unity")

  # -- Cas nominaux --

  # --- Vue des mappings ---

  Scenario: Affichage de la vue hierarchique des mappings
    When je clique sur "Unity" dans la section Mappings
    Then je vois la page "Unity" avec :
      | Element | Description |
      | Header | "Unity" avec compteur "X/Y fields mapped" |
      | Onglets | "Configuration" et "Mappings" |
      | Boutons | "Test API" et "Save" |
    And l'onglet "Mappings" affiche les champs en structure arborescente

  Scenario: Liste des champs avec filtres
    Given je suis sur l'onglet "Mappings"
    Then je vois :
      | Element | Description |
      | Recherche | Champ "Rechercher un champ" |
      | Toggle | "Mapped fields only" pour filtrer |
    And les champs sont affiches en structure arborescente (JSON-like)

  Scenario: Structure des champs simples a mapper
    Given je suis sur la page "Unity mappings"
    Then je vois les champs simples :
      | Niveau | Exemple |
      | Source tagname | artistCode, catalog, originCountry |
      | Source type | string, number |
      | mediaspot tagname | artistCode, catalog, originCountry ou "unused" si non mappe |
      | mediaspot type | string, number |
      | indication de localisation si le champ est un champ localisable | localized |

  Scenario: Structure des champs complexes a mapper
    Given je suis sur la page "Unity mappings"
    Then je vois les champs complexes organises hierarchiquement :
      | Niveau | Exemple |
      | Collapse / Expand | accordion afin d'ouvrir la hierarchie de l'objet |
      | Source tagname | artistCode, catalog, originCountry |
      | Source type | object |
    And je vois les enfants de cet objet sous la forme de champs simples

  # --- Configuration des champs ---

  Scenario: Ouvrir la modale "Field mapping settings"
    When je clique sur un champ (ex: "productionYear")
    Then une modale "Field mapping settings" s'ouvre
    And je vois :
      | Element | Description |
      | Toggle actif | Switch ON/OFF pour activer le mapping |
      | Nom du champ | "productionYear" avec badge de type (date) |
      | Selecteur cible | Dropdown pour choisir le champ mediaspot cible |

  Scenario: Configurer le champ cible mediaspot
    Given la modale "Field mapping settings" est ouverte
    When je clique sur le selecteur de champ cible
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
    Then un lien "+ add formatting" apparait
    When je clique sur "+ add formatting"
    Then je peux configurer une transformation :
      | Transformation | Effet |
      | split | Decoupe une chaine en tableau |
      | trim | Supprime les espaces |
      | join | Fusionne un tableau en chaine |
      | format | Applique un format (dates, etc.) |

  # --- Scripts Liquid pour formatting ---

  Scenario: Ouvrir l'editeur de script Liquid
    Given je suis dans la modale "Field mapping settings"
    When je clique sur "+ add formatting"
    And je selectionne "Custom Liquid"
    Then un editeur de code s'ouvre avec coloration syntaxique
    And un champ "Preview input" affiche la derniere valeur sauvegardee du champ
    And un champ "Preview output" affiche le resultat en temps reel

  Scenario: Ecrire un script Liquid avec previsualisation temps reel
    Given l'editeur Liquid est ouvert
    And le champ source a une valeur sauvegardee (ex: "John Doe, Jane Doe")
    When je saisis le script : `{{ value | split: ", " | first }}`
    Then la previsualisation s'affiche en temps reel :
      | Input | Output |
      | "John Doe, Jane Doe" | "John Doe" |
    And l'output est mis a jour a chaque modification du script

  # --- Value mappings (correspondances d'enums) ---

  Scenario: Ajouter des Value mappings (correspondances d'enums)
    Given la modale "Field mapping settings" est ouverte pour un champ avec enums
    When je clique sur "+ add mappings"
    Then une section "Edit value mappings" apparait avec :
      | Colonne | Description |
      | input | Valeur source (ex: "Guerre", "Comedie", "Science-Fiction") |
      | arrow | Fleche de transformation |
      | output | Dropdown avec valeurs mediaspot cibles |
      | delete | Bouton supprimer |
    And je peux ajouter des lignes avec "Add row +"
    And je peux supprimer le mapping avec "Remove mapping"

  # --- Mapping 1 champ vers N champs (duplication) ---

  Scenario: Mapper un champ source vers plusieurs champs mediaspot
    Given je suis dans la modale "Field mapping settings" pour le champ "fullName"
    When je clique sur "+ Add another target"
    Then un second selecteur de champ cible apparait
    And je peux configurer des transformations differentes pour chaque cible :
      | Cible | Transformation |
      | firstName | `{{ value | split: " " | first }}` |
      | lastName | `{{ value | split: " " | last }}` |

  # --- Indicateurs et sauvegarde ---

  Scenario: Indicateur de formatting/mapping actives
    Given un champ a des transformations configurees
    Then la vue principale affiche :
      | Indicateur | Signification |
      | "formatting enabled" | Une transformation est configuree |
      | "mapping enabled" | Des correspondances d'enums sont configurees |
    And une icone permet d'editer rapidement

  Scenario: Sauvegarder les modifications
    When je clique sur "Save" dans la modale ou la page principale
    Then les modifications sont sauvegardees
    And le systeme valide le mapping contre un echantillon de donnees

  # -- Cas d'erreur --

  Scenario: Validation du script Liquid - erreur de syntaxe
    Given je saisis un script Liquid invalide (erreur de syntaxe)
    Then un message d'erreur s'affiche : "Liquid syntax error: ..."
    And la ligne en erreur est mise en evidence en rouge
    And le bouton "Save" reste desactive

  Scenario: Validation du type de sortie du script
    Given le champ mediaspot cible est de type "number"
    And mon script Liquid retourne une chaine "abc"
    Then un avertissement s'affiche : "Output type mismatch: expected number, got string"
    And je dois corriger le script ou forcer la sauvegarde avec warning

  Scenario: Value mapping obligatoire si le champ cible est un enum
    Given je mappe un champ source vers un champ mediaspot de type "enum" (ex: genres)
    And je n'ai pas configure de value mapping
    When je tente de sauvegarder
    Then un message d'erreur s'affiche : "Value mapping required for enum fields"
    And le bouton "Save" reste desactive

  Scenario: Acces refuse pour un role non habilite
    Given je suis connecte avec le role "Gestionnaire Catalogue"
    When j'accede a "External sources > Mappings"
    Then l'acces m'est refuse : Menu masque + 403
```

**FRs couverts :** FR36, FR72, FR73, FR74

**Event Storming Reference:** Input Mapping BC - Commandes "Definir le champ comme actif", "Associer un champ de mediaspot", "Ajouter une Formatting option", "Ajouter un Value mapping", "Coder le script Liquid", "Sauvegarder le mapping du champ"

---

## Story 4.6 : Service de validation des inputs (Backend)

> Ancienne Story 3.9 (DF-11414)

As a **Systeme**,
I want **valider les fichiers et reponses API avant traitement**,
So that **les donnees corrompues ou mal formatees sont rejetees avec des messages d'erreur clairs**.

**Note :** Cette story est purement backend/systeme et n'a pas de maquette UI associee.

**Acceptance Criteria:**

```gherkin
Feature: Service de validation des inputs

  # --- Validation des fichiers ---

  Scenario: Validation et extraction d'un fichier JSON
    Given un fichier JSON est importe
    When le service de validation recoit le fichier
    Then il verifie la syntaxe JSON
    And si valide, il extrait les donnees
    And il supprime le fichier temporaire apres extraction
    And il renvoie les donnees aux services consommateurs

  Scenario: Validation et extraction d'un fichier CSV
    Given un fichier CSV est importe
    When le service de validation recoit le fichier
    Then il detecte le separateur (virgule, point-virgule, tab)
    And il parse les headers et les lignes
    And si valide, il renvoie les donnees structurees

  Scenario: Validation et extraction d'un fichier XML
    Given un fichier XML est importe
    When le service de validation recoit le fichier
    Then il verifie que le XML est bien forme
    And il parse la structure hierarchique
    And si valide, il renvoie les donnees structurees

  Scenario: Rejet d'un fichier au format incorrect
    Given un fichier est importe
    When le format ne correspond pas au mapping configure
    Then le service renvoie une erreur : "Format mismatch"
    And le fichier est supprime
    And une notification est envoyee aux consommateurs

  # --- Validation des APIs ---

  Scenario: Validation d'une reponse API OK
    Given une API externe est appelee
    When la reponse HTTP est 200 OK
    And le body contient des donnees valides
    Then les donnees sont extraites et renvoyees aux services consommateurs

  Scenario: Gestion d'une reponse API en erreur
    Given une API externe est appelee
    When la reponse HTTP est une erreur (4xx, 5xx)
    Then le service capture le code et le message d'erreur
    And il notifie les consommateurs avec le detail de l'erreur
    And l'erreur est loggee pour diagnostic

  Scenario: Gestion d'un timeout API
    Given une API externe est appelee
    When le delai de reponse depasse le timeout configure
    Then le service annule la requete
    And il notifie les consommateurs : "API timeout after X seconds"

  # --- Notification aux consommateurs ---

  Scenario: Notification d'erreur aux services consommateurs
    Given une erreur de validation survient
    Then le service publie un evenement d'erreur avec :
      | Champ | Valeur |
      | source | Nom de la source (Unity, fichier, etc.) |
      | errorType | Type d'erreur (format, timeout, parsing) |
      | errorMessage | Message detaille |
      | timestamp | Date/heure de l'erreur |
    And les services consommateurs recoivent la notification
```

**FRs couverts :** FR73 (enrichi), FR78 (enrichi)

**Event Storming Reference:** Input Validation BC - Flux complet de validation fichier et API
