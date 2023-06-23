<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);
$nombre=$params->nombre;
$puntos=$params->puntos;


	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");

	  $sentencia = $mbd->prepare("SELECT CodigoRanking FROM usuarios WHERE Nombre = :Nombre");
	  $sentencia->bindParam(':Nombre', $nombre);
	  $sentencia->execute();
	  $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
	  if ($resultado) {
        $id = $resultado['CodigoRanking'];
    }

	$consultaPuntos = $mbd->prepare("SELECT PuntosImagen FROM ranking WHERE CodigoRanking = :CodigoRanking");
    $consultaPuntos->bindParam(':CodigoRanking', $id);
	$consultaPuntos->execute();
	$resultadoPuntos = $consultaPuntos->fetch(PDO::FETCH_ASSOC);
	if ($resultadoPuntos) {
        $puntosActuales = $resultadoPuntos['PuntosImagen'];

        // Verificar si los puntos asociados a la ID son mayores que los existentes
        if ($puntos > $puntosActuales) {
            // Preparar la consulta SQL para actualizar los puntos
            $consultaActualizarPuntos = $mbd->prepare("UPDATE ranking SET PuntosImagen = :PuntosImagen WHERE CodigoRanking = :CodigoRanking");
            $consultaActualizarPuntos->bindParam(':CodigoRanking', $id);
            $consultaActualizarPuntos->bindParam(':PuntosImagen', $puntos);

            // Ejecutar la consulta para actualizar los puntos
            $consultaActualizarPuntos->execute();
		}
	}else{

		$sentencia = $mbd->prepare("INSERT INTO ranking (CodigoRanking, PuntosImagen ) VALUES (:CodigoRanking, :PuntosImagen)");
		$sentencia->bindParam(':CodigoRanking', $id);
		$sentencia->bindParam(':PuntosImagen', $puntos);
		
		$sentencia->execute();

	}

		$mbd = null;
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}
?>