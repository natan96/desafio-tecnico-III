-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `documento` VARCHAR(11) NOT NULL,
    `celular` VARCHAR(11) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `cep` VARCHAR(100) NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `complemento` VARCHAR(100) NULL,

    UNIQUE INDEX `pacientes_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exames` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idempotencyKey` VARCHAR(191) NOT NULL,
    `modalidade` VARCHAR(15) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataExame` DATETIME(3) NOT NULL,
    `pacienteId` INTEGER NOT NULL,

    UNIQUE INDEX `exames_idempotencyKey_key`(`idempotencyKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exames` ADD CONSTRAINT `exames_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
