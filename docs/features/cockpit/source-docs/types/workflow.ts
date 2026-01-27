import z from 'zod'
import { ChannelSchema, PoleSchema, PrioritySchema, StatusSchema, StepSchema } from './enums'

export const WorkflowSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  step: StepSchema,
  channel: ChannelSchema,
  pole: PoleSchema,
  priority: PrioritySchema,
  status: StatusSchema,
  assignedTo: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }).nullable(),
})

export const selectWorkflowSchema = WorkflowSchema.pick({
  id: true,
  name: true,
  step: true,
  channel: true,
  pole: true,
  priority: true,
  status: true,
  assignedTo: true,
})

export const insertWorkflowSchema = WorkflowSchema.pick({
  name: true,
  step: true,
  channel: true,
  pole: true,
  priority: true,
  status: true,
  assignedTo: true,
  createdAt: true,
  updatedAt: true,
})

export type selectWorkflow = z.infer<typeof selectWorkflowSchema>
export type insertWorkflow = z.infer<typeof insertWorkflowSchema>
