import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
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
  resp: any;
  actuales$!: Observable<Usuarios[]>; //Declaramos la siguiente variable como un array del contenido de "Usuarios"

  constructor(
    private servicioService: ServicioService,
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
    //Esta funcion sirve para borrar el usuario pasado por formulario
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postBorrarDato(this.newusuario).subscribe({
        next: (resp) => {
          this.resp = resp;
          console.log('Respuesta del servicio:', resp);
          // Nos vamos a "Inicio"
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.log('Error en la solicitud:', err);
        },
        complete: () => {
          console.log('Solicitud completada');
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
}
