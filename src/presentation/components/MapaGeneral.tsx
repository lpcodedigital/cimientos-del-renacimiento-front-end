/// <reference types="google.maps" />
import { useState, useEffect } from "react";
import "../features/Mapa/Georeferencia.css";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import useGeoZona from "../../infrastructure/hooks/useGeoZona";
import FiltroMuncipio from "./FiltroMunicipio";
import { getMunicipios } from "../../domain/services/municipioService";
import MarkerClusterLayer from "./MarkerClusterLayer";
import ButtonResetMap from "./ui/ButtonResetMap";
import Actions from "./Actions";

/**
 * Subcomponente interno para manejar de forma declarativa e imperativa
 * el GeoJSON de los municipios en Google Maps.
 */
/**
 * Subcomponente interno para manejar de forma declarativa e imperativa
 * el GeoJSON de los municipios en Google Maps.
 */
const CapaGeoJsonGoogle = ({ geoData, municipioSeleccionado, onMunicipioClick }: { 
    geoData: any; 
    municipioSeleccionado: string | null;
    onMunicipioClick: (municipio: string) => void;
}) => {
    const map = useMap();

    useEffect(() => {
        // 1. Verificación básica de existencia del mapa y los datos de Yucatán
        if (!map || !geoData) return;

        // 2. Blindaje para evitar caídas si el GeoJSON viene corrupto
        if (
            typeof geoData !== 'object' || 
            (geoData.type !== 'FeatureCollection' && geoData.type !== 'Feature')
        ) {
            console.warn("⚠️ SIB-CR: geoData no tiene un formato válido para Google Maps.");
            map.data.forEach((feature) => map.data.remove(feature));
            return;
        }

        try {
            // Limpiamos capas previas para evitar duplicar polígonos en memoria
            map.data.forEach((feature) => map.data.remove(feature));

            // Cargamos TODOS los municipios
            map.data.addGeoJson(geoData);

            // 💡 SOLUCIÓN CORREGIDA AL ERROR DE PROPIEDADES:
            map.data.setStyle((feature: any) => {
                // Extraemos la propiedad NOMGEO de forma nativa en Google Maps
                const nombreMunicipio = feature.getProperty("NOMGEO");

                // Evaluamos si esta feature es el municipio que el usuario seleccionó
                const esElSeleccionado = municipioSeleccionado && nombreMunicipio === municipioSeleccionado;

                if (esElSeleccionado) {
                    // Si es el seleccionado, aplicamos el resaltado amarillo inmediatamente
                    return {
                        fillColor: "#ffff05",     // Amarillo cálido (Amber 400)
                        fillOpacity: 0.45,        // Más opaco para resaltar
                        strokeColor: "#D97706",    // Borde naranja oscuro para contraste
                        strokeWeight: 3.5,         // Borde grueso
                        zIndex: 10                 // Asegura que quede por encima de los demás
                    };
                }

                // Si no es el seleccionado, construimos el objeto simulado que espera tu servicio de Leaflet.
                // Como getStyleFiltroMuncipio espera un formato { properties: { ... } }, se lo armamos manualmente:
                //const propiedadesSimuladas = {
                //    properties: {
                //        NOMGEO: nombreMunicipio
                //        // Si el servicio requiere más propiedades de la capa (ej: CVE_MUN), se puede agregar aquí usando:
                //        // CVE_MUN: feature.getProperty("CVE_MUN")
                //    }
                //};

                //const estiloLeaflet = getStyleFiltroMuncipio(propiedadesSimuladas, municipioSeleccionado);
                
                return {
                    // 💡 FORZAMOS COLOR CREMA/ARENA DIRECTAMENTE:
                    fillColor: "rgb(239, 183, 100)",
                    
                    // 💡 FORZAMOS EL 25% DE TRANSPARENCIA:
                    fillOpacity: 0.75,
                    
                    // 💡 FORZAMOS LA LÍNEA BLANCA:
                    strokeColor: "#FFFFFF",
                    
                    // 💡 FORZAMOS UN GROSOR CONSIDERABLE (Prueba con 2.0 o 2.5):
                    strokeWeight: 2.5,
                    
                    zIndex: 1
                };
            });

            // Configuración del click sobre cualquier polígono del mapa
            google.maps.event.clearListeners(map.data, 'click');
            map.data.addListener("click", (e: any) => {
                const municipioNom = e.feature.getProperty("NOMGEO");
                if (municipioNom) {
                    onMunicipioClick(municipioNom);
                }
            });

        } catch (geojsonError) {
            console.error("❌ Error al aplicar estilos en Google Maps:", geojsonError);
        }

    }, [map, geoData, municipioSeleccionado]); // Se vuelve a ejecutar y pintar cada vez que cambia el filtro de React

    return null;
};

/**
 * Escucha cambios del municipio seleccionado para animar el paneo/zoom en Google Maps.
 */
const ManejadorEfectosMapa = ({ municipioSeleccionado, geoData }: { municipioSeleccionado: string | null; geoData: any }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        if (!municipioSeleccionado || !geoData) {
            // Regresar a la vista global de Yucatán si se limpia el filtro
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

        if (!bounds.isEmpty()) {
            // Enfoca suavemente los límites geográficos del municipio seleccionado
            map.fitBounds(bounds);
        }
    }, [municipioSeleccionado, geoData, map]);

    return null;
};

const MapaGeneral = () => {
    const { geoData, loading, error } = useGeoZona();
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

    if (loading) return <div className="loading-map">Cargando capas geográficas...</div>;
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
                        mapId="SIB_RENACIMIENTO_MAP"
                    >
                        {/* 💡 CAMBIO AQUÍ: Enviamos 'geoData' completo para mantener todos los municipios pintados */}
                        <CapaGeoJsonGoogle 
                            geoData={geoData} 
                            municipioSeleccionado={municipioSeleccionado}
                            onMunicipioClick={setMunicipioSeleccionado}
                        />
                        
                        <ManejadorEfectosMapa 
                            municipioSeleccionado={municipioSeleccionado} 
                            geoData={geoData} 
                        />

                        <MarkerClusterLayer type="general" />
                        <ButtonResetMap />
                    </Map>
                </div>

                <Actions/>

                <div id="lightbox" style={{ display: 'none' }} className="popup-gallery">
                    <img id="lightbox-img" alt="Lightbox" />
                </div>
            </div>
        </APIProvider>
    );
};

export default MapaGeneral;