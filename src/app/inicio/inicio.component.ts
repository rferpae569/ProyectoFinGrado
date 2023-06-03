import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  mostrarFooter: boolean = true;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.mostrarFooter = !this.cookieService.check('Cookies');
  }

  aceptarCookies() {
    // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener la fecha de expiración (sumar 1 día a la fecha actual)
  const fechaExpiracion = new Date();
  fechaExpiracion.setDate(fechaActual.getDate() + 1);

  // Establecer la cookie con la fecha de expiración
  this.cookieService.set('Cookies', 'Aceptadas', fechaExpiracion);

  this.mostrarFooter = false;
  }

  rechazarCookies() {
    alert('Debes de aceptar las cookies');
    this.mostrarFooter = true;
    return false;
  }

}


