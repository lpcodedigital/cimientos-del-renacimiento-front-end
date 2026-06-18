/// <reference types="google.maps" />
import React, { useEffect, useState, useRef } from "react";
import { useMap, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";

import useObras from "../../infrastructure/hooks/useObras";
import { useObraDetalle } from "../../infrastructure/hooks/useObraDetalle";
import useCursosMapa from "../../infrastructure/hooks/useCursosMapa";
import { useCursoDetalle } from "../../infrastructure/hooks/useCursoDetalle";

import ModalGaleria from "./ModalGaleria";
import type { ObraMapaDTO } from "../../domain/models/Obra";
import type { CursoMapaDTO } from "../../domain/models/Curso";
import "../styles/Galeria.css";

interface MarkerClusterLayerProps {
    type?: "general" | "obras" | "cursos";
}

// 🎨 TU ESTILO ORIGINAL: Círculo Guinda/Vino para Obras
const obrasRenderer = {
    render: ({ count, position }: any) => {
        const colorObra = "#901b45"; 
        const svg = window.btoa(`
            <svg fill="${colorObra}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
                <circle cx="12" cy="12" r="10" fill="${colorObra}" stroke="#ffffff" stroke-width="2.5"/>
                <text x="50%" y="55%" font-size="10" font-family="Arial" font-weight="bold" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">${count}</text>
            </svg>
        `);
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${svg}`;
        return new google.maps.marker.AdvancedMarkerElement({ position, content: img, zIndex: 1000 + count });
    }
};

// 🎨 TU ESTILO ORIGINAL: Círculo Morado para Capacitaciones
const capacitacionesRenderer = {
    render: ({ count, position }: any) => {
        const colorCurso = "#7C3AED"; 
        const svg = window.btoa(`
            <svg fill="${colorCurso}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
                <circle cx="12" cy="12" r="10" fill="${colorCurso}" stroke="#ffffff" stroke-width="2.5"/>
                <text x="50%" y="55%" font-size="10" font-family="Arial" font-weight="bold" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">${count}</text>
            </svg>
        `);
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${svg}`;
        return new google.maps.marker.AdvancedMarkerElement({ position, content: img, zIndex: 1000 + count });
    }
};

const MarkerClusterLayer: React.FC<MarkerClusterLayerProps> = ({ type = "general" }) => {
    const map = useMap();
    
    const showObras = type === "general" || type === "obras";
    const showCursos = type === "general" || type === "cursos";

    const { obras, loading: loadingObras } = useObras();
    const { obra, loading: loadingObraDetalle, getDetalle: getObraDetalle } = useObraDetalle();
    const [selectedObra, setSelectedObra] = useState<ObraMapaDTO | null>(null);
    const [obraMarkers, setObraMarkers] = useState<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});
    
    const { cursosMapa, loading: loadingCursos } = useCursosMapa();
    const { curso, loading: loadingCursoDetalle, getDetalle: getCursoDetalle } = useCursoDetalle();
    const [selectedCurso, setSelectedCurso] = useState<CursoMapaDTO | null>(null);
    const [cursoMarkers, setCursoMarkers] = useState<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<{ title: string; images: string[] }>({ title: "", images: [] });

    const obrasClustererRef = useRef<MarkerClusterer | null>(null);
    const cursosClustererRef = useRef<MarkerClusterer | null>(null);

    const handleClusterClickAction = (cluster: any, mapInstance: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds();
        cluster.markers?.forEach((marker: any) => {
            const advMarker = marker as unknown as google.maps.marker.AdvancedMarkerElement;
            if (advMarker && advMarker.position) bounds.extend(advMarker.position);
        });
        mapInstance.fitBounds(bounds);
        if (mapInstance.getZoom() && mapInstance.getZoom()! >= 18) {
            mapInstance.setZoom(mapInstance.getZoom()! + 1);
        }
    };

    // 1. Inicializar Clusterer de Obras
    useEffect(() => {
        if (!map || obrasClustererRef.current) return;
        obrasClustererRef.current = new MarkerClusterer({ 
            map,
            algorithm: new SuperClusterAlgorithm({ radius: 60 }), 
            renderer: obrasRenderer,
            onClusterClick: (_e, cluster, mapInst) => handleClusterClickAction(cluster, mapInst)
        });
    }, [map]);

    // 2. Inicializar Clusterer de Cursos
    useEffect(() => {
        if (!map || cursosClustererRef.current) return;
        cursosClustererRef.current = new MarkerClusterer({ 
            map,
            algorithm: new SuperClusterAlgorithm({ radius: 60 }), 
            renderer: capacitacionesRenderer,
            onClusterClick: (_e, cluster, mapInst) => handleClusterClickAction(cluster, mapInst)
        });
    }, [map]);

    // 3. Sincronizar Marcadores de Obras con su Clusterer
    useEffect(() => {
        if (!obrasClustererRef.current) return;
        obrasClustererRef.current.clearMarkers();
        if (showObras) {
            obrasClustererRef.current.addMarkers(Object.values(obraMarkers));
        }
    }, [obraMarkers, showObras]);

    // 4. Sincronizar Marcadores de Cursos con su Clusterer
    useEffect(() => {
        if (!cursosClustererRef.current) return;
        cursosClustererRef.current.clearMarkers();
        if (showCursos) {
            cursosClustererRef.current.addMarkers(Object.values(cursoMarkers));
        }
    }, [cursoMarkers, showCursos]);

    const handleObraClick = (o: ObraMapaDTO) => {
        setSelectedCurso(null);
        setSelectedObra(o);
        getObraDetalle(o.id);
    };

    const handleCursoClick = (c: CursoMapaDTO) => {
        setSelectedObra(null);
        setSelectedCurso(c);
        getCursoDetalle(c.id);
    };

    const abrirGaleriaObra = () => {
        if (!obra) return;
        setModalData({ title: obra.name, images: obra.images.map(img => img.url) });
        setShowModal(true);
    };

    const abrirGaleriaCurso = () => {
        if (!curso) return;
        setModalData({ title: curso.title, images: curso.images.map(img => img.url) });
        setShowModal(true);
    };

    if ((showObras && loadingObras) || (showCursos && loadingCursos)) return null;

    return (
        <>
            {/* 🚧 CAPA DE OBRAS */}
            {showObras && obras.map((o) => (
                <AdvancedMarker
                    key={`obra-marker-${o.id}`}
                    position={{ lat: o.latitude, lng: o.longitude }}
                    title={o.name}
                    ref={(markerInstance) => {
                        // 💡 SOLUCIÓN ULTRAESTRICTA CONTRA BUCLE INFINITO Y FALLO DE GRUPOS:
                        // Solo actualizamos el estado si la instancia física cambió o no existía.
                        if (markerInstance && obraMarkers[o.id] !== markerInstance) {
                            setObraMarkers(prev => {
                                if (prev[o.id] === markerInstance) return prev;
                                return { ...prev, [o.id]: markerInstance };
                            });
                        }
                    }}
                    onClick={() => handleObraClick(o)}
                >
                    <div style={pinStyle("#901b45")}>
                        <span>🚧</span>
                        <span style={{ fontSize: "10px" }}>Obra</span>
                    </div>
                </AdvancedMarker>
            ))}

            {/* 🎓 CAPA DE CAPACITACIONES */}
            {showCursos && cursosMapa.map((c) => (
                <AdvancedMarker
                    key={`curso-marker-${c.id}`}
                    position={{ lat: c.latitude, lng: c.longitude }}
                    title={c.title}
                    ref={(markerInstance) => {
                        // 💡 SOLUCIÓN ULTRAESTRICTA CONTRA BUCLE INFINITO Y FALLO DE GRUPOS:
                        // Solo actualizamos el estado si la instancia física cambió o no existía.
                        if (markerInstance && cursoMarkers[c.id] !== markerInstance) {
                            setCursoMarkers(prev => {
                                if (prev[c.id] === markerInstance) return prev;
                                return { ...prev, [c.id]: markerInstance };
                            });
                        }
                    }}
                    onClick={() => handleCursoClick(c)}
                >
                    <div style={pinStyle("#7C3AED")}>
                        <span>🎓</span>
                        <span style={{ fontSize: "10px" }}>Capacitación</span>
                    </div>
                </AdvancedMarker>
            ))}

            {selectedObra && (
                <InfoWindow
                    position={{ lat: selectedObra.latitude, lng: selectedObra.longitude }}
                    onCloseClick={() => setSelectedObra(null)}
                >
                    <div style={{ minWidth: "220px", color: "#333" }}>
                        <h6 style={{ margin: 0, fontWeight: "bold" }}>{selectedObra.name}</h6>
                        <small className="text-muted">{selectedObra.municipality}</small>
                        <hr style={{ margin: "8px 0" }} />
                        {loadingObraDetalle ? (
                            <p style={{ margin: 0 }}>⌛ Cargando obras...</p>
                        ) : obra && obra.id === selectedObra.id ? (
                            <div className="animate-fade-in">
                                <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>
                                    <b>Inversión:</b> ${obra.investment.toLocaleString()}<br />
                                    <b>Avance:</b> {obra.progress}%
                                </p>
                                <button className="w-100 btn btn-sm text-white" style={{ backgroundColor: "#047857" }} onClick={abrirGaleriaObra}>
                                    Ver Imágenes
                                </button>
                            </div>
                        ) : (
                            <p className="small text-danger" style={{ margin: 0 }}>Error al cargar datos</p>
                        )}
                    </div>
                </InfoWindow>
            )}

            {selectedCurso && (
                <InfoWindow
                    position={{ lat: selectedCurso.latitude, lng: selectedCurso.longitude }}
                    onCloseClick={() => setSelectedCurso(null)}
                >
                    <div style={{ minWidth: "220px", color: "#333" }}>
                        <h6 style={{ margin: 0, fontWeight: "bold" }}>{selectedCurso.title}</h6>
                        <small className="text-muted">{selectedCurso.municipalityName}</small>
                        <hr style={{ margin: "8px 0" }} />
                        {loadingCursoDetalle ? (
                            <p style={{ margin: 0 }}>⌛ Cargando taller...</p>
                        ) : curso && curso.id === selectedCurso.id ? (
                            <div className="animate-fade-in">
                                <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0", maxHeight: "60px", overflowY: "auto" }}>
                                    {curso.description}
                                </p>
                                <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>
                                    <b>Fecha:</b> {new Date(curso.courseDate).toLocaleDateString("es-MX")}
                                </p>
                                <button className="w-100 btn btn-sm text-white" style={{ backgroundColor: "#047857" }} onClick={abrirGaleriaCurso}>
                                    Ver Imágenes
                                </button>
                            </div>
                        ) : (
                            <p className="small text-danger" style={{ margin: 0 }}>Error al cargar datos</p>
                        )}
                    </div>
                </InfoWindow>
            )}

            <ModalGaleria isShowing={showModal} onClose={() => setShowModal(false)} title={modalData.title} imagenes={modalData.images} />
        </>
    );
};

const pinStyle = (backgroundColor: string): React.CSSProperties => ({
    background: backgroundColor,
    color: "white",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "2px solid white",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    whiteSpace: "nowrap"
});

export default MarkerClusterLayer;