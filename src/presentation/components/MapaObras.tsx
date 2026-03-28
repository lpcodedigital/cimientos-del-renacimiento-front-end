import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "../features/Mapa/Georeferencia.css"
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import useGeoZona from "../../infrastructure/hooks/useGeoZona";
import FiltroMuncipio from "./FiltroMunicipio";
import { getMunicipios, getGeoDataFiltrada, getStyleFiltroMuncipio, centrarMapaEnMunicipio } from "../../domain/services/municipioService";
import MarkerClusterLayer from "./MarkerClusterLayer";
import ButtonResetMap from "./ui/ButtonResetMap";


/**
 * Componente que renderiza un mapa de Leaflet con los municipios del estado de Yucatán, 
 * México. Permite filtrar por municipio y muestra la obra pública destacada de la ciudad 
 * de Mérida, Yucatán.
 * 
 * @returns {JSX.Element} Un JSX.Element que representa el componente.
 */
const MapaObras = () => {

    // Resolvemos el problema con los marcadores
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
        iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
        shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
    });

    // Declaración de constantes.
    const { geoData, loading, error } = useGeoZona();
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const mapRef = useRef<L.Map | null>(null);
    //const { obras, loading: loadingObras } = useObras();


    useEffect(() => {
        // Si no hay un municipio seleccionado o no hay datos de geojson,
        // no hay nada que hacer.
        if (!municipioSeleccionado || !geoData || !mapRef.current) {
            // En este caso, se vuelve al zoom y centro por defecto.
            mapRef.current?.setView([20.99, -89.63], 8);
            return;
        } else {
            // Si hay un municipio seleccionado y hay datos de geojson,
            // ajustamos el mapa para que se centre en el municipio seleccionado.
            centrarMapaEnMunicipio(mapRef.current, geoData, municipioSeleccionado);
        }

    }, [municipioSeleccionado, geoData]);

    // Validacione para cargar el geojson
    if (loading) return <div className="loading-map">Cargando capas geográficas...</div>;
    if (error) return <div className="error-map">Error: {error}</div>;

    // Obtenemos los nombres de los municipios
    const municipios = getMunicipios(geoData)

    // Filtramos y obtenemos la geoData (GeoJSON) para mostrar un municipio en caso de ser seleccionado.
    const geoDataFiltrada = getGeoDataFiltrada(geoData, municipioSeleccionado);

    return (

        <div className="mapa-obra-section">

            <FiltroMuncipio
                municipios={municipios}
                selected={municipioSeleccionado}
                onChangeSelected={setMunicipioSeleccionado}
                isShowingFilter={showFilter}
                onChangeShowFilter={setShowFilter}
            />

            <MapContainer
                ref={mapRef}
                center={[20.96737, -89.59259]}// Coordenadas de Mérida, Yucatán
                zoom={8}
                scrollWheelZoom={true}
                style={{ height: '500px', width: '100%' }}
                trackResize={true} 
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Cargamos el GeoJSON con la capa de los municipio */}
                <GeoJSON data={geoDataFiltrada}

                    style={(feature) => getStyleFiltroMuncipio(feature, municipioSeleccionado)}
                    // Mostramos el popup con el nombre del municipio
                    onEachFeature={(feature, layer) => {
                        const municipio = feature.properties?.NOMGEO;
                        // 💡 SOLUCIÓN AL CONFLICTO DE POPUPS:
                        // Usamos Tooltip para municipios. Así no cierran el Popup de las obras.
                        layer.bindTooltip(`<strong>${municipio}</strong>`, {
                            sticky: true,
                            direction: 'top',
                            opacity: 0.9
                        });

                        // El clic en el municipio ahora es informativo o funcional, 
                        // pero no compite por el Popup global.
                        layer.on("click", (e) => {
                            L.DomEvent.stopPropagation(e);
                            setMunicipioSeleccionado(municipio);
                        });

                    }}


                />

                <MarkerClusterLayer />
                <ButtonResetMap />

            </MapContainer>

            {/* Lightbox modal */}
                                        <div id="lightbox" style={{ display: 'none' }}  className="popup-gallery">
                                            <img id="lightbox-img" />
                                        </div>

        </div>

    )
};

export default MapaObras;