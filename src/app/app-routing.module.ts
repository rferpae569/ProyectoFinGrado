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
  { path: 'juegomusica', component:JuegomusicaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
