import { BadgeCheck, Check, RotateCcw } from 'lucide-react'

import type { Decision } from '../../types/decision'

interface DecisionResultProps {
  decision: Decision
  onChooseAgain: () => void
}

function DecisionResult({ decision, onChooseAgain }: DecisionResultProps) {
  const selectedOption = decision.options.find(
    (option) => option.id === decision.selectedOptionId,
  )

  if (!selectedOption) return null

  return (
    <div
      aria-live="polite"
      className="result-card relative mt-8 overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-indigo-50/70 px-5 py-9 text-center sm:mt-9 sm:px-10 sm:py-12"
      role="status"
    >
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-emerald-200/40 blur-2xl" />

      <div className="relative">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-emerald-600 text-white shadow-[0_16px_35px_rgba(5,150,105,0.28)]">
          <Check aria-hidden="true" size={30} strokeWidth={2.7} />
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-xl bg-amber-400 text-amber-950 shadow-md">
            <BadgeCheck aria-hidden="true" size={13} />
          </span>
        </div>

        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
          Sizin qərarınız
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl break-words text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
          {selectedOption.label}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Bu variantı seçdiniz. Fikrinizi dəyişsəniz, yenidən seçim edə bilərsiniz.
        </p>

        <button
          className="button-secondary mt-7 border-emerald-200 bg-white/80 text-emerald-800 hover:border-emerald-300 hover:bg-white"
          onClick={onChooseAgain}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={17} />
          Yenidən seçim et
        </button>
      </div>
    </div>
  )
}

export default DecisionResult
