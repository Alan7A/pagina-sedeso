import { types } from "../types";

const initialState = {
    isLoading: false,
    usuario: {},
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startLoading:
            return {
                ...state,
                isLoading: true
            }

        case types.login:
            return {
                ...state,
                isLoading: false,
                usuario: action.payload, // Payload deberia ser un objeto usuario
                error: null
            }

        case types.logout:
            return {
                ...state,
                usuario: null,
            }

        case types.errorFound:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}