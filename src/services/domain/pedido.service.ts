import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";


@Injectable()
export class PedidoService{

    constructor(public http: HttpClient){

    }

    insert(obj: PedidoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findAll() : Observable<PedidoDTO[]> {
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos`);
    }

    findByIdCliente(cliente_id : string){
        return this.http.get<PedidoDTO[]>(`${API_CONFIG.baseUrl}/pedidos/?cliente=${cliente_id}`);
    }

}