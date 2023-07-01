<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    //La consulta busca obtener el ID de la canción, el nombre, el compositor y la clave de música de las canciones que están asociadas a películas en la tabla "peliculascanciones". Los resultados se ordenan por el ID de la música en la tabla "peliculascanciones".
	$res = $mbd->query('SELECT canciones.id, canciones.nombre, canciones.compositor, canciones.mclave FROM peliculascanciones JOIN canciones ON peliculascanciones.idmusica = canciones.id ORDER BY peliculascanciones.idmusica');

	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
		header('Content-type: application/json');
    	echo json_encode($rows);
	}

    $mbd = null;//Nos deconectamos de la base de datos
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