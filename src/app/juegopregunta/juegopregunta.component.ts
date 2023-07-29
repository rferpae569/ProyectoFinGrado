import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juegopregunta } from '../model/juegopregunta';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegopreguntapista } from '../model/juegopreguntapista';
//Importamos los modulos

@Component({
  selector: 'app-juegopregunta',
  templateUrl: './juegopregunta.component.html',
  styleUrls: ['./juegopregunta.component.scss']
})
export class JuegopreguntaComponent implements OnInit {
  datos!: Juegopregunta[];
  Respuesta: string = '';
  intentos: number = 0;
  puntos: number = 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  preguntasPeliculas: Array<{id: number; pregunta: string; Respuesta: string[] }> = [];
  mostrarPista: boolean = false;
  pistaPregunta: Juegopreguntapista[] = [];
  pistas: string = '';
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

    this.servicioService.getDatosPeliculaPistaPregunta().subscribe((datos) => {
      this.pistaPregunta = datos;
      this.cookieService.set('pistas', JSON.stringify(this.pistaPregunta.slice(0, 20))); //Esto es para las pistas
      
      this.seleccionarPalabraSecreta();
    });
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    // Verificamos si existe la cookie 'preguntas', y si no existe, obtenemos los datos
    const sessionCookieExists = this.cookieService.check('preguntas');
    if (!sessionCookieExists) {
      this.servicioService.getDatosPeliculaPregunta().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayPreguntasPeliculas();
        this.seleccionarPalabraSecreta();
      });
    } else { //Si no existe, recuperamos los datos guardados en las cookies especificadas
      const preguntasPeliculasCookie = this.cookieService.get('preguntas');
      this.preguntasPeliculas = JSON.parse(preguntasPeliculasCookie);
      const numeroAleatorioCookie = this.cookieService.get('numero');
      this.numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
      const nombrejuegocookie = this.cookieService.get('palabra');
      this.palabrasecreta = nombrejuegocookie;
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
    }
  }

  //Generamos un numero aleatorio
  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    // Obtenemos los nombres de las películas desde la cookie 'preguntas' y las pistas
    const preguntasPeliculasCookie = this.cookieService.get('preguntas');
    this.preguntasPeliculas = JSON.parse(preguntasPeliculasCookie);
    const pistaPeliculasCookies = this.cookieService.get('pistas');
    this.pistaPregunta = JSON.parse(pistaPeliculasCookies);

    //Comprobamos que no queden mas peliculas
    if (!this.preguntasPeliculas || this.preguntasPeliculas.length === 0) {
      //Si no quedan mas, obtenemos el nombre del usuario de la cookie "session", y creamos un objeto con el nombre y sus puntos
      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

//Enviamos los datos al servidor
this.servicioService.postDatoRankingPregunta(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});


      this.router.navigate(['/eleccion2']); //nos vamos a "eleccion2"
      
    }

    //Si existen mas peliculas, continuamos con el codigo, generamos el numero aleatorio y obtenemos la palabra secreta, y la pista correspondiente
    const longitudArray = this.preguntasPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;
    
    const respuestaArray = this.preguntasPeliculas[numeroAleatorio].Respuesta;
    const respuestaAleatoria = respuestaArray[this.generarNumeroAleatorio(respuestaArray.length)];
    const id = this.preguntasPeliculas[numeroAleatorio].id;
    const pista = this.pistaPregunta.find(item => item.id === id )?.Pista; //Esta linea y la anterior cogeran la pista a traves del id
    
    this.pistas = pista ? pista.toString() : '';
  
    this.palabrasecreta = respuestaAleatoria;    
    
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
    this.cookieService.set('numero', numeroAleatorio.toString(), expirationDate);
  }

  enviarRespuesta() {
    // Obtenemos las preguntas de las películas desde la cookie 'preguntas'
    const preguntaCookie = this.cookieService.get('preguntas');

    // Obtenemos la palabra secreta actual desde la cookie 'palabra'
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;

    // Obtenemos la respuesta pasada a traves del formulario
    const inputElement = document.querySelector('#respuesta') as HTMLInputElement;
    this.Respuesta = inputElement.value;

    //Verificamos si la respuesta es correcta (Ya sea en mayuscula o minuscula)
    if (this.Respuesta.toLowerCase() === juegoActual.toLowerCase()) {

      // Obtenemos los datos de la pregunta desde la cookie 'preguntas'
      const preguntaData = JSON.parse(preguntaCookie);
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

      this.cookieService.set('intentos', this.intentos.toString(), expirationDate);
      this.cookieService.set('puntos', this.puntos.toString(), expirationDate);

      // Eliminamos la pregunta actual del arreglo preguntaData si los datos son válidos
      if (Array.isArray(preguntaData) && numero >= 0 && numero < preguntaData.length) {
        preguntaData.splice(numero, 1);
        const updatedPreguntaCookie = JSON.stringify(preguntaData);

        // Actualizamos la cookie 'preguntas' con los datos actualizados
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('preguntas', updatedPreguntaCookie, expirationDate);
      }
    } else {
      // En caso contrario, obtenemos los datos de la pregunta desde la cookie 'preguntas'
      const preguntaData = JSON.parse(preguntaCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      // Si la respuesta es incorrecta, decrementamos los intentos
      this.intentos--;
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', this.intentos.toString(), expirationDate);

      // Eliminamos la pregunta actual del arreglo preguntasPeliculas si los datos son válidos
    if (Array.isArray(preguntaData) && numero >= 0 && numero < preguntaData.length) {
      preguntaData.splice(numero, 1);
      const updatedPreguntaCookie = JSON.stringify(preguntaData);

      // Actualizamos la cookie 'preguntas' con los datos actualizados
      this.cookieService.set('preguntas', updatedPreguntaCookie, expirationDate);
    }

      // Verificamos si se han agotado los intentos disponibles
      if (this.intentos <= -1) {
        //Si se han agotado, obtenemos el nombre del usuario de la cookie "session", y lo almacenamos en un objeto con los puntos
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        };

        //Mandamos los datos al servidor
        this.servicioService.postDatoRankingPregunta(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.router.navigate(['/eleccion2']); //Nos vamos a "eleccion2"

       }
    }
    this.mostrarPista = true; //Declaramos la variable mostrarpista como true, y restablecemos la respuesta.
    this.Respuesta = '';
  }

  generarArrayPreguntasPeliculas() {
    // Inicializamos el arreglo de las preguntas
    this.preguntasPeliculas = [];

    //Recorremos los datos de las peliculas
    for (const pelicula of this.datos) {
      // Obtenemos el id de la película, la pregunta, y la respuesta como un arreglo de un solo elemento
      const idPelicula = pelicula.id;
      const preguntaPelicula = pelicula.pregunta;
      const respuestaPelicula = [pelicula.Respuesta];

      //Creamos el objeto del id de la pelicula, su pregunta y su respuesta
      const peliculaObjeto = {
        id: idPelicula,
        pregunta: preguntaPelicula,
        Respuesta: respuestaPelicula
      };

      //Agregamos la pregunta de la pelicula al objeto
      this.preguntasPeliculas.push(peliculaObjeto);
    }

    //Creamos una lista de los nombres de las peliculas
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.pregunta;
      this.listaPeliculas.push(NombrePelicula);
    }

    //Establecemos las cookies correspondientes
    //Solo me coge 20 preguntas
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    this.cookieService.set('preguntas', JSON.stringify(this.preguntasPeliculas.slice(0, 20)), expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', '0', expirationDate);
    const pistacookie =this.cookieService.get('pistas'); //para pistas
    this.pistaPregunta = JSON.parse(pistacookie);
  }
}
