import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegospoiler } from '../model/juegospoiler';
//Importamos los modulos

@Component({
  selector: 'app-juegospoilerdosj',
  templateUrl: './juegospoilerdosj.component.html',
  styleUrls: ['./juegospoilerdosj.component.scss'],
})
export class JuegospoilerdosjComponent {
  datos!: Juegospoiler[];
  Respuesta: string = '';
  intentos: number = 0;
  intentos2: number = 0;
  puntos: number = 0;
  puntos2: number = 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = '';
  session2: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  spoilerPeliculas: Array<{ nombre: string; spoiler: string[] }> = [];
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();
  turnoActual: number = 1;
  //Creamos las variables correspondientes

  //Verificamos las cookies, creamos los intentos y establecemos el filtrado de las peliculas
  ngOnInit() {
    const sessionCookieExists = this.cookieService.check('session');
    const sessionCookieExists2 = this.cookieService.check('session2');
    const intentosCookieExists = this.cookieService.check('intentos');
    const intentosCookieExists2 = this.cookieService.check('intentos2');

    if (sessionCookieExists && sessionCookieExists2) {
      this.session = this.cookieService.get('session');
      this.session2 = this.cookieService.get('session2');
    }

    if (intentosCookieExists && intentosCookieExists2) {
      this.intentos = parseInt(this.cookieService.get('intentos'), 10);
      this.intentos2 = parseInt(this.cookieService.get('intentos2'), 10);
    } else {
      this.intentos = 3; // Establecemos el valor inicial en 3 si no existe la cookie 'intentos'
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', '3', expirationDate); // Guardamos la cookie con el valor inicial de 3
      this.intentos2 = 3;
      this.cookieService.set('intentos2', '3', expirationDate); //Guardamos la cookie con el valor inicial de 3 para el segundo jugador
    }

    const listaPeliculasCookie = this.cookieService.get('listapeliculas');

    if (listaPeliculasCookie) {
      this.listaPeliculas = JSON.parse(listaPeliculasCookie);
    }

    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10) || 0;
    const puntoscookie2 = this.cookieService.get('puntos2');
    this.puntos2 = parseInt(puntoscookie2, 10) || 0;

    // Suscribimos los cambios en el control del input para filtrar los títulos
    this.filtroTituloControl.valueChanges
      .pipe(
        startWith(''), // Empezamos con una cadena vacía
        map((value) => value.toLowerCase()) // Convertimos a minúsculas
      )
      .subscribe((filterValue) => {
        // Filtramos los títulos solo si hay un valor en el filtro
        if (filterValue) {
          this.titulosCoincidentes = this.listaPeliculas.filter((titulo) =>
            titulo.toLowerCase().startsWith(filterValue)
          );
        } else {
          this.titulosCoincidentes = []; // Vaciamos la lista de títulos si no hay valor en el filtro
        }
      });

    const turnoGuardado = localStorage.getItem('turno');

    // Verificamos si hay un turno guardado en el almacenamiento local
    if (turnoGuardado) {
      // Si existe, asignamos el valor del turno guardado a la variable 'turnoActual'
      this.turnoActual = Number(turnoGuardado);
    } else {
      // Si no existe, asignamos el valor inicial de 1 a 'turnoActual' y lo guardamos en el almacenamiento local
      this.turnoActual = 1;
      localStorage.setItem('turno', '1');
    }

    // Asignamos la sesión actual basada en el turno actual
    this.session = this.turnoActual === 1 ? this.getCookieValue('session') : '';
    this.session2 =
      this.turnoActual === 2 ? this.getCookieValue('session2') : '';

    // Alternamos el turno para el siguiente ciclo
    this.alternarTurno();
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    // Verificamos si la cookie 'session' y 'session2 existen al acceder al componente
    if (!this.cookieService.check('session' && 'session2')) {
      // Si las cookies no existe, redirigimos al componente 'dosjugadores'
      this.router.navigate(['dosjugadores']);
    }

