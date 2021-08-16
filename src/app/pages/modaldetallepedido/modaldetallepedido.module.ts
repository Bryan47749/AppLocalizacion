import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModaldetallepedidoPageRoutingModule } from './modaldetallepedido-routing.module';

import { ModaldetallepedidoPage } from './modaldetallepedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModaldetallepedidoPageRoutingModule
  ],
  declarations: [ModaldetallepedidoPage]
})
export class ModaldetallepedidoPageModule {}
