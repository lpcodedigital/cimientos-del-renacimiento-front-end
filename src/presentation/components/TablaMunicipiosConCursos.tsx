import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { useMunicipiosCursosStats } from "../../infrastructure/hooks/useMunicipiosCursosStats";
import '../styles/TablaMunicipiosConObras.css'; // Reutiliza tus estilos base de tablas
import NormalizeText from "./utils/NormalizeText";
import usePagination from "../hooks/usePagination";
import InputFiltroTabla from "./InputFiltroTabla";
import PaginacionTabla from "./PaginacionTabla";
import ModalCursosPorMunicipio from "./ModalCursosPorMunicipio";

const TablaMunicipiosConCursos: React.FC = () => {
    const { stats: municipiosConCursos, isLoading } = useMunicipiosCursosStats();
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);

    const [paginaActual, setPaginaActual] = useState<number>(1);
    const elementosPorPagina = 20;
    const [busqueda, setBusqueda] = useState("");

    const refTable = useRef<HTMLDivElement>(null);

    useEffect(() => {
        refTable.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [paginaActual]);

    const municipiosFiltrados = municipiosConCursos.filter((muni) =>
        NormalizeText(muni.nombre).includes(NormalizeText(busqueda))
    );

    const { totalPages: totalPaginas, items: municipiosPorPagina } = usePagination(
        municipiosFiltrados, 
        paginaActual, 
        elementosPorPagina
    );

    if (isLoading) return <p className="text-center p-4">Cargando estadísticas de capacitaciones...</p>;

    return (
        <>
            <div>
                <InputFiltroTabla
                    busqueda={busqueda}
                    onChange={(nuevoValor) => {
                        setBusqueda(nuevoValor);
                        setPaginaActual(1);
                    }} 
                />
            </div>

            <div ref={refTable} className="contenedor-tabla-municipios-obras">
                <Table striped bordered hover className="tabla-municipios-obras">
                    <thead>
                        <tr>
                            <th>Municipio</th>
                            <th>Total de Capacitaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {municipiosPorPagina.map((value, idx) => (
                            <tr key={`muni-row-${idx}`}>
                                <td>{value.nombre}</td>
                                <td>{value.totalObras}</td> {/* Se lee de totalObras acorde a tu DTO */}
                                <td>
                                    <button 
                                        className="button-btn-verde"  // Color morado corporativo de cursos
                                        onClick={() => setMunicipioSeleccionado(value.nombre)}
                                    >
                                        Ver cursos
                                    </button>
                                </td>
                            </tr>
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

            <ModalCursosPorMunicipio
                isShowing={!!municipioSeleccionado}
                municipio={municipioSeleccionado || ''}
                onClose={() => setMunicipioSeleccionado(null)}
            />
        </>
    );
};

export default TablaMunicipiosConCursos;