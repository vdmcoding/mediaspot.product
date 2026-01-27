import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { selectWorkflow } from '@/types/workflow'
import { approveWorkflow, assignWorkflow, rejectWorkflow, requestRevision, workflowActivitiesListQueryOptions, workflowQueryOptions } from '@/functions/workflows'
import { toast } from '@/components/ui/sonner'

export const useWorkflowMutations = (workflowId: number) => {
  const queryClient = useQueryClient()

  const approveWorkflowMutation = useMutation({
    mutationFn: () => approveWorkflow({ data: { id: workflowId } }),
    onSuccess: ({ id }) => {
      toast({ title: 'Workflow approuvé', semantic: 'success' })
      queryClient.setQueriesData<{ rows: Array<selectWorkflow>, totalCount: number }>(
        { queryKey: ['workflows'], exact: false },
        (old) => {
          if (!old) return old
          return {
            ...old,
            rows: old.rows.map((workflow: selectWorkflow) =>
              workflow.id === id ? { ...workflow, status: 'APPROVED' as const } : workflow,
            ),
          }
        },
      )
      queryClient.setQueryData(workflowQueryOptions(id).queryKey, (old: any) => {
        return { ...old, status: 'APPROVED' }
      })
      queryClient.invalidateQueries(workflowActivitiesListQueryOptions(id))
    },
    onError: (error) => {
      toast({ title: 'Erreur lors de l\'approuve du workflow', semantic: 'error' })
    },
  })

  const rejectWorkflowMutation = useMutation({
    mutationFn: (reason: string) => rejectWorkflow({ data: { id: workflowId, reason } }),
    onSuccess: ({ id, reason }) => {
      toast({ title: 'Workflow rejeté', semantic: 'success' })
      queryClient.setQueriesData<{ rows: Array<selectWorkflow>, totalCount: number }>(
        { queryKey: ['workflows'], exact: false },
        (old) => {
          if (!old) return old
          return {
            ...old,
            rows: old.rows.map((workflow: selectWorkflow) =>
              workflow.id === id ? { ...workflow, status: 'REJECTED' as const } : workflow,
            ),
          }
        },
      )
      queryClient.setQueryData(['workflow', id], (old: any) => {
        return { ...old, status: 'REJECTED', reason: reason }
      })
      queryClient.invalidateQueries(workflowActivitiesListQueryOptions(id))
    },
    onError: (error) => {
      toast({ title: 'Erreur lors du rejet du workflow', semantic: 'error' })
    },
  })

  const assignWorkflowMutation = useMutation({
    mutationFn: (userId: number) => assignWorkflow({ data: { id: workflowId, userId } }),
    onSuccess: ({ id, user }) => {
      toast({ title: 'Workflow assigné', semantic: 'success' })
      queryClient.setQueriesData<{ rows: Array<selectWorkflow>, totalCount: number }>(
        { queryKey: ['workflows'], exact: false },
        (old) => {
          if (!old) return old
          return {
            ...old,
            rows: old.rows.map((workflow: selectWorkflow) =>
              workflow.id === id ? { ...workflow, assignedTo: { id: user.id, name: user.name, email: user.email } } : workflow,
            ),
          }
        },
      )
      queryClient.setQueryData(['workflow', id], (old: any) => {
        return { ...old, assignedTo: { id: user.id, name: user.name, email: user.email } }
      })
      queryClient.invalidateQueries(workflowActivitiesListQueryOptions(id))
    },
    onError: (error) => {
      toast({ title: 'Erreur lors de l\'assignation du workflow', semantic: 'error' })
    },
  })

  const requestRevisionMutation = useMutation({
    mutationFn: () => requestRevision({ data: { id: workflowId } }),
    onSuccess: ({ id }) => {
      toast({ title: 'Révision demandée', semantic: 'success' })
      queryClient.setQueryData(['workflow', id], (old: any) => {
        return { ...old, status: 'TO_REVIEW' }
      })
      queryClient.setQueriesData<{ rows: Array<selectWorkflow>, totalCount: number }>(
        { queryKey: ['workflows'], exact: false },
        (old) => {
          if (!old) return old
          return {
            ...old,
            rows: old.rows.map((workflow: selectWorkflow) =>
              workflow.id === id ? { ...workflow, status: 'TO_REVIEW' as const } : workflow,
            ),
          }
        },
      )
      queryClient.invalidateQueries(workflowActivitiesListQueryOptions(id))
    },
    onError: (error) => {
      toast({ title: 'Erreur lors de la demande de révision', semantic: 'error' })
    },
  })

  return {
    approveWorkflowMutation,
    rejectWorkflowMutation,
    assignWorkflowMutation,
    requestRevisionMutation,
  }
}
