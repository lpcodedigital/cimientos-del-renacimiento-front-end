import React, { useEffect } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import "../styles/ModalObraDetail.css";
import { useCursoDetalle } from "../../infrastructure/hooks/useCursoDetalle";
import SwiperImage from "./SwiperImage";

type ModalCursoDetailProps = {
    isShowing: boolean;
    onClose: () => void;
    cursoId: number;
};

const ModalCursoDetail: React.FC<ModalCursoDetailProps> = ({ isShowing, onClose, cursoId }) => {
    const { curso, loading, getDetalle, resetDetalle } = useCursoDetalle();

    useEffect(() => {
        if (isShowing && cursoId) {
            getDetalle(cursoId);
        }
        return () => resetDetalle();
    }, [isShowing, cursoId]);

    return (
        <Modal show={isShowing} onHide={onClose} size="xl" centered>
            <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                <Modal.Title>
                    {loading ? 'Cargando datos...' : `Detalles del Taller: ${curso?.title}`}
                </Modal.Title>
                <button type="button" onClick={onClose} className="btn p-0 border-0 bg-transparent" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ background: 'white', borderRadius: '50%' }}>
                        <path d="M18 6L6 18M6 6l12 12" stroke="#901b45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <Modal.Body>
                <div className="container-modal-body-obra-detail">
                    <p><strong>Municipio Sede:</strong> {curso?.municipalityName}</p><br />
                    <p><strong>Nombre de la Capacitación:</strong> {curso?.title}</p><br />
                    <p><strong>Fecha de Impartición:</strong> {curso?.courseDate ? new Date(curso.courseDate).toLocaleDateString("es-MX", { timeZone: "UTC" }) : ''}</p><br />
                    {curso?.description && (
                        <>
                            <p><strong>Descripción del Programa:</strong> {curso.description}</p><br />
                        </>
                    )}

                    <h5 className="mt-4 mb-3 font-weight-bold">Galería:</h5>
                    {curso?.images && curso.images.length !== 0 ? (
                        <SwiperImage images={curso.images.map((img) => img.url)} />
                    ) : (
                        <p className="text-muted italic">No se han subido imágenes de evidencia para esta capacitación todavía.</p>
                    )}
                </div>
            </Modal.Body>
            <ModalFooter className="d-flex justify-content-center">
                <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={onClose}>Cerrar Detalle</button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalCursoDetail;