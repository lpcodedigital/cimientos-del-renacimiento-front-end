const formatTitleCase = (text?: string) => {
    if (!text) return '';
    
    return text
        // 1. Convertimos todo a minúsculas primero (ej. "MÉRIDA YUCATÁN" -> "mérida yucatán")
        .toLowerCase()
        // 2. Separamos el texto por espacios en un arreglo de palabras
        .split(' ')
        // 3. Modificamos cada palabra poniendo la primera letra en mayúscula
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        // 4. Volvemos a unir las palabras con un espacio
        .join(' ');
};

export default formatTitleCase