import { buscarTarefas } from '@/lib/tarefas'
import ListaTarefas from '@/components/ListaTarefas'

export default async function Home() {
  const tarefas = await buscarTarefas()

  return (
    <main>
      <h1>Minhas tarefas</h1>
      <p className="subtitulo">Organize o seu dia, uma tarefa de cada vez.</p>
      <ListaTarefas tarefasIniciais={tarefas} />
    </main>
  )
}
