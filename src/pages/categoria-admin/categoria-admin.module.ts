import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaAdminPage } from './categoria-admin';

@NgModule({
  declarations: [
    CategoriaAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaAdminPage),
  ],
})
export class CategoriaAdminPageModule {}
