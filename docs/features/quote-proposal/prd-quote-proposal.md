# PRD : Quote Proposal

**Version :** 1.12
**Auteur :** Jérôme Gué
**Date création :** 05/02/2026
**Dernière mise à jour :** 24/03/2026
**Statut :** Draft

---

## 1. Résumé exécutif

### Problème

Des assets ingestés dans mediaspot sont rejetés pour des défauts facilement corrigeables. D'autres assets, pourtant acceptés, présentent des défauts découverts après coup ou nécessitent une mise aux normes suite à l'évolution des critères techniques ou humains.

Dans les deux cas, les clients doivent actuellement repasser par les providers pour faire corriger et reingester les assets, ce qui entraîne des délais, de la frustration et une perte d'opportunités business pour VDM.

### Solution proposée

Mettre à disposition un système simple de proposition et de validation de corrections sur assets (rejetés ou acceptés), permettant :

- aux **chargés de clientèle (CC)** de proposer proactivement des corrections avec un prix global,
- aux **clients** de demander une correction et/ou d'accepter ou refuser les propositions directement dans mediaspot,
- aux **deux parties** de consulter l'**historique complet des changements de statut** de chaque tâche, avec le commentaire associé à chaque action,
- au **CC** de mettre à jour le prix global post-acceptation si des éléments complémentaires sont découverts, déclenchant un **nouveau cycle de validation client**.

Les corrections validées par le client génèrent un **BT simplifié** permettant au laboratoire VDM d'effectuer les travaux et de reingester les assets corrigés.

### Driver prioritaire

> **Engagement contractuel avec Studiocanal** — cette feature est une obligation contractuelle. Son développement n'est pas conditionné à un ROI chiffré : chaque correction facturée est un bénéfice net.

### Valeur attendue

- Respect de l'engagement contractuel Studiocanal
- Génération de revenus additionnels via la facturation de corrections
- Réduction des délais de traitement des assets rejetés ou non conformes
- Amélioration de l'expérience client et renforcement du rôle de conseil des CC
- Traçabilité complète des actions CC/client via l'historisation des changements de statut et des commentaires associés

---

## 2. Contexte & Motivation

### Origine de la demande

- Demande interne de la direction
- Feedback client (clients en mode distribution, notamment Studiocanal)
- Engagement contractuel auprès de Studiocanal

### Clients concernés

Environ 9 clients en mode distribution : Studiocanal, SND, Federation Studio, Newe, Mediatoon, Pathé, FTP, CNC…

### Lien avec la stratégie produit

Cette fonctionnalité s'inscrit dans la stratégie de valorisation des services à valeur ajoutée de VDM autour de mediaspot, en renforçant son rôle de plateforme centrale entre clients, CC et opérations labo.

### Références

- Product Brief : `docs/features/quote-proposal/source-docs/VDM-Product Brief - Quote proposal.pdf`
- Maquettes : [lien Figma — à compléter]

---

## 3. Utilisateurs & Personas

| Persona | Rôle | Interactions clés |
|---|---|---|
| **Client** | Responsable serviceur (client VDM) en charge du suivi des assets sur mediaspot — c'est lui qui décide de faire corriger un asset par VDM plutôt que de repasser par le provider | Demande correction *(ACL requise)*, accepte/refuse proposition *(ACL requise)*, rouvre une proposition expirée, consulte l'**historique des changements de statut et commentaires** de chaque tâche, consulte le **dashboard partagé** *(ACL requise)* (toutes les demandes de son organisation) |
| **Chargé de Clientèle (CC)** | Intermédiaire VDM | Propose corrections, répond aux demandes, relance, rouvre, **met à jour le prix global post-acceptation**, consulte le dashboard partagé ; chaque action génère une entrée horodatée dans l'**historique des statuts** avec le commentaire associé |
| **Labo VDM** | Opérateur technique | Exécute les travaux après acceptation (via BT) |

> **Contrôle d'accès (ACL) :** Toutes les fonctionnalités Quote Proposal côté client sont soumises à des ACL configurables par groupe d'utilisateurs dans mediaspot. Trois ACL issues de l'implémentation précédente sont réutilisées (voir §10.3) : accès au dashboard, création de demandes, validation de propositions.

---

## 4. Périmètre

### Dans le scope — V1

| Priorité | Fonctionnalité |
|---|---|
| **Must have** | Proposition de corrections par le CC (proactive ou en réponse) |
| **Must have** | Demande de corrections par le client (asset rejeté ou accepté) |
| **Must have** | Acceptation ou refus de la proposition par le client |
| **Must have** | Création d'un BT simplifié après acceptation |
| **Must have** | Déclaration "correction infaisable" par le CC sur une demande en statut "Asked" — ferme le cas définitivement avec une explication |
| **Must have** | Création automatique d'une Order mediaspot lors de l'acceptation, sans passer par le parcours client standard (basket / checkout / validation) |
| **Must have** | Relance manuelle d'un client sans réponse par le CC |
| **Must have** | Export manuel du dashboard en Excel/CSV pour la facturation (canal de facturation alternatif — module billing non opérationnel pour le MVP) |
| **Must have** | **Dashboard de suivi partagé CC/client** — le client voit toutes les demandes de son organisation |
| **Must have** | **Historisation des changements de statut sur chaque tâche** — chaque action (demande, proposition, acceptation, refus, relance, infaisable, mise à jour prix) génère automatiquement une entrée horodatée avec le commentaire associé, visible par CC et client |
| **Must have** | **Contrôle d'accès par ACL** — les fonctionnalités Quote Proposal côté client sont soumises à 3 ACL configurables par groupe : *accès dashboard*, *création de demande*, *validation de proposition* (ACLs existantes depuis l'implémentation précédente) |
| **Must have** | **Statut FIXING sur les assets en cours de correction** — à l'acceptation d'une proposition, tous les assets concernés passent au statut `FIXING` ; ce statut identifie visuellement l'asset comme "en cours de correction par VDM", bloque les purges par les utilisateurs non-CC/labo, et restreint les commandes (seules les commandes ASSET DELIVERY autorisées, comme pour `REJECTED`) |
| **Must have** | **Multi-sélection d'assets** — le client ou le CC peut sélectionner plusieurs assets en une seule demande ou proposition ; tous les assets sélectionnés sont couverts par une seule `CorrectionRequest`, une seule Order et un seul BT IRIS ; la liste des asset IDs est conservée dans le détail de la demande et du BT |
| **Must have** | **Mise à jour du prix global post-acceptation par le CC** (avec commentaire explicatif) — déclenche un nouveau cycle de validation client |
| **Should have** | Notifications email contextualisées avec lien direct vers la tâche |
| **Should have** | Rappel automatique au client et CC après 7 jours sans réponse (J+7 depuis `proposed_at`) |
| **Should have** | Expiration automatique de la proposition à J+15 depuis `proposed_at` |
| **Should have** | Réouverture d'une proposition expirée par le CC ou le client (réinitialise le compteur) |
| **Could have** | Possibilité pour le client de revenir sur un refus |
| **Could have** | Possibilité de re-proposer sur un même asset après refus |

### Hors scope — V1

- Connexion automatique avec le système de billing
- Grilles de prix détaillées et calculs automatiques de tarifs
- Création de BT avec détail automatique des corrections et prix
- Workflow complexe de validation multi-niveaux

---

## 5. Modèle de statuts

```
[Asset rejeté / accepté]
        │
        ├── Client demande ──────────────────────────────→ ASKED
        │                                                      │
        │                            ┌─────────────────────────┤
        │                            ▼                         ▼
        └── CC propose proactivement ──→ PROPOSED ←──────── ASKED
                                         │                  CC déclare infaisable ──→ INFAISABLE
                                         │                                              │
                                ┌────────┼────────────┐                           Cas fermé
                                ▼        ▼            ▼                           Client notifié
                            ACCEPTED  REFUSED      EXPIRED
                                │        │            │
                          BT créé   Consultable  CC ou client
                          Labo démarre            peut rouvrir
                                │                      │
                     CC met à jour          PROPOSED (reset)
                     prix + commentaire
                                │
                                ▼
                          PROPOSED (re-validation)
                         ┌──────┴───────┐
                         ▼              ▼
                     ACCEPTED        REFUSED
                  (prix définitif)
```

**Règle temporelle (Should have) :**
- `J+7` depuis `proposed_at` → rappel automatique envoyé (client + CC notifiés)
- `J+15` depuis `proposed_at` → statut passe à `Expired`
- Réouverture → `proposed_at` réinitialisé à la date de réouverture ; cycle J+7/J+15 repart à zéro
- Re-proposition (mise à jour prix) → `proposed_at` réinitialisé ; comportement J+7/J+15 sur la re-proposition à préciser avec l'équipe technique

| Statut | Déclencheur | BT créé | Order créée |
|---|---|---|---|
| `Asked` | Le client soumet une demande de correction | Non | Non |
| `Proposed` | Le CC soumet une proposition avec commentaire + prix, **OU** le CC met à jour le prix post-acceptation | Non | Non (mise à jour si existante) |
| `Accepted` | Le client accepte la proposition | Oui | **Oui** — tous les assets de la `CorrectionRequest` passent au statut `FIXING` |
| `Refused` | Le client refuse, ou le CC ferme la proposition | Non | Non — si les assets étaient en `FIXING` (refus après re-validation), ils reviennent à leur statut d'origine (`REJECTED` ou `ACCEPTED`) |
| `Expired` | *(Should have)* Aucune réponse du client à J+15 depuis `proposed_at` | Non | Non |
| `Infaisable` | Le CC déclare que la correction est techniquement impossible (défauts irréparables) — cas fermé définitivement | Non | Non |

