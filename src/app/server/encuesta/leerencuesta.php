<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos por PDO

    $res = $mbd->query('SELECT * FROM encuesta');

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
