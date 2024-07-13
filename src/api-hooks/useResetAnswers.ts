import { useMutation } from 'react-query'

import { resetAnswersFromApi } from '../api/api'
import { apiToDomainAnswersConverter } from '../api/converters'
import { useAnswersStore } from '../state'

export const useResetAnswers = () => {
    const setAnswers = useAnswersStore(state => state.setAnswers)
    const setIsLoading = useAnswersStore(state => state.setIsLoading)

    return useMutation(resetAnswersFromApi, {
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: ({ data }) => {
            const domainAnswers = apiToDomainAnswersConverter(data)
            setAnswers(domainAnswers)
            setIsLoading(false)
        },
        onError: error => {
            console.error('Failed to reset answers', error)
            setIsLoading(false)
        },
    })
}
