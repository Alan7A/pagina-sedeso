import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Loading from '../Loading';
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { headers, mostrarErrores, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';
import { useHistory } from 'react-router-dom';


function DialogDeleteCourse( {open, setOpen, curso} ) {

    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();

    const handleDelete = async (e) => {
        setisLoading(true);
        try {
            
            const response = await axios.delete(`/cursos/eliminarCurso/${curso.idCurso}`, headers);
            mostrarNotificacionSuccess(response.data.msg);
            window.location.reload();
            setOpen(false);
        } catch (error) {            
            mostrarErrores(error);
        }
    }    

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>{"Eliminar Curso"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que quieres eliminar el curso de <b>{curso.Curso}</b>?
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

export default DialogDeleteCourse