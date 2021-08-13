import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import UsersTable from './UsersTable';
import Loading from '../Loading';

function UsersScreen() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

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
    })

    return (
        <Container maxWidth='md'>
            <Typography variant='h4' style={{marginTop: 30, marginBottom: 30}}>
                Usuarios
            </Typography>

            { isLoading ? (<Loading />)
                : (
                    <UsersTable usuarios={usuarios} />
                )
            }

            { error && (<Typography variant='h6'>{error}</Typography>) }
        </Container>
    )
}

export default UsersScreen