    // Verificamos si existe la cookie 'peliculas', y si no existe, obtenemos los datos
    const sessionCookieExists = this.cookieService.check('peliculas');
    if (!sessionCookieExists) {
      this.servicioService.getDatosPeliculaSpoiler().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayNombresSpoiler();
        this.seleccionarPalabraSecreta();
      });
    } else {
      //Si no existe, recuperamos los datos guardados en las cookies especificadas
      const spoilerPeliculasCookie = this.cookieService.get('peliculas');
      this.spoilerPeliculas = JSON.parse(spoilerPeliculasCookie);
      const numeroAleatorioCookie = this.cookieService.get('numero');
      this.numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
      const nombrejuegocookie = this.cookieService.get('palabra');
      this.palabrasecreta = nombrejuegocookie;
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);
    }
  }

  //Esta funcion sirve para alternar el turno de los jugadores, y saber cuando le toca a cada uno
  alternarTurno() {
    this.turnoActual = this.turnoActual === 1 ? 2 : 1;
    localStorage.setItem('turno', String(this.turnoActual));
    this.session = this.getCookieValue('session');
    this.session2 = this.getCookieValue('session2');
  }

  getCookieValue(cookieName: string): string {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return '';
  }

  //Generamos un numero aleatorio
  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    // Obtenemos los nombres de las películas desde la cookie 'peliculas'
    const spoilerPeliculasCookie = this.cookieService.get('peliculas');
    this.spoilerPeliculas = JSON.parse(spoilerPeliculasCookie);

    //Comprobamos que no queden mas nombres
    if (!this.spoilerPeliculas || this.spoilerPeliculas.length === 0) {
      //Si no quedan mas, obtenemos el nombre del usuario de la cookie "session", y creamos un objeto con el nombre y sus puntos
      const nombreuser = this.cookieService.get('session');
      const nuevo = {
        nombre: nombreuser,
        puntos: this.puntos,
      };

      //Repetimos el proceso para el jugador 2
      const nombreuser2 = this.cookieService.get('session2');
      const nuevo2 = {
        nombre: nombreuser2,
        puntos: this.puntos2,
      };

      //Enviamos los datos al servidor
      this.servicioService.postDatoRankingSpoiler(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });

      //Enviamos los datos del jugador 2 al servidor
      this.servicioService.postDatoRankingSpoiler(nuevo2).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });

      this.router.navigate(['/eleccion2dosj']); //Nos vamos a "eleccion2dosj"
    }

    //Si existen mas peliculas, continuamos con el codigo, generamos el numero aleatorio y obtenemos la palabra secreta
    const longitudArray = this.spoilerPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;
    this.palabrasecreta = this.spoilerPeliculas[numeroAleatorio].nombre;
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    //Obtenemos el valor de la cookie 'puntos' y se lo asignamos a la variable. Hacemos lo mismo con los puntos del jugador 2
    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10);
    const puntos2cookie = this.cookieService.get('puntos2');
    this.puntos2 = parseInt(puntos2cookie, 10);

    // Establecemos las cookies 'palabra' y 'numero' con la palabra secreta y el número aleatorio, respectivamente
    this.cookieService.set('palabra', this.palabrasecreta, expirationDate);
    this.cookieService.set(
      'numero',
      numeroAleatorio.toString(),
      expirationDate
    );
  }

  enviarRespuesta() {
    // Obtenemos los nombres de las películas desde la cookie 'peliculas'
    const spoilerCookie = this.cookieService.get('peliculas');

    // Obtenemos la palabra secreta actual desde la cookie 'palabra'
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;

    // Obtenemos la respuesta pasada a traves del formulario
    const inputElement = document.querySelector(
      '#respuesta'
    ) as HTMLInputElement;
    this.Respuesta = inputElement.value;

    //Verificamos si la respuesta es correcta (Ya sea en mayuscula o minuscula)
    if (this.Respuesta.toLowerCase() === juegoActual.toLowerCase()) {
      // Obtenemos los datos del spoiler desde la cookie 'peliculas'
      const spoilerData = JSON.parse(spoilerCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      //Obtenemos los puntos y lo intentos de ambos jugadores a traves de las cookies
      const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
      const puntoscookie2 = this.cookieService.get('puntos2');
      this.puntos2 = parseInt(puntoscookie2, 10);
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);

      //Si el turno vale uno, le damos los puntos al jugador1, en caso contrario, se lo damos al jugador2
      if (this.turnoActual === 1) {
        this.puntos += 1;
      } else if (this.turnoActual === 2) {
        this.puntos2 += 1;
      }

      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );

      this.cookieService.set(
        'intentos',
        this.intentos.toString(),
        expirationDate
      );
      this.cookieService.set(
        'intentos2',
        this.intentos2.toString(),
        expirationDate
      );
      this.cookieService.set('puntos', this.puntos.toString(), expirationDate);
      this.cookieService.set(
        'puntos2',
        this.puntos2.toString(),
        expirationDate
      );

      // Eliminamos el spoiler actual del arreglo spoilerData si los datos son válidos
      if (
        Array.isArray(spoilerData) &&
        numero >= 0 &&
        numero < spoilerData.length
      ) {
        spoilerData.splice(numero, 1);
        const updatedSpoilerCookie = JSON.stringify(spoilerData);

        // Actualizamos la cookie 'peliculas' con los datos actualizados
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set(
          'peliculas',
          updatedSpoilerCookie,
          expirationDate
        );
      }
    } else {
      // En caso contrario, obtenemos los datos de los spoiler desde la cookie 'peliculas'
      const spoilerData = JSON.parse(spoilerCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      //Si la respuesta es incorrecta, decrementamos los intentos dependiendo del turno
      if (this.turnoActual === 1) {
        this.intentos--;
      } else if (this.turnoActual === 2) {
        this.intentos2--;
      }

      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );

      this.cookieService.set(
        'intentos',
        this.intentos.toString(),
        expirationDate
      );
      this.cookieService.set(
        'intentos2',
        this.intentos2.toString(),
        expirationDate
      );

      // Eliminamos el spoiler actual del arreglo spoilerPeliculas si los datos son válidos
      if (
        Array.isArray(spoilerData) &&
        numero >= 0 &&
        numero < spoilerData.length
      ) {
        spoilerData.splice(numero, 1);
        const updatedSpoilerCookie = JSON.stringify(spoilerData);

        // Actualizamos la cookie 'peliculas' con los datos actualizados
        this.cookieService.set(
          'peliculas',
          updatedSpoilerCookie,
          expirationDate
        );
      }

      // Verificamos si se han agotado los intentos disponibles del jugador 1
      if (this.intentos <= -1) {
        //Si se han agotado, obtenemos el nombre del usuario de la cookie "session" y el de "session2", y lo almacenamos en un objeto con los puntos
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos,
        };

        const nombreuser2 = this.cookieService.get('session2');
        const nuevo2 = {
          nombre: nombreuser2,
          puntos: this.puntos2,
        };

        //Mandamos los datos del jugador 1 al servidor
        this.servicioService
          .postDatoRankingSpoiler(nuevo)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        //Mandamos los datos del jugador 2 al servidor
        this.servicioService
          .postDatoRankingSpoiler(nuevo2)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        this.router.navigate(['/eleccion2dosj']); //Nos vamos a eleccion2dosj
      } else if (this.intentos2 <= -1) {
        //En caso contrario, si se han agotado los intentos del jugador2, hacemos lo mismo.
        //cogemos los nombres de los jugadores, y lo almacenamos en objetos junto a sus puntos
        const nombreuser2 = this.cookieService.get('session2');
        const nombreuser = this.cookieService.get('session');
        const nuevo2 = {
          nombre: nombreuser2,
          puntos: this.puntos2,
        };

        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos,
        };

        //Mandamos los datos del jugador 2 al servidor
        this.servicioService
          .postDatoRankingSpoiler(nuevo2)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        //Mandamos los datos del jugador 1 al servidor
        this.servicioService
          .postDatoRankingSpoiler(nuevo)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        this.router.navigate(['/eleccion2dosj']); //Nos vamos a "eleccion2dosj"
      }
    }
    this.Respuesta = ''; //Restablecemos la respuesta, y cogemos otra palabra secreta para volver a jugar
    this.seleccionarPalabraSecreta();
  }

  generarArrayNombresSpoiler() {
    // Inicializamos el arreglo de nombres de películas
    this.spoilerPeliculas = [];

    //Recorremos los datos de las peliculas
    for (const pelicula of this.datos) {
      // Obtenemos el nombre de la película y el spoiler como un arreglo de un solo elemento
      const NombrePelicula = pelicula.NombrePelicula;
      const spoilerPelicula = [pelicula.spoiler.toString()];

      //Creamos el objeto del nombre de la pelicula y el spoiler
      const peliculaObjeto = {
        nombre: NombrePelicula,
        spoiler: spoilerPelicula,
      };

      //Agregamos el nombre de la pelicula al objeto
      this.spoilerPeliculas.push(peliculaObjeto);
    }

    //Creamos una lista de los nombres de las peliculas
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.NombrePelicula;
      this.listaPeliculas.push(NombrePelicula);
    }

    //me coge solo 26 peliculas
    //Establecemos las cookies correspondientes
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    this.cookieService.set(
      'peliculas',
      JSON.stringify(this.spoilerPeliculas.slice(0, 26)),
      expirationDate
    );
    this.cookieService.set(
      'listapeliculas',
      JSON.stringify(this.listaPeliculas),
      expirationDate
    );
    this.cookieService.set('puntos', '0', expirationDate);
    this.cookieService.set('puntos2', '0', expirationDate);
    location.reload();
  }

  seleccionarTitulo(event: any) {
    this.filtroTituloControl.setValue(event.target.value); // Establece el valor del input
  }

  // Método para borrar el texto
  borrarTexto() {
    this.filtroTituloControl.setValue('');
  }

  // Al pulsar el boton, iremos a eleccion2dosj por si queremos temrinar la partida antes de tiempo.
  irAEleccion2() {
    this.servicioService.juegoTerminadoAntesDeTiempo = true;
    this.router.navigate(['/eleccion2dosj']);
  }
}
