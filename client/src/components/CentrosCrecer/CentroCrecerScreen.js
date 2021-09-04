import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Card, CardActionArea, CardContent, Container, Grid, Link, Paper, Typography, Button, TextField, Modal, makeStyles } from '@material-ui/core'
import { AddCircle, LocationOn, Phone } from '@material-ui/icons'
import { useHistory, useParams } from 'react-router-dom'
import Course from './Course'
import axios from '../../utils/axios'
import './styles.css'
import { fileToBase64, headers, mostrarErrores } from '../../utils/funcionesUtiles'
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector } from 'react-redux'
import { DropzoneArea } from 'material-ui-dropzone'
import SpinnerKit from '../SpinnerKit'
import DialogDeleteCourse from './DialogDeleteCourse'

const initialFormValues = {
    nom: '',
    ub: '',
    tel: ''
}

function CentroCrecerScreen() {
    // Info inicial
    const [cursos, setCursos] = useState([]);
    const [centro, setCentro] = useState([]);
    const [isCentroLoading, setIsCentroLoading] = useState(true);
    const [areCoursesLoading, setAreCoursesLoading] = useState(false);
    // Modal editar
    const [modalEdit, setModalEdit] = useState(false);
    const [error, setError] = useState(false);
    const [editarCentro, setEditarCentro] = useState(initialFormValues);
    const [imagenes, setImagenes] = useState([]);
    // Dialog eliminar curso
    const [open, setOpen] = useState(false);
    const [activeCourse, setActiveCourse] = useState({});

    const { usuario } = useSelector(state => state.auth);
    const { idCentro } = useParams();
    const history = useHistory();

    const styles = useStyles();

    useEffect(() => {
        const getCursos = async () => {
            try {
                const response = await axios.get(`/centrosContigo/${idCentro}`);
                setCentro(response.data);
                console.log(response.data);
                setIsCentroLoading(false);
                setAreCoursesLoading(true)
                const responseCursos = await axios.get(`/cursos/Cursos/${idCentro}`);
                setCursos(responseCursos.data);

                setEditarCentro({
                    nom: response.data.nombreCentro,
                    ub: response.data.ubicacion,
                    tel: response.data.telefono
                })

                const imagenesCurso = response.data.imagenes.map(img => img.imagen);
                setImagenes(imagenesCurso);
            } catch (error) {
                mostrarErrores(error);
            }
            setAreCoursesLoading(false);
        }
        getCursos();
    }, [idCentro]);

    const onChangeCentro = e => {
        setEditarCentro({
            ...editarCentro,
            [e.target.name]: e.target.value
        })
    }

    const abrirCerrarEdit = () => {
        setModalEdit(!modalEdit);
    }

    const onSubmitActualizarCentro = async (e) => {
        e.preventDefault();


        // Convertir files a base64 para poder subir a la bd
        const imagenesBase64 = await Promise.all(imagenes.map(async (imagen) => await fileToBase64(imagen)));
        // Hacer que las imágenes tengan el formato que acepta mysql
        const nuevasImagenes = imagenesBase64.map((imagen) => (Object.values({ idCentro, imagen })))

        // Agregar los horarios y las imágenes al objeto que se manda en el body
        let data = editarCentro;
        data.imagenes = nuevasImagenes;

        console.log(data);

        await axios.put(`/CentrosContigo/editar/${idCentro}`, data, headers);

        abrirCerrarEdit();

    }

    const ModalEdit = (
        <div className={styles.modal}>
            <div className="center">
                <h2>Editar centro contigo</h2>
            </div>
            <form
                onSubmit={onSubmitActualizarCentro}
            >
                <TextField
                    type="text"
                    label="Nombre del Centro"
                    name="nom"
                    value={editarCentro.nom}
                    onChange={onChangeCentro}
                    className={styles.texttield}

                />
                <br />
                <TextField
                    type="text"
                    label="Ubicación"
                    name="ub"
                    value={editarCentro.ub}
                    onChange={onChangeCentro}
                    className={styles.texttield}
                    multiline
                    maxRows={4}
                />
                <br />
                <TextField
                    type="tel"
                    label="Teléfono"
                    name="tel"
                    value={editarCentro.tel}
                    onChange={onChangeCentro}
                    className={styles.texttield}
                />
                <br /> <br />
                <div align="right">
                    <Button variant="contained" color="primary" type="submit"  onChange={onChangeCentro} className={styles.button}>
                        <SaveAltIcon></SaveAltIcon>
                    </Button>
                    <Button variant="contained" color="primary" className={styles.button} onClick={() => abrirCerrarEdit()}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </div>
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
            </form>
            {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
        </div>

    )

    return (
        <Container maxWidth='lg' style={{ marginTop: 35, marginBottom: 35 }}>
            {isCentroLoading ? (
                <div style={{ display: 'grid', placeItems: 'center', minHeight: '20rem' }}>
                    <SpinnerKit />
                </div>
            )
                : (
                    <>
                        <Breadcrumbs style={{ marginBottom: 30 }}>
                            <Link color="inherit" href="/" >
                                Inicio
                            </Link>
                            <Link color="inherit" href="/" >
                                Centros Contigo
                            </Link>
                            <Typography color="textPrimary">{centro.nombreCentro}</Typography>
                        </Breadcrumbs>

                        <Container maxWidth='md'>

                            {/* No me gustó como quedó esto, estaría bien cambiarlo */}
                            <Paper elevation={3} >
                                <Grid container>
                                    <Grid item xs={6} className='leftPanel'>
                                        <Typography variant='h4'>Centro Contigo</Typography>
                                        <Typography variant='h4' style={{ fontWeight: 'bold' }}>{centro.nombreCentro}</Typography>
                                        <div style={{ marginTop: 30 }}>
                                            {/* {idCentro == usuario?.idCentro && ( */}
                                                <Button variant="contained" color="primary" onClick={() => abrirCerrarEdit()}>
                                                    <EditIcon></EditIcon>
                                                </Button>
                                            {/* // )} */}

                                        </div>
                                    </Grid>

                                    <Grid item xs={6} className='rightPanel' >
                                        <div className='info'>
                                            <LocationOn className='icon' />
                                            <p>{centro.ubicacion}</p>
                                        </div>

                                        <div className='info'>
                                            <Phone className='icon' />
                                            <p>{centro.telefono}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>

                        <h2 className="subtitulo">Cursos</h2>
                        {areCoursesLoading ? (<SpinnerKit style={{ marginTop: 25 }} />)
                            : (
                                <Grid container spacing={3}>
                                    {cursos.map((curso, i) => <Course curso={curso} centroContigo={curso.Curso} key={i} setActiveCourse={setActiveCourse} setOpen={setOpen} />)}

                                    {idCentro == usuario?.idCentro && (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Card elevation={3} style={{ backgroundColor: '#4caf50', color: 'white' }} onClick={() => history.push('/cursos/crearCurso')}>
                                                <CardActionArea>
                                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <AddCircle style={{ fontSize: 45, color: 'white', marginBottom: 10 }} />
                                                        <Typography>Crear nuevo curso</Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                    </>
                )
            }
            <Modal
                open={modalEdit}
                onClose={abrirCerrarEdit}>
                {ModalEdit}
            </Modal>
            <DialogDeleteCourse open={open} setOpen={setOpen} curso={activeCourse} />
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
        height: 450,
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    texttield: {
        width: '90%',
        padding: '1rem'
    },
    button: {
        margin: '1rem 0.5rem'
    }
}));


export default CentroCrecerScreen
