import { useState } from 'react'

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import DecisionCard from './components/decisions/DecisionCard'
import DecisionResult from './components/decisions/DecisionResult'
import DecisionForm from './components/decisions/DecisionForm'
import { initialDecisions } from './data/initialDecisions'
import type { Decision } from './types/decision'

function App() {
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions)
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    initialDecisions[0]?.id ?? null
  )
  const [isFormOpen, setIsFormOpen] = useState(false)

  const selectedDecision = decisions.find(
    (decision) => decision.id === selectedDecisionId
  )

  const handleCreateDecision = (decision: Decision) => {
    setDecisions((prev) => [...prev, decision])
    setSelectedDecisionId(decision.id)
    setIsFormOpen(false)
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

  const handleDeleteDecision = (id: string) => {
    setDecisions((prev) => {
      const updated = prev.filter((decision) => decision.id !== id)

      if (selectedDecisionId === id) {
        setSelectedDecisionId(updated[0]?.id ?? null)
      }

      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewDecision={() => setIsFormOpen(true)} />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          decisions={decisions}
          selectedDecisionId={selectedDecisionId}
          onSelectDecision={setSelectedDecisionId}
          onDeleteDecision={handleDeleteDecision}
        />

        <main className="flex-1 p-6 lg:p-10">
          {selectedDecision ? (
            <div className="mx-auto max-w-3xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-400">
                    Decision
                  </span>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                    {selectedDecision.question}
                  </h1>

                  <p className="mt-2 text-gray-500">
                    {selectedDecision.selectedOptionId
                      ? 'Your decision has been made.'
                      : 'Choose one option below.'}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDeleteDecision(selectedDecision.id)
                  }
                  className="shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-red-500 transition hover:border-red-200 hover:bg-red-50"
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
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  +
                </div>

                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                  No decisions yet
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Create your first decision to get started.
                </p>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
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
    </div>
  )
}

export default App