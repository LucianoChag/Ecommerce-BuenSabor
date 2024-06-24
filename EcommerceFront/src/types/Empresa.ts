import Imagen from "./Imagen";

export default interface Empresa {
    id: number;
    eliminado: boolean;
    nombre: string;
    razonSocial: string;
    cuil: number;
    imagen: Imagen;
  }