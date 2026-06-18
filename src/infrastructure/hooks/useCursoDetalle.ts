import { useState } from "react";
import type { CursoDetalleDTO } from "../../domain/models/Curso";
import { fetchCursoDetail } from "../api/cursos/cursosApi";

export const useCursoDetalle = () => {
    const [curso, setCurso] = useState<CursoDetalleDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDetalle = (id: number) => {
        setLoading(true);
        setError(null);
        fetchCursoDetail(id)
            .then((data) => {
                setCurso(data);
            })
            .catch((err) => {
                console.error("Error al cargar el detalle del curso:", err);
                setError(err.message || "Error al conectar con el servidor");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetDetalle = () => setCurso(null);

    return { curso, loading, error, getDetalle, setCurso, resetDetalle };
};