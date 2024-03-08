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
    
    // Obtener el siguiente código de ranking
    $stmt = $mbd->query("SELECT MAX(CodigoRanking) AS max_codigo FROM ranking");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $codigoRanking = $row['max_codigo'] + 1;
    
    // Insertar un nuevo registro en la tabla "ranking"
    $mbd->exec("INSERT INTO ranking (CodigoRanking) VALUES ($codigoRanking)");
    
    // Crear un nuevo numjugadas
    $stmt = $mbd->query("SELECT MAX(Codigojugadas) AS max_codigo2 FROM numjugadas");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $codigoJugadas = $row['max_codigo2'] + 1;
    
    $mbd->exec("INSERT INTO numjugadas (CodigoJugadas) VALUES ($codigoJugadas)");
    
    // Agregar el usuario con el ranking y numjugadas correspondientes
    $sentencia = $mbd->prepare("INSERT INTO usuarios (Nombre, Passwrd, CodigoRanking, CodigoJugadas) VALUES (:Nombre, :Passwrd, :CodigoRanking, :CodigoJugadas)");
    $sentencia->bindParam(':Nombre', $nombre);
    $sentencia->bindParam(':Passwrd', $passwrd);
    $sentencia->bindParam(':CodigoRanking', $codigoRanking);
    $sentencia->bindParam(':CodigoJugadas', $codigoJugadas);

    $sentencia->execute();

    //Agregamos el correo
    $sentencia = $mbd->prepare("INSERT INTO correos (correo, NombreUsuario) VALUES (:correo, :NombreUsuario)");
    $sentencia->bindParam(':correo', $correo);
    $sentencia->bindParam(':NombreUsuario', $nombre);

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
