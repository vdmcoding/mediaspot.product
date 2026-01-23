---
stepsCompleted: [1, 2]
inputDocuments:
  - docs/features/storefront/prd.md
  - docs/features/storefront/epics.mvp.md
  - docs/features/storefront/epics.1.1.md
  - docs/features/storefront/source-documents/lib/admin-types.ts
  - docs/features/storefront/source-documents/lib/admin-api.ts
  - docs/features/storefront/source-documents/lib/browsing-types.ts
  - docs/features/storefront/source-documents/lib/browsing-api.ts
workflowType: architecture
project_name: Storefront MVP + v1.1
user_name: Ben
date: 2026-01-23
scope:
  focus: API Contract Only
  includes:
    - DTOs (request/response)
    - Liste des endpoints actuels
    - Payloads détaillés
    - Responses attendues
    - Règles métier par endpoint
    - Migration URLs (convention identifiant)
    - Specs Growth v1.1 (sélection granulaire contenus)
  excludes:
    - Implementation backend
    - Choix techniques internes
    - Patterns architecture code
---

# Architecture API - Storefront

_Document focalisé sur le contrat API. Les choix d'implémentation backend sont hors scope._

## Scope

**Inclus :**
- DTOs (request/response)
- Liste des endpoints (MVP + v1.1)
- Payloads détaillés
- Responses attendues
- Règles métier par endpoint
- Migration URLs vers convention identifiant
- Specs Growth v1.1 (sélection granulaire contenus)

**Exclus :**
- Choix d'implémentation (patterns, services, etc.)
- Architecture code interne
- Décisions techniques backend

## Documents de Référence

- PRD Storefront (38 FRs en Gherkin)
- Epics MVP (6 epics, 24 stories)
- Source code API Admin (admin-api.ts, admin-types.ts)
- Source code API Browsing (browsing-api.ts, browsing-types.ts)

---

## Vue d'Ensemble Architecture

### Services API

| Service | Base URL | Authentification | Usage |
|---------|----------|------------------|-------|
| **Admin API** | `storefront-service/api/admin` | Basic Auth (authKey) | Gestion storefronts, users, documents |
| **Public API** | `storefront-service/api/public` | Aucune | Account flow, login |
| **Browsing API** | `storefront-service/api/browsing` | Basic Auth + X-Origin-Url | Browsing client, wishlists |

### Routes Frontend

**Admin** (`/storefronts`)
- `/storefronts` - Liste des storefronts
- `/storefronts/:id/catalog` - Gestion catalogue
- `/storefronts/:id/collections` - Gestion collections
- `/storefronts/:id/branding` - Configuration branding
- `/storefronts/:id/homepage` - Configuration homepage
- `/storefronts/:id/points-of-contact` - Points de contact
- `/storefronts/:id/documents` - Documents
- `/storefronts/:id/users` - Gestion utilisateurs

**Browsing** (`/store/:subdomain`)
- `/store/:subdomain` - Homepage client
- `/store/:subdomain/catalog` - Catalogue
- `/store/:subdomain/collections` - Collections
- `/store/:subdomain/wishlists` - Wishlists
- `/store/:subdomain/titles/:id` - Page titre
- `/store/:subdomain/welcome` - Page d'accueil non connecté
- `/store/:subdomain/login` - Connexion
- `/store/:subdomain/request-account` - Demande d'accès
- `/store/:subdomain/confirm-account/:token` - Confirmation compte

---

## Convention URL & Migration

### Principe

Toutes les URLs API doivent inclure l'identifiant de contexte en premier segment du path :
- **Admin API** : `/{storefrontId}/...` - identifie le storefront sur lequel on agit
- **Public/Browsing API** : `/{subdomain}/...` - identifie le storefront par son subdomain

**Avantages :**
- Lisibilité immédiate du contexte d'action
- Uniformité des patterns d'URL
- Debugging facilité (logs, monitoring)
- Cohérence avec les routes frontend

### Migration Endpoints Admin API

