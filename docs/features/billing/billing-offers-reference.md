# Référence des Offres Billing Mediaspot

> **Document technique** - Synthèse des configurations billing extraites des fichiers JSON de production
> **Date de génération**: Mars 2026
> **Source**: `billing-config/V2/*.json` (Export infrastructure - Version courante)
> **Version précédente**: `billing-config/V1/*.json` (Archivé)

---

## 1. Vue d'ensemble des offres

### 1.1 Offres Cloud (V2)


| Offre        | Prix/mois | Engagement | Cloud | Cible                  | Changement V1→V2 |
| ------------ | --------- | ---------- | ----- | ---------------------- | ---------------- |
| **Archive**  | 1€        | Aucun      | Oui   | Archivage pur          | - |
| **Open**     | 199€      | Aucun      | Oui   | Petites structures     | - |
| **Advanced** | 199€      | Aucun      | Oui   | PME média              | **était 299€** |
| **Premium**  | 299€      | Aucun      | Oui   | Gros volumes           | **était 499€** |
| **Ultimate** | 499€      | Aucun      | Oui   | Enterprise             | **était 999€** |

> **Note V2**: L'offre Screener (29€) n'est plus présente dans les configurations V2.

### 1.2 Offres On-Premise (V2)


| Offre       | Prix/mois | Engagement    | Cloud | Cible               |
| ----------- | --------- | ------------- | ----- | ------------------- |
| **Premium** | 14 900€   | 3 ans (1095j) | Non   | Grandes entreprises |
| **CNC**     | 0€        | Aucun         | Non   | Centre National Cinéma |
| **IDC**     | 0€        | Aucun         | Non   | Variante CNC |

### 1.3 Offres Custom (V2)


| Offre         | Prix/mois | Cloud | Cible               |
| ------------- | --------- | ----- | ------------------- |
| **Newen**     | À l'usage | -     | Groupe Newen        |
| **SimuCloud** | 499€      | Non   | Simulation Cloud    |
| **Default**   | 99€       | Non   | Configuration base  |


---

## 2. Utilisateurs inclus par offre

### 2.1 Cloud (V2)


| Offre    | Users Basic | Add. Basic | Users Admin | Add. Admin | Changement V1→V2 |
| -------- | ----------- | ---------- | ----------- | ---------- | ---------------- |
| Archive  | 20          | Bloqué     | 3           | Bloqué     | **était 1+1** |
| Open     | 20          | Bloqué     | 2           | Bloqué     | - |
| Advanced | 50          | Bloqué     | 3           | Bloqué     | - |
| Premium  | 30          | Bloqué     | 5           | Bloqué     | **était 10000** |
| Ultimate | 10 000      | Bloqué     | 10          | Bloqué     | - |


### 2.2 On-Premise (V2)


| Offre   | Users Basic | Add. Basic | Users Admin | Add. Admin |
| ------- | ----------- | ---------- | ----------- | ---------- |
| Premium | 10 000      | +15€/user  | 10          | +25€/user  |
| CNC     | 100         | Bloqué     | 10          | Bloqué     |
| IDC     | 20          | Bloqué     | 3           | Bloqué     |

### 2.3 Custom (V2)


| Offre     | Users Basic | Add. Basic | Users Admin | Add. Admin |
| --------- | ----------- | ---------- | ----------- | ---------- |
| SimuCloud | 10 000      | +15€/user  | 10          | +25€/user  |
| Default   | 10          | +15€/user  | 1           | Bloqué     |


---

## 3. Licences et Fonctionnalités

### 3.1 Matrice Cloud (V2)


