<!-- TRACABILITE: Ancien Epic 5 -->
<!-- JIRA: DF-11137 -->

# Epic 9 : Traçabilité et Historique des Métadonnées

**Sophie peut** voir la source de chaque métadonnée, comparer les valeurs entre sources, et consulter l'historique des modifications.

**FRs couverts :** FR59, FR60, FR61, FR62, FR63, FR64, FR65

**Valeur livrée :** Sophie voit que le champ "director" vient d'Unity, peut déclencher une synchro manuelle avec preview Old → New, et consulte l'historique des changements (Source changed, Manual Edit, Periodic sync).

---

## Story 9.1 : Affichage de la source de chaque métadonnée

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

## Story 9.2 : Synchronisation manuelle depuis une source externe

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

## Story 9.3 : Preview des changements avant application

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

## Story 9.4 : Vue multi-source par métadonnée

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

## Story 9.5 : Historisation des modifications

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

## Story 9.6 : Catégorisation des types de modification

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

## Story 9.7 : Consultation de l'historique complet

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
