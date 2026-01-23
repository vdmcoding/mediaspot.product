---
stepsCompleted: [1]
inputDocuments:
  - docs/features/storefront/prd.md
  - docs/features/storefront/epics.mvp.md
  - docs/features/storefront/source-documents/lib/admin-types.ts
  - docs/features/storefront/source-documents/lib/admin-api.ts
  - docs/features/storefront/source-documents/lib/browsing-types.ts
  - docs/features/storefront/source-documents/lib/browsing-api.ts
workflowType: architecture
project_name: Storefront MVP
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
  excludes:
    - Implementation backend
    - Choix techniques internes
    - Patterns architecture code
    - Specs Growth (v1.1)
---

# Architecture API - Storefront MVP

_Document focalisé sur le contrat API du MVP en production. Les choix d'implémentation backend sont hors scope._

## Scope

**Inclus :**
- DTOs (request/response)
- Liste des endpoints actuels (MVP)
- Payloads détaillés
- Responses attendues
- Règles métier par endpoint

**Exclus :**
- Choix d'implémentation (patterns, services, etc.)
- Architecture code interne
- Décisions techniques backend
- Specs Growth (sélection granulaire contenus - v1.1)

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
| **User API** | `storefront-service/api/user` | Basic Auth + X-Origin-Url | Browsing client, wishlists |

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

## Endpoints User API (Browsing)

Base URL: `storefront-service/api/user`

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
| R36 | Client accède uniquement storefront invité | User API | Header X-Origin-Url + subdomain |
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
