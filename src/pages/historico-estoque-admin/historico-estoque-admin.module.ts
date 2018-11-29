import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoEstoqueAdminPage } from './historico-estoque-admin';

@NgModule({
  declarations: [
    HistoricoEstoqueAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoEstoqueAdminPage),
  ],
})
export class HistoricoEstoqueAdminPageModule {}
