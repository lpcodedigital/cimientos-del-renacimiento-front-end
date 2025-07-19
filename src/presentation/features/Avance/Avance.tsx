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
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=INCAY'}
                title="INCAY"
                porcentaje={60}
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=INCCOPY'}
                title="INCCOPY"
                porcentaje={40}
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=IVEY'}
                title="IVEY"
                porcentaje={20}
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <CardAvance
                img={'https://placehold.co/600x400?text=JAPAY'}
                title="JAPAY"
                porcentaje={10}
                descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            </div>

        </section>
    );
};

export default Avance;