import { Component } from '@angular/core';
import { AlojamientosServices } from '../../../services/ServiciosAlojamiento/alojamientos.service';
import { Alojamiento } from '../../../models/Alojamiento'
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from '../../shared/FooterComponente/footer.component';

@Component({
  selector: 'app-lista-Alojamientos',
  standalone: true,
  imports: [UpperCasePipe, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, Footer, CurrencyPipe],
  templateUrl: './lista-alojamientos.component.html',
  styleUrls: ['./lista-alojamientos.component.css']
})
export class ListaAlojamientosComponent {
  Title = 'Lista de Alojamientos';
  Alojamientos: Alojamiento[] = [];

  constructor(private miServicio: AlojamientosServices, private mydialog:MatDialog) {}

  ngOnInit(): void {
    this.getAlojamientos();
  }

  getAlojamientos(): void {
    this.miServicio.getAlojamientos().subscribe((data: Alojamiento[]) => {
      this.Alojamientos = data;
      console.log(this.Alojamientos[0]);
    });
  }

  Reservar(alojamiento: Alojamiento): void {
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: alojamiento.nombre,
        contenido:" ¿Quieres una reserva en este Alojamiento? "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Reserva Realizada",
            contenido:" Realizaste una reserva en el Alojamiento: \"" +alojamiento.nombre+"\"."
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