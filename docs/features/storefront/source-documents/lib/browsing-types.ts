import { DbAssetObjectInfos, TitleContentData } from '@/Core/Api/Types/db-asset-object-infos'
import { SortingInfos } from '@/Redux/Reducers/redux-slice-filters'
import { FilterValue } from '@/Utils/Hooks/use-search-request-params'
import z from 'zod'
import { TitleHeroProps } from '../containers/storefront-title-hero'
import { IDbBaseMetadataValueInfos } from '@/Core/Api/Types/i-db-base-metadata-value-infos'

export interface StorefrontTitle {
  obj: DbAssetObjectInfos
  details: TitleContentData
  hero: TitleHeroProps
}

export const WishlistSchema = z.object({
  id: z.number(),
  name: z.string(),
  titleIds: z.array(z.number()),
})

export type Wishlist = z.infer<typeof WishlistSchema>

export const CreateWishlistSchema = z.object({
  name: z.string(),
  titleIds: z.array(z.number()),
})

export const RequestAccountSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  companyName: z.string(),
  storefrontId: z.number(),
})

export const ConfirmAccountSchema = z.object({
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string(),
  storefrontId: z.number(),
})

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
})

export interface CreateWishlistRequest {
  name: string
  titleIds: number[]
}

export interface UpdateWishlistRequest {
  id: number
  name: string
}

export interface AddRemoveTitlesWishlistRequest {
  wishlistId: number
  titleIds: number[]
}

export interface DeleteWishlistRequest {
  id: number
}

export type RequestAccountRequest = z.infer<typeof RequestAccountSchema>
export type ConfirmAccountRequest = z.infer<typeof ConfirmAccountSchema>
export type StorefrontLoginRequest = z.infer<typeof LoginSchema>

export interface GetStorefrontCatalogRequest {
  storefrontTitleIds: number[]
  pageSize: number | null
  pageIndex: number
  subcategory?: IDbBaseMetadataValueInfos
  pattern?: string
  sort?: SortingInfos
  filters?: FilterValue[]
}
