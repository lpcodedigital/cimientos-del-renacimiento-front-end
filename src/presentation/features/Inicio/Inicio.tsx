import React from "react";
import { Carousel } from "react-bootstrap";
import banner from "../../../assets/img/portada.jpg"
import CarouselImage from "../../components/ui/CarouselImage";
import { FaArrowDown } from 'react-icons/fa';
import './Inicio.css'
import {useScrollTo} from "../../../infrastructure/hooks/useScrollTo";
import logo from "../../../assets/img/cimientos1.svg"

const Inicio: React.FC = () => {

  const scrollTo = useScrollTo();

  return (

    <section id="Inicio" className="hero">
      <div className="carousel-container position-relative">
        <Carousel>
          <Carousel.Item>
            <CarouselImage src={banner} alt="Second slide" />
          </Carousel.Item>
          {/* Segundo Slide con el Logo y fondo blanco */}
          <Carousel.Item>
            {/* 1. La imagen original se mantiene al fondo para conservar las proporciones del carrusel */}
            <CarouselImage src={banner} alt="First slide" />
            
            {/* 2. CAPA BLANCA SUPERPUESTA (Overlay) */}
            {/* backgroundColor: 'rgba(255, 255, 255, 0.85)' crea un blanco al 85%. 
                Si lo quieres blanco TOTAL y sólido, usa 'white' o 'rgba(255, 255, 255, 1)' */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{ backgroundColor: 'rgb(255, 255, 255)', zIndex: 1 }}
            ></div>

            {/* 3. Contenedor del Logo centrado */}
            <div className="position-absolute top-50 start-50 translate-middle w-100 text-center px-3" style={{ zIndex: 2 }}>
              <img src={logo} alt="Logo Yucatán" className="carousel-logo" />
            </div>
          </Carousel.Item>
          {/* <Carousel.Item>
            <CarouselImage src={banner} alt="Third slide" />
          </Carousel.Item> */}
        </Carousel>

        {/* Flecha hacia abajo animada */}
        <a onClick={ () => scrollTo('Fideicomiso')} className="scroll-down">
          <FaArrowDown />
        </a>

        {/* <a
          onClick={() => {
            const element = document.getElementById("Fideicomiso");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="scroll-down"
        >
          <FaArrowDown size={30} />
        </a> */}

      </div>
    </section>



  );
};

export default Inicio;