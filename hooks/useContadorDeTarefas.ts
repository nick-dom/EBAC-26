'use client'

import { useMemo } from 'react'
import type { Tarefa } from '@/lib/tarefas'

export type ResumoTarefas = {
  total: number
  concluidas: number
  pendentes: number
}

export function useContadorDeTarefas(tarefas: Tarefa[]): ResumoTarefas {
  return useMemo(() => {
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length

    return {
      total: tarefas.length,
      concluidas,
      pendentes: tarefas.length - concluidas,
    }
  }, [tarefas])
}
