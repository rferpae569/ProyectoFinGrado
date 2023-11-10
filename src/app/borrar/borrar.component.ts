import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//Importamos los modulos

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.scss'],
})
export class BorrarComponent implements OnInit {
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
    private cookieService: CookieService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newusuarioForm = this.fb.group({
      //Añadimos una expresion regular para los campos pasados por formulario
      Nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Correo: ['', [Validators.required, Validators.email]],
    });

    // Verificamos si la cookie 'session' existe al acceder al componente
    if (!this.cookieService.check('session')) {
      // Si la cookie no existe, redirigimos al componente 'inicio'
      this.router.navigate(['inicio']);
    }
  }

  ngOnInit() {
    const sessionCookie = this.getCookie('session');
    if (sessionCookie) {
      this.sessionCookie = sessionCookie; // Asigna el valor correctamente
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie);
    }

    const sessionCookie2 = this.getCookie('session2');
    if (sessionCookie2) {
      this.sessionCookie2 = sessionCookie2; // Asigna el valor correctamente
    }
  }

  getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  toggleCookieValue() {
    if (this.newusuarioForm.get('Nombre')?.value === this.sessionCookie) {
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie2);
    } else {
      this.newusuarioForm.get('Nombre')?.setValue(this.sessionCookie);
    }
  }

  borrarusuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
      alert(
        'Los valores introducidos no son correctos. Por favor, asegurese del que el nombre de usuario y el correo son correctos.'
      );
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postBorrarDato(this.newusuario).subscribe({
        next: () => {
          this.router.navigate(['/inicio']);
        },
        error: () => {
          alert('Error al borrar el usuario en la base de datos.');
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

  toggleMenu() {
    //Esta funcion sirve para cambiar el valor del menu.
    this.menuActive = !this.menuActive;
  }

  irAInicio() {
    //Esta funcion nos llevara al inicio, y borrara las cookies especificadas.
    const cookiesExistentes = ['session', 'session2'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
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
