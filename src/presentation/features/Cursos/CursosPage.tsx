import type React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleSection from "../../components/TitleSection";
import CursoCard from "../../components/CursoCard";
import useCursos from "../../../infrastructure/hooks/useCursos";
import "./Cursos.css";
import { useEffect, useState } from "react";
import type { CursoElement } from "../../../domain/models/Curso";
import { Modal, ModalFooter } from "react-bootstrap";
import SwiperImage from "../../components/SwiperImage";
import formatDate from "../../components/utils/formatDate";

const CursosPage: React.FC = () => {

    const { data, loading, error } = useCursos();

    const [isDetalleModalOpen, setDetalleModalOpen] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoElement | null>(null);
    const [imagenes, setImagenes] = useState<string[]>([]);

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
            <Header />
            <main>
                <Menu />
                <TitleSection title="Cursos" />
                <div className="curso-grid">

                    {data?.cursos.map((curso) => (
                        <CursoCard key={curso.id} curso={curso} onClick={() => { setDetalleModalOpen(true); setCursoSeleccionado(curso); }} />
                    ))}
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
                            <p><strong>Fecha:</strong> {formatDate(cursoSeleccionado?.fecha)}</p><br />
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

            </main>
            <Footer />

        </>
    )
}

export default CursosPage;