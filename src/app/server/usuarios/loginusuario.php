<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);

	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
		//Nos conectamos a la base de datos mediante PDO

		//Esta consulta selecciona todos los registros de la tabla "usuarios" donde el valor en la columna "Nombre" sea igual al valor proporcionado en el parámetro ":nombre", y el valor en la columna "Passwrd" sea igual al valor proporcionado en el parámetro ":passwrd".
  		$sentencia = $mbd->prepare("SELECT * FROM usuarios where Nombre=:nombre and Passwrd=:passwrd");
		$sentencia->bindParam(':nombre', $nombre);
		$sentencia->bindParam(':passwrd', $passwrd);
		$nombre=$params->Nombre;
		$passwrd=$params->Passwrd;
		$sentencia->execute();
		$error=$sentencia->errorInfo();
		header('Content-Type: application/json');
		if ($sentencia->errorCode()==0) {
			$rows=$sentencia->fetchAll(PDO::FETCH_ASSOC);
			header('Content-type: application/json');
			echo json_encode($rows);
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