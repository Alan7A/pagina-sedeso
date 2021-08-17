import axios from '../../utils/axios';
import { types } from "../types"
import 'react-toastify/dist/ReactToastify.css';
import { mostrarErrores, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';

export const startLogin = (formValues) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());

            const response = await axios.post('/auth/login', formValues);
            console.log(response.data);

            // Guardar el token en el localStorage
            localStorage.setItem('token', response.data.token);

            // Mostrar mensaje de success
            mostrarNotificacionSuccess(response.data.msg);

            // Guardar el usuario en el estado global (Redux)
            dispatch(login(response.data.usuario));
        } catch (error) {
            // El mensaje de error está en error.response.data.errors[].msg
            mostrarErrores(error);
            dispatch(errorFound(error.response.data));
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
            console.log(error.response.data);
            dispatch(errorFound(error.response.data));
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
    mostrarNotificacionSuccess('Cerraste sesión correctamente.', 'top-left')

    return {
        type: types.logout
    }
}