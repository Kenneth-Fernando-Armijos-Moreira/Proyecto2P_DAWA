import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guia } from '../models/Guia';
import { Observable, map } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuiasApiService {
  private apiwebUrl: string;

  constructor(private http:HttpClient, private configService: ConfigServiceService) {
    this.apiwebUrl = `${this.configService.getApiBaseUrl()}/api/Guia`; 
  }
  getGuides():Observable<Guia[]>{
    return this.http.get<Guia[]>(this.apiwebUrl); 
  }

   //buscar
   getGuidesSearch(name?:string, excursion?:string):Observable<Guia[]>{ 
    return this.http.get<Guia[]>(this.apiwebUrl).pipe(
      map((guias)=>
        guias.filter((guia)=>
        (name ? guia.name.toLowerCase().includes(name.toLowerCase()):true) &&
         (excursion? guia.excursion?.name.toLowerCase().includes(excursion.toLowerCase()):true) 
        )
      )
    );
  }
  //agregar
  addGuide(guia:Guia):Observable<Guia>{
    return this.http.post<Guia>(this.apiwebUrl, guia); //post para agregar algo nuevo
  }

  //editar
  updateGuide(guia:Guia):Observable<Guia>{
    const urlDelGuia = `${this.apiwebUrl}/${guia.id}` 
    return this.http.put<Guia>(urlDelGuia, guia); 
  }

  //eliminacion logica
  deactiveGuia(guia:Guia):Observable<void>{ //delte para eliminar
    const urlDelGuia = `${this.apiwebUrl}/deactive/${guia.id}`
    return this.http.put<void>(urlDelGuia, {});
  }

  /*//eliminar
  deleteGuide(guia:Guia):Observable<void>{ 
    const urlDelGuia = `${this.apiwebUrl}/${guia.id}`
    return this.http.delete<void>(urlDelGuia);
  }*/
}
