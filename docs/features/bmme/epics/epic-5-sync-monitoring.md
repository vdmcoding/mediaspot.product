<!-- TRACABILITE: Ancien Epic 3 - Partie B (Monitoring et Sync) -->
<!-- JIRA: DF-11421 -->

# Epic 5 : Monitoring et Synchronisation

**Marc peut** monitorer les synchronisations en temps reel, diagnostiquer les erreurs, et relancer les synchros en echec. Le systeme synchronise automatiquement les donnees depuis les sources externes.

**FRs couverts :** FR7, FR8, FR21, FR31, FR32, FR33, FR38, FR39, FR42, FR78, FR79, FR80

**Valeur livree :** Marc voit en temps reel le statut de chaque synchronisation, identifie les erreurs avec logs detailles, et relance les synchros en echec en 1 clic avec suivi de progression.

---

## Story 5.1 : Dashboard de monitoring des synchronisations

> Ancienne Story 3.1

As a **Admin Interne VDM**,
I want **voir un dashboard avec le statut temps reel de toutes les synchronisations externes**,
So that **je detecte immediatement les problemes sans attendre les plaintes clients**.

**UI Reference:** [3.1 - Dashboard de monitoring des synchronisations/](docs/features/bmme/ui/3.1%20-%20Dashboard%20de%20monitoring%20des%20synchronisations/)

**Acceptance Criteria:**

```gherkin
Feature: Dashboard de monitoring des synchronisations

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "External sources"

  # -- Cas nominaux --

  # --- Vue API syncs ---

  Scenario: Navigation vers les synchronisations API
    When je clique sur "API syncs" dans la sidebar
    Then je vois la page "Synchronizations" avec :
      | Element      | Description                               |
      | Header       | "Synchronizations - X in the last month"  |
      | Cartes sources | Unity, Iron, IMDb, MovieLibrary, VDM C  |
      | Tableau      | Liste des synchronisations paginee        |

  Scenario: Affichage des cartes sources API en haut du dashboard
    Given je suis sur "API syncs"
    Then je vois 5 cartes sources : Unity, Iron, IMDb, MovieLibrary, VDM C
    And chaque carte affiche :
      | Element       | Format                                                                      |
      | Nom de la source | "Unity", "Iron", etc.                                                    |
      | Badge statut  | Vert ou Rouge selon etat                                         |
      | Last sync     | Temps relatif (ex: "2h. ago") avec icone                                |
      | Last week     | "X syncs" avec compteurs syncs/erreurs (ex: "12 0" ou "12 2")             |

  Scenario: Affichage du tableau des synchronisations API
    Given je suis sur "API syncs"
    Then je vois un tableau pagine avec les colonnes :
      | Colonne | Description                                       |
      | Source  | Nom de la source (Unity, Iron, IMDb, VDM C)       |
      | Date    | Date et heure (format: 21/12/2026 12:25)          |
      | Trigger | System (automatique) ou John Doe (manuel)   |
      | Errors  | "None" (vert) ou "X errors" (rouge)               |
      | Updates | "X titles - Y fields"                             |
    And les lignes avec erreurs affichent une icone pour relancer

  # --- Vue File imports ---

  Scenario: Navigation vers les imports fichiers
    When je clique sur "File importer" dans la sidebar
    Then je vois la page "File imports" avec :
      | Element        | Description                                              |
      | Header         | "File imports - X in the last month"                     |
      | Cartes mappings | Liste des mappings fichiers configures (ex: test-mappings, ROD-july-2026) |
      | Bouton         | "New import" pour importer un nouveau fichier            |
      | Tableau        | Liste des imports paginee                                |

  Scenario: Affichage des cartes mappings fichiers
    Given je suis sur "File importer"
    Then je vois les cartes des mappings fichiers configures
    And chaque carte affiche :
      | Element           | Format                                 |
      | Nom du mapping    | "test-mappings", "ROD-july-2026", etc. |
      | Periode           | "last week"                            |
      | Compteur imports  | "X imports"                            |
      | Compteur erreurs  | Nombre d'erreurs (ou 0)                |

  Scenario: Affichage du tableau des imports fichiers
    Given je suis sur "File importer"
    Then je vois un tableau pagine avec les colonnes :
      | Colonne | Description                              |
      | File    | Nom du fichier importe                   |
      | Date    | Date et heure de l'import                |
      | Mapping | Nom du mapping utilise (test-mapping...) |
      | Trigger | John Doe (utilisateur qui a importe)  |
      | Errors  | "Loaded" (vert) ou "X errors" (rouge)    |
      | Entries | Nombre d'entrees traitees                |
      | Update  | "X titles" mis a jour                    |

  # --- Fonctionnalites communes ---

  Scenario: Filtrage du tableau par source ou mapping
    When je clique sur le filtre "Source" (API) ou "Mapping" (fichiers)
    And je selectionne un element
    Then seuls les elements correspondants sont affiches

  Scenario: Filtrage du tableau via un clic sur une card source
    When je clique sur la card "Unity"
    Then seules les synchronisations Unity sont affichees
    And un badge "Unity x" apparait dans le tableau pour indiquer le filtre actif

  Scenario: Filtrage par erreurs uniquement
    When j'active le toggle "Errors only"
    Then seuls les elements avec erreurs sont affiches

  Scenario: Export des donnees
    When je clique sur le bouton "Export"
    Then les donnees filtrees sont exportees au format CSV/Excel

  Scenario: Pagination du tableau
    Given il y a plus de 20 elements
    Then la pagination affiche "1 - 20 of X" en bas du tableau
    And je peux naviguer entre les pages
    And je peux choisir "20 per page" via un selecteur

  # -- Cas d'erreur --

  Scenario: Chargement du dashboard impossible
    Given le service de monitoring est indisponible
    When j'accede a "External sources > Synchronizations"
    Then un message d'erreur s'affiche indiquant que les donnees ne peuvent pas etre chargees

  Scenario: Acces refuse (role non habilite)
    Given je suis connecte avec le role "Gestionnaire Catalogue"
    When j'accede a "External sources > Synchronizations"
    Then l'acces m'est refuse (cf. matrice ACL FR46/FR47)
    And je vois une page 403 avec un message "Acces refuse"

  # -- Cas limites --

  Scenario: Source jamais synchronisee
    Given une source est configuree mais n'a jamais ete synchronisee
    Then sa carte affiche un etat neutre pour "Last sync"
    And la carte affiche "Never" en dessous de Last sync
```

