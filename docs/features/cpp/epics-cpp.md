---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories']
inputDocuments:
  - 'docs/features/CPP/PRD-CPP-Cinema-Preservation-Package.md'
---

# CPP — Cinema Preservation Package - Epic Breakdown

## Overview

Ce document présente la décomposition complète en épiques et stories pour la feature CPP (Cinema Preservation Package) dans mediaspot / mediaspot, pour le client Studiocanal (Groupe Canal+). Il décompose les requirements du PRD en stories implémentables avec critères d'acceptance.

**Référence contractuelle :** Contrat Studiocanal — Section 3 « Gestion des assets de Patrimoine »
**Priorités :** P1 = Classe CPP dans mediaspot (bloquant Yan) → P2 = CPP Ingest → P3 = CPP Creator (hors scope v1)

---

## Requirements Inventory

### Functional Requirements

#### P1 — Classe CPP dans la mediaspot

FR1: Le système doit supporter un nouveau type d'asset `CppPackage` avec ObjectType=CppPackage, ObjectClass=Cpp, Groupe=OTHER
FR2: Un asset CPP doit pouvoir être positionné en tant que parent d'assets enfants (ImageSequence, Audio, DCP...) dans la hiérarchie Title > Content > CPP > Assets, le niveau Content permettant de distinguer les types de contenu (Long métrage, Trailer, Bonus...)
FR3: L'asset CPP doit exposer 15 champs de métadonnées header : CppCreationDate, CppPreservationPackingListmd5, CppPackageCreator, CppArchiveTitle, CppPackageProfile, CppLabo, CppValidationDate, CppOwner, IngestDate, MediaArchiveCopy1, MediaArchiveCopy2, MediaArchiveCopy3, DateCheckArchiveCopy1, DateCheckArchiveCopy2, DateCheckArchiveCopy3
FR4: Un asset CPP ne peut pas contenir un autre asset CPP (pas de nesting CPP > CPP)
FR5: Tous les types d'assets peuvent être enfants d'un CPP, sauf CPP lui-même
FR6: L'API mediaspot doit exposer la création d'un asset CPP avec renseignement des métadonnées header
FR7: L'API mediaspot doit exposer la liaison d'assets enfants (par leurs IDs) à un asset CPP parent
FR41: Chaque champ de métadonnées du type CppPackage peut être configuré avec un flag `isCppMandatory`, distinct du flag d'obligation standard à la création de request — un champ `isCppMandatory` n'est pas obligatoire à la création de la coquille CPP mais doit être renseigné avant la fabrication du CPP
FR42: L'API mediaspot doit exposer un endpoint de pré-contrôle de complétude des métadonnées `isCppMandatory` d'un asset CppPackage, retournant la liste des champs manquants — ce contrôle est déclenché avant toute fabrication CPP (CPP Creator)

#### P2 — CPP Ingest avec validateur natif