| Endpoint actuel | Problème | Endpoint cible |
|-----------------|----------|----------------|
| `GET /images/{id}` | Pas de storefrontId | `GET /{storefrontId}/images/{imageId}` |
| `DELETE /images/{role}/{fileId}` | Pas de storefrontId | `DELETE /{storefrontId}/images/{role}/{fileId}` |
| `GET /documents/{documentId}` | Pas de storefrontId | `GET /{storefrontId}/documents/{documentId}` |
| `DELETE /documents/{documentId}` | Pas de storefrontId | `DELETE /{storefrontId}/documents/{documentId}` |
| `POST /approve-user` | storefrontId dans body | `POST /{storefrontId}/pending-requests/{requestId}/approve` |
| `DELETE /pending-requests/{requestId}` | Pas de storefrontId | `DELETE /{storefrontId}/pending-requests/{requestId}` |
| `PATCH /users/{userId}/set-status` | Pas de storefrontId | `PATCH /{storefrontId}/users/{userId}/status` |
| `DELETE /users/{userId}` | Pas de storefrontId | `DELETE /{storefrontId}/users/{userId}` |

### Migration Endpoints Public API

| Endpoint actuel | Problème | Endpoint cible |
|-----------------|----------|----------------|
| `POST /account-creation-request` | storefrontId dans body | `POST /{subdomain}/account-request` |
| `PUT /set-password` | storefrontId dans body | `PUT /{subdomain}/set-password` |
| `GET /get-by-subdomain/{subdomain}` | Préfixe redondant | `GET /{subdomain}` |
| `GET /get-by-subdomain/{subdomain}/images/{fileId}` | Préfixe redondant | `GET /{subdomain}/images/{fileId}` |

### Migration Endpoints Browsing API

| Endpoint actuel | Problème | Endpoint cible |
|-----------------|----------|----------------|
| `GET /by-subdomain/{subdomain}` | Préfixe inutile | `GET /{subdomain}` |
| `GET /wishlists` | Subdomain via header | `GET /{subdomain}/wishlists` |
| `GET /wishlists/{id}` | Subdomain via header | `GET /{subdomain}/wishlists/{id}` |
| `POST /wishlists` | Subdomain via header | `POST /{subdomain}/wishlists` |
| `PATCH /wishlists/{id}` | Subdomain via header | `PATCH /{subdomain}/wishlists/{id}` |
| `DELETE /wishlists/{id}` | Subdomain via header | `DELETE /{subdomain}/wishlists/{id}` |
| `POST /wishlists/{id}/titles` | Subdomain via header | `POST /{subdomain}/wishlists/{id}/titles` |
| `DELETE /wishlists/{id}/titles` | Subdomain via header | `DELETE /{subdomain}/wishlists/{id}/titles` |

### Stratégie de Migration

1. **Nouvelles URLs** : Implémenter les nouveaux patterns
2. **Backward compatibility** : Maintenir les anciens endpoints temporairement (deprecated)
3. **Migration frontend** : Mettre à jour les appels API côté client
4. **Suppression** : Retirer les anciens endpoints après migration complète

---

## DTOs

### Types Communs

#### StorefrontPointOfContact

```typescript
interface StorefrontPointOfContact {
  id: number
  fullName: string
  role: string
  description: string | null
  phoneNumber: string | null
  email: string | null
  avatarId: number | null
}
```

#### StorefrontDocument

```typescript
interface StorefrontDocument {
  id: number
  fileName: string
  fileType: 'Doc' | 'Docx' | 'Pdf' | 'Ppt' | 'Pptx'
}
```

#### StorefrontImageType

```typescript
enum StorefrontImageType {
  logo = 'logo'
  cover = 'cover'
  avatar = 'avatar'
}
```

#### UploadedImage

```typescript
interface UploadedImage {
  id: number
  base64: string
}
```

#### StorefrontCatalog

```typescript
interface StorefrontCatalog {
  titleIds: number[]
  collectionIds: number[]
}
```

#### StorefrontBranding

```typescript
interface StorefrontBranding {
  heroSliderTitleIds: number[]
  showcasedCollectionIds: number[]
  showcasedGenres: Array<{
    value: string
    titleCoverId: number
  }>
  catchphrase: string | null
  logoId: number | null
  coverId: number | null
}
```

---

### DTOs Admin

#### StorefrontFull (Response complète)

```typescript
interface StorefrontFull {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  subdomain: string
  titleIds: number[]
  collectionIds: number[]
  branding: StorefrontBranding
  pointsOfContact: StorefrontPointOfContact[]
  documents: StorefrontDocument[]
  userCount: number
  requestCount: number
}
```

#### StorefrontList (Response liste)

