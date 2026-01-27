import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { count, desc, eq } from 'drizzle-orm'
import { getCurrentUserFn } from './auth'
import type { DataGridSearchParams } from '@/containers/data-grid/hooks/use-data-grid-search-params'
import { users, workflowActivities, workflows } from '@/db/schema'
import { db } from '@/db'
import { DataGridSearchParamsSchema } from '@/containers/data-grid/hooks/use-data-grid-search-params'

import { selectWorkflowSchema } from '@/types/workflow'
import { buildDrizzleQuery } from '@/lib/drizzle-helpers'

export const workflowsListQueryOptions = (
  queryParams: DataGridSearchParams<typeof selectWorkflowSchema>,
) =>
  queryOptions({
    queryKey: ['workflows', queryParams],
    queryFn: () => {
      return fetchWorkflowsList({ data: queryParams })
    },
  })

export const fetchWorkflowsList = createServerFn({ method: 'GET' })
  .inputValidator(DataGridSearchParamsSchema(selectWorkflowSchema.shape))
  .handler(async ({ data }) => {
    const query = buildDrizzleQuery<typeof workflows, typeof selectWorkflowSchema>(workflows, data, [
      workflows.name,
      workflows.channel,
      workflows.pole,
    ])

    console.log(query)

    // Fetch workflows
    const workflowsData = await db
      .select({
        id: workflows.id,
        name: workflows.name,
        step: workflows.step,
        channel: workflows.channel,
        pole: workflows.pole,
        priority: workflows.priority,
        status: workflows.status,
        assignedTo: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(workflows)
      .leftJoin(users, eq(workflows.assignedTo, users.id))
      .where(query.where)
      .orderBy(...(query.orderBy || []))
      .limit(query.limit)
      .offset(query.offset)

    // Get total count
    const [{ value: totalCount }] = await db
      .select({ value: count() })
      .from(workflows)
      .where(query.where)

    return { rows: workflowsData, totalCount }
  })

export const workflowQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['workflow', id],
    queryFn: () => fetchWorkflow({ data: { id } }),
  })

export const fetchWorkflow = createServerFn({ method: 'GET' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const [workflow] = await db
      .select({
        id: workflows.id,
        name: workflows.name,
        step: workflows.step,
        channel: workflows.channel,
        pole: workflows.pole,
        priority: workflows.priority,
        status: workflows.status,
        assignedTo: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(workflows)
      .leftJoin(users, eq(workflows.assignedTo, users.id))
      .where(eq(workflows.id, data.id))
      .limit(1)

    return workflow
  })

// WORKFLOW FUNCTIONS
export const approveWorkflow = createServerFn({ method: 'POST' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const currentUser = await getCurrentUserFn()
    if (!currentUser) {
      throw new Error('Current user not found')
    }

    // Update workflow status
    await db
      .update(workflows)
      .set({ status: 'APPROVED', assignedTo: null, updatedAt: new Date() })
      .where(eq(workflows.id, data.id))

    // Create activity log
    await db.insert(workflowActivities).values({
      workflowId: data.id,
      activity: 'APPROVED',
      userId: currentUser.id,
      createdAt: new Date(),
    })

    return { id: data.id }
  })

export const rejectWorkflow = createServerFn({ method: 'POST' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }).extend({ reason: z.string() }))
  .handler(async ({ data }) => {
    const currentUser = await getCurrentUserFn()
    if (!currentUser) {
      throw new Error('Current user not found')
    }

    await db
      .update(workflows)
      .set({ status: 'REJECTED', assignedTo: null, updatedAt: new Date() })
      .where(eq(workflows.id, data.id))

    // Create activity log
    await db.insert(workflowActivities).values({
      workflowId: data.id,
      activity: 'REJECTED',
      userId: currentUser.id,
      reason: data.reason,
      createdAt: new Date(),
    })

    return { id: data.id, reason: data.reason }
  })

export const assignWorkflow = createServerFn({ method: 'POST' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }).extend({ userId: z.number() }))
  .handler(async ({ data }) => {
    const currentUser = await getCurrentUserFn()
    if (!currentUser) {
      throw new Error('Current user not found')
    }

    // Fetch user to assign
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, data.userId))
      .limit(1)

    // Update workflow assignment
    await db
      .update(workflows)
      .set({ assignedTo: user.id, updatedAt: new Date() })
      .where(eq(workflows.id, data.id))

    // Create activity log
    await db.insert(workflowActivities).values({
      workflowId: data.id,
      activity: 'ASSIGNED',
      userId: currentUser.id,
      assignedTo: user.id,
      createdAt: new Date(),
    })

    return { id: data.id, user: { id: user.id, name: user.name, email: user.email } }
  })

export const requestRevision = createServerFn({ method: 'POST' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const currentUser = await getCurrentUserFn()
    if (!currentUser) {
      throw new Error('Current user not found')
    }

    await db
      .update(workflows)
      .set({ status: 'TO_REVIEW', updatedAt: new Date() })
      .where(eq(workflows.id, data.id))

    // Create activity log
    await db.insert(workflowActivities).values({
      workflowId: data.id,
      activity: 'REVISION_REQUESTED',
      userId: currentUser.id,
      createdAt: new Date(),
    })

    return { id: data.id }
  })

// ACTIVITY FUNCTIONS
export const workflowActivitiesListQueryOptions = (workflowId: number) =>
  queryOptions({
    queryKey: ['workflowActivities', workflowId],
    queryFn: () => fetchWorkflowActivities({ data: { id: workflowId } }),
  })

export const fetchWorkflowActivities = createServerFn({ method: 'GET' })
  .inputValidator(selectWorkflowSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const activities = await db
      .select()
      .from(workflowActivities)
      .where(eq(workflowActivities.workflowId, data.id))
      .orderBy(desc(workflowActivities.createdAt))

    return activities
  })
