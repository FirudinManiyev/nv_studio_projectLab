import { ListChecks, Menu, Plus } from 'lucide-react'

interface HeaderProps {
  onNewDecision: () => void
  onMenuClick: () => void
}

function Header({ onNewDecision, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-[4.5rem] border-b border-white/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full items-center justify-between gap-4 px-4 sm:px-7 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Qərarlar menyusunu aç"
            className="icon-button md:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <Menu aria-hidden="true" size={20} />
          </button>

          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-lg shadow-indigo-200">
              <ListChecks aria-hidden="true" size={19} />
              <span className="absolute inset-x-1 top-0 h-px bg-white/70" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-black tracking-[-0.02em] text-slate-950 sm:text-base">
                Qərar lövhəsi
              </p>
              <p className="hidden text-[11px] font-semibold text-slate-500 sm:block">
                Seçimlərinizi aydınlaşdırın
              </p>
            </div>
          </div>
        </div>

        <button
          aria-label="Yeni qərar"
          className="button-primary min-h-11 shrink-0 px-3.5 sm:px-5"
          onClick={onNewDecision}
          type="button"
        >
          <Plus aria-hidden="true" size={18} strokeWidth={2.5} />
          <span className="hidden sm:inline">Yeni qərar</span>
          <span className="sm:hidden">Yeni</span>
        </button>
      </div>
    </header>
  )
}

export default Header