```typescript
interface StorefrontList {
  id: number
  name: string
  subdomain: string
  userCount: number
  requestCount: number
}
```

#### StorefrontLogin (Response publique)

```typescript
interface StorefrontLogin {
  id: number
  name: string
  catchphrase: string | null
  logoId: number | null
  coverId: number | null
}
```

#### User

```typescript
enum UserStatusEnum {
  DISABLED = 'DISABLED'
  EXPIRED = 'EXPIRED'
  PENDING = 'PENDING'
  ACTIVE = 'ACTIVE'
}

interface User {
  id: number
  fullName: string
  email: string  // email validé
  companyName: string
  status: 'DISABLED' | 'EXPIRED' | 'PENDING' | 'ACTIVE'
  expirationDate: string | null
}
```

#### UserRequest

```typescript
interface UserRequest {
  id: number
  firstName: string
  lastName: string
  companyName: string
  email: string
}
```

---

### DTOs Forms (Validation Zod)

#### CreateDuplicateStorefrontForm

```typescript
interface CreateDuplicateStorefrontForm {
  name: string      // 2-100 chars, lettres et espaces uniquement
  subdomain: string // 3-50 chars, lowercase, chiffres, tirets
}
```

**Règles de validation :**
- `name` : min 2, max 100, regex `/^[a-zA-Z\s]+$/`
- `subdomain` : min 3, max 50, regex `/^[a-z0-9-]+$/`, doit commencer et finir par lettre/chiffre, pas de tirets consécutifs

#### AddEditPointOfContactForm

```typescript
interface AddEditPointOfContactForm {
  fullName: string      // 2-100 chars, requis
  role: string          // 2-100 chars, requis
  email?: string        // email valide, optionnel
  phoneNumber?: string  // optionnel
  description?: string  // optionnel
  avatarFile?: File     // optionnel
  avatarId?: number     // optionnel
}
```

#### AddDocumentForm

```typescript
interface AddDocumentForm {
  fileName: string  // 2-100 chars, requis
  file: File        // requis
}
```

---

### DTOs Browsing

#### Wishlist

```typescript
interface Wishlist {
  id: number
  name: string
  titleIds: number[]
}
```

#### CreateWishlistRequest

```typescript
interface CreateWishlistRequest {
  name: string
  titleIds: number[]
}
```

#### UpdateWishlistRequest

```typescript
interface UpdateWishlistRequest {
  id: number
  name: string
}
```

#### AddRemoveTitlesWishlistRequest

```typescript
interface AddRemoveTitlesWishlistRequest {
  wishlistId: number
  titleIds: number[]
}
```

#### RequestAccountRequest

```typescript
interface RequestAccountRequest {
  firstName: string
  lastName: string
  email: string
  companyName: string
  storefrontId: number
}
```

#### ConfirmAccountRequest

```typescript
interface ConfirmAccountRequest {
  email: string
  password: string
  confirmPassword: string
  storefrontId: number
}
```

#### StorefrontLoginRequest

```typescript
interface StorefrontLoginRequest {
  email: string
  password: string
}
```

#### LoginResponse

```typescript
interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
}
```

#### GetStorefrontCatalogRequest

```typescript
interface GetStorefrontCatalogRequest {
  storefrontTitleIds: number[]
  pageSize: number | null
  pageIndex: number
  subcategory?: IDbBaseMetadataValueInfos
  pattern?: string
  sort?: SortingInfos
  filters?: FilterValue[]
}
```

---

## Endpoints Admin API

Base URL: `storefront-service/api/admin`

### Storefront CRUD

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/` | Lister tous les storefronts | - | `StorefrontList[]` |
| **GET** | `/{id}` | Détail d'un storefront | - | `StorefrontFull` |
| **POST** | `/` | Créer un storefront | `CreateStorefrontRequest` | `number` (id) |
| **POST** | `/duplicate` | Dupliquer un storefront | `DuplicateStorefrontRequest` | `number` (id) |
| **PATCH** | `/{id}` | Modifier un storefront | `UpdateStorefrontRequest` | `StorefrontFull` |
| **DELETE** | `/{id}` | Supprimer un storefront | - | `StorefrontFull` |

#### CreateStorefrontRequest

```typescript
interface CreateStorefrontRequest {
  name: string
  subdomain: string
}
```

#### DuplicateStorefrontRequest

```typescript
interface DuplicateStorefrontRequest {
  id: number       // ID du storefront source
  name: string
  subdomain: string
}
```

#### UpdateStorefrontRequest

```typescript
interface UpdateStorefrontRequest {
  id: number
  fields: {
    name?: string
    subdomain?: string
    catalog?: {
      titleIds: number[]
      collectionIds: number[]
    }
    branding?: StorefrontBranding
    customers?: number[]
    pointsOfContact?: StorefrontPointOfContact[]
    documents?: StorefrontDocument[]
  }
}
```

---

### Images

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/images/{id}` | Récupérer une image | - | `UploadedImage` |
| **POST** | `/{storefrontId}/{type}/images` | Upload image | `FormData` | `UploadedImage` |
| **DELETE** | `/images/{role}/{fileId}` | Supprimer image | - | `void` |

