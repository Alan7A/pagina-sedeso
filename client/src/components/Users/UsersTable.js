import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';

function UsersTable({ usuarios }) {
    return (
        <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.correo}>
                            <TableCell>{usuario.coordinador}</TableCell>
                            <TableCell>{usuario.correo}</TableCell>
                            <TableCell>
                                <Tooltip title='Editar'>
                                    <IconButton color='secondary'><Edit /></IconButton>
                                </Tooltip>
                                <Tooltip title='Eliminar'>
                                    <IconButton style={{ color: 'red' }}><Delete /></IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    },
}))(TableRow);

export default UsersTable
