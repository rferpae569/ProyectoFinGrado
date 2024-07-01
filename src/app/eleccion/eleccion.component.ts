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
  usuariosession: string = this.cookieService.get('session');
  usuariosession2: string = this.cookieService.get('session2');
  isDropdownOpen = false;

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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  incrementarJugadasImagenFantasia() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las imagenes de fantasia
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasImagenFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasImagenFantasia(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las imagenes de fantasia para dos jugadores
      this.router.navigate(['juegoimagenfantasiadosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de la imagenes de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasImagenFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasImagenTerror() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las imagenes de terror
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasImagenTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasImagenTerror(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las imagenes de terror para dos jugadores
      this.router.navigate(['juegoimagenterrordosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de la imagenes de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasImagenTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasImagenFiccion() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las imagenes de ficcion
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasImagenFiccion(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasImagenFiccion(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las imagenes de ficcion para dos jugadores
      this.router.navigate(['juegoimagenficciondosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de la imagenes de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasImagenFiccion(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasPreguntasFantasia() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las preguntas de fantasia
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasPreguntasFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasPreguntasFantasia(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las preguntas para dos jugadores
      this.router.navigate(['juegopreguntafantasiadosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las preguntas de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasPreguntasFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasPreguntasTerror() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las preguntas de terror
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasPreguntasTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasPreguntasTerror(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las preguntas para dos jugadores
      this.router.navigate(['juegopreguntaterrordosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las preguntas de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasPreguntasTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasPreguntasFiccion() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las preguntas de ficcion
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasPreguntasFiccion(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasPreguntasFiccion(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las preguntas para dos jugadores
      this.router.navigate(['juegopreguntaficciondosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las preguntas de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasPreguntasFiccion(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasMusicaFantasia() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las canciones
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasMusicaFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasMusicaFantasia(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las canciones para dos jugadores
      this.router.navigate(['juegomusicafantasiadosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las canciones de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasMusicaFantasia(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasMusicaTerror() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las canciones
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasMusicaTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasMusicaTerror(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las canciones para dos jugadores
      this.router.navigate(['juegomusicaterrordosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las canciones de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasMusicaTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });
    } else {
      console.log('Sesiones no encontradas');
    }
  }

  incrementarJugadasMusicaFiccion() {
    //Esta funcion sirve para incrementar el numero de jugadas de los usuarios que han iniciado sesion en el juego de las canciones
    //Si son dos usuarios, lo hara dos veces, una para cada uno
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');

    if (nombreuser && nombreuser2) {
      const nuevo = {
        nombre: nombreuser,
      };

      this.servicio
        .getIncrementarJugadasMusicaFiccion(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      const nuevo2 = {
        nombre: nombreuser2,
      };

      this.servicio
        .getIncrementarJugadasMusicaFiccion(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      // Si ambos usuarios están en sesión, redirige al juego de las canciones para dos jugadores
      this.router.navigate(['juegomusicaficciondosj']);
    } else if (nombreuser) {
      //Si solo es un jugador, hara la incrementacion una vez para el usuario correspondiente y ira al juego de las canciones de un jugador
      const nuevo = { nombre: nombreuser };
      this.servicio
        .getIncrementarJugadasMusicaFiccion(nuevo)
        .subscribe((datos) => {
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
      'session2',
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }
}
