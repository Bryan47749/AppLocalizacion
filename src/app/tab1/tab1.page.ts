import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConductorService } from '../servicios/conductor.service';
import { Conductor, Recorrido } from '../Clases/Clases';
import { NavController, ToastController } from '@ionic/angular';
import { Geoposition } from '@ionic-native/geolocation';
import { RecorridoService } from '../servicios/recorrido.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  conductor:Conductor;
  track:any;
  Tracking:boolean = true;
  

  constructor(private geolocation: Geolocation,
              private conductorService:ConductorService,
              private navctrl: NavController,
              private toastCtrl: ToastController,
              private recorridoService:RecorridoService) {}


  iniciarRecorrido(){
    this.conductorService.getLogeado().then(d=>{
      this.conductor=d;
    })
    this.Tracking =false;
    this.track = setInterval(() => {
      this.obtenerPosicionActual() 
    }, 5000);
  }

  obtenerPosicionActual(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.GuardarRecorrido(resp);
      //console.log(resp.coords)
     }).catch((error) => {
       this.presentToast(error.message);
       console.log('Error getting location', error);
     });
  }

  GuardarRecorrido(resp:Geoposition){
    let date = new Date();
    let recorrido = new Recorrido();
    recorrido.CamionID = this.conductor.camionID;
    recorrido.Fecha = date.toLocaleDateString();
    recorrido.Hora = date.toLocaleTimeString();
    recorrido.Lat= resp.coords.latitude;
    recorrido.Lng = resp.coords.longitude;
    this.recorridoService.GuardarRecorrido(recorrido).subscribe(d=>{
      console.log(resp.coords)
    });

  }

  detenerRecorrido(){
    this.Tracking =true;
    clearInterval(this.track)
  }

  async presentToast(mesagge:string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }
              
  logOut(){
    this.conductorService.logOut();
    this.navctrl.navigateRoot('/login');

  }

}
