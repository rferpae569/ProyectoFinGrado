import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juegoimagen } from '../model/juegoimagen';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegomusica } from '../model/juegomusica';

@Component({
  selector: 'app-juegomusica',
  templateUrl: './juegomusica.component.html',
  styleUrls: ['./juegomusica.component.scss']
})
export class JuegomusicaComponent implements OnInit {
  // titulo: string = 'guess gameplay';
  datos!: Juegomusica[]; //juegoimagen era juego
  respuesta: string = '';
  intentos: number = 0; //vidas
  // mensajeResultado: string = '';
  puntos: number= 0;
  listaPeliculas: string[] = []; //listajuegos
  peliculaControl = new FormControl(); //juegocontrol
  // peliculasFiltrados!: Observable<string[]>;//juegofiltrados
  session: string = ''
  
  // mensajePerderIntento: string = ''; //mensajeperdervida
  // mensajeganar: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ nombre: string; musica: string[] }> = [];//nombrejuegos
  // mensajePerder: string = '';

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

    // this.peliculasFiltrados = this.peliculaControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this.filtrarPeliculas(value)) //antes se llamaba filtrarjuegos
    // );
    
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
    // this.peliculasFiltrados = this.peliculaControl.valueChanges.pipe(
    //   map(value => value ? this.filtrarPeliculas(value) : this.listaPeliculas)
    // );
  }

  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    const nombresPeliculasCookie = this.cookieService.get('peliculas');
    this.nombresPeliculas = JSON.parse(nombresPeliculasCookie);

    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

// this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
//   console.log("Datos enviados al servidor:", datos);
// });


      // this.router.navigate(['/ranking']); Esto sera eleccion2
      // return;
    }
    const longitudArray = this.nombresPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;
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

    // if (!gameCookie ) {
    //   this.mensajeganar = 'Has acertado todas las peliculas.';
    //   return;
    // }
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;
    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {
      // this.mensajeResultado = '¡Respuesta correcta!';
      // this.mensajePerderIntento="";

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
        // this.mensajePerder = 'Has perdido todos tus intentos. Intentalo de nuevo.';
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        };

        // this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
        //   console.log("Datos enviados al servidor:", datos);
        // });
        this.router.navigate(['/eleccion2']);

       } //else {
      //   this.mensajePerderIntento = `Respuesta incorrecta. Te quedan ${this.intentos} vidas.`;
       
      // }
    }
    this.respuesta = '';
  }

  generarArrayNombresMusica() {
    this.nombresPeliculas = [];
    for (const pelicula of this.datos) {
       const NombrePelicula = pelicula.NombrePelicula;
       const MusicaPelicula = [pelicula.musica.toString()];
       const peliculaObjeto = {
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
    this.cookieService.set('peliculas', JSON.stringify(this.nombresPeliculas.slice(0, 34)), expirationDate);
    // this.cookieService.set('intentos', '3', expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', "0", expirationDate);
    location.reload();
  }

  reiniciar() {
    document.cookie = `peliculas=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
  }
  
  // seleccionarPelicula(pelicula: string) { //En un principio, no me haria falta.
  //   this.peliculaControl.setValue(pelicula);
  // }
  // filtrarPeliculas(keyword: string): string[] { //Este tampoco haria falta.
  //   return this.listaPeliculas.filter(pelicula => pelicula.toLowerCase().includes(keyword.toLowerCase()));
  // }
  
}
