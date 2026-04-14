# Amazon - Specifications de livraison

## Formats

Amazon utilise le standard **MovieLabs** avec deux types de fichiers:

| Type | Version | Extension | Description |
|------|---------|-----------|-------------|
| MEC | v2.6 | -MEC.xml | Core Metadata (metadonnees) |
| MMC | v1.5 | -MMC.xml | Media Manifest (fichiers techniques) |

## Types de contenu

| Type | WorkType | Fichiers requis |
|------|----------|-----------------|
| Film | `movie` | 1 MEC + 1 MMC |
| Serie | `series` | 1 MEC (series) |
| Saison | `season` | 1 MEC (season) |
| Episode | `episode` | 1 MEC + 1 MMC |

---

## MEC - Core Metadata

### Structure XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mdmec:CoreMetadata
  xmlns:mdmec="http://www.movielabs.com/schema/mdmec/v2.6"
  xmlns:md="http://www.movielabs.com/schema/md/v2.6/md">
  <mdmec:Basic ContentID="...">
    ...
  </mdmec:Basic>
  <mdmec:CompanyDisplayCredit>
    ...
  </mdmec:CompanyDisplayCredit>
</mdmec:CoreMetadata>
```

### ContentID

| Champ Amazon | Format | Source mediaspot | Transformation |
|--------------|--------|------------------|----------------|
| `ContentID` | URN | `Package.provider.provider_code` + `Package.identifiers.vendor_id` | `md:cid:org:{provider}:{vendor_id}` |

**Exemple:** `md:cid:org:umwi:AM1513283`

### LocalizedInfo (par langue)

| Champ Amazon | Type | Max | Source mediaspot | Transformation |
|--------------|------|-----|------------------|----------------|
| `@language` | locale | - | `Package.localized_content[].locale` | Format BCP 47 |
| `TitleDisplayUnlimited` | string | 250 | `Package.localized_content[locale].title` | Tronquer si > 250 |
| `TitleSort` | string | - | `Package.localized_content[locale].title_sort` | Optionnel (peut etre vide) |
| `Summary190` | string | 190 | `Package.localized_content[locale].synopsis_short` | Tronquer si > 190 |
| `Summary400` | string | 400 | `Package.localized_content[locale].synopsis` | Requis |
| `Genre` | array | 3 | `Title.genres[]` | Code AV Genre |

**Transformation LocalizedInfo:**
```xml
<md:LocalizedInfo language="fi-FI">
  <md:TitleDisplayUnlimited>Bone Lake</md:TitleDisplayUnlimited>
  <md:TitleSort>Bone Lake</md:TitleSort>
  <md:ArtReference resolution="1920x2560" purpose="boxart">image.jpg</md:ArtReference>
  <md:Summary190>Synopsis court...</md:Summary190>
  <md:Summary400>Synopsis moyen requis...</md:Summary400>
  <md:Genre id="av_genre_comedy" />
  <md:Genre id="av_genre_horror" />
</md:LocalizedInfo>
```

### ArtReference (dans LocalizedInfo)

| Champ Amazon | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `@resolution` | string | `Asset.artwork_spec.resolution` | Format "WxH" |
| `@purpose` | enum | `Asset.artwork_spec.purpose` | boxart, cover, hero, poster |
| text | string | `DataFile.file_name` | Nom fichier image |

**Resolutions requises:**

| Purpose | Resolution | Ratio | Description |
|---------|------------|-------|-------------|
| `boxart` | 1920x2560 ou 2560x1920 | 3:4 / 4:3 | Portrait/Paysage principal |
| `cover` | 3840x2160 | 16:9 | Couverture paysage |
| `hero` | 3840x2160 | 16:9 | Image hero/background |
| `poster` | 2000x3000 | 2:3 | Affiche portrait |

### Genres Amazon (AV Genre codes)

| mediaspot | Amazon |
|-----------|--------|
| Comedy | `av_genre_comedy` |
| Horror | `av_genre_horror` |
| Suspense | `av_genre_suspense` |
| Drama | `av_genre_drama` |
| Documentary | `av_genre_documentary` |
| Biography (sub) | `av_subgenre_documentary_biography` |
| Action | `av_genre_action` |
| Romance | `av_genre_romance` |

### Dates

| Champ Amazon | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `ReleaseYear` | integer | `Title.dates.release_year` | Annee seule (YYYY) |
| `ReleaseDate` | date | `Title.dates.release_date` | Format YYYY-MM-DD |

### ReleaseHistory

| Champ Amazon | Type | Source mediaspot | Transformation |
|--------------|------|------------------|----------------|
| `ReleaseHistory` | array | `Title.release_history[]` | Par type/territoire |

**Transformation:**
```xml
<md:ReleaseHistory>
  <md:ReleaseType>Theatrical</md:ReleaseType>
  <md:DistrTerritory>
    <md:country>FI</md:country>
  </md:DistrTerritory>
  <md:Date>2026-02-09</md:Date>
