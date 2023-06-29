import { Component, AfterViewInit } from '@angular/core';
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
  styleUrls: ['./dosjugadores.component.scss']
})
export class DosjugadoresComponent implements AfterViewInit {

  newloginForm!: FormGroup; //creamos un formgroup para el formulario
  newlogin!: Usuarios; 
  isLoggedIn = false;
  entrada: boolean = false;
  fallo: boolean = false;

  newusuarioForm!: FormGroup;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  resp: any;
  actuales$!: Observable<Usuariosdos[]>;; //Declaramos la siguiente variable como un array del contenido de "Usuariosdos"
  mostrarContrasena: boolean = false; //Declaramos la siguiente variable para mostrar u ocultar la contraseña

  constructor(
    private cookieService: CookieService,
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newloginForm = this.fb.group({ //Añadimos una expresion regular para los campos pasados por formulario
      Nombre1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd1: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/)]],
      Nombre2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd2: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/)]]
    });
  }

  get nombre1() { //almacenamos el nombre del jugador1
    return this.newloginForm.get('Nombre1');
  }

  get passwrd1() { //almacenamos la contraseña del jugador1
    return this.newloginForm.get('Passwrd1');
  }

  get nombre2() { //almacenamos el nombre dle jugador2
    return this.newloginForm.get('Nombre2');
  }

  get passwrd2() { //almacenamos la contraseña del jugador2
    return this.newloginForm.get('Passwrd2');
  }

  ngAfterViewInit() { //Esta funcion comprobara si existe la cookie session. Si existe, isloggedIn valdra true.
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.isLoggedIn = true;
    }
  }

  entradalogin() { //Esta funcion sirve para comprobar el inicio de sesion de los usuarios, crear las cookies correspondientes, y mandarlos a elecciondosj si todo es correcto
    this.newlogin = this.newloginForm.value;

    this.servicioService.logindos(this.newlogin).subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        // Guardar el primer usuario en la cookie 'session'
        this.cookieService.set('session', data[0].Nombre, expirationDate);

        if (data.length > 1) {
          // Guardar el segundo usuario en la cookie 'session2'
          this.cookieService.set('session2', data[1].Nombre, expirationDate);
        }

        this.isLoggedIn = true;
        this.router.navigateByUrl('elecciondosj');
      } else {
        this.fallo = true;
      }
    });
  }

  entradausuariodos() { //Esta funcion sirve comprobar los nombres pasados por el formulario
    if (this.newloginForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      const newUsuariosdos: Usuariosdos = {
        NombreUsuario1: this.newloginForm.get('Nombre1')?.value,
        NombreUsuario2: this.newloginForm.get('Nombre2')?.value,
      };
  
      console.log('Entrada correcta', newUsuariosdos);
  
      this.servicioService.postDato2(newUsuariosdos).subscribe({
        next: resp => {
          this.resp = resp;
          console.log('Respuesta del servicio:', resp);
        },
        error: err => {
          console.log('Error en la solicitud:', err);
        },
        complete: () => {
          console.log('Solicitud completada');
          this.actuales$ = this.servicioService.getDatosUsuarios2();
        }
      });
    }
  }

  mandardatos() { //En esta funcion llamamos a las funciones entradalogin y entradausuariodos
    this.entradalogin();
    this.entradausuariodos();
  }

  toggleMostrarContrasena() { //Esta funcion sirve para mostrar u ocultar la ocntraseña del jugador1
    const contrasenaInput = document.getElementById('contrasena1') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }

  toggleMostrarContrasena2() { //Esta funcion sirve para mostrar u ocultar la ocntraseña del jugador1
    const contrasenaInput = document.getElementById('contrasena2') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text'  : 'password';
  }
}
