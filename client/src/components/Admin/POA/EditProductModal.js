import { Backdrop, Button, Fade, Modal, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../../redux/actions/products';
import { closeEditProductModal } from '../../../redux/actions/ui';
import { mostrarNotificacionError } from '../../../utils/funcionesUtiles';
import Loading from '../../Loading';

const initialFormValues = {
    producto: '',
    observaciones: '',
}

export const EditProductModal = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { isEditProductModalOpen } = useSelector(state => state.ui);
    const { selectedProduct, isLoading } = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProduct) {
            setFormValues({ producto: selectedProduct.Producto, observaciones: selectedProduct.Observaciones });
        } else {
            setFormValues(initialFormValues);
        }
    }, [selectedProduct, setFormValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.producto.trim() === '') {
            mostrarNotificacionError('El nombre del producto no puede estar vacío')
        } else {
            let data = formValues;
            data.idProducto = selectedProduct.idProducto;
            console.log(data);
            dispatch(updateProduct(data));
        }
    }

    return (
        <Modal
            className='modal'
            open={isEditProductModalOpen}
            onClose={() => dispatch(closeEditProductModal())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isEditProductModalOpen}>
                <div className='paper'>
                    <Typography variant='h6' className='modal-title' >Editar producto</Typography>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            variant='outlined'
                            name='producto'
                            value={formValues.producto}
                            onChange={handleChange}
                            label='Nombre del producto'
                            fullWidth
                            color='secondary'
                            className='form-input'
                            requiredmoda
                        />
                        <TextField
                            variant='outlined'
                            name='observaciones'
                            value={formValues.observaciones}
                            onChange={handleChange}
                            label='Observaciones'
                            fullWidth
                            color='secondary'
                            className='form-input'
                        />
                        {isLoading ? (<Loading />) : (
                            <div className='botones-modal'>
                                <Button variant='contained' className='boton-cancelar' onClick={() => dispatch(closeEditProductModal())} >
                                    Cancelar
                                </Button>
                                <Button variant='contained' color='primary' type='submit'>
                                    Guardar
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </Fade>
        </Modal>
    )
}
