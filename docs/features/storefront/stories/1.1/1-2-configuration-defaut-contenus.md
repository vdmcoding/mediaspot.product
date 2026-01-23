# Story 1.2 : Configuration par défaut des contenus

**Status:** ready-for-dev

## Story

**As a** admin storefront,
**I want** définir une configuration par défaut pour les contenus,
**So that** je n'aie pas à resélectionner les mêmes options pour chaque titre.

## Acceptance Criteria

```gherkin
Scenario: Sauvegarder une sélection comme défaut
  Given un admin dans le drawer d'ajout avec une sélection de contenus configurée
  When il clique sur "Save as default"
  Then cette configuration est sauvegardée comme défaut pour ce storefront
  And un feedback visuel confirme la sauvegarde (toast ou message)

Scenario: Pré-sélection automatique avec le défaut
  Given un admin ayant défini une configuration par défaut pour ce storefront
  When il clique sur "Add +" pour un nouveau titre
  Then les contenus sont pré-cochés selon la configuration par défaut
  And il peut voir quels contenus sont pré-sélectionnés

Scenario: Modification ponctuelle sans affecter le défaut
  Given un admin avec des contenus pré-cochés par défaut
  When il modifie la sélection pour un titre spécifique et clique sur "Save"
  Then la modification s'applique uniquement à ce titre
  And le défaut reste inchangé pour les prochains ajouts

Scenario: Comportement sans configuration par défaut
  Given un admin sur un storefront sans configuration par défaut définie
  When il ajoute un titre
  Then tous les contenus disponibles sont cochés par défaut
  And il peut ensuite définir un défaut personnalisé via "Save as default"
```

## Tasks / Subtasks

- [ ] **Task 1 : Ajouter le bouton "Save as default"** (AC: #1)
  - [ ] 1.1 Ajouter le bouton dans le `ContentSelectionPopup` (créé en Story 1.1)
  - [ ] 1.2 Positionner le bouton au-dessus de "Save" selon le mockup
  - [ ] 1.3 Implémenter l'appel API pour sauvegarder le défaut
  - [ ] 1.4 Afficher un toast de confirmation après sauvegarde

- [ ] **Task 2 : Créer le modèle StorefrontContentDefaults** (AC: #1, #2)
  - [ ] 2.1 Créer l'entité/table `StorefrontContentDefaults`
  - [ ] 2.2 Ajouter l'endpoint API `PUT /storefronts/{id}/content-defaults`
  - [ ] 2.3 Ajouter l'endpoint API `GET /storefronts/{id}/content-defaults`

- [ ] **Task 3 : Charger et appliquer le défaut** (AC: #2, #4)
  - [ ] 3.1 Charger le défaut au mount du drawer d'ajout de titres
  - [ ] 3.2 Pré-cocher les options selon le défaut chargé
  - [ ] 3.3 Si aucun défaut → tout cocher par défaut

- [ ] **Task 4 : Isolation modification vs défaut** (AC: #3)
  - [ ] 4.1 S'assurer que "Save" ne modifie que le titre en cours
  - [ ] 4.2 S'assurer que "Save as default" ne modifie pas le titre en cours (juste le défaut)
  - [ ] 4.3 Documenter clairement le comportement pour l'UX

## Dev Notes

### Architecture & Patterns

**Nouveau modèle de données :**

```typescript
interface StorefrontContentDefaults {
  storefrontId: string;
  defaultContentTypes: ContentType[];
}
```

**Endpoints API à créer :**
- `GET /api/storefronts/{storefrontId}/content-defaults` → Retourne le défaut ou null
- `PUT /api/storefronts/{storefrontId}/content-defaults` → Body: `{ defaultContentTypes: ContentType[] }`

### UI/UX (depuis mockups)

**Référence visuelle :**
- [Add titles Drawer/Adding.png](../mockups/growth/Add%20titles%20Drawer/Adding.png)

**Comportement "Save as default" :**
- Bouton texte discret au-dessus de "Save"
- Au clic : sauvegarde le défaut + feedback toast
- Ne ferme PAS le popup (l'utilisateur peut encore modifier pour ce titre)

**Logique de pré-sélection :**
1. Charger le défaut du storefront au mount
2. Si défaut existe → pré-cocher ces types
3. Si pas de défaut → tout cocher (Feature, Trailer, Marketing, Episode)
4. Intersectionner avec les contenus disponibles du titre (griser les non-disponibles)

### Dépendances

- **Story 1.1** : Le composant `ContentSelectionPopup` doit être créé
- Cette story enrichit le popup avec la fonctionnalité de défaut

### Project Structure Notes

- Table `storefront_content_defaults` (nouvelle) : `storefront_id`, `default_content_types` (JSON array ou relation)
- Endpoint dans le router admin storefront existant

### Points d'attention

1. **Scope par storefront** : Le défaut est lié au storefront, pas à l'utilisateur admin
2. **Migration** : Pour les storefronts existants, pas de défaut = tout sélectionné
3. **Cohérence** : S'assurer que le défaut ne propose pas de contenus qui n'existeraient jamais

### References

- [Source: docs/features/storefront/prd.md#Granular Content Selection (Growth)]
- [Source: docs/features/storefront/epics.1.1.md#Story 1.2]
- [Mockup: mockups/growth/Add titles Drawer/Adding.png]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List

