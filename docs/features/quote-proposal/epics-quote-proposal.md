---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics']
inputDocuments:
  - _bmad-output/planning-artifacts/prd-quote-proposal.md
---

# Quote Proposal - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en epics et stories pour la feature **Quote Proposal** de Mediaspot, transformant les exigences fonctionnelles du PRD v1.7 en stories implémentables.

**Contexte :** Feature contractuelle Studiocanal — corrections d'assets avec proposition de prix, acceptation client, suivi CC/client via dashboard partagé, historisation des changements de statut et commentaires associés, et cycle de re-validation prix post-acceptation.

## Requirements Inventory

### Functional Requirements

```
FR-1.1: Demande de correction sur asset rejeté
  Le client peut demander une correction sur un asset avec le statut "Rejeté"
  en saisissant un commentaire libre — une demande est créée avec le statut "Asked"
  et le CC est notifié par email et via le dashboard avec un lien direct vers l'asset.

FR-1.2: Demande de correction sur asset accepté
  Le client peut demander une correction sur un asset avec le statut "Accepté"
  en saisissant un commentaire libre — une demande est créée avec le statut "Asked"
  et le CC est notifié par email et via le dashboard avec un lien direct vers l'asset.

FR-1.3: Validation du formulaire client (commentaire obligatoire)
  Si le client tente de soumettre une demande sans commentaire,
  le formulaire affiche une erreur de validation et la demande n'est pas créée.

FR-2.1: CC répond à une demande existante
  Le CC peut répondre à une demande en statut "Asked" en saisissant un commentaire
  et un prix (≥ 0) — le statut passe à "Proposed" et le client est notifié par email
  avec un lien direct vers la tâche.

FR-2.2: CC propose proactivement sur asset rejeté (sans demande préalable)
  Le CC peut proposer une correction sur un asset rejeté sans qu'il y ait eu
  de demande préalable du client — le statut passe à "Proposed" et le client est notifié.

FR-2.3: CC propose proactivement sur asset accepté
  Le CC peut proposer une correction sur un asset accepté présentant un défaut
  ou nécessitant une mise aux normes — le statut passe à "Proposed" et le client est notifié.

FR-2.4: Proposition à prix zéro (correction à la charge de VDM)
  Le CC peut créer une proposition avec le prix "0" — la proposition est créée
  avec le statut "Proposed" et le prix "0 €" est affiché dans la notification et la tâche.

FR-2.5: Validation du formulaire CC (commentaire et prix obligatoires)
  Si le CC tente de soumettre une proposition avec le commentaire ou le prix manquant,
  le formulaire affiche une erreur de validation et la proposition n'est pas créée.

FR-2.6: CC déclare une correction infaisable
  Le CC peut déclarer qu'une correction est techniquement impossible depuis une demande en statut "Asked"
  (défauts irréparables : encodage corrompu, frames manquantes, trou de son, pixels morts…).
  Une explication obligatoire est saisie — le statut passe à "Infaisable",
  le cas est fermé définitivement, et le client est notifié avec l'explication du CC.

FR-3.1: Acceptation depuis le dashboard mediaspot
  Le client peut accepter une proposition depuis le dashboard — le statut passe à "Accepted",
  un bon de travail est créé, une Order de correction est créée, l'order_id est affiché
  et cliquable dans la tâche et le dashboard, et les deux parties reçoivent une notification.

FR-3.2: Acceptation via lien direct dans l'email de notification
  Le client peut accepter une proposition directement depuis l'email de notification
  (clic sur le lien → consultation → acceptation) — même résultat qu'une acceptation
  depuis le dashboard.

FR-3.3: Gestion de l'échec de création du bon de travail
  En cas d'échec de création du bon de travail, le statut passe quand même à "Accepted",
  l'Order de correction est quand même créée, une icône d'erreur est affichée sur la tâche
  avec un message explicite, et le CC peut saisir le numéro de bon de travail manuellement.

FR-4.1: Refus d'une proposition par le client
  Le client peut refuser une proposition — le statut passe à "Refused", aucun bon de travail
  n'est créé, la proposition reste consultable dans le dashboard, et le CC est notifié du refus.

FR-4.2: Acceptation après refus (Could have — V1 si faisable)
  Le client peut revenir sur un refus et accepter une proposition en statut "Refused" —
  le statut passe à "Accepted" et un bon de travail est créé.

FR-5.1: Relance manuelle du client par le CC
  Le CC peut relancer manuellement le client depuis la tâche — un email de relance est
  envoyé au client avec un lien direct, et un log horodaté est tracé dans la tâche.

FR-5.2: Fermeture d'une proposition sans réponse par le CC
  Le CC peut fermer une proposition sans réponse — le statut passe à "Refused",
  la proposition reste consultable et aucun bon de travail n'est créé.

FR-6.1: Dashboard de suivi avec filtres par statut
  Le CC dispose d'un dashboard de suivi affichant toutes les demandes et propositions
  avec leurs statuts, clients, assets et prix, filtrable par :
  - En attente (Asked, Proposed)
  - En attente après rappel (Proposed après rappel automatique J+7)
  - Acceptées (Accepted)
  - Refusées (Refused)
  - Expirées (Expired)
  - Infaisables (Infaisable)
  Et filtrable par client, date de création et date d'acceptation.

FR-6.2: Export CSV/Excel pour la facturation
  Le CC peut exporter le dashboard en CSV ou Excel — le fichier contient :
  référence asset, client, statut, commentaire, prix, date de proposition, date d'acceptation.
  L'export couvre au minimum les 30 derniers jours ; toutes les données historiques
  sont exportables via sélection de plage de dates.

FR-6.3: Filtre "Infaisables" dans le dashboard
  Le dashboard dispose d'un 6e filtre "Infaisables" permettant d'afficher uniquement
  les tâches avec le statut "Infaisable" — accessible aussi bien au CC qu'au client.

FR-7.1: Rappel automatique à J+7 (Should have)
  Si aucune action client n'intervient dans les 7 jours depuis proposed_at,
  un email de rappel est envoyé automatiquement au client avec un lien vers la proposition,
  le CC reçoit une notification, et l'événement est tracé dans la tâche.

FR-7.2: Expiration automatique à J+15 (Should have)
  Si aucune action client n'intervient dans les 15 jours depuis proposed_at,
  le statut passe automatiquement à "Expired" et le client et le CC sont notifiés.

FR-7.3: Expiration sans rappel préalable (Should have)
  Si le rappel automatique J+7 n'a pas été envoyé, l'expiration à J+15 est quand même
  déclenchée normalement.

FR-7.4: Réponse client avant J+15 — pas d'expiration (Should have)
  Si le client accepte ou refuse avant J+15, le statut passe à "Accepted" ou "Refused"
  et aucune expiration n'est déclenchée.

FR-8.1: Réouverture d'une proposition expirée par le CC (Should have)
  Le CC peut rouvrir une proposition expirée — le statut repasse à "Proposed",
  le cycle J+7/J+15 repart à zéro, et le client est notifié de la réouverture.

FR-8.2: Réouverture d'une proposition expirée par le client (Should have)
  Le client peut rouvrir une proposition expirée — le statut repasse à "Proposed",
  le cycle J+7/J+15 repart à zéro, et le CC est notifié de la réouverture.

FR-8.3: Deuxième expiration après réouverture (Should have)
  Après réouverture, si aucune action n'intervient dans les 15 jours,
  la proposition expire à nouveau — comportement identique à la première expiration.

FR-9.1: Historisation des changements de statut sur chaque tâche depuis "Asked"
  Chaque tâche de correction dispose d'un historique des changements de statut accessible dès
  la création (statut "Asked"). Chaque action déclenchant un changement de statut (demande,
  proposition, acceptation, refus, relance, infaisable, mise à jour prix) génère automatiquement
  une entrée horodatée contenant : statut précédent, nouveau statut, auteur (CC, client ou
  système), date/heure et commentaire associé à l'action. Les entrées sont non modifiables et
  non supprimables. L'historique reste consultable sur les tâches fermées (Refused, Expired,
  Infaisable) — aucune entrée manuelle ne peut y être ajoutée.

FR-9.2: Dashboard accessible par le client (vue organisation)
  Le client accède au même dashboard que le CC et voit toutes les demandes de son organisation
  (tous les utilisateurs de l'organisation, pas uniquement ses propres demandes).
  Les mêmes 6 filtres par statut sont disponibles.

FR-10.1: Mise à jour du prix global post-acceptation par le CC
  Le CC peut mettre à jour le prix global d'une tâche en statut "Accepted" en saisissant
  un commentaire explicatif obligatoire et un nouveau prix — le statut repasse à "Proposed",
  proposed_at est réinitialisé, l'Order est mise à jour avec le nouveau prix proposé,
  et le client est notifié. L'ancien prix, le nouveau prix, le CC et la date sont tracés
  dans l'historique de la tâche.

FR-10.2: Re-validation du nouveau prix par le client
  Le client peut accepter ou refuser le nouveau prix proposé par le CC suite à une mise à jour.
  L'acceptation repasse le statut à "Accepted" et l'Order est mise à jour avec le prix définitif.
  Le refus passe le statut à "Refused" — le BT initialement créé n'est pas annulé automatiquement.

FR-11.1: Multi-sélection d'assets par le client pour une demande de correction
  Le client peut sélectionner plusieurs assets éligibles simultanément pour soumettre
  une seule demande de correction — une unique CorrectionRequest est créée avec la liste
  complète des asset IDs, couverte par un commentaire commun. Une seule notification CC
  est envoyée avec la liste des assets concernés.

FR-11.2: Multi-sélection d'assets par le CC pour une proposition de correction
  Le CC peut sélectionner plusieurs assets éligibles simultanément pour soumettre
  une seule proposition de correction — une unique CorrectionRequest est créée avec la liste
  complète des asset IDs, couverte par un commentaire et un prix global communs.
  À l'acceptation, une seule Order et un seul BT IRIS sont créés, la liste des asset IDs
  est transmise et enregistrée dans le détail du BT.

FR-12.1: Passage au statut FIXING des assets à l'acceptation d'une proposition
  À l'acceptation d'une proposition de correction (CorrectionRequest → Accepted),
  tous les assets référencés dans asset_ids passent au statut FIXING dans mediaspot.
  Ce statut est visible dans la liste des assets. Les commandes hors ASSET DELIVERY
  sont bloquées sur ces assets (identiques à REJECTED). Le statut d'origine de chaque
  asset (REJECTED ou ACCEPTED) est conservé pour permettre la restauration.

FR-12.2: Restrictions et purge des assets FIXING
  Un asset au statut FIXING ne peut pas être purgé par un utilisateur sans ACL dédiée.
  Les CC et labo VDM disposent de l'ACL "Allows to purge a FIXING asset?" leur permettant
  de purger l'asset pour procéder à l'upload du fichier corrigé (asset → NEW → QC).
  En cas de refus d'une re-validation de prix, les assets reviennent à leur statut d'origine
  (REJECTED ou ACCEPTED) via le champ original_asset_statuses de la CorrectionRequest.
```

