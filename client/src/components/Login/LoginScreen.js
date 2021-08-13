import React, { useState } from 'react'
import { Button, Container, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import { startLogin } from '../../redux/actions/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        maxWidth: 450,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    image: {
        height: 250,
        marginBottom: 35
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles();
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
        <Container maxWidth="sm" style={{ display: 'grid', placeItems: 'center' }}>
            <Paper className={classes.paper} elevation={3}>
                <img src="/images/login.jpg" className={classes.image} alt="sedeso_login" />
                <Typography variant="h5">
                    Iniciar Sesión
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        autoFocus
                        InputProps={{
                            endAdornment: (
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
                            endAdornment: (
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
                                className={classes.submit}
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
