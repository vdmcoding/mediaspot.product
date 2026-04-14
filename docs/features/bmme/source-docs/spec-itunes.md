# iTunes - Specifications de livraison

## Formats

| Type | Version | Extension |
|------|---------|-----------|
| Film | film5.3 | .xml |
| TV Episode | tv5.3 | .xml |

## Structure XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://apple.com/itunes/importer" version="film5.3|tv5.3">
  <provider>...</provider>
  <language>...</language>
  <video>...</video>
</package>
```

---

## Champs et Transformations

### En-tete Package

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `provider` | string | `Package.provider.provider_code` | Direct |
| `language` | locale | `Package.package_language` | Format court (sv, de-DE) |

### Video - Identification

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `type` | enum | `Title.classification.type` | `film` → "film", `series/season/episode` → "tv" |
| `subtype` | enum | `Title.classification.subtype` | `feature`, `episode` |
| `vendor_id` | string | `Package.identifiers.vendor_id` | Direct |

### Video - TV Only (tv5.3)

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `container_id` | string | `Package.container_info.container_id` | ID saison parent |
| `container_position` | integer | `Package.container_info.container_position` | Position episode |
| `episode_production_number` | string | `Title.series_info.production_number` | Direct |

### Video - Origine

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `countries_of_origin` | array | `Title.production.countries_of_origin` | `<country primary="true">FR</country>` |
| `production_countries` | array | `Title.production.production_countries` | Idem |
| `original_spoken_locale` | locale | `Title.languages.original_spoken_locale` | Format BCP 47 (fr-FR) |

### Video - Titres et Synopsis

| Champ iTunes | Type | Max | Source mediaspot | Transformation |
|--------------|------|-----|------------------|----------------|
| `title` | string | - | `Package.localized_content[locale].title` | Direct |
| `studio_release_title` | string | - | `Title.titles.studio_release_title` | Direct |
| `synopsis` | string | 4000 | `Package.localized_content[locale].synopsis_long` | Film only |
| `description` | string | 4000 | `Package.localized_content[locale].description` | TV only (alternative a synopsis) |
| `locales` | array | - | `Package.localized_content[]` | Multi-langue |

**Transformation locales:**
```xml
<locales>
  <locale name="da">
    <title>Amelie</title>
    <synopsis>...</synopsis>
  </locale>
</locales>
```

### Video - Production et Legal

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `production_company` | string | `Title.production.production_companies[0]` | Premier element |
| `copyright_cline` | string | `Package.shared_metadata.copyright_cline` | Format: "2025 Studio Name" |
| `theatrical_release_date` | date | `Title.dates.theatrical_release_date` | Format YYYY-MM-DD |
| `release_date` | date | `Title.dates.release_date` | TV: date episode |

### Video - Regions

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `regions` | array | `Package.regions[]` | Par territoire |

**Transformation:**
```xml
<regions>
  <region>
    <territory>DK</territory>
    <theatrical_release_date>2002-01-11</theatrical_release_date>
  </region>
</regions>
```

### Video - Genres

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `genres` | array | `Title.genres[]` | Code iTunes |

**Codes genres iTunes:**
- `COMEDY-00`, `ROMANCE-00`, `ACTION-00`, `HORROR-00`, etc.

```xml
<genres>
  <genre code="COMEDY-00" />
  <genre code="ROMANCE-00" />
</genres>
```

### Video - Ratings

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `ratings` | array | `Title.Language.Territory.rating` | Par territoire |

**Systemes de rating iTunes:**
- `dk-movies`, `fi-movies`, `no-movies`, `se-movies`
- `de-tv` (pour TV)

```xml
<ratings>
  <rating system="dk-movies" code="7" />
  <rating system="fi-movies" code="K-12" />
</ratings>
```

### Video - Cast

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `cast` | array | `Title.cast[]` | Avec billing |

**Transformation:**
```xml
<cast>
  <cast_member billing="top">
    <display_name>Audrey Tautou</display_name>
    <characters>
      <character>
        <character_name>Amelie Poulain</character_name>
        <reference_id>AMELIE_POULAIN</reference_id>
      </character>
    </characters>
  </cast_member>
</cast>
```

**Mapping billing:**
| mediaspot | iTunes |
|-----------|--------|
| `top` | "top" |
| `supporting` | "top" (si billing_block_order <= 3) |
| `ordered` | Non inclus |

### Video - Crew

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `crew` | array | `Title.crew[]` | Avec roles |

**Transformation:**
```xml
<crew>
  <crew_member billing="top">
    <display_name>Jean-Pierre Jeunet</display_name>
    <roles>
      <role>Director</role>
      <role>Screenwriter</role>
    </roles>
  </crew_member>
