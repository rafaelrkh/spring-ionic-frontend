import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PedidoService } from '../../services/domain/pedido.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';

/**
 * Generated class for the OrderPlacedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-placed',
  templateUrl: 'order-placed.html',
})
export class OrderPlacedPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: PedidoDTO[];

  cliente: ClienteDTO;

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidoService: PedidoService,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public storage: StorageService) {

  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //buscando o cliente no servidor
          this.cliente = response as ClienteDTO;
          
          //Buscando pedidos do cliente
          this.pedidoService.findByIdCliente(this.cliente.id)
           .subscribe(response => {

            this.items = response['content'];
            console.log(this.items);
            
           }, error => {});

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

  detalhePedido(){

  }

}
