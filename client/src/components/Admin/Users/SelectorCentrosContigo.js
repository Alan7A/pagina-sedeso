import { MenuItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios';
import { headers, mostrarErrores } from '../../../utils/funcionesUtiles';

function SelectorCentrosContigo({ formValues, setFormValues }) {
    const [centrosContigo, setCentrosContigo] = useState([]);

    useEffect(() => {
        const getCentrosContigo = async () => {
            try {
                const response = await axios.get('/CentrosContigo/noRegistrados', headers);
                setCentrosContigo(response.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCentrosContigo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <TextField
            select
            name='idCentro'
            label='Centro Contigo'
            value={formValues.idCentro}
            onChange={handleChange}
            variant='outlined'
            color='secondary'
            fullWidth
            className='form-input'
            required
        >
            {centrosContigo.map((centro) => (
                <MenuItem key={centro.id} value={centro.id}>
                    {centro.CentroContigo}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectorCentrosContigo
