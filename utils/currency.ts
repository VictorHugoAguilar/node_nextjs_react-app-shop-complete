export const format = ( value: number ) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format( value ); //€2,500.00
}