import { useState } from "react"
import type { ObraLinkDTO } from "../../domain/models/Obra"
import { fetchObrasPorMunicipio } from "../api/obras/obrasApi";

export const useObrasPorMunicipio = () => {

    const [ obras, setObras] = useState<ObraLinkDTO[]>([]);
    const [ loading, setloading] = useState<boolean>(false);

    const getObras = async (municipio: string) => {
        setloading(true);
        try {
            const data = await fetchObrasPorMunicipio(municipio);
            setObras(data);
        } catch (error) {
            console.error("Error al obtener las obras del municipio:", error);
        } finally {
            setloading(false);
        }

    }

    return { obras, loading, getObras };
}