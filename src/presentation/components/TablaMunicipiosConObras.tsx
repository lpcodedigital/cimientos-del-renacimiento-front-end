import React from "react";
import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import useObras from "../../infrastructure/hooks/useObras";
import useGeoZona from "../../infrastructure/hooks/useGeoZona";
import type { Obra } from "../../domain/models/Obra";
import { getMunicipios } from "../../domain/services/municipioService";
import '../styles/TablaMunicipiosConObras.css'
import ModalObrasPorMunicipio from "./ModalObrasPorMunicipio";
import InputFiltroTabla from "./InputFiltroTabla";
import PaginacionTabla from "./PaginacionTabla";

const TablaMunicipiosConObras: React.FC = () => {

  const { geoData, loading: loadingGeo, error: errorGeo } = useGeoZona()
  const { obras, loading: loadingObras, error: errorObras } = useObras();
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);
  const [obrasMunicipioSeleccionado, setObrasMunicipioSeleccionado] = useState<Obra[] | null>(null);

  const [paginaActual, setPaginaActual] = useState<number>(1);
  const elementosPorPagina = 20;
  const [busqueda, setBusqueda] = useState("");

  const municipiosConObras = useMemo(() => {

    if (!geoData || !obras) return [];

    const obrasPorMunicipio: Record<string, Obra[]> = {};

    for (const obra of obras) {
      const municipio = obra.nombre_municipio;
      if (!obrasPorMunicipio[municipio]) {
        obrasPorMunicipio[municipio] = [];
      }
      obrasPorMunicipio[municipio].push(obra);
    }

    const municipios = getMunicipios(geoData).map((municipio) => {
      const nombre = municipio;
      const obrasMunicipio = obrasPorMunicipio[municipio] || [];

      return {
        nombre,
        totalObras: obrasMunicipio.length,
        obras: obrasMunicipio
      }
    })

    return municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));

  }, [geoData, obras])

  const normalizarTexto = (texto: string): string => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const municipiosFiltrados = municipiosConObras.filter((muni) =>
    normalizarTexto(muni.nombre).includes(normalizarTexto(busqueda))
  );

  const totalPaginas = Math.ceil(municipiosFiltrados.length / elementosPorPagina)

  const municipiosPorPagina = municipiosFiltrados.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina);

  if (loadingGeo || loadingObras) return <p>Loading...</p>;
  if (errorGeo || errorObras) return <p>Error al cargar las obras: {errorGeo || errorObras}</p>;

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
                  <button className="button-btn-verde" onClick={() => { setMunicipioSeleccionado(value.nombre); setObrasMunicipioSeleccionado(value.obras); }}>Ver Obras</button>
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
      <ModalObrasPorMunicipio
        isShowing={!!municipioSeleccionado}
        municipio={municipioSeleccionado || ''}
        obras={obrasMunicipioSeleccionado || []}
        onClose={() => setMunicipioSeleccionado(null)}
      />

    </>
  );
};

export default TablaMunicipiosConObras;