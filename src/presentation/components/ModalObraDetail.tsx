import { Modal, ModalFooter } from "react-bootstrap";
import type { Obra } from "../../domain/models/Obra";
import "swiper/css";
import SwiperImage from "./SwiperImage";
import "../styles/ModalObraDetail.css"

type ModalObraDetailProps = {
    isShowing: boolean;
    onClose: () => void
    obra: Obra
}


const ModalObraDetail: React.FC<ModalObraDetailProps> = ({ isShowing, onClose, obra }) => {

    return (

        <Modal show={isShowing} onHide={onClose} size="xl" centered>
            <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                    <Modal.Title>Detalles de la obra: {obra.nombre_de_obra}</Modal.Title>

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
                {/* <p><strong>Obra:</strong> {obra.nombre_de_obra}</p><br /> */}
                <div className="container-modal-body-obra-detail">

                <p><strong>Municipio:</strong> {obra.nombre_municipio}</p><br />
                <p><strong>Ejecutora:</strong> {obra.nombre_de_ejecutora}</p><br />
                <p><strong>Inversión:</strong> {obra.inversion}</p><br />
                <p><strong>Avance:</strong> {obra.avance} %</p><br />
                {obra.descripcion && <p><strong>Descripción:</strong> {obra.descripcion}</p>}

                {obra.imagenes.length !== 0 ?  <SwiperImage images={obra.imagenes} /> : <p>No hay imágenes disponibles</p>}
                </div>
               

            </Modal.Body>
            <ModalFooter className="d-flex justify-content-center">

                    <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={onClose}>Cerrar</button>

                </ModalFooter>
        </Modal>

    )


};

export default ModalObraDetail;