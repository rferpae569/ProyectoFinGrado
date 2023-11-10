import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { BorrarComponent } from './borrar/borrar.component';
import { DosjugadoresComponent } from './dosjugadores/dosjugadores.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EleccionComponent } from './eleccion/eleccion.component';
import { JuegoimagenComponent } from './juegoimagen/juegoimagen.component';
import { JuegopreguntaComponent } from './juegopregunta/juegopregunta.component';
import { JuegomusicaComponent } from './juegomusica/juegomusica.component';
import { Eleccion2Component } from './eleccion2/eleccion2.component';
import { ElecciondosjComponent } from './elecciondosj/elecciondosj.component';
import { JuegoimagendosjComponent } from './juegoimagendosj/juegoimagendosj.component';
import { JuegopreguntadosjComponent } from './juegopreguntadosj/juegopreguntadosj.component';
import { JuegomusicadosjComponent } from './juegomusicadosj/juegomusicadosj.component';
import { Eleccion2dosjComponent } from './eleccion2dosj/eleccion2dosj.component';
import { JuegospoilerComponent } from './juegospoiler/juegospoiler.component';
import { JuegospoilerdosjComponent } from './juegospoilerdosj/juegospoilerdosj.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//importamos los modules y los ocmponentes correspondientes

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    ActualizarComponent,
    BorrarComponent,
    DosjugadoresComponent,
    EleccionComponent,
    JuegoimagenComponent,
    JuegopreguntaComponent,
    JuegomusicaComponent,
    Eleccion2Component,
    ElecciondosjComponent,
    JuegoimagendosjComponent,
    JuegopreguntadosjComponent,
    JuegomusicadosjComponent,
    Eleccion2dosjComponent,
    JuegospoilerComponent,
    JuegospoilerdosjComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
