import { Component } from '@angular/core';
import { ConductorService } from '../servicios/conductor.service';
import { Conductor, Pedido, PedidoCliente } from '../Clases/Clases';
import { PedidoService } from '../servicios/pedido.service';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {

  constructor(private cservice:ConductorService,
              private pService:PedidoService,
              private cService:ClienteService) {}

  conductor:Conductor = new Conductor();
  pedidosClientes: PedidoCliente[] = [];

  async getPedidosCamion(){
    await this.cservice.getLogeado().then(d=>{
      this.conductor = d;
    });

    let pedido:Pedido = new Pedido();
    pedido.camionID = this.conductor.camionID;

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
           this.pedidosClientes.push(pciente);
        });
      })
    });
  }

  ionViewDidEnter(){
    this.getPedidosCamion();
    
  }

}
