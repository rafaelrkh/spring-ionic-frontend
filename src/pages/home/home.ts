import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credencial : CredenciaisDTO = {
    dsEmail: "",
    dsSenha: ""
  };

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  public login(){
    this.auth.authenticate(this.credencial)
             .subscribe(response => {
               this.auth.successfulLogin(response.headers.get('Authorization'));
               this.navCtrl.setRoot('CategoriasPage');
             },
             error => {});
  }

}
