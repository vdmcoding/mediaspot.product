# Story 1.2 : Configuration par défaut des contenus

Status: ready-for-dev

## Story

**As a** admin storefront,
**I want** définir une configuration par défaut pour les contenus,
**So that** je n'aie pas à resélectionner les mêmes options pour chaque titre.

## Acceptance Criteria

```gherkin
Scenario: Sauvegarder une configuration par défaut
  Given un admin dans le drawer d'ajout avec une sélection de contenus
  When il clique sur "Save as default"
  Then cette configuration est sauvegardée comme défaut pour ce storefront

Scenario: Pré-sélection selon le défaut
  Given un admin ayant défini une configuration par défaut
  When il clique sur "Add +" pour un nouveau titre
  Then les contenus sont pré-cochés selon la configuration par défaut

Scenario: Modification ponctuelle sans impacter le défaut
  Given un admin avec des contenus pré-cochés par défaut
  When il modifie la sélection pour un titre spécifique
  Then la modification s'applique uniquement à ce titre
  And le défaut reste inchangé pour les prochains ajouts

Scenario: Comportement sans configuration par défaut
  Given un admin sur un storefront sans configuration par défaut
  When il ajoute un titre
  Then un menu de sélection des contents s'affiche
  And il peut sélectionner les contenus à ajouter
```

## Tasks / Subtasks

- [ ] Task 1 : Implémenter le bouton "Save as default" (AC: 1)
  - [ ] 1.1 Ajouter le bouton dans le drawer d'ajout
  - [ ] 1.2 Implémenter l'action de sauvegarde de la configuration

- [ ] Task 2 : Persister la configuration par défaut (AC: 1, 2)
  - [ ] 2.1 Créer/utiliser le DTO `StorefrontContentDefaults`
  - [ ] 2.2 Stocker la configuration localement au niveau du storefront

- [ ] Task 3 : Appliquer la configuration par défaut à l'ajout (AC: 2, 3, 4)
  - [ ] 3.1 Charger la configuration par défaut à l'ouverture du drawer
  - [ ] 3.2 Pré-cocher les contenus selon le défaut
  - [ ] 3.3 Si pas de défaut : ouvrir le menu de sélection des contenus

- [ ] Task 4 : Tests (AC: 1, 2, 3, 4)
  - [ ] 4.1 Tests unitaires logique de défaut
  - [ ] 4.2 Tests E2E sauvegarde et application du défaut

## Dev Notes

### Architecture & Patterns

Cette story gère la **persistance de la configuration par défaut** des contenus pour un storefront.

#### DTOs à créer/utiliser

```typescript
// Configuration par défaut des contenus
interface StorefrontContentDefaults {
  storefrontId: number
  defaultContentTypes: ContentType[]
}
```

#### Logique métier

1. **Sans défaut configuré** : le clic sur "Add" ouvre un menu permettant la sélection des contenus
2. **Avec défaut configuré** : seuls les types définis sont pré-cochés
3. **Modification ponctuelle** : n'affecte pas le défaut, uniquement le titre courant

### Mockups de référence

- `docs/features/storefront/mockups/growth/Add titles Drawer.png` (bouton "Save as default")

### Project Structure Notes

- Le défaut est stocké au niveau du Storefront

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1]
- [Source: docs/features/storefront/epics.1.1.md#Story-1.2]
- [Source: docs/features/storefront/prd.md#FR-GCS-2, FR-GCS-3]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
