import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Excursion } from '../../models/Excursion';

@Injectable({
  providedIn: 'root'
})
export class ExcursionesjsonService {
  private jsonUrl="http://localhost:3000/excursiones"; //ruta del archivo json
  constructor(private http:HttpClient) { }

  getExcursions():Observable<Excursion[]>{
    return this.http.get<Excursion[]>(this.jsonUrl);
  }

  //busqueda
  getExcursionsSearch(name?:string, guideLanguage?:string):Observable<Excursion[]>{
    return this.http.get<Excursion[]>(this.jsonUrl).pipe( //get - lee
      map((excursiones)=>
        excursiones.filter((excursion)=>
        (name ? excursion.name.toLowerCase().includes(name.toLowerCase()):true)
        )
      )
    );
  }
  
  //agregar
  addExcursion(excursion:Excursion):Observable<Excursion>{
    return this.http.post<Excursion>(this.jsonUrl, excursion); //post para agregar
  }
  
  //editar
  updateExcursion(excursion:Excursion):Observable<Excursion>{
    const urlDeLaExcursion=`${this.jsonUrl}/${excursion.id}`
    return this.http.put<Excursion>(urlDeLaExcursion, excursion); //put para editar
  }
  
  //eliminar
  deleteExcursion(excursion:Excursion):Observable<void>{
    const urlDeLaExcursion=`${this.jsonUrl}/${excursion.id}`
    return this.http.delete<void>(urlDeLaExcursion); //delete para eliminar
  }
  
}
