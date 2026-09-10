import { useState } from 'react'

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import DecisionCard from './components/decisions/DecisionCard'
import DecisionResult from './components/decisions/DecisionResult'
import DecisionForm from './components/decisions/DecisionForm'
import ConfirmDialog from './components/ui/ConfirmDialog'
import { useDecisions } from './hooks/useDecisions'
import type { Decision } from './types/decision'

function App() {
  const { decisions, setDecisions } = useDecisions()

  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    decisions[0]?.id ?? null
  )

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [deleteDecisionId, setDeleteDecisionId] = useState<string | null>(
    null
  )

  const selectedDecision = decisions.find(
    (decision) => decision.id === selectedDecisionId
  )

  const decisionToDelete = decisions.find(
    (decision) => decision.id === deleteDecisionId
  )

  const handleCreateDecision = (decision: Decision) => {
    setDecisions((prev) => [...prev, decision])
    setSelectedDecisionId(decision.id)
    setIsFormOpen(false)
  }

  const handleSelectDecision = (id: string) => {
    setSelectedDecisionId(id)
    setIsSidebarOpen(false)
  }

  const handleSelectOption = (optionId: string) => {
    if (!selectedDecisionId) return

    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === selectedDecisionId
          ? {
            ...decision,
            selectedOptionId: optionId,
          }
          : decision
      )
    )
  }

  const handleChooseAgain = () => {
    if (!selectedDecisionId) return

    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === selectedDecisionId
          ? {
            ...decision,
            selectedOptionId: undefined,
          }
          : decision
      )
    )
  }

  const handleDeleteDecision = () => {
    if (!deleteDecisionId) return

    setDecisions((prev) => {
      const updated = prev.filter(
        (decision) => decision.id !== deleteDecisionId
      )

      if (selectedDecisionId === deleteDecisionId) {
        setSelectedDecisionId(updated[0]?.id ?? null)
      }

      return updated
    })

    setDeleteDecisionId(null)
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNewDecision={() => setIsFormOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition md:hidden ${isSidebarOpen
              ? 'visible opacity-100'
              : 'invisible opacity-0'
            }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 md:static md:block md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <Sidebar
            decisions={decisions}
            selectedDecisionId={selectedDecisionId}
            onSelectDecision={handleSelectDecision}
            onDeleteDecision={setDeleteDecisionId}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-10">
          {selectedDecision ? (
            <div className="mx-auto max-w-3xl">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-400">
                    Decision
                  </span>

                  <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {selectedDecision.question}
                  </h1>

                  <p className="mt-2 text-sm text-gray-500 sm:text-base">
                    {selectedDecision.selectedOptionId
                      ? 'Your decision has been made.'
                      : 'Choose one option below.'}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setDeleteDecisionId(selectedDecision.id)
                  }
                  className="shrink-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-red-500 transition hover:border-red-200 hover:bg-red-50 sm:px-4"
                >
                  Delete
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
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="max-w-sm text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  +
                </div>

                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                  No decisions yet
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Create a decision and add some options to get started.
                </p>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Create Decision
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {isFormOpen && (
        <DecisionForm
          onCreate={handleCreateDecision}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {decisionToDelete && (
        <ConfirmDialog
          title="Delete decision?"
          description={`"${decisionToDelete.question}" will be permanently removed from your decisions.`}
          onConfirm={handleDeleteDecision}
          onCancel={() => setDeleteDecisionId(null)}
        />
      )}
    </div>
  )
}

export default App