FR8: L'ingest CPP peut être déclenché par dépôt d'un dossier CPP dans la zone de transit (patrimoine_SC) ou par création manuelle d'une request d'ingest par un CC/Media Manager
FR9: La Phase 1 (validation complète) doit être exécutée intégralement AVANT toute création d'asset dans mediaspot
FR10: Le validateur doit valider `preservationPackingList.xml` contre le schéma XSD `mets_digitalPreservation.xsd`
FR11: Le validateur doit valider `preservationPackingList.xml` contre les règles Schematron CaPPuSCHino
FR12: Le validateur doit extraire les métadonnées CPP header depuis `metsHdr` (packageProfile, creator, archiveTitle)
FR13: Le validateur doit vérifier chaque fichier `descMD_*.xml` : format du href (dossier metadata/, préfixe descMD), existence sur le filesystem, checksum, conformité XSD EBUCore 1.6, conformité Schematron
FR14: Le validateur doit détecter les fichiers `descMD_*.xml` présents dans metadata/ mais non référencés dans le METS
FR15: Le validateur doit vérifier chaque fichier `digiprovMD_*.xml` top-level : format href, existence, checksum, conformité XSD PREMIS v3.0
FR16: Le validateur doit détecter les fichiers `digiprovMD_*.xml` non référencés au niveau top-level
FR17: Le validateur doit vérifier l'existence, la taille déclarée et le checksum de chaque `packingList.xml` de sub-package
FR18: Le validateur doit détecter les sous-dossiers du CPP non référencés dans le METS (les dossiers `metadata/`, `playlists/`, `ancillaryData/`, `checkerReports/` sont exclus de cette vérification)
FR19: Le validateur doit vérifier que le format href de chaque sub-package est conforme : `{packageType}_{identifier}/packingList.xml` où packageType est l'un des types valides : image, sound, timedText, audiovisual, componentized, extra
FR20: Pour chaque sub-package, le validateur doit valider `packingList.xml` (XSD mets_digitalPreservation.xsd + Schematron CaPPuSCHino) et extraire le type depuis structMap[TYPE="physical"].div.TYPE
FR21: Pour les sub-packages de type `image`, le validateur doit vérifier la conformité des noms de fichiers DPX/TIFF/EXR avec les patterns déclarés dans techMD (préfixe, extension, padding, plage d'index premier/dernier)
FR22: Le validateur doit vérifier les fichiers `digiprovMD_*.xml` au niveau de chaque sub-package (même logique que FR15)
FR23: Le validateur doit vérifier chaque fichier déclaré dans le `fileSec` du sub-package : existence sur le filesystem, taille réelle vs déclarée, checksum recalculé vs déclaré (1 checksum par fichier image DPX individuel)
FR24: Le validateur doit vérifier les fichiers présents dans `data/` mais non déclarés dans le fileSec
FR25: Le validateur doit valider les playlists : format de chaque FILEID (doit être `playlist_{identifier}`), détection des fichiers présents dans `playlists/` mais non référencés, conformité XSD `st2067-3a-2016.xsd`
FR26: Toutes les erreurs de validation doivent être accumulées dans une liste de CheckSummaryItems {filename, status: pass|failed, title, description} — aucun arrêt à la première erreur
FR27: Si au moins 1 CheckSummaryItem a status=failed, le CPP doit être rejeté dans sa totalité (aucun asset créé dans mediaspot)
FR28: Un rapport de validation doit être généré dans tous les cas (pass et failed), contenant : en-tête CPP (creator, creation date, MD5, archive title, package profile, organisation, validation date), liste des sub-packages, tableau complet des checks
FR29: La Phase 2 (création dans mediaspot) ne doit s'exécuter que si Phase 1 est 100% OK (zéro failed)
FR30: En Phase 2, créer l'asset CPP parent dans mediaspot avec les métadonnées header extraites en Phase 1
FR31: En Phase 2, créer un asset enfant dans mediaspot pour chaque sub-package (type déterminé par packageType) avec les métadonnées issues des XML EBUCore/PREMIS
FR32: En Phase 2, associer chaque asset enfant créé à l'asset CPP parent
FR33: Le rapport de validation doit être attaché à la fiche de l'asset CPP dans mediaspot
FR34: Les séquences d'images à numérotation non contiguë doivent être créées comme des assets ImageSequence séparés (1 par plan)

### NonFunctional Requirements

NFR1: Support des trois algorithmes de checksum : MD5 (hex lowercase), SHA1 (Base64 ou hex lowercase), SHA256 (Base64 ou hex lowercase) — le type est lu dans chaque fichier XML
NFR2: Les 11 schémas XSD doivent être embarqués dans mediaspot (pas de dépendance externe) : mets_digitalPreservation.xsd, packingList.xsd, playlist.xsd, checkerReportsList.xsd, st2067-3a-2016.xsd, st433b-2008-am1-2011.xsd, xlink.xsd, xmldsig-core-schema.xsd, ebucore_1_6_fixed.xsd, simpledc20021212.xsd, premis-v3-0.xsd
NFR3: Les règles Schematron CaPPuSCHino (submodule du repo gitlab.com/cst-cpp/cpp-checker) doivent être embarquées dans mediaspot
NFR4: La vérification des checksums est obligatoire en production — aucun mode bypass autorisé
NFR5: Le calcul MD5 est I/O bound et doit être effectué sur la machine locale (risque de saturation fibre si disque très rapide)
NFR6: Formats supportés : DPX, TIFF, EXR (10 et 16 bits), WAV, DCP, ProRes
NFR7: La structure CPP est un dossier/arborescence native — aucun encapsulation TAR
NFR8: L'API mediaspot pour création/gestion d'assets CPP doit être accessible programmatiquement par des outils externes (CPPGenerator de Yan)
NFR9: Volumes prévus : ~10 CPP × ~14 TB — la validation de checksum sur ces volumes doit être prise en compte dans l'architecture de performance
NFR10: La logique de validation CPP est réimplémentée nativement dans le stack mediaspot — le CPP Checker (gitlab.com/cst-cpp/cpp-checker, MIT) sert exclusivement de référence de spécification ; il n'est jamais appelé comme processus externe ou dépendance runtime

### Additional Requirements

- **Code source de référence pour la réimplémentation** : CPPCheck/CPPChecker/CPPValidateClasses.cs (orchestration DoCppValidate), CPPCheck/CommonClasses/CommonClasses.cs (CheckSummaryItem, ChecksumUtils, XmlUtils.XsdValidate), CPPCheck/CommonClasses/En17650/DigitalPreservationPackageClasses.cs (DoValidateDescMds, DoValidateTechMD, DoValidateFileSec, IsCppCompliantHRef), CPPCheck/CommonClasses/En17650/SchematronClasses.cs (moteur Schematron)
- **Classe de stockage** : dossier `patrimoine_SC` dédié aux assets Patrimoine Studiocanal
- **Droits** : droits spécifiques de lecture pour les assets Patrimoine par groupes utilisateurs

### FR Coverage Map

FR1: Epic 1 — Création type CppPackage (ObjectType, ObjectClass, Groupe)
FR2: Epic 1 — Hiérarchie Title > Content > CPP > Assets enfants
FR3: Epic 1 — 15 champs de métadonnées CPP header
FR4: Epic 1 — Interdiction CPP > CPP
FR5: Epic 1 — Tous types d'assets enfants sauf CPP
FR6: Story 1.1 — API mediaspot création asset CPP + métadonnées (couvert par la config du type)
FR7: Story 1.2 — API mediaspot liaison assets enfants par IDs
FR41: Story 1.3 — Flag isCppMandatory sur les champs de métadonnées CppPackage
FR42: Story 1.3 — Endpoint de pré-contrôle de complétude des métadonnées isCppMandatory (pour CPP Creator)
FR8: Epic 2 — Déclenchement ingest (zone transit ou request manuelle)
FR9: Epic 2 — Phase 1 avant toute création mediaspot
FR10: Epic 2 — XSD preservationPackingList.xml
FR11: Epic 2 — Schematron preservationPackingList.xml
FR12: Epic 2 — Extraction métadonnées CPP header depuis metsHdr
FR13: Epic 2 — Validation descMD (href, existence, checksum, XSD, Schematron)
FR14: Epic 2 — Détection descMD non référencés
FR15: Epic 2 — Validation digiprovMD top-level
FR16: Epic 2 — Détection digiprovMD non référencés
FR17: Epic 2 — Vérification packingList.xml sub-packages
FR18: Epic 2 — Détection sous-dossiers non référencés
FR19: Epic 2 — Validation format href sub-packages
FR20: Epic 2 — XSD + Schematron packingList.xml sub-package
FR21: Epic 2 — TechMD patterns nommage DPX/TIFF/EXR
FR22: Epic 2 — Validation digiprovMD sub-package
FR23: Epic 2 — Validation fileSec (existence, taille, checksum par fichier)
FR24: Epic 2 — Détection fichiers data/ non référencés
FR25: Epic 2 — Validation playlists
FR26: Epic 2 — Accumulation erreurs CheckSummaryItem
FR27: Epic 2 — Rejet complet si 1 erreur
FR28: Epic 2 — Rapport de validation (pass et failed)
FR35: Story 2.4 — Vérification métadonnées obligatoires par profil client (Étape 7) — pré-upload
FR36: Story 2.4 — Profil client configurable (STUDIOCANAL, SND...) — déterminé à l'init de l'ingest
FR37: Story 2.7 — Validation pré-upload déclenchée au drag & drop (navigateur), avant tout transfert
FR38: Story 2.7 — Pré-upload = checks `ignoreDataFolderItemChecksums=true` : XSD, Schematron, structure, checksums XML, TechMD, digiprovMD, métadonnées obligatoires — sans checksums data/
FR39: Story 2.7 — Erreurs pré-upload → upload bloqué + rapport affiché ; pas d'erreur → upload démarre
FR40: Story 2.7 — Post-upload (serveur) : checksums data/ uniquement (`ignoreDataFolderItemChecksums=false`) — peut encore rejeter le CPP
FR43: Story 2.7 — Split pré/post-upload aligné sur le flag `ignoreDataFolderItemChecksums` du CPP Checker (Yan Rocheteau)
FR29: Epic 3 — Phase 2 uniquement si Phase 1 100% OK
FR30: Epic 3 — Création asset CPP parent dans mediaspot
FR31: Epic 3 — Création assets enfants avec métadonnées XML
FR32: Epic 3 — Association assets enfants au CPP parent
FR33: Epic 3 — Rapport attaché à la fiche CPP dans mediaspot
FR34: Epic 3 — Séquences non contiguës → assets ImageSequence séparés

---

## Epic List

### Epic 1 : Type d'asset CPP dans la mediaspot
Yan / CPPGenerator peut créer un asset CPP via l'API mediaspot, renseigner les 15 champs de métadonnées header, et lier des assets ImageSequence existants par leurs IDs. La hiérarchie Title > Content > CPP > ImageSequences est visible dans mediaspot.
**Definition of Done :** Un asset CPP est créable et consultable dans mediaspot via l'API, ses assets enfants peuvent être liés, et les métadonnées obligatoires à la fabrication sont identifiées.
**FRs couverts :** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR41, FR42

### Epic 2 : Moteur de validation CPP (EN17650)
Un opérateur peut soumettre un dossier CPP au validateur. Le système produit un rapport exhaustif de conformité (XSD, Schematron, checksums, structure, TechMD) — le CPP est accepté ou rejeté avec détail complet de toutes les erreurs.
**Definition of Done :** Un CPP soumis produit un rapport de validation complet, attachable à un asset CPP dans mediaspot.
**FRs couverts :** FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27, FR28

### Epic 3 : Pipeline d'ingest CPP dans la mediaspot
Si la validation (Epic 2) est 100% OK, le système crée automatiquement dans mediaspot l'asset CPP parent et tous les assets enfants avec leurs métadonnées issues des XML EN17650. La hiérarchie complète est accessible dans mediaspot.
**Definition of Done :** Un CPP valide est intégralement ingéré dans mediaspot avec hiérarchie et métadonnées — sans intervention manuelle.
**FRs couverts :** FR29, FR30, FR31, FR32, FR33, FR34

---

## Epic 1 : Type d'asset CPP dans la mediaspot

**Contexte :** Le CPPGenerator de Yan Rocheteau (outil externe opérationnel) utilise les APIs de mediaspot pour collecter les métadonnées et créer les assets. Actuellement, il n'existe pas de type d'objet "CPP" dans mediaspot — Yan ne peut donc pas représenter un Cinema Preservation Package comme entité native de mediaspot, ni y rattacher les ImageSequences associées. Cela bloque les livraisons contractuelles à Studiocanal prévues pour mi-2026.

**Objectif :** Créer dans mediaspot le type d'asset `CppPackage` avec ses métadonnées header, sa position dans la hiérarchie `Title > Content > CPP > Assets`, et ses règles de gestion (pas de nesting CPP > CPP), afin que Yan puisse immédiatement enregistrer les CPP qu'il fabrique dans mediaspot.

**Périmètre inclus :**
- Définition du type d'asset CppPackage (ObjectType, ObjectClass, Groupe)
- 15 champs de métadonnées CPP header
- Positionnement dans la hiérarchie Title > Content > CPP > Assets enfants
- Règle d'interdiction CPP > CPP
- Autorisation de tous les types d'assets enfants sauf CPP

**Definition of Done :** Un asset CPP est créable et consultable dans mediaspot.

### Story 1.1 : Définir le type d'asset CppPackage dans mediaspot

En tant que **Media Manager / CC**,
Je veux qu'un nouveau type d'asset `CppPackage` soit disponible dans mediaspot avec ses métadonnées header,
Afin de pouvoir représenter un Cinema Preservation Package comme objet natif de mediaspot et y stocker les informations du package.

**Acceptance Criteria :**

```gherkin
Feature: Type d'asset CppPackage dans mediaspot

  Scenario: Création d'un asset CPP
    Given le système mediaspot est configuré avec le type CppPackage (ObjectType=CppPackage, ObjectClass=Cpp, Groupe=OTHER)
    When un utilisateur crée un nouvel asset de type CppPackage rattaché à un Title
    Then l'asset CPP est créé avec les 15 champs de métadonnées header disponibles :
      CppCreationDate, CppPreservationPackingListmd5, CppPackageCreator,
      CppArchiveTitle, CppPackageProfile, CppLabo, CppValidationDate,
      CppOwner, IngestDate, MediaArchiveCopy1, MediaArchiveCopy2,
      MediaArchiveCopy3, DateCheckArchiveCopy1, DateCheckArchiveCopy2,
      DateCheckArchiveCopy3
    And l'asset CPP est visible dans la hiérarchie Title > Content > CPP dans mediaspot

  Scenario: Position dans la hiérarchie
    Given un asset CPP existant rattaché à un Content lui-même rattaché à un Title
    When on consulte la hiérarchie de ce Title
    Then l'asset CPP apparaît sous le niveau Content, entre Content et ses assets enfants
    And les assets enfants (ImageSequence, Audio, DCP...) sont visibles sous le CPP parent

  Scenario: Interdiction de nesting CPP > CPP
    Given un asset CPP existant dans mediaspot
    When un utilisateur tente de rattacher un autre asset CPP comme enfant de ce CPP
    Then le système refuse l'opération avec un message d'erreur explicite
    And aucun lien CPP > CPP n'est créé

  Scenario: Types d'assets enfants autorisés
    Given un asset CPP existant dans mediaspot
    When un utilisateur rattache un asset de type ImageSequence, Audio ou DCP comme enfant
    Then l'association est créée avec succès
    And l'asset enfant apparaît dans la hiérarchie sous le CPP parent
```

### Story 1.2 : Rattacher des assets enfants à un asset CPP

En tant qu'**utilisateur de l'API mediaspot** (et en prévision de la possibilité de le faire via le front),
Je veux pouvoir sélectionner des assets de tout type ou toute classe (sauf un asset CPP lui-même) pour les rattacher en tant qu'enfants d'un asset CPP existant,
Afin de constituer la hiérarchie `Title > Content > CPP > Assets` en associant les assets de contenu au CPP parent.

**Acceptance Criteria :**

```gherkin
Feature: Rattachement d'assets enfants à un CPP dans mediaspot

  Scenario: Rattachement d'un asset non-CPP comme enfant d'un CPP
    Given un asset CPP (CppPackage) existant dans mediaspot
    And un asset de type quelconque (ImageSequence, Audio, DCP, Subtitle...) existant dans mediaspot
    When l'utilisateur soumet via l'API une requête de rattachement de cet asset comme enfant du CPP
    Then l'association parent-enfant est créée avec succès
    And l'asset enfant apparaît dans la hiérarchie sous le CPP parent

  Scenario: Rattachement de plusieurs assets en une opération
    Given un asset CPP existant dans mediaspot
    And plusieurs assets de types variés existants dans mediaspot
    When l'utilisateur soumet via l'API une requête de rattachement de ces assets comme enfants du CPP
    Then tous les assets sont rattachés au CPP parent
    And la hiérarchie reflète l'ensemble des assets enfants associés

  Scenario: Refus du rattachement d'un CPP comme enfant d'un autre CPP
    Given un asset CPP parent existant dans mediaspot
    And un autre asset de type CPP existant dans mediaspot
    When l'utilisateur tente via l'API de rattacher le second CPP comme enfant du premier
    Then le système retourne une erreur explicite (interdiction CPP > CPP)
    And aucun lien n'est créé entre les deux CPP

  Scenario: Rattachement indépendant du type ou de la classe de l'asset enfant
    Given un asset CPP existant dans mediaspot
    When l'utilisateur rattache un asset dont le type est différent d'ImageSequence (ex : Audio, DCP, Subtitle)
    Then l'association est créée avec succès sans restriction sur le type ou la classe de l'enfant
```

### Story 1.3 : Flag isCppMandatory — métadonnées obligatoires pour la fabrication CPP

En tant qu'**opérateur CPP / Media Manager**,
Je veux que certains champs de métadonnées de l'asset CppPackage puissent être marqués comme obligatoires pour la fabrication du CPP (flag `isCppMandatory`), sans être obligatoires à la création de la coquille,
Afin de pouvoir créer rapidement un asset CPP avec un minimum de métadonnées et compléter les champs restants avant de déclencher la fabrication — et que le système me signale clairement les champs manquants si je tente de fabriquer un CPP incomplet.

> **Note :** La vérification effective de ces champs est déclenchée au moment de la fabrication CPP (CPP Creator, Epic P3). Cette story couvre la configuration du flag et l'endpoint de pré-contrôle, qui seront consommés par le CPP Creator.

**Acceptance Criteria :**

```gherkin
Feature: Flag isCppMandatory sur les métadonnées CppPackage

  Scenario: Création de coquille CPP sans les champs isCppMandatory
    Given un type CppPackage configuré avec plusieurs champs dont certains ont isCppMandatory=true
    And ces champs isCppMandatory ne sont pas marqués "mandatory at creation" (obligation standard mediaspot)
    When un utilisateur crée une coquille CPP via l'API sans renseigner les champs isCppMandatory
    Then la coquille CPP est créée avec succès
    And aucune erreur de validation n'est retournée pour les champs isCppMandatory vides

  Scenario: Pré-contrôle de complétude — tous les champs renseignés
    Given une coquille CPP existante dont tous les champs isCppMandatory sont renseignés
    When l'API de pré-contrôle est appelée sur cet asset
    Then la réponse indique que l'asset est prêt pour la fabrication (missing: [])
    And aucun champ manquant n'est signalé

  Scenario: Pré-contrôle de complétude — champs manquants détectés
    Given une coquille CPP existante dont certains champs isCppMandatory sont vides
    When l'API de pré-contrôle est appelée sur cet asset
    Then la réponse retourne la liste des champs isCppMandatory non renseignés
    And le résultat indique que l'asset n'est pas prêt pour la fabrication

  Scenario: Distinction entre "mandatory at creation" et isCppMandatory
    Given un type CppPackage dont le champ CppPackageCreator est mandatory at creation
    And le champ CppArchiveTitle est isCppMandatory uniquement
    When un utilisateur crée une coquille CPP sans renseigner CppArchiveTitle
    Then la création réussit (CppArchiveTitle n'est pas bloquant à la création)
    When l'API de pré-contrôle est appelée sur cet asset
    Then CppArchiveTitle apparaît dans la liste des champs manquants pour la fabrication
```

---

## Epic 2 : Moteur de validation CPP (EN17650)

**Contexte :** La norme EN17650 impose des règles strictes de conformité sur la structure d'un CPP : schémas XSD, règles Schematron CaPPuSCHino, intégrité des checksums sur chaque fichier (jusqu'à 1 MD5 par image DPX individuelle), cohérence entre les XML METS et les fichiers présents sur le filesystem. Yan a développé un outil open source (CPP Checker, MIT) qui implémente cette logique en C#/.NET — et expose notamment un flag `ignoreDataFolderItemChecksums` qui sépare les checks légers (XML, structure) des checks lourds (checksums des fichiers media). La logique de validation sera réimplémentée nativement dans le stack mediaspot en s'appuyant sur ce code source comme référence de spécification. Les développeurs frontend ont confirmé la faisabilité d'une validation dans le navigateur au moment du drag & drop, avant tout upload.

