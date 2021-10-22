import { types } from "../types";

const initialState = {
    isCreateUserModalOpen: false,
    isEditUserModalOpen: false,
    isDeleteUserDialogOpen: false,
    isCreateProductModalOpen: false,
    isEditProductModalOpen: false,
    isDeleteProductDialogOpen: false
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

        case types.openCreateProductModal:
            return {
                ...state,
                isCreateProductModalOpen: true
            }

        case types.closeCreateProductModal:
            return {
                ...state,
                isCreateProductModalOpen: false
            }

        case types.openEditProductModal:
            return {
                ...state,
                isEditProductModalOpen: true
            }

        case types.closeEditProductModal:
            return {
                ...state,
                isEditProductModalOpen: false
            }

        case types.openDeleteProductDialog:
            return {
                ...state,
                isDeleteProductDialogOpen: true
            }

        case types.closeDeleteProductDialog:
            return {
                ...state,
                isDeleteProductDialogOpen: false
            }

        default:
            return state
    }
}