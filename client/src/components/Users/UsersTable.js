import React, { useState } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, withStyles } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import EditUserModal from './EditUserModal';
import { openEditUserModal } from '../../redux/actions/ui';

function UsersTable({ usuarios }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const dispatch = useDispatch();

    const handleEdit = (user) => {
        setSelectedUser(user);
        dispatch(openEditUserModal())
    }

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
                                <Tooltip title='Editar' onClick={() => handleEdit(usuario)}>
                                    <IconButton color='secondary'>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Eliminar'>
                                    <IconButton style={{ color: 'red' }}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditUserModal usuario={selectedUser} setUsuario={setSelectedUser} />
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
