import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileEditPage } from './profile-edit';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    ProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileEditPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
  
})
export class ProfileEditPageModule {}
