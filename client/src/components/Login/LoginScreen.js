import React, { useState } from 'react'
import { Button, Container, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import { startLogin } from '../../redux/actions/auth';
import './styles.css'

function Login() {
    const [formValues, setFormValues] = useState({ email: '', contra: '' });
    const { isLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(startLogin(formValues));
    }

    return (
        <Container maxWidth="xs" className='container-login'>
            <Paper elevation={3} className='paper-login'>
                <img src="/images/login.jpg" alt="sedeso_login" className='img-login' />
                <Typography variant="h5">
                    Iniciar Sesión
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color='primary' />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contra"
                        label="Contraseña"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color='primary' />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleChange}
                    />
                    {isLoading ? <Loading />
                        : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className='btn-login'
                            >
                                Iniciar Sesión
                            </Button>
                        )}
                </form>
            </Paper>
        </Container>
    )
}

export default Login
