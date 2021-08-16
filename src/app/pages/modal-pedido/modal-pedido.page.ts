import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/Clases/Clases';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {

  constructor(private modalController: ModalController) { }
  @Input() cliente:Cliente;
  ngOnInit() {
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  guardarPedido(){
    console.log(this.cliente)
  }

}