**Objectif :** Implémenter un moteur de validation CPP en deux temps : (1) **validation pré-upload dans le navigateur** — déclenchée au drag & drop, exécute tous les checks EN17650 sauf les checksums des fichiers media, bloque l'upload si des erreurs sont détectées ; (2) **validation post-upload sur le serveur** — exécute uniquement les checksums des fichiers media. Ce split est aligné sur le flag `ignoreDataFolderItemChecksums` du CPP Checker.

**Périmètre inclus :**
- **Pré-upload (navigateur, drag & drop)** : Stories 2.1 à 2.5
  - Validation XSD et Schematron du `preservationPackingList.xml` top-level
  - Extraction des métadonnées CPP header depuis `metsHdr`
  - Validation des fichiers `descMD` et `digiprovMD` top-level (format href, existence, checksum XML, XSD EBUCore/PREMIS, Schematron, fichiers non référencés)
  - Vérification des `packingList.xml` de sub-packages et détection des sous-dossiers non référencés
  - Validation interne de chaque sub-package : XSD/Schematron, TechMD (patterns DPX/TIFF/EXR), `digiprovMD`
  - Validation des playlists (FILEID format, fichiers non référencés, XSD SMPTE)
  - Vérification des métadonnées obligatoires par profil client configurable
- **Post-upload (serveur)** : Story 2.6
  - Validation `fileSec` : existence + taille + checksum par fichier media dans data/ (~14 TB)
