import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPlacedPage } from './order-placed';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    OrderPlacedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPlacedPage),
  ],
  providers:[
    PedidoService
  ]
})
export class OrderPlacedPageModule {}
