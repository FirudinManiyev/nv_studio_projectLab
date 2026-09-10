import type { Decision } from '../types/decision'

export const initialDecisions: Decision[] = [
  {
    id: '1',
    question: 'Harada dərs oxuyum?',
    options: [
      { id: '1-1', label: 'Kitabxanada' },
      { id: '1-2', label: 'Evdə' },
      { id: '1-3', label: 'Kafedə' },
    ],
    createdAt: Date.now(),
  },
  {
    id: '2',
    question: 'Hansı noutbuku alım?',
    options: [
      { id: '2-1', label: 'MacBook' },
      { id: '2-2', label: 'Windows noutbuku' },
      { id: '2-3', label: 'Linux noutbuku' },
    ],
    createdAt: Date.now(),
  },
]
