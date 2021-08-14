import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './styles.css'
import axios from '../../utils/axios'
import { closeEditUserModal } from '../../redux/actions/ui';

export default function EditUserModal({ usuario, setUsuario }) {
    const { isEditUserModalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValues = {
            idCentro: 1,
            coordinador: usuario.coordinador,
            email: usuario.correo,
            contra: '123456'
        }

        try {
            const response = await axios.put(`/usuarios/modificarUsuario/${usuario.idUsuario}`, formValues, { headers: { 'x-token': localStorage.getItem('token') } });
            console.log(response.data);
            toast.success(response.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
            dispatch(closeEditUserModal())
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
                            value={usuario?.coordinador}
                            onChange={handleChange}
                            label='Nombre'
                            fullWidth
                            color='secondary'
                            className='form-input'
                        />
                        <TextField
                            variant='outlined'
                            name='email'
                            value={usuario?.correo}
                            onChange={handleChange}
                            label='Email'
                            fullWidth
                            color='secondary'
                            className='form-input'
                        />
                        <div className='botones'>
                            <Button variant='contained' color='primary' type='submit'>
                                Guardar
                            </Button>
                            <Button variant='contained' className='boton-cancelar' onClick={() => dispatch(closeEditUserModal())} >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}
