import type { Decision } from '../../types/decision'

interface SidebarProps {
    decisions: Decision[]
    selectedDecisionId: string | null
    onSelectDecision: (id: string) => void
    onDeleteDecision: (id: string) => void
}

function Sidebar({
    decisions,
    selectedDecisionId,
    onSelectDecision,
    onDeleteDecision,
}: SidebarProps) {
    return (
        <aside className="hidden w-72 shrink-0 border-r bg-white md:block">
            <div className="p-4">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    My Decisions
                </h2>

                <div className="space-y-1">
                    {decisions.map((decision) => {
                        const isActive = selectedDecisionId === decision.id

                        return (
                            <div
                                key={decision.id}
                                className={`group flex items-center rounded-xl transition ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <button
                                    onClick={() => onSelectDecision(decision.id)}
                                    className={`min-w-0 flex-1 px-3 py-3 text-left text-sm ${isActive
                                            ? 'font-medium text-gray-900'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    <span className="block truncate">
                                        {decision.question}
                                    </span>
                                </button>

                                <button
                                    onClick={() => onDeleteDecision(decision.id)}
                                    className="mr-2 hidden rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-white hover:text-red-500 group-hover:block"
                                    aria-label={`Delete ${decision.question}`}
                                >
                                    ×
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar