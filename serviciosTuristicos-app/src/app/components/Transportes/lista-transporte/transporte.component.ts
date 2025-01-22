import { Component } from '@angular/core';
import { Transporte } from '../../../models/transporte';
import { TransportejsonService } from '../../../services/ServiciosTransportes/transportejson.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from '../../shared/FooterComponente/footer.component';
import { TransporteApiService } from '../../../services/transporte-api.service';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [UpperCasePipe, CurrencyPipe, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, Footer],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.css'
})
export class TransporteComponent {
  title= "Lista de Transportes";
  transport: Transporte[]=[];
  constructor(private miServicio:TransporteApiService, private mydialog:MatDialog){

  }

  ngOnInit():void{
    this.getTransporte();
  }

  getTransporte():void{
    this.miServicio.getTransport().subscribe((data: Transporte[])=>{
      this.transport = data;
      console.log(this.transport[0]);

    });
  }
  Reservar(transport:Transporte):void{
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: transport.brand,
        contenido:"¿Quieres reservar este vehículo? "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Reserva Realizada",
            contenido:" Realizaste una reserva del: \"" +transport.brand+"\"."
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
