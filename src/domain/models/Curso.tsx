export interface Curso {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    cursos:      CursoElement[];
}

export interface CursoElement {
    id:          number;
    nombre:      string;
    descripcion: string;
    municipio:   string;
    fecha:       Date;
    imagenes:    Imagene[];
}

export interface Imagene {
    url:         string;
    descripcion: string;
}
