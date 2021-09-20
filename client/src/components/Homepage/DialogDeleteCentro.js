import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Loading from '../Loading';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { headers, mostrarErrores, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';

function DialogDeleteCentro( {open, setOpen, centro} ) {

    const [isLoading, setisLoading] = useState(false);

    const handleDelete = async (e) => {
        setisLoading(true);
        try {
            
            const response = await axios.delete(`/CentrosContigo/eliminar/${centro.id}`, headers);
            mostrarNotificacionSuccess(response.data.msg);
            window.location.reload();
            setOpen(false);
        } catch (error) {            
            mostrarErrores(error);
        }
    }    

     useEffect(() => {
        console.log(centro);
    }, []);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>{"Eliminar Centro Contigo"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que quieres eliminar el Centro Contigo <b>{centro.CentroContigo}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isLoading ? (<Loading />) : (
                    <div>
                        <Button variant='contained' color="primary" onClick={ () => setOpen(false) }>
                            Cancelar
                        </Button>
                        <Button type='submit' onClick={handleDelete} style={{ color: 'white', background: '#b00020', marginLeft: 10 }}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default DialogDeleteCentro