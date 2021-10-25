import { Container, Typography, TextField, Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../../redux/actions/products';
import { openCreateProductModal } from '../../../redux/actions/ui';
import Loading from '../../Loading';
import CreateProductModal from './CreateProductModal';
import { DeleteProductDialog } from './DeleteProductDialog';
import POATable from './POATable';
import './styles.css'

function POAScreen() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [year, setYear] = useState('2021');
    const { isLoading, products } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch])

    const realizarBusqueda = (e) => {
        setSearchValue(e.target.value);

        let filteredData = products.filter((producto) => {
            return (producto.Producto.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
        });

        setFilteredData(filteredData);
    }

    return (
        <Container>
            <Typography variant='h4'>
                Plan Operativo Anual
            </Typography>

            <Grid container justifyContent='space-between' style={{ marginTop: 15 }}>
                <Grid item xs={12} sm={5}>
                    <TextField
                        variant='outlined'
                        margin='dense'
                        color='secondary'
                        label='Buscar producto'
                        value={searchValue}
                        fullWidth
                        onChange={realizarBusqueda}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TextField
                            variant='outlined'
                            color='secondary'
                            label='Año'
                            select
                            margin='dense'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            {['2021', '2022'].map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </TextField>

                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: 25, maxHeight: 45 }}
                            onClick={() => dispatch(openCreateProductModal())}
                        >
                            Nuevo producto
                        </Button>
                    </div>
                </Grid>
            </Grid>
            {/* Tabla de productos */}
            {isLoading ? (<Loading />)
                : (
                    <POATable products={filteredData ? filteredData : products} />
                )
            }

            <CreateProductModal />

            <DeleteProductDialog />
        </Container>
    )
}


export default POAScreen
