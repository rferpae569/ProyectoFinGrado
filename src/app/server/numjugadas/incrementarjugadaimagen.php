<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");

    // Obtener el valor de la cookie "Session"
    $sesion = $_COOKIE['session'];

    // Consulta para obtener el CodigoJugadas
    $res = $mbd->query("SELECT n.Codigojugadas FROM numjugadas AS n WHERE n.Codigojugadas IN (SELECT u.Codigojugadas FROM usuarios AS u WHERE u.Nombre = '$sesion')");
    
    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);

        // Obtener el CodigoJugadas
        $codigoJugadas = $rows[0]['Codigojugadas'];

        // Consulta para incrementar la columna jugadasImagen en uno
        $mbd->query("UPDATE numjugadas SET JugadasImagen = JugadasImagen + 1 WHERE Codigojugadas = $codigoJugadas");

        // Obtener los datos actualizados después de la actualización
        $resUpdated = $mbd->query("SELECT Codigojugadas, JugadasImagen FROM numjugadas WHERE Codigojugadas = $codigoJugadas");
        $rowsUpdated = $resUpdated->fetchAll(PDO::FETCH_ASSOC);

        header('Content-type: application/json');
        echo json_encode($rowsUpdated);
    }

    $mbd = null;
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