**Types d'images :** `logo`, `cover`, `avatar`

---

### Documents

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **POST** | `/{storefrontId}/documents` | Ajouter document | `FormData` | `void` |
| **GET** | `/documents/{documentId}` | Télécharger document | - | `File` |
| **DELETE** | `/documents/{documentId}` | Supprimer document | - | `void` |

---

### Points de Contact

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **POST** | `/{storefrontId}/points-of-contact` | Ajouter/modifier contact | `FormData` | `StorefrontPointOfContact` |

---

### Users & Requests

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/{id}/users` | Lister users d'un storefront | - | `User[]` |
| **GET** | `/{id}/pending-requests` | Lister demandes pending | - | `UserRequest[]` |
| **POST** | `/approve-user` | Approuver demande | `UserRequestMutation` | `void` |
| **DELETE** | `/pending-requests/{requestId}` | Rejeter demande | - | `void` |
| **PATCH** | `/users/{userId}/set-status?enable={bool}` | Activer/désactiver user | - | `void` |
| **DELETE** | `/users/{userId}` | Supprimer user | - | `void` |

#### UserRequestMutation

```typescript
interface UserRequestMutation {
  storefrontId: number
  id: number
  firstName: string
  lastName: string
  companyName: string
  email: string
  enableUser: boolean
  expirationDate: string | null
}
```

---

## Endpoints Public API

Base URL: `storefront-service/api/public`

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **POST** | `/account-creation-request` | Demander accès | `RequestAccountRequest` | `string` |
| **GET** | `/account-creation-request/{token}` | Récupérer demande pour confirmation | - | `UserRequest` |
| **PUT** | `/set-password` | Confirmer compte | `ConfirmAccountRequest` | `void` |
| **GET** | `/get-by-subdomain/{subdomain}` | Storefront par subdomain (public) | - | `StorefrontLogin` |
| **GET** | `/get-by-subdomain/{subdomain}/images/{fileId}` | Image publique | - | `UploadedImage` |
| **GET** | `/{subdomain}/documents` | Documents publics | - | `StorefrontDocument[]` |
| **GET** | `/{subdomain}/documents/{documentId}` | Télécharger document | - | `File` |

---

## Endpoints Browsing API

Base URL: `storefront-service/api/browsing`

### Storefront & Catalogue

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/by-subdomain/{subdomain}` | Storefront complet (auth) | - | `StorefrontFull` |
| **GET** | - | Catalogue paginé/filtré | `GetStorefrontCatalogRequest` | `SearchResponse` |
| **GET** | - | Collections | `number[]` (collectionIds) | `DbObjectCollectionInfos[]` |

---