### NonFunctional Requirements

```
NFR-001: Délai d'envoi des notifications email
  Les notifications email (proposition, acceptation, refus, rappel J+7, expiration J+15,
  réouverture, mise à jour prix) sont envoyées dans un délai
  maximal de 5 minutes après le déclenchement de l'événement.

NFR-002: Résilience de l'acceptation en cas d'échec bon de travail
  L'acceptation d'une proposition n'est jamais bloquée par un échec de création du
  bon de travail — le statut passe à "Accepted" et l'Order est créée dans tous les cas.

NFR-003: Capacité du dashboard et de l'export
  Le dashboard affiche jusqu'à 500 propositions simultanément.
  Les données sont exportables sur n'importe quelle plage de dates,
  avec un minimum de 30 jours glissants garanti.

NFR-004: Rétention des données
  Toutes les données de demandes, propositions et entrées d'historique sont conservées
  indéfiniment — pas de suppression automatique.

NFR-005: Disponibilité
  La feature respecte les SLAs de disponibilité existants de la plateforme mediaspot.
```

### Additional Requirements

```
- Activation par feature flag, par client (Studiocanal en priorité)
- Déploiement progressif (pilote Studiocanal, puis extension aux autres clients)
- Rollback possible via désactivation du feature flag sans impact sur les bons de travail
  déjà créés
- Formation des CC sur le nouveau workflow (proposition proactive + réponse à demande
  + mise à jour prix + lecture de l'historique des statuts et commentaires)
- Communication clients : Studiocanal en priorité, puis tous les clients en mode distribution
- Traçabilité complète : chaque changement de statut (demande, proposition, acceptation, refus,
  relance, rappel, réouverture, infaisable, mise à jour prix) est loggé dans l'historique de la
  tâche avec le commentaire associé
- **Contrôle d'accès par ACL** : les fonctionnalités Quote Proposal côté client sont soumises
  à 3 ACLs configurables par groupe d'utilisateurs (existantes depuis l'ancienne implémentation) :
  "Allows to access quotes dashboard?", "Allows to request a manual work quote?",
  "Allows to validate quote?" — la configuration des groupes autorisés par client est à réaliser
  avant activation de la feature flag
```

