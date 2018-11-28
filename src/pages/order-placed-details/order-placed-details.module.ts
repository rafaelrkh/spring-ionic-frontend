import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPlacedDetailsPage } from './order-placed-details';

@NgModule({
  declarations: [
    OrderPlacedDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPlacedDetailsPage),
  ],
})
export class OrderPlacedDetailsPageModule {}
