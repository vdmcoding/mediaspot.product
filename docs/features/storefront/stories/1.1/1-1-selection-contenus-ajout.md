# Story 1.1 : Sélection des contenus lors de l'ajout d'un titre

**Status:** ready-for-dev

## Story

**As a** admin storefront,
**I want** sélectionner quels contenus exposer lorsque j'ajoute un titre,
**So that** je contrôle précisément ce que mes clients peuvent voir pour chaque titre.

## Acceptance Criteria

```gherkin
Scenario: Affichage du menu de sélection des contenus
  Given un admin dans le drawer d'ajout de titres
  When il clique sur "Add +" pour un titre
  Then un menu popup s'affiche avec les options de contenus : Feature, Trailer, Marketing, Episode
  And chaque option a un bouton "+" pour l'ajouter ou une coche "✓" si déjà sélectionné

Scenario: Sélection des types de contenus
  Given un admin voyant le menu popup des options de contenus
  When il coche/décoche les types de contenus (Feature, Trailer, Marketing, Episode)
  Then seuls les contenus cochés seront visibles côté client pour ce titre
  And il peut cliquer sur "Save" pour valider la sélection

Scenario: Affichage des tags après ajout
  Given un admin ayant sélectionné des contenus pour un titre
  When il valide l'ajout (clic sur "Save")
  Then le titre apparaît dans la liste du drawer avec des tags indiquant les contenus partagés
  And les tags affichent les types principaux (ex: "Feature", "Trailer") avec un indicateur du reste (ex: "+2")

Scenario: Contenus non disponibles grisés
  Given un titre sans contenu d'un certain type dans la distribution
  When l'admin voit les options de contenus
  Then ce type de contenu n'est pas proposé ou est grisé et non cliquable
```

## Tasks / Subtasks

- [ ] **Task 1 : Modifier le composant AddTitleDrawer** (AC: #1, #2)
  - [ ] 1.1 Ajouter un état local pour gérer l'affichage du menu popup de sélection
  - [ ] 1.2 Créer le composant `ContentSelectionPopup` avec les 4 options (Feature, Trailer, Marketing, Episode)
  - [ ] 1.3 Implémenter la logique de toggle pour chaque type de contenu
  - [ ] 1.4 Ajouter le bouton "Save" dans le popup

- [ ] **Task 2 : Gérer les contenus disponibles par titre** (AC: #4)
  - [ ] 2.1 Récupérer les types de contenus disponibles depuis l'API distribution pour chaque titre
  - [ ] 2.2 Griser/désactiver les options non disponibles dans le popup
  - [ ] 2.3 Afficher un tooltip explicatif sur les options grisées

- [ ] **Task 3 : Afficher les tags de contenus dans la liste** (AC: #3)
  - [ ] 3.1 Modifier l'affichage des titres ajoutés dans le drawer
  - [ ] 3.2 Afficher les tags des contenus sélectionnés (Feature, Trailer, etc.)
  - [ ] 3.3 Implémenter la logique "+N" pour les contenus au-delà de 2-3 visibles

- [ ] **Task 4 : Intégration API** (AC: #1, #2, #3)
  - [ ] 4.1 Étendre l'endpoint d'ajout de titre pour accepter `exposedContentTypes: ContentType[]`
  - [ ] 4.2 Modifier le type `StorefrontTitle` pour inclure `exposedContentTypes`
  - [ ] 4.3 Persister la sélection en base de données

## Dev Notes

### Architecture & Patterns

**Modèle de données (depuis PRD Technical Notes) :**

```typescript
interface StorefrontTitleContent {
  titleId: string;
  exposedContentTypes: ContentType[];
}

enum ContentType {
  FEATURE = 'feature',
  TRAILER = 'trailer',
  MARKETING = 'marketing',
  EPISODE = 'episode'
}
```

**Rétrocompatibilité :** Les titres existants (MVP) doivent avoir tous leurs contenus exposés par défaut. Migrer les données existantes avec `exposedContentTypes: ['feature', 'trailer', 'marketing', 'episode']`.

### UI/UX (depuis mockups)

**Référence visuelle :**
- [Add titles Drawer/Adding.png](../mockups/growth/Add%20titles%20Drawer/Adding.png)
- [Drawer.png](../mockups/growth/Drawer.png)
- [Drawer-1.png](../mockups/growth/Drawer-1.png)

**Comportement du popup :**
- S'affiche au clic sur "Add +" d'un titre non ajouté
- Position : ancré au bouton "Add +", aligné à droite
- Fermeture : au clic sur "Save" ou clic extérieur
- Style : fond sombre (#1a1a2e), bordure subtile, options sur fond légèrement plus clair au hover

**Tags dans la liste :**
- Badges arrondis avec fond violet/gris
- Afficher max 2 tags + "+N" si plus
- Ex: "Feature" "Trailer" "+2"

### Project Structure Notes

- Composant drawer existant : probablement dans `storefront-paths.tsx` ou composants admin
- API admin : `lib/admin-api.ts` et `lib/admin-types.ts`
- Suivre les conventions de nommage et structure existantes du projet

### Points d'attention

1. **Performance** : Ne pas recharger toute la liste après chaque ajout
2. **UX** : Le popup doit être rapide et ne pas bloquer l'expérience
3. **Validation** : Au moins un type de contenu doit être sélectionné pour ajouter le titre

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 1.1]
- [Mockup: mockups/growth/Add titles Drawer/Adding.png]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

