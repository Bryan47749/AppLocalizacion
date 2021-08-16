import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/Clases/Clases';
import { ModalProductosPage } from '../modal-productos/modal-productos.page';
import { PedidoDetalle, Pedido, DetallePedido } from '../../Clases/Clases';
import { PedidoService } from '../../servicios/pedido.service';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {

  constructor(private modalController: ModalController,
              private toastCtrl: ToastController,
              private ps:PedidoService,
              private detalleService:DetallePedidoService) { }
  @Input() cliente:Cliente;
  @ViewChild(IonList) ionList: IonList;

  pedidoDetalle:PedidoDetalle[] = [];
  ngOnInit() {
  }

  
  async presentToast(mesagge:string) {
    const toast = await this.toastCtrl.create({
      message: mesagge,
      duration: 2000
    });
    toast.present();
  }

  eliminarDetalle(indice:number){
    this.ionList.closeSlidingItems();
    console.log(indice)
    this.pedidoDetalle.splice(indice, 1);
  }

  async presentModalProductos() {
    const modal = await this.modalController.create({
      component: ModalProductosPage,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    //let Pedi this.pedidoDetalle.find(x=>x.productoID == data.producto.productoID);

    let detalle:PedidoDetalle = new PedidoDetalle();    
    detalle.cantidad = data.cantidad;
    detalle.nombre = data.producto.nombre;
    detalle.productoID = data.producto.productoID;
    detalle.precio = data.producto.precio;
    this.pedidoDetalle.push(detalle);
  }

  abrirProductos(){
    this.presentModalProductos();
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  guardarPedido(){
    if(this.pedidoDetalle.length > 0){
      let total:number = 0;
      this.pedidoDetalle.forEach(d=>{
        total += d.precio *  d.cantidad;
      })

      let fecha = new Date();
      let pedido:Pedido = new Pedido();
      pedido.clienteID = this.cliente.clienteID;
      pedido.estado = 'P';
      pedido.fecha = fecha.toLocaleDateString();
      pedido.hora = fecha.toLocaleTimeString();
      pedido.camionID = this.cliente.camionID;
      pedido.total = total;
      this.ps.guardarPedido(pedido).subscribe(data=>{
        pedido = data;
        this.guardarDetallePedido(pedido);

      });

    }else{
      this.presentToast('Ingrese al menos un productos');
    }
  }

  guardarDetallePedido(ped:Pedido){
    this.pedidoDetalle.forEach(p=>{
      let dp:DetallePedido = new DetallePedido();
      dp.cantidad = p.cantidad;
      dp.pedidoID = ped.pedidoID;
      dp.productoID = p.productoID;
      dp.total = p.precio * p.cantidad;
      this.detalleService.guardarDetallePedido(dp).subscribe(data=>{

      }, erro=>{
        console.log(erro.message)
      });
    });
    this.presentToast("Pedido Guardado");
    this.modalController.dismiss();

  }

}