**FRs couverts :** FR31, FR32

---

## Story 5.2 : Details de synchronisation et erreurs typees

> Ancienne Story 3.2

As a **Admin Interne VDM**,
I want **consulter le detail d'une synchronisation avec les erreurs typees par titre et par champ**,
So that **je diagnostique rapidement la cause d'un probleme et je sais exactement quoi corriger**.

**UI Reference:** [3.2, 3.7 - Logs detailles & friendly des synchronisations/](docs/features/bmme/ui/3.2%2C%203.7%20-Logs%20d%C3%A9taill%C3%A9s%20%26%20friendly%20des%20synchronisations%2C%20Affichage%20des%20erreurs%20typ%C3%A9es%20lors%20des%20synchronisations/)

**Acceptance Criteria:**

```gherkin
Feature: Details de synchronisation et erreurs typees

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "External sources > Synchronizations"

  # -- Cas nominaux --

  Scenario: Acceder au detail d'une synchronisation
    Given je vois une ligne de synchronisation dans le tableau
    When je clique sur cette ligne
    Then une page/modale de detail s'ouvre avec :
      | Section | Contenu |
      | Header | Source, Date, Trigger, Statut global |
      | Resume | "X titles - Y fields - Z errors" |
      | Liste titres | Accordeons par titre synchronise |

  Scenario: Affichage des titres synchronises
    Given je suis sur le detail d'une synchronisation
    Then je vois la liste des titres impactes :
      | Element | Description |
      | Thumbnail | Image du titre |
      | Nom | Titre original |
      | ID externe | ID dans la source externe |
      | Statut | "X fields - Y errors" ou "X fields - No errors" |

  Scenario: Detail par titre - champs synchronises
    Given je clique sur un titre pour deplier l'accordeon
    Then je vois la liste des champs :
      | Colonne | Description |
      | Field | Nom du champ (Original title, Genre, etc.) |
      | Enabled | Toggle actif/inactif |
      | Old value | Ancienne valeur (si modification) |
      | New value | Nouvelle valeur |
      | Status | Synced / Error / Unchanged |

  Scenario: Erreurs typees par champ
    Given un champ est en erreur
    Then je vois le type d'erreur :
      | Type | Description |
      | Wrong data format | Format de donnee incorrect |
      | Formatting failed | Echec de la transformation |
      | Mapping missing | Pas de correspondance definie |
      | Validation error | Donnee invalide |
    And un message detaille explique l'erreur

  Scenario: Filtrage par statut dans le detail
    Given je suis sur le detail d'une synchronisation
    When j'active le filtre "Errors only"
    Then seuls les titres avec erreurs sont affiches
    And seuls les champs en erreur sont deplies

  # -- Cas alternatifs --

  Scenario: Synchronisation sans erreur
    Given je clique sur une synchronisation sans erreur
    Then le resume affiche "0 errors"
    And tous les champs affichent le statut "Synced"

  Scenario: Copier les details d'une erreur
    Given un champ affiche une erreur
    When je clique sur l'icone "copy"
    Then les details de l'erreur sont copies dans le presse-papier
    And un toast confirme "Error details copied"

  # -- Cas d'erreur --

  Scenario: Detail de synchronisation introuvable
    Given je clique sur une synchronisation ancienne
    When les donnees de detail ont ete purgees
    Then un message indique "Details no longer available"
```