### Wishlists

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/wishlists` | Lister wishlists user | - | `Wishlist[]` |
| **GET** | `/wishlists/{id}` | Détail wishlist | - | `Wishlist` |
| **POST** | `/wishlists` | Créer wishlist | `CreateWishlistRequest` | `Wishlist` |
| **PATCH** | `/wishlists/{id}` | Renommer wishlist | `{ name: string }` | `Wishlist` |
| **DELETE** | `/wishlists/{id}` | Supprimer wishlist | - | `Wishlist` |
| **POST** | `/wishlists/{wishlistId}/titles` | Ajouter titres | `{ titleIds: number[] }` | `void` |
| **DELETE** | `/wishlists/{wishlistId}/titles` | Retirer titres | `{ titleIds: number[] }` | `void` |

---

## Règles Métier par Endpoint

### Storefront CRUD

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R1 | `name` : 2-100 chars, lettres et espaces | POST `/`, POST `/duplicate` | 400 Bad Request |
| R2 | `subdomain` : 3-50 chars, lowercase, chiffres, tirets | POST `/`, POST `/duplicate` | 400 Bad Request |
| R3 | `subdomain` doit être unique | POST `/`, POST `/duplicate` | 400/409 Conflict |
| R4 | `subdomain` commence et finit par lettre/chiffre | POST `/`, POST `/duplicate` | 400 Bad Request |
| R5 | `subdomain` sans tirets consécutifs | POST `/`, POST `/duplicate` | 400 Bad Request |
| R6 | Duplication copie tout sauf users clients | POST `/duplicate` | Backend logic |
| R7 | Suppression cascade (branding, catalog, users, wishlists, docs, contacts) | DELETE `/{id}` | Backend logic |

### Images

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R8 | Type image valide : `logo`, `cover`, `avatar` | POST `/{id}/{type}/images` | 400 Bad Request |
| R9 | Format image supporté (png, jpg, etc.) | POST `/{id}/{type}/images` | 400 Bad Request |

### Documents

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R10 | `fileName` : 2-100 chars | POST `/{id}/documents` | 400 Bad Request |
| R11 | `fileType` valide : Doc, Docx, Pdf, Ppt, Pptx | POST `/{id}/documents` | 400 Bad Request |

### Points de Contact

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R12 | `fullName` : 2-100 chars, requis | POST `/{id}/points-of-contact` | 400 Bad Request |
| R13 | `role` : 2-100 chars, requis | POST `/{id}/points-of-contact` | 400 Bad Request |
| R14 | `email` : format email valide si fourni | POST `/{id}/points-of-contact` | 400 Bad Request |

### Account Flow

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R15 | Email unique par storefront | POST `/account-creation-request` | 400/409 |
| R16 | Token de confirmation valide et non expiré | GET `/account-creation-request/{token}` | 404 Not Found |
| R17 | `password` et `confirmPassword` identiques | PUT `/set-password` | 400 Bad Request |
| R18 | Confirmation passe statut PENDING → ACTIVE | PUT `/set-password` | Backend logic |

### User Management

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R19 | Approbation : peut définir expirationDate | POST `/approve-user` | Optionnel |
| R20 | Approbation déclenche email confirmation | POST `/approve-user` | Backend logic |
| R21 | Rejet supprime la demande, pas de notification | DELETE `/pending-requests/{id}` | Backend logic |
| R22 | Désactivation → statut DISABLED | PATCH `/users/{id}/set-status?enable=false` | Backend logic |
| R23 | Réactivation → statut ACTIVE | PATCH `/users/{id}/set-status?enable=true` | Backend logic |
| R24 | Expiration automatique → statut EXPIRED | Cron job | Backend logic |

### Browsing & Catalogue

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R25 | Client doit être ACTIVE pour accéder | Tous endpoints `/api/user` | 401/403 |
| R26 | Client voit uniquement titres/collections du storefront | GET catalogue | Backend filter |
| R27 | Pagination supportée (pageSize, pageIndex) | GET catalogue | Query params |
| R28 | Filtrage multi-critères (genre, type, qualité, format) | GET catalogue | Query params |
| R29 | Recherche par pattern (string) | GET catalogue | Query params |

### Wishlists

| # | Règle | Endpoint | Validation |
|---|-------|----------|------------|
| R30 | Wishlist appartient à l'utilisateur connecté | Tous endpoints wishlists | 403 si autre user |
| R31 | Wishlists isolées par storefront | Tous endpoints wishlists | Backend filter |
| R32 | Ajout de titres : titres doivent exister dans le storefront | POST `/{id}/titles` | 400 si titre invalide |
| R33 | Persistance entre sessions (JWT) | Tous endpoints wishlists | Backend logic |

### Sécurité Multi-tenant

| # | Règle | Scope | Comportement |
|---|-------|-------|--------------|
| R34 | Isolation complète entre storefronts | Global | Données jamais partagées |
| R35 | Admin voit uniquement storefronts assignés | Admin API | ACL check |
| R36 | Client accède uniquement storefront invité | Browsing API | Header X-Origin-Url + subdomain |
| R37 | JWT avec expiration appropriée | Auth | Token refresh |
| R38 | Contenus vidéo accessibles uniquement si ACTIVE | Player | 401/403 |

---

## Cache Tags RTK Query

### Admin API

| Tag | Invalidation |
|-----|--------------|
| `Storefront` | CRUD storefront, mise à jour |
| `StorefrontUsers` | CRUD users, approve/reject |
| `StorefrontPendingRequests` | Approve/reject requests |
| `StorefrontImages` | Upload/delete images |
| `StorefrontDocuments` | Upload/delete documents |

### Browsing API

| Tag | Invalidation |
|-----|--------------|
| `StorefrontPublic` | - |
| `StorefrontBrowsing` | Par subdomain |
| `Wishlist` | CRUD wishlists, add/remove titles |

---

## Statuts Utilisateur

```
PENDING → (approve) → ACTIVE
                    ↓
                 (disable)
                    ↓
                DISABLED ← (expire) ← ACTIVE
                    ↓
                (enable)
                    ↓
                 ACTIVE
