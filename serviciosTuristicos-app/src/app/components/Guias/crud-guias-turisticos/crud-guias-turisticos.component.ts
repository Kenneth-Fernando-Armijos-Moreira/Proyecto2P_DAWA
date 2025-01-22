import { OnInit, AfterViewInit,Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guia } from '../../../models/Guia';
import { GuiasjsonService } from '../../../services/ServiciosGuias/guiasjson.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacion } from '../../shared/Dialogo-Confirmacion/dialogo-confirmacion.component';
import { MatNativeDateModule, MatOptionModule, _MatInternalFormField } from '@angular/material/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { SnackBarExito } from "../../shared/SnackBar-Exito/snackbar-exito.component";
import { TablaCrudComponent } from "../../shared/TablaCRUD/tabla-crud.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Footer } from '../../shared/FooterComponente/footer.component';

@Component({
  selector: 'app-crud-guias-turisticos',
  standalone: true,
  imports: [MatFormField, MatLabel, MatButtonModule, MatInputModule, MatTableModule, MatPaginatorModule,
    MatSelectModule, MatCheckboxModule, MatOptionModule,MatFormFieldModule,
    ReactiveFormsModule, MatNativeDateModule, MatDividerModule, TablaCrudComponent, Footer
  ],
  templateUrl: './crud-guias-turisticos.component.html',
  styleUrl: './crud-guias-turisticos.component.css'
})
export class CrudGuiasTuristicosComponent {
  Title = 'CRUD de Guías Turísticos';
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Guia>();
  columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'age', label: 'Edad' },
    { key: 'excursion', label: 'Excursión a cargo' }
  ];
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator; 
  }

  ngOnInit():void{
    this.getGuides();
    //inicializar variables 
    this.form = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      age: ["",[Validators.required, Validators.min(20), Validators.max(40)]],
      vehicle: [false],
      years_of_experience: ["",Validators.required],
      excursion: ["",[Validators.required, Validators.minLength(8)]],
      image: [""]
    });
  
  }
  constructor(private guideService: GuiasjsonService, private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
  }

  getGuides():void{
    this.guideService.getGuides().subscribe((datos:Guia[])=>{
      this.dataSource.data = datos;
      }); 
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){ 
      this.guideService.getGuidesSearch(searchInput.value).subscribe((datos:Guia[])=>{
        this.dataSource.data = datos;
      });

    }else{ //listar todas las actividades
      this.getGuides();
    }
  }

  eliminar(guia:Guia){
    const dialogRef= this.mydialog.open(DialogoConfirmacion,{
      data:{
        titulo: "Eliminacion de guia",
        contenido: "Estas seguro de eliminar al guia " +guia.name +"?"

      },
    });    
    dialogRef.afterClosed().subscribe(result=>{
      if(result==="aceptar"){
        this.guideService.deleteGuide(guia).subscribe(()=>{
          SnackBarExito.showSnackBar(this.snackBar, `Guía "${guia.name}" eliminado exitosamente.`);
          this.getGuides();
        });
      }else if(result==="cancelar"){
        console.error("Cancelar");
      }
    });
  }

  editar(guia:Guia){
    this.isEditMode=true;
    if(guia && guia.id){
      this.currentId = guia.id;
    }else{
      console.log("Guia o id de la actividad undefined")
    }

    //cargar datos del guia
    this.form.setValue({
      name:guia.name,
      age:guia.age,
      vehicle:guia.vehicle,
      years_of_experience:guia.years_of_experience,
      excursion:guia.excursion,
      image: guia.image,
    });
  }

  onSubmit(){
    //guardar la actividad
    if(this.form.invalid){
      console.log("invalid");
      return;
    }

    //obtener los datos de los controles del formulario
    const newGuia:Guia = this.form.value;

    if(this.isEditMode){//editar
      newGuia.id=this.currentId;
      this.guideService.updateGuide(newGuia).subscribe((updateGuia)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Guía "${newGuia.name}" editado exitosamente.`);
          this.getGuides();
      });
    }else{//agregar
      this.guideService.addGuide(newGuia).subscribe((updateGuia)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Guía "${newGuia.name}" agregado exitosamente.`);
        this.getGuides();
    });
    }
    this.clearForm();

  }
  clearForm():void{
    this.form.reset({
      name:'',
      age:'',
      vehicle:'',
      years_of_experience:'',
      excursion:'',
      image:''
    });
    this.currentId=0;
    this.isEditMode=false;
  }

}
