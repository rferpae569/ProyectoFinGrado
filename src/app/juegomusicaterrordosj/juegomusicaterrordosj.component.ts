import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Juegomusica } from '../model/juegomusica';
import { Juegomusicapista } from '../model/juegomusicapista';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
//Importamos los modulos

@Component({
  selector: 'app-juegomusicaterrordosj',
  templateUrl: './juegomusicaterrordosj.component.html',
  styleUrls: ['./juegomusicaterrordosj.component.scss'],
  animations: [
    trigger('slideDownUp', [
      state('down', style({ opacity: 1, height: '*' })),
      state('up', style({ opacity: 0, height: '50px' })),
      transition('up => down', animate('300ms ease-in')),
      transition('down => up', animate('300ms ease-out')),
    ]),
  ],
})
export class JuegomusicaterrordosjComponent implements OnInit {
  usuariosession: string = this.cookieService.get('session');
  usuariosession2: string = this.cookieService.get('session2');
  isDropdownOpen = false;

  datos!: Juegomusica[];
  respuesta: string = '';
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
  nombresPeliculas: Array<{ id: number; nombre: string; musica: string[] }> =
    [];
  mostrarPista: boolean = false;
  pistaMusica: Juegomusicapista[] = [];
  pistas: string = '';
  pistas2: string = '';
  pistas3: string = '';
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();
  turnoActual: number = 1;
  datosCargados: boolean = false;
  estadoAnimacion = 'up';
  showAnimation = false;
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

    this.servicioService
      .getDatosPeliculaPistaMusicaTerror()
      .subscribe((datos) => {
        this.pistaMusica = datos;
        this.cookieService.set(
          'pistas',
          JSON.stringify(this.pistaMusica.slice(0, 25))
        ); //Esto es para las pistas

        const existeCookieNumero = this.cookieService.check('numero');

        if (!existeCookieNumero) {
          // Si la cookie "numero" no existe, recargamos la página para crear las cookies necesarias.
          location.reload();
          return; // Retornamos para detener la ejecución del resto del código hasta después de la recarga.
        }
      });

