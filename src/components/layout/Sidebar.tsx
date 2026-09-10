import { X, Trash2 } from 'lucide-react'
import type { Decision } from '../../types/decision'

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
        <aside className="flex h-full w-72 flex-col border-r bg-white">
            <div className="flex items-center justify-between border-b p-4 md:hidden">
                <span className="font-semibold text-gray-900">My Decisions</span>

                <button
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                >
                    <X size={19} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <h2 className="mb-4 hidden text-xs font-semibold uppercase tracking-wider text-gray-400 md:block">
                    My Decisions
                </h2>

                {decisions.length === 0 ? (
                    <p className="px-3 py-4 text-sm text-gray-400">
                        No decisions yet.
                    </p>
                ) : (
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
                                        className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-red-500"
                                        aria-label={`Delete ${decision.question}`}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar