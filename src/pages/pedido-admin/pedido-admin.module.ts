import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoAdminPage } from './pedido-admin';

@NgModule({
  declarations: [
    PedidoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoAdminPage),
  ],
})
export class PedidoAdminPageModule {}
