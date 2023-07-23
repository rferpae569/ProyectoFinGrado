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
  datos!: Juegomusica[];
  respuesta: string = '';
  intentos: number = 0;
  puntos: number= 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = ''
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ id: number; nombre: string; musica: string[] }> = [];
  mostrarPista: boolean = false;
  pistaMusica: Juegomusicapista[] = [];
  pistas: string = '';
  pistas2: string = '';
  pistas3: string = '';
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();
  datosCargados: boolean = false; // Variable para verificar si los datos se han cargado

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

      const existeCookieNumero = this.cookieService.check('numero');

      if (!existeCookieNumero) {
      // Si la cookie "numero" no existe, recargamos la página para crear las cookies necesarias.
      location.reload();
      return; // Retornamos para detener la ejecución del resto del código hasta después de la recarga.
      }
    });

     // Suscribirse a los cambios en el control del input para filtrar los títulos
     this.filtroTituloControl.valueChanges
     .pipe(
       startWith(''), // Empezar con una cadena vacía
       map(value => value.toLowerCase()) // Convertir a minúsculas
     )
     .subscribe(filterValue => {
       // Filtrar los títulos solo si hay un valor en el filtro
       if (filterValue) {
         this.titulosCoincidentes = this.listaPeliculas.filter(
           titulo => titulo.toLowerCase().startsWith(filterValue)
         );
       } else {
         this.titulosCoincidentes = []; // Vaciar la lista de títulos si no hay valor en el filtro
       }
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
        this.datosCargados = true; // Marcar los datos como cargados
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
      this.datosCargados = true; // Marcar los datos como cargados
    }

     // Llamar a seleccionarPalabraSecreta solo si los datos ya están cargados
     if (this.datosCargados) {
      this.seleccionarPalabraSecreta();
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

    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});


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

    const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
    this.cookieService.set('palabra', this.palabrasecreta, expirationDate);
    this.cookieService.set('numero', numeroAleatorio.toString(), expirationDate);
  }

  enviarRespuesta() {
    const musicaCookie = this.cookieService.get('peliculas');

    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;

    const inputElement = document.querySelector('#respuesta') as HTMLInputElement;
    this.respuesta = inputElement.value;

    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {

      const musicaData = JSON.parse(musicaCookie);
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

      if (Array.isArray(musicaData) && numero >= 0 && numero < musicaData.length) {
        musicaData.splice(numero, 1);
        const updatedMusicaCookie = JSON.stringify(musicaData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('peliculas', updatedMusicaCookie, expirationDate);
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

        this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
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

//En juego musica solo me deja 34 peliculas
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    this.cookieService.set('peliculas', JSON.stringify(this.nombresPeliculas.slice(0, 29)), expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', "0", expirationDate);
    const pistacookie =this.cookieService.get('pistas'); //para pistas
    this.pistaMusica = JSON.parse(pistacookie);
    location.reload();
  }
}
