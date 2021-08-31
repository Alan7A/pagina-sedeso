import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Edit, Delete, LocationOn, Schedule } from '@material-ui/icons';
import { useSelector } from 'react-redux'

function Course({ curso, centroContigo }) {
    const { usuario } = useSelector(state => state.auth);
    const { idCentro } = useParams();
    const history = useHistory();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {curso.Curso}
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Schedule style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Horarios: </Typography>
                        <Chip size='small' label='Lunes 7:00-10:00' style={{ marginLeft: 5 }} />
                        <Chip size='small' label='Jueves 18:00-21:00' style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <LocationOn style={{ marginRight: 10, color: '#f67f1c' }} />
                        <Typography>Lugar: {curso.Lugar}</Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => history.push(`/centrosContigo/${centroContigo}/cursos/${curso.Curso}`)}>
                        Ver Más
                    </Button>
                    {idCentro == usuario.idCentro && (
                        <>
                            <Button size="small" color="secondary" onClick={() => history.push(`/cursos/modificarCurso/${curso.idCurso}`)} startIcon={<Edit />}>
                                Editar
                            </Button>
                            <Button size="small" style={{ color: 'red' }} startIcon={<Delete />}>
                                Eliminar
                            </Button>

                        </>
                    )}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Course
