
``
const NormalizeText = (texto: string): string => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default NormalizeText;