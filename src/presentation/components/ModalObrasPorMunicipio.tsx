import { Modal, ModalFooter } from "react-bootstrap";
import type { Obra } from "../../domain/models/Obra";
import { useState } from "react";
import ModalObraDetail from "./ModalObraDetail";

type ModalObrasPorMunicipioProps = {
    isShowing: boolean;
    onClose: () => void;
    municipio: string;
    obras: Obra[];
}
const ModalObrasPorMunicipio: React.FC<ModalObrasPorMunicipioProps> = ({ isShowing, onClose, municipio, obras }) => {

    const [obraSeleccionada, setObraSeleccionada] = useState<Obra | null>(null);

    return (
        <>
            <Modal 
                show={isShowing} 
                onHide={onClose} 
                size="lg" 
                centered
                className={obraSeleccionada ? 'modal-hidden' : ''}
                >

                <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                    <Modal.Title>Obras en {municipio}</Modal.Title>

                    <button
                        type="button"
                        onClick={onClose}
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
                    <ul className="list-group">
                        { obras.length !== 0 ? obras.map((obra, idx) => (
                            <li key={obra.id} onClick={() => setObraSeleccionada(obra)} className="list-group-item obra-link" data-id={obra.id} data-mun={municipio}>
                                {obra.nombre_de_obra}
                                <button
                                    onClick={() => setObraSeleccionada(obra)}
                                    className="button-btn-modal-detalle">Ver Detalle</button>
                            </li>
                        )) : (
                            <li className="list-group-item obra-link">
                                No hay obras en este municipio
                            </li>
                        )} 

                    </ul>
                </Modal.Body>
                <ModalFooter className="d-flex justify-content-center">

                    <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={onClose}>Cerrar</button>

                </ModalFooter>
            </Modal>

            {obraSeleccionada && (
                <ModalObraDetail
                    isShowing={true}
                    onClose={() => setObraSeleccionada(null)}
                    obra={obraSeleccionada}
                />
            )}
        </>
    );

};

export default ModalObrasPorMunicipio;