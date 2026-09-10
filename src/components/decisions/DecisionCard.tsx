import { ArrowUpRight, MousePointerClick } from 'lucide-react'

import type { Decision } from '../../types/decision'

interface DecisionCardProps {
  decision: Decision
  onSelect: (optionId: string) => void
}

function DecisionCard({ decision, onSelect }: DecisionCardProps) {
  return (
    <div className="mt-8 border-t border-slate-100 pt-7 sm:mt-9 sm:pt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-extrabold text-slate-700">
          <MousePointerClick aria-hidden="true" className="text-indigo-500" size={17} />
          Bir variant seçin
        </p>
        <p className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
          {decision.options.length} seçim mövcuddur
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {decision.options.map((option, index) => (
          <button
            aria-label={`${option.label} seçimini et`}
            className="decision-option group relative flex min-h-[5.25rem] w-full items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-left shadow-[0_8px_28px_rgba(30,41,59,0.05)] transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_18px_38px_rgba(79,70,229,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100 active:translate-y-0"
            key={option.id}
            onClick={() => onSelect(option.id)}
            style={{ animationDelay: `${index * 55}ms` }}
            type="button"
          >
            <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-indigo-500 to-violet-500 transition duration-300 group-hover:scale-y-100" />
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-500 transition duration-300 group-hover:rotate-[-4deg] group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1 break-words font-bold leading-6 text-slate-800 transition group-hover:text-slate-950">
              {option.label}
            </span>
            <span className="flex h-9 w-9 shrink-0 translate-x-1 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 opacity-70 transition duration-300 group-hover:translate-x-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:opacity-100">
              <ArrowUpRight aria-hidden="true" size={17} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DecisionCard