### FR Coverage Map

| FR | Epic | Contenu |
|---|---|---|
| FR-1.1 | Epic 1 | Demande client — asset rejeté |
| FR-1.2 | Epic 1 | Demande client — asset accepté |
| FR-1.3 | Epic 1 | Validation formulaire client |
| FR-2.1 | Epic 1 | CC répond à une demande existante |
| FR-2.2 | Epic 1 | CC propose proactivement — asset rejeté |
| FR-2.3 | Epic 1 | CC propose proactivement — asset accepté |
| FR-2.4 | Epic 1 | Proposition à prix zéro |
| FR-2.5 | Epic 1 | Validation formulaire CC |
| FR-2.6 | Epic 1 | CC déclare correction infaisable |
| FR-3.1 | Epic 2 | Acceptation depuis le dashboard |
| FR-3.2 | Epic 2 | Acceptation via lien email |
| FR-3.3 | Epic 2 | Gestion échec bon de travail |
| FR-4.1 | Epic 2 | Refus par le client |
| FR-4.2 | Epic 2 | Acceptation après refus (Could have) |
| FR-5.1 | Epic 2 | Relance manuelle CC |
| FR-5.2 | Epic 2 | Fermeture par le CC |
| FR-6.1 | Epic 3 | Dashboard avec filtres |
| FR-6.2 | Epic 3 | Export CSV/Excel |
| FR-6.3 | Epic 3 | Filtre "Infaisables" (6e filtre) |
| FR-7.1 | Epic 4 | Rappel automatique J+7 |
| FR-7.2 | Epic 4 | Expiration automatique J+15 |
| FR-7.3 | Epic 4 | Expiration sans rappel préalable |
| FR-7.4 | Epic 4 | Réponse avant J+15 — pas d'expiration |
| FR-8.1 | Epic 4 | Réouverture par CC |
| FR-8.2 | Epic 4 | Réouverture par client |
| FR-8.3 | Epic 4 | Deuxième expiration après réouverture |
| FR-9.1 | Epic 1 | Historisation des changements de statut depuis "Asked" |
| FR-9.2 | Epic 3 | Dashboard accessible par le client (vue organisation) |
| FR-10.1 | Epic 2 | Mise à jour prix post-acceptation par le CC |
| FR-10.2 | Epic 2 | Re-validation nouveau prix par le client |
| FR-11.1 | Epic 1 | Multi-sélection assets — demande client |
| FR-11.2 | Epic 1 | Multi-sélection assets — proposition CC |
| FR-12.1 | Epic 2 | Statut FIXING à l'acceptation |
| FR-12.2 | Epic 2 | Restrictions et purge assets FIXING (ACL) |

**Couverture : 34/34 FRs mappés (100%)**

## Epic List

### Epic 1 : Initier une demande ou une proposition de correction

Un client peut demander une correction sur n'importe quel asset (rejeté ou accepté), et un CC peut proposer proactivement une correction ou répondre à une demande — les deux parties sont notifiées, la demande est tracée, et l'historisation des changements de statut est disponible dès la création.

**FRs couverts :** FR-1.1, FR-1.2, FR-1.3, FR-2.1, FR-2.2, FR-2.3, FR-2.4, FR-2.5, FR-2.6, FR-9.1, FR-11.1, FR-11.2

---

### Epic 2 : Accepter, refuser et gérer une proposition

Le client peut accepter ou refuser une proposition ; l'acceptation déclenche la création d'un bon de travail et d'une commande de correction. Le CC peut relancer manuellement ou fermer une proposition, et mettre à jour le prix post-acceptation en déclenchant un nouveau cycle de validation client.

**FRs couverts :** FR-3.1, FR-3.2, FR-3.3, FR-4.1, FR-4.2, FR-5.1, FR-5.2, FR-10.1, FR-10.2, FR-12.1, FR-12.2

---

### Epic 3 : Piloter et exporter les corrections

Le CC et le client disposent d'un dashboard partagé pour suivre toutes les demandes et propositions de l'organisation, les filtrer par statut (dont Infaisables), et exporter les données pour la facturation (CC uniquement).

**FRs couverts :** FR-6.1, FR-6.2, FR-6.3, FR-9.2

---

### Epic 4 : Cycle de vie automatique *(Should have — post-MVP)*

