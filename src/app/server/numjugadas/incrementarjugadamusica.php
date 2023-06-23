<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$json = file_get_contents('php://input');
 
$params = json_decode($json);
$nombre = $params->nombre;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");

    // Consulta para obtener el CodigoJugadas basado en el nombre
    $res = $mbd->prepare("SELECT n.Codigojugadas FROM numjugadas AS n WHERE n.Codigojugadas IN (SELECT u.Codigojugadas FROM usuarios AS u WHERE u.Nombre = :nombre)");
    $res->bindParam(':nombre', $nombre);
    $res->execute();

    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($rows)) {
            // Obtener el CodigoJugadas
            $codigoJugadas = $rows[0]['Codigojugadas'];

            // Consulta para incrementar la columna jugadasMusica en uno
            $mbd->query("UPDATE numjugadas SET JugadasMusica = JugadasMusica + 1 WHERE Codigojugadas = $codigoJugadas");

            // Obtener los datos actualizados después de la actualización
            $resUpdated = $mbd->query("SELECT Codigojugadas, JugadasMusica FROM numjugadas WHERE Codigojugadas = $codigoJugadas");
            $rowsUpdated = $resUpdated->fetchAll(PDO::FETCH_ASSOC);

            $response = $rowsUpdated[0]; // Obtener solo el primer objeto del array

            echo json_encode($response);
        } else {
            echo json_encode(array('error' => array('msg' => 'No se encontraron registros', 'code' => '404')));
        }
    } else {
        echo json_encode(array('error' => array('msg' => 'Error en la consulta SQL', 'code' => '500')));
    }

    $mbd = null;
} catch (PDOException $e) {
    echo json_encode(array('error' => array('msg' => $e->getMessage(), 'code' => $e->getCode())));
    die();
}
?>