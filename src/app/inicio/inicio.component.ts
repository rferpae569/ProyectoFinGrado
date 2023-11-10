import {Component, OnInit, ElementRef, ViewChild, AfterViewInit,} from '@angular/core';
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

  mostrarFooter: boolean = true; //Declaramos la variable para mostrar el footer
  mostrarContrasena: boolean = false; //Declaramos la variable para mostrar la contraseña
  menuActive: boolean = false;

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
      this.isLoggedIn = true;
    }
  }

  entradalogin() {
    // Verificar si el formulario cumple con las expresiones regulares
    if (this.newloginForm.invalid) {
      alert(
        'No has completado bien los campos. El nombre de usuario debe de tener numeros, y la contraseña ocho caracteres (Letras y numeros).'
      );
      return;
    }

    // Continuar con la verificación de la base de datos
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
        alert('El usuario no se encuentra en la base de datos');
      }
    });
  }

  ngOnInit() {
    //El ngOnInit servira para ocultar o no el footer si existe la cookie llamada "Cookies"
    this.mostrarFooter = !this.cookieService.check('Cookies');
  }

  aceptarCookies() {
    //Esta funcion sirve para crear las cookies correspondientes si se aceptan
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
    //Esta funcion sirve apra rechazar las cookies, al hacerlo, mostrara un mensaje de alerta
    alert('Debes de aceptar las cookies');
    this.mostrarFooter = true;
    return false;
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
}
