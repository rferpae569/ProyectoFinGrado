<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    //Esta consulta obtiene el nombre de la película y al spoiler correspondiente asociado a través de la relación entre las tablas "peliculaspoiler" e "spoiler" en la base de datos.
    $res = $mbd->query('SELECT peliculaspoiler.NombrePelicula, spoiler.spoiler FROM peliculaspoiler JOIN spoiler ON peliculaspoiler.idspoiler = spoiler.id');
	
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
?>