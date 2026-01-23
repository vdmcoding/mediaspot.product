# Story 2.1 : Vue enrichie du catalogue admin

**Status:** ready-for-dev

## Story

**As a** admin storefront,
**I want** voir d'un coup d'oeil les contenus et métadonnées techniques de chaque titre,
**So that** je puisse rapidement identifier les titres et leurs caractéristiques.

## Acceptance Criteria

```gherkin
Scenario: Affichage des nouvelles colonnes dans le tableau catalogue
  Given un admin sur l'onglet Catalogue d'un storefront
  When il consulte la liste des titres
  Then il voit les colonnes suivantes :
    | Colonne            | Contenu                                    |
    | Title              | Visuel (poster) + nom du titre             |
    | Shared contents    | Tags des types de contenus exposés         |
    | Best Quality       | Qualité maximale disponible (ex: 4K, HD)   |
    | Audio Languages    | Langues audio disponibles                  |
    | Subtitle Languages | Langues de sous-titres disponibles         |

Scenario: Affichage des tags Shared contents avec overflow
  Given un admin voyant la colonne "Shared contents"
  When un titre a plus de 2 types de contenus exposés
  Then les 2 premiers tags sont affichés (ex: "Feature", "Trailer")
  And un indicateur "+N" montre le nombre de contenus restants (ex: "+2")

Scenario: Affichage des langues multiples
  Given un admin voyant les colonnes Audio/Subtitle Languages
  When un titre a plusieurs langues disponibles
  Then les langues sont affichées sous forme de codes ISO (ex: "EN", "FR", "ES")
  And si trop nombreuses, un indicateur "+N" est affiché
```

## Tasks / Subtasks

- [ ] **Task 1 : Modifier le tableau catalogue admin** (AC: #1)
  - [ ] 1.1 Ajouter la colonne "Shared contents" après "Title"

- [ ] **Task 2 : Créer le composant ContentTagsList** (AC: #2)
  - [ ] 2.1 Créer un composant réutilisable pour afficher les tags avec overflow
  - [ ] 2.2 Implémenter la logique "max 2 visibles + '+N'"
  - [ ] 2.3 Ajouter un tooltip au hover de "+N" listant tous les contenus

- [ ] **Task 3 : Créer le composant LanguagesList** (AC: #3)
  - [ ] 3.1 Créer un composant pour afficher les codes langues
  - [ ] 3.2 Implémenter la logique d'overflow similaire aux tags
  - [ ] 3.3 Utiliser les codes ISO 639-1 (EN, FR, ES, etc.)

- [ ] **Task 4 : Enrichir l'API catalogue** (AC: #1, #2, #3)
  - [ ] 4.1 Modifier l'endpoint GET catalogue pour inclure `exposedContentTypes`
  - [ ] 4.2 Inclure `bestQuality`, `audioLanguages`, `subtitleLanguages` depuis la distribution
  - [ ] 4.3 Optimiser les requêtes pour éviter les N+1

## Dev Notes

### Architecture & Patterns

**Données à afficher par titre :**

```typescript
interface StorefrontTitleRow {
  id: string;
  title: string;
  posterUrl: string;
  exposedContentTypes: ContentType[];  // Nouveau - depuis Story 1.1
  bestQuality: string;                  // Ex: "4K", "HD", "SD"
  audioLanguages: string[];             // Ex: ["EN", "FR", "ES"]
  subtitleLanguages: string[];          // Ex: ["EN", "FR", "DE", "IT"]
}
```

**Source des données :**
- `exposedContentTypes` : Table storefront_titles (nouvellement ajoutée)
- `bestQuality`, `audioLanguages`, `subtitleLanguages` : Jointes depuis la distribution/catalogue source

### UI/UX (depuis mockups)

**Référence visuelle :**
- [Storefront/Admin/Catalog.png](../mockups/growth/Storefront/Admin/Catalog.png)

**Design du tableau :**
- Header gris foncé avec texte clair
- Lignes alternées pour la lisibilité
- Tags "Shared contents" : badges arrondis violet/gris
- Qualité : badge coloré (4K = violet, HD = bleu, SD = gris)
- Langues : codes ISO en texte simple ou petits badges

**Comportement overflow :**
- Max 2 éléments visibles + "+N"
- Tooltip au hover montrant la liste complète
- Ex: "Feature" "Trailer" "+2" → Hover +2 → "Marketing, Episode"

### Dépendances

- **Story 1.1** : Les `exposedContentTypes` doivent exister en base
- Cette story est indépendante et peut être développée en parallèle des autres Epic 2

### Project Structure Notes

- Composant tableau catalogue : à identifier dans le code existant
- Réutiliser les composants de badges/tags existants si disponibles
- API admin : enrichir le DTO existant

### Points d'attention

1. **Performance** : Les données de qualité/langues viennent de la distribution - utiliser des joins efficaces
2. **Responsive** : Le tableau doit rester lisible sur écrans standards (1280px+)
3. **Rétrocompatibilité** : Les titres sans `exposedContentTypes` doivent afficher tous les types comme "exposés"

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 2.1]
- [Mockup: mockups/growth/Storefront/Admin/Catalog.png]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

