import { useRef, useState, type FormEvent } from 'react'
import { ClipboardPlus, ListPlus, Plus, Trash2, X } from 'lucide-react'

import { useDialog } from '../../hooks/useDialog'
import type { Decision } from '../../types/decision'
import {
  MAX_OPTIONS,
  OPTION_MAX_LENGTH,
  QUESTION_MAX_LENGTH,
  countVisibleCharacters,
  validateDecisionDraft,
  type DecisionDraftErrors,
} from '../../utils/decisionValidation'

interface DecisionFormProps {
  onCreate: (decision: Decision) => void
  onClose: () => void
}

const emptyErrors = (): DecisionDraftErrors => ({ options: {} })
const ordinalSuffixes = ['ci', 'ci', 'cü', 'cü', 'ci', 'cı', 'ci', 'ci']

function DecisionForm({ onCreate, onClose }: DecisionFormProps) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [errors, setErrors] = useState<DecisionDraftErrors>(emptyErrors)
  const questionInputRef = useRef<HTMLInputElement>(null)

  useDialog(onClose, questionInputRef)

  const addOption = () => {
    if (options.length >= MAX_OPTIONS) return
    setOptions((previous) => [...previous, ''])
    setErrors(emptyErrors())
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return
    setOptions((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
    setErrors(emptyErrors())
  }

  const updateOption = (index: number, value: string) => {
    setOptions((previous) =>
      previous.map((option, itemIndex) => (itemIndex === index ? value : option)),
    )
    setErrors(emptyErrors())
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = validateDecisionDraft(question, options)

    if (!result.success) {
      setErrors(result.errors)
      return
    }

    onCreate({
      id: crypto.randomUUID(),
      question: result.data.question,
      options: result.data.options.map((label) => ({
        id: crypto.randomUUID(),
        label,
      })),
      createdAt: Date.now(),
    })
  }

  return (
    <div
      className="dialog-backdrop fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-describedby="decision-form-description"
        aria-labelledby="decision-form-title"
        aria-modal="true"
        className="dialog-panel max-h-[92dvh] w-full overflow-y-auto rounded-t-[2rem] border border-white/70 bg-white p-5 shadow-[0_-20px_70px_rgba(30,27,75,0.24)] sm:max-w-xl sm:rounded-[2rem] sm:p-7 sm:shadow-[0_28px_90px_rgba(30,27,75,0.25)]"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-200 sm:flex">
              <ClipboardPlus aria-hidden="true" size={21} />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                Yeni başlanğıc
              </p>
              <h2
                className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl"
                id="decision-form-title"
              >
                Yeni qərar yarat
              </h2>
              <p
                className="mt-1.5 text-sm leading-6 text-slate-500"
                id="decision-form-description"
              >
                Sualınızı yazın və ən azı iki seçim əlavə edin.
              </p>
            </div>
          </div>

          <button
            aria-label="Pəncərəni bağla"
            className="icon-button -mr-1 -mt-1"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>

        <form className="mt-7 space-y-6" noValidate onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label className="form-label" htmlFor="decision-question">
                Qərar sualı
              </label>
              <span className="text-xs tabular-nums text-slate-500">
                {countVisibleCharacters(question)}/{QUESTION_MAX_LENGTH}
              </span>
            </div>
            <input
              aria-describedby={errors.question ? 'question-error' : undefined}
              aria-invalid={Boolean(errors.question)}
              autoComplete="off"
              className="form-input"
              id="decision-question"
              onChange={(event) => {
                setQuestion(event.target.value)
                setErrors((previous) => ({ ...previous, question: undefined }))
              }}
              placeholder="Məsələn: Həftəsonu hara gedək?"
              ref={questionInputRef}
              type="text"
              value={question}
            />
            {errors.question && (
              <p className="form-error" id="question-error" role="alert">
                {errors.question}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="sr-only">Seçimlər</legend>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div aria-hidden="true" className="form-label flex items-center gap-2">
                <ListPlus aria-hidden="true" size={16} />
                Seçimlər
                <span className="font-normal text-slate-500">
                  ({options.length}/{MAX_OPTIONS})
                </span>
              </div>

              <button
                aria-label="Seçim əlavə et"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-2.5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={options.length >= MAX_OPTIONS}
                onClick={addOption}
                type="button"
              >
                <Plus aria-hidden="true" size={16} />
                Əlavə et
              </button>
            </div>

            <div className="space-y-3">
              {options.map((option, index) => {
                const errorId = `option-${index}-error`

                return (
                  <div className="option-field" key={index}>
                    <div className="relative flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="absolute left-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-xs font-extrabold text-indigo-600"
                      >
                        {index + 1}
                      </span>
                      <input
                        aria-describedby={errors.options[index] ? errorId : undefined}
                        aria-invalid={Boolean(errors.options[index])}
                        aria-label={`Seçim ${index + 1}`}
                        autoComplete="off"
                        className="form-input min-w-0 flex-1 pl-12 pr-3"
                        onChange={(event) => updateOption(index, event.target.value)}
                        placeholder={`${index + 1}-${ordinalSuffixes[index]} seçimi yazın`}
                        type="text"
                        value={option}
                      />

                      <button
                        aria-label={`${index + 1}-${ordinalSuffixes[index]} seçimi sil`}
                        className="icon-button shrink-0 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        disabled={options.length <= 2}
                        onClick={() => removeOption(index)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={17} />
                      </button>
                    </div>
                    {errors.options[index] && (
                      <p className="form-error" id={errorId} role="alert">
                        {errors.options[index]}
                      </p>
                    )}
                    <span className="mt-1.5 block text-right text-[11px] tabular-nums text-slate-500">
                      {countVisibleCharacters(option)}/{OPTION_MAX_LENGTH}
                    </span>
                  </div>
                )
              })}
            </div>
          </fieldset>

          {errors.form && (
            <p className="form-error rounded-xl bg-rose-50 px-3 py-2" role="alert">
              {errors.form}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
            <button className="button-secondary flex-1" onClick={onClose} type="button">
              Ləğv et
            </button>
            <button className="button-primary flex-1" type="submit">
              <Plus aria-hidden="true" size={17} />
              Qərarı yarat
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default DecisionForm