</md:ReleaseHistory>
```

**Mapping ReleaseType:**
| mediaspot | Amazon |
|-----------|--------|
| `Theatrical` | "Theatrical" |
| `DVD` | "DVD" |
| `Blu-ray` | "Blu-ray" |
| `VOD` | "VOD" |
| `Broadcast` | "Broadcast" |

### WorkType

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `WorkType` | `Title.classification.type` | Mapping direct |

| mediaspot | Amazon |
|-----------|--------|
| `film` | "movie" |
| `series` | "series" |
| `season` | "season" |
| `episode` | "episode" |

### AltIdentifier

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `Namespace` | - | "ORG" (fixe) |
| `Identifier` | `Package.identifiers.vendor_id` | Direct |

```xml
<md:AltIdentifier>
  <md:Namespace>ORG</md:Namespace>
  <md:Identifier>AM1513283</md:Identifier>
</md:AltIdentifier>
```

### RatingSet

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `Rating` | `Title.Language.Territory.rating` | Par territoire |

**Transformation:**
```xml
<md:RatingSet>
  <md:Rating>
    <md:Region>
      <md:country>FI</md:country>
    </md:Region>
    <md:System>MEKU</md:System>
    <md:Value>18</md:Value>
  </md:Rating>
</md:RatingSet>
```

**Ou si non classe:**
```xml
<md:RatingSet>
  <md:notrated>true</md:notrated>
</md:RatingSet>
```

**Systemes de rating Amazon:**

| Pays | Systeme |
|------|---------|
| FI | MEKU |
| SE | SM-SA |
| DE | FSK |
| DE (TV) | de-tv |
| NO | Medietilsynet |
| DK | MCCYP |

### People (Cast & Crew)

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `People` | `Title.cast[]` + `Title.crew[]` | Combines |

**Transformation:**
```xml
<md:People>
  <md:Job>
    <md:JobFunction>Actor</md:JobFunction>
    <md:BillingBlockOrder>1</md:BillingBlockOrder>
  </md:Job>
  <md:Name>
    <md:DisplayName language="fi-FI">Maddie Hasson</md:DisplayName>
    <md:DisplayName language="sv-SE">Maddie Hasson</md:DisplayName>
  </md:Name>
</md:People>
```

**Mapping JobFunction:**
| mediaspot | Amazon |
|-----------|--------|
| CastMember | "Actor" |
| `Director` | "Director" |
| `Producer` | "Producer" |
| `Writer` | "Writer" |
| `Screenwriter` | "Writer" |
| `Creator` | "Creator" |

### Origine

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `CountryOfOrigin` | `Title.production.countries_of_origin[0]` | Premier pays |
| `OriginalLanguage` | `Title.languages.original_language` | Format BCP 47 |

```xml
<md:CountryOfOrigin>
  <md:country>US</md:country>
</md:CountryOfOrigin>
<md:OriginalLanguage>en-US</md:OriginalLanguage>
```

### AssociatedOrg (Licensor)

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `@organizationID` | `Package.provider.provider_code` | Direct |
| `@role` | - | "licensor" (fixe) |

```xml
<md:AssociatedOrg organizationID="umwi" role="licensor" />
```

### SequenceInfo (Saisons/Episodes)

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `Number` | `Title.series_info.sequence_number` | Direct |

```xml
<md:SequenceInfo>
  <md:Number>1</md:Number>
</md:SequenceInfo>
```

### Parent (Saisons/Episodes)

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `@relationshipType` | `Title.series_info.parent_type` | Direct |
| `ParentContentID` | Parent Title + provider | Construction URN |

```xml
<md:Parent relationshipType="isepisodeof">
  <md:ParentContentID>md:cid:org:studiocanal:035973_DE_S001</md:ParentContentID>
</md:Parent>
```

**Mapping relationshipType:**
| Type contenu | relationshipType |
|--------------|------------------|
| Season → Series | "isseasonof" |
| Episode → Season | "isepisodeof" |

### CompanyDisplayCredit

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `DisplayString` | `Package.provider.company_display_credit` | Direct |

```xml
<mdmec:CompanyDisplayCredit>
  <md:DisplayString>LD Entertainment</md:DisplayString>
