---

## stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-dataflow-enrichment']
inputDocuments:
  - 'docs/features/bmme/source-docs/feature_example.json'
  - 'docs/features/bmme/source-docs/package_example.json'
  - 'docs/features/bmme/source-docs/package_final_delivery.xml'
  - 'docs/features/bmme/source-docs/VDM Connect - Benjamin Chareyron.pdf'
  - 'docs/features/bmme/source-docs/Data flow : Journey 1.1 - Localisation des métadonnées Title.pdf'
  - 'docs/features/bmme/source-docs/Data flow : Journey 1.2 - Historisation : Synchro des métadonnées title.pdf'
  - 'docs/features/bmme/source-docs/Data flow : Journey 1.3 - Gestion des packages.pdf'
  - 'docs/features/bmme/source-docs/Data flow : Journey 2 - Mapping & Synchro des métadonnées entrantes.pdf'
  - 'docs/features/bmme/source-docs/Data flow : Journey 3 - Mapping des métadonnées sortantes.pdf'
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 0
projectDocsCount: 4
classification:
  projectType: 'saas_b2b'
  domain: 'media_entertainment_distribution'
  complexity: 'medium-high'
  projectContext: 'brownfield'

# Product Requirements Document - Mediaspot Documentation

**Author:** Ben
**Date:** 2026-02-16

## Executive Summary

**BMME v2 (BundleMaker Metadata Editor v2)** est le nouveau module de gestion des métadonnées SVOD de la plateforme mediaspot. Il remplace VDM Connect et pose les fondations pour BundleMaker v2.

### Problème

Les gestionnaires de catalogue passent des heures à créer manuellement des packages de métadonnées pour chaque provider (iTunes, Amazon, Google, Netflix) et chaque territoire. Les outils actuels (VDM Connect, PackageEditor) sont fragmentés, lents et source d'erreurs. Les désynchronisations entre systèmes externes (Unity, Iron, MovieLibrary) génèrent un support client élevé.

### Solution

BMME v2 centralise la gestion des métadonnées avec :

- **Héritage intelligent** : Title → Languages → Territories avec propagation automatique
- **Vue bulk de localisation** : édition multi-langue/multi-territoire en une seule interface
- **Mapping malléable** : éditeurs visuels pour les mappings entrants (systèmes externes) et sortants (providers)
- **Source tracking** : traçabilité complète de l'origine et l'historique de chaque métadonnée

### Impact attendu

- **Productivité** : création de packages en minutes au lieu d'heures
- **Adoption** : 80% des clients SVOD migrés en 6 mois
- **Dépréciation** : VDM Connect éteint Q3 2026, PackageEditor remplacé par BM v2

## Success Criteria

### User Success

**Le moment "aha!" : le premier package créé avec succès**

L'utilisateur (gestionnaire de catalogue / responsable de livraison) réalise que BMME v2 fonctionne quand il crée son premier package valide complet en **quelques minutes au lieu de plusieurs heures**.

**Critères mesurables:**

- Temps de création d'un package complet pour 1 Title × 1 Provider × 10 Territoires : **< 15 minutes** (vs plusieurs heures actuellement)
- Taux de complétion visible en temps réel pour chaque package
- Utilisateur autonome : peut identifier et corriger les champs manquants sans support

**Ce qui rend le succès possible:**

- **UX productive** avec feedback temps réel (pas de saisie aveugle)
- **Vue centralisée** des champs requis par package/territoire
- **Reasonable defaults pré-remplis** (héritage intelligent des métadonnées Title vers Package)
- **Gestion des traductions centralisée** (vue unique pour les 10+ territoires, pas 10 écrans séparés)

### Business Success

**Adoption + autonomie = réduction du support**

- **Cible 6 mois:** 80% des clients actifs SVOD ont migré vers BMME v2
- **Cible 12 mois:** Réduction de 60% des tickets support liés aux métadonnées SVOD
- Les clients se débrouillent seuls pour créer et valider leurs packages

**Déprécation des outils legacy**

