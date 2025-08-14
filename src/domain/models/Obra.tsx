export interface Obra {
    id: number;
    nombre_municipio: string;
    nombre_de_obra: string;
    inversion: number;
    nombre_de_ejecutora: string;
    avance: number;
    descripcion: string;
    imagenes: string[];
    latitude: number;
    longitude: number;
}

export interface MunicipioConObras{
    nombre: string,
    totalObras: number,
    obras: Obra[]
}

