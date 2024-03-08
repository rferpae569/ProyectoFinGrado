<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

//Pasamos los parametros
$params = json_decode($json);
$nombre = $params->Nombre;
$correo = $params->Correo;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    //Nos conectamos a la base de datos mediante PDO
    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mbd->beginTransaction();
    
    // Obtener el código de ranking y jugadas correspondiente al usuario
    $stmt = $mbd->prepare("SELECT CodigoRanking, CodigoJugadas FROM usuarios WHERE Nombre = :Nombre");
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $codigoRanking = $row['CodigoRanking'];
    $codigoJugadas = $row['CodigoJugadas'];

    // Eliminar registros relacionados en la tabla "dosjugadores"
    $stmt = $mbd->prepare("DELETE FROM dosjugadores WHERE NombreUsuario1 = :Nombre OR NombreUsuario2 = :Nombre");
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->execute();

    // Eliminar el correo
    $stmt = $mbd->prepare("DELETE FROM correos WHERE correo = :correo");
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    // Eliminar el usuario
    $stmt = $mbd->prepare("DELETE FROM usuarios WHERE Nombre = :Nombre");
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->execute();

    // Eliminar los registros relacionados en la tabla "numjugadas"
    $stmt = $mbd->prepare("DELETE FROM numjugadas WHERE CodigoJugadas = :CodigoJugadas");
    $stmt->bindParam(':CodigoJugadas', $codigoJugadas);
    $stmt->execute();

    // Eliminar los registros relacionados en la tabla "ranking"
    $stmt = $mbd->prepare("DELETE FROM ranking WHERE CodigoRanking = :CodigoRanking");
    $stmt->bindParam(':CodigoRanking', $codigoRanking);
    $stmt->execute();
    
    $mbd->commit();
    
    header('Content-Type: application/json');
    echo json_encode(array('msg' => 'Usuario eliminado exitosamente'));
    
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
