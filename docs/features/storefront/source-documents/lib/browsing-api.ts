import { assetService, cacheService, searchService, userService } from '@/Core/Api/services'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ConfirmAccountRequest,
  CreateWishlistRequest,
  DeleteWishlistRequest,
  GetStorefrontCatalogRequest,
  StorefrontLoginRequest,
  RequestAccountRequest,
  UpdateWishlistRequest,
  Wishlist,
  WishlistSchema,
  AddRemoveTitlesWishlistRequest,
} from './types'
import { StorefrontDocument, StorefrontDocumentSchema, StorefrontFull, StorefrontFullSchema, StorefrontLogin, StorefrontLoginSchema, UploadedImage, UploadedImageSchema, UserRequest } from '../../admin/lib/types'
import { validate } from '@/Redux/Utils/rtk-query-utils'
import { SearchResponse } from '@/Core/Api/Types/search-response'
import { mapFilterValueToDbMetadataFieldValueInfos } from '@/Utils/Hooks/use-search-request-params'
import { SearchRequestNative } from '@/Core/Api/Types/search-request-native'
import { ObjectLayer } from '@/Core/Api/Types/object-layer'
import { baseUrl } from '../../admin/lib/api'
import z from 'zod'
import { DbObjectCollectionInfos } from '@/Core/Api/Types/db-object-collection-infos'
import { LoginResponse } from '@/Core/Api/Types/login-response'
import { LoginRequest } from '@/Core/Api/Types/login-request'

