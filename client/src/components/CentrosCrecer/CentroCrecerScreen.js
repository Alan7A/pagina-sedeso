import { Breadcrumbs, Card, CardActionArea, CardContent, Container, Grid, Link, Paper, Typography } from '@material-ui/core'
import { AddCircle, LocationOn, Phone } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Course from './Course'
import axios from '../../utils/axios'
import './styles.css'
import { mostrarErrores } from '../../utils/funcionesUtiles'

function CentroCrecerScreen() {
    const [cursos, setCursos] = useState([]);
    const history = useHistory();
    const { idCurso } = useParams();

    useEffect(() => {
        const getCursos = async () => {
            try {
                const response = await axios.get(`/cursos/Cursos/${idCurso}`);
                setCursos(response.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCursos();
    }, [idCurso]);

    return (
        <Container maxWidth='lg' style={{ marginTop: 35 }}>
            <Container maxWidth='md'>

                {/* No me gustó como quedó esto, estaría bien cambiarlo */}
                <Paper elevation={3} >
                    <Grid container>
                        <Grid item xs={6} className='leftPanel'>
                            <Typography variant='h4'>Centro contigo</Typography>
                            <Typography variant='h4' style={{ fontWeight: 'bold' }}>sdf</Typography>
                        </Grid>

                        <Grid item xs={6} className='rightPanel' >
                            <div className='info'>
                                <LocationOn className='icon' />
                                <p>Art. 24 esquina con Art. 14, Col. Constitución</p>
                            </div>

                            <div className='info'>
                                <Phone className='icon' />
                                <p>449 123 4567</p>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            <Breadcrumbs style={{ marginTop: 30 }}>
                <Link color="inherit" href="/" onClick={() => history.push('/')}>
                    Inicio
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => history.push('/centrosContigo')}>
                    Centros Contigo
                </Link>
                <Typography color="textPrimary">sdfsdf</Typography>
            </Breadcrumbs>

            <h2 className="subtitulo">Cursos</h2>
            <Grid container spacing={3}>
                {cursos.map((curso, i) => <Course curso={curso} centroContigo={curso.Curso} key={i} />)}
                <Grid item xs={12} sm={6} md={4}>

                    <Card elevation={3} style={{ backgroundColor: '#4caf50', color: 'white'}} onClick={() => history.push('/cursos/crearCurso')}>
                        <CardActionArea>
                            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AddCircle style={{ fontSize: 45, color: 'white', marginBottom: 10 }} />
                                <Typography>Crear nuevo curso</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}


export default CentroCrecerScreen