</crew>
```

**Mapping roles:**
| mediaspot | iTunes |
|-----------|--------|
| `Director` | "Director" |
| `Producer` | "Producer" |
| `Screenwriter` | "Screenwriter" |
| `Writer` | "Screenwriter" |
| `Composer` | "Composer" |

### Video - Chapters (Film only)

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `chapters` | object | `Package.chapters` | Avec timecodes |

**Transformation:**
```xml
<chapters>
  <timecode_format>25/1 1/nonDrop</timecode_format>
  <chapter>
    <start_time>00:00:00:00</start_time>
    <titles>
      <title locale="sv">Kapitel 1</title>
      <title locale="da">Kapitel 1</title>
    </titles>
    <artwork_time>00:09:19:15</artwork_time>
  </chapter>
</chapters>
```

### Video - Preview (TV only)

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `preview` | element | `Package.preview` | Attribut starttime |

```xml
<preview starttime="533" />
```
- `starttime` en secondes (integer)

### Video - Assets

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `assets` | array | `Package.assets[]` | Par type |

**Types d'assets:**
- `full` - Video complete
- `preview` - Bande-annonce
- `artwork` - Poster portrait
- `artwork_16:9` - Image paysage

**Transformation asset:**
```xml
<asset type="full">
  <territories>
    <territory>WW</territory>
  </territories>
  <data_file role="source">
    <locale name="fr-FR" />
    <file_name>IT702599_source.mov</file_name>
    <size>160704057412</size>
    <checksum type="md5">01fa58332be316812501947be1c0c32e</checksum>
    <attribute name="crop.top">132</attribute>
    <attribute name="crop.bottom">132</attribute>
    <attribute name="crop.left">4</attribute>
    <attribute name="crop.right">4</attribute>
    <attribute name="image.burned_forced_narrative.locale">fr-FR</attribute>
    <attribute name="image.textless_master">false</attribute>
  </data_file>
  <data_file role="subtitles">
    <locale name="sv" />
    <file_name>IT702599_full_sv.itt</file_name>
    <size>100935</size>
    <checksum type="md5">c5942cbcd9560a90a7808c8b160ef52e</checksum>
  </data_file>
</asset>
```

**Mapping DataFile.attributes:**
| mediaspot | iTunes attribute |
|-----------|------------------|
| `crop_top` | "crop.top" |
| `crop_bottom` | "crop.bottom" |
| `crop_left` | "crop.left" |
| `crop_right` | "crop.right" |
| `textless_master` | "image.textless_master" |
| `burned_subtitles_locale` | "image.burned_subtitles.locale" |
| `burned_forced_narrative_locale` | "image.burned_forced_narrative.locale" |

### Video - Products

| Champ iTunes | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `products` | array | `Package.products[]` | Par territoire |

**Transformation:**
```xml
<products>
  <product>
    <territory>DK</territory>
    <cleared_for_sale>true</cleared_for_sale>
    <cleared_for_hd_sale>true</cleared_for_hd_sale>
    <wholesale_price_tier>9</wholesale_price_tier>
    <hd_wholesale_price_tier>112</hd_wholesale_price_tier>
    <sales_start_date>2025-10-01</sales_start_date>
    <cleared_for_vod>true</cleared_for_vod>
    <vod_type>Library</vod_type>
    <available_for_vod_date>2025-10-01</available_for_vod_date>
    <physical_release_date>2025-10-01</physical_release_date>
    <cleared_for_hd_vod>true</cleared_for_hd_vod>
  </product>
</products>
```

**Mapping Product:**
| mediaspot | iTunes |
|-----------|--------|
| `Product.territory` | `territory` |
| `Product.clearances.cleared_for_sale` | `cleared_for_sale` |
| `Product.clearances.cleared_for_hd_sale` | `cleared_for_hd_sale` |
| `Product.clearances.cleared_for_vod` | `cleared_for_vod` |
| `Product.clearances.cleared_for_hd_vod` | `cleared_for_hd_vod` |
| `Product.pricing.wholesale_price_tier` | `wholesale_price_tier` |
| `Product.pricing.hd_wholesale_price_tier` | `hd_wholesale_price_tier` |
| `Product.dates.sales_start_date` | `sales_start_date` |
| `Product.dates.available_for_vod_date` | `available_for_vod_date` |
| `Product.dates.physical_release_date` | `physical_release_date` |
| `Product.vod_type` | `vod_type` |

---

## Regles de validation

### Champs requis - Film
- `provider`, `language`, `type`, `subtype`, `vendor_id`
- `countries_of_origin`, `original_spoken_locale`
- `title`, `synopsis`
- `production_company`, `copyright_cline`
- `genres` (min 1)
- `ratings` (min 1 par territoire)
- `assets` (type=full avec data_file role=source)
- `products` (min 1)

### Champs requis - TV
- Idem Film +
- `container_id`, `container_position`
- `episode_production_number`
- `description` (au lieu de synopsis)
- `release_date`

### Contraintes
- `synopsis` / `description`: max 4000 caracteres
- `genres`: max 2
- `preview.starttime`: integer (secondes)
- Dates: format YYYY-MM-DD
- Timecodes: format HH:MM:SS:FF
