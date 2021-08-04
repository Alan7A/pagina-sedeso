import { Breadcrumbs, Container, Typography, Link } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
import CentrosContigoTable from '../Homepage/CentrosContigoTable'

function CentrosCrecerScreen() {
    const history = useHistory();

    return (
        <Container maxWidth='md'>
            <h2 className="subtitulo">Centros contigo</h2>

            <Breadcrumbs style={{ marginTop: 30 }}>
                <Link color="inherit" href="/" onClick={() => history.push('/')}>
                    Inicio
                </Link>
                <Typography color="textPrimary">Centros Contigo</Typography>
            </Breadcrumbs>

            <Typography variant='h5' paragraph align='justify' style={{ marginTop: 30 }}>
                Actualmente se cuenta con 28 centros CRECER distribuidos en todo el estado, funcionando con más de 72 clases o talleres, con alrededor de 25 000 beneficiarios mensuales.
            </Typography>
            <CentrosContigoTable />
        </Container>
    )
}

export default CentrosCrecerScreen
