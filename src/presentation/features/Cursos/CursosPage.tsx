import type React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TitleSection from "../../components/TitleSection";
import "./Cursos.css";
import Cursos from "./Cursos";
import MapaCursos from "../../components/MapaCursos";
import TablaMunicipiosConCursos from "../../components/TablaMunicipiosConCursos";

const CursosPage: React.FC = () => {

    return (
        <>
            <Header />
            <main>
                <Menu />
                <section id="cursosPage">
                    <TitleSection title="Capacitaciones Georeferenciadas" />

                   <MapaCursos />
                   <Cursos />
                   <TablaMunicipiosConCursos />

                    
                </section>

            </main>
            <Footer />

        </>
    )
}

export default CursosPage;