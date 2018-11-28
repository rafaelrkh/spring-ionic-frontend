import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../models/produto.dto';

 @Injectable()
export class ProdutoService {

   constructor(public http: HttpClient) {

  }

  //Pesquisa por id
  findById(produto_id : string){
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }
  //Pesquisa por nome
  findByNome(nome: string){
   // return this.http.get(`${API_CONFIG.baseUrl}/produtos/nome/${nome}`);
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/nm/?nome=${nome}`); 
  }
  
   findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  
  
}