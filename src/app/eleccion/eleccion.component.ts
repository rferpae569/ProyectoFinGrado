import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
//Importamos los modulos

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss'],
  providers: [ServicioService],
})
export class EleccionComponent {
  menuActive: boolean = false;

  constructor(
    private router: Router,
    private servicio: ServicioService,
    private cookieService: CookieService
  ) {
    // Verificamos si la cookie 'session' existe al acceder al componente
    if (!this.cookieService.check('session')) {
      // Si la cookie no existe, redirigimos al componente 'inicio'
      this.router.navigate(['inicio']);
    }
  }

  incrementarJugadasImagen() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las imagenes
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
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

      // Si ambos usuarios están en sesión, redirige al juego de las imagenes para dos jugadores
      this.router.navigate(['juegoimagendosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de la imagenes de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio.getIncrementarJugadasImagen(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasPreguntas() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las preguntas
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasPreguntas(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las preguntas para dos jugadores
      this.router.navigate(['juegopreguntadosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las preguntas de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasMusica() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las canciones
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
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

      // Si ambos usuarios están en sesión, redirige al juego de las canciones para dos jugadores
      this.router.navigate(['juegomusicadosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las canciones de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio.getIncrementarJugadasMusica(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasSpoiler() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de los spoiler
    //Si son dos usuaros, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
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

      // Si ambos usuarios están en sesión, redirige al juego de los spoiler para dos jugadores
      this.router.navigate(['juegospoilerdosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de los spoiler de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio.getIncrementarJugadasSpoiler(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  irAInicio() {
    //Esta funcion nos llevara al inicio, y borrara las cookies especificadas.
    const cookiesExistentes = [
      'numero',
      'palabra',
      'puntos',
      'puntos2',
      'listapeliculas',
      'intentos',
      'intentos2',
      'peliculas',
      'pistas',
      'preguntas',
      'session',
      'session2'
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }

  toggleMenu() {
    //Esta funcion sirve para cambiar el valor del menu.
    this.menuActive = !this.menuActive;
  }
}
