# PRD — CPP : Cinema Preservation Package

**Produit :** mediaspot (VDM)
**Client :** Studiocanal (Groupe Canal+)
**Statut :** Draft v0.4
**Date :** 2026-04-02
**Auteur :** Jerome Gue (VDM)
**Référence contractuelle :** Contrat Studiocanal — Section 3 « Gestion des assets de Patrimoine »

> **Note de terminologie :** La plateforme s'appelle **mediaspot**. Studiocanal la désigne sous le nom "Digital Factory" — les deux termes désignent la même plateforme.

---

## 1. Contexte et objectif

### 1.1 Contexte contractuel

Le contrat Studiocanal stipule que la plateforme doit supporter la gestion des assets de type **PATRIMOINE**, incluant explicitement le **Cinema Preservation Package (CPP)**. VDM est **engagé contractuellement à fabriquer un grand nombre de CPP d'ici mi-2026**.

> *"L'usage du CPP sera supporté par la plateforme. Une étude spécifique préalable sera faite par VDM sur le Cinema Preservation Package avec le soutien de la CST et la participation active de Studiocanal."*

### 1.2 Qu'est-ce qu'un CPP ?

Le **Cinema Preservation Package (CPP)** est une norme européenne (EN 17650) définissant un format standard pour l'archivage pérenne d'œuvres cinématographiques. Il est basé sur trois normes XML :
- **METS** (Metadata Encoding & Transmission Standard) — structure du package
- **EBUCore** (EBU Tech 3293) — métadonnées descriptives et techniques
- **PREMIS v3.0** — métadonnées de provenance numérique

Un CPP est une **structure de dossiers et sous-dossiers** (pas un fichier encapsulé type TAR) regroupant les mediafiles et leurs métadonnées associées. Il peut contenir n'importe quel type d'élément : séquences d'images, vidéos, audios, sous-titres, DCP, proxies, fichiers auxiliaires...

**Périmètre Studiocanal (v1) :** Studiocanal ne souhaite pour l'instant mettre que des **séquences d'images** dans ses CPP.

### 1.3 État des lieux — Ce qui existe déjà

#### Dans la mediaspot

- Le type d'asset **ImageSequence** est en place
- Les **champs de métadonnées du XLSX de référence** (validé par Studiocanal) sont en place dans mediaspot
- Les **vues mediaspot** correspondantes sont configurées
- Les métadonnées **UNITY** sont importées régulièrement dans mediaspot
- **2 assets ImageSequence** de MONSIEUR N. existent avec leurs métadonnées renseignées :
  - ID `8614878` : Program Restored - DSM - Original French Picture - DPX - Lin - REC2020 - 24fps
  - ID `8653822` : Program Restored - SCAN - Original French Picture - DPX - Lin - SRGB - 24fps

**Ce qui manque dans mediaspot :** le type d'asset **CPP lui-même** — un asset parent des ImageSequences qui porterait les métadonnées du package complet (XML `preservationPackingList.xml`).

#### Hors mediaspot — CPPGenerator (outil de Yan Rocheteau)

Programme externe opérationnel qui :
- Appelle les **APIs de mediaspot** pour collecter les métadonnées Title + Asset
- Collecte les métadonnées techniques via **MediaInfo**
- Calcule le **MD5 de chaque fichier DPX/image** (1 MD5 par image, stocké dans `packingList.xml`)
- Génère et **valide tous les XML** (METS, EBUCore, PREMIS)
- Construit l'**arborescence du CPP** dans `patrimoine_SC`
- A déjà produit le **CPP de MONSIEUR N. livré à Studiocanal en 2025** (MD5 vérifiés par Bruno/Canal+)
- Mis à jour pour couvrir 100% des champs du XLSX de référence

