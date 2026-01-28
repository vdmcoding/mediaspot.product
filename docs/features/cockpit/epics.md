---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - docs/features/cockpit/prd.md
---

# Cockpit - Epic Breakdown

## Overview

Ce document fournit le découpage complet en epics et stories pour la feature Cockpit, décomposant les requirements du PRD en stories implémentables focalisées sur le fonctionnel.

## Requirements Inventory

### Functional Requirements

| ID | Domaine | Description |
|----|---------|-------------|
| FR1 | Listing | Voir la liste de tous les workflows |
| FR2 | Listing | Filtrer par pôle |
| FR3 | Listing | Filtrer par chaîne |
| FR4 | Listing | Filtrer par step |
| FR6 | Listing | Filtrer par statut |
| FR7 | Listing | Voir ses workflows assignés ("À vérifier") |
| FR8 | Listing | Voir les compteurs par statut |
| FR9 | Preview | Lancer la preview vidéo d'un workflow |
| FR10 | Preview | Naviguer dans la vidéo (play, pause, seek) |
| FR11 | Preview | Copie vidéo vers S3 à la demande |
| FR12 | Validation | Approuver un workflow |
| FR13 | Validation | Rejeter un workflow |
| FR14 | Validation | Motif obligatoire lors du rejet |
| FR15 | Validation | Timecode optionnel lors du rejet |
| FR16 | Validation | Mise à jour statut après validation |
| FR17 | Validation | Mise à jour statut après rejet |
| FR18 | Assignation | Assigner un workflow à un reviewer |
| FR19 | Historique | Consulter l'historique des décisions |
| FR20 | Historique | Afficher qui a pris la décision |
| FR21 | Historique | Afficher quand |
| FR22 | Historique | Afficher le motif |
| FR23 | Historique | Enregistrer assignation, rejet, validation |
| FR24 | Admin | Créer un compte utilisateur |
| FR25 | Admin | Désactiver/supprimer un compte |
| FR26 | Admin | Assigner un rôle (admin, reviewer, user) |
| FR27 | Auth | Se connecter via AWS Cognito |

### Non-Functional Requirements

_Approche fonctionnelle uniquement - les NFRs ne sont pas inclus dans ce découpage._

### Additional Requirements

_Approche fonctionnelle uniquement - les détails techniques seront déterminés par l'équipe de développement._

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Voir liste workflows |
| FR2 | Epic 1 | Filtrer par pôle |
| FR3 | Epic 1 | Filtrer par chaîne |
| FR4 | Epic 1 | Filtrer par step |
| FR6 | Epic 1 | Filtrer par statut |
| FR7 | Epic 1 | Workflows assignés "À vérifier" |
| FR8 | Epic 1 | Compteurs par statut |
| FR9 | Epic 2 | Lancer preview vidéo |
| FR10 | Epic 2 | Naviguer dans la vidéo |
| FR11 | Epic 2 | Copie S3 à la demande |
| FR12 | Epic 3 | Approuver workflow |
| FR13 | Epic 3 | Rejeter workflow |
| FR14 | Epic 3 | Motif obligatoire |
| FR15 | Epic 3 | Timecode optionnel |
| FR16 | Epic 3 | MAJ statut après validation |
| FR17 | Epic 3 | MAJ statut après rejet |
| FR18 | Epic 4 | Assigner à un reviewer |
| FR19 | Epic 4 | Consulter historique |
| FR20 | Epic 4 | Afficher qui |
| FR21 | Epic 4 | Afficher quand |
| FR22 | Epic 4 | Afficher motif |
| FR23 | Epic 4 | Enregistrer événements |
| FR24 | Epic 5 | Créer compte |
| FR25 | Epic 5 | Désactiver/supprimer compte |
| FR26 | Epic 5 | Assigner rôle |
| FR27 | Epic 5 | Connexion Cognito |

## Epic List

### Epic 1: Navigation et découverte des workflows

Le reviewer peut voir tous les workflows, les filtrer selon ses besoins, et identifier rapidement ceux qui nécessitent son attention.

**FRs couverts :** FR1, FR2, FR3, FR4, FR6, FR7, FR8

---

### Epic 2: Preview et visionnage

Le reviewer peut visualiser le contenu vidéo d'un workflow pour évaluer sa conformité avant de prendre une décision.

**FRs couverts :** FR9, FR10, FR11

---

### Epic 3: Validation des workflows

Le reviewer peut approuver ou rejeter un workflow avec motif et timecode, assurant la traçabilité des décisions.

**FRs couverts :** FR12, FR13, FR14, FR15, FR16, FR17

---

### Epic 4: Collaboration et traçabilité

Les équipes peuvent s'assigner des workflows et consulter l'historique complet des décisions (qui, quand, pourquoi).

**FRs couverts :** FR18, FR19, FR20, FR21, FR22, FR23

