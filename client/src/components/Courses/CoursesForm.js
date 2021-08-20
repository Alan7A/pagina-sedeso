import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Typography, TextField, Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import Loading from '../Loading';
import './styles.css'
import ListaHorarios from './ListaHorarios';
import axios from '../../utils/axios';
import { headers, mostrarErrores, mostrarNotificacionError, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';

const initialFormValues = {
    idc: 2,
    nom: '',
    lug: '',
    alu: 0
}

function CoursesForm({ editar }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [horarios, setHorarios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const { idCurso } = useParams();

    // Si editar es true, se cargan los datos del curso
    useEffect(() => {
        if (editar) {
            const getDatosCurso = async () => {
                try {
                    const response = await axios.get(`/cursos/${idCurso}`)
                    setFormValues({
                        idc: 2,
                        nom: response.data.Actividad,
                        lug: response.data.Lugar,
                        alu: response.data.Alumnos
                    });

                    const horariosCurso = response.data.horarios.map((horario) => ({ d: horario.dia, h: horario.horas, idHorario: horario.idHorario }));
                    setHorarios(horariosCurso);
                } catch (error) {
                    mostrarErrores(error);
                }
            }
            getDatosCurso();
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos generales>>>', formValues);
        console.log('Horarios del curso>>>', horarios);

        if (horarios.length === 0) {
            return mostrarNotificacionError('Agrega al menos un horario');
        }

        if (editar) { // Peticiones para MODIFICAR el curso
            try {
                setIsLoading(true);

                // Actualizar horarios del curso (se borran y se vuelven a insertar)
                const horariosConFormato = horarios.map((horario) => ({ dia: horario.d, horas: horario.h, idCurso }));
                const nuevosHorarios = horariosConFormato.map(horario => (Object.values(horario)));
                console.log(Object.values(nuevosHorarios));
                await axios.post(`/horarios/actualizar/${idCurso}`, nuevosHorarios, headers)

                mostrarNotificacionSuccess('Curso actualizado correctamente');
                history.push('/cursos');
            } catch (error) {
                mostrarErrores(error);
            }
        } else { // Peticiones para CREAR el curso
            try {
                setIsLoading(true);
                // Crear curso en la tabla cursos
                const response = await axios.post('/cursos/crearCurso', formValues, headers);
                const idCurso = response.data.idCurso

                // Insertar cada horario de la lista a la tabla horarios
                horarios.forEach(async (horario) => {
                    await axios.post(`/horarios/agregar/${idCurso}`, horario, headers);
                });

                mostrarNotificacionSuccess('Curso creado correctamente');
                history.push('/cursos');
            } catch (error) {
                mostrarErrores(error);
            }
        }

        setIsLoading(false);
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
                    <ListaHorarios horarios={horarios} setHorarios={setHorarios} />

                    {isLoading ? (<Loading />) : (
                        <div className='botones-modal'>
                            <Button variant='contained' className='boton-cancelar' onClick={() => history.push('/cursos')} >
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
