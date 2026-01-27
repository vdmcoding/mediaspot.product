import z from 'zod'

// Workflow enums
export const StepSchema = z.enum(['AVID_TO_MIX', 'MIX_TO_HAB', 'MIX_TO_GRAPH'])
export const ChannelSchema = z.enum(['F2', 'F3', 'F4', 'F5'])
export const PoleSchema = z.enum(['STOCK', 'ETUDE', 'JEUNESSE', 'SPORTS'])
export const PrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])
export const StatusSchema = z.enum(['PENDING', 'TO_REVIEW', 'APPROVED', 'REJECTED', 'COMPLETED'])
export const ActivitySchema = z.enum(['APPROVED', 'REJECTED', 'ASSIGNED', 'REVISION_REQUESTED'])

// User enums
export const RoleSchema = z.enum(['admin', 'user', 'reviewer'])
