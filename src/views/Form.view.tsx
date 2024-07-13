import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useUpdateAnswers } from '../api-hooks/useUpdateAnswers'
import { CheckboxGroup } from '../components'
import { CustomCheckboxProps } from '../components/CheckboxGroup'
import { APP_ROUTES } from '../domain/routes'
import { DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

import { validationSchema } from './Form.config'

type InterestType = { [key: string]: { label: string; isChecked: boolean } }

export type SubmitInterestsData = {
    id: string
    label: string
    checked: boolean
}

export const FormView = () => {
    const answers = useAnswersStore(state => state.getAnswers())
    const isLoading = useAnswersStore(state => state.isLoading)
    const navigate = useNavigate()
    const initialState = {
        age: '',
        name: '',
        mail: '',
        interests: [],
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        values: isLoading ? initialState : answers,
    })

    const updateAnswersMutation = useUpdateAnswers()

    const onSubmit = handleSubmit(formData => {
        //The data passed to answers.interest must be the same as that passed to
        //as SubmitInterestData in order to satisfy the
        //endpoint that we would use for the rest of the answers.
        const interests = formData.interests as SubmitInterestsData[]

        //this way we can process our data submitted to our endpoint without any
        //and without changing the original answers.interests
        const newInterests: DomainOption[] = interests.map(interest => ({
            [interest.id]: {
                isChecked: interest.checked,
                label: interest.label,
            },
        }))

        updateAnswersMutation.mutate({
            name: formData.name,
            mail: formData.mail,
            age: formData.age,
            interests: newInterests,
        })
        navigate(APP_ROUTES.TABLE)
    })

    const mappedInterests = useMemo(
        () =>
            //To obtain our array through CheckboxGroup,
            answers.interests.map((interest: InterestType) => {
                const id = Object.keys(interest)[0]
                //we must transform the data provided to us.
                //To do so, we will use a mapping of the global state data and
                return {
                    id,
                    label: interest[id].label,
                    checked: interest[id].isChecked,
                }
            }),
        [answers.interests],
        // add a memo so that when there is a change in it,
        // it is updated accordingly.
    )

    const internalOnChange = (
        interestsProps: CustomCheckboxProps[],
        onChange: (event: unknown) => void,
    ) => {
        //Get the array of options we currently have
        const updatedInterests = interestsProps.map(option => {
            //Find the ID that was clicked and see if it matches any of our
            //with any of our interestIs
            const interestID = mappedInterests.find(
                interest => interest.id === option.id,
            )
            if (interestID) {
                //If we found a match, we mark it true, otherwise
                //we mark it false.
                interestID.checked = option.checked ?? false
            }
            return option
        })
        onChange(updatedInterests)
    }

    return (
        <div id="form-view">
            <Box
                display="flex"
                gap={4}
                sx={{
                    flexDirection: 'column',
                    width: {
                        xs: '200px',
                        sm: '300px',
                        md: '400px',
                    },
                }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue={answers.name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Name"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.name?.message || ''}
                            error={Boolean(errors.name?.message)}
                        />
                    )}
                />
                <Controller
                    name="age"
                    control={control}
                    defaultValue={answers.age}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Age"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.age?.message || ''}
                            error={Boolean(errors.age?.message)}
                        />
                    )}
                />
                <Controller
                    name="mail"
                    control={control}
                    defaultValue={answers.mail}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Email"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.mail?.message || ''}
                            error={Boolean(errors.mail?.message)}
                        />
                    )}
                />
                {/*
                    TASK 2:
                    - Integrate CheckboxGroup into the form, controlled
                    by react-hook-form.
                    - Do NOT modify types of answers.interests or
                    CheckboxGroup's options. This could be detrimental
                    to your final assessment.
                */}
                <Controller
                    name="interests"
                    control={control}
                    defaultValue={answers.interests}
                    render={({ field: { onChange } }) => (
                        <CheckboxGroup
                            id="interests-checkbox-group"
                            label="Interest"
                            options={isLoading ? [] : mappedInterests}
                            onChange={interests =>
                                internalOnChange(interests, onChange)
                            }
                            helperText={errors.interests?.message || ''}
                            error={Boolean(errors.interests?.message)}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Box>
        </div>
    )
}
