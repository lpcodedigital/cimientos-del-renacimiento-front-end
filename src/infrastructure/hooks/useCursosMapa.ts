import { useEffect, useState } from "react";
import type { CursoMapaDTO } from "../../domain/models/Curso";
import { fetchCursosMapa } from "../api/cursos/cursosApi";

/**
 * Custom hook to fetch and manage the state of cursos data optimized for the map.
 * 
 * @returns 
 */
const  useCursosMapa = () => {

    const [cursosMapa, setCursosMapa] = useState<CursoMapaDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
     
    useEffect( () => {
        fetchCursosMapa()
            .then((response) => {
                setCursosMapa(response);
            }).catch((error) => {
                setError(error.message || "Error al conectar con el servidor");
            }).finally(() => {
                setLoading(false);
            });
        
    }, []);

    return { cursosMapa, loading, error };

};

export default useCursosMapa;