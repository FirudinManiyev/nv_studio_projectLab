import type { Decision } from '../../types/decision'

interface DecisionCardProps {
    decision: Decision
    onSelect: (optionId: string) => void
}

function DecisionCard({ decision, onSelect }: DecisionCardProps) {
    const hasSelectedOption = Boolean(decision.selectedOptionId)

    return (
        <div className="mt-8 space-y-3">
            {decision.options.map((option) => {
                const isSelected = decision.selectedOptionId === option.id

                return (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.id)}
                        disabled={hasSelectedOption}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${isSelected
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400 hover:shadow-sm'
                            } ${hasSelectedOption && !isSelected
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                            }`}
                    >
                        <span className="font-medium">{option.label}</span>

                        {isSelected && <span>✓</span>}
                    </button>
                )
            })}
        </div>
    )
}

export default DecisionCard