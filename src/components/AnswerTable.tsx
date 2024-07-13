import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
} from '@mui/material'
import React from 'react'

import { useAnswersStore } from '../state'

const tableHeadStyles: React.CSSProperties = {
    fontSize: '20px',
    lineHeight: '50px',
}
const tableCellWidth: React.CSSProperties = {
    width: '40px',
}

export const AnswerTable = () => {
    const { age, interests, mail, name, isLoading } = useAnswersStore()

    const selectedInterests = interests
        .filter(interest => Object.values(interest)[0].isChecked)
        .map(interest => Object.values(interest)[0].label)
        .join(', ')

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={tableHeadStyles}>Questions</TableCell>
                        <TableCell style={tableHeadStyles}>Answers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell size="small" align="left">
                            {isLoading ? (
                                <Skeleton
                                    color="inherit"
                                    variant="text"
                                    sx={{ fontSize: '1rem' }}
                                />
                            ) : (
                                name
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell style={tableCellWidth}>
                            {isLoading ? (
                                <Skeleton
                                    color="inherit"
                                    variant="text"
                                    sx={{ fontSize: '1rem' }}
                                />
                            ) : (
                                mail
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Age</TableCell>
                        <TableCell style={tableCellWidth}>
                            {isLoading ? (
                                <Skeleton
                                    color="inherit"
                                    variant="text"
                                    sx={{ fontSize: '1rem' }}
                                />
                            ) : (
                                age
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Interests</TableCell>
                        <TableCell style={tableCellWidth}>
                            {isLoading ? (
                                <Skeleton
                                    color="inherit"
                                    variant="text"
                                    sx={{ fontSize: '1rem' }}
                                />
                            ) : (
                                selectedInterests
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
