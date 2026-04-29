import type { CursoDetalleDTO, CursoPaginado } from "../../../domain/models/Curso";
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
