import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteUserDialog } from '../../redux/actions/ui';


export default function DeleteUserDialog({ usuario = 'Alan' }) {
    const { isDeleteUserDialogOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log('Usuario eliminado');
        dispatch(closeDeleteUserDialog());
    }

    return (
        <Dialog
            open={isDeleteUserDialogOpen}
            onClose={() => dispatch(closeDeleteUserDialog())}
        >
            <DialogTitle>{"Eliminar usuario"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que quieres eliminar el usuario de <b>{usuario}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color="primary" onClick={() => dispatch(closeDeleteUserDialog())}>
                    Cancelar
                </Button>
                <Button onClick={handleDelete} className='boton-cancelar'>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