- **Orchestration du split** : Story 2.7
  - Intégration du drag & drop avec déclenchement automatique de la validation pré-upload
  - Blocage de l'upload si erreurs pré-upload ; démarrage upload si OK
  - Déclenchement de la validation post-upload (checksums) après upload complet
- Pattern `CheckSummaryItem` : accumulation de toutes les erreurs, rejet total si au moins une erreur
- Génération du rapport de validation (pass et failed)
- Embarquement des 11 schémas XSD et des règles Schematron CaPPuSCHino dans mediaspot

**Definition of Done :** Un CPP déposé par drag & drop déclenche automatiquement la validation pré-upload ; les erreurs XML/structure sont détectées avant tout transfert ; si OK, les checksums media sont vérifiés post-upload ; le rapport final est attachable à l'asset CPP dans mediaspot.

### Story 2.1 : Déclenchement de l'ingest sur une coquille CPP et validation du preservationPackingList.xml

En tant que **Media Manager / CC**,
Je veux pouvoir déclencher l'ingest d'un dossier CPP sur une coquille CPP existante dans mediaspot et obtenir une première validation du fichier de packing list racine,
Afin de savoir dès le début si la structure de base du CPP est conforme à la norme EN17650.

**Acceptance Criteria :**

```gherkin
Feature: Déclenchement ingest CPP sur coquille existante et validation packing list top-level

  Scenario: Déclenchement de la validation pré-upload sur une coquille CPP existante
    Given une coquille CPP (asset CppPackage) existe dans mediaspot
    And un CC dépose le dossier CPP complet par drag & drop sur l'interface mediaspot
    When le drag & drop est initié sur la coquille CPP cible
    Then une session de validation pré-upload est initialisée dans le navigateur
    And la validation démarre immédiatement — aucun fichier n'est encore uploadé
    And la coquille CPP n'est pas encore alimentée à ce stade

  Scenario: Validation XSD du preservationPackingList.xml
    Given une session de validation CPP initialisée
    When le système valide preservationPackingList.xml contre le schéma mets_digitalPreservation.xsd
    Then un CheckSummaryItem est produit avec titre "PreservationPackingList XSD Validation"
    And son status est "pass" si le fichier est conforme, "failed" si non conforme
    And en cas d'échec, la description détaille les erreurs XSD

  Scenario: Validation Schematron du preservationPackingList.xml
    Given une session de validation CPP avec preservationPackingList.xml valide en XSD
    When le système applique les règles Schematron CaPPuSCHino sur preservationPackingList.xml
    Then un CheckSummaryItem est produit avec titre "PreservationPackingList Schematron Validation"
    And son status reflète la conformité aux règles CaPPuSCHino

  Scenario: Extraction des métadonnées CPP header depuis metsHdr
    Given preservationPackingList.xml valide en XSD et Schematron
    When le système lit le bloc metsHdr
    Then les valeurs suivantes sont extraites et disponibles pour la Phase 2 :
      packageProfile (depuis metsHdr.AnyAttr cpp:packageProfile),
      creator (depuis l'agent avec ROLE=CREATOR),
      archiveTitle (depuis archiveTitle)

  Scenario: Accumulation des erreurs sans arrêt prématuré
    Given un preservationPackingList.xml avec plusieurs erreurs XSD et Schematron
    When la validation s'exécute
    Then toutes les erreurs sont accumulées dans la liste des CheckSummaryItems
    And la validation ne s'arrête pas à la première erreur rencontrée
```

