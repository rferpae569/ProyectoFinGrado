import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
//importamos los modulos

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, AfterViewInit {
  //Creamos las variables para verificar el usuario y los datos pasados por formulario
  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  isLoggedIn = false;
  entrada: boolean = false;
  fallo: boolean = false;
  mostrarContrasena: boolean = false;
  menuActive: boolean = false;
  sessionValue: string = '';
  isSessionActive: boolean = false;
  showCookieConsent: boolean = true;

  constructor(
    private cookieService: CookieService,
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newloginForm = this.fb.group({
      //Creamos expresiones regulares para el nombre y la contraseña
      Nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/),
        ],
      ],
    });
  }

  get nombre() {
    //almacenamos el nombre
    return this.newloginForm.get('Nombre');
  }

  get passwrd() {
    //almacenamos la contraseña
    return this.newloginForm.get('Passwrd');
  }

  ngAfterViewInit() {
    //Verificamos si existe la cookie session con esta funcion
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.isLoggedIn = false;
    }
  }

  entradalogin() {
    //Si existe la sesion y no se introduce la constraseña, saltara el siguiente mensaje
    if (this.isSessionActive && !this.passwrd?.value) {
      alert('Por seguridad, debes introducir la contraseña.');
      return;
    }

    // Verifica si el formulario cumple con las expresiones regulares
    if (this.newloginForm.invalid) {
      alert(
        'No has completado bien los campos. El nombre de usuario debe de tener numeros, y la contraseña ocho caracteres (Letras y numeros).'
      );
      return;
    }

    // Continuamos con la verificación de la base de datos
    this.newlogin = this.newloginForm.value;
    this.servicioService.login(this.newlogin).subscribe((data) => {
      if (data.length > 0) {
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );
        this.cookieService.set('session', data[0].Nombre, expirationDate);
        this.isLoggedIn = true;
        this.router.navigateByUrl('eleccion');
      } else {
        this.fallo = true;
        alert('Los campos no coinciden con el usuario especificado');
      }
    });
  }

  /*Comprobamos si existe la sesion. Si existe, se escribira el nombre de usuario en el input correspondiente
  Aparte de eso, mostrara el mensaje de las cokies si no han sido aceptadas */
  ngOnInit() {
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.sessionValue = this.cookieService.get('session');
      this.newloginForm.patchValue({
        Nombre: this.sessionValue,
      });
      this.isSessionActive = true;
    } else {
      this.sessionValue = '';
      this.isLoggedIn = false;
    }

    this.checkCookieConsent();
  }

  //Si existen las cookies, desactivara el duv con el mensaje
  checkCookieConsent(): void {
    const consent = this.cookieService.get('cookies');
    if (consent === 'Aceptadas') {
      this.showCookieConsent = false;
    }
  }

  //En caso de pulsar el boton de "Aceptar", las cookies se crearan
  acceptCookies(): void {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    this.cookieService.set('cookies', 'Aceptadas', { expires: expirationDate });
    this.showCookieConsent = false;
  }

  //Esta funcion mostrara un mensaje si las cookies son rechazadas
  rejectCookies(): void {
    alert('Debes aceptar las cookies para continuar en la página.');
  }

  toggleMostrarContrasena() {
    //Esta funcion sirve para mostrar o no la contraseña
    const contrasenaInput = document.getElementById(
      'contrasena'
    ) as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }

  toggleMenu() {
    //Esta funcion sirve para cambiar el valor del menu.
    this.menuActive = !this.menuActive;
  }

  //Comprobamos si esta abierta la sesion.
  tieneSesionActiva(): boolean {
    return this.cookieService.check('session');
  }

  //Esta funcion cerrara la sesion si pulsamos el boton que se mostrara en caso e que la tengamos abierta.
  cerrarSesion() {
    this.cookieService.delete('session');
    this.newloginForm.get('Nombre')?.setValue('');
    this.sessionValue = '';
    this.isLoggedIn = false;
    this.isSessionActive = false;
  }

  //Esta funcion mostrara la alerta si le damos al enlace de registro con la sesion abierta.
  mostrarAlert() {
    if (this.tieneSesionActiva()) {
      alert('Debes cerrar sesión para acceder al registro');
    }
  }
}
