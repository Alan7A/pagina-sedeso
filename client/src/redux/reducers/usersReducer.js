import { types } from "../types";

const initialState = {
    users: [],
    activeUser: null,
    isLoading: false,
    error: null
}

export const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.setActiveUser:
            return {
                ...state,
                activeUser: action.payload, // Payload es un usuario
            }

        case types.usersLoaded:
            return {
                ...state,
                users: [...action.payload], // Payload es un array de todos los usuarios
                isLoading: false,
                error: null
            }

        case types.userCreated:
            return {
                ...state,
                users: [...state.users, action.payload], // Payload es un usuario
                isLoading: false,
                error: null
            }

        case types.userUpdated:
            return {
                ...state,
                users: state.users.map((user) => (user.idUsuario === action.payload.idUsuario) ? action.payload : user),
                isLoading: false,
                error: null
            }

        case types.userDeleted:
            return {
                ...state,
                users: state.users.filter((user) => user.idUsuario !== state.activeUser.idUsuario),
                activeUser: null,
                isLoading: false,
                error: null
            }

        case types.startLoadingUser:
            return {
                ...state,
                isLoading: true
            }

        case types.errorFoundUser:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
    
        default:
            return state
    }
} 