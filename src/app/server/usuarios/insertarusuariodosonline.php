<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');

// Pasamos los parámetros
$params = json_decode($json);
$nombre = $params->NombreUsuario1;

try {
    $mbd = new PDO('mysql:host=localhost;dbname=juegocine', "root", "");
    // Nos conectamos a la base de datos mediante PDO
    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $mbd->beginTransaction();
    
    // Comprobar si NombreUsuario1 y NombreUsuario2 tienen valores
    $stmt = $mbd->prepare("SELECT NombreUsuario1, NombreUsuario2 FROM dosjugadoresonline LIMIT 1");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!empty($row['NombreUsuario1']) && !empty($row['NombreUsuario2'])) {
        // Si el nombre enviado está en NombreUsuario1, establecer NombreUsuario2 como NULL
    $sentencia = $mbd->prepare("UPDATE dosjugadoresonline SET NombreUsuario2 = NULL WHERE NombreUsuario1 = :NombreUsuario1");
    $sentencia->bindParam(':NombreUsuario1', $nombre);
    $sentencia->execute();
    
    $mbd->commit();
    
    header('Content-Type: application/json');
    echo json_encode(array(
        'msg' => 'NombreUsuario2 establecido como NULL',
        'NombreUsuario1' => $nombre,
        'NombreUsuario2' => NULL
    ));
    } else {
        if (!empty($row['NombreUsuario1'])) {
            // Si solo NombreUsuario1 tiene valor, actualizar NombreUsuario2
            $sentencia = $mbd->prepare("UPDATE dosjugadoresonline SET NombreUsuario2 = :NombreUsuario2 WHERE NombreUsuario2 IS NULL");
            $sentencia->bindParam(':NombreUsuario2', $nombre);
            $sentencia->execute();
            
            $mbd->commit();
            
            // Obtener ambos nombres después de insertar NombreUsuario2
            $stmt = $mbd->prepare("SELECT NombreUsuario1, NombreUsuario2 FROM dosjugadoresonline LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            echo json_encode(array(
                'msg' => 'Usuario insertado en NombreUsuario2',
                'NombreUsuario1' => $row['NombreUsuario1'],
                'NombreUsuario2' => $row['NombreUsuario2']
            ));
        } else {
            // Si NombreUsuario1 está vacío, insertar en NombreUsuario1
            $sentencia = $mbd->prepare("INSERT INTO dosjugadoresonline (NombreUsuario1) VALUES (:NombreUsuario1)");
            $sentencia->bindParam(':NombreUsuario1', $nombre);
            $sentencia->execute();
            
            $mbd->commit();
            
            header('Content-Type: application/json');
            echo json_encode(array(
                'msg' => 'Usuario insertado en NombreUsuario1',
                'NombreUsuario1' => $nombre
            ));
        }
    }

    $mbd = null; // Nos desconectamos
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
