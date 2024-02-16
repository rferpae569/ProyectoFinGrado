import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuarios } from './model/usuarios';
import { Correos } from './model/correos';
import { Numjugadas } from './model/numjugadas';
import { Ranking } from './model/ranking';
import { Juegoimagen } from './model/juegoimagen';
import { Juegopregunta } from './model/juegopregunta';
import { Juegopreguntapista } from './model/juegopreguntapista';
import { Juegomusica } from './model/juegomusica';
import { Juegomusicapista } from './model/juegomusicapista';
import { Usuariosdos } from './model/usuariosdos';
//importamos los modulos

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  //Creamos la ruta y las funciones para necesarios para dirigirnos a los archivos especificados

  url: string = 'http://localhost/server/';

  constructor(private http: HttpClient) {}

  getDatosUsuarios(): Observable<Usuarios[]> {
    //Esta funcion sirve para leer los usuarios que devuelve el archivo php de la base de datos
    return this.http.get<Usuarios[]>(`${this.url}usuarios/leerusuario.php`);
  }

  getDatosUsuarios2(): Observable<Usuariosdos[]> {
    //Esta funcion sirve para leer los usuarios de dos jugadores que devuelve el archivo php de la base de datos
    return this.http.get<Usuariosdos[]>(
      `${this.url}usuarios/leerusuariodos.php`
    );
  }

  getDatosRanking(): Observable<Ranking[]> {
    //Esta funcion sirve para leer los ranking que devuelve el archivo php de la base de datos
    return this.http.get<Ranking[]>(`${this.url}ranking/leerranking.php`);
  }

  getDatosNumJugadas(): Observable<Numjugadas[]> {
    //Esta funcion sirve para leer los numjugadas que devuelve el archivo php de la base de datos
    return this.http.get<Numjugadas[]>(
      `${this.url}numjugadas/leernumjugadas.php`
    );
  }

  getDatosCorreos(): Observable<Correos[]> {
    //Esta funcion sirve para leer los correos que devuelve el archivo php de la base de datos
    return this.http.get<Correos[]>(`${this.url}correos/leercorreo.php`);
  }

  getDatosPeliculaImagenfantasia(): Observable<Juegoimagen[]> {
    //Esta funcion sirve para leer los datos de juegoimagenfantasia que devuelve el archivo php de la base de datos
    return this.http.get<Juegoimagen[]>(
      `${this.url}juegoimagen/leerjuegoimagenfantasia.php`
    );
  }

  getDatosPeliculaImagenterror(): Observable<Juegoimagen[]> {
    //Esta funcion sirve para leer los datos de juegoimagenterror que devuelve el archivo php de la base de datos
    return this.http.get<Juegoimagen[]>(
      `${this.url}juegoimagen/leerjuegoimagenterror.php`
    );
  }

  getDatosPeliculaPreguntaFantasia(): Observable<Juegopregunta[]>{
    //Esta funcion sirve para leer los datos de juegopreguntafantasia que devuelve el archivo php de la base de datos
    return this.http.get<Juegopregunta[]>(
      `${this.url}juegopregunta/leerjuegopreguntafantasia.php`
    );
  }

  getDatosPeliculaPreguntaTerror(): Observable<Juegopregunta[]>{
    //Esta funcion sirve para leer los datos de juegopreguntaterror que devuelve el archivo php de la base de datos
    return this.http.get<Juegopregunta[]>(
      `${this.url}juegopregunta/leerjuegopreguntaterror.php`
    );
  }

  getDatosPeliculaPistaPreguntaFantasia(): Observable<Juegopreguntapista[]>{
    //Esta funcion sirve para leer las pistas del juego de las preguntas de fantasia que devuelve el archivo php de la base de datos
    return this.http.get<Juegopreguntapista[]>(
      `${this.url}juegopregunta/leerpistajuegopreguntafantasia.php`
    );
  }

  getDatosPeliculaPistaPreguntaTerror(): Observable<Juegopreguntapista[]>{
    //Esta funcion sirve para leer las pistas del juego de las preguntas de terror que devuelve el archivo php de la base de datos
    return this.http.get<Juegopreguntapista[]>(
      `${this.url}juegopregunta/leerpistajuegopreguntaTerror.php`
    );
  }

  getDatosPeliculaMusicaFantasia(): Observable<Juegomusica[]>{
    //Esta funcion sirve para leer los datos del juego de las canciones de fantasia que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusica[]>(
      `${this.url}juegomusica/leerjuegomusicafantasia.php`
    );
  }

  getDatosPeliculaMusicaTerror(): Observable<Juegomusica[]>{
    //Esta funcion sirve para leer los datos del juego de las canciones de terror que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusica[]>(
      `${this.url}juegomusica/leerjuegomusicaterror.php`
    );
  }

  getDatosPeliculaPistaMusicaFantasia(): Observable<Juegomusicapista[]>{
    //Esta funcion sirve para leer las pistas del juego de la musica de fantasia que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusicapista[]>(
      `${this.url}juegomusica/leerpistajuegomusicafantasia.php`
    );
  }

  getDatosPeliculaPistaMusicaTerror(): Observable<Juegomusicapista[]>{
        //Esta funcion sirve para leer las pistas del juego de la musica de terror que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusicapista[]>(
      `${this.url}juegomusica/leerpistajuegomusicaterror.php`
    );
  }

  getClasificacion(nuevo?: any): Observable<any> {
    return this.http.get(`${this.url}ranking/leerRankingClasificacion.php`, nuevo);
  }

  getIncrementarJugadasImagenFantasia(nuevo: any): Observable<any> {
    //Esta funcion sirve para incrementar el numero de jugadas del juego de las imagenes de fantasia en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadaimagenfantasia.php`,
      nuevo
    );
  }

  getIncrementarJugadasImagenTerror(nuevo: any): Observable<any> {
    //Esta funcion sirve para incrementar el numero de jugadas del juego de las imagenes de terror en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadaimagenterror.php`,
      nuevo
    );
  }

  getIncrementarJugadasPreguntasFantasia(nuevo: any): Observable<any>{
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadapreguntafantasia.php`,
      nuevo
    );
  }

  getIncrementarJugadasPreguntasTerror(nuevo: any): Observable<any>{
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadapreguntaterror.php`,
      nuevo
    );
  }

  getIncrementarJugadasMusicaFantasia(nuevo: any): Observable<any>{
    //Esta funcion sirve para incrementar el numero de jugadas del juego de las canciones de fantasia en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadamusicafantasia.php`,
      nuevo
    );
  }

  getIncrementarJugadasMusicaTerror(nuevo:any): Observable<any>{
    //Esta funcion sirve para incrementar el numero de jugadas del juego de las canciones de terror en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadamusicaterror.php`,
      nuevo
    );
  }

  postDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para insertar el usuario introducido por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/insertarusuario.php`,
      nuevo
    );
  }

  postDato2(nuevo: Usuariosdos): Observable<Usuariosdos> {
    //Esta funcion sirve para insertar los usuarios introducidos por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuariosdos>(
      `${this.url}usuarios/insertarusuariodos.php`,
      nuevo
    );
  }

  postBorrarDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para borrar el usuario especificado por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/borrarusuario.php`,
      nuevo
    );
  }

  postActualizarDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para actualizar los datos pasados por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/actualizarusuario.php`,
      nuevo
    );
  }

  postDatoRankingImagenFantasia(nuevo: any): Observable<any> {
    //Esta funcion sirve para actualizar el ranking del juego de las imagenes de fantasia en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegoimagenfantasia.php`,
      nuevo
    );
  }

  postDatoRankingImagenTerror(nuevo: any): Observable<any> {
    //Esta funcion sirve para actualizar el ranking del juego de las imagenes de fantasia en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegoimagenterror.php`,
      nuevo
    );
  }

  postDatoRankingPreguntaFantasia(nuevo: any): Observable<any>{
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegopreguntafantasia.php`,
      nuevo
    );
  }

  postDatoRankingPreguntaTerror(nuevo: any): Observable<any>{
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegopreguntaterror.php`,
      nuevo
    );
  }

  postDatoRankingMusicaFantasia(nuevo: any): Observable<any>{
    //Esta funcion sirve para actualizar el ranking del juego de las canciones de fantasia en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegomusicafantasia.php`,
      nuevo
    );
  }

  postDatoRankingMusicaTerror(nuevo: any): Observable<any>{
    //Esta funcion sirve para actualizar el ranking del juego de las canciones de terror en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegomusicaterror.php`,
      nuevo
    );
  }

  login(user: Usuarios): Observable<Usuarios[]> {
    //Esta funcion sirve para comprobar que el usuario esta en la base de datos cuando vayamos a iniciar sesion
    return this.http.post<Usuarios[]>(
      `${this.url}usuarios/loginusuario.php`,
      user
    );
  }

  logindos(user: Usuarios): Observable<Usuarios[]> {
    //Esta funcion sirve para comprobar que los usuarios estan en la base de datos cuando vayamos a iniciar sesion en el juego de dos jugadores
    return this.http.post<Usuarios[]>(
      `${this.url}usuarios/loginusuariodos.php`,
      user
    );
  }

  juegoTerminadoAntesDeTiempo: boolean = false;

}
