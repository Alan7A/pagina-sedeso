import axios from '../../utils/axios';
import { types } from "../types"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const startLogin = (formValues) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const response = await axios.post('/auth/login', formValues);
            console.log(response.data);

            // Guardar el token en el localStorage
            localStorage.setItem('token', response.data.token);

            // Mostrar mensaje de success
            toast.success('Iniciaste sesión correctamente', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });

            // Guardar el usuario en el estado global (Redux)
            dispatch(login(response.data.usuario))
        } catch (error) {
            // El mensaje de error está en error.response.data.errors[].msg
            // setLoading(false);
            error.response.data.errors.forEach(error => {
                toast.error(error.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });
            });

            dispatch(errorFound(error.response.data.errors));
        }
    }
}

export const renovarToken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token') || '';
        try {
            dispatch(startLoading());

            const response = await axios.get('/auth/renovarToken', { headers: { 'x-token': token } })
            const usuario = response.data.usuario;
            localStorage.setItem('token', response.data.token);
            dispatch(login(usuario));
        } catch (error) {
            // Token no valido, no ha iniciado sesión
            console.log(error.response);
            dispatch(errorFound(error.response.data.errors));
        }
    }
}

const startLoading = () => ({ type: types.startLoading });

const errorFound = (errors) => ({
    type: types.errorFound,
    payload: errors
})

export const login = (usuario) => {
    return {
        type: types.login,
        payload: usuario
    }
}

export const logout = () => {
    localStorage.removeItem('token');

    toast.success('Cerraste sesión correctamente', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });

    return {
        type: types.logout
    }
}