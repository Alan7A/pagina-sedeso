import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Card, CardActionArea, CardContent, Container, Grid, Link, Paper, Typography, Button, TextField, Modal, makeStyles, Chip } from '@material-ui/core'
import { AddCircle, Block, LocationOn, Phone } from '@material-ui/icons'
import { useHistory, useParams } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
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



// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }


function CoursesScreen() {
    // Info inicial
    const [cursos, setCursos] = useState([]);
    const [centro, setCentro] = useState([]);
    const [isCentroLoading, setIsCentroLoading] = useState(true);
    const [areCoursesLoading, setAreCoursesLoading] = useState(false);

    const { usuario } = useSelector(state => state.auth);
    const { idCentro } = useParams();
    const history = useHistory();

    useEffect(() => {
        const getCursos = async () => {
            try {

                setIsCentroLoading(false);
                setAreCoursesLoading(true)
                const responseCursos = await axios.get(`/cursos/todos/`);
                setCursos(responseCursos.data);
            } catch (error) {
                mostrarErrores(error);
            }
            setAreCoursesLoading(false);
        }
        getCursos();
    }, [idCentro]);


    const Centroscon = cursos.slice(-1);

    const timeSlots = cursos.slice(0, cursos.length - 1).map((curso) =>
        `${curso.Curso}`
    );

    let timeSlots2 = Centroscon.map((curso) =>
        `${curso.map((centro) =>
            `${centro.CentroContigo}`)}`

    );

    if (timeSlots2[0] === undefined) {

    } else {
        timeSlots2 = timeSlots2[0].split(",");
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         tags: []
    //     };
    //     this.onTagsChange = this.onTagsChange.bind(this);
    // }

    // onTagsChange = (event, values) => {
    //     this.setState({
    //         tags: values
    //     }, () => {
    //         // This will output an array of objects
    //         // given by Autocompelte options property.
    //         console.log(this.state.tags);
    //     });
    // }

    const fixedOptions = [timeSlots[6]];
    const [value, setValue] = React.useState([...fixedOptions, timeSlots[13]]);

    const fixedOptions2 = [timeSlots2[6]];
    const [value2, setValue2] = React.useState([...fixedOptions2, timeSlots2[13]]);

    console.log("cacacacacacacacacacaca");
    var buscador = document.getElementById('buscar');
    if (buscador) {
        buscador.addEventListener("click", pulsar, false);
    }

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


                        </Container>

                        <h2 className="subtitulo">Cursos</h2>

                        <div class="wrapper">
                            <Autocomplete
                                multiple
                                id="Cursos"
                                onChange={(value, newValue) => {
                                    setValue([

                                        ...fixedOptions,
                                        ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                    ]);
                                }}
                                options={timeSlots}
                                getOptionLabel={option => option}
                                // defaultValue={[timeSlots[13]]}
                                // onChange={this.onTagsChange}
                                style={{ width: 500 }}

                                renderInput={(params) => (
                                    <TextField {...params} label="Cursos" id="caca" placeholder="Favorites" />
                                )}
                            />
                            <input type="button" id="buscar" name="buscar" value="pulsa!" />
                            {/* <imput id="buscar"> Buscar</button> */}
                            <Autocomplete
                                multiple
                                id="Centros"
                                name="Centros"
                                onChange={(value, newValue) => {
                                    setValue2([
                                        ...fixedOptions2,
                                        ...newValue.filter((option) => fixedOptions2.indexOf(option) === -1),
                                    ]);
                                }}
                                options={timeSlots2}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField  {...params} label="Centros" placeholder="Favorites" />
                                )}
                                onClick={ShowSelected()}

                            />

                        </div>



                        <br></br>
                        {areCoursesLoading ? (<SpinnerKit style={{ marginTop: 25 }} />)
                            : (
                                <Grid container spacing={3}>
                                    {cursos.slice(0, cursos.length - 1).map((curso, i) => <Course curso={curso} centroContigo={curso.Curso} key={i} />)}
                                </Grid>
                            )}
                    </>
                )
            }

        </Container>
    )

}


// document.getElementById('buscar').addEventListener("click", pulsar, false);



function pulsar() {


    // Obtiene los datos del autocomplete
    var div2 = document.getElementsByClassName("MuiAutocomplete-tag");
    // guardar array conlos filtros
    var div3 = [];
    var divEliminar = document.getElementsByClassName("visible");
    console.log("===============");
    if (div2.length == 0) {
        console.log("no hay nada wey");
        //regresar la visibilidada todos cuanto este bacio el autocomplete
        for (let index2 = 0; index2 < divEliminar.length; index2++) {
            divEliminar[index2].style.display = "block";
            console.log(divEliminar[index2]);
        }
    } else {
        for (let index = 0; index < div2.length; index++) {
            div3[index] = div2[index].innerText;
            for (let index2 = 0; index2 < divEliminar.length; index2++) {
                var texto = divEliminar[index2].innerText;
                texto = texto.split("\n");
                var nombreCurso = texto[0];
                var nombreCentro = texto[texto.length - 1];

                if (div3 == nombreCurso || div3 == nombreCentro) {
                } else {
                    divEliminar[index2].style.display = "none";
                    console.log(divEliminar[index2]);
                }
            }
        }

    }

    // div1.style.display = "none"
    // div2.style, display = "";
}






//Falta dar la funcionalidad al autocomplete, estoy trabajando eso
function ShowSelected() {
    /* Para obtener el valor */
    // var cod = document.getElementById("Centros");
    // alert(cod);

    /* Para obtener el texto */
    // var combo = document.getElementById("Centros");
    // var selected = combo.options[combo.selectedIndex].text;
    // alert(selected);

    // console.log(selected);
    // console.log("---------");
}

export default CoursesScreen;
