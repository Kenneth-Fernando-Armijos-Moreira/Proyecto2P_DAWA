import { Component, Inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData{
  titulo: string;
  contenido: string;
}

@Component({
  selector: 'dialogo-exito',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatCardModule],
  templateUrl: '../Dialogo-Exito/dialogo-exito.component.html',
  styleUrl: '../Dialogo-Exito/dialogo-exito.component.css'
})
export class DialogoExito {
  constructor(public dialogRef:MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData){
    }
  
  onAceptar():void{
    this.dialogRef.close("aceptar");
  }
}
