import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividad';
import { Observable, map } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesApiService {

  //private apiwebUrl="http://localhost:5261/api/Actividad";//ruta del archivo json que quiero usar con lo del servidor
  private apiwebUrl: string;

  constructor(private http:HttpClient, private configService: ConfigServiceService) { 
    this.apiwebUrl = `${this.configService.getApiBaseUrl()}/api/Actividad`;
  }

  getActivities():Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.apiwebUrl); //get para leer
  }

   //buscar
   getActivitiesSearch(name?:string, category?:string):Observable<Actividad[]>{ //espero varias como resul
    return this.http.get<Actividad[]>(this.apiwebUrl).pipe(
      map((actividades)=>
        actividades.filter((actividad)=>
        (name ? actividad.name.toLowerCase().includes(name.toLowerCase()):true) &&
         (category? actividad.category.toLowerCase().includes(category.toLowerCase()):true) 
        )
      )
    );
  }
  //agregar
  addActivity(actividad:Actividad):Observable<Actividad>{
    return this.http.post<Actividad>(this.apiwebUrl, actividad); //post para agregar algo nuevo
  }

  //editar
  updateActivity(actividad:Actividad):Observable<Actividad>{
    const urlDeLaActividad = `${this.apiwebUrl}/${actividad.id}` //http://localhost:3000/actividades/5
    return this.http.put<Actividad>(urlDeLaActividad, actividad); //put para editar
  }

  //eliminar
  /*deleteActivity(actividad:Actividad):Observable<void>{ //delte para eliminar
    const urlDeLaActividad = `${this.apiwebUrl}/${actividad.id}`
    return this.http.delete<void>(urlDeLaActividad);
  }*/

  deactiveActividad(actividad:Actividad):Observable<void>{ //delte para eliminar
    const urlDeLaActividad = `${this.apiwebUrl}/deactive/${actividad.id}`
    //return this.http.delete<void>(urlDeLaActividad);
    return this.http.put<void>(urlDeLaActividad, {});
  }



}
