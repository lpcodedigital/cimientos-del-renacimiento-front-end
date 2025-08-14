import type { MunicipioConObras, Obra } from "../models/Obra";
import { getMunicipios } from "./municipioService";

    /**
     * Funcion que devuelve un array de objetos con la informacion de obras
     * agrupadas por municipio.
     *
     * @param geoData - El objeto GeoJSON que contiene los datos de los
     *                 municipios.
     * @param obras - El array de obras que se van a agrupar.
     *
     * @returns Un array de objetos tipo `MunicipioConObras` que contiene la
     *          informacion de obras agrupadas por municipio. El array se ordena
     *          alfabeticamente por el nombre del municipio.
     */
export const obtenerObrasPorMunicipioService = (geoData: any, obras: Obra[]): MunicipioConObras[] => {
    if (!geoData || !obras) return [];

     const obrasPorMunicipio: Record<string, Obra[]> = {};
    
        for (const obra of obras) {
          const municipio = obra.nombre_municipio;
          if (!obrasPorMunicipio[municipio]) {
            obrasPorMunicipio[municipio] = [];
          }
          obrasPorMunicipio[municipio].push(obra);
        }
    
        const municipios = getMunicipios(geoData).map((municipio) => {
          const nombre = municipio;
          const obrasMunicipio = obrasPorMunicipio[municipio] || [];
    
          return {
            nombre,
            totalObras: obrasMunicipio.length,
            obras: obrasMunicipio
          }
        })
    
        return municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
}