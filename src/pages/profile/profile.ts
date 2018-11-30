import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { PedidoService } from '../../services/domain/pedido.service';
import { PedidoDTO } from '../../models/pedido.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  pedidos: PedidoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    private alertCtrl: AlertController,
    private pedidoService: PedidoService) {
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
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
    this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          //Pegando o id do objeto retornado do Servidor
         
          //Verificando se o cliente possui algum pedido, se possuir, não deixar excluir o cadastro
          this.pedidoService.findByIdCliente(this.cliente.id)
           .subscribe(response =>{
              
               this.pedidos = response['content'];
              console.log('Pedidos: ' + this.pedidos.length);
               //Se a variavel que recebe os pedidos não estiver nula, o cliente possui pedidos..
                if(this.pedidos.length >= 1){ //Se pedidos retornou um valor maior do que 2, significa que retornou um resultado concreto.
                  //Retorna para página de login
                  let alert2 = this.alertCtrl.create({
                    title: 'Excluir cadastro',
                    message: 'Atenção, ' + this.cliente.nome +"! Você não pode excluir seu cadastro, pois você já fez pedido(s)!",
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
                }else{

                  let alert = this.alertCtrl.create({
                    title: 'Excluir cadastro',
                    message: 'Deseja realmente excluir seu cadastro?',
                    buttons: [
                      {
                        text: 'Não',
                        role: 'nao',
                        handler: () => {
                          
                        }
                      },
                      {
                        text: 'Sim',
                        handler: () => {
                          
                          //Realizando a exclusão
                          this.clienteService.delete(this.cliente.id);
        
                          //Setando como null as variaveis que guarda o token e o email do cliente
                          this.storage.setLocalUser(null);
        
                          //Retorna para página de login
                          let alert1 = this.alertCtrl.create({
                            title: 'Excluindo cadastro',
                            message: 'Cadastro excluído com sucesso! Faça um novo cadastro!',
                            buttons:[
                              {
                                text: 'OK',
                                role: 'ok',
                                handler: data => {
                                  
                                  //Após a exclusão, volta a tela inicial
                                  this.navCtrl.setRoot('HomePage');
        
                                }
                              }
                            ]
                          });
        
                          alert1.present();
                                }
                              }
                            ]
                          });
        
                  alert.present();
                }


           }, error => {});


          

        },
        error => {});   
    }
  }

}
