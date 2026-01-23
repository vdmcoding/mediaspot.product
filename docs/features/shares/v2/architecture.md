---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - docs/features/shares/v2/prd.md
  - docs/features/shares/v1/documentation.md
  - docs/features/shares/v1/endpoints-inventory.md
  - docs/features/shares/v1/db-share-media-infos.ts
workflowType: architecture
project_name: Screenings V2
user_name: Ben
date: 2026-01-22
scope:
  focus: API Contract Only
  includes:
    - DTO global (request/response)
    - Liste des endpoints
    - Payloads
    - Responses attendues
    - Regles metier associees
  excludes:
    - Implementation backend
    - Choix techniques internes
    - Patterns architecture code
---

# Architecture API - Screenings V2

_Document focalisé sur le contrat API. Les choix d'implémentation backend sont hors scope._

## Scope

**Inclus :**
- DTOs (request/response)
- Liste des endpoints (nouveaux + migrations)
- Payloads détaillés
- Responses attendues
- Règles métier par endpoint

**Exclus :**
- Choix d'implémentation (patterns, services, etc.)
- Architecture code interne
- Décisions techniques backend

## Documents de Référence

- PRD Screenings V2 (36 FRs en Gherkin)
- Documentation API V1 (26 règles métier)
- Inventaire endpoints V1 (17 endpoints)
- Modèle DB actuel (DbShareMediaInfos)

---

## Décisions Architecturales

### DA-1 : Structure Multi-title

**Décision :** Étendre le pattern `linkedShareIds` existant

**Contexte :** Le modèle `DbShareMediaInfos` possède déjà `linkedShareIds` et `linkedShares` pour gérer les épisodes multiples.

**Approche :**
- 1 share "master" + N shares "linked" (1 par title)
- Réutilisation du champ `isMultiple` ou ajout de `isMultiTitle`
- **Zéro migration** des données existantes
- Backward compatible avec les shares V1

### DA-2 : Stratégie Endpoints

**Décision :** Consolidation plutôt que prolifération

| Action | Endpoints |
|--------|-----------|
| **Unifier** | `POST /shares` (single + multi), `GET /shares` (avec filtrage) |
| **Supprimer** | `POST /shares/multiple`, `GET /shares/views-infos` |
| **Modifier DTO** | `GET /shares/{key}`, `PUT /shares`, `GET /shares/metadata/{id}` |
| **Garder** | `DELETE /shares/{id}`, endpoints clips |

### DA-3 : Résolution Content RAW → Asset

**Décision :** Logique 100% transparente pour le frontend

- Le client envoie `contentId` + `audioLanguage`
- Le backend détecte MEZZ vs RAW et resolve l'asset si nécessaire
- Le frontend ignore si le share final est sur Content ou Asset

---

## Endpoints V2

### Vue d'Ensemble

| Méthode | Endpoint | Action | Statut V2 |
|---------|----------|--------|-----------|
| **POST** | `/shares` | Créer un screening | 🔄 DTO modifié |
| **GET** | `/shares` | Lister avec filtrage | 🆕 Nouveau |
| **GET** | `/shares/{key}` | Détail pour viewlink | 🔄 DTO modifié |
| **GET** | `/shares/metadata/{shareId}` | Analytics | 🔄 DTO modifié |
| **PUT** | `/shares/{shareId}` | Modifier un screening | 🔄 DTO modifié |
| **DELETE** | `/shares/{shareId}` | Supprimer | ✅ Inchangé |
| **POST** | `/shares/{key}/clips` | Ajouter un clip | ✅ Inchangé |
| **PUT** | `/shares/{key}/clips/{clipId}` | Modifier un clip | ✅ Inchangé |
| **DELETE** | `/shares/{key}/clips/{clipId}` | Supprimer un clip | ✅ Inchangé |
| **POST** | `/shares/clips/import` | Importer clip dans MAM | 🔄 À revoir UX |

### Endpoints Supprimés

| Endpoint | Raison |
|----------|--------|
| `POST /shares/multiple` | Mergé dans `POST /shares` unifié |
| `GET /shares/{pageNb}/{pageSize}` | Remplacé par `GET /shares` avec query params |
| `GET /shares/byobject/{objectId}` | Mergé dans `GET /shares?objectId=` |
| `GET /shares/views-infos` | Usage marginal, supprimé |

---

## DTOs

### Types Communs

