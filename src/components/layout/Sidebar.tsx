import type { Decision } from '../../types/decision'

interface SidebarProps {
    decisions: Decision[]
    selectedDecisionId: string | null
    onSelectDecision: (id: string) => void
}

function Sidebar({
    decisions,
    selectedDecisionId,
    onSelectDecision,
}: SidebarProps) {
    return (
        <aside className="w-72 shrink-0 border-r bg-white">
            <div className="p-4">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    My Decisions
                </h2>

                <div className="space-y-1">
                    {decisions.map((decision) => (
                        <button
                            key={decision.id}
                            onClick={() => onSelectDecision(decision.id)}
                            className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${selectedDecisionId === decision.id
                                    ? 'bg-gray-100 font-medium text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {decision.question}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar