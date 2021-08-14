import { types } from "../types";

const initialState = {
    isCreateUserModalOpen: false,
    isEditUserModalOpen: false,
    isDeleteUserDialogOpen: false
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

        case types.openDeleteUserDialog:
            return {
                ...state,
                isDeleteUserDialogOpen: true
            }

        case types.closeDeleteUserDialog:
            return {
                ...state,
                isDeleteUserDialogOpen: false
            }

        default:
            return state
    }
}