Le système envoie automatiquement un rappel à J+7 et expire la proposition à J+15 sans action. Le CC ou le client peuvent rouvrir une proposition expirée pour relancer le cycle.

**FRs couverts :** FR-7.1, FR-7.2, FR-7.3, FR-7.4, FR-8.1, FR-8.2, FR-8.3

---

## Stories

### Epic 1 — Stories

---

#### Story 1.1 : Client soumet une demande de correction

**En tant que** client
**Je veux** pouvoir demander une correction sur un asset rejeté ou accepté en saisissant un commentaire
**Afin que** mon chargé de clientèle puisse analyser le problème et me proposer une prise en charge

**FRs couverts :** FR-1.1, FR-1.2, FR-1.3

```gherkin
Feature: Client soumet une demande de correction

  Background:
    Given le client est authentifié dans mediaspot
    And son groupe dispose de l'ACL "Allows to request a manual work quote?"
    And il consulte un asset éligible (statut "Rejeté" ou "Accepté")

  Scenario: Demande sur asset rejeté — création et notification CC
    Given un asset avec le statut "Rejeté"
    When le client saisit un commentaire libre et soumet sa demande
    Then une tâche de correction est créée avec le statut "Asked"
    And aucun bon de travail n'est créé
    And le CC est notifié par email avec un lien direct vers la tâche
    And la tâche apparaît dans le dashboard avec le statut "Asked"

  Scenario: Demande sur asset accepté — création et notification CC
    Given un asset avec le statut "Accepté"
    When le client saisit un commentaire libre et soumet sa demande
    Then une tâche de correction est créée avec le statut "Asked"
    And aucun bon de travail n'est créé
    And le CC est notifié par email avec un lien direct vers la tâche
    And la tâche apparaît dans le dashboard avec le statut "Asked"

  Scenario: Soumission sans commentaire — blocage formulaire
    Given un asset avec le statut "Rejeté" ou "Accepté"
    When le client tente de soumettre une demande sans saisir de commentaire
    Then le formulaire affiche un message d'erreur "Veuillez saisir un commentaire avant de soumettre."
    And la demande n'est pas créée
    And aucune notification n'est envoyée
```

---

#### Story 1.2 : CC répond à une demande existante

**En tant que** chargé de clientèle
**Je veux** pouvoir répondre à une demande en statut "Asked" avec un commentaire, un prix et éventuellement déclarer la correction infaisable
**Afin que** le client soit informé de la suite donnée à sa demande et puisse prendre une décision

**FRs couverts :** FR-2.1, FR-2.4, FR-2.5, FR-2.6

```gherkin
Feature: CC répond à une demande existante

  Background:
    Given le CC est authentifié dans mediaspot
    And une demande en statut "Asked" existe sur un asset

  Scenario: Réponse standard avec commentaire et prix
    Given le CC consulte la demande dans le dashboard
    When il saisit un commentaire et un prix (> 0) et soumet la proposition
    Then le statut de la tâche passe à "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun bon de travail n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario: Réponse avec prix zéro (correction à la charge de VDM)
    Given le CC consulte la demande dans le dashboard
    When il saisit un commentaire et saisit 0 comme prix et soumet
    Then le statut passe à "Proposed"
    And le prix "0 €" est clairement affiché dans la notification et dans la tâche
    And le client est notifié

  Scenario: Soumission sans commentaire ou sans prix — blocage formulaire
    Given le CC consulte la demande dans le dashboard
    When il tente de soumettre une réponse avec le commentaire ou le prix manquant
    Then le formulaire affiche une erreur de validation
    And la proposition n'est pas créée

  Scenario: Déclaration de correction infaisable
    Given le CC analyse l'asset et constate que les défauts sont irréparables
    When il clique sur "Correction infaisable", saisit une explication obligatoire et confirme
    Then le statut de la tâche passe à "Infaisable"
    And aucun bon de travail n'est créé
    And la tâche est fermée définitivement — aucun bouton "Rouvrir" n'est accessible côté client
    And le client est notifié par email avec l'explication du CC

  Scenario: Tentative de déclaration infaisable sans explication — blocage formulaire
    Given le CC clique sur "Correction infaisable"
    When il tente de confirmer sans saisir d'explication
    Then le formulaire affiche une erreur de validation
    And la déclaration n'est pas enregistrée
```

---

#### Story 1.3 : CC propose proactivement une correction

**En tant que** chargé de clientèle
**Je veux** pouvoir proposer une correction sur un asset (rejeté ou accepté) sans qu'il y ait eu de demande préalable du client
**Afin de** prendre l'initiative et d'apporter de la valeur au client sur des problèmes que je détecte

**FRs couverts :** FR-2.2, FR-2.3, FR-2.4, FR-2.5

```gherkin
Feature: CC propose proactivement une correction

  Background:
    Given le CC est authentifié dans mediaspot
    And il consulte un asset éligible (statut "Rejeté" ou "Accepté") sans demande existante

  Scenario: Proposition proactive sur asset rejeté
    Given un asset avec le statut "Rejeté" sans demande préalable
    When le CC saisit un commentaire et un prix (≥ 0) et soumet la proposition
    Then une tâche de correction est créée avec le statut "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun bon de travail n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario: Proposition proactive sur asset accepté
    Given un asset avec le statut "Accepté" présentant un défaut ou une mise aux normes requise
    When le CC saisit un commentaire et un prix (≥ 0) et soumet la proposition
    Then une tâche de correction est créée avec le statut "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun bon de travail n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario: Proposition proactive à prix zéro
    Given un asset éligible dont la correction est à la charge de VDM
    When le CC saisit un commentaire et saisit 0 comme prix
    Then la tâche est créée avec le statut "Proposed"
    And le prix "0 €" est affiché dans la notification et dans la tâche

  Scenario: Soumission sans commentaire ou sans prix — blocage formulaire
    Given un asset éligible
    When le CC tente de soumettre une proposition avec le commentaire ou le prix manquant
    Then le formulaire affiche une erreur de validation
    And la proposition n'est pas créée
```