```typescript
interface ShareContentItem {
  titleId: number
  contents: ShareContentSelection[]
}

interface ShareContentSelection {
  contentId: number
  audioLanguage: string[]              // Code langue (ex: "fr", "en")
  subtitleLanguage?: string[]          // Optionnel, null pour RAW
  episodeNumbers?: number[]          // Pour les séries
}
```

---

### POST /shares - CreateShareRequest

```typescript
interface CreateShareRequest {
  // === MODE DE CRÉATION (mutuellement exclusifs) ===
  assetIds?: number[]                // Partage direct d'assets
  items?: ShareContentItem[]         // Partage de contents par title

  // === CONFIGURATION SÉCURITÉ ===
  type: 'StreamingBasic' | 'StreamingTagSecure'
  maxDays: number
  maxViews: number
  maxIPs?: number

  // === BURN & WATERMARK ===
  burnText?: string
  burnEmail?: boolean

  // === CLIPS ===
  maxClipsNumber?: number
  maxClipsDuration?: string          // Format "HH:mm:ss"

  // === ÉDITORIAL ===
  shareName?: string
  comment?: string

  // === DESTINATAIRES ===
  recipientEmails?: string[]
  sendEmailNotification?: boolean
  generateLink?: boolean
}
```

**Limites documentées :**
- Max 10 titles par screening
- Max 20 assets en multi-sélection
- Max 50 destinataires (10 si forensic actif)

---

### GET /shares/{key} - ShareResponse (Viewlink)

```typescript
interface ShareResponse {
  id: number
  key: string
  comment: string | null

  // === CONTENU ===
  titles: ShareTitleView[]
  assets: ShareAssetView[]

  // === CONFIGURATION ===
  type: 'StreamingBasic' | 'StreamingTagSecure'
  expirationDate: string
  maxViews: number
  maxIPs: number | null

  // === ÉTAT ===
  isActive: boolean
  viewsRemaining: number
  ipsRemaining: number | null
  daysRemaining: number

  // === CLIPS ===
  clipsEnabled: boolean
  clipsRemaining: number | null
  maxClipDuration: string | null
}

interface ShareTitleView {
  titleId: number
  titleName: string
  posterUrl: string | null
  contents: ShareContentView[]
}

interface ShareContentView {
  contentId: number
  contentName: string
  contentType: string
  duration: string
  audioLanguage: string
  subtitleLanguage: string | null
  streamUrl: string
  thumbnailUrl: string | null
}

interface ShareAssetView {
  assetId: number
  assetName: string
  assetType: string
  duration: string | null
  streamUrl: string
  thumbnailUrl: string | null
}
```

---

### GET /shares - ShareListResponse

Query params: `?page=&size=&objectId=&titleId=&status=&sort=`

```typescript
interface ShareListResponse {
  data: ShareListItem[]
  totalCount: number
}

interface ShareListItem {
  id: number
  key: string
  comment: string | null

  titles: ShareTitleSummary[]
  assets: ShareAssetSummary[]

  status: 'active' | 'expired' | 'viewsExhausted' | 'pending'
  expirationDate: string

  totalViews: number
  uniqueIPs: number
  recipientCount: number

  createdAt: string
  createdBy: string
}

interface ShareTitleSummary {
  titleId: number
  titleName: string
  posterUrl: string | null
  contentCount: number
}

interface ShareAssetSummary {
  assetId: number
  assetName: string
  assetType: string
}
```

---

### PUT /shares/{shareId} - UpdateShareRequest

```typescript
interface UpdateShareRequest {
  comment?: string

  // Extension des limites uniquement
  maxDays?: number
  maxViews?: number
  maxIPs?: number

  // Gestion destinataires
  addRecipientEmails?: string[]
  removeRecipientEmails?: string[]
}
```

*Note: Pas de modification du contenu (titles/langues) après création.*

---

### GET /shares/{shareId}/metrics - ShareMetricsResponse

```typescript
interface ShareMetricsResponse {
  shareId: number

  // Stats globales
  totalViews: number
  uniqueIPs: number
  totalWatchTime: string
  averageWatchPercentage: number

  // Stats par title
  titleStats: TitleStats[]

  // Sessions de visionnage
  sessions: SessionStats[]

  // Clips créés
  clips: ClipInfo[]
}

interface TitleStats {
  titleId: number
  titleName: string
  views: number
  watchTime: string
  averagePercentage: number
}

interface SessionStats {
  ip: string | null
  email: string | null
  startTime: string
  watchTime: string
  watchPercentage: number
  watchMarkers: WatchMarker[]
}

interface WatchMarker {
  start: string                      // Timecode "HH:mm:ss"
  end: string
}

interface ClipInfo {
  clipId: number
  createdBy: string
  createdAt: string
  startTime: string
  endTime: string
  duration: string
  comment: string | null
  contentName: string
  titleName: string
}
```

