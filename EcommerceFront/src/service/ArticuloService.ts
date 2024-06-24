import Articulo from "../types/Articulo";
import CartArticulo from "../types/CartArticulo";
import BackendClient from "./BackendClient";

export default class ArticuloService extends BackendClient<Articulo | CartArticulo> {}
