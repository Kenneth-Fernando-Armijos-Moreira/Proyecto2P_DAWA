import { Component } from '@angular/core';
import { Guia } from '../../../models/Guia';
import { GuiasApiService} from '../../../services/guias-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { DialogoExito } from "../../shared/Dialogo-Exito/dialogo-exito.component";
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from '../../shared/FooterComponente/footer.component';

@Component({
  selector: 'app-lista-guias-turisticos',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    MatDividerModule, Footer
  ],
  templateUrl: './lista-guias-turisticos.component.html',
  styleUrl: './lista-guias-turisticos.component.css'
})
export class ListaGuiasTuristicosComponent {
  Title = 'Lista de Guías Turísticos';
  guides: Guia[] = [];
  constructor(private miServicio:GuiasApiService, private mydialog:MatDialog){
  }

  ngOnInit():void{
    this.getGuias();
  }
  
  getGuias():void{
    this.miServicio.getGuides().subscribe((data: Guia[])=>{
      this.guides = data;
      console.log(this.guides[0]);

    });
  }

  contratar(guide:Guia):void{
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: guide.name,
        contenido:"¿Quieres a este guia para tu visita?"
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result === "aceptar"){
        const dialogRef= this.mydialog.open(DialogoExito,{
          data:{
            titulo: "Contrato realizado",
            contenido:" Contrataste a: \"" +guide.name+"\"."
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