| Licence                    | Archive | Open   | Advanced | Premium | Ultimate | Prix option | Nouveau V2 |
| -------------------------- | ------- | ------ | -------- | ------- | -------- | ----------- | ---------- |
| Drive                      | Inclus  | Inclus | Inclus   | Inclus  | Inclus   | 0€          | **OUI** |
| CatalogManagement          | Inclus  | Inclus | Inclus   | Inclus  | Inclus   | 0€          | **OUI** |
| CatalogReporting           | Inclus  | -      | -        | Inclus  | Inclus   | 0€          | **OUI** |
| ShareScreening             | Option  | -      | Option   | Inclus  | Inclus   | 19€/mois    | **OUI** |
| QuoteManagement            | Option  | -      | -        | -       | Inclus   | 25€/mois    | **OUI** |
| TranscodingGenericBasket   | -       | Inclus | Inclus   | Inclus  | Inclus   | 0€          | |
| TranscodingByProfileBasket | -       | -      | -        | Inclus  | Inclus   | 0€          | |
| BundleMakerCore            | -       | -      | -        | Inclus  | Inclus   | 0€          | |
| BundleMakerMetadata        | -       | -      | -        | Inclus  | Inclus   | 0€          | |
| IngestMeasureAudioLoudness | -       | -      | -        | Inclus  | Inclus   | 0€          | **OUI** |
| HDRDoViOutputTranscoding   | -       | -      | -        | Inclus  | Inclus   | 0€          | **OUI** |
| WatermarkNexguard          | Option  | Option | Option   | Option  | Option   | 150€/mois   | |
| YoutubeAntipiracy          | Option  | Option | Option   | Option  | Option   | 95€/mois    | |
| DcpKDMFeature              | Option  | Option | Option   | Option  | Option   | 95€/mois    | |
| DcpTranscoding             | Option  | Option | Option   | Option  | Option   | 50€/mois    | |
| AWSConnector               | Option  | Option | Option   | Option  | Option   | 500€/mois   | |
| ImageSequenceProxy         | Option  | Option | Option   | Option  | Option   | 50€/mois    | |
| AccountManager             | Option  | Option | Option   | Option  | Inclus   | 1500€/mois  | **OUI** |
| PlayerScreenshotHires      | Inclus  | Inclus | Inclus   | Inclus  | Inclus   | 0€          | |


### 3.2 On-Premise Premium (V2)


| Licence                    | Inclus | Prix option |
| -------------------------- | ------ | ----------- |
| Drive                      | Oui    | -           |
| CatalogManagement          | Oui    | -           |
| TranscodingGenericBasket   | Oui    | -           |
| TranscodingByProfileBasket | Oui    | -           |
| BundleMakerCore            | Oui    | -           |
| BundleMakerMetadata        | Oui    | -           |
| IngestMeasureAudioLoudness | Oui    | -           |
| WatermarkNexguard          | Non    | 950€/mois   |
| YoutubeAntipiracy          | Non    | 95€/mois    |
| DcpKDMFeature              | Non    | 95€/mois    |
| DcpTranscoding             | Non    | 75€/mois    |

### 3.3 On-Premise CNC (V2)


| Licence                    | Inclus | Prix option |
| -------------------------- | ------ | ----------- |
| Drive                      | Oui    | -           |
| TranscodingGenericBasket   | Oui    | -           |
| DcpKDMFeature              | Oui    | -           |
| DcpTranscoding             | Oui    | -           |
| ImageSequenceProxyTranscode| Oui    | -           |
| ShareScreening             | Oui    | -           |
| PlayerScreenshotFromHires  | Oui    | -           |
| CatalogManagement          | Oui    | -           |
| CatalogReporting           | Oui    | -           |
| WatermarkNexguard          | Non    | 150€/mois   |
| YoutubeAntipiracy          | Non    | 95€/mois    |
| AWSConnector               | Non    | 500€/mois   |
| AccountManager             | Non    | 1500€/mois  |


---

## 4. Tarification Transcodage

### 4.1 Transcode Generic (Cloud V2)

Prix identiques pour toutes les offres Cloud.


| Résolution | Prix/min | Nouveau V2 |
| ---------- | -------- | ---------- |
| SD         | 0,50€    | |
| HD         | 0,70€    | |
| HDReady    | 0,60€    | **OUI** |
| UHD        | 1,30€    | |
| 4K         | 1,30€    | |
| Unknown    | 0,70€    | |


**Multiplicateurs effets spéciaux (Cloud V2):**


| Effet         | Facteur | Nouveau V2 |
| ------------- | ------- | ---------- |
| HDR10         | x1.50   | |
| Dolby Vision  | x1.50   | |
| Frame Convert | x1.30   | |
| Proxy Source  | x0.30   | **OUI** |


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

### 6.1 Cloud (V2) - **CHANGEMENT MAJEUR**


| Type                                           | Prix/Mo      | Changement V1→V2 |
| ---------------------------------------------- | ------------ | ---------------- |
| Disk (Ingest, Staging, Work, Generated, Proxy) | 0,000035€    | **était GRATUIT** |
| Archive (Tape)                                 | 0,0000035€   | - |


