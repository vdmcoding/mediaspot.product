# Google Play - Specifications de livraison

## Formats

Google utilise des fichiers **CSV** (ou Excel) pour les metadonnees:

| Type | Extension | Description |
|------|-----------|-------------|
| Film | .csv / .xlsx | Metadata Film |
| TV (Series/Season/Episode) | .csv / .xlsx | Metadata TV avec hierarchie |

## Structure CSV

### Film - Colonnes

Une ligne par combinaison **Langue + Territoire**.

```csv
TitleLevel,TitleMgmtID,Language,Territory,Season Number,DisplayTitle,DisplayTitle_Territory,OriginalReleaseTitle,CopyrightYear,CopyrightLine,ORG,OriginalSummary_Short,LocalizedSummary_Short,LocalizedSummary_Medium,LocalizedSummary_Long,LocalizedSummary_Territory,PrimaryGenre,SecondaryGenres,SequenceNumber,OriginalReleaseDate,LocalizedReleaseDate_Type,RatingSystem_Rating_Reason,CountryOfOrigin,CastDisplayName_CharacterName_Role_BillingOrderNumber,CrewDisplayName_Role_BillingOrderNumber
```

### TV - Colonnes

Structure plus complexe avec sections separees pour:
- Metadata de base (Series/Season/Episode)
- Localisations
- Ratings

---

## Champs et Transformations - Film

### Identification

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `TitleLevel` | enum | `Title.classification.type` | Mapping |
| `Language` | locale | `Package.localized_content[].locale` | Format texte (Finnish (Finland)) |
| `Territory` | country | `Package.territories[]` | Nom complet (Finland) |
| `ORG` | string | `Package.identifiers.vendor_id` | Direct |

**Mapping TitleLevel:**
| mediaspot | Google |
|-----------|--------|
| `film` | "Feature" |
| `series` | "Series" |
| `season` | "Season" |
| `episode` | "Episode" |

**Mapping Language (exemples):**
| mediaspot | Google |
|-----------|--------|
| `da-DK` | "Danish (Denmark)" |
| `fi-FI` | "Finnish (Finland)" |
| `no-NO` | "Norwegian (Norway)" |
| `sv-SE` | "Swedish (Sweden)" |
| `de-DE` | "German (Germany)" |
| `en-US` | "English (United States)" |
| `fr-FR` | "French (France)" |

### Titres

| Colonne Google | Type | Max | Source mediaspot | Transformation |
|----------------|------|-----|------------------|----------------|
| `DisplayTitle` | string | - | `Package.localized_content[locale].title` | Titre localise |
| `DisplayTitle_Territory` | string | - | Laisser vide si identique | Override territoire specifique |
| `OriginalReleaseTitle` | string | - | `Title.titles.original_title` | Titre original |

### Synopsis

| Colonne Google | Type | Max | Source mediaspot | Transformation |
|----------------|------|-----|------------------|----------------|
| `OriginalSummary_Short` | string | - | `Title.Language.synopsis` | Synopsis original (langue originale) |
| `LocalizedSummary_Short` | string | 190 | `Package.localized_content[locale].synopsis_short` | Requis |
| `LocalizedSummary_Medium` | string | 400 | `Package.localized_content[locale].synopsis` | Optionnel |
| `LocalizedSummary_Long` | string | 4000 | `Package.localized_content[locale].synopsis_long` | Optionnel |
| `LocalizedSummary_Territory` | string | - | Laisser vide si identique | Override territoire specifique |

### Legal et Dates

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `CopyrightYear` | integer | Extraire de `Package.shared_metadata.copyright_cline` | Annee seule |
| `CopyrightLine` | string | `Package.shared_metadata.copyright_cline` | Format complet |
| `OriginalReleaseDate` | date | `Title.dates.release_date` | Format YYYY-MM-DD |
| `LocalizedReleaseDate_Type` | string | `Title.release_history[]` | Format special |

**Format LocalizedReleaseDate_Type:**
```
{YYYY-MM-DD}|{ReleaseType}
```

**Exemple:** `2002-01-11|Broadcast`

**Mapping ReleaseType:**
| mediaspot | Google |
|-----------|--------|
| `Theatrical` | "Theatrical" |
| `DVD` | "DVD" |
| `VOD` | "VOD" |
| `Broadcast` | "Broadcast" |

### Genres

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `PrimaryGenre` | string | `Title.genres[0].name` | Premier genre |
| `SecondaryGenres` | string | `Title.genres[1..n].name` | Separes par ";" |

**Genres valides Google:**
- Comedy, Romance, Drama, Action, Horror, Thriller
- Documentary, Animation, Family, Sci-Fi, Fantasy
- Crime, Mystery, Western, Musical, War, History

