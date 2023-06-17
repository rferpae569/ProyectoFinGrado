<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");

    // Obtener el valor de la cookie "session"
    $sesion = isset($_COOKIE['session']) ? $_COOKIE['session'] : '';

    if (!empty($sesion)) {
        // Consulta para obtener el CodigoJugadas
        $res = $mbd->query("SELECT n.Codigojugadas FROM numjugadas AS n WHERE n.Codigojugadas IN (SELECT u.Codigojugadas FROM usuarios AS u WHERE u.Nombre = '$sesion')");

        if ($res->errorCode() == 0) {
            $rows = $res->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($rows)) {
                // Obtener el CodigoJugadas
                $codigoJugadas = $rows[0]['Codigojugadas'];

                // Consulta para incrementar la columna jugadasImagen en uno
                $mbd->query("UPDATE numjugadas SET JugadasImagen = JugadasImagen + 1 WHERE Codigojugadas = $codigoJugadas");

                // Obtener los datos actualizados después de la actualización
                $resUpdated = $mbd->query("SELECT Codigojugadas, JugadasImagen FROM numjugadas WHERE Codigojugadas = $codigoJugadas");
                $rowsUpdated = $resUpdated->fetchAll(PDO::FETCH_ASSOC);

                $response = $rowsUpdated[0]; // Obtener solo el primer objeto del array

                echo json_encode($response);
            } else {
                echo json_encode(array('error' => array('msg' => 'No se encontraron registros', 'code' => '404')));
            }
        } else {
            echo json_encode(array('error' => array('msg' => 'Error en la consulta SQL', 'code' => '500')));
        }
    } else {
        echo json_encode(array('error' => array('msg' => 'La cookie "session" no está configurada', 'code' => '400')));
    }

    $mbd = null;
} catch (PDOException $e) {
    echo json_encode(array('error' => array('msg' => $e->getMessage(), 'code' => $e->getCode())));
    die();
}
?>