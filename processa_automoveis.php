<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $marca      = $_POST['marca'] ?? '';
        $modelo     = $_POST['modelo'] ?? '';
        $placa      = strtoupper($_POST['placa'] ?? '');
        $cliente_id = $_POST['cliente_id'] ?? 1;

        $sql = "INSERT INTO automoveis(marca, modelo, placa, cliente_id) 
                VALUES (:marca, :modelo, :placa, :cliente_id)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':marca'      => $marca,
            ':modelo'     => $modelo,
            ':placa'      => $placa,
            ':cliente_id' => $cliente_id
        ]);

        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>