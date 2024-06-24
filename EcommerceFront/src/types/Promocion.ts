export default interface Promocion {
    id: number;
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: string;
    articulos: any[] | null; // Puedes cambiar 'any' a un tipo más específico si lo deseas
    imagenes: { id: number, url: string }[];
  }
  