---

### Epic 5: Gestion des utilisateurs

L'admin peut gérer les comptes, les rôles et les accès à la plateforme.

**FRs couverts :** FR24, FR25, FR26, FR27

---

## Epic 1: Navigation et découverte des workflows

Le reviewer peut voir tous les workflows, les filtrer selon ses besoins, et identifier rapidement ceux qui nécessitent son attention.

### Story 1.1: Afficher la liste des workflows

En tant que reviewer,
Je veux voir la liste de tous les workflows disponibles,
Afin d'avoir une vue d'ensemble de l'activité de production.

**Acceptance Criteria:**

```gherkin
Given un utilisateur authentifié sur Cockpit
When il accède à la page principale
Then la liste des workflows s'affiche
And chaque workflow affiche : titre, pôle, chaîne, step actuelle, statut
```

---

### Story 1.2: Filtrer les workflows par pôle

En tant que reviewer,
Je veux filtrer les workflows par pôle,
Afin de me concentrer sur les workflows de mon périmètre.

**Acceptance Criteria:**

```gherkin
Given la liste des workflows affichée
When je sélectionne le filtre pôle "Stock"
Then seuls les workflows du pôle "Stock" sont affichés
And le filtre actif est visible
```

```gherkin
Given un filtre pôle actif
When je désélectionne le filtre
Then tous les workflows sont à nouveau affichés
```

---

### Story 1.3: Filtrer les workflows par chaîne

En tant que reviewer,
Je veux filtrer les workflows par chaîne,
Afin de voir uniquement les workflows d'une chaîne spécifique.

**Acceptance Criteria:**

```gherkin
Given la liste des workflows affichée
When je sélectionne le filtre chaîne "France 2"
Then seuls les workflows de la chaîne "France 2" sont affichés
```

```gherkin
Given des filtres pôle et chaîne actifs
Then les filtres se combinent (ET logique)
And seuls les workflows correspondant aux deux critères sont affichés
```

---

### Story 1.4: Filtrer les workflows par step

En tant que reviewer,
Je veux filtrer les workflows par step,
Afin de suivre les workflows à une étape spécifique du process.

**Acceptance Criteria:**

```gherkin
Given la liste des workflows affichée
When je sélectionne le filtre step "Validation QC"
Then seuls les workflows à l'étape "Validation QC" sont affichés
```

---

### Story 1.5: Filtrer les workflows par statut

En tant que reviewer,
Je veux filtrer les workflows par statut,
Afin de voir les workflows en attente, validés ou rejetés.

**Acceptance Criteria:**

```gherkin
Given la liste des workflows affichée
When je sélectionne le filtre statut "En attente"
Then seuls les workflows avec le statut "En attente" sont affichés
```

```gherkin
Given la liste des workflows affichée
When je sélectionne le filtre statut "Rejeté"
Then seuls les workflows avec le statut "Rejeté" sont affichés
```

---

### Story 1.6: Vue "Mes workflows à vérifier"

En tant que reviewer,
Je veux voir un onglet dédié aux workflows qui me sont assignés,
Afin de savoir immédiatement ce qui attend mon action.

**Acceptance Criteria:**

```gherkin
Given un utilisateur authentifié
When il clique sur l'onglet "À vérifier"
Then seuls les workflows assignés à cet utilisateur sont affichés
And le compteur de l'onglet indique le nombre de workflows à vérifier
```

```gherkin
Given un workflow assigné à l'utilisateur
When l'utilisateur valide ou rejette ce workflow
Then le workflow disparaît de la vue "À vérifier"
```

---

### Story 1.7: Afficher les compteurs par statut

En tant que responsable de pôle,
Je veux voir les compteurs de workflows par statut,
Afin de savoir en un coup d'œil si j'ai du travail en attente.

**Acceptance Criteria:**

```gherkin
Given un utilisateur authentifié sur la page principale
Then les compteurs sont affichés : "En attente", "Validés", "Rejetés"
And chaque compteur reflète le nombre de workflows dans ce statut
```

```gherkin
Given des filtres actifs (pôle, chaîne)
Then les compteurs sont recalculés selon les filtres appliqués
```

---

## Epic 2: Preview et visionnage

Le reviewer peut visualiser le contenu vidéo d'un workflow pour évaluer sa conformité avant de prendre une décision.

### Story 2.1: Ouvrir la preview vidéo d'un workflow

En tant que reviewer,
Je veux lancer la preview vidéo d'un workflow,
Afin de vérifier visuellement la conformité de l'asset.

**Acceptance Criteria:**

```gherkin
Given un workflow dans la liste
When je clique sur ce workflow
Then le player vidéo s'ouvre avec la preview de l'asset
And la vidéo est prête à être lue
```

