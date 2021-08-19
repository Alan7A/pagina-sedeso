import React, { useState } from 'react'
import { CardContent, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import DaySelector from '../DaySelector';

let horarios = [
    {
        dia: 'Miércoles',
        hora: '9:00 a 10:00'
    },
    {
        dia: 'Lunes',
        hora: '9:00 a 11:00'
    }

]

function ListaHorarios() {
    const [horario, setHorario] = useState({
        dia: 'Lunes',
        horaInicio: '09:00',
        horaFin: '10:00'
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <DaySelector horario={horario} setHorario={setHorario} horarios={horarios} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ marginBottom: 25 }}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Lista de horarios del curso</Typography>
                        <Divider />
                        <List>
                            {horarios.map(horario => (
                                <ListItem divider className='list-item'>
                                    <ListItemText
                                        primary={`${horario.dia} de ${horario.hora}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Eliminar horario">
                                            <IconButton edge='end' onClick={() => console.log('Borrar horario')}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default ListaHorarios
