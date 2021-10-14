import { Container } from '@material-ui/core'
import React from 'react'
import CentrosContigoTable from './CentrosContigoTable'
import Contact from './Contact'
import HeroImage from './HeroImage'
import Map from './Map'
import './styles.css'
function HomepageScreen() {
    return (

        <div style={{ backgroundColor: '#fafafa' }}>
            
            <HeroImage /> 

            <Container maxWidth='md'>
                <h2 className="subtitulo">Centros contigo</h2>
                <CentrosContigoTable />

                <h2 className="subtitulo">Ubicación de los Centros contigo</h2>
                <Map />

                <Contact />
            </Container>
        </div>
    )
}

export default HomepageScreen


