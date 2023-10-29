# AdivinaLaPelicula

# ProyectoFinGrado Ruben Fernandez 🕹️ 💻🌐 🎬 🎥

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 16.0.4.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en alguno de los archivos de origen.

# Descripcion

Este repositorio almacena un proyecto realizado en Angular en el que se puede jugar a varios juegos relacionados con peliculas.

La primera vez que se meta el usuario, se encontrara con el contenido del componente inicio. En el, tendra que aceptar el mensaje de las cookies, y luego, debera de iniciar sesion para poder acceder a los distintos juegos. En caso de que no este registrado en la base de datos, debera de crearse una cuenta dandole al enlace de "Aun no estoy registrado" que lo llevara al componente "Registro" donde se le mostrara un formulario para registrarse.

Cuando inicie sesion, el usuario sera llevado al componente "eleccion" donde podra cerrar sesion, actualizar sus datos, borrarse la cuenta, y jugar a uno de estos cuatro juegos:

## Lista de juegos: 
- Juego de las imagenes (Facil)
- Juego de las preguntas (Normal)
- Juego de la musica (Dificil)
- Juego del spoiler (Normal)

En el juego de las imagenes, al usuario le aparecera una imagen aleatoria de una pelicula, y debera de adivinar a que pelicula pertenece escribiendo su titulo en el formulario. En el juego de las preguntas, al usuario le saldra una pregunta aleatoria en relacion a los datos de dicha pelicula (Quien la hizo, año en el que salio, su recaudacion, etc). Dependiendo de la pregunta, el usuario debera de escribir la respuesta correspondiente. En el juego de la musica, al usuario le saldra una banda sonora aleatoria de una pelicula, y debera de adivinar a que pelicula pertenece escribiendo su titulo en el formulario. En el juego del spoiler, el usuario le saldra un spoiler relacionado con una pelicula (Puede ser un spoiler del final, o de cualquier otra parte de la pelicula). Una vez lea el spoiler de la pelicula, el usuario debera de escribir el titulo de la pelicula al que pertenece.

En los cuatro juegos, el usuario tendra tres intentos, si los gasta y pierde otra vez, el juego terminara.

En caso de que gane o pierda, al usuario se le mostrara dos graficos para que pueda ver cual es el juego al que se juega mas, y cual es el record de los distintos usuarios que estan almacenados en la base de datos. Aparte de eso, se mostrara tambien un enlace para que pueda descargarse un pdf con los datos de los graficos.

Aparte de eso, se ha implementado tambien el modo dos jugadores, donde el usuario podra jugar a los mismos juegos con otra persona una vez inicien sesion los dos juntos. Se puede acceder a ese modo dandole al enlace de "Modo dos jugadores" ubicado en el componente "Inicio".

**Este proyecto ha sido realizado por Rubén Fernández**

## Estructura de código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta  `ng build` para compilar el proyecto. Los artefactos de construcción se almacenarán en el directorio  `dist/`.

## Ejecución de pruebas unitarias

Ejecuta  `ng test`  para ejecutar pruebas unitarias utilizando [Karma](https://karma-runner.github.io).

## Ejecución de pruebas end-to-end

Ejecuta  `ng e2e` para ejecutar pruebas end-to-end utilizando una plataforma de tu elección. Para utilizar este comando, primero debes agregar un paquete que implemente capacidades de pruebas end-to-end.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, utiliza `ng help` o consulta la página de [Angular CLI Overview and Command Reference](https://angular.io/cli).
