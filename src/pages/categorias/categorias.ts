import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome: ['',[]]});
      
      
  }

  

  ionViewDidLoad() {

    this.categoriaService.findAll()
      .subscribe(response => {
        //console.log(response);
        this.items = response;
      },
      error => {});

  }

  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

  showProdutosNome(){
    let nome = this.formGroup.value.nome;
    this.navCtrl.push('ProdutosPage', {nome : nome});
  }

}
