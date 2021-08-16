import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente, Conductor } from '../Clases/Clases';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
  url: string = environment.urlApi;
  getClientes(c:Conductor){
    return this.http.post<Cliente[]>(`${this.url}/Cliente/clientesIDCamion`, c);
  }

  getClineteID(id:number){
    return this.http.get<Cliente>(`${this.url}/Cliente/${id}`);
  }

  guardarCliente(c:Cliente){
    return this.http.post(`${this.url}/Cliente`, c);
  }

  editarCliente(c:Cliente){
    return this.http.put(`${this.url}/Cliente`, c);
  }
  elimianarCliente(id:number){
    return this.http.delete(`${this.url}/Cliente/${id}`);
  }
}