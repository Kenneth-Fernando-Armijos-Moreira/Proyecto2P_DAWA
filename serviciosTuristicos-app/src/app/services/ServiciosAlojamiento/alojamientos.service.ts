import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Alojamiento } from '../../models/Alojamiento'

@Injectable({
  providedIn: 'root'
})
export class AlojamientosServices {
  private jsonUrl="http://localhost:3000/alojamientos";
  constructor( private http:HttpClient) { 
  }

  getAlojamientos(): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(this.jsonUrl);
  }

   getAlojamientosSearch(nombre?:string, capacidad?:string):Observable<Alojamiento[]>{
    return this.http.get<Alojamiento[]>(this.jsonUrl).pipe(
      map((alojamientos)=>
        alojamientos.filter((alojamientos)=>
        (nombre? alojamientos.nombre.toLowerCase().includes(nombre.toLowerCase()):true) &&
         (capacidad? alojamientos.capacidad.toLowerCase().includes(capacidad.toLowerCase()):true) 
        )
      )
    );
  }

  addAlojamientos(Alojamiento:Alojamiento):Observable<Alojamiento>{
    return this.http.post<Alojamiento>(this.jsonUrl, Alojamiento);
  }

  updateAlojamientos(Alojamiento:Alojamiento):Observable<Alojamiento>{
    const urlDelAlojamiento = `${this.jsonUrl}/${Alojamiento.id}`
    return this.http.put<Alojamiento>(urlDelAlojamiento, Alojamiento);
  }
  
  deleteAlojamientos(Alojamiento:Alojamiento):Observable<void>{
    const urlDelAlojamiento = `${this.jsonUrl}/${Alojamiento.id}`
    return this.http.delete<void>(urlDelAlojamiento);
  }
}
