---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - 'docs/features/CPP/PRD-CPP-Cinema-Preservation-Package.md'
  - '_bmad-output/planning-artifacts/epics-cpp.md'
date: 2026-04-10
author: Jerome Gue (VDM)
---

# Product Brief: CPP — Cinema Preservation Package

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

mediaspot intègre le support natif du **Cinema Preservation Package (CPP)**, format standard européen EN17650 pour l'archivage pérenne des œuvres cinématographiques. Cette feature, contractuellement engagée avec Studiocanal (Groupe Canal+), positionne VDM comme **précurseur et expert** dans le domaine de la préservation numérique du patrimoine cinématographique — un marché en croissance couvrant l'ensemble des clients ayant des besoins d'archivage pérenne.

---

## Core Vision

### Problem Statement

Les plateformes MAM/DAM du marché ne supportent pas nativement la norme EN17650 (CPP). Les ayants droits et laboratoires qui doivent archiver leurs œuvres selon cette norme européenne sont contraints de s'appuyer sur des outils externes non intégrés, ce qui fragmente les workflows, génère des dépendances sur des experts rares, et empêche toute industrialisation à grande échelle de la préservation numérique.

### Problem Impact

- **Impact contractuel direct** : VDM est engagé à livrer des CPP pour Studiocanal d'ici mi-2026 — le non-respect expose à des pénalités contractuelles
- **Dépendance opérationnelle** : la fabrication et la validation CPP reposent aujourd'hui sur l'expertise d'un seul ingénieur externe (Yan Rocheteau) et sur des outils hors-plateforme
- **Manque à gagner marché** : sans support CPP natif dans mediaspot, VDM ne peut pas proposer cette prestation à d'autres clients patrimoine que Studiocanal, ni l'industrialiser

### Why Existing Solutions Fall Short

Il n'existe pas aujourd'hui de plateforme MAM/DAM qui intègre nativement la validation et l'ingest de CPP conformes EN17650. Les solutions disponibles sont soit des outils techniques open source (CPP Checker — CLI C#, sans interface ni API), soit des processus manuels nécessitant une expertise très spécialisée sur la norme. Aucune ne s'intègre dans un workflow de production à l'échelle d'un laboratoire.

### Proposed Solution

Intégrer le CPP comme objet natif de mediaspot à travers trois niveaux :
1. **Classe CPP** : un type d'asset dédié dans mediaspot, permettant de représenter un package complet avec ses métadonnées header et sa hiérarchie d'assets enfants
2. **Ingest CPP** : un moteur de validation EN17650 réimplémenté nativement dans mediaspot, qui vérifie la conformité XSD, Schematron, checksums et structure d'un CPP reçu, puis crée automatiquement la hiérarchie d'assets dans mediaspot
3. **Création CPP** : un workflow de fabrication CPP déclenché depuis mediaspot, intégrant le CPPGenerator de Yan via les APIs existantes

### Key Differentiators

- **Premier MAM/DAM à supporter nativement EN17650** : avantage pionnier sur un marché sans concurrent direct à ce niveau d'intégration
- **Validation native embarquée** : les 11 schémas XSD et les règles Schematron CaPPuSCHino sont intégrés dans mediaspot — aucune dépendance externe runtime
- **Expertise VDM capitalisée dans la plateforme** : le savoir-faire développé pour Studiocanal devient un actif produit réutilisable pour tous les clients patrimoine
- **Prestation premium différenciante** : la fabrication et la gestion de CPP devient une offre de service facturée, scalable et outillée plutôt qu'une expertise artisanale

---

## Target Users

### Primary Users

#### 1. L'opérateur CPP chez VDM *(aujourd'hui : Yan Rocheteau, demain : tout Media Manager VDM)*

**Contexte :** Aujourd'hui c'est Yan — ingénieur expert EN17650 — qui fabrique les CPP manuellement hors de mediaspot. À terme, le CPPGenerator sera intégré dans mediaspot et tout Media Manager VDM qualifié pourra déclencher la création, l'ingest ou la validation d'un CPP depuis la plateforme, sans expertise spécialisée sur la norme.

**Ce qu'il fait :** Crée les assets CPP dans mediaspot, y rattache les ImageSequences, déclenche la génération ou l'ingest, consulte les rapports de validation.

