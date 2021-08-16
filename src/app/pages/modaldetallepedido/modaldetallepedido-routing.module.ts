import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModaldetallepedidoPage } from './modaldetallepedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModaldetallepedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModaldetallepedidoPageRoutingModule {}
