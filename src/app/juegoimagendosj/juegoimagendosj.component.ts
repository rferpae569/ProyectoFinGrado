import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juegoimagen } from '../model/juegoimagen';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-juegoimagendosj',
  templateUrl: './juegoimagendosj.component.html',
  styleUrls: ['./juegoimagendosj.component.scss']
})
export class JuegoimagendosjComponent implements OnInit {

  datos!: Juegoimagen[]; 
  respuesta: string = '';
  intentos: number = 0;
  intentos2: number = 0;
  puntos: number = 0;
  puntos2: number= 0;
  listaPeliculas: string[] = []; 
  peliculaControl = new FormControl();
  session: string = ''
  session2: string = ''
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresPeliculas: Array<{ nombre: string; imagenes: string[] }> = [];
  titulosCoincidentes: string[] = [];
  filtroTituloControl = new FormControl();
  turnoActual: number = 1;


  ngOnInit() {

    const sessionCookieExists = this.cookieService.check('session');
    const sessionCookieExists2 =this.cookieService.check('session2');
    const intentosCookieExists = this.cookieService.check('intentos');
    const intentosCookieExists2 = this.cookieService.check('intentos2');

    if (sessionCookieExists && sessionCookieExists2) {
      this.session = this.cookieService.get('session');
      this.session2 = this.cookieService.get('session2');
    }

    if (intentosCookieExists && intentosCookieExists2) {
      this.intentos = parseInt(this.cookieService.get('intentos'), 10);
      this.intentos2 = parseInt(this.cookieService.get('intentos2'),10);
    } else {
      this.intentos = 3; // Establecer el valor inicial en 3 si no existe la cookie 'intentos'
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
      this.cookieService.set('intentos', '3', expirationDate); // Guardar la cookie con el valor inicial de 3

      this.intentos2=3;
      this.cookieService.set('intentos2','3', expirationDate);
    }

    const listaPeliculasCookie = this.cookieService.get('listapeliculas');

    if (listaPeliculasCookie) {
      this.listaPeliculas = JSON.parse(listaPeliculasCookie);
    }
    
    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10) || 0;
    const puntoscookie2 = this.cookieService.get('puntos2');
    this.puntos2 = parseInt(puntoscookie2,10) || 0;
    
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

    const turnoGuardado = localStorage.getItem('turno');

    if (turnoGuardado) {
      this.turnoActual = Number(turnoGuardado);
    } else {
      this.turnoActual = 1;
      localStorage.setItem('turno', '1');
    }

    this.session = this.turnoActual === 1 ? this.getCookieValue('session') : '';
    this.session2 = this.turnoActual === 2 ? this.getCookieValue('session2') : '';

    this.alternarTurno();
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
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);
    }
  }

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
      const nombreuser2= this.cookieService.get('session2');
const nuevo2 = {
  nombre: nombreuser2,
  puntos: this.puntos2
};

this.servicioService.postDatoRankingImagen(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});

this.servicioService.postDatoRankingImagen(nuevo2).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});

      this.router.navigate(['/eleccion2dosj']);
      
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
    const puntos2cookie = this.cookieService.get('puntos2');
    this.puntos2 = parseInt(puntos2cookie, 10);
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
      const puntoscookie2 = this.cookieService.get('puntos2');
      this.puntos2 = parseInt(puntoscookie2, 10);
      const intentoscookie = this.cookieService.get('intentos');
      this.intentos = parseInt(intentoscookie, 10);
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);

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

      this.cookieService.set('intentos', this.intentos.toString(), expirationDate);
      this.cookieService.set('intentos2', this.intentos2.toString(), expirationDate);
      this.cookieService.set('puntos', this.puntos.toString(), expirationDate);
      this.cookieService.set('puntos2', this.puntos2.toString(), expirationDate);

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
      
      this.cookieService.set('intentos', this.intentos.toString(), expirationDate);
      this.cookieService.set('intentos2', this.intentos2.toString(),expirationDate);
      if (this.intentos <= -1) {
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        };

        const nombreuser2 = this.cookieService.get('session2');
        const nuevo2 ={
          nombre: nombreuser2,
          puntos: this.puntos2
        }

        this.servicioService.postDatoRankingImagen(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.servicioService.postDatoRankingImagen(nuevo2).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
        
        this.router.navigate(['/eleccion2dosj']);

       } else if(this.intentos2 <= -1){
        const nombreuser2 = this.cookieService.get('session2');
        const nombreuser = this.cookieService.get('session');
        const nuevo2 = {
          nombre: nombreuser2,
          puntos: this.puntos2
        };

        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        }

        this.servicioService.postDatoRankingImagen(nuevo2).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.servicioService.postDatoRankingImagen(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
        
        this.router.navigate(['/eleccion2dosj']);

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
    this.cookieService.set('puntos2', "0", expirationDate);
    location.reload();
  }

  // reiniciar() {
  //   document.cookie = `peliculas=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  //   location.reload();
  // }
}
