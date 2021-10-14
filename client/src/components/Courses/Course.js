import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Edit, Delete } from '@material-ui/icons';

function Course({ curso, centroContigo }) {
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
                        <Typography>Lugar: </Typography>
                        <Chip size='small' label={curso.Lugar} style={{ marginLeft: 5 }} />
                        
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography>Centro contigo: </Typography>
                        <Chip size='small' label={curso.CentroContigo} style={{ marginLeft: 5 }} />
                    </div>
                </CardContent>

            </Card>
        </Grid>
    )
}

export default Course
