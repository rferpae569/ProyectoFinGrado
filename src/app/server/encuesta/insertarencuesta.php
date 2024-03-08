<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

// Pasamos los parametros
$params = json_decode($json);
$usuario = $params->usuario;
$r1 = $params->R1;
$r2 = $params->R2;
$r3 = $params->R3;
$r4 = $params->R4;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    // Nos conectamos a la base de datos mediante PDO

    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mbd->beginTransaction();
    
    // Obtener el siguiente código de encuesta
    $stmt = $mbd->query("SELECT MAX(CodigoEncuesta) AS max_codigo FROM encuesta");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $codigoEncuesta = $row['max_codigo'] + 1;
    
    // Insertar un nuevo registro en la tabla "encuesta"
    $sentencia = $mbd->prepare("INSERT INTO encuesta (CodigoEncuesta, R1, R2, R3, R4, NombreUsuario) VALUES (:CodigoEncuesta, :R1, :R2, :R3, :R4, :NombreUsuario)");
    $sentencia->bindParam(':CodigoEncuesta', $codigoEncuesta);
    $sentencia->bindParam(':R1', $r1);
    $sentencia->bindParam(':R2', $r2);
    $sentencia->bindParam(':R3', $r3);
    $sentencia->bindParam(':R4', $r4);
    $sentencia->bindParam(':NombreUsuario', $usuario);

    $sentencia->execute();
    
    $mbd->commit();
    
    header('Content-Type: application/json');
    echo json_encode(array('msg' => 'Encuesta subida exitosamente'));
    
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
