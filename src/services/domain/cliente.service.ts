import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    bucketUrl: string = API_CONFIG.bucketBaseUrl;

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
    return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`);
   }
   //Implementando a alteração por ID
   update(cliente: ClienteDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/clientes/${cliente}`, null,null);
   }

}