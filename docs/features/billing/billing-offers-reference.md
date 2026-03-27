# Référence des Offres Billing Mediaspot

> **Document technique** - Synthèse des configurations billing extraites des fichiers JSON de production
> **Date de génération**: Mars 2026
> **Source**: `billing-config/*.json`

---

## 1. Vue d'ensemble des offres

### 1.1 Offres Cloud


| Offre        | Prix/mois | Engagement | Cloud | Cible                  |
| ------------ | --------- | ---------- | ----- | ---------------------- |
| **Archive**  | 1€        | Aucun      | Oui   | Archivage pur          |
| **Screener** | 29€       | Aucun      | Oui   | Diffusion de screeners |
| **Open**     | 199€      | Aucun      | Oui   | Petites structures     |
| **Advanced** | 299€      | Aucun      | Oui   | PME média              |
| **Premium**  | 499€      | Aucun      | Oui   | Gros volumes           |
| **Ultimate** | 999€      | Aucun      | Oui   | Enterprise             |


### 1.2 Offres On-Premise


| Offre       | Prix/mois | Engagement    | Cloud | Cible               |
| ----------- | --------- | ------------- | ----- | ------------------- |
| **Premium** | 14 900€   | 3 ans (1095j) | Non   | Grandes entreprises |


---

## 2. Utilisateurs inclus par offre

### 2.1 Cloud


| Offre    | Users Basic | Add. Basic | Users Admin | Add. Admin |
| -------- | ----------- | ---------- | ----------- | ---------- |
| Archive  | 1           | Bloqué     | 1           | Bloqué     |
| Screener | 10          | Bloqué     | 1           | Bloqué     |
| Open     | 20          | Bloqué     | 2           | Bloqué     |
| Advanced | 50          | Bloqué     | 3           | Bloqué     |
| Premium  | 10 000      | Bloqué     | 5           | Bloqué     |
| Ultimate | 10 000      | Bloqué     | 10          | Bloqué     |


### 2.2 On-Premise


| Offre   | Users Basic | Add. Basic | Users Admin | Add. Admin |
| ------- | ----------- | ---------- | ----------- | ---------- |
| Premium | 10 000      | +15€/user  | 10          | +25€/user  |


---

## 3. Licences et Fonctionnalités

### 3.1 Matrice Cloud


| Licence                    | Archive | Screener | Open   | Advanced | Premium | Ultimate | Prix option |
| -------------------------- | ------- | -------- | ------ | -------- | ------- | -------- | ----------- |
| TranscodingGenericBasket   | -       | -        | Inclus | Inclus   | Inclus  | Inclus   | 0€          |
| TranscodingByProfileBasket | -       | -        | -      | Inclus   | Inclus  | Inclus   | 0€          |
| BundleMakerCore            | -       | -        | -      | -        | -       | Inclus   | 0€          |
| BundleMakerMetadata        | -       | -        | -      | -        | -       | Inclus   | 0€          |
| WatermarkNexguard          | Option  | Option   | Option | Option   | Option  | Option   | 150€/mois   |
| YoutubeAntipiracy          | Option  | Option   | Option | Option   | Option  | Option   | 95€/mois    |
| DcpKDMFeature              | Option  | Option   | Option | Option   | Option  | Option   | 95€/mois    |
| DcpTranscoding             | Option  | Option   | Option | Option   | Option  | Option   | 50€/mois    |
| AWSConnector               | Option  | Option   | Option | Option   | Option  | Option   | 500€/mois   |
| ImageSequenceProxy         | Option  | Option   | Option | Option   | Option  | Option   | 50€/mois    |
| PlayerScreenshotHires      | Inclus  | Inclus   | Inclus | Inclus   | Inclus  | Inclus   | 0€          |


### 3.2 On-Premise Premium


| Licence                    | Inclus | Prix option |
| -------------------------- | ------ | ----------- |
| TranscodingGenericBasket   | Oui    | -           |
| TranscodingByProfileBasket | Oui    | -           |
| BundleMakerCore            | Oui    | -           |
| BundleMakerMetadata        | Oui    | -           |
| WatermarkNexguard          | Non    | 950€/mois   |
| YoutubeAntipiracy          | Non    | 95€/mois    |
| DcpKDMFeature              | Non    | 95€/mois    |
| DcpTranscoding             | Non    | 75€/mois    |


---

## 4. Tarification Transcodage

### 4.1 Transcode Generic (Cloud)

