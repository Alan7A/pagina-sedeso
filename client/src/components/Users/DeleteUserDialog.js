import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteUserDialog } from '../../redux/actions/ui';
import { deleteUser } from '../../redux/actions/users';
import Loading from '../Loading';


export default function DeleteUserDialog() {
    const { isDeleteUserDialogOpen } = useSelector(state => state.ui);
    const { activeUser, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteUser(activeUser.idUsuario))
    }

    return (
        <Dialog
            open={isDeleteUserDialogOpen}
            onClose={() => dispatch(closeDeleteUserDialog())}
        >
            <DialogTitle>{"Eliminar usuario"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que quieres eliminar el usuario de <b>{activeUser?.coordinador}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isLoading ? (<Loading />) : (
                    <div>
                        <Button variant='contained' color="primary" onClick={() => dispatch(closeDeleteUserDialog())}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDelete} style={{ color: 'white', background: '#b00020', marginLeft: 10 }}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </DialogActions>
        </Dialog>
    );
}
