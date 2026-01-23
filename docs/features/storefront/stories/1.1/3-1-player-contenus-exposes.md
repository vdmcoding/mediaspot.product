# Story 3.1 : Player affichant uniquement les contenus exposés

**Status:** ready-for-dev

## Story

**As a** client connecté au storefront,
**I want** voir dans le player uniquement les contenus que le distributeur a choisi de me montrer,
**So that** je consulte une sélection curatée et pertinente.

## Acceptance Criteria

```gherkin
Scenario: Affichage filtré des contenus dans le player
  Given un client connecté au storefront
  And un titre avec Feature et Trailer exposés (Marketing et Episode non exposés)
  When il accède à la page du titre
  Then le player propose uniquement Feature et Trailer dans la liste des contenus
  And Marketing et Episode n'apparaissent pas dans le player

Scenario: Visionnage des contenus exposés
  Given un client sur une page titre
  When des contenus sont disponibles dans le player
  Then il peut sélectionner et visionner chaque contenu exposé
  And le player fonctionne normalement pour ces contenus

Scenario: Titre avec un seul type de contenu exposé
  Given un client sur une page titre
  And seul le Trailer est exposé (pas de Feature)
  When il utilise le player
  Then seul le Trailer est disponible à la lecture
  And aucune option ne permet d'accéder au Feature
  And le Trailer est présélectionné automatiquement

Scenario: Liste des contenus dans le sidebar
  Given un client sur une page titre avec contenus multiples exposés
  When il voit la sidebar du player (liste des contenus)
  Then il voit uniquement les contenus exposés : Feature, Trailer, etc.
  And chaque contenu affiche ses métadonnées (durée, qualité)
```

## Tasks / Subtasks

- [ ] **Task 1 : Modifier l'API browsing pour inclure les contenus exposés** (AC: #1)
  - [ ] 1.1 Étendre `GET /api/user/by-subdomain/{subdomain}` pour inclure `exposedContentTypes` par titre
  - [ ] 1.2 Ou créer un endpoint dédié `GET /api/user/titles/{titleId}/exposed-contents`
  - [ ] 1.3 Retourner uniquement les contenus qui sont à la fois : disponibles ET exposés

- [ ] **Task 2 : Modifier le composant TitlePage** (AC: #1, #2)
  - [ ] 2.1 Récupérer les `exposedContentTypes` pour le titre courant
  - [ ] 2.2 Filtrer les contenus avant de les passer au player
  - [ ] 2.3 Ne pas afficher les tabs/boutons pour les types non exposés

- [ ] **Task 3 : Modifier le composant Player** (AC: #2, #3, #4)
  - [ ] 3.1 Recevoir la liste filtrée des contenus
  - [ ] 3.2 Afficher uniquement les contenus dans la sidebar
  - [ ] 3.3 Présélectionner le premier contenu disponible si un seul type
  - [ ] 3.4 Gérer le cas où aucun contenu n'est exposé (état vide)

- [ ] **Task 4 : Adapter l'affichage selon le contexte** (AC: #3, #4)
  - [ ] 4.1 Si un seul contenu : pas de liste, lecture directe
  - [ ] 4.2 Si plusieurs contenus : afficher la liste avec sélection
  - [ ] 4.3 Afficher les métadonnées (durée, qualité) pour chaque contenu

## Dev Notes

### Architecture & Patterns

**Filtrage côté serveur (OBLIGATOIRE pour la sécurité) :**

Le filtrage doit se faire côté API, pas uniquement côté client. L'API browsing doit :
1. Récupérer les contenus disponibles pour le titre (depuis la distribution)
2. Récupérer les contenus exposés pour ce titre sur ce storefront
3. Retourner l'intersection : `availableContents ∩ exposedContents`

**Modification de l'API existante :**

```typescript
// browsing-api.ts - Modifier StorefrontTitle
interface StorefrontTitle {
  obj: DbAssetObjectInfos;
  details: TitleContentData;
  hero: TitleHeroProps;
  exposedContentTypes: ContentType[];  // NOUVEAU
}

// L'API doit filtrer details.contents selon exposedContentTypes
```

**Logique de filtrage :**

```typescript
// Côté API ou service
function filterExposedContents(
  allContents: Content[],
  exposedTypes: ContentType[]
): Content[] {
  return allContents.filter(content =>
    exposedTypes.includes(content.type)
  );
}
```

### UI/UX (depuis mockups)

**Référence visuelle :**
- [Browsing/Single title.png](../mockups/growth/Browsing/Single%20title.png)

**Structure de la page titre :**
- Header avec poster, titre, métadonnées
- Section "8 contents" → "X Download" → liste des contenus exposés
- Sidebar avec les contenus : Feature, Trailer, etc.
- Player principal à droite
- Section "Additional materials" (si applicable)

**Comportement du player :**
- Liste des contenus dans la colonne de gauche
- Contenu sélectionné visible dans le player principal
- Métadonnées affichées : résolution (PAD, 2K, 4K), durée
- Message "Select a content on the left to preview it" si rien sélectionné

### Dépendances

- **Story 1.1** : Les `exposedContentTypes` doivent exister en base
- Cette story est la première côté client (browsing)

### Project Structure Notes

- API browsing : `browsing-api.ts` - `storefrontBrowsingApi`
- Types : `browsing-types.ts` - `StorefrontTitle`
- Composants titre/player : à identifier dans le code existant

### Points d'attention

1. **Sécurité** : Le filtrage DOIT être fait côté serveur - ne jamais faire confiance au client
2. **Rétrocompatibilité** : Titres sans `exposedContentTypes` = tout exposé
3. **UX** : Si aucun contenu exposé → afficher un message explicatif, pas un player vide
4. **Performance** : Ne pas charger les assets des contenus non exposés

### Cas limites

- **Aucun contenu exposé** : Afficher "No content available for this title"
- **Contenu exposé mais pas disponible** : Ne pas l'afficher (intersection vide)
- **Série sans épisodes exposés** : Afficher uniquement Feature/Trailer si exposés

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 3.1]
- [Source: docs/features/storefront/source-documents/lib/browsing-api.ts]
- [Mockup: mockups/growth/Browsing/Single title.png]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

