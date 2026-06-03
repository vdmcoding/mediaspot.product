---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - docs/features/full-qc-pad/prd.md
---

# Full QC PAD - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en épics et stories pour la feature **Full QC PAD** (Studiocanal), en décomposant les requirements du PRD en stories implémentables.

## Requirements Inventory

### Functional Requirements

FR0: La case "Order a Full QC before delivery" doit être visible et activable **uniquement par les utilisateurs dont le groupe possède l'ACL `Allows Full QC Request`**. L'ACL existe déjà dans la plateforme — aucune création nécessaire.
FR1: La page **Configure Your Basket** doit afficher une case à cocher "Order a Full QC before delivery" au niveau de la configuration de chaque item PAD individuellement.
FR2: Le texte d'aide de la case doit être : *"Check this option to request a quality control inspection before the file is delivered to the broadcaster. Applicable rates will apply."*
FR3: L'option Full QC doit être disponible pour tout profil PAD, sans restriction par broadcaster.
FR4: La case "Order a Full QC before delivery" doit être prise en compte par l'action **Duplicate configuration** (duplication de la configuration d'un item vers un nouvel item).
FR5: La case "Order a Full QC before delivery" doit être prise en compte par l'action **Apply configuration to all** (application de la configuration d'un item à tous les autres items du basket).
FR6: La page **Checkout** doit afficher en lecture seule, dans le résumé de chaque item, si le Full QC a été activé.
FR7: Lorsque la case est cochée pour un item, les 3 tasks de l'order Quality Check existante doivent être insérées dans le workflow de fabrication de cet item PAD avant sa livraison finale, avec le paramètre `FULL` ciblant l'asset GENERATED.
FR8: L'ordre d'insertion des tasks QC est : (1) File Native copy to outgoing storage → (2) ERP Work Order Push → (3) QualityCheck of object.
FR9: La task "QualityCheck of object" doit mettre la commande de l'item en pause en attente de décision.
FR10: L'équipe QC doit pouvoir valider l'asset GENERATED (statut ACCEPTED) via la tâche QualityCheck.
FR11: Si ACCEPTED, la commande de l'item reprend et procède à la livraison selon les modalités du profil PAD.
FR12: L'équipe QC doit pouvoir refuser l'asset GENERATED via la tâche QualityCheck.
FR13: En cas de refus QC, l'OWNER de la commande doit pouvoir Bypasser le refus (asset → statut Bypassed), déclenchant la livraison selon les modalités du profil.
FR14: En cas de refus QC sans Bypass, la commande de l'item doit passer en statut FAILED — aucune livraison.
FR15: Le résultat du QC (Accepted / Bypassed / Failed) doit être visible dans le détail de la commande PAD.
FR16: Pour un item sans Full QC coché, le workflow PAD standard s'exécute sans modification.
FR17: L'information Full QC (activé / non activé) doit être présente dans l'export Excel des orders pour permettre la réconciliation de facturation.
FR18: Lorsque le Full QC est activé sur un item PAD, la chaîne de caractères de l'order summary doit inclure la mention `With Full QC` pour permettre l'identification rapide dans le tableau de monitoring des orders.

### NonFunctional Requirements

NFR1: Les tasks QC ne sont insérées dans le workflow d'un item PAD que si la case a été cochée pour cet item à l'étape Configure Your Basket — les autres items de la même commande ne sont pas impactés.
NFR2: L'invocation des briques QC doit utiliser le paramètre `FULL` ciblant l'asset GENERATED de la commande PAD.
NFR3: Les briques Quality Check existantes sont réutilisées telles quelles — aucune duplication de logique (storage, notifications, IRIS).
NFR4: L'action Bypass est exclusivement réservée à l'OWNER de la commande.

### Additional Requirements

- Intégration IRIS (création du BT) : gérée par la task ERP Work Order Push existante — pas de développement spécifique sur l'intégration IRIS elle-même.
- Timeout QC : géré hors mediaspot via IRIS/labo — hors scope dev.
- Facturation : hors mediaspot via IRIS — hors scope dev.
- Pas de nouvelles notifications à développer : gérées par l'order Quality Check existante.

### FR Coverage Map

