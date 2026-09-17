'use client'

import { useMemo, useState } from 'react'
import type { Tarefa } from '@/lib/tarefas'
import NovaTarefa from './NovaTarefa'
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas'

type Filtro = 'todas' | 'pendentes' | 'concluidas'

type ListaTarefasProps = {
  tarefasIniciais: Tarefa[]
}

const rotulosFiltro: Record<Filtro, string> = {
  todas: 'Todas',
  pendentes: 'Pendentes',
  concluidas: 'Concluídas',
}

export default function ListaTarefas({ tarefasIniciais }: ListaTarefasProps) {
  const [tarefas, setTarefas] = useState(tarefasIniciais)
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const resumo = useContadorDeTarefas(tarefas)

  function adicionarTarefa(tarefa: Tarefa) {
    setTarefas((atual) => [...atual, tarefa])
  }

  function alternarConcluida(id: string) {
    setTarefas((atual) =>
      atual.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    )
  }

  function removerTarefa(id: string) {
    setTarefas((atual) => atual.filter((tarefa) => tarefa.id !== id))
  }

  const tarefasFiltradas = useMemo(() => {
    if (filtro === 'pendentes') return tarefas.filter((tarefa) => !tarefa.concluida)
    if (filtro === 'concluidas') return tarefas.filter((tarefa) => tarefa.concluida)
    return tarefas
  }, [filtro, tarefas])

  return (
    <div className="painel">
      <div className="stats">
        <div className="stat total" data-testid="stat-total">
          <strong>{resumo.total}</strong>
          total
        </div>
        <div className="stat pendentes" data-testid="stat-pendentes">
          <strong>{resumo.pendentes}</strong>
          pendentes
        </div>
        <div className="stat concluidas" data-testid="stat-concluidas">
          <strong>{resumo.concluidas}</strong>
          concluídas
        </div>
      </div>

      <NovaTarefa onAdicionar={adicionarTarefa} />

      <div className="filtros" role="group" aria-label="Filtrar tarefas">
        {(Object.keys(rotulosFiltro) as Filtro[]).map((opcao) => (
          <button
            key={opcao}
            type="button"
            aria-pressed={filtro === opcao}
            onClick={() => setFiltro(opcao)}
          >
            {rotulosFiltro[opcao]}
          </button>
        ))}
      </div>

      {tarefasFiltradas.length === 0 ? (
        <p className="vazio">Nenhuma tarefa por aqui.</p>
      ) : (
        <ul className="lista-tarefas">
          {tarefasFiltradas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`item-tarefa${tarefa.concluida ? ' concluida' : ''}`}
            >
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConcluida(tarefa.id)}
                aria-label={`Marcar "${tarefa.titulo}" como concluída`}
              />
              <span className="titulo-tarefa">{tarefa.titulo}</span>
              <span className={`badge ${tarefa.prioridade}`}>{tarefa.prioridade}</span>
              <button
                type="button"
                className="remover"
                onClick={() => removerTarefa(tarefa.id)}
                aria-label={`Remover "${tarefa.titulo}"`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
