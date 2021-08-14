import { types } from "../types"

export const openCreateUserModal = () => ({ type: types.openCreateUserModal });
export const closeCreateUserModal = () => ({ type: types.closeCreateUserModal });

export const openEditUserModal = () => ({ type: types.openEditUserModal });
export const closeEditUserModal = () => ({ type: types.closeEditUserModal });

export const openDeleteUserDialog = () => ({ type: types.openDeleteUserDialog });
export const closeDeleteUserDialog = () => ({ type: types.closeDeleteUserDialog });