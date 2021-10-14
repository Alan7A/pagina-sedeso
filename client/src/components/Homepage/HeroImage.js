//import portada from "./portada.jpg";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";

function HeroImage() {
  const captionStyle = {
    fontSize: "2em",
    fontfamily: "Roboto",
  };

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

  return (
    <div>
      <Carousel
        data={
          imagenes.length > 0
            ? imagenes
            : [
                {
                  image:
                    "https://us.123rf.com/450wm/lishchyshyn/lishchyshyn1904/lishchyshyn190403199/132862735-icono-de-carga-de-vector-dise%C3%B1o-de-progreso-futurista.jpg?ver=6%27%7D",
                },
              ]
        }
        captionPosition="center"
        width="100%"
        captionStyle={captionStyle}
      />
    </div>
  );
}
export default HeroImage;
