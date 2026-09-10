import { CheckCircle2, Lightbulb, Trash2, X } from 'lucide-react'

import type { Decision } from '../../types/decision'
import { formatNumericDate } from '../../utils/dateFormatter'

interface SidebarProps {
  decisions: Decision[]
  selectedDecisionId: string | null
  onSelectDecision: (id: string) => void
  onDeleteDecision: (id: string) => void
  onClose: () => void
}

function Sidebar({
  decisions,
  selectedDecisionId,
  onSelectDecision,
  onDeleteDecision,
  onClose,
}: SidebarProps) {
  return (
    <aside
      aria-label="Qərarlar naviqasiyası"
      className="flex h-full w-full flex-col border-r border-white/80 bg-white/95 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl md:bg-white/55 md:shadow-none"
    >
      <div className="flex h-[4.5rem] items-center justify-between border-b border-slate-100 px-5 md:hidden">
        <div>
          <p className="font-extrabold text-slate-950">Qərarlarım</p>
          <p className="text-xs text-slate-500">{decisions.length} qərar saxlanılıb</p>
        </div>
        <button
          aria-label="Qərarlar menyusunu bağla"
          className="icon-button"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" size={19} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5 sm:px-4">
        <div className="mb-4 hidden items-end justify-between px-2 md:flex">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600">
              İş məkanınız
            </p>
            <h2 className="mt-1.5 text-lg font-black tracking-tight text-slate-950">
              Qərarlarım
            </h2>
          </div>
          <span className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-indigo-50 px-2 text-xs font-extrabold text-indigo-700">
            {decisions.length}
          </span>
        </div>

        {decisions.length === 0 ? (
          <div className="mx-2 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 px-4 py-6 text-center">
            <Lightbulb aria-hidden="true" className="mx-auto text-indigo-400" size={24} />
            <p className="mt-3 text-sm font-bold text-slate-700">Siyahınız boşdur</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              İlk qərarınızı yaradaraq başlayın.
            </p>
          </div>
        ) : (
          <nav aria-label="Saxlanmış qərarlar">
            <ul className="space-y-2">
              {decisions.map((decision, index) => {
                const isActive = selectedDecisionId === decision.id

                return (
                  <li
                    className={`group relative flex items-center overflow-hidden rounded-2xl border transition duration-200 ${
                      isActive
                        ? 'border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50/70 shadow-sm'
                        : 'border-transparent hover:border-slate-100 hover:bg-white/80 hover:shadow-sm'
                    }`}
                    key={decision.id}
                  >
                    {isActive && (
                      <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                    )}
                    <button
                      aria-current={isActive ? 'page' : undefined}
                      className="min-w-0 flex-1 py-3 pl-3.5 pr-1 text-left"
                      onClick={() => onSelectDecision(decision.id)}
                      type="button"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                          }`}
                        >
                          {isActive && decision.selectedOptionId ? (
                            <CheckCircle2 aria-hidden="true" size={17} />
                          ) : (
                            String(index + 1).padStart(2, '0')
                          )}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block break-words text-sm font-bold leading-5 ${
                              isActive ? 'text-slate-950' : 'text-slate-600'
                            }`}
                          >
                            {decision.question}
                          </span>
                          <span className="mt-1 block text-[11px] font-semibold text-slate-500">
                            {decision.options.length} seçim ·{' '}
                            {formatNumericDate(decision.createdAt)}
                          </span>
                        </span>
                      </span>
                    </button>

                    <button
                      aria-label={`“${decision.question}” qərarını sil`}
                      className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:bg-rose-50 focus-visible:text-rose-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 md:opacity-0 md:group-hover:opacity-100"
                      onClick={() => onDeleteDecision(decision.id)}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
