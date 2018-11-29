import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoAdminPage } from './produto-admin';

@NgModule({
  declarations: [
    ProdutoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoAdminPage),
  ],
})
export class ProdutoAdminPageModule {}
