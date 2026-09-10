import type { Decision } from '../types/decision'

export const initialDecisions: Decision[] = [
    {
        id: '1',
        question: 'Where should I study?',
        options: [
            {
                id: '1-1',
                label: 'Library',
            },
            {
                id: '1-2',
                label: 'Home',
            },
            {
                id: '1-3',
                label: 'Cafe',
            },
        ],
        createdAt: Date.now(),
    },
    {
        id: '2',
        question: 'Which laptop should I buy?',
        options: [
            {
                id: '2-1',
                label: 'MacBook',
            },
            {
                id: '2-2',
                label: 'Windows Laptop',
            },
            {
                id: '2-3',
                label: 'Linux Laptop',
            },
        ],
        createdAt: Date.now(),
    },
]