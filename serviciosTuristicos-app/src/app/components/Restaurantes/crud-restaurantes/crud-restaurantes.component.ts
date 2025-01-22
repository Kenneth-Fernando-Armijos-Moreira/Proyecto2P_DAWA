import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Restaurante } from '../../../models/restaurante'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RestaurantesService } from '../../../services/ServiciosRestaurantes/restaurantes.service';
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
import { RestauranteApiService } from '../../../services/restaurante-api.service';

@Component({
  selector: 'app-crud-restaurantes',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatRadioModule, MatSelectModule, MatCheckboxModule, MatOptionModule, MatFormFieldModule,
    MatNativeDateModule, ReactiveFormsModule, MatDividerModule, TablaCrudComponent, Footer],
  templateUrl: './crud-restaurantes.component.html',
  styleUrl: './crud-restaurantes.component.css'
})
export class CrudRestaurantesComponent {
  Title = 'CRUD de Restaurantes';
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Restaurante>();
  columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'especialidad', label: 'Especialidad' },
    { key: 'direccion', label: 'Dirección' }
  ];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void{
    this.getRestaurantes();
    this.form = this.fb.group({
      nombre: ["",[Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      tipo: ["", Validators.required],
      especialidad: ["",[Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]+$/)]],
      calificacion: ["",[Validators.required, Validators.min(0.5), Validators.max(5)]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.]+$/)]],
      foto: ["", [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/)]]
    });
  
  }
  constructor(private RestaurantesService: RestauranteApiService, private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
  }

  getRestaurantes():void{
    this.RestaurantesService.getRestaurantes().subscribe((datos:Restaurante[])=>{
      this.dataSource.data = datos;
      }); 
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){
      this.RestaurantesService.getRestaurantesSearch(searchInput.value).subscribe((datos:Restaurante[])=>{
        this.dataSource.data = datos;
      });

    }else{
      this.getRestaurantes();
    }
  }

  eliminar(Restaurante:Restaurante){
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: "Eliminacion de Restaurante",
        contenido: "Estas seguro de eliminar el Restaurante " +Restaurante.nombre +"?"

      },
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){
        this.RestaurantesService.deleteRestaurantes(Restaurante).subscribe(()=>{
          SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${Restaurante.nombre}" eliminado exitosamente.`);
          this.getRestaurantes();
        });
      }else if(result==="cancelar"){
        console.error("Cancelar");
      }
    });
  }

  editar(restaurante:Restaurante){
    this.isEditMode=true;
    if(restaurante && restaurante.id){
      this.currentId = restaurante.id;
    }else{
      console.log("Restaurante o id del Restaurante undefined")
    }

    this.form.setValue({
      nombre:restaurante.nombre,
      tipo:restaurante.tipo,
      especialidad:restaurante.especialidad,
      calificacion:restaurante.calificacion,
      direccion:restaurante.direccion,
      foto:restaurante.foto,
    });
  }

  onSubmit(){
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    const newRestaurante:Restaurante = this.form.value;

    if(this.isEditMode){
      newRestaurante.id=this.currentId;
      this.RestaurantesService.updateRestaurantes(newRestaurante).subscribe((updateRestaurantes)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${newRestaurante.nombre}" editado exitosamente.`);
        this.getRestaurantes();
      });
    }else{
      this.RestaurantesService.addRestaurantes(newRestaurante).subscribe((addRestaurantes)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Restaurante "${newRestaurante.nombre}" agregado exitosamente.`);
        this.getRestaurantes();
    });
    }
    this.clearForm();

  }
  clearForm():void{
    this.form.reset({
      nombre:'',
      tipo:'',
      especialidad:'',
      calificacion:'',
      direccion:'',
      foto:''
    });
    this.currentId=0;
    this.isEditMode=false;
  }
}
