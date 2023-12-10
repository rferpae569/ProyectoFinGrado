import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegomusica } from '../model/juegomusica';
import { Juegomusicapista } from '../model/juegomusicapista';
import {trigger, state, style, animate, transition} from '@angular/animations';
//Importamos los modulos

@Component({
  selector: 'app-juegomusica',
  templateUrl: './juegomusica.component.html',
  styleUrls: ['./juegomusica.component.scss'],
  animations: [
    trigger('slideDownUp', [
      state('down', style({ opacity: 1, height: '*' })),
      state('up', style({ opacity: 0, height: '50px' })),
      transition('up => down', animate('300ms ease-in')),
      transition('down => up', animate('300ms ease-out')),
    ]),
  ],
})
export class JuegomusicaComponent implements OnInit {
  datos!: Juegomusica[];
  respuesta: string = '';
  intentos: number = 0;
  puntos: number = 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ id: number; nombre: string; musica: string[] }> =[];
  mostrarPista: boolean = false;
  pistaMusica: Juegomusicapista[] = [];
  pistas: string = '';
  pistas2: string = '';
  pistas3: string = '';
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();
  datosCargados: boolean = false;
  estadoAnimacion = 'up';
  showAnimation = false;
  //Creamos las variables correspondientes

  //Verificamos las cookies, creamos los intentos y establecemos el filtrado de las peliculas
  ngOnInit() {
    const sessionCookieExists = this.cookieService.check('session');
    const intentosCookieExists = this.cookieService.check('intentos');

    if (sessionCookieExists) {
      this.session = this.cookieService.get('session');
    }

    if (intentosCookieExists) {
      this.intentos = parseInt(this.cookieService.get('intentos'), 10);
    } else {
      this.intentos = 3; // Establecemos el valor inicial en 3 si no existe la cookie 'intentos'
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', '3', expirationDate); // Guardamos la cookie con el valor inicial de 3
    }

    const listaPeliculasCookie = this.cookieService.get('listapeliculas');

    if (listaPeliculasCookie) {
      this.listaPeliculas = JSON.parse(listaPeliculasCookie);
    }

    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10) || 0;

    this.servicioService.getDatosPeliculaPistaMusica().subscribe((datos) => {
      this.pistaMusica = datos;
      this.cookieService.set(
        'pistas',
        JSON.stringify(this.pistaMusica.slice(0, 29))
      ); //Esto es para las pistas

      const existeCookieNumero = this.cookieService.check('numero');

      if (!existeCookieNumero) {
        // Si la cookie "numero" no existe, recargamos la página para crear las cookies necesarias.
        location.reload();
        return; // Retornamos para detener la ejecución del resto del código hasta después de la recarga.
      }
    });

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
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    // Verificamos si la cookie 'session' existe al acceder al componente
    if (!this.cookieService.check('session')) {
      // Si la cookie no existe, redirigimos al componente 'inicio'
      this.router.navigate(['inicio']);
    }

    // Verificamos si existe la cookie 'peliculas', y si no existe, obtenemos los datos
    const sessionCookieExists = this.cookieService.check('peliculas');
    if (!sessionCookieExists) {
      this.servicioService.getDatosPeliculaMusica().subscribe((datos) => {
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
      this.datosCargados = true; // Marcamos los datos como cargados
    }

    // Llamamos a seleccionarPalabraSecreta solo si los datos ya están cargados
    if (this.datosCargados) {
      this.seleccionarPalabraSecreta();
    }
  }

  //Generamos un numero aleatorio
  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    // Obtenemos los nombres de las películas desde la cookie 'peliculas' y las pistas
    const nombresPeliculasCookie = this.cookieService.get('peliculas');
    this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);
    const pistaPeliculasCookies = this.cookieService.get('pistas'); //Para pistas
    this.pistaMusica = JSON.parse(pistaPeliculasCookies);

    //Comprobamos que no queden mas peliculas
    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {
      //Si no quedan mas, obtenemos el nombre del usuario de la cookie "session", y creamos un objeto con el nombre y sus puntos
      const nombreuser = this.cookieService.get('session');
      const nuevo = {
        nombre: nombreuser,
        puntos: this.puntos,
      };

      //Enviamos los datos al servidor
      this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
        console.log('Datos enviados al servidor:', datos);
      });

      this.router.navigate(['/eleccion2']); //nos vamos a "eleccion2"
    }

    //Si existen mas peliculas, continuamos con el codigo, generamos el numero aleatorio y obtenemos la palabra secreta, y la pista correspondiente
    const longitudArray = this.nombresPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;

    const respuestaArray = this.nombresPeliculas[numeroAleatorio].nombre;
    const respuestaAleatoria = respuestaArray[this.generarNumeroAleatorio(respuestaArray.length)];
    const id = this.nombresPeliculas[numeroAleatorio].id; //para pistas
    const pista = this.pistaMusica.find((item) => item.id === id)?.nombre; //Esta linea y las siguientes cogeran la pista a traves del id
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

    //Obtenemos el valor de la cookie 'puntos' y se lo asignamos a la variable
    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10);

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

    // Obtenemos las preguntas de las películas desde la cookie 'peliculas'
    const musicaCookie = this.cookieService.get('peliculas');

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
      // Obtenemos los datos de la pregunta desde la cookie 'peliculas'
      const musicaData = JSON.parse(musicaCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      // Obtenemos los puntos y los intentos desde las cookies
      const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);

      // Incrementamos los puntos si los intentos están dentro del rango permitido (0 a 3)
      if (this.intentos <= 3 && this.intentos >= 0) {
        this.puntos += 1;
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
      this.cookieService.set('puntos', this.puntos.toString(), expirationDate);

      // Eliminamos la musica actual del arreglo musicaData si los datos son válidos
      if (
        Array.isArray(musicaData) &&
        numero >= 0 &&
        numero < musicaData.length
      ) {
        musicaData.splice(numero, 1);
        const updatedMusicaCookie = JSON.stringify(musicaData);

        // Actualizamos la cookie 'peliculas' con los datos actualizados
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
    } else {
      // En caso contrario, obtenemos los datos de la musica desde la cookie 'peliculas'
      const musicaData = JSON.parse(musicaCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      // Si la respuesta es incorrecta, decrementamos los intentos
      this.intentos--;
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

      // Verificamos si se han agotado los intentos disponibles
      if (this.intentos <= -1) {
        //Si se han agotado, obtenemos el nombre del usuario de la cookie "session", y lo almacenamos en un objeto con los puntos
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos,
        };

        //Mandamos los datos al servidor
        this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
          console.log('Datos enviados al servidor:', datos);
        });

        this.router.navigate(['/eleccion2']); //Nos vamos a "eleccion2"
      }
    }
    this.mostrarPista = true; //Declaramos la variable pista como true, restablecemos la respuesta, y cogemos otra palabra secreta para volver a jugar.
    this.respuesta = '';
    this.seleccionarPalabraSecreta();
  }

  generarArrayNombresMusica() {
    // Inicializamos el arreglo de nombres de películas
    this.nombresPeliculas = [];

    //Recorremos los datos de las peliculas
    for (const pelicula of this.datos) {
      // Obtenemos el id de la película, el nombre, y la musica como un arreglo de un solo elemento
      const idPelicula = pelicula.id;
      const NombrePelicula = pelicula.NombrePelicula;
      const MusicaPelicula = [pelicula.musica.toString()];

      //Creamos el objeto del id de la pelicula, su nombre (titulo) y su musica
      const peliculaObjeto = {
        id: idPelicula,
        nombre: NombrePelicula,
        musica: MusicaPelicula,
      };

      //Agregamos el nombre de la pelicula al objeto
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
      JSON.stringify(this.nombresPeliculas.slice(0, 29)),
      expirationDate
    );
    this.cookieService.set(
      'listapeliculas',
      JSON.stringify(this.listaPeliculas),
      expirationDate
    );
    this.cookieService.set('puntos', '0', expirationDate);
    const pistacookie = this.cookieService.get('pistas'); //para pistas
    this.pistaMusica = JSON.parse(pistacookie);
    location.reload();
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
    this.router.navigate(['/eleccion2']);
  }

  //Esta funcion sirve para cmabiar el tipo de animacion de la pista
  togglePistaAnimation() {
    this.mostrarPista = !this.mostrarPista;
    this.estadoAnimacion = this.mostrarPista ? 'down' : 'up';
  }
}
