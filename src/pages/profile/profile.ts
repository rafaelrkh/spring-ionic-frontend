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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //buscando o cliente no servidor
          this.cliente = response as ClienteDTO;
          

          //Método para retornar a imagem de perfil do cliente
          this.getImageIfExists();
        },
        //Caso haja erro na página ou inconsistência de dados, retorna à página de login (HomePage)
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    //Retornando a imagem de perfil do cliente, caso ela exista. Se não, informa uma imagem padrão do sistema
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

  update(){
    //Pegando o email armazenado em um arquivo de storage local para prosseguir com a alteração
    let localUser = this.storage.getLocalUser();
    let email: string;
    email = localUser.email;
    

    this.navCtrl.push('ProfileEditPage', {email : email});
  }

  delete(){
    let cliente_id : string;
    let localUser = this.storage.getLocalUser();
    this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          //Pegando o id do objeto retornado do Servidor
          cliente_id = this.cliente.id;

          //Realizando a exclusão
          this.clienteService.delete(cliente_id);

          //Após a exclusão, volta a tela inicial
          this.navCtrl.setRoot('HomePage');
        },
        error => {});   
  }

}