Prix identiques pour toutes les offres Cloud.


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 0,50€    |
| HD         | 0,70€    |
| UHD        | 1,30€    |
| 4K         | 1,30€    |
| Unknown    | 0,70€    |


**Multiplicateurs effets spéciaux (Cloud):**


| Effet         | Facteur |
| ------------- | ------- |
| HDR10         | x1.50   |
| Dolby Vision  | x1.50   |
| Frame Convert | x1.30   |


### 4.2 Transcode By Profile (Cloud)


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 0,95€    |
| HD         | 1,25€    |
| UHD        | 1,95€    |
| 4K         | 1,95€    |
| Unknown    | 1,25€    |


### 4.3 Transcode Bundle By Profile (Cloud)


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 1,20€    |
| HD         | 1,60€    |
| UHD        | 2,45€    |
| 4K         | 2,45€    |
| Unknown    | 1,60€    |


### 4.4 Transcode IMF (Cloud)


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 1,20€    |
| HD         | 1,60€    |
| UHD        | 2,45€    |
| 4K         | 2,45€    |
| Unknown    | 1,60€    |


### 4.5 On-Premise Premium


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 0,24€    |
| HD         | 0,44€    |
| UHD        | 0,89€    |
| 4K         | 0,89€    |
| Unknown    | 0,12€    |


**Multiplicateurs effets spéciaux (On-Prem):**


| Effet         | Facteur |
| ------------- | ------- |
| HDR10         | x1.55   |
| Dolby Vision  | x2.50   |
| Frame Convert | x1.30   |


**Prix de base par type d'ordre (On-Prem):**


| Type                       | Base Price |
| -------------------------- | ---------- |
| TranscodeGenericSingleFile | 5€         |
| TranscodeGeneric           | 5€         |
| TranscodeByProfile         | 45€        |
| TranscodeBundleByProfile   | 99€        |
| TranscodeIMF               | 24€        |
| AntipiracyYoutube          | 8,50€      |


---

## 5. Tarification Livraison (Delivery)

### 5.1 Cloud - Par destination


| Destination                                 | Prix/Mo  |
| ------------------------------------------- | -------- |
| Aspera (Faspex, P2P, Push, Dropbox, Shares) | 0,00018€ |
| Signiant P2P                                | 0,00018€ |
| S3, FTP, HTTP, SFTP                         | 0,00014€ |
| UNC                                         | 0,00022€ |


### 5.2 Cloud - Restore depuis Archive


| Paramètre        | Valeur   |
| ---------------- | -------- |
| Prix/Mo/jour     | 0,00005€ |
| Durée sur disque | 5 jours  |
| Prix restore/Mo  | 0,00005€ |


### 5.3 On-Premise Premium


| Paramètre            | Valeur              |
| -------------------- | ------------------- |
| Prix/Mo (delivery)   | 0,0002€             |
| Crédits inclus/jour  | 1 To (1 000 000 Mo) |
| Prix restore/Mo/jour | 0,0002€             |
| Durée sur disque     | 60 jours            |


---

## 6. Tarification Stockage

### 6.1 Cloud


| Type                                           | Prix/Mo     |
| ---------------------------------------------- | ----------- |
| Disk (Ingest, Staging, Work, Generated, Proxy) | 0€ (inclus) |
| Archive (Tape)                                 | 0,0000035€  |


> **Note**: Stockage disque inclus sans limite dans toutes les offres Cloud.

### 6.2 On-Premise Premium


| Type           | Prix/Mo   | Inclus |
| -------------- | --------- | ------ |
| Disk           | 0,000017€ | 200 To |
| Archive (Tape) | 0,000017€ | -      |


---

## 7. Streaming / Partage

### 7.1 Crédits Streaming mensuels (Cloud)


| Offre    | Crédits/mois | Prix unitaire |
| -------- | ------------ | ------------- |
| Archive  | 0            | 0€            |
| Screener | 250          | 0€            |
| Open     | 500          | 0€            |
| Advanced | 10 000       | 0€            |
| Premium  | 10 000       | 0€            |
| Ultimate | 10 000       | 0€            |


### 7.2 On-Premise


| Offre   | Crédits/mois | Prix unitaire |
| ------- | ------------ | ------------- |
| Premium | 10 000       | 0,75€         |


---

## 8. QC et Qualification

### 8.1 Cloud


