import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

export interface SnackBarData {
  contenido: string;
}

@Component({
  selector: 'app-snack-bar-exito',
  templateUrl: './snackbar-exito.component.html',
  styleUrls: ['./snackbar-exito.component.css'],
})
export class SnackBarExito {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarExito>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {}

  static showSnackBar(snackBar: MatSnackBar, message: string) {
    snackBar.openFromComponent(SnackBarExito, {
      data: { contenido: message },
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