</mdmec:CompanyDisplayCredit>
```

---

## MMC - Media Manifest

### Structure XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest:MediaManifest
  xmlns:md="http://www.movielabs.com/schema/md/v2.4/md"
  xmlns:manifest="http://www.movielabs.com/schema/manifest/v1.5/manifest">
  <manifest:Compatibility>...</manifest:Compatibility>
  <manifest:Inventory>...</manifest:Inventory>
  <manifest:Presentations>...</manifest:Presentations>
  <manifest:PlayableSequences>...</manifest:PlayableSequences>
  <manifest:Experiences>...</manifest:Experiences>
  <manifest:ALIDExperienceMaps>...</manifest:ALIDExperienceMaps>
</manifest:MediaManifest>
```

### Compatibility

```xml
<manifest:Compatibility>
  <manifest:SpecVersion>1.5</manifest:SpecVersion>
  <manifest:Profile>MMC-1</manifest:Profile>
</manifest:Compatibility>
```

### Inventory - Audio

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `AudioTrackID` | Generated | `md:audtrackid:org:{provider}:{vendor_id}:{context}` |
| `Type` | `DataFile.audio_spec.audio_type` | primary, descriptive |
| `Language` | `DataFile.locale` | Format BCP 47 |
| `ContainerLocation` | `DataFile.file_name` | `file://{filename}` |

```xml
<manifest:Audio AudioTrackID="md:audtrackid:org:umwi:AM1513283:feature.audio.en-US">
  <md:Type>primary</md:Type>
  <md:Language>en-US</md:Language>
  <manifest:ContainerReference>
    <manifest:ContainerLocation>file://umwi-AM1513283-Full-Mezz_HD-en-US.mov</manifest:ContainerLocation>
  </manifest:ContainerReference>
</manifest:Audio>
```

### Inventory - Video

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `VideoTrackID` | Generated | `md:vidtrackid:org:{provider}:{vendor_id}:{context}` |
| `Type` | - | "primary" |
| `AspectRatio` | `DataFile.video_spec.aspect_ratio` | Direct |
| `WidthPixels` | `DataFile.video_spec.width` | Direct |
| `HeightPixels` | `DataFile.video_spec.height` | Direct |
| `Progressive` | `DataFile.video_spec.progressive` | "true"/"false" |

```xml
<manifest:Video VideoTrackID="md:vidtrackid:org:umwi:AM1513283:feature.video">
  <md:Type>primary</md:Type>
  <md:Picture>
    <md:AspectRatio>16:9</md:AspectRatio>
    <md:WidthPixels>1920</md:WidthPixels>
    <md:HeightPixels>1080</md:HeightPixels>
    <md:Progressive>true</md:Progressive>
  </md:Picture>
  <manifest:ContainerReference>
    <manifest:ContainerLocation>file://umwi-AM1513283-Full-Mezz_HD-en-US.mov</manifest:ContainerLocation>
  </manifest:ContainerReference>
</manifest:Video>
```

### Inventory - Subtitle

| Champ Amazon | Source mediaspot | Transformation |
|--------------|------------------|----------------|
| `SubtitleTrackID` | Generated | `md:subtrackid:org:{provider}:{vendor_id}:{context}` |
| `Type` | `DataFile.subtitle_spec.subtitle_type` | Normal, SDH, Forced |
| `Language` | `DataFile.locale` | Format BCP 47 |
| `FrameRate` | `DataFile.subtitle_spec.frame_rate` | Avec timecode attribute |

```xml
<manifest:Subtitle SubtitleTrackID="md:subtrackid:org:umwi:AM1513283:feature.subs.sv-SE">
  <md:Type>Normal</md:Type>
  <md:Language>sv-SE</md:Language>
  <md:Encoding>
    <md:FrameRate timecode="NonDrop">24</md:FrameRate>
  </md:Encoding>
  <manifest:ContainerReference>
    <manifest:ContainerLocation>file://umwi-AM1513283-Full-Subtitle24-sv-SE.itt</manifest:ContainerLocation>
  </manifest:ContainerReference>
</manifest:Subtitle>
```

### Presentations

Combine les tracks audio, video et sous-titres en presentations:

