# Story 2.3 : Modification bulk des contenus

**Status:** ready-for-dev

## Story

**As a** admin storefront,
**I want** modifier les contenus de plusieurs titres en une seule action,
**So that** je puisse appliquer rapidement une configuration sur un ensemble de titres.

## Acceptance Criteria

```gherkin
Scenario: Affichage du bouton Manage contents dans la bannière multi-sélection
  Given un admin sur l'onglet Catalogue d'un storefront
  When il sélectionne plusieurs titres via les checkboxes
  Then une bannière multi-sélection apparaît en bas de l'écran
  And elle contient un bouton "Manage Contents"

Scenario: Ouverture de la modal bulk
  Given un admin ayant sélectionné des titres
  When il clique sur le bouton "Manage contents" de la bannière
  Then une modal s'ouvre avec le titre "Manage contents"
  And il voit un message indiquant le nombre de titres sélectionnés
  And il voit le message explicatif "Edit the shared contents in bulk. This will replace your current selection."

Scenario: Configuration des contenus en bulk
  Given un admin dans la modal bulk
  When il voit les checkboxes Feature, Trailer, Marketing, Episode
  Then toutes les options sont décochées par défaut (état neutre)
  And il peut cocher les contenus qu'il souhaite activer

Scenario: Application best effort
  Given un admin configurant les contenus en bulk
  When il coche les options souhaitées et clique sur "Apply to all"
  Then les contenus sélectionnés sont activés en best effort sur tous les titres
  And si un type de contenu n'existe pas pour un titre donné, il est ignoré pour ce titre
  And les autres contenus (non cochés) sont désactivés
  And la modal se ferme
  And la liste se rafraîchit

Scenario: Annulation
  Given un admin dans la modal bulk
  When il clique sur "Cancel" ou ferme la modal (X)
  Then aucune modification n'est appliquée
  And la modal se ferme
```

## Tasks / Subtasks

- [ ] **Task 1 : Implémenter la sélection multiple dans le tableau** (AC: #1)
  - [ ] 1.1 Ajouter une colonne checkbox en début de tableau
  - [ ] 1.2 Checkbox "Select all" dans le header
  - [ ] 1.3 Gérer l'état de sélection (selectedTitleIds: number[])
  - [ ] 1.4 Afficher la bannière multi-sélection quand selection.length > 0

- [ ] **Task 2 : Créer la bannière multi-sélection** (AC: #1)
  - [ ] 2.1 Composant fixé en bas de l'écran
  - [ ] 2.2 Afficher le nombre de titres sélectionnés
  - [ ] 2.3 Bouton "Manage Contents" (primary)
  - [ ] 2.4 Bouton "Clear selection" (ghost)

- [ ] **Task 3 : Créer la modal BulkManageContents** (AC: #2, #3)
  - [ ] 3.1 Modal centrée avec overlay
  - [ ] 3.2 Header : "Manage contents" + bouton X
  - [ ] 3.3 Message explicatif : "Edit the shared contents in bulk. This will replace your current selection."
  - [ ] 3.4 4 checkboxes : Feature, Trailer, Marketing, Episode
  - [ ] 3.5 Note sous Episode : "All episodes will be added"
  - [ ] 3.6 Footer : boutons "Cancel" et "Apply to all"

- [ ] **Task 4 : Implémenter l'API bulk** (AC: #4)
  - [ ] 4.1 Créer l'endpoint `PATCH /storefronts/{id}/titles/bulk-contents`
  - [ ] 4.2 Body : `{ titleIds: number[], exposedContentTypes: ContentType[] }`
  - [ ] 4.3 Logique best effort : pour chaque titre, n'appliquer que les types qui existent
  - [ ] 4.4 Retourner un résumé : `{ updated: number, skipped: { titleId: number, reason: string }[] }`

- [ ] **Task 5 : Intégration frontend** (AC: #4, #5)
  - [ ] 5.1 Appeler l'API bulk au clic sur "Apply to all"
  - [ ] 5.2 Afficher un loader pendant le traitement
  - [ ] 5.3 Fermer la modal et rafraîchir la liste après succès
  - [ ] 5.4 Gérer les erreurs (toast d'erreur)
  - [ ] 5.5 Clear la sélection après succès

## Dev Notes

### Architecture & Patterns

**Nouveau endpoint API :**

```typescript
// Request
PATCH /api/storefronts/{storefrontId}/titles/bulk-contents
Body: {
  titleIds: number[];
  exposedContentTypes: ContentType[];
}

// Response
{
  success: true,
  updated: 15,
  skipped: [
    { titleId: 123, reason: "No episode content available" }
  ]
}
```

**Intégration RTK Query :**

```typescript
// Dans admin-api.ts
bulkUpdateTitleContents: builder.mutation<BulkUpdateResponse, BulkUpdateRequest>({
  query: ({ storefrontId, titleIds, exposedContentTypes }) => ({
    url: `${storefrontId}/titles/bulk-contents`,
    method: 'PATCH',
    body: { titleIds, exposedContentTypes },
  }),
  invalidatesTags: (result, error, { storefrontId }) => [{ type: 'Storefront', id: storefrontId }],
}),
```

### UI/UX (depuis mockups)

**Référence visuelle :**
- [Bulk manage contents.png](../mockups/growth/Bulk%20manage%20contents.png)

**Design de la modal :**
- Fond sombre (#1a1a2e)
- Largeur ~450px, centrée
- Checkboxes avec label clair
- Feature, Trailer, Marketing : checkboxes standard
- Episode : checkbox + sous-texte "All episodes will be added"
- Bouton "Apply to all" : violet, pleine largeur ou aligné à droite

**Comportement de remplacement :**
- L'action REMPLACE la configuration existante (pas de merge)
- Message explicite : "This will replace your current selection"
- Tous les types non cochés seront désactivés

### Dépendances

- **Story 2.1** : Le tableau avec checkboxes de sélection
- **Story 1.1** : Le modèle `exposedContentTypes` en base

### Project Structure Notes

- Réutiliser le pattern de modal existant dans l'app
- Hook `useBulkUpdateTitleContentsMutation` à créer dans admin-api.ts

### Points d'attention

1. **Performance** : Batch les updates en une seule requête API (pas N requêtes)
2. **Best effort** : Ne pas échouer si un titre n'a pas un type de contenu - juste l'ignorer
3. **Feedback** : Informer l'utilisateur du nombre de titres mis à jour vs ignorés
4. **UX** : Désélectionner automatiquement après succès pour éviter les double-applications

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 2.3]
- [Mockup: mockups/growth/Bulk manage contents.png]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

