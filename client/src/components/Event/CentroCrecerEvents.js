import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Card, CardActionArea, CardContent, Container, Grid, Link, Paper, Typography, Button, TextField, Modal, makeStyles } from '@material-ui/core'
import { AddCircle, LocationOn, Phone } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHistory, useParams } from 'react-router-dom'
import Events, { centroContrigo } from './Events'
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


// console.log('centros');
// console.log(centroContrigo);

const initialFormValues = {
    nom: '',
    ub: '',
    tel: ''
}

var centros
const top100Films = [
    {title: "Asientos"},
    {title: "Calvillo"},
    {title: "Constitución"},
    {title: "Cosio"},
    {title: "El Llano"},
    {title: "Gómez Portugal"},
    {title: "Guadalupe Peralta"},
    {title: "Insurgentes"},
    {title: "Jesús María"},
    {title: "Jesús María Jonacatique"},
    {title: "Jesus Teran"},
    {title: "La Estrella"},
    {title: "La Salud"},
    {title: "Margaritas, Jesús María"},
    {title: "Miravalle"},
    {title: "Mujeres Ilustres"},
    {title: "Nazario Ortiz Garza"},
    {title: "Obraje"},
    {title: "Olivares Santana"},
    {title: "Pabellón"},
    {title: "Palomino Dena"},
    {title: "Pirules"},
    {title: "Pocitos"},
    {title: "Rincón de Romos"},
    {title: "San Francisco de los Romo"},
    {title: "San José de Gracia"},
    {title: "San Marcos"},
    {title: "Solidaridad"},
    {title: "Tepezalá"},
];


function centrosContigo() {

}

function CentroCrecerEvents() {
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
                // const response = await axios.get(`/centrosContigo/2`);
                // console.log(response.data);
                // setCentro(response.data);
                // console.log(response.data);
                setIsCentroLoading(false);
                setAreCoursesLoading(true)
                const responseCursos = await axios.get(`/eventos/todos`);
                setCursos(responseCursos.data);
                
                // setEditarCentro({
                    //     nom: response.data.nombreCentro,
                    //     ub: response.data.ubicacion,
                    //     tel: response.data.telefono

                    // })
                    
                    // const imagenesCurso = response.data.imagenes.map(img => img.imagen);
                    // setImagenes(imagenesCurso);
                    // console.log('Miguel Creo que estos son los datos');
                    // console.log(responseCursos.data[responseCursos.data.length - 1])
                    centros = (responseCursos.data[responseCursos.data.length - 1]).slice();
                    console.log('primero');
                    // console.log(centros);
                    

            } catch (error) {
                mostrarErrores(error);
            }
            setAreCoursesLoading(false);
        }
        getCursos();
    }, [idCentro]);

    // const onChangeCentro = e => {
    //     setEditarCentro({
    //         ...editarCentro,
    //         [e.target.name]: e.target.value
    //     })
    // }

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

        console.log("Estos son los datos que no se que pex");
        console.log(data);

        await axios.put(`/CentrosContigo/editar/${idCentro}`, data, headers);

        abrirCerrarEdit();

    }

    const ModalEdit = (
        <div className={styles.modal}>
            <div className="center">
                <h2>Editar centro contigo</h2>
            </div>
            {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
        </div>

    )

    // console.log('vamos');
    // console.log('-----');
    // console.log(centros);



    const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        console.log('segundo');
        // console.log(option);
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

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
                            <Typography color="textPrimary">Eventos</Typography>
                        </Breadcrumbs>

                        <h2 className="subtitulo">Eventos</h2>

                        <Grid style={{ marginBottom: 10 }}>
                            <Autocomplete
                                placement="right-start"
                                id="grouped-demo"
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300, icon: SearchIcon, }}
                                renderInput={(params) => <TextField {...params} label="Buscar evento por centro" variant="outlined" />}
                            />
                        </Grid>

                        {areCoursesLoading ? (<SpinnerKit style={{ marginTop: 25 }} />)
                            : (
                                <Grid container spacing={3}>
                                    {cursos.slice(0, cursos.length - 1).map((curso, i) => <Events curso={curso} centroContigo={curso.Curso} key={i} setActiveCourse={setActiveCourse} setOpen={setOpen} />)}
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


export default CentroCrecerEvents;
