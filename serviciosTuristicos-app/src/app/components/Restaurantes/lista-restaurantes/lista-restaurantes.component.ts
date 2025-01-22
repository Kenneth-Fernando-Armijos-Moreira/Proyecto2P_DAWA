import { Component } from '@angular/core';
import { RestaurantesService } from '../../../services/ServiciosRestaurantes/restaurantes.service';
import { Restaurante } from '../../../models/restaurante';
import { UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from '../../shared/FooterComponente/footer.component';
import { RestauranteApiService } from '../../../services/restaurante-api.service';

@Component({
  selector: 'app-lista-restaurantes',
  standalone: true,
  imports: [UpperCasePipe, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, Footer],
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent {
  Title = 'Lista de Restaurantes';
  restaurantes: Restaurante[] = [];

  constructor(private miServicio: RestauranteApiService, private mydialog:MatDialog) {}

  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.miServicio.getRestaurantes().subscribe((data: Restaurante[]) => {
      this.restaurantes = data;
      console.log(this.restaurantes[0]);
    });
  }

  Reservar(restaurante: Restaurante): void {
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: restaurante.nombre,
        contenido:" ¿Quieres reservar este restaurante? "
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Reserva Realizada",
            contenido:" Realizaste una reserva en el restaurante: \"" +restaurante.nombre+"\" Que disfrute su comida."
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