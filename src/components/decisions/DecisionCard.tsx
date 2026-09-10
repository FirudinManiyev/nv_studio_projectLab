import { Check, Circle } from 'lucide-react'
import type { Decision } from '../../types/decision'

interface DecisionCardProps {
    decision: Decision
    onSelect: (optionId: string) => void
}

function DecisionCard({ decision, onSelect }: DecisionCardProps) {
    return (
        <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                    {decision.options.length} options
                </span>

                <span className="text-xs text-gray-400">
                    Select one
                </span>
            </div>

            <div className="space-y-3">
                {decision.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition group-hover:bg-gray-900 group-hover:text-white">
                            <Circle size={20} />
                        </div>

                        <span className="flex-1 font-medium text-gray-900">
                            {option.label}
                        </span>

                        <span className="text-gray-300 transition group-hover:text-gray-900">
                            →
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DecisionCard