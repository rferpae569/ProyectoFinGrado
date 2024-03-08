<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    // Nos conectamos a la base de datos por PDO

    // La consulta busca obtener todos los campos de la tabla "ranking" (r.*) 
    // y el campo "nombre" de la tabla "usuarios" para aquellos registros en los 
    // que el valor de la columna "codigoRanking" en ambas tablas sea igual. 
    // Esto implica que se obtendrá información del ranking y el nombre del usuario 
    // asociado a ese ranking.
    $res = $mbd->query('SELECT r.PuntosImagenFantasia, r.PuntosImagenTerror, r.PuntosPreguntasFantasia, r.PuntosPreguntasTerror, r.PuntosMusicaFantasia, r.PuntosMusicaTerror, u.nombre FROM ranking r JOIN usuarios u ON r.codigoRanking = u.codigoRanking');

    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);
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