### Story 2.2 : Validation des fichiers descMD et digiprovMD top-level

En tant que **Media Manager / CC**,
Je veux que le système vérifie la conformité de tous les fichiers de métadonnées XML du niveau racine du CPP,
Afin de détecter toute corruption, référence manquante ou non-conformité EBUCore/PREMIS avant d'accepter l'ingest.

**Acceptance Criteria :**

```gherkin
Feature: Validation descMD et digiprovMD top-level

  Scenario: Validation format href des fichiers descMD
    Given un preservationPackingList.xml référençant des fichiers descMD
    When le système vérifie chaque href
    Then tout fichier ne se trouvant pas dans le dossier metadata/ est signalé "failed"
    And tout fichier dont le nom ne commence pas par "descMD" est signalé "failed"
    And le CheckSummaryItem a pour titre "href Format Validation"

  Scenario: Validation existence, checksum et XSD EBUCore d'un fichier descMD
    Given un fichier descMD avec href valide
    When le système le valide
    Then l'existence sur le filesystem est vérifiée (failed si absent)
    And le checksum déclaré dans le XML est recalculé et comparé (MD5, SHA1 ou SHA256 selon déclaration)
    And le fichier est validé contre le schéma ebucore_1_6_fixed.xsd
    And les règles Schematron CaPPuSCHino EBUCore sont appliquées
    And un CheckSummaryItem est produit pour chacune de ces vérifications

  Scenario: Détection des fichiers descMD non référencés
    Given un dossier metadata/ contenant des fichiers descMD_*.xml
    When le système liste les fichiers présents et les compare aux références du METS
    Then tout fichier présent dans metadata/ mais absent du METS produit un CheckSummaryItem "failed"
    And le titre du CheckSummaryItem est "Unreferenced descMD files"

  Scenario: Validation des fichiers digiprovMD top-level
    Given un preservationPackingList.xml référençant des fichiers digiprovMD
    When le système valide chaque fichier digiprovMD
    Then le format href (dossier metadata/, préfixe digiprovMD) est vérifié
    And l'existence, le checksum et la conformité XSD premis-v3-0.xsd sont vérifiés
    And les fichiers digiprovMD présents mais non référencés dans le METS sont signalés

  Scenario: Algorithmes de checksum supportés
    Given un fichier XML déclarant un checksum avec algorithme MD5, SHA1 ou SHA256
    When le système calcule et compare le checksum
    Then MD5 est comparé en hex lowercase
    And SHA1 et SHA256 sont comparés en Base64 ou hex lowercase selon le format déclaré
```