```

| Statut | Accès storefront | Actions admin |
|--------|------------------|---------------|
| **PENDING** | ❌ Non | Approve, Reject |
| **ACTIVE** | ✅ Oui | Disable, Delete |
| **DISABLED** | ❌ Non | Enable, Delete |
| **EXPIRED** | ❌ Non | Enable, Delete |

---

# Specs v1.1 - Growth : Sélection Granulaire des Contenus

## Objectif

Permettre aux admins de contrôler finement quels contenus sont exposés par titre sur le storefront, en sélectionnant des `contentId` spécifiques.

## Nouveaux DTOs

### StorefrontTitleContent

```typescript
interface StorefrontTitleContent {
  titleId: number
  exposedContentIds: number[]  // IDs des contenus exposés
}
```

### StorefrontCatalogItem (Response enrichie)

```typescript
interface StorefrontCatalogItem {
  titleId: number
  titleName: string
  thumbnailUrl: string | null
  exposedContentIds: number[]      // IDs des contenus exposés
  bestQuality: string              // Qualité maximale disponible
  audioLanguages: string[]         // Langues audio disponibles
  subtitleLanguages: string[]      // Langues sous-titres disponibles
}
```

### ContentType (Enum - utilisé pour bulk uniquement)

```typescript
enum ContentType {
  FEATURE = 'FEATURE'      // Contenu principal (film, épisodes complets)
  TRAILER = 'TRAILER'      // Bande-annonce
  MARKETING = 'MARKETING'  // Matériel promotionnel
  EPISODE = 'EPISODE'      // Épisodes individuels (séries)
}
```

### BulkContentUpdateRequest

```typescript
interface BulkContentUpdateRequest {
  titleIds: number[]
  contentTypes: ContentType[]  // Types à activer (best effort par type)
}
```

---

## Nouveaux Endpoints Admin API

### Gestion des contenus par titre

| Méthode | Endpoint | Action | Request | Response |
|---------|----------|--------|---------|----------|
| **GET** | `/{storefrontId}/titles` | Lister titres avec contenus | Query params | `StorefrontCatalogItem[]` |
| **GET** | `/{storefrontId}/titles/{titleId}/contents` | Contenus d'un titre | - | `StorefrontTitleContent` |
| **PUT** | `/{storefrontId}/titles/{titleId}/contents` | Modifier contenus d'un titre (par IDs) | `{ exposedContentIds: number[] }` | `StorefrontTitleContent` |
| **PATCH** | `/{storefrontId}/titles/contents` | Modification bulk (par types) | `BulkContentUpdateRequest` | `StorefrontTitleContent[]` |

---

## Modification Endpoints Existants

### PATCH /{storefrontId} - UpdateStorefrontRequest (étendu)

```typescript
interface UpdateStorefrontRequest {
  id: number
  fields: {
    // ... champs existants ...
    catalog?: {
      // MODIFIÉ v1.1 : titles devient un array d'objets avec exposedContentIds
      titles: Array<{
        titleId: number
        exposedContentIds: number[]  // IDs des contenus exposés pour ce titre
      }>
      collectionIds: number[]
    }
  }
}
```

### POST /{storefrontId}/titles - Ajout de titres (étendu)

```typescript
interface AddTitlesRequest {
  titles: Array<{
    titleId: number
    exposedContentIds?: number[]  // Optionnel, si absent → tous contenus exposés
  }>
}
```

---

## Endpoints Browsing (Impact v1.1)

### GET /{subdomain}/titles/{titleId} - Page titre

Le player ne doit afficher que les contenus exposés par l'admin.

**Response enrichie :**

```typescript
interface TitleDetailResponse {
  titleId: number
  titleName: string
  // ... métadonnées existantes ...

