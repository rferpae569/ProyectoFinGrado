import { Component, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dosjugadores',
  templateUrl: './dosjugadores.component.html',
  styleUrls: ['./dosjugadores.component.scss']
})
export class DosjugadoresComponent implements AfterViewInit {

  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  isLoggedIn = false;
  entrada: boolean = false;
  fallo: boolean = false;

  mostrarFooter: boolean = true;
  mostrarContrasena: boolean = false;

  constructor(
    private cookieService: CookieService,
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newloginForm = this.fb.group({
      Nombre1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd1: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/)]],
      Nombre2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd2: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/)]]
    });
  }

  get nombre1() {
    return this.newloginForm.get('Nombre1');
  }

  get passwrd1() {
    return this.newloginForm.get('Passwrd1');
  }

  get nombre2() {
    return this.newloginForm.get('Nombre2');
  }

  get passwrd2() {
    return this.newloginForm.get('Passwrd2');
  }

  ngAfterViewInit() {
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.isLoggedIn = true;
    }
  }

  entradalogin() {
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
        this.router.navigateByUrl('elecciondos');
      } else {
        this.fallo = true;
      }
    });
  }

  toggleMostrarContrasena() {
    const contrasenaInput = document.getElementById('contrasena1') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }

  toggleMostrarContrasena2() {
    const contrasenaInput = document.getElementById('contrasena2') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text'  : 'password';
  }
}
