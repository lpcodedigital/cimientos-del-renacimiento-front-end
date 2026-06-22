import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/Galeria.css'
import SwiperImage from "./SwiperImage";

type ModalGaleriaProps = {
    isShowing: boolean;
    onClose: () => void;
    title: string,
    imagenes: string[];
}

const ModalGaleria: React.FC<ModalGaleriaProps> = ({ isShowing, onClose, title, imagenes }) => {

    return (
        <Modal show={isShowing} onHide={onClose} size="lg" centered>
            

            <div className="modal-header d-flex justify-content-between align-items-center p-3 pb-0">
                <Modal.Title>Galería: {title}</Modal.Title>

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
                        style={{ background:'white', borderRadius: '50%' }}
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
            <ModalBody>

                <SwiperImage images={imagenes} />

            </ModalBody>
            <ModalFooter className="d-flex justify-content-center">

                    <button className="btn btn-light border-dark px-4 py-2 rounded-pill" onClick={onClose}>Cerrar</button>
               
            </ModalFooter>
        </Modal>
    );

}

export default ModalGaleria;