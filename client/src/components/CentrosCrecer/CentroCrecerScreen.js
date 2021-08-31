import { Breadcrumbs, Card, CardActionArea, CardContent, Container, Grid, Link, Paper, Typography, Button } from '@material-ui/core'
import { AddCircle, LocationOn, Phone } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Course from './Course'
import axios from '../../utils/axios'
import './styles.css'
import { mostrarErrores } from '../../utils/funcionesUtiles'
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux'

function CentroCrecerScreen() {
    const [cursos, setCursos] = useState([]);
    const [centro, setCentro] = useState([]);
    const history = useHistory();
    const { idCentro } = useParams();
    const { usuario } = useSelector(state => state.auth);

    useEffect(() => {
        const getCursos = async () => {
            try {
                const response = await axios.get(`/cursos/Cursos/${idCentro}`);
                const comprobarId = response.config.url.substr(15, 3);
                const responseCentro = await axios.get(`/centrosContigo/${comprobarId}`);
                setCursos(response.data);
                setCentro(responseCentro.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCursos();
    }, [idCentro]);

    return (
        <Container maxWidth='lg' style={{ marginTop: 35 }}>

            <Breadcrumbs style={{ marginBottom: 30 }}>
                <Link color="inherit" href="/" onClick={() => history.push('/')}>
                    Inicio
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => history.push('/')}>
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
                                {idCentro == usuario.idCentro && (
                                    <Button variant="contained" color="primary">
                                        <EditIcon></EditIcon>
                                    </Button>
                                )}

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
            <Grid container spacing={3}>
                {cursos.map((curso, i) => <Course curso={curso} centroContigo={curso.Curso} key={i} />)}

                {idCentro == usuario.idCentro && (
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
        </Container>
    )
}


export default CentroCrecerScreen
