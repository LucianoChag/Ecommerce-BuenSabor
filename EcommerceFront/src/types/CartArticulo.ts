import Articulo from "./Articulo";

export default interface CartArticulo extends Articulo {
    quantity: number;
}