**Exemple:** `Comedy` et `Romance` (separes par ";")

### Ratings

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `RatingSystem_Rating_Reason` | string | `Title.Language.Territory.rating` | Format special |

**Format:**
```
{System}|{Value}|{Reason}
```

**Exemples:**
- `MCCYP|7|` (Danemark)
- `MEKU|12|` (Finlande)
- `Medietilsynet|12|` (Norvege)
- `SM-SA|7|` (Suede)
- `FSK|12|` (Allemagne)

### Origine

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `CountryOfOrigin` | string | `Title.production.countries_of_origin[0].country` | Nom complet |

**Mapping pays:**
| Code | Google |
|------|--------|
| FR | France |
| US | United States |
| DE | Germany |
| GB | United Kingdom |

### Cast

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `CastDisplayName_CharacterName_Role_BillingOrderNumber` | string | `Title.cast[]` | Format special |

**Format par membre (separes par ";"):**
```
{FirstName}|{LastName}|{CharacterName}|{TalentType}|{BillingOrder}
```

**Exemple:**
```
Audrey|Tautou|Amelie Poulain|Actor|1;Mathieu|Kassovitz|Nino Quincampoix|Actor|1
```

**Mapping TalentType:**
| mediaspot.cast_type | Google |
|---------------------|--------|
| `actor` | "Actor" |
| `guest_actor` | "Actor" (dans colonne Guest Actors pour TV) |
| `voice_actor` | "Voice" |

### Crew

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `CrewDisplayName_Role_BillingOrderNumber` | string | `Title.crew[]` | Format special |

**Format par membre (separes par ";"):**
```
{FirstName}|{LastName}|{CapacityType}|{BillingOrder}
```

**Exemple:**
```
Jean-Pierre|Jeunet|Director|1;Jean-Pierre|Jeunet|Screenwriter|1;Claudie|Ossard|Producer|1
```

**Mapping CapacityType:**
| mediaspot | Google |
|-----------|--------|
| `Director` | "Director" |
| `Producer` | "Producer" |
| `Screenwriter` | "Screenwriter" |
| `Writer` | "Writer" |
| `Creator` | "Creator" |
| `Composer` | "Composer" |

---

## Champs et Transformations - TV

### Structure hierarchique

Le CSV TV est organise en sections:

1. **Metadata de base** - Lignes avec Content Type renseigne
2. **Localisations** - Lignes avec Unique ID + Localized Language
3. **Ratings** - Lignes avec Unique ID + Rating Territory

### Colonnes TV specifiques

| Colonne Google | Type | Source mediaspot | Transformation |
|----------------|------|------------------|----------------|
| `Licensor` | string | `Title.right_holder.name` | Direct |
| `Service Provider` | string | `Package.provider.service_provider` | Si different du Licensor |
| `Studio Display Name` | string | `Package.provider.company_display_credit` | Credit client |
| `Content Type` | enum | `Title.classification.type` | Series/Season/Episode |
| `Series ID` | string | Series vendor_id | Pour hierarchie |
| `Season ID` | string | Season vendor_id | Pour hierarchie |
| `Episode ID` | string | Episode vendor_id | Pour hierarchie |
| `Release Year` | integer | `Title.dates.release_year` | YYYY |
| `Release Date` | date | `Title.dates.release_date` | YYYY-MM-DD |
| `Country of Origin` | string | `Title.production.countries_of_origin[0]` | Code ISO |
| `Original Language` | locale | `Title.languages.original_language` | Code court (en) |
| `Primary Spoken Language` | locale | `Title.languages.primary_spoken_language` | Si different |
| `Original Title` | string | `Title.titles.original_title` | Direct |
| `Sequence` | integer | `Title.series_info.sequence_number` | Numero episode/saison |
| `Copyright Line` | string | `Package.shared_metadata.copyright_cline` | Direct |
| `Genres` | string | `Title.genres[].name` | Separes par ";" |

### Cast TV (colonnes separees)

| Colonne Google | Source mediaspot | Filtre |
|----------------|------------------|--------|
| `Guest Actors` | `Title.cast[]` | `cast_type = "guest_actor"` |
| `Actors` | `Title.cast[]` | `cast_type = "actor"` |

**Format:** `FirstName LastName; FirstName LastName`

Avec personnage optionnel: `FirstName LastName [CharacterName]`

### Crew TV (colonnes separees)

| Colonne Google | Source mediaspot | Filtre |
|----------------|------------------|--------|
| `Writers` | `Title.crew[]` | `roles contains "Writer" or "Screenwriter"` |
| `Directors` | `Title.crew[]` | `roles contains "Director"` |
| `Producers` | `Title.crew[]` | `roles contains "Producer"` |
| `Creators` | `Title.crew[]` | `roles contains "Creator"` |

