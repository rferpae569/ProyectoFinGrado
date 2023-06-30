import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { BorrarComponent } from './borrar/borrar.component';
import { DosjugadoresComponent } from './dosjugadores/dosjugadores.component';
import { EleccionComponent } from './eleccion/eleccion.component';
import { JuegoimagenComponent } from './juegoimagen/juegoimagen.component';
import { JuegopreguntaComponent } from './juegopregunta/juegopregunta.component';
import { JuegomusicaComponent } from './juegomusica/juegomusica.component';
import { Eleccion2Component } from './eleccion2/eleccion2.component';
import { ElecciondosjComponent } from './elecciondosj/elecciondosj.component';
import { JuegoimagendosjComponent } from './juegoimagendosj/juegoimagendosj.component';
import { JuegomusicadosjComponent } from './juegomusicadosj/juegomusicadosj.component';
import { Eleccion2dosjComponent } from './eleccion2dosj/eleccion2dosj.component';
import { JuegopreguntadosjComponent } from './juegopreguntadosj/juegopreguntadosj.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'actualizar', component: ActualizarComponent },
  { path: 'borrar', component: BorrarComponent},
  { path: 'dosjugadores', component:DosjugadoresComponent},
  { path: 'eleccion', component:EleccionComponent},
  { path: 'juegoimagen', component:JuegoimagenComponent},
  { path: 'juegopregunta', component:JuegopreguntaComponent},
  { path: 'juegomusica', component:JuegomusicaComponent},
  { path: 'eleccion2', component:Eleccion2Component},
  { path: 'elecciondosj', component:ElecciondosjComponent},
  { path: 'juegoimagendosj', component:JuegoimagendosjComponent},
  { path: 'juegopreguntadosj', component:JuegopreguntadosjComponent},
  { path: 'juegomusicadosj', component:JuegomusicadosjComponent},
  { path: 'eleccion2dosj', component:Eleccion2dosjComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
