import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//Importamos los modulos

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss'],
})
export class ActualizarComponent {
  mostrarContrasena: boolean = false; //creamos esta variable para mostrar la contraseña
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
    private fb: FormBuilder,
    private router: Router
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
  }

  actualizarusuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
      alert('No se ha podido actualizar el usuario. Asegurese de haber puesto bien el nombre de usuario, el correo, y una contraseña adecuada (8 caracteres, letras y numeros) ');
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postActualizarDato(this.newusuario).subscribe({
        next: () => {
          this.router.navigate(['/inicio']);
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
}
