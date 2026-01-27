import { integer, json, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// Enums
export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED', 'TO_REVIEW', 'COMPLETED'])
export const channelEnum = pgEnum('channel', ['F2', 'F3', 'F4', 'F5'])
export const poleEnum = pgEnum('pole', ['STOCK', 'ETUDE', 'JEUNESSE', 'SPORTS'])
export const priorityEnum = pgEnum('priority', ['LOW', 'MEDIUM', 'HIGH'])
export const stepEnum = pgEnum('step', ['MIX_TO_HAB', 'AVID_TO_MIX', 'MIX_TO_GRAPH'])
export const roleEnum = pgEnum('role', ['admin', 'user', 'reviewer'])
export const activityEnum = pgEnum('activity', ['APPROVED', 'REJECTED', 'ASSIGNED', 'REVISION_REQUESTED'])

// Tables
export const users = pgTable('users', {
  id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: roleEnum('role').notNull(),
  permissions: json('permissions').$type<{
    status: Array<typeof statusEnum.enumValues[number]>
    channel: Array<typeof channelEnum.enumValues[number]>
    pole: Array<typeof poleEnum.enumValues[number]>
    step: Array<typeof stepEnum.enumValues[number]>
  }>().notNull().default({ status: [], channel: [], pole: [], step: [] }),
})

export const workflows = pgTable('workflows', {
  id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  step: stepEnum('step').notNull(),
  channel: channelEnum('channel').notNull(),
  pole: poleEnum('pole').notNull(),
  priority: priorityEnum('priority').notNull(),
  status: statusEnum('status').notNull(),
  assignedTo: integer('assigned_to').references(() => users.id), // nullable - can be unassigned
})

export const workflowActivities = pgTable('workflow_activities', {
  id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
  workflowId: integer('workflow_id').references(() => workflows.id).notNull(),
  activity: activityEnum('activity').notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  assignedTo: integer('assigned_to').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  reason: text('reason'),
})
