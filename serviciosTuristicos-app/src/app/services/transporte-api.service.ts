import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transporte } from '../models/transporte';
import { map, Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransporteApiService {

  private apiwebUrl: string;

  constructor(private http: HttpClient, private configService: ConfigServiceService) {
    this.apiwebUrl = `${this.configService.getApiBaseUrl()}/api/Transporte`;
  }

  getTransport():Observable<Transporte[]>{
    return this.http.get<Transporte[]>(this.apiwebUrl);
  }

  //buscar
  getTransportSearch(brand?:string, type?:string):Observable<Transporte[]>{ //espero varias como resul
    return this.http.get<Transporte[]>(this.apiwebUrl).pipe(
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
    return this.http.post<Transporte>(this.apiwebUrl, transporte)
  }

  //editar
  updatetransport(transporte:Transporte):Observable<Transporte>{
    const urlDelTransporte =`${this.apiwebUrl}/${transporte.id}`
    return this.http.put<Transporte>(urlDelTransporte, transporte)
  }

  //eliminar
  deletetransport(transporte:Transporte):Observable<void>{
    const urlDelTransporte =`${this.apiwebUrl}/${transporte.id}`
    return this.http.delete<void>(urlDelTransporte)
  }
}