**FRs couverts :** FR33, FR78

---

## Story 5.3 : Resynchronisation manuelle en 1 clic

> Ancienne Story 3.7

As a **Admin Interne VDM**,
I want **declencher une resynchronisation manuelle depuis une synchronisation precedente avec suivi de progression**,
So that **je rattrape les donnees apres avoir corrige un probleme de mapping**.

**UI Reference:** [3.8 - Resynchronisation manuelle en 1 clic/](docs/features/bmme/ui/3.8%20-%20Resynchronisation%20manuelle%20en%201%20clic/)

**Acceptance Criteria:**

```gherkin
Feature: Resynchronisation manuelle en 1 clic

  Background:
    Given je suis connecte en tant qu'Admin Interne VDM
    And j'accede a "External sources > Synchronizations"

  # -- Cas nominaux --

  Scenario: Acceder a la resync depuis le tableau des synchronisations
    Given une synchronisation passee a des erreurs
    When je clique sur l'icone refresh sur la ligne de cette synchronisation
    Then une modale "Refresh synchronization" s'ouvre

  Scenario: Interface de la modale "Refresh synchronization"
    Given la modale "Refresh synchronization" est ouverte
    Then je vois :
      | Element | Description |
      | Header | "Refresh synchronization" |
      | Info source | "Unity" + date/heure + trigger (System ou John Doe) |
      | Resume | "X titles - Y fields - Z errors" |
      | Liste des titres | Accordeons avec thumbnail, nom, ID externe |
    And chaque titre affiche "X fields - Y errors" ou "X fields - No errors"
    And un bouton "Refresh sync" en bas de la modale

  Scenario: Declencher la resynchronisation
    Given la modale "Refresh synchronization" est ouverte
    When je clique sur "Refresh sync"
    Then le bouton change en "Sync in progress..."
    And les titres commencent a se mettre a jour un par un

  Scenario: Suivi de la progression en temps reel
    Given une resync est en cours
    Then chaque titre affiche son statut :
      | Statut | Description |
      | "Syncing..." | Synchronisation en cours (texte grise) |
      | "Refreshed" (vert) | Synchronisation terminee avec succes |
      | "X errors" (rouge) | Synchronisation terminee avec erreurs |
    And les titres en attente restent avec leur statut initial

  Scenario: Resynchronisation terminee avec succes
    Given tous les titres ont ete resynchronises
    Then le bouton affiche "Refresh complete" (vert)
    And un bouton "Done" apparait pour fermer la modale
    And le compteur d'erreurs global est mis a jour (ex: "7 errors" vers "2 errors")

  Scenario: Mise a jour des compteurs apres resync
    Given la resync est terminee
    Then les compteurs par titre sont mis a jour :
      | Avant | Apres |
      | "5 fields - 2 errors" | "Refreshed - 5 fields - No errors" |
    And le resume global reflete le nouveau total d'erreurs

  Scenario: Fermer la modale et voir les resultats
    When je clique sur "Done"
    Then la modale se ferme
    And le tableau des synchronisations montre une nouvelle ligne avec la resync
    And le trigger indique "John Doe" (ou l'utilisateur connecte)

  # --- Synchronisation partielle ---

  Scenario: Synchronisation partielle - certains champs en erreur
    Given une synchronisation est lancee
    When certains champs sont valides et d'autres en erreur
    Then les champs valides sont mis a jour normalement
    And les champs en erreur ne sont PAS mis a jour
    And les champs en erreur sont marques avec le type d'erreur
    And la synchronisation est marquee comme "Partial" dans le tableau

  Scenario: Affichage d'une synchronisation partielle dans le tableau
    Given une synchronisation s'est terminee partiellement
    Then la ligne du tableau affiche :
      | Colonne | Valeur |
      | Errors | "X errors" (badge orange/rouge) |
      | Status | Badge "Partial" (jaune) |
    And l'icone refresh permet de relancer uniquement les champs en erreur

  Scenario: Relancer une synchronisation partielle
    Given une synchronisation est marquee "Partial"
    When je clique sur refresh pour relancer
    Then seuls les champs en erreur sont resynchronises
    And les champs deja synchronises ne sont pas re-traites
    And si tous les champs reussissent, le statut passe a "Complete"

  # -- Cas d'erreur --

  Scenario: Echec complet de la resync d'un titre (erreur API)
    Given la resync est en cours
    When le service retourne une erreur pour le titre "Stranger Things #123456"
    Then le titre affiche un statut d'echec distinct de "X errors"
    And la resync continue pour les titres suivants

  Scenario: Interruption du service pendant la resync
    Given la resync est en cours avec 3 titres deja "Refreshed"
    When le service devient indisponible
    Then les titres en attente restent dans leur statut initial
    And un message d'erreur indique que la resync a ete interrompue

  Scenario: Acces refuse a la resync pour un role non habilite
    Given je suis connecte avec le role "Gestionnaire Catalogue"
    Then l'icone refresh n'est pas visible dans le tableau des synchronisations

  # -- Cas limites --

  Scenario: Resync avec un grand nombre de titres
    Given la synchronisation source contient plus de 100 titres
    When je clique sur "Refresh sync"
    Then la liste des titres est scrollable pendant la progression
    And le statut de chaque titre est visible au fur et a mesure
```

