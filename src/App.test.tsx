import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import App from './App'

const STORAGE_KEY = 'decision-board-decisions'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows a localized empty state when the saved board is empty', () => {
    localStorage.setItem(STORAGE_KEY, '[]')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Hələ qərar yoxdur' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'İlk qərarı yarat' }),
    ).toBeInTheDocument()
  })

  it('keeps the closed mobile drawer out of the accessibility tree', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.queryByRole('complementary', {
        name: 'Qərarlar naviqasiyası',
      }),
    ).not.toBeInTheDocument()

    const menuButton = screen.getByRole('button', {
      name: 'Qərarlar menyusunu aç',
    })
    await user.click(menuButton)

    expect(
      screen.getByRole('complementary', {
        name: 'Qərarlar naviqasiyası',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Qərarlar menyusunu bağla' }),
    ).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(
      screen.queryByRole('complementary', {
        name: 'Qərarlar naviqasiyası',
      }),
    ).not.toBeInTheDocument()
    expect(menuButton).toHaveFocus()
  })

  it('creates a decision, selects an option and allows choosing again', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Harada dərs oxuyum?' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Yeni qərar' }))
    await user.type(screen.getByLabelText('Qərar sualı'), 'Axşam nə edək?')
    await user.type(screen.getByLabelText('Seçim 1'), 'Parkda gəzək')
    await user.type(screen.getByLabelText('Seçim 2'), 'Film izləyək')
    await user.click(screen.getByRole('button', { name: 'Qərarı yarat' }))

    expect(
      screen.getByRole('heading', { name: 'Axşam nə edək?' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Parkda gəzək/ }))

    expect(screen.getByText('Sizin qərarınız')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Parkda gəzək' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Yenidən seçim et' }))

    expect(
      screen.getByRole('button', { name: /Parkda gəzək/ }),
    ).toBeInTheDocument()
  })
})
