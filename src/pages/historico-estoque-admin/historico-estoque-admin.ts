import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoricoEstoqueDTO } from '../../models/historico-estoque.dto';

@IonicPage()
@Component({
  selector: 'page-historico-estoque-admin',
  templateUrl: 'historico-estoque-admin.html',
})
export class HistoricoEstoqueAdminPage {

  
   historico: HistoricoEstoqueDTO ={
      id: "",
      entrada_saida_id: "",
      instante: "",
      quantidade: "",
      produto_id: "",
      instante_fim: ""
  };

  items: HistoricoEstoqueDTO[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoEstoqueAdminPage');
  }

  geraRelatorio(instanteIni: string, instanteFim: string){
    console.log('AQUI SASAFSAFSAFSA ->' + instanteIni + instanteFim);
  }

}