**FRs couverts :** FR38, FR39, FR79, FR80

**Event Storming Reference:** Synchro BC - Commande "Relancer une synchronisation", evenement "La synchronisation a ete marquee comme partielle"

---

## Story 5.4 : Synchronisation automatique des systemes externes (Backend)

> Ancienne Story 3.8

As a **Systeme**,
I want **synchroniser les metadonnees Title depuis VDM Connect, Unity, Iron et MovieLibrary**,
So that **les donnees sont centralisees dans mediaspot comme source de verite**.

**Note :** Cette story est purement backend/systeme et n'a pas de maquette UI associee.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation automatique des systemes externes

  # -- Cas nominaux --

  Scenario: Import depuis VDM Connect (migration)
    Given VDM Connect contient des metadonnees Title
    When la synchronisation VDM Connect s'execute
    Then les metadonnees sont importees dans mediaspot
    And le mapping VDM Connect vers mediaspot est applique
    And l'historique enregistre "Source: VDM Connect"

  Scenario: Import depuis Unity API
    Given Unity contient des metadonnees pour StudioCanal
    When la synchronisation Unity s'execute selon le planning
    Then les nouvelles donnees sont importees
    And les donnees existantes sont mises a jour si modifiees
    And les conflits sont geres selon la config Default source

  Scenario: Import depuis Iron
    Given Iron contient des metadonnees Title
    When la synchronisation Iron s'execute selon le planning
    Then les nouvelles donnees sont importees dans mediaspot
    And les donnees existantes sont mises a jour si modifiees
    And le mapping Iron vers mediaspot est applique
    And l'historique enregistre "Source: Iron"

  Scenario: Import depuis MovieLibrary
    Given MovieLibrary contient des metadonnees Title
    When la synchronisation MovieLibrary s'execute selon le planning
    Then les nouvelles donnees sont importees dans mediaspot
    And les donnees existantes sont mises a jour si modifiees
    And le mapping MovieLibrary vers mediaspot est applique
    And l'historique enregistre "Source: MovieLibrary"

  Scenario: Enregistrement de la sync dans le dashboard de monitoring
    When une synchronisation automatique s'execute pour n'importe quelle source
    Then une nouvelle entree est creee dans le tableau de Story 5.1
    And le trigger affiche est "System"
    And les compteurs "fields" et "errors" refletent les resultats

  Scenario: Import d'un titre nouveau absent de mediaspot
    Given la source contient un titre qui n'existe pas encore dans mediaspot
    When la synchronisation s'execute
    Then le titre est cree dans mediaspot
    And les champs mappes sont renseignes avec les valeurs source

  # --- Gestion de la synchronisation partielle ---

  Scenario: Synchronisation partielle - traitement champ par champ
    Given une synchronisation est en cours
    When un champ est valide
    Then le champ est mis a jour dans mediaspot
    And l'historique enregistre la modification
    When un champ est en erreur (format, mapping, etc.)
    Then le champ n'est PAS mis a jour
    And l'erreur est enregistree avec le type et le message
    And le traitement continue sur les autres champs

  Scenario: Marquage d'une synchronisation comme partielle
    Given une synchronisation s'est terminee
    When au moins un champ est en erreur
    Then la synchronisation est marquee avec le statut "Partial"
    And le compteur d'erreurs est mis a jour
    And les champs en erreur sont identifiables pour resync future

  Scenario: Synchronisation de fichier - validation ligne par ligne
    Given un fichier avec plusieurs entrees est importe
    When une ligne est valide
    Then les donnees de cette ligne sont mises a jour
    When une ligne est invalide
    Then la ligne est ignoree et loggee en erreur
    And le traitement continue sur les lignes suivantes
    And le resultat final indique "X/Y entries processed"

  # -- Cas alternatifs --

  Scenario: Aucune modification detectee lors de la sync
    Given une source est synchronisee
    And aucune donnee n'a change depuis la derniere sync
    When la synchronisation s'execute
    Then aucun champ n'est mis a jour dans mediaspot
    And la sync est enregistree dans le dashboard avec "0 updates"

  Scenario: Champ avec Lock source - valeur non ecrasee
    Given le champ "Original title" a le Lock source active sur la source "Unity" (cf. Story 4.4)
    When la synchronisation Iron s'execute
    And Iron fournit une valeur differente pour "Original title"
    Then la valeur de "Original title" dans mediaspot reste inchangee
    And la sync enregistre que le champ a ete ignore (Lock source actif)

  Scenario: Conflit entre deux sources sur le meme champ
    Given le champ "productionYear" a "Unity" comme Default source
    And Unity fournit "2021" pour ce champ
    And Iron fournit "2019" pour ce meme champ
    When les deux synchronisations s'executent
    Then la valeur "2021" (Unity) est retenue dans mediaspot
    And l'historique enregistre les deux valeurs recues

  # -- Cas d'erreur --

  Scenario: Source externe indisponible lors du declenchement planifie
    Given la synchronisation Unity est planifiee
    When la source Unity est indisponible (timeout ou erreur 5xx)
    Then la sync est enregistree en erreur dans le dashboard (cf. Story 5.1)
    And une notification est envoyee selon le seuil configure

  Scenario: Champ source sans mapping configure
    Given le champ source "customField" n'a pas de correspondance definie dans l'editeur de mappings (cf. Story 4.5)
    When la synchronisation s'execute
    Then le champ est ignore et aucune valeur n'est importee
    And le champ est trace dans l'historique de la synchronisation avec le statut "disabled" et le message "Unmapped field"

  Scenario: Donnees malformees recues de la source
    Given la source retourne une valeur invalide pour un champ (ex: format date incorrect pour "productionYear")
    When la synchronisation s'execute
    Then le champ concerne est enregistre en erreur
    And les autres champs du titre sont synchronises normalement
    And l'erreur est visible dans le dashboard (cf. Story 5.1 - "X errors")

  # -- Cas limites --

  Scenario: Synchronisation d'un volume important de titres
    Given une source contient plusieurs milliers de titres
    When la synchronisation s'execute
    Then tous les titres sont traites dans un delai raisonnable
    And le dashboard reflete les resultats complets

  Scenario: Import initial VDM Connect (migration unique)
    Given VDM Connect est la source de migration initiale
    And mediaspot ne contient pas encore de donnees
    When la migration VDM Connect s'execute pour la premiere fois
    Then toutes les metadonnees existantes sont importees en masse
    And le mapping VDM Connect vers mediaspot est applique
    And l'historique enregistre chaque champ avec "Source: VDM Connect"

  Scenario: Synchronisation d'IMDb
    Given IMDb est configure comme source externe
    Then IMDb ne fait pas partie du cycle de synchronisation automatique
    And la synchronisation IMDb est declenchee on-demand uniquement
```

**FRs couverts :** FR7, FR8, FR21

**Event Storming Reference:** Synchro BC - Evenements "Les champs valides ont ete mis a jour", "Les champs en erreur ont ete marques en erreur", "La synchronisation a ete marquee comme partielle"
