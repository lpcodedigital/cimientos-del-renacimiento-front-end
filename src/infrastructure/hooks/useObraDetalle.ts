import { useCallback, useState } from "react";
import type { ObraResponseDTO } from "../../domain/models/Obra";
import { fetchObraDetalle } from "../api/obras/obrasApi";

export const useObraDetalle = () => {
    const [obra, setObra] = useState<ObraResponseDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getDetalle = useCallback(async (id: number) => {
        setLoading(true);
        try {
            const data = await fetchObraDetalle(id);
            setObra(data);
        } catch (error) {
            console.error("Error al hidratar la obra:", error);
        } finally {
            setLoading(false);
        }
        console.log(obra);

    }, []);

    const resetDetalle = () => setObra(null);

    return { obra, loading, getDetalle, resetDetalle };

}