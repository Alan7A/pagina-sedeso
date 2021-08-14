import { types } from "../types";

const initialState = {
    isCreateUserModalOpen: false,
    isEditUserModalOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.openCreateUserModal:
            return {
                ...state,
                isCreateUserModalOpen: true
            }

        case types.closeCreateUserModal:
            return {
                ...state,
                isCreateUserModalOpen: false
            }

        case types.openEditUserModal:
            return {
                ...state,
                isEditUserModalOpen: true
            }

        case types.closeEditUserModal:
            return {
                ...state,
                isEditUserModalOpen: false
            }

        default:
            return state
    }
}