import { renderHook } from '@testing-library/react'
import { useContadorDeTarefas } from './useContadorDeTarefas'
import type { Tarefa } from '@/lib/tarefas'

const tarefas: Tarefa[] = [
  { id: '1', titulo: 'A', concluida: false, prioridade: 'media' },
  { id: '2', titulo: 'B', concluida: true, prioridade: 'alta' },
]

describe('useContadorDeTarefas', () => {
  it('retorna zeros quando não há tarefas', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]))
    expect(result.current).toEqual({ total: 0, concluidas: 0, pendentes: 0 })
  })

  it('calcula total, pendentes e concluídas corretamente', () => {
    const { result } = renderHook(() => useContadorDeTarefas(tarefas))
    expect(result.current).toEqual({ total: 2, concluidas: 1, pendentes: 1 })
  })

  it('recalcula quando a lista de tarefas muda', () => {
    const { result, rerender } = renderHook(
      ({ lista }) => useContadorDeTarefas(lista),
      { initialProps: { lista: tarefas } }
    )

    expect(result.current.total).toBe(2)

    const novaLista: Tarefa[] = [
      ...tarefas,
      { id: '3', titulo: 'C', concluida: true, prioridade: 'baixa' },
    ]
    rerender({ lista: novaLista })

    expect(result.current).toEqual({ total: 3, concluidas: 2, pendentes: 1 })
  })
})
