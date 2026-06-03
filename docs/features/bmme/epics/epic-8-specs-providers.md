<!-- TRACABILITE: Ancien Epic 4 -->
<!-- JIRA: DF-11135 -->

# Epic 8 : Gestion des Specs Providers (Labo)

**Julie peut** maintenir et déployer les specifications providers (iTunes, Amazon, Google, Netflix) de manière centralisée, sans modification de code.

**FRs couverts :** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR43, FR81, FR82, FR83, FR84, FR85, FR86

**Valeur livrée :** Julie met à jour une spec iTunes (nouveau format copyright), teste le mapping sur des packages réels, et déploie en 25 min sans CI/CD.

---

## Story 8.1 : Éditeur centralisé des specs providers

As a **Technicienne Labo VDM**,
I want **accéder à un éditeur centralisé pour les specs de chaque provider (iTunes, Amazon, Google, Netflix)**,
So that **je n'ai plus à modifier 47 fichiers XML dispersés**.

**Acceptance Criteria:**

```gherkin
Feature: Éditeur centralisé des specs providers

  Scenario: Accéder à l'éditeur de specs
    Given je suis connecté en tant que Labo VDM
    When j'accède à "Specs Providers"
    Then je vois la liste des providers : iTunes, Amazon, Google, Netflix
    And chaque provider affiche sa version actuelle

  Scenario: Ouvrir l'éditeur d'un provider
    Given je suis sur la liste des providers
    When je clique sur "iTunes"
    Then l'éditeur de spec iTunes s'ouvre
    And je vois la Source of Truth table (champs mediaspot)
    And je vois les mappings mediaspot → iTunes

  Scenario: Visualisation de la structure des mappings
    Given je suis dans l'éditeur iTunes
    Then je vois une table avec : Champ mediaspot | Champ iTunes | Formatting options | Mapping options
```

**FRs couverts :** FR22, FR81

---

## Story 8.2 : Édition des mappings mediaspot → provider

As a **Technicienne Labo VDM**,
I want **éditer les mappings entre les champs mediaspot et les champs provider**,
So that **je peux adapter les specs quand un provider change ses exigences**.

**Acceptance Criteria:**

```gherkin
Feature: Édition des mappings provider

  Scenario: Modifier un mapping existant
    Given je suis dans l'éditeur de mapping iTunes
    When je clique sur le mapping "studio_name → copyright"
    And je modifie le format de "© {year} {studio_name}" à "© {year} {studio_name}. All rights reserved."
    And je clique sur "Sauvegarder"
    Then le mapping est mis à jour
    And la modification est versionnée

  Scenario: Ajouter un nouveau mapping
    Given un nouveau champ est requis par iTunes
    When je clique sur "Add mapping"
    And je sélectionne le champ mediaspot source et le champ iTunes cible
    And je configure les options de formatage
    Then le nouveau mapping est ajouté

  Scenario: Supprimer un mapping obsolète
    Given un champ n'est plus requis par iTunes
    When je clique sur "Delete" pour ce mapping
    Then le mapping est marqué comme obsolète
    And une note de documentation est ajoutée
```

**FRs couverts :** FR23, FR24

---

## Story 8.3 : Formatting et Mapping options pour l'export

As a **Technicienne Labo VDM**,
I want **configurer des transformations (join, format dates) et des correspondances d'enums pour l'export**,
So that **les données sont correctement formatées selon les specs provider**.

**Acceptance Criteria:**

```gherkin
Feature: Formatting et Mapping options export

  Scenario: Définir une Formatting option pour l'export
    Given je configure le mapping "genres → genres"
    When je clique sur "Formatting options"
    And je sélectionne "join" avec séparateur ","
    Then la transformation est configurée
    And un preview montre : ["Drama", "Romance"] → "Drama,Romance"

  Scenario: Définir un Mapping option pour enum
    Given les genres mediaspot diffèrent des genres iTunes
    When je configure le Mapping option
    And je définis : mediaspot "Sci-Fi" → iTunes "Science Fiction"
    Then la correspondance est enregistrée

  Scenario: Preview des transformations
    Given des Formatting et Mapping options sont configurées
    Then un preview en temps réel montre le résultat de la transformation
    And je vois : Input "Sci-Fi" → Output "Science Fiction"
```

**FRs couverts :** FR82, FR83

---

## Story 8.4 : Test des mappings sur packages réels

As a **Technicienne Labo VDM**,
I want **tester les mappings sur des packages réels avant de déployer**,
So that **je m'assure que les transformations fonctionnent correctement**.

**Acceptance Criteria:**