> **Transition du statut asset lors d'une correction :**
>
> ```
> Asset REJECTED ou ACCEPTED
>         │
>         └── CorrectionRequest Accepted ──→ Asset FIXING
>                                                   │
>                   ┌───────────────────────────────┤
>                   ▼                               ▼
>         CC/labo purge l'asset         CorrectionRequest Refused
>         (ACL dédiée requise)          (après re-validation prix)
>                   │                               │
>                   ▼                               ▼
>               Asset NEW                  Asset revient à
>          (re-ingest labo)               REJECTED ou ACCEPTED
>                   │                         (statut d'origine)
>                   ▼
>         Asset ACCEPTED ou REJECTED
>            (selon résultat QC)
> ```
>
> Le statut `FIXING` est un **statut asset** (distinct des statuts `CorrectionRequest`). Il est porté par l'asset lui-même dans mediaspot, pas par l'entité `CorrectionRequest`.

> **Relation avec les statuts Order mediaspot :** Les Orders de mediaspot disposent de statuts Quote natifs (`QUOTE_REQUESTED`, `QUOTE_PROPOSED`, `QUOTE_ACCEPTED`, `QUOTE_DECLINED`) issus d'une implémentation précédente. La présente V1 est une **réécriture complète** — la relation exacte entre les statuts `CorrectionRequest` et les statuts Order est à préciser avec l'équipe technique (voir §10.3).

---

## 6. Exigences fonctionnelles

> Format Gherkin (BDD). Langue : français.

---

### Feature 1 — Demande de correction par le client

```gherkin
Feature: Demande de correction par le client

  En tant que client
  Je veux pouvoir demander une correction sur un asset rejeté ou accepté
  Afin que le CC puisse me proposer un prix pour la prise en charge des travaux

  Background:
    Given le client est authentifié dans mediaspot
    And il consulte la liste de ses assets

  Scenario: Demande de correction sur un asset rejeté
    Given un asset avec le statut "Rejeté"
    When le client saisit un commentaire libre et soumet sa demande de correction
    Then une demande est créée avec le statut "Asked"
    And aucun BT n'est créé
    And le CC est notifié par email et via le dashboard avec un lien direct vers l'asset

  Scenario: Demande de correction sur un asset accepté
    Given un asset avec le statut "Accepté"
    When le client saisit un commentaire libre et soumet sa demande de correction
    Then une demande est créée avec le statut "Asked"
    And aucun BT n'est créé
    And le CC est notifié par email et via le dashboard avec un lien direct vers l'asset

  Scenario: Demande de correction sur plusieurs assets (multi-sélection)
    Given plusieurs assets éligibles (statut "Rejeté" ou "Accepté")
    When le client sélectionne plusieurs assets et saisit un commentaire commun
    Then une seule demande est créée en statut "Asked" couvrant tous les assets sélectionnés
    And la liste des asset IDs est enregistrée dans le détail de la demande
    And le CC est notifié par email avec un lien vers la demande et la liste des assets concernés

  Scenario: Soumission sans commentaire
    Given un asset avec le statut "Rejeté" ou "Accepté"
    When le client tente de soumettre une demande sans saisir de commentaire
    Then le formulaire affiche une erreur de validation
    And la demande n'est pas créée
```

---

### Feature 2 — Proposition de correction par le CC

```gherkin
Feature: Proposition de correction par le CC

  En tant que CC
  Je veux pouvoir proposer une correction sur un asset (rejeté ou accepté)
  avec un commentaire libre et un prix (y compris 0)
  Afin que le client puisse visualiser et valider la prise en charge des travaux

  Background:
    Given le CC est authentifié dans mediaspot
    And il consulte le dashboard des demandes et assets

  Scenario: Répondre à une demande de correction existante
    Given une demande en statut "Asked" sur un asset
    When le CC saisit un commentaire et un prix (≥ 0) et soumet la proposition
    Then le statut passe à "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun BT n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario: Proposition proactive sur un asset rejeté (sans demande préalable)
    Given un asset avec le statut "Rejeté" sans demande préalable du client
    When le CC saisit un commentaire et un prix (≥ 0) et soumet la proposition
    Then le statut passe à "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun BT n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario: Proposition proactive sur un asset accepté
    Given un asset avec le statut "Accepté" présentant un défaut détecté ou une mise aux normes requise
    When le CC saisit un commentaire et un prix (≥ 0) et soumet la proposition
    Then le statut passe à "Proposed"
    And proposed_at est enregistré à la date et heure courantes
    And aucun BT n'est créé
    And le client est notifié par email avec un lien direct vers la tâche

  Scenario Outline: Proposition à prix zéro (correction à la charge de VDM)
    Given un asset <statut_asset> dont la correction est à la charge de VDM
    When le CC saisit un commentaire et saisit 0 comme prix
    Then la proposition est créée avec le statut "Proposed"
    And le prix "0 €" est clairement affiché dans la notification et dans la tâche
    And le client est notifié

    Examples:
      | statut_asset |
      | "Rejeté"     |
      | "Accepté"    |

  Scenario: Proposition proactive sur plusieurs assets (multi-sélection)
    Given plusieurs assets éligibles (statut "Rejeté" ou "Accepté")
    When le CC sélectionne plusieurs assets, saisit un commentaire et un prix global couvrant l'ensemble et soumet
    Then une seule proposition est créée en statut "Proposed" couvrant tous les assets sélectionnés
    And la liste des asset IDs est enregistrée dans le détail de la proposition
    And proposed_at est enregistré à la date et heure courantes
    And le client est notifié par email avec un lien vers la proposition et la liste des assets concernés

  Scenario: Proposition sans commentaire ou sans prix
    Given un asset éligible à une correction
    When le CC tente de soumettre une proposition avec le commentaire ou le prix manquant
    Then le formulaire affiche une erreur de validation
    And la proposition n'est pas créée

  Scenario: Déclaration de correction infaisable par le CC
    Given une demande en statut "Asked" sur un asset
    When le CC analyse l'asset et constate que les défauts sont irréparables
    And il clique sur "Correction infaisable", saisit une explication et confirme
    Then le statut passe à "Infaisable"
    And aucun bon de travail n'est créé
    And la demande est fermée définitivement — le client ne peut pas la rouvrir
    And le client est notifié par email avec l'explication du CC
```

---

### Feature 3 — Acceptation de la proposition par le client

```gherkin
Feature: Acceptation d'une proposition de correction

  En tant que client
  Je veux accepter une proposition de correction
  Afin de déclencher les travaux et la création du bon de travail

  Background:
    Given une proposition en statut "Proposed" existe pour un asset du client

  Scenario: Acceptation depuis le dashboard mediaspot
    Given le client consulte la proposition dans mediaspot
    When il clique sur "Accepter"
    Then le statut passe à "Accepted"
    And une Order est créée automatiquement dans mediaspot sans passer par le parcours basket/checkout/validation
    And un BT simplifié est créé dans IRIS avec le numéro de l'asset et le prix validé
    And tous les assets concernés par la proposition passent au statut "FIXING"
    And l'order_id est affiché et cliquable dans la tâche de correction et dans le dashboard corrections
    And le client reçoit une notification de confirmation
    And le CC reçoit une notification de confirmation

  Scenario: Acceptation via le lien direct dans l'email de notification
    Given le client reçoit un email de notification avec un lien direct vers la proposition
    When il clique sur le lien, consulte la proposition et clique sur "Accepter"
    Then le statut passe à "Accepted"
    And tous les assets concernés passent au statut "FIXING"
    And une Order est créée automatiquement dans mediaspot sans passer par le parcours basket/checkout/validation
    And un BT simplifié est créé dans IRIS avec le numéro de l'asset et le prix validé
    And l'order_id est affiché et cliquable dans la tâche de correction et dans le dashboard corrections
    And le client et le CC reçoivent une notification de confirmation

  Scenario: Échec de création du BT dans IRIS
    Given le client accepte la proposition
    When la création du BT dans IRIS échoue
    Then le statut passe quand même à "Accepted"
    And l'Order est quand même créée dans mediaspot
    And une icône d'erreur est affichée sur la tâche avec le message "Erreur de création du BT — veuillez saisir le numéro manuellement"
    And le CC peut saisir manuellement le numéro de BT directement sur l'Order dans mediaspot
```

---

### Feature 4 — Refus de la proposition par le client

```gherkin
Feature: Refus d'une proposition de correction

  En tant que client
  Je veux refuser une proposition de correction
  Afin de ne pas engager de travaux, tout en conservant la possibilité de changer d'avis

  Background:
    Given une proposition en statut "Proposed" existe pour un asset du client

  Scenario: Refus d'une proposition
    Given le client consulte la proposition dans mediaspot
    When il clique sur "Refuser"
    Then le statut passe à "Refused"
    And aucun BT n'est créé
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

### Feature 5 — Relance manuelle ou fermeture par le CC

```gherkin
Feature: Relance manuelle ou fermeture d'une proposition sans réponse

  En tant que CC
  Je veux pouvoir relancer manuellement le client ou fermer une proposition sans réponse
  Afin de maintenir un pipeline propre et de ne pas laisser des propositions en suspens

  Background:
    Given une proposition en statut "Proposed" sans réponse du client

  Scenario: Relancer manuellement le client
    Given le CC décide de relancer le client
    When il clique sur "Relancer"
    Then un email de relance est envoyé au client avec un lien direct vers la tâche
    And un log de relance manuelle (date, heure, CC) est tracé dans la tâche

  Scenario: Fermer la proposition (flagger en Refused)
    Given le CC décide de fermer la proposition sans réponse
    When il clique sur "Fermer / Refuser"
    Then le statut passe à "Refused"
    And la proposition reste consultable
    And aucun BT n'est créé
