import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
//Importamos los modulos

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss'],
  providers: [ServicioService]
})
export class EleccionComponent{

  constructor(private servicio: ServicioService, private cookieService: CookieService) {}

  incrementarJugadasImagen(){ //Esta funcion sirve para incrementar el numero de jugadas del usuario que ha iniciado sesion en el juego de las imagenes
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasImagen(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasPreguntas(){ //Esta funcion sirve para incrementar el numero de jugadas del usuario que ha iniciado sesion en el juego de las preguntas
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasMusica(){ //Esta funcion sirve para incrementar el numero de jugadas del usuario que ha iniciado sesion en el juego de las canciones
    const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasMusica(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasSpoiler(){ //Esta funcion sirve para incrementar el numero de jugadas del usuario que ha iniciado sesion en el juego de los spoiler
    const nombreuser = this.cookieService.get('session');
    const nuevo = {
      nombre: nombreuser
    };
        this.servicio.getIncrementarJugadasSpoiler(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
  }

}

