import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import { closeEditUserModal } from '../../redux/actions/ui';
import { updateUser } from '../../redux/actions/users';
import Loading from '../Loading';

const initialFormValues = {
    idCentro: 1,
    coordinador: '',
    email: '',
    contra: '123456'
}

export default function EditUserModal() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { isEditUserModalOpen } = useSelector(state => state.ui);
    const { activeUser, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if(activeUser) {
            setFormValues(activeUser);
        } else {
            setFormValues(initialFormValues);
        }
    }, [activeUser, setFormValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormValues({...formValues, contra:'123456'});
        formValues.contra = '123456'
        console.log(formValues);
        dispatch(updateUser(formValues));
    }

    return (
        <Modal
            className='modal'
            open={isEditUserModalOpen}
            onClose={() => dispatch(closeEditUserModal())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isEditUserModalOpen}>
                <div className='paper'>
                    <Typography variant='h6' className='modal-title' >Editar usuario</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant='outlined'
                            name='coordinador'
                            value={formValues.coordinador}
                            onChange={handleChange}
                            label='Nombre'
                            fullWidth
                            color='secondary'
                            className='form-input'
                        />
                        <TextField
                            variant='outlined'
                            name='email'
                            value={formValues.email}
                            onChange={handleChange}
                            label='Email'
                            fullWidth
                            color='secondary'
                            className='form-input'
                        />
                        {isLoading ? (<Loading />) : (
                            <div className='botones'>
                                <Button variant='contained' className='boton-cancelar' onClick={() => dispatch(closeEditUserModal())} >
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
    );
}
