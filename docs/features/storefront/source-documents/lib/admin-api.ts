import { z } from 'zod'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { assetService, cacheService, orderService, searchService } from '@/Core/Api/services'
import { apiBaseUrls } from '@/Core/Api/base-urls'
import {
  StorefrontFull,
  StorefrontList,
  StorefrontBranding,
  StorefrontCustomer,
  StorefrontDocument,
  StorefrontPointOfContact,
  User,
  UserRequest,
  UserRequestMutation,
  ToggleUserEnabledMutation,
  UploadedImage,
  UploadedImageSchema,
  StorefrontImageType,
  StorefrontListSchema,
  StorefrontFullSchema,
} from './types'
import { SearchRequestNative } from '@/Core/Api/Types/search-request-native'
import { ObjectLayer } from '@/Core/Api/Types/object-layer'
import { DbObjectCollectionInfos } from '@/Core/Api/Types/db-object-collection-infos'
import { DbCustomerInfos } from '@/Core/Api/Types/db-customer-infos'
import { FilterValue, mapFilterValueToDbMetadataFieldValueInfos } from '@/Utils/Hooks/use-search-request-params'
import { StorefrontTitle } from '../../browsing/lib/types'
import { SearchResponse } from '@/Core/Api/Types/search-response'
import { aggregateAssetDataFromTitle } from './helpers'
import { validate } from '@/Redux/Utils/rtk-query-utils'

const envType = import.meta.env.VITE_ENV
export const baseUrl = apiBaseUrls[envType]
// export const baseUrl = 'https://j966bdvt-44376.uks1.devtunnels.ms/'

export type SearchRequestNativePlain = Partial<SearchRequestNative>

export interface CreateStorefrontRequest {
  name: string
  subdomain: string
}

export interface DuplicateStorefrontRequest {
  id: number
  name: string
  subdomain: string
}
export interface UpdateStorefrontRequest extends Partial<CreateStorefrontRequest> {
  id: number
  fields: {
    name?: string
    subdomain?: string
    catalog?: {
      titleIds: number[]
      collectionIds: number[]
    }
    branding?: StorefrontBranding
    customers?: StorefrontCustomer[]
    pointsOfContact?: StorefrontPointOfContact[]
    documents?: StorefrontDocument[]
  }
}

export interface DeleteStorefrontRequest {
  id: number
}
export interface GetDisplayableTitlesForStorefrontRequest {
  query: string
  limit: number | null
  filters?: FilterValue[]
  page: number
}
export interface GetStorefrontTitlesRequest {
  titleIds: number[]
  pageSize?: number
  pageIndex?: number
  extended?: boolean
}
export interface GetStorefrontCollectionsRequest {
  collectionIds: number[]
}

export interface GetStorefrontCustomersRequest {
  customerIds: number[]
}

