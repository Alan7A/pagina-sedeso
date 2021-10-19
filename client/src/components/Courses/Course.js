import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Edit, Delete, LocationOn, Schedule } from '@material-ui/icons';
import { useSelector } from 'react-redux';

function Course({ curso, centroContigo, setActiveCourse, setOpen }) {
    const { usuario } = useSelector(state => state.auth);
    const { idCentro } = useParams();
    const history = useHistory();

    const handleModalCourse = () => {

        setActiveCourse(curso);
        setOpen(true);
        console.log('abrirrr');
    }

    return (
        <Grid item xs={12} sm={6} md={4} >
            <Card class={`visible`}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={curso.imagen ? curso.imagen : 'https://lazona40.com/theme/image.php/mb2mcl/theme/1626807325/course-default'}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {curso.Curso}
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Schedule style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Horarios: </Typography>
                        {curso.horarios.map((horario) => (
                            <Chip size='small' label={`${horario.Dia} ${horario.Horario}`} style={{ marginLeft: 5, marginBottom: 10 }} />
                        ))}
                    </div>

                    <div style={{ display: 'flex' }}>
                        <LocationOn style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Lugar: {curso.Lugar}</Typography>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <LocationOn style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Centro: {curso.CentroContigo}</Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}



export default Course