---

## Endpoints Modale de Création

> ⚠️ **À valider avec l'équipe dev** : préfixe et structure des endpoints

### GET - Recherche Titles

```typescript
// Query: ?q=avatar&page=&size=

interface TitleSearchResponse {
  data: TitleSearchItem[]
  totalCount: number
}

interface TitleSearchItem {
  titleId: number
  titleName: string
  year: number | null
  posterUrl: string | null
  contentCount: number
  hasSharePermission: boolean
}
```

### GET - Contents d'un Title

```typescript
interface TitleContentsResponse {
  titleId: number
  titleName: string
  contents: ContentItem[]
}

interface ContentItem {
  contentId: number
  contentName: string
  contentType: string
  duration: string | null
  isMezz: boolean
  thumbnailUrl: string | null
  isSeries: boolean
  episodeCount: number | null
}
```

### GET - Langues Disponibles pour un Content

```typescript
interface ContentLanguagesResponse {
  contentId: number
  contentName: string
  isMezz: boolean
  audioLanguages: LanguageOption[]
  subtitleLanguages: LanguageOption[] | null  // null si RAW
  episodes: EpisodeInfo[] | null
}

interface LanguageOption {
  code: string
  label: string
}

interface EpisodeInfo {
  episodeNumber: number
  episodeName: string | null
}
```

---

## Règles Métier par Endpoint

### POST /shares - Création

| # | Règle | Validation |
|---|-------|------------|
| R1 | `assetIds` et `items` mutuellement exclusifs | 400 Bad Request |
| R2 | Max 10 titles par screening | 400 + message |
| R3 | Max 20 assets en multi-sélection | 400 + message |
| R4 | User doit avoir `aclShareCreate` | 403 Forbidden |
| R5 | Platform doit avoir licence ShareScreening | 403 Forbidden |
| R6 | Quota billing non dépassé | 402/403 |
| R7 | Langues audio/ST doivent exister sur le Content | 400 + détail |
| R8 | Content RAW → backend resolve asset par langue | Transparent |
| R9 | `burnEmail: true` → bloque `generateLink` | 400 |
| R10 | Title récent (< N jours config) → forensic auto | Backend compute |
| R11 | Forensic actif → bloque `generateLink` | 400 |
| R12 | Forensic actif → max 10 destinataires | 400 + message |
| R13 | Sans forensic → max 50 destinataires | 400 + message |
| R14 | `maxDays`/`maxViews` cappés par config platform | Silently capped |
| R15 | Watermark text requis pour TagSecure (si pas HLS) | 400 |
| R16 | Séries → `episodeNumbers` requis | 400 |

### GET /shares/{key} - Viewlink

| # | Règle | Comportement |
|---|-------|--------------|
| R17 | Share expiré | `isActive: false`, page erreur |
| R18 | Vues épuisées | `viewsRemaining: 0`, page erreur |
| R19 | IPs max atteintes | Blocage accès |
| R20 | Incrémenter compteur vues | Backend tracking |
| R21 | Enregistrer IP | Backend tracking |

### GET /shares - Liste

| # | Règle | Comportement |
|---|-------|--------------|
| R22 | Filtrage par `objectId`, `titleId`, `status` | Query params |
| R23 | User voit uniquement ses shares + platform | ACL check |

### PUT /shares/{shareId} - Modification

| # | Règle | Comportement |
|---|-------|--------------|
| R24 | Pas de modification contenu après création | Champs ignorés |
| R25 | `maxDays`/`maxViews` extension uniquement | Validation ≥ actuel |
| R26 | Ajout destinataires respecte limite forensic | 400 si dépassé |

### GET /shares/{shareId}/metrics - Analytics

| # | Règle | Comportement |
|---|-------|--------------|
| R27 | Agrégation vues par title | `titleStats[]` |
| R28 | Sessions identifiées par IP ou email | `sessions[]` |
| R29 | Watch markers = segments visionnés | `watchMarkers[]` |

### Clips Endpoints

| # | Règle | Comportement |
|---|-------|--------------|
| R30 | Clips limités par `maxClipsNumber` | 400 si dépassé |
| R31 | Durée clip limitée par `maxClipsDuration` | 400 si dépassé |
| R32 | Import clip → créé sur asset source | Lien traçabilité |
