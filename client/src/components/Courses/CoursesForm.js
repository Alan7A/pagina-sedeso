import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Typography, TextField, Paper } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { DropzoneArea } from 'material-ui-dropzone'
import Loading from '../Loading';
import './styles.css'
import ListaHorarios from './ListaHorarios';
import axios from '../../utils/axios';
import { fileToBase64, headers, mostrarErrores, mostrarNotificacionError, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';
import { useSelector } from 'react-redux';

const initialFormValues = {
    idc: 2,
    nom: '',
    lug: '',
    alu: 0
}

function CoursesForm({ editar }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [horarios, setHorarios] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const {usuario} = useSelector(state => state.auth);

    const history = useHistory();
    const { idCurso } = useParams();

    // Si editar es true, se cargan los datos del curso
    useEffect(() => {
        if (editar) {
            const getDatosCurso = async () => {
                try {
                    const response = await axios.get(`/cursos/${idCurso}`)
                    setFormValues({
                        idc: response.data.idCentro,
                        nom: response.data.nombre,
                        lug: response.data.lugar,
                        alu: response.data.alumnos
                    });

                    const horariosCurso = response.data.horarios.map((horario) => ({ d: horario.Dia, h: horario.Horario }));
                    setHorarios(horariosCurso);

                    const imagenesCurso = response.data.imagenes.map(img => img.imagen)
                    setImagenes(imagenesCurso);
                    setIsLoadingInfo(false);
                } catch (error) {
                    mostrarErrores(error);
                    setIsLoadingInfo(false);
                }
            }
            getDatosCurso();
        }
    }, [idCurso, editar])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (horarios.length === 0) {
            return mostrarNotificacionError('Agrega al menos un horario');
        }

        if (editar) { // Peticiones para MODIFICAR el curso
            try {
                setIsLoading(true);

                // Hacer que los horarios tengan el formato que acepta mysql
                const horariosConFormato = horarios.map((horario) => ({ dia: horario.d, horas: horario.h, idCurso }));
                const nuevosHorarios = horariosConFormato.map(horario => (Object.values(horario)));

                // Convertir files a base64 para poder subir a la bd
                const imagenesBase64 = await Promise.all(imagenes.map(async (imagen) => await fileToBase64(imagen)));
                // Hacer que las imágenes tengan el formato que acepta mysql
                const nuevasImagenes = imagenesBase64.map((imagen) => (Object.values({ idCurso, imagen })))

                // Agregar los horarios y las imágenes al objeto que se manda en el body
                let data = formValues;
                data.horarios = nuevosHorarios;
                data.imagenes = nuevasImagenes;

                // Mandar petición para actualizar datos generales del curso
                await axios.put(`/cursos/modificarCurso/${idCurso}`, data, headers);

                mostrarNotificacionSuccess('Curso actualizado correctamente');
                history.push(`/centrosContigo/${data.idc}`);
            } catch (error) {
                mostrarErrores(error);
            }
        } else { // Peticiones para CREAR el curso
            try {
                setIsLoading(true);

                // Hacer que los horarios tengan el formato que acepta mysql
                const horariosConFormato = horarios.map((horario) => ({ dia: horario.d, horas: horario.h }));
                const nuevosHorarios = horariosConFormato.map(horario => (Object.values(horario)));

                // Convertir files a base64 para poder subir a la bd
                const imagenesBase64 = await Promise.all(imagenes.map(async (imagen) => await fileToBase64(imagen)))
                // Hacer que las imágenes tengan el formato que acepta mysql
                const nuevasImagenes = imagenesBase64.map((imagen) => (Object.values({ imagen })))

                // Agregar los horarios y las imágenes al objeto que se manda en el body
                let data = formValues;
                data.idc = usuario.idCentro;
                data.horarios = nuevosHorarios;
                data.imagenes = nuevasImagenes;

                // Crear curso en la tabla cursos
                await axios.post('/cursos/crearCurso', data, headers);

                mostrarNotificacionSuccess('Curso creado correctamente');
                history.push(`/centrosContigo/${data.idc}`);
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

                {editar && isLoadingInfo ? (<Loading texto='Cargando información del curso' />)
                    : (
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
                                        min
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant='h6' paragraph>Horarios del curso</Typography>
                            <ListaHorarios horarios={horarios} setHorarios={setHorarios} />

                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                initialFiles={imagenes}
                                dropzoneText={"Arrastra tus imágenes o da clic aquí para subir imágenes (máximo 9)"}
                                onChange={(files) => setImagenes(files)}
                                filesLimit={9}
                                getFileLimitExceedMessage={(filesLimit) => `Solo se permiten ${filesLimit} imágenes como máximo`}
                                getFileAddedMessage={(fileName) => `Imagen ${fileName} agregada`}
                                getFileRemovedMessage={(fileName) => `Imagen ${fileName} eliminada`}
                                getDropRejectMessage={(rejectedFile, acceptedFiles, maxFileSize) => {
                                    let message = `No Se pudo subir ${rejectedFile.name}. `;
                                    if (acceptedFiles.includes(rejectedFile.type)) {
                                        message += 'Solo puedes subir imagenes. ';
                                    }
                                    if (rejectedFile.size > maxFileSize) {
                                        message += 'La imagen es demasiado pesada, el tamaño máximo es 3MB.';
                                    }
                                    return message;
                                }}
                            />

                            {isLoading ? (<Loading texto={editar ? 'Actualizando información del curso' : 'Creando el curso, por favor espere'} />) : (
                                <div className='botones-modal' style={{ marginTop: 20 }}>
                                    <Button variant='contained' className='boton-cancelar' onClick={() => history.push('/cursos')} >
                                        Cancelar
                                    </Button>
                                    <Button variant='contained' color='primary' type='submit'>
                                        {editar ? 'Guardar cambios' : 'Crear curso'}
                                    </Button>
                                </div>
                            )}
                        </form>
                    )}
            </Paper>
        </Container>
    )
}

export default CoursesForm
