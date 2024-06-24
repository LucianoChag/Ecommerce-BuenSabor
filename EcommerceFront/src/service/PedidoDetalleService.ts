
import PedidoDetalle from "../types/PedidoDetalle";
import { PedidoDetallePost } from "../types/PedidoDetallePost";
import  BackendClient  from "./BackendClient";


export default class PedidoDetalleService extends BackendClient<PedidoDetallePost |PedidoDetalle> {}