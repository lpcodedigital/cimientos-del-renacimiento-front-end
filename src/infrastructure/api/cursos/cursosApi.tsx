import type { Curso } from "../../../domain/models/Curso";


/**
 * Fetches the GeoJSON data of Yucatan's municipalities from the server.
 * 
 * @returns A Promise that resolves to the GeoJSON data.
 * @throws An error if the request fails.
 */
const fetchCursos = async (): Promise<Curso> => {
    try {
            
            const response = await fetch(import.meta.env.BASE_URL + 'data/cursos/fake_cursos.json');
            if (!response.ok) {
                throw new Error("Error al cargar los cursos");
            }
            const data = await response.json();
            return data as Curso;
        } catch (error) {
            console.error(' Error al cargar los cursos: ', error);
            throw error;
        }
}

export default fetchCursos;