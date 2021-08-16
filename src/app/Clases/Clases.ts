
export class Conductor {
  conductorID: number;
  cedula: string;
  nombres: string;
  telefono: string;
  email: string;
  pass: string;
  camionID: number;
}

export class PedidoDetalle {
  nombre ?: string;
  cantidad?: number
  productoID ?: number;
  precio?: number;
  total?: number;
}

export class Producto{
  productoID?: number;
  nombre?:string;
  precio?: number;

}

export class Pedido{
  pedidoID?:number;
  clienteID?:number;
  camionID?:number;
  total?: number;
  estado?:string;
  fecha?:string;
  hora?:string;
}


export class PedidoCliente{
  pedidoID?:number;
  clienteID?:number;
  camionID?:number;
  total?: number;
  estado?:string;
  fecha?:string;
  hora?:string;
  tienda?: string;
  ruc?: string;
  telefono?: string;
}

export class DetallePedido{
  detallePedidoID?:number;
  pedidoID?:number;
  productoID?:number;
  cantidad?:number;
  total?:number;
}

export class Recorrido {
  RecorridoID?: number;
  Lat?: number;
  Lng?: number;
  CamionID?: number;
  Fecha?: string;
  Hora?: string;
}

export class Cliente {
  clienteID?: number;
  ruc?: string;
  tienda?: string;
  lat?: number;
  lng?: number;
  telefono?: string;
  camionID: number;

}

