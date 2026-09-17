'use client'

import { useState, FormEvent } from 'react'
import type { Tarefa } from '@/lib/tarefas'

type NovaTarefaProps = {
  onAdicionar: (tarefa: Tarefa) => void
}

export default function NovaTarefa({ onAdicionar }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('')
  const [prioridade, setPrioridade] = useState<Tarefa['prioridade']>('media')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const tituloLimpo = titulo.trim()
    if (!tituloLimpo) return

    onAdicionar({
      id: crypto.randomUUID(),
      titulo: tituloLimpo,
      concluida: false,
      prioridade,
    })

    setTitulo('')
    setPrioridade('media')
  }

  return (
    <form className="nova-tarefa" onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="O que você precisa fazer?"
        aria-label="Nova tarefa"
      />
      <select
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value as Tarefa['prioridade'])}
        aria-label="Prioridade"
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  )
}
