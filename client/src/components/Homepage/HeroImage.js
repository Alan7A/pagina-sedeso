//import portada from "./portada.jpg";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";

function HeroImage() {
  const [imagenes, setImg] = useState([]);
  
  useEffect(() => {
    const getImagenes = async () => {
      try {
        const response = await axios.get(`/imagenes/`);
        const images2 = response.data.map((imagenes) => {
          return {
            image: imagenes.imagen,
            caption: "Secretaría de Desarrollo Social",
          };
        });
        setImg(images2);
      } catch (error) {
        console.log(error);
      }
    };
    getImagenes();
  }, []);

  const captionStyle = {
    fontSize: "2em",
    fontfamily: "Roboto",
  };

  return (
    <div>
      <Carousel
        data={imagenes}
        captionPosition="center"
        width="100%"
        captionStyle={captionStyle}
        time={8000}
        automatic={true}
        dots={true}
      />
    </div>
  );
}
export default HeroImage;
