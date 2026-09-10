import { describe, expect, it } from 'vitest'

import {
  MAX_OPTIONS,
  validateDecisionDraft,
  parseStoredDecisions,
} from './decisionValidation'

describe('validateDecisionDraft', () => {
  it('normalizes whitespace before returning a valid draft', () => {
    const result = validateDecisionDraft('  Harada   işləyim?  ', [
      '  Evdə ',
      'Ofisdə   işləyim',
    ])

    expect(result).toEqual({
      success: true,
      data: {
        question: 'Harada işləyim?',
        options: ['Evdə', 'Ofisdə işləyim'],
      },
    })
  })

  it('rejects a question shorter than three visible characters', () => {
    const result = validateDecisionDraft('  A ', ['Bir', 'İki'])

    expect(result).toMatchObject({
      success: false,
      errors: {
        question: 'Sual ən azı 3 simvoldan ibarət olmalıdır.',
      },
    })
  })

  it('counts emoji graphemes as visible characters instead of UTF-16 units', () => {
    const shortQuestion = validateDecisionDraft('😀😀', ['Bir', 'İki'])
    const sixtyEmojiOption = validateDecisionDraft('Hansı seçim?', [
      '😀'.repeat(60),
      'Digər seçim',
    ])

    expect(shortQuestion).toMatchObject({
      success: false,
      errors: {
        question: 'Sual ən azı 3 simvoldan ibarət olmalıdır.',
      },
    })
    expect(sixtyEmojiOption).toMatchObject({ success: true })
  })

  it('rejects a question longer than 120 characters', () => {
    const result = validateDecisionDraft('a'.repeat(121), ['Bir', 'İki'])

    expect(result).toMatchObject({
      success: false,
      errors: {
        question: 'Sual 120 simvoldan çox ola bilməz.',
      },
    })
  })

  it('reports blank, overlong and duplicate option fields', () => {
    const result = validateDecisionDraft('Hansı seçim?', [
      'Evdə',
      ' ',
      'eVDƏ',
      'a'.repeat(61),
    ])

    expect(result).toMatchObject({
      success: false,
      errors: {
        options: {
          1: 'Seçim boş ola bilməz.',
          2: 'Bu seçim artıq əlavə edilib.',
          3: 'Seçim 60 simvoldan çox ola bilməz.',
        },
      },
    })
  })

  it('enforces the maximum option count', () => {
    const options = Array.from({ length: MAX_OPTIONS + 1 }, (_, index) =>
      `Seçim ${index + 1}`,
    )

    const result = validateDecisionDraft('Hansı seçim?', options)

    expect(result).toMatchObject({
      success: false,
      errors: {
        form: 'Ən çox 8 seçim əlavə edə bilərsiniz.',
      },
    })
  })
})

describe('parseStoredDecisions', () => {
  const validDecision = {
    id: 'decision-1',
    question: 'Bu gün nə edək?',
    options: [
      { id: 'option-1', label: 'Gəzintiyə çıxaq' },
      { id: 'option-2', label: 'Film izləyək' },
    ],
    selectedOptionId: 'option-1',
    createdAt: 1_725_000_000_000,
  }

  it('returns valid stored decisions', () => {
    expect(parseStoredDecisions(JSON.stringify([validDecision]))).toEqual([
      validDecision,
    ])
  })

  it('preserves structurally safe legacy data outside the new creation limits', () => {
    const legacyDecision = {
      ...validDecision,
      question: 'a'.repeat(121),
      options: Array.from({ length: 9 }, (_, index) => ({
        id: `legacy-option-${index}`,
        label: `Köhnə seçim ${index}`,
      })),
      selectedOptionId: 'legacy-option-0',
    }

    expect(parseStoredDecisions(JSON.stringify([legacyDecision]))).toEqual([
      legacyDecision,
    ])
  })

  it.each([
    ['invalid JSON', '{'],
    ['a non-array root', JSON.stringify(validDecision)],
    [
      'an unknown selected option',
      JSON.stringify([{ ...validDecision, selectedOptionId: 'missing' }]),
    ],
    [
      'duplicate option identifiers',
      JSON.stringify([
        {
          ...validDecision,
          options: [
            validDecision.options[0],
            { ...validDecision.options[1], id: 'option-1' },
          ],
        },
      ]),
    ],
    [
      'a timestamp outside the JavaScript date range',
      JSON.stringify([{ ...validDecision, createdAt: Number.MAX_VALUE }]),
    ],
  ])('rejects %s', (_, value) => {
    expect(parseStoredDecisions(value)).toBeNull()
  })
})
