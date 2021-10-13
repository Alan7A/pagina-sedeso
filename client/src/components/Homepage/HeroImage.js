import { Typography } from '@material-ui/core';
import portada from './portada.jpg'
import ImageGallery from 'react-image-gallery';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';

function HeroImage() {
  const [imagenes, setImg] = useState([]);

  useEffect(() => {
    const getImagenes = async () => {
        try {
            const response = await axios.get(`/imagenes/`);
            setImg(response.data);
            console.log("AQUI DEBERIA DE IR EL ARRAY DE IMAGENES");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    getImagenes();
  }, []);

  
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