### Story 2.3 : Validation de la structure et des sub-packages déclarés

En tant que **Media Manager / CC**,
Je veux que le système vérifie que tous les sous-dossiers du CPP sont correctement référencés et que chaque sub-package a un packing list valide,
Afin de détecter toute incohérence structurelle entre le METS et le contenu réel du dossier CPP.

**Acceptance Criteria :**

```gherkin
Feature: Validation structure et sub-packages

  Scenario: Vérification des packingList.xml de sub-packages
    Given un preservationPackingList.xml référençant des sub-packages
    When le système vérifie chaque sub-package référencé
    Then l'existence du packingList.xml de chaque sub-package est vérifiée
    And la taille déclarée est comparée à la taille réelle
    And le checksum déclaré est recalculé et comparé
    And un CheckSummaryItem est produit par sub-package

  Scenario: Détection des sous-dossiers non référencés dans le METS
    Given le dossier racine du CPP contenant plusieurs sous-dossiers
    When le système liste tous les sous-dossiers présents
    Then les dossiers metadata/, playlists/, ancillaryData/, checkerReports/ sont ignorés
    And tout autre sous-dossier absent du METS produit un CheckSummaryItem "failed"
    And le titre est "Unreferenced package subfolders"

  Scenario: Validation du format href de chaque sub-package
    Given les mptr.href référençant les sub-packages dans le METS
    When le système valide chaque href
    Then le format attendu {packageType}_{identifier}/packingList.xml est vérifié
    And packageType doit être l'un des types valides : image, sound, timedText, audiovisual, componentized, extra
    And tout href non conforme produit un CheckSummaryItem "failed" avec titre "href Format Validation"
```

### Story 2.4 : Vérification des métadonnées obligatoires par profil client

En tant que **Media Manager / CC**,
Je veux que le système vérifie que toutes les métadonnées obligatoires définies par le profil client sont bien renseignées dans les XML de chaque sub-package,
Afin de détecter dès la validation tout champ manquant ou vide avant que le CPP soit accepté dans mediaspot.

**Acceptance Criteria :**

```gherkin
Feature: Vérification métadonnées obligatoires par profil client

  Scenario: Détection d'un champ obligatoire manquant
    Given une request d'ingest CPP initialisée avec le profil client STUDIOCANAL
    And un sub-package dont un champ obligatoire (M) du profil est absent dans les XML
    When le système exécute la validation des métadonnées obligatoires
    Then un CheckSummaryItem status=failed est produit
    And le titre est "Mandatory Metadata Check"
    And la description identifie le nom du champ manquant et le sub-package concerné

  Scenario: Tous les champs obligatoires présents
    Given un sub-package avec tous les champs obligatoires du profil renseignés dans les XML
    When le système exécute la validation des métadonnées obligatoires
    Then un CheckSummaryItem status=pass est produit avec titre "Mandatory Metadata Check"

  Scenario: Profil client configurable
    Given un profil client STUDIOCANAL défini avec la liste des champs M du XLSX de référence
    And un profil client SND avec une liste différente
    When une request d'ingest est initialisée avec le profil STUDIOCANAL
    Then c'est la liste des champs M du profil STUDIOCANAL qui est appliquée à la vérification
    And non celle du profil SND

  Scenario: Accumulation avec les autres erreurs
    Given un sub-package avec plusieurs champs obligatoires manquants
    When la validation s'exécute
    Then un CheckSummaryItem failed est produit par champ manquant
    And ces erreurs s'accumulent avec tous les autres CheckSummaryItems de la Phase 1
```

### Story 2.5 : Validation des playlists et rapport final de validation

En tant que **Media Manager / CC**,
Je veux que le système valide les playlists du CPP et produise un rapport complet de validation,
Afin d'obtenir une décision définitive d'acceptation ou de rejet avec le détail exhaustif de toutes les erreurs trouvées.

**Acceptance Criteria :**

```gherkin
Feature: Validation playlists et rapport de validation

  Scenario: Validation du format FILEID des playlists
    Given un preservationPackingList.xml référençant des playlists dans playlistsDiv
    When le système vérifie les références fptr
    Then chaque FILEID doit correspondre au format playlist_{identifier}
    And tout FILEID non conforme produit un CheckSummaryItem "failed"
    And le titre est "Playlist fptr.FILEID Format Validation"

  Scenario: Détection des playlists non référencées
    Given un dossier playlists/ contenant des fichiers
    When le système compare les fichiers présents aux références du METS
    Then tout fichier dans playlists/ non référencé dans le METS produit un CheckSummaryItem "failed"
    And le titre est "Unreferenced package playlists"

  Scenario: Validation XSD de chaque playlist
    Given un fichier playlist référencé dans le METS
    When le système le valide
    Then il est validé contre le schéma st2067-3a-2016.xsd (SMPTE IMF CPL)
    And un CheckSummaryItem est produit avec titre "Playlist XSD Validation"

  Scenario: Rejet complet du CPP si au moins une erreur
    Given une session de validation terminée avec au moins un CheckSummaryItem status=failed
    When le système prend la décision finale
    Then le CPP est rejeté dans sa totalité
    And aucun asset n'est créé dans mediaspot
    And le rapport liste l'intégralité des CheckSummaryItems (pass et failed)

  Scenario: Génération du rapport de validation
    Given une session de validation terminée (quel que soit le résultat)
    When le rapport est généré
    Then il contient l'en-tête CPP :
      Package Creator, Package Creation Date, PreservationPackingList MD5,
      Archive Title, Package Profile, Organisation, Validation Date
    And il liste tous les sub-packages (nom, GUID, identifiants)
    And il présente le tableau complet des checks avec statut, titre et description des erreurs
    And il est disponible pour être attaché à l'asset CPP dans mediaspot
```

