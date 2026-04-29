import { useState, useEffect } from "react";
import type { CursoDetalleDTO } from "../../domain/models/Curso";
import { fetchCursoDetail } from "../api/cursos/cursosApi";

export const useCursoDetalle = (id: number | null) => {
    const [curso, setCurso] = useState<CursoDetalleDTO | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchCursoDetail(id).then(res => {
            setCurso(res);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    return { curso, loading };
};