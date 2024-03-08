<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

$params = json_decode($json);

try {
  $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
  //Nos conectamos a la base de datos mediante PDO

  //Esta consulta selecciona todos los registros de la tabla "usuarios" donde el valor en la columna "Nombre" y la contraseña sea igual al valor proporcionado en el parámetro ":nombre1" y :passwrd1. Tambien lo comprobara para el segundo usuario.
  $sentencia = $mbd->prepare("SELECT * FROM usuarios WHERE (Nombre = :nombre1 AND Passwrd = :passwrd1) OR (Nombre = :nombre2 AND Passwrd = :passwrd2)");
  $sentencia->bindParam(':nombre1', $nombre1);
  $sentencia->bindParam(':nombre2', $nombre2);
  $sentencia->bindParam(':passwrd1', $passwrd1);
  $sentencia->bindParam(':passwrd2', $passwrd2);
  $nombre1 = $params->Nombre1;
  $nombre2 = $params->Nombre2;
  $passwrd1 = $params->Passwrd1;
  $passwrd2 = $params->Passwrd2;
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
