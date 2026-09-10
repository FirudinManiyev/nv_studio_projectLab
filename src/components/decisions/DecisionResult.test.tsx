import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Decision } from '../../types/decision'
import DecisionResult from './DecisionResult'

const decision: Decision = {
  id: 'decision-1',
  question: 'Axşam nə edək?',
  options: [
    { id: 'option-1', label: 'Parkda gəzək' },
    { id: 'option-2', label: 'Film izləyək' },
  ],
  selectedOptionId: 'option-1',
  createdAt: 1_725_000_000_000,
}

describe('DecisionResult', () => {
  it('announces the selected result and allows choosing again', async () => {
    const user = userEvent.setup()
    const onChooseAgain = vi.fn()

    render(<DecisionResult decision={decision} onChooseAgain={onChooseAgain} />)

    expect(screen.getByRole('status')).toHaveTextContent('Parkda gəzək')

    await user.click(screen.getByRole('button', { name: 'Yenidən seçim et' }))
    expect(onChooseAgain).toHaveBeenCalledOnce()
  })
})
