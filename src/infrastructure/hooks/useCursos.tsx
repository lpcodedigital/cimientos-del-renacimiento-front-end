import { useEffect, useState } from "react";
import fetchCursos from "../api/cursos/cursosApi";
import type { Curso, CursoElement } from "../../domain/models/Curso";

const useCursos = () => {
     
    const [data, setData] = useState<Curso>();

    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
     
    useEffect( () => {
        fetchCursos().then((response) => {
            setData(response);
            setLoading(false);
        }).catch((error) => {
            console.error('Error cargando cursos:', error);
            setError(error.message);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
        
    }, []);   

    return { data, loading, error };

};

export default useCursos;