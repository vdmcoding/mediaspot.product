---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
classification:
  projectType: web_app
  domain: media_broadcast
  complexity: medium
  projectContext: brownfield
  scale:
    totalUsers: 50
    concurrentUsers: 25-50
    userTypes: [internal, contractors]
  integration:
    ffastrans: read-only
    role: consumer
  criticality: medium
inputDocuments:
  - source-docs/types/workflow.ts
  - source-docs/types/enums.ts
  - source-docs/types/user.ts
  - source-docs/types/auth.ts
  - source-docs/types/workflow-activity.ts
  - source-docs/db/schema.ts
  - source-docs/functions/workflows.ts
  - source-docs/functions/users.ts
  - source-docs/functions/auth.ts
  - source-docs/functions/use-workflow-mutations.ts
  - source-docs/mockups/Mes workflows (resp. pôle).png
  - source-docs/mockups/Mes workflows (Reviewers).png
  - source-docs/mockups/Mes workflows (Reviewers)-1.png
  - source-docs/mockups/Tous les workflows + player.png
  - source-docs/mockups/Tous les workflows + assigner à.png
  - source-docs/mockups/Tous les workflows + formulaire de rejet.png
  - source-docs/mockups/Tous les workflows + formulaire de rejet-1.png
  - source-docs/mockups/Workflow approuvé.png
  - source-docs/mockups/Workflow rejeté.png
  - source-docs/Archi BA.drawio.svg
workflowType: prd
documentCounts:
  code: 10
  mockups: 9
  architecture: 1
  briefs: 0
  research: 0
projectType: brownfield
---

# Product Requirements Document - Cockpit

**Author:** Ben
**Date:** 2026-01-27

## Contexte

Cockpit est un outil de suivi et validation des workflows de post-production vidéo pour France Télévisions. Il consomme les données de FFAStrans (ferme FFmpeg on-premise) et permet aux équipes de suivre, valider et collaborer sur les assets vidéo en cours de fabrication.

**Situation actuelle :** L'outil legacy existant est utilisé par une seule personne. Cockpit vise à démocratiser l'usage et introduire un nouveau workflow de validation collaborative tracée.

**Transformation visée :**
- De : 1 personne gère tout, échanges informels (mail/oral)
- Vers : Équipe distribuée (~50 users), collaboration tracée dans l'outil

## Success Criteria

### User Success

| Critère | Cible | Rationale |
|---------|-------|-----------|
| Onboarding | < 15 min en autonomie | Prestas qui tournent, formation asynchrone requise |
| Listing + Preview | < 3 clics | Action la plus fréquente = doit être instantanée |
| Adoption validation | 80%+ des rejets tracés dans Cockpit | Nouvel usage à faire adopter |

### Business Success

| Critère | Cible | Rationale |
|---------|-------|-----------|
| Traçabilité | 100% des décisions avec historique | Plus de "pourquoi c'était rejeté ?" |
| Visibilité | Dashboard "suis-je à jour ?" en 1 coup d'œil | Répondre à "est-ce que j'ai du travail ?" |
| Réduction échanges informels | -50% de mails/Slack sur les workflows | La collaboration se fait dans l'outil |

### Technical Success

| Critère | Cible | Rationale |
|---------|-------|-----------|
| Performance listing | < 1s pour 500 workflows | Fluidité d'usage |
| Sync FFAStrans | Real-time | Source de vérité cohérente |
| Disponibilité | 99% pendant heures ouvrées | Criticité medium |

### Measurable Outcomes

- **M+3 :** 100% des utilisateurs formés, 50%+ des rejets tracés dans Cockpit
- **M+6 :** 80%+ des rejets tracés, feedback utilisateurs positif sur la simplicité

## Product Scope

### MVP (Scope de ce PRD)

| Feature | Description |
|---------|-------------|
| Listing | Liste des workflows avec filtres (pôle, chaîne, step, priorité, statut) |
| Preview | Visualisation vidéo intégrée |
| Validation | Approuver / Rejeter avec motif obligatoire + timecode optionnel |
| Assignation | Assigner un workflow à un reviewer |
| Historique | Traçabilité des décisions (qui, quand, pourquoi) |

### Hors Scope (Discovery future)

- Notifications (alertes sur les workflows nécessitant mon attention)
- Dashboard analytics avancé
- Recherche avancée
- Alertes automatiques intelligentes
- Intégration calendrier
- Vue client externe (validation finale par les diffuseurs)

## User Personas

### Karim - Reviewer (Équipe Fabrication)

**Contexte :** Technicien dans l'équipe fabrication. Gère plusieurs workflows par jour. Entre deux tâches de prod, vérifie que les assets sortants sont conformes avant passage à l'étape suivante.

**Frustration actuelle :** Quand il rejette, il doit envoyer un mail ou passer un coup de fil. Personne ne sait pourquoi c'était rejeté 2 semaines plus tard.

### Sophie - Responsable de Pôle

