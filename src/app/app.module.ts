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
import { Eleccion2Component } from './eleccion2/eleccion2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JuegoimagenfantasiaComponent } from './juegoimagenfantasia/juegoimagenfantasia.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { JuegoimagenterrorComponent } from './juegoimagenterror/juegoimagenterror.component';
import { JuegoimagenfantasiadosjComponent } from './juegoimagenfantasiadosj/juegoimagenfantasiadosj.component';
import { JuegoimagenterrordosjComponent } from './juegoimagenterrordosj/juegoimagenterrordosj.component';
import { JuegopreguntafantasiaComponent } from './juegopreguntafantasia/juegopreguntafantasia.component';
import { JuegopreguntafantasiadosjComponent } from './juegopreguntafantasiadosj/juegopreguntafantasiadosj.component';
import { JuegopreguntaterrorComponent } from './juegopreguntaterror/juegopreguntaterror.component';
import { JuegopreguntaterrordosjComponent } from './juegopreguntaterrordosj/juegopreguntaterrordosj.component';
import { JuegomusicafantasiaComponent } from './juegomusicafantasia/juegomusicafantasia.component';
import { JuegomusicafantasiadosjComponent } from './juegomusicafantasiadosj/juegomusicafantasiadosj.component';
import { JuegomusicaterrorComponent } from './juegomusicaterror/juegomusicaterror.component';
import { JuegomusicaterrordosjComponent } from './juegomusicaterrordosj/juegomusicaterrordosj.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { MatSortModule } from '@angular/material/sort';

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
    Eleccion2Component,
    JuegoimagenfantasiaComponent,
    CarteleraComponent,
    JuegoimagenterrorComponent,
    JuegoimagenfantasiadosjComponent,
    JuegoimagenterrordosjComponent,
    JuegopreguntafantasiaComponent,
    JuegopreguntafantasiadosjComponent,
    JuegopreguntaterrorComponent,
    JuegopreguntaterrordosjComponent,
    JuegomusicafantasiaComponent,
    JuegomusicafantasiadosjComponent,
    JuegomusicaterrorComponent,
    JuegomusicaterrordosjComponent,
    ClasificacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
