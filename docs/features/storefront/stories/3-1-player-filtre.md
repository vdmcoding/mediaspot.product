# Story 3.1 : Player affichant uniquement les contenus exposés

Status: ready-for-dev

## Story

**As a** client connecté au storefront,
**I want** voir dans le player uniquement les contenus que le distributeur a choisi de me montrer,
**So that** je consulte une sélection curatée et pertinente.

## Acceptance Criteria

```gherkin
Scenario: Affichage des contenus exposés uniquement
  Given un client connecté au storefront
  And un titre avec Feature et Trailer exposés (Marketing et Episode non exposés)
  When il accède à la page du titre
  Then le player propose uniquement Feature et Trailer
  And Marketing et Episode n'apparaissent pas dans le player

Scenario: Lecture des contenus disponibles
  Given un client sur une page titre
  When des contenus sont disponibles dans le player
  Then il peut sélectionner et visionner chaque contenu exposé

Scenario: Titre avec contenu partiel
  Given un client sur une page titre
  And seul le Trailer est exposé (pas de Feature)
  When il utilise le player
  Then seul le Trailer est disponible à la lecture
  And aucune option ne permet d'accéder au Feature
```

## Tasks / Subtasks

- [ ] Task 1 : Modifier l'API Browsing pour filtrer les contenus (AC: 1, 3)
  - [ ] 1.1 Adapter GET `/{subdomain}/titles/{titleId}` pour filtrer selon `exposedContentIds`
  - [ ] 1.2 Retourner uniquement les contenus autorisés dans `availableContents`

- [ ] Task 2 : Adapter le composant Player (AC: 1, 2, 3)
  - [ ] 2.1 Utiliser la liste `availableContents` pour les options de lecture
  - [ ] 2.2 Masquer les contenus non retournés par l'API
  - [ ] 2.3 Gérer le cas d'un seul contenu disponible (pas de sélecteur)

- [ ] Task 3 : Tests (AC: 1, 2, 3)
  - [ ] 3.1 Tests unitaires filtrage API
  - [ ] 3.2 Tests E2E player avec contenus filtrés

## Dev Notes

### Architecture & Patterns

Cette story impacte le **player côté client (Browsing)** pour afficher uniquement les contenus autorisés.

#### DTO Response enrichi

```typescript
interface TitleDetailResponse {
  titleId: number
  titleName: string
  // ... métadonnées existantes ...

  // À définir : DTO pour le reste de la page ? Autre appel ?

  // NOUVEAU : contenus filtrés selon configuration admin
  availableContents: AvailableContent[]
}

interface AvailableContent {
  contentId: number
  contentName: string
  contentType: string        // Type du contenu (Feature, Trailer, etc.)
  duration: string
  streamId: number
}
```

#### Endpoint impacté

| Méthode | Endpoint | Action | Impact |
|---------|----------|--------|--------|
| GET | `/{subdomain}/titles/{titleId}` | Page titre | Retourne uniquement les contenus exposés |

#### Logique de filtrage (backend)

```
1. Client demande /titles/{titleId}
2. Backend récupère titre depuis catalogue distribution
3. Backend récupère exposedContentIds depuis storefront config
4. Backend filtre contents selon exposedContentIds
5. Response ne contient que les contenus autorisés
```

### Mockups de référence

- `docs/features/storefront/mockups/growth/Browsing/Single title.png`

### Project Structure Notes

- Route Browsing : `/store/:subdomain/titles/:id`
- API Browsing : `storefront-service/api/browsing`
- Authentification : Basic Auth + X-Origin-Url

### References

- [Source: docs/features/storefront/architecture.md#Specs-v1.1 - Endpoints Browsing]
- [Source: docs/features/storefront/epics.1.1.md#Story-3.1]
- [Source: docs/features/storefront/prd.md#FR-GCS-7]
- Règle métier : R48

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
