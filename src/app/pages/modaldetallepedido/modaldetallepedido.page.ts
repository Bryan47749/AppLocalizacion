import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';
import { PedidoCliente, PedidoDetalle } from '../../Clases/Clases';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-modaldetallepedido',
  templateUrl: './modaldetallepedido.page.html',
  styleUrls: ['./modaldetallepedido.page.scss'],
})
export class ModaldetallepedidoPage implements OnInit {

  constructor(private modalController: ModalController,
    private ds: DetallePedidoService,
    private ps: ProductoService) { }

  @Input() pedido: PedidoCliente;
  pedidoDetalle: PedidoDetalle[] = [];
  ngOnInit() {
    this.obtenerDetallePedidosPedidoID();
  }

  cerrar() {
    this.modalController.dismiss();
  }


  obtenerDetallePedidosPedidoID() {
    //console.log(this.pedido)
    this.ds.obtenerDetallePedidosPedidoID(this.pedido.pedidoID).subscribe(data => {
      //console.log(data)
      data.forEach(x => {
        this.ps.getProductoID(x.productoID).subscribe(info => {
          //console.log(info)
          let detalle:PedidoDetalle = new PedidoDetalle();    
          detalle.cantidad = x.cantidad;
          detalle.nombre = info.nombre;
          detalle.precio = info.precio;
          detalle.total = x.total;
          //console.log(detalle)
          this.pedidoDetalle.push(detalle);
        });
      });
    }, error => {
      console.log(error)
    });
  }

}
