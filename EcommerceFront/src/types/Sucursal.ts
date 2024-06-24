import Empresa from "./Empresa";

export default interface Sucursal {
    id: number;
    nombre: string;
    eliminado: boolean;
    horarioApertura: string;
    horarioCierre: string;
    casaMatriz: boolean;
    promociones: any[];
    empresa: Empresa;
    domicilio: Domicilio;
  }