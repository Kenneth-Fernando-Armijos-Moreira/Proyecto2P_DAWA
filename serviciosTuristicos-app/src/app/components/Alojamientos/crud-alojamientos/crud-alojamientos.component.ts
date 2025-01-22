import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarExito } from "../../shared/SnackBar-Exito/snackbar-exito.component";
import { TablaCrudComponent } from "../../shared/TablaCRUD/tabla-crud.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Footer } from '../../shared/FooterComponente/footer.component';
import { Alojamiento } from '../../../models/Alojamiento';
import { AlojamientosServices } from '../../../services/ServiciosAlojamiento/alojamientos.service';

@Component({
  selector: 'app-crud-alojamientos',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule, MatDividerModule, TablaCrudComponent, Footer],
  templateUrl: './crud-alojamientos.component.html',
  styleUrl: './crud-alojamientos.component.css'
})
export class CrudAlojamientosComponent {
  Title = 'CRUD de Alojamientos';
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Alojamiento>();
  columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'capacidad', label: 'Especialidad' },
    { key: 'direccion', label: 'Dirección' }
  ];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    this.getAlojamientos();
    this.form = this.fb.group({
      nombre: ["",[Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s&]+$/)]],
      tipo: ["", Validators.required],
      calificacion: ["",[Validators.required, Validators.min(0.5), Validators.max(5)]],
      precio: ["",[Validators.required, Validators.min(20), Validators.max(565)]],
      capacidad: ["",[Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.-]+$/)]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.-]+$/)]],
      foto: ["", [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/)]]
    });
  
  }
  constructor(private AlojamientosService: AlojamientosServices, private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
  }

  getAlojamientos():void{
    this.AlojamientosService.getAlojamientos().subscribe((datos:Alojamiento[])=>{
      this.dataSource.data = datos;
      }); 
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){
      this.AlojamientosService.getAlojamientosSearch(searchInput.value).subscribe((datos:Alojamiento[])=>{
        this.dataSource.data = datos;
      });

    }else{
      this.getAlojamientos();
    }
  }

  eliminar(alojamiento:Alojamiento){
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: "Eliminacion de Alojamiento",
        contenido: "Estas seguro de eliminar el alojamiento " +alojamiento.nombre +"?"

      },
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){
        this.AlojamientosService.deleteAlojamientos(alojamiento).subscribe(()=>{
          SnackBarExito.showSnackBar(this.snackBar, `Alojamiento "${alojamiento.nombre}" eliminado exitosamente.`);
          this.getAlojamientos();
        });
      }else if(result==="cancelar"){
        console.error("Cancelar");
      }
    });
  }

  editar(alojamiento:Alojamiento){
    this.isEditMode=true;
    if(alojamiento && alojamiento.id){
      this.currentId = alojamiento.id;
    }else{
      console.log("Alojamiento o id del Alojamiento undefined")
    }

    this.form.setValue({
      nombre:alojamiento.nombre,
      tipo:alojamiento.tipo,
      calificacion:alojamiento.calificacion,
      precio:alojamiento.precio,
      capacidad:alojamiento.capacidad,
      direccion:alojamiento.direccion,
      foto:alojamiento.foto,
    });
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    const newAlojamiento:Alojamiento = this.form.value;

    if(this.isEditMode){
      newAlojamiento.id=this.currentId;
      this.AlojamientosService.updateAlojamientos(newAlojamiento).subscribe((updateAlojamientos)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Alojamiento "${newAlojamiento.nombre}" editado exitosamente.`);
        this.getAlojamientos();
      });
    }else{
      this.AlojamientosService.addAlojamientos(newAlojamiento).subscribe((addAlojamientos)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Alojamiento "${newAlojamiento.nombre}" agregado exitosamente.`);
        this.getAlojamientos();
    });
    }
    this.clearForm();

  }
  clearForm():void{
    this.form.reset({
      nombre:'',
      tipo:'',
      calificacion:'',
      capacidad:'',
      direccion:'',
      foto:''
    });
    this.currentId=0;
    this.isEditMode=false;
  }
}