```gherkin
Given un workflow dont la vidéo n'est pas encore disponible en streaming
When je clique sur ce workflow
Then le système déclenche la copie vers S3
And un indicateur de chargement s'affiche
And la lecture démarre automatiquement dès que la vidéo est disponible
```

---

### Story 2.2: Contrôles de lecture vidéo

En tant que reviewer,
Je veux naviguer dans la vidéo avec les contrôles standard,
Afin de vérifier des passages spécifiques de l'asset.

**Acceptance Criteria:**

```gherkin
Given le player vidéo ouvert avec une preview
When je clique sur le bouton play
Then la lecture démarre
```

```gherkin
Given une vidéo en lecture
When je clique sur le bouton pause
Then la lecture se met en pause
```

```gherkin
Given une vidéo en lecture ou en pause
When je clique sur la timeline à un point précis
Then la lecture saute à ce timecode
```

```gherkin
Given une vidéo en lecture
When j'ajuste le volume
Then le niveau sonore change en conséquence
```

---

## Epic 3: Validation des workflows

Le reviewer peut approuver ou rejeter un workflow avec motif et timecode, assurant la traçabilité des décisions.

### Story 3.1: Approuver un workflow

En tant que reviewer,
Je veux approuver un workflow conforme,
Afin qu'il passe à l'étape suivante du process.

**Acceptance Criteria:**

```gherkin
Given un workflow ouvert en preview
When je clique sur le bouton "Approuver"
Then le workflow est marqué comme validé
And le statut du workflow passe à l'étape suivante
And je reviens à la liste des workflows
```

```gherkin
Given un workflow que je viens d'approuver
When je consulte la liste des workflows
Then ce workflow n'apparaît plus dans "À vérifier"
And son statut reflète la validation
```

---

### Story 3.2: Rejeter un workflow avec motif obligatoire

En tant que reviewer,
Je veux rejeter un workflow non conforme en indiquant le motif,
Afin que l'équipe en amont comprenne ce qui doit être corrigé.

**Acceptance Criteria:**

```gherkin
Given un workflow ouvert en preview
When je clique sur le bouton "Rejeter"
Then un formulaire de rejet s'affiche
And le champ "Motif" est obligatoire
```

```gherkin
Given le formulaire de rejet affiché
When je tente de valider sans remplir le motif
Then le système bloque la soumission
And un message indique "Le motif est obligatoire"
```

```gherkin
Given le formulaire de rejet affiché
When je remplis le motif "Désync audio à partir de 01:23"
And je clique sur "Confirmer le rejet"
Then le workflow est marqué comme rejeté
And le motif est enregistré dans l'historique
And le workflow retourne à l'étape précédente
```

---

### Story 3.3: Indiquer un timecode lors du rejet

En tant que reviewer,
Je veux indiquer un timecode précis lors d'un rejet,
Afin de pointer exactement où se situe le problème.

**Acceptance Criteria:**

```gherkin
Given le formulaire de rejet affiché
When je remplis le champ "Timecode" avec "01:23:45"
Then le timecode est enregistré avec le motif de rejet
```

```gherkin
Given le formulaire de rejet affiché
When je laisse le champ "Timecode" vide
Then le rejet est accepté (timecode optionnel)
And seul le motif est enregistré
```

```gherkin
Given une vidéo en pause à un timecode précis
When j'ouvre le formulaire de rejet
Then le timecode actuel est pré-rempli dans le champ
And je peux le modifier si besoin
```

---

## Epic 4: Collaboration et traçabilité

Les équipes peuvent s'assigner des workflows et consulter l'historique complet des décisions (qui, quand, pourquoi).

### Story 4.1: Assigner un workflow à un reviewer

En tant que responsable de pôle,
Je veux assigner un workflow à un reviewer spécifique,
Afin de répartir le travail dans l'équipe.

**Acceptance Criteria:**

```gherkin
Given un workflow dans la liste
When je clique sur "Assigner"
Then une liste des reviewers disponibles s'affiche
```

```gherkin
Given la liste des reviewers affichée
When je sélectionne "Karim"
Then le workflow est assigné à Karim
And Karim voit ce workflow dans son onglet "À vérifier"
And l'assignation est enregistrée dans l'historique
```

```gherkin
Given un workflow déjà assigné à Karim
When je l'assigne à Sophie
Then l'assignation passe à Sophie
And Karim ne voit plus ce workflow dans "À vérifier"
And le changement d'assignation est enregistré dans l'historique
```

---

### Story 4.2: Consulter l'historique des décisions d'un workflow

En tant que reviewer,
Je veux consulter l'historique complet d'un workflow,
Afin de comprendre les décisions passées avant de prendre la mienne.

**Acceptance Criteria:**

```gherkin
Given un workflow ouvert
When je clique sur "Historique"
Then la liste des événements du workflow s'affiche
And les événements sont triés du plus récent au plus ancien
```

