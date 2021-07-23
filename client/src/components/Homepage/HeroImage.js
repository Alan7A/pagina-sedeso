import React from 'react'
import { Typography } from '@material-ui/core';
import portada from './portada.jpg'

function HeroImage() {
    return (
        <div style={image} className='image'>
            <div className='text'>
                <Typography variant='h4' component='h1'>Secretaría de Desarrollo Social</Typography>
                <a href='#centrosCrecer' className='button'>Ver Centros Contigo</a>
            </div>
        </div>
    )
}

const image = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${portada})`,

}

export default HeroImage
