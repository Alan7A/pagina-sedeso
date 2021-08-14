import { Button, Container, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch, useSelector } from 'react-redux'
import UsersTable from './UsersTable';
import Loading from '../Loading';
import CreateUserModal from './CreateUserModal';
import { openCreateUserModal } from '../../redux/actions/ui';
import DeleteUserDialog from './DeleteUserDialog';
import { loadUsers } from '../../redux/actions/users';

function UsersScreen() {
    const { isLoading, users } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch])

    return (
        <Container maxWidth='md'>
            <Typography variant='h4' style={{ marginTop: 30, marginBottom: 20 }}>
                Usuarios
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 30 }}>
                <Button variant='contained' color='primary' onClick={() => dispatch(openCreateUserModal())} startIcon={<PersonAddIcon />}>
                    Crear usuario
                </Button>
            </div>

            {isLoading ? (<Loading />)
                : (
                    <UsersTable usuarios={users} />
                )
            }

            <CreateUserModal />
            <DeleteUserDialog />
        </Container>
    )
}

export default UsersScreen