### Story 2.6 : Validation fileSec — checksums des fichiers media (post-upload, serveur)

> **Exécution post-upload uniquement** — cette story correspond à la partie `ignoreDataFolderItemChecksums=false` du CPP Checker. Elle s'exécute côté serveur après que l'upload du CPP complet est terminé. Les checks XML et structure de chaque sub-package (XSD, Schematron, TechMD, digiprovMD) sont couverts dans les stories 2.2 et 2.3 (pré-upload).

En tant que **Media Manager / CC**,
Je veux que le système vérifie l'existence, la taille et le checksum de chaque fichier media dans les sub-packages une fois le CPP uploadé,
Afin de garantir l'intégrité complète de tous les fichiers média avant d'accepter l'ingest dans mediaspot.

**Acceptance Criteria :**

```gherkin
Feature: Validation interne sub-package

  Scenario: Validation XSD et Schematron du packingList.xml d'un sub-package
    Given un sub-package avec un packingList.xml
    When le système le valide
    Then le fichier est validé contre mets_digitalPreservation.xsd
    And les règles Schematron CaPPuSCHino SubPackagePackingList.rules sont appliquées
    And le type du sub-package est extrait depuis structMap[TYPE=physical].div.TYPE

  Scenario: Validation TechMD pour sub-package de type image
    Given un sub-package de type image (DPX, TIFF ou EXR)
    When le système valide les fichiers de données contre le techMD déclaré
    Then le préfixe des noms de fichiers est vérifié contre le pattern déclaré
    And l'extension attendue (dpx, tiff, exr) est vérifiée
    And le nombre de chiffres du padding (ex: 7 pour 0000001) est vérifié
    And le premier index et le dernier index déclarés correspondent aux fichiers présents
    And toute non-conformité produit un CheckSummaryItem "failed" avec titre "TechMD Validation"

  Scenario: Validation du fileSec — existence, taille et checksum par fichier
    Given un sub-package avec son fileSec listant les fichiers data
    When le système valide chaque fichier déclaré
    Then l'existence de chaque fichier sur le filesystem est vérifiée
    And la taille réelle est comparée à la taille déclarée
    And le checksum est recalculé et comparé (1 checksum par fichier DPX individuel)
    And un CheckSummaryItem est produit par fichier en erreur

  Scenario: Détection des fichiers data non référencés dans le fileSec
    Given un dossier data/ d'un sub-package contenant des fichiers
    When le système compare les fichiers présents aux déclarations du fileSec
    Then tout fichier présent dans data/ mais absent du fileSec est signalé en "failed"

  Scenario: Validation des digiprovMD au niveau sub-package
    Given un sub-package référençant des fichiers digiprovMD dans son metadata/
    When le système les valide
    Then la même logique que pour les digiprovMD top-level est appliquée
      (format href, existence, checksum, XSD premis-v3-0.xsd, fichiers non référencés)
```

### Story 2.7 : Orchestration du split pré-upload / post-upload (drag & drop)

En tant que **Media Manager / CC**,
Je veux pouvoir déposer le dossier CPP complet par drag & drop sur l'interface mediaspot et que le système déclenche automatiquement toutes les vérifications possibles **avant** de commencer le transfert,
Afin de détecter et corriger les problèmes de structure, XML et métadonnées sans attendre que plusieurs TB soient transférés.

> **Note architecturale :** Ce split est aligné sur le flag `ignoreDataFolderItemChecksums` du CPP Checker de Yan Rocheteau. Les checks exécutables avec ce flag à `true` (tout sauf checksums des fichiers media dans data/) s'exécutent dans le navigateur pré-upload. Les checks additionnels avec ce flag à `false` (checksums data/) s'exécutent côté serveur post-upload. Ce mécanisme remplace et intègre l'ancienne notion d'«Online Checker» standalone.

**Acceptance Criteria :**

```gherkin
Feature: Validation pré-upload au drag & drop d'un dossier CPP

  Scenario: Déclenchement automatique de la validation pré-upload au drag & drop
    Given une coquille CPP existante dans mediaspot
    And l'interface mediaspot avec la zone de dépôt CPP
    When le CC dépose le dossier CPP complet par drag & drop sur cette zone
    Then le système déclenche immédiatement la validation pré-upload dans le navigateur
    And aucun fichier n'est encore transféré vers le serveur

  Scenario: Checks exécutés en pré-upload (équivalent ignoreDataFolderItemChecksums=true)
    Given un dossier CPP complet en cours de dépôt
    When la validation pré-upload s'exécute
    Then toutes les vérifications des Stories 2.1 à 2.5 sont exécutées :
      XSD, Schematron, structure, checksums des XML, TechMD, digiprovMD, playlists, métadonnées obligatoires
    And les checksums des fichiers media dans data/ de chaque sub-package sont ignorés
    And un CheckSummaryItem est produit pour chaque check exécuté

  Scenario: Blocage de l'upload si la validation pré-upload détecte des erreurs
    Given une validation pré-upload terminée avec au moins un CheckSummaryItem status=failed
    Then l'upload est bloqué — aucun fichier n'est transféré vers le serveur
    And le rapport d'erreurs est affiché à l'utilisateur dans l'interface
    And l'utilisateur peut corriger les erreurs et relancer un drag & drop

  Scenario: Démarrage de l'upload si la validation pré-upload est sans erreur
    Given une validation pré-upload terminée avec tous les CheckSummaryItems status=pass
    Then l'upload du dossier CPP complet démarre automatiquement vers le serveur

  Scenario: Déclenchement de la validation post-upload après upload complet
    Given un upload CPP terminé avec succès (pré-upload 100% OK)
    When tous les fichiers sont disponibles sur le serveur
    Then le système déclenche la validation post-upload (Story 2.6)
    And les checksums des fichiers media dans data/ sont calculés et vérifiés côté serveur
    And si un checksum est invalide, le CPP est rejeté et les fichiers uploadés sont supprimés

  Scenario: Rejet post-upload si checksums media invalides
    Given une validation post-upload avec au moins un checksum media invalide
    Then le CPP est rejeté dans sa totalité
    And les fichiers uploadés sont supprimés du serveur
    And le rapport complet (pré-upload + post-upload) est affiché et attachable à la coquille CPP
```