FR0  → Epic 1 / Story 1.1 — Visibilité conditionnée à l'ACL "Allows Full QC Request"
FR1  → Epic 1 / Story 1.1 — Checkbox "Order a Full QC" dans Configure Your Basket
FR2  → Epic 1 / Story 1.1 — Texte d'aide de la case
FR3  → Epic 1 / Story 1.1 — Disponible pour tout profil PAD
FR4  → Epic 1 / Story 1.1 — Duplicate configuration inclut Full QC
FR5  → Epic 1 / Story 1.1 — Apply configuration to all inclut Full QC
FR6  → Epic 1 / Story 1.1 — Résumé Full QC en lecture seule au Checkout
FR7  → Epic 1 / Story 1.2 — Injection des 3 tasks QC dans le workflow PAD
FR8  → Epic 1 / Story 1.2 — Ordre des tasks : Copy → ERP Push → QualityCheck
FR9  → Epic 1 / Story 1.2 — Mise en pause de la commande (QualityCheck of object)
FR10 → Epic 1 / Story 1.2 — Validation ACCEPTED par l'équipe QC
FR11 → Epic 1 / Story 1.2 — Reprise et livraison si ACCEPTED
FR12 → Epic 1 / Story 1.2 — Refus par l'équipe QC
FR13 → Epic 1 / Story 1.2 — Bypass du refus par l'OWNER (statut Bypassed + livraison)
FR14 → Epic 1 / Story 1.2 — Refus sans Bypass → commande FAILED
FR15 → Epic 1 / Story 1.2 — Résultat QC visible dans le détail de la commande
FR16 → Epic 1 / Story 1.1 — Workflow standard inchangé si case non cochée
FR17 → Epic 1 / Story 1.2 — Export Excel des orders inclut l'information Full QC
FR18 → Epic 1 / Story 1.2 — Order summary inclut "With Full QC" pour le monitoring

## Epic List

### Epic 1 : Full QC PAD — Commande de contrôle qualité avant livraison

Le Serviceur Studiocanal peut demander un Full QC sur un item PAD lors de sa configuration, et le système déclenche automatiquement le circuit QC avant la livraison.

#### Story 1.1 — Frontend : Case "Order a Full QC before delivery"
Ajout de la case à cocher dans Configure Your Basket, visible uniquement aux utilisateurs avec l'ACL `Allows Full QC Request`, avec intégration dans Duplicate configuration, Apply configuration to all, et affichage en lecture seule au Checkout.
**FRs :** FR0, FR1, FR2, FR3, FR4, FR5, FR6, FR16

---

## Epic 1 : Full QC PAD — Commande de contrôle qualité avant livraison

Le Serviceur Studiocanal peut demander un Full QC sur un item PAD lors de sa configuration, et le système déclenche automatiquement le circuit QC avant la livraison.

### Story 1.1 : Ajout de la case "Order a Full QC before delivery" dans la configuration du basket

En tant que Serviceur Studiocanal avec l'ACL `Allows Full QC Request` activée sur mon groupe,
Je veux pouvoir activer une option Full QC sur chaque item PAD lors de la configuration de ma commande,
Afin de demander un contrôle qualité avant livraison uniquement sur les items qui le nécessitent.

**Acceptance Criteria :**

```gherkin
Feature: Case "Order a Full QC before delivery" dans Configure Your Basket

  Scenario: Visibilité de la case conditionnée à l'ACL
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And je suis sur la page "Configure Your Basket"
    And je configure un item PAD
    When je consulte les options de configuration de cet item
    Then la case à cocher "Order a Full QC before delivery" est visible

  Scenario: Case non visible sans l'ACL
    Given je n'ai PAS l'ACL "Allows Full QC Request" activée sur mon groupe
    And je suis sur la page "Configure Your Basket"
    When je consulte les options de configuration d'un item PAD
    Then la case "Order a Full QC before delivery" n'est pas affichée

  Scenario: Texte d'aide de la case
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And je suis sur la page "Configure Your Basket" en train de configurer un item PAD
    When je consulte la case "Order a Full QC before delivery"
    Then le texte d'aide affiché est "Check this option to request a quality control inspection before the file is delivered to the broadcaster. Applicable rates will apply."

  Scenario: Disponibilité pour tout profil PAD
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And je configure un item PAD avec n'importe quel broadcaster
    When je consulte les options de configuration
    Then la case "Order a Full QC before delivery" est visible, sans restriction par broadcaster

  Scenario: Duplicate configuration inclut l'état de la case Full QC
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And j'ai un item PAD configuré avec la case Full QC cochée
    When j'utilise l'action "Duplicate configuration" pour créer un nouvel item
    Then le nouvel item a la case Full QC dans le même état que l'item source

  Scenario: Apply configuration to all propage l'état de la case Full QC
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And j'ai un item PAD configuré avec la case Full QC cochée
    When j'utilise l'action "Apply configuration to all"
    Then tous les autres items du basket ont leur case Full QC cochée

  Scenario: Résumé Full QC en lecture seule au Checkout
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And j'ai configuré un ou plusieurs items PAD avec le Full QC activé
    When j'arrive sur la page Checkout
    Then le résumé de chaque item indique clairement si le Full QC est activé
    And cette indication est affichée en lecture seule

  Scenario: Workflow standard si la case n'est pas cochée
    Given j'ai l'ACL "Allows Full QC Request" activée sur mon groupe
    And j'ai configuré un item PAD sans cocher "Order a Full QC before delivery"
    When la commande est traitée
    Then le workflow PAD standard s'exécute sans aucune task QC ajoutée
```

---

