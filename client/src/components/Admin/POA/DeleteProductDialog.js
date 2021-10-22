import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/actions/products';
import { closeDeleteProductDialog } from '../../../redux/actions/ui';
import Loading from '../../Loading';

export const DeleteProductDialog = () => {
    const { isDeleteProductDialogOpen } = useSelector(state => state.ui);
    const { selectedProduct, isLoading } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProduct(selectedProduct.idProducto))
    }

    return (
        <Dialog
            open={isDeleteProductDialogOpen}
            onClose={() => dispatch(closeDeleteProductDialog())}
        >
            <DialogTitle>{"Eliminar producto"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que quieres eliminar el producto <b>{selectedProduct?.Producto}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isLoading ? (<Loading />) : (
                    <div>
                        <Button variant='contained' color="primary" onClick={() => dispatch(closeDeleteProductDialog())}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDelete} style={{ color: 'white', background: '#b00020', marginLeft: 10 }}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </DialogActions>
        </Dialog>
    )
}