> **ATTENTION V2**: Le stockage disque est maintenant PAYANT à 0,000035€/Mo (soit 0,035€/Go ou ~35€/To/mois).

### 6.2 On-Premise Premium (V2)


| Type           | Prix/Mo   | Inclus |
| -------------- | --------- | ------ |
| Disk           | 0,000017€ | 200 To |
| Archive (Tape) | 0,000017€ | -      |

### 6.3 On-Premise CNC (V2)


| Type           | Prix/Mo         | Condition |
| -------------- | --------------- | --------- |
| Disk           | 0,0000143€      | Par metadata sysStorageTier=Disk |
| Archive (Tape) | 0,0000086€      | Par metadata sysStorageTier=Archive |

### 6.4 SimuCloud (V2)


| Type           | Prix/Mo      |
| -------------- | ------------ |
| Disk           | 0,000035€    |
| Archive (Tape) | 0,0000035€   |


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

### 8.1 Cloud (V2)


| Service      | Base | Video     | Audio     | Subtitle  | Changement V1→V2 |
| ------------ | ---- | --------- | --------- | --------- | ---------------- |
| Qualify      | 0€   | 40€/unité | 30€/unité | 20€/unité | Audio **était 20€** |
| QualityCheck | 15€  | 0€        | 0€        | 0€        | - |


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

### 9.1 Cloud (V2) - **CHANGEMENT MAJEUR**

**L'ingest est maintenant PAYANT** dans les configurations V2.

