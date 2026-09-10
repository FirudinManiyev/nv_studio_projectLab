import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ConfirmDialog from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('exposes dialog semantics and focuses the safe action', () => {
    render(
      <ConfirmDialog
        title="Qərar silinsin?"
        description="Bu əməliyyatı geri qaytarmaq mümkün deyil."
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('dialog', { name: 'Qərar silinsin?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ləğv et' })).toHaveFocus()
  })

  it('cancels when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(
      <ConfirmDialog
        title="Qərar silinsin?"
        description="Bu əməliyyatı geri qaytarmaq mümkün deyil."
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    )

    await user.keyboard('{Escape}')

    expect(onCancel).toHaveBeenCalledOnce()
  })

  it('keeps keyboard focus inside the modal dialog', async () => {
    const user = userEvent.setup()

    render(
      <ConfirmDialog
        title="Qərar silinsin?"
        description="Bu əməliyyatı geri qaytarmaq mümkün deyil."
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    )

    const closeButton = screen.getByRole('button', { name: 'Pəncərəni bağla' })
    const deleteButton = screen.getByRole('button', { name: 'Sil' })

    deleteButton.focus()
    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.tab({ shift: true })
    expect(deleteButton).toHaveFocus()
  })
})
