import React from "react";
import TitleSection from "../../components/TitleSection";
import CardAvance from "../../components/CardAvance";
import logo from "../../../assets/img/logo.png"

const Avance: React.FC = () => {
    return (
        <section className="avance-section" id="Avance">
            <TitleSection title="Avance por entidad" />
             <div className="avance-grid-dashboard d-flex flex-wrap justify-content-center gap-7">

            <CardAvance
                img={"https://placehold.co/600x400?text=IDEFEEY"}
                title="IDEFEEY"
                porcentaje={80}
                descripcion="Instituto para el Desarrollo y Certificaión de la Infraestructura Física Educativa y Eléctrica de Yucatán."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=INCAY'}
                title="INCAY"
                porcentaje={60}
                descripcion="Instututo de Infraestructura Carretera de Yucatán."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=INCCOPY'}
                title="INCCOPY"
                porcentaje={40}
                descripcion="Instituto para la Construcción y Conservación de Obra Pública en Yucatán."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=IVEY'}
                title="IVEY"
                porcentaje={20}
                descripcion="Instituto de Vivienda del Estado de Yucatán."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=JAPAY'}
                title="JAPAY"
                porcentaje={10}
                descripcion="Junta de Agua Potable y Alcantarillado de Yucatán."
            />
            </div>

        </section>
    );
};

export default Avance;