import { Component, OnInit, ViewChild } from '@angular/core';
import { ConductorService } from '../servicios/conductor.service';
import { Conductor, Pedido, PedidoCliente } from '../Clases/Clases';
import { PedidoService } from '../servicios/pedido.service';
import { ClienteService } from '../servicios/cliente.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ModaldetallepedidoPage } from '../pages/modaldetallepedido/modaldetallepedido.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {

  constructor(private cservice:ConductorService,
              private pService:PedidoService,
              private cService:ClienteService,
              private modalController: ModalController,
              public alertController: AlertController) {}
  ngOnInit(): void {
    //this.getPedidosCamion();
  }

  conductor:Conductor = new Conductor();
  pedidosClientes: PedidoCliente[] = [];
  @ViewChild(IonList) ionList: IonList;

  async getPedidosCamion(){
    
    await this.cservice.getLogeado().then(d=>{
      this.conductor = d;
    });

    let pedido:Pedido = new Pedido();
    pedido.camionID = this.conductor.camionID;
    this.pedidosClientes = [];
    this.pService.getPedidosCamion(pedido).subscribe(data=>{
      data.forEach( d=>{
        let pciente: PedidoCliente = new PedidoCliente();
        this.cService.getClineteID(d.clienteID).subscribe(x =>{ 
           pciente.estado = d.estado;
           pciente.tienda = x.tienda;
           pciente.ruc = x.ruc;
           pciente.total = d.total;
           pciente.fecha = d.fecha;
           pciente.telefono = x.telefono;
           pciente.pedidoID = d.pedidoID;
           pciente.estado = d.estado;
           this.pedidosClientes.push(pciente);
        });
      })
    });
  }

  ionViewWillEnter() {
    this.getPedidosCamion();
  }

  EntregarPedido(pc:PedidoCliente){

    this.ionList.closeSlidingItems();
    this.presentAlertConfirm(pc);

  }
  async presentAlertConfirm(pc:PedidoCliente) {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: 'Entregar este pedido',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Entregar',
          handler: () => {
            let pedido:Pedido= new Pedido();
            pedido.pedidoID = pc.pedidoID;
            this.pService.entregarPedido(pedido).subscribe(data=>{
              this.getPedidosCamion();

            }, error =>{
              console.log(error.message)
            });
            //console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModalDetallePedido(pc:PedidoCliente) {
    const modal = await this.modalController.create({
      component: ModaldetallepedidoPage,
      presentingElement: await this.modalController.getTop(),
      componentProps:{
        pedido: pc
      }
    });
    return await modal.present();
  }

  mostrarDetallePedido(pc:PedidoCliente){
    this.ionList.closeSlidingItems();
    this.presentModalDetallePedido(pc);
  }

}
