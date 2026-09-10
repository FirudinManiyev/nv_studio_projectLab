import { useEffect, useRef, useState } from 'react'
import {
  CalendarDays,
  CheckCheck,
  Lightbulb,
  ListChecks,
  Plus,
  Trash2,
} from 'lucide-react'

import DecisionCard from './components/decisions/DecisionCard'
import DecisionForm from './components/decisions/DecisionForm'
import DecisionResult from './components/decisions/DecisionResult'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import ConfirmDialog from './components/ui/ConfirmDialog'
import { useDecisions } from './hooks/useDecisions'
import { useMediaQuery } from './hooks/useMediaQuery'
import type { Decision } from './types/decision'
import { formatNumericDate } from './utils/dateFormatter'

function App() {
  const { decisions, setDecisions } = useDecisions()
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    decisions[0]?.id ?? null,
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [deleteDecisionId, setDeleteDecisionId] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const selectedDecision = decisions.find(
    (decision) => decision.id === selectedDecisionId,
  )
  const decisionToDelete = decisions.find(
    (decision) => decision.id === deleteDecisionId,
  )

  useEffect(() => {
    if (!isSidebarOpen || isDesktop) return

    const sidebar = sidebarRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    document.body.style.overflow = 'hidden'
    sidebar?.querySelector<HTMLElement>(focusableSelector)?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsSidebarOpen(false)
        return
      }

      if (event.key !== 'Tab' || !sidebar) return

      const focusableElements = Array.from(
        sidebar.querySelectorAll<HTMLElement>(focusableSelector),
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (!firstElement || !lastElement) return

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [isDesktop, isSidebarOpen])

  const handleCreateDecision = (decision: Decision) => {
    setDecisions((previous) => [...previous, decision])
    setSelectedDecisionId(decision.id)
    setIsFormOpen(false)
  }

  const handleSelectDecision = (id: string) => {
    setSelectedDecisionId(id)
    setIsSidebarOpen(false)
  }

  const handleSelectOption = (optionId: string) => {
    if (
      !selectedDecisionId ||
      !selectedDecision?.options.some((option) => option.id === optionId)
    ) {
      return
    }

    setDecisions((previous) =>
      previous.map((decision) =>
        decision.id === selectedDecisionId
          ? { ...decision, selectedOptionId: optionId }
          : decision,
      ),
    )
  }

  const handleChooseAgain = () => {
    if (!selectedDecisionId) return

    setDecisions((previous) =>
      previous.map((decision) =>
        decision.id === selectedDecisionId
          ? { ...decision, selectedOptionId: undefined }
          : decision,
      ),
    )
  }

  const handleDeleteDecision = () => {
    if (!deleteDecisionId) return

    const updatedDecisions = decisions.filter(
      (decision) => decision.id !== deleteDecisionId,
    )

    setDecisions(updatedDecisions)

    if (selectedDecisionId === deleteDecisionId) {
      setSelectedDecisionId(updatedDecisions[0]?.id ?? null)
    }

    setDeleteDecisionId(null)
    setIsSidebarOpen(false)
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f8fc] text-slate-900">
      <div aria-hidden="true" className="ambient-orb ambient-orb-left" />
      <div aria-hidden="true" className="ambient-orb ambient-orb-right" />

      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        onNewDecision={() => setIsFormOpen(true)}
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-4.5rem)]">
        <button
          aria-hidden="true"
          className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] transition duration-300 md:hidden ${
            isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
          tabIndex={-1}
          type="button"
        />

        <div
          aria-hidden={!isDesktop && !isSidebarOpen}
          className={`fixed inset-y-0 left-0 z-50 w-[19rem] max-w-[88vw] transform transition-transform duration-300 ease-out md:sticky md:top-[4.5rem] md:z-20 md:h-[calc(100dvh-4.5rem)] md:max-w-none md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          inert={!isDesktop && !isSidebarOpen}
          ref={sidebarRef}
        >
          <Sidebar
            decisions={decisions}
            onClose={() => setIsSidebarOpen(false)}
            onDeleteDecision={setDeleteDecisionId}
            onSelectDecision={handleSelectDecision}
            selectedDecisionId={selectedDecisionId}
          />
        </div>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-9 lg:px-10 lg:py-12 xl:px-14">
          {selectedDecision ? (
            <section className="mx-auto max-w-4xl animate-fade-up">
              <div className="rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-[0_20px_70px_rgba(51,45,99,0.08)] backdrop-blur-xl sm:p-7 lg:p-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-700">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.13)]" />
                        Aktiv qərar
                      </span>
                      {selectedDecision.selectedOptionId && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          Seçim edilib
                        </span>
                      )}
                    </div>

                    <h1 className="mt-4 max-w-3xl break-words text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[2.75rem]">
                      {selectedDecision.question}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                      {selectedDecision.selectedOptionId
                        ? 'Qərarınız hazırdır. İstəsəniz, seçiminizi yenidən nəzərdən keçirə bilərsiniz.'
                        : 'Sizə ən uyğun variantı seçin. Burada doğru və ya yanlış cavab yoxdur.'}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 sm:text-sm">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays aria-hidden="true" size={16} />
                        {formatNumericDate(selectedDecision.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <ListChecks aria-hidden="true" size={16} />
                        {selectedDecision.options.length} seçim
                      </span>
                    </div>
                  </div>

                  <button
                    aria-label="Qərarı sil"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-500 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 sm:px-4"
                    onClick={() => setDeleteDecisionId(selectedDecision.id)}
                    type="button"
                  >
                    <Trash2 aria-hidden="true" size={17} />
                    <span>Sil</span>
                  </button>
                </div>

                {selectedDecision.selectedOptionId ? (
                  <DecisionResult
                    decision={selectedDecision}
                    onChooseAgain={handleChooseAgain}
                  />
                ) : (
                  <DecisionCard
                    decision={selectedDecision}
                    onSelect={handleSelectOption}
                  />
                )}
              </div>
            </section>
          ) : (
            <section className="mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl items-center justify-center py-10 text-center">
              <div className="animate-fade-up">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-[0_20px_50px_rgba(99,102,241,0.3)]">
                  <Lightbulb aria-hidden="true" size={38} strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-2xl border-4 border-[#f8f8fc] bg-amber-400 text-slate-950">
                    <CheckCheck aria-hidden="true" size={16} />
                  </span>
                </div>
                <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.18em] text-indigo-600">
                  İlk addımı atın
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  Hələ qərar yoxdur
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                  Ağlınızdakı sualı və mümkün variantları əlavə edin, onları müqayisə edib daha aydın qərar verin.
                </p>
                <button
                  className="button-primary mt-7 px-6"
                  onClick={() => setIsFormOpen(true)}
                  type="button"
                >
                  <Plus aria-hidden="true" size={18} />
                  İlk qərarı yarat
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {isFormOpen && (
        <DecisionForm
          onClose={() => setIsFormOpen(false)}
          onCreate={handleCreateDecision}
        />
      )}

      {decisionToDelete && (
        <ConfirmDialog
          description={`“${decisionToDelete.question}” qərarı və ona aid seçimlər həmişəlik silinəcək.`}
          onCancel={() => setDeleteDecisionId(null)}
          onConfirm={handleDeleteDecision}
          title="Qərar silinsin?"
        />
      )}
    </div>
  )
}

export default App
