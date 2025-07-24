import React from "react";
import { Carousel } from "react-bootstrap";
import banner from "../../../assets/img/portada.jpg"
import CarouselImage from "../../components/ui/CarouselImage";
import { FaArrowDown } from 'react-icons/fa';
import './Inicio.css'
import {useScrollTo} from "../../../infrastructure/hooks/useScrollTo";

const Inicio: React.FC = () => {

  const scrollTo = useScrollTo();

  return (

    <section id="Inicio" className="hero">
      <div className="carousel-container position-relative">
        <Carousel>
          <Carousel.Item>
            <CarouselImage src={banner} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage src={banner} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage src={banner} alt="Third slide" />
          </Carousel.Item>
        </Carousel>

        {/* Flecha hacia abajo animada */}
        <a onClick={ () => scrollTo('Fideicomiso')} className="scroll-down">
          <FaArrowDown size={30} />
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