```gherkin
Feature: Test des mappings sur packages réels

  Scenario: Lancer un test de mapping
    Given j'ai modifié un mapping iTunes
    When je clique sur "Test mappings"
    Then une modale s'ouvre avec une liste de packages disponibles
    And je peux sélectionner plusieurs packages pour le test

  Scenario: Exécution du test
    Given j'ai sélectionné 3 packages pour le test
    When je clique sur "Run test"
    Then le système applique les mappings sur chaque package
    And les résultats s'affichent :
      | Package | Status | Details |
      | Le Dernier Métro Redux | ✅ | copyright: © 2026 StudioCanal. All rights reserved. |
      | La Haine 4K | ✅ | copyright: © 1995 StudioCanal. All rights reserved. |
      | Amélie | ✅ | genres: "Comedy,Romance" |

  Scenario: Détection d'erreur lors du test
    Given un mapping est mal configuré
    When je lance le test
    Then l'erreur est identifiée et affichée
    And je peux corriger avant de déployer
```

**FRs couverts :** FR25, FR84, FR85

---

## Story 8.5 : Prévisualisation XML avant livraison

As a **Technicienne Labo VDM**,
I want **prévisualiser le XML qui sera généré pour un package**,
So that **je vérifie la conformité aux specs avant livraison client**.

**Acceptance Criteria:**

```gherkin
Feature: Prévisualisation XML

  Scenario: Générer un preview XML
    Given je suis sur un package "VALID"
    When je clique sur "Preview XML iTunes"
    Then le système génère le XML en temps réel
    And le XML s'affiche dans une fenêtre avec coloration syntaxique

  Scenario: Validation du XML contre le schéma
    Given le XML est généré
    Then le système valide contre le XSD iTunes
    And les erreurs éventuelles sont listées
    And les lignes concernées sont mises en évidence

  Scenario: Téléchargement du XML preview
    Given le XML preview est affiché
    When je clique sur "Download"
    Then le fichier XML est téléchargé
    And je peux le vérifier manuellement
```

**FRs couverts :** FR26, FR43

---

## Story 8.6 : Déploiement instantané sans modification de code

As a **Technicienne Labo VDM**,
I want **déployer les changements de specs instantanément sans passer par le CI/CD**,
So that **je suis autonome et réactive face aux changements de specs providers**.

**Acceptance Criteria:**

```gherkin
Feature: Déploiement instantané

  Scenario: Déployer un changement de spec
    Given j'ai modifié et testé un mapping iTunes
    When je clique sur "Déployer"
    Then une confirmation est demandée avec l'impact : "47 plateformes impactées"
    And après confirmation, le déploiement s'exécute
    And un message confirme : "✅ Déploiement terminé (3 secondes)"

  Scenario: Déploiement sans intervention dev
    Given le déploiement est effectué
    Then aucun commit Git n'est nécessaire
    And aucun build CI/CD n'est déclenché
    And les changements sont actifs immédiatement

  Scenario: Impact cross-platform
    Given je déploie un changement de spec iTunes
    Then le changement s'applique à toutes les plateformes clientes
    And tous les packages iTunes utilisent la nouvelle spec
```

**FRs couverts :** FR27

---

## Story 8.7 : Versionning des specs avec rollback

As a **Technicienne Labo VDM**,
I want **versionner les specs et pouvoir rollback en cas de problème**,
So that **je peux revenir à une version précédente si un déploiement cause des problèmes**.

**Acceptance Criteria:**

```gherkin
Feature: Versionning et rollback

  Scenario: Historique des versions
    Given je suis dans l'éditeur de spec iTunes
    When je clique sur "Version history"
    Then je vois la liste des versions : v5.16, v5.15, v5.14...
    And chaque version a une date, un auteur, un résumé des changements

  Scenario: Comparer deux versions
    Given je consulte l'historique des versions
    When je sélectionne deux versions pour comparer
    Then un diff s'affiche avec les changements (ajouts, modifications, suppressions)

  Scenario: Rollback vers une version précédente
    Given la version actuelle v5.16 cause des problèmes
    When je clique sur "Rollback to v5.15"
    Then une confirmation est demandée
    And après confirmation, la version v5.15 est restaurée
    And un nouveau déploiement s'effectue automatiquement
```

**FRs couverts :** FR28

---

## Story 8.8 : Source of Truth table partagée

As a **Admin Interne ou Labo VDM**,
I want **que la Source of Truth table soit partagée entre les mappings entrants et sortants**,
So that **la définition des champs mediaspot est cohérente dans tout le système**.

**Acceptance Criteria:**

```gherkin
Feature: Source of Truth table partagée

  Scenario: Visualiser la Source of Truth table
    Given je suis Admin ou Labo VDM
    When j'accède à "Source of Truth"
    Then je vois la table centrale : Champ mediaspot | Type | Default source | Lock source
    And cette table est la même pour les mappings entrants (Marc) et sortants (Julie)

  Scenario: Modification propagée
    Given je modifie le type d'un champ dans la Source of Truth table
    Then la modification est visible pour les mappings entrants ET sortants
    And les deux éditeurs reflètent le changement

  Scenario: Cohérence des données
    Given un champ est défini dans la Source of Truth table
    Then il est utilisable dans les mappings externes → mediaspot
    And il est utilisable dans les mappings mediaspot → providers
```

**FRs couverts :** FR86
