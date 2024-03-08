<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    //Esta consulta obtiene el nombre de la película y la cancion correspondiente asociada a través de la relación entre las tablas "peliculascanciones" e "canciones" en la base de datos.
    $res = $mbd->query('
    SELECT pc.NombrePelicula, c.musica 
    FROM peliculascanciones pc 
    JOIN canciones c ON pc.idmusica = c.id 
    JOIN generospeliculas gp ON pc.NombrePelicula = gp.NombrePelicula 
    WHERE gp.idgenero = 10
');	
	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
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
