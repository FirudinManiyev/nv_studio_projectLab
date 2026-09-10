import { useEffect, useState } from 'react'
import type { Decision } from '../types/decision'
import { initialDecisions } from '../data/initialDecisions'

const STORAGE_KEY = 'decision-board-decisions'

export function useDecisions() {
    const [decisions, setDecisions] = useState<Decision[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)

            if (stored) {
                return JSON.parse(stored) as Decision[]
            }

            return initialDecisions
        } catch {
            return initialDecisions
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions))
    }, [decisions])

    return {
        decisions,
        setDecisions,
    }
}