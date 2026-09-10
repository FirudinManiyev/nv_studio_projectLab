import { useState } from 'react'
import type { Decision } from '../../types/decision'

interface DecisionFormProps {
    onCreate: (decision: Decision) => void
    onClose: () => void
}

function DecisionForm({ onCreate, onClose }: DecisionFormProps) {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [error, setError] = useState('')

    const addOption = () => {
        setOptions((prev) => [...prev, ''])
    }

    const removeOption = (index: number) => {
        if (options.length <= 2) return

        setOptions((prev) => prev.filter((_, i) => i !== index))
    }

    const updateOption = (index: number, value: string) => {
        setOptions((prev) =>
            prev.map((option, i) => (i === index ? value : option))
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const trimmedQuestion = question.trim()
        const trimmedOptions = options.map((option) => option.trim())

        if (!trimmedQuestion) {
            setError('Please enter a question.')
            return
        }

        if (trimmedOptions.some((option) => !option)) {
            setError('Please fill in all options.')
            return
        }

        const uniqueOptions = new Set(
            trimmedOptions.map((option) => option.toLowerCase())
        )

        if (uniqueOptions.size !== trimmedOptions.length) {
            setError('Options must be unique.')
            return
        }

        const decision: Decision = {
            id: crypto.randomUUID(),
            question: trimmedQuestion,
            options: trimmedOptions.map((label) => ({
                id: crypto.randomUUID(),
                label,
            })),
            createdAt: Date.now(),
        }

        onCreate(decision)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Create Decision
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a question and at least two options.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Question
                        </label>

                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="e.g. Where should I study?"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Options
                            </label>

                            <button
                                type="button"
                                onClick={addOption}
                                className="text-sm font-medium text-gray-900 hover:underline"
                            >
                                + Add option
                            </button>
                        </div>

                        <div className="space-y-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        disabled={options.length <= 2}
                                        className="rounded-xl px-3 text-gray-400 transition hover:bg-gray-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                            Create Decision
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DecisionForm