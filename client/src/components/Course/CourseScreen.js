import { Breadcrumbs, Container, Grid, Link, Typography } from '@material-ui/core';
import React from 'react'
import { useHistory, useParams } from 'react-router-dom';

function CourseScreen() {
    const history = useHistory();
    const { centroContigo, course } = useParams();

    return (
        <Container maxWidth='md'>
            <h2 className="subtitulo">Curso de {course}</h2>

            <Breadcrumbs style={{marginTop: 30}}>
                <Link color="inherit" href="/" onClick={() => history.push('/')}>
                    Inicio
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => history.push('/centrosContigo')}>
                    Centros Contigo
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => history.push('/centrosContigo')}>
                    {centroContigo}
                </Link>
                <Typography color="inherit">Cursos</Typography>
                <Typography color="textPrimary">{course}</Typography>
            </Breadcrumbs>

            <Grid container style={{marginTop:50}}>
                <Grid item xs={6}>
                    <b>Información del curso y horarios</b>
                </Grid>
                <Grid item xs={6}>
                    <b>Información del instructor tal vez</b>
                </Grid>
            </Grid>

            <h2 className="subtitulo">Galería de imágenes</h2>

        </Container>
    )
}

export default CourseScreen
