export interface ObraImage {
    id: number;
    url: string;
    description: string;
}

// Interfaz para el detalle completo (ObraResponseDTO)
export interface ObraResponseDTO {
    id: number;
    name: string;
    municipality: string;
    agency: string;
    investment: number;
    progress: number;
    description: string;
    latitude: number;
    longitude: number;
    status: string;
    images: ObraImage[];
    createdAt: string;
    createdBy: string;
}

// Interfaz para el mapa (ObraMapaDTO) - Ligera
export interface ObraMapaDTO {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    municipality: string;
}
export interface MunicipioConObras{
    nombre: string,
    totalObras: number,
    obras: Obra[]
}

