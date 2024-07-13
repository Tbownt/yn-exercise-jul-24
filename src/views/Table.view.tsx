import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useResetAnswers } from '../api-hooks/useResetAnswers'
import { AnswerTable } from '../components/AnswerTable'
import { APP_ROUTES } from '../domain/routes'

// TASK 4:
// - Implement the table from this mockup (public/table_view_mockup.png).
// - Display answers from store in table.
// - Each row of the table body should have the name of the answer
// and its value.
// - Add the edit and delete buttons on top of the table.

// TASK 5:
// - Redirect to Form view on edit button click.

// TASK 6:
// - Invoke useResetAnswers hook on delete button click.
// - See useResetAnswers hook for more guidelines.

const buttonColor: React.CSSProperties = {
    color: 'gray',
}

export const TableView = () => {
    const navigate = useNavigate()
    const { mutate: resetAnswers } = useResetAnswers()

    const clearEvent = () => {
        resetAnswers()
        navigate(APP_ROUTES.FORM)
    }

    return (
        <div id="table-view">
            <Box
                display="flex"
                sx={{
                    flexDirection: 'column',
                    width: {
                        xs: '200px',
                        sm: '350px',
                        md: '500px',
                    },
                }}
            >
                <Box sx={{ alignSelf: 'flex-end' }}>
                    <Button onClick={() => navigate(APP_ROUTES.FORM)}>
                        <EditIcon style={buttonColor} />
                    </Button>
                    <Button onClick={() => clearEvent()}>
                        <DeleteIcon style={buttonColor} />
                    </Button>
                </Box>
                <Box>
                    <AnswerTable />
                </Box>
            </Box>
        </div>
    )
}
