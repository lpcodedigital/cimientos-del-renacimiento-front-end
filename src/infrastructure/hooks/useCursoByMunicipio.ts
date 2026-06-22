import { useState } from "react";
import type { CursoLinkDTO } from "../../domain/models/Curso";
import { fetchCursoPorMunicipio } from "../api/cursos/cursosApi";

export const useCursoByMunicipio = () => {
    const [cursos, setCursos] = useState<CursoLinkDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const getCursos = (municipio: string) => {
        setLoading(true);
        fetchCursoPorMunicipio(municipio)
            .then((data) => {
                setCursos(data);
            })
            .catch((err) => {
                console.error("Error al cargar los cursos por municipio:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { cursos, loading, getCursos };
};