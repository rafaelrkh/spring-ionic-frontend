import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public storage: StorageService
    , public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.dsEmail) {
      this.clienteService.findByDsEmail(localUser.dsEmail)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {});
    }
  }
   getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.cdCliente)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.cdCliente}.jpg`;
    },
    error => {});
  }

}