- **Q3 2026:** VDM Connect déprécié et éteint (remplacé par BMME v2)
- **2027:** PackageEditor déprécié (remplacé par BM v2 qui s'appuiera sur BMME v2)

**BMME v2 comme fondation pour BM v2**

- Architecture solide et maintenable permettant à BM v2 de s'appuyer dessus
- La vraie valeur business viendra avec BM v2 (ordering automatisé)

**Indicateur de succès global:**

- **Simplicité d'utilisation + puissance fonctionnelle** = adoption naturelle (feature très attendue par les clients)

### Technical Success

**1. Fiabilité + malléabilité du système de mapping**

**Critère de réussite:**

- Source de vérité unique détenue par mediaspot, synchronisée avec:
  - VDM Connect (legacy, temporaire)
  - Systèmes tiers clients (Iron, Unity, etc.)
  - Spécifications providers maintenues en interne
- Mappings malléables par plateforme (les specs providers évoluent constamment)
- Zero perte de données lors de la migration depuis VDM Connect

**Mesure:**

- Désynchronisation entre systèmes = 0 (détection automatique + alertes)
- Temps de mise à jour d'une spec provider : < 1 jour (vs plusieurs semaines actuellement)

**2. Maintenabilité et scalabilité du code**

**Critère de réussite:**

- Code lisible, documenté, testé (fondation pour BM v2 et futures features mediaspot)
- Architecture modulaire permettant l'ajout de nouveaux providers sans refonte
- Couverture de tests > 80% sur la logique métier critique

**Mesure:**

- Temps d'onboarding d'un nouveau dev sur BMME : < 3 jours
- Temps d'ajout d'un nouveau provider : < 5 jours (vs plusieurs semaines actuellement)

### Measurable Outcomes

**Productivité utilisateur:**

- Temps de création package complet : **< 15 min** (vs 2-4h actuellement)
- Taux d'erreur à la livraison : **< 5%** (validation en amont)

**Adoption:**

- **6 mois:** 80% des clients SVOD sur BMME v2
- **12 mois:** Réduction de 60% du support métadonnées SVOD

**Technique:**

- Zero perte de données à la migration
- Temps d'ajout nouveau provider : < 5 jours
- Couverture de tests > 80%

## Product Scope

### MVP - Minimum Viable Product

**Objectif MVP:** Prouver le concept avec les 4 providers clés et l'ensemble des fonctionnalités de productivité essentielles.

**Providers (4):**

- iTunes
- Google
- Amazon
- Netflix

**Fonctionnalités core (productivité):**

- **Héritage intelligent** : métadonnées Title propagées automatiquement vers les Packages avec reasonable defaults
- **Saisie centralisée des traductions** : vue unique pour gérer tous les territoires d'un package (pas 10 écrans séparés)
- **Feedback temps réel** : taux de complétion visible par package, identification des champs manquants
- **Validation live** : respect des specs providers en temps réel

**Interconnectivité (source de vérité unique):**

- Import depuis VDM Connect (migration)
- Connexion systèmes tiers clients (Unity, Iron)
- Mapping vers source de vérité mediaspot
- Synchronisation bidirectionnelle (lecture/écriture)

**Périmètre technique:**

- Architecture modulaire (ajout providers futurs sans refonte)
- Tests automatisés sur logique métier critique
- Documentation technique pour BM v2

### Growth Features (Post-MVP)

**Extension progressive des providers:**

- Ajout d'autres plateformes SVOD au-delà des 4 MVP (Microsoft, Sony, Rakuten, etc.)
- Mise à jour continue des spécifications providers existants (évolution des APIs)

**Consommation par BM v2:**

- BM v2 (ordering automatisé) s'appuie sur BMME v2 comme fondation
- Workflows BM → BMME pour générer les packages à la demande

**Extension aux autres modules mediaspot:**

- Réutilisation des métadonnées Title par d'autres modules de la plateforme
- Harmonisation du modèle de données métadonnées à l'échelle de mediaspot

### Vision (Future)

**Localisation automatique par LLM:**

- Traduction automatique des champs textuels (synopsis, titres) pour tous les territoires
- Suggestion de localisations adaptées culturellement (pas seulement traduction littérale)

**Pré-remplissage automatique par LLM:**

- À la création d'un Title, pré-remplissage automatique des métadonnées "publiques" (genre, casting, année, etc.) via APIs publiques (IMDb, TMDb, etc.) enrichies par LLM
- Réduction du temps de saisie initial

## User Journeys

### Journey 1: Sophie - Gestionnaire de Catalogue (Happy Path)

**Persona: Sophie Dubois**

- Gestionnaire de catalogue chez Films Distribution International
- 3 ans d'expérience, gère 200 films au catalogue
- Profil hybride éditorial/technique
- Frustrée par le jonglage constant entre Mediaspot, VDM Connect et BMME actuel

**Opening Scene - Lundi matin, nouveau film à préparer**

Sophie vient de recevoir "Le Dernier Métro Redux" (remake). Elle doit le préparer pour iTunes, Amazon, Google et Netflix sur 15 territoires européens.

**Avant (l'enfer du workflow fragmenté):**

9h00 - Mediaspot: Crée le titre, remplit métadonnées de base (cast, synopsis), importe des infos depuis Unity.

10h00 - Passe la main aux responsables ingests pour les assets.

14h00 - **Ouvre VDM Connect** (système externe): Vérifie ce qui existe, crée métadonnées Package, s'occupe de la territorialisation. C'est long, répétitif, elle jongle entre 2 interfaces.

16h00 - **Retour sur Mediaspot**: Ré-import des métadonnées VDM Connect.

17h00 - **Ouvre BMME actuel**: Crée packages côté Mediaspot. Certains champs sont pré-remplis, mais elle doit **ressaisir manuellement** des dizaines de champs pour chaque combinaison territoire/provider. **Aucun feedback** sur ce qui manque. Elle avance à l'aveugle.

**Résultat: 2-3 jours de travail, erreurs découvertes à la livraison.**

---

**Avec BMME v2 (le workflow fluide et centralisé):**

**9h00 - Mediaspot, module Titles**

Sophie crée "Le Dernier Métro Redux", remplit les métadonnées Title globales (titre original, année production, genre, cast principal). Elle importe des infos depuis Unity pour aller plus vite.

**9h30 - Définition des langues et territoires**

Sophie définit les **langues supportées**: Français, Anglais, Allemand, Espagnol, Italien.

**Précision UX :** Sophie doit explicitement activer chaque langue qu'elle souhaite utiliser (bouton "Add language"). Seule la langue de l'original title (English) est active par défaut.

L'interface affiche uniquement les **champs localisables** au niveau langue (Localized title, Release date, Synopsis...). Les métadonnées globales non-localisables (IMDb ID, Genres, Original title) restent au niveau Title uniquement.

Pour chaque langue activée, le système lui présente automatiquement les **métadonnées localisables** (titre localisé, synopsis, mots-clés). Elle remplit:

- FR: "Le Dernier Métro Redux", synopsis français
- EN: "The Last Metro Redux", synopsis anglais
- DE: "Die letzte Metro Redux", synopsis allemand
- ES: "El Último Metro Redux", synopsis español
- IT: "L'Ultimo Metrò Redux", synopsis italiano

**10h00 - Territorialisation fine**

Sophie ajoute les 15 territoires européens. **Par défaut, chaque territoire hérite de sa langue** (France hérite FR, Germany hérite DE, etc.).

**Précision UX :** Quand Sophie active une langue (ex: French), tous les territoires associés (France, Belgium, Québec) deviennent activables. Elle peut les ajouter manuellement via un bouton "Add territory".

Les métadonnées territoire sont **"pulled from Language"** par défaut - Sophie ne ressaisit rien si les valeurs langue conviennent. Elle n'intervient que pour les overrides spécifiques.

Pour la Belgique, elle fait un **override manuel**: titre FR mais avec un synopsis adapté au marché belge.

**Première réaction de Sophie:** "Ah ouais, ça hérite automatiquement! Je ne ressaisis plus 15 fois les mêmes trucs."

**10h30 - Shared metadata (métadonnées partagées cross-platforms)**

Avant de créer des packages par provider, Sophie définit les **Shared metadata** : des métadonnées communes à tous les packages, quelle que soit la plateforme de livraison.

```
Shared metadata                    0/12
┌─────────────────────────────────────┐
│ Vendor ID                           │
│ Studio                              │
│ Labo                                │
│ Copyrights                          │
│ ...                                 │
└─────────────────────────────────────┘
```

Sophie remplit :

- **Vendor ID** : généré automatiquement ou saisi manuellement
- **Studio** : "Les Films du Losange"
- **Labo** : "VDM"
- **Copyrights** : "© 2026 Les Films du Losange"
- Dates VOD : EST 15/03/2026, VOD 15/04/2026
- Upload des artworks (16:9, poster)

Ces métadonnées seront automatiquement propagées à tous les packages (iTunes, Amazon, Google, Netflix).

Le système valide les formats en temps réel. ✅ "Artwork 16:9 valide"

**11h00 - Création du package iTunes**

Sophie clique sur "Create a package". Une modale s'affiche avec deux choix :

```
Create a package
┌─────────────────────────────────────┐
│ Platform      [iTunes ▼]           │
│                                     │
│ Territories   [x] UK  [x] US       │
│               [x] FR  [x] DE  ...  │
└─────────────────────────────────────┘
```

**Le système pré-remplit automatiquement :**

- **Shared metadata** (Vendor ID, Studio, Labo, Copyrights)
- **Métadonnées Title** héritées (titres localisés, synopsis, cast) transformées grâce au mapping des plateformes (journey 3)

Sophie voit un **compteur: "94/120 champs remplis"**. En rouge: "3 champs manquants requis".

**Structure du package :**

Le package suit la même hiérarchie que les métadonnées Title :

```
Package "iTunes"                    Valid
├── Global metadata (non-localized)  12/12
│   ├── Package ID
│   ├── Labo
│   └── Original Title
│
├── English                          12/12
│   ├── United Kingdom               12/12
│   ├── United States                12/12
│   └── Canada                       12/12
│
└── French language                  12/12
    ├── France                       12/12
    ├── Belgium                      12/12
    └── Québec                       12/12
```

- **Language tab** : affiche uniquement les champs localisables (Localized title, Copyrights, VOD Dates)
- **Territory tab** : métadonnées héritées de la langue ("Metadata pulled from Language")

**11h15 - Vue bulk de localisation**

Pour le champ "short_synopsis" (requis par iTunes), Sophie clique sur **"Localisation bulk"**.

Une vue s'ouvre avec **toutes les langues en colonnes, tous les territoires en lignes**. Elle remplit les 5 short_synopsis (un par langue) en 2 minutes. Le système propage automatiquement aux territoires concernés.

**Réaction de Sophie:** "Putain, c'est génial! Avant je devais ouvrir 15 écrans séparés!"

**11h20 - Feedback temps réel**

Le compteur passe à **"119/120 champs remplis"**. Reste 1 champ manquant: "theatrical_release_date" pour la Suisse.

Sophie le remplit. ✅ **Package iTunes: "120/120 champs remplis", état "VALID"**

**11h30 - Packages Amazon, Google, Netflix**

Sophie duplique le workflow pour Amazon (10 min), Google (8 min), Netflix (12 min).

**Grâce à l'héritage et la vue bulk, les 3 autres packages sont complétés en 30 minutes.**

---

**Climax - Le moment "aha!"**

**12h00** - Sophie regarde le dashboard BMME. **4 packages, 15 territoires chacun, tous "120/120", état "VALID"**.

**"J'ai fait en 3 heures ce qui me prenait 3 jours. Et je SAIS que c'est bon, je n'attends plus la livraison pour découvrir les erreurs."**

**Resolution - La nouvelle réalité**

Sophie passe le relais à BundleMaker. Les 4 packages sont marqués "utilisables". Plus de va-et-vient avec VDM Connect. Plus de saisie aveugle. Plus d'erreurs à la livraison.

Elle peut maintenant préparer 3 films par semaine au lieu d'1.

---

**Capabilities révélées par ce journey:**

- Hiérarchie Title → Langues → Territoires avec héritage automatique
- Activation explicite des langues
- Séparation claire : métadonnées globales vs champs localisables
- Territoires hérités automatiquement de leur langue parente ("Metadata pulled from Language")
- Shared metadata cross-platforms (Vendor ID, Studio, Labo, Copyrights)
- Création de package simplifiée : sélection Platform + Territories uniquement
- Pré-remplissage automatique depuis Title metadata + Shared metadata, avec Provider mapping appliqué comme transformation
- Structure Package identique à Title (Global → Languages → Territories)
- Vue bulk de localisation (édition multi-langue/multi-territoire)
- Feedback temps réel (compteur "94/120 champs remplis", champs manquants identifiés)
- Validation live contre specs providers
- État "VALID" pour handoff vers BundleMaker

### Journey 1.2: Sophie - Synchronisation manuelle et historique des métadonnées

**Contexte: Sophie doit arbitrer entre plusieurs sources de données**

Sophie travaille sur "Stranger Things - Season 4". Les métadonnées proviennent de plusieurs sources :

- **Unity** (système client StudioCanal)
- **mediaspot** (saisie manuelle interne)
- **IMDb** (enrichissement automatique)

Elle constate que le champ `originalTitle` affiche "Stranger Things - Season 4" (source: mediaspot), mais Unity propose "Stranger Things - S04".

---

**Workflow de synchronisation manuelle:**

**1. Vue Metadata tab avec indicateurs de source**

Sophie voit chaque métadonnée avec :

- L'icône de synchronisation
- La source actuelle (Unity, mediaspot, IMDb)

```
OAR           🔄  source: Unity
genre         🔄  source: Unity
originalTitle 🔄  source: mediaspot
```

**2. Bouton "Manual sync"**

Sophie clique sur "Manual sync". L'interface affiche :


| Select source           | Preview changes                          |
| ----------------------- | ---------------------------------------- |
| **Unity** (sélectionné) | Field: OAR → Old: 2.1 → New: 2.4         |
| IMDb                    | Field: genre → Old: Horror → New: Horror |
| Iron                    |                                          |


**3. Vue détail d'une métadonnée**

Sophie peut cliquer sur `originalTitle` pour voir toutes les valeurs disponibles par source :

```
Métadonnée "originalTitle"
┌─────────────────────────────────────┐
│ "Stranger Things - S04"             │  ← source: Unity
│ source: Unity                       │
├─────────────────────────────────────┤
│ "Stranger Things - Season 4"        │  ← source: mediaspot (actuel)
│ source: mediaspot                   │
├─────────────────────────────────────┤
│ "Stranger Things"                   │  ← source: IMDb
│ source: IMDb                        │
└─────────────────────────────────────┘
```

**4. Historique complet d'une métadonnée**

Sophie consulte l'historique des modifications :


| Old value                  | New value                  | Date       | User     | Details                            |
| -------------------------- | -------------------------- | ---------- | -------- | ---------------------------------- |
| Stranger Things - Season 4 | Stranger Things - S04      | 01/01/2026 | John Doe | Source changed (mediaspot → Unity) |
| Stranger Things - S04      | Stranger Things - Season 4 | 01/01/2026 | John Doe | Manual Edit                        |
| Stranger Things - Season 4 | Stranger Things - S04      | 01/01/2026 | System   | Periodic sync                      |


---

**Moment "aha!" :**

**"Je peux enfin voir d'où vient chaque donnée, comparer les sources, et choisir laquelle utiliser. Plus besoin de deviner ou de vérifier manuellement dans chaque système."**

---

**Capabilities révélées par ce journey:**

- Source tracking par métadonnée (affichage de la source actuelle)
- Synchronisation manuelle avec preview des changements
- Vue multi-source pour une même métadonnée
- Historique complet avec traçabilité (user, date, type de modification)
- Types de modifications : Source changed, Manual Edit, Periodic sync

### Journey 2: Marc - Admin Interne VDM (Monitoring & Maintenance)

**Persona: Marc Lefebvre**

- Admin système chez VDM (mediaspot), 5 ans d'ancienneté
- Responsable des synchronisations entrantes (Unity, Iron, MovieLibrary)
- Profil tech/DevOps, maintient les "Spock" (agents de synchro)
- Frustré par le manque d'outillage: pas de back-office, logs dispersés, diagnostic à l'aveugle

**Opening Scene - Lundi matin, le client remonte un problème**

8h30 - Marc arrive au bureau. 3 tickets support urgents dans sa boîte: **StudioCanal se plaint que leurs nouveaux films n'apparaissent pas dans mediaspot depuis plusieurs jours**. Les gestionnaires de catalogue côté client ne peuvent pas travailler.

Marc sait que StudioCanal utilise **Unity** pour synchroniser son catalogue toutes les nuits. Mais il n'a aucune visibilité immédiate sur ce qui s'est passé.

---

**Avant BMME v2 (le diagnostic sans outils):**

**8h45 - Recherche manuelle dans les emails**

Marc ouvre sa boîte mail, cherche "Unity" + "StudioCanal". Il trouve des emails automatiques cryptiques générés par le Spock:

```
[ERROR] Unity sync failed - StudioCanal
NullPointerException at line 234
```

Pas de contexte. Pas de timestamp précis. Impossible de savoir depuis quand c'est cassé.

**9h00 - Connexion SSH aux serveurs**

Marc se connecte au serveur de prod, `grep` les logs:

```bash
grep "StudioCanal" /var/log/spock-unity.log | tail -100
```

Des milliers de lignes. Il découvre que la synchro échoue depuis **jeudi dernier** (3 jours). Mais pourquoi?

**9h30 - Analyse du code du Spock**

Marc ouvre le repo Git du Spock Unity. Les mappings sont en partie dans le code, en partie dans des JSON dispersés. Il cherche la ligne 234 qui crashe.

Il trouve: un champ `director` manquant côté Unity. **Unity a changé son schéma API sans prévenir.**

**10h30 - Correction manuelle**

Marc modifie le mapping dans le code:

```javascript
// Avant
director: response.data.director

// Après (avec fallback)
director: response.data.director || response.data.directorName || null
```

Il commit, push, déclenche un build, redéploie le Spock. **30 minutes de CI/CD.**

**11h30 - Resynchronisation manuelle**

Maintenant il faut **resynchroniser les 3 jours de données manquantes**. Marc doit:

1. Identifier les films créés/modifiés côté Unity entre jeudi et aujourd'hui
2. Scripter une resync manuelle
3. Lancer le script, surveiller les erreurs
4. Vérifier manuellement dans la base mediaspot que les données sont bien arrivées

**14h00 - Vérification + communication**

Marc vérifie dans la base de données mediaspot. Les films sont là. Il ferme les tickets support: "Problème résolu, synchro rétablie."

**Résultat: 1 journée complète de galère. 3 jours de synchro cassée non détectés. Client mécontent.**

---

**Avec BMME v2 (le back-office de monitoring):**

**8h30 - Dashboard de monitoring**

Marc arrive, ouvre le **dashboard BMME Admin**. Un badge rouge attire immédiatement son attention:

🔴 **Unity - StudioCanal: Synchro échouée (3 jours)**

Il clique. Le dashboard affiche:

- **Dernière synchro réussie**: Mercredi 23h47
- **Première erreur**: Jeudi 00h12 (il y a 3 jours)
- **Nombre d'échecs consécutifs**: 9
- **Impact**: 47 films non synchronisés

**8h35 - Logs détaillés et friendly**

Marc clique sur "Voir les logs". L'interface affiche un log **lisible et structuré**:

```
[2026-02-13 00:12:34] ❌ Unity API - StudioCanal
Erreur: Champ "director" manquant dans la réponse API
Film concerné: "La Haine 4K Remaster" (Unity ID: 98234)
Mapping attendu: response.data.director
Valeur reçue: undefined
Suggestion: Vérifier si le champ a été renommé dans l'API Unity
```

**Première réaction de Marc:** "Putain, c'est clair! Unity a changé son schéma."

**8h40 - Diagnostic assisté**

Le système propose un **mode diagnostic**. Marc clique sur "Tester l'API Unity maintenant".

BMME fait un appel live à l'API Unity, affiche la réponse brute:

```json
{
  "id": 98234,
  "title": "La Haine 4K Remaster",
  "directorName": "Mathieu Kassovitz",
  ...
}
```

**Réaction de Marc:** "Ah voilà, `director` → `directorName`. Je corrige le mapping."

**8h50 - Architecture de mapping externe (platform-based)**

Marc ouvre l'éditeur de mapping. L'interface révèle deux concepts clés :

**1. External source mapping (platform-based)**

Chaque plateforme cliente (StudioCanal, UGC, etc.) a ses propres mappings vers les systèmes externes qu'elle utilise :

```
┌─────────────────────────────────────────────────────────────────────┐
│ External systems mappings                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Unity                                                               │
│ ┌───────────────┬─────────────────┬──────────────┬────────────────┐│
│ │ Unity Field   │ mediaspot Field │ Formatting   │ Mapping options││
│ ├───────────────┼─────────────────┼──────────────┼────────────────┤│
│ │ directorName  │ cast.director   │              │                ││
│ │ aspectRatio   │ OAR             │              │                ││
│ │ genres        │ genre           │ value.split('&') │ Sci-fi → Sci-fi ││
│ │               │                 │              │ Fantasy → Fantasy ││
│ │ title         │ originalTitle   │              │                ││
│ └───────────────┴─────────────────┴──────────────┴────────────────┘│
│                                                                     │
│ VDM Connect, Iron, IMDb... (même structure)                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Formatting options** : transformations de données (`value.split('&')`, `value.trim()`, etc.)

**Mapping options** : correspondances d'enums entre système externe et mediaspot

**2. mediaspot source of truth (cross-platforms)**

Table centrale définissant le comportement de chaque champ mediaspot :

```
┌─────────────────┬────────┬────────────────┬─────────────┐
│ mediaspot field │ Type   │ Default source │ Lock source │
├─────────────────┼────────┼────────────────┼─────────────┤
│ cast.director   │ string │ Unity          │ Yes         │
│ OAR             │ enum   │ Unity          │ Yes         │
│ genre           │ enum   │ Unity          │ No          │
│ originalTitle   │ enum   │ mediaspot      │ No          │
└─────────────────┴────────┴────────────────┴─────────────┘
```

- **Default source** : quelle source utiliser par défaut pour ce champ
- **Lock source** : si "Yes", empêche le changement de source sur ce champ

Marc corrige le mapping Unity :

```
data.directorName    →  director
```

Sauvegarde. Le système valide le mapping en temps réel contre un échantillon de données Unity. ✅ **"Mapping valide"**

**9h00 - Sync history et resynchronisation**

Marc consulte l'historique des synchronisations :

```
Sync history                                          [Bulk resync]
┌──────────┬─────────────────┬──────────┬────────┬─────────┐
│ Source   │ Date            │ Impact   │ Errors │ Actions │
├──────────┼─────────────────┼──────────┼────────┼─────────┤
│ Unity    │ 21/12/2026 12:25│ 13 fields│ None   │ Resync  │
│ Iron     │ 21/12/2026 12:25│ 152 fields│ 3     │ Resync  │
└──────────┴─────────────────┴──────────┴────────┴─────────┘
```

Marc clique sur "13 fields" pour voir le détail de la sync Unity :

```
Data sync single - 13 fields updated                    [Resync]
┌─────────────────┬───────────────┬───────────┬──────────────────────────────────┐
│ Title           │ Field         │ New value │ Notes                            │
├─────────────────┼───────────────┼───────────┼──────────────────────────────────┤
│ Stranger Things │ director      │ "John Doe"│                                  │
│                 │ OAR           │ 2.1       │                                  │
│                 │ localizedTitle│ 13        │ ⚠️ Wrong data format: should be string │
│                 │ genres        │ Sci-Fi    │ ⚠️ Formatting failed: no '&' found │
│                 │ originalTitle │ 13        │ ℹ️ Not synced - Field sourced by mediaspot │
├─────────────────┼───────────────┼───────────┼──────────────────────────────────┤
│ Terminator      │ director      │ "John Doe"│                                  │
│                 │ OAR           │ 2.1       │                                  │
│                 │ originalTitle │ Terminator - Dark Fate │                   │
└─────────────────┴───────────────┴───────────┴──────────────────────────────────┘
```

**Types de notes :**

- ⚠️ **Wrong data format** : le type de donnée reçu ne correspond pas au type attendu
- ⚠️ **Formatting failed** : la transformation (split, etc.) a échoué
- ℹ️ **Not synced - Field sourced by mediaspot** : champ protégé par Lock source

Marc clique sur **"Resync"**. Une barre de progression s'affiche:

```
Resynchronisation en cours...
- 47 films identifiés
- 12/47 synchronisés (25%)
- ETA: 3 minutes
```

**9h05 - Vérification automatique**

La resync est terminée. Le dashboard affiche:

```
✅ Unity - StudioCanal: Synchro rétablie
- 47 films synchronisés avec succès
- 0 erreur
- Prochaine synchro: Ce soir 23h30
```

Marc clique sur "Voir les films synchronisés". Une liste s'affiche avec les 47 titres. Il peut cliquer sur n'importe lequel pour vérifier les métadonnées dans mediaspot.

**9h10 - Communication automatique**

Le système a automatiquement notifié les utilisateurs concernés (Sophie et son équipe chez StudioCanal):

"La synchronisation Unity a été rétablie. Vos 47 films sont maintenant disponibles dans mediaspot."

Marc ferme les tickets support avec un message automatiquement pré-rempli par BMME.

---

**Climax - Le moment "aha!"**

**9h15** - Marc regarde le dashboard. **Problème identifié, corrigé et resynchronisé en 40 minutes.** Sans toucher au code. Sans CI/CD. Sans scripts manuels.

**"Avant je mettais une journée à diagnostiquer et corriger. Là j'ai tout fait en 40 minutes, et en plus je n'ai pas eu besoin de demander à un dev de déployer."**

**Resolution - La nouvelle réalité**

Marc configure une **alerte proactive**: si une synchro échoue plus de 2 fois consécutivement, il reçoit une notification Slack immédiatement.

**Plus de détection tardive. Plus de grep de logs. Plus de déploiements pour des mappings. Plus de scripts de resync artisanaux.**

Marc peut maintenant maintenir 10 connexions externes au lieu de 3, sans stress. Et il détecte les problèmes **avant** que les clients ne s'en plaignent.

---

**Capabilities révélées par ce journey:**

**Architecture de mapping:**

- External source mapping platform-based (chaque plateforme a ses propres mappings)
- Formatting options pour transformations de données (split, trim, etc.)
- Mapping options pour correspondances d'enums
- Source of truth table avec Default source et Lock source
- Lock source pour empêcher le changement de source sur un champ

**Monitoring et historique:**

- Dashboard de monitoring centralisé avec statut temps réel des synchronisations
- Logs détaillés et friendly
- Mode diagnostic live pour tester les APIs externes en temps réel
- Sync history avec Impact, Errors, et action Resync
- Détail par sync : liste des champs + notes d'erreur typées
- Bulk resync pour relancer plusieurs syncs en une fois

### Journey 3: Julie - Labo VDM (Maintenance des specs providers)

**Persona: Julie Martin**

- Technicienne Labo chez VDM (mediaspot), 4 ans d'ancienneté
- Responsable de la maintenance des specs providers (iTunes, Amazon, Google, Netflix)
- Profil technique, gère les mappings mediaspot → providers
- Frustrée par la complexité des XML dispersés et la découverte tardive des erreurs

**Opening Scene - Mardi matin, iTunes change ses specs**

9h00 - Julie reçoit un email d'Apple: **iTunes vient de publier la version 5.16 de ses specs XML**. Changement majeur: le champ `<copyright>` devient obligatoire et doit respecter un nouveau format:

**Avant**: `© 2026 Studio Name`
**Maintenant**: `© {YEAR} {STUDIO}. All rights reserved.`

Julie sait ce que ça veut dire: elle doit **mettre à jour tous les XML de mapping** pour toutes les plateformes qui livrent sur iTunes.

---

**Avant BMME v2 (la galère XML dispersée):**

**9h15 - Identification des fichiers XML concernés**

Julie ouvre le repo Git `provider-specs/`. La structure est:

```
provider-specs/
  ├── itunes-mapping
  │   ├── itunes-mapping-sc.xml
  │   ├── itunes-mapping-snd.xml
  │   └── itunes-mapping-pathe.xml
  ├── platform-B/
  │   ├── itunes-mapping.xml
  │   ├── amazon-mapping.xml
  │   └── netflix-mapping.xml
  ├── platform-C/
  │   └── itunes-mapping.xml
  ...
```

Elle doit identifier **tous les fichiers `itunes-mapping.xml`** dispersés dans les dossiers de plateformes. Grep manuel:

```bash
find . -name "itunes-mapping.xml" | wc -l
# Résultat: 47 fichiers
```

**47 fichiers à modifier manuellement.**

**9h30 - Modification manuelle des XML**

Julie ouvre le premier fichier `platform-A/itunes-mapping.xml`:

```xml
<field>
  <source>studio_name</source>
  <target>copyright</target>
  <format>© {year} {studio_name}</format>
</field>
```

Elle doit le modifier:

```xml
<field>
  <source>studio_name</source>
  <target>copyright</target>
  <format>© {year} {studio_name}. All rights reserved.</format>
</field>
```

**Elle répète cette opération 47 fois.** Copier-coller, chercher la ligne, modifier, sauvegarder. **Risque d'erreur énorme.**

**11h30 - Tests manuels**

Julie doit tester que ses modifications fonctionnent. Elle:

1. Sélectionne un package de test dans mediaspot
2. Lance manuellement la génération XML iTunes
3. Inspecte le XML généré pour vérifier le format du champ `<copyright>`
4. Compare avec les specs iTunes v5.16

Si elle trouve une erreur, elle doit retrouver **quel fichier XML a produit cette erreur** parmi les 47 modifiés.

**14h00 - Déploiement + communication**

Julie commit les 47 fichiers modifiés, push, déclenche un build. Elle envoie un email aux équipes internes:

"Mise à jour specs iTunes v5.16 déployée. Le champ copyright respecte maintenant le nouveau format."

**Résultat: 1 demi-journée de travail manuel répétitif. Risque d'erreur élevé (oubli d'un fichier, typo dans le format).**

---

**Avec BMME v2 (l'éditeur de specs centralisé):**

**Distinction architecturale clé :**


| Type de mapping                     | Scope              | Géré par                                 |
| ----------------------------------- | ------------------ | ---------------------------------------- |
| External source mapping (Journey 2) | **Platform-based** | Marc (Admin) par plateforme cliente      |
| Provider mapping (Journey 3)        | **Cross-platform** | Julie (Labo) pour toutes les plateformes |


Les specs providers (iTunes, Amazon, Google, Netflix) sont les mêmes pour tous les clients mediaspot. Julie maintient une source de vérité unique utilisée par toutes les plateformes.

**9h05 - Éditeur de mapping centralisé**

Julie reçoit l'email d'Apple. Elle ouvre le **back-office BMME Admin**, section **"Specs Providers"**.

Elle clique sur **"iTunes Spec Editor"**. L'interface affiche la même **source of truth table** que Marc (Journey 2), mais cette fois pour configurer les mappings sortants :

```
mediaspot source of truth (cross-platforms)
┌─────────────────┬────────┬────────────────┬─────────────┐
│ mediaspot field │ Type   │ Default source │ Lock source │
├─────────────────┼────────┼────────────────┼─────────────┤
│ cast.director   │ string │ Unity          │ Yes         │
│ OAR             │ enum   │ Unity          │ Yes         │
│ genre           │ enum   │ Unity          │ No          │
│ originalTitle   │ enum   │ mediaspot      │ No          │
└─────────────────┴────────┴────────────────┴─────────────┘
```

Puis les mappings vers chaque provider :

```
Providers mapping                                    [Test mappings]

iTunes
┌─────────────────┬──────────────┬──────────────────┬─────────────────┐
│ mediaspot field │ iTunes field │ Formatting options│ Mapping options │
├─────────────────┼──────────────┼──────────────────┼─────────────────┤
│ cast.director   │ directorName │                  │                 │
│ OAR             │ aspectRatio  │                  │                 │
│ genre           │ genres       │ value.join(',')  │ Sci-fi → Sci-fi │
│                 │              │                  │ Fantasy → Fantasy│
│ originalTitle   │ title        │                  │                 │
└─────────────────┴──────────────┴──────────────────┴─────────────────┘

Amazon, Google... (même structure)
```

**Formatting options** : transformations pour l'export (`value.join(',')`, formatage de dates, etc.)

**Mapping options** : correspondances d'enums mediaspot → provider

**Première réaction de Julie:** "Ah, je vois tous les champs iTunes en un seul endroit!"

**9h10 - Modification en un seul endroit**

Julie clique sur **"Éditer"** pour le champ `copyright`. Une interface s'ouvre:

```
Mapping: studio_name → copyright

Format actuel:
© {year} {studio_name}

Nouveau format (iTunes v5.16):
© {year} {studio_name}. All rights reserved.
```

Elle modifie le format, sauvegarde.

**Réaction de Julie:** "Un seul endroit à modifier! Avant je devais ouvrir 47 fichiers!"

**9h15 - Test mappings**

Julie clique sur **"Test mappings"**. Une modale s'ouvre pour valider les mappings sur des packages réels :

```
Test mapping modal
┌──────────────────────────────────────────────────────────┐
│ Select packages to test:                                 │
│ [x] Le Dernier Métro Redux (StudioCanal)                │
│ [x] La Haine 4K (StudioCanal)                           │
│ [x] Amélie (UGC)                                        │
│                                                          │
│ Provider: [iTunes ▼]                                    │
│                                                          │
│                              [Run test]                  │
└──────────────────────────────────────────────────────────┘
```

Résultats du test :

```
✅ Le Dernier Métro Redux
   genres: "Drama,Romance" (value.join applied)
   copyright: © 2026 StudioCanal. All rights reserved.

✅ La Haine 4K
   genres: "Drama" (single value, no join needed)
   copyright: © 1995 StudioCanal. All rights reserved.

✅ Amélie
   genres: "Comedy,Romance" (value.join applied)
   copyright: © 2001 UGC. All rights reserved.

3/3 packages validated against iTunes spec v5.16
```

**Réaction de Julie:** "Parfait, le format est bon. Je valide!"

**9h20 - Déploiement instantané**

Julie clique sur **"Déployer"**. Le système affiche:

```
Déploiement en cours...
- Mapping iTunes mis à jour
- 47 plateformes impactées
- Mise à jour automatique des configurations
- ✅ Déploiement terminé (3 secondes)
```

**Plus besoin de toucher 47 fichiers XML. Plus besoin de commit Git. Plus besoin de build CI/CD.**

**9h25 - Génération XML de test**

Julie veut double-vérifier. Elle sélectionne un package dans BMME, clique sur **"Prévisualiser XML iTunes"**.

Le système génère le XML en temps réel:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<package>
  <copyright>© 2026 StudioCanal. All rights reserved.</copyright>
  <title>Le Dernier Métro Redux</title>
  ...
</package>
```

Conforme aux specs iTunes v5.16. ✅

---

**Climax - Le moment "aha!"**

**9h30** - Julie regarde le back-office. **Spec iTunes mise à jour en 25 minutes.** Un seul endroit modifié. Validation automatique. Déploiement instantané.

**"Avant je passais une demi-journée à modifier 47 fichiers XML à la main. Là j'ai fait en 25 minutes, avec la certitude que c'est bon."**

**Resolution - La nouvelle réalité**

Julie n'a plus besoin de fouiller dans 47 fichiers XML dispersés. Quand Amazon ou Netflix changent leurs specs, elle ouvre l'éditeur centralisé, modifie en un seul endroit, teste, déploie.

**Plus de modification manuelle de 47 fichiers. Plus de risque d'oubli. Plus de découverte des erreurs à la livraison client.**

Julie peut maintenant maintenir les 4 providers MVP + ajouter de nouveaux providers (Microsoft, Sony) sans exploser en complexité.

---

**Capabilities révélées par ce journey:**

**Architecture de mapping sortant:**

- Provider mapping cross-platform (specs partagées entre toutes les plateformes clientes)
- Source of truth table commune avec Journey 2 (cohérence entrée/sortie)
- Formatting options pour transformations d'export (join, format dates, etc.)
- Mapping options pour correspondances d'enums mediaspot → provider

**Validation et déploiement:**

- Éditeur de specs providers centralisé (un seul endroit par provider, pas 47 fichiers XML dispersés)
- Bouton "Test mappings" pour valider sur packages réels avant déploiement
- Prévisualisation des valeurs transformées
- Validation contre specs provider (version trackée)
- Prévisualisation XML avant livraison (test de génération)
- Déploiement instantané cross-platforms sans modification de code
- Versionning des specs (rollback possible si problème)
- Impact analysis (combien de plateformes impactées par un changement)

### Journey Requirements Summary

Les quatre user journeys (1, 1.2, 2, 3) révèlent les capabilities suivantes pour BMME v2:

**Pour les utilisateurs clients (Sophie - Journey 1 & 1.2):**

- Hiérarchie Title → Langues → Territoires avec héritage automatique
- Activation explicite des langues
- Métadonnées territoire héritées de la langue ("Metadata pulled from Language")
- Shared metadata cross-platforms (Vendor ID, Studio, Labo, Copyrights)
- Création de package simplifiée : sélection Platform + Territories
- Vue bulk de localisation (édition multi-langue/multi-territoire)
- Feedback temps réel avec compteur de complétion ("94/120 champs remplis")
- Validation live contre specs providers
- État VALID/INVALID pour handoff vers BundleMaker
- Source tracking par métadonnée (affichage de la source actuelle)
- Synchronisation manuelle avec preview des changements
- Historique complet des modifications avec traçabilité

**Pour les admins internes (Marc - Journey 2):**

- External source mapping platform-based (chaque plateforme a ses propres mappings)
- Formatting options pour transformations de données (split, trim, etc.)
- Mapping options pour correspondances d'enums
- Source of truth table avec Default source et Lock source
- Dashboard de monitoring centralisé des synchronisations entrantes
- Logs détaillés et friendly avec suggestions de diagnostic
- Mode diagnostic live pour tester les APIs externes
- Sync history avec Impact, Errors, et action Resync
- Bulk resync pour relancer plusieurs syncs
- Alertes proactives configurables

**Pour le labo (Julie - Journey 3):**

- Provider mapping cross-platform (specs partagées entre toutes les plateformes)
- Source of truth table commune avec Journey 2 (cohérence entrée/sortie)
- Formatting options pour transformations d'export (join, format dates, etc.)
- Mapping options pour correspondances d'enums mediaspot → provider
- Bouton "Test mappings" pour valider sur packages réels
- Éditeur de specs providers centralisé (mediaspot → providers)
- Prévisualisation XML avant livraison
- Déploiement instantané cross-platforms sans modification de cod

## Domain-Specific Requirements

### Standards & Formats

**Codes territoires ISO 3 lettres:**

- Tous les territoires doivent utiliser les codes ISO 3166-1 alpha-3 (FRA, DEU, USA, etc.)
- Garantit la compatibilité multi-providers sans ambiguïté
- Standard requis pour l'export vers iTunes, Amazon, Google, Netflix

**Standards métadonnées larges:**

- Le modèle de données mediaspot doit être le plus large possible pour permettre l'export vers de multiples providers
- Approche "superset" : capturer tous les champs possibles requis par les différents providers
- Évite la perte de données lors du mapping vers des providers avec des specs différentes

### Provider Compliance (Critique)

**Notation des labos par les providers:**

- **Risque majeur** : Les labos sont **notés par les providers** (iTunes, Amazon, Google, Netflix)
- **Conséquence critique** : Trop de mauvaises livraisons → **blacklist du labo**
- **Impact business** : Si le labo VDM est blacklisté, tous les clients VDM perdent l'accès au provider

**Exigences de qualité strictes:**

- Zero tolérance pour les erreurs de specs providers
- Validation stricte contre les specs avant toute livraison
- Tracking des changements de specs pour éviter les breaking changes

**Responsabilité partagée:**

- **BMME v2** : Maintenance centralisée des specs providers (Journey 3 - Julie)
- **BundleMaker v2** : Validation des livraisons avant envoi au provider
- **Labo VDM** : Point de contrôle qualité final avant livraison client

### Quality Assurance & Validation

**Validation multi-niveaux:**

1. **Validation en temps réel (BMME v2)**:
  - Compteur de complétion ("94/120 champs remplis")
  - Détection des champs manquants requis
  - État VALID/INVALID pour handoff vers BundleMaker
2. **Validation pre-livraison (BundleMaker v2)**:
  - Vérification finale des packages avant envoi au provider
  - Génération XML conforme aux specs provider actuelles
  - Tests de validation contre schemas XSD
3. **Contrôle qualité labo (processus manuel)**:
  - Labo VDM qualifie les assets de référence
  - Vérification manuelle des livraisons critiques avant envoi
  - Expertise métier pour identifier les anomalies non détectables automatiquement

### Risk Mitigation

**Risque principal : Mauvaise livraison au provider**

**Causes possibles:**

- Specs provider obsolètes (changement non détecté)
- Métadonnées incomplètes ou incorrectes
- Formats de champs non conformes
- Erreurs de mapping mediaspot → provider

**Mitigations en place:**

1. **Éditeur de specs centralisé (BMME v2)**:
  - Un seul endroit à maintenir par provider (pas 47 fichiers XML dispersés)
  - Validation en temps réel des mappings
  - Prévisualisation XML avant livraison
  - Versionning avec rollback possible
2. **Labo VDM comme point de contrôle:**
  - Équipe performante au cœur de l'écosystème mediaspot
  - Connaissance approfondie des specs providers
  - Capacité à identifier et corriger les anomalies avant livraison
3. **Feedback loop rapide:**
  - Si une livraison échoue, détection immédiate via logs providers
  - Correction rapide des specs via l'éditeur centralisé
  - Pas de redéploiement code nécessaire

**Indicateur de succès:**

- **Taux d'erreur à la livraison < 5%** (défini dans Success Criteria)
- **Temps de mise à jour d'une spec provider < 1 jour** (vs plusieurs semaines actuellement)
- **Zero blacklist provider** durant toute la vie de BMME v2

## SaaS B2B Specific Requirements

### Multi-Tenancy Architecture

**Isolation par plateforme client:**

- Chaque client (StudioCanal, UGC, etc.) dispose de sa propre plateforme mediaspot isolée
- Données strictement cloisonnées entre les plateformes clients
- Mappings provider-specific configurables de manière indépendante par plateforme

**Dashboard d'administration cross-plateformes:**

- Dashboard SuperAdmin VDM pour gérer centralement:
  - Specs providers (iTunes, Amazon, Google, Netflix) - mises à jour appliquées à toutes les plateformes
  - Specs systèmes externes (Unity, Iron, MovieLibrary) - configurations partagées
  - Templates de configuration réutilisables par les nouvelles plateformes
- Séparation claire: configuration centralisée (SuperAdmin) vs données client (isolées)

### Permission Model (ACL)

**Grandes actions BMME nécessitant des permissions:**

1. **Gestion des métadonnées:**
  - Création de métadonnées (Titles, Langues, Territoires)
  - Édition de métadonnées existantes
  - Suppression de métadonnées (avec garde-fous si packages associés)
2. **Gestion des packages:**
  - Création de packages
  - Édition de packages (métadonnées, localisations)
  - Suppression de packages
  - Validation de packages (passage à l'état VALID pour handoff BundleMaker)
3. **Gestion des mappings (plateforme-based):**
  - Configuration des mappings systèmes externes → mediaspot (Marc - Journey 2)
  - Configuration des mappings mediaspot → providers (Julie - Journey 3)
  - Accès aux éditeurs de mapping visuels
  - Déploiement de configurations de mapping

**Matrice ACL suggérée (à affiner en Architecture):**


| Rôle                   | Métadonnées | Packages         | Mappings        | SuperAdmin |
| ---------------------- | ----------- | ---------------- | --------------- | ---------- |
| Gestionnaire Catalogue | Édition     | Création/Édition | -               | -          |
| Responsable Livraison  | Édition     | Toutes actions   | -               | -          |
| Admin Interne VDM      | -           | -                | Toutes          | -          |
| Labo VDM               | -           | -                | Specs providers | -          |
| SuperAdmin VDM         | -           | -                | Toutes          | Toutes     |


### Integration Architecture

**Distinction architecturale clé : Platform-based vs Cross-platform**


| Type                        | Scope          | Description                                                                         |
| --------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| **External source mapping** | Platform-based | Chaque plateforme cliente configure ses propres mappings vers ses systèmes externes |
| **Provider mapping**        | Cross-platform | Specs providers partagées entre toutes les plateformes clientes                     |
| **Source of truth table**   | Cross-platform | Définition des champs mediaspot (Type, Default source, Lock source) partagée        |


**Intégrations entrantes (synchronisation) - Platform-based:**

Chaque plateforme cliente peut configurer ses propres mappings vers :

- Unity API (ex: StudioCanal)
- Iron API
- MovieLibrary FTP+XML
- VDM Connect (migration)
- IMDb (enrichissement)
- Autres sources ajoutables par plateforme

**Structure de mapping entrant :**

```
External Field → mediaspot Field + Formatting options + Mapping options
```

- **Formatting options** : transformations de données (`value.split('&')`, `value.trim()`, etc.)
- **Mapping options** : correspondances d'enums explicites

**Intégrations sortantes (delivery) - Cross-platform:**

Specs providers maintenues centralement par le Labo VDM, appliquées à toutes les plateformes :

- iTunes (XML spec-driven)
- Amazon (XML spec-driven)
- Google (XML spec-driven)
- Netflix (XML spec-driven)

**Structure de mapping sortant :**

```
mediaspot Field → Provider Field + Formatting options + Mapping options
```

- **Formatting options** : transformations pour l'export (`value.join(',')`, formatage dates, etc.)
- **Mapping options** : correspondances d'enums mediaspot → provider

**Source of truth table (cross-platform) :**

Table centrale définissant le comportement de chaque champ mediaspot :


| Attribut            | Description                                              |
| ------------------- | -------------------------------------------------------- |
| **mediaspot field** | Nom du champ dans le modèle mediaspot                    |
| **Type**            | Type de donnée (string, enum, date, etc.)                |
| **Default source**  | Source par défaut pour ce champ (Unity, mediaspot, etc.) |
| **Lock source**     | Si activé, empêche le changement de source sur ce champ  |


Cette table est partagée entre :

- Les mappings entrants (Journey 2 - Marc)
- Les mappings sortants (Journey 3 - Julie)
- BundleMaker v2 (consommation des métadonnées)

**Handoff interne :**

- BundleMaker v2 consomme les packages BMME v2 marqués "VALID"
- Provider mapping appliqué comme transformation lors de la génération XML

### Compliance & Security

**Exigences SaaS B2B classiques européennes:**

- GDPR compliance (déjà enforced sur mediaspot)
- Sécurité des données au repos et en transit (déjà enforced sur mediaspot)
- Audit logs pour traçabilité des actions critiques
- Authentification/autorisation (déjà enforced sur mediaspot)

**Spécificités BMME v2:**

- Logs détaillés pour synchronisations entrantes (monitoring Marc - Journey 2)
- Historique des modifications de mappings (rollback possible)
- Versionning des specs providers (garantir la stabilité)

### Implementation Considerations

**Brownfield constraints:**

- BMME v2 doit s'intégrer nativement dans l'architecture mediaspot existante
- Réutilisation des primitives de sécurité, auth, et multi-tenancy de mediaspot
- Dépréciation progressive de VDM Connect (timeline Q3 2026)
- Cohabitation temporaire avec PackageEditor legacy (dépréciation 2027)

**Data Model Transition Strategy (DbMetadataFieldInfo → BMME v2):**

Le modèle de données actuel repose sur `DbMetadataFieldInfo`, un système de métadonnées dynamiques appliqué aux Titles dans toute l'application mediaspot. BMME v2 introduit un **nouveau modèle de données** optimisé pour la gestion SVOD (hiérarchie Title → Languages → Territories, Shared metadata, Packages).

**Stratégie de cohabitation:**

- **BMME v2 = nouvelle source de vérité** pour les métadonnées SVOD
- **Synchronisation unidirectionnelle BMME v2 → DbMetadataFieldInfo** pour alimenter les modules mediaspot existants
- **Pas de refonte des modules consommateurs** : ils continuent à lire `DbMetadataFieldInfo` comme avant
- **Transparence pour les utilisateurs** : les autres modules mediaspot ne voient pas le changement de source

**Mécanisme de synchronisation:**

1. **Écriture dans BMME v2** : L'utilisateur édite les métadonnées via l'interface BMME v2
2. **Projection vers DbMetadataFieldInfo** : Le système synchronise automatiquement les champs pertinents vers l'ancien modèle
3. **Mapping BMME → DbMetadataFieldInfo** : Table de correspondance entre les champs du nouveau modèle et les champs `DbMetadataFieldInfo` existants
4. **Synchronisation temps réel ou batch** : À définir en Architecture (event-driven vs scheduled sync)

**Contraintes de mapping:**

- Tous les champs `DbMetadataFieldInfo` utilisés par les modules existants doivent avoir un équivalent dans BMME v2
- Les champs BMME v2 sans équivalent `DbMetadataFieldInfo` (ex: Shared metadata, hiérarchie Languages/Territories) restent exclusifs à BMME v2
- Les champs `DbMetadataFieldInfo` non couverts par BMME v2 (métadonnées non-SVOD) restent gérés par l'ancien système

**Timeline de transition:**

- **MVP** : Synchronisation BMME v2 → DbMetadataFieldInfo en place dès le premier déploiement
- **Post-MVP** : Évaluation progressive de la migration des modules consommateurs vers le nouveau modèle BMME v2
- **Long-terme** : Possibilité de déprécier `DbMetadataFieldInfo` pour les métadonnées SVOD (hors scope MVP)

**Scalability considerations:**

- Dashboard SuperAdmin doit supporter la gestion de specs pour toutes les plateformes clients (actuellement ~20-30 plateformes actives)
- Performance des synchronisations entrantes (thousands de films par nuit pour certains clients)
- Performance des éditeurs de mapping visuels (temps réel, validation instantanée)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP: Problem-Solving MVP**

BMME v2 résout un problème opérationnel critique: la fragmentation des métadonnées SVOD entre VDM Connect (legacy externe) et mediaspot. L'objectif MVP est de **prouver le concept avec les 4 providers clés** et de démontrer un **gain de productivité 10x** pour les gestionnaires de catalogue.

**Philosophie de développement:**

- **Projet majeur 2026:** Moyens alloués pour garantir la qualité et la pérennité
- **Fondation pour BM v2:** Architecture solide, maintenable, testée (80% coverage)
- **Migration progressive:** Pas de big bang, déploiement incrémental pour limiter les risques
- **Focus qualité:** Provider compliance critique (risque de blacklist si erreurs de livraison)

**Ressources:**

- **Équipe:** Le temps et les ressources nécessaires seront alloués (projet prioritaire)
- **Timeline:** Dictée par la qualité, pas par une deadline rigide
- **Support:** Formation, documentation, support dédié pendant la transition

### MVP Feature Set (Phase 1)

**Core User Journeys supportés:**

1. **Sophie (Gestionnaire Catalogue Client):**
  - Création de packages multi-territoires avec héritage intelligent
  - Feedback temps réel (compteur "94/120 champs remplis")
  - Validation live contre specs providers
  - **Gain mesurable:** 2-3 jours → 3 heures
2. **Marc (Admin Interne VDM):**
  - Dashboard de monitoring des synchronisations entrantes
  - Éditeur de mapping visuel (systèmes externes → mediaspot)
  - Diagnostic assisté + resynchronisation en 1 clic
  - **Gain mesurable:** 1 jour → 40 minutes
3. **Julie (Labo VDM):**
  - Éditeur de specs providers centralisé (mediaspot → providers)
  - Validation en temps réel + prévisualisation XML
  - Déploiement instantané sans code changes
  - **Gain mesurable:** Demi-journée → 25 minutes

**Must-Have Capabilities (MVP):**

**Pour les utilisateurs clients:**

- Hiérarchie Title → Langues → Territoires avec héritage automatique
- Vue bulk de localisation (édition multi-langue/multi-territoire)
- Feedback temps réel avec compteur de complétion
- Validation live contre specs providers
- État VALID/INVALID pour handoff vers BundleMaker

**Pour les admins internes:**

- Dashboard de monitoring centralisé des synchronisations
- Logs détaillés et friendly avec suggestions de diagnostic
- Éditeur de mapping visuel (systèmes externes → mediaspot)
- Resynchronisation en 1 clic avec suivi de progression
- Alertes proactives configurables

**Pour le labo:**

- Éditeur de specs providers centralisé (un seul endroit par provider)
- Validation en temps réel des mappings
- Prévisualisation XML avant livraison
- Déploiement instantané
- Versionning des specs avec rollback

**Providers MVP (4):**

- iTunes
- Google
- Amazon
- Netflix

**Systèmes externes MVP (4):**

- VDM Connect (migration Titles + Packages)
- Unity API
- Iron API
- MovieLibrary FTP+XML

### Post-MVP Features

**Phase 2 (Post-MVP - Expansion Providers):**

**Extension progressive des providers:**

- Ajout d'autres plateformes SVOD au-delà des 4 MVP (Microsoft, Sony, Rakuten, etc.)
- Mise à jour continue des spécifications providers existants (évolution des APIs)
- Optimisation des éditeurs de mapping pour supporter 10+ providers simultanément

**Optimisations UX:**

- Suggestions intelligentes de reasonable defaults basées sur historique utilisateur
- Templates de packages pré-configurés par provider
- Bulk operations avancées (duplication de packages, copie multi-territoires)

**Phase 3 (Vision Long-Terme - Automation & AI):**

**Localisation automatique par LLM:**

- Traduction automatique des champs textuels (synopsis, titres) pour tous les territoires
- Validation automatique de la cohérence des traductions
- Suggestions de localisation basées sur l'historique

**Consommation par BundleMaker v2:**

- BM v2 (ordering automatisé) s'appuie sur BMME v2 comme fondation
- Workflows BM → BMME pour générer les packages à la demande
- Orchestration automatique des livraisons multi-providers

**Extension aux autres modules mediaspot:**

- Réutilisation des métadonnées Title par d'autres modules de la plateforme
- Harmonisation du modèle de données métadonnées à l'échelle de mediaspot

### Risk Mitigation Strategy

**Risques Techniques:**

**1. Migration VDM Connect (zero data loss):**

**Stratégie:**

- **Temps 1 - Métadonnées d'Oeuvre (Titles):** VDM Connect devient un système externe au même titre qu'Unity ou Iron
  - Synchronisation unidirectionnelle: VDM Connect → mediaspot
  - Validation des données migrées (reconciliation automatique)
  - Tests de non-régression sur ensemble complet de données réelles
- **Temps 2 - Packages:** Migration progressive des packages VDM Connect existants vers mediaspot
  - Migration par plateforme client (pas de big bang global)
  - Validation package par package avec compteur de complétion
  - Rollback possible en cas de problème détecté

**Mitigation:**

- Scripts de migration automatisés avec validation multi-niveaux
- Période de cohabitation VDM Connect / BMME v2 jusqu'à Q3 2026
- Monitoring temps réel des synchronisations (dashboard Marc - Journey 2)

**2. Résilience des synchronisations externes:**

**Contexte:** Synchronisation unidirectionnelle (systèmes externes → mediaspot). Si un système externe tombe, mediaspot ne peut pas y faire grand-chose.

**Mitigation:**

- Alertes proactives configurables (détection d'échec de synchro après 2 tentatives)
- Logs détaillés et friendly pour diagnostic rapide
- Resynchronisation en 1 clic pour rattrapage après incident
- Historique des synchronisations pour détecter les régressions

**3. Provider compliance (risque de blacklist):**

**Mitigation:**

- Validation stricte multi-niveaux (BMME temps réel + BM pre-livraison + Labo QA manuelle)
- Éditeur de specs centralisé pour éviter les erreurs de dispersion (47 fichiers XML → 1 source de vérité)
- Versionning des specs avec rollback possible
- Prévisualisation XML avant livraison (test de génération)
- Indicateur de succès: taux d'erreur à la livraison < 5%

**Risques Marché/Adoption:**

**1. Migration forcée et progressive:**

**Stratégie:**

- Migration progressive par plateforme client (pas de big bang)
- Communication transparente sur la timeline et les bénéfices
- Support dédié pendant la période de transition

**Mitigation:**

- **Formation:** Sessions de formation pour les gestionnaires de catalogue
- **Documentation:** Guides utilisateur détaillés avec captures d'écran et vidéos
- **Support dédié:** Équipe support renforcée pendant les 6 premiers mois
- **Champions internes:** Identifier des early adopters chez les clients pour faciliter l'adoption

**2. Change management:**

**Mitigation:**

- Communication des gains de productivité mesurables (2-3 jours → 3 heures)
- Démonstrations live du produit avant déploiement
- Feedback loop rapide pour intégrer les retours utilisateurs dans les itérations post-MVP

**Risques Ressources:**

**1. Allocation de ressources:**

**Contexte:** BMME + BM est la feature majeure de 2026. Les moyens seront mis pour garantir la qualité.

**Mitigation:**

- Équipe dédiée avec le temps nécessaire (pas de deadline rigide compromise qualité)
- Focus sur la maintenabilité et la scalabilité (fondation pour BM v2 et futures features)
- Tests automatisés (80% coverage) pour garantir la stabilité long-terme

**2. Maintenance legacy pendant la transition:**

**Contexte:** VDM Connect continue à être maintenu jusqu'à débranchement final (Q3 2026).

**Mitigation:**

- Équipe actuelle de maintenance VDM Connect reste en place
- Pas de disruption des opérations courantes pendant la migration
- Débranchement progressif coordonné avec les migrations clients

## Functional Requirements

### 1. Metadata Management

- FR1: Gestionnaires de catalogue peuvent créer des métadonnées Title avec toutes les informations d'oeuvre
- FR2: Gestionnaires de catalogue peuvent créer des métadonnées par langue pour un Title donné
- FR3: Gestionnaires de catalogue peuvent créer des métadonnées par territoire pour une langue donnée
- FR4: Système propage automatiquement les métadonnées Title vers les niveaux inférieurs (héritage intelligent)
- FR5: Gestionnaires de catalogue peuvent éditer les métadonnées de multiples langues/territoires dans une vue bulk unique
- FR6: Gestionnaires de catalogue peuvent visualiser la hiérarchie complète Title → Langues → Territoires
- FR7: Système synchronise les métadonnées Title depuis VDM Connect (migration)
- FR8: Système synchronise les métadonnées Title depuis systèmes externes (Unity, Iron, MovieLibrary)

### 2. Package Management

- FR9: Gestionnaires de catalogue peuvent créer des packages pour un provider donné
- FR10: Gestionnaires de catalogue peuvent associer des métadonnées localisées à un package
- FR11: Gestionnaires de catalogue peuvent éditer les métadonnées d'un package existant
- FR12: Gestionnaires de catalogue peuvent supprimer un package
- FR13: Gestionnaires de catalogue peuvent visualiser le statut de complétion d'un package (compteur "94/120 champs remplis")
- FR14: Gestionnaires de catalogue peuvent identifier les champs manquants requis pour un package donné
- FR15: Gestionnaires de catalogue peuvent définir des métadonnées partagées entre tous les providers pour minimiser la saisie manuelle
- FR16: Système applique les métadonnées partagées au provider cible
- FR17: Système valide en temps réel les métadonnées d'un package contre les specs du provider cible
- FR18: Système marque automatiquement un package comme VALID lorsque tous les champs requis sont remplis pour handoff vers BundleMaker
- FR19: Packages incomplets restent à l'état "draft" jusqu'à complétion
- FR20: Gestionnaires de catalogue peuvent dupliquer un package existant pour créer une variante
- FR21: Système migre progressivement les packages depuis VDM Connect vers mediaspot

### 3. Provider Specification Management

- FR22: Labo VDM peut accéder à un éditeur centralisé des specs providers (iTunes, Amazon, Google, Netflix)
- FR23: Labo VDM peut éditer les mappings mediaspot → provider pour chaque provider
- FR24: Labo VDM peut éditer les formats de champs requis par chaque provider
- FR25: Système valide en temps réel les mappings contre des échantillons de packages
- FR26: Labo VDM peut prévisualiser le XML généré avant livraison client
- FR27: Labo VDM peut déployer les changements de specs instantanément sans modification de code
- FR28: Système versionne les specs providers pour permettre le rollback en cas de problèm

### 4. External System Integration

- FR31: Admin Internes VDM peuvent accéder à un dashboard de monitoring des synchronisations entrantes
- FR32: Système affiche le statut temps réel de chaque synchronisation externe (Unity, Iron, MovieLibrary, VDM Connect)
- FR33: Système affiche des logs détaillés et friendly pour chaque synchronisation
- FR34: Admin Internes VDM peuvent tester une API externe en temps réel (mode diagnostic live)
- FR35: Admin Internes VDM peuvent accéder à un éditeur de mapping visuel (système externe → mediaspot)
- FR36: Admin Internes VDM peuvent éditer les mappings de champs entre système externe et mediaspot
- FR38: Admin Internes VDM peuvent déclencher une resynchronisation manuelle en 1 clic
- FR39: Système affiche la progression de la resynchronisation avec ETA
- FR42: Système historise toutes les synchronisations pour détecter les régressions

### 5. Validation & Quality Assurance

- FR43: Système génère les XML conformes aux specs provider actuelles

### 6. User & Permission Management

- FR45: SuperAdmin VDM peuvent définir les permissions ACL par action (création métadonnées, édition packages, gestion mappings)
- FR46: Système applique les permissions ACL selon le rôle de l'utilisateur (Gestionnaire Catalogue, Responsable Livraison, Admin Interne, Labo, SuperAdmin)
- FR47: Système empêche les actions non autorisées selon les permissions de l'utilisateur
- FR48: Système isole les données par plateforme client (multi-tenancy strict)

### 7. Administration & Monitoring

- FR49: SuperAdmin VDM peuvent accéder à un dashboard d'administration cross-plateformes
- FR50: SuperAdmin VDM peuvent gérer centralement les specs providers appliquées à toutes les plateformes
- FR51: SuperAdmin VDM peuvent gérer centralement les specs systèmes externes partagées
- FR52: Système génère des audit logs pour toutes les actions critiques (création/édition/suppression)

### 8. Language & Territory Activation

- FR55: Gestionnaires de catalogue peuvent activer une langue pour un Title
- FR56: Langue de l'original title est activée par défaut
- FR57: Système affiche uniquement les champs localisables au niveau langue et territoire
- FR58: Métadonnées territoire sont héritées automatiquement de la langue parente ("pulled from Language")

### 9. Source Tracking & Historisation

- FR59: Système affiche la source actuelle de chaque métadonnée (Unity, mediaspot, IMDb, etc.)
- FR60: Gestionnaires de catalogue peuvent déclencher une synchronisation manuelle depuis une source externe
- FR61: Système affiche un preview des changements avant application (Old value vs New value)
- FR62: Gestionnaires de catalogue peuvent voir toutes les valeurs d'une métadonnée par source
- FR63: Système historise toutes les modifications de métadonnées (Old value, New value, Date, User, Details)
- FR64: Système catégorise les types de modification (Source changed, Manual Edit, Periodic sync)
- FR65: Gestionnaires de catalogue peuvent consulter l'historique complet d'une métadonnée

### 10. Shared Metadata & Package Creation

- FR66: Système gère des Shared metadata cross-platforms (Vendor ID, Studio, Labo, Copyrights)
- FR67: Shared metadata sont automatiquement propagées à tous les packages d'un Title
- FR68: Gestionnaires de catalogue peuvent créer un package en sélectionnant uniquement Platform + Territories
- FR69: Système pré-remplit les packages depuis Title metadata + Shared metadata, puis applique le Provider mapping comme transformation de format
- FR70: Structure Package suit la même hiérarchie que Title (Global → Languages → Territories)

### 11. External System Mapping (Platform-based)

- FR71: Admin Internes VDM peuvent définir des Formatting options par champ de mapping (split, trim, etc.)
- FR72: Admin Internes VDM peuvent définir des Mapping options pour les correspondances d'enums
- FR73: Système applique les Formatting options lors de l'import des données externes
- FR74: Système applique les Mapping options pour convertir les valeurs d'enums
- FR75: Admin Internes VDM peuvent définir une Default source par champ mediaspot
- FR76: Admin Internes VDM peuvent activer Lock source pour empêcher le changement de source sur un champ
- FR77: Système empêche le changement de source sur les champs avec Lock source activé
- FR78: Système affiche des notes d'erreur typées lors des synchronisations (Wrong data format, Formatting failed, Not synced)
- FR79: Admin Internes VDM peuvent déclencher un Resync pour réappliquer une synchronisation depuis une source
- FR80: Admin Internes VDM peuvent déclencher un Bulk resync sur plusieurs sources simultanément

### 12. Provider Mapping (Cross-platform)

- FR81: Provider mappings sont cross-platform (partagés entre toutes les plateformes clientes)
- FR82: Labo VDM peut définir des Formatting options pour l'export (join, format dates, etc.)
- FR83: Labo VDM peut définir des Mapping options pour les correspondances d'enums mediaspot → provider
- FR84: Labo VDM peut tester les mappings sur des packages réels avant déploiement
- FR85: Système affiche les résultats de test avec les valeurs transformées
- FR86: Source of truth table est partagée entre mappings entrants (Journey 2) et sortants (Journey 3)

### 13. Legacy Data Model Synchronization (DbMetadataFieldInfo)

- FR87: Système synchronise automatiquement les métadonnées BMME v2 vers le modèle legacy `DbMetadataFieldInfo`
- FR88: Synchronisation BMME v2 → DbMetadataFieldInfo est transparente pour les modules mediaspot consommateurs
- FR89: Admin Internes VDM peuvent configurer la table de mapping BMME v2 → DbMetadataFieldInfo
- FR90: Système applique le mapping lors de chaque modification de métadonnée dans BMME v2
- FR91: Modules mediaspot existants continuent à lire les métadonnées via `DbMetadataFieldInfo` sans modification
- FR92: Système garantit la cohérence entre BMME v2 (source) et DbMetadataFieldInfo (projection)
- FR93: Admin Internes VDM peuvent monitorer le statut de synchronisation BMME v2 → DbMetadataFieldInfo
- FR94: Système alerte en cas d'échec de synchronisation vers le modèle legacy