    // Suscribimos a los cambios en el control del input para filtrar los títulos
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
      this.servicioService.getDatosPeliculaMusicaTerror().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayNombresMusica();
        this.datosCargados = true; // Marcamos los datos como cargados
      });
    } else {
      //Si no existe, recuperamos los datos guardados en las cookies especificadas
      const nombresPeliculasCookie = this.cookieService.get('peliculas');
      this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);
      const numeroAleatorioCookie = this.cookieService.get('numero');
      this.numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
      const nombrejuegocookie = this.cookieService.get('palabra');
      this.palabrasecreta = nombrejuegocookie;
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);
      this.datosCargados = true; // Marcamos los datos como cargados
    }

    // Llamamos a seleccionarPalabraSecreta solo si los datos ya están cargados
    if (this.datosCargados) {
      this.seleccionarPalabraSecreta();
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
    // Obtenemos los nombres de las películas desde la cookie 'peliculas' y las pistas desde la cookie "pistas"
    const nombresPeliculasCookie = this.cookieService.get('peliculas');
    this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);

    // Añade un id a nombrepeliculas para que pueda coger las pistas correspondientes de cada musica
    if (nombresPeliculasCookie) {
      this.nombresPeliculas = this.nombresPeliculas.map((pelicula, index) => ({
        ...pelicula,
        id: index, // Puedes ajustar esto según tus necesidades
      }));
    }

    const pistaPeliculasCookies = this.cookieService.get('pistas');
    this.pistaMusica = JSON.parse(pistaPeliculasCookies);

    //Comprobamos que no queden mas peliculas
    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {
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

      //Enviamos los datos del jugador 1 al servidor
      this.servicioService
        .postDatoRankingMusicaTerror(nuevo)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      //Enviamos los datos del jugador 2 al servidor
      this.servicioService
        .postDatoRankingMusicaTerror(nuevo2)
        .subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

      this.router.navigate(['/eleccion2']); //Nos vamos a "eleccion2"
    }

    //Si existen mas peliculas, continuamos con el codigo, generamos el numero aleatorio y obtenemos la palabra secreta y la pista correspondiente a traves del id
    const longitudArray = this.nombresPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;

    const respuestaArray = this.nombresPeliculas[numeroAleatorio].nombre;
    const respuestaAleatoria =
      respuestaArray[this.generarNumeroAleatorio(respuestaArray.length)];
    const id = this.nombresPeliculas[numeroAleatorio].id; //para pistas
    const pista = this.pistaMusica.find((item) => item.id === id)?.nombre;
    const pista2 = this.pistaMusica.find((item) => item.id === id)?.compositor;
    const pista3 = this.pistaMusica.find((item) => item.id === id)?.mclave;

    this.pistas = pista ? pista.toString() : '';
    this.pistas2 = pista2 ? pista2.toString() : '';
    this.pistas3 = pista3 ? pista3.toString() : '';

    this.palabrasecreta = respuestaAleatoria;

    this.palabrasecreta = this.nombresPeliculas[numeroAleatorio].nombre;
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
    //Activar animacion
    this.showAnimation = true;

    // Obtenemos los nombres de las películas desde la cookie 'peliculas'
    const musicaCookie = this.cookieService.get('peliculas');
    const pistaCookie = this.cookieService.get('pistas');

    // Obtenemos la palabra secreta actual desde la cookie 'palabra'
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;

    // Obtenemos la respuesta pasada a traves del formulario
    const inputElement = document.querySelector(
      '#respuesta'
    ) as HTMLInputElement;
    this.respuesta = inputElement.value;

    //Verificamos si la respuesta es correcta (Ya sea en mayuscula o minuscula)
    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {
      // Obtenemos los datos de la imagen desde la cookie 'peliculas'
      const musicaData = JSON.parse(musicaCookie);
      const pistaData = JSON.parse(pistaCookie);
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

      if (
        Array.isArray(musicaData) &&
        numero >= 0 &&
        numero < musicaData.length
      ) {
        musicaData.splice(numero, 1);
        const updatedMusicaCookie = JSON.stringify(musicaData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set(
          'peliculas',
          updatedMusicaCookie,
          expirationDate
        );
      }

      // Eliminamos la pista actual del arreglo pistaMusica si los datos son válidos
      if (
        Array.isArray(pistaData) &&
        numero >= 0 &&
        numero < pistaData.length
      ) {
        pistaData.splice(numero, 1);

        // Actualizamos los IDs de las pistas restantes
        pistaData.forEach((pista, index) => {
          pista.id = index;
        });

        const updatedPistaMusicaCookie = JSON.stringify(pistaData);

        // Actualizamos la cookie 'pistas' con los datos actualizados
        this.cookieService.set(
          'pistas',
          updatedPistaMusicaCookie,
          expirationDate
        );
      }
    } else {
      // En caso contrario, obtenemos los datos de la musica desde la cookie 'peliculas'
      const musicaData = JSON.parse(musicaCookie);
      const pistaData = JSON.parse(pistaCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      // En caso contrario, si la respuesta es incorrecta, decrementamos los intentos dependiendo del turno

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

      // Eliminamos la musica actual del arreglo nombresPeliculas si los datos son válidos
      if (
        Array.isArray(musicaData) &&
        numero >= 0 &&
        numero < musicaData.length
      ) {
        musicaData.splice(numero, 1);
        const updatedMusicaCookie = JSON.stringify(musicaData);

        // Actualizamos la cookie 'peliculas' con los datos actualizados
        this.cookieService.set(
          'peliculas',
          updatedMusicaCookie,
          expirationDate
        );
      }

      // Eliminamos la pista actual del arreglo pistaMusica si los datos son válidos
      if (
        Array.isArray(pistaData) &&
        numero >= 0 &&
        numero < pistaData.length
      ) {
        pistaData.splice(numero, 1);

        // Actualizamos los IDs de las pistas restantes
        pistaData.forEach((pista, index) => {
          pista.id = index;
        });
        const updatedPistaMusicaCookie = JSON.stringify(pistaData);

        // Actualizamos la cookie 'pistas' con los datos actualizados
        this.cookieService.set(
          'pistas',
          updatedPistaMusicaCookie,
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
          .postDatoRankingMusicaTerror(nuevo)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        //Mandamos los datos del jugador 2 al servidor
        this.servicioService
          .postDatoRankingMusicaTerror(nuevo2)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        this.router.navigate(['/eleccion2']); //Nos vamos a "eleccion2"
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
          .postDatoRankingMusicaTerror(nuevo2)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        //Mandamos los datos del jugador 1 al servidor
        this.servicioService
          .postDatoRankingMusicaTerror(nuevo)
          .subscribe((datos) => {
            console.log('Datos enviados al servidor:', datos);
          });

        this.router.navigate(['/eleccion2']); //Nos vamos a "eleccion2"
      }
    }
    this.mostrarPista = true; //Declaramos la variable mostrarpista como true, restablecemos la respuesta, y cogemos otra palabra secreta para jugar de nuevo.
    this.respuesta = '';
    this.seleccionarPalabraSecreta();
  }

  generarArrayNombresMusica() {
    // Inicializamos el arreglo de las preguntas
    this.nombresPeliculas = [];

    //Recorremos los datos de las peliculas
    for (const pelicula of this.datos) {
      // Obtenemos el id de la película, el nombre, y la musica como un arreglo de un solo elemento
      const idPelicula = pelicula.id;
      const NombrePelicula = pelicula.NombrePelicula;
      const MusicaPelicula = [pelicula.musica.toString()];

      //Creamos el objeto del id de la pelicula, su nombre y su musica
      const peliculaObjeto = {
        id: idPelicula,
        nombre: NombrePelicula,
        musica: MusicaPelicula,
      };

      //Agregamos la pregunta de la pelicula al objeto
      this.nombresPeliculas.push(peliculaObjeto);
    }

    //Creamos una lista de los nombres de las peliculas
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.NombrePelicula;
      this.listaPeliculas.push(NombrePelicula);
    }

    //Establecemos las cookies correspondientes
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    this.cookieService.set(
      'peliculas',
      JSON.stringify(this.nombresPeliculas.slice(0, 25)),
      expirationDate
    );
    this.cookieService.set(
      'listapeliculas',
      JSON.stringify(this.listaPeliculas),
      expirationDate
    );
    this.cookieService.set('puntos', '0', expirationDate);
    this.cookieService.set('puntos2', '0', expirationDate);
    const pistacookie = this.cookieService.get('pistas'); //para pistas
    this.pistaMusica = JSON.parse(pistacookie);
  }

  seleccionarTitulo(event: any) {
    this.filtroTituloControl.setValue(event.target.value); // Establecemos el valor del input
  }

  // Método para borrar el texto
  borrarTexto() {
    this.filtroTituloControl.setValue('');
  }

  // Al pulsar el boton, iremos a eleccion2 por si queremos temrinar la partida antes de tiempo.
  irAEleccion2() {
    this.servicioService.juegoTerminadoAntesDeTiempo = true;
    this.router.navigate(['eleccion2']);
  }

  //Esta funcion sirve para cmabiar el tipo de animacion de la pista
  togglePistaAnimation() {
    this.mostrarPista = !this.mostrarPista;
    this.estadoAnimacion = this.mostrarPista ? 'down' : 'up';
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
