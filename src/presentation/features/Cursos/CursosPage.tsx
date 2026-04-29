import type React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleSection from "../../components/TitleSection";
import CursoCard from "../../components/CursoCard";
import useCursos from "../../../infrastructure/hooks/useCursos";
import "./Cursos.css";
import { useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import SwiperImage from "../../components/SwiperImage";
import formatDate from "../../components/utils/formatDate";
import { useCursoDetalle } from "../../../infrastructure/hooks/useCursoDetalle";

const CursosPage: React.FC = () => {

    // 1. Estado para la paginación (empezamos en 0 para el backend)
    const [page, setPage] = useState(0);

    const pageSize = 12; // Cantidad de cursos por página en la rejilla

    // 2. Cargamos la lista paginada
    const { data, loading, error } = useCursos(page, pageSize);

    // 3. Estado para el ID que queremos consultar a fondo
    const [cursoIdSeleccionado, setCursoIdSeleccionado] = useState<number | null>(null);
    const [isDetalleModalOpen, setDetalleModalOpen] = useState(false);

    // 4. Hook para traer el detalle completo cuando se seleccione un ID
    const { curso: detalle, loading: loadingDetalle } = useCursoDetalle(cursoIdSeleccionado);

    const handleVerDetalle = (id: number) => {
        setCursoIdSeleccionado(id);
        setDetalleModalOpen(true);
    };

    if (loading && page === 0) return <p>Cargando cursos...</p>;
    if (error) return <p>Error al cargar los cursos: {error}</p>;

    // Cálculo para controles de paginación
    const totalPages = Math.ceil((data?.total || 0) / pageSize);

    return (
        <>
            <Header />
            <main>
                <Menu />
                <section id="allcursos">

                    <TitleSection title="Todos los Cursos" />

                    <div className="curso-grid">
                        {data?.data.map((curso) => (
                            <CursoCard key={curso.id} curso={curso} onClick={() => handleVerDetalle(curso.id)} />
                        ))}
                    </div>

                    {/* CONTROLES DE PAGINACIÓN */}
{totalPages > 1 && (
    <nav aria-label="Navegación de cursos" style={{ clear: 'both', padding: '40px 0' }}>
        <ul style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px',
            listStyle: 'none',
            padding: 0,
            margin: 0
        }}>
            <li>
                <button
                    className="button-btn-verde"
                    disabled={page === 0 || loading}
                    onClick={() => {
                        setPage(p => p - 1);
                        window.scrollTo({ top: 0, behavior: 'instant' }); // 'instant' es menos pesado que 'smooth'
                    }}
                    style={{ 
                        opacity: (page === 0 || loading) ? 0.5 : 1,
                        cursor: (page === 0 || loading) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Anterior
                </button>
            </li>

            <li>
                <span className="font-bold text-dark" style={{ fontSize: '1.1rem', minWidth: '120px', textAlign: 'center', display: 'inline-block' }}>
                    {loading ? "..." : `Página ${page + 1} de ${totalPages}`}
                </span>
            </li>

            <li>
                <button
                    className="button-btn-verde"
                    disabled={page + 1 >= totalPages || loading}
                    onClick={() => {
                        setPage(p => p + 1);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    style={{ 
                        opacity: (page + 1 >= totalPages || loading) ? 0.5 : 1,
                        cursor: (page + 1 >= totalPages || loading) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Siguiente
                </button>
            </li>
        </ul>
    </nav>
)}

                    <Modal
                        show={isDetalleModalOpen}
                        onHide={() => { setDetalleModalOpen(false); setCursoIdSeleccionado(null); }}
                        size="xl"
                        centered
                    >
                        <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                            <Modal.Title>
                                {loadingDetalle ? "Cargando..." : `Detalles del curso: ${detalle?.title}`}
                            </Modal.Title>

                            <button
                                type="button"
                                onClick={() => { setDetalleModalOpen(false); setCursoIdSeleccionado(null); }}
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
                                    <div className="text-center py-5 text-dark">
                                        <p>Consultando galería y detalles...</p>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>Municipio:</strong> {detalle?.municipalityName}</p><br />
                                        <p><strong>Fecha:</strong> {detalle?.courseDate ? formatDate(detalle.courseDate.toString()) : ''}</p><br />
                                        {detalle?.description && <p><strong>Descripción:</strong> {detalle.description}</p>}

                                        {detalle?.images && detalle.images.length > 0 && (
                                            <SwiperImage images={detalle.images.map(img => img.url)} />
                                        )}
                                    </>
                                )}
                            </div>


                        </Modal.Body>
                        <ModalFooter className="d-flex justify-content-center">

                            <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={() => { setDetalleModalOpen(false); setCursoIdSeleccionado(null); }}>Cerrar</button>

                        </ModalFooter>
                    </Modal>
                </section>

            </main>
            <Footer />

        </>
    )
}

export default CursosPage;