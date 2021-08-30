import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'
import { closeCreateUserModal } from '../../../redux/actions/ui';
import Loading from '../../Loading';
import { startCreatingUser } from '../../../redux/actions/users';
import SelectorCentrosContigo from './SelectorCentrosContigo';

const initialFormValues = {
    Nombre: '',
    idCentro: '',
    Correo: '',
    contra: ''
}

export default function CreateUserModal() {
    const [formValues, setFormValues] = useState(initialFormValues);

    const { isCreateUserModalOpen } = useSelector(state => state.ui);
    const { isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleCancelButton = () => {
        setFormValues({ ...formValues, idCentro: '' })
        dispatch(closeCreateUserModal())
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(startCreatingUser(formValues));
        setFormValues(initialFormValues);
    }

    return (
        <Modal
            className='modal'
            open={isCreateUserModalOpen}
            onClose={() => dispatch(closeCreateUserModal())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isCreateUserModalOpen}>
                <div className='paper'>
                    <Typography variant='h6' className='modal-title' >Crear usuario</Typography>
                    <form onSubmit={handleSubmit}>
                        <SelectorCentrosContigo formValues={formValues} setFormValues={setFormValues} />
                        <TextField
                            variant='outlined'
                            name='Nombre'
                            value={formValues.Nombre}
                            onChange={handleChange}
                            label='Nombre'
                            color='secondary'
                            className='form-input'
                            required
                        />
                        <TextField
                            variant='outlined'
                            name='Correo'
                            value={formValues.Correo}
                            onChange={handleChange}
                            label='Email'
                            color='secondary'
                            className='form-input'
                            required
                        />
                        <TextField
                            variant='outlined'
                            name='contra'
                            value={formValues.contra}
                            onChange={handleChange}
                            label='Contraseña'
                            color='secondary'
                            type='password'
                            className='form-input'
                            required
                        />
                        {isLoading ? (<Loading />) : (
                            <div className='botones-modal'>
                                <Button variant='contained' className='boton-cancelar' onClick={() => handleCancelButton()} >
                                    Cancelar
                                </Button>
                                <Button variant='contained' color='primary' type='submit'>
                                    Crear usuario
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}