**Contexte :** Supervise le pôle Stock. Gère 50-100 workflows/jour et doit s'assurer que tout avance. Valide personnellement les workflows critiques avant diffusion antenne.

**Frustration actuelle :** Passe son temps à demander "où on en est ?" par Slack. Pas de vue d'ensemble.

### Marc - Admin (Responsable Chaîne)

**Contexte :** Utilisateur historique de l'outil legacy. Gère toute la chaîne de fabrication et doit onboarder 50 personnes sur Cockpit.

**Frustration actuelle :** Seul à avoir la visibilité. Tout le monde lui demande des infos qu'ils pourraient avoir eux-mêmes.

### Client Final (Hors MVP - Vision Future)

**Contexte :** Le client final (chaîne, diffuseur) doit valider l'asset avant diffusion. Aujourd'hui il reçoit un lien Drive et répond par mail.

**Vision :** Accès Cockpit avec vue limitée aux workflows "Prêt pour diffusion" de ses contenus. Peut visualiser et donner la validation finale directement dans l'outil.

## User Journeys

### Journey 1 : Karim valide un asset conforme

> Karim arrive le matin, ouvre Cockpit. Il voit **3 workflows en attente** dans son onglet "À vérifier". Il clique sur le premier, le player s'ouvre. Il regarde les 30 premières secondes, vérifie l'audio, tout est bon. Il clique **"Approuver"**. Le workflow passe à l'étape suivante. Temps total : 2 minutes.

**Capabilities révélées :** Listing filtré "mes workflows à vérifier", preview vidéo intégré, action "Approuver" en 1 clic

### Journey 2 : Karim rejette un asset non conforme

> Karim ouvre un workflow, lance la preview. À 01:23, il repère un problème de sync audio. Il clique **"Rejeter"**, indique le timecode 01:23 et écrit "Désync audio à partir de 01:23, vérifier la source". Le workflow retourne à l'étape précédente. Le motif est enregistré dans l'historique.

**Capabilities révélées :** Rejet avec motif obligatoire, timecode optionnel, historique traçable

### Journey 3 : Sophie fait son point quotidien

> Sophie ouvre Cockpit à 9h. Son dashboard lui montre : **12 workflows en attente de validation**, **3 workflows critiques** à traiter avant 14h, **87 workflows en cours** sans action requise. Elle sait immédiatement où concentrer son énergie.

**Capabilities révélées :** Vue "mes workflows" filtrée par pôle, indicateurs visuels de priorité, compteurs par statut

### Journey 4 : Sophie valide un workflow critique avant diffusion

> Sophie consulte le listing filtré sur les workflows critiques. Elle ouvre un workflow, vérifie la preview, consulte l'historique (2 rejets précédents, corrigés). Tout est OK, elle clique "Approuver". L'asset part en diffusion.

**Capabilities révélées :** Listing filtré par priorité, historique des décisions passées, validation finale

### Journey 5 : Marc onboarde un nouveau presta

> Un nouveau presta arrive lundi. Marc ouvre l'admin Cockpit, crée un compte, assigne le rôle "Reviewer", limite les permissions au pôle "Jeunesse" et aux chaînes F4/F5. Le presta reçoit ses accès et peut commencer à travailler en autonomie.

**Capabilities révélées :** Gestion utilisateurs, rôles, permissions granulaires (pôle, chaîne)

### Journey 6 (Vision Future) : Client final valide l'asset

> Le client reçoit une **notification** : "Asset XYZ prêt pour validation finale". Il ouvre Cockpit (vue client), voit uniquement les assets qui le concernent. Il lance la preview, vérifie, clique "Validé pour diffusion". L'équipe interne est notifiée, l'asset part en diffusion.

**Capabilities révélées (future) :** Vue externe limitée, permissions par client/contenu, validation finale externe

### Journey Requirements Summary

| Capability | Journeys MVP | Journey Future |
|------------|--------------|----------------|
| Listing filtré (pôle, chaîne, statut, priorité) | 1, 2, 3, 4 | |
| Preview vidéo intégrée | 1, 2, 4 | 6 |
| Approuver en 1 clic | 1, 4 | 6 |
| Rejeter avec motif + timecode | 2 | |
| Historique des décisions | 2, 4 | |
| Compteurs par statut | 3 | |
| Gestion utilisateurs + permissions | 5 | |
| Notifications | | 6 |
| Vue externe client | | 6 |

## Domain-Specific Requirements

### Sécurité des Assets

| Contrainte | Implémentation |
|------------|----------------|
| Vidéos sensibles | Aucun accès direct aux NAS de stockage |
| Accès contrôlé | Fichier copié vers S3 à la demande uniquement |
| Lecture sécurisée | Player intégré, pas de téléchargement direct |

### Contraintes Techniques

| Aspect | Valeur | Statut |
|--------|--------|--------|
| Formats supportés | MP4, MOV (standards) | ✅ Pas de codec exotique |
| Latence streaming | 3-10 secondes | ✅ Acceptable |
| Limites FFAStrans | Aucune connue | ✅ Pas de contrainte |

