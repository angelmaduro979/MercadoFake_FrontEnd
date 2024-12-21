
const FormatDate = (dateString) => {
    let date = new Date(dateString);
    
 
    if (isNaN(date)) {
        date = new Date(Date.parse(dateString));
    }
    
    if (isNaN(date)) {
        return "Fecha inválida";
    }
    
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};


export default FormatDate