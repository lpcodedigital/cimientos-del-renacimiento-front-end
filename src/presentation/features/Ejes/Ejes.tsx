import React from "react";
import TitleSection from "../../components/TitleSection";
import CardEje from "../../components/CardEje";


const Ejes: React.FC = () => {
    return (
        <section id="Ejes">
            <TitleSection title="Ejes de trabajo" />

            <div className="ejes-grid d-flex flex-wrap justify-content-center gap-7">
                <CardEje
                    title="Formación técnica y profesionalización"
                    description="Impulsa el desarrollo de habilidades y competencias en los
          trabajadores mediante capacitaciones, certificaciones y programas de
          educación técnica."
                />
                <CardEje
                    title="Seguridad laboral en obra"
                    description="Promueve entornos seguros en el trabajo, con protocolos de
          prevención, equipos adecuados y capacitación constante en normas de
          seguridad."
                />
                <CardEje
                    title="Bienestar para los trabajadores y sus familias"
                    description="Impulsa el cuidado de la salud física y emocional de los trabajadores, 
            extendiendo los beneficios del programa hacia sus familias para consolidar comunidades laborales sanas y seguras."
                />
            </div>

        </section>
    );
}

export default Ejes