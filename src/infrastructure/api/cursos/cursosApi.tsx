import type { CursoDetalleDTO, CursoLinkDTO, CursoMapaDTO, CursoPaginado, MunicipioStatsDTO } from "../../../domain/models/Curso";
import axiosInstance from "../axiosInstance";

export const fetchCursos = async (page = 0, size = 10): Promise<CursoPaginado> => {
    try {
        // Usamos el nuevo endpoint público
        const response = await axiosInstance.get<CursoPaginado>(`/public/curso/list`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.error('Error al cargar los cursos desde el API:', error);
        throw error;
    }
}

export const fetchCursoDetail = async (id: number): Promise<CursoDetalleDTO> => {
    try {
        // Usamos el nuevo endpoint público
        const response = await axiosInstance.get<CursoDetalleDTO>(`/public/curso/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al cargar los cursos desde el API:', error);
        throw error;
    }
}

export const fetchCursosMapa = async (): Promise<CursoMapaDTO[]> => {
    try {
        // Usamos el nuevo endpoint público optimizado para el mapa
        const response = await axiosInstance.get<CursoMapaDTO[]>(`/public/curso/mapa`);
        return response.data;
    } catch (error) {
        console.error('Error al cargar los cursos para el mapa desde el API:', error);
        throw error;
    }
}

export const fetchMunicipiosCursosStats = async (): Promise<MunicipioStatsDTO[]> => {
    try {
        const response = await axiosInstance.get<MunicipioStatsDTO[]>(`/public/curso/municipio/stats`);
        return response.data;
    } catch (error) {
        console.error('Error al cargar los stats de cursos por municipio desde el API:', error);
        throw error;
    }
}

export const fetchCursoPorMunicipio = async (municipio: string): Promise<CursoLinkDTO[]> => {
    try {
        const response = await axiosInstance.get<CursoLinkDTO[]>(`/public/curso/municipio/${municipio}`);
        return response.data;
    } catch (error) {
        console.error('Error al cargar los cursos por municipio desde el API:', error);
        throw error;
    }
}