import { types } from "../types";

const initialState = {
    usuario: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                usuario: action.payload // Payload deberia ser un objeto usuario
            }

        case types.logout:
            return {
                ...state,
                usuario: null
            }

        default:
            return state;
    }
}