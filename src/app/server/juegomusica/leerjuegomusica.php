<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    $res = $mbd->query('SELECT canciones.id, peliculascanciones.NombrePelicula, canciones.musica FROM peliculascanciones JOIN canciones ON peliculascanciones.idmusica = canciones.id ORDER BY canciones.id');
	//La consulta busca obtener el ID de la canción, el nombre de la película asociada y la información de la música correspondiente de las canciones. Los resultados se ordenan por el ID de las canciones en orden ascendente.

	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
		header('Content-type: application/json');
    	echo json_encode($rows);
	}

    $mbd = null; //Nos deconectamos de la base de datos
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