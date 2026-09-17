export type Prioridade = 'baixa' | 'media' | 'alta'

export type Tarefa = {
  id: string
  titulo: string
  concluida: boolean
  prioridade: Prioridade
}

const tarefas: Tarefa[] = [
  { id: '1', titulo: 'Estudar Next.js 15', concluida: false, prioridade: 'alta' },
  { id: '2', titulo: 'Escrever testes unitários', concluida: false, prioridade: 'media' },
  { id: '3', titulo: 'Revisar pull request', concluida: true, prioridade: 'baixa' },
]

export async function buscarTarefas(): Promise<Tarefa[]> {
  return Promise.resolve(tarefas)
}
