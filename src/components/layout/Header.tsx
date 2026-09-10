import { Menu, Plus } from 'lucide-react'

interface HeaderProps {
    onNewDecision: () => void
    onMenuClick: () => void
}

function Header({ onNewDecision, onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-white">
            <div className="flex h-16 items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={20} />
                    </button>

                    <h1 className="text-lg font-bold tracking-tight text-gray-900">
                        Decision Board
                    </h1>
                </div>

                <button
                    onClick={onNewDecision}
                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 sm:px-4"
                >
                    <Plus size={17} />
                    <span className="hidden sm:inline">New Decision</span>
                </button>
            </div>
        </header>
    )
}

export default Header