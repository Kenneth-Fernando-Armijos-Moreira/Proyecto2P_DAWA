import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../../models/Actividad';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesjsonService {
  private jsonUrl="http://localhost:3000/actividades";//ruta del archivo json que quiero usar con lo del servidor

  constructor(private http:HttpClient) { }

  getActivities():Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.jsonUrl); //get para leer
  }

   //buscar
   getActivitiesSearch(name?:string, category?:string):Observable<Actividad[]>{ //espero varias como resul
    return this.http.get<Actividad[]>(this.jsonUrl).pipe(
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
    return this.http.post<Actividad>(this.jsonUrl, actividad); //post para agregar algo nuevo
  }

  //editar
  updateActivity(actividad:Actividad):Observable<Actividad>{
    const urlDeLaActividad = `${this.jsonUrl}/${actividad.id}` //http://localhost:3000/actividades/5
    return this.http.put<Actividad>(urlDeLaActividad, actividad); //put para editar
  }

  //eliminar
  deleteActivity(actividad:Actividad):Observable<void>{ //delte para eliminar
    const urlDeLaActividad = `${this.jsonUrl}/${actividad.id}`
    return this.http.delete<void>(urlDeLaActividad);
  }


}
