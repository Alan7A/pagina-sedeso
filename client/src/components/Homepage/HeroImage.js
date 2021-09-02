import React from 'react'
import { Typography } from '@material-ui/core';
import portada from './portada.jpg'
// import {Carousel} from '3d-react-carousal'  No borrar att: Gabriel;

function HeroImage() {
    return (
        <div style={image} className='hero-image'>

    
            <div className='hero-text'>
                <Typography variant='h4' component='h1'>Secretaría de Desarrollo Social</Typography>
            </div>
        </div>
    )
}

const image = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${portada})`,

}


export default HeroImage
