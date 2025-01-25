import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';
import { map, Observable } from 'rxjs';
import { Excursion } from '../models/Excursion';

@Injectable({
  providedIn: 'root'
})
export class ExcursionesApiService {

  private apiwebUrl: string;

  constructor(private http:HttpClient, private configService:ConfigServiceService) {
    this.apiwebUrl = `${this.configService.getApiBaseUrl()}/api/Excursion`;
   }

  getExcursions():Observable<Excursion[]>{
    return this.http.get<Excursion[]>(this.apiwebUrl);
  }

  //busqueda
  getExcursionsSearch(name?:string, guideLanguage?:string):Observable<Excursion[]>{
    return this.http.get<Excursion[]>(this.apiwebUrl).pipe( //get - lee
      map((excursiones)=>
        excursiones.filter((excursion)=>
        (name ? excursion.name.toLowerCase().includes(name.toLowerCase()):true)
        )
      )
    );
  }
  
  //agregar
  addExcursion(excursion:Excursion):Observable<Excursion>{
    return this.http.post<Excursion>(this.apiwebUrl, excursion); //post para agregar
  }
  
  //editar
  updateExcursion(excursion:Excursion):Observable<Excursion>{
    const urlDeLaExcursion=`${this.apiwebUrl}/${excursion.id}`
    return this.http.put<Excursion>(urlDeLaExcursion, excursion); //put para editar
  }

  //eliminación lógica
  deactiveExcursion(excursion:Excursion):Observable<Excursion>{
    const urlDeLaExcursion=`${this.apiwebUrl}/deactive/${excursion.id}`
    return this.http.put<Excursion>(urlDeLaExcursion, excursion); //put para editar
  }

  /*
   //eliminación física
   deleteExcursion(excursion:Excursion):Observable<void>{
    const urlDeLaExcursion=`${this.apiwebUrl}/${excursion.id}`
    return this.http.delete<void>(urlDeLaExcursion); //delete para eliminar
  }
  */
}
