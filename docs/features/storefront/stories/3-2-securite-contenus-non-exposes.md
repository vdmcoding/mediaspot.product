# Story 3.2 : Sécurité des contenus non exposés

Status: ready-for-dev

## Story

**As a** client connecté au storefront,
**I want** ne pas pouvoir accéder aux contenus que le distributeur n'a pas exposés,
**So that** la curation du storefront soit respectée.

## Acceptance Criteria

```gherkin
Scenario: Contenus non exposés invisibles
  Given un client sur une page titre
  And le contenu Feature n'est PAS exposé pour ce titre
  Then le Feature n'apparaît pas dans le player
  And aucun contrôle ne permet d'y accéder

Scenario: Accès direct bloqué
  Given un client tentant d'accéder directement à un contenu non exposé (URL directe ou manipulation)
  When il essaie de charger le contenu
  Then une erreur 403 ou 404 est retournée
  And le contenu n'est pas servi

Scenario: Titre sans contenu exposé
  Given un titre avec aucun contenu exposé
  When un client accède à la page titre
  Then le player est vide ou masqué
  And les métadonnées du titre restent visibles
```

## Tasks / Subtasks

- [ ] Task 1 : Sécuriser l'accès aux contenus côté backend (AC: 1, 2)
  - [ ] 1.1 Vérifier `exposedContentIds` avant de servir un stream
  - [ ] 1.2 Retourner 403 Forbidden si contenu non exposé
  - [ ] 1.3 Logger les tentatives d'accès non autorisées

- [ ] Task 2 : Gérer le cas "aucun contenu exposé" (AC: 3)
  - [ ] 2.1 Retourner `availableContents: []` si aucun contenu exposé
  - [ ] 2.2 Côté frontend : masquer ou désactiver le player
  - [ ] 2.3 Afficher les métadonnées du titre (poster, description, etc.)

- [ ] Task 3 : Tests de sécurité (AC: 1, 2, 3)
  - [ ] 3.1 Tests API accès direct à contenu non exposé → 403
  - [ ] 3.2 Tests E2E manipulation URL → blocage
  - [ ] 3.3 Tests titre sans contenu → affichage correct

## Dev Notes

### Architecture & Patterns

Cette story garantit la **sécurité des contenus** en empêchant tout accès non autorisé.

#### Règles métier critiques

| # | Règle | Comportement |
|---|-------|--------------|
| R48 | Player filtre selon `exposedContentIds` du titre | Backend filter |
| R49 | Contenu non exposé = inaccessible (pas juste masqué) | 403 Forbidden |
| R50 | Titre sans contenu exposé → page titre visible, player vide | Backend logic |

#### Points de contrôle sécurité

1. **API Page titre** : Ne retourne que les `availableContents` autorisés
2. **API Stream** : Vérifie que le `contentId` est dans `exposedContentIds` avant de servir
3. **Frontend** : N'affiche que ce que l'API retourne (défense en profondeur)

#### Codes d'erreur

| Code | Situation |
|------|-----------|
| 403 Forbidden | Tentative d'accès à un contenu non exposé |
| 404 Not Found | Alternative acceptable (masque l'existence du contenu) |

### Sécurité multi-tenant

```
Rappel règles globales :
R34 - Isolation complète entre storefronts
R36 - Client accède uniquement storefront invité (Header X-Origin-Url + subdomain)
R38 - Contenus vidéo accessibles uniquement si ACTIVE
```

### Project Structure Notes

- API Browsing : `storefront-service/api/browsing`
- Middleware d'autorisation à renforcer
- Logging des tentatives d'accès non autorisées

### References

- [Source: docs/features/storefront/architecture.md#Règles-Métier-v1.1 - R48, R49, R50]
- [Source: docs/features/storefront/epics.1.1.md#Story-3.2]
- [Source: docs/features/storefront/prd.md#FR-GCS-8]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