**Moment de valeur :** Quand il peut créer un asset CPP complet dans mediaspot via l'interface ou l'API, avec toutes les métadonnées rattachées, sans sortir de la plateforme.

---

#### 2. Le CC / Media Manager VDM *(suivi client & opérations)*

**Contexte :** Aujourd'hui, le processus CPP est opaque pour le CC — il sait que Yan travaille dessus mais n'a aucune visibilité dans mediaspot. Dès l'Epic 1, l'asset CPP devient un objet visible dans mediaspot : le CC peut voir les CPP en cours, leurs métadonnées, leurs assets enfants et leur statut.

**Ce qu'il fait :** Suit l'avancement des CPP pour ses clients, déclenche des requests d'ingest, vérifie la bonne réception d'un CPP livré par un prestataire externe.

**Moment de valeur :** Quand il peut voir dans mediaspot la hiérarchie `Title > CPP > ImageSequences` d'un film Studiocanal et confirmer que le CPP a été validé et ingéré sans erreur.

---

### Secondary Users

#### 3. Les clients de distribution avec patrimoine à préserver *(Studiocanal, SND, Pathé, ...)*

**Contexte :** La norme EN17650 est aux prémices de son adoption — Yan a produit un seul CPP de test à ce jour. Aucun client ne "souffre" encore du problème car le standard n'existe pas encore dans leurs workflows. Mais la pression réglementaire et la nécessité d'archiver le patrimoine numérique de manière pérenne va faire de cette norme un passage obligé. SND a déjà des LTO d'archivage avec des fichiers Excel associés — ils sont en avance sur la pratique mais en dehors de toute norme formelle. L'objectif est que tous ces acteurs adoptent le CPP à terme.

**Ce qu'ils font :** Commandent des CPP à VDM pour archiver leurs œuvres, ou envoient des CPP fabriqués par d'autres prestataires pour ingest dans mediaspot.

**Moment de valeur :** Quand ils reçoivent un CPP conforme EN17650 fabriqué par VDM, ou quand un CPP externe est ingéré et validé automatiquement dans leur instance mediaspot.

---

### User Journey

```
[Aujourd'hui — Court terme]
VDM reçoit une demande d'archivage Studiocanal
  → Métadonnées saisies dans mediaspot sur les assets ImageSequence existants
  → Yan appelle l'API mediaspot pour récupérer les métadonnées
  → Yan génère le CPP avec le CPPGenerator (hors mediaspot)
  → Yan crée manuellement l'asset CPP dans mediaspot (Epic 1) et y lie les ImageSequences
  → Livraison du CPP à Studiocanal

[Demain — Moyen terme, après Epic 2 & 3]
Réception d'un CPP d'un prestataire externe
  → Dépôt dans la zone de transit (patrimoine_SC)
  → Validation automatique EN17650 (XSD, Schematron, checksums)
  → Rapport de validation → rejet avec détail des erreurs ou acceptation
  → Création automatique de la hiérarchie Title > CPP > Assets dans mediaspot

[Cible — Long terme, après Epic CPP Creator]
Demande d'archivage reçue dans mediaspot
  → Assets ImageSequence existants ou créés dans mediaspot
  → Déclenchement du CPP Creator depuis un workflow mediaspot
  → Génération, validation, livraison — entièrement depuis mediaspot
```

---

## Success Metrics

### Métriques de succès utilisateur

| Métrique | Cible | Mesure |
|---|---|---|
| Asset CPP créable via API par Yan sans support dev | D'ici fin avril 2026 | Epic 1 livré et validé par Yan |
| CPP de Studiocanal représentés dans mediaspot | 100% des CPP fabriqués par VDM d'ici mi-2026 | Nb d'assets CppPackage dans mediaspot |
| Taux de validation CPP sans erreur bloquante | ≥ 95% des CPP fabriqués par VDM | Nb de CheckSummaryItems failed = 0 |
| Temps de validation d'un CPP (~14 TB) | À définir avec l'équipe technique | Durée Phase 1 mesurée en production |

### Business Objectives

| Objectif | Horizon | Indicateur |
|---|---|---|
| Respecter les engagements contractuels Studiocanal | Mi-2026 | Livraison CPP sans pénalités |
| Devenir la référence MAM pour la préservation EN17650 | 12-18 mois | 1er autre client (SND, Pathé...) utilisant le CPP dans mediaspot |
| Capitaliser l'expertise CPP dans la plateforme | 18 mois | CPP Creator intégré dans mediaspot — Yan n'est plus nécessaire pour la fabrication |
| Industrialiser la prestation CPP | 24 mois | Fabrication et ingest CPP possible sans expertise EN17650 spécifique chez l'opérateur |

