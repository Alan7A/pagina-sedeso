import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, IconButton } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Edit, Delete } from '@material-ui/icons';

function Course({ course, centroContigo }) {
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
                        {course.name}
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Typography>Horarios: </Typography>
                        <Chip size='small' label='Lunes 7:00-10:00' style={{ marginLeft: 5 }} />
                        <Chip size='small' label='Jueves 18:00-21:00' style={{ marginLeft: 5 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography>Instructor: </Typography>
                        <Typography >
                            <span className="instructorName" onClick={() => console.log('Hola')}>
                                Nombre del Instructor
                            </span>
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => history.push(`/centrosContigo/${centroContigo}/cursos/${course.name}`)}>
                        Ver Más
                    </Button>
                    {/* <IconButton size='small' color='secondary'>
                        <Edit />
                    </IconButton>
                    <IconButton size='small' style={{ color: 'red' }}>
                        <Delete />
                    </IconButton> */}
                    <Button size="small" color="secondary" startIcon={<Edit />}>
                        Editar
                    </Button>
                     <Button size="small" style={{ color: 'red' }} startIcon={<Delete />}>
                        Eliminar
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Course
