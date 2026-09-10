import { useRef } from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'

import { useDialog } from '../../hooks/useDialog'

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
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useDialog(onCancel, cancelButtonRef)

  return (
    <div
      className="dialog-backdrop fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <section
        aria-describedby="confirm-description"
        aria-labelledby="confirm-title"
        aria-modal="true"
        className="dialog-panel w-full rounded-t-[2rem] border border-white/70 bg-white p-6 shadow-[0_-20px_70px_rgba(30,27,75,0.24)] sm:max-w-md sm:rounded-[2rem] sm:p-7 sm:shadow-[0_28px_90px_rgba(30,27,75,0.25)]"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-8 ring-rose-50/60">
            <AlertTriangle aria-hidden="true" size={22} />
          </div>

          <button
            aria-label="Pəncərəni bağla"
            className="icon-button -mr-1 -mt-1"
            onClick={onCancel}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <h2 className="mt-6 text-xl font-extrabold tracking-tight text-slate-950" id="confirm-title">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500" id="confirm-description">
          {description}
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            className="button-secondary flex-1"
            onClick={onCancel}
            ref={cancelButtonRef}
            type="button"
          >
            Ləğv et
          </button>
          <button
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 active:translate-y-0"
            onClick={onConfirm}
            type="button"
          >
            <Trash2 aria-hidden="true" size={17} />
            Sil
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDialog
