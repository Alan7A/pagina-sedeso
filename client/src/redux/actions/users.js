import axios from '../../utils/axios';
import { types } from "../types"
import { closeCreateUserModal, closeDeleteUserDialog, closeEditUserModal } from './ui';
import { mostrarErrores, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';

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
            dispatch(errorFound(error.response.data));
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
            mostrarNotificacionSuccess(response.data.msg);
            dispatch(userCreated(user));
            // Cerrar el modal
            dispatch(closeCreateUserModal());
        } catch (error) {
            mostrarErrores(error);
            dispatch(errorFound(error.response.data));
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
            mostrarNotificacionSuccess(response.data.msg);

            dispatch(userUpdated(user));
            // Cerrar el modal
            dispatch(closeEditUserModal());
        } catch (error) {
            mostrarErrores(error);
            dispatch(errorFound(error.response.data));
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
            mostrarNotificacionSuccess(response.data.msg);

            dispatch(userDeleted());
            // Cerrar el modal
            dispatch(closeDeleteUserDialog());
        } catch (error) {
            mostrarErrores(error);
            dispatch(errorFound(error.response.data));
        }
    }
}

const userDeleted = () => ({ type: types.userDeleted });

const startLoading = () => ({ type: types.startLoadingUser });

const errorFound = (error) => ({
    type: types.errorFoundUser,
    payload: error
})