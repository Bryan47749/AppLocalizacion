import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetallePedido, Pedido } from '../Clases/Clases';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private http:HttpClient) { }
  url: string = environment.urlApi;

  guardarDetallePedido(dp:DetallePedido){
    return this.http.post(`${this.url}/detallePedido`,dp);
  }

  obtenerDetallePedidosPedidoID(pedidoID:number)
  {
    return this.http.get<DetallePedido[]>(`${this.url}/detallePedido/${pedidoID}`);
  }
}
