import React, { useState } from 'react'
import { Button, Container, Grid, Typography, TextField, Paper } from '@material-ui/core'
import Loading from '../Loading';
import './styles.css'
import ListaHorarios from './ListaHorarios';

const initialFormValues = {
    idc: 2,
    nom: '',
    lug: '',
    alu: 0
}

function CoursesForm({ editar }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    return (
        <Container maxWidth='md' style={{ paddingTop: 25 }}>
            <Paper elevation={2} className='paper'>
                <Typography variant='h4' paragraph>
                    {editar ? 'Editar Curso' : 'Crear Curso'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Typography variant='h6'>Datos generales</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant='outlined'
                                name='nom'
                                value={formValues.nom}
                                onChange={handleChange}
                                label='Nombre del curso'
                                fullWidth
                                color='secondary'
                                margin='normal'
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                name='lug'
                                value={formValues.lug}
                                onChange={handleChange}
                                label='Lugar'
                                fullWidth
                                color='secondary'
                                margin='normal'
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                variant='outlined'
                                name='alu'
                                value={formValues.alu}
                                onChange={handleChange}
                                label='Alumnos'
                                fullWidth
                                color='secondary'
                                margin='normal'
                                required
                                type='number'
                            />
                        </Grid>
                    </Grid>

                    <Typography variant='h6' paragraph>Horarios del curso</Typography>
                    <ListaHorarios />

                    {isLoading ? (<Loading />) : (
                        <div className='botones-modal'>
                            <Button variant='contained' className='boton-cancelar' onClick={handleSubmit} >
                                Cancelar
                            </Button>
                            <Button variant='contained' color='primary' type='submit'>
                                {editar ? 'Guardar cambios' : 'Crear curso'}
                            </Button>
                        </div>
                    )}
                </form>
            </Paper>
        </Container>
    )
}

export default CoursesForm
