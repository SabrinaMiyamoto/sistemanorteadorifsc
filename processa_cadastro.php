<?php
// Reportar erros para ajudar a gente
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// O require_once traz a variável $pdo para cá
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $nome     = $_POST['nome'] ?? '';
        $endereco = $_POST['endereco'] ?? '';
        $celular  = $_POST['celular'] ?? '';
        $email    = $_POST['email'] ?? '';
        $usuario  = $_POST['usuario'] ?? '';
        $senha    = $_POST['senha'] ?? ''; 

        // Aqui usamos o $pdo que veio do config.php
        $sql = "INSERT INTO clientes (nome, endereco, celular, email, usuario, senha) 
                VALUES (:nome, :endereco, :celular, :email, :usuario, :senha)";
        
        $stmt = $pdo->prepare($sql); // Linha onde dava o erro de "null"
        $stmt->execute([
            ':nome'     => $nome,
            ':endereco' => $endereco,
            ':celular'  => $celular,
            ':email'    => $email,
            ':usuario'  => $usuario,
            ':senha'    => $senha
        ]);

        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>