export const storefrontPublicApi = createApi({
  reducerPath: 'storefrontPublicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}storefront-service/api/public`,
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['StorefrontPublic'],
  endpoints: builder => ({
    requestAccount: builder.mutation<string, RequestAccountRequest>({
      query: body => ({
        url: 'account-creation-request',
        method: 'POST',
        body,
        responseHandler: response => response.text(),
      }),
      transformErrorResponse: (response) => {
        return response.data
      },
    }),
    getRequestForConfirmation: builder.query<UserRequest, string>({
      query: token => `account-creation-request/${token}`,
    }),
    confirmAccount: builder.mutation<void, ConfirmAccountRequest>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: body => ({
        url: 'set-password',
        method: 'PUT',
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, StorefrontLoginRequest>({
      queryFn: async (args) => {
        const { email, password } = args
        const response = await userService.Login(new LoginRequest({ login: email, password }))

        if (!response.user) {
          return { error: { status: 'CUSTOM_ERROR', error: 'User not found' } }
        }

        cacheService.SetAuth(response)
        cacheService.SetPlatformSettings(response.platformSettings)

        await userService.SetDataOnLoginSuccess()

        return { data: response }
      },
    }),
    getBySubdomainPublic: builder.query<StorefrontLogin, string>({
      query: subdomain => `get-by-subdomain/${subdomain}`,
      transformResponse: validate(StorefrontLoginSchema),
    }),
    getFileByIdPublic: builder.query<UploadedImage, { fileId: number, subdomain: string }>({
      query: ({ fileId, subdomain }) => ({
        url: `get-by-subdomain/${subdomain}/images/${fileId}`,
        method: 'GET',
      }),
      transformResponse: validate(UploadedImageSchema),
    }),
    getDocumentsBySubdomainPublic: builder.query<StorefrontDocument[], { subdomain: string }>({
      query: ({ subdomain }) => ({
        url: `${subdomain}/documents`,
        method: 'GET',
      }),
      transformResponse: validate(z.array(StorefrontDocumentSchema)),
    }),
    downloadStorefrontDocumentPublic: builder.query<File, { subdomain: string, documentId: number }>({
      query: ({ subdomain, documentId }) => ({
        url: `${subdomain}/documents/${documentId}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob()
          const fileName = response.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1] || 'download.pdf'
          const fileType = response.headers.get('Content-Type')
          return new File([blob], fileName ?? 'document', { type: fileType ?? 'application/pdf' })
        },
      }),
      transformResponse: validate(z.instanceof(File)),
    }),
  }),
})

export const storefrontBrowsingApi = createApi({
  reducerPath: 'storefrontBrowsingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}storefront-service/api/user`,
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      const authKey = cacheService.GetAuthKey()
      if (authKey) {
        headers.set('Authorization', `Basic ${authKey}`)
      }
      headers.set('X-Origin-Url', window.location.href)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['StorefrontBrowsing', 'Wishlist'],
  endpoints: builder => ({
    getStorefrontBySubdomain: builder.query<StorefrontFull, string>({
      query: subdomain => `/by-subdomain/${subdomain}`,
      transformResponse: validate(StorefrontFullSchema),
      providesTags: (result, error, subdomain) => [{ type: 'StorefrontBrowsing', subdomain }],
    }),
    getStorefrontCatalog: builder.query<SearchResponse, GetStorefrontCatalogRequest>({
      queryFn: async (args) => {
        const { storefrontTitleIds, pattern, pageSize, pageIndex, sort, filters, subcategory } = args

        const filtersFinal = [
          ...(filters?.map(filter => mapFilterValueToDbMetadataFieldValueInfos(filter)).flat() ?? []),
        ]

        if (subcategory) {
          filtersFinal.push(subcategory)
        }

        const request = new SearchRequestNative({
          limit: pageSize ?? null,
          page: pageIndex,
          pattern: pattern || null,
          outputLayer: ObjectLayer.Title,
          hideTitleWithoutAsset: false,
          onlyConfidential: false,
          logQuery: false,
          titleIds: storefrontTitleIds,
          sort: sort || null,
          metadata: filtersFinal || null,
        })

        const titles = await searchService.SearchBasic(request)
        return { data: titles ?? [] }
      },
    }),
    getCollections: builder.query<DbObjectCollectionInfos[], number[]>({
      queryFn: async (args) => {
        const collectionIds = args

        const collections = await Promise.allSettled(collectionIds.map(async (collectionId) => {
          const collection = await assetService.GetCollection(collectionId)
          return collection
        }))

        const validCollections = collections
          .filter(result => result.status === 'fulfilled' && result.value !== null && result.value.id !== -500)
          // @ts-expect-error - value has already been validated in filtering
          .map(result => result.value)

        return { data: validCollections ?? [] }
      },
    }),
    // Wishlists
    getWishlists: builder.query<Wishlist[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: () => 'wishlists',
      transformResponse: validate(z.array(WishlistSchema)),
      providesTags: ['Wishlist'],
    }),
    getWishlistById: builder.query<Wishlist, string>({
      query: id => `wishlists/${id}`,
      transformResponse: validate(WishlistSchema),
      providesTags: (result, error, id) => [{ type: 'Wishlist', id }],
    }),
    createWishlist: builder.mutation<Wishlist, CreateWishlistRequest>({
      query: ({ name, titleIds }) => ({
        url: '/wishlists',
        method: 'POST',
        body: { name, titleIds },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    updateWishlist: builder.mutation<Wishlist, UpdateWishlistRequest>({
      query: ({ id, name }) => ({
        url: `wishlists/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (result, error, { id }) => ['Wishlist', { type: 'Wishlist', id }],
    }),
    addTitlesToWishlist: builder.mutation<void, AddRemoveTitlesWishlistRequest>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ wishlistId, titleIds }) => ({
        url: `wishlists/${wishlistId}/titles`,
        method: 'POST',
        body: { titleIds },
      }),
      invalidatesTags: (result, error, { wishlistId }) => ['Wishlist', { type: 'Wishlist', id: wishlistId }],
    }),
    removeTitlesFromWishlist: builder.mutation<void, AddRemoveTitlesWishlistRequest>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ wishlistId, titleIds }) => ({
        url: `wishlists/${wishlistId}/titles`,
        method: 'DELETE',
        body: { titleIds },
      }),
      invalidatesTags: (result, error, { wishlistId }) => ['Wishlist', { type: 'Wishlist', id: wishlistId }],
    }),
    deleteWishlist: builder.mutation<Wishlist, DeleteWishlistRequest>({
      query: ({ id }) => ({
        url: `wishlists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => ['Wishlist', { type: 'Wishlist', id }],
    }),
  }),
})

export const { useRequestAccountMutation, useLoginMutation, useGetRequestForConfirmationQuery, useConfirmAccountMutation, useGetBySubdomainPublicQuery, useGetFileByIdPublicQuery, useGetDocumentsBySubdomainPublicQuery, useLazyDownloadStorefrontDocumentPublicQuery } = storefrontPublicApi
export const { useGetStorefrontBySubdomainQuery, useGetStorefrontCatalogQuery, useGetCollectionsQuery, useGetWishlistsQuery, useGetWishlistByIdQuery, useCreateWishlistMutation, useUpdateWishlistMutation, useDeleteWishlistMutation, useAddTitlesToWishlistMutation, useRemoveTitlesFromWishlistMutation } = storefrontBrowsingApi
