<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

//pasamos los parametros
$params = json_decode($json);
$nombre1 = $params->NombreUsuario1;
$nombre2 = $params->NombreUsuario2;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos mediante PDO

    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mbd->beginTransaction();
    
    //Con esta consulta insertaremos los datos pasados en la tabla dosjugadores
    $sentencia = $mbd->prepare("INSERT INTO dosjugadores (NombreUsuario1, NombreUsuario2) VALUES (:NombreUsuario1, :NombreUsuario2)");
    $sentencia->bindParam(':NombreUsuario1', $nombre1);
    $sentencia->bindParam(':NombreUsuario2', $nombre2);

    $sentencia->execute();
    
    $mbd->commit();
    
    header('Content-Type: application/json');
    echo json_encode(array('msg' => 'Usuario creado exitosamente'));
    
    $mbd = null; //Nos desconectamos
} catch (PDOException $e) {
    header('Content-Type: application/json');
	echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}
