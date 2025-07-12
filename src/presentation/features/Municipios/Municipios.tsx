import React from "react";
import TitleSection from "../../components/TitleSection";
import TablaMunicipiosConObras from "../../components/TablaMunicipiosConObras";

const Municipios: React.FC = () => {
    return (
        <section id="Municipios">
            <TitleSection title="Municipios con Obras" />

            <TablaMunicipiosConObras />
        </section>
    );
};

export default Municipios;