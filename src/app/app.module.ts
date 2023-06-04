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



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    ActualizarComponent,
    BorrarComponent,
    DosjugadoresComponent,
    EleccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
