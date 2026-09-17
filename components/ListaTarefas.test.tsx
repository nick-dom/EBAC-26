import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ListaTarefas from './ListaTarefas'
import type { Tarefa } from '@/lib/tarefas'

const tarefasIniciais: Tarefa[] = [
  { id: '1', titulo: 'Estudar Next.js', concluida: false, prioridade: 'alta' },
  { id: '2', titulo: 'Revisar PR', concluida: true, prioridade: 'baixa' },
]

describe('ListaTarefas', () => {
  it('mostra o resumo inicial de tarefas', () => {
    render(<ListaTarefas tarefasIniciais={tarefasIniciais} />)

    expect(screen.getByTestId('stat-total')).toHaveTextContent('2')
    expect(screen.getByTestId('stat-pendentes')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-concluidas')).toHaveTextContent('1')
  })

  it('adiciona uma nova tarefa à lista e atualiza o resumo', async () => {
    const user = userEvent.setup()
    render(<ListaTarefas tarefasIniciais={tarefasIniciais} />)

    await user.type(screen.getByLabelText('Nova tarefa'), 'Fazer compras')
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(screen.getByText('Fazer compras')).toBeInTheDocument()
    expect(screen.getByTestId('stat-total')).toHaveTextContent('3')
  })

  it('marca e desmarca uma tarefa como concluída', async () => {
    const user = userEvent.setup()
    render(<ListaTarefas tarefasIniciais={tarefasIniciais} />)

    const checkbox = screen.getByLabelText('Marcar "Estudar Next.js" como concluída')
    await user.click(checkbox)
    expect(screen.getByTestId('stat-concluidas')).toHaveTextContent('2')

    await user.click(checkbox)
    expect(screen.getByTestId('stat-concluidas')).toHaveTextContent('1')
  })

  it('remove uma tarefa da lista', async () => {
    const user = userEvent.setup()
    render(<ListaTarefas tarefasIniciais={tarefasIniciais} />)

    await user.click(screen.getByLabelText('Remover "Revisar PR"'))

    expect(screen.queryByText('Revisar PR')).not.toBeInTheDocument()
    expect(screen.getByTestId('stat-total')).toHaveTextContent('1')
  })

  it('filtra tarefas pendentes e concluídas', async () => {
    const user = userEvent.setup()
    render(<ListaTarefas tarefasIniciais={tarefasIniciais} />)

    await user.click(screen.getByRole('button', { name: 'Pendentes' }))
    expect(screen.getByText('Estudar Next.js')).toBeInTheDocument()
    expect(screen.queryByText('Revisar PR')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Concluídas' }))
    expect(screen.getByText('Revisar PR')).toBeInTheDocument()
    expect(screen.queryByText('Estudar Next.js')).not.toBeInTheDocument()
  })

  it('mostra mensagem quando não há tarefas no filtro selecionado', () => {
    render(<ListaTarefas tarefasIniciais={[]} />)

    expect(screen.getByText('Nenhuma tarefa por aqui.')).toBeInTheDocument()
  })
})
