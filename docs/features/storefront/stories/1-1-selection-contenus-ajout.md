# Story 1.1 : Sélection des contenus lors de l'ajout d'un titre

Status: ready-for-dev

## Story

**As a** admin storefront,
**I want** sélectionner quels contenus exposer lorsque j'ajoute un titre,
**So that** je contrôle précisément ce que mes clients peuvent voir pour chaque titre.

## Acceptance Criteria

```gherkin
Scenario: Affichage des options de contenus à l'ajout
  Given un admin dans le drawer d'ajout de titres
  When il clique sur "Add +" pour un titre
  Then un menu s'affiche avec les options de contenus : Feature, Trailer, Marketing, Episode

Scenario: Sélection des contenus
  Given un admin voyant les options de contenus
  When il coche/décoche les types de contenus
  Then seuls les contenus cochés seront visibles côté client pour ce titre

Scenario: Confirmation et affichage des tags
  Given un admin ayant sélectionné des contenus pour un titre
  When il valide l'ajout (clic sur "Save" ou "Done")
  Then le titre apparaît dans la liste du drawer avec des tags indiquant les contenus partagés (ex: "Feature", "Trailer", "+2")

Scenario: Contenus non disponibles grisés
  Given un titre sans contenu d'un certain type dans la distribution
  When l'admin voit les options
  Then ce type de contenu n'est pas proposé ou est grisé
```

## Tasks / Subtasks

- [ ] Task 1 : Modifier le composant Add Titles Drawer (AC: 1, 2, 3)
  - [ ] 1.1 Ajouter les checkboxes pour les types de contenus (Feature, Trailer, Marketing, Episode)
  - [ ] 1.2 Implémenter la logique de sélection/désélection
  - [ ] 1.3 Afficher les tags de contenus sélectionnés sur chaque titre dans la liste
  - [ ] 1.4 Gérer l'état des contenus non disponibles (grisé/masqué)

- [ ] Task 2 : Adapter l'API d'ajout de titres (AC: 2, 3)
  - [ ] 2.1 Modifier la requête POST `/{storefrontId}/titles` pour inclure `exposedContentIds`
  - [ ] 2.2 Gérer le cas par défaut : si `exposedContentIds` absent → tous contenus exposés

- [ ] Task 3 : Récupérer les contenus disponibles par titre (AC: 4)
  - [ ] 3.1 Appeler l'API pour obtenir les contenus disponibles de chaque titre
  - [ ] 3.2 Filtrer les options de checkboxes selon les contenus réellement disponibles

- [ ] Task 4 : Tests (AC: 1, 2, 3, 4)
  - [ ] 4.1 Tests unitaires composant drawer
  - [ ] 4.2 Tests E2E ajout titre avec sélection contenus

## Dev Notes

### Architecture & Patterns

Ce développement impacte le **drawer d'ajout de titres** dans l'interface admin du Storefront.

#### DTOs à utiliser

```typescript
// Request pour ajout de titres (étendu v1.1)
interface AddTitlesRequest {
  titles: Array<{
    titleId: number
    exposedContentIds?: number[]  // Optionnel, si absent → tous contenus exposés
  }>
}

// Enum des types de contenus
enum ContentType {
  FEATURE = 'FEATURE'
  TRAILER = 'TRAILER'
  MARKETING = 'MARKETING'
  EPISODE = 'EPISODE'
}
```

#### Endpoints impliqués

| Méthode | Endpoint | Action |
|---------|----------|--------|
| POST | `/{storefrontId}/titles` | Ajout de titres avec contenus optionnels |

#### Règles métier

| # | Règle |
|---|-------|
| R39 | Ajout titre sans `exposedContentIds` → aucun contenu exposé par défaut |
| R40 | `contentId` doit exister sur le titre | 

### Mockups de référence

- `docs/features/storefront/mockups/growth/Add titles Drawer.png`
- `docs/features/storefront/mockups/growth/Add titles Drawer/Adding.png`

### Project Structure Notes

- Composants admin : `/storefronts/:id/catalog`
- API Admin : `storefront-service/api/admin`

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1]
- [Source: docs/features/storefront/epics.1.1.md#Story-1.1]
- [Source: docs/features/storefront/prd.md#FR-GCS-1]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
