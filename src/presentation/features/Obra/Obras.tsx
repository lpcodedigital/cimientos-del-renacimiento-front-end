import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MapaObras from "../../components/MapaObras";
import Menu from "../../components/Menu";
import TablaMunicipiosConObras from "../../components/TablaMunicipiosConObras";
import TitleSection from "../../components/TitleSection";
import Avance from "../Avance/Avance";

const Obras: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Menu />
                <section id="allcursos">
                    
                    <TitleSection title="Obras Públicas Georeferenciadas" />
                    <br />
                    <MapaObras />

                    <Avance />
                   
                   <section id="tabla-municipios-con-obras">
                        <TitleSection title="Municipios con obras" />
                        <br />
                        <TablaMunicipiosConObras />
                    </section>
                    
                </section>

            </main>
            <Footer />

        </>
        
    );
}; 

export default Obras;