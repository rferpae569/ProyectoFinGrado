<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

//Pasamos los parametros
$params = json_decode($json);
$nombre = $params->Nombre;
$passwrd = $params->Passwrd;
$correo = $params->Correo;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos mediante PDO
    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mbd->beginTransaction();
    
    // Actualiza la contraseña del usuario
    $stmt = $mbd->prepare("UPDATE usuarios SET Passwrd = :Passwrd WHERE Nombre = :Nombre");
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->bindParam(':Passwrd', $passwrd);
    $stmt->execute();
    
    // Actualiza el correo
    $stmt = $mbd->prepare("UPDATE correos SET correo = :correo WHERE NombreUsuario = :Nombre");
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();
    
    $mbd->commit();
    
    header('Content-Type: application/json');
    echo json_encode(array('msg' => 'Usuario actualizado exitosamente'));
    
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
