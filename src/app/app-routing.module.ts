import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { BorrarComponent } from './borrar/borrar.component';
import { DosjugadoresComponent } from './dosjugadores/dosjugadores.component';
import { EleccionComponent } from './eleccion/eleccion.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { Eleccion2Component } from './eleccion2/eleccion2.component';
import { JuegoimagenfantasiaComponent } from './juegoimagenfantasia/juegoimagenfantasia.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { JuegoimagenterrorComponent } from './juegoimagenterror/juegoimagenterror.component';
import { JuegoimagenfantasiadosjComponent } from './juegoimagenfantasiadosj/juegoimagenfantasiadosj.component';
import { JuegoimagenterrordosjComponent } from './juegoimagenterrordosj/juegoimagenterrordosj.component';
import { JuegopreguntafantasiaComponent } from './juegopreguntafantasia/juegopreguntafantasia.component';
import { JuegopreguntaterrorComponent } from './juegopreguntaterror/juegopreguntaterror.component';
import { JuegopreguntaterrordosjComponent } from './juegopreguntaterrordosj/juegopreguntaterrordosj.component';
import { JuegopreguntafantasiadosjComponent } from './juegopreguntafantasiadosj/juegopreguntafantasiadosj.component';
import { JuegomusicafantasiaComponent } from './juegomusicafantasia/juegomusicafantasia.component';
import { JuegomusicafantasiadosjComponent } from './juegomusicafantasiadosj/juegomusicafantasiadosj.component';
import { JuegomusicaterrorComponent } from './juegomusicaterror/juegomusicaterror.component';
import { JuegomusicaterrordosjComponent } from './juegomusicaterrordosj/juegomusicaterrordosj.component';
import { FormularioencuestaComponent } from './formularioencuesta/formularioencuesta.component';
import { InfoCookieComponent } from './info-cookie/info-cookie.component';
import { JuegoimagenficcionComponent } from './juegoimagenficcion/juegoimagenficcion.component';
import { JuegoimagenficciondosjComponent } from './juegoimagenficciondosj/juegoimagenficciondosj.component';
import { JuegopreguntaficcionComponent } from './juegopreguntaficcion/juegopreguntaficcion.component';
import { JuegopreguntaficciondosjComponent } from './juegopreguntaficciondosj/juegopreguntaficciondosj.component';
import { JuegomusicaficcionComponent } from './juegomusicaficcion/juegomusicaficcion.component';
import { JuegomusicaficciondosjComponent } from './juegomusicaficciondosj/juegomusicaficciondosj.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { TerminosServiciosComponent } from './terminos-servicios/terminos-servicios.component';
//importamos los modulos y los componentes necesarios

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'actualizar', component: ActualizarComponent },
  { path: 'borrar', component: BorrarComponent},
  { path: 'dosjugadores', component:DosjugadoresComponent},
  { path: 'eleccion', component:EleccionComponent},
  { path: 'clasificacion', component:ClasificacionComponent},
  { path: 'cartelera', component:CarteleraComponent},
  { path: 'juegoimagenfantasia', component:JuegoimagenfantasiaComponent},
  { path: 'juegoimagenterror', component:JuegoimagenterrorComponent},
  { path: 'juegopreguntafantasia', component:JuegopreguntafantasiaComponent},
  { path: 'juegopreguntafantasiadosj', component:JuegopreguntafantasiadosjComponent},
  { path: 'juegopreguntaterror', component:JuegopreguntaterrorComponent},
  { path: 'juegopreguntaterrordosj', component:JuegopreguntaterrordosjComponent},
  { path: 'eleccion2', component:Eleccion2Component},
  { path: 'juegoimagenfantasiadosj', component:JuegoimagenfantasiadosjComponent},
  { path: 'juegoimagenterrordosj', component:JuegoimagenterrordosjComponent},
  { path: 'juegomusicafantasia', component: JuegomusicafantasiaComponent},
  { path: 'juegomusicafantasiadosj', component: JuegomusicafantasiadosjComponent},
  { path: 'juegomusicaterror', component: JuegomusicaterrorComponent},
  { path: 'juegomusicaterrordosj', component: JuegomusicaterrordosjComponent},
  { path: 'encuesta', component:FormularioencuestaComponent},
  { path: 'infocookie', component:InfoCookieComponent},
  { path: 'juegoimagenficcion', component:JuegoimagenficcionComponent},
  { path: 'juegoimagenficciondosj', component: JuegoimagenficciondosjComponent},
  { path: 'juegopreguntaficcion', component: JuegopreguntaficcionComponent},
  { path: 'juegopreguntaficciondosj', component: JuegopreguntaficciondosjComponent},
  { path: 'juegomusicaficcion', component:JuegomusicaficcionComponent},
  { path: 'juegomusicaficciondosj', component:JuegomusicaficciondosjComponent},
  { path: 'sobrenosotros', component:SobreNosotrosComponent},
  { path: 'contactanos', component:ContactanosComponent},
  { path: 'avisolegal', component:AvisoLegalComponent},
  { path: 'politicaprivacidad', component:PoliticaPrivacidadComponent},
  // { path: 'terminosservicios', component:TerminosServiciosComponent}
  //Creamos las rutas para cada componente

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
