import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss'],
  providers: [ServicioService]
})
export class EleccionComponent{

  constructor(private servicio: ServicioService, private cookieService: CookieService) {}

  incrementarJugadasImagen(){
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasImagen(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasPreguntas(){
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasMusica(){
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasMusica(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

}

