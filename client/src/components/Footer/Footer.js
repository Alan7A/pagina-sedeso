import React from 'react'
import { Container, Grid } from '@material-ui/core'
import './styles.css'

function Footer() {
    return (
        <footer className='footer'>
            <Container maxWidth='md'>
                <Grid container spacing={3} >
                    <Grid item xs={6} sm>
                        <a href="/">
                            <img src="/images/logoFooter.png" width="170px" alt="logoGEA" />
                        </a>
                    </Grid>

                    <Grid item xs={6} sm >
                        <span className="titulo-seccion">Mapa de sitio</span>
                        {sites.map(({ title, path }) => (
                            <li key={title}><a href={path} >{title}</a></li>
                        ))}
                    </Grid>

                    <Grid item xs={6} sm >
                        <span className="titulo-seccion">Redes sociales</span>
                    </Grid>

                    <Grid container justifyContent='center'>
                        Copyright
                    </Grid>
                    
                    <Grid container justifyContent='center'>
                        Telefono: 449 910 21 21
                        Blvd. José María Chávez No.3205,
                        Cd. Industrial C.P. 20290
                    </Grid>

                </Grid>
            </Container>
        </footer>
    )
}

const sites = [
    {
        title: 'Inicio',
        path: '/'
    },
    {
        title: 'Cursos',
        path: '/cursos'
    },
    {
        title: 'Eventos',
        path: '/eventos'
    },
    {
        title: 'Sobre nosotros',
        path: '/sobreNosotros'
    }
]

export default Footer
