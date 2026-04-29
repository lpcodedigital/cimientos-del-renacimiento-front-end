import { useEffect, useState } from "react";
import {fetchCursos} from "../api/cursos/cursosApi";
import type { CursoPaginado } from "../../domain/models/Curso";

const useCursos = (page = 0, size = 10) => {
    const [data, setData] = useState<CursoPaginado | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchCursos(page, size)
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [page, size]);

    return { data, loading, error };
};

export default useCursos;