```

---

### Feature 7 — Cycle automatique J+7 relance / J+15 expiration *(Should have — post-MVP)*

```gherkin
Feature: Cycle automatique de relance et d'expiration des propositions sans réponse

  En tant que système
  Je veux gérer automatiquement le cycle de vie des propositions sans réponse
  avec une relance à J+7 et une expiration à J+15 depuis la date de proposition
  Afin de limiter les propositions bloquées indéfiniment et de maintenir un pipeline propre

  Background:
    Given une proposition en statut "Proposed"
    And proposed_at est la date de référence du cycle

  Scenario: Envoi du rappel automatique à J+7
    Given 7 jours calendaires se sont écoulés depuis proposed_at sans action du client
    When le système détecte ce délai
    Then un email de rappel est envoyé au client avec un lien direct vers la proposition
    And le CC reçoit une notification indiquant que le rappel automatique a été envoyé
    And reminder_sent_at est enregistré à la date et heure courantes
    And un log "Rappel automatique J+7" (date, heure) est tracé dans la tâche

  Scenario: Expiration automatique à J+15
    Given 15 jours calendaires se sont écoulés depuis proposed_at sans action du client
    When le système détecte ce délai
    Then le statut passe à "Expired"
    And expired_at est enregistré à la date et heure courantes
    And le client et le CC sont notifiés par email de l'expiration
    And un log "Expiration automatique J+15" (date, heure) est tracé dans la tâche

  Scenario: Expiration sans rappel préalable (rappel désactivé ou manqué)
    Given 15 jours calendaires se sont écoulés depuis proposed_at
    And le rappel automatique J+7 n'a pas été envoyé
    When le système détecte le délai d'expiration
    Then le statut passe quand même à "Expired"
    And le client et le CC sont notifiés

  Scenario: Réponse du client avant J+15 — pas d'expiration
    Given une proposition en statut "Proposed" avec un rappel J+7 envoyé
    When le client accepte ou refuse avant J+15
    Then le statut passe à "Accepted" ou "Refused" selon l'action du client
    And aucune expiration n'est déclenchée
```

---

### Feature 8 — Réouverture d'une proposition expirée *(Should have — post-MVP)*

```gherkin
Feature: Réouverture d'une proposition expirée

  En tant que CC ou client
  Je veux pouvoir rouvrir une proposition expirée
  Afin de relancer le processus de correction sans recréer une proposition de zéro

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
    Given le client consulte une proposition expirée dans mediaspot
    When il clique sur "Rouvrir"
    Then le statut repasse à "Proposed"
    And proposed_at est réinitialisé à la date et heure de réouverture
    And reminder_sent_at et expired_at sont remis à null
    And le cycle J+7/J+15 repart depuis la nouvelle proposed_at
    And le CC est notifié de la réouverture

  Scenario: Deuxième expiration après réouverture
    Given une proposition réouverte en statut "Proposed"
    And le nouveau cycle J+7/J+15 est en cours depuis la nouvelle proposed_at
    When 15 jours calendaires s'écoulent depuis la réouverture sans action
    Then le statut repasse à "Expired"
    And le processus est identique à la première expiration
