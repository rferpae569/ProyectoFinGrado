# AdivinaLaPelicula

# ProyectoFinGrado Ruben Fernandez 🕹️ 💻🌐 🎬 🎥

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 16.0.4.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en alguno de los archivos de origen.

# Descripcion

Este repositorio almacena un proyecto realizado en Angular en el que se puede jugar a varios juegos relacionados con peliculas.

La primera vez que se meta el usuario, se encontrara con el contenido del componente inicio. En el, tendra que aceptar el mensaje de las cookies, y luego, debera de iniciar sesion para poder acceder a los distintos juegos. En caso de que no este registrado en la base de datos, debera de crearse una cuenta dandole al enlace de "Aun no estoy registrado" que lo llevara al componente "Registro" donde se le mostrara un formulario para registrarse.

Cuando inicie sesion, el usuario sera llevado al componente "eleccion" donde podra cerrar sesion, actualizar sus datos, borrarse la cuenta, ver en que puesto va en la clasificacion, ver la cartelera de las peliculas que hay ahora mismo disponibles, rellenar una encuesta de satisfaccion, y jugar a los juegos disponibles de las siguientes secciones:

## Lista de juegos: 
- Juego de las imagenes
    - Genero fantasia
    - Genero Terror
    - Genero Ciencia Ficcion.
- Juego de las preguntas
    - Genero fantasia
    - Genero Terror
    - Genero Ciencia Ficcion
- Juego de la musica 
    - Genero fantasia
    - Genero Terror
    - Genero Ciencia Ficcion

En el juego de las imagenes, al usuario le aparecera una imagen aleatoria de una pelicula, y debera de adivinar a que pelicula pertenece escribiendo su titulo en el formulario. En el juego de las preguntas, al usuario le saldra una pregunta aleatoria en relacion a los datos de dicha pelicula (Quien la hizo, año en el que salio, su recaudacion, etc). Dependiendo de la pregunta, el usuario debera de escribir la respuesta correspondiente. En el juego de la musica, al usuario le saldra una banda sonora aleatoria de una pelicula, y debera de adivinar a que pelicula pertenece escribiendo su titulo en el formulario.

En los juegos de cada seccion, el usuario tendra tres intentos, si los gasta y pierde otra vez, el juego terminara.

Aparte de eso, se ha implementado tambien el modo dos jugadores, donde el usuario podra jugar a los mismos juegos con otra persona una vez inicien sesion los dos juntos. Se puede acceder a ese modo dandole al enlace de "Modo dos jugadores" ubicado en el componente "Inicio".

**Este proyecto ha sido realizado por Rubén Fernández**