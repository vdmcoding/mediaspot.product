import z from 'zod'
import { ChannelSchema, PoleSchema, RoleSchema, StatusSchema, StepSchema } from './enums'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: RoleSchema,
  permissions: z.object({
    status: z.array(StatusSchema),
    channel: z.array(ChannelSchema),
    pole: z.array(PoleSchema),
    step: z.array(StepSchema),
  }),
})

export const selectUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  password: true,
  role: true,
  permissions: true,
})

export const insertUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  password: true,
  role: true,
  permissions: true,
})

export type selectUser = z.infer<typeof selectUserSchema>
export type insertUser = z.infer<typeof insertUserSchema>
