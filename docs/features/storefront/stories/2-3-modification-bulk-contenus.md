# Story 2.3 : Modification bulk des contenus

Status: ready-for-dev

## Story

**As a** admin storefront,
**I want** modifier les contenus de plusieurs titres en une seule action,
**So that** je puisse appliquer rapidement une configuration sur un ensemble de titres.

## Acceptance Criteria

```gherkin
Scenario: Bouton Manage contents visible
  Given un admin sur l'onglet Catalogue
  When il clique sur "Manage contents"
  Then une modal s'ouvre avec les options : Feature, Trailer, Marketing, Episode

Scenario: Bannière multi-sélection
  Given un admin ayant sélectionné des titres
  Then une bannière multi-select avec un bouton "Manage Contents" s'affiche

Scenario: Ouverture modal depuis multi-sélection
  Given un admin cliquant sur le bouton "Manage contents" de la bannière de Multi-sélection
  Then la modal bulk s'ouvre
  And il voit un message indiquant le nombre de titres sélectionnés

Scenario: Message explicatif dans la modal
  Given un admin dans la modal bulk
  When il voit le message explicatif
  Then il lit "Edit the shared contents in bulk. This will replace your current selection."

Scenario: Application en best effort
  Given un admin configurant les contenus en bulk
  When il coche les options souhaitées et clique sur "Apply to all"
  Then les contenus sélectionnés sont activés en best effort sur tous les titres du tableau
  And si un type de contenu n'existe pas pour un titre donné, il est ignoré pour ce titre
  And les autres contenus (non cochés) sont désactivés

Scenario: Annulation
  Given un admin dans la modal bulk
  When il clique sur "Cancel"
  Then aucune modification n'est appliquée
  And la modal se ferme
```

## Tasks / Subtasks

- [ ] Task 1 : Implémenter la sélection multiple dans le tableau (AC: 2)
  - [ ] 1.1 Ajouter checkboxes de sélection sur chaque ligne
  - [ ] 1.2 Afficher la bannière avec nombre de titres sélectionnés

- [ ] Task 2 : Créer la modal de modification bulk (AC: 1, 3, 4)
  - [ ] 2.1 Créer le composant modal avec checkboxes par type
  - [ ] 2.2 Afficher le message explicatif
  - [ ] 2.3 Afficher le nombre de titres sélectionnés

- [ ] Task 3 : Implémenter l'action "Apply to all" (AC: 5)
  - [ ] 3.1 Appeler PATCH `/{storefrontId}/titles/contents` avec les titres sélectionnés
  - [ ] 3.2 Gérer le best effort côté frontend (ignorer erreurs partielles)
  - [ ] 3.3 Rafraîchir la liste après application
  - [ ] 3.4 Afficher notification de succès avec détails

- [ ] Task 4 : Implémenter l'annulation (AC: 6)
  - [ ] 4.1 Fermer la modal sans action
  - [ ] 4.2 Conserver la sélection de titres

- [ ] Task 5 : Tests (AC: 1-6)
  - [ ] 5.1 Tests unitaires modal et sélection
  - [ ] 5.2 Tests E2E modification bulk

## Dev Notes

### Architecture & Patterns

Cette story permet la **modification en masse** des contenus pour plusieurs titres simultanément.

#### DTOs

```typescript
// Enum des types de contenus (utilisé pour bulk uniquement)
enum ContentType {
  FEATURE = 'FEATURE'
  TRAILER = 'TRAILER'
  MARKETING = 'MARKETING'
  EPISODE = 'EPISODE'
}

// Request pour modification bulk
interface BulkContentUpdateRequest {
  titleIds: number[]
  contentTypes: ContentType[]  // Types à activer (best effort par type)
}

// Response
type BulkContentUpdateResponse = StorefrontTitleContent[]
```

#### Endpoint

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| PATCH | `/{storefrontId}/titles/contents` | Modification bulk | `BulkContentUpdateRequest` | `StorefrontTitleContent[]` |

#### Règles métier

| # | Règle |
|---|-------|
| R45 | Sélection multiple titres → bouton "Manage contents" |
| R46 | Best effort par type : active les contenus du type demandé si disponibles |
| R47 | "Apply to all" applique aux titres sélectionnés uniquement |

#### Logique best effort

- Pour chaque titre sélectionné :
  - Si le type de contenu existe → l'activer
  - Si le type n'existe pas → l'ignorer (pas d'erreur)
- Les types non cochés sont désactivés pour tous les titres

### Mockups de référence

- `docs/features/storefront/mockups/growth/Bulk manage contents.png`

### Project Structure Notes

- Route admin : `/storefronts/:id/catalog`
- Composant modal réutilisable
- Bannière de multi-sélection (pattern commun dans l'app)

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1 - BulkContentUpdateRequest]
- [Source: docs/features/storefront/epics.1.1.md#Story-2.3]
- [Source: docs/features/storefront/prd.md#FR-GCS-6]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