| Service      | Base | Video     | Audio     | Subtitle  |
| ------------ | ---- | --------- | --------- | --------- |
| Qualify      | 0€   | 40€/unité | 20€/unité | 20€/unité |
| QualityCheck | 15€  | 0€        | 0€        | 0€        |


**QualityCheck - Tarifs par minute (Cloud):**


| Résolution | Full  | Video+2.0 | Video+5.1 |
| ---------- | ----- | --------- | --------- |
| SD         | 3,30€ | 2,10€     | 2,10€     |
| HD         | 3,30€ | 2,10€     | 2,10€     |
| UHD        | 4,10€ | 2,60€     | 2,60€     |
| 4K         | 4,10€ | 2,60€     | 2,60€     |


### 8.2 On-Premise


| Service      | Base | Prix/min |
| ------------ | ---- | -------- |
| Qualify      | 15€  | 0,11€    |
| QualityCheck | 99€  | 0,11€    |


---

## 9. Ingest

### 9.1 Cloud

**Ingest gratuit** pour toutes les offres Cloud (prix = 0€).

Types supportés: Video, Audio, Subtitle, DcpPackage, ImfPackage, ImageSequence.

### 9.2 On-Premise Premium


| Type          | Mezz | Non-Mezz | Seuil gratuit/an |
| ------------- | ---- | -------- | ---------------- |
| Video         | 40€  | 5€       | 4 200 unités     |
| Audio         | 25€  | 2€       | 0                |
| Subtitle      | 20€  | 1€       | 0                |
| DcpPackage    | -    | 11€      | 0                |
| ImfPackage    | -    | 11€      | 0                |
| ImageSequence | -    | 11€      | 0                |
| Unknown       | -    | 0,10€    | 0                |


**Facteurs résolution (Ingest On-Prem):**


| Résolution | Prix/min |
| ---------- | -------- |
| SD         | 0,00633€ |
| HD/UHD/4K  | 0,01266€ |


---

## 10. Autres services

### 10.1 Conversion sous-titres


| Environnement | Base  | Prix/Mo |
| ------------- | ----- | ------- |
| Cloud         | 5€    | 0€      |
| On-Prem       | 1,49€ | 0,0002€ |


---

## 11. Fiches détaillées par offre

### 11.1 Cloud Archive (1€/mois)

**Positionnement**: Offre minimale pour archivage uniquement.

- **Users**: 1 Basic + 1 Admin (non extensibles)
- **Streaming**: 0 crédits/mois
- **Features incluses**: PlayerScreenshotFromHires uniquement
- **Transcodage**: Disponible mais aucune licence incluse
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.2 Cloud Screener (29€/mois)

**Positionnement**: Diffusion de screeners pour validation.

- **Users**: 10 Basic + 1 Admin (non extensibles)
- **Streaming**: 250 crédits/mois
- **Features incluses**: PlayerScreenshotFromHires
- **Transcodage**: Disponible, aucune licence spéciale incluse
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.3 Cloud Open (199€/mois)

**Positionnement**: Entrée de gamme pour petites structures.

- **Users**: 20 Basic + 2 Admin (non extensibles)
- **Streaming**: 500 crédits/mois
- **Features incluses**:
  - TranscodingGenericBasketFeature
  - PlayerScreenshotFromHires
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.4 Cloud Advanced (299€/mois)

**Positionnement**: PME média avec besoins de transcodage avancé.

- **Users**: 50 Basic + 3 Admin (non extensibles)
- **Streaming**: 10 000 crédits/mois
- **Features incluses**:
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - PlayerScreenshotFromHires
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.5 Cloud Premium (499€/mois)

**Positionnement**: Gros volumes, nombreux utilisateurs.

- **Users**: 10 000 Basic + 5 Admin (non extensibles)
- **Streaming**: 10 000 crédits/mois
- **Features incluses**:
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - PlayerScreenshotFromHires
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.6 Cloud Ultimate (999€/mois)

**Positionnement**: Enterprise, toutes fonctionnalités.

- **Users**: 10 000 Basic + 10 Admin (non extensibles)
- **Streaming**: 10 000 crédits/mois
- **Features incluses**:
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
  - PlayerScreenshotFromHires
- **Stockage**: Disk gratuit, Archive à 0,0000035€/Mo

### 11.7 On-Premise Premium (14 900€/mois)

**Positionnement**: Grandes entreprises, infrastructure dédiée.

- **Engagement**: 3 ans minimum
- **Users**: 10 000 Basic + 10 Admin (extensibles à 15€/25€)
- **Inclus**:
  - 200 To stockage disque
  - 1 500 min processing/mois
  - 1 To transfert/jour
