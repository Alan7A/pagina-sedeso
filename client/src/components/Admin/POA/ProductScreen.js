import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, IconButton, Input, TextField, Typography } from '@material-ui/core'
import { useParams } from 'react-router';
import axios from '../../../utils/axios';
import { headers } from '../../../utils/funcionesUtiles';
import { ArrowBack, Person } from '@material-ui/icons';
import { useHistory } from 'react-router'
import SpinnerKit from '../../SpinnerKit';

export const ProductScreen = () => {
    const { idProducto } = useParams();

    const [nombreProducto, setNombreProducto] = useState(null);
    const [productInfo, setProductInfo] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get(`/productos/${idProducto}`, headers);
            setNombreProducto(response.data.shift());
            setProductInfo(response.data);
            console.log(response.data);
        }
        getData();
    }, [])

    return (
        <Container maxWidth='md' style={{ marginTop: 25 }}>
            <Typography variant='h3'>{nombreProducto ? nombreProducto : 'Cargando Producto...'}</Typography>

            {productInfo ? (
                <Grid container direction='column' alignItems='center' wrap='nowrap' style={{ marginTop: 25 }}>
                    <Grid container item justifyContent='center'>
                        <Grid item xs>
                            <Button
                                variant='outlined'
                                startIcon={<ArrowBack />}
                                color='primary'
                                style={{ width: 165 }}
                                onClick={() => history.goBack()}
                            >
                                Regresar
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Typography className='texto-azul' style={{ textAlign: 'center' }}>Programado</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography className='texto-azul' style={{ textAlign: 'center' }}>Entregado</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography className='texto-azul' style={{ textAlign: 'center' }}>Vales</Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography className='texto-azul' style={{ textAlign: 'center' }}>Entregado a</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs>
                        {productInfo && productInfo.map((product) => (
                            <MesProducto datosProducto={product} />
                        ))}
                    </Grid>
                </Grid>

            ) : (<SpinnerKit />)
            }

        </Container>
    )
}

const mes = {
    Mes: "Enero",
    Entregado: "10",
    Programado: "20",
    Vales: 2
}

const MesProducto = ({ datosProducto }) => {
    return (
        <Grid container alignItems='center' wrap='nowrap'>
            <Grid item xs>
                <Typography className='texto-azul'>{datosProducto.Mes}</Typography>
            </Grid>
            <Grid item xs justifyContent='center'>
                <TextField type='number' variant='outlined' margin='dense' className='input-producto' value={datosProducto.Entregado} />
            </Grid>
            <Grid item xs>
                <TextField type='number' variant='outlined' margin='dense' className='input-producto' value={datosProducto.Programado} />
            </Grid>
            <Grid item xs>
                <div className='boton-circular'>{datosProducto.Vales}</div>
            </Grid>
            <Grid item xs justifyContent='center'>
                <div className='boton-circular'>
                    <Person style={{ marginTop: 7 }} />
                </div>
            </Grid>
        </Grid >
    )
}
