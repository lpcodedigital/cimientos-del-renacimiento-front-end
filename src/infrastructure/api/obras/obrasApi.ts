import type { ObraResponseDTO, ObraMapaDTO } from "../../../domain/models/Obra";
import axiosInstance from "../axiosInstance";


/**
 * Fetches the obras data of Yucatan's obras from the server.
 * 
 * @returns A Promise that resolves to the GeoJSON data.
 * @throws An error if the request fails.
 */
export const fetchObrasMapa = async (): Promise<ObraMapaDTO[]> => {
    const { data } = await axiosInstance.get<ObraMapaDTO[]>("/public/obra/mapa")
    return data;
}

export const fetchObraDetalle = async (id: number): Promise<ObraResponseDTO> => {
    const { data } = await axiosInstance.get<ObraResponseDTO>(`/public/obra/detail/${id}`)
    return data;
}