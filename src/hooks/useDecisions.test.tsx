import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { initialDecisions } from '../data/initialDecisions'
import { useDecisions } from './useDecisions'

const STORAGE_KEY = 'decision-board-decisions'

describe('useDecisions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('falls back to starter decisions when stored JSON has the wrong shape', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions: [] }))

    const { result } = renderHook(() => useDecisions())

    expect(result.current.decisions).toEqual(initialDecisions)
  })

  it('keeps the application usable when localStorage rejects a write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage quota exceeded', 'QuotaExceededError')
    })

    expect(() => renderHook(() => useDecisions())).not.toThrow()
  })
})
