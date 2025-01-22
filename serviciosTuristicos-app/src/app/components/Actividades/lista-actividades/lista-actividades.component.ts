import { Component } from '@angular/core';
import { Actividad } from '../../../models/Actividad';
import { ActividadesjsonService } from '../../../services/ServiciosActividades/actividadesjson.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from '../../shared/FooterComponente/footer.component';



@Component({
  selector: 'app-lista-actividades',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe,
    MatDividerModule, Footer
  ],
  templateUrl: './lista-actividades.component.html',
  styleUrl: './lista-actividades.component.css'
})
export class ListaActividadesComponent {
  Title = 'Lista de Actividades';
  activities: Actividad[] = [];
  constructor(private miServicio:ActividadesjsonService, private mydialog:MatDialog){
  }

  ngOnInit():void{
    this.getActividades();
  }

  getActividades():void{
    this.miServicio.getActivities().subscribe((data: Actividad[])=>{
      this.activities = data;
      console.log(this.activities[2]);

    });
  }

  adquirir(activity:Actividad):void{
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: activity.name,
        contenido:"¿Quieres adquirir esta actividad?"
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Adquisicion Realizada",
            contenido:" Adquiriste la actividad de : \"" +activity.name+"\"."
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
