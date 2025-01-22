import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transporte } from '../../models/transporte';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportejsonService {
  private jsonUrl="http://localhost:3000/transporte";
  constructor(private http:HttpClient) { }

  getTransport():Observable<Transporte[]>{
    return this.http.get<Transporte[]>(this.jsonUrl);
  }

  //buscar
  getTransportSearch(brand?:string, type?:string):Observable<Transporte[]>{ //espero varias como resul
    return this.http.get<Transporte[]>(this.jsonUrl).pipe(
      map((Transportes)=>
        Transportes.filter((transporte)=>
        (brand ? transporte.brand.toLowerCase().includes(brand.toLowerCase()):true) &&
         (type ? transporte.type.toLowerCase().includes(type.toLowerCase()):true) 
        )
      )
    );
  }

  //agregar
  addtransport(transporte:Transporte):Observable<Transporte>{
    return this.http.post<Transporte>(this.jsonUrl, transporte)
  }

  //editar
  updatetransport(transporte:Transporte):Observable<Transporte>{
    const urlDelTransporte =`${this.jsonUrl}/${transporte.id}`
    return this.http.put<Transporte>(urlDelTransporte, transporte)
  }

  //eliminar
  deletetransport(transporte:Transporte):Observable<void>{
    const urlDelTransporte =`${this.jsonUrl}/${transporte.id}`
    return this.http.delete<void>(urlDelTransporte)
  }
}
