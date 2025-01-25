import { OnInit, AfterViewInit,Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guia } from '../../../models/Guia';
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
import { GuiasApiService } from '../../../services/guias-api.service';
import { Excursion } from '../../../models/Excursion';
import { ExcursionesApiService } from '../../../services/excursiones-api.service';


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
export class CrudGuiasTuristicosComponent implements OnInit, AfterViewInit{
  Title = 'CRUD de Guías Turísticos';
  form!:FormGroup;
  isEditMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Guia>();
  columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'age', label: 'Edad' },
    { key: 'years_of_Experience', label: 'Años de experiencia' }
  ];
  @ViewChild(MatPaginator)paginator!:MatPaginator;

  excursiones!:Excursion[];

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator; 
  }

  ngOnInit():void{
    this.getGuides();
    this.getExcursiones();
    //inicializar variables 
    this.form = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      age: ["",[Validators.required, Validators.min(20), Validators.max(40)]],
      years_of_Experience: ["",Validators.required],
      image: [""],
      excursion:["", Validators.required],

    });
  
  }
  constructor(private guideService: GuiasApiService, 
    private excursionService:ExcursionesApiService,
    private fb:FormBuilder, 
    private mydialog: MatDialog, private snackBar: MatSnackBar ){
    
  }

  getGuides():void{
    this.guideService.getGuides().subscribe((datos:Guia[])=>{
      this.dataSource.data = datos;
      }); 
  }

  getExcursiones():void{
    this.excursionService.getExcursions().subscribe((datos:Excursion[])=>{
      this.excursiones = datos;
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
        this.guideService.deactiveGuia(guia).subscribe(()=>{
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
    console.log('Datos de la guía:', guia);

    //obtener la excursion de la pelicula a editar
    
    let excursionSeleccionada = this.excursiones.find((g)=>g.id==guia.ExcursionId);
    
    //cargar datos del guia
    this.form.setValue({
      name:guia.name,
      age:guia.age,
      years_of_Experience:guia.years_of_Experience,
      image: guia.image,
      //excursion:excursionSeleccionada,
      excursion: excursionSeleccionada ? excursionSeleccionada.id : null,


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
    newGuia.active=true;


    newGuia.ExcursionId = (newGuia.excursion?.id)?newGuia.excursion.id:0;


    if(this.isEditMode){//editar
      newGuia.id=this.currentId;
      this.guideService.updateGuide(newGuia).subscribe((updateGuia)=>{
        SnackBarExito.showSnackBar(this.snackBar, `Guía "${newGuia.name}" editado exitosamente.`);
          this.getGuides();
      });
    }else{//agregar
      delete newGuia.excursion;

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
      years_of_Experience:'',
      image:'',
      excursion: ''

    });
    this.currentId=0;
    this.isEditMode=false;
  }


  

}
