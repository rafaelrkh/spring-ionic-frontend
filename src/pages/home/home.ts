import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credencial : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public auth: AuthService,
              private alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
             .subscribe(response => {
               this.auth.successfulLogin(response.headers.get('Authorization'));
               this.navCtrl.setRoot('CategoriasPage');
             },
             error => {});
  }

  public login(){
    this.auth.authenticate(this.credencial)
             .subscribe(response => {
               this.auth.successfulLogin(response.headers.get('Authorization'));
               this.navCtrl.setRoot('CategoriasPage');
             },
             error => {});
  }

  public signUp(){
    this.navCtrl.push('SignupPage');
  }

  pageAdministrador(){
    let alert = this.alertCtrl.create({
      title: 'Área do administrador',
      message: 'Informe a palavra-chave para acessar a área do Administrador:',
      inputs: [
        {
          name: 'username',
          placeholder: 'Palavra-chave',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Acessar',
          handler: data => {

            if(data.username=="pucminas2018"){
              //Acessa página do administrador
              this.navCtrl.setRoot('AdminPage');
            }else{

                //Retorna para página de login
                let alert2 = this.alertCtrl.create({
                  title: 'Área do administrador',
                  message: 'Palavra-chave incorreta',
                  buttons:[
                    {
                      text: 'OK',
                      role: 'ok',
                      handler: data => {

                      }
                    }
                  ]
                });

                alert2.present();
                this.navCtrl.setRoot('HomePage');

            }

          }
        }
      ]
    });
    alert.present();
  }

}
