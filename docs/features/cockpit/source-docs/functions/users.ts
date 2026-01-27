import { createServerFn } from '@tanstack/react-start'
import { queryOptions } from '@tanstack/react-query'
import { eq } from 'drizzle-orm'
import type { insertUser, selectUser } from '@/types/user'
import { db } from '@/db'
import { users } from '@/db/schema'
import { insertUserSchema, selectUserSchema } from '@/types/user'

export const userQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: () => getUserById({ data: { id: userId } }),
  })

export const getUserById = createServerFn({ method: 'GET' })
  .inputValidator(selectUserSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, data.id))
        .limit(1)

      return user as selectUser | null
    }
    catch {
      return null
    }
  })

export const getUserByEmail = createServerFn({ method: 'GET' })
  .inputValidator(selectUserSchema.pick({ email: true }))
  .handler(async ({ data }) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1)

      return user as selectUser | null
    }
    catch {
      return null
    }
  })

export const createUser = createServerFn({ method: 'POST' })
  .inputValidator(insertUserSchema.pick({ email: true, name: true, password: true }))
  .handler(async ({ data }) => {
    try {
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          name: data.name,
          password: data.password,
          role: 'user',
        })
        .returning()

      return user as insertUser
    }
    catch (e: any) {
      throw new Error('Failed to create user: ' + e.message, { cause: 500 })
    }
  })

export const usersListQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () => fetchUsersList(),
  })

export const fetchUsersList = createServerFn({ method: 'GET' })
  .handler(async () => {
    const allUsers = await db.select().from(users)
    return allUsers as Array<selectUser>
  })
