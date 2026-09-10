import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
}

function ConfirmDialog({
    title,
    description,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <AlertTriangle size={20} />
                    </div>

                    <button
                        onClick={onCancel}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    {description}
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog