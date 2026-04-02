import type { ObraResponseDTO, ObraMapaDTO, MunicipioStadDTO, ObraLinkDTO } from "../../../domain/models/Obra";
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

/**
 * Fetch para obtener el total de obras por municipio, para mostrar en la tabla publica
 * @returns 
 */
export const fetchMunicipiosStats = async (): Promise<MunicipioStadDTO[]> => {
    const { data } = await axiosInstance.get<MunicipioStadDTO[]>(`/public/municipios/stats`)
    return data;
}

/**
 * Fetch para obtener las obras de un municipio, para mostrar en la tabla publica
 * @param municipio 
 * @returns 
 */
export const fetchObrasPorMunicipio = async (municipio: string): Promise<ObraLinkDTO[]> => {
    const { data } = await axiosInstance.get<ObraLinkDTO[]>(`/public/obra/municipio/${municipio}`)
    return data;
}

/**
 * Fetch para obtener el detalle de una obra específica de un municipio, para mostrar en la tabla publica
 * @param id 
 * @returns 
 */
export const fetchObraDetalleByMunicipio = async (id: number): Promise<ObraResponseDTO> => {
    const { data } = await axiosInstance.get<ObraResponseDTO>(`/public/obra/municipio-obra-detail/${id}`)
    return data;
}