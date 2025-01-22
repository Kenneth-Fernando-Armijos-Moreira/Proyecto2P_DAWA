import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData{
  titulo: string;
  contenido: string;
}

@Component({
  selector: 'dialogo-confirmacion',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrl: './dialogo-confirmacion.component.css'
})
export class DialogoConfirmacion {
  constructor(public dialogRef:MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData){
    }
  
  onAceptar():void{
    this.dialogRef.close("aceptar");
  }
  onCancelar():void{
    this.dialogRef.close("cancelar");
  }
}
