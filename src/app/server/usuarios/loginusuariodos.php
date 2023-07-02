<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

$params = json_decode($json);

try {
  $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
  //Nos conectamos a la base de datos mediante PDO

  //Esta consulta selecciona todos los registros de la tabla "usuarios" donde el valor en la columna "Nombre" sea igual al valor proporcionado en el parámetro ":nombre1" o igual al valor proporcionado en el parámetro ":nombre2".
  $sentencia = $mbd->prepare("SELECT * FROM usuarios WHERE Nombre = :nombre1 OR Nombre = :nombre2");
  $sentencia->bindParam(':nombre1', $nombre1);
  $sentencia->bindParam(':nombre2', $nombre2);
  $nombre1 = $params->Nombre1;
  $nombre2 = $params->Nombre2;
  $sentencia->execute();
  $error = $sentencia->errorInfo();
  header('Content-Type: application/json');
  if ($sentencia->errorCode() == 0) {
    $rows = $sentencia->fetchAll(PDO::FETCH_ASSOC);
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