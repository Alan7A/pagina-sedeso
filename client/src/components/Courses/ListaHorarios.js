import React, { useState } from 'react'
import { CardContent, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import DaySelector from '../DaySelector';

function ListaHorarios({ horarios, setHorarios }) {
    const deleteHorario = (item) => {
        setHorarios(horarios.filter(horario => horario !== item));
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <DaySelector horarios={horarios} setHorarios={setHorarios} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ marginBottom: 25 }}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Lista de horarios del curso</Typography>
                        <Divider />
                        <List>
                            {horarios.map((horario, i) => (
                                <ListItem divider className='list-item' key={i}>
                                    <ListItemText
                                        primary={`${horario.d} de ${horario.h}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Eliminar horario">
                                            <IconButton edge='end' onClick={() => deleteHorario(horario)}>
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