### Key Performance Indicators

- **KPI 1 — Contractuel :** Zéro pénalité sur la livraison CPP Studiocanal d'ici mi-2026
- **KPI 2 — Adoption :** Nombre de CPP gérés dans mediaspot (fabriqués + ingérés) — cible : 10 CPP d'ici fin 2026
- **KPI 3 — Expansion client :** Nombre de clients hors Studiocanal ayant souscrit à une prestation CPP — cible : 1 nouveau client d'ici fin 2026
- **KPI 4 — Autonomie :** Epic CPP Creator livré — fabrication CPP déclenchable depuis mediaspot sans intervention de Yan
- **KPI 5 — Qualité :** Taux de conformité des CPP générés par VDM validés sans erreur EN17650

---

## MVP Scope

### Core Features

**Epic 1 — Type d'asset CPP *(MVP immédiat, bloquant)* :**
- Type d'asset `CppPackage` dans mediaspot (ObjectType, ObjectClass, Groupe)
- 15 champs de métadonnées CPP header
- Hiérarchie `Title > CPP > Assets enfants`
- Règle d'interdiction CPP > CPP
- Story 1.1 = livrable minimal pour débloquer Yan immédiatement

**Epic 2 — Moteur de validation EN17650 *(MVP core)* :**
- Réimplémentation native de la logique CPP Checker (XSD, Schematron, checksums, structure, TechMD)
- 11 schémas XSD et règles Schematron CaPPuSCHino embarqués dans mediaspot
- Pattern CheckSummaryItem — accumulation de toutes les erreurs, rejet total si une seule erreur
- Rapport de validation complet (pass et failed)

**Epic 3 — Pipeline d'ingest *(MVP complet)* :**
- Création automatique de la hiérarchie mediaspot depuis un CPP validé
- Alimentation des métadonnées depuis les XML EBUCore/PREMIS
- Gestion des séquences non contiguës
- Rapport attaché à l'asset CPP

### Out of Scope pour ce MVP

- **CPP Creator / CPPGenerator intégré dans mediaspot** — fabrication CPP depuis mediaspot (Epic P3 du PRD) : reporté après les Epics 1-2-3
- **Interface UI dédiée CPP** — visualisation rich du rapport de validation, tree-explorer : à prioriser dans une itération suivante
- **Connexion automatique du stockage patrimoine_SC à mediaspot** — la détection automatique de nouveaux CPP déposés reste manuelle pour l'instant
- **Support d'autres clients que Studiocanal** — le modèle de données et les règles de validation sont génériques EN17650, mais les spécifications "libres" propres à chaque client (ex : format Synopsis) ne sont pas encore définies
- **Proxies dans les CPP** — Studiocanal ne souhaite pas de proxies dans ses CPP (autres clients à confirmer)

### MVP Success Criteria

- Yan peut créer un asset CPP via l'API mediaspot et y lier ses ImageSequences **sans support développement** → Epic 1 validé
- Le CPP de MONSIEUR N. passe la validation EN17650 sans erreur → Epic 2 validé sur cas réel
- Les 2 assets ImageSequence de MONSIEUR N. (IDs 8614878 et 8653822) sont ingérés avec leur hiérarchie complète dans mediaspot → Epic 3 validé sur cas réel
- Zéro pénalité contractuelle Studiocanal sur les livraisons CPP d'ici mi-2026

### Future Vision

- **CPP Creator natif** : workflow mediaspot complet de fabrication CPP — déclenché depuis mediaspot, sans Yan, pour n'importe quel client
- **Multi-client CPP** : chaque client (SND, Pathé...) dispose de ses propres spécifications CPP définissant les règles de présentation des métadonnées libres
- **Écosystème préservation** : mediaspot devient la plateforme de référence pour la gestion du cycle de vie complet des CPP — fabrication, validation, ingest, archivage LTO, vérification périodique des checksums
- **Interopérabilité** : échange de CPP entre instances mediaspot de différents laboratoires — VDM reçoit un CPP fabriqué par Éclair ou Pathé et l'ingère directement
