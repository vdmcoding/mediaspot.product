import z from 'zod'

// server/auth.ts
export const LoginSchema = z.object({
  email: z.email('Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export const AuthSchema = z.object({
  isAuthenticated: z.boolean,
  session: z
    .object({
      userId: z.string(),
      email: z.string(),
    })
    .nullable(),
})

export type Auth = z.infer<typeof AuthSchema>
