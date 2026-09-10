import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import DecisionForm from './DecisionForm'

describe('DecisionForm', () => {
  it('shows field-level Azerbaijani feedback for an empty submission', async () => {
    const user = userEvent.setup()

    render(<DecisionForm onCreate={vi.fn()} onClose={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Qərarı yarat' }))

    expect(screen.getByText('Qərar sualını daxil edin.')).toBeInTheDocument()
    expect(screen.getAllByText('Seçim boş ola bilməz.')).toHaveLength(2)
    expect(screen.getByLabelText('Qərar sualı')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('rejects duplicate options after case and whitespace normalization', async () => {
    const user = userEvent.setup()

    render(<DecisionForm onCreate={vi.fn()} onClose={vi.fn()} />)

    await user.type(screen.getByLabelText('Qərar sualı'), 'Harada işləyim?')
    await user.type(screen.getByLabelText('Seçim 1'), 'Evdə')
    await user.type(screen.getByLabelText('Seçim 2'), '  evdə  ')
    await user.click(screen.getByRole('button', { name: 'Qərarı yarat' }))

    expect(screen.getByText('Bu seçim artıq əlavə edilib.')).toBeInTheDocument()
  })

  it('submits normalized values as a new decision', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()

    render(<DecisionForm onCreate={onCreate} onClose={vi.fn()} />)

    await user.type(screen.getByLabelText('Qərar sualı'), '  Harada  işləyim? ')
    await user.type(screen.getByLabelText('Seçim 1'), ' Evdə ')
    await user.type(screen.getByLabelText('Seçim 2'), ' Ofisdə  işləyim ')
    await user.click(screen.getByRole('button', { name: 'Qərarı yarat' }))

    expect(onCreate).toHaveBeenCalledOnce()
    expect(onCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        question: 'Harada işləyim?',
        options: [
          expect.objectContaining({ label: 'Evdə' }),
          expect.objectContaining({ label: 'Ofisdə işləyim' }),
        ],
      }),
    )
  })

  it('caps decisions at eight options', async () => {
    const user = userEvent.setup()

    render(<DecisionForm onCreate={vi.fn()} onClose={vi.fn()} />)
    const addButton = screen.getByRole('button', { name: 'Seçim əlavə et' })

    for (let index = 0; index < 6; index += 1) {
      await user.click(addButton)
    }

    expect(screen.getAllByLabelText(/^Seçim \d$/)).toHaveLength(8)
    expect(addButton).toBeDisabled()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<DecisionForm onCreate={vi.fn()} onClose={onClose} />)
    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledOnce()
  })
})