---

## Epic 3 : Pipeline d'ingest CPP dans la mediaspot

**Contexte :** Une fois la validation EN17650 réussie (Epic 2), les XML du CPP contiennent toutes les métadonnées nécessaires pour alimenter mediaspot : métadonnées éditoriales (EBUCore descMD), techniques (EBUCore techMD + MediaInfo) et de provenance (PREMIS digiprovMD). Il faut traduire cette structure CPP en hiérarchie d'assets mediaspot — un CPP parent avec ses assets enfants (ImageSequences, Audio, etc.) — sans ressaisie manuelle.

**Objectif :** Implémenter la Phase 2 de l'ingest : à partir d'un CPP 100% validé, créer automatiquement dans mediaspot l'asset CPP parent avec ses métadonnées header, tous les assets enfants avec leurs métadonnées issues des XML, établir les liens hiérarchiques, et attacher le rapport de validation à l'asset CPP.

**Périmètre inclus :**
- Déclenchement de la Phase 2 conditionné à un résultat de Phase 1 sans aucune erreur
- Création de l'asset CPP parent (type CppPackage) avec remplissage des champs header depuis les valeurs extraites en Phase 1
- Création d'un asset enfant par sub-package avec type déterminé par `packageType` (image → ImageSequence, sound → Audio, etc.)
- Alimentation des métadonnées des assets enfants depuis les XML EBUCore et PREMIS
- Gestion des séquences d'images à numérotation non contiguë (1 asset ImageSequence par plage contiguë)
- Association de chaque asset enfant au CPP parent dans la hiérarchie mediaspot
- Attachement du rapport de validation à la fiche de l'asset CPP

**Definition of Done :** Un CPP valide est intégralement ingéré dans mediaspot avec hiérarchie et métadonnées — sans intervention manuelle.

### Story 3.1 : Alimentation de la coquille CPP dans mediaspot après validation réussie

En tant que **Media Manager / CC**,
Je veux que le système alimente automatiquement la coquille CPP existante dans mediaspot uniquement si la validation est complète et sans erreur,
Afin de garantir qu'aucun CPP non conforme ne vienne peupler la mediaspot.

**Acceptance Criteria :**

```gherkin
Feature: Alimentation de la coquille CPP post-validation

  Scenario: Phase 2 déclenchée uniquement si Phase 1 est 100% OK
    Given une session de validation CPP terminée sur une coquille CPP existante
    When le système vérifie le résultat de la Phase 1
    Then si au moins un CheckSummaryItem a status=failed, la Phase 2 n'est pas exécutée
    And la coquille CPP reste vide dans mediaspot
    And si tous les CheckSummaryItems ont status=pass, la Phase 2 est déclenchée

  Scenario: Alimentation de la coquille CPP avec les métadonnées header
    Given une Phase 1 de validation 100% réussie sur une coquille CppPackage existante
    When le système exécute la Phase 2
    Then les champs header de la coquille sont renseignés depuis les valeurs extraites en Phase 1 :
      CppPackageProfile, CppPackageCreator, CppArchiveTitle, CppCreationDate
    And CppValidationDate est renseignée avec la date d'exécution de la validation

  Scenario: Rapport de validation attaché à la coquille CPP
    Given une Phase 2 complétée avec succès
    When le rapport est attaché
    Then le rapport de validation généré en Phase 1 est attaché à la fiche de la coquille CPP
    And le rapport est consultable depuis la fiche de l'asset dans mediaspot
```

### Story 3.2 : Création des assets enfants et construction de la hiérarchie complète

En tant que **Media Manager / CC**,
Je veux que le système crée automatiquement tous les assets enfants du CPP avec leurs métadonnées issues des XML EN17650 et les relie au CPP parent,
Afin d'avoir la hiérarchie complète `Title > Content > CPP > Assets` disponible dans mediaspot sans saisie manuelle.

**Acceptance Criteria :**

```gherkin
Feature: Création des assets enfants et hiérarchie CPP complète

  Scenario: Création d'un asset enfant pour chaque sub-package
    Given un asset CPP parent créé dans mediaspot
    And un CPP avec N sub-packages valides
    When le système crée les assets enfants
    Then un asset enfant est créé dans mediaspot pour chaque sub-package
    And le type de l'asset est déterminé par le packageType du sub-package
      (image → ImageSequence, sound → Audio, etc.)
    And les métadonnées de l'asset sont renseignées depuis les XML EBUCore (descMD, techMD) et PREMIS (digiprovMD)

  Scenario: Association des assets enfants au CPP parent
    Given des assets enfants créés pour un CPP
    When le système établit les liens hiérarchiques
    Then chaque asset enfant est associé à l'asset CPP parent
    And la hiérarchie Title > Content > CPP > Assets enfants est visible dans mediaspot

  Scenario: Gestion des séquences d'images à numérotation non contiguë
    Given un sub-package de type image dont les fichiers ont une numérotation non contiguë
    When le système crée les assets enfants
    Then chaque plage contiguë de frames est créée comme un asset ImageSequence distinct
    And chaque ImageSequence est associée au CPP parent

  Scenario: Intégrité de la hiérarchie complète après ingest
    Given un ingest CPP complet et réussi
    When on consulte mediaspot
    Then la hiérarchie Title > Content > CPP > ImageSequence(s) est intégralement créée
    And toutes les métadonnées des XML sont accessibles sur chaque asset
    And le rapport de validation est attaché à l'asset CPP
    And aucune intervention manuelle n'a été nécessaire
```

