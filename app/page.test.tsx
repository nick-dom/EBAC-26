import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renderiza o título e as tarefas vindas da fonte de dados', async () => {
    const ui = await Home()
    render(ui)

    expect(screen.getByText('Minhas tarefas')).toBeInTheDocument()
    expect(screen.getByText('Estudar Next.js 15')).toBeInTheDocument()
    expect(screen.getByText('Escrever testes unitários')).toBeInTheDocument()
    expect(screen.getByText('Revisar pull request')).toBeInTheDocument()
  })

  it('mostra o resumo inicial de tarefas', async () => {
    const ui = await Home()
    render(ui)

    expect(screen.getByTestId('stat-total')).toHaveTextContent('3')
    expect(screen.getByTestId('stat-pendentes')).toHaveTextContent('2')
    expect(screen.getByTestId('stat-concluidas')).toHaveTextContent('1')
  })
})
