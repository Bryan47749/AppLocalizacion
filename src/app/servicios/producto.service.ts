import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Producto } from '../Clases/Clases';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  url: string = environment.urlApi;
  
  getProductos(){
    return this.http.get<Producto[]>(`${this.url}/producto`);
  }

  getProductoID(id:number){
    return this.http.get<Producto>(`${this.url}/producto/${id}`);

  }
}
