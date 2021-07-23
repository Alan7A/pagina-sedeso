import { Card, CardActionArea, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core'
import { AddCircle, LocationOn, Phone } from '@material-ui/icons'
import React from 'react'
import { useParams } from 'react-router-dom'
import Course from './Course'
import './styles.css'

function CentroCrecerScreen() {
    const { centroContigo } = useParams();

    const cursos = [
        {
            name: 'Cocina'
        },
        {
            name: 'Danza Folkrórica'
        },
        {
            name: 'Inglés'
        }
    ]

    return (
        <Container maxWidth='lg' style={{ marginTop: 35 }}>
            <Container maxWidth='md'>
                <Paper elevation={3} >
                    <Grid container>
                        <Grid item xs={6} className='leftPanel'>
                            <Typography variant='h4'>Centro contigo</Typography>
                            <Typography variant='h4' style={{ fontWeight: 'bold' }}>{centroContigo}</Typography>
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

            <h2 className="subtitulo">Cursos</h2>
            <Grid container spacing={3}>
                {cursos.map((course, i) => <Course course={course} />)}
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} style={{backgroundColor:'#4caf50', color:'white'}}>
                        <CardActionArea>
                            <CardContent style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <AddCircle style={{fontSize:45, color:'white', marginBottom:10}} />
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
