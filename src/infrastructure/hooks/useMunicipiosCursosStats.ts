import React, { useEffect, useState } from "react";
import type { MunicipioStatsDTO } from "../../domain/models/Curso";
import { fetchMunicipiosCursosStats } from "../api/cursos/cursosApi";

export const useMunicipiosCursosStats = () => {
    const [stats, setStats] = React.useState<MunicipioStatsDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMunicipiosCursosStats()
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error("Error al obtener las estadísticas de municipios:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { stats, isLoading };
};