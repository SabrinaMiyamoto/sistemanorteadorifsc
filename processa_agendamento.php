<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $servico     = $_POST['servico'] ?? '';
        $data        = $_POST['data'] ?? '';
        $horario     = $_POST['horario'] ?? '';
        $marca       = $_POST['marca'] ?? '';
        $modelo      = $_POST['modelo'] ?? '';
        $placa       = strtoupper($_POST['placa'] ?? '');
        $observacoes = $_POST['observacoes'] ?? '';

        $sql = "INSERT INTO agendamentos (servico, data_agendada, horario, marca, modelo, placa, observacoes) 
                VALUES (:servico, :data_agendada, :horario, :marca, :modelo, :placa, :observacoes)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':servico'       => $servico,
            ':data_agendada' => $data,
            ':horario'       => $horario,
            ':marca'         => $marca,
            ':modelo'        => $modelo,
            ':placa'         => $placa,
            ':observacoes'   => $observacoes
        ]);

        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>