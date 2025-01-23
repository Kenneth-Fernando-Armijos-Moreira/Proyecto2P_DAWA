import { Component } from '@angular/core';
import { Excursion } from '../../../models/Excursion';
import { ExcursionesjsonService } from '../../../services/ServiciosExcursiones/excursionesjson.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { DialogoConfirmacion } from "../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component";
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { Footer } from '../../shared/FooterComponente/footer.component';
import { ExcursionesApiService } from '../../../services/excursiones-api.service';

@Component({
  selector: 'app-lista-excursiones',
  standalone: true,
  imports: [MatCardModule,MatIconModule, MatButtonModule, CurrencyPipe, MatDividerModule, MatDividerModule, Footer],
  templateUrl: './lista-excursiones.component.html',
  styleUrl: './lista-excursiones.component.css'
})
export class ListaExcursionesComponent {
  title="Lista de Excursiones";
  excursions: Excursion[]=[];
  constructor(private miServicio:ExcursionesApiService
    , private mydialog:MatDialog){
  }

  ngOnInit():void{
    this.getExcursiones();
  }

  getExcursiones():void{
    this.miServicio.getExcursions().subscribe((data:Excursion[])=>{
      this.excursions= data;
    });
  }

  reservar(excursion:Excursion):void{
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: excursion.name,
        contenido:" ¿Quieres realizar la reserva? "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Reserva Realizada",
            contenido:" Realizaste una reserva de: \"" +excursion.name+"\"."
          }
        });
        dialogRef.afterClosed().subscribe(result=>{
          if(result === "aceptar"){
            console.log("Aceptar");
        }});
      }else if(result === "cancelar"){
        console.error("Cancelar");
      }
    })
  }
}
