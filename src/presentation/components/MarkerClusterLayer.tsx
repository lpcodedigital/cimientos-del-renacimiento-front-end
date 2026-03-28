import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import useObras from "../../infrastructure/hooks/useObras";
import L from "leaflet";
import MarkerCustomIcon from "./MarkerCustomIcon";
import "../styles/Galeria.css"
import { useState } from "react";
import ModalGaleria from "./ModalGaleria";
import { useObraDetalle } from "../../infrastructure/hooks/useObraDetalle";
import type { ObraMapaDTO } from "../../domain/models/Obra";


const MarkerClusterLayer: React.FC = () => {

   const { obras, loading: loadingMapa } = useObras();
    const { obra, loading: loadingDetalle, getDetalle } = useObraDetalle();
    
    const [showModal, setShowModal] = useState(false);
    // Controlamos qué marcador tiene el popup abierto
    const [selectedMapa, setSelectedMapa] = useState<ObraMapaDTO | null>(null);

    const handleMarkerClick = (o: ObraMapaDTO) => {
        setSelectedMapa(o);
        getDetalle(o.id);
    };

    if (loadingMapa) return null;

    // Crea un ícono de cluster personalizado
    const createCustomClusterIcon = (cluster: any) => {
        const count = cluster.getChildCount();

        return L.divIcon({
            html: `
                <div class="custom-cluster-verde">
                ${count}
             </div>
             `,
            className: 'custom-cluster-icon',
            iconSize: L.point(40, 40, true),
        });
    };


    return (
        <>
            <MarkerClusterGroup 
            iconCreateFunction={createCustomClusterIcon}
                chunkedLoading 
                removeOutsideVisibleBounds={false}
                // @ts-ignore - Algunas versiones de tipos de cluster tienen conflictos menores
                animate={false} 
            >
                {obras.map((o) => (
                    <Marker
                        key={`marker-${o.id}`}
                        position={[o.latitude, o.longitude]}
                        icon={MarkerCustomIcon()}
                        eventHandlers={{
                            click: () => handleMarkerClick(o)
                        }}
                    />
                ))}
            </MarkerClusterGroup>

            {/* POPUP ÚNICO: Se posiciona dinámicamente */}
            {selectedMapa && (
                <Popup
                    position={[selectedMapa.latitude, selectedMapa.longitude]}
                    eventHandlers={{
                        remove: () => setSelectedMapa(null) // 💡 'remove' es el evento correcto en Leaflet
                    }}
                >
                    <div style={{ minWidth: '200px' }}>
                        <h6 style={{ margin: 0 }}>{selectedMapa.name}</h6>
                        <small>{selectedMapa.municipality}</small>
                        <hr />
                        
                        {loadingDetalle ? (
                            <p>⌛ Cargando detalles...</p>
                        ) : obra && obra.id === selectedMapa.id ? (
                            <div className="animate-fade-in">
                                <p style={{ fontSize: '0.8rem' }}>
                                    <b>Inversión:</b> ${obra.investment.toLocaleString()}<br />
                                    <b>Avance:</b> {obra.progress}%
                                </p>
                                <button
                                    className="button-btn-verde w-100"
                                    onClick={() => setShowModal(true)}
                                >
                                    Ver Imágenes
                                </button>
                            </div>
                        ) : (
                            <p className="small">Error al cargar datos</p>
                        )}
                    </div>
                </Popup>
            )}

            <ModalGaleria
                isShowing={showModal}
                onClose={() => setShowModal(false)}
                title={obra?.name || ""}
                imagenes={obra?.images.map(img => img.url) || []}
            />
        </>
    );

}

export default MarkerClusterLayer;