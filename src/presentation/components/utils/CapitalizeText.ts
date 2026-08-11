// Función auxiliar para capitalizar solo la primera letra
const formatCapitalize = (text?: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default formatCapitalize;