```xml
<manifest:Presentations>
  <manifest:Presentation PresentationID="md:presentationid:org:umwi:AM1513283:feature.presentation">
    <manifest:TrackMetadata>
      <manifest:TrackSelectionNumber>0</manifest:TrackSelectionNumber>
      <manifest:VideoTrackReference>
        <manifest:VideoTrackID>md:vidtrackid:org:umwi:AM1513283:feature.video</manifest:VideoTrackID>
      </manifest:VideoTrackReference>
      <manifest:AudioTrackReference>
        <manifest:AudioTrackID>md:audtrackid:org:umwi:AM1513283:feature.audio.en-US</manifest:AudioTrackID>
      </manifest:AudioTrackReference>
      <manifest:SubtitleTrackReference>
        <manifest:SubtitleTrackID>md:subtrackid:org:umwi:AM1513283:feature.subs.sv-SE</manifest:SubtitleTrackID>
      </manifest:SubtitleTrackReference>
    </manifest:TrackMetadata>
  </manifest:Presentation>
</manifest:Presentations>
```

### PlayableSequences

```xml
<manifest:PlayableSequences>
  <manifest:PlayableSequence PlayableSequenceID="md:playablesequenceid:org:umwi:AM1513283:feature">
    <manifest:Clip sequence="0">
      <manifest:PresentationID>md:presentationid:org:umwi:AM1513283:feature.presentation</manifest:PresentationID>
    </manifest:Clip>
  </manifest:PlayableSequence>
</manifest:PlayableSequences>
```

### Experiences

| Type | SubType | Usage |
|------|---------|-------|
| Main | Feature | Contenu principal |
| Promotion | Default Trailer | Bande-annonce |

```xml
<manifest:Experiences>
  <manifest:Experience ExperienceID="md:experienceid:org:umwi:AM1513283.experience" version="1.0">
    <manifest:ContentID>md:cid:org:umwi:AM1513283</manifest:ContentID>
    <manifest:Audiovisual ContentID="md:cid:org:umwi:AM1513283">
      <manifest:Type>Main</manifest:Type>
      <manifest:SubType>Feature</manifest:SubType>
      <manifest:PlayableSequenceID>md:playablesequenceid:org:umwi:AM1513283:feature</manifest:PlayableSequenceID>
    </manifest:Audiovisual>
    <manifest:ExperienceChild>
      <manifest:Relationship>ispromotionfor</manifest:Relationship>
      <manifest:ExperienceID>md:experienceid:org:umwi:AM1513283:preview.1.experience</manifest:ExperienceID>
    </manifest:ExperienceChild>
  </manifest:Experience>
</manifest:Experiences>
```

### ALIDExperienceMaps

```xml
<manifest:ALIDExperienceMaps>
  <manifest:ALIDExperienceMap>
    <manifest:ALID>md:alid:org:umwi:AM1513283</manifest:ALID>
    <manifest:ExperienceID>md:experienceid:org:umwi:AM1513283.experience</manifest:ExperienceID>
  </manifest:ALIDExperienceMap>
</manifest:ALIDExperienceMaps>
```

---

## Regles de validation

### MEC - Champs requis

**Tous types:**
- `ContentID`
- `LocalizedInfo` (min 1 langue)
  - `TitleDisplayUnlimited`
  - `Summary400`
  - `Genre` (min 1, max 3)
- `ReleaseYear`
- `WorkType`
- `AltIdentifier`
- `RatingSet` (min 1 rating ou notrated)
- `OriginalLanguage`
- `AssociatedOrg`
- `CompanyDisplayCredit`

**Film/Episode supplementaire:**
- `CountryOfOrigin` (requis depuis 2025-08)
- `People` (cast & crew)

**Saison/Episode supplementaire:**
- `SequenceInfo.Number`
- `Parent` avec `ParentContentID`

### MMC - Champs requis

- `Compatibility` (SpecVersion, Profile)
- `Inventory` (min 1 Audio, 1 Video)
- `Presentations` (min 1)
- `PlayableSequences` (min 1)
- `Experiences` (min 1)
- `ALIDExperienceMaps` (min 1)

### Contraintes

- `TitleDisplayUnlimited`: max 250 caracteres
- `Summary190`: max 190 caracteres (optionnel)
- `Summary400`: max 400 caracteres (requis)
- `Genre`: min 1, max 3
- Dates: format YYYY-MM-DD
- ContentID format: `md:cid:org:{provider}:{id}`

---

## Nommage des fichiers

| Type | Pattern |
|------|---------|
| MEC Film | `{provider}-{vendor_id}-MEC_AMAZON.xml` |
| MMC Film | `{provider}-{vendor_id}-MMC_AMAZON.xml` |
| MEC Series | `{provider}-{vendor_id}_SERIES-MEC.xml` |
| MEC Season | `{provider}-{vendor_id}_S{num}-MEC.xml` |
| MEC Episode | `{provider}-{vendor_id}_E{num}-MEC_AMAZON_SERIE.xml` |
| MMC Episode | `{provider}-{vendor_id}_E{num}-MMC_AMAZON_SERIE.xml` |
