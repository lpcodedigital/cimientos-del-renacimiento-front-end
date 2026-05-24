/// <reference types="google.maps" />
import React, { useEffect, useState, useRef } from "react";
import { useMap, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
import useObras from "../../infrastructure/hooks/useObras";
import { useObraDetalle } from "../../infrastructure/hooks/useObraDetalle";
import ModalGaleria from "./ModalGaleria";
import type { ObraMapaDTO } from "../../domain/models/Obra";
import "../styles/Galeria.css";

const MarkerClusterLayer: React.FC = () => {
    const map = useMap();
    const { obras, loading: loadingMapa } = useObras();
    const { obra, loading: loadingDetalle, getDetalle } = useObraDetalle();

    const [showModal, setShowModal] = useState(false);
    const [selectedMapa, setSelectedMapa] = useState<ObraMapaDTO | null>(null);

    const [markers, setMarkers] = useState<{ [key: string]: google.maps.marker.AdvancedMarkerElement }>({});
    const clustererRef = useRef<MarkerClusterer | null>(null);

    // Inicializar o actualizar el MarkerClusterer con eventos de zoom
    useEffect(() => {
        if (!map) return;
        
        if (!clustererRef.current) {
            clustererRef.current = new MarkerClusterer({ 
                map,
                // Utilizaremos un algoritmo más avanzado similar al de Leaflet
                algorithm: new SuperClusterAlgorithm({ radius: 60 }), 
                onClusterClick: (_event, cluster, mapInstance) => {
    // 💡 SOLUCIÓN AL TIPO DE MARCADOR AVANZADO:
    const bounds = new google.maps.LatLngBounds();
    
    cluster.markers?.forEach(marker => {
        // En AdvancedMarkerElement accedemos directamente a la propiedad .position 
        // (y la casteamos de forma segura si TypeScript se queja del tipo extendido)
        const advMarker = marker as unknown as google.maps.marker.AdvancedMarkerElement;
        
        if (advMarker && advMarker.position) {
            bounds.extend(advMarker.position);
        }
    });

    // Ajustamos el mapa de forma fluida para dispersar el cluster
    mapInstance.fitBounds(bounds);

    // Si ya estamos muy cerca y siguen agrupados (coordenadas idénticas), forzamos un paso más
    if (mapInstance.getZoom() && mapInstance.getZoom()! >= 18) {
        mapInstance.setZoom(mapInstance.getZoom()! + 1);
    }
}
            });
        }
    }, [map]);

    // Sincronizar el set de marcadores vivos con el Clusterer
    useEffect(() => {
        if (!clustererRef.current) return;

        clustererRef.current.clearMarkers();
        const markerArray = Object.values(markers);
        clustererRef.current.addMarkers(markerArray);
        
    }, [markers]);

    const handleMarkerClick = (o: ObraMapaDTO) => {
        setSelectedMapa(o);
        getDetalle(o.id);
    };

    if (loadingMapa) return null;

    return (
        <>
            {obras.map((o) => (
                <AdvancedMarker
                    key={`marker-${o.id}`}
                    position={{ lat: o.latitude, lng: o.longitude }}
                    title={o.name}
                    ref={(markerInstance) => {
                        if (markerInstance && !markers[o.id]) {
                            setMarkers(prev => ({ ...prev, [o.id]: markerInstance }));
                        }
                    }}
                    onClick={() => handleMarkerClick(o)}
                />
            ))}

            {selectedMapa && (
                <InfoWindow
                    position={{ lat: selectedMapa.latitude, lng: selectedMapa.longitude }}
                    onCloseClick={() => setSelectedMapa(null)}
                >
                    <div style={{ minWidth: "200px", color: "#333" }}>
                        <h6 style={{ margin: 0, fontWeight: "bold" }}>{selectedMapa.name}</h6>
                        <small className="text-muted">{selectedMapa.municipality}</small>
                        <hr style={{ margin: "8px 0" }} />

                        {loadingDetalle ? (
                            <p style={{ margin: 0 }}>⌛ Cargando detalles...</p>
                        ) : obra && obra.id === selectedMapa.id ? (
                            <div className="animate-fade-in">
                                <p style={{ fontSize: "0.8rem", margin: "0 0 8px 0" }}>
                                    <b>Inversión:</b> ${obra.investment.toLocaleString()}<br />
                                    <b>Avance:</b> {obra.progress}%
                                </p>
                                <button
                                    className="button-btn-verde w-100 btn btn-sm text-white"
                                    style={{ backgroundColor: "#047857" }}
                                    onClick={() => setShowModal(true)}
                                >
                                    Ver Imágenes
                                </button>
                            </div>
                        ) : (
                            <p className="small text-danger" style={{ margin: 0 }}>Error al cargar datos</p>
                        )}
                    </div>
                </InfoWindow>
            )}

            <ModalGaleria
                isShowing={showModal}
                onClose={() => setShowModal(false)}
                title={obra?.name || ""}
                imagenes={obra?.images.map((img) => img.url) || []}
            />
        </>
    );
};

export default MarkerClusterLayer;