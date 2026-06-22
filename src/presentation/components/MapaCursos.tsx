/// <reference types="google.maps" />
import { useState, useEffect } from "react";
import "../features/Mapa/Georeferencia.css";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import useGeoZona from "../../infrastructure/hooks/useGeoZona";
import FiltroMuncipio from "./FiltroMunicipio";
import { getMunicipios } from "../../domain/services/municipioService";
import MarkerClusterLayer from "./MarkerClusterLayer";
import ButtonResetMap from "./ui/ButtonResetMap";

const CapaGeoJsonGoogle = ({ geoData, municipioSeleccionado, onMunicipioClick }: { 
    geoData: any; 
    municipioSeleccionado: string | null;
    onMunicipioClick: (municipio: string) => void;
}) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !geoData) return;
        if (typeof geoData !== 'object' || (geoData.type !== 'FeatureCollection' && geoData.type !== 'Feature')) {
            console.warn("⚠️ SIB-CR: geoData no tiene un formato válido para Google Maps.");
            map.data.forEach((feature) => map.data.remove(feature));
            return;
        }

        try {
            map.data.forEach((feature) => map.data.remove(feature));
            map.data.addGeoJson(geoData);

            map.data.setStyle((feature: any) => {
                const nombreMunicipio = feature.getProperty("NOMGEO");
                const esElSeleccionado = municipioSeleccionado && nombreMunicipio === municipioSeleccionado;

                if (esElSeleccionado) {
                    return {
                        fillColor: "#ffff05",
                        fillOpacity: 0.45,
                        strokeColor: "#D97706",
                        strokeWeight: 3.5,
                        zIndex: 10
                    };
                }
                
                return {
                    fillColor: "rgb(239, 183, 100)",
                    fillOpacity: 0.75,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2.5,
                    zIndex: 1
                };
            });

            google.maps.event.clearListeners(map.data, 'click');
            map.data.addListener("click", (e: any) => {
                const municipioNom = e.feature.getProperty("NOMGEO");
                if (municipioNom) onMunicipioClick(municipioNom);
            });

        } catch (geojsonError) {
            console.error("❌ Error al aplicar estilos en Google Maps:", geojsonError);
        }
    }, [map, geoData, municipioSeleccionado]);

    return null;
};

const ManejadorEfectosMapa = ({ municipioSeleccionado, geoData }: { municipioSeleccionado: string | null; geoData: any }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (!municipioSeleccionado || !geoData) {
            map.setCenter({ lat: 20.96737, lng: -89.59259 });
            map.setZoom(8);
            return;
        }

        const bounds = new google.maps.LatLngBounds();
        geoData.features.forEach((feature: any) => {
            if (feature.properties?.NOMGEO === municipioSeleccionado) {
                if (feature.geometry.type === "Polygon") {
                    feature.geometry.coordinates[0].forEach((coord: any) => {
                        bounds.extend({ lat: coord[1], lng: coord[0] });
                    });
                } else if (feature.geometry.type === "MultiPolygon") {
                    feature.geometry.coordinates.forEach((polygon: any) => {
                        polygon[0].forEach((coord: any) => {
                            bounds.extend({ lat: coord[1], lng: coord[0] });
                        });
                    });
                }
            }
        });

        if (!bounds.isEmpty()) map.fitBounds(bounds);
    }, [municipioSeleccionado, geoData, map]);

    return null;
};

const MapaCursos = () => {
    const { geoData, loading, error } = useGeoZona();
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

    if (loading) return <div className="loading-map">Cargando capas geográficas de capacitaciones...</div>;
    if (error) return <div className="error-map">Error: {error}</div>;

    const municipios = getMunicipios(geoData);

    return (
        <APIProvider apiKey={apiKey}>
            <div className="mapa-obra-section">
                <FiltroMuncipio
                    municipios={municipios}
                    selected={municipioSeleccionado}
                    onChangeSelected={setMunicipioSeleccionado}
                    isShowingFilter={showFilter}
                    onChangeShowFilter={setShowFilter}
                />

                <div style={{ height: "500px", width: "100%", position: "relative" }}>
                    <Map
                        defaultCenter={{ lat: 20.96737, lng: -89.59259 }}
                        defaultZoom={8}
                        gestureHandling={"cooperative"}
                        disableDefaultUI={false}
                        mapId="SIB_CURSOS_MAP" // 💡 MapID Único e Independiente
                    >
                        <CapaGeoJsonGoogle 
                            geoData={geoData} 
                            municipioSeleccionado={municipioSeleccionado}
                            onMunicipioClick={setMunicipioSeleccionado}
                        />
                        
                        <ManejadorEfectosMapa 
                            municipioSeleccionado={municipioSeleccionado} 
                            geoData={geoData} 
                        />

                        <MarkerClusterLayer type="cursos" />
                        <ButtonResetMap />
                    </Map>
                </div>

                <div id="lightbox" style={{ display: 'none' }} className="popup-gallery">
                    <img id="lightbox-img" alt="Lightbox" />
                </div>
            </div>
        </APIProvider>
    );
};

export default MapaCursos;