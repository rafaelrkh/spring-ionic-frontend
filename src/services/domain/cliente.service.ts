import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService) {
    }
     findByDsEmail(dsEmail: string) : Observable<ClienteDTO> {
         let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
         return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/dsEmail?value=${dsEmail}`,
            {'headers': authHeader});
    }
     getImageFromBucket(cdCliente : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${cdCliente}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}