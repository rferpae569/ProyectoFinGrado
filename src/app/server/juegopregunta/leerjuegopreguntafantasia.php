<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    // Modificamos la consulta para incluir la unión y el filtro por idgenero igual a 10
    $res = $mbd->query('SELECT preguntas.id, preguntas.pregunta, peliculaspreguntas.Respuesta 
                        FROM peliculaspreguntas 
                        JOIN preguntas ON peliculaspreguntas.idpregunta = preguntas.id 
                        JOIN generospeliculas ON peliculaspreguntas.NombrePelicula = generospeliculas.NombrePelicula
                        WHERE generospeliculas.idgenero = 10 
                        ORDER BY preguntas.id');
    
    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);
        header('Content-type: application/json');
        echo json_encode($rows);
    }

    $mbd = null; //Nos desconectamos
} catch (PDOException $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
    die();
}
?>