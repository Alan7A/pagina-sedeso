import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons';
import React from 'react'

const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
]

function DaySelector({ horario, setHorario, horarios }) {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setHorario({
            ...horario,
            [name]: value
        })
    }

    const agregarHorario = (e) => {
        const nuevoHorario = {
            d: horario.dia,
            h: `${horario.horaInicio} a ${horario.horaFin}`
        }
        console.log(nuevoHorario);
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField
                        select
                        name='dia'
                        label='Día'
                        value={horario.dia}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        size='small'
                    >
                        {dias.map((dia) => (
                            <MenuItem key={dia} value={dia}>
                                {dia}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='horaInicio'
                        label='Hora de inicio'
                        type='time'
                        value={horario.horaInicio}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='horaFin'
                        label='Hora fin'
                        type='time'
                        value={horario.horaFin}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        size='small'
                    />
                </Grid>
                <Grid item >
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<Add />}
                        onClick={agregarHorario}
                    >
                        Agregar horario
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default DaySelector
