import React, { useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { useCursoByMunicipio } from "../../infrastructure/hooks/useCursoByMunicipio";
import ModalCursoDetail from "./ModalCursoDetail";

type ModalCursosPorMunicipioProps = {
    isShowing: boolean;
    onClose: () => void;
    municipio: string;
};

const ModalCursosPorMunicipio: React.FC<ModalCursosPorMunicipioProps> = ({ isShowing, onClose, municipio }) => {
    const { cursos, loading, getCursos } = useCursoByMunicipio();
    const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

    useEffect(() => {
        if (isShowing && municipio) {
            getCursos(municipio);
        }
    }, [isShowing, municipio]);

    return (
        <>
            <Modal 
                show={isShowing} 
                onHide={onClose} 
                size="lg" 
                centered
                className={idSeleccionado ? 'modal-hidden' : ''}
            >
                <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                    <Modal.Title>Capacitaciones en {municipio}</Modal.Title>
                    <button type="button" onClick={onClose} className="btn p-0 border-0 bg-transparent" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ background: 'white', borderRadius: '50%' }}>
                            <path d="M18 6L6 18M6 6l12 12" stroke="#901b45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <Modal.Body>
                    {loading ? (
                        <p className="text-center">⌛ Buscando capacitaciones...</p>
                    ) : (
                        <ul className="list-group">
                            {cursos.length !== 0 ? cursos.map((curso) => (
                                <li key={`curso-item-${curso.id}`} className="list-group-item d-flex justify-content-between align-items-center">
                                    {curso.title}
                                    <button
                                        onClick={() => setIdSeleccionado(curso.id)}
                                        className="button-btn-verde" 
                                    >
                                        Ver detalles
                                    </button>
                                </li>
                            )) : (
                                <li className="list-group-item text-muted">
                                    No hay capacitaciones registradas en este municipio
                                </li>
                            )} 
                        </ul>
                    )}
                </Modal.Body>
                <ModalFooter className="d-flex justify-content-center">
                    <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={onClose}>Cerrar</button>
                </ModalFooter>
            </Modal>

            {idSeleccionado && (
                <ModalCursoDetail
                    isShowing={true}
                    onClose={() => setIdSeleccionado(null)}
                    cursoId={idSeleccionado}
                />
            )}
        </>
    );
};

export default ModalCursosPorMunicipio;