---

#### Story 1.4 : Historisation des changements de statut et commentaires associés

**En tant que** CC ou client
**Je veux** consulter l'historique complet des changements de statut d'une tâche de correction avec le commentaire associé à chaque action
**Afin de** disposer d'une traçabilité complète de l'avancement sans sortir de la plateforme

**FRs couverts :** FR-9.1

```gherkin
Feature: Historisation des changements de statut sur une tâche de correction

  Background:
    Given une tâche de correction existe dans le système
    And le CC ou le client consulte la tâche dans le dashboard

  Scenario: Chaque action génère une entrée dans l'historique
    Given une tâche dont le statut change suite à une action (demande, proposition, acceptation, refus, relance, infaisable, mise à jour prix)
    When l'action est confirmée avec un commentaire
    Then une nouvelle entrée est ajoutée à l'historique de la tâche
    And l'entrée contient : l'ancien statut, le nouveau statut, l'auteur (CC ou client), la date, l'heure et le commentaire saisi lors de l'action

  Scenario: Historique visible dès la création de la tâche
    Given une demande venant d'être créée en statut "Asked"
    When le CC ou le client consulte la tâche
    Then l'historique est accessible immédiatement
    And il contient au moins une entrée correspondant à la création de la demande (Asked) avec le commentaire du client

  Scenario: Entrées d'historique non modifiables
    Given une entrée d'historique existante sur une tâche
    When le CC ou le client consulte l'historique
    Then les entrées existantes sont affichées mais ne peuvent être ni modifiées ni supprimées

  Scenario: Historique complet consultable sur tâche fermée
    Given une tâche en statut "Refused", "Expired" ou "Infaisable"
    When le CC ou le client consulte la tâche
    Then l'historique complet des changements de statut reste visible et consultable
    And aucune nouvelle entrée manuelle ne peut être ajoutée — seule une action déclenchant un changement de statut peut en ajouter une
```

---

#### Story 1.5 : Demande ou proposition sur plusieurs assets (multi-sélection)

**En tant que** client ou CC
**Je veux** pouvoir sélectionner plusieurs assets simultanément pour une seule demande ou proposition de correction
**Afin de** regrouper des assets liés en une seule action, avec un commentaire et un prix communs et un seul BT IRIS

**FRs couverts :** FR-11.1, FR-11.2

```gherkin
Feature: Multi-sélection d'assets pour une demande ou proposition de correction

  Scenario: Client soumet une demande sur plusieurs assets
    Given le client est authentifié et dispose de l'ACL "Allows to request a manual work quote?"
    And plusieurs assets éligibles (statut "Rejeté" ou "Accepté") sont visibles
    When le client sélectionne plusieurs assets et saisit un commentaire commun et soumet
    Then une seule CorrectionRequest est créée en statut "Asked"
    And la liste complète des asset IDs est enregistrée dans le détail de la demande
    And le CC est notifié par email avec un lien vers la demande et la liste des assets concernés

  Scenario: CC soumet une proposition sur plusieurs assets
    Given le CC est authentifié
    And plusieurs assets éligibles (statut "Rejeté" ou "Accepté") sont disponibles
    When le CC sélectionne plusieurs assets, saisit un commentaire et un prix global et soumet
    Then une seule CorrectionRequest est créée en statut "Proposed"
    And la liste complète des asset IDs est enregistrée dans le détail de la proposition
    And proposed_at est enregistré à la date et heure courantes
    And le client est notifié par email avec un lien vers la proposition et la liste des assets

  Scenario: Acceptation d'une proposition multi-assets — un seul BT et une seule Order
    Given une CorrectionRequest multi-assets en statut "Proposed"
    When le client accepte la proposition
    Then le statut passe à "Accepted"
    And une seule Order est créée avec une seule Manual Task couvrant tous les assets
    And un seul BT IRIS est créé avec la liste complète des asset IDs dans son détail
    And l'order_id est affiché et cliquable dans la tâche et dans le dashboard

  Scenario: Refus d'une proposition multi-assets — refus global
    Given une CorrectionRequest multi-assets en statut "Proposed"
    When le client refuse la proposition
    Then le statut passe à "Refused" pour l'ensemble de la demande
    And il n'est pas possible de refuser partiellement certains assets en V1
```

---

### Epic 2 — Stories

---

#### Story 2.1 : Client accepte une proposition

**En tant que** client
**Je veux** accepter une proposition de correction (depuis le dashboard ou via l'email)
**Afin que** les travaux soient déclenchés et qu'un bon de travail soit créé automatiquement

**FRs couverts :** FR-3.1, FR-3.2, FR-3.3, FR-12.1

```gherkin
Feature: Client accepte une proposition de correction

  Background:
    Given une proposition en statut "Proposed" existe sur un asset du client
    And le groupe du client dispose de l'ACL "Allows to validate quote?"

  Scenario: Acceptation depuis le dashboard
    Given le client consulte la proposition dans le dashboard
    When il clique sur "Accepter"
    Then le statut passe à "Accepted"
    And une Order est créée automatiquement sans passer par le parcours basket/checkout/validation
    And l'Order contient une Manual Task pré-configurée remplie avec le prix validé
    And un BT simplifié est créé dans IRIS et lié à la Manual Task
    And tous les assets de la proposition passent au statut "FIXING"
    And l'order_id est affiché et cliquable dans la tâche et dans le dashboard
    And le client et le CC reçoivent une notification de confirmation

  Scenario: Acceptation via le lien direct dans l'email
    Given le client reçoit un email de notification avec un lien vers la proposition
    When il clique sur le lien, consulte la proposition et clique sur "Accepter"
    Then le statut passe à "Accepted"
    And une Order est créée automatiquement sans passer par le parcours basket/checkout/validation
    And l'Order contient une Manual Task pré-configurée remplie avec le prix validé
    And un BT simplifié est créé dans IRIS et lié à la Manual Task
    And tous les assets de la proposition passent au statut "FIXING"
    And l'order_id est affiché et cliquable dans la tâche et dans le dashboard
    And le client et le CC reçoivent une notification de confirmation

  Scenario: Échec de création du BT dans IRIS — acceptation non bloquée
    Given le client accepte la proposition
    When la création du BT dans IRIS échoue
    Then le statut passe quand même à "Accepted"
    And l'Order et la Manual Task sont quand même créées dans mediaspot
    And une icône d'erreur est affichée sur la tâche avec le message
      "Erreur de création du bon de travail — veuillez saisir le numéro manuellement."
    And le CC peut saisir manuellement le numéro de BT sur la Manual Task dans l'Order
```

---

#### Story 2.2 : Client refuse une proposition

**En tant que** client
**Je veux** pouvoir refuser une proposition de correction, et éventuellement changer d'avis
**Afin de** ne pas m'engager sur des travaux dont je ne veux pas, tout en gardant la possibilité de revenir sur ma décision

**FRs couverts :** FR-4.1, FR-4.2

```gherkin
Feature: Client refuse une proposition de correction

  Background:
    Given une proposition en statut "Proposed" existe sur un asset du client
    And le groupe du client dispose de l'ACL "Allows to validate quote?"

  Scenario: Refus d'une proposition
    Given le client consulte la proposition dans le dashboard
    When il clique sur "Refuser"
    Then le statut passe à "Refused"
    And aucun bon de travail n'est créé
    And la proposition reste consultable dans le dashboard
    And le CC est notifié du refus

  Scenario: Acceptation après refus (Could have — V1 si faisable)
    Given une proposition en statut "Refused"
    When le client décide de changer d'avis et clique sur "Accepter"
    Then le statut passe à "Accepted"
    And un BT simplifié est créé
    And le client et le CC reçoivent une notification de confirmation
```

---

#### Story 2.3 : CC relance ou ferme une proposition sans réponse

**En tant que** chargé de clientèle
**Je veux** pouvoir relancer manuellement le client ou fermer une proposition sans réponse
**Afin de** maintenir un pipeline propre et de ne pas laisser des propositions bloquées indéfiniment

**FRs couverts :** FR-5.1, FR-5.2

```gherkin
Feature: CC relance ou ferme une proposition sans réponse

  Background:
    Given une proposition en statut "Proposed" sans réponse du client
    And le CC consulte la tâche dans le dashboard

  Scenario: Relance manuelle du client
    Given le CC décide de relancer le client
    When il clique sur "Relancer"
    Then un email de relance est envoyé au client avec un lien direct vers la tâche
    And un log de relance manuelle (date, heure, CC) est tracé dans l'historique de la tâche

  Scenario: Relances multiples — chacune tracée
    Given le CC a déjà relancé manuellement une première fois
    When il clique à nouveau sur "Relancer"
    Then un nouvel email est envoyé au client
    And un nouveau log est ajouté à l'historique — sans effacer les relances précédentes

  Scenario: Fermeture de la proposition par le CC
    Given le CC décide de fermer la proposition
    When il clique sur "Fermer / Refuser"
    Then le statut passe à "Refused"
    And la proposition reste consultable dans le dashboard
    And aucun bon de travail n'est créé
```

---

#### Story 2.4 : CC met à jour le prix post-acceptation — re-validation client

**En tant que** chargé de clientèle
**Je veux** pouvoir mettre à jour le prix global d'une correction après acceptation si des éléments complémentaires sont découverts
**Afin que** le client soit informé et puisse valider le nouveau prix avant la poursuite des travaux

**FRs couverts :** FR-10.1, FR-10.2

```gherkin
Feature: Mise à jour du prix global post-acceptation et re-validation client

  Background:
    Given une tâche de correction en statut "Accepted"
    And un BT et une Order ont déjà été créés

  Scenario: CC met à jour le prix — déclenchement cycle de re-validation
    Given le CC constate qu'une correction supplémentaire est nécessaire
    When il ajoute un commentaire explicatif, saisit le nouveau prix global et soumet
    Then le statut repasse à "Proposed"
    And proposed_at est réinitialisé à la date et heure courantes
    And le prix de la Manual Task sur l'Order existante est mis à jour avec le nouveau prix proposé
    And le client est notifié du nouveau prix avec un lien direct vers la tâche
    And l'historique de la tâche trace : ancien prix, nouveau prix, CC, date

  Scenario: Mise à jour de prix sans commentaire — blocage formulaire
    Given le CC tente de mettre à jour le prix sans saisir de commentaire
    When il soumet le formulaire
    Then une erreur de validation s'affiche
    And le prix n'est pas mis à jour

  Scenario: Client accepte le nouveau prix proposé
    Given la tâche est repassée à "Proposed" suite à une mise à jour de prix
    When le client consulte la proposition mise à jour et clique sur "Accepter"
    Then le statut repasse à "Accepted"
    And le prix de la Manual Task sur l'Order est mis à jour avec le prix définitif
    And le CC est notifié de l'acceptation

  Scenario: Client refuse le nouveau prix proposé
    Given la tâche est repassée à "Proposed" suite à une mise à jour de prix
    When le client consulte la proposition et clique sur "Refuser"
    Then le statut passe à "Refused"
    And le CC est notifié du refus
    And le BT initialement créé n'est pas annulé automatiquement
    And les assets reviennent à leur statut d'origine (REJECTED ou ACCEPTED)
```

---

#### Story 2.5 : Statut FIXING — restrictions et purge par CC/labo

**En tant que** système, CC ou labo VDM
**Je veux** que les assets en cours de correction soient identifiables et protégés contre toute action non souhaitée
**Afin d'** éviter que le provider remplace le fichier en cours de correction et que les assets FIXING ne soient utilisés dans des commandes inadaptées

**FRs couverts :** FR-12.1, FR-12.2

```gherkin
Feature: Gestion du statut FIXING sur les assets en cours de correction

  Scenario: Commandes non-ASSET DELIVERY bloquées sur un asset FIXING
    Given un asset au statut "FIXING"
    When un utilisateur tente de créer une commande autre qu'ASSET DELIVERY sur cet asset
    Then la commande est bloquée
    And un message indique que l'asset est en cours de correction

  Scenario: Purge bloquée sur un asset FIXING — utilisateur sans ACL
    Given un asset au statut "FIXING"
    And l'utilisateur connecté ne dispose pas de l'ACL "Allows to purge a FIXING asset?"
    When il tente de purger l'asset
    Then la purge est bloquée
    And un message indique que l'asset est en cours de correction et ne peut pas être purgé

  Scenario: CC ou labo purge un asset FIXING (ACL dédiée)
    Given un asset au statut "FIXING"
    And l'utilisateur connecté dispose de l'ACL "Allows to purge a FIXING asset?"
    When il purge l'asset
    Then la purge est autorisée
    And l'asset repasse au statut "NEW"
    And le labo peut procéder à l'upload du fichier corrigé

  Scenario: Assets FIXING reviennent à leur statut d'origine après refus de re-validation
    Given une CorrectionRequest dont les assets sont au statut "FIXING"
    And le CC a soumis une mise à jour de prix (CorrectionRequest → Proposed)
    When le client refuse le nouveau prix
    Then chaque asset revient à son statut d'origine conservé dans original_asset_statuses
      (REJECTED ou ACCEPTED selon ce qu'il était avant le passage en FIXING)
```

---

### Epic 3 — Stories

---

#### Story 3.1 : CC et client consultent le dashboard partagé avec filtres

**En tant que** CC ou client
**Je veux** accéder à un dashboard de suivi centralisé avec des filtres par statut
**Afin de** piloter ou suivre l'ensemble des corrections de mon périmètre en un coup d'œil

**FRs couverts :** FR-6.1, FR-6.3, FR-9.2

```gherkin
Feature: Dashboard partagé de suivi des corrections

  Scenario: Accès CC — toutes les demandes, tous les filtres
    Given le CC est authentifié
    When il accède au dashboard de suivi des corrections
    # Note : le CC n'est pas soumis aux ACL client
    Then il voit la liste complète de toutes les demandes/propositions
      avec : référence asset, client, statut, commentaire, prix
    And il peut filtrer par statut :
      | Filtre              | Statuts inclus                    |
      | En attente          | Asked, Proposed                   |
      | En attente (rappel) | Proposed après rappel J+7         |
      | Acceptées           | Accepted                          |
      | Refusées            | Refused                           |
      | Expirées            | Expired                           |
      | Infaisables         | Infaisable                        |
    And il peut filtrer par client, date de création et date d'acceptation

  Scenario: Filtre "Infaisables" — résultats corrects
    Given le CC ou le client accède au dashboard
    When il sélectionne le filtre "Infaisables"
    Then seules les tâches avec le statut "Infaisable" sont affichées
    And les tâches avec tout autre statut sont masquées

  Scenario: Accès client — vue organisation complète
    Given le client est authentifié
    And son groupe dispose de l'ACL "Allows to access quotes dashboard?"
    When il accède au dashboard de suivi des corrections
    Then il voit toutes les demandes de son organisation
      (tous les utilisateurs de l'organisation, pas uniquement ses propres demandes)
    And les mêmes 6 filtres par statut sont disponibles
    And il peut filtrer par date de création et date d'acceptation

  Scenario: Isolation entre organisations
    Given deux clients appartenant à des organisations différentes
    When chaque client accède au dashboard
    Then chaque client voit uniquement les demandes de sa propre organisation
    And aucune demande d'une autre organisation n'est visible
```

---

#### Story 3.2 : CC exporte le dashboard en CSV/Excel pour la facturation

**En tant que** chargé de clientèle
**Je veux** exporter les données du dashboard en CSV ou Excel
**Afin de** produire la facturation mensuelle (canal alternatif tant que le module billing n'est pas opérationnel)

**FRs couverts :** FR-6.2

```gherkin
Feature: Export CSV/Excel du dashboard corrections

  Background:
    Given le CC est authentifié et consulte le dashboard corrections

  Scenario: Export standard — données complètes
    Given le CC consulte le dashboard
    When il clique sur "Exporter"
    Then un fichier CSV ou Excel est téléchargé
    And il contient pour chaque entrée :
      référence asset, client, statut, commentaire, prix,
      date de proposition, date d'acceptation

  Scenario: Export couvrant au minimum 30 jours glissants
    Given aucun filtre de date spécifique n'est appliqué
    When le CC exporte le dashboard
    Then l'export contient au minimum les données des 30 derniers jours calendaires

  Scenario: Export sur plage de dates personnalisée
    Given le CC sélectionne une plage de dates (ex : 3 mois)
    When il exporte le dashboard
    Then l'export contient uniquement les données de la plage sélectionnée
    And toutes les entrées de la période sont présentes sans troncature
```

---

### Epic 4 — Stories *(Should have — post-MVP)*

---

#### Story 4.1 : Rappel automatique J+7

**En tant que** système
**Je veux** envoyer automatiquement un rappel au client et au CC 7 jours après une proposition sans réponse
**Afin de** limiter les propositions bloquées et maintenir un pipeline actif

**FRs couverts :** FR-7.1, FR-7.3, FR-7.4

```gherkin
Feature: Rappel automatique J+7 sur proposition sans réponse

  Background:
    Given une proposition en statut "Proposed"
    And proposed_at est la date de référence du cycle

  Scenario: Rappel déclenché à J+7 sans action client
    Given 7 jours calendaires se sont écoulés depuis proposed_at sans action du client
    When le job planifié détecte ce délai
    Then un email de rappel est envoyé au client avec un lien direct vers la proposition
    And le CC reçoit une notification "Rappel automatique envoyé pour [asset] — aucune réponse depuis 7 jours"
    And reminder_sent_at est enregistré à la date et heure courantes
    And un log "Rappel automatique J+7" est tracé dans l'historique de la tâche

  Scenario: Expiration J+15 déclenchée même si rappel J+7 non envoyé
    Given 15 jours calendaires se sont écoulés depuis proposed_at
    And le rappel automatique J+7 n'a pas été envoyé (job manqué ou désactivé)
    When le job planifié détecte le délai d'expiration
    Then le statut passe quand même à "Expired"
    And le client et le CC sont notifiés de l'expiration

  Scenario: Réponse client avant J+15 — pas d'expiration
    Given une proposition en statut "Proposed" avec reminder_sent_at renseigné
    When le client accepte ou refuse avant J+15
    Then le statut passe à "Accepted" ou "Refused" selon l'action
    And aucune expiration n'est déclenchée
    And le job planifié n'envoie pas de notification d'expiration pour cette tâche
```

---

#### Story 4.2 : Expiration automatique J+15

**En tant que** système
**Je veux** passer automatiquement une proposition en statut "Expired" 15 jours après sa création sans réponse
**Afin de** maintenir un pipeline propre sans propositions ouvertes indéfiniment

**FRs couverts :** FR-7.2, FR-7.3

```gherkin
Feature: Expiration automatique J+15 des propositions sans réponse

  Background:
    Given une proposition en statut "Proposed"
    And proposed_at est la date de référence

  Scenario: Expiration automatique à J+15
    Given 15 jours calendaires se sont écoulés depuis proposed_at sans action du client
    When le job planifié détecte ce délai
    Then le statut passe à "Expired"
    And expired_at est enregistré à la date et heure courantes
    And le client et le CC sont notifiés par email de l'expiration avec un lien vers la tâche
    And un log "Expiration automatique J+15" est tracé dans l'historique de la tâche

  Scenario: Expiration J+15 calculée depuis proposed_at — pas depuis reminder_sent_at
    Given le rappel J+7 a été envoyé
    When 8 jours supplémentaires s'écoulent (= J+15 depuis proposed_at)
    Then la proposition expire
    And expired_at est enregistré — le délai est bien calculé depuis proposed_at
      et non depuis reminder_sent_at
```

---

#### Story 4.3 : Réouverture d'une proposition expirée

**En tant que** CC ou client
**Je veux** pouvoir rouvrir une proposition expirée pour relancer le cycle
**Afin de** ne pas perdre le contexte et éviter de recréer une proposition de zéro

**FRs couverts :** FR-8.1, FR-8.2, FR-8.3

```gherkin
Feature: Réouverture d'une proposition expirée

  Background:
    Given une proposition en statut "Expired"

  Scenario: Réouverture par le CC
    Given le CC consulte une proposition expirée dans le dashboard
    When il clique sur "Rouvrir"
    Then le statut repasse à "Proposed"
    And proposed_at est réinitialisé à la date et heure de réouverture
    And reminder_sent_at et expired_at sont remis à null
    And le cycle J+7/J+15 repart depuis la nouvelle proposed_at
    And le client est notifié de la réouverture avec un lien direct vers la proposition

  Scenario: Réouverture par le client
    Given le client consulte une proposition expirée dans son dashboard
    When il clique sur "Rouvrir"
    Then le statut repasse à "Proposed"
    And proposed_at est réinitialisé à la date et heure de réouverture
    And reminder_sent_at et expired_at sont remis à null
    And le cycle J+7/J+15 repart depuis la nouvelle proposed_at
    And le CC est notifié de la réouverture

  Scenario: Deuxième expiration après réouverture — comportement identique
    Given une proposition réouverte en statut "Proposed"
    When 15 jours calendaires s'écoulent depuis la réouverture sans action
    Then le statut repasse à "Expired"
    And le processus est identique à la première expiration (notifications, expired_at, log)

  Scenario: Réouvertures multiples — aucune limite
    Given une proposition ayant déjà été rouverte et expirée une première fois
    When le CC ou le client clique à nouveau sur "Rouvrir"
    Then la proposition repasse à "Proposed"
    And proposed_at est réinitialisé une nouvelle fois
    And le cycle repart normalement — sans restriction sur le nombre de réouvertures
```

---

## Récapitulatif — Couverture complète

| Epic | Story | Titre | FRs |
|---|---|---|---|
| **Epic 1** | 1.1 | Client soumet une demande | FR-1.1, 1.2, 1.3 |
| | 1.2 | CC répond à une demande (incl. Infaisable) | FR-2.1, 2.4, 2.5, 2.6 |
| | 1.3 | CC propose proactivement | FR-2.2, 2.3, 2.4, 2.5 |
| | 1.4 | Historisation des changements de statut | FR-9.1 |
| | 1.5 | Multi-sélection d'assets | FR-11.1, 11.2 |
| **Epic 2** | 2.1 | Client accepte une proposition | FR-3.1, 3.2, 3.3 |
| | 2.2 | Client refuse une proposition | FR-4.1, 4.2 |
| | 2.3 | CC relance ou ferme | FR-5.1, 5.2 |
| | 2.4 | CC met à jour le prix + re-validation | FR-10.1, 10.2 |
| | 2.5 | Statut FIXING — restrictions et purge | FR-12.1, 12.2 |
| **Epic 3** | 3.1 | Dashboard partagé + 6 filtres | FR-6.1, 6.3, 9.2 |
| | 3.2 | Export CSV/Excel | FR-6.2 |
| **Epic 4** *(Should have)* | 4.1 | Rappel automatique J+7 | FR-7.1, 7.3, 7.4 |
| | 4.2 | Expiration automatique J+15 | FR-7.2, 7.3 |
| | 4.3 | Réouverture d'une proposition expirée | FR-8.1, 8.2, 8.3 |

**15 stories — 34/34 FRs couverts (100%)**
