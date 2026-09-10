import type { Decision } from '../types/decision'

export const MIN_OPTIONS = 2
export const MAX_OPTIONS = 8
export const QUESTION_MIN_LENGTH = 3
export const QUESTION_MAX_LENGTH = 120
export const OPTION_MAX_LENGTH = 60

const graphemeSegmenter = new Intl.Segmenter('az-AZ', {
  granularity: 'grapheme',
})

export interface DecisionDraftErrors {
  question?: string
  options: Record<number, string>
  form?: string
}

export type ValidationResult =
  | {
      success: true
      data: {
        question: string
        options: string[]
      }
    }
  | {
      success: false
      errors: DecisionDraftErrors
    }

export function validateDecisionDraft(
  question: string,
  options: string[],
): ValidationResult {
  const normalizedQuestion = normalizeText(question)
  const normalizedOptions = options.map(normalizeText)
  const errors: DecisionDraftErrors = { options: {} }

  if (!normalizedQuestion) {
    errors.question = 'Qərar sualını daxil edin.'
  } else if (
    countVisibleCharacters(normalizedQuestion) < QUESTION_MIN_LENGTH
  ) {
    errors.question = 'Sual ən azı 3 simvoldan ibarət olmalıdır.'
  } else if (
    countVisibleCharacters(normalizedQuestion) > QUESTION_MAX_LENGTH
  ) {
    errors.question = 'Sual 120 simvoldan çox ola bilməz.'
  }

  if (normalizedOptions.length < MIN_OPTIONS) {
    errors.form = 'Ən azı 2 seçim əlavə edin.'
  } else if (normalizedOptions.length > MAX_OPTIONS) {
    errors.form = 'Ən çox 8 seçim əlavə edə bilərsiniz.'
  }

  const optionIndexes = new Map<string, number>()

  normalizedOptions.forEach((option, index) => {
    if (!option) {
      errors.options[index] = 'Seçim boş ola bilməz.'
      return
    }

    if (countVisibleCharacters(option) > OPTION_MAX_LENGTH) {
      errors.options[index] = 'Seçim 60 simvoldan çox ola bilməz.'
      return
    }

    const comparableOption = option.toLocaleLowerCase('az-AZ')

    if (optionIndexes.has(comparableOption)) {
      errors.options[index] = 'Bu seçim artıq əlavə edilib.'
      return
    }

    optionIndexes.set(comparableOption, index)
  })

  if (
    errors.question ||
    errors.form ||
    Object.keys(errors.options).length > 0
  ) {
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      question: normalizedQuestion,
      options: normalizedOptions,
    },
  }
}

export function parseStoredDecisions(value: string | null): Decision[] | null {
  if (value === null) return null

  try {
    const parsed: unknown = JSON.parse(value)

    if (!Array.isArray(parsed)) return null

    const decisionIds = new Set<string>()
    const decisions: Decision[] = []

    for (const candidate of parsed) {
      if (!isRecord(candidate)) return null

      const { id, question, options, selectedOptionId, createdAt } = candidate

      if (
        !isNonEmptyString(id) ||
        decisionIds.has(id) ||
        typeof question !== 'string' ||
        !Array.isArray(options) ||
        typeof createdAt !== 'number' ||
        !Number.isFinite(createdAt) ||
        !Number.isFinite(new Date(createdAt).getTime()) ||
        (selectedOptionId !== undefined &&
          !isNonEmptyString(selectedOptionId))
      ) {
        return null
      }

      const optionIds = new Set<string>()
      const parsedOptions: Decision['options'] = []

      for (const option of options) {
        if (
          !isRecord(option) ||
          !isNonEmptyString(option.id) ||
          optionIds.has(option.id) ||
          typeof option.label !== 'string'
        ) {
          return null
        }

        optionIds.add(option.id)
        parsedOptions.push({ id: option.id, label: option.label })
      }

      const normalizedQuestion = normalizeText(question)
      const normalizedOptions = parsedOptions.map((option) => ({
        ...option,
        label: normalizeText(option.label),
      }))

      if (
        !normalizedQuestion ||
        normalizedOptions.length < MIN_OPTIONS ||
        normalizedOptions.some((option) => !option.label) ||
        (selectedOptionId !== undefined && !optionIds.has(selectedOptionId))
      ) {
        return null
      }

      decisionIds.add(id)
      decisions.push({
        id,
        question: normalizedQuestion,
        options: normalizedOptions,
        ...(selectedOptionId === undefined ? {} : { selectedOptionId }),
        createdAt,
      })
    }

    return decisions
  } catch {
    return null
  }
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function countVisibleCharacters(value: string) {
  return Array.from(graphemeSegmenter.segment(value)).length
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}
