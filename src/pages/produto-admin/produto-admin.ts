import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/produto.service';


@IonicPage()
@Component({
  selector: 'page-produto-admin',
  templateUrl: 'produto-admin.html',
})
export class ProdutoAdminPage {

  produto: ProdutoDTO ={
      id: "",
      nome: "",
      preco: 0.00
  };
  
  items: ProdutoDTO[];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService){
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoAdminPage');
  }

  showProdutosNome(){
    
    this.produtoService.findByNome(this.produto.nome)
     .subscribe(response => {
        
      this.items = response['content'];

     }, errors =>{});
  }

  novaProduto(){

  }

  editProduto(){

  }

  editar(nome : string, id: string){
    console.log('editar' + nome + '|' + id);
  }

  excluir(id: string){
    console.log('excluir' + id);
  }

}
