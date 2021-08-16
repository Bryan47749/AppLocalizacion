import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController, NavController, ToastController } from '@ionic/angular';
import { Cliente, Conductor } from '../Clases/Clases';
import { ClienteService } from '../servicios/cliente.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConductorService } from '../servicios/conductor.service';
import { ModalPedidoPage } from '../pages/modal-pedido/modal-pedido.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  conductor:Conductor;
  clinete: Cliente = new Cliente();
  clientes: Cliente[] = [];
  @ViewChild(IonList) ionList: IonList;

  constructor(private cs: ClienteService,
    private conductorService:ConductorService,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    private modalController: ModalController,
    ) { }
  ngOnInit(): void {
    this.obtenerPosicionActual();
    this.getClientes();
  }
  async presentToast(mesagge: string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }
  async getClientes() {
    await this.conductorService.getLogeado().then(d=>{
      this.conductor=d;
      //console.log(this.conductor)
    })
    this.cs.getClientes(this.conductor).subscribe(data => {
      this.clientes = data;
      //console.log(this.clientes)
    }, error => {
      this.presentToast(error.message);
    });
  }
  async presentModalPedido(c:Cliente) {
    const modal = await this.modalController.create({
      component: ModalPedidoPage,
      presentingElement: await this.modalController.getTop(),
      componentProps:{
        cliente: c
      }
    });
    return await modal.present();
    //this.navCtrl.navigateRoot('/main/tabs/tab3');

  }

  async presentAlertConfirm(c:Cliente) {
    //console.log(c)
    const alert = await this.alertController.create({
      header: 'Crear un Pedido',
      message: `Cliente:  ${c.ruc} - ${c.tienda}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Crear',
          handler: () => {
            this.presentModalPedido(c);
          }
        }
      ]
    });

    await alert.present();
  }

  obtenerPosicionActual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.clinete.lat = resp.coords.latitude;
      this.clinete.lng = resp.coords.longitude;
      //console.log(this.clinete)
     }).catch((error) => {
       this.presentToast(error.message);
       console.log('Error getting location', error);
     });
  }

  abrirPedido(c:Cliente){
    this.presentAlertConfirm(c);
  }

  guardarCliente() {

    if (this.clinete.ruc.length < 1 || this.clinete.tienda.length < 1 || this.clinete.telefono.length < 1) {
      this.presentToast("Ingrese todos los datos del cliente");
      return;
    }

    if (this.clinete.clienteID === undefined) {
      this.clinete.camionID = this.conductor.camionID; 
      this.cs.guardarCliente(this.clinete).subscribe(data => {
        this.clientes.push(this.clinete);
        this.limpiarCampos();
        this.obtenerPosicionActual();
        
        this.presentToast("Cliente Guaradado!!");
      }, error => {
        this.presentToast(error.message);
      });
    }else{
      this.cs.editarCliente(this.clinete).subscribe(data=>{
        this.limpiarCampos();
        this.obtenerPosicionActual();
        this.presentToast("Cliente Editado!!");
      }, error=>{
        this.presentToast(error.message);
      });
    }

    
  }

  SeleccionarCliente(c: Cliente) {
    this.clinete = c;
    this.ionList.closeSlidingItems();

  }

  limpiarCampos() {
    this.clinete = new Cliente();
  }
}
