# Storefront v1.1 - Stories Index

**Phase :** Growth - Sélection granulaire des contenus
**Version :** 1.1
**Date :** 2026-01-23

## Vue d'ensemble

Ce dossier contient les User Stories détaillées pour la phase Growth du Storefront Mediaspot.

**Objectif :** Permettre aux admins de contrôler finement quels contenus sont exposés par titre sur le storefront.

## Stories par Epic

### Epic 1 : Sélection des contenus à l'ajout

| Story | Titre | Status |
|-------|-------|--------|
| [1.1](1-1-selection-contenus-ajout.md) | Sélection des contenus lors de l'ajout d'un titre | ready-for-dev |
| [1.2](1-2-configuration-defaut-contenus.md) | Configuration par défaut des contenus | ready-for-dev |

**FRs couverts :** FR-GCS-1, FR-GCS-2, FR-GCS-3

---

### Epic 2 : Gestion des contenus post-ajout

| Story | Titre | Status |
|-------|-------|--------|
| [2.1](2-1-vue-enrichie-catalogue.md) | Vue enrichie du catalogue admin | ready-for-dev |
| [2.2](2-2-modification-individuelle-contenus.md) | Modification individuelle des contenus | ready-for-dev |
| [2.3](2-3-modification-bulk-contenus.md) | Modification bulk des contenus | ready-for-dev |

**FRs couverts :** FR-GCS-4, FR-GCS-5, FR-GCS-6

---

### Epic 3 : Player client filtré

| Story | Titre | Status |
|-------|-------|--------|
| [3.1](3-1-player-filtre.md) | Player affichant uniquement les contenus exposés | ready-for-dev |
| [3.2](3-2-securite-contenus-non-exposes.md) | Sécurité des contenus non exposés | ready-for-dev |

**FRs couverts :** FR-GCS-7, FR-GCS-8

---

## Documents de référence

- [PRD Storefront](../prd.md)
- [Architecture API](../architecture.md)
- [Epics v1.1](../epics.1.1.md)

## Ordre d'implémentation recommandé

1. **Story 1.1** → Base de la sélection à l'ajout
2. **Story 1.2** → Configuration par défaut (dépend de 1.1)
3. **Story 2.1** → Vue enrichie (peut être parallèle à 1.x)
4. **Story 2.2** → Modification individuelle (dépend de 2.1)
5. **Story 2.3** → Modification bulk (dépend de 2.2)
6. **Story 3.1** → Player filtré (peut être parallèle à 2.x)
7. **Story 3.2** → Sécurité (dépend de 3.1)
