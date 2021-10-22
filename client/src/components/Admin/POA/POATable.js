import React from 'react'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, withStyles, Paper, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { EditProductModal } from './EditProductModal';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../../redux/actions/products';
import { openDeleteProductDialog, openEditProductModal } from '../../../redux/actions/ui';

function POATable({ products }) {
    const dispatch = useDispatch();

    const handleEdit = (product) => {
        dispatch(setSelectedProduct(product));
        dispatch(openEditProductModal());
    }

    const handleDelete = (product) => {
        dispatch(setSelectedProduct(product));
        dispatch(openDeleteProductDialog());
    }

    return (
        <TableContainer component={Paper} style={{ maxHeight: 550, marginTop: 20 }}>
            <Table stickyHeader style={{ minWidth: 650 }} size='small'>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell>{column}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <StyledTableRow key={product.idProducto} >
                            <TableCell>{product.Producto}</TableCell>
                            <StyledTableCell align='center'>{product.Enero}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Febrero}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Marzo}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Abril}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Mayo}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Junio}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Julio}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Agosto}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Septiembre}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Octubre}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Noviembre}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Diciembre}</StyledTableCell>
                            <StyledTableCell align='center'>{product.Total}</StyledTableCell>
                            <StyledTableCell align='center'>{product['Meta Anual']}</StyledTableCell>
                            <StyledTableCell>{product.Observaciones ? product.Observaciones : '-'}</StyledTableCell>
                            <StyledTableCell>
                                <Tooltip title='Editar' onClick={() => handleEdit(product)}>
                                    <IconButton color='secondary'>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Eliminar' onClick={() => handleDelete(product)}>
                                    <IconButton style={{ color: '#b00020' }}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>

            {products.length === 0 && (
                <Typography variant='h6' align='center' style={{ marginBottom: 20, marginTop: 20 }}>
                    No se encontró ningún resultado
                </Typography>
            )}

            <EditProductModal />
        </TableContainer>
    )
}

const columns = [
    'Artículo', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Meta Anual', 'Total', 'Observaciones', 'Acciones'
]

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        fontSize: 15,
        paddingBottom: 0,
        paddingTop: 0,
        paddingRight: 0,
        borderLeft: '1px solid #d2d2d2',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            backgroundColor: 'rgba(246, 127, 28, .2)',
            cursor: 'pointer'
        }
    },
}))(TableRow);


export default POATable