**Proxy generation (génération de proxy à l'ingest):**

| Résolution | Prix/min | Changement V1→V2 |
| ---------- | -------- | ---------------- |
| Toutes     | 0,01€    | **était GRATUIT** |

**Ingest Mezzanine (assets Mezz):**

| Type     | Prix/unité | Changement V1→V2 |
| -------- | ---------- | ---------------- |
| Video    | 40€        | **était GRATUIT** |
| Audio    | 30€        | **était GRATUIT** |
| Subtitle | 20€        | **était GRATUIT** |

> **ATTENTION V2**: L'ingest Cloud qui était gratuit devient payant. Ceci impacte significativement les coûts pour les clients avec beaucoup d'ingest.

### 9.2 On-Premise Premium (V2)


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

### 9.3 On-Premise CNC (V2)

**Ingest gratuit** (proxy et analyse à 0€)

| Type     | Mezz | Non-Mezz |
| -------- | ---- | -------- |
| Video    | 40€  | 0€       |
| Audio    | 30€  | 0€       |
| Subtitle | 20€  | 0€       |
| Autres   | -    | 0€       |

### 9.4 SimuCloud (V2)

**Ingest gratuit** pour Mezz et non-Mezz (tous types à 0€)

**Proxy generation:** 0,01€/min (toutes résolutions)


---

## 10. Autres services

### 10.1 Conversion sous-titres


| Environnement | Base  | Prix/Mo |
| ------------- | ----- | ------- |
| Cloud         | 5€    | 0€      |
| On-Prem       | 1,49€ | 0,0002€ |


---

## 11. Fiches détaillées par offre (V2)

### 11.1 Cloud Archive (1€/mois)

**Positionnement**: Offre minimale pour archivage uniquement.

- **Users**: 20 Basic + 3 Admin (non extensibles) - **V2: était 1+1**
- **Streaming**: 10 000 crédits/mois
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - CatalogReporting (NOUVEAU)
  - PlayerScreenshotFromHires
- **Options**:
  - ShareScreening: 19€/mois
  - QuoteManagement: 25€/mois
- **Transcodage**: Disponible mais aucune licence spéciale incluse
- **Stockage V2**: Disk **PAYANT** 0,000035€/Mo, Archive à 0,0000035€/Mo
- **Ingest V2**: Proxy 0,01€/min, Mezz Video=40€, Audio=30€, ST=20€
- **managedServices**: Section complète disponible

### 11.2 Cloud Open (199€/mois)

**Positionnement**: Entrée de gamme pour petites structures.

- **Users**: 20 Basic + 2 Admin (non extensibles)
- **Streaming**: 500 crédits/mois
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - TranscodingGenericBasketFeature
  - PlayerScreenshotFromHires
- **Stockage V2**: Disk **PAYANT** 0,000035€/Mo, Archive à 0,0000035€/Mo
- **Ingest V2**: Proxy 0,01€/min, Mezz payant

### 11.3 Cloud Advanced (199€/mois) - **V2: prix réduit de 299€**

**Positionnement**: PME média avec besoins de transcodage avancé.

- **Users**: 50 Basic + 3 Admin (non extensibles)
- **Streaming**: 10 000 crédits/mois
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - TranscodingGenericBasketFeature
  - PlayerScreenshotFromHires
- **Options**:
  - ShareScreening: 19€/mois
  - AccountManager: 1500€/mois
- **Note V2**: TranscodingByProfileBasket n'est plus inclus
- **Stockage V2**: Disk **PAYANT** 0,000035€/Mo, Archive à 0,0000035€/Mo
- **Ingest V2**: Proxy 0,01€/min, Mezz payant

### 11.4 Cloud Premium (299€/mois) - **V2: prix réduit de 499€**

**Positionnement**: Gros volumes avec fonctionnalités avancées.

- **Users**: 30 Basic + 5 Admin (non extensibles) - **V2: était 10000 Basic**
- **Streaming**: 10 000 crédits/mois
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - CatalogReporting (NOUVEAU)
  - IngestMeasureAudioLoudness (NOUVEAU)
  - HDRDoViOutputTranscoding (NOUVEAU)
  - ShareScreening (NOUVEAU)
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
  - PlayerScreenshotFromHires
- **Stockage V2**: Disk **PAYANT** 0,000035€/Mo, Archive à 0,0000035€/Mo
- **Ingest V2**: Proxy 0,01€/min, Mezz payant

### 11.5 Cloud Ultimate (499€/mois) - **V2: prix réduit de 999€**

**Positionnement**: Enterprise, toutes fonctionnalités.

- **Users**: 10 000 Basic + 10 Admin (non extensibles)
- **Streaming**: 10 000 crédits/mois
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - CatalogReporting (NOUVEAU)
  - IngestMeasureAudioLoudness (NOUVEAU)
  - HDRDoViOutputTranscoding (NOUVEAU)
  - ShareScreening (NOUVEAU)
  - QuoteManagement (NOUVEAU)
  - AccountManager (NOUVEAU)
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
  - PlayerScreenshotFromHires
- **Stockage V2**: Disk **PAYANT** 0,000035€/Mo, Archive à 0,0000035€/Mo
- **Ingest V2**: Proxy 0,01€/min, Mezz payant

### 11.6 On-Premise Premium (14 900€/mois)

**Positionnement**: Grandes entreprises, infrastructure dédiée.

- **Engagement**: 3 ans minimum (1095 jours)
- **Users**: 10 000 Basic + 10 Admin (extensibles à 15€/25€)
- **Inclus**:
  - 200 To stockage disque
  - 1 500 min processing/mois
  - 1 To transfert/jour
- **Features incluses (V2)**:
  - Drive (NOUVEAU)
  - CatalogManagement (NOUVEAU)
  - IngestMeasureAudioLoudness (NOUVEAU)
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
- **Tarifs transcodage**: SD=0,24€, HD=0,44€, UHD/4K=0,89€/min
- **Multiplicateurs**: HDR10=x1.55, DoVi=x2.50, Frame=x1.30

### 11.7 On-Premise CNC (Offre spéciale)

**Positionnement**: Offre sur mesure pour le CNC (Centre National du Cinéma).

- **Prix de base**: 0€/mois (facturation à l'usage uniquement)
- **Engagement**: Aucun
- **Users**: 100 Basic + 10 Admin (non extensibles)
- **Features incluses**:
  - Drive
  - TranscodingGenericBasketFeature
  - DcpKDMFeature
  - DcpTranscoding
  - ImageSequenceProxyTranscode
  - ShareScreening
  - PlayerScreenshotFromHires
  - CatalogManagement
  - CatalogReporting
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

### 11.8 On-Premise IDC (V2 - NOUVEAU)

**Positionnement**: Variante CNC avec modèle de tarification standard.

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
  - CatalogReporting
- **Différence avec CNC**: Utilise PriceModelTranscodePerMinute (pas par bitrate)

**Tarifs IDC:**

| Aspect | Valeur |
|--------|--------|
| Transcode SD | 0,24€/min |
| Transcode HD | 0,44€/min |
| Transcode UHD/4K | 0,89€/min |
| Livraison Aspera/Http | 0,0001953€/Mo |
| Livraison FTP/SFTP/S3 | 0,0002734€/Mo |
| Livraison UNC | Gratuit |
| Stockage Disk | 0,0000143€/Mo |
| Stockage Archive | 0,0000086€/Mo |

### 11.9 Custom SimuCloud Premium (V2 - NOUVEAU)

**Positionnement**: Offre On-Prem simulant le comportement Cloud.

- **Prix de base**: 499€/mois
- **Cloud**: false (mais simule le comportement Cloud)
- **Engagement**: Aucun
- **Users**: 10 000 Basic + 10 Admin (extensibles à 15€/25€)
- **Features incluses**:
  - Drive
  - HDRDoViOutputTranscoding
  - TranscodingGenericBasketFeature
  - TranscodingByProfileBasketFeature
  - BundleMakerCore
  - BundleMakerMetadata
  - PlayerScreenshotFromHires

**Particularités SimuCloud:**

| Aspect | Valeur |
|--------|--------|
| Transcode Generic SD | 0,50€/min |
| Transcode Generic HD | 0,70€/min |
| Transcode Generic UHD/4K | 1,30€/min |
| Transcode ByProfile SD | 0,95€/min |
| Transcode ByProfile HD | 1,25€/min |
| Transcode ByProfile UHD/4K | 1,95€/min |
| Transcode Bundle SD | 1,20€/min |
| Transcode Bundle HD | 1,60€/min |
| Transcode Bundle UHD/4K | 2,45€/min |
| Multiplicateur HDR10/DoVi | x1.50 |
| Stockage Disk | 0,000035€/Mo |
| Stockage Archive | 0,0000035€/Mo |

**Livraison par destination (SimuCloud):**

| Destination | Prix/Mo |
|-------------|---------|
| Aspera/Signiant | 0,00018€ |
| FTP/SFTP/S3 | 0,00014€ |
| UNC | 0,00022€ |

**Qualify/QC SimuCloud (par type d'objet + durée):**

| Service | Video | Audio | Subtitle | + par min (SD/HD) | + par min (UHD/4K) |
|---------|-------|-------|----------|-------------------|-------------------|
| Qualify | 40€ | 30€ | 20€ | - | - |
| QC (Full) | 0€ | 0€ | 0€ | 3,30€ | 4,10€ |
| QC (Video+Audio) | 0€ | 0€ | 0€ | 2,10€ | 2,60€ |

### 11.10 Custom Newen (Offre personnalisée)

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

### 11.11 Default (Configuration de base)

**Positionnement**: Configuration par défaut / référence.

- **Prix de base**: 99€/mois
- **offerName**: "Prod"
- **Users**: 10 Basic + 1 Admin (Admin bloqué)
- **Features**: Uniquement WatermarkNexguard en option (950€)

**Tarifs Default:**

| Aspect | Valeur |
|--------|--------|
| Transcode SD | 0,24€/min |
| Transcode HD | 0,44€/min |
| Transcode UHD/4K | 0,89€/min |
| Streaming | 200 crédits/mois, 0,75€/unité au-delà |
| Stockage Disk | 0,000017€/Mo |
| Stockage Archive | 0,000017€/Mo |

---

## 12. Points d'attention techniques

### 12.1 Différences Cloud vs On-Premise (V2)


| Aspect              | Cloud V2                  | On-Premise                |
| ------------------- | ------------------------- | ------------------------- |
| Prix transcodage    | Plus élevé                | Plus bas                  |
| Stockage disque     | **PAYANT** (0,000035€/Mo) | Inclus 200 To puis payant |
| Users additionnels  | Bloqués                   | Payants                   |
| Engagement          | Aucun                     | 3 ans                     |
| Ingest              | **PAYANT** (proxy+mezz)   | Payant                    |
| Multiplicateur DoVi | x1.50                     | x2.50                     |
| Nouvelles licences  | Drive, Catalog*, Share... | Drive, Catalog...         |


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

### 13.1 Fichiers source V2 (Version courante)


| Fichier V2                                              | Offre            |
| ------------------------------------------------------- | ---------------- |
| `V2/BillingPriceModel_cloud_offer_archive 1.json`       | Cloud Archive    |
| `V2/BillingPriceModel_cloud_offer_open 1.json`          | Cloud Open       |
| `V2/BillingPriceModel_cloud_offer_advanced 1.json`      | Cloud Advanced   |
| `V2/BillingPriceModel_cloud_offer_premium 1.json`       | Cloud Premium    |
| `V2/BillingPriceModel_cloud_offer_ultimate 2.json`      | Cloud Ultimate   |
| `V2/BillingPriceModel_onprem_offer_premium 1.json`      | On-Prem Premium  |
| `V2/BillingPriceModel_onprem_offer_cnc.json`            | On-Prem CNC      |
| `V2/BillingPriceModel_onprem_offer_idc.json`            | On-Prem IDC      |
| `V2/BillingPriceModel_SimuCloud_offer_premium.json`     | SimuCloud        |
| `V2/BillingPriceModel_Newen 1.json`                     | Custom Newen     |
| `V2/BillingPriceModel_default 1.json`                   | Default/Prod     |

### 13.2 Fichiers source V1 (Archive)


| Fichier V1                                              | Offre            |
| ------------------------------------------------------- | ---------------- |
| `V1/BillingPriceModel_default.json`                     | Prod (référence) |
| `V1/BillingPriceModel_cloud_offer_archive.json`         | Cloud Archive    |
| `V1/BillingPriceModel_cloud_offer_screener.json`        | Cloud Screener   |
| `V1/BillingPriceModel_cloud_offer_open.json`            | Cloud Open       |
| `V1/BillingPriceModel_cloud_offer_advanced.json`        | Cloud Advanced   |
| `V1/BillingPriceModel_cloud_offer_premium.json`         | Cloud Premium    |
| `V1/BillingPriceModel_cloud_offer_ultimate 1.json`      | Cloud Ultimate   |
| `V1/BillingPriceModel_onprem_offer_premium.json`        | On-Prem Premium  |
| `V1/BillingPriceModel_onprem_offer_cnc_updated.json`    | On-Prem CNC      |
| `V1/BillingPriceModel_Newen.json`                       | Custom Newen     |

### 13.3 Résumé des changements majeurs V1 → V2

| Changement | V1 | V2 | Impact |
|------------|----|----|--------|
| Prix Advanced | 299€ | 199€ | **-33%** |
| Prix Premium | 499€ | 299€ | **-40%** |
| Prix Ultimate | 999€ | 499€ | **-50%** |
| Users Premium | 10 000 Basic | 30 Basic | **-99.7%** |
| Users Archive | 1 Basic + 1 Admin | 20 Basic + 3 Admin | **+1900%** |
| Stockage Disk Cloud | Gratuit | 0,000035€/Mo | **Nouveau coût** |
| Ingest proxy Cloud | Gratuit | 0,01€/min | **Nouveau coût** |
| Ingest Mezz Cloud | Gratuit | 40€/30€/20€ | **Nouveau coût** |
| Qualify Audio | 20€ | 30€ | **+50%** |
| Nouvelles licences | - | Drive, Catalog*, Share, Quote, Account | **Ajouts** |
| Nouvelle résolution | - | HDReady (0,60€) | **Ajout** |
| Nouveau facteur | - | proxySource (x0.30) | **Ajout** |
| Section managedServices | CNC uniquement | Tous | **Généralisé** |
| Offre Screener | 29€ | Supprimée | **Retrait** |
| Nouvelles offres | - | IDC, SimuCloud | **Ajouts** |

---

## 14. Comparaison avec les documents de référence

### 14.1 Grille Tarifs MEDIASPOT CLOUD 2024 (Excel - Mars 2024)

Comparaison entre la grille tarifaire officielle et les configurations JSON V2.

#### Plans et abonnements

| Élément | Excel 2024 | JSON V2 | Statut |
|---------|------------|---------|--------|
| Archive | 1€/mois | 1€ | OK |
| Open | 199€/mois | 199€ | OK |
| Advanced | 299€/mois | **199€** | **DIFF - V2 moins cher** |
| Premium | 499€/mois | **299€** | **DIFF - V2 moins cher** |
| Ultimate | 999€/mois | **499€** | **DIFF - V2 moins cher** |

> **Note**: Les prix V2 sont inférieurs à la grille Excel 2024. Vérifier si une nouvelle grille tarifaire existe.

#### Users inclus

| Plan | Excel Users | Excel Admin | JSON V2 Users | JSON V2 Admin | Statut |
|------|-------------|-------------|---------------|---------------|--------|
| Archive | 0 | 0 | **20** | **3** | **DIFF - V2 généreux** |
| Open | 10 | 1 | 20 | 2 | DIFF - JSON plus généreux |
| Advanced | 20 | 3 | 50 | 3 | DIFF - JSON plus généreux |
| Premium | 30 | 5 | **30** | 5 | **OK - V2 aligné** |
| Ultimate | ∞ | 10 | 10 000 | 10 | DIFF - JSON: 10K vs Excel: illimité |

> **Note V2**: Premium est maintenant aligné avec l'Excel (30 users vs 10000 en V1).

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

| Option | Excel 2024 | JSON V2 | Statut |
|--------|------------|---------|--------|
| Marquage Nexguard | 150€/mois | 150€/mois | OK |
| DCP & KDM | 95€/mois | 95€/mois | OK |
| YouTube Antipiracy | 95€/mois | 95€/mois | OK |
| Proxy DCP/Séquence | 50€/mois | 50€/mois | OK |
| Connecteur AWS S3 | 500€/mois | 500€/mois | OK |
| Account Manager Dédié | 1 500€/mois | **1500€/mois** | **OK - V2 ajouté** |

#### Services managés

| Service | Excel 2024 | JSON V2 | Statut |
|---------|------------|---------|--------|
| Qualification Mezz Image | 40€ | 40€ | OK |
| Qualification Mezz Audio | 30€ | **30€** | **OK - V2 corrigé** |
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

### 14.3 Synthèse des écarts V2

#### Écarts CORRIGÉS dans V2

| Écart | Était | Maintenant V2 | Statut |
|-------|-------|---------------|--------|
| Qualification Audio | 20€ | 30€ | **CORRIGÉ** |
| Users Premium Cloud | 10 000 | 30 | **CORRIGÉ (aligné Excel)** |
| Account Manager | Absent | 1500€/mois | **CORRIGÉ** |
| managedServices | CNC uniquement | Tous | **CORRIGÉ** |

#### Écarts restants (V2 vs Excel 2024)

| Écart | Excel 2024 | JSON V2 | Impact |
|-------|------------|---------|--------|
| Prix Advanced | 299€ | 199€ | **-33%** - Vérifier grille 2025 |
| Prix Premium | 499€ | 299€ | **-40%** - Vérifier grille 2025 |
| Prix Ultimate | 999€ | 499€ | **-50%** - Vérifier grille 2025 |
| Users Archive | 0 | 20+3 | **Généreux** - Intentionnel? |
| Coef conversion format | x1.15 | Absent | À ajouter si nécessaire |

#### Nouveautés V2 non documentées

| Fonctionnalité | Description | Impacte |
|----------------|-------------|---------|
| Storage Disk payant | 0,000035€/Mo | **Tous les clients Cloud** |
| Ingest payant | Proxy + Mezz | **Tous les clients Cloud** |
| Nouvelles licences | Drive, Catalog*, Share, Quote, Account | Nouvelles features |
| Nouvelle résolution | HDReady (0,60€/min) | Transcodage |
| Nouveau facteur | proxySource (x0.30) | Transcodage proxy |
| Offres ajoutées | IDC, SimuCloud | Nouveaux clients |
| Offre supprimée | Screener (29€) | Migration à prévoir |

#### Namespace hérité

Le fichier Newen utilise l'ancien namespace `VDM.AirLab.BillingService.Api` au lieu de `VDM.AirLab.Sdk.Core.Billing`. Migration recommandée.

---

## 15. Conclusion et recommandations

### 15.1 Points d'attention pour l'équipe technique

1. **Storage Disk Cloud maintenant payant** - Impacte tous les clients, à communiquer
2. **Ingest Cloud maintenant payant** - Impact significatif pour gros volumes
3. **Changements de prix** - Vérifier si nouvelle grille tarifaire existe
4. **Réduction drastique users Premium** - 10 000 → 30, peut impacter certains clients
5. **Suppression offre Screener** - Prévoir migration clients existants

### 15.2 Actions recommandées

- [ ] Vérifier existence d'une grille tarifaire 2025/2026
- [ ] Migrer le fichier Newen vers le nouveau namespace
- [ ] Documenter le nouveau modèle de facturation proxy (proxySource factor)
- [ ] Communiquer les changements de tarification aux équipes commerciales
- [ ] Mettre à jour la documentation PDF architecture avec les nouveaux types


