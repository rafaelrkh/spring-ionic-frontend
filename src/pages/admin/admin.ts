import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  categorias(){
    this.navCtrl.push('CategoriaAdminPage');
  }

  produtos(){
    this.navCtrl.push('ProdutoAdminPage');
  }

  historicoEstoque(){
    this.navCtrl.push('HistoricoEstoqueAdminPage');
  }

  pedidos(){
    this.navCtrl.push('PedidoAdminPage');
  }

  sair(){
    this.navCtrl.setRoot('HomePage');
  }

}
