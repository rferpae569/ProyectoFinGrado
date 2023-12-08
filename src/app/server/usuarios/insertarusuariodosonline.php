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
    $stmt = $mbd->prepare("SELECT NombreUsuario1, NombreUsuario2 FROM dosjugadoresonline");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($row['NombreUsuario1']) && !empty($row['NombreUsuario2'])) {
        //Si el nombreusuario1 no es igual al nombre pasado, se insertara en otra fila.
        if ($row['NombreUsuario1'] !== $nombre) {
            $insertStmt = $mbd->prepare("INSERT INTO dosjugadoresonline (NombreUsuario1) VALUES (:NombreUsuario1)");
            $insertStmt->bindParam(':NombreUsuario1', $nombre);
            $insertStmt->execute();

            $mbd->commit();

            header('Content-Type: application/json');
            echo json_encode(array(
                'msg' => 'Usuario insertado en una nueva fila',
                'NombreUsuario1' => $nombre
            ));
        } else if ($row['NombreUsuario1'] === $nombre) {
            // Si el nombre enviado está en NombreUsuario1, eliminar y actualizar con el nuevo nombre
            $sentencia = $mbd->prepare("UPDATE dosjugadoresonline SET NombreUsuario1 = :NuevoNombre, NombreUsuario2 = NULL WHERE NombreUsuario1 = :NombreUsuario1");
            $sentencia->bindParam(':NombreUsuario1', $nombre);
            $sentencia->bindParam(':NuevoNombre', $nombre);
            $sentencia->execute();

            $mbd->commit();

            // Espera 10 segundos antes de verificar y eliminar si NombreUsuario2 sigue siendo NULL
            sleep(10);

            // Verifica si NombreUsuario2 sigue siendo NULL después de 10 segundos
            $stmt = $mbd->prepare("SELECT NombreUsuario2 FROM dosjugadoresonline WHERE NombreUsuario1 = :NombreUsuario1");
            $stmt->bindParam(':NombreUsuario1', $nombre);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row['NombreUsuario2'] === NULL) {
                // Si NombreUsuario2 sigue siendo NULL, elimina la fila
                $deleteStmt = $mbd->prepare("DELETE FROM dosjugadoresonline WHERE NombreUsuario1 = :NombreUsuario1");
                $deleteStmt->bindParam(':NombreUsuario1', $nombre);
                $deleteStmt->execute();

                header('Content-Type: application/json');
                echo json_encode(array(
                    'msg' => 'NombreUsuario1 actualizado con un nuevo nombre y NombreUsuario2 eliminado',
                    'NombreUsuario1' => $nombre,
                    'NombreUsuario2' => NULL
                ));
            } else {
                header('Content-Type: application/json');
                echo json_encode(array(
                    'msg' => 'NombreUsuario1 actualizado con un nuevo nombre',
                    'NombreUsuario1' => $nombre,
                    'NombreUsuario2' => $row['NombreUsuario2']
                ));
            }
        } else {
            // Si el nombre no coincide con NombreUsuario1, establecer NombreUsuario2 como NULL
            $sentencia = $mbd->prepare("UPDATE dosjugadoresonline SET NombreUsuario2 = NULL WHERE NombreUsuario1 = :NombreUsuario1");
            $sentencia->bindParam(':NombreUsuario1', $nombre);
            $sentencia->execute();

            $mbd->commit();

            header('Content-Type: application/json');
            echo json_encode(array(
                'msg' => 'NombreUsuario2 establecido como NULL',
                'NombreUsuario1' => $row['NombreUsuario1'],
                'NombreUsuario2' => NULL
            ));
        }
    } else {
        if (!empty($row['NombreUsuario1'])) {
            // Si solo NombreUsuario1 tiene valor, actualizar NombreUsuario2
            $sentencia = $mbd->prepare("UPDATE dosjugadoresonline SET NombreUsuario2 = :NombreUsuario2 WHERE NombreUsuario2 IS NULL");
            $sentencia->bindParam(':NombreUsuario2', $nombre);
            $sentencia->execute();

            $mbd->commit();

            // Obtener ambos nombres después de insertar NombreUsuario2
            $stmt = $mbd->prepare("SELECT NombreUsuario1, NombreUsuario2 FROM dosjugadoresonline");
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