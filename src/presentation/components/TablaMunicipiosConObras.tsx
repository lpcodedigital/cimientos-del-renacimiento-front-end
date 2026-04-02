import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import '../styles/TablaMunicipiosConObras.css'
import ModalObrasPorMunicipio from "./ModalObrasPorMunicipio";
import InputFiltroTabla from "./InputFiltroTabla";
import PaginacionTabla from "./PaginacionTabla";
import NormalizeText from "./utils/NormalizeText";
import usePagination from "../hooks/usePagination";
import { useMunicipiosStats } from "../../infrastructure/hooks/useMunicipiosStats";

const TablaMunicipiosConObras: React.FC = () => {

  const { stats: municipiosConObras , isLoading } = useMunicipiosStats();
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const elementosPorPagina = 20;
  const [busqueda, setBusqueda] = useState("");

  const refTable = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Desplazarse al final de la tabla
    refTable.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  }, [paginaActual]);

  // Filtrar municipios por busqueda
  const municipiosFiltrados = municipiosConObras.filter((muni) =>
    // Normalizamos el nombre del municipio y la busqueda
    NormalizeText(muni.nombre).includes(NormalizeText(busqueda))
  );

  // Hook de paginacion personalizado que devuelve los municipios de la pagina actual y el total de paginas
  const { totalPages: totalPaginas, items: municipiosPorPagina } = usePagination(municipiosFiltrados, paginaActual, elementosPorPagina);

  if (isLoading) return <p>Loading...</p>;
  //if (errorGeo || errorObras) return <p>Error al cargar las obras: {errorGeo || errorObras}</p>;

  return (

    <>

      <div>

        <InputFiltroTabla
          busqueda={busqueda}
          onChange={(nuevoValor) => {
            setBusqueda(nuevoValor);
            setPaginaActual(1);
          }} />
      </div>

      <div ref={refTable} className="contenedor-tabla-municipios-obras">

        <Table striped bordered hover className="tabla-municipios-obras">
          <thead>
            <tr>
              <th>Municipio</th>
              <th>Total de Obras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {municipiosPorPagina.map((value, idx) => (
              <React.Fragment key={idx}>
                <tr key={idx}>
                  <td>{value.nombre}</td>
                  <td>{value.totalObras}</td>
                  <td>
                    <button className="button-btn-verde" onClick={() => { setMunicipioSeleccionado(value.nombre); }}>Ver obras</button>
                  </td>
                </tr>

              </React.Fragment>
            ))}
          </tbody>
          <tfoot>

            <PaginacionTabla
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onPaginaAnterior={() => setPaginaActual(paginaActual - 1)}
              onPaginaSiguiente={() => setPaginaActual(paginaActual + 1)}
            />


          </tfoot>
        </Table>
      </div>

      <ModalObrasPorMunicipio
        isShowing={!!municipioSeleccionado}
        municipio={municipioSeleccionado || ''}
        onClose={() => setMunicipioSeleccionado(null)}
      />

    </>
  );
};

export default TablaMunicipiosConObras;