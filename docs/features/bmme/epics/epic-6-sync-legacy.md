<!-- TRACABILITE: Ancien Epic 7 -->
<!-- JIRA: DF-11139 -->

# Epic 6 : Synchronisation vers le Modèle Legacy (DbMetadataFieldInfo)

**Le système synchronise** automatiquement les métadonnées BMME v2 vers DbMetadataFieldInfo pour que les autres modules mediaspot continuent à fonctionner sans modification.

**FRs couverts :** FR87, FR88, FR89, FR90, FR91, FR92, FR93, FR94

**Valeur livrée :** Les modules existants (hors BMME) lisent les métadonnées via DbMetadataFieldInfo de manière transparente, avec monitoring et alertes en cas d'échec de synchronisation.

---

## Story 6.1 : Synchronisation automatique BMME v2 → DbMetadataFieldInfo

As a **Système**,
I want **synchroniser automatiquement les métadonnées BMME v2 vers le modèle legacy DbMetadataFieldInfo**,
So that **les autres modules mediaspot continuent à fonctionner sans modification**.

**Acceptance Criteria:**

```gherkin
Feature: Synchronisation automatique vers le modèle legacy

  Scenario: Sync à chaque modification de métadonnée
    Given une métadonnée est modifiée dans BMME v2
    When la modification est sauvegardée
    Then le système synchronise immédiatement vers DbMetadataFieldInfo
    And la donnée est disponible dans l'ancien modèle

  Scenario: Mapping BMME v2 → DbMetadataFieldInfo
    Given le mapping est configuré
    When une synchro s'exécute
    Then les champs BMME v2 sont transformés vers DbMetadataFieldInfo :
      | Champ BMME v2 | Champ DbMetadataFieldInfo |
      | title.originalTitle | MetadataFieldInfo.OriginalTitle |
      | title.synopsis.fr | MetadataFieldInfo.Synopsis_FR |
      | package.copyright | MetadataFieldInfo.Copyright |

  Scenario: Synchronisation transparente
    Given la synchro est en cours
    Then aucune action n'est requise des utilisateurs
    And aucune interruption de service n'est visible
```

**FRs couverts :** FR87

---

## Story 6.2 : Transparence pour les modules consommateurs

As a **Module mediaspot existant**,
I want **lire les métadonnées via DbMetadataFieldInfo sans modification**,
So that **je continue à fonctionner normalement pendant la transition vers BMME v2**.

**Acceptance Criteria:**

```gherkin
Feature: Transparence pour les modules consommateurs

  Scenario: Lecture via l'ancien modèle
    Given un module mediaspot lit des métadonnées via DbMetadataFieldInfo
    When il fait une requête sur un Title
    Then il reçoit les données synchronisées depuis BMME v2
    And le format est identique à l'ancien système

  Scenario: Aucune modification de code requise
    Given les modules existants utilisent DbMetadataFieldInfo
    Then ils n'ont PAS besoin d'être modifiés
    And ils ne sont PAS conscients de l'existence de BMME v2

  Scenario: Performance préservée
    Given un module fait une requête DbMetadataFieldInfo
    Then le temps de réponse est comparable à l'ancien système
    And la synchro n'impacte pas les performances de lecture
```

**FRs couverts :** FR88, FR91

---

## Story 6.3 : Configuration de la table de mapping legacy

As a **Admin Interne VDM**,
I want **configurer la table de mapping BMME v2 → DbMetadataFieldInfo**,
So that **je peux adapter la synchronisation quand de nouveaux champs sont ajoutés**.

**Acceptance Criteria:**

```gherkin
Feature: Configuration du mapping legacy

  Scenario: Accéder à l'éditeur de mapping legacy
    Given je suis connecté en tant qu'Admin Interne VDM
    When j'accède à "Administration > Mapping Legacy"
    Then je vois la table de mapping :
      | Champ BMME v2 | Champ DbMetadataFieldInfo | Transform | Active |
      | title.originalTitle | OriginalTitle | none | ✅ |
      | title.year | ProductionYear | toString | ✅ |
      | package.territories | TerritoryList | join(',') | ✅ |

  Scenario: Ajouter un nouveau mapping
    Given un nouveau champ BMME v2 doit être synchronisé
    When je clique sur "Add mapping"
    And je configure source, destination et transformation
    Then le nouveau mapping est actif
    And les prochaines synchros l'utilisent

  Scenario: Désactiver un mapping
    Given un champ n'a plus besoin d'être synchronisé
    When je désactive le mapping
    Then il n'est plus exécuté lors des synchros
    And les données existantes restent en place
```

**FRs couverts :** FR89

---

