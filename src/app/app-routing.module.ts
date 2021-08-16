import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    pathMatch:'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  {
    path: 'modal-pedido',
    loadChildren: () => import('./pages/modal-pedido/modal-pedido.module').then( m => m.ModalPedidoPageModule)
  },
  {
    path: 'modal-productos',
    loadChildren: () => import('./pages/modal-productos/modal-productos.module').then( m => m.ModalProductosPageModule)
  },
  {
    path: 'modaldetallepedido',
    loadChildren: () => import('./pages/modaldetallepedido/modaldetallepedido.module').then( m => m.ModaldetallepedidoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
