import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NovaTarefa from './NovaTarefa'

describe('NovaTarefa', () => {
  it('renderiza o input, o seletor de prioridade e o botão', () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />)

    expect(screen.getByLabelText('Nova tarefa')).toBeInTheDocument()
    expect(screen.getByLabelText('Prioridade')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument()
  })

  it('chama onAdicionar com o título e a prioridade escolhidos', async () => {
    const user = userEvent.setup()
    const onAdicionar = jest.fn()

    render(<NovaTarefa onAdicionar={onAdicionar} />)

    await user.type(screen.getByLabelText('Nova tarefa'), 'Comprar café')
    await user.selectOptions(screen.getByLabelText('Prioridade'), 'alta')
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(onAdicionar).toHaveBeenCalledTimes(1)
    expect(onAdicionar).toHaveBeenCalledWith(
      expect.objectContaining({ titulo: 'Comprar café', concluida: false, prioridade: 'alta' })
    )
  })

  it('usa "média" como prioridade padrão', async () => {
    const user = userEvent.setup()
    const onAdicionar = jest.fn()

    render(<NovaTarefa onAdicionar={onAdicionar} />)

    await user.type(screen.getByLabelText('Nova tarefa'), 'Lavar louça')
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(onAdicionar).toHaveBeenCalledWith(expect.objectContaining({ prioridade: 'media' }))
  })

  it('limpa o campo de texto após adicionar', async () => {
    const user = userEvent.setup()
    render(<NovaTarefa onAdicionar={jest.fn()} />)

    const input = screen.getByLabelText('Nova tarefa') as HTMLInputElement
    await user.type(input, 'Revisar PR')
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(input.value).toBe('')
  })

  it('não chama onAdicionar se o campo estiver vazio', async () => {
    const user = userEvent.setup()
    const onAdicionar = jest.fn()

    render(<NovaTarefa onAdicionar={onAdicionar} />)
    await user.click(screen.getByRole('button', { name: 'Adicionar' }))

    expect(onAdicionar).not.toHaveBeenCalled()
  })
})
