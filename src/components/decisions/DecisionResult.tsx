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
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="text-sm font-medium text-gray-500">
                Your decision
            </span>

            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
                {selectedOption.label}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                You chose this option.
            </p>

            <button
                onClick={onChooseAgain}
                className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
                Choose Again
            </button>
        </div>
    )
}

export default DecisionResult