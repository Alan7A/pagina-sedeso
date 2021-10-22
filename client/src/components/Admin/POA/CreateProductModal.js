import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeCreateProductModal } from '../../../redux/actions/ui';
import { startCreatingProduct } from '../../../redux/actions/products';
import { Button, Fade, Modal, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Loading from '../../Loading';
import { mostrarNotificacionError } from '../../../utils/funcionesUtiles';

function CreateProductModal() {
    const [nombre, setNombre] = useState('');

    const { isCreateProductModalOpen } = useSelector(state => state.ui);
    const { isLoading } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const handleCancelButton = () => {
        setNombre('')
        dispatch(closeCreateProductModal());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre.trim() === '') {
            mostrarNotificacionError('El nombre del producto no puede estar vacío')
        } else {
            dispatch(startCreatingProduct(nombre));
            setNombre('');
        }
    }

    return (
        <Modal
            className='modal'
            open={isCreateProductModalOpen}
            onClose={() => dispatch(closeCreateProductModal())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isCreateProductModalOpen}>
                <div className='paper'>
                    <Typography variant='h6' className='modal-title' >Crear producto</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant='outlined'
                            name='Nombre'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            label='Nombre del producto'
                            color='secondary'
                            className='form-input'
                            required
                            autoFocus
                        />
                        {isLoading ? (<Loading />) : (
                            <div className='botones-modal'>
                                <Button variant='contained' className='boton-cancelar' onClick={() => handleCancelButton()} >
                                    Cancelar
                                </Button>
                                <Button variant='contained' color='primary' type='submit'>
                                    Crear producto
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </Fade>
        </Modal>
    )
}

export default CreateProductModal
