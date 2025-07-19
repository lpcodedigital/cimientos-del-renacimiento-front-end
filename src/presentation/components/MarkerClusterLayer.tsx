import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import useObras from "../../infrastructure/hooks/useObras";
import L from "leaflet";
import MarkerCustomIcon from "./MarkerCustomIcon";
import "../styles/Galeria.css"
import { useState } from "react";
import ModalGaleria from "./ModalGaleria";


const MarkerClusterLayer: React.FC = () => {

    const { obras, loading, error } = useObras();
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ imagenesObra, setImagenesObra ] = useState<string[]>([]);
    const [ tituloObra, setTituloObra] = useState<string>('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error al cargar las obras: {error}</p>;

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
        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
            {obras.map((obra, index) => {

                if (!obra.latitude || !obra.longitude) return null;

                return (
                    <Marker
                        key={index}
                        position={[obra.latitude, obra.longitude]}
                        icon={MarkerCustomIcon()}
                    >
                        <Popup
                            autoClose={false}
                            closeOnClick={false}
                        >
                            <strong>Obra:{obra.nombre_de_obra}</strong><br />
                            <b>Municipio: {obra.nombre_municipio}</b><br />
                            <b>Ejecutora: {obra.nombre_de_ejecutora}</b><br />
                            <b>Inversión: {obra.inversion}</b><br />
                            <b>Avance: {obra.avance} %</b><br />
                            <small>Descripción: {obra.descripcion}</small><br />
                            {obra.imagenes.length !== 0 ? 
                            <button
                                onClick={ () => {
                                    setShowModal(true);
                                    setImagenesObra(obra.imagenes);
                                    setTituloObra(obra.nombre_de_obra)
                                }} 
                                className="button-btn-verde"
                            >
                                Ver Imágenes
                            </button>
                            : <p>No hay imágenes</p>}
                            
                        </Popup>
                    </Marker>
                )
            })}
            <ModalGaleria
                isShowing={showModal}
                onClose={() => setShowModal(false)}
                title={tituloObra}
                imagenes={imagenesObra}
            />
        </MarkerClusterGroup>
        
    )

}

export default MarkerClusterLayer;