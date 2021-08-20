import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons';
import React, { useState } from 'react'
import { isTimeValid } from '../utils/funcionesUtiles';

const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

const initialFormValues = {
    dia: 'Lunes',
    horaInicio: '09:00',
    horaFin: '10:00'
}

function DaySelector({ horarios, setHorarios }) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const agregarHorario = () => {
        if (!isTimeValid(formValues.horaInicio, formValues.horaFin)) {
            setError('Revisa que las fechas sean correctas');
        } else {
            setError(null);

            const nuevoHorario = {
                d: formValues.dia,
                h: `${formValues.horaInicio} a ${formValues.horaFin}`
            }
            console.log(nuevoHorario);

            setHorarios([...horarios, nuevoHorario]);
        }
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent='flex-end'>
                <Grid item xs={12}>
                    <TextField
                        select
                        name='dia'
                        label='Día'
                        value={formValues.dia}
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
                        value={formValues.horaInicio}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        size='small'
                        error={!!error}
                        helperText={error}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name='horaFin'
                        label='Hora fin'
                        type='time'
                        value={formValues.horaFin}
                        onChange={handleChange}
                        variant='outlined'
                        color='secondary'
                        fullWidth
                        size='small'
                        error={!!error}
                    />
                </Grid>
                <Grid item >
                    <Button
                        variant='contained'
                        color='primary'
                        style={{ marginBottom: 15 }}
                        startIcon={<Add />}
                        onClick={() => agregarHorario()}
                    >
                        Agregar horario
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default DaySelector
