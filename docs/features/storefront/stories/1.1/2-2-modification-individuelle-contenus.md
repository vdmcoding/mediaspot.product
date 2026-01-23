# Story 2.2 : Modification individuelle des contenus

**Status:** ready-for-dev

## Story

**As a** admin storefront,
**I want** modifier les contenus exposés pour un titre spécifique,
**So that** je puisse ajuster la visibilité après l'ajout initial.

## Acceptance Criteria

```gherkin
Scenario: Ouverture du drawer de modification
  Given un admin sur l'onglet Catalogue d'un storefront
  And un titre déjà ajouté au storefront
  When il clique sur la ligne du titre
  Then un drawer s'ouvre à droite avec les options de contenus

Scenario: État initial des checkboxes
  Given un admin dans le drawer de modification d'un titre
  When il voit les checkboxes Feature, Trailer, Marketing, Episode
  Then l'état coché/décoché reflète la configuration actuelle du titre
  And les contenus non disponibles pour ce titre sont grisés

Scenario: Sauvegarde des modifications
  Given un admin modifiant les contenus d'un titre
  When il coche/décoche des options et clique sur "Save"
  Then les modifications sont sauvegardées en base
  And le drawer se ferme
  And la liste catalogue se rafraîchit avec les nouveaux tags dans "Shared contents"

Scenario: Annulation des modifications
  Given un admin modifiant les contenus d'un titre
  When il clique sur "Cancel" ou ferme le drawer (X ou clic extérieur)
  Then les modifications sont annulées
  And le titre garde sa configuration précédente
```

## Tasks / Subtasks

- [ ] **Task 1 : Créer le drawer de modification de titre** (AC: #1, #2)
  - [ ] 1.1 Créer le composant `EditTitleContentsDrawer`
  - [ ] 1.2 Afficher les informations du titre (poster, nom) en header
  - [ ] 1.3 Afficher les 4 checkboxes : Feature, Trailer, Marketing, Episode
  - [ ] 1.4 Charger l'état actuel des `exposedContentTypes` du titre
  - [ ] 1.5 Griser les options non disponibles pour ce titre

- [ ] **Task 2 : Implémenter l'ouverture au clic sur ligne** (AC: #1)
  - [ ] 2.1 Ajouter le handler onClick sur chaque ligne du tableau catalogue
  - [ ] 2.2 Passer l'ID du titre au drawer
  - [ ] 2.3 Charger les données du titre depuis l'API

- [ ] **Task 3 : Implémenter Save/Cancel** (AC: #3, #4)
  - [ ] 3.1 Bouton "Save" : appeler l'API PATCH pour mettre à jour les contenus
  - [ ] 3.2 Bouton "Cancel" : fermer le drawer sans sauvegarder
  - [ ] 3.3 Fermeture au clic extérieur (overlay) : équivalent à Cancel
  - [ ] 3.4 Rafraîchir la liste catalogue après Save

- [ ] **Task 4 : API de mise à jour** (AC: #3)
  - [ ] 4.1 Créer/modifier l'endpoint `PATCH /storefronts/{id}/titles/{titleId}`
  - [ ] 4.2 Body : `{ exposedContentTypes: ContentType[] }`
  - [ ] 4.3 Valider qu'au moins un contenu est exposé

## Dev Notes

### Architecture & Patterns

**API endpoint :**

```
PATCH /api/storefronts/{storefrontId}/titles/{titleId}
Body: {
  exposedContentTypes: ["feature", "trailer"]
}
Response: 200 OK avec le titre mis à jour
```

**Validation :**
- Au moins 1 type de contenu doit être exposé
- Les types doivent exister pour ce titre (ne pas accepter "episode" si le titre n'a pas d'épisodes)

### UI/UX (depuis mockups)

**Référence visuelle :** Le drawer de modification utilise le même design que le popup d'ajout mais en format drawer latéral.

**Comportement du drawer :**
- Ouvre à droite, largeur ~400px
- Header : poster miniature + titre du film/série
- Corps : 4 checkboxes avec labels clairs
- Footer : boutons "Cancel" (ghost) et "Save" (primary violet)
- Overlay semi-transparent qui ferme le drawer au clic

**États des checkboxes :**
- Coché (violet) : contenu exposé
- Décoché (gris) : contenu non exposé
- Grisé + tooltip : contenu non disponible pour ce titre

### Dépendances

- **Story 1.1** : Le modèle `exposedContentTypes` doit exister
- **Story 2.1** : Le tableau avec "Shared contents" pour visualiser les changements

### Project Structure Notes

- Drawer : réutiliser le système de drawer existant dans l'app
- Hook personnalisé `useEditTitleContents` pour la logique métier

### Points d'attention

1. **État local vs serveur** : Gérer l'état optimiste ou attendre la réponse API
2. **Concurrence** : Que se passe-t-il si deux admins modifient le même titre ?
3. **Feedback** : Toast de succès après sauvegarde

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 2.2]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

