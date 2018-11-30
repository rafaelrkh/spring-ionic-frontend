import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  estados: EstadoDTO[]
  cidades: CidadeDTO[]
  formGroup: FormGroup;
  cliente: ClienteDTO;
  clienteup : ClienteDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public storage: StorageService,
    public alertCtrl : AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipo: ['', [Validators.required]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['', [Validators.required]],
        logradouro: ['',[Validators.required]],
        numero: ['', [Validators.required]],
        complemento: ['', []],
        bairro: ['', []],
        cep: ['', [Validators.required]],
        telefone1: ['', [Validators.required]],
        telefone2: ['',[]],
        telefone3: ['',[]],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});      

      let localUser = this.storage.getLocalUser();
      if (localUser && localUser.email) {
        this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
            //buscando o cliente no servidor
            this.cliente = response as ClienteDTO;

            //Setando valores no formulário
            this.formGroup.setValue({
              nome: [this.cliente.nome],
              email: [this.cliente.email],
              tipo: [''],
              cpfOuCnpj: [this.cliente.cpfOuCnpj],
              senha: [this.cliente.senha],
              logradouro: [''],
              numero: [''],
              complemento: [''],
              bairro: [''],
              cep: [''],
              telefone1: [''],
              telefone2: [''],
              telefone3: [''],
              estadoId: [null,],
              cidadeId: [null]
            });
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
   updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  updateUser(){
    let localUser = this.storage.getLocalUser();
    //Pegando o ID do cliente
    if (localUser && localUser.email) { 
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
          this.clienteup = response as ClienteDTO;
            this.cliente.id = this.clienteup.id;
          }, errors => {});

          
     //Passando o cliente registrado para a alteração
     this.clienteService.update(this.cliente);

      const alert = this.alertCtrl.create({
        title: 'Atualização de cliente',
        subTitle: 'Cliente atualizado com sucesso!',
        buttons: ['OK']
      });
      alert.present();

      //Após à alteração, informa  mensagem com sucesso e retorna a página de perfil
      this.navCtrl.setRoot('ProfilePage');
    }
  }

}
