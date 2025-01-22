import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guia } from '../../models/Guia';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiasjsonService {
  private jsonUrl="http://localhost:3000/guias";


  constructor(private http:HttpClient) {
   }
  getGuides():Observable<Guia[]>{
    return this.http.get<Guia[]>(this.jsonUrl); 
  }

   //buscar
   getGuidesSearch(name?:string, excursion?:string):Observable<Guia[]>{ 
    return this.http.get<Guia[]>(this.jsonUrl).pipe(
      map((guias)=>
        guias.filter((guia)=>
        (name ? guia.name.toLowerCase().includes(name.toLowerCase()):true) &&
         (excursion? guia.excursion.toLowerCase().includes(excursion.toLowerCase()):true) 
        )
      )
    );
  }
  //agregar
  addGuide(guia:Guia):Observable<Guia>{
    return this.http.post<Guia>(this.jsonUrl, guia); //post para agregar algo nuevo
  }

  //editar
  updateGuide(guia:Guia):Observable<Guia>{
    const urlDelGuia = `${this.jsonUrl}/${guia.id}` 
    return this.http.put<Guia>(urlDelGuia, guia); 
  }

  //eliminar
  deleteGuide(guia:Guia):Observable<void>{ 
    const urlDelGuia = `${this.jsonUrl}/${guia.id}`
    return this.http.delete<void>(urlDelGuia);
  }
}