  // NOUVEAU : contenus filtrés selon configuration admin
  availableContents: AvailableContent[]
}

interface AvailableContent {
  contentId: number
  contentName: string
  contentType: string        // Type du contenu (Feature, Trailer, etc.)
  duration: string
  streamId: number
}
```

---

## Règles Métier v1.1

### Sélection à l'ajout

| # | Règle | Endpoint | Comportement |
|---|-------|----------|--------------|
| R39 | Ajout titre sans `exposedContentIds` → tous contenus exposés par défaut | POST `/{id}/titles` | Backend logic |
| R40 | `contentId` doit exister sur le titre | POST `/{id}/titles`, PUT contents | 400 Bad Request |

### Vue catalogue admin

| # | Règle | Endpoint | Comportement |
|---|-------|----------|--------------|
| R41 | Colonnes : Title, Shared Contents (tags), Best Quality, Audio, Subtitles | GET `/{id}/titles` | Response format |
| R42 | Tags contenus : affichage visuel des contenus exposés | GET `/{id}/titles` | Frontend display |

### Modification individuelle

| # | Règle | Endpoint | Comportement |
|---|-------|----------|--------------|
| R43 | Clic sur ligne titre → drawer avec checkboxes par contenu | Frontend UX | - |
| R44 | Sauvegarde immédiate au clic "Save" | PUT `/{id}/titles/{titleId}/contents` | Backend logic |

### Modification bulk

| # | Règle | Endpoint | Comportement |
|---|-------|----------|--------------|
| R45 | Sélection multiple titres → bouton "Manage contents" | Frontend UX | - |
| R46 | Best effort par type : active les contenus du type demandé si disponibles | PATCH `/{id}/titles/contents` | Backend logic |
| R47 | "Apply to all" applique aux titres sélectionnés uniquement | PATCH `/{id}/titles/contents` | Backend logic |

### Affichage client

| # | Règle | Endpoint | Comportement |
|---|-------|----------|--------------|
| R48 | Player filtre selon `exposedContentIds` du titre | GET `/{subdomain}/titles/{id}` | Backend filter |
| R49 | Contenu non exposé = inaccessible (pas juste masqué) | GET `/{subdomain}/titles/{id}` | 403 Forbidden |
| R50 | Titre sans contenu exposé → page titre visible, player vide | GET `/{subdomain}/titles/{id}` | Backend logic |

---

## Schéma de Données

### Relation Storefront ↔ Title ↔ Contents

```
StorefrontFull
├── catalog
│   ├── titles: Array<{ titleId, exposedContentIds[] }>
│   └── collectionIds: number[]

Title (externe - catalogue distribution)
├── id: number
├── contents: Content[]                           // Tous les contenus du titre
    ├── id: number                                // contentId
    ├── type: string                              // Feature, Trailer, etc.
    ├── streamUrl: string
    └── ...
```

### Logique de filtrage (browsing)

```
1. Client demande /titles/{titleId}
2. Backend récupère titre depuis catalogue distribution
3. Backend récupère exposedContentIds depuis storefront config
4. Backend filtre contents selon exposedContentIds
5. Response ne contient que les contenus autorisés
```

---

## Impact Cache Tags

| Tag | Invalidation ajoutée |
|-----|---------------------|
| `StorefrontCatalog` | PUT/PATCH contents |
| `StorefrontTitleContents` | (nouveau) PUT `/{id}/titles/{titleId}/contents` |

---

## Récapitulatif Endpoints v1.1

| Méthode | Endpoint | Nouveau | Description |
|---------|----------|---------|-------------|
| GET | `/{storefrontId}/titles` | 🔄 Modifié | Liste enrichie avec contenus |
| GET | `/{storefrontId}/titles/{titleId}/contents` | ✅ | Contenus d'un titre |
| PUT | `/{storefrontId}/titles/{titleId}/contents` | ✅ | Modifier contenus titre |
| PATCH | `/{storefrontId}/titles/contents` | ✅ | Modification bulk |
| POST | `/{storefrontId}/titles` | 🔄 Modifié | Ajout avec contenus optionnels |
