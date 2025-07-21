
import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Inicio from "../features/Inicio/Inicio"
import Ejes from "../features/Ejes/Ejes"
import Avance from "../features/Avance/Avance"
import Municipios from "../features/Municipios/Municipios"
import Transparencia from "../features/Transparencia/Transparencia"
import Menu from "../components/Menu"
import Fideicomiso from "../features/Fideicomiso/Fideicomiso"
import Georeferencia from "../features/Mapa/Georeferencia"
import Cursos from "../features/Cursos/Cursos"
function Home () {
    return (
    <>
        <Header/>
            <main>
                <Menu/>
                <Inicio/>
                <Fideicomiso/>
                <Ejes/>
                <Avance/>
                <Cursos/>
                <Georeferencia/>
                <Municipios/>
                <Transparencia/>
            </main>
        <Footer/>
    </>
    )   
};

export default Home