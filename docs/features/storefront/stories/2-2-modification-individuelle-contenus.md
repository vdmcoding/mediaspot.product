# Story 2.2 : Modification individuelle des contenus

Status: ready-for-dev

## Story

**As a** admin storefront,
**I want** modifier les contenus exposés pour un titre spécifique,
**So that** je puisse ajuster la visibilité après l'ajout initial.

## Acceptance Criteria

```gherkin
Scenario: Ouverture du drawer de modification
  Given un admin sur l'onglet Catalogue
  And un titre déjà ajouté au storefront
  When il clique sur la ligne du titre
  Then un drawer s'ouvre avec les options de contenus

Scenario: Affichage de l'état actuel
  Given un admin dans le drawer de modification
  When il voit les checkboxes Feature, Trailer, Marketing, Episode
  Then l'état actuel (coché/décoché) reflète la configuration existante

Scenario: Sauvegarde des modifications
  Given un admin modifiant les contenus
  When il coche/décoche des options et clique sur "Save"
  Then les modifications sont sauvegardées
  And la liste se rafraîchit avec les nouveaux tags dans "Shared contents"

Scenario: Annulation des modifications
  Given un admin modifiant les contenus
  When il clique sur "Cancel" ou ferme le drawer
  Then les modifications sont annulées
```

## Tasks / Subtasks

- [ ] Task 1 : Créer le drawer de modification des contenus (AC: 1, 2)
  - [ ] 1.1 Créer le composant drawer avec checkboxes par type de contenu
  - [ ] 1.2 Charger et afficher l'état actuel des contenus exposés
  - [ ] 1.3 Griser les contenus non disponibles pour le titre

- [ ] Task 2 : Implémenter le clic sur ligne du tableau (AC: 1)
  - [ ] 2.1 Ajouter handler de clic sur les lignes du catalogue
  - [ ] 2.2 Ouvrir le drawer avec les données du titre sélectionné

- [ ] Task 3 : Implémenter la sauvegarde (AC: 3)
  - [ ] 3.1 Appeler PUT `/{storefrontId}/titles/{titleId}/contents`
  - [ ] 3.2 Invalider le cache et rafraîchir la liste
  - [ ] 3.3 Afficher notification de succès

- [ ] Task 4 : Implémenter l'annulation (AC: 4)
  - [ ] 4.1 Reset des valeurs au clic Cancel
  - [ ] 4.2 Fermeture du drawer sans sauvegarde

- [ ] Task 5 : Tests (AC: 1, 2, 3, 4)
  - [ ] 5.1 Tests unitaires drawer de modification
  - [ ] 5.2 Tests E2E modification et sauvegarde

## Dev Notes

### Architecture & Patterns

Cette story permet la **modification individuelle** des contenus exposés pour un titre déjà ajouté.

#### DTOs

```typescript
// Response pour un titre spécifique
interface StorefrontTitleContent {
  titleId: number
  exposedContentIds: number[]  // IDs des contenus exposés
}

// Request de modification
interface UpdateTitleContentsRequest {
  exposedContentIds: number[]
}
```

#### Endpoints

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| GET | `/{storefrontId}/titles/{titleId}` | Détails d'un titre | - | `StorefrontCatalogItem` |
| PUT | `/{storefrontId}/titles/{titleId}/contents` | Modifier contenus | `{ exposedContentIds: number[] }` | `StorefrontTitleContent` |

#### Cache Tags RTK Query

| Tag | Invalidation |
|-----|--------------|
| `StorefrontCatalog` | PUT contents |
| `StorefrontTitleContents` | PUT `/{id}/titles/{titleId}/contents` |

### Mockups de référence

- `docs/features/storefront/mockups/growth/Drawer.png`
- `docs/features/storefront/mockups/growth/Drawer-1.png`

### Project Structure Notes

- Route admin : `/storefronts/:id/catalog`
- Drawer réutilisable avec le drawer d'ajout (même logique checkboxes)

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1 - Modification individuelle]
- [Source: docs/features/storefront/epics.1.1.md#Story-2.2]
- [Source: docs/features/storefront/prd.md#FR-GCS-5]
- Règles métier : R43, R44

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
