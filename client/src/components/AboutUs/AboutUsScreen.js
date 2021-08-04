import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import './styles.css'

function AboutUsScreen() {
    return (
        <div className='aboutUs'>
            <Container maxWidth='md'>
                <h2>¿Quiénes somos?</h2>
                <Typography paragraph align='justify'>
                    La Secretaría de Desarrollo Social es la dependencia encargada de impulsar y consolidar mediante un modelo social de vertebración,
                    las acciones enfocadas a asegurar el disfrute de los derechos sociales, garantizando el acceso a los programas de desarrollo social,
                    vinculando a los diversos sectores de la sociedad civil organizada, dependencias e instituciones públicas con acciones a favor de mejorar la calidad de vida.
                </Typography>

                <img src="https://www.aguascalientes.gob.mx/sedeso/images/febrero2021/Portadapaginaprincipal.jpg" alt="imagen" className="imagen" />

                <Grid container>
                    <Grid item xs={10}>
                        <h2>Visión</h2>
                        <Typography paragraph>
                            La Secretaría de Desarrollo Social es reconocida por su trabajo en la vertebración e innovación en términos de participación ciudadana
                            y fortalecimiento de las competencias ciudadanas logrando comunidades vivas y proactivas, como protagonistas de su propio desarrollo,
                            mediante la formación de intermediarios sociales que generan una cultura de inclusión y respeto a los derechos humanos.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container style={{textAlign:'right'}}>
                    <Grid item xs />
                    <Grid item xs={10}>
                        <h2>Misión</h2>
                        <Typography paragraph>
                            Instrumentar programas que fomenten la participación ciudadana a través de capacitaciones, desarrollo de habilidades
                            y capacidades de la población con la finalidad de construir y consolidar el tejido y movilidad social.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <div className='blueDiv'>
                <Container maxWidth='md'>
                    <Grid container>
                        <Grid item xs={10}>
                            <h2 style={{ color: 'white' }}>Objetivos</h2>
                            <Typography paragraph>
                                Contribuir al desarrollo humano y de sus capacidades básicas de educación, salud y nutrición, garantizando el acceso a los programas
                                sociales que permitan una mayor igualdad de oportunidades de ingreso y superación, mejorando las condiciones de familias que se encuentren
                                en situación de exclusión y de pobreza; establecer las bases para implementar una política social que contribuya a reducir la pobreza,
                                la marginación y la desigualdad en coordinación con los sectores productivos y la sociedad civil.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default AboutUsScreen
