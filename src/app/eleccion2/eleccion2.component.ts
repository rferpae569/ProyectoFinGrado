import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
//Importamos los modulos y declaramos la variable para el grafico

@Component({
  selector: 'app-eleccion2',
  templateUrl: './eleccion2.component.html',
  styleUrls: ['./eleccion2.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'inactive',
        style({
          display: 'none',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          display: 'block',
          opacity: 1,
        })
      ),
      transition('inactive => active', animate('0.5s ease-in')),
      transition('active => inactive', animate('0.5s ease-out')),
    ]),
  ],
})
export class Eleccion2Component implements OnInit {
  // datos!: Ranking[];
  // datos2!: Numjugadas[];
  usuarioConMasPuntos: string = '';
  hayEmpate: boolean = false;
  session: string | null;
  session2: string | null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private servicioService: ServicioService
  ) {
    this.session = this.cookieService.get('session');
    this.session2 = this.cookieService.get('session2');
    // Verificamos si la cookie 'session' existe al acceder al componente
    if (!this.cookieService.check('session')) {
      // Si la cookie no existe, redirigimos al componente 'inicio'
      this.router.navigate(['inicio']);
    }
  }

  ngOnInit() {

    const sessionCookie = this.cookieService.get('session');
    const session2Cookie = this.cookieService.get('session2');

    // Verificar si existen las cookies 'session' y 'session2'
    if (sessionCookie && session2Cookie) {
      // Obtener los puntos de los usuarios desde las cookies
      const puntosUsuario1 = this.cookieService.get('puntos');
      const puntosUsuario2 = this.cookieService.get('puntos2');

      // Comparar los puntos y determinar el usuario con más puntos
      if (puntosUsuario1 > puntosUsuario2) {
        this.usuarioConMasPuntos = sessionCookie;
      } else if (puntosUsuario2 > puntosUsuario1) {
        this.usuarioConMasPuntos = session2Cookie;
      } else {
        this.usuarioConMasPuntos = 'Empate';
        this.hayEmpate = true;
      }
    }
  }

  irAEleccion() {
    //Con esta funcion, volveremos a eleccion para poder escoger un nuevo juego. Aparte de eso borrara tambien las cookies especificadas
    // Verificar la existencia de las cookies
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
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }

    // Navegar al componente /eleccion
    this.router.navigate(['/eleccion']);
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
      'session',
      'session2',
      'peliculas',
      'pistas',
      'preguntas',
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }

  get juegoTerminadoAntesDeTiempo(): boolean {
    return this.servicioService.juegoTerminadoAntesDeTiempo;
  }
}