#### Story 1.2 — Backend : Workflow Full QC intégré à la commande PAD
Injection des briques QC (copie fichier, BT IRIS, tâche QualityCheck) dans le workflow PAD lorsque la case est cochée, avec gestion des 3 outcomes (Accepted, Bypassed, Failed) et traçabilité du résultat.
**FRs :** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15
**NFRs :** NFR1, NFR2, NFR3, NFR4

---

### Story 1.2 : Workflow Full QC intégré à la commande PAD

En tant que Serviceur Studiocanal (OWNER de la commande),
Je veux que le circuit Full QC soit automatiquement déclenché à la fabrication du PAD et pouvoir gérer le résultat du contrôle,
Afin de garantir la qualité du fichier avant sa livraison au broadcaster, ou de décider en connaissance de cause de l'envoyer malgré un refus.

**Acceptance Criteria :**

```gherkin
Feature: Workflow Full QC intégré à la commande PAD

  Scenario: Injection automatique des tasks QC avant la livraison
    Given un item PAD a été commandé avec la case "Order a Full QC before delivery" cochée
    When le workflow de fabrication atteint la fin de l'encodage (Encoder Muxer Transcoding terminé)
    Then les 3 tasks suivantes sont automatiquement insérées dans cet ordre avant la livraison :
      | Ordre | Task                                 |
      | 1     | File Native copy to outgoing storage |
      | 2     | ERP Work Order Push                  |
      | 3     | QualityCheck of object               |
    And ces tasks ciblent l'asset GENERATED de la commande PAD avec le paramètre FULL
    And les briques de l'order Quality Check existante sont réutilisées sans duplication de logique

  Scenario: Isolation par item — items sans Full QC non impactés
    Given une commande contient plusieurs items PAD
    And certains items ont la case Full QC cochée et d'autres non
    When la commande est traitée
    Then seuls les items avec Full QC coché ont les tasks QC insérées dans leur workflow
    And les items sans Full QC s'exécutent avec le workflow PAD standard sans modification

  Scenario: Mise en pause de la commande en attente de décision QC
    Given les tasks QC ont été injectées dans le workflow d'un item PAD
    When la task "QualityCheck of object" est activée
    Then la commande de cet item est mise en pause en attente de décision QC

  Scenario: Outcome ACCEPTED — reprise et livraison
    Given un item PAD est en attente de décision QC
    When l'équipe QC valide l'asset GENERATED (statut Accepted)
    Then la commande de cet item reprend son cours
    And le fichier est livré selon les modalités du profil PAD (automatique ou manuelle)

  Scenario: Outcome REFUSED — refus par l'équipe QC
    Given un item PAD est en attente de décision QC
    When l'équipe QC refuse l'asset GENERATED
    Then la commande de cet item est maintenue en pause
    And l'OWNER de la commande peut choisir de Bypasser le refus ou de laisser la commande en échec

  Scenario: Outcome BYPASSED — l'OWNER ignore le refus QC
    Given l'équipe QC a refusé l'asset GENERATED d'un item PAD
    And je suis l'OWNER de cette commande
    When je décide de Bypasser le refus
    Then l'asset GENERATED passe au statut Bypassed
    And la commande reprend son cours
    And le fichier est livré selon les modalités du profil PAD malgré le refus QC

  Scenario: Bypass non disponible pour un utilisateur non-OWNER
    Given l'équipe QC a refusé l'asset GENERATED d'un item PAD
    And je ne suis PAS l'OWNER de cette commande
    When je consulte les actions disponibles sur cet item
    Then l'action Bypass n'est pas disponible

  Scenario: Outcome REFUSED sans Bypass — commande FAILED
    Given l'équipe QC a refusé l'asset GENERATED d'un item PAD
    And aucun Bypass n'est déclenché par l'OWNER
    When le refus est confirmé
    Then la commande de cet item passe en statut FAILED
    And aucune livraison n'est déclenchée pour cet item

  Scenario: Traçabilité du résultat QC dans le détail de la commande
    Given un item PAD a terminé le processus Full QC avec n'importe quel outcome
    When je consulte le détail de la commande PAD
    Then le résultat du QC est affiché pour cet item (Accepted, Bypassed, ou Failed)

  Scenario: Export Excel des orders inclut l'information Full QC
    Given des orders PAD ont été passées, certaines avec Full QC activé et d'autres non
    When j'exporte la liste des orders au format Excel
    Then l'export contient une colonne indiquant si le Full QC était activé pour chaque item
    And cette information est correctement renseignée que le Full QC soit activé ou non

  Scenario: Order summary inclut "With Full QC" pour le monitoring
    Given un item PAD a été commandé avec la case "Order a Full QC before delivery" cochée
    When je consulte le tableau de monitoring des orders
    Then l'order summary de cet item contient la mention "With Full QC"

  Scenario: Order summary sans mention Full QC si la case n'est pas cochée
    Given un item PAD a été commandé sans la case "Order a Full QC before delivery" cochée
    When je consulte le tableau de monitoring des orders
    Then l'order summary de cet item ne contient pas la mention "With Full QC"
```
