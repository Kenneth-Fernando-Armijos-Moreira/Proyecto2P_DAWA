import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Restaurante } from '../models/restaurante';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class RestauranteApiService {

  private apiwebUrl: string;
  
    constructor(private http: HttpClient, private configService: ConfigServiceService) {
      this.apiwebUrl = `${this.configService.getApiBaseUrl()}/api/Restaurante`;
    }

  getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.apiwebUrl);
  }

   getRestaurantesSearch(nombre?:string, tipo?:string):Observable<Restaurante[]>{
    return this.http.get<Restaurante[]>(this.apiwebUrl).pipe(
      map((restaurantes)=>
        restaurantes.filter((restaurante)=>
        (nombre? restaurante.nombre.toLowerCase().includes(nombre.toLowerCase()):true) &&
         (tipo? restaurante.tipo.toLowerCase().includes(tipo.toLowerCase()):true) 
        )
      )
    );
  }

  addRestaurantes(restaurante:Restaurante):Observable<Restaurante>{
    return this.http.post<Restaurante>(this.apiwebUrl, restaurante);
  }

  updateRestaurantes(restaurante:Restaurante):Observable<Restaurante>{
    const urlDelRestaurante = `${this.apiwebUrl}/${restaurante.id}`
    return this.http.put<Restaurante>(urlDelRestaurante, restaurante);
  }
  
  deleteRestaurantes(restaurante:Restaurante):Observable<void>{
    const urlDelRestaurante = `${this.apiwebUrl}/${restaurante.id}`
    return this.http.delete<void>(urlDelRestaurante);
  }
}
