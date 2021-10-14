import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Edit, Delete, LocationOn, Schedule, Description } from '@material-ui/icons';
import { useSelector } from 'react-redux';

function Events({ curso, centroContigo, setActiveCourse, setOpen }) {
    const { usuario } = useSelector(state => state.auth);
    const { idCentro } = useParams();
    const history = useHistory();

    const handleModalCourse = () => {

        setActiveCourse(curso);
        setOpen(true);
        console.log('abrirrr');
        console.log(usuario);
    }
    

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card class={`eventos`} variant="outlined" style={{ padding: 10 }}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image='https://lazona40.com/theme/image.php/mb2mcl/theme/1626807325/course-default'
                    title="Contemplative Reptile Miguel"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {curso.nombreEvento}
                        {`\n`}
                        <Typography id={curso.CentroContigo}>
                            {curso.CentroContigo}
                        </Typography>
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Schedule style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Horario(s): </Typography>
                        <Chip size='small' label={curso.horario} style={{ marginLeft: 5, marginBottom: 10 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <LocationOn style={{ marginRight: 10, color: '#f67f1c', marginBottom: 10 }} />
                        <Typography>Lugar: {curso.lugar}</Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Description style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Descripción: {curso.descripcion}</Typography>
                    </div>
                </CardContent>

            </Card>
        </Grid>
    )
}

export function centroContrigo({ curso, centroContigo, setActiveCourse, setOpen }) {
    return (curso[0])
}


export default Events;
