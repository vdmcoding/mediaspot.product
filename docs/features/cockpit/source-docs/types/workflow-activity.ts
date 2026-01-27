import z from 'zod'
import { ActivitySchema } from './enums'

export const WorkflowActivitySchema = z.object({
  id: z.number(),
  workflowId: z.number(),
  activity: ActivitySchema,
  userId: z.number(),
  assignedTo: z.number().nullable(),
  reason: z.string().nullable(),
  createdAt: z.date(),
})

export const selectWorkflowActivitySchema = WorkflowActivitySchema.pick({
  id: true,
  workflowId: true,
  activity: true,
  userId: true,
  assignedTo: true,
  reason: true,
  createdAt: true,
})

export const insertWorkflowActivitySchema = WorkflowActivitySchema.pick({
  workflowId: true,
  activity: true,
  userId: true,
  assignedTo: true,
  reason: true,
})

export type selectWorkflowActivity = z.infer<typeof selectWorkflowActivitySchema>
export type insertWorkflowActivity = z.infer<typeof insertWorkflowActivitySchema>
