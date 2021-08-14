import { Button, Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch } from 'react-redux'
import axios from '../../utils/axios';
import UsersTable from './UsersTable';
import Loading from '../Loading';
import CreateUserModal from './CreateUserModal';
import { openCreateUserModal } from '../../redux/actions/ui';

function UsersScreen() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const result = await axios.get('/usuarios', { headers: { 'x-token': localStorage.getItem('token') } });
                setUsuarios(result.data);
            } catch (error) {
                console.error(error.response.data)
                setError(error.response.data.msg);
            }
            setIsLoading(false);
        }
        getUsuarios();
    }, [])

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
                    <UsersTable usuarios={usuarios} />
                )
            }

            {error && (<Typography variant='h6'>{error}</Typography>)}

            <CreateUserModal />
        </Container>
    )
}

export default UsersScreen