```gherkin
Given l'historique d'un workflow affiché
Then chaque événement affiche :
  - Le type d'action (assignation, validation, rejet)
  - Qui a effectué l'action
  - Quand l'action a été effectuée (date et heure)
  - Le motif (pour les rejets)
```

---

### Story 4.3: Traçabilité complète des événements

En tant que responsable de pôle,
Je veux que toutes les actions soient tracées automatiquement,
Afin d'avoir une visibilité complète sur le cycle de vie du workflow.

**Acceptance Criteria:**

```gherkin
Given un workflow
When un reviewer l'approuve
Then l'événement "Validation" est enregistré avec :
  - L'identité du reviewer
  - La date et l'heure
  - Le statut résultant
```

```gherkin
Given un workflow
When un reviewer le rejette
Then l'événement "Rejet" est enregistré avec :
  - L'identité du reviewer
  - La date et l'heure
  - Le motif de rejet
  - Le timecode (si renseigné)
```

```gherkin
Given un workflow
When un utilisateur l'assigne à un reviewer
Then l'événement "Assignation" est enregistré avec :
  - L'identité de l'assigneur
  - L'identité du reviewer assigné
  - La date et l'heure
```

---

## Epic 5: Gestion des utilisateurs

L'admin peut gérer les comptes, les rôles et les accès à la plateforme.

### Story 5.1: Se connecter à Cockpit

En tant qu'utilisateur,
Je veux me connecter via mon compte entreprise,
Afin d'accéder à Cockpit de manière sécurisée.

**Acceptance Criteria:**

```gherkin
Given un utilisateur non authentifié
When il accède à Cockpit
Then il est redirigé vers la page de connexion AWS Cognito
```

```gherkin
Given la page de connexion Cognito
When l'utilisateur saisit ses identifiants valides
Then il est authentifié
And il est redirigé vers la page principale de Cockpit
```

```gherkin
Given un utilisateur authentifié
When il clique sur "Déconnexion"
Then sa session est terminée
And il est redirigé vers la page de connexion
```

---

### Story 5.2: Créer un compte utilisateur

En tant qu'admin,
Je veux créer un compte utilisateur,
Afin d'onboarder un nouveau membre de l'équipe.

**Acceptance Criteria:**

```gherkin
Given un admin sur la page de gestion des utilisateurs
When il clique sur "Créer un utilisateur"
Then un formulaire de création s'affiche
```

```gherkin
Given le formulaire de création affiché
When l'admin renseigne l'email, le nom et le rôle
And clique sur "Créer"
Then le compte est créé
And l'utilisateur reçoit ses accès par email
```

```gherkin
Given le formulaire de création affiché
When l'admin tente de créer un compte avec un email déjà existant
Then le système bloque la création
And un message indique "Cet email est déjà utilisé"
```

---

### Story 5.3: Assigner un rôle à un utilisateur

En tant qu'admin,
Je veux assigner un rôle à un utilisateur,
Afin de définir ses permissions dans Cockpit.

**Acceptance Criteria:**

```gherkin
Given la page de gestion des utilisateurs
When l'admin sélectionne un utilisateur
Then il peut modifier son rôle parmi : Admin, Reviewer, User
```

```gherkin
Given un utilisateur avec le rôle "User"
When l'admin change son rôle en "Reviewer"
Then l'utilisateur peut désormais valider et rejeter des workflows
And le changement prend effet immédiatement
```

```gherkin
Given un utilisateur avec le rôle "Reviewer"
When l'admin change son rôle en "Admin"
Then l'utilisateur peut désormais gérer les autres utilisateurs
```

---

### Story 5.4: Désactiver un compte utilisateur

En tant qu'admin,
Je veux désactiver un compte utilisateur,
Afin de retirer l'accès à un prestataire qui a terminé sa mission.

**Acceptance Criteria:**

```gherkin
Given la page de gestion des utilisateurs
When l'admin clique sur "Désactiver" pour un utilisateur
Then le compte est désactivé
And l'utilisateur ne peut plus se connecter
And ses données sont conservées pour traçabilité
```

```gherkin
Given un compte désactivé
When l'admin clique sur "Réactiver"
Then le compte est réactivé
And l'utilisateur peut à nouveau se connecter
```

---

### Story 5.5: Supprimer un compte utilisateur

En tant qu'admin,
Je veux supprimer définitivement un compte utilisateur,
Afin de retirer complètement un utilisateur du système.

**Acceptance Criteria:**

```gherkin
Given la page de gestion des utilisateurs
When l'admin clique sur "Supprimer" pour un utilisateur
Then une confirmation est demandée "Êtes-vous sûr ? Cette action est irréversible"
```

```gherkin
Given la confirmation de suppression affichée
When l'admin confirme
Then le compte est supprimé
And l'utilisateur disparaît de la liste
And les événements historiques conservent la référence (nom affiché, compte supprimé)
```
