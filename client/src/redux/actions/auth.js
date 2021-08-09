import { types } from "../types"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    })

    return {
        type: types.logout
    }
}