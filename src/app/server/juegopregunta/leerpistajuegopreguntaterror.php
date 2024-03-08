<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    // Nos conectamos a la base de datos por PDO

    // La consulta busca obtener el ID de la pregunta y la pista asociada a través de la relación entre las tablas "peliculaspreguntas", "preguntas" y "generospeliculas". 
    // Se agrega la condición "generospeliculas.idgenero = 2" para obtener solo las pistas que tienen el idgenero igual a 10 en la tabla generospeliculas.
    $res = $mbd->query('SELECT preguntas.id, preguntas.Pista 
                        FROM peliculaspreguntas 
                        JOIN preguntas ON peliculaspreguntas.idpregunta = preguntas.id 
                        JOIN generospeliculas ON peliculaspreguntas.NombrePelicula = generospeliculas.NombrePelicula 
                        WHERE generospeliculas.idgenero = 2');

    if ($res->errorCode()==0) {
        $rows=$res->fetchAll(PDO::FETCH_ASSOC);
        header('Content-type: application/json');
        echo json_encode($rows);
    }

    $mbd = null; // Nos desconectamos
} catch (PDOException $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
    die();
}
