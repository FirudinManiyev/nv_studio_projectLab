import { describe, expect, it } from 'vitest'

import { formatNumericDate } from './dateFormatter'

describe('formatNumericDate', () => {
  it('formats dates with digits and separators only', () => {
    const date = new Date(2026, 8, 10).getTime()

    expect(formatNumericDate(date)).toBe('10.09.2026')
  })
})
