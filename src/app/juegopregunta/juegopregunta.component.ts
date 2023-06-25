import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juegopregunta } from '../model/juegopregunta';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Juegopreguntapista } from '../model/juegopreguntapista';

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
  pistas: string = ''; //Esto es para la pista

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

    this.servicioService.getDatosPeliculaPistaPregunta().subscribe((datos) => {
      this.pistaPregunta = datos;
      this.cookieService.set('pistas', JSON.stringify(this.pistaPregunta.slice(0, 20))); //Esto para pistas

    });
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    const sessionCookieExists = this.cookieService.check('preguntas');
    if (!sessionCookieExists) {
      this.servicioService.getDatosPeliculaPregunta().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayPreguntasPeliculas();
        this.seleccionarPalabraSecreta();
      });
    } else {
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

  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    const preguntasPeliculasCookie = this.cookieService.get('preguntas');
    this.preguntasPeliculas = JSON.parse(preguntasPeliculasCookie);
    const pistaPeliculasCookies = this.cookieService.get('pistas'); //Para pistas
    this.pistaPregunta = JSON.parse(pistaPeliculasCookies);

    if (!this.preguntasPeliculas || this.preguntasPeliculas.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

this.servicioService.postDatoRankingPregunta(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});


      this.router.navigate(['/eleccion2']);
      
    }
    const longitudArray = this.preguntasPeliculas.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;
    
    const respuestaArray = this.preguntasPeliculas[numeroAleatorio].Respuesta;
    const respuestaAleatoria = respuestaArray[this.generarNumeroAleatorio(respuestaArray.length)];
    const id = this.preguntasPeliculas[numeroAleatorio].id; //para pistas
    const pista = this.pistaPregunta.find(item => item.id === id )?.Pista;
    // console.log(id);
    // console.log(pista);
    // pista.toString();
    this.pistas = pista ? pista.toString() : '';
    // console.log(this.pistas);
    // console.log(this.pistaPregunta);
    this.palabrasecreta = respuestaAleatoria;    
    
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
    const preguntaCookie = this.cookieService.get('preguntas');
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;

    const inputElement = document.querySelector('#respuesta') as HTMLInputElement;
    this.Respuesta = inputElement.value;
    // console.log(this.Respuesta);

    if (this.Respuesta.toLowerCase() === juegoActual.toLowerCase()) {

      const preguntaData = JSON.parse(preguntaCookie);
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

      if (Array.isArray(preguntaData) && numero >= 0 && numero < preguntaData.length) {
        preguntaData.splice(numero, 1);
        const updatedPreguntaCookie = JSON.stringify(preguntaData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('preguntas', updatedPreguntaCookie, expirationDate);
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

        this.servicioService.postDatoRankingPregunta(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
        this.router.navigate(['/eleccion2']);

       }
    }
    this.mostrarPista = true;
    this.Respuesta = '';
    this.seleccionarPalabraSecreta();
  }

  generarArrayPreguntasPeliculas() {
    this.preguntasPeliculas = [];
    for (const pelicula of this.datos) {
      const idPelicula = pelicula.id;
      const preguntaPelicula = pelicula.pregunta;
      const respuestaPelicula = [pelicula.Respuesta];
      const peliculaObjeto = {
        id: idPelicula,
        pregunta: preguntaPelicula,
        Respuesta: respuestaPelicula
      };
      this.preguntasPeliculas.push(peliculaObjeto);
    }
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.pregunta;
      this.listaPeliculas.push(NombrePelicula);
    }

    // this.pistaPregunta= [];
    // for(const pista of this.datos2){
    //   const idPista= pista.id;
    //   const pista=pista.Pista;
    // }

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    this.cookieService.set('preguntas', JSON.stringify(this.preguntasPeliculas.slice(0, 20)), expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', '0', expirationDate);
    const pistacookie =this.cookieService.get('pistas'); //para pistas
    this.pistaPregunta = JSON.parse(pistacookie);
    // location.reload();
  }

  // reiniciar() {
  //   document.cookie = `peliculas=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //   location.reload();
  // }

  // obtenerPista(): string {
  //   const numeroAleatorioCookie = this.cookieService.get('numero');
  //   const numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
  //   // console.log(numeroAleatorio);
  
  //   if (numeroAleatorio >= 0 && numeroAleatorio < this.pistaPregunta.length) {
  //     return this.pistaPregunta[numeroAleatorio].Pista;
  //   }
  
  //   return '';
  // }

}
