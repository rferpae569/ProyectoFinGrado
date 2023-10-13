import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
//Importamos los modulos

@Component({
  selector: 'app-elecciondosj',
  templateUrl: './elecciondosj.component.html',
  styleUrls: ['./elecciondosj.component.scss'],
})
export class ElecciondosjComponent {
  constructor(
    private router: Router,
    private servicio: ServicioService,
    private cookieService: CookieService
  ) {}

  incrementarJugadasImagen() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las imagenes
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
    const nuevo = {
      nombre: nombreuser,
    };
    this.servicio.getIncrementarJugadasImagen(nuevo).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
    const nuevo2 = {
      nombre: nombreuser2,
    };
    this.servicio.getIncrementarJugadasImagen(nuevo2).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
  }

  incrementarJugadasPreguntas() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las preguntas
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
    const nuevo = {
      nombre: nombreuser,
    };
    this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
    const nuevo2 = {
      nombre: nombreuser2,
    };
    this.servicio.getIncrementarJugadasPreguntas(nuevo2).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
  }

  incrementarJugadasMusica() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las canciones
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
    const nuevo = {
      nombre: nombreuser,
    };
    this.servicio.getIncrementarJugadasMusica(nuevo).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
    const nuevo2 = {
      nombre: nombreuser2,
    };
    this.servicio.getIncrementarJugadasMusica(nuevo2).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
  }

  incrementarJugadasSpoiler() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de los spoiler
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
    const nuevo = {
      nombre: nombreuser,
    };
    this.servicio.getIncrementarJugadasSpoiler(nuevo).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
    const nuevo2 = {
      nombre: nombreuser2,
    };
    this.servicio.getIncrementarJugadasSpoiler(nuevo2).subscribe((datos) => {
      console.log('Datos enviados al servidor:', datos);
    });
  }

  irAInicio() {
    //Esta funcion nos llevara al inicio, y borrara las cookies especificadas.
    const cookiesExistentes = ['session', 'session2'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }
}
