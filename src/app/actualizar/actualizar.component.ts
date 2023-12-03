import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
//Importamos los modulos

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss'],
})
export class ActualizarComponent implements OnInit {
  mostrarContrasena: boolean = false;
  menuActive: boolean = false;
  sessionCookie: string | undefined;
  sessionCookie2: string | undefined;

  newusuario: Usuarios = {
    //definimos la estructura de usuarios
    Nombre: '',
    Passwrd: '',
    CodigoRanking: 0,
    Codigojugadas: 0,
  };
  newusuarioForm!: FormGroup; //creamos un formgroup para el formulario
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  actuales$!: Observable<Usuarios[]>; //Declaramos la siguiente variable como un array del contenido de "Usuarios"

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.newusuarioForm = this.fb.group({
      //Añadimos una expresion regular para los campos pasados por formulario
      Nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/),
        ],
      ],
      Correo: ['', [Validators.required, Validators.email]],
    });

    // Verificamos si la cookie 'session' existe al acceder al componente
    if (!this.cookieService.check('session')) {
      // Si la cookie no existe, redirigimos al componente 'inicio'
      this.router.navigate(['inicio']);
    }
  }

  //Logica para que se pinte en el formulario el nombre de los usuarios que hayan iniciado sesion.
  ngOnInit() {
    const sessionCookie = this.getCookie('session');
    if (sessionCookie) {
      this.sessionCookie = sessionCookie; 
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie);
    }

    const sessionCookie2 = this.getCookie('session2');
    if (sessionCookie2) {
      this.sessionCookie2 = sessionCookie2;
    }
  }

  getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  //Funcion para cambiar el nombre del usuario al pulsar el boton
  toggleCookieValue() {
    if (this.newusuarioForm.get('Nombre')?.value === this.sessionCookie) {
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie2);
    } else {
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie);
    }
  }

  //Funcion que comprueba si los datos son correctos y de actualizar los datos del usuario
  actualizarusuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
      alert(
        'No se ha podido actualizar el usuario. Asegúrese de haber puesto bien el nombre de usuario, el correo y una contraseña adecuada (8 caracteres, letras y números)'
      );
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postActualizarDato(this.newusuario).subscribe({
        next: () => {
          if (
            document.cookie.includes('session') &&
            document.cookie.includes('session2')
          ) {
            this.router.navigate(['/elecciondosj']);
          } else if (document.cookie.includes('session')) {
            this.router.navigate(['/eleccion']);
          }
        },
        error: () => {
          alert('Error al actualizar el usuario en la base de datos.');
        },
        complete: () => {
          this.actuales$ = this.servicioService.getDatosUsuarios();
        },
      });
    }
  }

  get Nombre() {
    //almacenamos el nombre
    return this.newusuarioForm.get('Nombre');
  }

  get Correo() {
    //almacenamos el correo
    return this.newusuarioForm.get('Correo');
  }

  toggleMostrarContrasena() {
    //Esta funcion sirve para mostrar la contraseña
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

  //Dependiendo del numero de sesiones que haya, ira a un sitio o a otro al pulsar en el enlace de juegos.
  redirigirJuegos() {
    if (
      document.cookie.includes('session') &&
      document.cookie.includes('session2')
    ) {
      this.router.navigate(['/elecciondosj']);
    } else if (document.cookie.includes('session')) {
      this.router.navigate(['/eleccion']);
    }
  }

  //Esta funcion hara que la etiqueta a cmabie de color al pasar el raton
  cambiarColor(nuevoColor: string) {
    const linkElement = document.querySelector('a');
    if (linkElement) {
      linkElement.style.color = nuevoColor;
    }
  }
}
