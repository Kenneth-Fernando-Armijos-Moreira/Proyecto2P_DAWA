import { Routes } from '@angular/router';
import { ListaActividadesComponent } from './components/Actividades/lista-actividades/lista-actividades.component';
import { CrudActividadesRecreativasComponent } from './components/Actividades/crud-actividades-recreativas/crud-actividades-recreativas.component';
import { ListaGuiasTuristicosComponent } from './components/Guias/lista-guias-turisticos/lista-guias-turisticos.component';
import { CrudGuiasTuristicosComponent } from './components/Guias/crud-guias-turisticos/crud-guias-turisticos.component';
import { CrudTransporteComponent } from './components/Transportes/crud-transporte/crud-transporte.component';
import { TransporteComponent } from './components/Transportes/lista-transporte/transporte.component';
import { CrudRestaurantesComponent } from './components/Restaurantes/crud-restaurantes/crud-restaurantes.component';
import { ListaRestaurantesComponent } from './components/Restaurantes/lista-restaurantes/lista-restaurantes.component';
import { ListaExcursionesComponent } from './components/Excursiones/lista-excursiones/lista-excursiones.component';
import { CrudExcursionesComponent } from './components/Excursiones/crud-excursiones/crud-excursiones.component';
import { ListaAlojamientosComponent } from './components/Alojamientos/lista-alojamientos/lista-alojamientos.component';
import { IndexComponent } from './components/index/index.component';
import { CrudAlojamientosComponent } from './components/Alojamientos/crud-alojamientos/crud-alojamientos.component';


export const routes: Routes = [
    {path:"crud-actividadesRecreativas", component: CrudActividadesRecreativasComponent},
    {path:"crud-alojamientos", component: CrudAlojamientosComponent},
    {path:"crud-excursiones", component: CrudExcursionesComponent},
    {path:"crud-guias-turisticos", component: CrudGuiasTuristicosComponent},
    {path:"crud-restaurantes", component: CrudRestaurantesComponent},
    {path:"crud-transporte", component: CrudTransporteComponent},
    {path:"index", component:IndexComponent},
    {path:"lista-actividades", component: ListaActividadesComponent},
    {path:"lista-alojamientos", component: ListaAlojamientosComponent},
    {path:"lista-excursiones", component: ListaExcursionesComponent},
    {path:"lista-guias-turisticos", component: ListaGuiasTuristicosComponent},
    {path:"lista-restaurantes", component: ListaRestaurantesComponent},
    {path:"lista-transporte", component: TransporteComponent},
    {path:"", redirectTo: "index", pathMatch:'full'},
    {path:"**", redirectTo: "index"},
    
    {path:"", redirectTo: "index", pathMatch:'full'},
    {path:"**", redirectTo: "index"}
];
