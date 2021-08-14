import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import './styles.css'
import axios from '../../utils/axios'

const initialFormValues = {
    coordinador: '',
    idCentro: 1,
    email: '',
    contra: ''
}

export default function CreateUserModal({ isOpen, setIsOpen }) {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/usuarios/crearUsuario`, formValues, { headers: { 'x-token': localStorage.getItem('token') } });
            console.log(response.data);
            toast.success(response.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            setIsOpen(false);
        } catch (error) {
            console.log(error.response.data);
            error.response.data.errors.forEach(error => {
                toast.error(error.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                });
            });
        }

    }

    return (
        <Modal
            className='modal'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className='paper'>
                    <Typography variant='h6' className='modal-title' >Crear usuario</Typography>
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
                        <TextField
                            variant='outlined'
                            name='contra'
                            value={formValues.contra}
                            onChange={handleChange}
                            label='Email'
                            fullWidth
                            color='secondary'
                            className='form-input'
                            type='password'
                        />
                        <div className='botones'>
                            <Button variant='contained' color='primary' type='submit'>
                                Guardar
                            </Button>
                            <Button variant='contained' className='boton-cancelar' onClick={() => setIsOpen(false)} >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}