**Format:** `FirstName LastName; FirstName LastName`

### Localisations TV

Lignes separees avec:

| Colonne Google | Source mediaspot | Description |
|----------------|------------------|-------------|
| `Unique ID` | Vendor ID du contenu | Reference |
| `Localized Language` | `locale` | Code langue (it, fr, de, es) |
| `Localized Title` | `Package.localized_content[locale].title` | Titre |
| `Short Synopsis` | `Package.localized_content[locale].synopsis_short` | Max 190 |
| `Medium Synopsis` | `Package.localized_content[locale].synopsis` | Max 400 |
| `Long Synopsis` | `Package.localized_content[locale].synopsis_long` | Max 4000, requis |

### Ratings TV

Lignes separees avec:

| Colonne Google | Source mediaspot | Description |
|----------------|------------------|-------------|
| `Unique ID` | Vendor ID du contenu | Reference |
| `Rating Territory` | `Title.Language.Territory.country` | Code ISO (IT, FR, DE) |
| `Rating Value` | `Title.Language.Territory.rating.rating_code` | Code rating |

---

## Exemple CSV Film

```csv
TitleLevel,TitleMgmtID,Language,Territory,Season Number,DisplayTitle,DisplayTitle_Territory,OriginalReleaseTitle,CopyrightYear,CopyrightLine,ORG,OriginalSummary_Short,LocalizedSummary_Short,LocalizedSummary_Medium,LocalizedSummary_Long,LocalizedSummary_Territory,PrimaryGenre,SecondaryGenres,SequenceNumber,OriginalReleaseDate,LocalizedReleaseDate_Type,RatingSystem_Rating_Reason,CountryOfOrigin,CastDisplayName_CharacterName_Role_BillingOrderNumber,CrewDisplayName_Role_BillingOrderNumber
Feature,,Danish (Denmark),Denmark,,Amelie,,Le fabuleux destin d'Amélie Poulain,,2025 NonStop Entertainment,GL110284,,Synopsis court DK...,Synopsis moyen DK...,Synopsis long DK...,,Comedy,Romance,,2001-04-25,2002-01-11|Broadcast,MCCYP|7|,France,Audrey|Tautou|Amélie Poulain|Actor|1;Mathieu|Kassovitz|Nino Quincampoix|Actor|1,Jean-Pierre|Jeunet|Director|1;Claudie|Ossard|Producer|1
Feature,,Finnish (Finland),Finland,,Amelie,,Le fabuleux destin d'Amélie Poulain,,2025 NonStop Entertainment,GL110284,,Synopsis court FI...,Synopsis moyen FI...,Synopsis long FI...,,Comedy,Romance,,2001-04-25,2001-10-26|Broadcast,MEKU|12|,France,Audrey|Tautou|Amélie Poulain|Actor|1;Mathieu|Kassovitz|Nino Quincampoix|Actor|1,Jean-Pierre|Jeunet|Director|1;Claudie|Ossard|Producer|1
```

---

## Regles de validation

### Champs requis - Film

- `TitleLevel` = "Feature"
- `Language`
- `Territory`
- `OriginalReleaseTitle`
- `LocalizedSummary_Short` (si Medium et Long absents)
- `PrimaryGenre`
- `OriginalReleaseDate`
- `LocalizedReleaseDate_Type`
- `RatingSystem_Rating_Reason`
- `CountryOfOrigin`
- `CastDisplayName_CharacterName_Role_BillingOrderNumber`

### Champs requis - TV

**Metadata de base:**
- `Licensor`
- `Content Type`
- `Series ID` (pour Series, Season, Episode)
- `Season ID` (pour Season, Episode)
- `Episode ID` (pour Episode)
- `Release Year`
- `Country of Origin`
- `Original Language`
- `Original Title`
- `Sequence` (pour Season, Episode)
- `Genres`

**Localisations:**
- `Unique ID`
- `Localized Language`
- `Long Synopsis`

**Ratings:**
- `Unique ID`
- `Rating Territory`
- `Rating Value`

### Contraintes

- `LocalizedSummary_Short`: max 190 caracteres
- `LocalizedSummary_Medium`: max 400 caracteres
- `LocalizedSummary_Long`: max 4000 caracteres
- Dates: format YYYY-MM-DD
- Genres: valeurs de la liste Google officielle
- Ratings: valeurs selon territoire (ref MovieLabs)
- Separateurs: pipe "|" dans les champs, point-virgule ";" entre elements

---

## Nommage des fichiers

| Type | Pattern |
|------|---------|
| Film | `{vendor_id} Metadata V{version}.csv` |
| TV | `Metadata Example {vendor_id}.csv` |

**Exemples:**
- `GL110284 Metadata V2.csv`
- `Metadata Example 025396 DE S001.csv`