export const storefrontApi = createApi({
  reducerPath: 'storefrontApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}storefront-service/api/admin`,
    credentials: 'same-origin',
    prepareHeaders: (headers) => {
      const authKey = cacheService.GetAuthKey()
      if (authKey) {
        headers.set('Authorization', `Basic ${authKey}`)
      }
      // headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Storefront', 'StorefrontUsers', 'StorefrontPendingRequests', 'StorefrontImages', 'StorefrontDocuments'],
  endpoints: builder => ({
    // Storefront CRUD
    getStorefronts: builder.query<StorefrontList[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: () => '',
      transformResponse: validate(z.array(StorefrontListSchema)),
      providesTags: ['Storefront'],
    }),
    getStorefrontById: builder.query<StorefrontFull, number>({
      query: id => `/${id}`,
      transformResponse: validate(StorefrontFullSchema),
      providesTags: (result, error, id) => [{ type: 'Storefront', id }],
    }),
    createStorefront: builder.mutation<number, CreateStorefrontRequest>({
      query: body => ({
        url: '',
        method: 'POST',
        body: {
          name: body.name,
          subdomain: body.subdomain,
        },
      }),
      transformResponse: validate(z.number()),
      invalidatesTags: ['Storefront'],
    }),
    duplicateStorefront: builder.mutation<number, DuplicateStorefrontRequest>({
      query: body => ({
        url: '/duplicate',
        method: 'POST',
        body: {
          id: body.id,
          name: body.name,
          subdomain: body.subdomain,
        },
      }),
      transformResponse: validate(z.number()),
      invalidatesTags: ['Storefront'],
    }),
    updateStorefront: builder.mutation<StorefrontFull, UpdateStorefrontRequest>({
      query: ({ id, fields }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: fields,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Storefront', id }],
    }),
    deleteStorefront: builder.mutation<StorefrontFull, DeleteStorefrontRequest>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Storefront'],
    }),
    // Storefront Titles / collections / customers lists
    searchStorefrontTitles: builder.query<SearchResponse, SearchRequestNativePlain>({
      queryFn: async (args) => {
        const request = new SearchRequestNative(args)
        request.outputLayer = ObjectLayer.Title
        request.withChildren = true
        const titles = await searchService.SearchBasic(request)

        const titlesWithContent = (titles.results ?? []).map((result) => {
          const titleSubData = aggregateAssetDataFromTitle(result)
          return {
            ...result,
            metadata: [
              ...(result.metadata ?? []),
              titleSubData.subtitleLanguages,
              titleSubData.audioLanguages,
              titleSubData.qualities,
            ],
          }
        })

        return { data: { ...titles, results: titlesWithContent } }
      },
    }),
    getStorefrontTitles: builder.query<StorefrontTitle[], GetStorefrontTitlesRequest>({
      queryFn: async (args) => {
        const { titleIds, extended = true } = args

        // manual pagination
        const detailedTitles = await Promise.allSettled(titleIds.map(async (titleId) => {
          try {
            const graphResponse = await assetService.GetGraph(titleId, extended, true, false)
            if (!graphResponse.graph) {
              throw new Error(`Failed to fetch title ${titleId}: Graph not found`)
            }
            const [heroData, contentData] = await assetService.GetTitleDataFromAssetObject(graphResponse.graph)
            return {
              obj: { ...graphResponse.graph },
              details: { ...contentData },
              hero: { ...heroData },
            }
          }
          catch (error) {
            console.warn(`Failed to fetch title ${titleId}:`, error)
            return null
          }
        }) ?? [])

        const validTitles = detailedTitles
          .filter(result => result.status === 'fulfilled' && result.value !== null)
          // @ts-expect-error - value has already been validated in filtering
          .map(result => result.value)

        return { data: validTitles ?? [] }
      },
      // transformResponse: validate(z.array(DbAssetObjectInfosSchema)),
    }),
    getDisplayableTitlesForStorefront: builder.query<SearchResponse, GetDisplayableTitlesForStorefrontRequest>({
      queryFn: async (args) => {
        const { query, limit, filters, page } = args

        const filtersFinal = filters?.map(filter => mapFilterValueToDbMetadataFieldValueInfos(filter)).flat()

        const request = new SearchRequestNative({
          limit: limit,
          pattern: query || null,
          outputLayer: ObjectLayer.Title,
          hideTitleWithoutAsset: false,
          onlyConfidential: false,
          logQuery: false,
          metadata: filtersFinal || null,
          withChildren: false,
          page: page,
        })

        const response = await searchService.SearchBasic(request)

        if (!response.success) {
          throw new Error(response.message ?? 'Failed to get displayable titles for storefront')
        }

        // const detailedTitles = await Promise.all(response.results?.map(async (result) => {
        //   const graphResponse = await assetService.GetGraph(result.id, true, true, false)
        //   const detailedTitlesResponse = await assetService.GetTitleContentDataFromAssetObject(graphResponse)
        //   return {
        //     ...detailedTitlesResponse,
        //   }
        // }) ?? [])

        return { data: response }
      },
      // transformResponse: validate(z.array(DbAssetObjectInfosSchema)),
    }),
    getStorefrontCollections: builder.query<DbObjectCollectionInfos[], GetStorefrontCollectionsRequest>({
      queryFn: async (args) => {
        const { collectionIds } = args

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
    getStorefrontCollectionById: builder.query<DbObjectCollectionInfos, number>({
      queryFn: async (args) => {
        const collectionId = args
        const collection = await assetService.GetCollection(collectionId)
        return { data: collection }
      },
    }),
    getDisplayableCollectionsForStorefront: builder.query<DbObjectCollectionInfos[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      queryFn: async () => {
        const collections = await assetService.GetCollectionStoreFront()
        return { data: collections }
      },
    }),
    getStorefrontCustomers: builder.query<DbCustomerInfos[], GetStorefrontCustomersRequest>({
      queryFn: async (args) => {
        const { customerIds } = args

        const customers = await Promise.allSettled(customerIds.map(async (customerId) => {
          const customer = await orderService.GetCustomerById(customerId)
          return customer
        }))

        const validCustomers = customers
          .filter(result => result.status === 'fulfilled' && result.value && result.value.customer !== null)
          // @ts-expect-error - value has already been validated in filtering
          .map(result => result.value.customer)

        return { data: validCustomers ?? [] }
      },
    }),
    getCustomersForStorefront: builder.query<DbCustomerInfos[], void>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      queryFn: async () => {
        const customers = await orderService.GetCustomersList()

        return { data: customers.customers ?? [] }
      },
    }),

    // Points of contact
    addEditPointOfContact: builder.mutation<StorefrontPointOfContact, { formData: FormData, storefrontId: number }>({
      query: ({ formData, storefrontId }) => ({
        url: `${storefrontId}/points-of-contact`,
        method: 'POST',
        body: formData,
      }),
    }),

    // Images
    getFile: builder.query<UploadedImage, number>({
      query: id => ({
        url: `/images/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'StorefrontImages', id }],
    }),
    uploadImageFile: builder.mutation<UploadedImage, { storefrontId: number, formData: FormData, type: StorefrontImageType }>({
      query: ({ storefrontId, formData, type }) => ({
        url: `${storefrontId}/${type}/images`,
        method: 'POST',
        body: formData,
      }),
      transformResponse: validate(UploadedImageSchema),
      invalidatesTags: ['StorefrontImages'],
    }),
    deleteImageFile: builder.mutation<void, { fileId: number, role: StorefrontImageType }>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ fileId, role }) => ({
        url: `/images/${role}/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { fileId }) => [{ type: 'StorefrontImages', fileId }],
    }),

    // Dcocuments
    addStorefrontDocument: builder.mutation<void, { storefrontId: number, formData: FormData }>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ storefrontId, formData }) => ({
        url: `${storefrontId}/documents`,
        method: 'POST',
        body: formData,
      }),
    }),
    downloadStorefrontDocument: builder.query<File, { documentId: number }>({
      query: ({ documentId }) => ({
        url: `/documents/${documentId}`,
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
    deleteStorefrontDocument: builder.mutation<void, { documentId: number }>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ documentId }) => ({
        url: `/documents/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { documentId }) => [{ type: 'StorefrontDocuments', documentId }],
    }),

    // Account creation / validation
    getStorefrontUsers: builder.query<User[], number>({
      query: id => ({
        url: `${id}/users`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'StorefrontUsers', id }],
    }),
    getPendingRequests: builder.query<UserRequest[], number>({
      query: id => ({
        url: `${id}/pending-requests`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'StorefrontPendingRequests', id }],
    }),
    // @TODO : replace with only requestID
    approvePendingRequest: builder.mutation<void, UserRequestMutation>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ storefrontId, id, firstName, lastName, companyName, email, enableUser, expirationDate }) => ({
        url: `/approve-user`,
        method: 'POST',
        body: {
          storefrontId,
          id,
          firstName,
          lastName,
          companyName,
          email,
          enableUser,
          expirationDate,
        },
      }),
      invalidatesTags: (result, error, { storefrontId }) => [{ type: 'StorefrontUsers', storefrontId }, { type: 'StorefrontPendingRequests', storefrontId }],
    }),
    rejectPendingRequest: builder.mutation<void, number>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: requestId => ({
        url: `/pending-requests/${requestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StorefrontPendingRequests'],
    }),
    toggleUserEnabled: builder.mutation<void, ToggleUserEnabledMutation>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: ({ userId, enable }) => ({
        url: `/users/${userId}/set-status?enable=${enable}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'StorefrontUsers', userId }],
    }),
    deleteUser: builder.mutation<void, number>({ // eslint-disable-line @typescript-eslint/no-invalid-void-type
      query: userId => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StorefrontUsers'],
    }),
  }),
})

export const {
  // CRUD
  useGetStorefrontsQuery,
  useGetStorefrontByIdQuery,
  useCreateStorefrontMutation,
  useDuplicateStorefrontMutation,
  useUpdateStorefrontMutation,
  useDeleteStorefrontMutation,

  // Catalog
  useGetStorefrontTitlesQuery,
  useSearchStorefrontTitlesQuery,
  useGetDisplayableTitlesForStorefrontQuery,
  useLazyGetDisplayableTitlesForStorefrontQuery,
  useGetStorefrontCollectionsQuery,
  useGetStorefrontCollectionByIdQuery,
  useGetDisplayableCollectionsForStorefrontQuery,

  // Customers
  useGetStorefrontCustomersQuery,
  useGetCustomersForStorefrontQuery,

  // Users & Requests
  useGetStorefrontUsersQuery,
  useGetPendingRequestsQuery,
  useApprovePendingRequestMutation,
  useRejectPendingRequestMutation,
  useToggleUserEnabledMutation,
  useDeleteUserMutation,

  // Uploads
  useGetFileQuery,
  useUploadImageFileMutation,
  useDeleteImageFileMutation,
  useAddStorefrontDocumentMutation,
  useAddEditPointOfContactMutation,

  // Documents
  useLazyDownloadStorefrontDocumentQuery,
  useDeleteStorefrontDocumentMutation,
} = storefrontApi
