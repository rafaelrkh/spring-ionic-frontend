import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriaAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria-admin',
  templateUrl: 'categoria-admin.html',
})
export class CategoriaAdminPage {

  categoria: CategoriaDTO ={
      id: "",
      nome: ""
  };
  
  items: CategoriaDTO[];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService){
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaAdminPage');
  }

  showCategoriasNome(){
    
    this.categoriaService.findByNome(this.categoria.nome)
     .subscribe(response => {
        
      this.items = response['content'];

     }, errors =>{});
  }

  novaCategoria(){

  }

  editCategoria(){

  }

  editar(nome : string, id: string){
    console.log('editar' + nome + '|' + id);
  }

  excluir(id: string){
    console.log('excluir' + id);
  }

}
