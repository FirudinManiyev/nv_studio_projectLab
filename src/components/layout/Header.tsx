interface HeaderProps {
    onNewDecision: () => void
}

function Header({ onNewDecision }: HeaderProps) {
    return (
        <header className="border-b bg-white">
            <div className="flex h-16 items-center justify-between px-4 lg:px-6">
                <h1 className="text-lg font-bold text-gray-900">
                    Decision Board
                </h1>

                <button
                    onClick={onNewDecision}
                    className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                    + New Decision
                </button>
            </div>
        </header>
    )
}

export default Header