- **Features incluses**:
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
- **Tarifs réduits** sur transcodage vs Cloud

### 11.8 On-Premise CNC (Offre spéciale)

**Positionnement**: Offre sur mesure pour le CNC (Centre National du Cinéma).

- **Prix de base**: 0€/mois (facturation à l'usage uniquement)
- **Engagement**: Aucun
- **Users**: 20 Basic + 3 Admin (non extensibles)
- **Features incluses**:
  - Drive
  - TranscodingGenericBasketFeature
  - DcpKDMFeature
  - DcpTranscoding
  - ImageSequenceProxyTranscode
  - ShareScreening
  - PlayerScreenshotFromHires
  - CatalogManagement
- **Features en option**:
  - WatermarkNexguard: 150€/mois
  - YoutubeAntipiracy: 95€/mois
  - AWSConnector: 500€/mois
  - AccountManager: 1 500€/mois

**Particularités CNC:**

| Aspect | Valeur |
|--------|--------|
| Modèle transcodage | Par bitrate (PriceModelTranscodePerParameters) |
| Transcode <40 Mbps | 7€ / 15 min |
| Transcode 40-180 Mbps | 10,50€ / 15 min |
| Transcode >180 Mbps | 14€ / 15 min |
| Livraison Aspera/Http | 0,0001953€/Mo |
| Livraison FTP/SFTP/S3 | 0,0002734€/Mo |
| Livraison UNC | Gratuit |
| Stockage Disk | 0,0000143€/Mo |
| Stockage Archive | 0,0000086€/Mo |
| QualityCheck | Inclus (0€ base) |

**Services managés CNC (catalogue complet):**

| Service | Prix |
|---------|------|
| Intégration Mezzanine (¼h PGM) - UO 3.1 | 22€ |
| Intégration Maître image+son (¼h) - UO 3.2 | 88€ |
| Intégration Maître image (¼h) - UO 3.3 | 80€ |
| Intégration Maître audio - UO 3.4 | 38€ |
| Intégration DCP (¼h) - UO 3.5 | 16€ |
| Déchiffrement DCP avec DKDM (¼h) - UO 3.6 | 11€ |
| Intégration images - UO 3.7 | 0,80€ |
| Vérification visuelle sondage - UO 4.10/4.11 | 4€ |
| Vérification intégrale DCP - UO 4.12 | 60€ |
| Vérification intégrale Mezz - UO 4.13 | 24€ |
| Chiffrement DCP avec DKDM - UO 5.1 | 15€ |
| Travaux conteneur MXF/QT - UO 6.1 | 96€ |
| Extraction/création DCP - UO 6.2 | 160€ |
| Création DCP-PA - UO 6.3 | 88€ |
| Travaux conteneur Maître/IMF - UO 6.4 | 88€ |
| Réalisation carton - UO 8.1 | 36€ |
| Insertion carton - UO 8.2 | 20€ |
| Formation ½ journée - UO 13.1 | 180€ |
| Formation 1 journée - UO 13.2 | 315€ |
| Réversibilité dématérialisée (To) - UO 14.2 | 375€ |
| Développement simple (1j/h) - UO 15.1 | 682,50€ |
| Développement moyen (2j/h) - UO 15.2 | 1 725€ |
| Développement complexe (5j/h) - UO 15.3 | 4 762€ |
| Génération KDM | 10€ |
| Création Provider | 15€ |
| Création Request | 15€ |
| Setup personnalisé | 250€ |
| Ingest by VDM | 20€ |

### 11.9 Custom Newen (Offre personnalisée)

**Positionnement**: Configuration sur mesure pour le groupe Newen.

- **Pas de section global** (facturation pure à l'usage)
- **Utilise l'ancien namespace** (`VDM.AirLab.BillingService.Api`)

**Particularités Newen:**

| Aspect | Valeur |
|--------|--------|
| Livraison (tous types) | 0,00002€/Mo (très réduit) |
| Transcode SD | 0,24€/min |
| Transcode HD | 0,44€/min |
| Transcode UHD/4K | 0,89€/min |
| Multiplicateur HDR10 | x1.55 |
| Multiplicateur DoVi | x2.50 |
| Qualify | 45€ base, 0€/min |
| QualityCheck | 99€ base, 0,11€/min |
| InternalProxyTag | 0€ base, 0,11€/min |

**Ingest Newen (avec seuils):**

| Type | Prix Mezz | Prix Non-Mezz | Seuil gratuit/an |
|------|-----------|---------------|------------------|
| Video | 20€ | 5€ | 10 500 unités |
| Audio | 20€ | 5€ | 10 500 unités |
| Subtitle | 20€ | 5€ | 10 500 unités |
| Unknown | - | 5€ | 2 000 unités |

---

## 12. Points d'attention techniques

### 12.1 Différences Cloud vs On-Premise


| Aspect              | Cloud            | On-Premise                |
| ------------------- | ---------------- | ------------------------- |
| Prix transcodage    | Plus élevé       | Plus bas                  |
| Stockage disque     | Gratuit illimité | Inclus 200 To puis payant |
| Users additionnels  | Bloqués          | Payants                   |
| Engagement          | Aucun            | 3 ans                     |
| Ingest              | Gratuit          | Payant                    |
| Multiplicateur DoVi | x1.50            | x2.50                     |


### 12.2 Types de modèles de facturation

Le système utilise plusieurs types de `PriceModel`:

1. **PriceModelTranscodePerMinute** - Facturation à la minute par résolution
2. **PriceModelPerDeliverySize** - Facturation au Mo livré
3. **PriceModelPerSourceSize** - Facturation au Mo stocké
4. **PriceModelPerUnit** - Facturation à l'unité (streaming)
5. **PriceModelPerSourceObjectType** - Facturation par type d'objet
6. **PriceModelPerMediaDuration** - Facturation à la durée média
7. **PriceModelPerRestoreFromArchiveOnly** - Facturation restore archive
8. **PriceModelPerSourceRestoreSize** - Facturation taille restore
9. **PriceModelIngest** - Facturation ingest par type/conditions
10. **PriceModelMediaAnalysisPerMinute** - Facturation analyse média

### 12.3 Destinations de livraison supportées

- AsperaFaspex
- AsperaP2P
- AsperaPush
- AsperaDropbox
- AsperaP2PWithSSHKey
- AsperaShares
- SigniantP2P
- AmazonS3Upload
- FTP
- Http
- SFTP
- SFTPWithSSHKey
- UNC

### 12.4 Types de stockage

**Kinds**:

- Ingest
- Stagging (typo dans la config)
- StandardAndWork
- Generated
- ProxyTag
- ProxyOrLowResolution
- MiscOrMetadata
- Archive

**Accessibility**:

- Disk
- Tape

---

## 13. Annexes

### 13.1 Fichiers source


| Fichier                                           | Offre            |
| ------------------------------------------------- | ---------------- |
| `BillingPriceModel_default.json`                  | Prod (référence) |
| `BillingPriceModel_cloud_offer_archive.json`      | Cloud Archive    |
| `BillingPriceModel_cloud_offer_screener.json`     | Cloud Screener   |
| `BillingPriceModel_cloud_offer_open.json`         | Cloud Open       |
| `BillingPriceModel_cloud_offer_advanced.json`     | Cloud Advanced   |
| `BillingPriceModel_cloud_offer_premium.json`      | Cloud Premium    |
| `BillingPriceModel_cloud_offer_ultimate 1.json`   | Cloud Ultimate   |
| `BillingPriceModel_onprem_offer_premium.json`     | On-Prem Premium  |
| `BillingPriceModel_onprem_offer_cnc_updated.json` | On-Prem CNC      |
| `BillingPriceModel_Newen.json`                    | Custom Newen     |

---

## 14. Comparaison avec les documents de référence

### 14.1 Grille Tarifs MEDIASPOT CLOUD 2024 (Excel - Mars 2024)

Comparaison entre la grille tarifaire officielle et les configurations JSON.

#### Plans et abonnements

| Élément | Excel 2024 | JSON Config | Statut |
|---------|------------|-------------|--------|
| Archive | 1€/mois | 1€ | OK |
| Open | 199€/mois | 199€ | OK |
| Advanced | 299€/mois | 299€ | OK |
| Premium | 499€/mois | 499€ | OK |
| Ultimate | 999€/mois | 999€ | OK |

#### Users inclus

| Plan | Excel Users | Excel Admin | JSON Users | JSON Admin | Statut |
|------|-------------|-------------|------------|------------|--------|
| Archive | 0 | 0 | 1 | 1 | DIFF - Excel=0, JSON=1 |
| Open | 10 | 1 | 20 | 2 | DIFF - JSON plus généreux |
| Advanced | 20 | 3 | 50 | 3 | DIFF - JSON: 50 users vs Excel: 20 |
| Premium | 30 | 5 | 10 000 | 5 | DIFF - JSON: 10K users vs Excel: 30 |
| Ultimate | ∞ | 10 | 10 000 | 10 | DIFF - JSON: 10K vs Excel: illimité |

#### Transcodage

| Type | Résolution | Excel 2024 | JSON Config | Statut |
|------|------------|------------|-------------|--------|
| Transcode Generic | SD | 0,50€/min | 0,50€/min | OK |
| Transcode Generic | HD | 0,70€/min | 0,70€/min | OK |
| Transcode Generic | UHD/4K | 1,30€/min | 1,30€/min | OK |
| PAD (ByProfile) | SD | 0,95€/min | 0,95€/min | OK |
| PAD (ByProfile) | HD | 1,25€/min | 1,25€/min | OK |
| PAD (ByProfile) | UHD/4K | 1,95€/min | 1,95€/min | OK |
| Package VOD | SD | 1,20€/min | 1,20€/min | OK |
| Package VOD | HD | 1,60€/min | 1,60€/min | OK |
| Package VOD | UHD/4K | 2,45€/min | 2,45€/min | OK |

#### Multiplicateurs

| Effet | Excel 2024 | JSON Config | Statut |
|-------|------------|-------------|--------|
| Conversion cadence | x1.30 | x1.30 (frameStdConvert) | OK |
| Conversion format | x1.15 | Non présent | MANQUANT dans JSON |
| Dolby Vision / HDR-10 | x1.50 | x1.50 | OK |

#### Livraisons

| Type | Excel 2024 | JSON Config (€/Mo) | Statut |
|------|------------|-------------------|--------|
| FTP/SFTP | 0,14€/Go | 0,00014€/Mo (= 0,14€/Go) | OK |
| Aspera | 0,18€/Go | 0,00018€/Mo (= 0,18€/Go) | OK |
| Manuelle portail | 0,22€/Go | 0,00022€/Mo (UNC) | OK |
| Désarchivage | 0,05€/Go | 0,00005€/Mo (= 0,05€/Go) | OK |

#### Stockage

| Type | Excel 2024 | JSON Config | Statut |
|------|------------|-------------|--------|
| S3 Deep Archive | 0,0035€/Go/mois | 0,0000035€/Mo (= 0,0035€/Go) | OK |

#### Options mensuelles

| Option | Excel 2024 | JSON Config | Statut |
|--------|------------|-------------|--------|
| Marquage Nexguard | 150€/mois | 150€/mois | OK |
| DCP & KDM | 95€/mois | 95€/mois | OK |
| YouTube Antipiracy | 95€/mois | 95€/mois | OK |
| Proxy DCP/Séquence | 50€/mois | 50€/mois | OK |
| Connecteur AWS S3 | 500€/mois | 500€/mois | OK |
| Account Manager Dédié | 1 500€/mois | Non présent | MANQUANT dans JSON standard |

#### Services managés

| Service | Excel 2024 | JSON Config | Statut |
|---------|------------|-------------|--------|
| Qualification Mezz Image | 40€ | 40€ | OK |
| Qualification Mezz Audio | 30€ | 20€ | DIFF - JSON: 20€ vs Excel: 30€ |
| Qualification Mezz ST | 20€ | 20€ | OK |
| Mise aux normes UHD | 1,95€/min | Non présent | À IMPLÉMENTER |
| Mise aux normes SD-HD | 1,50€/min | Non présent | À IMPLÉMENTER |
| Mise aux normes Audio | 0,95€/min | Non présent | À IMPLÉMENTER |
| Mise aux normes ST | 25€/unité | Non présent | À IMPLÉMENTER |
| Setup personnalisé | 250€ | Non présent (sauf CNC) | À IMPLÉMENTER |
| Création request | 15€ | Non présent (sauf CNC) | À IMPLÉMENTER |
| Génération KDM | 10€ | Non présent (sauf CNC) | À IMPLÉMENTER |
| Création Provider | 15€ | Non présent (sauf CNC) | À IMPLÉMENTER |
| Formation ½ journée | 490€ | Non présent | À IMPLÉMENTER |

### 14.2 Billing Cloud Model v0.1 (PDF - Architecture)

Le PDF décrit l'**architecture conceptuelle** du système de billing. Voici l'analyse détaillée de conformité.

#### Principes architecturaux (Page 2)

| Principe PDF | Implémentation | Statut |
|--------------|----------------|--------|
| Applier = code générique sur dataset | Types `$type` polymorphiques | OK |
| Chaque ligne facture liée à sa preuve | Non vérifié (côté applicatif) | À VÉRIFIER |
| Calcul mensuel comme AWS | Non vérifié (côté applicatif) | À VÉRIFIER |
| Prix approximatif avant fin opération | Non vérifié (côté applicatif) | À VÉRIFIER |
| round() impacte le business sur gros volumes | Précision décimale variable dans JSON | ATTENTION |

#### Données nécessaires au calcul (Page 3)

| Donnée requise (PDF) | Champ JSON correspondant | Présent |
|----------------------|--------------------------|---------|
| Bitrate fichier | videoProfiles[].resolution | Indirect (résolution, pas bitrate) |
| Résolution fichier | videoProfiles[].resolution | OK |
| Taille fichier | pricePerMegabyte | OK |
| Durée média | pricePerMinute | OK |
| Type asset (Video/Audio/ST) | objectType dans PriceModelIngest | OK |
| Classe (Mezzanine) | mezz: true/false | OK |
| Machine processing time | machinePricePerMinute | OK |
| Dates workflow | Non présent dans config | RUNTIME |

#### Les 3 Stages de facturation (Page 4)

**Stage 1: INGEST (input)**

| Paramètre PDF | Implémentation JSON | Statut |
|---------------|---------------------|--------|
| Amount (quantité) | PriceModelIngest.objectTypes[].price | OK |
| Processing (transcode durée) | PriceModelTranscodePerMinute | OK |
| Machine time | machinePricePerMinute | OK |
| Third-part cost | Non explicite | IMPLICITE |
| Base price (Subtitle/Image) | basePrice dans orders | OK |
| Class (Mezzanine) | mezz: true/false avec prix différent | OK |

**Stage 2: STORAGE (middleware)**

| Paramètre PDF | Implémentation JSON | Statut |
|---------------|---------------------|--------|
| Hot storage (StandardAndWork) | storages[].kinds incluant "StandardAndWork" | OK |
| Cold storage (Archive) | storages[].kinds = ["Archive"] | OK |
| File Size billing | PriceModelPerSourceSize.pricePerMegabyte | OK |
| Accessibility Disk/Tape | storages[].accessibility | OK |

**Stage 3: ORDER (output)**

| Paramètre PDF | Implémentation JSON | Statut |
|---------------|---------------------|--------|
| Amount | basePrice par type d'order | OK |
| Complexity (processing stack) | Combinaison de models[] | OK |
| Transcode (media duration) | PriceModelTranscodePerMinute | OK |
| Machine time | machinePricePerMinute | OK |
| Third-part cost | Non explicite | IMPLICITE |
| Delivery Size (IO transfers) | PriceModelPerDeliverySize | OK |
| Restore Size (file movements) | PriceModelPerSourceRestoreSize | OK |
| Media shares (merged on orders) | Section shares[] séparée | DIFF - Shares séparés |

#### Types d'Appliers documentés (Page 5)

| Applier (PDF) | Présent JSON | Utilisé dans | Conformité |
|---------------|--------------|--------------|------------|
| PriceModelPerMediaDuration | Oui | Qualify, QualityCheck (On-Prem, Newen) | OK |
| PriceModelPerDeliverySize | Oui | Tous les orders (livraisons) | OK |
| PriceModelPerSourceSize | Oui | Stockage Disk et Archive | OK |
| PriceModelPerSourceRestoreSize | Oui | Restore depuis archive | OK |
| PriceModelPerRestoreFromArchiveOnly | Oui | Restore archive avec durée sur disque | OK |
| PriceModelTranscodePerMinute | Oui | Transcodage, Ingest, QualityCheck | OK |
| PriceModelMediaAnalysisPerMinute | Oui | Analyse média à l'ingest | OK |
| PriceModelIngest | Oui | Facturation ingest par type/classe | OK |

#### Types d'Appliers NON documentés dans le PDF (évolutions)

| Type | Description | Utilisé dans | Remarque |
|------|-------------|--------------|----------|
| PriceModelPerUnit | Facturation à l'unité | Streaming/Shares | Ajout post-PDF |
| PriceModelPerSourceObjectType | Par type d'objet source | Qualify, QualityCheck (Cloud) | Ajout post-PDF |
| PriceModelTranscodePerParameters | Facturation par bitrate | CNC uniquement | Modèle spécifique CNC |

#### Exemple de calcul (Pages 6-7)

Le PDF montre un exemple avec un asset Audio Mezzanine de 6058 secondes (~101 min).

**Config exemple (PDF):**
```json
{
  "mediaDurationInSeconds": 6058,
  "objectType": "Audio",
  "objectClass": "Mezz",
  "priceModels": [
    { "type": "PriceModelTranscodePerMinute", "price": 12.0 },
    { "type": "PriceModelMediaAnalysisPerMinute", "price": 0.0 },
    { "type": "PriceModelIngest", "price": 20.0 }
  ],
  "price": 32.0
}
```

**Vérification avec JSON Newen (tarifs similaires):**

| Calcul | Valeur PDF | Calcul théorique | Cohérence |
|--------|------------|------------------|-----------|
| Durée | 6058s = 100.97 min | - | - |
| Transcode Audio | 12€ | 100.97 × 0.12€ (Unknown) = 12.12€ | ~OK |
| Analysis | 0€ | Audio = pas d'analyse vidéo | OK |
| Ingest Mezz | 20€ | Prix fixe Mezz Audio = 20€ | OK |
| **Total** | **32€** | 12.12 + 0 + 20 = 32.12€ | ~OK |

**Tarifs utilisés (correspondance PDF → JSON):**

| Élément | PDF Page 7 | JSON On-Prem/Newen | Match |
|---------|------------|-------------------|-------|
| SD pricePerMinute | 0.24€ | 0.24€ | OK |
| HD pricePerMinute | 0.44€ | 0.44€ | OK |
| UHD pricePerMinute | 0.89€ | 0.89€ | OK |
| 4K pricePerMinute | 0.89€ | 0.89€ | OK |
| Unknown pricePerMinute | 0.12€ | 0.12€ | OK |
| HDR10 factor | 1.55 | 1.55 | OK |
| DoVi factor | 2.5 | 2.5 | OK |
| frameStdConvert | 1.0 | 1.0 (Newen) / 1.3 (autres) | DIFF |
| machinePricePerMinute | 0.00001€ | 0.00001€ | OK |

#### Écarts PDF vs Implémentation

| Aspect | Documentation PDF | Implémentation JSON | Impact |
|--------|-------------------|---------------------|--------|
| Shares | "merged on orders" | Section `shares[]` séparée | Architecture différente |
| frameStdConvert | 1.0 (exemple) | 1.3 (Cloud/On-Prem) ou 1.0 (Newen) | Incohérence tarifaire |
| Bitrate billing | Non mentionné | PriceModelTranscodePerParameters (CNC) | Évolution non documentée |
| Conditions metadata | Non mentionné | conditionByMetadata (CNC) | Évolution non documentée |
| Credits system | Non mentionné | credits.window/value | Évolution non documentée |
| Destinations filtering | Non mentionné | destinations[] par modèle | Évolution non documentée |

#### Recommandations de mise à jour documentaire

1. **Mettre à jour le PDF** avec les nouveaux types d'appliers
2. **Documenter le système de credits** (window: Day/Month, value)
3. **Documenter le filtrage par destinations** pour les livraisons
4. **Ajouter PriceModelTranscodePerParameters** pour le modèle CNC
5. **Clarifier la séparation Shares vs Orders** dans l'architecture

### 14.3 Synthèse des écarts

#### Écarts critiques (à corriger)

| Écart | Impact | Recommandation |
|-------|--------|----------------|
| Users inclus différents | Commercial | Aligner JSON sur grille Excel 2024 |
| Qualification Audio 20€ vs 30€ | Facturation | Vérifier prix officiel |
| Services managés absents | Fonctionnalité | Ajouter section `managedServices` |
| Coef conversion format x1.15 | Facturation | Ajouter dans `specialEffectFactors` |

#### Fonctionnalités CNC non généralisées

Le modèle CNC contient des fonctionnalités avancées non disponibles dans les offres standard:
- `managedServices` avec catalogue complet de services
- `PriceModelTranscodePerParameters` (facturation par bitrate)
- Conditions par metadata (`conditionByMetadata`)

#### Namespace hérité

Le fichier Newen utilise l'ancien namespace `VDM.AirLab.BillingService.Api` au lieu de `VDM.AirLab.Sdk.Core.Billing`. Migration recommandée.


