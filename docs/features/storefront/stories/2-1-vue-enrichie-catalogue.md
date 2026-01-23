# Story 2.1 : Vue enrichie du catalogue admin

Status: ready-for-dev

## Story

**As a** admin storefront,
**I want** voir d'un coup d'oeil les contenus et métadonnées techniques de chaque titre,
**So that** je puisse rapidement identifier les titres et leurs caractéristiques.

## Acceptance Criteria

```gherkin
Scenario: Colonnes du catalogue enrichi
  Given un admin sur l'onglet Catalogue d'un storefront
  When il consulte la liste des titres
  Then il voit les colonnes suivantes :
    | Colonne            | Contenu                                    |
    |--------------------|--------------------------------------------|
    | Title              | Visuel + nom du titre                      |
    | Shared contents    | Tags des types de contenus exposés         |
    | Best Quality       | Qualité maximale disponible (ex: 4K, HD)   |
    | Audio Languages    | Langues audio disponibles                  |
    | Subtitle Languages | Langues de sous-titres disponibles         |

Scenario: Affichage des tags avec indicateur de surplus
  Given un admin voyant la colonne "Shared contents"
  When un titre a plusieurs contenus
  Then les tags principaux sont affichés (ex: "Feature", "Trailer") avec un indicateur du reste (ex: "+2")
```

## Tasks / Subtasks

- [ ] Task 1 : Modifier le tableau du catalogue admin (AC: 1)
  - [ ] 1.1 Ajouter la colonne "Shared contents" avec tags
  - [ ] 1.2 Ajouter la colonne "Best Quality"
  - [ ] 1.3 Ajouter la colonne "Audio Languages"
  - [ ] 1.4 Ajouter la colonne "Subtitle Languages"

- [ ] Task 2 : Adapter l'API pour retourner les métadonnées enrichies (AC: 1)
  - [ ] 2.1 Modifier GET `/{storefrontId}/titles` pour inclure les nouvelles données
  - [ ] 2.2 Implémenter le DTO `StorefrontCatalogItem` enrichi

- [ ] Task 3 : Implémenter l'affichage des tags avec overflow (AC: 2)
  - [ ] 3.1 Créer composant Tag pour les contenus
  - [ ] 3.2 Implémenter la logique d'affichage limité avec "+N"
  - [ ] 3.3 Tooltip ou popover au survol pour voir tous les contenus

- [ ] Task 4 : Tests (AC: 1, 2)
  - [ ] 4.1 Tests unitaires composants colonnes
  - [ ] 4.2 Tests E2E affichage catalogue enrichi

## Dev Notes

### Architecture & Patterns

Cette story modifie la **vue liste du catalogue admin** pour afficher plus de métadonnées.

#### DTO enrichi (Response)

```typescript
interface StorefrontCatalogItem {
  titleId: number
  titleName: string
  thumbnailUrl: string | null
  exposedContentIds: number[]      // IDs des contenus exposés
  bestQuality: string              // Qualité maximale disponible (ex: "4K", "HD", "SD")
  audioLanguages: string[]         // Langues audio disponibles (ex: ["FR", "EN", "DE"])
  subtitleLanguages: string[]      // Langues sous-titres disponibles
}
```

#### Endpoint modifié

| Méthode | Endpoint | Action | Response |
|---------|----------|--------|----------|
| GET | `/{storefrontId}/titles` | Lister titres avec contenus | `StorefrontCatalogItem[]` |

#### Règles d'affichage des tags

- Afficher max 2-3 tags visibles
- Indicateur "+N" pour le surplus
- Tooltip/popover au survol pour liste complète

### Mockups de référence

- `docs/features/storefront/mockups/growth/Storefront/Admin/Catalog.png`

### Project Structure Notes

- Route admin : `/storefronts/:id/catalog`
- Composants table existants à étendre
- Cache RTK Query : `StorefrontCatalog`

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1 - StorefrontCatalogItem]
- [Source: docs/features/storefront/epics.1.1.md#Story-2.1]
- [Source: docs/features/storefront/prd.md#FR-GCS-4]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
