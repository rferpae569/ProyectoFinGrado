import { Component } from '@angular/core';
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
export class BorrarComponent {
  menuActive: boolean = false;

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
  }

  borrarusuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
      alert('Los valores introducidos no son correctos. Por favor, asegurese del que el nombre de usuario y el correo son correctos.');
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
    const cookiesExistentes = [
      'session'
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }
}
