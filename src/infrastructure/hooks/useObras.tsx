import { useEffect, useState } from "react";
import type { ObraMapaDTO } from "../../domain/models/Obra";
import { fetchObrasMapa } from "../api/obras/obrasApi";

/**
 * Custom hook to fetch and manage the state of obras data.
 *
 * @returns An object containing:
 * - obras: An array of Obra objects representing the obras data fetched from the server.
 * - loading: A boolean indicating the loading state of the fetch operation.
 * - error: A string containing the error message if the fetch operation fails, otherwise null.
 */

const useObras = () => {
     
    const [obras, setObras] = useState<ObraMapaDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
     
    useEffect( () => {
        fetchObrasMapa()
            .then((response) => {
                setObras(response);
            }).catch((error) => {
                setError(error.message || "Error al conectar con el servidor");
            }).finally(() => {
                setLoading(false);
            });
        
    }, []);   

    return { obras, loading, error };

};

export default useObras;