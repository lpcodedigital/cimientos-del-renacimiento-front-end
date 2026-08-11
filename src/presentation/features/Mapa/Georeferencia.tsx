import React from "react";
import TitleSection from "../../components/TitleSection";
import MapaGeneral from "../../components/MapaGeneral";



const Georeferencia: React.FC = () => {

    return (
        <section id="Mapa">
            <TitleSection title="Mapa de Georreferenciación de Obra Pública" />

            <MapaGeneral />
        </section>
    );  
}   

export default Georeferencia