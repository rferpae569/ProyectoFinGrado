import {Component, OnInit, ElementRef, ViewChild, AfterViewInit,} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { Usuariosdosonline } from '../model/usuariosdosonline';
import { Observable, interval } from 'rxjs';
//importamos los modulos

@Component({
  selector: 'app-dosjugadoresonline',
  templateUrl: './dosjugadoresonline.component.html',
  styleUrls: ['./dosjugadoresonline.component.scss']
})
export class DosjugadoresonlineComponent implements AfterViewInit  {

  //Creamos las variables para verificar el usuario y los datos pasados por formulario
  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  isLoggedIn = false;
  entrada: boolean = false;
  fallo: boolean = false;
  mostrarContrasena: boolean = false; 
  menuActive: boolean = false;
  esperandoJugador: boolean = false;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  actuales$!: Observable <Usuariosdosonline[]>; 

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
    // Verificar si el formulario cumple con las expresiones regulares
    if (this.newloginForm.invalid) {
      alert(
        'No has completado bien los campos. El nombre de usuario debe de tener números, y la contraseña ocho caracteres (letras y números).'
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
  
        // Verificar si existe la cookie 'session'
        const sessionCookie = this.cookieService.get('session');

        //Comprobamos si existe la session para que cambia el contenido del html y salga que esta esperando un jugador
        if (!sessionCookie) {
          this.esperandoJugador = true; 
          this.isLoggedIn = true;
        } 
      } else {
        this.fallo = true;
        alert('Los campos no coinciden con el usuario especificado');
      }
    });
  }

  entradausuariodosonline() {
    if (this.newloginForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {

      this.newlogin = this.newloginForm.value;
  this.servicioService.login(this.newlogin).subscribe((data) => {
    if (data.length > 0) {
      const response = data[0];
      const storedPassword = response.Passwrd; 

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      if (this.newloginForm.get('Passwrd')?.value !== storedPassword) {
        return; // Detener la ejecución si la contraseña es incorrecta
      }

      this.clasec = 'text-success';
      const newUsuariosdosonline = {
        NombreUsuario1: this.newloginForm.get('Nombre')?.value,
        NombreUsuario2: ''
      };
  
      this.servicioService.postDato2online(newUsuariosdosonline).subscribe({
        next: (response) => {
          const nuevoNombreUsuario1 = response.NombreUsuario1;
  
          // Verificar si la cookie 'session' existe antes de guardar NombreUsuario1
          const sessionExistente = this.cookieService.get('session');
          if (!sessionExistente) {
            // Guardar NombreUsuario1 en la cookie 'session' si no existe
            this.cookieService.set('session', nuevoNombreUsuario1);
          }
  
          // Verificar si existe la cookie 'session' antes de intentar obtener NombreUsuario2
          const sessionExistente2 = this.cookieService.get('session');
          if (sessionExistente2) {
            const nuevoNombreUsuario2 = response.NombreUsuario2;
  
            // Guardar NombreUsuario2 en la cookie 'session2'
            this.cookieService.set('session2', nuevoNombreUsuario2);
          }
  
          // Actualizar las cookies con los nuevos valores de getDatosUsuariosdosonline() después de un retraso
          setTimeout(() => {
            this.servicioService.getDatosUsuariosdosonline().subscribe({
              next: (data) => {
                const usuario1 = data[0]?.NombreUsuario1; 
                const usuario2 = data[0]?.NombreUsuario2; 
  
                // Actualizar las cookies con los nuevos valores obtenidos
                if (usuario1) {
                  this.cookieService.set('session', usuario1);
                }
                if (usuario2) {
                  this.cookieService.set('session2', usuario2);
                }
  
                // Mostrar alerta si los valores siguen siendo undefined
                if (!usuario1 || !usuario2) {
                  alert('No se ha encontrado ningun jugador con el que jugar');
                  this.cookieService.delete('session');
                  this.cookieService.delete('session2');
                  this.isLoggedIn=false;
                  this.esperandoJugador=false;
                }
              },
              error: (err) => {
                console.log('Error al obtener datos actualizados:', err);
              }
            });
          }, 10000); // Esperar 10 segundos
        },
        error: (err) => {
          console.log('Error en la solicitud:', err);
        }
      });
    }
  });
}
}

  mandardatos() {
    this.entradalogin()
    this.entradausuariodosonline();
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
