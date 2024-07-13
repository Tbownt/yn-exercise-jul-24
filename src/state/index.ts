import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { DomainAnswers } from '../domain/types'

type AnswersStoreProperties = DomainAnswers & {
    isLoading: boolean
}

type AnswersStoreActions = {
    setAnswers: (answers: DomainAnswers) => void
    getAnswers: () => DomainAnswers
    setIsLoading: (isLoading: boolean) => void
}

export type AnswersStore = AnswersStoreProperties & AnswersStoreActions

const initialState: AnswersStoreProperties = {
    name: '',
    mail: '',
    age: '',
    interests: [],
    isLoading: false,
}

const createStore: StateCreator<AnswersStore> = (set, get) => ({
    ...initialState,
    setAnswers: answers => set(state => ({ ...state, ...answers })),
    getAnswers: () => ({
        age: get().age,
        name: get().name,
        mail: get().mail,
        interests: get().interests,
    }),
    setIsLoading: isLoading => set(state => ({ ...state, isLoading })),
})

export const useAnswersStore = create(devtools(createStore))
