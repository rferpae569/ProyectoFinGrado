<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    //La consulta busca obtener el ID de la pregunta, el contenido de la pregunta y la respuesta asociada a través de la relación entre las tablas "peliculaspreguntas" y "preguntas". Los resultados se ordenan por el ID de las preguntas en orden ascendente.
    $res = $mbd->query('SELECT preguntas.id, preguntas.pregunta, peliculaspreguntas.Respuesta FROM peliculaspreguntas JOIN preguntas ON peliculaspreguntas.idpregunta = preguntas.id ORDER BY preguntas.id');
	
	if ($res->errorCode()==0) {
		$rows=$res->fetchAll(PDO::FETCH_ASSOC);
		header('Content-type: application/json');
    	echo json_encode($rows);
	}

    $mbd = null; //Nos deconectamos
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