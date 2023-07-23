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
  selector: 'app-juegomusicadosj',
  templateUrl: './juegomusicadosj.component.html',
  styleUrls: ['./juegomusicadosj.component.scss']
})
export class JuegomusicadosjComponent {
  datos!: Juegomusica[];
  respuesta: string = '';
  intentos: number = 0;
  intentos2: number = 0;
  puntos: number= 0;
  puntos2: number= 0;
  listaPeliculas: string[] = [];
  peliculaControl = new FormControl();
  session: string = ''
  session2: string=''
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
  turnoActual: number = 1;
  datosCargados: boolean = false; // Variable para verificar si los datos se han cargado


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
      const intentoscookie2 = this.cookieService.get('intentos2');
      this.intentos2 = parseInt(intentoscookie2, 10);
      this.datosCargados = true; // Marcar los datos como cargados
    }

     // Llamar a seleccionarPalabraSecreta solo si los datos ya están cargados
     if (this.datosCargados) {
      this.seleccionarPalabraSecreta();
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
    const pistaPeliculasCookies = this.cookieService.get('pistas'); //Para pistas
    this.pistaMusica = JSON.parse(pistaPeliculasCookies);

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

this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});

this.servicioService.postDatoRankingMusica(nuevo2).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});

      this.router.navigate(['/eleccion2dosj']);
      
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
    const puntos2cookie = this.cookieService.get('puntos2');
    this.puntos2 = parseInt(puntos2cookie, 10);
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

        this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.servicioService.postDatoRankingMusica(nuevo2).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.router.navigate(['/eleccion2dosj']);

       }else if(this.intentos2 <= -1){
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

        this.servicioService.postDatoRankingMusica(nuevo2).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

        this.servicioService.postDatoRankingMusica(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });
        
        this.router.navigate(['/eleccion2dosj']);

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
    this.cookieService.set('puntos2', "0", expirationDate);
    const pistacookie =this.cookieService.get('pistas'); //para pistas
    this.pistaMusica = JSON.parse(pistacookie);
  }
}
