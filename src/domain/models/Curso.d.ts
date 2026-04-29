// Para la lista (Ligero)
export interface CursoPublicDTO {
    id: number;
    title: string;
    description: string;
    municipalityName: string;
    courseDate: string;
    coverImageUrl: string; // Solo la URL de la portada
}

// Para el detalle (Completo)
export interface CursoImageDTO {
    id: number;
    url: string;
}

export interface CursoDetalleDTO extends CursoPublicDTO {
    images: CursoImageDTO[]; // Aquí sí vienen las imágenes de la galería
}

export interface CursoPaginado {
    total: number;
    data: CursoPublicDTO[];
}