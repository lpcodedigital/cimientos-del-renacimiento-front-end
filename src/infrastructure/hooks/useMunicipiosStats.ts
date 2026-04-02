import { useEffect, useState } from "react";
import type { MunicipioStadDTO } from "../../domain/models/Obra";
import { fetchMunicipiosStats } from "../api/obras/obrasApi";

export const useMunicipiosStats = () => {
    
    const [stats, setStats] = useState<MunicipioStadDTO[]>([]);
    const [ isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMunicipiosStats()
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
}