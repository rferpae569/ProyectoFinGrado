<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
//pasamos los parametros
$params = json_decode($json);
$nombre=$params->nombre;
$puntos=$params->puntos;


	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
	  //Nos conectamos mediante PDO

	  //Cogemos el codigoRanking de la tabla usuarios donde coincida el nombre pasado por parametro
	  $sentencia = $mbd->prepare("SELECT CodigoRanking FROM usuarios WHERE Nombre = :Nombre");
	  $sentencia->bindParam(':Nombre', $nombre);
	  $sentencia->execute();
	  $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
	  if ($resultado) {
        $id = $resultado['CodigoRanking'];
    }

	//En la siguiente consulta cogemos los puntosMusica de la tabla ranking del codigoranking cogido en la anterior consulta
	$consultaPuntos = $mbd->prepare("SELECT PuntosPreguntas FROM ranking WHERE CodigoRanking = :CodigoRanking");
    $consultaPuntos->bindParam(':CodigoRanking', $id);
	$consultaPuntos->execute();
	$resultadoPuntos = $consultaPuntos->fetch(PDO::FETCH_ASSOC);
	if ($resultadoPuntos) {
        $puntosActuales = $resultadoPuntos['PuntosPreguntas'];

        // Verificar si los puntos asociados a la ID son mayores que los existentes
        if ($puntos > $puntosActuales) {
            // Preparar la consulta SQL para actualizar los puntos
            $consultaActualizarPuntos = $mbd->prepare("UPDATE ranking SET PuntosPreguntas = :PuntosPreguntas WHERE CodigoRanking = :CodigoRanking");
            $consultaActualizarPuntos->bindParam(':CodigoRanking', $id);
            $consultaActualizarPuntos->bindParam(':PuntosPreguntas', $puntos);

            // Ejecutar la consulta para actualizar los puntos
            $consultaActualizarPuntos->execute();
		}
	}else{

		//En esta consulta insertaria el codigoRanking y los puntos si no estuvieran
		$sentencia = $mbd->prepare("INSERT INTO ranking (CodigoRanking, PuntosPreguntas ) VALUES (:CodigoRanking, :PuntosPreguntas)");
		$sentencia->bindParam(':CodigoRanking', $id);
		$sentencia->bindParam(':PuntosImagen', $puntos);
		
		$sentencia->execute();

	}

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
?>