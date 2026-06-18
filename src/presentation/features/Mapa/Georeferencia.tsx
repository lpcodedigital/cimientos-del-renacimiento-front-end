import React from "react";
import TitleSection from "../../components/TitleSection";
import MapaGeneral from "../../components/MapaGeneral";



const Georeferencia: React.FC = () => {

    return (
        <section id="Mapa">
            <TitleSection title="Mapa de georreferenciación pública" />

            <MapaGeneral />
        </section>
    );  
}   

export default Georeferencia