import { useEffect, useState } from 'react'
import type { Decision } from '../types/decision'
import { initialDecisions } from '../data/initialDecisions'
import { parseStoredDecisions } from '../utils/decisionValidation'

const STORAGE_KEY = 'decision-board-decisions'

export function useDecisions() {
    const [decisions, setDecisions] = useState<Decision[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            return parseStoredDecisions(stored) ?? initialDecisions
        } catch {
            return initialDecisions
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions))
        } catch {
            // Storage can be unavailable in private mode or when its quota is full.
        }
    }, [decisions])

    return {
        decisions,
        setDecisions,
    }
}
