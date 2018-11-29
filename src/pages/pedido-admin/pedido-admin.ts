import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';



@IonicPage()
@Component({
  selector: 'page-pedido-admin',
  templateUrl: 'pedido-admin.html',
})
export class HistoricoEstoqueAdminPage {

  
   historico: PedidoDTO ={
    cliente : "";
    enderecoDeEntrega: "";
    pagamento: "";
    itens: null;
    id: "";
    instante: "";
  };

  items: PedidoDTO[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoEstoqueAdminPage');
  }

  geraRelatorio(instanteIni: string, instanteFim: string){
    console.log('AQUI SASAFSAFSAFSA ->' + instanteIni + instanteFim);
  }

}