### Intégration FFAStrans

- Mode read/write
- Sync données en real-time
- Pas de limite de volume connue côté FFAStrans

## Web App Specific Requirements

### Architecture Technique

| Aspect | Décision |
|--------|----------|
| Type | SPA (React) |
| Backend | .NET API |
| Hosting | AWS (CloudFront, App Runner, RDS) |
| Auth | AWS Cognito |

### Support Navigateurs

| Navigateur | Supporté |
|------------|----------|
| Chrome (dernières versions) | ✅ |
| Firefox (dernières versions) | ✅ |
| Safari (dernières versions) | ✅ |
| Edge (dernières versions) | ✅ |

*Compatibilité assurée par shadcn/ui et standards web modernes.*

### Responsive Design

| Device | MVP | Phase 2 |
|--------|-----|---------|
| Desktop | ✅ | ✅ |
| Tablette | ✅ | ✅ |
| Mobile | ❌ | À évaluer |

### Performance Targets

| Métrique | Cible | Source |
|----------|-------|--------|
| Chargement listing | < 1s pour 500 workflows | Success criteria |
| Sync FFAStrans | Real-time | Business requirement |
| Latence streaming | 3-10s | Acceptable |

### Real-time
- WebSocket (mise à jour en push de la liste des workflows)

### Accessibilité

- Pas d'obligation légale RGAA/WCAG (entreprise privée)
- Bonne base assurée par shadcn/ui (composants accessibles par défaut)
- Focus sur l'UX et la simplicité d'usage

## Functional Requirements

### Gestion des Workflows

- **FR1:** Un utilisateur peut voir la liste de tous les workflows
- **FR2:** Un utilisateur peut filtrer les workflows par pôle
- **FR3:** Un utilisateur peut filtrer les workflows par chaîne
- **FR4:** Un utilisateur peut filtrer les workflows par step
- **FR5:** Un utilisateur peut filtrer les workflows par priorité
- **FR6:** Un utilisateur peut filtrer les workflows par statut
- **FR7:** Un utilisateur peut voir ses workflows assignés ("À vérifier")
- **FR8:** Un utilisateur peut voir les compteurs de workflows par statut

### Preview & Visualisation

- **FR9:** Un utilisateur peut lancer la preview vidéo d'un workflow
- **FR10:** Un utilisateur peut naviguer dans la vidéo (lecture, pause, seek)
- **FR11:** Le système copie la vidéo vers S3 à la demande pour le streaming

### Validation

- **FR12:** Un reviewer peut approuver un workflow
- **FR13:** Un reviewer peut rejeter un workflow
- **FR14:** Un reviewer doit fournir un motif lors d'un rejet
- **FR15:** Un reviewer peut indiquer un timecode lors d'un rejet
- **FR16:** Le système met à jour le statut du workflow après validation
- **FR17:** Le système met à jour le statut du workflow après rejet

### Collaboration & Assignation

- **FR18:** Un utilisateur peut assigner un workflow à un reviewer

### Traçabilité & Historique

- **FR19:** Un utilisateur peut consulter l'historique des décisions d'un workflow
- **FR20:** L'historique affiche qui a pris la décision
- **FR21:** L'historique affiche quand la décision a été prise
- **FR22:** L'historique affiche le motif de la décision
- **FR23:** L'historique enregistre l'assignation, le rejet et la validation

### Gestion des Utilisateurs

- **FR24:** Un admin peut créer un compte utilisateur
- **FR25** Un admin peut désactiver un compte
- **FR25** Un admin peut supprimer un compte
- **FR26:** Un admin peut assigner un rôle à un utilisateur (admin, reviewer, user)
- **FR27:** Un utilisateur peut se connecter via AWS Cognito

## Non-Functional Requirements

### Performance

| Métrique | Cible | Contexte |
|----------|-------|----------|
| Chargement listing | < 1s pour 500 workflows | Fluidité d'usage quotidien |
| Latence streaming | 3-10s | Acceptable pour preview |
| Actions utilisateur | < 2s (approuver, rejeter, assigner) | UX réactive |

### Security

| Exigence | Implémentation |
|----------|----------------|
| Authentification | AWS Cognito (SSO entreprise) |
| Autorisation | RBAC (admin, reviewer, user) + permissions par pôle/chaîne |
| Protection assets | Pas d'accès direct NAS, copie S3 à la demande |
| Streaming | URLs signées, pas de téléchargement direct |

### Integration

| Système | Mode | Exigence |
|---------|------|----------|
| FFAStrans | Read / Write | Websockets |
| AWS S3 | Write | Copie vidéo à la demande |
| AWS Cognito | Auth | SSO entreprise |

### Reliability

| Métrique | Cible | Contexte |
|----------|-------|----------|
| Disponibilité | 99% heures ouvrées | Criticité medium |
| Perte de données | 0% sur les décisions de validation | Traçabilité critique |
