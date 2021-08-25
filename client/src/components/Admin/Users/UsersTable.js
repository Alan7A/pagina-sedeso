import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import EditUserModal from './EditUserModal';
import { openDeleteUserDialog, openEditUserModal } from '../../../redux/actions/ui';
import { setActiveUser } from '../../../redux/actions/users';

function UsersTable({ usuarios }) {

    const dispatch = useDispatch();

    const handleEdit = (user) => {
        dispatch(setActiveUser(user));
        dispatch(openEditUserModal())
    }

    const handleDelete = (user) => {
        dispatch(setActiveUser(user));
        dispatch(openDeleteUserDialog())
    }

    return (
        <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table stickyHeader style={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.Correo}>
                            <TableCell>{usuario.Nombre}</TableCell>
                            <TableCell>{usuario.Correo}</TableCell>
                            <TableCell>
                                <Tooltip title='Editar' onClick={() => handleEdit(usuario)}>
                                    <IconButton color='secondary'>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Eliminar' onClick={() => handleDelete(usuario)}>
                                    <IconButton style={{ color: '#b00020' }}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditUserModal />
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

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         }
//     },
// }))(TableRow);

export default UsersTable
