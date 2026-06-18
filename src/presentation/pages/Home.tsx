
import Header from "../components/Header"
import Footer from "../components/Footer"
import Inicio from "../features/Inicio/Inicio"
import Ejes from "../features/Ejes/Ejes"
import Menu from "../components/Menu"
import Fideicomiso from "../features/Fideicomiso/Fideicomiso"
import Georeferencia from "../features/Mapa/Georeferencia"
import Avance from "../features/Avance/Avance"
function Home () {
    return (
    <>
        <Header/>
            <main>
                <Menu/>
                <Inicio/>
                <Fideicomiso/>
                <Ejes/>
                {/* <Avance/> */}
                {/* <Cursos/> */}
                <Georeferencia/>
                {/* <Municipios/> */}
                {/* <Transparencia/> */}
            </main>
        <Footer/>
    </>
    )   
};

export default Home