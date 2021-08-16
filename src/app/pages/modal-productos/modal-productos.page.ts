import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../Clases/Clases';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {

  constructor(private p:ProductoService,
    public alertController: AlertController,
    public modalController: ModalController,
    private toastCtrl: ToastController) { }
  productos:Producto[] = [];

  ngOnInit() {
    this.getProductos();
  }
  
  async presentToast(mesagge: string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }

  selectProducto(p:Producto){
    this.presentAlertPrompt(p);
  }


  async presentAlertPrompt(p:Producto) {
    const alert = await this.alertController.create({
      header: 'Agregar!',
      subHeader:`${p.nombre}`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Añadir',
          handler: (data) => {
            if(data.cantidad != ""){
              this.modalController.dismiss({
                producto: p,
                cantidad: data.cantidad
              });
            }else{
              this.presentToast("Ingrese la cantidad!!");
            }
            
          }
        }
      ]
    });

    await alert.present();
  }


  getProductos(){
    this.p.getProductos().subscribe(data=>{
      this.productos = data;
      //console.log(data)
    }, error=>{
      console.log(error.message)
    })
  }
}
