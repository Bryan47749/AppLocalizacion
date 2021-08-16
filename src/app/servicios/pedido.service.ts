import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pedido } from '../Clases/Clases';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }
  url: string = environment.urlApi;
  getPedidosCamion(p:Pedido){
    return this.http.post<Pedido[]>(`${this.url}/pedido/pedidoCamion`, p);
  }
}
