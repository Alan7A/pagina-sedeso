import { Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, withStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

function CentrosContigoTable() {
    const history = useHistory()

    const data = [
        {
            centroContigo: 'Constitución',
            location: 'Art. 24 esquina con Art. 14, Col. Constitución'
        },
        {
            centroContigo: 'Olivares Santana',
            location: 'Benjamín de la Mora s/n, Fracc. Olivares Santana'
        },
        {
            centroContigo: 'Insurgentes',
            location: 'Mateo Almanza #202 Fracc. Insurgentes'
        },
        {
            centroContigo: 'San Marcos',
            location: 'Av. Aguascalientes #604, Col. San Marcos'
        }
    ]

    const handleClick = (centroContigo) => {
        history.push(`/centrosContigo/${centroContigo}`)
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Centro Contigo</StyledTableCell>
                        <StyledTableCell>Ubicación</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ centroContigo, location }) => (
                        <StyledTableRow key={centroContigo} onClick={() => handleClick(centroContigo)}>
                            <StyledTableCell>{centroContigo}</StyledTableCell>
                            <StyledTableCell>{location}</StyledTableCell>
                        </StyledTableRow>
                    ))}
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
