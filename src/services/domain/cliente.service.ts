import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { LocalUser } from "../../models/local_user";

@Injectable()
export class ClienteService{

    bucketUrl: string = API_CONFIG.bucketBaseUrl;
    localUser: LocalUser;

    constructor(public http: HttpClient, public storage: StorageService) {
    }
    
    findByEmail(email: string) {
         return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

     getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO){

        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
    //Implementando a busca por ID
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    //Implementando a exclusão por ID
   delete(id: string){
     /*  console.log('ID service: '+ id);

       let url = API_CONFIG.baseUrl + '/clientes/' + id;

       return this.http.delete(url); */
       return new Promise((resolve, reject) => {
        let url = API_CONFIG.baseUrl + '/clientes/' + id;
   
        this.http.delete(url)
          .subscribe((result: any) => {
           // resolve(result.json());
          },
          (error) => {
            reject(error.json());
          });
      });
   }
   //Implementando a alteração por ID
   update(cliente: ClienteDTO){
    /*
    let dados = {
        "nome": cliente.nome
    } ;

    return this.http.put(`${API_CONFIG.baseUrl}/clientes/${cliente}`,dados);
      */
     console.log("ID CLIENTE: " + cliente.id);
     return new Promise((resolve, reject) => {
        let url = API_CONFIG.baseUrl + '/clientes/' + cliente.id;
        
        let dados = {
          "nome": cliente.nome,
          "email": cliente.email
        }
        
        this.http.put(url, dados)
          .subscribe((result: any) => {
           // resolve(result.json());
          },
          (error) => {
            reject(error.json());
          });
      }); 
   }

}