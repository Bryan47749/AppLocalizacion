import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recorrido } from '../Clases/Clases';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {

  constructor(private http:HttpClient) { }
  URL:string=environment.urlApi;

  GuardarRecorrido(r:Recorrido){
    return this.http.post(`${this.URL}/Recorrido`, r);
    
  }
}
