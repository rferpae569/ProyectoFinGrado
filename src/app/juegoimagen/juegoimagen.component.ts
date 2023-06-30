import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juegoimagen } from '../model/juegoimagen';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-juegoimagen',
  templateUrl: './juegoimagen.component.html',
  styleUrls: ['./juegoimagen.component.scss']
})
export class JuegoimagenComponent implements OnInit {
  datos!: Juegoimagen[];
  respuesta: string = '';
  intentos: number = 0;
  puntos: number= 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = ''
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ nombre: string; imagenes: string[] }> = [];
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();

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
      this.servicioService.getDatosPeliculaImagen().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayNombresPeliculas();
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

    if (!this.nombresPeliculas || this.nombresPeliculas.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

this.servicioService.postDatoRankingImagen(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});


      this.router.navigate(['/eleccion2']);
      
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
    const imagenCookie = this.cookieService.get('peliculas');
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;
    // console.log(juegoActual);

    const inputElement = document.querySelector('#respuesta') as HTMLInputElement;
    this.respuesta = inputElement.value;
    // console.log(this.respuesta);    
    
    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {

      const imagenData = JSON.parse(imagenCookie);
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

      if (Array.isArray(imagenData) && numero >= 0 && numero < imagenData.length) {
        imagenData.splice(numero, 1);
        const updatedImagenCookie = JSON.stringify(imagenData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('peliculas', updatedImagenCookie, expirationDate);
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

        this.servicioService.postDatoRankingImagen(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
        
        this.router.navigate(['/eleccion2']);

       }
    }
    this.respuesta = '';
    this.seleccionarPalabraSecreta();
  }

  generarArrayNombresPeliculas() {
    this.nombresPeliculas = [];
    for (const pelicula of this.datos) {
       const NombrePelicula = pelicula.NombrePelicula;
       const imagenesPelicula = [pelicula.imagen.toString()];
       const peliculaObjeto = {
        nombre: NombrePelicula,
        imagenes: imagenesPelicula
      };
      this.nombresPeliculas.push(peliculaObjeto);
    }
    for (const pelicula of this.datos) {
      const NombrePelicula = pelicula.NombrePelicula;
      this.listaPeliculas.push(NombrePelicula);
    }
      // const nombresPeliculasCookie = this.nombresPeliculas.slice(0, 40); // Obtener los primeros 41 elementos

//me coge solo 38 peliculas
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    this.cookieService.set('peliculas', JSON.stringify(this.nombresPeliculas.slice(0, 38)), expirationDate);
    // this.cookieService.set('intentos', '3', expirationDate);
    this.cookieService.set('listapeliculas', JSON.stringify(this.listaPeliculas), expirationDate);
    this.cookieService.set('puntos', "0", expirationDate);
    location.reload();
  }

  // reiniciar() {
  //   document.cookie = `peliculas=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //   location.reload();
  // }
}
