import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { types } from "../types"
import { closeCreateUserModal, closeDeleteUserDialog, closeEditUserModal } from './ui';

export const setActiveUser = (user) => ({
    type: types.setActiveUser,
    payload: user
});

export const loadUsers = () => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.get('/usuarios', { headers: { 'x-token': localStorage.getItem('token') } });
            dispatch(usersLoaded(response.data));
        } catch (error) {
            console.log(error.response);
            dispatch(errorFound(error.response.data.msg));
        }
    }
}

const usersLoaded = (users) => ({
    type: types.usersLoaded,
    payload: users
});

export const startCreatingUser = (user) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.post('/usuarios/crearUsuario', user, { headers: { 'x-token': localStorage.getItem('token') } });
            toast.success(response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            dispatch(userCreated(user));
            // Cerrar el modal
            dispatch(closeCreateUserModal());
        } catch (error) {
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

const userCreated = (user) => ({
    type: types.userCreated,
    payload: user
});

export const updateUser = (user) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.put(`/usuarios/modificarUsuario/${user.idUsuario}`, user, { headers: { 'x-token': localStorage.getItem('token') } });
            toast.success(response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });

            dispatch(userUpdated(user));
            // Cerrar el modal
            dispatch(closeEditUserModal());
        } catch (error) {
            console.log(error.response.data.errors);
            if(error.response.data.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                    });
                });
                
                dispatch(errorFound(error.response.data.errors));
            } else {
                console.error(error.response);
                toast.error('No se pudo eliminar el usuario, error en el servidor', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });
            }
        }
    }
}

const userUpdated = (user) => ({
    type: types.userUpdated,
    payload: user
});

export const deleteUser = (userId) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.delete(`/usuarios/eliminarUsuario/${userId}`, { headers: { 'x-token': localStorage.getItem('token') } });
            toast.success(response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });

            dispatch(userDeleted());
            // Cerrar el modal
            dispatch(closeDeleteUserDialog());
        } catch (error) {
            if(error.response.data.errors) {
                dispatch(errorFound(error.response.data.errors));
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
    
            } else {
                console.error(error.response);
                toast.error('No se pudo eliminar el usuario, error en el servidor', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });
                dispatch(errorFound(error.response.data));
            }
        }
    }
}

const userDeleted = () => ({ type: types.userDeleted });

const startLoading = () => ({ type: types.startLoadingUser });

const errorFound = (error) => ({
    type: types.errorFoundUser,
    payload: error
})