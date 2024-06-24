import Categoria from "./Categoria";
import Imagen from "./Imagen";
import UnidadMedida from "./UnidadMedida";

  
  export default interface Articulo {
    type: string;
    id: number;
    eliminado: boolean;
    denominacion: string;
    precioVenta: number;
    imagenes: Imagen[];
    unidadMedida: UnidadMedida;
    categoria: Categoria;
    descripcion?: string;
    tiempoEstimadoMinutos?: number;
    preparacion?: string;
    stock?: number | null;
    precioCosto?: number | null;
    imagenesManufacturado?: Imagen[];
    articuloManufacturadoDetalles?: any[];
  }
  