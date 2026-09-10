import { useState } from 'react'

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import { initialDecisions } from './data/initialDecisions'

function App() {
  const [decisions] = useState(initialDecisions)
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    initialDecisions[0]?.id ?? null
  )

  const selectedDecision = decisions.find(
    (decision) => decision.id === selectedDecisionId
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          decisions={decisions}
          selectedDecisionId={selectedDecisionId}
          onSelectDecision={setSelectedDecisionId}
        />

        <main className="flex-1 p-8">
          {selectedDecision ? (
            <div className="mx-auto max-w-3xl">
              <span className="text-sm font-medium text-gray-500">
                Decision
              </span>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {selectedDecision.question}
              </h1>

              <p className="mt-2 text-gray-500">
                Choose one option below.
              </p>

              <div className="mt-8 space-y-3">
                {selectedDecision.options.map((option) => (
                  <button
                    key={option.id}
                    className="w-full rounded-xl border bg-white p-4 text-left transition hover:border-gray-400 hover:shadow-sm"
                  >
                    <span className="font-medium text-gray-900">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">No decision selected.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App