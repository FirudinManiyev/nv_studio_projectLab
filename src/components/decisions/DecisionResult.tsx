import { Check, RotateCcw } from 'lucide-react'
import type { Decision } from '../../types/decision'

interface DecisionResultProps {
    decision: Decision
    onChooseAgain: () => void
}

function DecisionResult({
    decision,
    onChooseAgain,
}: DecisionResultProps) {
    const selectedOption = decision.options.find(
        (option) => option.id === decision.selectedOptionId
    )

    if (!selectedOption) return null

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-8 text-center sm:p-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Check size={26} strokeWidth={2.5} />
                </div>

                <p className="mt-5 text-sm font-medium text-gray-400">
                    Your decision
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                    {selectedOption.label}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                    You chose this option.
                </p>

                <button
                    onClick={onChooseAgain}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <RotateCcw size={16} />
                    Choose Again
                </button>
            </div>

            <div className="border-t bg-gray-50 px-6 py-4 text-center">
                <p className="text-xs text-gray-400">
                    You can make another choice whenever you want.
                </p>
            </div>
        </div>
    )
}

export default DecisionResult