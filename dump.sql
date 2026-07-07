-- DESATIVA a verificação de chaves estrangeiras temporariamente
SET FOREIGN_KEY_CHECKS = 0;


CREATE DATABASE IF NOT EXISTS `sistema_norteador` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sistema_norteador`;


DROP TABLE IF EXISTS `agendamentos`;
DROP TABLE IF EXISTS `automoveis`;
DROP TABLE IF EXISTS `clientes`;


CREATE TABLE `clientes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(255) DEFAULT NULL,
  `celular` VARCHAR(20) DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(50) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `automoveis` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `marca` VARCHAR(50) NOT NULL,
  `modelo` VARCHAR(50) NOT NULL,
  `placa` VARCHAR(10) NOT NULL UNIQUE,
  `cliente_id` INT NOT NULL,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `agendamentos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `servico` VARCHAR(150) NOT NULL,
  `data_agendada` DATE NOT NULL,
  `horario` TIME NOT NULL,
  `marca` VARCHAR(50) NOT NULL,
  `modelo` VARCHAR(50) NOT NULL,
  `placa` VARCHAR(10) NOT NULL,
  `observacoes` TEXT DEFAULT NULL,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `clientes` (`id`, `nome`, `endereco`, `celular`, `email`, `usuario`, `senha`) VALUES 
(1, 'Sabrina Miyamoto', 'Rua do IFSC, 123', '(48) 99999-1111', 'sabrina@teste.com', 'sabrina', 'senha123'),
(2, 'João Silva', 'Av Central, 456', '(48) 98888-2222', 'joao@teste.com', 'joaosilva', 'senha456');

INSERT INTO `automoveis` (`id`, `marca`, `modelo`, `placa`, `cliente_id`) VALUES
(1, 'Chevrolet', 'Onix', 'IFSC2026', 1),
(2, 'Fiat', 'Uno', 'BRA2E19', 1),
(3, 'Volkswagen', 'Gol', 'ABC1234', 2);

INSERT INTO `agendamentos` (`servico`, `data_agendada`, `horario`, `marca`, `modelo`, `placa`, `observacoes`) VALUES
('Troca de Óleo', '2026-07-15', '14:30:00', 'Chevrolet', 'Onix', 'IFSC2026', 'Usar óleo sintético recomendado pelo manual.'),
('Alinhamento e Balanceamento', '2026-07-16', '09:00:00', 'Fiat', 'Uno', 'BRA2E19', 'Revisar barulho na suspensão dianteira.'),
('Revisão Geral', '2026-07-17', '10:00:00', 'Volkswagen', 'Gol', 'ABC1234', 'Cliente relatou problemas na partida a frio.');

-- REATIVE a verificação de chaves estrangeiras por segurança
SET FOREIGN_KEY_CHECKS = 1;