## Story 6.4 : Application du mapping à chaque modification

As a **Système**,
I want **appliquer le mapping lors de chaque modification de métadonnée dans BMME v2**,
So that **DbMetadataFieldInfo est toujours à jour**.

**Acceptance Criteria:**

```gherkin
Feature: Application du mapping par modification

  Scenario: Modification simple
    Given je modifie le titre original dans BMME v2
    When je sauvegarde
    Then le champ OriginalTitle dans DbMetadataFieldInfo est mis à jour
    And le timestamp de modification est enregistré

  Scenario: Modification bulk
    Given je fais une modification bulk de 50 champs
    When je sauvegarde
    Then les 50 champs sont synchronisés vers DbMetadataFieldInfo
    And la synchro est optimisée (batch update)

  Scenario: Transformation appliquée
    Given un mapping a une transformation (ex: join(','))
    When une synchro s'exécute
    Then la transformation est appliquée :
      | Input BMME v2 | Output DbMetadataFieldInfo |
      | ["FR", "DE", "IT"] | "FR,DE,IT" |
```

**FRs couverts :** FR90

---

## Story 6.5 : Garantie de cohérence source/projection

As a **Système**,
I want **garantir la cohérence entre BMME v2 (source) et DbMetadataFieldInfo (projection)**,
So that **les données sont toujours identiques entre les deux modèles**.

**Acceptance Criteria:**

```gherkin
Feature: Garantie de cohérence

  Scenario: Cohérence vérifiée à chaque synchro
    Given une synchronisation s'exécute
    Then le système vérifie que les données correspondent
    And toute incohérence est loggée et corrigée

  Scenario: Détection d'incohérence
    Given DbMetadataFieldInfo a été modifié hors BMME v2
    When une vérification de cohérence s'exécute
    Then l'incohérence est détectée
    And une alerte est générée
    And BMME v2 reste la source de vérité

  Scenario: Resync forcée
    Given une incohérence a été détectée
    When je déclenche une resync forcée
    Then toutes les données BMME v2 sont re-projetées vers DbMetadataFieldInfo
    And la cohérence est restaurée
```

**FRs couverts :** FR92

---

## Story 6.6 : Monitoring de la synchronisation legacy

As a **Admin Interne VDM**,
I want **monitorer le statut de synchronisation BMME v2 → DbMetadataFieldInfo**,
So that **je détecte rapidement les problèmes de synchro**.

**Acceptance Criteria:**

```gherkin
Feature: Monitoring de la synchronisation legacy

  Scenario: Dashboard de synchro legacy
    Given je suis Admin Interne VDM
    When j'accède à "Monitoring > Sync Legacy"
    Then je vois :
      | Métrique | Valeur |
      | Statut global | 🟢 Synchronized |
      | Dernière synchro | il y a 2 secondes |
      | Synchros/heure | 1,247 |
      | Erreurs (24h) | 0 |

  Scenario: Historique des synchronisations
    Given je consulte l'historique
    Then je vois les dernières synchros avec :
      | Timestamp | Title | Champs | Statut | Durée |
      | 14:32:15 | Le Dernier Métro | 3 | ✅ | 12ms |
      | 14:32:12 | La Haine | 1 | ✅ | 8ms |

  Scenario: Métriques de performance
    Given je consulte les métriques
    Then je vois :
      | Métrique | Valeur |
      | Latence moyenne | 15ms |
      | P95 latence | 45ms |
      | Throughput | 100 syncs/min |
```

**FRs couverts :** FR93

---

## Story 6.7 : Alertes en cas d'échec de synchronisation

As a **Système**,
I want **alerter en cas d'échec de synchronisation vers le modèle legacy**,
So that **les problèmes sont détectés et résolus rapidement**.

**Acceptance Criteria:**

```gherkin
Feature: Alertes échec synchronisation legacy

  Scenario: Alerte sur échec de synchro
    Given une synchronisation échoue
    Then une alerte est générée immédiatement
    And elle contient : Title concerné, Erreur, Timestamp

  Scenario: Notification des admins
    Given une alerte est générée
    Then les Admin Internes sont notifiés :
      | Canal | Action |
      | Dashboard | Badge rouge visible |
      | Email | Si configuré |
      | Slack/Teams | Si webhook configuré |

  Scenario: Retry automatique
    Given une synchro a échoué
    Then le système retente automatiquement (3 retries)
    And si tous les retries échouent, l'alerte est escaladée

  Scenario: Résolution d'alerte
    Given une alerte est active
    When la synchro réussit (après fix)
    Then l'alerte est automatiquement résolue
    And un log de résolution est créé
```

**FRs couverts :** FR94
