import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-eleccion2',
  templateUrl: './eleccion2.component.html',
  styleUrls: ['./eleccion2.component.scss']
})
export class Eleccion2Component {

  constructor(private router: Router, private cookieService: CookieService) {}

  irAEleccion() {
    // Verificar la existencia de las cookies
    const cookiesExistentes = ['numero', 'palabra', 'puntos', 'listapeliculas', 'intentos', 'game'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie); // Eliminar la cookie
      }
    }

    // Navegar al componente /eleccion
    this.router.navigate(['/eleccion']);
  }

  irAInicio() {
    const cookiesExistentes = ['numero', 'palabra', 'puntos', 'listapeliculas', 'intentos', 'session', 'game'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }

}
