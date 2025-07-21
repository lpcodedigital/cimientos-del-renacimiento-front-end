import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CursoCard from "./CursoCard";
import type {  CursoElement } from "../../domain/models/Curso";

type CursoSliderProps = {
    cursos?: CursoElement[];
    onCursoClick: (curso: CursoElement) => void;
};

const CursoSlider: React.FC<CursoSliderProps> = ({ cursos, onCursoClick }) => (
  <Swiper slidesPerView={3} spaceBetween={20} breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}>
    {cursos?.map(curso => (
      <SwiperSlide key={curso.id}>
        <CursoCard curso={curso} onClick={onCursoClick} />
      </SwiperSlide>
    ))}
  </Swiper>
);
export default CursoSlider;