```

---

### Feature 6 — Dashboard partagé et export

```gherkin
Feature: Dashboard de suivi partagé CC/client et export

  En tant que CC ou client
  Je veux consulter un dashboard de suivi des demandes et propositions de mon périmètre
  avec des filtres clairs par statut
  Afin de piloter ou suivre les corrections en cours et d'exporter les données pour la facturation (CC)

  Scenario: Accès CC — dashboard complet toutes demandes
    Given le CC est authentifié
    When il accède au dashboard de suivi des corrections
    Then il voit la liste complète des demandes/propositions avec leurs statuts, clients, assets et prix
    And il peut filtrer par statut :
      | Filtre               | Statuts inclus                          |
      | En attente           | Asked, Proposed                         |
      | En attente (rappel)  | Proposed après rappel automatique J+7   |
      | Acceptées            | Accepted                                |
      | Refusées             | Refused                                 |
      | Expirées             | Expired                                 |
      | Infaisables          | Infaisable                              |
    And il peut filtrer par client, date de création et date d'acceptation

  Scenario: Accès client — dashboard organisation (toutes demandes de l'organisation)
    Given le client est authentifié
    When il accède au dashboard de suivi des corrections
    Then il voit toutes les demandes/propositions de son organisation (tous les utilisateurs de son organisation)
    And il peut filtrer par statut (mêmes 6 filtres que le CC)
    And il peut filtrer par date de création et date d'acceptation

  Scenario: Export CSV/Excel pour la facturation (CC)
    Given le CC consulte le dashboard
    When il clique sur "Exporter"
    Then un fichier CSV ou Excel est téléchargé
    And il contient : référence asset, client, statut, commentaire, prix, date de proposition, date d'acceptation
    And l'export couvre au minimum les données du dernier mois glissant
    And toutes les données historiques sont exportables via sélection de plage de dates
```

---

### Feature 9 — Historisation des changements de statut sur une tâche

```gherkin
Feature: Historisation des changements de statut sur une tâche de correction

  En tant que CC ou client
  Je veux consulter l'historique complet des changements de statut d'une tâche de correction
  avec le commentaire associé à chaque action
  Afin de disposer d'une traçabilité complète de l'avancement et des échanges sans sortir de la plateforme

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

  Scenario: Historique en lecture seule — entrées non modifiables
    Given une entrée d'historique existante sur une tâche
    When le CC ou le client consulte l'historique
    Then les entrées existantes sont affichées mais ne peuvent être ni modifiées ni supprimées

  Scenario: Historique complet sur tâche fermée
    Given une tâche en statut "Refused", "Expired" ou "Infaisable"
    When le CC ou le client consulte la tâche
    Then l'historique complet des changements de statut reste visible et consultable
    And aucune nouvelle entrée ne peut être ajoutée manuellement — seule une action déclenchant un changement de statut peut en ajouter une
```

---

### Feature 11 — Statut FIXING sur les assets en cours de correction

```gherkin
Feature: Gestion du statut FIXING sur les assets en cours de correction

  En tant que utilisateur de mediaspot
  Je veux que les assets en cours de correction soient clairement identifiables via le statut FIXING
  Afin d'éviter toute action non souhaitée sur ces assets (purge par le provider, nouvelles commandes)

  Scenario: Asset passe au statut FIXING à l'acceptation
    Given une proposition de correction en statut "Proposed"
    When le client accepte la proposition
    Then tous les assets de la CorrectionRequest passent au statut "FIXING"
    And le statut "FIXING" est visible dans la liste des assets et dans le dashboard

  Scenario: Commandes interdites sur un asset FIXING (hors ASSET DELIVERY)
    Given un asset au statut "FIXING"
    When un utilisateur tente de créer une commande autre qu'ASSET DELIVERY sur cet asset
    Then la commande est bloquée
    And un message indique que l'asset est en cours de correction

  Scenario: Purge bloquée sur un asset FIXING pour un utilisateur non autorisé
    Given un asset au statut "FIXING"
    And l'utilisateur connecté n'est pas CC ni labo (ex. : provider ou responsable client)
    When il tente de purger l'asset
    Then la purge est bloquée
    And un message indique que l'asset est en cours de correction et ne peut pas être purgé

  Scenario: CC ou labo peut purger un asset FIXING (ACL dédiée)
    Given un asset au statut "FIXING"
    And l'utilisateur connecté est CC ou labo et dispose de l'ACL "Allows to purge a FIXING asset?"
    When il purge l'asset
    Then la purge est autorisée — l'asset repasse au statut "NEW"
    And le labo peut procéder à l'upload du fichier corrigé

  Scenario: Asset FIXING revient à son statut d'origine en cas de refus (re-validation)
    Given une CorrectionRequest dont les assets sont en statut "FIXING" (post-acceptation)
    And le CC a soumis une mise à jour de prix — la CorrectionRequest est repassée à "Proposed"
    When le client refuse le nouveau prix
    Then la CorrectionRequest passe à "Refused"
    And chaque asset de la CorrectionRequest revient à son statut d'origine (REJECTED ou ACCEPTED)
```

---

### Feature 10 — Mise à jour du prix global post-acceptation

```gherkin
Feature: Mise à jour du prix global post-acceptation et re-validation client

  En tant que CC
  Je veux pouvoir mettre à jour le prix global d'une tâche après acceptation initiale
  Afin d'intégrer des éléments de correction complémentaires découverts pendant les travaux

  Background:
    Given une tâche de correction en statut "Accepted"
    And un BT et une Order ont déjà été créés

  Scenario: CC met à jour le prix global — déclenchement du cycle de re-validation
    Given le CC constate qu'une correction supplémentaire est nécessaire sur le même asset
    When le CC ajoute un commentaire explicatif, saisit le nouveau prix global et soumet
    Then le statut repasse à "Proposed"
    And proposed_at est réinitialisé à la date et heure courantes
    And l'Order existante est mise à jour avec le nouveau prix proposé
    And le client est notifié du nouveau prix avec un lien direct vers la tâche
    And la mise à jour est tracée dans l'historique de la tâche (ancien prix, nouveau prix, CC, date)

  Scenario: Client accepte le nouveau prix proposé
    Given une tâche repassée à "Proposed" suite à une mise à jour de prix par le CC
    When le client consulte la proposition mise à jour et clique sur "Accepter"
    Then le statut repasse à "Accepted"
    And l'Order est mise à jour avec le prix définitif
    And le CC est notifié de l'acceptation

  Scenario: Client refuse le nouveau prix proposé
    Given une tâche repassée à "Proposed" suite à une mise à jour de prix par le CC
    When le client consulte la proposition mise à jour et clique sur "Refuser"
    Then le statut passe à "Refused"
    And le CC est notifié du refus
    And le BT initialement créé n'est pas annulé automatiquement — le CC gère la situation manuellement

  Scenario: Mise à jour de prix sans commentaire explicatif
    Given une tâche en statut "Accepted"
    When le CC tente de soumettre une mise à jour de prix sans commentaire
    Then le formulaire affiche une erreur de validation
    And le prix n'est pas mis à jour
```

---

## 7. Règles métier

| ID | Règle | Exemple concret |
|---|---|---|
| RG-001 | Une proposition de correction peut être créée sur tout asset en statut "Rejeté" **ou** "Accepté" | Un asset accepté il y a 6 mois mais ne passant plus les nouveaux critères peut recevoir une proposition |
| RG-002 | Le prix d'une proposition peut être 0 | Correction à la charge de VDM suite à une fabrication non conforme |
| RG-003 | Aucun BT n'est créé avant l'acceptation explicite du client | Une proposition "Proposed" ne génère aucun ticket IRIS |
| RG-004 | L'acceptation d'une proposition déclenche obligatoirement la création d'un BT simplifié | Le BT contient a minima : numéro d'asset, prix validé, CC référent |
| RG-005 | La proposition reste consultable après refus, acceptation ou expiration | Traçabilité complète dans le dashboard |
| RG-006 | Le CC peut relancer manuellement le client ou fermer (Refused) une proposition sans réponse | Chaque relance est loguée dans la tâche |
| RG-007 | Un export CSV/Excel du dashboard est disponible pour la facturation manuelle | Pas de connexion automatique au billing en V1 |
| RG-008 | Le commentaire est obligatoire pour toute demande (client) ou proposition (CC) | Champ requis côté formulaire |
| RG-009 | Le prix est obligatoire pour toute proposition CC (minimum 0) | Validation côté formulaire |
| RG-010 | *(Should have)* Un rappel automatique est envoyé au client **et** au CC à J+7 depuis `proposed_at` si aucune action client | Le rappel est tracé via `reminder_sent_at` dans la demande |
| RG-011 | *(Should have)* La proposition passe automatiquement en statut "Expired" à J+15 depuis `proposed_at` si aucune action client | J+7 et J+15 sont tous deux calculés depuis la même `proposed_at` |
| RG-012 | *(Should have)* La réouverture d'une proposition expirée par le CC ou le client réinitialise `proposed_at` à la date de réouverture | Le cycle J+7/J+15 repart à zéro depuis la date de réouverture |
| RG-013 | *(Should have)* Le cycle d'expiration est identique après chaque réouverture — aucune limite au nombre de réouvertures | Une proposition peut être rouverte indéfiniment |
| RG-014 | L'acceptation d'une proposition déclenche la création automatique d'une Order dans mediaspot **sans passer par le parcours client standard** (basket / configuration / checkout / validation) — la création est directe et programmatique. L'Order contient une **Manual Task** pré-configurée (type "Fix File" ou équivalent) ; seuls le prix validé et le numéro de BT sont ajoutés dynamiquement à cette Manual Task | Évite de soumettre le client à un parcours e-commerce non adapté ; la Manual Task est le pivot entre l'Order et le BT IRIS |
| RG-015 | L'`order_id` créé est affiché et cliquable dans la tâche de correction et dans le dashboard corrections, avec un lien vers la page de suivi Order dans mediaspot | Le dashboard corrections et la page Order coexistent : le premier suit l'échange CC/client, le second suit la correction et est lié au billing |
| RG-016 | En cas d'échec IRIS, l'Order est quand même créée — le numéro de BT peut être saisi manuellement directement sur l'Order dans mediaspot | La correction reste traçable même sans BT automatique ; le labo peut démarrer via l'Order |
| RG-017 | Le CC peut déclarer une correction "Infaisable" uniquement depuis une demande en statut "Asked" — l'explication est obligatoire, le cas est fermé définitivement (le client ne peut ni rouvrir, ni contester dans la plateforme) | Cas concrets : encodage corrompu, frames manquantes, trou de son irréparable, pixels morts structurels |
| RG-018 | Le dashboard est **partagé entre CC et client** — le client accède à toutes les demandes de son organisation (tous les utilisateurs de l'organisation), pas uniquement les siennes | Un responsable chez Studiocanal voit toutes les demandes ouvertes pour Studiocanal |
| RG-019 | L'**historique des changements de statut est disponible dès la création de la tâche** (statut "Asked") — chaque action (demande, proposition, acceptation, refus, relance, infaisable, mise à jour prix) génère automatiquement une entrée horodatée avec le commentaire saisi lors de l'action | Dès qu'un client soumet une demande, la première entrée d'historique est enregistrée avec son commentaire |
| RG-020 | Chaque entrée de l'historique est **horodatée, attribuée à son auteur** (CC ou client) et liée au changement de statut qui l'a générée — les entrées ne peuvent pas être supprimées ni modifiées après enregistrement | Traçabilité complète et inaltérable des actions et commentaires |
| RG-021 | Le CC peut **mettre à jour le prix global** d'une tâche en statut "Accepted" — cette action repasse le statut à "Proposed" et déclenche un nouveau cycle de validation client | CC constate qu'un défaut supplémentaire doit être corrigé après avoir démarré les travaux |
| RG-022 | La mise à jour du prix global nécessite un **commentaire explicatif obligatoire** — `proposed_at` est réinitialisé ; l'ancien prix, le nouveau prix, le CC et la date sont tracés dans l'historique | Transparence totale sur les évolutions de prix vis-à-vis du client |
| RG-025 | À l'acceptation d'une proposition, **tous les assets référencés dans `asset_ids`** passent au statut `FIXING` — ce statut signale que l'asset est en cours de correction par le labo VDM et ne doit pas être modifié ou remplacé par le provider | Empêche le provider de re-soumettre un fichier alors que VDM effectue déjà la correction |
| RG-026 | Un asset au statut `FIXING` est soumis aux **mêmes restrictions de commandes qu'un asset `REJECTED`** : seules les commandes de type ASSET DELIVERY sont autorisées | Cohérence avec le comportement existant des assets rejetés en attente de traitement |
| RG-027 | La **purge d'un asset `FIXING` est bloquée** pour tout utilisateur ne disposant pas de l'ACL dédiée — un provider ou un responsable client ne peut pas purger un asset en cours de correction, ce qui éviterait d'écraser ou de remplacer le fichier en cours de traitement par VDM | Sans cette règle, un provider pourrait re-soumettre un fichier et annuler le travail de correction en cours |
| RG-028 | Les **CC et le labo VDM disposent d'une ACL dédiée** (*"Allows to purge a FIXING asset?"*) leur permettant de purger un asset `FIXING` une fois la correction terminée — la purge repasse l'asset au statut `NEW` pour un re-upload du fichier corrigé ; le cycle de QC standard s'applique ensuite | Permet au labo de clore le cycle de correction en uploadant le fichier corrigé |
| RG-024 | Une demande ou proposition peut porter sur **un ou plusieurs assets** sélectionnés simultanément — une multi-sélection produit une seule `CorrectionRequest`, une seule Order et un seul BT IRIS ; le prix saisi est un prix global couvrant l'ensemble des assets sélectionnés ; la liste complète des asset IDs est enregistrée dans le détail de la demande et transmise au BT IRIS | Un CC peut grouper la correction de 3 assets d'un même programme en une seule demande plutôt que 3 demandes séparées |
| RG-023 | Les fonctionnalités Quote Proposal côté client sont soumises à **trois ACL configurables par groupe d'utilisateurs** dans mediaspot — (1) *"Allows to access quotes dashboard?"* : accès au dashboard de suivi ; (2) *"Allows to request a manual work quote?"* : création d'une demande de correction ; (3) *"Allows to validate quote?"* : acceptation ou refus d'une proposition. Un utilisateur sans l'ACL correspondante ne voit pas l'action et ne peut pas y accéder | Un responsable Studiocanal sans l'ACL "validate" ne peut pas accepter une proposition, même s'il a accès au dashboard |

---

## 8. Cas limites

| Cas | Comportement attendu |
|---|---|
| Client refuse puis veut accepter | Le statut peut repasser de "Refused" à "Accepted" (Could have V1) — BT créé à l'acceptation |
| Nouvelle proposition sur même asset après refus | Le CC peut créer une nouvelle proposition sur le même asset (Could have V1) |
| Asset corrigé et réingésté mais re-rejeté | Déclenche un nouveau processus standard indépendant |
| Prix = 0, BT créé | BT créé normalement, mention "0 €" — non facturé, traçabilité maintenue |
| CC relance plusieurs fois manuellement | Chaque relance est loguée dans la tâche avec horodatage |
| Rappel automatique J+7 envoyé, client toujours sans réponse | La proposition est mise en évidence "En attente après rappel" dans le dashboard — à J+15 elle passe automatiquement en "Expired" |
| Proposition expirée rouverte → deuxième expiration | Le cycle J+7/J+15 repart depuis la date de réouverture — comportement identique à la première expiration |
| Incohérence d'état mediaspot / IRIS | Statuts explicites côté mediaspot ; synchronisation IRIS à traiter en tech spec |
| Client accepte/refuse depuis email sans être connecté | Redirection vers la page de login puis vers la tâche |
| Deux CC sur le même asset | Pas de gestion de collision en V1 — le dernier CC ayant soumis l'emporte |
| Échec création BT dans IRIS à l'acceptation | L'Order est quand même créée dans mediaspot — icône d'erreur affichée sur la tâche, CC saisit le numéro BT manuellement directement sur l'Order |
| Order existante avec statuts QUOTE_* (ancienne implémentation) | La réécriture V1 part d'un état propre — la gestion de migration des Orders QUOTE_* existantes est à définir avec l'équipe technique en phase d'architecture |
| CC déclare "Infaisable" sans explication | Le formulaire affiche une erreur de validation — l'explication est obligatoire avant de pouvoir confirmer |
| Client souhaite contester une décision "Infaisable" | Aucun mécanisme de contestation dans la plateforme en V1 — le client doit contacter son CC directement (hors plateforme) |
| Demande de verrouillage d'asset simultanée (deux CC / deux clients) | Le premier "Asked" verrouille l'asset — le backend bloque toute tentative concurrente à la milliseconde près ; comportement exact à définir avec l'équipe technique |
| CC met à jour le prix plusieurs fois post-acceptation | Chaque mise à jour déclenche un nouveau cycle de re-validation — aucune limite en V1 ; chaque cycle est tracé dans l'historique |
| Client refuse le nouveau prix post-acceptation | Statut passe à "Refused" — le BT initialement créé n'est pas annulé automatiquement ; le CC gère la situation manuellement (hors plateforme ou nouvelle proposition) |
| Consultation de l'historique sur une tâche fermée (Refused, Expired, Infaisable) | L'historique des changements de statut reste consultable sur les tâches fermées — les entrées existantes sont visibles, aucune nouvelle entrée manuelle ne peut être ajoutée |
| Asset FIXING + mise à jour de prix par le CC (re-validation) | L'asset reste en statut `FIXING` pendant tout le cycle de re-validation — la correction est en cours, seul le prix change |
| Asset FIXING + CorrectionRequest refusée après re-validation | Les assets reviennent à leur statut d'origine (`REJECTED` ou `ACCEPTED`) — le BT initialement créé n'est pas annulé automatiquement ; le CC gère la situation manuellement |
| Asset FIXING + tentative de purge par le provider | La purge est bloquée — message explicite affiché ; le provider ne peut pas remplacer le fichier en cours de correction |
| Expiration J+15 d'une proposition standard (avant toute acceptation) | Les assets n'ont jamais été en `FIXING` (FIXING n'intervient qu'à l'acceptation) — aucun impact sur le statut des assets |
| Expiration J+15 d'une re-validation (CorrectionRequest repassée à `Proposed` post-acceptation, assets en `FIXING`) | Les assets reviennent à leur statut d'origine (`REJECTED` ou `ACCEPTED`) — même comportement qu'un refus explicite |
| Réouverture d'une CorrectionRequest expirée après une re-validation (assets revenus à statut d'origine) | La réouverture repart de `Proposed` — les assets ne repassent **pas** automatiquement en `FIXING` ; ils ne repasseront en `FIXING` qu'à la prochaine acceptation client |
| Labo a déjà purgé et re-uploadé l'asset (FIXING → NEW → QC → ACCEPTED) avant que le client refuse le nouveau prix | L'asset est sorti du cycle `FIXING` de lui-même — la restauration via `original_asset_statuses` ne s'applique pas ; le CC gère la situation manuellement |
| Asset FIXING : quel statut après le re-upload du fichier corrigé par le labo | L'asset repasse à `NEW` après purge par le CC/labo, puis suit le cycle de QC standard (ACCEPTED ou REJECTED selon le résultat) — comportement natif mediaspot inchangé |
| Multi-sélection : un ou plusieurs assets inéligibles dans la sélection | Le comportement exact (blocage total ou exclusion de l'asset inéligible) est à définir avec l'équipe technique — a minima, l'utilisateur est informé des assets non éligibles avant soumission |
| Multi-sélection : le client refuse une proposition groupée | La proposition entière est refusée — il n'est pas possible de refuser partiellement (certains assets oui, d'autres non) en V1 |
| Multi-sélection : le CC déclare "Infaisable" sur une demande multi-assets | La déclaration Infaisable s'applique à toute la demande — les assets individuels ne peuvent pas être traités séparément en V1 |

---

## 9. Messages utilisateur

| Code | Contexte | Message utilisateur |
|---|---|---|
| ERR-001 | Champ commentaire vide | "Veuillez saisir un commentaire avant de soumettre." |
| ERR-002 | Champ prix vide ou invalide | "Veuillez saisir un prix valide (minimum 0)." |
| ERR-003 | Action non autorisée sur statut | "Cette action n'est pas disponible pour le statut actuel de la demande." |
| ERR-004 | Échec création BT dans IRIS | "Erreur de création du bon de travail — veuillez saisir le numéro manuellement." |
| INFO-001 | Proposition envoyée au client | "Votre proposition a bien été envoyée. Le client a été notifié." |
| INFO-002 | Demande envoyée au CC | "Votre demande a bien été transmise à votre chargé de clientèle." |
| INFO-003 | BT créé après acceptation | "La proposition a été acceptée. Un bon de travail a été créé automatiquement." |
| INFO-004 | Rappel automatique J+7 envoyé — notification CC | "Un rappel automatique a été envoyé à [client] pour la proposition sur l'asset [ref]. Aucune réponse depuis 7 jours." |
| INFO-005 | Proposition expirée — notification client + CC | "La proposition de correction sur l'asset [ref] a expiré faute de réponse sous 15 jours. Elle peut être rouverte à tout moment." |
| INFO-006 | Proposition rouverte | "La proposition sur l'asset [ref] a été rouverte. Le client a été notifié et le délai de 15 jours repart." |
| INFO-007 | Correction déclarée infaisable — notification client | "La correction demandée sur l'asset [ref] ne peut malheureusement pas être réalisée. Motif communiqué par votre chargé de clientèle : [explication CC]." |
| INFO-010 | Mise à jour du prix par le CC — notification client | "Le prix de la correction de l'asset [ref] a été mis à jour à [nouveau prix] €. Veuillez consulter et valider le nouveau prix." |

---

## 10. Spécifications techniques (haut niveau)

> À compléter avec l'architecte technique.

### 10.1 Intégrations système

| Système | Rôle | Interaction |
|---|---|---|
| **mediaspot** | Plateforme principale | Affichage des tâches, statuts, formulaires, notifications in-app, **dashboard partagé CC/client**, **historique des changements de statut** |
| **Orders mediaspot** | Suivi de la correction | Création automatique d'une Order à l'acceptation (bypass basket/checkout/validation) ; l'Order contient une **Manual Task** pré-configurée à laquelle sont ajoutés le prix validé et le BT ; mise à jour du prix de la Manual Task si re-proposition du CC ; lien vers le BT et vers le module Billing ; visible par client et CC |
| **Billing mediaspot** | Facturation | Module de facturation natif accessible depuis les Orders ; **non opérationnel pour le MVP** — l'export CSV/Excel est le canal de facturation alternatif en V1 |
| **IRIS** | Gestion des BT | Création automatique d'un BT simplifié à l'acceptation client ; BT lié à l'Order |
| **Email** | Notifications | Envoi d'emails contextualisés avec lien direct vers la tâche |
| **Export CSV/Excel** | Facturation alternative MVP | Export depuis le dashboard corrections (canal principal de facturation tant que Billing est non opérationnel) |
| **Scheduler / Job** | *(Should have)* Cycle J+7/J+15 | Job planifié vérifiant quotidiennement les propositions sans réponse |

### 10.2 Nouveau modèle de données (proposition)

> À valider avec l'équipe technique.

```
CorrectionRequest {
  id
  asset_ids: string[]        // un ou plusieurs assets concernés (minimum 1) — liste des IDs transmise au BT IRIS
  original_asset_statuses: {asset_id: string, status: "REJECTED"|"ACCEPTED"}[]
                           // statut d'origine de chaque asset avant passage en FIXING
                           // permet la restauration en cas de refus post-acceptation
  statut: Asked | Proposed | Accepted | Refused | Expired | Infaisable
  initiator: client | CC
  commentaire: string
  prix: decimal (≥ 0, null si statut = Asked)
  infaisable_reason: string | null   // obligatoire si statut = Infaisable
  bt_id: string | null               // numéro de BT IRIS (auto ou saisi manuellement) — stocké sur la Manual Task de l'Order
  order_id: string | null            // identifiant de l'Order mediaspot créée à l'acceptation (contient une Manual Task pré-configurée)
  proposed_at: datetime | null       // base de calcul pour J+7 et J+15 ; réinitialisé à chaque proposition/re-proposition
  accepted_at: datetime | null       // date d'acceptation (base de calcul pour la métrique délai moyen)
  reminder_sent_at: datetime | null  // date du rappel automatique J+7 (null si non envoyé ou réouverture)
  expired_at: datetime | null        // date de passage en Expired (null si non expiré ou réouverture)
  created_at
  updated_at
  history: StatusHistoryEntry[]  // historique des changements de statut avec commentaire associé — disponible dès "Asked"
}

StatusHistoryEntry {
  id
  correction_request_id
  previous_status: Asked | Proposed | Accepted | Refused | Expired | Infaisable | null  // null pour la première entrée (création)
  new_status: Asked | Proposed | Accepted | Refused | Expired | Infaisable
  author_type: client | CC | system
  author_id: string
  commentaire: string | null  // commentaire saisi lors de l'action déclenchante
  created_at: datetime
}
```

> **Note architecturale — relation CorrectionRequest ↔ Order :** Les Orders mediaspot disposent de statuts Quote natifs existants (`QUOTE_REQUESTED`, `QUOTE_PROPOSED`, `QUOTE_ACCEPTED`, `QUOTE_DECLINED`). La relation entre l'entité `CorrectionRequest` et les Orders (objet séparé vs Order portant les statuts Quote dès la création) est à **préciser avec l'équipe technique en phase d'architecture**. La présente V1 est une réécriture complète — voir §10.3.

### 10.3 Hypothèses techniques

> ⚠️ **CONTEXTE RÉÉCRITURE** — Une implémentation précédente de cette feature existe dans mediaspot (statuts Order `QUOTE_*` présents en production). La présente V1 constitue une **réécriture complète** : la logique, les entités et les flux sont à reconstruire intégralement. La compatibilité avec les données existantes (Orders QUOTE_* en cours ou historiques) est à définir avec l'équipe technique en phase d'architecture.

- ⚠️ **HYPOTHÈSE** — Le système mediaspot permet d'ajouter un nouveau statut `FIXING` aux assets (distinct des statuts existants `NEW`, `REJECTED`, `ACCEPTED`…) ; les règles de restriction de commandes pour ce statut (bloc hors ASSET DELIVERY) et la gestion de la purge (ACL *"Allows to purge a FIXING asset?"*) sont **à confirmer avec l'équipe technique** — le statut `FIXING` doit se comporter comme `REJECTED` pour les restrictions de commandes, avec en plus le blocage de la purge pour les non-CC/non-labo
- ✅ **CONFIRMÉ** — L'intégration IRIS pour la création de BT est déjà opérationnelle sur d'autres features de mediaspot : pas d'inconnu technique
- ✅ **CONFIRMÉ** — Trois **ACL Quote Proposal** ont déjà été créées dans mediaspot lors de l'implémentation précédente et sont réutilisables pour la V1 : *"Allows to access quotes dashboard?"*, *"Allows to request a manual work quote?"*, *"Allows to validate quote?"* — ces ACLs sont configurables par groupe d'utilisateurs ; leur activation par client (Studiocanal en priorité) fait partie du plan de déploiement (voir §14)
- ✅ **HYPOTHÈSE** — La création programmatique d'une Order sans passer par le parcours basket/checkout/validation est techniquement faisable via l'API Orders interne de mediaspot ; à confirmer avec l'équipe technique
- ✅ **CONFIRMÉ** — Un **template de Manual Task** a déjà été configuré dans mediaspot lors de l'ancienne implémentation (statuts QUOTE_*) — ce template est réutilisable ou adaptable pour la V1. Le template est pré-configuré avec le CC référent et le service labo concerné. À chaque acceptation client, une **nouvelle instance de Manual Task est générée depuis ce template** et seuls le **prix validé** et le **numéro de BT** sont ajoutés dynamiquement à cette instance. Les champs exacts à passer lors de la création programmatique sont **à confirmer avec l'équipe technique** lors de la phase d'architecture
- ✅ **HYPOTHÈSE** — En cas de mise à jour du prix post-acceptation (FR-10.1), le prix de la **Manual Task existante** (instance déjà générée) est mis à jour — aucune nouvelle instance ni nouvelle Order n'est créée
- mediaspot peut afficher des tâches de type "proposition de correction" sans création immédiate de BT
- Les notifications email existantes peuvent être enrichies avec un lien direct vers une tâche spécifique
- Le système d'export CSV/Excel existant est suffisant pour les besoins de facturation en V1
- *(Should have)* Un job planifié (quotidien) peut être implémenté pour gérer le cycle J+7/J+15
- **HYPOTHÈSE** — Le contrôle d'accès au dashboard permet de filtrer les demandes par organisation cliente (pour la vue client) et d'afficher toutes les demandes (pour la vue CC) — à confirmer avec l'équipe technique

---

## 11. Design

### Maquettes

> [Lien Figma — à compléter]

### Surfaces UI impactées

| Surface | Rôle | Modifications |
|---|---|---|
| **Asset list** (page liste d'assets d'un titre) | Client + CC | Bouton "Demander une correction" (client) + "Proposer une correction" (CC) sur chaque asset rejeté ou accepté ; affichage du statut `FIXING` avec indicateur visuel distinctif sur les assets en cours de correction |
| **Recherche d'asset** | Client + CC | Idem — boutons contextuels sur les résultats de recherche |
| **Monitoring d'ingest — onglet `Rejected`** | Client + CC | Bouton "Demander une correction" (client) + "Proposer une correction" (CC) sur chaque asset rejeté |
| **Monitoring d'ingest — onglet `Processing`** | CC uniquement | Bouton "Proposer une correction" (CC) sur assets acceptés nécessitant une correction — le bouton client n'est pas exposé sur cette surface |
| **Dashboard corrections** (nouvelle vue partagée) | **CC + Client** | Vue de suivi des demandes/propositions avec **6 filtres** par statut (En attente, En attente après rappel, Acceptées, Refusées, Expirées, **Infaisables**) et export CSV/Excel (CC) — **le client accède au même dashboard et voit toutes les demandes de son organisation** ; une ligne par `CorrectionRequest` (pouvant couvrir plusieurs assets — le détail de la sélection est accessible en vue tâche) |
| **Vue tâche / proposition** | Client + CC | Interface d'affichage et d'action (Accepter / Refuser / Relancer / Rouvrir / **Mettre à jour le prix**) ; après acceptation : affiche l'`order_id` sous forme de lien cliquable vers la page de suivi Order dans mediaspot ; **historique des changements de statut intégré** (entrées horodatées avec commentaire associé, visibles dès "Asked") |
| **Notifications email** | Client + CC | Enrichissement avec lien direct vers la tâche + résumé (commentaire + prix) ; ajout des emails de rappel J+7, expiration J+15, réouverture, **mise à jour de prix** |

---

## 12. Exigences non fonctionnelles

| ID | Catégorie | Exigence | Critère de validation |
|---|---|---|---|
| NFR-001 | Performance | Les notifications email (proposition, acceptation, refus, rappel J+7, expiration J+15, réouverture, mise à jour prix) sont envoyées dans un délai maximal de 5 minutes après le déclenchement de l'événement | Mesure du délai moyen et du 95e percentile en logs |
| NFR-002 | Intégration IRIS | En cas d'échec de création du BT dans IRIS, le statut passe quand même à "Accepted", une icône d'erreur est affichée sur la tâche, et le CC peut saisir le numéro de BT manuellement | Tests d'intégration avec simulation d'échec IRIS |
| NFR-003 | Dashboard | Le dashboard affiche jusqu'à 500 propositions simultanément ; les données sont exportables en CSV/Excel sur n'importe quelle plage de dates, avec un minimum de 30 jours glissants garanti | Test de charge avec 500 entrées ; test export plage 30 jours |
| NFR-004 | Rétention | Toutes les données de demandes, propositions et entrées d'historique sont conservées indéfiniment (pas de suppression automatique) pour permettre les exports multi-mois et multi-années | Vérification absence de politique de purge automatique |
| NFR-005 | Disponibilité | La feature Quote Proposal respecte les SLAs de disponibilité existants de la plateforme mediaspot | Couverture par le monitoring existant de mediaspot |

---

## 13. Tests

### 13.1 Critères d'acceptation globaux

- [ ] Tous les scénarios Gherkin des Features 1 à 10 sont couverts par des tests
- [ ] Tests E2E validés par QA pour les flux critiques (proposition → acceptation → BT créé → assets FIXING)
- [ ] Tests E2E flux FIXING (purge bloquée non-CC/labo ; purge autorisée CC/labo avec ACL)
- [ ] Tests E2E flux historisation (chaque action génère une entrée horodatée dans l'historique avec le commentaire associé)
- [ ] Tests E2E flux re-validation prix (mise à jour prix → re-proposition → acceptation client)
- [ ] Validation fonctionnelle PO
- [ ] Pas de régression sur le processus d'ingest et de gestion des assets existants
- [ ] Vérification que le BT créé dans IRIS est bien conforme au format attendu par le labo

### 13.2 Scénarios de test prioritaires

| ID | Scénario | Statut cible |
|---|---|---|
| TC-001 | Client demande correction sur asset rejeté → CC est notifié | Asked |
| TC-000 | Dashboard filtres : vérifier que chaque filtre (6 filtres dont Infaisables) retourne les bons statuts | — |
| TC-002 | CC propose proactivement sur asset accepté → Client notifié | Proposed |
| TC-003 | Client accepte → Order créée dans mediaspot (bypass basket), BT créé dans IRIS, order_id cliquable affiché sur la tâche et le dashboard | Accepted |
| TC-004 | Client refuse → pas de BT, proposition consultable | Refused |
| TC-005 | CC relance → email envoyé, log tracé | Proposed |
| TC-006 | CC ferme une proposition → statut Refused | Refused |
| TC-007 | Prix = 0 → BT créé, "0 €" affiché correctement | Accepted |
| TC-008 | Export CSV depuis le dashboard — plage 30 jours minimum | — |
| TC-009 | Échec IRIS à l'acceptation → icône erreur affichée, CC peut saisir BT manuellement | Accepted |
| TC-010 | *(Should have)* Rappel automatique déclenché à J+7 depuis proposed_at → client et CC notifiés, reminder_sent_at enregistré | Proposed |
| TC-011 | *(Should have)* Dashboard filtre "En attente après rappel" → affiche uniquement propositions avec rappel envoyé | — |
| TC-012 | *(Should have)* Expiration automatique à J+15 depuis proposed_at → statut Expired, client et CC notifiés, expired_at enregistré | Expired |
| TC-013 | *(Should have)* Dashboard filtre "Expirées" → affiche uniquement propositions avec statut Expired | — |
| TC-014 | *(Should have)* Réouverture par CC → statut Proposed, proposed_at réinitialisé, cycle J+7/J+15 repart, client notifié | Proposed |
| TC-015 | *(Should have)* Réouverture par client → statut Proposed, proposed_at réinitialisé, cycle J+7/J+15 repart, CC notifié | Proposed |
| TC-016 | *(Should have)* Deuxième expiration après réouverture → comportement identique à première expiration | Expired |
| TC-017 | Vérifier que la création d'une Order à l'acceptation **ne passe pas** par le parcours basket / checkout / validation — création directe via API interne | Accepted |
| TC-018 | CC déclare une correction infaisable sur une demande Asked → statut Infaisable, client notifié avec explication, cas fermé (pas de bouton "Rouvrir" côté client) | Infaisable |
| TC-019 | Dashboard filtre "Infaisables" → affiche uniquement les tâches avec statut Infaisable | — |
| TC-020 | Client accède au dashboard → voit toutes les demandes de son organisation (pas uniquement les siennes) | — |
| TC-021 | Chaque action (Asked, Proposed, Accepted, Refused…) génère une entrée horodatée dans l'historique avec le commentaire associé | — |
| TC-022 | L'entrée d'historique affiche correctement : statut précédent, statut nouveau, auteur, date/heure, commentaire | — |
| TC-023 | Historique visible dès la création de la tâche (statut "Asked") | — |
| TC-024 | Historique en lecture seule sur tâche fermée (Refused, Expired, Infaisable) — entrées non modifiables, aucune nouvelle entrée manuelle possible | — |
| TC-025 | CC met à jour le prix post-acceptation avec commentaire → statut repasse à "Proposed", client notifié, historique tracé | Proposed |
| TC-026 | Client accepte le nouveau prix → statut "Accepted", Order mise à jour avec nouveau prix | Accepted |
| TC-027 | Client refuse le nouveau prix → statut "Refused", CC notifié, BT non annulé automatiquement | Refused |
| TC-028 | Client sélectionne plusieurs assets et soumet une demande → une seule CorrectionRequest créée, tous les asset IDs enregistrés, une seule notification CC | Asked |
| TC-029 | CC sélectionne plusieurs assets et soumet une proposition → une seule CorrectionRequest créée, tous les asset IDs transmis au BT IRIS à l'acceptation | Proposed → Accepted |
| TC-030 | Acceptation d'une proposition → tous les assets de `asset_ids` passent au statut FIXING dans mediaspot | Accepted |
| TC-031 | Tentative de purge d'un asset FIXING par un utilisateur sans ACL dédiée → purge bloquée, message explicite | — |
| TC-032 | CC ou labo (avec ACL "Allows to purge a FIXING asset?") purge l'asset FIXING → asset repasse à NEW | — |
| TC-033 | Refus du nouveau prix (re-validation post-acceptation) → assets reviennent à leur statut d'origine (REJECTED ou ACCEPTED) | Refused |

---

## 14. Déploiement & Communication

### Plan de déploiement

- [ ] Feature flag : **Oui** — activation par client (Studiocanal en priorité)
- [ ] Déploiement progressif : Oui — pilote Studiocanal, puis extension aux autres clients
- [ ] Rollback plan : désactivation du feature flag, pas d'impact sur les BT déjà créés
- [ ] **Configuration ACL par groupe** : activer les 3 ACLs Quote Proposal (*accès dashboard*, *demande*, *validation*) pour les groupes autorisés de chaque client — à réaliser en coordination avec l'équipe configuration avant activation de la feature flag
- [ ] **Configuration ACL FIXING** : activer l'ACL *"Allows to purge a FIXING asset?"* pour les groupes CC et labo VDM (côté VDM uniquement — pas exposée aux groupes clients)

### Communication

- [ ] Release notes à rédiger
- [ ] CC à former sur le nouveau workflow (proposition proactive et réponse à demande, historique des statuts et commentaires, mise à jour prix)
- [ ] Clients à notifier : Studiocanal en priorité, puis tous les clients en mode distribution

---

## 15. Métriques de succès

| Métrique | Valeur actuelle | Cible | Mesure |
|---|---|---|---|
| Corrections facturées / mois | 0 (baseline) | À définir avec la direction | Export dashboard |
| Taux de conversion propositions → acceptées | — | > 60% à 3 mois | Nb acceptées / Nb proposées |
| Délai moyen proposition → acceptation | — | < 5 jours ouvrés | Dates statuts |
| Adoption CC (propositions créées / mois) | 0 | > 10 dès le 2e mois | Dashboard |

---

## 16. Hypothèses & Risques

### Hypothèses

**Fonctionnelles & organisationnelles**
- Les CC sont disponibles et formés pour analyser les assets et proposer des corrections de manière qualitative
- Les clients consultent régulièrement leur dashboard mediaspot
- Les clients comprennent la différence entre une proposition CC et une demande qu'ils initient
- Le labo peut effectuer les corrections dans un délai raisonnable

**Business**
- Les clients sont prêts à payer pour des corrections simples si le processus est fluide
- Le volume de demandes reste compatible avec la capacité opérationnelle des CC et du labo

### Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Faible adoption client / CC | Modérée | Faible ROI | Onboarding simple + communication ciblée |
| Mauvaise synchronisation Client / CC / Labo | Modérée | Retards, incompréhension | Statuts clairs, notifications ciblées, BT traçable |
| Erreur de prix saisie par le CC | Modérée | Litige, perte financière | Validation explicite du prix + traçabilité de l'acceptation |
| Notifications ignorées ou mal comprises | Faible | Mauvaise expérience | Lien direct vers la tâche + description claire + prix visible |
| Incohérences d'état mediaspot / IRIS | Faible | Bugs, perte de confiance | Scope V1 strict + statuts explicites + tests d'intégration |
| Job J+7/J+15 qui manque des propositions | Faible | Propositions jamais expirées | Tests de charge + monitoring du job planifié |
| Dette technique si V1 étendue trop vite | Modérée | Instabilité | Scope V1 strict, roadmap V2 séparée |
| Confusion client sur la vue organisation-wide | Faible | Mauvaise expérience / questions support | UX claire avec indication "toutes les demandes de [Organisation]" |
| Re-validation prix fréquente → friction client | Modérée | Perte de confiance / refus | CC formés à ne re-proposer qu'en cas réel de nécessité |

---

## 17. Historique

| Date | Version | Auteur | Changements |
|---|---|---|---|
| 05/02/2026 | 1.0 | Jérôme Gué | Création |
| 24/02/2026 | 1.1 | Jérôme Gué | Enrichissement complet : scope élargi aux assets acceptés, flux CC proactif clarifié, Gherkin, règles métier, cas limites, métriques |
| 24/02/2026 | 1.2 | Jérôme Gué | Ajout Feature 7 rappel automatique J+7 (Should have), filtres dashboard enrichis, relance manuelle CC promue Must have, modèle de données mis à jour |
| 24/02/2026 | 1.3 | Jérôme Gué | Driver contractuel Studiocanal mis en avant dans l'exec summary, intégration IRIS confirmée, surfaces UI enrichies avec 3 points d'entrée existants (asset list, recherche, monitoring d'ingest) |
| 24/02/2026 | 1.4 | Jérôme Gué | Ajout NFRs (NFR-001 à NFR-005), cycle d'expiration J+15 (Feature 7 enrichie + Feature 8 réouverture), nouveau statut Expired, RG-011 à RG-013, modèle de données étendu (expired_at), messages INFO-005/006 et ERR-004, filtre dashboard "Expirées", TC-009 à TC-016 |
| 25/02/2026 | 1.5 | Jérôme Gué | Intégration Orders mediaspot : création automatique d'une Order (bypass basket) à l'acceptation, RG-014 à RG-016, order_id dans le modèle de données, §10.1 enrichi (Orders + Billing), §10.3 contexte réécriture + hypothèse API Orders, §11 vue tâche order_id cliquable, TC-003 mis à jour + TC-017 ajouté, §18 décision Orders documentée |
| 25/02/2026 | 1.6 | Jérôme Gué | Ajout statut "Infaisable" : CC peut déclarer correction impossible depuis Asked (défauts irréparables), cas fermé définitivement, explication obligatoire — §4, §5, §6 Feature 2, §7 RG-017, §8 cas limites, §9 INFO-007, §13 TC-018 |
| 25/02/2026 | 1.7 | Jérôme Gué | Découvertes majeures issues de l'analyse des gaps : (1) Dashboard partagé CC/client — client voit toutes les demandes de son organisation (§3, §4, §6 Feature 6 réécrite, §7 RG-018, §11, §13 TC-020) ; (2) Fil de discussion sur chaque tâche depuis "Asked" — Feature 9 nouvelle, §4, §7 RG-019/020, §9 INFO-008/009, §10.2 CorrectionRequestMessage, §11, §13 TC-021 à TC-024 ; (3) Mise à jour prix post-acceptation → nouveau cycle d'acceptation — Feature 10 nouvelle, §4, §5 diagramme, §7 RG-021/022, §8 cas limites, §9 INFO-010, §11, §13 TC-025 à TC-027 ; (4) Filtre "Infaisables" confirmé 6ème filtre dashboard — §6 Feature 6, §13 TC-019 |
| 12/03/2026 | 1.8 | Jérôme Gué | Précision technique Order/Manual Task : l'Order générée à l'acceptation instancie une Manual Task depuis un **template pré-configuré** (existant depuis l'ancienne implémentation) — seuls le prix et le BT sont ajoutés dynamiquement à l'instance ; mise à jour prix post-acceptation = mise à jour de l'instance existante — §7 RG-014, §10.1, §10.3, §18 |
| 24/03/2026 | 1.12 | Jérôme Gué | Ajout du **statut FIXING** : à l'acceptation d'une proposition, tous les assets concernés passent au statut `FIXING` (identifiable visuellement, restrictions de commandes identiques à `REJECTED`, purge bloquée pour non-CC/labo) — Feature 11 (§6), RG-025 à 028 (§7), transition asset (§5), cas limites (§8), `original_asset_statuses` dans le modèle de données (§10.2), HYPOTHÈSE `FIXING` (§10.3), surfaces UI (§11), TC-030 à 033 (§13), ACL dédiée purge (§14), §18 |
| 23/03/2026 | 1.11 | Jérôme Gué | Ajout de la **multi-sélection d'assets** : client et CC peuvent grouper plusieurs assets en une seule demande/proposition, couverts par une seule `CorrectionRequest`, une seule Order et un seul BT IRIS — `asset_id` → `asset_ids[]` dans le modèle de données (§10.2), RG-024 (§7), scenarios Feature 1 & 2 (§6), cas limites (§8), dashboard (§11), TC-028/029 (§13), §18 |
| 19/03/2026 | 1.10 | Jérôme Gué | Ajout du **contrôle d'accès par ACL** : les fonctionnalités Quote Proposal côté client sont soumises à 3 ACLs configurables par groupe (*accès dashboard*, *demande*, *validation*), déjà créées lors de l'implémentation précédente et réutilisables en V1 — §3, §4, §7 RG-023, §10.3 CONFIRMÉ, §14, §18 |
| 12/03/2026 | 1.9 | Jérôme Gué | Correction conceptuelle majeure : le **"fil de discussion"** n'est **pas** un canal de messagerie libre entre CC et client — c'est une **historisation des changements de statut** avec le commentaire associé à chaque action. Chaque action (demande, proposition, acceptation, refus, relance, infaisable, mise à jour prix) génère automatiquement une entrée horodatée et attribuée dans l'historique. Suppression de l'entité `CorrectionRequestMessage` ; remplacement par `StatusHistoryEntry` dans le modèle de données (§10.2) ; réécriture Feature 9 (§6), RG-019/020 (§7), suppression INFO-008/009 (§9), mise à jour §1, §3, §4, §10.1, §11, §12, §13, §14, §18 |

---

## 18. Annexes

### Décisions prises pendant la rédaction

- **Scope élargi aux assets acceptés** : la feature couvre les assets "Rejeté" ET "Accepté" suite à la confirmation que des défauts peuvent être détectés après acceptation ou lors de mises aux normes
- **Prix = 0 autorisé** : pour couvrir les cas de fautes VDM (asset fabriqué non conforme)
- **Format Gherkin** : adopté pour toutes les exigences fonctionnelles (testabilité, langage commun PM/Dev/QA)
- **Rappel automatique J+7 = Should have post-MVP** : fonctionnalité souhaitée mais non bloquante pour le MVP ; la relance manuelle CC suffit pour la V1 stricte
- **Expiration J+15 = Should have (couplée au rappel J+7)** : les deux timers sont calculés depuis la même `proposed_at`; J+7 et J+15 ne sont pas cumulatifs — l'expiration survient à J+15 depuis la proposition, pas J+7 depuis le rappel
- **Réouverture illimitée** : le CC et le client peuvent rouvrir une proposition expirée sans restriction ; chaque réouverture réinitialise le cycle complet
- **IRIS : saisie manuelle en cas d'échec** : si le BT ne peut être créé automatiquement, le CC saisit le numéro manuellement — le statut Accepted n'est pas bloqué par IRIS
- **Rétention illimitée** : toutes les données (demandes, propositions, entrées d'historique) sont conservées indéfiniment pour permettre les exports multi-mois et multi-années
- **Export dashboard : 30 jours minimum garanti** + plage de dates libre au-delà
- **Pas de second rappel automatique en V1 entre J+7 et J+15** : une seule relance automatique, puis expiration directe — évite les automatismes en cascade
- **6 filtres dashboard** : En attente, En attente après rappel, Acceptées, Refusées, Expirées, **Infaisables** — le 6e filtre a été ajouté suite à l'analyse des gaps (v1.7)
- **Intégration Orders mediaspot — deux systèmes coexistants** : le dashboard corrections assure le suivi de l'échange CC/client (statuts `CorrectionRequest`) ; l'Order mediaspot assure le suivi de la correction elle-même et son lien au billing. Les deux coexistent et se complètent — l'`order_id` est le pivot entre les deux. Le parcours basket/checkout/validation est bypassé : la création de l'Order est directe et programmatique via l'API Orders interne
- **Réécriture complète de l'implémentation précédente** : les statuts Order `QUOTE_*` existants attestent d'une implémentation antérieure. La V1 repart d'un état propre — la stratégie de migration des données existantes est hors scope PRD (à traiter en architecture)
- **Dashboard partagé CC/client** (v1.7) : le même dashboard est accessible au CC et au client — le client voit toutes les demandes de son organisation (pas uniquement les siennes)
- **Historisation des changements de statut — pas de fil de discussion libre** (v1.9, correction v1.7) : la feature d'historisation n'est pas un canal de messagerie libre entre CC et client. Chaque action déclenchant un changement de statut (demande, proposition, acceptation, refus, relance, infaisable, mise à jour prix) génère automatiquement une entrée `StatusHistoryEntry` horodatée, attribuée à son auteur, avec le commentaire saisi lors de l'action. L'entité `CorrectionRequestMessage` initialement envisagée est abandonnée. Les entrées sont non modifiables et non supprimables. L'historique est visible dès "Asked" et reste consultable sur les tâches fermées
- **Re-validation prix** (v1.7) : le CC peut mettre à jour le prix global d'une tâche après acceptation (éléments complémentaires découverts en cours de travaux) — un commentaire obligatoire est requis, le statut repasse à "Proposed" et le client doit re-valider ; le BT initialement créé n'est pas annulé automatiquement en cas de refus du nouveau prix
- **Concurrence sur asset (demande simultanée)** (v1.7) : le premier "Asked" verrouille l'asset — le backend gère la concurrence à la milliseconde ; le comportement exact (message d'erreur, file d'attente) est à définir avec l'équipe technique
- **Order de type Manual Task — instanciation depuis un template** (v1.8) : les Orders mediaspot peuvent contenir différents types de produits (Transcode as service, Broadcast file, Transcode générique, Manual task…). Pour Quote Proposal, l'Order créée à l'acceptation contient obligatoirement une **Manual Task** — c'est le seul type de produit compatible avec la création d'un BT IRIS. Ce fonctionnement repose sur un **template de Manual Task** pré-configuré (CC référent, service labo) qui existait déjà dans l'ancienne implémentation QUOTE_* : à chaque acceptation, une **nouvelle instance est générée depuis ce template** avec le prix validé et, une fois créé, le numéro de BT. En cas de mise à jour du prix post-acceptation, c'est l'instance déjà générée qui est mise à jour — pas de nouvelle instance. Les champs exacts à passer programmatiquement sont à confirmer avec l'équipe technique en phase d'architecture
- **Pas de nouvelle demande après Infaisable** (v1.7) : si un asset est re-masterisé après déclaration Infaisable, le fichier est purgé et remplacé par un nouvel asset propre — une éventuelle nouvelle demande se ferait sur le nouvel asset, pas sur l'ancien
- **Statut FIXING — traçabilité des assets en cours de correction** (v1.12) : à l'acceptation d'une proposition, tous les assets de `asset_ids` passent au statut `FIXING`. Ce statut : (1) identifie visuellement l'asset comme en cours de correction par VDM, (2) applique les mêmes restrictions de commandes qu'un asset `REJECTED` (seules ASSET DELIVERY autorisées), (3) bloque la purge pour tout utilisateur sans ACL dédiée — empêche le provider de re-soumettre un fichier pendant que VDM corrige. Les CC et le labo VDM peuvent purger un asset `FIXING` via l'ACL *"Allows to purge a FIXING asset?"* (côté VDM uniquement). Après purge → asset `NEW` → cycle QC standard. En cas de refus post-acceptation (re-validation prix), les assets reviennent à leur statut d'origine (`REJECTED` ou `ACCEPTED`) grâce au champ `original_asset_statuses` conservé dans la `CorrectionRequest`
- **Multi-sélection d'assets — une demande, un BT, une Order** (v1.11) : client et CC peuvent sélectionner plusieurs assets pour une seule demande ou proposition. Cela produit une unique `CorrectionRequest` (modèle : `asset_ids: string[]`), une unique Order et un unique BT IRIS. Le prix est global pour l'ensemble de la sélection. En V1, le refus ou la déclaration Infaisable s'applique à toute la demande — pas de traitement partiel par asset. La liste des asset IDs est transmise et conservée dans le détail de la demande et du BT IRIS. Le dashboard affiche une ligne par CorrectionRequest, le détail de la sélection est visible en vue tâche
- **ACLs Quote Proposal réutilisées depuis l'implémentation précédente** (v1.10) : mediaspot dispose d'un système d'ACL configurables par groupe d'utilisateurs. Trois ACLs Quote Proposal ont déjà été créées lors de l'ancienne implémentation et sont disponibles pour la V1 : *"Allows to access quotes dashboard?"* (accès au dashboard), *"Allows to request a manual work quote?"* (soumission d'une demande de correction), *"Allows to validate quote?"* (acceptation ou refus d'une proposition). Ces ACLs s'appliquent uniquement aux utilisateurs côté client (serviceur) — les CC VDM ne sont pas soumis aux mêmes restrictions. La configuration des groupes autorisés par client est à réaliser en coordination avec l'équipe avant activation de la feature flag
