

const formatDate = (fecha: string) => {
     const opcions = Intl.DateTimeFormat = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        if (fecha) {
            const date = new Date(fecha);
            return date.toLocaleDateString('es-ES', opcions);
        }
};  

export default formatDate;