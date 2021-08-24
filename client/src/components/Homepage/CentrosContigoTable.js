import { Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { mostrarErrores } from '../../utils/funcionesUtiles'
import { useHistory, useParams } from 'react-router-dom'

function CentrosContigoTable() {
    const [centros, setCentros] = useState([]);
    const history = useHistory()
    const { idCentro } = useParams();

    useEffect(() => {
        const getCentros = async () => {
            try {
                const response = await axios.get(`/CentrosContigo/`);
                console.log(response.data);
                setCentros(response.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCentros();
    }, [idCentro]);

    const handleClick = (centroContigo) => {
        history.push(`/centrosContigo/${centroContigo}`)
    }

    return (
        <TableContainer component={Paper} style={{height: 480}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Centro Contigo</StyledTableCell>
                        <StyledTableCell>Ubicación</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {response.map(({ nombreCentro, telefono }) => (
                        <StyledTableRow key={nombreCentro} onClick={() => handleClick(nombreCentro)}>
                            <StyledTableCell>{nombreCentro}</StyledTableCell>
                            <StyledTableCell>{telefono}</StyledTableCell>
                        </StyledTableRow>
                    ))} */}  
                        {centros.map((centro, i) =>
                            <StyledTableRow key={i} onClick={() => handleClick(centro.CentroContigo)}>
                                <StyledTableCell>{centro.CentroContigo}</StyledTableCell>
                                <StyledTableCell>{centro.Ubicación}</StyledTableCell>
                            </StyledTableRow>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        fontSize: 14,
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

export default CentrosContigoTable
