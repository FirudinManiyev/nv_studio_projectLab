export interface DecisionOption {
    id: string
    label: string
}

export interface Decision {
    id: string
    question: string
    options: DecisionOption[]
    selectedOptionId?: string
    createdAt: number
}