import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegomusica } from '../model/juegomusica';
import { Juegomusicapista } from '../model/juegomusicapista';

@Component({
  selector: 'app-juegomusica',
  templateUrl: './juegomusica.component.html',
  styleUrls: ['./juegomusica.component.scss']
})
export class JuegomusicaComponent implements OnInit {
  datos!: Juegomusica[]; //juegoimagen era juego
  respuesta: string = '';
  intentos: number = 0; //vidas
  puntos: number= 0;
  listaPeliculas: string[] = []; //listajuegos
  peliculaControl = new FormControl(); //juegocontrol
  session: string = ''
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ id: number; nombre: string; musica: string[] }> = [];//nombrejuegos
  // pistaMusica: Array<{ nombre: string; compositor: string; mclave: string;}> = [];
  mostrarPista: boolean = false;
  pistaMusica: Juegomusicapista[] = [];
  pistas: string = ''; //Esto es para la pista
  pistas2: string = ''; //Esto es para la pista
  pistas3: string = ''; //Esto es para la pista


  ngOnInit() {

    const sessionCookieExists = this.cookieService.check('session');
    const intentosCookieExists = this.cookieService.check('intentos');

    if (sessionCookieExists) {
      this.session = this.cookieService.get('session');
    }

    if (intentosCookieExists) {
      this.intentos = parseInt(this.cookieService.get('intentos'), 10);
    } else {
      this.intentos = 3; // Establecer el valor inicial en 3 si no existe la cookie 'intentos'
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', '3', expirationDate); // Guardar la cookie con el valor inicial de 3
    }

    const listaPeliculasCookie = this.cookieService.get('listapeliculas');

    if (listaPeliculasCookie) {
      this.listaPeliculas = JSON.parse(listaPeliculasCookie);
    }
    
    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10) || 0;

    this.servicioService.getDatosPeliculaPistaMusica().subscribe((datos) => {
      this.pistaMusica = datos;
      this.cookieService.set('pistas', JSON.stringify(this.pistaMusica.slice(0, 29))); //Esto para pistas
      // this.cookieService.set('compositor', JSON.stringify(this.pistaMusica.slice(0, 25))); //Esto para pistas
      // this.cookieService.set('mclave', JSON.stringify(this.pistaMusica.slice(0, 25))); //Esto para pistas

    });
    
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    const sessionCookieExists = this.cookieService.check('peliculas');
    if (!sessionCookieExists) {
      this.servicioService.getDatosPeliculaMusica().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayNombresMusica();
        this.seleccionarPalabraSecreta();
      });
    } else {
      const nombresPeliculasCookie = this.cookieService.get('peliculas');
      this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);
      const numeroAleatorioCookie = this.cookieService.get('numero');
      this.numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
      const nombrejuegocookie = this.cookieService.get('palabra');
      this.palabrasecreta = nombrejuegocookie;
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
    }
  }

  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    const nombresPeliculasCookie = this.cookieService.get('peliculas');
    this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);
    const pistaPeliculasCookies = this.cookieService.get('pistas'); //Para pistas
    this.pistaMusica = JSON.parse(pistaPeliculasCookies);
    // const pistaPeliculasCookies2 = this.cookieService.get('compositor');
    // this.pistaMusica = JSON.parse(pistaPeliculasCookies2);
    // const pistaPeliculasCookies3 = this.cookieService.get('mclave');
    // this.pistaMusica = JSON.parse(pistaPeliculasCookies3);

    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

// this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
//   console.log("Datos enviados al servidor:", datos);
// });


      this.router.navigate(['/eleccion2']);
      
    }
    const longitudArray = this.nombresPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;

    const respuestaArray = this.nombresPeliculas[numeroAleatorio].nombre;
    const respuestaAleatoria = respuestaArray[this.generarNumeroAleatorio(respuestaArray.length)];
    const id = this.nombresPeliculas[numeroAleatorio].id; //para pistas
    const pista = this.pistaMusica.find(item => item.id === id )?.nombre;
    const pista2 = this.pistaMusica.find(item => item.id === id )?.compositor;
    const pista3 = this.pistaMusica.find(item => item.id === id )?.mclave;


    console.log(id);
    // console.log(pista);
    // console.log(pista2);
    // console.log(pista3);
    // pista.toString();
    this.pistas = pista ? pista.toString() : '';
    this.pistas2 = pista2 ? pista2.toString() : '';
    this.pistas3 = pista3 ? pista3.toString() : '';

    console.log(this.pistas);
    console.log(this.pistas2);
    console.log(this.pistas3);
    console.log(this.pistaMusica);
    this.palabrasecreta = respuestaAleatoria;    
    
    this.palabrasecreta = this.nombresPeliculas[numeroAleatorio].nombre;
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
    this.cookieService.set('palabra', this.palabrasecreta, expirationDate);
    this.cookieService.set('numero', numeroAleatorio.toString(), expirationDate);
    // this.cookieService.set('intentos', '3', expirationDate);
    // location.reload();
  }

  enviarRespuesta() {
    const gameCookie = this.cookieService.get('peliculas');

    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;
    console.log(juegoActual);

    const inputElement = document.querySelector('#respuesta') as HTMLInputElement;
    this.respuesta = inputElement.value;
    console.log(this.respuesta);    

    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {

      const gameData = JSON.parse(gameCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);

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

      if (Array.isArray(gameData) && numero >= 0 && numero < gameData.length) {
        gameData.splice(numero, 1);
        const updatedGameCookie = JSON.stringify(gameData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('peliculas', updatedGameCookie, expirationDate);
      }
    } else {
      this.intentos--;
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', this.intentos.toString(), expirationDate);
      if (this.intentos <= -1) {
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        };

        // this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
        //   console.log("Datos enviados al servidor:", datos);
        // });
        this.router.navigate(['/eleccion2']);

       }
    }
    this.mostrarPista = true;
    this.respuesta = '';
    this.seleccionarPalabraSecreta();

  }

  generarArrayNombresMusica() {
    this.nombresPeliculas = [];
    for (const pelicula of this.datos) {
       const idPelicula = pelicula.id 
       const NombrePelicula = pelicula.NombrePelicula;
       const MusicaPelicula = [pelicula.musica.toString()];
       const peliculaObjeto = {
        id: idPelicula,
        nombre: NombrePelicula,
        musica: MusicaPelicula
      };
      this.nombresPeliculas.push(peliculaObjeto);
    }
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.NombrePelicula;
      this.listaPeliculas.push(NombrePelicula);
    }
      // const nombresPeliculasCookie = this.nombresPeliculas.slice(0, 40); // Obtener los primeros 41 elementos

//en juego musica solo me deja 34 peliculas
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    this.cookieService.set('peliculas', JSON.stringify(this.nombresPeliculas.slice(0, 29)), expirationDate);
    // this.cookieService.set('intentos', '3', expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', "0", expirationDate);
    const pistacookie =this.cookieService.get('pistas'); //para pistas
    this.pistaMusica = JSON.parse(pistacookie);
    // const pistacookie2 =this.cookieService.get('compositor'); //para pistas
    // this.pistaMusica = JSON.parse(pistacookie2);
    // const pistacookie3 =this.cookieService.get('mclave'); //para pistas
    // this.pistaMusica = JSON.parse(pistacookie3);
    location.reload();
  }

  // reiniciar() {
  //   document.cookie = `peliculas=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //   location.reload();
  // }
}
