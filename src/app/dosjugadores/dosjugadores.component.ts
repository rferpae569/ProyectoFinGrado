import { Component,OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { Usuariosdos } from '../model/usuariosdos';
import { Observable } from 'rxjs';
//Importamos los modulos

@Component({
  selector: 'app-dosjugadores',
  templateUrl: './dosjugadores.component.html',
  styleUrls: ['./dosjugadores.component.scss'],
})
export class DosjugadoresComponent implements OnInit, AfterViewInit {
  //Creamos las variables para verificar el usuario y los datos pasados por formulario
  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  isLoggedIn = false;
  entrada: boolean = false;
  fallo: boolean = false;
  menuActive: boolean = false;
  newusuarioForm!: FormGroup;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  actuales$!: Observable<Usuariosdos[]>; 
  mostrarContrasena: boolean = false; 
  sessionValue: string = '';
  sessionValue2: string = '';
  sessionCookieExists = false;
  session2CookieExists = false;
  isSessionActive: boolean = false;

  constructor(
    private cookieService: CookieService,
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newloginForm = this.fb.group({
      //Añadimos una expresion regular para los campos pasados por formulario
      Nombre1: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      Passwrd1: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/),
        ],
      ],
      Nombre2: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      Passwrd2: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/),
        ],
      ],
    });
  }

  get nombre1() {
    //almacenamos el nombre del jugador1
    return this.newloginForm.get('Nombre1');
  }

  get passwrd1() {
    //almacenamos la contraseña del jugador1
    return this.newloginForm.get('Passwrd1');
  }

  get nombre2() {
    //almacenamos el nombre dle jugador2
    return this.newloginForm.get('Nombre2');
  }

  get passwrd2() {
    //almacenamos la contraseña del jugador2
    return this.newloginForm.get('Passwrd2');
  }

  /*Comprobamos si existe las dos sesiones. Si existen, se escribiran el nombre de usuario1 y usuario2 en el input correspondiente */
  ngOnInit() {
    const sessionCookieExists = this.cookieService.check('session');
    const session2CookieExists = this.cookieService.check('session2');
    if (sessionCookieExists) {
      this.sessionValue = this.cookieService.get('session');
      this.newloginForm.patchValue({
        Nombre1: this.sessionValue
      });
    } else {
      this.sessionValue = '';
      this.isLoggedIn = false;
    }

    if (session2CookieExists) {
      this.sessionValue2 = this.cookieService.get('session2');
      this.newloginForm.patchValue({
        Nombre2: this.sessionValue2
      });
    } else {
      this.sessionValue2 = '';
      this.isLoggedIn = false;
    }

    //Este condicional sera para cambiar el valor del boton de "iniciar sesion" por "acceder"
    if (sessionCookieExists && session2CookieExists) {
      this.isSessionActive = true;
    } else {
      this.isSessionActive = false;
    }

    this.sessionCookieExists = sessionCookieExists;
    this.session2CookieExists = session2CookieExists;
  }

  ngAfterViewInit() {
    //Esta funcion comprobara si existe la cookie session. Si existe, isloggedIn valdra true.
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.isLoggedIn = false;
    }
  }

  entradalogin() {
    //Si existe la sesion y no se introduce la constraseña, saltara el siguiente mensaje
    if (this.isSessionActive && !this.passwrd1?.value) {
      alert('Por seguridad, debeis de introducir la contraseña.');
      return;
    }

    // Verificamos si el formulario cumple con las expresiones regulares
    if (this.newloginForm.invalid) {
      alert(
        'No habeis completado bien los campos. El nombre de usuario debe de tener numeros, y la contraseña ocho caracteres (Letras y numeros).'
      );
      return;
    }

    // Continuamos con la verificación de la base de datos
    this.newlogin = this.newloginForm.value;
    this.servicioService.logindos(this.newlogin).subscribe((data) => {
      if (data.length === 2) {
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        );

        this.cookieService.set('session', data[0].Nombre, expirationDate);
        this.cookieService.set('session2', data[1].Nombre, expirationDate);

        this.isLoggedIn = true;
        this.router.navigateByUrl('elecciondosj');
      } else {
        alert('Inicio de sesión fallido. Comprueba los datos ingresados.');
      }
    });
  }

  entradausuariodos() {
    if (this.newloginForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      const newUsuariosdos: Usuariosdos = {
        NombreUsuario1: this.newloginForm.get('Nombre1')?.value,
        NombreUsuario2: this.newloginForm.get('Nombre2')?.value,
      };
      this.servicioService.postDato2(newUsuariosdos).subscribe({
        error: (err) => {
          console.log('Error en la solicitud:', err);
        },
        complete: () => {
          this.actuales$ = this.servicioService.getDatosUsuarios2();
        },
      });
    }
  }

  mandardatos() {
    this.entradalogin();
    this.entradausuariodos();
  }

  toggleMostrarContrasena() {
    //Esta funcion sirve para mostrar u ocultar la ocntraseña del jugador1
    const contrasenaInput = document.getElementById(
      'contrasena1'
    ) as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }

  toggleMostrarContrasena2() {
    //Esta funcion sirve para mostrar u ocultar la ocntraseña del jugador1
    const contrasenaInput = document.getElementById(
      'contrasena2'
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

  //Esta funcion mostrara la alerta si le damos al enlace de registro con la sesion abierta.
  mostrarAlert() {
    if (this.tieneSesionActiva()) {
      alert('Debeis cerrar sesión para acceder al registro');
    }
  }

  //Funcion para cerrar la sesion de los dos susuarios la pulsar el boton correspondiente
  cerrarSesion() {
    this.cookieService.delete('session');
    this.cookieService.delete('session2');

    this.sessionCookieExists = this.cookieService.check('session');
    this.session2CookieExists = this.cookieService.check('session2');
    
    this.newloginForm.reset({
      Nombre1: '',
      Passwrd1: '',
      Nombre2: '',
      Passwrd2: ''
    });
  
    this.isLoggedIn = false;
    this.sessionValue = '';
    this.sessionValue2 = '';
    this.isSessionActive=false;
  }
}
