import React, { useState } from "react"
import logo from "../../assets/img/logo-yucatan.svg"
import { Container, Nav, Navbar, Image } from "react-bootstrap"

const Menu: React.FC = () => {

      const [menuAbierto, setMenuAbierto] = useState(false);

  const handleScrollTo = (id: string) => {
    // Cierra el menú primero
    setMenuAbierto(false);

    // Espera a que el colapso se cierre visualmente
    setTimeout(() => {
      const elemento = document.getElementById(id);
      if (elemento) {
        const offset = -100; // ajusta este valor según tu navbar
        const y = elemento.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 300); // tiempo estimado de animación del colapso
  };


    return (
        <>

            <Navbar sticky="top" expand="lg" className="bg-body-tertiary px-3">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Navbar.Brand href="#Inicio" className="d-flex align-items-center flex-shrink-0 me-3">
          <Image src={logo} alt="Escudo de Yucatán" className="logo-img" />
        </Navbar.Brand>

        {/* Botón hamburguesa */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMenuAbierto(!menuAbierto)}
        />

        {/* Menú colapsable */}
        <Navbar.Collapse in={menuAbierto} id="basic-navbar-nav" className="flex-grow-1">
          <Nav className="ms-auto d-flex flex-wrap gap-2">
            <Nav.Link as="button" onClick={() => handleScrollTo("Inicio")}>Inicio</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Fideicomiso")}>Cimientos del renacimiento</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Ejes")}>Ejes</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Avance")}>Avance</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Mapa")}>Mapa</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Municipios")}>Municipios</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Transparencia")}>Transparencia</Nav.Link>
            <Nav.Link as="button" onClick={() => handleScrollTo("Contacto")}>Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        </>
    )
};

export default Menu