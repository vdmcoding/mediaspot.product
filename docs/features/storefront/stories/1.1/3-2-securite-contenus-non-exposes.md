# Story 3.2 : Sécurité des contenus non exposés

**Status:** ready-for-dev

## Story

**As a** client connecté au storefront,
**I want** ne pas pouvoir accéder aux contenus que le distributeur n'a pas exposés,
**So that** la curation du storefront soit respectée et les contenus non autorisés restent protégés.

## Acceptance Criteria

```gherkin
Scenario: Contenus non exposés invisibles dans l'interface
  Given un client sur une page titre
  And le contenu Feature n'est PAS exposé pour ce titre
  Then le Feature n'apparaît pas dans le player
  And aucun contrôle, bouton ou lien ne permet d'y accéder

Scenario: Blocage des accès directs (URL manipulation)
  Given un client tentant d'accéder directement à un contenu non exposé
  When il essaie de charger le contenu via URL directe ou manipulation API
  Then une erreur 403 Forbidden est retournée
  And le contenu n'est pas servi
  And un message d'erreur approprié est affiché

Scenario: Titre sans aucun contenu exposé
  Given un titre avec aucun contenu exposé (configuration admin)
  When un client accède à la page titre
  Then le player est masqué ou affiche un état vide
  And les métadonnées du titre restent visibles (poster, synopsis, infos)
  And un message explicatif indique qu'aucun contenu n'est disponible

Scenario: Logs de tentatives d'accès non autorisé
  Given un client tentant d'accéder à un contenu non exposé
  When la requête est bloquée
  Then l'événement est loggé avec les informations pertinentes (userId, titleId, contentType, storefrontId)
```

## Tasks / Subtasks

- [ ] **Task 1 : Sécuriser l'endpoint de streaming/playback** (AC: #2)
  - [ ] 1.1 Identifier l'endpoint de streaming actuel (probablement dans un service externe)
  - [ ] 1.2 Ajouter une vérification : le contenu demandé est-il exposé pour ce titre sur ce storefront ?
  - [ ] 1.3 Retourner 403 si non autorisé
  - [ ] 1.4 Ne PAS retourner de détails sur l'existence du contenu (éviter l'énumération)

- [ ] **Task 2 : Sécuriser l'API de récupération des métadonnées** (AC: #1, #2)
  - [ ] 2.1 Modifier `GET /api/user/titles/{titleId}` pour filtrer les contenus
  - [ ] 2.2 Ne retourner que les contenus exposés dans la réponse
  - [ ] 2.3 Ne pas inclure les IDs ou URLs des contenus non exposés

- [ ] **Task 3 : Gérer l'état "aucun contenu"** (AC: #3)
  - [ ] 3.1 Modifier le composant TitlePage pour détecter `exposedContents.length === 0`
  - [ ] 3.2 Masquer le player dans ce cas
  - [ ] 3.3 Afficher un message : "No content available for preview"
  - [ ] 3.4 Conserver l'affichage des métadonnées (synopsis, artwork, infos techniques)

- [ ] **Task 4 : Implémenter le logging de sécurité** (AC: #4)
  - [ ] 4.1 Logger les tentatives d'accès refusées (niveau WARN)
  - [ ] 4.2 Inclure : userId, storefrontId, titleId, contentType, timestamp, IP
  - [ ] 4.3 Ne pas logger les informations sensibles (tokens, passwords)
  - [ ] 4.4 Configurer des alertes si volume anormal de tentatives

- [ ] **Task 5 : Tests de sécurité** (AC: #2)
  - [ ] 5.1 Test : accès direct URL → 403
  - [ ] 5.2 Test : manipulation paramètres API → 403
  - [ ] 5.3 Test : injection contentType non valide → 400
  - [ ] 5.4 Test : titre d'un autre storefront → 403

## Dev Notes

### Architecture & Patterns

**Principe de sécurité : Defense in Depth**

1. **Couche API** : Ne jamais retourner de données non autorisées
2. **Couche Service** : Vérifier les autorisations avant toute opération
3. **Couche Streaming** : Vérifier avant de servir le flux

**Middleware de vérification :**

```typescript
// Exemple de middleware/guard
async function verifyContentAccess(
  userId: number,
  storefrontId: number,
  titleId: number,
  contentType: ContentType
): Promise<boolean> {
  // 1. Vérifier que l'utilisateur a accès au storefront
  const hasStorefrontAccess = await checkUserStorefrontAccess(userId, storefrontId);
  if (!hasStorefrontAccess) return false;

  // 2. Vérifier que le titre est dans le storefront
  const titleInStorefront = await checkTitleInStorefront(storefrontId, titleId);
  if (!titleInStorefront) return false;

  // 3. Vérifier que le contentType est exposé pour ce titre
  const exposedTypes = await getExposedContentTypes(storefrontId, titleId);
  return exposedTypes.includes(contentType);
}
```

**Réponses d'erreur standardisées :**

```typescript
// 403 Forbidden - Contenu non autorisé
{
  status: 403,
  error: "Forbidden",
  message: "You do not have access to this content"
}

// 404 Not Found - Alternative pour éviter l'énumération
{
  status: 404,
  error: "Not Found",
  message: "Content not found"
}
```

### Points de contrôle à sécuriser

| Endpoint | Vérification requise |
|----------|---------------------|
| GET /titles/{id} | Filtrer les contenus retournés |
| GET /titles/{id}/contents | Vérifier exposedContentTypes |
| GET /stream/{contentId} | Vérifier accès au contenu |
| GET /download/{contentId} | Vérifier accès au contenu |

### UI/UX pour état vide

**Quand aucun contenu n'est exposé :**

```
┌─────────────────────────────────────┐
│  [Poster]  Title Name               │
│            Synopsis...              │
│            Durée: 2h15              │
│            Genre: Drama             │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  No content available for   │   │
│  │  preview on this storefront │   │
│  │                             │   │
│  │  Contact the distributor    │   │
│  │  for more information.      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Logging format

```json
{
  "level": "WARN",
  "event": "CONTENT_ACCESS_DENIED",
  "timestamp": "2026-01-23T10:30:00Z",
  "userId": 12345,
  "storefrontId": 67,
  "titleId": 890,
  "requestedContentType": "feature",
  "exposedContentTypes": ["trailer"],
  "clientIp": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

### Dépendances

- **Story 3.1** : Le filtrage des contenus doit être en place
- **Story 1.1** : Les `exposedContentTypes` doivent être persistés

### Points d'attention

1. **Ne pas leaker d'information** : Un 403 ne doit pas confirmer l'existence du contenu
2. **Performance** : Les vérifications d'accès doivent être rapides (cache si nécessaire)
3. **Rétrocompatibilité** : Titres sans config = tout autorisé (comportement MVP)
4. **Monitoring** : Alerter sur les patterns suspects (nombreuses 403 du même user)

### Tests de sécurité recommandés

```typescript
describe('Content access security', () => {
  it('should return 403 for non-exposed content via direct URL', async () => {
    // Setup: titre avec seulement Trailer exposé
    // Action: requête GET /stream/feature-content-id
    // Assert: 403 Forbidden
  });

  it('should not include non-exposed content in title response', async () => {
    // Setup: titre avec seulement Trailer exposé
    // Action: GET /titles/{id}
    // Assert: response.contents ne contient pas Feature
  });

  it('should handle title with no exposed content gracefully', async () => {
    // Setup: titre sans aucun contenu exposé
    // Action: GET /titles/{id}
    // Assert: response.contents = [], pas d'erreur
  });
});
```

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 3.2]
- [Source: docs/features/storefront/prd.md#Sécurité - Protection des assets]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

