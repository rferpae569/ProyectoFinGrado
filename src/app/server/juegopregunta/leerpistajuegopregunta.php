<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    //La consulta busca obtener el ID de la pregunta y la pista asociada a través de la relación entre las tablas "peliculaspreguntas" y "preguntas". 
    //Esto significa que se obtendrá la pista correspondiente a cada pregunta en la tabla "preguntas" que esté relacionada con una entrada en la tabla "peliculaspreguntas".
	$res = $mbd->query('SELECT preguntas.id, preguntas.Pista FROM peliculaspreguntas JOIN preguntas ON peliculaspreguntas.idpregunta = preguntas.id');

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