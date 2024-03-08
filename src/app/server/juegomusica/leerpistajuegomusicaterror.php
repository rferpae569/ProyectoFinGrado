<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    // Nos conectamos a la base de datos por PDO

    // La consulta busca obtener el ID de la canción y la pista asociada a través de la relación entre las tablas "peliculascanciones", "canciones" y "generospeliculas". 
    // Se agrega la condición "generospeliculas.idgenero = 2" para obtener solo las pistas que tienen el idgenero igual a 2 en la tabla generospeliculas.
    $res = $mbd->query('SELECT canciones.id, canciones.nombre, canciones.compositor, canciones.mclave 
                        FROM peliculascanciones 
                        JOIN canciones ON peliculascanciones.idmusica = canciones.id 
                        JOIN generospeliculas ON peliculascanciones.NombrePelicula = generospeliculas.NombrePelicula 
                        WHERE generospeliculas.idgenero = 2');

    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);

        // Modificar el valor del atributo "id" por la posición en el array más 1
        foreach ($rows as $i => $row) {
            $rows[$i]['id'] = $i;
        }

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
