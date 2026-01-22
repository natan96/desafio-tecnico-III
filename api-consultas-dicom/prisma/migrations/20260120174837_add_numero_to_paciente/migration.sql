/*
  Warnings:

  - Added the required column `numero` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` ADD COLUMN `numero` VARCHAR(100) NOT NULL;
