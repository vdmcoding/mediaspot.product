import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import bcrypt from 'bcryptjs'
import { createUser, getUserByEmail, getUserById } from './users'
import { useAppSession } from '@/hooks/use-app-session'
import { insertUserSchema } from '@/types/user'
import { LoginSchema } from '@/types/auth'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(LoginSchema)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id,
      email: user.email,
    })

    // Redirect to protected area
    throw redirect({ to: '/workflows/mine' })
  })

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

// Get current user
export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.userId

    if (!userId) {
      return null
    }

    return await getUserById({ data: { id: userId } })
  },
)

// User registration
export const registerFn = createServerFn({ method: 'POST' })
  .inputValidator(insertUserSchema.pick({ email: true, password: true, name: true }))
  .handler(async ({ data }) => {
    // Check if user exists
    const existingUser = await getUserByEmail({ data: { email: data.email } })

    if (existingUser) {
      throw new Error('User already exists', { cause: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await createUser({
      data: { email: data.email, password: hashedPassword, name: data.name },
    })

    // Create session
    const session = await useAppSession()
    await session.update({ userId: user.id })

    return { success: true, user: { id: user.id, email: user.email } }
  })

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail({ data: { email: email } })

  if (!user) {
    throw new Error('User not found', { cause: 404 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid credentials', { cause: 401 })
  }

  return { id: user.id, email: user.email, name: user.name }
}
