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

// let slides = [
//     <img  src="https://picsum.photos/800/300/?random" alt="1" />,
//     <img  src="https://picsum.photos/800/301/?random" alt="2" />  ,
//     <img  src="https://picsum.photos/800/302/?random" alt="3" />  ,
//     <img  src="https://picsum.photos/800/303/?random" alt="4" />  ,
//     <img src="https://picsum.photos/800/304/?random" alt="5" />   ];
// Ignorar Esto lo usare despues Att. gabriel
// <Carousel slides={slides} autoplay={true} interval={1000}/>