**Limite actuelle :** mediaspot ne "voit" pas encore les fichiers DPX. Les métadonnées techniques (nombre d'images, nom 1ère/dernière image, dimensions...) sont renseignées manuellement dans mediaspot avant génération.

### 1.4 Deux processus distincts

Ce PRD couvre deux processus indépendants, à développer dans cet ordre :

| # | Processus | Description | Priorité |
|---|---|---|---|
| **P1** | **Classe CPP dans mediaspot** | Nouveau type/classe d'asset CPP, parent des ImageSequences | **Immédiat — bloquant pour Yan** |
| **P2** | **CPP Ingest** | Parse d'un CPP reçu, vérification des XML et MD5, création de la hiérarchie dans mediaspot | Après P1 |
| **P3** | **CPP Creator (intégration mediaspot)** | Déclenchement du CPPGenerator depuis mediaspot | Après P2 |

---

## 2. Priorité 1 — Classe CPP dans la mediaspot

### 2.1 Objectif

Créer dans mediaspot un nouveau type d'asset **CPP** qui servira d'**asset parent** des assets ImageSequence (et des autres types d'assets contenus dans un CPP). Cela permet à Yan de :
1. Disposer d'un objet mediaspot pour stocker les métadonnées du package complet (celles du XML `preservationPackingList.xml`)
2. Créer programmatiquement via l'API mediaspot l'objet CPP et y rattacher les assets enfants
3. Avoir la hiérarchie `Title > Content > CPP > ImageSequence(s)` dans mediaspot

Cette priorité est **bloquante pour respecter les engagements contractuels** de fabrication de CPP d'ici mi-2026. La question du stockage final de Studiocanal n'est pas un prérequis — Yan fabrique les CPP en semi-manuel pendant que mediaspot se construit.

### 2.2 Modèle objet

| Propriété | Valeur |
|---|---|
| ObjectType | `CppPackage` |
| ObjectClass | `Cpp` |
| Groupe | `OTHER` |

**Hiérarchie :**
```
Title
  └── Content                    ← ex: "Long métrage", "Trailer", "Bonus"
        └── CPP                  ← nouvel asset parent (à créer)
              ├── ImageSequence (bobine 1)
              ├── ImageSequence (bobine 2)
              └── ImageSequence (bobine N)
```

Le CPP est un **niveau hiérarchique entre Content et Assets**. Il n'est pas lui-même un mediafile mais un conteneur de référence.

**Règles :**
- Assets autorisés comme enfants : tous types sauf CPP
- Un CPP ne peut pas contenir un autre CPP
- Classe de stockage spécifique : dossier `patrimoine_SC`

### 2.3 Métadonnées du CPP header

Toutes obligatoires (M), toutes automatiques (Auto — alimentées par le CPPGenerator via API mediaspot).

| Label | TagName | Description |
|---|---|---|
| Package Creation Date | `CppCreationDate` | Date de création du CPP |
| PreservationPackingList MD5 | `CppPreservationPackingListmd5` | MD5 du XML top-level + MD5 des ImageSequences |
| Package Creator | `CppPackageCreator` | Ex : `mediaspot` |
| Archive Title | `CppArchiveTitle` | Titre de l'œuvre (depuis le dossier metadata) |
| Package Profile | `CppPackageProfile` | `LongTermPreservationProfile` ou `InterimPreservationProfile` |
| Organisation Name | `CppLabo` | Nom du labo — valeur : `VDM` |
| Validation Date | `CppValidationDate` | Date du QC automatique / CPP Checker |
| CPP Owner | `CppOwner` | Propriétaire du CPP |
| Ingest Date | — | Date d'ingest dans mediaspot |
| MediaArchiveCopy1 | `MediaArchiveCopy1` | Date de copie sur LTO 1 |
| MediaArchiveCopy2 | `MediaArchiveCopy2` | Date de copie sur LTO 2 |
| MediaArchiveCopy3 | `MediaArchiveCopy3` | Date de copie sur LTO 3 |
| DateCheckArchiveCopy1 | `DateCheckArchiveCopy1` | Date de vérification LTO 1 |
| DateCheckArchiveCopy2 | `DateCheckArchiveCopy2` | Date de vérification LTO 2 |
| DateCheckArchiveCopy3 | `DateCheckArchiveCopy3` | Date de vérification LTO 3 |

**Note PackageProfile :** ProRes et EXR = `InterimPreservationProfile`. DPX/TIFF = `LongTermPreservationProfile`. Liste complète à confirmer avec Studiocanal.

### 2.4 Droits et accès

- Droits spécifiques pour la lecture des assets Patrimoine par certains groupes utilisateurs
- Filtrage adapté dans l'interface
- Proxies : online obligatoire (stockage chaud)
- Masters : stockage froid ou LTO selon indication Studiocanal

---

## 3. Priorité 2 — CPP Ingest avec validateur natif

### 3.1 Principe

La logique de validation du CPP Checker de Yan (repo `gitlab.com/cst-cpp/cpp-checker`, MIT) sera **réimplémentée nativement dans mediaspot**. Le code source C# sert de référence de spécification — on ne l'appelle pas comme outil externe, on en reproduit la logique dans le langage/stack de mediaspot.

### 3.2 Cas d'usage

Réception d'un CPP (dossier) — fabriqué par VDM ou reçu d'un provider externe — parsing complet, vérification de conformité, et alimentation de la hiérarchie d'assets dans mediaspot.

### 3.3 Déclenchement

**Prérequis :** Une **coquille CPP** (asset `CppPackage`) doit exister dans mediaspot avant de déclencher l'ingest. Cette coquille est créée au préalable — manuellement par un CC/Media Manager ou programmatiquement via l'API mediaspot (par le CPPGenerator de Yan). Elle représente le conteneur vide qui sera alimenté par le process d'ingest.

**Déclenchement de l'ingest — drag & drop :**
- Le Provider / Media Manager sélectionne la coquille CPP existante dans mediaspot sur la page des Ingest Requested
- Il dépose le **dossier CPP complet** (arborescence native, plusieurs TB) par **drag & drop** sur la zone de dépôt associée à cette coquille
- La **validation pré-upload démarre automatiquement dans le navigateur** — aucun fichier n'est encore transféré vers le serveur ou partiellement pour les petits fichiers entre le frontend et le backend de mediaspot.
- Si la validation pré-upload est sans erreur → L'utilisateur a la possibilité de lancer l'upload via le front
- Si des erreurs sont détectées → l'upload est bloqué, le rapport complet est affiché à l'utilisateur

### 3.4 Algorithmes de checksum supportés

D'après `CommonClasses.ChecksumUtils` :

| Algorithme | Format de la valeur stockée | Notes |
|---|---|---|
| **MD5** | Hex lowercase (ex: `a3f5...`) | Algorithme principal, obligatoire sur tous les fichiers |
| **SHA1** | Base64 ou Hex lowercase | Supporté |
| **SHA256** | Base64 ou Hex lowercase | Supporté |

Le type d'algorithme est déclaré dans chaque fichier XML — le validateur lit le type et appelle la méthode correspondante.

### 3.5 Processus d'ingest — vue d'ensemble

```
PHASE 1a — Validation pré-upload (navigateur, au drag & drop)
  │  Étapes 1, 2, 3, 4, 5 (partiel : XSD/Schematron/TechMD/digiprovMD), 6, 7
  │  Équivalent CPP Checker avec ignoreDataFolderItemChecksums=true
  └── Si moindre erreur → REJET immédiat, aucun fichier uploadé

UPLOAD : Transfert du dossier CPP complet vers le serveur
  └── Uniquement si Phase 1a est 100% OK (zéro erreur)

PHASE 1b — Validation post-upload (serveur)
  │  Étape 5.7 uniquement : fileSec — existence, taille, checksum par fichier media dans data/
  │  Équivalent CPP Checker avec ignoreDataFolderItemChecksums=false (partie additionnelle)
  └── Si moindre erreur → REJET complet, fichiers uploadés supprimés

PHASE 2 — Création de la hiérarchie dans mediaspot
  └── Uniquement si Phase 1a + Phase 1b sont 100% OK
```

> **Référence CPP Checker :** Le split Phase 1a / Phase 1b est aligné sur le flag `ignoreDataFolderItemChecksums` du CPP Checker de Yan Rocheteau. Avec ce flag à `true`, tous les checks sauf les checksums des fichiers media `data/` sont exécutés — ce sont précisément les checks de Phase 1a. La Phase 1b exécute la partie complémentaire (flag à `false`).

### 3.6 Phase 1 — Validation EN17650

La validation reproduit exactement la logique de `CPPValidateClasses.DoCppValidate()` et des méthodes appelées en cascade. Toutes les erreurs sont accumulées (pas de stop à la première erreur) et remontées dans un rapport unique.

Les étapes sont labellisées **[PRÉ-UPLOAD]** (navigateur, avant transfert) ou **[POST-UPLOAD]** (serveur, après transfert).

**Résultat de chaque check :**
```
CheckSummaryItem {
  filename    : fichier concerné
  status      : "pass" | "failed"
  title       : libellé du check (ex: "PackingList XSD Validation")
  description : détail de l'erreur si failed
}
```

---

#### ETAPE 1 — Validation du `preservationPackingList.xml` (top-level) `[PRÉ-UPLOAD]`

**1.1 — Validation XSD**
- Valider `preservationPackingList.xml` contre le schéma `mets_digitalPreservation.xsd`
- Résultat : `CheckSummaryItem` titre = `"PreservationPackingList XSD Validation"`

**1.2 — Validation Schematron (règles CaPPuSCHino)**
- Appliquer les règles Schematron de CaPPuSCHino (`PackingList.rules`) sur `preservationPackingList.xml`
- Résultat : `CheckSummaryItem` titre = `"PreservationPackingList Schematron Validation"`

**1.3 — Extraction des métadonnées CPP header**
Depuis `metsHdr` :
- `cpp:packageProfile` (depuis `metsHdr.AnyAttr`) → `CppPackageProfile`
- Agent avec `ROLE=CREATOR` → `CppPackageCreator`
- `archiveTitle` → `CppArchiveTitle`

---

#### ETAPE 2 — Validation des fichiers `descMD` (métadonnées éditoriales) `[PRÉ-UPLOAD]`

Pour chaque fichier `descMD_*.xml` référencé dans `preservationPackingList.xml` :

**2.1 — Validation du format href**
- Le fichier doit être dans le dossier `metadata/`
- Le nom doit commencer par `descMD`
- Résultat : `CheckSummaryItem` titre = `"href Format Validation"`

**2.2 — Existence du fichier**
- Vérifier que le fichier existe sur le filesystem

**2.3 — Vérification checksum**
- Lire l'algorithme et la valeur déclarés dans le XML
- Recalculer et comparer
- Résultat : `CheckSummaryItem` par fichier

**2.4 — Validation XSD**
- Valider contre `ebucore_1.6_fixed.xsd`

**2.5 — Validation Schematron (CaPPuSCHino)**
- Appliquer les règles Schematron EBUCore

**2.6 — Détection des fichiers `descMD` non référencés**
- Lister les fichiers `descMD_*.xml` présents dans `metadata/`
- Signaler tout fichier non référencé dans le METS
- Résultat : `CheckSummaryItem` titre = `"Unreferenced descMD files"`

---

#### ETAPE 3 — Validation des fichiers `digiprovMD` (provenance PREMIS, top-level) `[PRÉ-UPLOAD]`

Pour chaque fichier `digiprovMD_*.xml` référencé dans `preservationPackingList.xml` :

**3.1 — Validation format href** (même règle que descMD, préfixe `digiprovMD`)

**3.2 — Existence + checksum**

**3.3 — Validation XSD**
- Valider contre `premis-v3-0.xsd`

**3.4 — Détection des fichiers `digiprovMD` non référencés**
- Résultat : `CheckSummaryItem` titre = `"Unreferenced digiprovMD files"`

---

#### ETAPE 4 — Vérification des sub-packages déclarés `[PRÉ-UPLOAD]`

**4.1 — Vérification des `packingList.xml` de sub-packages**
- Pour chaque sub-package référencé : vérifier l'existence, la taille et le checksum du `packingList.xml`
- Résultat : `CheckSummaryItem` par sub-package

**4.2 — Détection des sous-dossiers non référencés**
- Lister tous les sous-dossiers dans le dossier racine du CPP
- Ignorer : `metadata/`, `playlists/`, `ancillaryData/`, `checkerReports/`
- Tout autre sous-dossier non référencé dans le METS = erreur
- Résultat : `CheckSummaryItem` titre = `"Unreferenced package subfolders"`

**4.3 — Validation du format href de chaque sub-package**
- Format attendu : `{packageType}_{identifier}/packingList.xml`
- `packageType` doit être un type valide : `image`, `sound`, `timedText`, `audiovisual`, `componentized`, `extra`
- Résultat : `CheckSummaryItem` titre = `"href Format Validation"`

---

#### ETAPE 5 — Validation de chaque sub-package (traitement récursif)

> Les sous-étapes 5.1 à 5.6 sont exécutées **[PRÉ-UPLOAD]** (lecture des XML et vérification de structure uniquement). La sous-étape 5.7 (checksums des fichiers media) est exécutée **[POST-UPLOAD]** côté serveur.

Pour chaque sub-package référencé dans `preservationPackingList.xml` :

**5.1 — Validation XSD du `packingList.xml`** `[PRÉ-UPLOAD]`
- Valider contre `mets_digitalPreservation.xsd`
- Résultat : `CheckSummaryItem` titre = `"PackingList XSD Validation"`

**5.2 — Validation Schematron du `packingList.xml`**
- Appliquer les règles CaPPuSCHino (`SubPackagePackingList.rules`)
- Résultat : `CheckSummaryItem` titre = `"PackingList Schematron Validation"`

**5.3 — Extraction du type de sub-package**
- Depuis `structMap[TYPE="physical"].div.TYPE` → ex: `image`, `sound`...

**5.4 — Validation TechMD + conformité des href dans fileSec**

Pour les sub-packages de type `image` :
- Vérifier que les noms de fichiers DPX/TIFF/EXR correspondent aux patterns déclarés dans le techMD :
  - Préfixe attendu
  - Extension attendue
  - Nombre de chiffres du padding (ex: 7 chiffres : `0000001`)
  - Plage d'index : premier index et dernier index déclarés vs fichiers présents
- Résultat : `CheckSummaryItem` titre = `"TechMD Validation"`

**5.5 — Validation des fichiers `digiprovMD` du sub-package**
- Même logique que l'étape 3 (existence, checksum, XSD PREMIS)

**5.6 — Détection des fichiers `digiprovMD` non référencés dans le sub-package**

**5.7 — Validation du fileSec (fichiers media dans `data/`)** `[POST-UPLOAD — serveur uniquement]`

> Cette étape correspond à `ignoreDataFolderItemChecksums=false` dans le CPP Checker. Elle s'exécute côté serveur **après** upload complet du CPP. Elle est la seule raison pour laquelle l'upload complet est nécessaire.

Pour chaque fichier déclaré dans le `fileSec` du `packingList.xml` :
- **Existence** : le fichier est-il présent sur le filesystem serveur ?
- **Taille** : la taille déclarée correspond-elle à la taille réelle ?
- **Checksum** : recalculer et comparer avec la valeur déclarée (MD5 / SHA1 / SHA256)
  - → **1 checksum par fichier image DPX individuel**
  - En production : vérification obligatoire (pas de bypass)
- **Fichiers non référencés** : tout fichier présent dans `data/` mais non déclaré dans le fileSec = signalé

---

#### ETAPE 6 — Validation des playlists `[PRÉ-UPLOAD]`

**6.1 — Vérification des références fptr**
- Lister les playlists référencées dans `playlistsDiv`
- Vérifier que chaque `FILEID` est au format `playlist_{identifier}`
- Résultat : `CheckSummaryItem` titre = `"Playlist fptr.FILEID Format Validation"`

**6.2 — Détection des playlists non référencées**
- Lister les fichiers dans `playlists/`
- Tout fichier non référencé dans le METS = erreur
- Résultat : `CheckSummaryItem` titre = `"Unreferenced package playlists"`

**6.3 — Validation XSD de chaque playlist**
- Valider contre `st2067-3a-2016.xsd` (SMPTE IMF CompositionPlaylist)
- Résultat : `CheckSummaryItem` titre = `"Playlist XSD Validation"`

---

#### ETAPE 7 — Vérification des métadonnées obligatoires des assets `[PRÉ-UPLOAD]`

Pour chaque sub-package du CPP, vérifier que tous les champs de métadonnées déclarés comme obligatoires (M) dans le profil client (ex : XLSX de référence Studiocanal) sont bien renseignés dans les XML du package.

**7.1 — Vérification des champs obligatoires par asset**
- Pour chaque sub-package, croiser les métadonnées extraites des XML (descMD, techMD) avec la liste des champs obligatoires du profil client
- Tout champ obligatoire absent ou vide = `CheckSummaryItem` failed
- Résultat : `CheckSummaryItem` titre = `"Mandatory Metadata Check"`, description = nom du champ manquant + asset concerné

**7.2 — Profil client configurable**
- La liste des champs obligatoires est définie par profil client (ex : profil `STUDIOCANAL` = liste issue du XLSX de référence)
- Le profil actif est déterminé à l'initialisation de la request d'ingest
- Permet d'appliquer des règles différentes selon le client (Studiocanal, SND, Pathé...)

---

### 3.7 Règles de refus

Tout `CheckSummaryItem` avec `status = "failed"` entraîne le **rejet complet du CPP**. Les erreurs sont toutes accumulées avant décision — le rapport liste l'intégralité des problèmes trouvés.

| Catégorie | Type d'erreur |
|---|---|
| XSD | `preservationPackingList.xml` non conforme METS |
| Schematron | Règle CaPPuSCHino violée (top-level ou sub-package) |
| Structure | Sous-dossier non référencé dans le METS |
| Structure | Playlist non référencée dans le METS |
| Structure | fichier `descMD`/`digiprovMD` non référencé |
| Nommage | Format href non conforme (préfixe, dossier, type) |
| Nommage | FILEID playlist invalide |
| Fichier | Fichier déclaré absent du filesystem |
| Fichier | Taille réelle ≠ taille déclarée |
| Checksum | Valeur recalculée ≠ valeur déclarée (XML ou mediafile) |
| TechMD image | Pattern de nommage DPX/TIFF/EXR non conforme |
| TechMD image | Index de frames en dehors de la plage déclarée |
| Métadonnées | Champ obligatoire (profil client) absent ou vide dans les XML |

### 3.8 Rapport de validation

Le rapport est généré dans tous les cas (pass et failed) et attaché à la fiche de l'asset CPP dans mediaspot.

**Structure du rapport** (inspirée du template HTML du CPP Checker) :
```
En-tête :
  Package Creator        (depuis metsHdr agent CREATOR)
  Package Creation Date  (date du fichier preservationPackingList.xml)
  PreservationPackingList MD5  (checksum du fichier lui-même)
  Archive Title          (depuis descMD EBUCore)
  Package Profile        (LongTerm / Interim)
  Organisation           (depuis metsHdr agent)
  Validation Date        (date d'exécution)

Sub-packages :
  Nom, GUID, identifiants (MILO, IMDB...)

Tableau des checks :
  [pass/failed] | Titre du check | Fichier concerné
  (si failed) → description détaillée de l'erreur
```

### 3.9 Phase 2 — Alimentation de la hiérarchie dans mediaspot

Uniquement exécutée si Phase 1 est 100% OK (zéro `CheckSummaryItem` avec `status = "failed"`).

```
1. Alimentation de la coquille CPP existante dans mediaspot
   ├── La coquille CppPackage existe déjà (créée avant l'ingest)
   └── Remplissage des métadonnées CPP header depuis les valeurs extraites en Phase 1
       (packageProfile, creator, archiveTitle, creationDate...)

2. Pour chaque sub-package du CPP :
   ├── Lecture des métadonnées depuis techMD_*.xml (EBUCore + MediaInfo)
   ├── Lecture des métadonnées depuis descMD_*.xml (EBUCore)
   ├── Création de l'asset enfant dans mediaspot (ImageSequence, Audio, DCP...)
   │   └── Type déterminé par packageType du sub-package
   └── Association de l'asset enfant à la coquille CPP parent

3. Rapport de validation attaché à la fiche de la coquille CPP
```

### 3.10 Gestion des séquences d'images

- Séquences avec numéros de frames non continus = séquences distinctes = **1 asset ImageSequence par plan**
- 1 MD5 par fichier DPX individuel, déclaré dans le `packingList.xml` du sub-package, vérifié en Phase 1

### 3.11 Validation pré-upload — Checks dans le navigateur avant transfert

#### Principe

La validation pré-upload est **intégrée au drag & drop** et s'exécute **automatiquement dans le navigateur** pour chaque ingest CPP, avant tout transfert de fichiers vers le serveur. Elle couvre l'intégralité des vérifications EN17650 sauf les checksums des fichiers media — ce qui permet de détecter et corriger tous les problèmes de structure, XML et métadonnées sans attendre que plusieurs TB soient transférés.

Ce mécanisme est aligné sur le flag `ignoreDataFolderItemChecksums=true` du CPP Checker de Yan Rocheteau : avec ce flag activé, le CPP Checker exécute exactement les mêmes checks que la Phase 1a.

**Ce n'est pas un outil optionnel.** La validation pré-upload est systématique et obligatoire pour tout ingest CPP — l'upload ne peut pas démarrer sans qu'elle soit passée sans erreur.

#### Checks exécutés en pré-upload

| Étape | Check | Exécuté en pré-upload |
|---|---|---|
| 1 | XSD + Schematron `preservationPackingList.xml` | ✅ |
| 1 | Extraction métadonnées CPP header (metsHdr) | ✅ |
| 2 | Validation descMD (href, existence, checksum XML, XSD EBUCore, Schematron, non référencés) | ✅ |
| 3 | Validation digiprovMD top-level (href, existence, checksum XML, XSD PREMIS, non référencés) | ✅ |
| 4 | Vérification packingList.xml sub-packages (existence, taille, checksum XML) | ✅ |
| 4 | Détection sous-dossiers non référencés dans le METS | ✅ |
| 4 | Validation format href sub-packages | ✅ |
| 5 | XSD + Schematron packingList.xml de chaque sub-package | ✅ |
| 5 | TechMD — patterns nommage DPX/TIFF/EXR | ✅ |
| 5 | digiprovMD sub-package | ✅ |
| 5 | **fileSec — existence, taille, checksum des fichiers media dans data/** | ❌ **post-upload uniquement** |
| 6 | Validation playlists (XSD SMPTE, FILEID format, non référencées) | ✅ |
| 7 | Vérification métadonnées obligatoires profil client | ✅ |

#### Comportement selon le résultat

| Résultat pré-upload | Action |
|---|---|
| **Erreurs détectées** | Upload bloqué — rapport affiché dans l'interface — aucun fichier transféré |
| **Aucune erreur** | Upload démarre automatiquement — validation post-upload (checksums media) déclenchée côté serveur après transfert |

#### Utilisateurs

- **CC / Media Manager VDM** : dépose le CPP par drag & drop, obtient immédiatement le feedback sur les erreurs XML/structure avant de mobiliser la bande passante pour un transfert de plusieurs TB
- **Futur — Provider externe** : même bénéfice depuis son interface mediaspot

---

## 4. Priorité 3 — CPP Creator (intégration mediaspot)

> Cette phase sera traitée dans un second temps, après la mise en place de l'ingest.

### 4.1 Architecture — CPPGenerator externe

Le CPPGenerator est un programme **externe à mediaspot**, développé par Yan Rocheteau. Il communique avec mediaspot via ses APIs REST. L'intégration mediaspot consiste à :
- Déclencher le CPPGenerator depuis un **workflow mediaspot**
- Passer les IDs assets et paramètres nécessaires
- Récupérer le statut de génération et le rapport de validation
- Créer l'objet CPP dans mediaspot et y rattacher les assets

### 4.2 Ce que fait le CPPGenerator (déjà opérationnel)

```
CPPGenerator
  ├── Appel API mediaspot    → collecte métadonnées Title + Asset (dont MILO, IMDB)
  ├── MediaInfo       → collecte métadonnées techniques des fichiers
  ├── Calcul MD5      → 1 MD5 par fichier DPX, stocké dans packingList.xml
  ├── Génération XML
  │   ├── preservationPackingList.xml  (METS — top-level)
  │   ├── descMD_<uuid>_<no>.xml       (EBUCore — métadonnées éditoriales)
  │   ├── techMD_<uuid>_<no>.xml       (EBUCore + MediaInfo)
  │   ├── digiprovMD_<uuid>_<no>.xml   (PREMIS — provenance)
  │   ├── packingList.xml              (METS sub-package + MD5)
  │   └── playlist_<uuid>.xml
  ├── Validation XML  → vérification XSD
  └── Construction arborescence → dans patrimoine_SC
```

### 4.3 Workflow cible (une fois le stockage connecté à mediaspot)

**Étape 1 — Préparation dans mediaspot :**
- Assets ImageSequence créés dans mediaspot (avec ou sans fichier lié)
- Import UNITY automatique des métadonnées Title
- Complétion des données manquantes par l'équipe Restauration/Acquisition (Nicolas Rabel)
- Vérification que 100% des champs obligatoires sont renseignés

**Étape 2 — Génération :**
- Déclenchement du CPPGenerator via workflow mediaspot
- Génération des XML + calcul MD5 + construction arborescence dans `patrimoine_SC`
- Validation automatique du package généré

**Étape 3 — Post-génération dans mediaspot :**
- Création de l'objet CPP dans mediaspot
- Liaison des assets ImageSequence au CPP parent
- Rapport de validation accessible dans mediaspot
- Livraison vers stockage Patrimoine (Move/Copy → SC Patrimoine)

### 4.4 Déclenchement

Deux modes :
- Par **Content Type** : tous les assets d'un type défini associés à un titre
- Par **sélection manuelle** d'assets dans mediaspot

### 4.5 Prérequis

- Classe CPP créée dans mediaspot (Priorité 1)
- **Spécifications CPP STUDIOCANAL** rédigées : règles de présentation des métadonnées "libres" non définies précisément par EN17650 (ex : format du Synopsis) — ces spécifications seront partagées avec les providers et constitueront la base des règles de validation à l'ingest
- Validation par Mélanie que 100% des champs du XLSX de référence sont bien présents dans les XML générés

---

## 5. Structure d'un CPP (norme EN17650)

```
<CPP-Package-Title>/
├── preservationPackingList.xml          ← packing list top-level (METS)
├── metadata/
│   ├── descMD_<puuid>_<no>.xml         ← métadonnées éditoriales (EBUCore)
│   │                                      titre, cast & crew, synopsis, MILO, IMDB...
│   └── digiprovMD_<puuid>_<no>.xml     ← provenance numérique (PREMIS)
├── playlists/
│   └── playlist_<playlist-uuid>.xml
├── ancillaryData/ (optionnel)
├── checkerReports/ (optionnel)
│   └── checkerReportsList.xml
└── <type>Package_<suuid>/              ← 1 sub-package par asset
    ├── packingList.xml                 ← liste des fichiers + MD5 de chaque fichier
    ├── metadata/
    │   ├── techMD_<suuid>_<no>.xml     ← métadonnées techniques (EBUCore + MediaInfo)
    │   └── digiprovMD_<suuid>_<no>.xml
    ├── data/
    │   └── File_000001.dpx
    │   └── File_000002.dpx
    │   └── ...                         ← 1 MD5 par image dans packingList.xml
    └── ancillaryData/ (optionnel)
          └── scancard.pdf, etc.
```

**Types de sub-packages :** `image`, `sound`, `timedText`, `audiovisual`, `componentized`, `extra`

**Règle MD5 :** checksum obligatoire sur chaque fichier XML et chaque mediafile. Pour les séquences d'images : **1 MD5 par fichier image individuel**.

**Pas d'encapsulation TAR.** Pas de transfert via Aspera/Faspex pour les séquences d'images (crée des TAR automatiquement).

---

## 6. Formats Patrimoine supportés

Conformément au contrat Studiocanal, a minima :

| Type | Formats | Profondeur |
|---|---|---|
| Séquences d'images | DPX, TIFF, EXR | 10 et 16 bits |
| Types d'archives | DSM, DCDM, ACES, SCAN | — |
| Audio | WAV | — |
| Package | DCP | — |
| Proxies | ProRes (online obligatoire) | — |
| Auxiliaires | XML, PDF (scancard...) | — |

**QuickTime** n'est pas prévu dans la Table 30 de la norme EN17650 — à confirmer avec le CNC si besoin.

---

## 7. Mapping des métadonnées

Source : `202601-cppMediaspotMetadataFields-SC_MonsieurN-Yan.xlsx` (Mélanie Perceval / Yan Rocheteau, jan. 2026) — validé par Studiocanal.

**Légende :** M = Mandatory, O = Optional, Auto = calculé automatiquement, Manual = saisi manuellement. *"À créer"* = champ inexistant dans mediaspot à ce jour.

### 7.1 Niveau Title

| Label | TagName | M/O | Valeurs / Notes |
|---|---|---|---|
| Primary Title | `primaryTitle` | **M** | Titre principal du film |
| Catalog Type | `titleType` | **M** | `Movie` ; `Season` |
| Theatrical release date | `theatricalReleaseDate` | O | Année de sortie |
| Program Restored | `ProgramRestored` | — | `True` / `False` |
| Cast Last Name | `oeuvreCastName` | O | |
| Cast First Name | `oeuvreCastSurName` | O | |
| Cast Function | `oeuvreCastFunction` | O | Director, Actor, Producer, Author, Cinematographer... |
| Production Company | `productionCompany` | O | Société de production |
| Synopsis Text | `oeuvreSynoText` | O | Résumé long |
| Title Original Picture Format | `titleOriginalPictureFormat` | **M** | OAR : 1.33, 1.37, 1.66, 1.85, 2.35, 2.39... |
| Original Language | `titleOriginalLanguage` | **M** | Langue parlée dans le film |
| Title Secondary Languages | `titleSecondaryOriginalLanguages` | O | Autres langues parlées |
| Title Nationalities | `nationalities` | O | Pays d'origine |
| Genre keywords | `titleGenres` | O | Action, Comedy, Drama, Documentary... |
| EIDR | `eidr` | O | |
| ISAN ID | `isanId` | O | |
| VISA Id | `visaId` | O | |
| IMDB Id | `imdbId` | O | Présent dans les XML CPP (confirmé Yan) |
| MILO | — | — | Présent dans les XML CPP (confirmé Yan) |
| Duration | `durationSMPTE` | — | Durée du film |
| Localized Titles | `titleLocalisedTitles` | O | Titres d'exploitation par territoire |
| Right Holder | `vodRightHolder` | O | Ayants droits |
| Rating | `Rating` | O | Format : `FR;CNC;-12` |
| Shooting Resolution | `shootingResolution` | **M** | *À créer* — résolution tournage |
| Shooting Environment | `shootingEnvironment` | **M** | *À créer* — `Film` / `Digital` |
| Shooting Media Type | `shootingMediaType` | **M** | *À créer* — 35MM, 16MM, ProRes, Raw... |
| PostProduction Resolution | `postProductionResolution` | O | *À créer* |
| PostProduction Environment | `postProductionEnvironment` | O | *À créer* — `Photochemical` / `Digital` |
| Shooting Framerate | `shootingFramerate` | **M** | *À créer* — 24, 25, 23.98... |
| Last Reel | `lastReel` | O | *À créer* — 1A, 8B, 10AB... (déduit le nb total de bobines) |
| Local Distributor | `LocalDistributor` | O | *À créer ?* |

### 7.2 Niveau Content

| Label | TagName | M/O | Valeurs / Notes |
|---|---|---|---|
| Content Type | `contentType` | **M** | `Long métrage`, `Feature`, `Documentaire`... |
| Content Edit | `contentEdit` | O | `RESTORED`, `Director's cut`, `Cinema`... |
| Content Edit Exploitation | `contentExploitation` | O | `All`, `Cinema`, `TV`, `VOD`... |
| Content Category | `contentCategory` | O | *À créer* — valeur : `Preservation` |
| Follows Preservation Workflow | `followsPreservationWorkflowContent` | **M** | *À créer* — `True` / `False` |

### 7.3 Niveau Asset — ImageSequence

| Label | TagName | M/O | Probbing | Valeurs / Notes |
|---|---|---|---|---|
| Asset ID | `objectId` | **M** | Auto | Identifiant unique mediaspot |
| Asset Class | `assetClass` | **M** | Manual | `RAW` |
| Asset Type | `assetType` | **M** | Manual | `ImageSequence` |
| Content Sub Type | `contentSubType` | **M** | Manual | `Program Restored`, `Textless Parts Version`, `DSM`, `DCDM`... |
| Framerate | `techFrameRate` | **M** | Manual | 24, 25, 23.98... |
| Picture Lang | `languagePicture` | **M** | Manual | Langue image principale |
| Title Lang | `languageTitle` | O | Manual | Langue des titres à l'image |
| Main Credits Lang | `languageMainCredits` | O | Manual | Langue générique début |
| End Credits Lang | `languageEndCreditsCards` | O | Manual | Langue générique fin (cartons) |
| End Roller Lang | `languageEndRoller` | O | Manual | Langue générique déroulant |
| Inserts Cards Lang | `languageInsertsCards` | O | Manual | Langue des inserts |
| Picture Version | `pictureOverallVersion` | **M** | Manual | `Original`, `Localized`, `Textless` |
| Reel by Reel | `isReelByReel` | **M** | Manual | `True` / `False` |
| Reel Number | `reelNumber` | **M** | Manual | 1A, 1B, 2A... 15AB |
| **Wrapper** | `techWrapper` | **M** | Auto | **À ajouter dans mediaspot : `EXR`, `DPX`, `TIFF`** |
| **Codec** | `techCodec` | **M** | Auto | **À ajouter dans mediaspot : `EXR`, `DPX`, `TIFF`** |
| Aspect Ratio | `originalPictureFormat` | **M** | Manual | 1.33, 1.37, 1.66, 1.85, 2.35, 2.39... |
| Aspect Ratio Type | `pictureAspectRatioType` | **M** | Manual | `OAR`, `Cropped`, `Undefined` |
| Tech Bit Depth | `techBitDepth` | **M** | Auto | 10, 16 bits |
| Tech Width | `techWidth` | O | Auto | Résolution largeur |
| Tech Height | `techHeight` | O | Auto | Résolution hauteur |
| Video Profile | `videoProfile` | O | Auto | TwoK, FourK, HD... |
| Color Space | `techColorSpace` | O | Manual | LOG, P3D60, P3DCI, REC709, XYZ, ACES... |
| Luminance Scale | `luminanceScale` | O | Manual | `Log`, `Lin`, `APO-lin` |
| Is Conformed | `isConformed` | O | Manual | `True` / `False` |
| With Film Leader | `withFilmLeader` | O | Manual | `True` / `False` |
| With Color Grading | `withColorGrading` | O | Manual | `True` / `False` |
| Is HDR | `isHdr` | M (si applicable) | Manual | `True` / `False` |
| HDR Type | `hdrType` | M (si HDR) | Manual | `Dolby Vision`, `HDR10`, `HDR10+` |
| With LUT | `withLut` | O | Manual | `True` / `False` |
| LUT is provided | `lutIsprovided` | O | Manual | `True` / `False` |
| LUT Name | `LutName` | O | Manual | Nom de la LUT |
| Gamma | `gamma` | O | Manual | 2.2, 2.4, 2.6 |
| Nits | `nits` | O | Manual | 100, 400, 1000, 4000, 10000 |
| Reel Frame Count | `reelFrameCount` | **M** | Auto | Nombre total d'images dans la bobine |
| Reel Useful Frame Count | `reelUsefulFrameCount` | O | Auto | Nombre d'images utiles |
| Start Frame Name | `startFrameName` | **M** | Auto | Calculé depuis TC in (avec amorce) |
| End Frame Name | `endFrameName` | **M** | Auto | Calculé depuis TC out |
| Image Sequence Pattern | `imageSequencePattern` | **M** | — | Ex : `bob101_[000001-000010].dpx` |
| Start useful Frame TC In | `startUsefulFrameTCIn` | O | Manual | TC In de l'image utile de début |
| End useful Frame TC Out | `endUsefulFrameTCOut` | O | Manual | TC Out de l'image utile de fin |
| Archive Image Package Type | `archiveImagePackageType` | **M** | Manual | `DSM`, `DCDM`, `SCAN`, `Photogramme`, `Master Image` |
| Photography Resolution | `photographyResolution` | O | Manual | Résolution du scan |
| Color | `Color` | O | Manual | `Color`, `Black & White` |
| Asset Preservation | `followsPreservationWorkflowAsset` | **M** | Manual | *À créer* — `True` / `False` |
| Laboratory (From) | `laboratoryfrom` | O | Manual | Labo fournisseur (Eclair, VDM, Pathé...) |
| Material ID (LTO) | `Material ID` | M (si applicable) | Manual | Référence/emplacement LTO |
| Provider | `labProviderId` | **M** | Manual | Entité qui va uploader l'élément |
| Original File Name | `customerOriginalFileName` | O | Manual | Nom du fichier original |
| Scan Device | `ScanDevice` | O | Manual | Nom du scanner |
| Digitization Standards | `DigitizationStandards` | O | Manual | Normes utilisées pour le scan |
| Restoration Notes | `RestorationNotes` | O | Manual | Détails sur les restaurations |
| Scan Date | `ScanDate` | O | Manual | Date du scan |
| **MD5** | `MD5` | **M** | Auto | **1 MD5 par image** — stocké dans `packingList.xml` du sub-package |
| 3D | `stereoscopic` | M (si applicable) | Manual | `True` / `False` |
| 3D Type | `stereoscopicType` | M (si 3D) | Manual | `Dual Stream`, `Side by Side`... |
| With FX | `withFX` | O | Manual | `True` / `False` |

---

## 8. CPP Checker — référence de code source

> La logique du CPP Checker est **réimplémentée nativement dans mediaspot**. Ce dépôt sert de référence de spécification — on ne l'appelle pas comme outil externe.

**Repository :** `https://gitlab.com/cst-cpp/cpp-checker` (licence MIT)
**Stack :** C# / .NET 8.0 — **CaPPuSCHino** est un submodule Git (pas un outil séparé)

### 8.1 Fichiers clés à étudier pour la réimplémentation

| Fichier source | Contenu à réimplémenter |
|---|---|
| `CPPCheck/CPPChecker/CPPValidateClasses.cs` | Orchestration de la validation (`DoCppValidate`) — séquence complète des checks |
| `CPPCheck/CommonClasses/CommonClasses.cs` | `CheckSummaryItem`, `ChecksumUtils` (MD5/SHA1/SHA256), `XmlUtils.XsdValidate` |
| `CPPCheck/CommonClasses/En17650/DigitalPreservationPackageClasses.cs` | `DoValidateDescMds`, `DoValidateTechMD`, `DoValidateFileSec`, `DoCheckUnreferencedDescMds`, `IsCppCompliantHRef`, `GetSubPackagesDiv` |
| `CPPCheck/CommonClasses/En17650/SchematronClasses.cs` | Logique d'exécution des règles Schematron |
| `dependencies/cappuschino/` | Fichiers `.sch` — règles Schematron pour `PackingList` et `SubPackagePackingList` |

### 8.2 Schémas XSD à embarquer dans mediaspot

| Schéma | Rôle |
|---|---|
| `mets_digitalPreservation.xsd` | Structure METS principale |
| `packingList.xsd` | Packing lists |
| `playlist.xsd` | Playlists / compositions |
| `checkerReportsList.xsd` | Rapports de validation |
| `st2067-3a-2016.xsd` | SMPTE IMF (playlists) |
| `st433b-2008-am1-2011.xsd` | SMPTE |
| `xlink.xsd` | XLink |
| `xmldsig-core-schema.xsd` | Signatures XML |
| `ebucore_1_6_fixed.xsd` | Métadonnées EBUCore (descMD, techMD) |
| `simpledc20021212.xsd` | Dublin Core (requis par EBUCore) |
| `premis-v3-0.xsd` | Provenance numérique (digiprovMD) |

---

## 9. Infrastructure et performance

### 9.1 Dossier de travail

`patrimoine_SC` : dossier temporaire de travail pour désarchivage LTO, calcul MD5, génération proxies et fabrication CPP. Connexion à mediaspot = prérequis pour l'automatisation complète.

### 9.2 Contraintes

- **Calcul MD5** : I/O bound — effectuer sur la machine locale, risque de saturation fibre si disque très rapide
- **Proxies** : 1 proxy par bobine, online obligatoire. Génération via EDL/TimeTool. **Non inclus dans le CPP Studiocanal.**
- **Volumes estimés** : ~10 CPP × ~14 TB chacun. Proxies : ~150 Go par 10 TB de vidéo
- **Aspera/Faspex** : déconseillé pour les séquences d'images (crée des TAR → longs à envoyer/extraire)

### 9.3 Theatrical Material

Chez Studiocanal, les "manual tasks" sont renommées **"Theatrical Material"**. À prendre en compte dans tous les workflows et mappings.

---

## 10. Points ouverts

| # | Sujet | Description | Qui | Statut |
|---|---|---|---|---|
| P1 | **Types de hash** | MD5 obligatoire — autres algorithmes supportés (SHA-256...) ? | Norme + JPB | Ouvert |
| P2 | **Métadonnées mandatory** | Valider la liste exacte et le caractère bloquant avec Studiocanal | JPB + Mélanie | Ouvert |
| P3 | **MD5 par image** | Stocké dans `packingList.xml` sub-package | Yan / Canal+ | **Résolu** |
| P4 | **Proxies dans le CPP** | Studiocanal : **NON** | SC | **Résolu** |
| P5 | **Validation mapping complet** | Mélanie vérifie que 100% des champs XLSX sont dans les XML générés par CPPGenerator | Mélanie + Raphaël | En cours |
| P6 | **Rapport CPP Checker** | HTML Viewer ou Tree-Explorer dans l'UI mediaspot ? | VDM + SC | Ouvert |
| P7 | **End Roller Lang** | `languageEndRoller` — mandatory par objet ? Assigné à quel objet ? | VDM + SC | Ouvert |
| P8 | **Spécifications CPP SC** | Rédiger les règles de présentation des métadonnées libres (ex : Synopsis) | VDM | Ouvert — prérequis P3 |
| P9 | **Codec/Wrapper** | Rendre `techCodec` et `techWrapper` éditables — ajouter EXR, DPX, TIFF | VDM dev | Ouvert |
| P10 | **Champs "À créer"** | `shootingResolution`, `shootingEnvironment`, `shootingMediaType`, `shootingFramerate`, `followsPreservationWorkflow`, `archiveImagePackageType`... | VDM dev | Ouvert |
| P11 | **PackageProfile** | Règle exacte LongTerm vs Interim — liste complète des formats | VDM + SC | Ouvert |
| P12 | **Guideline officiel CST** | Document à 356€ — acheter pour clarifier les ambiguïtés | VDM management | Ouvert |

---

## 11. Nomenclature

| Terme | Définition |
|---|---|
| **mediaspot / mediaspot** | Nom de mediaspot dans le contexte Studiocanal — même plateforme |
| **CPP** | Cinema Preservation Package |
| **Sub-Package** | Un asset à l'intérieur d'un CPP (1 par bobine / par fichier audio / etc.) |
| **CPPGenerator** | Programme externe de Yan (hors-mediaspot) qui génère les CPP via les APIs de mediaspot |
| **CPP Checker** | Outil open source de Yan (VDM/CST) pour valider un package CPP |
| **CC** | Chargé(e) de Clientèle / Media Manager |
| **Theatrical Material** | Terme Studiocanal pour ce qui était appelé "Manual Tasks" |
| **patrimoine_SC** | Dossier de travail temporaire pour les assets Patrimoine Studiocanal |
| **MILO** | Identifiant interne Studiocanal présent dans les XML CPP |

---

## 12. Références

| Document | Description |
|---|---|
| Norme EN17650 Final Draft | Norme officielle CST — structure, schémas XSD, règles |
| VDM - Norme EN17650 - Document de synthèse (Yan, 22/11/2022) | Synthèse de la norme et étude de faisabilité |
| CPP - Ateliers - Meeting avec Yan (2025-2026) | Notes de réunions Alberto / Yan / Jerome |
| Contrat Studiocanal — Section 3 | Expression de besoins contractuelle |
| 202601-cppMediaspotMetadataFields-SC_MonsieurN-Yan.xlsx | XLSX de référence validé SC — mapping métadonnées mediaspot ↔ CPP |
| Mail Yan → Julia (mars 2026) | Clarification architecture CPPGenerator + état MONSIEUR N. |
| Guideline CPP EN17650 (CST, 356€) | Guide d'implémentation officiel (à acquérir) |
| gitlab.com/cst-cpp/cpp-checker | CPP Checker — C#/.NET 8, open source MIT, CaPPuSCHino en submodule |
