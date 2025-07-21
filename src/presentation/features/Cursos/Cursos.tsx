
import { useEffect, useState } from "react";
import useCursos from "../../../infrastructure/hooks/useCursos";
import TitleSection from "../../components/TitleSection";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import CursoCard from "../../components/CursoCard";
// import type { CursoElement } from "../../../domain/models/Curso";

import "./Cursos.css";
import { Modal, ModalFooter } from "react-bootstrap";
import type { CursoElement } from "../../../domain/models/Curso";
import SwiperImage from "../../components/SwiperImage";
import { Link } from "react-router-dom";

// import { Button, Modal } from "react-bootstrap";



const Cursos: React.FC = () => {



    const { data, loading, error } = useCursos();

    // Estado principal
    // const [isGridModalOpen, setGridModalOpen] = useState(false);
    const [isDetalleModalOpen, setDetalleModalOpen] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoElement | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);

    // const navigate = useNavigate();

    useEffect(() => {
        if (cursoSeleccionado && cursoSeleccionado.imagenes.length > 0) {
            const urls = cursoSeleccionado.imagenes.map(imagen => imagen.url);
            setImagenes(urls);
        } else {
            setImagenes([]); // limpia si no hay imágenes
        }
    }, [cursoSeleccionado]);

    if (loading) return <p>Cargando cursos...</p>;

    if (error) return <p>Error al cargar los cursos: {error}</p>;


    return (
        <>
            <section id="Cursos">
                <TitleSection title="Cursos" />

                <div className="w-full py-8">
                    <Swiper
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        slidesPerView={3}
                        slidesPerGroup={3}
                        // lazy={true}
                        modules={[Navigation, Pagination, Virtual]}
                        navigation={true}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {data?.cursos.map((curso) => (
                            <SwiperSlide key={curso.id}>
                                <CursoCard curso={curso} onClick={() => { setDetalleModalOpen(true); setCursoSeleccionado(curso); }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-center mt-4 text-center">
                        {/* <button
                            onClick={() => navigate("/CursosPage")}
                            className="button-btn-verde">
                            Ver todos los cursos
                        </button> */}
                        <Link to="/CursosPage" className="button-btn-verde">
                            Ver todos los cursos
                        </Link>
                    </div>

                </div>


                <Modal show={isDetalleModalOpen} onHide={() => setDetalleModalOpen(false)} size="xl" centered>
                    <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                        <Modal.Title>Detalles del curso: {cursoSeleccionado?.nombre}</Modal.Title>

                        <button
                            type="button"
                            onClick={() => setDetalleModalOpen(false)}
                            className="btn p-0 border-0 bg-transparent"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{ background: 'white', borderRadius: '50%' }}
                            >
                                <path
                                    d="M18 6L6 18M6 6l12 12"
                                    stroke="#901b45"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <Modal.Body>
                        {/* <p><strong>Obra:</strong> {obra.nombre_de_obra}</p><br /> */}
                        <div className="container-modal-body-obra-detail">

                            <p><strong>Municipio:</strong> {cursoSeleccionado?.municipio}</p><br />
                            <p><strong>Fecha:</strong> {cursoSeleccionado?.fecha}</p><br />
                            {cursoSeleccionado?.descripcion && <p><strong>Descripción:</strong> {cursoSeleccionado?.descripcion}</p>}

                            {imagenes.length !== 0 && (
                                <SwiperImage images={imagenes} />
                            )}
                        </div>


                    </Modal.Body>
                    <ModalFooter className="d-flex justify-content-center">

                        <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={() => setDetalleModalOpen(false)}>Cerrar</button>

                    </ModalFooter>
                </Modal>


            </section>



        </>
    );
}

export default Cursos;