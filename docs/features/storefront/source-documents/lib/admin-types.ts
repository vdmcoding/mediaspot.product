import { z } from 'zod'

// Base types
export const StorefrontPointOfContactSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  role: z.string(),
  description: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(), // @TODO CLEANUP: email should be validated
  avatarId: z.number().nullable(),
})

export const StorefrontDocumentSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  fileType: z.enum(['Doc', 'Docx', 'Pdf', 'Ppt', 'Pptx']),
})

export enum StorefrontImageType {
  logo = 'logo',
  cover = 'cover',
  avatar = 'avatar',
}

export const UploadedImageSchema = z.object({
  id: z.number(),
  base64: z.string(),
})

export const StorefrontCatalogSchema = z.object({
  titleIds: z.array(z.number()),
  collectionIds: z.array(z.number()),
})

export const StorefrontBrandingSchema = z.object({
  heroSliderTitleIds: z.array(z.number()),
  showcasedCollectionIds: z.array(z.number()),
  showcasedGenres: z.array(z.object({
    value: z.string(),
    titleCoverId: z.number(),
  })).default([]),
  catchphrase: z.string().nullable(),
  logoId: z.number().nullable(),
  coverId: z.number().nullable(),
})

export const StorefrontFullSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subdomain: z.string(),
  titleIds: z.array(z.number()),
  collectionIds: z.array(z.number()),
  branding: StorefrontBrandingSchema,
  pointsOfContact: z.array(StorefrontPointOfContactSchema),
  documents: z.array(StorefrontDocumentSchema),
  userCount: z.number(),
  requestCount: z.number(),
})

export const StorefrontListSchema = StorefrontFullSchema.pick({ id: true, name: true, subdomain: true, userCount: true, requestCount: true })

export const StorefrontLoginSchema = StorefrontFullSchema.pick({ id: true, name: true }).extend({ catchphrase: z.string().nullable(), logoId: z.number().nullable(), coverId: z.number().nullable() })
export const StorefrontLoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
})

export type StorefrontFull = z.infer<typeof StorefrontFullSchema>
export type StorefrontList = z.infer<typeof StorefrontListSchema>
export type StorefrontLogin = z.infer<typeof StorefrontLoginSchema>
export type StorefrontLoginResponse = z.infer<typeof StorefrontLoginResponseSchema>

export type StorefrontPointOfContact = z.infer<typeof StorefrontPointOfContactSchema>
// export type StorefrontImage = z.infer<typeof StorefrontImageSchema>
export type StorefrontDocument = z.infer<typeof StorefrontDocumentSchema>
export type StorefrontCatalog = z.infer<typeof StorefrontCatalogSchema>
export type StorefrontCustomer = z.infer<typeof z.number>
export type StorefrontBranding = z.infer<typeof StorefrontBrandingSchema>

export type UploadedImage = z.infer<typeof UploadedImageSchema>

// Form types
export const CreateDuplicateStorefrontFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can\'t contain special characters or numbers')
    .trim(),
  subdomain: z.string()
    .min(1, 'URL is required')
    .min(3, 'URL must be at least 3 characters')
    .max(50, 'URL must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'URL can only contain lowercase letters, numbers, and hyphens')
    .regex(/^[a-z0-9]/, 'URL must start with a letter or number')
    .regex(/[a-z0-9]$/, 'URL must end with a letter or number')
    .refine(val => !val.includes('--'), 'URL cannot contain consecutive hyphens')
    .trim(),
})

export const AddEditPointOfContactFormSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .trim(),
  role: z.string()
    .min(1, 'Role is required')
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role must be less than 100 characters')
    .trim(),
  email: z.email('Invalid email address').optional(),
  phoneNumber: z.string().optional(),
  description: z.string().optional(),
  avatarFile: z.file().nullable(),
  avatarId: z.number().nullable(),
})

export const AddDocumentFormSchema = z.object({
  fileName: z.string()
    .min(1, 'File name is required')
    .min(2, 'File name must be at least 2 characters')
    .max(100, 'File name must be less than 100 characters')
    .trim(),
  file: z.file(),
})

export const StorefrontSettingsFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  customerIds: z.array(z.number()),
})

export type CreateDuplicateStorefrontForm = z.infer<typeof CreateDuplicateStorefrontFormSchema>

export interface StorefrontFormProviderProps {
  storefront: StorefrontFull
  children: React.ReactNode
}
export interface StorefrontFormState {
  originalData: StorefrontFull
  currentData: StorefrontFull
  isDirty: boolean
  isSubmitting: boolean
}

export enum UserStatusEnum {
  DISABLED = 'DISABLED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

// Users and requests
export const UserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.email(),
  companyName: z.string(),
  status: z.enum(UserStatusEnum),
  expirationDate: z.string().nullable(),
})

export const UserRequestSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  email: z.email(),
})

export const UserRequestMutationSchema = z.object({
  storefrontId: z.number(),
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  email: z.email(),
  enableUser: z.boolean(),
  expirationDate: z.string().nullable(),
})

export const ToggleUserEnabledMutationSchema = z.object({
  userId: z.number(),
  enable: z.boolean(),
})

export type UserRequest = z.infer<typeof UserRequestSchema>
export type UserRequestMutation = z.infer<typeof UserRequestMutationSchema>
export type User = z.infer<typeof UserSchema>
export type ToggleUserEnabledMutation = z.infer<typeof ToggleUserEnabledMutationSchema>
