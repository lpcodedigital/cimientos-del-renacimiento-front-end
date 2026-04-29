
import { useState } from "react";
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
import SwiperImage from "../../components/SwiperImage";
import { useNavigate } from "react-router-dom";
import formatDate from "../../components/utils/formatDate";
import { useCursoDetalle } from "../../../infrastructure/hooks/useCursoDetalle";

// import { Button, Modal } from "react-bootstrap";



const Cursos: React.FC = () => {

    // 1. Cargamos la lista (solo trae datos básicos + portada)
    const { data, loading, error } = useCursos(0, 10);

    const [isDetalleModalOpen, setDetalleModalOpen] = useState(false);

    // 2. Estado para el ID que queremos consultar a fondo
    const [cursoIdSeleccionado, setCursoIdSeleccionado] = useState<number | null>(null);

    // 3. Este hook traerá las imágenes pesadas SOLO cuando idSeleccionado tenga un valor
    const { curso: detalle, loading: loadingDetalle } = useCursoDetalle(cursoIdSeleccionado);

    const navigate = useNavigate();

    // 4. Función para abrir el modal y disparar la carga del detalle
    const handleVerDetalle = (id: number) => {
        setCursoIdSeleccionado(id);
        setDetalleModalOpen(true);
    };

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
                        slidesPerGroup={1} // Cambiado a 1 para que el desplazamiento sea más fluido si hay 10
                        // lazy={true}
                        modules={[Navigation, Pagination, Virtual]}
                        navigation={true}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {data?.data.map((curso) => (
                            <SwiperSlide key={curso.id}>
                                {/* Al hacer clic, pasamos solo el ID */}
                                <CursoCard curso={curso} onClick={() =>  handleVerDetalle(curso.id) } />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-center mt-4 text-center">
                        <button
                            onClick={() => navigate("/CursosPage")}
                            className="button-btn-verde">
                            Ver todos los cursos
                        </button>
                        {/* <Link to="/CursosPage" className="button-btn-verde">
                            Ver todos los cursos
                        </Link> */}
                    </div>

                </div>


                <Modal 
                    show={isDetalleModalOpen} 
                    onHide={() => {setDetalleModalOpen(false); setCursoIdSeleccionado(null);}} 
                    size="xl" 
                    centered
                >
                    <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                        <Modal.Title>
                            {loadingDetalle ? 'Cargando...' : `Detalles del curso: ${detalle?.title}`}
                        </Modal.Title>

                        <button
                            type="button"
                            onClick={() => {setDetalleModalOpen(false); setCursoIdSeleccionado(null);}}
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
                            {loadingDetalle ? (
                                <div className="text-center py-5">
                                    <p>Cargando información completa y galería...</p>
                                </div>
                            ): (
                                <>
                                <p><strong>Municipio:</strong> {detalle?.municipalityName}</p><br />
                                <p><strong>Fecha:</strong> {detalle?.courseDate ? formatDate(detalle?.courseDate.toString()) : 'No disponible'}</p><br />
                                {detalle?.description && <p><strong>Descripción:</strong> {detalle?.description}</p>}

                                {detalle?.images.length !== 0 && (
                                    <SwiperImage images={detalle?.images.map((img) => img.url) || [] } />
                                )}
                                </>
                            )}
                        </div>


                    </Modal.Body>
                    <ModalFooter className="d-flex justify-content-center">

                        <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={() => {setDetalleModalOpen(false); setCursoIdSeleccionado(null);}}>Cerrar</button>

                    </ModalFooter>
                </Modal>


            </section>



        </>
    );
}

export default Cursos;