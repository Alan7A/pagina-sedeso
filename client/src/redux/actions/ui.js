import { types } from "../types"

export const openCreateUserModal = () => ({ type: types.openCreateUserModal });
export const closeCreateUserModal = () => ({ type: types.closeCreateUserModal });

export const openEditUserModal = () => ({ type: types.openEditUserModal });
export const closeEditUserModal = () => ({ type: types.closeEditUserModal });

export const openDeleteUserDialog = () => ({ type: types.openDeleteUserDialog });
export const closeDeleteUserDialog = () => ({ type: types.closeDeleteUserDialog });


export const openCreateProductModal = () => ({ type: types.openCreateProductModal });
export const closeCreateProductModal = () => ({ type: types.closeCreateProductModal });

export const openEditProductModal = () => ({ type: types.openEditProductModal });
export const closeEditProductModal = () => ({ type: types.closeEditProductModal });

export const openDeleteProductDialog = () => ({ type: types.openDeleteProductDialog });
export const closeDeleteProductDialog = () => ({ type: types.closeDeleteProductDialog });