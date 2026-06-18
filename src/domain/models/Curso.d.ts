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

export interface CursoMapaDTO {
    id:               number;
    title:            string;
    latitude:         number;
    longitude:        number;
    municipalityName: string;
}

export interface CursoResponseDTO {
    id:               number;
    title:            string;
    description:      string;
    courseDate:       Date;
    latitude:         number;
    longitude:        number;
    municipalityName: string;
    municipalityId:   number;
    coverImage:       Image;
    images:           Image[];
    createdBy:        string;
    updatedBy:        string;
    createdAt:        Date;
    updatedAt:        Date;
}

export interface Image {
    id:       number;
    url:      string;
    thumbUrl: string;
    mimeType: string;
    position: number;
}

export interface CursoLinkDTO {
    title: string;
    id:    number;
}

export interface MunicipioStatsDTO {
    nombre:     string;
    totalObras: number;
}
