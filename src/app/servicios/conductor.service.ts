import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Conductor } from '../Clases/Clases';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http: HttpClient,
    private storage: Storage,
    private toastCtrl: ToastController) {
    this.init();
  }

  private _storage: Storage | null = null;
  url: string = environment.urlApi;

  async presentToast(mesagge: string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }

  set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  logOut() {
    this._storage?.clear();
  }

  getLogeado(){
    return this._storage?.get('conductor');
  }

  async Login(c: Conductor) {
    return await new Promise(resolve => {
      this.http.post<Conductor>(`${this.url}/conductor/login`, c).subscribe(data => {
        if (data === null) {
          this.presentToast("Usuario y contraseña incorrectos");
          resolve(false);
        }
        //console.log(data)
        this.set('conductor', data);
        resolve(true);
      }, error => {
        this.presentToast(error.message);
      });

    });    
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
